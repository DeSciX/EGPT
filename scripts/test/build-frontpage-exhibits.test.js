// The front page's generated tile grid: build-frontpage.js renderExhibits + fillSlots, the template
// precondition, the one link writer, the stills home and the final sweep.
//
//   node --test scripts/test/build-frontpage-exhibits.test.js
//
// Each case runs the REAL generator (copied into a throwaway repository) against the REAL served roster
// — the egpt-frqtl checkout named by site-src/frontpage/exhibits.json, at the build its
// .descix/site-provenance.json names — and the real stills home. A template, a spec and the stills are
// the inputs a case varies. No checkout of the served roster is a FAILURE here, never a skip.
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
const page = grid => `<!doctype html><html><head><meta charset="utf-8"><title>t</title><meta name="description" content="d"><style>
</style></head><body>
<nav class="nav"><div class="wrap"><a class="brand" href="#top">T</a></div></nav>
<header class="hero" id="top"><div class="wrap">h</div></header>
<section class="sec" id="proof"><div class="wrap">
  <div class="sec-head"><p class="eyebrow">Proof</p></div>
  ${grid}
</div></section>
<section class="sec" id="plain"><div class="wrap"><p>plain</p></div></section>
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
function world({ template = page(SLOT), stills = 'real', provenance = true, specs = {} } = {}) {
  const T = fs.mkdtempSync(path.join(os.tmpdir(), 'frontpage-exhibits-'));
  const tpl = path.join(T, 'tpl');
  fs.mkdirSync(path.join(tpl, 'site'), { recursive: true });
  fs.writeFileSync(path.join(tpl, 'site', 'index.html'), template);
  git(tpl, 'init', '-q'); git(tpl, 'add', '.'); git(tpl, '-c', 'user.name=t', '-c', 'user.email=t@t', 'commit', '-qm', 'tpl');
  const frqtl = path.join(T, 'frqtl');
  fs.mkdirSync(path.join(frqtl, '.descix'), { recursive: true });
  fs.mkdirSync(path.join(frqtl, 'site', 'pub', up, 'ide'), { recursive: true });
  fs.symlinkSync(registry, path.join(frqtl, 'site', 'pub', up, 'ide', 'registry'));
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
  const home = path.join(REAL_SRC, 'exhibits');
  const real = fs.readdirSync(home);
  for (const f of (stills === 'real' ? real : stills(real))) fs.copyFileSync(path.join(home, f), path.join(src, 'exhibits', f));
  git(ev, 'init', '-q'); git(ev, 'add', '.'); git(ev, '-c', 'user.name=t', '-c', 'user.email=t@t', 'commit', '-qm', 'ev');
  return {
    T,
    build(app) {
      const out = path.join(T, 'out', app);
      const r = spawnSync(process.execPath, [path.join(ev, 'scripts', 'build-frontpage.js'), app, '--out', out], { cwd: ev, encoding: 'utf8' });
      const html = fs.existsSync(path.join(out, 'index.html')) ? fs.readFileSync(path.join(out, 'index.html'), 'utf8') : null;
      return { code: r.status, err: r.stderr, html, out };
    },
  };
}
const tiles = html => [...html.match(/<div\b[^>]*data-exhibits[^>]*>([\s\S]*?)<\/div>/)[1].matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)]
  .map(([, attrs, body]) => ({ attrs, href: attrs.match(/href="([^"]*)"/)[1].replace(/&amp;/g, '&'), img: (body.match(/<img src="([^"]*)"/) || [])[1] || null, title: body.match(/<b>([\s\S]*?)<\/b>/)[1] }));
const gymLink = r => `app.html?preset=compare&walkthrough=${r.id}${r.mode ? `&mode=${r.mode}` : ''}`;

test('another site\'s page: one tile per roster row, in order, absolute GYM links, stills iff declared', () => {
  const w = world();
  const r = w.build('other');
  assert.equal(r.code, 0, r.err);
  const got = tiles(r.html);
  assert.equal(got.length, X.EXHIBITS.length);
  X.EXHIBITS.forEach((row, i) => {
    assert.equal(got[i].title, row.title.replace(/&/g, '&amp;'));
    assert.equal(got[i].href, `${ORIGIN}/${gymLink(row)}`);
    assert.match(got[i].attrs, / target="_blank" rel="noopener"/);
    assert.equal(got[i].img, row.still ? `images/${key(row)}.png` : null);
    assert.equal(/class="tile dark"/.test(got[i].attrs), !row.still);
    if (row.still) assert.ok(fs.existsSync(path.join(r.out, 'images', `${key(row)}.png`)), `${key(row)}.png written`);
  });
  assert.ok(X.EXHIBITS.some(x => x.still) && X.EXHIBITS.some(x => !x.still), 'the roster exercises both tile forms');
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
  const w = world();
  const undeclared = X.EXHIBITS.find(x => !x.still);
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
