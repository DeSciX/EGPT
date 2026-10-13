// The front page's generated tile grid: build-frontpage.js renderExhibits + fillSlots, the template
// precondition, the one link writer, the stills home and the final sweep.
//
//   node --test scripts/test/build-frontpage-exhibits.test.js
//
// Each case runs the REAL generator (copied into a throwaway repository) against the REAL served roster
// — the egpt-frqtl checkout named by site-src/frontpage/exhibits.json, at the build its
// .descix/site-provenance.json names — and the real stills home. A template, a spec and the stills are
// the inputs a case varies; a case that needs a row WITHOUT a still serves the real roster with one row's
// still withdrawn (world({ undeclare })), so it runs whatever the live roster declares. No checkout of the
// served roster is a FAILURE here, never a skip.
'use strict';
const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync, spawnSync } = require('child_process');

const REAL = path.resolve(__dirname, '..', '..');
const REAL_SRC = path.join(REAL, 'site-src', 'frontpage');
const cfg = JSON.parse(fs.readFileSync(path.join(REAL_SRC, 'exhibits.json'), 'utf8'));
const servedRepo = path.resolve(REAL, cfg.repo);
const up = JSON.parse(fs.readFileSync(path.join(servedRepo, '.descix', 'site-provenance.json'), 'utf8')).upstream_sha;
const registry = path.join(servedRepo, 'site', 'pub', up, 'ide', 'registry');
const X = require(path.join(registry, 'exhibits.js'));
const ORIGIN = JSON.parse(fs.readFileSync(path.join(REAL_SRC, `${cfg.app}.json`), 'utf8')).self_host;
const key = r => X.sceneKey({ kind: r.kind, id: r.id, modeId: r.mode });

const SLOT = '<div class="grid" data-exhibits></div>';
const THROUGH = '<p class="grid-note" data-showcase-throughline></p>';
const GRID_CSS = '.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}\n@media (max-width:820px){.grid{grid-template-columns:repeat(2,1fr)}}';
// The template shape the generator reads: the proof grid's CSS, the slot, the through-line marker under it.
const page = (grid, { css = GRID_CSS, through = THROUGH, plain = '<p>plain</p>' } = {}) => `<!doctype html><html><head><meta charset="utf-8"><title>t</title><meta name="description" content="d"><style>
${css}
</style></head><body>
<nav class="nav"><div class="wrap"><a class="brand" href="#top">T</a></div></nav>
<header class="hero" id="top"><div class="wrap">h</div></header>
<section class="sec" id="proof"><div class="wrap">
  <div class="sec-head"><p class="eyebrow">Proof</p></div>
  ${grid}
  ${through}
  <p class="grid-note">note</p>
</div></section>
<section class="sec" id="plain"><div class="wrap">${plain}</div></section>
<footer><div class="wrap">f</div></footer>
</body></html>
`;
const spec = (selfHost, sections) => ({
  title: 'T', description: 'D', brand: { name: 'B', tag: 't' }, nav: [],
  hero: { eyebrow: 'e', h1_html: 'H', lede: 'l', primary: { text: 'p', href: '#top' } },
  sections, links: [], self_host: selfHost,
  footer: { name: 'F', tag: 't', links: [], legal_html: 'L' }, scripts: {},
});
const git = (cwd, ...a) => execFileSync('git', a, { cwd, stdio: ['ignore', 'pipe', 'pipe'] }).toString().trim();

