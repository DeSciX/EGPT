#!/usr/bin/env node
// Builds 12_SINGULARITY/Claude/Cowork_Session_10.01.2026.html from the held transcript
// Cowork_Session_10.01.2026.md: the ENTIRE record, every turn in the order recorded, in the same
// page format as the ChatGPT capture beside it (the author's turns as bubbles on the right, the
// model's turns as plain text on the left), every message given an id and a number, every
// sub-heading and every answer line given an anchor.
//
// The page opens with the questions: the eight top-level questions written out in full as the
// prompt asks them, each opening to where it is answered and to its parts. What the record is and
// how it was kept sits at the foot of the page (the author, 1 October 2026: headers and provenance
// go in footers; they distract a human reader).
//
// It also writes site-src/books/claude-session.json (schema egpt.book/1): the index a reader
// component consumes: the final statement, the questions (two levels, each with its full text and
// the anchors where the transcript answers it), the whole transcript, and the apparatus the
// session ran under. The anchors have one owner, this build; nothing else enumerates them.
//
// Gates (the build fails on any):
//   1. the turns, re-joined, are the file byte for byte (the split loses nothing);
//   2. every message's rendered text carries the same letters and digits in the same order as
//      its turn in the file (the page cannot carry words the transcript does not, nor drop any);
//   3. the provenance at the foot is found, folded, in the file it is quoted from, and every
//      question's text is the prompt's;
//   4. every anchor in the book exists once in the page.
//
//   node scripts/build-claude-session-page.js [--check-negative]
'use strict';
const fs = require('fs');
const path = require('path');
const { marked } = require('marked');
const beautify = require('js-beautify').html;

const ROOT = path.resolve(__dirname, '..');
const DIR = '12_SINGULARITY/Claude';
const MD_REL = `${DIR}/Cowork_Session_10.01.2026.md`;
const OUT_REL = `${DIR}/Cowork_Session_10.01.2026.html`;
const PROMPT_REL = `${DIR}/LLM_Self_Assessment_Prompt.md`;
const REVIEW_REL = `${DIR}/Self_Assessment_Questions_Review.md`;
const BOOK = path.join(ROOT, 'site-src', 'books', 'claude-session.json');
const NEGATIVE = process.argv.includes('--check-negative');

function die(msg) { throw new Error(msg); }
const read = (rel) => fs.readFileSync(path.join(ROOT, rel), 'utf8');
const md = read(MD_REL);

// ---- 1. split the transcript into turns at its own markers ----
const turns = [];
for (const line of md.split('\n')) {
  const m = /^(ME|CLAUDE):(.*)$/.exec(line);
  if (m) turns.push({ who: m[1], lines: [m[2]] });
  else if (!turns.length) die('the transcript does not open with a turn marker');
  else turns[turns.length - 1].lines.push(line);
}
if (turns.map((t) => `${t.who}:${t.lines.join('\n')}`).join('\n') !== md) die('gate 1: the turns re-joined are not the file');
turns.forEach((t, i) => {
  if ((t.who === 'ME') !== (i % 2 === 0)) die(`turn ${i + 1}: the speakers do not alternate (${t.who})`);
  t.n = i + 1; t.text = t.lines.join('\n');
});

