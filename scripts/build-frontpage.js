#!/usr/bin/env node
/**
 * build-frontpage.js — one source, N apps. Assembles an app's full-screen front page from
 * Cowork's Courant Group page (the template, read from the egpt-courantgroup checkout at the
 * commit pinned in site-src/frontpage/template.json) and the app's content spec
 * site-src/frontpage/<app>.json, whose fragments live in site-src/frontpage/<app>/.
 *
 *   node scripts/build-frontpage.js <app> [--out <dir>] [--dry-run]
 *
 * The template's nav, hero and footer are regenerated from the spec with the template's own
 * classes (or the hero is the app's own fragment, "hero": {"file": …}); its sections are reused
 * by id, or replaced by the app's fragments. FAIL LOUD:
 * - every <blockquote data-src="…"> or <q data-src="…"> in a fragment must be found, folded,
 *   in the named file at HEAD of this repository (a quotation the collection does not hold
 *   cannot be on the page); a <div data-cut-src …> is filled from the held file itself and
 *   gated block by block (see renderCut);
 * - every href to library.html#<path> must name a file tracked at HEAD (no dead deep links);
 * - every images/<name> the page uses must come from the template commit or the spec, or be a tile
 *   still from site-src/frontpage/exhibits/;
 * - the template owns zero tiles: it must carry a <div … data-exhibits></div> slot and no hand
 *   <a class="tile"; every slot is filled from the showcase roster (renderExhibits), and a page
 *   whose slot does not end up holding one tile per roster row is a build failure. A tile carries the
 *   row's tile line (TILE_LINE) and its still's alt (row.still.alt); tiles past the template's first
 *   desktop row (gridColumns(): the .grid rule's repeat(N,1fr)) load lazily;
 * - the template owns zero through-line text: its #proof carries exactly one EMPTY
 *   <… data-showcase-throughline></…>. A spec that declares "through_line": {"source": "served-roster"}
 *   gets it filled with the served roster's SHOWCASE_THROUGH_LINE (plain text); a spec that does not
 *   declares nothing and its marker stays empty. The assembled page is checked either way: every marker
 *   holds exactly the served text (declared) or nothing (undeclared); an unknown source fails.
 * The spec places the hero with a {"hero": true} entry in its sections (absent: right after the nav).
 * A spec with a "share" block also gets share.json beside index.html and its icon and share image in
 * images/share/ (scripts/lib/share.js; the file DEVPLANE's edge worker reads at serve time).
 * Pure Node; the one dependency is @descix/app-sdk, for the generated app-side bridge.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'site-src', 'frontpage');
const args = process.argv.slice(2);
const app = args[0];
const DRY = args.includes('--dry-run');
const outAt = args.indexOf('--out');
const OUT = outAt > 0 ? path.resolve(args[outAt + 1]) : path.join(ROOT, 'site');
function die(msg) { console.error('ERROR: ' + msg); process.exit(1); }
if (!app || app.startsWith('--')) die('usage: build-frontpage.js <app> [--out <dir>] [--dry-run]');
const esc = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// ---------------------------------------------------------------- the template, at its pinned commit
const tpl = JSON.parse(fs.readFileSync(path.join(SRC, 'template.json'), 'utf8'));
const TREPO = path.resolve(ROOT, tpl.repo);
if (!fs.existsSync(path.join(TREPO, '.git'))) die(`template checkout not found: ${TREPO}`);
const gitT = (...a) => execFileSync('git', a, { cwd: TREPO, maxBuffer: 1 << 28 });
let tplSha;
try { tplSha = gitT('rev-parse', '--verify', '--short', `${tpl.commit}^{commit}`).toString().trim(); }
catch (e) { die(`template commit ${tpl.commit} is not in ${TREPO}`); }
let template;
try { template = gitT('show', `${tpl.commit}:${tpl.page}`).toString('utf8'); }
catch (e) { die(`template page ${tpl.page} is not in template commit ${tplSha} (${tpl.repo}); template.json names the page and the commit together`); }
const templateImage = name => gitT('show', `${tpl.commit}:${path.posix.join(path.posix.dirname(tpl.page), 'images', name)}`);
// The roster is the one owner of the tiles; the template owns the section's shape and one empty slot.
{
  const handTiles = (template.match(/<a\b[^>]*\bclass="tile[\s"]/g) || []).length;
  const slots = (template.match(/<[a-z][a-z0-9]*\b[^>]*\bdata-exhibits\b[^>]*>/g) || []).length;
  if (handTiles || !slots) {
    die(`template ${tplSha} (${tpl.repo}:${tpl.page}) ${[handTiles ? `carries ${handTiles} hand-written <a class="tile"` : '', slots ? '' : 'declares no data-exhibits slot'].filter(Boolean).join(' and ')}; the roster is the one owner of tiles — bump template.json to a commit that has the slot and no tiles`);
  }
}
// The roster owns the through-line too: the template carries exactly one EMPTY marker, inside #proof.
const THROUGH_MARK = /<[a-z][a-z0-9]*\b[^>]*\bdata-showcase-throughline\b[^>]*>/g;
const THROUGH_SLOT = /<([a-z][a-z0-9]*)\b([^>]*\bdata-showcase-throughline\b[^>]*)>([\s\S]*?)<\/\1>/g;
{
  const where = `template ${tplSha} (${tpl.repo}:${tpl.page})`;
  const marks = (template.match(THROUGH_MARK) || []).length;
  if (marks !== 1) die(`${where} carries ${marks} data-showcase-throughline markers, needs exactly one (in #proof) — the roster's SHOWCASE_THROUGH_LINE fills it; bump template.json to a commit that has it`);
  const proof = (/<section class="sec[^"]*" id="proof">[\s\S]*?<\/section>/.exec(template) || [''])[0];
  const inProof = [...proof.matchAll(THROUGH_SLOT)];
  if (inProof.length !== 1) die(`${where}: the data-showcase-throughline marker is not a closed element inside <section id="proof">`);
  if (inProof[0][3].trim()) die(`${where}: the data-showcase-throughline marker holds hand text ("${inProof[0][3].trim().slice(0, 60)}…"); the roster is the one owner of the through-line — the template's marker is empty`);
}
// The template's proof grid: its desktop column count, read from the top-level .grid rule's
// repeat(N,1fr) (the @media overrides are narrower). Tiles past the first N load lazily.
function gridColumns() {
  const style = (/<style>([\s\S]*?)<\/style>/.exec(template) || [, ''])[1];
  const topLevel = style.replace(/@media[^{]*\{(?:[^{}]*\{[^{}]*\})*[^{}]*\}/g, '');
  const cols = [...topLevel.matchAll(/(?<![\w-])\.grid\{([^}]*)\}/g)]
    .map(m => /grid-template-columns:\s*repeat\((\d+),\s*1fr\)/.exec(m[1])).filter(Boolean);
  if (cols.length !== 1) die(`template ${tplSha} (${tpl.repo}:${tpl.page}) has ${cols.length} top-level .grid{grid-template-columns:repeat(N,1fr)} rules, needs exactly one — the tiles' lazy loading is derived from it`);
  return Number(cols[0][1]);
}

const bodyAt = template.indexOf('<body');
if (bodyAt < 0) die('template has no <body>');
const head = template.slice(0, bodyAt);
const body = template.slice(template.indexOf('>', bodyAt) + 1);
function block(re, name) { const m = re.exec(body); if (!m) die(`template ${name} not found`); return m[0]; }
const tplNav = block(/<nav class="nav">[\s\S]*?<\/nav>/, 'nav');
const tplHero = block(/<header class="hero"[\s\S]*?<\/header>/, 'hero');
const tplFooter = block(/<footer>[\s\S]*?<\/footer>/, 'footer');
const sections = {};
for (const m of body.matchAll(/<section class="sec[^"]*" id="([^"]+)">[\s\S]*?<\/section>/g)) sections[m[1]] = m[0];
const closes = (body.match(/<\/section>/g) || []).length;
if (closes !== Object.keys(sections).length) die(`template sections do not split cleanly: ${closes} closes, ${Object.keys(sections).length} sections`);

// ---------------------------------------------------------------- this repository at HEAD (the gate's ground)
const git = (...a) => execFileSync('git', a, { cwd: ROOT, maxBuffer: 1 << 28 });
const sha = git('rev-parse', '--short', 'HEAD').toString().trim();
const tracked = new Map(git('ls-tree', '-r', '-z', 'HEAD').toString('utf8').split('\0').filter(Boolean)
  .map(l => { const [meta, p] = l.split('\t'); return [p, meta.split(' ')[2]]; }));
const held = new Map();
function heldText(p) {
  if (!tracked.has(p)) die(`quotation source is not tracked at HEAD: ${p}`);
  if (!held.has(p)) {
    const text = git('cat-file', 'blob', tracked.get(p)).toString('utf8');
    // a JSON corpus file stores its text with \u escapes: fold the decoded strings, not the bytes
    const strings = [];
    const walk = v => { if (typeof v === 'string') strings.push(v); else if (v && typeof v === 'object') Object.values(v).forEach(walk); };
    if (p.endsWith('.json')) { walk(JSON.parse(text)); held.set(p, fold(strings.join('\n'))); }
    else held.set(p, fold(text));
  }
  return held.get(p);
}
function fold(s) {
  return s.normalize('NFKC')
    .replace(/[‘’‚′]/g, "'").replace(/[“”„″]/g, '"')
    .replace(/[‐-―−]/g, '-').replace(/…/g, '...').replace(/ /g, ' ')
    .replace(/-\n\s*/g, '').replace(/[*_`>#|]/g, '').replace(/\s+/g, ' ').trim();
}
const strip = h => h.replace(/<[^>]+>/g, '');
const unent = s => s.replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');

// ---------------------------------------------------------------- the app's spec
const specPath = path.join(SRC, `${app}.json`);
if (!fs.existsSync(specPath)) die(`no spec: ${specPath}`);
const spec = JSON.parse(fs.readFileSync(specPath, 'utf8'));
for (const k of ['title', 'description', 'brand', 'nav', 'hero', 'sections', 'footer', 'scripts']) if (!(k in spec)) die(`spec lacks ${k}`);
// "through_line": a DECLARED choice per spec, never a default (CEO #130: "approve: through-line on both pages,
// above the grid-note" — egpt-frqtl and egpt-courantgroup). Absent: the template's marker stays empty.
const THROUGH_SOURCES = ['served-roster'];
if (spec.through_line !== undefined) {
  const t = spec.through_line;
  if (!t || typeof t !== 'object' || Array.isArray(t) || Object.keys(t).join() !== 'source' || !THROUGH_SOURCES.includes(t.source)) {
    die(`${app}.json through_line ${JSON.stringify(t)}: the one form is {"source": ${THROUGH_SOURCES.map(x => JSON.stringify(x)).join(' | ')}} (omit it to leave the through-line slot empty)`);
  }
}
const throughDeclared = spec.through_line !== undefined;

const rewrite = (html, pairs) => (pairs || []).reduce((h, [from, to]) => {
  if (!h.includes(from)) die(`link rewrite target not present: ${from}`);
  return h.split(from).join(to);
}, html);
const link = a => `<a href="${esc(a.href)}"${/^https?:/.test(a.href) ? ' target="_blank" rel="noopener"' : ''}${a.class ? ` class="${esc(a.class)}"` : ''}${a.style ? ` style="${esc(a.style)}"` : ''}>${a.html || esc(a.text)}</a>`;

const LOGIN_BUTTON = '<a class="btn btn-primary btn-sm" id="descix-login" href="https://descix.net/">Log in with Powch</a>';
// The template's `.navlinks a{color}` and its :hover out-specify `.btn-primary`; the id rule keeps the button's ink.
const LOGIN_CSS = '#descix-login,#descix-login:hover{color:var(--cyan-ink)}';
function navHtml() {
  if (spec.nav === 'template') {
    let nav = rewrite(tplNav, spec.links);
    if (spec.login) {
      const at = '</a>\n  </div>\n</div></nav>';
      if (!nav.includes(at)) die('template nav: no place for the login button');
      nav = nav.replace(at, `</a>${LOGIN_BUTTON}\n  </div>\n</div></nav>`);
    }
    return nav;
  }
  return `<nav class="nav"><div class="wrap">
  <a class="brand" href="#top"><b>${esc(spec.brand.name)}</b><span>${esc(spec.brand.tag)}</span></a>
  <div class="navlinks">
    ${spec.nav.map(link).join('')}
  </div>
</div></nav>`;
}
function heroHtml() {
  if (spec.hero === 'template') return rewrite(tplHero, spec.links);
  if (spec.hero.file) {
    // a hero written as a fragment: it must be the page's <header class="hero" id="top">; gated below like every fragment
    const p = path.join(SRC, spec.hero.file);
    if (!fs.existsSync(p)) die(`hero fragment not found: ${spec.hero.file}`);
    const html = fs.readFileSync(p, 'utf8');
    if (!/^\s*<header class="hero[^"]*" id="top">/.test(html)) die(`${spec.hero.file}: a hero fragment starts with <header class="hero…" id="top">`);
    return html;
  }
  const h = spec.hero;
  return `<header class="hero" id="top">
  ${h.art ? `<div class="hero-art"><img src="${esc(h.art.src)}" alt="${esc(h.art.alt)}"></div>` : ''}
  <div class="wrap">
    <p class="eyebrow">${esc(h.eyebrow)}</p>
    <h1>${(h.src && !heldText(h.src).includes(fold(unent(strip(h.h1_html))))) ? die(`hero h1 not found in ${h.src}`) : h.h1_html}</h1>
    <p class="lede">${h.lede_html || esc(h.lede)}</p>
    <div class="cta-row">
      ${link({ ...h.primary, class: 'btn btn-primary' })}
      ${h.secondary ? link({ ...h.secondary, class: 'btn btn-ghost' }) : ''}
    </div>
    ${h.kicker_html ? `<p class="kicker">${h.kicker_html}</p>` : ''}
  </div>
</header>`;
}
function footerHtml() {
  if (spec.footer === 'template') return rewrite(tplFooter, spec.links);
  const f = spec.footer;
  return `<footer><div class="wrap">
  <div class="brand"><b>${esc(f.name)}</b><span>${esc(f.tag)}</span></div>
  <div class="row">
    ${f.links.map(link).join('')}
  </div>
  <p class="legal">${f.legal_html}</p>
</div></footer>`;
}

// ---------------------------------------------------------------- a verbatim cut from a held file, rendered at build time
// <div data-cut-src="<path>" data-cut-from="<first line>" data-cut-to="<last line>" data-cut-mark="<line>|<line>…"></div>
// The span between the two lines (inclusive) of the held file at HEAD becomes the element's content:
// headings, paragraphs, bold, italic and links, nothing else, nothing altered. Lines named in
// data-cut-mark get class="cut-mark". Every block is then gated like a quotation (it must be
// found, folded, in the file it came from), so a cut can never carry words the file does not.
const inline = t => esc(t)
  .replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>').replace(/\*([^*]+)\*/g, '<i>$1</i>')
  .replace(/\[\[([^\]]+)\]\]\((https?:[^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
  .replace(/\[([^\]]+)\]\((https?:[^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
function renderCut(el, file) {
  const attr = n => { const m = el.match(new RegExp(`data-cut-${n}="([^"]*)"`)); return m ? unent(m[1]) : ''; };
  const src = attr('src'), from = attr('from'), to = attr('to'), marks = attr('mark').split('|').map(x => x.trim()).filter(Boolean);
  if (!src || !from || !to) die(`${file}: a data-cut needs src, from and to`);
  if (!tracked.has(src)) die(`${file}: cut source is not tracked at HEAD: ${src}`);
  const lines = git('cat-file', 'blob', tracked.get(src)).toString('utf8').split('\n');
  const a = lines.findIndex(l => l.trim() === from), b = lines.findIndex((l, i) => i >= a && l.trim() === to);
  if (a < 0) die(`${file}: cut start not found in ${src}: "${from}"`);
  if (b < 0) die(`${file}: cut end not found in ${src} after its start: "${to}"`);
  const blocks = lines.slice(a, b + 1).join('\n').split(/\n\s*\n/).map(x => x.trim()).filter(Boolean);
  const heldF = heldText(src);
  let n = 0;
  const html = blocks.map(block => {
    const text = fold(block);
    if (!heldF.includes(text)) die(`${file}: cut block not found in ${src}: "${text.slice(0, 80)}…"`);
    n++;
    const mark = marks.some(m => block.replace(/^#+\s*/, '').replace(/[*_]/g, '').trim() === m) ? ' class="cut-mark"' : '';
    const h = block.match(/^(#{1,6})\s+(.*)$/);
    if (h) return `<h${Math.min(6, h[1].length + 1)}${mark}>${inline(h[2])}</h${Math.min(6, h[1].length + 1)}>`;
    return `<p${mark}>${inline(block.replace(/\s*\n\s*/g, ' '))}</p>`;
  }).join('\n');
  const unmarked = marks.filter(m => !blocks.some(bk => bk.replace(/^#+\s*/, '').replace(/[*_]/g, '').trim() === m));
  if (unmarked.length) die(`${file}: cut mark not a block of the cut: "${unmarked[0]}"`);
  gated += n;
  return el.replace(/>\s*<\/div>$/, `>${html}</div>`);
}

// ---------------------------------------------------------------- sections: reused by id, or the app's fragments (gated)
let gated = 0;
// A library deep link is either a path tracked at HEAD or a corpus record (#record:<id>) whose id
// the corpus holds at HEAD. Returns why the link is dead, or '' when it is live.
let recordIds = null;
function deadLink(target) {
  if (target.startsWith('record:')) {
    const CORPUS = '05_CORPUS/corpus/quotes.json';
    if (!tracked.has(CORPUS)) return `deep link to a corpus record, but ${CORPUS} is not tracked at HEAD`;
    if (!recordIds) recordIds = new Set(JSON.parse(git('cat-file', 'blob', tracked.get(CORPUS)).toString('utf8')).records.map(r => r.id));
    const id = target.slice('record:'.length);
    return recordIds.has(id) ? '' : `deep link to a corpus record the corpus does not hold: ${id}`;
  }
  // a shelf (#shelf:<id>) is a subject in site-src/shelves.json; a place in a book
  // (#book:<id>[/<part>[/<ref>]]) is checked against the book's own index in site-src/books/, by the
  // same reference forms the reader resolves: a question's key without punctuation ("1a"), a message
  // ("m12"), or an anchor one of the part's items lands on
  if (target.startsWith('shelf:')) {
    const f = path.join(ROOT, 'site-src', 'shelves.json'), id = target.slice('shelf:'.length);
    if (!fs.existsSync(f)) return `deep link to a shelf, but site-src/shelves.json does not exist`;
    return JSON.parse(fs.readFileSync(f, 'utf8')).shelves.some(x => x.id === id) ? '' : `deep link to a shelf that shelves.json does not hold: ${id}`;
  }
  if (target.startsWith('book:')) {
    const [id, part, ref] = target.slice('book:'.length).split('/');
    const f = path.join(ROOT, 'site-src', 'books', `${id}.json`);
    if (!fs.existsSync(f)) return `deep link to a book that site-src/books/ does not hold: ${id}`;
    if (part === undefined) return '';
    const pt = JSON.parse(fs.readFileSync(f, 'utf8')).parts.find(x => x.id === part);
    if (!pt) return `deep link to a part the book ${id} does not have: ${part}`;
    if (ref === undefined) return '';
    const refs = new Set(), frag = h => (h || '').split('#')[1];
    const add = it => { if (it.key !== undefined) refs.add(String(it.key).replace(/[^A-Za-z0-9]/g, '').toLowerCase());
      if (it.message !== undefined) refs.add(`m${it.message}`); if (frag(it.href)) refs.add(frag(it.href));
      for (const a of it.answers || []) if (frag(a.href)) refs.add(frag(a.href)); for (const sp of it.parts || []) add(sp); };
    pt.items.forEach(add);
    return refs.has(ref) ? '' : `deep link to a place the book ${id} does not have: ${part}/${ref}`;
  }
  const p = target.split('#')[0];
  return tracked.has(p) ? '' : `deep link to a path not tracked at HEAD: ${p}`;
}

// <nav class="jumbo-cards" data-shelves …></nav> is filled from site-src/shelves.json, the one set of
// shelves the viewer's landing and sidebar also read: a numbered card per shelf, its title, its card
// line (or its line), its thumbnail where it has one, linking the shelf's page in the viewer.
function renderShelves(html, file) {
  return html.replace(/<nav\b([^>]*)\bdata-shelves\b([^>]*)>\s*<\/nav>/g, (m, a, b) => {
    const f = path.join(ROOT, 'site-src', 'shelves.json');
    if (!fs.existsSync(f)) die(`${file}: data-shelves, but site-src/shelves.json does not exist`);
    const shelves = JSON.parse(fs.readFileSync(f, 'utf8')).shelves;
    if (!shelves.length) die(`${file}: data-shelves, but shelves.json holds no shelf`);
    const cards = shelves.map((sh, i) => `      <a class="jcard${sh.thumb ? ' jcard--thumb' : ''}" href="library.html#shelf:${esc(sh.id)}"><span class="jcard-n">${String(i + 1).padStart(2, '0')}</span>${sh.thumb ? `<img src="${esc(sh.thumb)}" alt="${esc(sh.thumb_alt || sh.title)}">` : ''}<p class="tag">${esc(sh.title)}</p><p>${esc(sh.card || sh.line)}</p></a>`);
    return `<nav${a}${b}>\n${cards.join('\n')}\n    </nav>`.replace(/\s+>/, '>');
  });
}

// ---------------------------------------------------------------- the showcase roster: the one owner of the tiles
// site-src/frontpage/exhibits.json names the app that serves the roster and its checkout; the rows are
// that checkout's SERVED copy, <repo>/site/pub/<upstream_sha>/ide/registry/exhibits.js, upstream_sha from
// <repo>/.descix/site-provenance.json. Read on the first data-exhibits slot only: a page without one never
// touches the app. The rows are ferried as exported (EXHIBITS) and a still is named by the roster's own
// sceneKey; nothing here re-enumerates a row's fields.
const STILLS = path.join(SRC, 'exhibits');
let roster = null;
function loadRoster() {
  if (roster) return roster;
  const cfgPath = path.join(SRC, 'exhibits.json');
  if (!fs.existsSync(cfgPath)) die(`data-exhibits slot, but ${cfgPath} does not exist`);
  const cfg = JSON.parse(fs.readFileSync(cfgPath, 'utf8'));
  const repo = path.resolve(ROOT, cfg.repo);
  const prov = path.join(repo, '.descix', 'site-provenance.json');
  if (!fs.existsSync(prov)) die(`roster unreadable: ${prov} does not exist (exhibits.json repo ${cfg.repo} is not a refreshed ${cfg.app} checkout)`);
  const up = JSON.parse(fs.readFileSync(prov, 'utf8')).upstream_sha;
  if (!/^[0-9a-f]{8}$/.test(up || '')) die(`roster unreadable: ${prov} carries no 8-hex upstream_sha (got ${JSON.stringify(up)})`);
  const mod = path.join(repo, 'site', 'pub', up, 'ide', 'registry', 'exhibits.js');
  if (!fs.existsSync(mod)) die(`roster unreadable: ${mod} does not exist (${cfg.app} serves build ${up})`);
  let X;
  try { X = require(mod); } catch (e) { die(`roster unreadable: ${mod} failed to load: ${e.message}`); }
  if (!Array.isArray(X.EXHIBITS) || !X.EXHIBITS.length || typeof X.sceneKey !== 'function') die(`roster unreadable: ${mod} exports no EXHIBITS rows / sceneKey`);
  const appSpec = path.join(SRC, `${cfg.app}.json`);
  if (!fs.existsSync(appSpec)) die(`exhibits.json app ${cfg.app} has no spec ${appSpec} (its self_host is where the tiles link)`);
  const origin = JSON.parse(fs.readFileSync(appSpec, 'utf8')).self_host;
  if (!/^https:\/\/[^/]+$/.test(origin || '')) die(`${appSpec} self_host ${JSON.stringify(origin)} is not an https origin; the tiles link the GYM there`);
  const stills = new Map(X.EXHIBITS.map(r => [r, `${X.sceneKey({ kind: r.kind, id: r.id, modeId: r.mode })}.png`]));
  // a still is present iff its row declares one (row.still): declared + missing, or present + undeclared, fails
  const onDisk = fs.existsSync(STILLS) ? fs.readdirSync(STILLS).filter(f => f.endsWith('.png')) : [];
  for (const [r, name] of stills) {
    if (!r.still) continue;
    if (!onDisk.includes(name)) die(`roster row ${r.id} declares a still (tick ${r.still.tick}) but ${path.join(STILLS, name)} does not exist — promote the instrument's capture there`);
    const pv = path.join(STILLS, name.replace(/\.png$/, '.provenance.json'));
    if (!fs.existsSync(pv)) die(`still ${name} has no provenance sidecar ${pv}`);
    if (JSON.parse(fs.readFileSync(pv, 'utf8')).sceneKey !== name.replace(/\.png$/, '')) die(`${pv} is not the provenance of ${name}`);
  }
  const declared = new Set([...stills].filter(([r]) => r.still).map(([, n]) => n));
  for (const f of onDisk) if (!declared.has(f)) die(`${path.join(STILLS, f)} is a still no roster row declares (served build ${up})`);
  // every declared still carries its alt (the roster's one home for it); a tile never ships alt=""
  for (const r of X.EXHIBITS) {
    if (r.still && (typeof r.still.alt !== 'string' || !r.still.alt.trim())) die(`roster row ${r.id} declares a still without its alt text (still.alt, served build ${up}) — a tile never ships alt=""`);
  }
  return (roster = { rows: X.EXHIBITS, stills, origin, build: up, X });
}
// The tile's one-line caption is the row's published short sentence (CEO #129: "approve: tile line stays,
// captions on the card"); what/why/how are the GYM card's. Required on every row: a roster served without it
// (an old build) refuses instead of rendering a tile with no line.
const TILE_LINE = 'tile';
function tileLine(r) {
  const v = r[TILE_LINE];
  if (typeof v !== 'string' || !v.trim()) die(`roster row ${r.id} has no ${TILE_LINE} line (served build ${loadRoster().build}) — the tile caption is the row's ${TILE_LINE}`);
  return v;
}
// The through-line: the served SHOWCASE_THROUGH_LINE, one paragraph of plain strings.
function throughLine() {
  const { X, build } = loadRoster();
  const p = X.SHOWCASE_THROUGH_LINE;
  if (!Array.isArray(p) || !p.length) die(`roster unreadable: served build ${build} exports no SHOWCASE_THROUGH_LINE paragraph (the template's data-showcase-throughline marker is filled from it)`);
  if (!p.every(s => typeof s === 'string' && s.length)) die(`served SHOWCASE_THROUGH_LINE (build ${build}) holds a non-string or empty segment; the through-line is plain text — the page has no link renderer`);
  return p.join('');
}
// The ONE writer of a tile's link: the GYM of the roster's app, absolute; on the app's own page (its spec's
// self_host is that origin) the relative form, which stays on the site (no target/rel).
const GYM = 'app.html?preset=compare';
function tileHref(row) {
  const { origin } = loadRoster();
  let q;
  if (row.kind === 'rung') q = `&walkthrough=${encodeURIComponent(row.id)}${row.mode ? `&mode=${encodeURIComponent(row.mode)}` : ''}`;
  else if (row.kind === 'experiment') q = `&experiment=${encodeURIComponent(row.id)}`;
  else die(`roster row ${row.id}: kind ${JSON.stringify(row.kind)} has no GYM link`);
  return spec.self_host === origin ? { href: GYM + q, rel: '' } : { href: `${origin}/${GYM}${q}`, rel: ' target="_blank" rel="noopener"' };
}
// <div … data-exhibits></div> (empty) is filled with one tile per roster row, in roster order.
function renderExhibits(html) {
  return html.replace(/<div\b([^>]*)\bdata-exhibits\b([^>]*)>\s*<\/div>/g, (m, a, b) => {
    const { rows, stills } = loadRoster();
    const eager = gridColumns();
    const tiles = rows.map((r, i) => {
      const { href, rel } = tileHref(r);
      const lazy = i >= eager ? ' loading="lazy" decoding="async"' : '';
      const img = r.still ? `<img src="images/${esc(stills.get(r))}" alt="${esc(r.still.alt)}"${lazy}>` : '';
      return `    <a class="tile${img ? '' : ' dark'}" href="${esc(href)}"${rel}>${img}<span class="cap"><b>${esc(r.title)}</b><span>${esc(tileLine(r))}</span><i>Open live ↗</i></span></a>`;
    });
    return `<div${a}data-exhibits${b}>\n${tiles.join('\n')}\n  </div>`;
  });
}
// <… data-showcase-throughline></…> (empty) is filled with the served through-line when the spec declares it.
function renderThroughLine(html) {
  if (!throughDeclared) return html;
  return html.replace(THROUGH_SLOT, (m, tag, attrs, inner) => (inner.trim() ? m : `<${tag}${attrs}>${esc(throughLine())}</${tag}>`));
}
// Every slot fill, applied to every part of the page whichever path produced it (template section or fragment).
const fillSlots = (html, file) => renderThroughLine(renderExhibits(renderShelves(html, file)));

function gateFragment(html, file) {
  html = fillSlots(html, file);
  html = html.replace(/<div\b[^>]*data-cut-src="[^"]+"[^>]*>\s*<\/div>/g, m => renderCut(m, file));
  for (const m of html.matchAll(/<(blockquote|q)\b[^>]*data-src="([^"]+)"[^>]*>([\s\S]*?)<\/\1>/g)) {
    const src = m[2];
    const quote = fold(unent(strip(m[3])));
    if (quote.length < 12) die(`${file}: quotation too short to gate: "${quote}"`);
    if (!heldText(src).includes(quote)) die(`${file}: quotation not found in ${src}: "${quote.slice(0, 80)}…"`);
    gated++;
  }
  for (const m of html.matchAll(/<(blockquote|q)\b(?![^>]*data-src=)[^>]*>/g)) die(`${file}: a <${m[1]}> without data-src (every quotation names its held file)`);
  for (const m of html.matchAll(/href="library\.html#([^"]+)"/g)) {
    const why = deadLink(decodeURIComponent(m[1]));
    if (why) die(`${file}: ${why}`);
  }
  return html;
}
// anchors: [{match, href}] — the one <a> in the section whose inner html contains `match` gets
// `href` (a relative href drops target/rel: it stays on this site). 0 or 2+ matches fail.
function reanchor(html, anchors) {
  for (const { match, href } of anchors || []) {
    const hits = [...html.matchAll(/<a\b[^>]*>[\s\S]*?<\/a>/g)].filter(m => m[0].includes(match));
    if (hits.length !== 1) die(`anchor match "${match}" hits ${hits.length} anchors (needs exactly 1)`);
    let a = hits[0][0].replace(/ href="[^"]*"/, ` href="${href}"`);
    if (!/^https?:/.test(href)) a = a.replace(/ target="_blank"/, '').replace(/ rel="noopener"/, '');
    html = html.replace(hits[0][0], a);
  }
  return html;
}
// {"hero": true} places the hero among the sections (at most once); without it the hero follows the nav
const heroOut = gateFragment(heroHtml(), 'hero');
const heroAt = spec.sections.filter(s => s.hero !== undefined);
if (heroAt.length > 1 || heroAt.some(s => s.hero !== true || Object.keys(s).length !== 1)) die(`sections: the hero is placed by exactly one {"hero": true} entry (got ${JSON.stringify(heroAt)})`);
const body_sections = spec.sections.map(s => {
  if (s.hero === true) return heroOut;
  if (s.use) {
    if (!sections[s.use]) die(`template has no section "${s.use}" (has: ${Object.keys(sections).join(', ')})`);
    return fillSlots(reanchor(rewrite(rewrite(sections[s.use], spec.links), s.links), s.anchors), `template section ${s.use}`);
  }
  if (s.file) {
    const p = path.join(SRC, s.file);
    if (!fs.existsSync(p)) die(`fragment not found: ${s.file}`);
    return gateFragment(fs.readFileSync(p, 'utf8'), s.file);
  }
  die(`section entry needs "use" or "file": ${JSON.stringify(s)}`);
});

// ---------------------------------------------------------------- scripts
// Behind the DeSciX App Shell this page takes the full CodeSite view (no chat panel). The bus is
// reached through the generated app-side SDK (DeSciX.ready() resolves the frame hop; never a
// hand-computed window.parent); standalone, ready() resolves without a shell and nothing changes.
// The page's ONE declaration of the view it wants from the DeSciX host. The contract's owner is the
// SDK template's documented sequence (DEVPLANE, 1 October 2026): await DeSciX.ready(), THEN
// view.set(mode), and only when view.available() says the host is listening, because a host that
// is not listening drops the call. What happened is recorded on <html data-descix-view>, in the
// vocabulary FRQTL's host-view.js uses, so a harness can read it: requested:CodeSite,
// not-listening, view-unpublished, standalone, embedded-no-bridge, sdk-absent.
const CODESITE = `(async function(){
  var d=document.documentElement, S=window.DeSciX, rec=function(x){d.dataset.descixView=x;};
  if(!S||typeof S.ready!=='function'){rec('sdk-absent');return;}
  rec('pending');
  var r; try{ r=await S.ready(); }catch(e){ rec('embedded-no-bridge'); d.dataset.descixViewDetail='ready() rejected: '+(e&&e.message?e.message:e); return; }
  if(!r||r.mode!=='shell'){ rec(r&&r.mode==='standalone'?'standalone':'embedded-no-bridge'); return; }
  var v=S.view;
  if(!v||typeof v.available!=='function'||typeof v.set!=='function'){ rec('view-unpublished'); return; }
  if(!v.available()){ rec('not-listening'); return; }
  v.set('CodeSite'); rec('requested:CodeSite');
})();`;
function forwarder() {
  const f = spec.scripts.forward;
  if (!f) return '';
  // a #<path> (it has a slash or a dot; in-page anchors have neither) forwards to the viewer, on
  // load and on any later hash change
  if (f.hash_to) return `<script>(function(){function f(){var h=location.hash;if(h.length>1&&/[\\/.]/.test(h))location.replace(${JSON.stringify(f.hash_to)}+h);}f();addEventListener('hashchange',f);})();</script>`;
  if (f.query_to) return `<script>if(location.search)location.replace(${JSON.stringify(f.query_to)}+location.search+location.hash);</script>`;
  die('scripts.forward needs hash_to or query_to');
}
// "sdk": true puts the generated app-side bridge on the page. Its bytes come from the ONE OWNER of
// that path, @descix/app-sdk's exported SITE_SCAFFOLD_BRIDGE (the pinned devDependency), never a
// path into another checkout.
let sdk = null;
if (spec.scripts.sdk) {
  let p;
  try { ({ SITE_SCAFFOLD_BRIDGE: p } = require('@descix/app-sdk/scaffold')); }
  catch (e) { die(`@descix/app-sdk is not installed (npm install): ${e.message}`); }
  if (!p || !fs.existsSync(p)) die(`@descix/app-sdk exports no SITE_SCAFFOLD_BRIDGE file: ${p}`);
  sdk = { name: path.basename(p), data: fs.readFileSync(p) };
  if (!sdk.data.toString('utf8').includes('GENERATED FILE')) die(`${p} is not the generated DeSciXAppSDK.js`);
}
if (spec.scripts.codesite && !sdk) die('scripts.codesite needs scripts.sdk: the CodeSite call goes through the SDK');
// the template's own inline scripts (its form and wallet mock), when the spec keeps its sections verbatim
const templateScripts = spec.scripts.template_scripts ? [...body.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1].trim()) : [];
if (spec.scripts.template_scripts && !templateScripts.length) die('template_scripts requested but the template has no inline script');
const scripts = [...templateScripts, spec.scripts.codesite ? CODESITE : '', ...(spec.scripts.extra || []).map(f => {
  const p = path.join(SRC, f); if (!fs.existsSync(p)) die(`script not found: ${f}`); return fs.readFileSync(p, 'utf8');
})].filter(Boolean);

// ---------------------------------------------------------------- head: the template's, retitled, stamped, forwarder first
let newHead = head
  .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(spec.title)}</title>`)
  .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${esc(spec.description)}">`);
if (!newHead.includes(`<title>${esc(spec.title)}</title>`)) die('title not placed');
newHead = newHead.replace('<meta charset="utf-8">', `<meta charset="utf-8">\n${forwarder()}`);
if (spec.css) newHead = newHead.replace('</style>', `\n/* ${app} */\n${spec.css}\n</style>`);
if (spec.login) {
  if (!newHead.includes('--cyan-ink:')) die('login button: template has no --cyan-ink token');
  newHead = newHead.replace('</style>', `\n/* login */\n${LOGIN_CSS}\n</style>`);
}
const stamp = `data-frontpage-app="${esc(app)}" data-frontpage-template="${tplSha}" data-frontpage-build="${sha}"`;

const footerOut = gateFragment(footerHtml(), 'footer');
const html = `${newHead}<body ${stamp}>

${navHtml()}

${(heroAt.length ? body_sections : [heroOut, ...body_sections]).join('\n\n')}

${footerOut}

${sdk ? `<script src="${sdk.name}"></script>\n` : ''}${scripts.map(s => `<script>\n${s}\n</script>`).join('\n')}${(spec.scripts.modules || []).map((m, i) => `${i || scripts.length ? '\n' : ''}<script type="module" src="${m}"></script>`).join('')}
</body>
</html>
`;

// every library deep link on the page, reused sections included, names a file tracked at HEAD
for (const m of html.matchAll(/href="(?:library\.html|https:\/\/egpt\.descix\.net\/)#([^"]+)"/g)) {
  const why = deadLink(decodeURIComponent(m[1]));
  if (why) die(why);
}
// every data-exhibits element on the assembled page holds exactly one tile per roster row
for (const m of html.matchAll(/<([a-z][a-z0-9]*)\b[^>]*\bdata-exhibits\b[^>]*>/g)) {
  const rest = html.slice(m.index + m[0].length);
  const inner = m[1] === 'div' ? rest.slice(0, rest.indexOf('</div>')) : '';
  const n = (inner.match(/<a\b[^>]*\bclass="tile[\s"]/g) || []).length;
  const want = loadRoster().rows.length;
  if (n !== want) die(`${app}: a data-exhibits slot holds ${n} tiles, the served roster (build ${loadRoster().build}) has ${want} rows — an unfilled slot cannot ship (${m[0]})`);
}
// every data-showcase-throughline marker on the assembled page holds exactly the served through-line (the
// spec declares it) or nothing (it does not); a declaration with no marker on the page fills nothing and fails
{
  const marks = (html.match(THROUGH_MARK) || []).length;
  const filled = [...html.matchAll(THROUGH_SLOT)];
  if (filled.length !== marks) die(`${app}: ${marks} data-showcase-throughline markers but ${filled.length} closed elements — a marker the fill cannot reach cannot ship`);
  if (throughDeclared && !marks) die(`${app}.json declares through_line but the page carries no data-showcase-throughline marker (it uses no #proof)`);
  for (const m of filled) {
    const got = unent(m[3]);
    if (throughDeclared && got !== throughLine()) die(`${app}: a data-showcase-throughline marker holds "${got.slice(0, 60)}…", not the served roster's SHOWCASE_THROUGH_LINE (build ${loadRoster().build})`);
    if (!throughDeclared && got.trim()) die(`${app}: a data-showcase-throughline marker holds "${got.slice(0, 60)}…", but ${app}.json declares no through_line — the slot stays empty`);
  }
}
// nothing on the page still points at the app's own public host (a self-link is a deep link)
if (spec.self_host && html.includes(spec.self_host)) die(`a self-link to ${spec.self_host} remains; rewrite it to a deep link`);