// A throwaway world: <T>/ev (this repository's generator + inputs, committed), <T>/tpl (the template repo),
// <T>/frqtl (a served checkout whose registry is the real one, symlinked).
// undeclare: a roster row id the served checkout serves WITHOUT its still (its still files leave the home too).
// serve: a JS object expression over X (the real served module) whose keys replace the served exports —
// how a case plants a fault in the SERVED roster without touching it (e.g. one row's still.alt stripped).
// fragments: { <file>: html } written beside the specs.
function world({ template = page(SLOT), stills = 'real', provenance = true, specs = {}, undeclare = null, serve = null, fragments = {} } = {}) {
  const T = fs.mkdtempSync(path.join(os.tmpdir(), 'frontpage-exhibits-'));
  const tpl = path.join(T, 'tpl');
  fs.mkdirSync(path.join(tpl, 'site'), { recursive: true });
  fs.writeFileSync(path.join(tpl, 'site', 'index.html'), template);
  git(tpl, 'init', '-q'); git(tpl, 'add', '.'); git(tpl, '-c', 'user.name=t', '-c', 'user.email=t@t', 'commit', '-qm', 'tpl');
  const frqtl = path.join(T, 'frqtl');
  fs.mkdirSync(path.join(frqtl, '.descix'), { recursive: true });
  fs.mkdirSync(path.join(frqtl, 'site', 'pub', up, 'ide'), { recursive: true });
  const served = path.join(frqtl, 'site', 'pub', up, 'ide', 'registry');
  if (undeclare && !X.EXHIBITS.some(r => r.id === undeclare && r.still)) throw new Error(`fixture: roster row ${undeclare} declares no still to withdraw`);
  const override = [undeclare ? `EXHIBITS: X.EXHIBITS.map(r => (r.id === ${JSON.stringify(undeclare)} ? { ...r, still: undefined } : r))` : '', serve ? `...(${serve})` : ''].filter(Boolean);
  if (!override.length) fs.symlinkSync(registry, served);
  else {
    fs.mkdirSync(served);
    for (const f of fs.readdirSync(registry)) if (f !== 'exhibits.js') fs.symlinkSync(path.join(registry, f), path.join(served, f));
    fs.writeFileSync(path.join(served, 'exhibits.js'), `'use strict';
const X = require(${JSON.stringify(path.join(registry, 'exhibits.js'))});
module.exports = { ...X, ${override.join(', ')} };
`);
  }
  const rows = X.EXHIBITS.map(r => (r.id === undeclare ? { ...r, still: undefined } : r));
  const withdrawn = undeclare ? `${key(X.EXHIBITS.find(r => r.id === undeclare))}.` : null;
  if (provenance) fs.writeFileSync(path.join(frqtl, '.descix', 'site-provenance.json'), JSON.stringify({ upstream_sha: up }));
  const ev = path.join(T, 'ev');
  const src = path.join(ev, 'site-src', 'frontpage');
  fs.mkdirSync(path.join(ev, 'scripts'), { recursive: true });
  fs.mkdirSync(path.join(src, 'exhibits'), { recursive: true });
  fs.copyFileSync(path.join(REAL, 'scripts', 'build-frontpage.js'), path.join(ev, 'scripts', 'build-frontpage.js'));
  fs.writeFileSync(path.join(src, 'template.json'), JSON.stringify({ repo: '../tpl', commit: git(tpl, 'rev-parse', '--short', 'HEAD'), page: 'site/index.html' }));
  fs.writeFileSync(path.join(src, 'exhibits.json'), JSON.stringify({ app: 'frqtl', repo: '../frqtl' }));
  const all = { frqtl: spec(ORIGIN, [{ use: 'proof' }]), other: spec('https://other.example', [{ use: 'proof' }]), ...specs };
  for (const [name, s] of Object.entries(all)) fs.writeFileSync(path.join(src, `${name}.json`), JSON.stringify(s));
  for (const [name, html] of Object.entries(fragments)) fs.writeFileSync(path.join(src, name), html);
  const home = path.join(REAL_SRC, 'exhibits');
  const real = fs.readdirSync(home);
  const kept = withdrawn ? real.filter(f => !f.startsWith(withdrawn)) : real;
  for (const f of (stills === 'real' ? kept : stills(kept))) fs.copyFileSync(path.join(home, f), path.join(src, 'exhibits', f));
  git(ev, 'init', '-q'); git(ev, 'add', '.'); git(ev, '-c', 'user.name=t', '-c', 'user.email=t@t', 'commit', '-qm', 'ev');
  return {
    T, rows,
    build(app) {
      const out = path.join(T, 'out', app);
      const r = spawnSync(process.execPath, [path.join(ev, 'scripts', 'build-frontpage.js'), app, '--out', out], { cwd: ev, encoding: 'utf8' });
      const html = fs.existsSync(path.join(out, 'index.html')) ? fs.readFileSync(path.join(out, 'index.html'), 'utf8') : null;
      return { code: r.status, err: r.stderr, html, out };
    },
  };
}
const tiles = html => [...html.match(/<div\b[^>]*data-exhibits[^>]*>([\s\S]*?)<\/div>/)[1].matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)]
  .map(([, attrs, body]) => {
    const img = (body.match(/<img\b[^>]*>/) || [])[0] || '';
    const a = n => { const m = img.match(new RegExp(`\\s${n}="([^"]*)"`)); return m ? unent(m[1]) : null; };
    return { attrs, href: attrs.match(/href="([^"]*)"/)[1].replace(/&amp;/g, '&'), img: a('src'), alt: a('alt'), loading: a('loading'), decoding: a('decoding'),
      title: body.match(/<b>([\s\S]*?)<\/b>/)[1], line: unent((body.match(/<\/b><span>([\s\S]*?)<\/span>/) || [])[1] || '') };
  });
