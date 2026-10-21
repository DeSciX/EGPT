// The librarian persona: assets/system_instructions.md is the render of templates/assets/system_instructions.md.tmpl,
// its data sections come from the site data, and it names nothing private.
//
//   node --test scripts/test/librarian-persona.test.js
'use strict';
const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const persona = require('../lib/librarian-persona');

const ROOT = path.resolve(__dirname, '..', '..');
const TEMPLATE = path.join(ROOT, 'templates', 'assets', 'system_instructions.md.tmpl');
const RENDERED = path.join(ROOT, 'assets', 'system_instructions.md');
const read = f => fs.readFileSync(f, 'utf8');

// What a public persona may not carry: a private repository, an owner's or the author's private name, a local path.
const PRIVATE = [
  [/eabadir\//, 'a private GitHub home (eabadir/…)'],
  [/\bUnkamon\b/, 'the private Unkamon repository'],
  [/EGPT-research|egpt_research/, 'the private research repository'],
  [/\b(?:godsworld|egpt-frqtl|DeSciXCore|daita-beast|egpt-site-theme|daita-economy)-dev\b/, 'a private twin repository'],
  [/\bCEO\b/, 'a CEO reference'],
  [/\bSam\b/, 'a private first name'],
  [/\/Users\/|\/home\/|file:\/\/|(?:^|\s)~\//m, 'a local path'],
];
const privateHits = text => PRIVATE.filter(([re]) => re.test(text)).map(([, what]) => what);

test('the committed persona is the render of its template, byte for byte', () => {
  const tmpl = read(TEMPLATE);
  const tokens = [...tmpl.matchAll(/\{\{\s*([A-Z0-9_]+)\s*\}\}/g)].map(m => m[1]);
  // Only persona placeholders: then persona.fill IS what scripts/render.mjs does to this template.
  assert.deepStrictEqual(tokens.filter(t => !persona.PLACEHOLDERS.includes(t)), []);
  assert.strictEqual(persona.fill(tmpl, ROOT), read(RENDERED),
    'assets/system_instructions.md is stale or hand-edited: run DESCIX_ORIGIN=https://descix.net node scripts/render.mjs');
});

test('every placeholder the module fills is used by the template, and every cross-reference names a section', () => {
  const tmpl = read(TEMPLATE);
  for (const k of persona.PLACEHOLDERS) assert.ok(tmpl.includes(`{{${k}}}`), `template never uses {{${k}}}`);
  const headings = new Set(tmpl.split('\n'));
  for (const [list, heads] of Object.entries(persona.SEE_ALSO))
    for (const h of heads) assert.ok(headings.has(h), `SEE_ALSO.${list} names "${h}", which is not a heading of the persona`);
});

test('the persona names no private repository, no CEO, no private name and no local path', () => {
  assert.deepStrictEqual(privateHits(read(RENDERED)), []);
  assert.deepStrictEqual(privateHits(read(TEMPLATE)), []);
});

test('negative control: the hygiene check catches each kind it lists', () => {
  for (const s of ['see eabadir/x', 'in Unkamon', 'EGPT-research', 'godsworld-dev', 'the CEO said', 'ask Sam',
    'open /Users/x/y', 'file:///tmp/a', 'read ~/notes'])
    assert.ok(privateHits(s).length, `not caught: ${s}`);
});

// A copy of exactly the files the persona reads, so a fixture edit cannot touch the repository.
function fixtureRoot() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'librarian-persona-'));
  const copy = rel => {
    fs.mkdirSync(path.dirname(path.join(dir, rel)), { recursive: true });
    fs.copyFileSync(path.join(ROOT, rel), path.join(dir, rel));
  };
  for (const rel of ['site-src/shelves.json', 'site-src/_meta.json', 'site-src/spine.json']) copy(rel);
  for (const f of fs.readdirSync(path.join(ROOT, 'site-src', 'issues'))) copy(`site-src/issues/${f}`);
  for (const issue of fs.readdirSync(path.join(ROOT, 'journal')))
    for (const f of fs.readdirSync(path.join(ROOT, 'journal', issue)).filter(f => f.endsWith('.md'))) copy(`journal/${issue}/${f}`);
  return dir;
}

test('negative control: a site-data edit changes the render, so the copy cannot drift from its owner', () => {
  const dir = fixtureRoot();
  try {
    const tmpl = read(TEMPLATE);
    assert.strictEqual(persona.fill(tmpl, dir), read(RENDERED), 'the fixture copy does not reproduce the persona');
    const shelvesFile = path.join(dir, 'site-src', 'shelves.json');
    const doc = JSON.parse(read(shelvesFile));
    doc.shelves.push({ id: 'x', title: 'A thirteenth shelf', line: 'Planted.', folders: ['16_X'] });
    fs.writeFileSync(shelvesFile, JSON.stringify(doc));
    const out = persona.fill(tmpl, dir);
    assert.notStrictEqual(out, read(RENDERED));
    assert.match(out, /The library is about thirteen subjects\./);
    assert.match(out, /^- A thirteenth shelf — "Planted\." Folder 16_X\.$/m);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test('negative control: a missing field fails loud, naming the file and the field', () => {
  const dir = fixtureRoot();
  try {
    const metaFile = path.join(dir, 'site-src', '_meta.json');
    const meta = JSON.parse(read(metaFile));
    delete meta.modules[0].line;
    fs.writeFileSync(metaFile, JSON.stringify(meta));
    assert.throws(() => persona.fill(read(TEMPLATE), dir), /site-src\/_meta\.json module "guide" has no "line"/);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});
