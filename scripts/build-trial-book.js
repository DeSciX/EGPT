#!/usr/bin/env node
// Writes site-src/books/trial.json (schema egpt.book/1): the trial in 01_TRIAL as a book index,
// in the order the trial itself is read: the opening statement, the instructions to the jury,
// then the exhibits. Every item is a heading of the file as the file prints it; the anchor is the
// viewer's own heading slug (site-src/site-assets/site.js::slug), so a link lands on the heading.
// Nothing here is written by hand: titles are the files' headings.
//
//   node scripts/build-trial-book.js
'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const DIR = '01_TRIAL';
const ORDER = ['OPENING_STATEMENT.md', 'JURY_INSTRUCTIONS.md', 'EXHIBIT_A_report.md', 'EXHIBIT_B_sources.md', 'EXHIBIT_C_addendum.md'];
const slug = (t) => String(t).trim().toLowerCase().replace(/[^\w\sÀ-ɏ-]/g, '').replace(/\s/g, '-');   // as the viewer slugs a heading
const text = (h) => h.replace(/\[([^\]]*)\]\([^)]*\)/g, '$1').replace(/[*_`]/g, '').trim();

const have = fs.readdirSync(path.join(ROOT, DIR)).filter((f) => f.endsWith('.md')).sort();
if (have.join() !== [...ORDER].sort().join()) throw new Error(`01_TRIAL holds ${have.join(', ')}; this build orders ${ORDER.join(', ')}`);

const parts = ORDER.map((f) => {
  const rel = `${DIR}/${f}`, src = fs.readFileSync(path.join(ROOT, rel), 'utf8');
  const h1 = /^# (.+)$/m.exec(src);
  if (!h1) throw new Error(`${rel}: no title heading`);
  const seen = new Map();
  const items = [...src.matchAll(/^## (.+)$/gm)].map((m) => {
    const title = text(m[1]); let id = slug(title); const n = seen.get(id) || 0; seen.set(id, n + 1); if (n) id = `${id}-${n}`;
    return { title, href: `${rel}#${id}` };
  });
  return { id: f.replace(/\.md$/, '').toLowerCase(), title: text(h1[1]), href: rel, items };
});
const out = path.join(ROOT, 'site-src', 'books', 'trial.json');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, JSON.stringify({ schema: 'egpt.book/1', id: 'trial', title: parts[0].title, generated_by: 'scripts/build-trial-book.js', source: DIR, parts }, null, 1) + '\n');
console.log(`site-src/books/trial.json: ${parts.length} parts, ${parts.reduce((a, p) => a + p.items.length, 0)} headings`);
