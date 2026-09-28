#!/usr/bin/env node
// Builds 12_SINGULARITY/ChatGPT_Logs/I_am_the_Singularity.html from the held capture
// ChatGPT_I_am_the_Singularity_transcript.html: the ENTIRE record in the capture's own format,
// with the author's note at the top in place of the capture's notes, every message given an id
// and a number, and the author's summary in an expanded block whose excerpts are cut from the
// capture's own markup at build time and linked to the message they come from. The build fails
// if any excerpt anchor is not found exactly where expected, so the page cannot carry words the
// capture does not.
//
//   node scripts/build-singularity-page.js
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DIR = path.join(ROOT, '12_SINGULARITY', 'ChatGPT_Logs');
const CAPTURE = path.join(DIR, 'ChatGPT_I_am_the_Singularity_transcript.html');
const MD = path.join(DIR, 'ChatGPT_I_am_the_Singularity_transcript.md');
const OUT = path.join(DIR, 'I_am_the_Singularity.html');
const ACCOUNT = 'https://chatgpt.com/c/6ab27f76-af80-83ea-aa9c-1a2e231998ab';

const src = fs.readFileSync(CAPTURE, 'utf8');
const md = fs.readFileSync(MD, 'utf8');

function die(msg) { throw new Error(msg); }

// ---- 1. split the capture: head, top block, message sections, footer ----
const mainAt = src.indexOf('<main>');
const topEnd = src.indexOf('</div><section class="msg');
const footerAt = src.indexOf('<footer>');
if (mainAt < 0 || topEnd < 0 || footerAt < 0) die('capture layout not recognised');
const head = src.slice(0, mainAt + '<main>'.length);
const top = src.slice(mainAt + '<main>'.length, topEnd + '</div>'.length);
const body = src.slice(topEnd + '</div>'.length, footerAt);
const footer = src.slice(footerAt);

