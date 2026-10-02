#!/usr/bin/env node
/**
 * generate-site.js — builds site/ from the collection tracked at HEAD.
 *
 *   node scripts/generate-site.js            # write site/
 *   node scripts/generate-site.js --dry-run  # validate and report, write nothing
 *
 * The bundle is the collection itself (the evidence folders, guide/ and the root documents), copied
 * from HEAD — never from the working tree — plus the generated library.html (the viewer, from
 * site-src/template.html and site-src/_meta.json), site-src/site-assets/, and the app's front
 * page at index.html with its images/ (scripts/build-frontpage.js egpt: the full-screen page
 * the App Shell serves first; a #<path> on it forwards to library.html#<path>). A git-lfs pointer at
 * HEAD is resolved from the working tree only when that file's SHA-256 equals the pointer's oid.
 * Every file the metadata names must be in the bundle; a missing one is an error, not a warning.
 * The reading lists (site-src/spine.json) are validated the same way: every stop's paths tracked
 * at HEAD, every record id in 05_CORPUS/corpus/quotes.json at HEAD; the idea lists are expanded
 * from the guide pages' own links, in their order. The expanded lists are written to site/spine.json
 * for the librarian skills. The landing's quotations are gated against the held files they name.
 * Pure Node, no dependencies. FAIL LOUD.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { execFileSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'site-src');
const OUT = path.join(ROOT, 'site');
const DRY = process.argv.includes('--dry-run');
const git = (...a) => execFileSync('git', a, { cwd: ROOT, maxBuffer: 1 << 28 });

const ROOT_FILES = new Set(['README.md', 'CLAUDE.md', 'URLS.md', 'RECORD_INDEX.md',
  'Copyright_Fair-use_Memo.md', 'CHECKSUMS.txt']);
const inBundle = p => /^(guide|journal|[0-9]{2}_[A-Z_]+)\//.test(p) || ROOT_FILES.has(p);

function die(msg) { console.error('ERROR: ' + msg); process.exit(1); }
const esc = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;')
  .replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');

// ---------------------------------------------------------------- the tree at HEAD
const sha = git('rev-parse', '--short', 'HEAD').toString().trim();
const tree = git('ls-tree', '-r', '-z', 'HEAD').toString('utf8').split('\0').filter(Boolean)
  .map(l => { const [meta, p] = l.split('\t'); return { blob: meta.split(' ')[2], path: p }; });
const bundle = tree.filter(e => inBundle(e.path));
const files = new Set(bundle.map(e => e.path));
if (!files.has('README.md')) die('README.md is not tracked at HEAD');

function blobAtHead(p) {
  const e = bundle.find(x => x.path === p);
  if (!e) die(`${p} is not in the bundle`);
  return git('cat-file', 'blob', e.blob);
}

function contentFor(e) {
  const buf = git('cat-file', 'blob', e.blob);
  if (buf.length < 200 && buf.toString('utf8').startsWith('version https://git-lfs.github.com/spec/v1')) {
    const m = buf.toString('utf8').match(/^oid sha256:([0-9a-f]{64})$/m);
    if (!m) die(`${e.path}: git-lfs pointer without an oid`);
    const wt = path.join(ROOT, e.path);
    if (!fs.existsSync(wt)) die(`${e.path}: git-lfs object is not checked out (run: git lfs pull)`);
    const data = fs.readFileSync(wt);
    const got = crypto.createHash('sha256').update(data).digest('hex');
    if (got !== m[1]) die(`${e.path}: working-tree file differs from the git-lfs object at HEAD`);
    return data;
  }
  return buf;
}

// ---------------------------------------------------------------- metadata
const readJSON = p => { try { return JSON.parse(fs.readFileSync(p, 'utf8')); } catch (err) { die(`${path.relative(ROOT, p)}: ${err.message}`); } };
const meta = readJSON(path.join(SRC, '_meta.json'));
for (const k of ['title', 'brand', 'subtitle', 'repo_url', 'raw_url']) if (!meta.site || !meta.site[k]) die(`_meta.json: site.${k} is required`);
if (!meta.ideas || !meta.modules) die('_meta.json: ideas and modules are required');

const mustExist = (p, where) => { if (!files.has(p)) die(`${where}: ${p} is not tracked at HEAD in the bundle`); };

for (const [id, idea] of Object.entries(meta.ideas)) {
  if (!/^ID[0-9]+$/.test(id)) die(`_meta.json: idea id ${id} must be IDn`);
  for (const k of ['label', 'short', 'color']) if (!idea[k]) die(`_meta.json: ideas.${id}.${k} is required`);
  if (idea.file) mustExist(idea.file, `ideas.${id}.file`);
}

function paragraphFrom(spec, where) {
  mustExist(spec.file, where);
  const text = blobAtHead(spec.file).toString('utf8');
  const paras = text.split(/\n\s*\n/);
  const hit = paras.find(p => p.trim().startsWith(spec.startsWith));
  if (!hit) die(`${where}: no paragraph in ${spec.file} starts with ${JSON.stringify(spec.startsWith)}`);
  return hit.replace(/\s*\n\s*/g, ' ').replace(/\[([^\]]+)\]\([^)]*\)/g, '$1').replace(/`/g, '').replace(/\*\*/g, '').replace(/\*/g, '').trim();
}

const modules = [];
for (const m of meta.modules) {
  if (!m.dir || !m.label) die('_meta.json: every module needs dir and label');
  const mp = path.join(SRC, 'modules', m.dir + '.json');
  const mm = readJSON(mp);
  const where = `modules/${m.dir}.json`;
  const under = bundle.map(e => e.path).filter(p => p.startsWith(m.dir + '/'));
  if (!under.length) die(`${where}: nothing tracked under ${m.dir}/`);
  let description = mm.description_from ? paragraphFrom(mm.description_from, where + ' description_from') : (mm.description || '');
  // The folder map's paragraphs begin with the folder's own name; the card already shows it.
  description = description.replace(new RegExp('^' + m.label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\s*[—-]\\s*'), '');
  const highlights = (mm.highlights || []).map(h => { mustExist(`${m.dir}/${h.file}`, where + ' highlights'); return h; });
  let subsections = mm.subsections;
  if (!subsections || subsections === 'auto') {
    const top = [], dirs = new Map();
    for (const p of under) {
      const rel = p.slice(m.dir.length + 1);
      const k = rel.indexOf('/');
      if (k < 0) top.push(rel); else { const d = rel.slice(0, k); if (!dirs.has(d)) dirs.set(d, []); dirs.get(d).push(rel); }
    }
    subsections = [];
    if (top.length) subsections.push({ title: 'Files', files: top });
    for (const [d, fl] of [...dirs.entries()].sort()) subsections.push({ title: d + '/', files: fl });
  } else {
    for (const s of subsections) for (const f of s.files || []) mustExist(`${m.dir}/${f}`, where + ' subsections');
  }
  const entry = mm.entry || (files.has(`${m.dir}/README.md`) ? 'README.md' : (highlights[0] && highlights[0].file));
  if (entry) mustExist(`${m.dir}/${entry}`, where + ' entry');
  for (const id of mm.primary_ideas || []) if (!meta.ideas[id]) die(`${where}: unknown idea ${id}`);
  modules.push({ dir: m.dir, label: m.label, name: m.name || m.label, line: m.line || '', title: mm.title || '', description, entry: entry || '',
    primary_ideas: mm.primary_ideas || [], highlights, subsections });
}

for (const c of meta.carousel || []) {
  for (const l of c.links || []) if (l.route) mustExist(`${l.route.dir}/${l.route.file}`, `carousel ${c.id} links`);
  if (c.visual && c.visual.src) mustExist(c.visual.src, `carousel ${c.id} visual`);
  if (c.visual && c.visual.clickRoute) mustExist(`${c.visual.clickRoute.dir}/${c.visual.clickRoute.file}`, `carousel ${c.id} visual.clickRoute`);
}

// ---------------------------------------------------------------- the quotation gate (as build-frontpage.js folds)
function fold(t) {
  return t.normalize('NFKC')
    .replace(/[‘’‚′]/g, "'").replace(/[“”„″]/g, '"')
    .replace(/[‐-―−]/g, '-').replace(/…/g, '...').replace(/ /g, ' ')
    .replace(/-\n\s*/g, '').replace(/[*_`>#|]/g, '').replace(/\[([^\]]*)\]\([^)]*\)/g, '$1').replace(/\s+/g, ' ').trim();
}
const heldFold = new Map();
function gateQuote(text, src, where) {
  mustExist(src, where);
  if (!heldFold.has(src)) heldFold.set(src, fold(blobAtHead(src).toString('utf8')));
  if (!heldFold.get(src).includes(fold(text))) die(`${where}: quotation not found in ${src}: "${text.slice(0, 80)}…"`);
}