const unent = s => s.replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
// every filled through-line marker on a page: its decoded text
const throughLines = html => [...html.matchAll(/<([a-z][a-z0-9]*)\b[^>]*\bdata-showcase-throughline\b[^>]*>([\s\S]*?)<\/\1>/g)].map(m => unent(m[2]));
const THROUGH_TEXT = X.SHOWCASE_THROUGH_LINE.join('');
const gymLink = r => `app.html?preset=compare&walkthrough=${r.id}${r.mode ? `&mode=${r.mode}` : ''}`;

test('another site\'s page: one tile per roster row, in order, absolute GYM links, stills iff declared', () => {
  const w = world({ undeclare: X.EXHIBITS.find(x => x.still).id });
  const r = w.build('other');
  assert.equal(r.code, 0, r.err);
  const got = tiles(r.html);
  assert.equal(got.length, w.rows.length);
  w.rows.forEach((row, i) => {
    assert.equal(got[i].title, row.title.replace(/&/g, '&amp;'));
    assert.equal(got[i].href, `${ORIGIN}/${gymLink(row)}`);
    assert.match(got[i].attrs, / target="_blank" rel="noopener"/);
    assert.equal(got[i].img, row.still ? `images/${key(row)}.png` : null);
    assert.equal(/class="tile dark"/.test(got[i].attrs), !row.still);
    if (row.still) assert.ok(fs.existsSync(path.join(r.out, 'images', `${key(row)}.png`)), `${key(row)}.png written`);
  });
  assert.ok(w.rows.some(x => x.still) && w.rows.some(x => !x.still), 'the roster exercises both tile forms');
});

test('the roster app\'s own page (self_host = the GYM origin): relative links, no target', () => {
  const r = world().build('frqtl');
  assert.equal(r.code, 0, r.err);
  const got = tiles(r.html);
  X.EXHIBITS.forEach((row, i) => { assert.equal(got[i].href, gymLink(row)); assert.doesNotMatch(got[i].attrs, /target=/); });
});

test('{"hero": true} places the hero among the sections; two placements refuse', () => {
  const w = world({ specs: { placed: spec('https://p.example', [{ use: 'proof' }, { hero: true }, { use: 'plain' }]), twice: spec('https://p.example', [{ hero: true }, { use: 'proof' }, { hero: true }]) } });
  const r = w.build('placed');
  assert.equal(r.code, 0, r.err);
  const after = r.html.slice(r.html.indexOf('</nav>'));
  assert.ok(after.indexOf('id="proof"') < after.indexOf('<header class="hero"') && after.indexOf('<header class="hero"') < after.indexOf('id="plain"'));
  const d = world().build('other');
  assert.ok(d.html.slice(d.html.indexOf('</nav>')).indexOf('<header class="hero"') < d.html.indexOf('id="proof"'), 'no placement: the hero follows the nav');
  const t = w.build('twice');
  assert.equal(t.code, 1); assert.match(t.err, /exactly one \{"hero": true\}/);
});

test('template precondition: hand tiles refuse', () => {
  const r = world({ template: page(`<div class="grid" data-exhibits></div><a class="tile" href="x"><b>hand</b></a>`) }).build('other');
  assert.equal(r.code, 1); assert.match(r.err, /carries 1 hand-written <a class="tile"/); assert.equal(r.html, null);
});

test('template precondition: no data-exhibits slot refuses, even for a page that does not use the section', () => {
  const w = world({ template: page('<div class="grid"></div>'), specs: { plainonly: spec('https://p.example', [{ use: 'plain' }]) } });
  for (const app of ['other', 'plainonly']) {
    const r = w.build(app);
    assert.equal(r.code, 1); assert.match(r.err, /declares no data-exhibits slot/);
  }
});

test('roster unreadable refuses, naming the path; a page without the slot never reads it', () => {
  const w = world({ provenance: false, specs: { plainonly: spec('https://p.example', [{ use: 'plain' }]) } });
  const r = w.build('other');
  assert.equal(r.code, 1); assert.match(r.err, /roster unreadable: .*site-provenance\.json does not exist/);
  assert.equal(w.build('plainonly').code, 0);
});

test('final sweep: a slot the fill cannot reach refuses (unfilled grid)', () => {
  const r = world({ template: page('<div class="grid" data-exhibits>&nbsp;</div>') }).build('other');
  assert.equal(r.code, 1); assert.match(r.err, /a data-exhibits slot holds 0 tiles, the served roster \(build [0-9a-f]{8}\) has \d+ rows/);
});