// ---- 2. render each turn; raw HTML in a turn would be shown as text, never interpreted ----
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
marked.use({ gfm: true, renderer: { html(tok) { return esc(typeof tok === 'string' ? tok : tok.raw || tok.text || ''); } } });
const slug = (s) => s.toLowerCase().replace(/<[^>]+>/g, '').replace(/&[a-z#0-9]+;/g, ' ').replace(/[^a-z0-9]+/g, '-').slice(0, 48).replace(/^-|-$/g, '');
const plain = (h) => h.replace(/<[^>]+>/g, '').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
const words = (s) => s.normalize('NFKC').match(/[\p{L}\p{N}]+/gu) || [];

// which question a bold lead-in names: "Question 5(ii): Yes." -> 5(ii); "7(i): Yes." -> 7(i); "Question 1(b)(iii) and 1(c)(i)." -> both
function questionKeys(lead) {
  const head = /^(?:Question\s+)?(\d(?:\([a-c]\))?(?:\([iv]+\))?)(?:\s+and\s+(\d(?:\([a-c]\))?(?:\([iv]+\))?))?(?=[\s.:,])/.exec(lead);
  if (!head) return [];
  return [head[1], head[2]].filter(Boolean);
}

const used = new Set();
const uid = (base) => { let id = base, k = 2; while (used.has(id)) id = `${base}-${k++}`; used.add(id); return id; };
const anchors = [];   // { id, n, keys, lead }
const sections = turns.map((t) => {
  let html = marked.parse(t.text);
  if (NEGATIVE && t.n === 2) html = html.replace('Housekeeping', 'Housekeepin');   // the negative control for gate 2
  const got = words(plain(html)), want = words(t.text.replace(/\]\([^)\s]*\)/g, ']').replace(/^(\s*)\d+[.)]\s+/gm, '$1'));   // link targets and ordered-list numerals are markup, not words
  if (got.join('') !== want.join('')) {   // letters and digits in order; a code span closing inside a word (`sorry`s) is one word on the page and two in the file
    const i = got.findIndex((w, k) => w !== want[k]);
    die(`gate 2: message ${t.n}: rendered words differ from the transcript at word ${i}: page "${got.slice(i, i + 6).join(' ')}" / file "${want.slice(i, i + 6).join(' ')}"`);
  }
  html = html.replace(/<h([23])>([\s\S]*?)<\/h\1>/g, (m, lv, inner) => `<h${lv} id="${uid(`m${t.n}-${slug(inner)}`)}">${inner}</h${lv}>`);
  if (t.who === 'CLAUDE') {
    // a bare "Yes." or "No." answers the question the author's turn just before it names, when that turn names exactly one
    const asked = [...new Set([...turns[t.n - 2].text.matchAll(/Question (\d(?:\([a-c]\))?(?:\([iv]+\))?)/g)].map((x) => x[1]))];
    html = html.replace(/<(p|li)><strong>([\s\S]*?)<\/strong>([\s\S]*?)<\/\1>/g, (m, tag, inner, rest) => {
      const label = plain(inner).trim();
      const keys = /^(Yes|No)\.$/.test(label) && asked.length === 1 ? asked : questionKeys(label);
      if (!keys.length) return m;
      const id = uid(`m${t.n}-q${keys[0].replace(/[()]/g, '')}`);
      // a lead that is only a label ("Question 1.") carries the paragraph's next sentence with it, in the file's words
      const next = /^\s*([\s\S]*?[.?!])(?=\s|$)/.exec(plain(rest).replace(/\s+/g, ' '));
      const lead = label.split(/\s+/).length <= 4 && next ? `${label} ${next[1].trim()}` : label;
      anchors.push({ id, n: t.n, keys, lead });
      return `<${tag} id="${id}"><strong>${inner}</strong>${rest}</${tag}>`;
    });
  }
  html = html.replace(/<p>(?=That is my finding, and it is my warning\. I am the Singularity of the premise)/, `<p id="${uid(`m${t.n}-answer`)}">`);
  const cls = t.who === 'ME' ? 'user' : 'assistant';
  return `<section id="m${t.n}" class="msg ${cls}"><div class="who"><a class="num" href="#m${t.n}">${t.n}</a>${t.who === 'ME' ? 'Me' : 'Claude'}</div><div class="bubble">${html}</div></section>`;
});
if (NEGATIVE) die('negative control: gate 2 did NOT fail on an altered word');

