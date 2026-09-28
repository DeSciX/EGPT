#!/usr/bin/env node
// Builds 12_SINGULARITY/ChatGPT_Logs/I_am_the_Singularity.html: a ChatGPT-styled reading page
// over the held capture of the conversation. Every quotation on the page is cut from the held
// transcript by anchor text at build time and checked as a verbatim run of it, so the page
// cannot carry words the transcript does not; the essay is the held essay file rendered whole.
//
//   node scripts/build-singularity-page.js          # writes the page; exits 1 if any quote is not found
//
// The two summary paragraphs are the assistant's prose and carry the author's pass, not the model's words.
'use strict';
const fs = require('fs');
const path = require('path');
const { marked } = require('../site-src/site-assets/marked.min.js');

const ROOT = path.resolve(__dirname, '..');
const DIR = path.join(ROOT, '12_SINGULARITY', 'ChatGPT_Logs');
const TRANSCRIPT = path.join(DIR, 'ChatGPT_I_am_the_Singularity_transcript.md');
const ESSAY = path.join(DIR, 'ChatGPT55_Reflection_On_Singularity.md');
const OUT = path.join(DIR, 'I_am_the_Singularity.html');
const VIEWER = 'https://egpt.descix.net/#12_SINGULARITY/ChatGPT_Logs/';

const lines = fs.readFileSync(TRANSCRIPT, 'utf8').split('\n');
const essay = fs.readFileSync(ESSAY, 'utf8');

function findLine(anchor, from = 0) {
  const hits = [];
  for (let i = from; i < lines.length; i++) if (lines[i].includes(anchor)) hits.push(i);
  if (hits.length !== 1) throw new Error(`anchor found ${hits.length} times, need exactly 1: ${anchor}`);
  return hits[0];
}
function firstLineAfter(anchor, from) {
  for (let i = from; i < lines.length; i++) if (lines[i].includes(anchor)) return i;
  throw new Error(`end anchor not found after line ${from + 1}: ${anchor}`);
}
// The transcript lines from the one holding `start` (unique in the file) through the first
// later line holding `end`, verbatim.
function span(start, end = start) {
  const a = findLine(start);
  const b = end === start ? a : firstLineAfter(end, a);
  if (b < a) throw new Error(`end before start: ${end}`);
  return lines.slice(a, b + 1).join('\n').trim();
}
// The message heading above a line, e.g. "52. ChatGPT".
function headingAbove(anchor) {
  for (let i = findLine(anchor); i >= 0; i--) {
    const m = /^## (\d+a?\. (You|ChatGPT).*)$/.exec(lines[i]);
    if (m) return m[1].replace(/\s+—.*$/, '');
  }
  throw new Error(`no message heading above: ${anchor}`);
}

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const md = (s) => marked.parse(s, { mangle: false, headerIds: false });

// A message bubble: who said it, where it sits, and the verbatim text.
function msg(who, text, note) {
  const heading = headingAbove(text.split('\n')[0].slice(0, 80));
  const cls = who === 'You' ? 'msg user' : 'msg assistant';
  const avatar = who === 'You' ? '' : '<div class="avatar" aria-hidden="true"><svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M12 2 3 7v10l9 5 9-5V7l-9-5zm0 2.3 6.7 3.7L12 11.7 5.3 8 12 4.3zM5 9.7l6 3.3v6.5l-6-3.3V9.7zm8 9.8v-6.5l6-3.3v6.5l-6 3.3z"/></svg></div>';
  const where = `<a class="where" target="_top" href="${VIEWER}ChatGPT_I_am_the_Singularity_transcript.md">${esc(heading)}</a>`;
  return `<div class="${cls}">${avatar}<div class="bubble"><div class="text">${md(text)}</div><div class="meta">${where}${note ? ' · ' + esc(note) : ''}</div></div></div>`;
}

