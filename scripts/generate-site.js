#!/usr/bin/env node
/**
 * generate-site.js — builds site/ from the collection tracked at HEAD.
 *
 *   node scripts/generate-site.js            # write site/
 *   node scripts/generate-site.js --dry-run  # validate and report, write nothing
 *
 * The bundle is the collection itself (the evidence folders, guide/ and the root documents), copied
 * from HEAD — never from the working tree — plus one generated index.html (the viewer, from
 * site-src/template.html and site-src/_meta.json) and site-src/site-assets/. A git-lfs pointer at
 * HEAD is resolved from the working tree only when that file's SHA-256 equals the pointer's oid.
 * Every file the metadata names must be in the bundle; a missing one is an error, not a warning.
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
const inBundle = p => /^(guide|[0-9]{2}_[A-Z_]+)\//.test(p) || ROOT_FILES.has(p);

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
  modules.push({ dir: m.dir, label: m.label, title: mm.title || '', description, entry: entry || '',
    primary_ideas: mm.primary_ideas || [], highlights, subsections });
}

for (const c of meta.carousel || []) {
  for (const l of c.links || []) if (l.route) mustExist(`${l.route.dir}/${l.route.file}`, `carousel ${c.id} links`);
  if (c.visual && c.visual.src) mustExist(c.visual.src, `carousel ${c.id} visual`);
  if (c.visual && c.visual.clickRoute) mustExist(`${c.visual.clickRoute.dir}/${c.visual.clickRoute.file}`, `carousel ${c.id} visual.clickRoute`);
}

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

function landingHtml() {
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
  site: meta.site, ideas: meta.ideas, modules,
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
  for (const e of bundle) {
    const data = contentFor(e);
    const dest = path.join(OUT, e.path);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.writeFileSync(dest, data);
    bytes += data.length;
  }
  fs.writeFileSync(path.join(OUT, 'index.html'), html);
} else {
  for (const e of bundle) bytes += contentFor(e).length;
}
console.log(`${DRY ? '[dry-run] ' : ''}site/: index.html (${Math.round(Buffer.byteLength(html) / 1024)} KB) + ${bundle.length} collection files (${(bytes / 1048576).toFixed(1)} MB) from HEAD ${sha}; ${modules.length} modules, ${Object.keys(meta.ideas).length} ideas`);
