#!/usr/bin/env node
/**
 * Gate for an issue file (site-src/issues/<id>.json, schema egpt.issue/1).
 *
 *   node scripts/check-issue.js 2026-10
 *   node scripts/check-issue.js 2026-10 --check-negative   # proves the gate can fail
 *
 * Refuses, by name: a section that is not a shelf id (site-src/shelves.json); a book that is
 * not in site-src/books/; an href that is not `library.html#<path tracked at HEAD>` or
 * `library.html#book:<id>`; an `outside` that is not https; a non-planned item without an
 * href; a status or kind outside the schema; a dek on a book item whose folded text is not in
 * the book's own page; a note or overview source file that does not exist. Prints, for each
 * file it touches, whether git tracks it (the site bundles only files tracked at HEAD).
 */
'use strict';
const fs = require('fs'), path = require('path'), cp = require('child_process');
const ROOT = path.resolve(__dirname, '..');
const KINDS = new Set(['article', 'book', 'howto', 'external', 'audio']);
const STATUS = new Set(['live', 'draft', 'planned']);
const id = process.argv[2];
if (!id) { console.error('usage: check-issue.js <issue id> [--check-negative]'); process.exit(2); }
const negative = process.argv.includes('--check-negative');

const issue = JSON.parse(fs.readFileSync(path.join(ROOT, 'site-src/issues', id + '.json'), 'utf8'));
const shelves = new Set(JSON.parse(fs.readFileSync(path.join(ROOT, 'site-src/shelves.json'), 'utf8')).shelves.map(s => s.id));
const books = new Set(fs.readdirSync(path.join(ROOT, 'site-src/books')).filter(f => f.endsWith('.json')).map(f => f.slice(0, -5)));
const tracked = new Set(cp.execSync('git ls-files -z', { cwd: ROOT }).toString('utf8').split('\0').filter(Boolean));

// The same fold the front-page quotation gate uses: a quotation must survive it unchanged.
const fold = s => String(s).normalize('NFKC').replace(/[‘’‚′]/g, "'").replace(/[“”„″]/g, '"')
  .replace(/[‐-―−]/g, '-').replace(/[*_`>#|]/g, '').replace(/\s+/g, ' ').trim().toLowerCase();
const stripTags = h => h.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<[^>]+>/g, ' ')
  .replace(/&#8212;/g, '—').replace(/&#39;|&rsquo;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ');

const errors = [], notes = [];
const fileState = p => tracked.has(p) ? 'tracked' : (fs.existsSync(path.join(ROOT, p)) ? 'UNTRACKED (not in the bundle until committed)' : 'MISSING');
const needFile = (p, what) => { const st = fileState(p); notes.push(`${what}: ${p} — ${st}`); if (st === 'MISSING') errors.push(`${what} does not exist: ${p}`); };

if (issue.schema !== 'egpt.issue/1') errors.push('schema is not egpt.issue/1');
if (issue.id !== id) errors.push(`id ${issue.id} is not ${id}`);
if (issue.note && issue.note.file) needFile(issue.note.file, 'editor\'s note');
const ids = new Set();
for (const it of issue.contents || []) {
  const tag = `item ${it.id}`;
  if (ids.has(it.id)) errors.push(`${tag}: duplicate id`); ids.add(it.id);
  if (!KINDS.has(it.kind)) errors.push(`${tag}: kind ${JSON.stringify(it.kind)} is not ${[...KINDS].join('|')}`);
  if (!STATUS.has(it.status)) errors.push(`${tag}: status ${JSON.stringify(it.status)} is not ${[...STATUS].join('|')}`);
  if (!shelves.has(it.section)) errors.push(`${tag}: section ${JSON.stringify(it.section)} is not a shelf id`);
  if (!it.title) errors.push(`${tag}: no title`);
  if (!it.author) errors.push(`${tag}: no author`);
  if (it.kind === 'book') {
    if (!books.has(it.book)) errors.push(`${tag}: book ${JSON.stringify(it.book)} is not in site-src/books/`);
    else if (it.dek) {
      const b = JSON.parse(fs.readFileSync(path.join(ROOT, 'site-src/books', it.book + '.json'), 'utf8'));
      const page = b.page || b.source || (b.parts && b.parts[0] && (b.parts[0].href || '').split('#')[0]);
      if (!page || !fs.existsSync(path.join(ROOT, page))) errors.push(`${tag}: cannot find the book's page to gate the dek against (${page})`);
      else if (!fold(stripTags(fs.readFileSync(path.join(ROOT, page), 'utf8'))).includes(fold(it.dek))) errors.push(`${tag}: dek is not in ${page}: ${JSON.stringify(it.dek.slice(0, 60))}`);
      else notes.push(`${tag}: dek found in ${page}`);
    }
  }
  if (it.href) {
    const m = /^library\.html#(.+)$/.exec(it.href);
    if (!m) errors.push(`${tag}: href must be library.html#<path> or library.html#book:<id>: ${it.href}`);
    else if (m[1].startsWith('book:')) { if (!books.has(m[1].slice(5).split('/')[0])) errors.push(`${tag}: href names no book: ${it.href}`); }
    else if (m[1].startsWith('shelf:')) { if (!shelves.has(m[1].slice(6))) errors.push(`${tag}: href names no shelf: ${it.href}`); }
    else needFile(m[1], tag + ' href');
  } else if (it.status !== 'planned') errors.push(`${tag}: no href and not planned`);
  if (it.outside && !/^https:\/\//.test(it.outside)) errors.push(`${tag}: outside is not https: ${it.outside}`);
  for (const s of it.sources || []) if (!tracked.has(s) && ![...tracked].some(t => t.startsWith(s + '/'))) errors.push(`${tag}: source not tracked: ${s}`);
}
for (const s of ((issue.audio || {}).episode || {}).overview_sources || []) needFile(s, 'overview source');

if (negative) errors.push('--check-negative: a deliberate failure, to show the gate can fail'); // the control
for (const n of notes) console.log('  ' + n);
if (errors.length) { console.error(`REFUSED issue ${id}:`); for (const e of errors) console.error('  - ' + e); process.exit(1); }
console.log(`issue ${id} OK: ${issue.contents.length} items, ${[...ids].length} ids, sections all shelves, hrefs resolve`);