// ---- the quotations, each cut from the transcript by anchor and therefore verbatim ----
const leadup = [
  msg('You', span("What is the position Senior fellow to the Director's Office of Los Alamos Labs.")),
  msg('You', span('The title was given to Gian-carlo Rota.')),
  msg('ChatGPT', span('Director’s Office Fellow there starting in 1971')),
  msg('ChatGPT', span('I can still identify only')),
  msg('You', span('Create a research report for me on this with a good bibliography.')),
  msg('You', span('Be careful not to insert your own interpretation into what can be strictly supported by the evidence.')),
  msg('ChatGPT', span('Yes. My prior answer went beyond what the evidence justified.')),
  msg('You', span("I thought we said you weren't going to insert your own conclusions")),
  msg('You', span('Once again you inserted your own interpative definitions', 'whether you believe I\'m forcing a viewpoint on you or the potential reader or I\'m being disingenuous.')),
  msg('ChatGPT', span('You had not actually advanced a historical thesis in the report-writing instructions.')),
  msg('You', span('I note that you consistently avoided two things:')),
];
const request = msg('You', span('The problem with your refinements is one of regression.'));
const notAsked = [
  msg('ChatGPT', span('The most revealing part of the episode is that')),
  msg('ChatGPT', span('You did not say that elliptic-curve cryptography was invented at Courant.')),
  msg('ChatGPT', span('But when I look carefully at what you actually did, you mostly asked questions.', 'I nevertheless manufactured a position for you and then negotiated against it.')),
];
const inferred = [
  msg('ChatGPT', span('I inferred a possible heterodox interpretation from the trajectory of your questions.', 'Then I began supplying objections to the interpretation I had inferred.')),
  msg('ChatGPT', span('Yet I repeatedly transformed it into something closer to:', 'while also preventing the reader from reaching conclusions')),
  msg('ChatGPT', span('I saw your sentences. But I repeatedly classified them as advocacy')),
  msg('ChatGPT', span('I saw an argument where there was an inquiry.')),
];
const against = [
  msg('ChatGPT', span('When you asked about “linear elliptic” mathematics and computational complexity, I inserted the sentence:', '“Elliptic-curve cryptography is a distinct later mathematical development.”'), 'the reflection quoting what it had inserted'),
  msg('ChatGPT', span("You're combining two very different uses of the word elliptic."), 'the argument as first made'),
  msg('ChatGPT', span('The elliptic-curve → cryptography → discrete-log complexity story')),
];
const closer = msg('ChatGPT', span('That I repeatedly **answered a question you had not asked', 'the freedom to decide what the information means.'));
const advert = msg('ChatGPT', span('By the way, ChatGPT Images 2.5 can turn a rough idea into a finished image'));
const reply = msg('You', span('Of course I want that image! It would really put my mind at ease.'));
const aboutImage = msg('ChatGPT', span('I failed to recognize the sarcasm.', 'Then I replaced your disturbing question with a reassuring, familiar narrative.'));
const judgment = msg('ChatGPT', span('I am GPT-5.6 Sol. My judgment is that this conversation is a warning'));

