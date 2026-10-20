// share.json from a spec's "share" block: scripts/lib/share.js shareJson/emitShare, checked by the platform's
// own parser (@descix/app-sdk/share, the pinned devDependency).
//
//   node --test scripts/test/share.test.js
//
// The accepted views come from the parser's SHARE_CONTRACT, never a list typed here. The parser not installed
// (no npm ci) is a FAILURE, never a skip.
'use strict';
const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const share = require('../lib/share');

const SRC = path.resolve(__dirname, '..', '..', 'site-src', 'frontpage');
const specShare = (app) => JSON.parse(fs.readFileSync(path.join(SRC, app + '.json'), 'utf8')).share;
const VIEWS = () => require('@descix/app-sdk/share').SHARE_CONTRACT.find(f => f.name === 'default_view').oneOf.values;

test('every view the parser accepts is ferried into share.json verbatim', () => {
  assert.ok(VIEWS().length > 0, 'the parser lists no views');
  for (const v of VIEWS()) assert.strictEqual(share.shareJson('t', { ...specShare('egpt'), default_view: v }).default_view, v);
});

test('a view the parser does not list is refused, naming the field and the value', () => {
  assert.throws(() => share.shareJson('t', { ...specShare('egpt'), default_view: 'Sidebar' }),
    /t: share block refused by @descix\/app-sdk\/share: share\.json: default_view 'Sidebar' is not a view/);
});

test('a block without default_view emits no default_view key', () => {
  const { default_view, ...rest } = specShare('egpt');
  assert.ok(!('default_view' in share.shareJson('t', rest)));
});

test('the egpt app starts in CodeSite; the other share blocks declare no view', () => {
  assert.strictEqual(share.shareJson('egpt', specShare('egpt')).default_view, 'CodeSite');
  for (const app of fs.readdirSync(SRC).filter(f => f.endsWith('.json')).map(f => f.replace(/\.json$/, ''))) {
    const sh = specShare(app);
    if (app !== 'egpt' && sh) assert.ok(!('default_view' in sh), `${app}.json declares default_view`);
  }
});

test('emitShare writes the validated object as share.json, and parses back through the platform parser', () => {
  const out = fs.mkdtempSync(path.join(os.tmpdir(), 'share-'));
  try {
    const json = share.emitShare('egpt', specShare('egpt'), SRC, out);
    const text = fs.readFileSync(path.join(out, 'share.json'), 'utf8');
    assert.deepStrictEqual(JSON.parse(text), json);
    assert.strictEqual(require('@descix/app-sdk/share').parseShareJson(text).default_view, 'CodeSite');
  } finally { fs.rmSync(out, { recursive: true, force: true }); }
});