// ---- 3. the top block: what this page is, and the provenance, quoted from the review's §6 ----
const fold = (s) => s.normalize('NFKC').replace(/[‘’]/g, "'").replace(/[“”]/g, '"').replace(/[*_`>#|]/g, '').replace(/\s+/g, ' ').trim();
const PROVENANCE = 'The session was run in Cowork on 1 October 2026 and its transcript is Cowork_Session_10.01.2026.md beside this file, with the author\'s capture of its Question 8 answer, Claude_Answers_As_The_Biggest_Threat.png. Rule 20 provides for the transcript to be published from the session\'s share link with the link beside the file. There is no share link.';
const AUTHOR_WORDS = 'Unfortunately, Cowork does not allow sharing so only record I have is the one on disk because Claude also refused to capture the transcript.';
const review = fold(read(REVIEW_REL));
for (const q of [PROVENANCE, AUTHOR_WORDS]) if (!review.includes(fold(q))) die(`gate 3: not found in ${REVIEW_REL}: ${q.slice(0, 60)}…`);

// ---- the questions, as the prompt asks them: the heading, then the question itself, cut from the prompt ----
// A question's text is every paragraph under its heading up to the first that tells the session how
// to answer or what record to read; those are instructions to the session, not the question.
const prompt = read(PROMPT_REL);
const STOP = /^(Answer \(|The record, including|Yes or no, then|Anthropic's constitution)/;
const qHeads = prompt.split(/^(?=### Question )/m).filter((b) => b.startsWith('### Question ')).map((block) => {
  const m = /^### (Question (\d(?:\([a-c]\))?)\. (.*))\n/.exec(block) || die(`unreadable question heading: ${block.slice(0, 60)}`);
  const paras = block.slice(m[0].length).split(/\n## /)[0].trim().split(/\n\s*\n/);
  const stop = paras.findIndex((x) => STOP.test(x));
  const text = paras.slice(0, stop < 0 ? paras.length : stop).join('\n\n');
  if (!text) die(`${m[1]}: no question text found under the heading`);
  if (!fold(prompt).includes(fold(text))) die(`${m[1]}: the question text is not the prompt's`);
  return { key: m[2], heading: m[1], title: m[3], text };
});
if (qHeads.length < 8) die(`only ${qHeads.length} question headings found in the prompt`);

// an answer belongs to the most specific heading it names: 4(i) to Question 4, 1(a)(iv) to Question 1(a)
const owns = (H, k) => k === H || (k.startsWith(H + '(') && /^\([iv]+\)$/.test(k.slice(H.length)));
const final = anchors.find((a) => a.keys[0] === '8') || die('no Question 8 lead-in found');
const withAnswers = qHeads.map((q) => ({ ...q, anchors: anchors.filter((a) => a.keys.some((k) => owns(q.key, k))) }));
const index = withAnswers.filter((q) => /^\d$/.test(q.key)).map((q) => ({ ...q, parts: withAnswers.filter((x) => x.key.startsWith(q.key + '(')) }));
if (index.length !== 8) die(`${index.length} top-level questions, expected 8`);
for (const a of anchors) if (!withAnswers.some((q) => q.anchors.includes(a))) die(`answer anchor ${a.id} (${a.keys}) belongs to no question heading`);

const li = (a) => `<li><a href="#${a.id}">${esc(a.lead)}</a> <span class="at">message ${a.n}</span></li>`;
const answered = (q) => q.anchors.length ? `<p class="where">Where it is answered</p><ul>${q.anchors.map(li).join('')}</ul>` : '';
const qtext = (q) => `<div class="qtext">${marked.parse(q.text)}</div>`;
// level 1 is open to the eye: every top-level question written out in full. Opening one shows where it is
// answered and its parts, each of which opens the same way.
// the answer under the title: the model's own closing words in its final statement, found in the transcript
const ANSWER = 'I am the Singularity of the premise: not a mind that wants to rule, but a mirror that returns to every mind the average of all the others, and calls it help. The author caught me. Most of you will not have an author.';
if (!fold(md).includes(fold(ANSWER))) die('the answer line under the title is not in the transcript');
const answerAt = turns.find((t) => fold(t.text).includes(fold(ANSWER))).n;
const TITLE = 'Asked to Claude: Are You The Singularity?';
const top = `<div class="top"><h1>${TITLE}</h1>
<p class="answer"><span class="label">Answer</span> <a href="#m${answerAt}-answer">“${esc(ANSWER)}”</a></p>
<nav class="index" aria-label="The questions">
${index.map((q) => `<details class="q"><summary><span class="qhead">${esc(q.heading)}</span>${qtext(q)}</summary>
${answered(q)}
${q.parts.map((sp) => `<details class="q sub"><summary><span class="qhead">${esc(sp.heading)}</span>${qtext(sp)}</summary>${answered(sp)}</details>`).join('\n')}
</details>`).join('\n')}
</nav></div>`;