// ---------------------------------------------------------------- images: what the page uses, from the template commit or the spec
const used = new Set([...html.matchAll(/(?:src|href)="images\/([^"]+)"/g)].map(m => m[1]));
const extra = new Map((spec.images || []).map(i => [i.to.replace(/^images\//, ''), i.from]));
const images = new Map();
for (const name of used) {
  const still = roster && [...roster.stills.values()].includes(name);
  if (still && extra.has(name)) die(`spec declares image ${name}, which is a tile still; tile stills live only in site-src/frontpage/exhibits/`);
  if (still) images.set(name, fs.readFileSync(path.join(STILLS, name)));
  else if (extra.has(name)) {
    const from = extra.get(name);
    if (from.startsWith('frontpage:')) {
      const p = path.join(SRC, from.slice('frontpage:'.length));
      if (!fs.existsSync(p)) die(`image not found: ${p}`);
      images.set(name, fs.readFileSync(p));
    } else {
      if (!tracked.has(from)) die(`image source not tracked at HEAD: ${from}`);
      images.set(name, git('cat-file', 'blob', tracked.get(from)));
    }
  } else {
    try { images.set(name, templateImage(name)); }
    catch (e) { die(`image "${name}" is neither in the template commit nor declared in the spec`); }
  }
}
for (const name of extra.keys()) if (!used.has(name)) die(`spec declares an unused image: ${name}`);

if (!DRY) {
  fs.mkdirSync(path.join(OUT, 'images'), { recursive: true });
  for (const [name, data] of images) fs.writeFileSync(path.join(OUT, 'images', name), data);
  fs.writeFileSync(path.join(OUT, 'index.html'), html);
  if (spec.share) { try { require('./lib/share').emitShare(app, spec.share, SRC, OUT); } catch (e) { die(e.message); } }
  if (sdk) fs.writeFileSync(path.join(OUT, sdk.name), sdk.data);
}
console.log(`${DRY ? '[dry-run] ' : ''}${app}: index.html (${Math.round(Buffer.byteLength(html) / 1024)} KB) from template ${tplSha} at HEAD ${sha}; ${spec.sections.filter(s => !s.hero).length} sections${heroAt.length ? ' (hero placed among them)' : ''} (${spec.sections.filter(s => s.use).length} reused, ${spec.sections.filter(s => s.file).length} fragments), ${gated} quotations gated, ${images.size} images`);
