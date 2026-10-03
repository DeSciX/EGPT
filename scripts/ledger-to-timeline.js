#!/usr/bin/env node
// An evidence ledger (markdown tables: # | Date | Fact | Evidence | Source) → a timeline (egpt.timeline/1),
// the data the journal's timeline component reads (site-assets/timeline.js).
//
//   node scripts/ledger-to-timeline.js <ledger.md> <questions.json> <out.json>
//
// questions.json carries what the ledger does not: the title, the questions (each a tag with a
// colour), the rules that give a fact its tags (by thread and by words in the fact), any tags set
// by hand (`overrides`: { "<fact id>": ["q1","q4"] }, which win), and the author's notes.
// Re-run it whenever the ledger grows. Cowork, 3 October 2026.
'use strict';
const fs = require('fs');
const [,, LEDGER, QUESTIONS, OUT] = process.argv;
if (!LEDGER || !QUESTIONS || !OUT) { console.error('usage: ledger-to-timeline.js <ledger.md> <questions.json> <out.json>'); process.exit(1); }
const md = fs.readFileSync(LEDGER, 'utf8'), Q = JSON.parse(fs.readFileSync(QUESTIONS, 'utf8'));
const cells = (line) => line.replace(/^\s*\|/, '').replace(/\|\s*$/, '').split(/(?<!\\)\|/).map((c) => c.replace(/\\\|/g, '|').trim());
const MONTHS = 'jan feb mar apr may jun jul aug sep oct nov dec'.split(' ');
function when(date) {
  const y = /(1[89]\d\d|20\d\d)/.exec(date); if (!y) return null;
  const m = MONTHS.findIndex((k) => new RegExp('\\b' + k, 'i').test(date));
  const d = /\b([0-3]?\d)(?:\s*[–-]\s*\d+)?\s+[A-Z][a-z]{2}|[A-Z][a-z]{2,8}\.?\s+([0-3]?\d)\b/.exec(date);
  return { year: +y[1], sort: +y[1] * 10000 + (m < 0 ? 0 : (m + 1) * 100) + (d ? +(d[1] || d[2]) : 0) };
}
const plain = (s) => s.replace(/`([^`]*)`/g, '$1').replace(/\*\*([^*]*)\*\*/g, '$1').replace(/<br\s*\/?>/g, ' ').trim();
let thread = '', threadTitle = '', h1 = 0, stop = false, extra = false;
const facts = [], threads = [];
for (const line of md.split('\n')) {
  if (/^# /.test(line)) { h1++; if (h1 > 1) { thread = String.fromCharCode(63 + h1); threadTitle = line.replace(/^# /, '').replace(/:\s*evidence ledger\s*$/i, ''); threads.push({ id: thread, title: threadTitle }); stop = false; extra = false; } continue; }
  if (/^## /.test(line)) { stop = /sources still to pull/i.test(line); extra = /additional/i.test(line); continue; }
  if (stop || !thread || !/^\s*\|/.test(line) || /^\s*\|\s*(#|-{2,}|:?-+)/.test(line)) continue;
  const c = cells(line); if (c.length < 5) continue;
  const w = when(c[1]); if (!w) continue;
  // a holding described by the span of an archive ("1912–1996") is not an event of its first year: it goes under "In the archives"
  const ys = (c[1].match(/(1[89]\d\d|20\d\d)/g) || []).map(Number);
  if (ys.length > 1 && ys[ys.length - 1] - ys[0] > 12 && /\b(papers|finding aid|catalogue|catalog|records|folder|box \d|collection)\b/i.test(c[2] + ' ' + c[4])) { w.year = 0; w.sort = 99990000; }
  const source = plain(c.slice(4).join(' | ')), url = (/(https?:\/\/[^\s)>\]]+)/.exec(source) || [])[1] || '';
  const held = (/\b((?:0\d|1[0-5])_[A-Z_]+\/[^\s,;)]+\.(?:md|txt|pdf|html|tsv|json))/.exec(source) || [])[1] || '';
  facts.push({ id: `${thread}-${c[0].replace(/[^A-Za-z0-9]/g, '')}`, thread, date: plain(c[1]), year: w.year, sort: w.sort, fact: plain(c[2]), evidence: plain(c[3]), source: source.replace(/\s*\(?https?:\/\/[^\s)>\]]+\)?/g, '').replace(/[,;]?\s*\((?:fetched|read directly|PDF read directly)[^)]*\)/gi, '').replace(/\s+([.,;])/g, '$1').trim(),
    url: url.replace(/[.,;]+$/, '') || undefined, held: held || undefined, check: /page to be pulled|search result|fragment/i.test(source) || undefined, tags: [] });
}
const seen = new Set();
for (const f of facts) { while (seen.has(f.id)) f.id += 'x'; seen.add(f.id); }
for (const f of facts) {
  if (Q.overrides && Q.overrides[f.id]) { f.tags = Q.overrides[f.id]; continue; }
  const text = f.fact + ' ' + f.evidence;
  for (const q of Q.questions) {
    const byWord = (q.match || []).some((r) => new RegExp(r, 'i').test(text));
    const byThread = (q.threads || []).includes(f.thread) && !(q.unless || []).some((r) => new RegExp(r, 'i').test(text));
    if (byWord || (byThread && !q.match_only)) f.tags.push(q.id);
  }
  if (!f.tags.length) { const d = Q.questions.find((q) => (q.threads || []).includes(f.thread)); if (d) f.tags.push(d.id); }
}
facts.sort((a, b) => a.sort - b.sort || a.id.localeCompare(b.id));
const out = { schema: 'egpt.timeline/1', id: Q.id, title: Q.title, dek: Q.dek || '', author: Q.author || '', generated_from: LEDGER.replace(/^.*?(scratch|journal|evidence)\//, '$1/'),
  questions: Q.questions.map(({ id, label, question, color }) => ({ id, label, question, color })), notes: Q.notes || [], threads,
  facts: facts.map(({ sort, ...f }) => f) };
fs.writeFileSync(OUT, JSON.stringify(out, null, 1) + '\n');
console.log(`${OUT}: ${facts.length} facts, ${out.facts.find((f) => f.year).year}–${Math.max(...out.facts.map((f) => f.year))}; ` + Q.questions.map((q) => `${q.id} ${facts.filter((f) => f.tags.includes(q.id)).length}`).join(', '));
