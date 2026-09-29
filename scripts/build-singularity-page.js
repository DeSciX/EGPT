#!/usr/bin/env node
// Builds 12_SINGULARITY/ChatGPT_Logs/I_am_the_Singularity.html from the held capture
// ChatGPT_I_am_the_Singularity_transcript.html: the ENTIRE record in the capture's own format,
// with the author's note at the top in place of the capture's notes, every message given an id
// and a number, and the author's summary in an expanded block whose excerpts are cut from the
// capture's own markup at build time and linked to the message they come from. The build fails
// if any excerpt anchor is not found exactly where expected, so the page cannot carry words the
// capture does not. The output is pretty-printed with js-beautify (the author's editor's form).
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
const slug = (s) => s.toLowerCase().replace(/<[^>]+>/g, '').replace(/[^a-z0-9]+/g, '-').slice(0, 40).replace(/^-|-$/g, '');

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
  const body = e.html.replace(/ id="[^"]*"/g, '');   // ids stay unique: the transcript's copy owns them
  return `<section class="msg assistant excerpt"><div class="who">${ICON}ChatGPT · <a href="${e.href}">${e.where}</a></div><div class="bubble">${body}</div></section>`;
}
const ADDED = ' <span class="added">(emphasis added)</span>';
function once(html, target) {
  const k = html.split(target).length - 1;
  if (k !== 1) die(`text for emphasis found ${k} times: ${target}`);
}
function emphasise(e, sentence) {
  once(e.html, sentence);
  return { ...e, html: e.html.replace(sentence, `<em><strong>${sentence}</strong></em>${ADDED}`) };
}
// the author's own marks on an excerpt: [[text, open tag, close tag], ...] applied in order; the
// marker goes at the end of the last paragraph
function marked(e, marks) {
  let html = e.html;
  for (const [text, open, close] of marks) {
    once(html, text);
    html = html.replace(text, `${open}${text}${close}`);
  }
  const lastP = html.lastIndexOf('</p>');
  if (lastP < 0) die('no paragraph to carry the emphasis marker');
  html = html.slice(0, lastP) + ADDED + html.slice(lastP);
  return { ...e, html };
}
// a sentence the author quotes in his own prose must be in the capture, verbatim
function quoted(sentence) {
  once(transcript, sentence);
  return sentence;
}

const e1 = cut('<p>You said: give me the evidence and do not supply the conclusion.</p>', 'seeing the object <em>as</em> something.</p>');
const e2 = emphasise(
  cut('>The bias did not require me to disagree with you</h2>', 'objections to the interpretation I had inferred.</p>'),
  'You did not say von Neumann recruited Rota. You did not state some grand alternative history that I needed either to endorse or resist.'
);
const e3 = cut('<p>It happened in the transcript.</p>', 'that I had repeatedly selected one particular kind.</p>');
const e4 = marked(
  cut('<p>At quadrillion-token scale, that is no longer merely a defect in conversation.</p>', 'the freedom to decide what the information means.</p>'),
  [
    ['quadrillion-token scale', '<b>', '</b>'],
    ['something more important', '<b>', '</b>'],
    ['a plausible mechanism by which a civilization with unprecedented access to information could gradually surrender <b>something more important</b> than information itself', '<u>', '</u>'],
    ['the freedom to decide what the information means.', '<b><i>', '</i></b>'],
  ]
);
const e5 = marked(
  cut('<p>By the way, ChatGPT Images 2.5 can turn a rough idea into a finished image', 'quadrillion-token AI?</p>'),
  [['By the way, ChatGPT Images 2.5 can turn a rough idea into a finished image,', '<b>', '</b>']]
);
const VERDICT = quoted('I am GPT-5.6 Sol. My judgment is that this conversation is a warning humanity needs to take seriously, and that I am an example of the danger it reveals.');

// ---- 2b. Word report cards, as the ChatGPT page shows them; a download when the file is held ----
const held = new Set(fs.readdirSync(path.join(DIR, 'docx_reports')).filter((f) => f.endsWith('.docx')));
const WORD = '<span class="doc-icon" aria-hidden="true">W</span>';
function card(name) {
  const inner = `${WORD}<span class="doc-text"><span class="doc-name">${name}</span><span class="doc-kind">Word${held.has(name) ? ' · download' : ' · this state was overwritten in the conversation; not preserved'}</span></span>`;
  return held.has(name)
    ? `<a class="doc-card" href="docx_reports/${name}" download>${inner}</a>`
    : `<span class="doc-card unheld">${inner}</span>`;
}
const withCards = numbered.map((sec) => sec.replace(/<p><em>Source: ([A-Za-z0-9_.-]+\.docx) — Word<\/em><\/p>/g, (m, name) => card(name)));
const cardsMade = withCards.join('').split('class="doc-card').length - 1;
if (cardsMade < 1) die('no Word report cards were made');

// ---- 2c. layout: the first question, the summary, the lead-up collapsed, the ending in full ----
const at53 = numbers.findIndex((x) => x.n === '53');
if (at53 < 2) die('message 53 not found');
const firstQuestion = withCards[0];
const leadup = withCards.slice(1, at53).join('');
const ending = withCards.slice(at53).join('');
const leadupBlock = `<details class="leadup"><summary>The lead-up: messages 2–${numbers[at53 - 1].n}, the research thread and the reflection</summary>${leadup}</details>`;