test('final sweep: a slot on a non-div element refuses', () => {
  const r = world({ template: page('<ul class="grid" data-exhibits></ul>') }).build('other');
  assert.equal(r.code, 1); assert.match(r.err, /holds 0 tiles/);
});

test('stills: a declared still missing from the home refuses, naming the row', () => {
  const declared = X.EXHIBITS.find(x => x.still);
  const r = world({ stills: fs_ => fs_.filter(f => !f.startsWith(key(declared) + '.')) }).build('other');
  assert.equal(r.code, 1); assert.match(r.err, new RegExp(`roster row ${declared.id} declares a still .* does not exist`));
});

test('stills: a still no row declares refuses (no per-page image lists by the back door)', () => {
  const undeclared = X.EXHIBITS.find(x => x.still);
  const w = world({ undeclare: undeclared.id });
  const home = path.join(w.T, 'ev', 'site-src', 'frontpage', 'exhibits');
  fs.copyFileSync(path.join(home, fs.readdirSync(home).find(f => f.endsWith('.png'))), path.join(home, `${key(undeclared)}.png`));
  const r = w.build('other');
  assert.equal(r.code, 1); assert.match(r.err, new RegExp(`${key(undeclared)}\\.png is a still no roster row declares`));
});

test('stills: a still without its provenance sidecar refuses', () => {
  const declared = X.EXHIBITS.find(x => x.still);
  const r = world({ stills: fs_ => fs_.filter(f => f !== `${key(declared)}.provenance.json`) }).build('other');
  assert.equal(r.code, 1); assert.match(r.err, /has no provenance sidecar/);
});

// ---------------------------------------------------------------- the tile's copy: its line and its still's alt
test('tile copy: the caption line is the row\'s tile line and the img alt is its still.alt, from the served roster', () => {
  const r = world().build('other');
  assert.equal(r.code, 0, r.err);
  const got = tiles(r.html);
  X.EXHIBITS.forEach((row, i) => {
    assert.equal(got[i].line, row.tile, `tile ${i + 1} line`);
    if (row.still) assert.equal(got[i].alt, row.still.alt, `tile ${i + 1} alt`);
  });
  assert.ok(X.EXHIBITS.some(row => row.tile !== row.what), 'the roster distinguishes tile from what, so this case can tell the fields apart');
});

test('tile copy: a declared still without its alt refuses, naming the row; no alt="" ships', () => {
  const row = X.EXHIBITS.find(x => x.still);
  for (const alt of ['undefined', "' '"]) {
    const w = world({ serve: `{ EXHIBITS: X.EXHIBITS.map(r => (r.id === ${JSON.stringify(row.id)} ? { ...r, still: { ...r.still, alt: ${alt} } } : r)) }` });
    const r = w.build('other');
    assert.equal(r.code, 1, `alt ${alt}: ${r.err}`); assert.match(r.err, new RegExp(`roster row ${row.id} declares a still without its alt text`)); assert.equal(r.html, null);
  }
});

test('tile copy: a row without its tile line refuses, naming the row', () => {
  const row = X.EXHIBITS[0];
  const r = world({ serve: `{ EXHIBITS: X.EXHIBITS.map(r => (r.id === ${JSON.stringify(row.id)} ? { ...r, tile: null } : r)) }` }).build('other');
  assert.equal(r.code, 1); assert.match(r.err, new RegExp(`roster row ${row.id} has no tile line`)); assert.equal(r.html, null);
});

// ---------------------------------------------------------------- lazy loading, derived from the template's grid
const lazyOf = html => tiles(html).filter(t => t.img).map(t => t.loading === 'lazy' && t.decoding === 'async');
test('lazy: tiles past the template grid\'s first desktop row (repeat(N,1fr)) load lazily, the first N eagerly', () => {
  const r = world().build('other');
  assert.equal(r.code, 0, r.err);
  assert.ok(X.EXHIBITS.every(x => x.still), 'every row has a still, so every tile index is exercised');
  assert.deepEqual(lazyOf(r.html), X.EXHIBITS.map((_, i) => i >= 3));
  for (const t of tiles(r.html).slice(0, 3)) { assert.equal(t.loading, null); assert.equal(t.decoding, null); }
});