// ---------------------------------------------------------------- document titles (front matter, first heading, <title>)
function titleOf(p) {
  const name = p.split('/').pop();
  const ext = name.split('.').pop().toLowerCase();
  if (ext === 'md' || ext === 'html' || ext === 'htm') {
    const t = blobAtHead(p).toString('utf8');
    let m = ext === 'md' && t.match(/^---\n[\s\S]*?^title:\s*"?(.+?)"?\s*$[\s\S]*?^---/m);
    if (!m && ext === 'md') m = t.match(/^#\s+(.+)$/m);
    if (!m && ext !== 'md') m = t.match(/<title>([^<]+)<\/title>/i);
    if (m) return m[1].replace(/[*_`]/g, '').replace(/\[([^\]]*)\]\([^)]*\)/g, '$1').trim();
  }
  const mod = modules.find(x => p.startsWith(x.dir + '/'));
  const hl = mod && mod.highlights.find(h => `${mod.dir}/${h.file}` === p);
  return hl && hl.label ? hl.label : name.replace(/\.[^.]+$/, '').replace(/[_-]+/g, ' ');
}

// ---------------------------------------------------------------- reading lists (site-src/spine.json)
const spineSpec = readJSON(path.join(SRC, 'spine.json'));
const quotesAtHead = (() => { mustExist('05_CORPUS/corpus/quotes.json', 'spine.json records');
  return new Set(JSON.parse(blobAtHead('05_CORPUS/corpus/quotes.json').toString('utf8')).records.map(r => r.id)); })();
const titles = {};
function stopPath(ref, where) {
  const p = ref.split('#')[0];
  mustExist(p, where);
  if (!(p in titles)) titles[p] = titleOf(p);
  return ref;
}
function guideLinks(guide) {
  const text = blobAtHead(guide).toString('utf8');
  const out = [];
  for (const m of text.matchAll(/\]\(([^)\s]+)\)/g)) {
    let href = m[1].split('#')[0];
    if (!href || /^(https?:|mailto:)/.test(href)) continue;
    let p = path.posix.normalize(path.posix.join(path.posix.dirname(guide), decodeURIComponent(href)));
    if (href.endsWith('/') || !files.has(p)) p = p.replace(/\/$/, '') + '/README.md';
    if (files.has(p) && p !== guide && !out.includes(p)) out.push(p);
  }
  return out;
}
const spines = [];
for (const sp of spineSpec.spines || []) {
  const where = `spine.json ${sp.id}`;
  if (!sp.id) die('spine.json: every list needs an id');
  let out;
  if (sp.from_guide) {
    const idea = meta.ideas[sp.idea];
    if (!idea) die(`${where}: unknown idea ${sp.idea}`);
    if (idea.file !== sp.from_guide) die(`${where}: ${sp.from_guide} is not the file of ${sp.idea}`);
    stopPath(sp.from_guide, where);
    const stops = [{ id: 'guide', title: titles[sp.from_guide], read: [sp.from_guide] }]
      .concat(guideLinks(sp.from_guide).map((p, i) => ({ id: 'd' + (i + 1), title: titleOf(p), read: [stopPath(p, where)] })));
    out = { id: sp.id, idea: sp.idea, title: idea.short, short: idea.short, blurb: 'You are here to ' + idea.label + '.', color: idea.color, source: sp.from_guide, stops };
  } else {
    if (!sp.title || !Array.isArray(sp.stops) || !sp.stops.length) die(`${where}: title and stops are required`);
    if (sp.source) stopPath(sp.source, where);
    const stops = sp.stops.map(st => {
      if (!st.id || !st.title || !Array.isArray(st.read) || !st.read.length) die(`${where}: every stop needs id, title and read`);
      for (const r of st.records || []) if (!quotesAtHead.has(r)) die(`${where} ${st.id}: record ${r} is not in 05_CORPUS/corpus/quotes.json at HEAD`);
      return { ...st, read: st.read.map(r => stopPath(r, `${where} ${st.id}`)) };
    });
    out = { id: sp.id, title: sp.title, short: sp.short || sp.title, blurb: sp.blurb || '', color: sp.color || '', source: sp.source || '', stops };
  }
  if (spines.some(x => x.id === out.id)) die(`${where}: duplicate id`);
  spines.push(out);
}

// ---------------------------------------------------------------- the books (site-src/books/<id>.json, schema egpt.book/1)
// Each index is written by its own build script and served whole at books/<id>.json; the viewer
// fetches one when a reader opens it. What the viewer needs at load is only the summary below:
// which book a path belongs to, so a link that lands on a page of a book can say so.
// (Cowork, 1 October 2026, for the reader component: site-assets/reader.js.)
const books = [];
const booksDir = path.join(SRC, 'books');
if (fs.existsSync(booksDir)) {
  for (const f of fs.readdirSync(booksDir).filter(f => f.endsWith('.json')).sort()) {
    const b = readJSON(path.join(booksDir, f));
    if (b.schema !== 'egpt.book/1' || !b.id || !b.title || !Array.isArray(b.parts)) die(`books/${f}: not an egpt.book/1 index with id, title and parts`);
    if (b.id + '.json' !== f) die(`books/${f}: id ${b.id} does not match the file name`);
    const paths = new Set();
    const walk = items => { for (const it of items || []) {
      if (it.href) paths.add(it.href.split('#')[0]);
      if (it.asked) paths.add(it.asked.split('#')[0]);
      for (const a of it.answers || []) if (a.href) paths.add(a.href.split('#')[0]);
      walk(it.parts);
    } };
    for (const p of b.parts) { if (p.href) paths.add(p.href.split('#')[0]); walk(p.items); }
    if (b.page) paths.add(b.page);
    // a page of a book that is not tracked at HEAD is reported, not fatal: the session page enters
    // site/ when it is committed, and the seat copies it in by hand until then (hand-off §6).
    for (const p of paths) if (!files.has(p)) console.warn(`books/${f}: ${p} is not tracked at HEAD (the reader will say the page is not in this bundle)`);
    books.push({ id: b.id, title: b.title, answer: b.answer || null, page: b.page || '', source: b.source || '', messages: b.messages || 0,
      parts: b.parts.map(p => ({ id: p.id, title: p.title, items: (p.items || []).length })), paths: [...paths].sort() });
  }
}

// ---------------------------------------------------------------- the shelves (site-src/shelves.json, schema egpt.shelves/1)
// The subjects the library is a library about. One file, read here for the viewer's landing and
// sidebar, by the reader for #shelf:<id>, and by the front page's card row. (Cowork, 1 October 2026.)
const shelfSpec = fs.existsSync(path.join(SRC, 'shelves.json')) ? readJSON(path.join(SRC, 'shelves.json')) : { shelves: [] };
if (shelfSpec.shelves.length && shelfSpec.schema !== 'egpt.shelves/1') die('shelves.json: schema must be egpt.shelves/1');
const bookPages = new Set(books.map(b => b.page).filter(Boolean));
const shelves = shelfSpec.shelves.map(sh => {
  const where = `shelves.json ${sh.id}`;
  if (!sh.id || !sh.title) die(`${where}: every shelf needs an id and a title`);
  for (const p of (sh.start || []).concat(sh.guide ? [sh.guide] : [])) {
    const bare = p.split('#')[0];
    if (bookPages.has(bare) && !files.has(bare)) { console.warn(`${where}: ${bare} is a book's page not yet tracked at HEAD`); continue; }
    mustExist(bare, where); if (!(bare in titles)) titles[bare] = titleOf(bare);
  }
  for (const l of sh.lists || []) if (!spines.some(x => x.id === l)) die(`${where}: no reading list ${l} in spine.json`);
  for (const d of sh.folders || []) if (!modules.some(m => m.dir === d)) die(`${where}: no folder ${d} in _meta.json`);
  for (const b of sh.books || []) if (!books.some(x => x.id === b)) die(`${where}: no book ${b} in site-src/books/`);
  for (const o of sh.outside || []) if (!o.title || !/^https:\/\//.test(o.href || '')) die(`${where}: an outside link needs a title and an https href`);
  return sh;
});
if (new Set(shelves.map(s => s.id)).size !== shelves.length) die('shelves.json: duplicate id');

// ---------------------------------------------------------------- landing HTML
const navAttrs = full => { const k = full.lastIndexOf('/'); const d = k < 0 ? '' : full.slice(0, k); const f = k < 0 ? full : full.slice(k + 1);
  return ` data-nav-dir="${esc(d)}" data-nav-file="${esc(f)}"`; };

function carouselHtml() {
  const cards = meta.carousel || [];
  if (!cards.length) return `<div class="landing-hero"><h1>${esc(meta.site.title)}</h1></div>`;
  const cardsHtml = cards.map((card, i) => {
    const ideaId = (card.idea || 'ID1').toLowerCase();
    const color = meta.ideas[card.idea] ? meta.ideas[card.idea].color : '#888';
    const links = (card.links || []).map(l => {
      const cls = l.style === 'primary' ? 'carousel-link--primary' : 'carousel-link--secondary';
      const href = l.route ? `#${l.route.dir}/${l.route.file}` : l.href;
      const nav = l.route ? navAttrs(`${l.route.dir}/${l.route.file}`) : '';
      const tgt = l.target ? ` target="${esc(l.target)}"` : '';
      return `<a class="carousel-link ${cls}" href="${esc(href)}"${tgt}${nav}>${esc(l.label)}</a>`;
    }).join('\n            ');
    let visual = '', click = '';
    if (card.visual) {
      if (card.visual.clickRoute) click = ` data-click-dir="${esc(card.visual.clickRoute.dir)}" data-click-file="${esc(card.visual.clickRoute.file)}"`;
      if (card.visual.type === 'image') visual = `<img src="${esc(card.visual.src)}" alt="${esc(card.visual.alt || '')}" class="carousel-image" loading="lazy">`;
      if (card.visual.type === 'iframe') visual = `<div class="carousel-visual-overlay">&#9654; Open</div>\n        <iframe src="about:blank" data-carousel-src="${esc(card.visual.src)}" class="carousel-iframe" sandbox="allow-scripts allow-same-origin" title="${esc(card.visual.alt || '')}" loading="lazy"></iframe>`;
      if (card.visual.type === 'image' && click) visual = `<div class="carousel-visual-overlay">&#9654; Open</div>\n        ${visual}`;
    }
    const callouts = (card.callouts || []).map(c => `<span class="carousel-callout">${esc(c.text || c)}</span>`).join('\n            ');
    return `    <div class="carousel-card${i === 0 ? ' active' : ''}" data-card-index="${i}" data-idea="${ideaId}" style="border-top: 4px solid ${color}">
      <div class="carousel-card__text">
        <h2 class="carousel-card__title">${esc(card.title)}</h2>
        <p class="carousel-card__narrative">${esc(card.narrative)}</p>
        ${card.narrative_detail ? `<p class="carousel-card__detail">${esc(card.narrative_detail)}</p>` : ''}
        ${card.attribution ? `<p class="carousel-card__detail"><em>${esc(card.attribution)}</em></p>` : ''}
        <div class="carousel-card__callouts">
            ${callouts}
        </div>
        <div class="carousel-card__links">
            ${links}
        </div>
      </div>
      <div class="carousel-card__visual"${click}>
        ${visual}
      </div>
    </div>`;
  }).join('\n');
  const dots = cards.map((_, i) => `<button class="carousel-dot${i === 0 ? ' active' : ''}" data-index="${i}" aria-label="Card ${i + 1}"></button>`).join('\n        ');
  return `<div class="carousel" id="carousel">
  <div class="carousel-track" id="carousel-track">
${cardsHtml}
  </div>
  <div class="carousel-controls">
    <button class="carousel-arrow carousel-arrow--prev" id="carousel-prev" aria-label="Previous card">&larr;</button>
    <div class="carousel-dots" id="carousel-dots">
        ${dots}
    </div>
    <button class="carousel-arrow carousel-arrow--next" id="carousel-next" aria-label="Next card">&rarr;</button>
  </div>
</div>`;
}

function readingRoomHtml() {
  const L = meta.landing;
  const quotes = (L.quotes || []).map((q, i) => { gateQuote(q.text, q.src, `_meta.json landing.quotes[${i}]`);
    return `<figure class="rr-quote"><blockquote>${esc(q.text)}</blockquote><figcaption><a href="#${esc(q.src)}"${navAttrs(q.src)}>${esc(q.cite || q.src)}</a></figcaption></figure>`; }).join('\n      ');
  const listCard = sp => {
    const first = sp.stops[0].read[0];
    return `<a class="list-card" href="#${esc(first)}" data-spine="${esc(sp.id)}" style="--list-color:${esc(sp.color || 'var(--accent)')}">
        <span class="list-card__kind">${sp.idea ? 'Reading list · ' + esc(sp.idea) : 'Reading list'}</span>
        <span class="list-card__title">${esc(sp.title)}</span>
        <span class="list-card__blurb">${esc(sp.blurb)}</span>
        <span class="list-card__meter" data-spine-meter="${esc(sp.id)}"><span class="list-card__count">${sp.stops.length} stops</span></span>
      </a>`;
  };
  const main = spines.filter(sp => !sp.idea), ideas = spines.filter(sp => sp.idea);
  // the seventeen folders' cards (the name `shelves` belongs to the subjects read from shelves.json above)
  const folderCards = modules.map((m, i) => {
    const full = m.entry ? `${m.dir}/${m.entry}` : '';
    const mark = /^[0-9]{2}_/.test(m.dir) ? m.dir.slice(0, 2) : '··';
    const tag = full ? 'a' : 'div';
    return `<${tag} class="shelf-card"${full ? ` href="#${esc(full)}"${navAttrs(full)}` : ''}>
        <span class="shelf-card__mark">${esc(mark)}</span>
        <span class="shelf-card__body"><span class="shelf-card__name">${esc(m.name)}</span><span class="shelf-card__line">${esc(m.line)}</span><span class="shelf-card__dir">${esc(m.dir)}/</span></span>
      </${tag}>`;
  }).join('\n      ');
  const shelfCards = shelves.map((sh, i) => `<a class="subject-card" href="#shelf:${esc(sh.id)}">
        <span class="subject-card__n">${String(i + 1).padStart(2, '0')}</span>
        <span class="subject-card__t">${esc(sh.title)}</span>
        <span class="subject-card__l">${esc(sh.line || '')}</span>
      </a>`).join('\n      ');
  const shelvesSection = shelves.length ? `
  <section class="landing-section">
    <div class="landing-section__head"><p class="eyebrow">The shelves</p><h2>A library on an expansive subject: ${shelves.length} shelves.</h2></div>
    <div class="subject-grid">
      ${shelfCards}
    </div>
  </section>` : '';
  return `<header class="rr-hero">
    <p class="eyebrow">${esc(L.eyebrow || meta.site.brand)}</p>
    <h1 class="rr-title">${esc(L.title || meta.site.title)}</h1>
    <div class="rr-quotes">
      ${quotes}
    </div>
    <div class="rr-resume" id="rr-resume" hidden></div>
    <div class="rr-cta">
      <a class="btn btn-primary" href="#${esc(main[0] ? main[0].stops[0].read[0] : 'README.md')}" data-spine="${esc(main[0] ? main[0].id : '')}">Start reading</a>
      <a class="btn btn-ghost" href="#12_SINGULARITY/ChatGPT_Logs/I_am_the_Singularity.html"${navAttrs('12_SINGULARITY/ChatGPT_Logs/I_am_the_Singularity.html')}>Read the conversation</a>
    </div>
  </header>${shelvesSection}
  <section class="landing-section">
    <div class="landing-section__head"><p class="eyebrow">Reading lists</p><h2>Follow a path through the collection.</h2></div>
    <div class="list-grid list-grid--main">
      ${main.map(listCard).join('\n      ')}
    </div>
  </section>
  <section class="landing-section">
    <div class="landing-section__head"><p class="eyebrow">${esc(meta.ideas_heading || 'You are here to…')}</p><h2>Seven reasons, seven short lists.</h2></div>
    <div class="list-grid">
      ${ideas.map(listCard).join('\n      ')}
    </div>
  </section>
  <section class="landing-section">
    <div class="landing-section__head"><p class="eyebrow">${esc(meta.modules_heading || 'The folders')}</p><h2>Seventeen folders, every file hashed.</h2></div>
    <div class="shelf-grid">
      ${folderCards}
    </div>
  </section>
  <footer class="landing-footer">
    <p>${esc(meta.site.title)} · built from commit <span class="mono">${sha}</span> · <a href="CHECKSUMS.txt">CHECKSUMS.txt</a> · <a href="#RECORD_INDEX.md"${navAttrs('RECORD_INDEX.md')}>Record index</a> · <a href="${esc(meta.site.repo_url)}" target="_blank" rel="noopener">GitHub</a></p>
  </footer>`;
}

function landingHtml() {
  if (meta.landing) return readingRoomHtml();
  const sections = [carouselHtml()];
  const ideaCards = Object.entries(meta.ideas).map(([id, idea]) => {
    const inner = `<h3 class="module-card__title">${esc(idea.short)}</h3>
        <p class="module-card__desc">${esc(idea.label)}</p>`;
    const open = idea.file ? `<a class="module-card" data-idea="${id.toLowerCase()}" style="border-top: 3px solid ${idea.color}" href="#${esc(idea.file)}"${navAttrs(idea.file)}>` : `<div class="module-card" data-idea="${id.toLowerCase()}" style="border-top: 3px solid ${idea.color}">`;
    return `      ${open}
        ${inner}
      ${idea.file ? '</a>' : '</div>'}`;
  }).join('\n');
  sections.push(`<section class="landing-section">
  <h2>${esc(meta.ideas_heading || 'You are here to…')}</h2>
  <div class="module-grid">
${ideaCards}
  </div>
</section>`);
  const moduleCards = modules.map(m => {
    const badges = m.primary_ideas.map(id => `<span class="idea-badge idea-badge--${id.toLowerCase()}">${esc(meta.ideas[id].short)}</span>`).join('\n          ');
    const text = esc(m.description);
    const full = m.entry ? `${m.dir}/${m.entry}` : '';
    const open = full ? `<a class="module-card" data-idea="${(m.primary_ideas[0] || '').toLowerCase()}" href="#${esc(full)}"${navAttrs(full)}>` : `<div class="module-card">`;
    return `      ${open}
        <h3 class="module-card__title">${esc(m.label)}</h3>
        <p class="module-card__desc">${text}</p>
        <div class="module-card__badges">
          ${badges}
        </div>
      ${full ? '</a>' : '</div>'}`;
  }).join('\n');
  sections.push(`<section class="landing-section">
  <h2>${esc(meta.modules_heading || 'The collection')}</h2>
  <div class="module-grid">
${moduleCards}
  </div>
</section>`);
  sections.push(`<div class="landing-footer">
  <p>${esc(meta.site.title)} &mdash; built from commit ${sha} &mdash; <a href="CHECKSUMS.txt">CHECKSUMS.txt</a> &mdash; <a href="${esc(meta.site.repo_url)}" target="_blank">GitHub</a></p>
</div>`);
  return sections.join('\n\n');
}

function ideaCss() {
  return Object.entries(meta.ideas).map(([id, idea]) => {
    const n = id.toLowerCase();
    return `:root{--${n}-color:${idea.color}}\n.idea-badge--${n}{background:color-mix(in srgb,var(--${n}-color) 15%,transparent);color:var(--${n}-color);border:1px solid color-mix(in srgb,var(--${n}-color) 30%,transparent)}\na.module-card{text-decoration:none;color:inherit;display:block}`;
  }).join('\n');
}

// ---------------------------------------------------------------- assemble
const template = fs.readFileSync(path.join(SRC, 'template.html'), 'utf8');
const siteData = {
  site: meta.site, ideas: meta.ideas, modules, spines, titles, books, shelves,
  files: [...files].sort(),
  build: { commit: sha, generator: 'scripts/generate-site.js', date: new Date().toISOString() }
};
const tokens = {
  PAGE_TITLE: meta.site.title, BRAND: meta.site.brand, SUBTITLE: meta.site.subtitle, REPO_URL: meta.site.repo_url,
  IDEA_CSS: ideaCss(), BUILD_SHA: sha, LANDING_CONTENT: landingHtml(), SITE_DATA_JSON: JSON.stringify(siteData, null, 1)
};
let html = template;
for (const [k, v] of Object.entries(tokens)) { if (!html.includes(`{{${k}}}`)) die(`template.html has no {{${k}}}`); html = html.split(`{{${k}}}`).join(v); }
const leftover = html.match(/\{\{[A-Z_]+\}\}/);
if (leftover) die(`template token not filled: ${leftover[0]}`);

let bytes = 0;
if (!DRY) {
  if (fs.existsSync(OUT)) fs.rmSync(OUT, { recursive: true });
  fs.mkdirSync(path.join(OUT, 'site-assets'), { recursive: true });
  for (const f of fs.readdirSync(path.join(SRC, 'site-assets'))) fs.copyFileSync(path.join(SRC, 'site-assets', f), path.join(OUT, 'site-assets', f));
  // the book indexes (schema egpt.book/1), each written by its own build script; served as books/<id>.json
  if (fs.existsSync(path.join(SRC, 'books'))) { fs.mkdirSync(path.join(OUT, 'books'), { recursive: true });
    for (const f of fs.readdirSync(path.join(SRC, 'books'))) fs.copyFileSync(path.join(SRC, 'books', f), path.join(OUT, 'books', f)); }
  for (const e of bundle) {
    const data = contentFor(e);
    const dest = path.join(OUT, e.path);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.writeFileSync(dest, data);
    bytes += data.length;
  }
  fs.writeFileSync(path.join(OUT, 'library.html'), html);
  fs.writeFileSync(path.join(OUT, 'shelves.json'), JSON.stringify({ schema: shelfSpec.schema || 'egpt.shelves/1', generated_from: 'site-src/shelves.json', commit: sha, shelves }, null, 1) + '\n');
  fs.writeFileSync(path.join(OUT, 'spine.json'), JSON.stringify({ schema: spineSpec.schema, generated_from: 'site-src/spine.json', commit: sha, metaphor: spineSpec.metaphor, spines, titles }, null, 1) + '\n');
} else {
  for (const e of bundle) bytes += contentFor(e).length;
}
// the front page: index.html + images/, from the Courant template and site-src/frontpage/egpt.json
execFileSync('node', [path.join(__dirname, 'build-frontpage.js'), 'egpt', '--out', OUT, ...(DRY ? ['--dry-run'] : [])], { cwd: ROOT, stdio: 'inherit' });
console.log(`${DRY ? '[dry-run] ' : ''}site/: library.html (${Math.round(Buffer.byteLength(html) / 1024)} KB) + ${bundle.length} collection files (${(bytes / 1048576).toFixed(1)} MB) from HEAD ${sha}; ${modules.length} modules, ${Object.keys(meta.ideas).length} ideas, ${spines.length} reading lists (${spines.reduce((n, s) => n + s.stops.length, 0)} stops)`);