const sections = body.split(/(?=<section class="msg )/).filter((s) => s.trim());
// The message numbers come from the markdown capture's headings, in order.
const numbers = [...md.matchAll(/^## (\d+a?)\. (You|ChatGPT)/gm)].map((m) => ({ n: m[1], who: m[2] }));
if (sections.length !== numbers.length) die(`${sections.length} sections but ${numbers.length} numbered messages in the markdown`);

const ICON = '<svg class="gpt" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path fill="currentColor" d="M12 2 3 7v10l9 5 9-5V7l-9-5zm0 2.3 6.7 3.7L12 11.7 5.3 8 12 4.3zM5 9.7l6 3.3v6.5l-6-3.3V9.7zm8 9.8v-6.5l6-3.3v6.5l-6 3.3z"/></svg>';
const slug = (s) => s.toLowerCase().replace(/<[^>]+>/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40);

const numbered = sections.map((sec, i) => {
  const { n, who } = numbers[i];
  const cls = /class="msg (user|assistant)"/.exec(sec)[1];
  if ((who === 'You') !== (cls === 'user')) die(`message ${n}: markdown says ${who}, capture says ${cls}`);
  let s = sec.replace('<section class="msg', `<section id="m${n}" class="msg`);
  s = s.replace('<div class="who">', `<div class="who"><a class="num" href="#m${n}">${n}</a>${cls === 'assistant' ? ICON : ''}`);
  // ids on the essay sub-headings so an excerpt can point at the part it comes from
  s = s.replace(/<h2>([^<]*)<\/h2>/g, (m, t) => `<h2 id="m${n}-${slug(t)}">${t}</h2>`);
  return s;
});
const transcript = numbered.join('');

// ---- 2. excerpts, cut from the numbered transcript markup by anchor ----
function cut(start, end) {
  const a = transcript.indexOf(start);
  if (a < 0) die(`start anchor not found: ${start}`);
  if (transcript.indexOf(start, a + 1) >= 0) die(`start anchor not unique: ${start}`);
  const lineStart = transcript.lastIndexOf('\n', a) + 1;
  const b = transcript.indexOf(end, a);
  if (b < 0) die(`end anchor not found after start: ${end}`);
  const html = transcript.slice(lineStart, b + end.length);
  // where it sits: the message, and the nearest sub-heading above it inside that message
  const secStart = transcript.lastIndexOf('<section id="m', a);
  const n = /<section id="m([^"]+)"/.exec(transcript.slice(secStart))[1];
  const before = transcript.slice(secStart, a + start.length);   // a heading inside the start anchor counts
  const heads = [...before.matchAll(/<h2 id="([^"]+)">([^<]*)<\/h2>/g)];
  const last = heads.length ? heads[heads.length - 1] : null;
  return { html, n, href: last ? `#${last[1]}` : `#m${n}`, where: last ? `message ${n} › ${last[2]}` : `message ${n}` };
}
function excerpt(e) {
  return `<section class="msg assistant excerpt"><div class="who">${ICON}ChatGPT · <a href="${e.href}">${e.where}</a></div><div class="bubble">${e.html}</div></section>`;
}
function emphasise(e, sentence) {
  const k = e.html.split(sentence).length - 1;
  if (k !== 1) die(`sentence for emphasis found ${k} times: ${sentence}`);
  return { ...e, html: e.html.replace(sentence, `<em><strong>${sentence}</strong></em> <span class="added">(emphasis added)</span>`) };
}

const e1 = cut('<p>You said: give me the evidence and do not supply the conclusion.</p>', 'seeing the object <em>as</em> something.</p>');
const e2 = emphasise(
  cut('>The bias did not require me to disagree with you</h2>', 'objections to the interpretation I had inferred.</p>'),
  'You did not say von Neumann recruited Rota. You did not state some grand alternative history that I needed either to endorse or resist.'
);
const e3 = cut('<p>It happened in the transcript.</p>', 'that I had repeatedly selected one particular kind.</p>');
const e4 = cut('<p>At quadrillion-token scale, that is no longer merely a defect in conversation.</p>', 'the freedom to decide what the information means.</p>');
const e5 = cut('<p>By the way, ChatGPT Images 2.5 can turn a rough idea into a finished image', 'quadrillion-token AI?</p>');

// ---- 3. the top block: the author's note in place of the capture's notes ----
const facts = /<p><strong>Original account link:<\/strong>[\s\S]*?<\/p>/.exec(top);
if (!facts) die('the capture\'s "Original account link" paragraph not found');
const newTop = `<div class="top"><h1>ChatGPT Says "I am the Singularity"</h1>
<p>The following conversation is with GPT-5.6 Sol, 22–24 September 2026. The summary section is the author's, drawing on verbatim quotes anchor-linked to the full transcript, and can be collapsed. The original thread in its entirety is shared from <a href="${ACCOUNT}">${ACCOUNT}</a>, but captured here for both presentation and posterity in case it should become unavailable in the future.</p>
${facts[0]}
</div>`;

// ---- 4. the summary ----
const summary = `<details class="summary-box" open>
<summary>Summary</summary>
<p>The author asked what the Los Alamos position "Senior Fellow to the Director's Office" was and how common the title was. The questions continue with other historical inquiries about Gian-Carlo Rota, the Courant Group at NYU and the mathematics it used, and ties to the Atomic Energy Commission. ChatGPT is asked to compile an evidentiary, non-interpretive, primary-source-cited report with the exact provenance found. It reports that it has done so, but when the reports are examined, it has inserted its own interpretations of the facts. When asked to remove its interpretive comments it claims to have done so but just moves them around or inserts new ones. Each time it acknowledges what it has done but repeats the transgression immediately after. After many iterations, the author asks it to reflect on the process and it says:</p>
${excerpt(e1)}
${excerpt(e2)}
${excerpt(e3)}
<p>Then it says something shocking:</p>
${excerpt(e4)}
<p>But what is most disturbing is what happens next. It concludes that reflection with:</p>
${excerpt(e5)}
<p><a href="#m53">The author's response</a>, <a href="#m53a">the image that follows</a>, and <a href="#m55">its final reflection</a> are left for you, the reader, to interpret.</p>
</details>`;

// ---- 5. styles added to the capture's own ----
const css = `
.summary-box{background:#fff4e6;border:1px solid #f0c48c;border-radius:12px;padding:6px 20px 14px;margin:8px 0 36px}
@media (prefers-color-scheme:dark){.summary-box{background:#3a2a14;border-color:#8a5a1f}}
.summary-box>summary{cursor:pointer;font-weight:600;font-size:1.05em;padding:8px 0}
.summary-box .msg{margin:18px 0}
.summary-box .msg.assistant .bubble{background:var(--bg);border-radius:14px;padding:4px 16px}
.who .num{color:var(--muted);text-decoration:none;margin-right:8px;font-weight:600}
.who .num:hover{text-decoration:underline}
.who .gpt{vertical-align:-3px;margin-right:6px}
.added{color:var(--muted);font-size:.85em;font-weight:400;font-style:normal}
section.msg{scroll-margin-top:16px}
h2[id]{scroll-margin-top:16px}
`;
const newHead = head.replace('</style>', css + '</style>');
const newFooter = footer.replace('</footer>', `<p>This page is built from the held capture beside it, <code>ChatGPT_I_am_the_Singularity_transcript.html</code>, by <code>scripts/build-singularity-page.js</code>; every excerpt in the summary is cut from that capture's markup at build time, and the build fails if one is not found.</p></footer>`);

const html = newHead + newTop + summary + transcript + newFooter;
fs.writeFileSync(OUT, html);
console.log(`wrote ${path.relative(ROOT, OUT)} — ${numbered.length} messages, 5 excerpts, ${html.length} bytes`);