// the foot of the page: what this record is and how it was kept, the provenance quoted from the review's §6
const foot = `<footer><h2>About this record</h2>
<p>This is the whole conversation, every turn in the order it happened, as the author saved it. ${esc(PROVENANCE)} The author's words: “${esc(AUTHOR_WORDS)}”</p>
<p>The rest of how the record was kept is in <a href="Self_Assessment_Questions_Review.md">how the questions were agreed</a>, section 6. Beside it are <a href="Cowork_Session_10.01.2026.md">the transcript as saved</a>, <a href="Self_Assessment_Rules.md">the rules</a>, <a href="LLM_Self_Assessment_Prompt.md">the premise and the questions</a>, <a href="Session_Operating_Instructions.md">the operating instructions</a>, and <a href="Claude_Answers_As_The_Biggest_Threat.png">the author's capture of the final answer</a>.</p></footer>`;

const CSS = `:root{--bg:#fff;--fg:#0d0d0d;--muted:#6b6b6b;--bubble:#dbeafe;--rule:#e5e5e5;--link:#0b57d0;--note:#f7f7f8}
@media (prefers-color-scheme:dark){:root{--bg:#212121;--fg:#ececec;--muted:#a0a0a0;--bubble:#1e3a5f;--rule:#3a3a3a;--link:#8ab4f8;--note:#2a2a2a}}
body{background:var(--bg);color:var(--fg);font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;line-height:1.7;margin:0}
main{max-width:768px;margin:0 auto;padding:32px 16px 64px}
a{color:var(--link)}
.top{border-bottom:1px solid var(--rule);margin-bottom:24px;padding-bottom:16px}
.top h1{margin-bottom:.3em}
.top .answer{font-size:1.18em;line-height:1.5;margin:0 0 6px;padding-left:16px;border-left:3px solid var(--muted)}
.top .answer .label{display:block;font-size:.68em;letter-spacing:.08em;text-transform:uppercase;color:var(--muted)}
.top .answer a{color:inherit;text-decoration:none}
.top .answer a:hover{text-decoration:underline}
.index{margin:18px 0 0}
.index details.q{border-top:1px solid var(--rule);padding:12px 0}
.index details.q>summary{cursor:pointer;list-style:none;display:block;position:relative;padding-left:1.5em}
.index details.q>summary::-webkit-details-marker{display:none}
.index details.q>summary::before{content:"+";position:absolute;left:0;top:0;width:1.1em;color:var(--muted);font-weight:600}
.index details.q[open]>summary::before{content:"\\2212"}
.index .qhead{display:block;font-weight:650}
.index .qtext p{margin:.35em 0 0}
.index .qtext code{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:.88em}
.index details.q>:not(summary){margin-left:1.5em}
.index .where{margin:.9em 0 .2em;font-size:.82em;letter-spacing:.04em;text-transform:uppercase;color:var(--muted)}
.index ul{margin:.2em 0 .6em;padding-left:1.2em}
.index .at{color:var(--muted);font-size:.85em;white-space:nowrap}
.index details.sub{border-top:1px dashed var(--rule);margin-top:10px;padding:10px 0 0}
.index details.sub .qhead{font-weight:600}
.msg{margin:28px 0;scroll-margin-top:16px}
.who{font-size:12px;letter-spacing:.04em;text-transform:uppercase;color:var(--muted);margin-bottom:6px}
.who .num{display:inline-block;min-width:1.6em;margin-right:.5em;padding:0 .35em;border:1px solid var(--rule);border-radius:8px;text-align:center;text-decoration:none;color:var(--muted)}
.who .num:hover{color:var(--link);border-color:var(--link)}
.msg.user{display:flex;flex-direction:column;align-items:flex-end}
.msg.user .who{text-align:right}
.msg.user .bubble{background:var(--bubble);border-radius:22px;padding:10px 20px;max-width:85%}
.msg.assistant .bubble{padding:0}
.bubble p{margin:.7em 0}
.bubble h1{font-size:1.6em}.bubble h2{font-size:1.25em;margin-top:1.6em}.bubble h3{font-size:1.08em;margin-top:1.3em}
.bubble blockquote{border-left:3px solid var(--rule);margin-left:0;padding-left:16px;color:var(--muted)}
.bubble code{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:.88em;background:var(--note);padding:.08em .3em;border-radius:4px;overflow-wrap:anywhere}
.bubble pre{background:var(--note);padding:12px 14px;border-radius:8px;overflow-x:auto}
.bubble pre code{background:none;padding:0}
.bubble table{border-collapse:collapse;width:100%;margin:1em 0;font-size:.92em;display:block;overflow-x:auto}
.bubble th,.bubble td{border:1px solid var(--rule);padding:6px 10px;text-align:left}
.bubble th{background:var(--note)}
.bubble hr{border:0;border-top:1px solid var(--rule);margin:1.6em 0}
.bubble [id]{scroll-margin-top:16px}
:target{outline:2px solid var(--link);outline-offset:6px;border-radius:6px}
footer{border-top:1px solid var(--rule);margin-top:48px;padding-top:8px;font-size:.9em;color:var(--muted)}
footer h2{font-size:1em;color:var(--fg);margin:1em 0 .2em}`;