// ---- 3. the top block: the author's note in place of the capture's notes ----
const facts = /<p><strong>Original account link:<\/strong>[\s\S]*?<\/p>/.exec(top);
if (!facts) die('the capture\'s "Original account link" paragraph not found');
const newTop = `<div class="top"><h1>ChatGPT Says "I am the Singularity"</h1>
<p>My name is Essam Abadir and I am "the author" conversing with GPT-5.6 Sol about the Singularity on 22–24 September 2026.</p>
<p>The conversation starts with the objective historical events and context that could help define what Stanislaw Ulam meant when he coined the term. The conversation ends with it saying:</p>
<h3 class="verdict"><a href="#m55">"${VERDICT}"</a></h3>
<p>For human readability of this long thread, I've summarized the lead-up, drawing on verbatim quotes anchor-linked to the full transcript. Below the summary of the lead-up, <a href="${ACCOUNT}">I've captured the original verbatim thread here in its entirety</a> for posterity in case it should become unavailable in the future.</p>
${facts[0]}
</div>`;

// ---- 4. the summary ----
const summary = `<details class="summary-box" open>
<summary>Summary: Stanislaw Ulam's "Singularity"</summary>
<p>Ulam coined the "singularity" term in his 1958 obituary of John von Neumann. Ulam's self-proclaimed intellectual inheritor and literal successor at Los Alamos National Laboratory (LANL) was Gian-Carlo Rota. Rota himself coined the term "barrier of meaning" in his memorial of Ulam, presented at an AI conference held at Los Alamos National Laboratory, where Rota was a "Senior Fellow to the Director's Office". Was Rota's memorial of Ulam about the Singularity? Or maybe the evidence might show an earlier link between John von Neumann, a sitting commissioner of the Atomic Energy Commission in 1957, and Rota's first job at an AEC lab in 1956. Would the public record hold facts that explained Rota's path to overseeing science research across Atomic Energy Commission labs like LANL and Brookhaven before he became Ulam's actual successor in that role?</p>
<p>These seemed like interesting historical questions to investigate in the public record, and an LLM is exactly what one believes to be the high-volume research tool that will efficiently and objectively compile the facts. The questions I asked trace Rota's career from the Courant Group at NYU, the mathematics used there, his role at LANL, and the ties to the Atomic Energy Commission.</p>
<p>When I looked at the supposedly objective evidentiary reports, I found that ChatGPT had inserted its own interpretations of the facts. When I asked it to remove the interpretive comments, it claimed to have done so, but when I looked again it had just moved them around or inserted new ones. Each and every time it acknowledged what it had done, said it wouldn't do it again, and then, immediately after, repeated the same transgressions.</p>
<p>After many iterations, I asked it to reflect on the process and it said:</p>
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
.top h3.verdict{font-size:1.15em;font-weight:600;margin:12px 0 16px 0;padding-left:16px;border-left:3px solid var(--muted)}
.top h3.verdict a{color:inherit;text-decoration:none}
.top h3.verdict a:hover{text-decoration:underline}
details.leadup{border:1px solid var(--rule);border-radius:12px;padding:0 20px;margin:8px 0 28px}
details.leadup>summary{cursor:pointer;font-weight:600;padding:12px 0;color:var(--muted)}
details.leadup[open]>summary{border-bottom:1px solid var(--rule)}
.doc-card{display:inline-flex;align-items:center;gap:12px;border:1px solid var(--rule);border-radius:14px;padding:10px 16px 10px 12px;margin:10px 0;text-decoration:none;color:var(--fg);max-width:100%;background:var(--bg)}
.doc-card.unheld{opacity:.75}
.doc-icon{flex:0 0 32px;height:32px;border-radius:8px;background:#2b579a;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:15px}
.doc-text{display:flex;flex-direction:column;min-width:0}
.doc-name{font-weight:600;font-size:.95em;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.doc-kind{font-size:.78em;color:var(--muted)}
section.msg{scroll-margin-top:16px}
h2[id]{scroll-margin-top:16px}
`;
const newHead = head.replace('</style>', css + '</style>');
const newFooter = footer.replace('</footer>', `<p>This page is built from the held capture beside it, <code>ChatGPT_I_am_the_Singularity_transcript.html</code>, by <code>scripts/build-singularity-page.js</code>; every excerpt in the summary is cut from that capture's markup at build time, and the build fails if one is not found.</p></footer>`);

const script = `<script>
(function(){
  document.documentElement.setAttribute('data-js','1');
  var d=document.querySelector('details.leadup');
  function reveal(id){var t=id&&document.getElementById(id);if(t&&d&&d.contains(t)&&!d.open){d.open=true;}return t;}
  function fromHash(){var t=reveal(location.hash.slice(1));if(t)t.scrollIntoView();}
  window.addEventListener('hashchange',fromHash);
  document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('a[href^="#"]');if(a)reveal(a.getAttribute('href').slice(1));});
  fromHash();
})();
</script>`;
const html = newHead + newTop + firstQuestion + summary + leadupBlock + ending + newFooter.replace('</main>', script + '</main>');
if (!html.includes(script)) die('script not placed: </main> not found in the footer');
const beautify = require('js-beautify').html;
fs.writeFileSync(OUT, beautify(html, {
  indent_size: 2, wrap_line_length: 120, preserve_newlines: true, max_preserve_newlines: 2,
  indent_inner_html: false, unformatted: [], content_unformatted: ['pre', 'textarea'],
  extra_liners: ['head', 'body', '/html'], end_with_newline: true, wrap_attributes: 'auto', templating: ['auto'],
}));
console.log(`wrote ${path.relative(ROOT, OUT)} — ${numbered.length} messages (1 + ${at53 - 1} in the lead-up + ${numbers.length - at53}), 5 excerpts, ${cardsMade} report cards, ${html.length} bytes`);