test('lazy: the column count is read from the template, never a literal (repeat(2,1fr) → tile 3 lazy; repeat(4,1fr) under a narrower @media → 4 eager)', () => {
  const two = world({ template: page(SLOT, { css: '.grid{display:grid;grid-template-columns:repeat(2,1fr)}' }) }).build('other');
  assert.equal(two.code, 0, two.err);
  assert.deepEqual(lazyOf(two.html), X.EXHIBITS.map((_, i) => i >= 2));
  const four = world({ template: page(SLOT, { css: '@media (max-width:820px){.grid{grid-template-columns:repeat(2,1fr)}}\n.grid{grid-template-columns:repeat(4,1fr)}' }) }).build('other');
  assert.equal(four.code, 0, four.err);
  assert.deepEqual(lazyOf(four.html), X.EXHIBITS.map((_, i) => i >= 4));
});

test('lazy: a template whose .grid has no repeat(N,1fr) refuses (no default column count)', () => {
  for (const css of ['.grid{display:grid;gap:18px}', '@media (max-width:820px){.grid{grid-template-columns:repeat(2,1fr)}}']) {
    const r = world({ template: page(SLOT, { css }) }).build('other');
    assert.equal(r.code, 1, css); assert.match(r.err, /has 0 top-level \.grid\{grid-template-columns:repeat\(N,1fr\)\} rules/); assert.equal(r.html, null);
  }
});

// ---------------------------------------------------------------- the through-line slot
test('through-line: the template marker is filled with the served SHOWCASE_THROUGH_LINE, once, under the grid and above the grid-note', () => {
  for (const app of ['frqtl', 'other']) {
    const r = world().build(app);
    assert.equal(r.code, 0, r.err);
    assert.deepEqual(throughLines(r.html), [THROUGH_TEXT]);
    const proof = r.html.slice(r.html.indexOf('id="proof"'));
    const at = proof.indexOf('data-showcase-throughline');
    assert.ok(proof.lastIndexOf('data-exhibits', at) >= 0 && at < proof.indexOf('<p class="grid-note">note</p>'), 'the through-line sits between the grid and the grid-note');
  }
});

test('through-line precondition: a template without the marker refuses (every page, even one not using #proof)', () => {
  const w = world({ template: page(SLOT, { through: '' }), specs: { plainonly: spec('https://p.example', [{ use: 'plain' }]) } });
  for (const app of ['other', 'plainonly']) {
    const r = w.build(app);
    assert.equal(r.code, 1); assert.match(r.err, /carries 0 data-showcase-throughline markers, needs exactly one/); assert.equal(r.html, null);
  }
});

test('through-line precondition: hand text in the marker, two markers, or a marker outside #proof refuse', () => {
  const hand = world({ template: page(SLOT, { through: '<p class="grid-note" data-showcase-throughline>typed by hand</p>' }) }).build('other');
  assert.equal(hand.code, 1); assert.match(hand.err, /marker holds hand text \("typed by hand/);
  const two = world({ template: page(SLOT, { through: THROUGH + THROUGH }) }).build('other');
  assert.equal(two.code, 1); assert.match(two.err, /carries 2 data-showcase-throughline markers/);
  const outside = world({ template: page(SLOT, { through: '', plain: THROUGH }) }).build('other');
  assert.equal(outside.code, 1); assert.match(outside.err, /is not a closed element inside <section id="proof">/);
});

test('through-line: a fragment page carrying the marker is filled; a fragment marker with hand text refuses at the final sweep', () => {
  const w = world({
    fragments: { 'frag.html': `<section class="sec" id="frag"><div class="wrap">${THROUGH}</div></section>`, 'hand.html': '<section class="sec" id="hand"><div class="wrap"><p data-showcase-throughline>hand</p></div></section>' },
    specs: { frag: spec('https://p.example', [{ file: 'frag.html' }]), hand: spec('https://p.example', [{ file: 'hand.html' }]) },
  });
  const ok = w.build('frag');
  assert.equal(ok.code, 0, ok.err); assert.deepEqual(throughLines(ok.html), [THROUGH_TEXT]);
  const bad = w.build('hand');
  assert.equal(bad.code, 1); assert.match(bad.err, /holds "hand…", not the served roster's SHOWCASE_THROUGH_LINE/);
});

test('through-line: a served through-line that is not plain text refuses (the page has no link renderer); a missing one refuses', () => {
  const link = world({ serve: `{ SHOWCASE_THROUGH_LINE: ['FRQTL ', { text: 'links', href: 'https://example.org' }] }` }).build('other');
  assert.equal(link.code, 1); assert.match(link.err, /holds a non-string or empty segment; the through-line is plain text/);
  const gone = world({ serve: `{ SHOWCASE_THROUGH_LINE: undefined }` }).build('other');
  assert.equal(gone.code, 1); assert.match(gone.err, /exports no SHOWCASE_THROUGH_LINE paragraph/);
});