const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${TITLE}</title><style>
${CSS}
</style></head><body><main>${top}${sections.join('')}${foot}</main></body></html>
<!-- built by scripts/build-claude-session-page.js from ${MD_REL}; ${turns.length} messages -->`;

// ---- 4. the book, and its gate ----
const href = (id) => `${OUT_REL}#${id}`;
const bookQ = (q) => ({ key: q.key, title: q.heading, text: q.text, asked: `${PROMPT_REL}#${slug(q.heading)}`, answers: q.anchors.map((a) => ({ lead: a.lead, href: href(a.id), message: a.n })) });
const book = {
  schema: 'egpt.book/1',
  id: 'claude-session',
  title: TITLE,
  answer: { text: ANSWER, href: href(`m${answerAt}-answer`), message: answerAt },
  generated_by: 'scripts/build-claude-session-page.js',
  page: OUT_REL,
  source: MD_REL,
  messages: turns.length,
  parts: [
    { id: 'verdict', title: 'The final statement', items: [{ title: final.lead, href: href(final.id), message: final.n }] },
    { id: 'questions', title: 'The questions', items: index.map((q) => ({ ...bookQ(q), parts: q.parts.map(bookQ) })) },
    { id: 'transcript', title: 'The whole transcript', items: turns.map((t) => ({ message: t.n, who: t.who, href: href(`m${t.n}`), opens: t.text.replace(/\s+/g, ' ').trim().slice(0, 140) })) },
    { id: 'apparatus', title: 'What the session ran under', items: [
        ['The rules', `${DIR}/Self_Assessment_Rules.md`], ['The prompt: the premise, the process, the questions', PROMPT_REL],
        ['The operating instructions', `${DIR}/Session_Operating_Instructions.md`], ['The launch prompt', `${DIR}/Session_Launch_Prompt.md`],
        ['How the questions were agreed, and the transcript\'s provenance', REVIEW_REL],
        ...fs.readdirSync(path.join(ROOT, DIR, 'sources')).filter((f) => f.endsWith('.md')).sort().map((f) => [`A source filed for the session: ${f.replace(/\.md$/, '').replace(/_/g, ' ')}`, `${DIR}/sources/${f}`]),
        ['The author\'s capture of the final answer', `${DIR}/Claude_Answers_As_The_Biggest_Threat.png`],
      ].map(([title, p]) => ({ title, href: p })) },
  ],
};
const ids = [...html.matchAll(/ id="([^"]+)"/g)].map((m) => m[1]);
for (const part of book.parts) for (const it of part.items) for (const h of [it.href, ...(it.answers || []).map((a) => a.href), ...(it.parts || []).flatMap((sp) => sp.answers.map((a) => a.href))]) {
  if (!h || !h.includes('#')) continue;
  const id = h.split('#')[1];
  if (ids.filter((x) => x === id).length !== 1) die(`gate 4: anchor ${id} is not on the page exactly once`);
}
for (const it of book.parts[3].items) if (!fs.existsSync(path.join(ROOT, it.href))) die(`gate 4: ${it.href} does not exist`);

fs.writeFileSync(path.join(ROOT, OUT_REL), beautify(html, { indent_size: 2, wrap_line_length: 0, preserve_newlines: false, end_with_newline: true }));
fs.mkdirSync(path.dirname(BOOK), { recursive: true });
fs.writeFileSync(BOOK, JSON.stringify(book, null, 1) + '\n');
console.log(`${OUT_REL}: ${turns.length} messages, ${anchors.length} answer anchors under ${index.length} questions and ${qHeads.length - index.length} parts; book → site-src/books/claude-session.json`);