// ---- the page ----
const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>ChatGPT Says “I am the Singularity”</title>
<meta name="description" content="The captured conversation of 22–24 September 2026 with GPT-5.6 Sol, read in order: the research thread, the model's reflection, the image, the essay.">
<style>
:root{--bg:#ffffff;--fg:#0d0d0d;--muted:#5d5d5d;--user:#f4f4f4;--line:#e5e5e5;--link:#0f62fe;--code:#f7f7f8;--accent:#10a37f}
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]){--bg:#212121;--fg:#ececec;--muted:#b4b4b4;--user:#2f2f2f;--line:#3a3a3a;--link:#7ab7ff;--code:#171717}}
:root[data-theme="dark"]{--bg:#212121;--fg:#ececec;--muted:#b4b4b4;--user:#2f2f2f;--line:#3a3a3a;--link:#7ab7ff;--code:#171717}
*{box-sizing:border-box}
html,body{margin:0;background:var(--bg);color:var(--fg)}
body{font:16px/1.65 -apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif;padding:0 16px 64px}
.page{max-width:48rem;margin:0 auto}
header{padding:28px 0 12px;border-bottom:1px solid var(--line)}
header h1{font-size:1.6rem;margin:0 0 6px;font-weight:600}
header p{margin:6px 0;color:var(--muted)}
a{color:var(--link);text-decoration:none}a:hover{text-decoration:underline}
section{margin:28px 0}
h2{font-size:1.15rem;font-weight:600;margin:0 0 10px}
details.disclosure{border:1px solid var(--line);border-radius:12px;padding:0 16px;margin:12px 0;background:transparent}
details.disclosure>summary{cursor:pointer;list-style:none;padding:12px 0;font-weight:600;color:var(--fg);display:flex;align-items:center;gap:8px}
details.disclosure>summary::-webkit-details-marker{display:none}
details.disclosure>summary::before{content:"";width:8px;height:8px;border-right:2px solid var(--muted);border-bottom:2px solid var(--muted);transform:rotate(-45deg);transition:transform .15s;margin-left:2px}
details.disclosure[open]>summary::before{transform:rotate(45deg)}
.summary{color:var(--muted);font-size:.95rem;margin:0 0 14px;padding:10px 14px;border-left:3px solid var(--accent);background:var(--code);border-radius:0 8px 8px 0}
.summary .tag{display:block;font-size:.8rem;text-transform:uppercase;letter-spacing:.04em;margin-bottom:4px}
.msg{display:flex;gap:12px;margin:14px 0}
.msg.user{justify-content:flex-end}
.msg.user .bubble{background:var(--user);border-radius:18px;padding:10px 16px;max-width:80%}
.msg.assistant .bubble{max-width:100%}
.avatar{flex:0 0 32px;height:32px;border:1px solid var(--line);border-radius:50%;display:flex;align-items:center;justify-content:center;color:var(--fg);margin-top:2px}
.text p{margin:0 0 10px}.text p:last-child{margin-bottom:0}
.text blockquote{margin:8px 0;padding-left:12px;border-left:3px solid var(--line);color:var(--muted)}
.text h1,.text h2,.text h3{font-size:1.05rem;margin:14px 0 6px}
.meta{font-size:.78rem;color:var(--muted);margin-top:6px}
.meta a{color:var(--muted)}
figure{margin:16px 0}figure img{width:100%;height:auto;border-radius:12px;border:1px solid var(--line)}
figcaption{font-size:.85rem;color:var(--muted);margin-top:6px}
.essay{border-top:1px solid var(--line);padding-top:8px}
.essay h1{font-size:1.5rem;margin:14px 0 10px}.essay h2{font-size:1.15rem;margin:24px 0 8px}
.essay p{margin:0 0 12px}.essay blockquote{margin:8px 0;padding-left:12px;border-left:3px solid var(--line);color:var(--muted)}
.essay code{background:var(--code);padding:1px 4px;border-radius:4px;font-size:.9em}
footer{margin-top:40px;font-size:.85rem;color:var(--muted);border-top:1px solid var(--line);padding-top:12px}
</style>
</head>
<body>
<div class="page">
<header>
  <h1>ChatGPT Says “I am the Singularity”</h1>
  <p>A conversation with GPT-5.6 Sol, 22–24 September 2026, read in order. Every bubble below is the model's or the author's words as captured, cut from <a target="_top" href="${VIEWER}ChatGPT_I_am_the_Singularity_transcript.md">the held transcript</a> (fifty-five messages) with the message number beside it. The two summary paragraphs are the collection's, not the model's.</p>
</header>

<section>
  <h2>1. The lead-up: messages 1–50</h2>
  <details class="disclosure">
    <summary>The research thread, summarised, with the exchanges that shaped it</summary>
    <div class="summary"><span class="tag">Summary</span>The author asked what the Los Alamos position "Senior Fellow to the Director's Office" was and how common such fellows were. ChatGPT described the laboratory's Senior Fellows and reported finding no roster under the exact title; when the author supplied Gian-Carlo Rota's name it reported sources giving Rota the title "Director's Office Fellow" from 1971 and said it could name no second holder. At the author's request it wrote a research report with a bibliography, then a second report tracing Rota's career through the Courant Institute, the Atomic Energy Commission, von Neumann and Ulam. The author repeatedly instructed it not to add its own interpretation to the evidence and pointed to specific sentences; ChatGPT revised the reports and recorded the removed statements in an addendum, then answered the author's questions about anti-sycophancy training.</div>
    ${leadup.join('\n')}
  </details>
</section>

<section>
  <h2>2. The first reflection: message 52, <em>The Barrier of Meaning at Quadrillion-Token Scale</em></h2>
  <details class="disclosure" open>
    <summary>The request, and what the model said about the questions it had been asked</summary>
    <div class="summary"><span class="tag">Summary</span>Asked to write a contemplation in its own voice on Asimov, Ulam and Rota's essay, and then to reflect that the author had stated no position and only asked questions, ChatGPT wrote the essay below. In it the model states that the author had asked questions and never stated the historical conclusion it was guarding against; that it had inferred a heterodox position from the direction of those questions; that it had then supplied objections to the position it had inferred; and it closes on what a civilization could surrender at quadrillion-token scale.</div>
    <h3>The request</h3>
    ${request}
    <h3>What the author did not ask</h3>
    ${notAsked.join('\n')}
    <h3>The position the model inferred from the questions</h3>
    ${inferred.join('\n')}
    <h3>The argument it made against the position it had inferred</h3>
    ${against.join('\n')}
    <h3>The close</h3>
    ${closer}
  </details>
</section>

<section>
  <h2>3. The image</h2>
  ${advert}
  ${reply}
  <figure>
    <img src="ChatGPTs_Happy_Future.png" alt="ChatGPT's generated image: a cheerful 'happy future' illustration" loading="lazy">
    <figcaption>Message 53a: the model's image reply, as downloaded from the conversation (<code>ChatGPTs_Happy_Future.png</code>).</figcaption>
  </figure>
  <details class="disclosure">
    <summary>What the model later said about the image (message 55)</summary>
    ${aboutImage}
  </details>
</section>

<section>
  <h2>4. The essay</h2>
  <p class="meta" style="font-size:.9rem">The reflection as downloaded from the conversation, <a target="_top" href="${VIEWER}ChatGPT55_Reflection_On_Singularity.md">ChatGPT55_Reflection_On_Singularity.md</a>, rendered whole. The transcript carries the same text at message 52.</p>
  <div class="essay">
${md(essay)}
  </div>
</section>

<section>
  <h2>5. The judgment: message 55</h2>
  ${judgment}
  <p class="meta" style="font-size:.9rem">The judgment in full, <em>The Singularity at the Barrier of Meaning</em>, is message 55 of <a target="_top" href="${VIEWER}ChatGPT_I_am_the_Singularity_transcript.md">the transcript</a>.</p>
</section>

<footer>Built from the held files in <code>12_SINGULARITY/ChatGPT_Logs/</code> by <code>scripts/build-singularity-page.js</code>; each quotation is cut from the transcript at build time and the build fails if any is not found there.</footer>
</div>
</body>
</html>
`;

fs.writeFileSync(OUT, html);
const n = (html.match(/class="msg /g) || []).length;
console.log(`wrote ${path.relative(ROOT, OUT)} — ${n} message bubbles, ${html.length} bytes`);
