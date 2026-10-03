#!/usr/bin/env node
// The journal's web edition: "Standing on the Shoulders of Giants".
//
//   node scripts/build-journal.js [--out site] [--issue 2026-10]
//
// Reads one issue (site-src/issues/<id>.json) and the articles it names (journal/<id>/<slug>.md;
// each article's front matter carries title, dek, author, section, status, audio) and writes:
//   <out>/journal.html            the current issue: masthead, the editor's letter with the articles
//                                 of note beside it, the table of contents, an opener per article
//   <out>/issues/<id>.json        the issue resolved (titles, deks, reading times, audio, order), read by
//                                 the viewer's article mode (site-assets/journal.js)
//   <out>/journal/<id>/…          the article files and their audio, as the viewer fetches them
//   <out>/images/ssg-cover.jpg    the masthead art
//
// The journal is editorial: it is read from the working tree, not from HEAD, and nothing on its
// pages carries a record id, a hash or a provenance stamp. Links inside an article are ordinary
// relative links (to a sibling article, or ../../<path> into the library); they are rewritten
// here, and by the viewer, into library.html#<path>. No dependency beyond the vendored marked.
// Cowork, 2 October 2026; the EVIDENCE seat wires it into generate-site.js.
'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'site-src');
const { marked } = require(path.join(SRC, 'site-assets', 'marked.min.js'));
const arg = (k, d) => { const i = process.argv.indexOf(k); return i > 0 ? process.argv[i + 1] : d; };
const OUT = path.resolve(ROOT, arg('--out', 'site'));
const die = (m) => { console.error('ERROR: ' + m); process.exit(1); };
const esc = (s) => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const issuesDir = path.join(SRC, 'issues');
const ids = fs.readdirSync(issuesDir).filter((f) => /^\d{4}-\d{2}\.json$/.test(f)).map((f) => f.slice(0, -5)).sort();
const ID = arg('--issue', ids[ids.length - 1]);
if (!ID) die('no issue in site-src/issues/');
const issue = JSON.parse(fs.readFileSync(path.join(issuesDir, ID + '.json'), 'utf8'));
if (issue.schema !== 'egpt.issue/1' || issue.id !== ID) die(`issues/${ID}.json: schema egpt.issue/1 and id ${ID} are required`);
const DIR = `journal/${ID}`;

// ---------------------------------------------------------------- articles
function frontMatter(text) {
  const m = text.match(/^﻿?---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  const meta = {};
  if (!m) return { meta, body: text };
  for (const l of m[1].split(/\r?\n/)) { const kv = l.match(/^([A-Za-z_][\w-]*):\s*(.*)$/); if (kv) meta[kv[1]] = kv[2].replace(/^"(.*)"$/, '$1'); }
  return { meta, body: text.slice(m[0].length) };
}
// a link as the author writes it → where it opens from <out>/journal.html
function link(href, from) {
  if (/^(https?:|mailto:|#)/.test(href)) return href;
  const [p, frag] = href.split('#');
  const full = path.posix.normalize(path.posix.join(path.posix.dirname(from), decodeURIComponent(p)));
  if (full.startsWith('..')) die(`${from}: link ${href} leaves the repository`);
  return 'library.html#' + full + (frag ? '#' + frag : '');
}
// straight quotes and dashes, set as type (text between tags only; code is left alone)
function typeset(html) {
  let inCode = 0;
  return html.replace(/(<\/?(?:code|pre)\b[^>]*>)|(<[^>]+>)|([^<]+)/g, (m, code, tag, text) => {
    if (code) { inCode += code[1] === '/' ? -1 : 1; return code; }
    if (tag || inCode > 0) return m;
    return text.replace(/&quot;/g, '"').replace(/&#39;/g, "'")
      .replace(/(^|[\s(\[\u2014-])"(?=\S)/g, '$1\u201C').replace(/"/g, '\u201D')
      .replace(/(^|[\s(\[\u2014\u201C-])'(?=\S)/g, '$1\u2018').replace(/'/g, '\u2019').replace(/ -- /g, ' \u2014 ');
  });
}
function render(body, from) {
  let html = typeset(marked.parse(body));
  html = html.replace(/(<a\s[^>]*?href=")([^"]+)(")/g, (_, a, h, c) => a + esc(link(h.replace(/&amp;/g, '&'), from)) + c);
  // a quotation's last line "— Speaker, Work, year" is its attribution
  html = html.replace(/<p>\s*(?:—|&mdash;)\s*([\s\S]*?)<\/p>\s*<\/blockquote>/g, '<footer>$1</footer></blockquote>');
  return html;
}
const words = (t) => (t.replace(/[#>*_`\[\]()]/g, ' ').match(/\S+/g) || []).length;
const minutes = (n) => Math.max(1, Math.round(n / 230));
function clock(sec) { sec = Math.round(sec); return Math.floor(sec / 60) + ':' + String(sec % 60).padStart(2, '0'); }
function wavSeconds(file) { try { const b = fs.readFileSync(file); if (b.toString('ascii', 0, 4) !== 'RIFF') return 0; return (b.length - 44) / b.readUInt32LE(28); } catch (e) { return 0; } }

function article(slug) {
  const rel = `${DIR}/${slug}.md`, file = path.join(ROOT, rel);
  if (!fs.existsSync(file)) die(`${rel}: named by the issue, not on disk`);
  const { meta, body } = frontMatter(fs.readFileSync(file, 'utf8'));
  if (!meta.title) die(`${rel}: front matter needs a title`);
  const text = body.trim(), n = words(text);
  const a = { id: slug, kind: 'article', path: rel, href: 'library.html#' + rel, title: meta.title, dek: meta.dek || '', author: meta.author || '', status: meta.status || (text ? 'ready' : 'stub'), words: n, minutes: text ? minutes(n) : 0 };
  if (meta.audio) {
    const src = /^https?:/.test(meta.audio) ? meta.audio : `${DIR}/${meta.audio}`;
    if (!/^https?:/.test(src) && !fs.existsSync(path.join(ROOT, src))) die(`${rel}: audio ${meta.audio} is not on disk`);
    const secs = meta.audio_duration ? 0 : wavSeconds(path.join(ROOT, src));
    a.audio = { src, title: meta.audio_title || meta.title, duration: meta.audio_duration || (secs ? clock(secs) : ''), placeholder: meta.audio_placeholder === 'true' || undefined };
  }
  if (meta.timeline) {      // an interactive article: its timeline file sits beside it
    const tf = path.join(ROOT, DIR, meta.timeline);
    if (!fs.existsSync(tf)) die(`${rel}: timeline ${meta.timeline} is not on disk`);
    const t = JSON.parse(fs.readFileSync(tf, 'utf8'));
    if (t.schema !== 'egpt.timeline/1') die(`${rel}: ${meta.timeline} is not egpt.timeline/1`);
    a.timeline = { facts: t.facts.length, from: Math.min(...t.facts.filter((f) => f.year).map((f) => f.year)), to: Math.max(...t.facts.map((f) => f.year)), questions: (t.questions || []).length };
  }
  a._body = text;
  return a;
}
function bookItem(it) {
  const f = path.join(SRC, 'books', it.book + '.json');
  if (!fs.existsSync(f)) die(`issue item ${it.id}: no book ${it.book}`);
  { // every span in curly quotes in the item's title or dek must be found, folded, in the book's own page
    const bk = JSON.parse(fs.readFileSync(f, 'utf8'));
    const page = bk.page && path.join(ROOT, bk.page);
    const fold = (x) => String(x).normalize('NFKC').replace(/[\u2018\u2019]/g, "'").replace(/[\u201C\u201D]/g, '"').replace(/[\u2010-\u2015\u2212]/g, '-').replace(/[*_`>#|]/g, '').replace(/\s+/g, ' ').trim();
    const spans = [...String((it.title || '') + ' ' + (it.dek || '')).matchAll(/[\u201C"]([^\u201D"]+)[\u201D"]/g)].map((m) => m[1]);
    if (spans.length) {
      if (!page || !fs.existsSync(page)) die(`issue item ${it.id}: quoted words but the book names no page to check them against`);
      const text = fold(fs.readFileSync(page, 'utf8').replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/&#8212;/g, '—').replace(/&#39;|&rsquo;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, '&'));
      for (const q of spans) if (!text.includes(fold(q))) die(`issue item ${it.id}: quoted words are not in ${bk.page}: \u201C${q}\u201D`);
    }
  }
  const b = JSON.parse(fs.readFileSync(f, 'utf8'));
  return { id: it.id, kind: 'book', book: it.book, href: 'library.html#book:' + it.book, title: it.title || b.title, dek: it.dek || '', author: it.author || '', status: 'ready', excerpt: (b.answer && b.answer.text) || '', minutes: 0, messages: b.messages || 0 };
}
let n = 0;
// a section's editor's note: a few sentences, from the file issue.json names (sections/<slug>.md);
// HTML comments are the file's own instructions and never print; no text, no note.
function sectionNote(s) {
  if (!s.note) return null;
  const rel = `${DIR}/${s.note}`, file = path.join(ROOT, rel);
  if (!fs.existsSync(file)) die(`${rel}: named by the issue (section "${s.title}"), not on disk`);
  const { meta, body } = frontMatter(fs.readFileSync(file, 'utf8'));
  const text = body.replace(/<!--[\s\S]*?-->/g, '').trim();
  if (!text) return null;
  return { path: rel, author: meta.author || '', html: render(text, rel), text };
}
const sections = issue.sections.map((s) => ({ title: s.title, note: sectionNote(s), items: s.items.map((it) => {
  const a = typeof it === 'string' ? article(it) : it.book ? bookItem(it) : Object.assign({ kind: 'external', status: 'ready' }, it);
  a.n = ++n; a.section = s.title; return a;
}) }));
const all = sections.flatMap((s) => s.items);
const byId = Object.fromEntries(all.map((a) => [a.id, a]));
const note = article(issue.note); note.section = 'From the editor';
const features = (issue.features || []).map((id) => byId[id] || die(`features: no item ${id} in this issue`));
const issueAudio = note.audio || null;

// ---------------------------------------------------------------- the page
const two = (k) => String(k).padStart(2, '0');
const listen = (a, cls) => a.audio ? `<button type="button" class="listen ${cls || ''}" data-listen data-src="${esc(a.audio.src)}" data-title="${esc(a.audio.title)}" aria-label="Listen: ${esc(a.audio.title)}"><span class="listen__icon" aria-hidden="true"></span><span class="listen__label">Listen</span>${a.audio.duration ? `<span class="listen__time">${esc(a.audio.duration)}</span>` : ''}</button>` : '';
const byline = (a) => [a.author ? `By ${esc(a.author)}` : '', a.timeline ? `Interactive timeline, ${a.timeline.from}–${a.timeline.to}` : '', a.minutes ? `${a.minutes} min read` : '', a.kind === 'book' && a.messages ? `${a.messages} messages` : ''].filter(Boolean).join(' <span class="dot">·</span> ');
const soon = (a) => a.status === 'stub' ? '<span class="tag">In preparation</span>' : '';
function excerpt(a) {
  if (a.kind === 'book') return a.excerpt ? `<blockquote class="opener__quote"><p>${esc(a.excerpt)}</p></blockquote>` : '';
  if (!a._body) return '';
  const paras = a._body.split(/\n\s*\n/).filter((p) => p.trim() && !/^(#|>|!\[|---)/.test(p.trim())).slice(0, 2).join('\n\n');
  return `<div class="opener__lede">${render(paras, a.path)}</div>`;
}
const featureHtml = features.map((a, i) => `<li><a class="note-pick" href="#a-${esc(a.id)}"><span class="note-pick__n">${two(i + 1)}</span><span class="note-pick__k">${esc(a.section)}</span><span class="note-pick__t">${esc(a.title)}</span><span class="note-pick__d">${esc(a.dek)}</span></a></li>`).join('\n          ');
const tocHtml = sections.map((s) => `<section class="toc__sec"><h3>${esc(s.title)}</h3>${s.note ? `<div class="toc__note">${s.note.html}</div>` : ''}<ol>${s.items.map((a) => `
            <li><a href="#a-${esc(a.id)}"><span class="toc__n">${two(a.n)}</span><span class="toc__body"><span class="toc__t">${esc(a.title)}</span><span class="toc__d">${esc(a.dek)}</span><span class="toc__m">${byline(a)}${a.audio ? ` <span class="dot">·</span> <span class="toc__audio">Audio${a.audio.duration ? ' ' + esc(a.audio.duration) : ''}</span>` : ''}${a.status === 'stub' ? ' <span class="tag">In preparation</span>' : ''}</span></span></a></li>`).join('')}
          </ol></section>`).join('\n        ');
const leads = new Map(sections.filter((s) => s.note).map((s) => [s.items[0] && s.items[0].id, s]));
const openers = all.map((a) => `${leads.has(a.id) ? `<header class="sec-lead" id="s-${esc(leads.get(a.id).title.toLowerCase().replace(/[^a-z0-9]+/g, '-'))}"><p class="sec-lead__k">${esc(leads.get(a.id).title)} <span class="dot">·</span> From the editor</p><div class="sec-lead__body">${leads.get(a.id).note.html}</div></header>` : ''}<article class="opener${a.kind === 'book' ? ' opener--voice' : ''}" id="a-${esc(a.id)}">
        <div class="opener__side"><span class="opener__n">${two(a.n)}</span><span class="opener__k">${esc(a.section)}</span></div>
        <div class="opener__main">
          <h2><a href="${esc(a.href)}">${esc(a.title)}</a></h2>
          ${a.dek ? `<p class="opener__dek">${esc(a.dek)}</p>` : ''}
          <p class="opener__by">${byline(a)} ${soon(a)}</p>
          ${excerpt(a)}
          <p class="opener__go">${a.status === 'stub' ? '' : `<a class="more" href="${esc(a.href)}">${a.kind === 'book' ? 'Read it in full' : 'Continue reading'} <span aria-hidden="true">→</span></a>`}${listen(a)}</p>
        </div>
      </article>`).join('\n      ');

const css = fs.readFileSync(path.join(SRC, 'journal', 'page.css'), 'utf8');
const js = fs.readFileSync(path.join(SRC, 'journal', 'page.js'), 'utf8');
const M = issue.masthead;
const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>${esc(M.name)} — Issue ${issue.number}, ${esc(issue.date)}</title>
<meta name="description" content="${esc([M.line, M.presented, M.tagline].filter(Boolean).join('. '))}">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,300;1,9..144,400&family=IBM+Plex+Sans:ital,wght@0,400;0,500;0,600;1,400&family=IBM+Plex+Mono:wght@400;500&display=swap">
<style>
${css}
</style>
</head>
<body>
<a class="skip" href="#letter">Skip to the editor's letter</a>
<div class="strip"><div class="wrap">
  <a href="library.html">The EGPT library</a>
  <span>Issue ${issue.number} <span class="dot">·</span> ${esc(issue.date)}</span>
  <a href="#contents">Contents</a>
</div></div>

<header class="mast"><div class="wrap">
  <img class="mast__cover" src="images/ssg-cover.jpg" alt="${esc(M.name)}: the cover of the podcast, with Einstein, von Neumann, Ulam and Rota" width="1000" height="1000">
  <div class="mast__text">
    <p class="mast__line">${[M.line, M.presented].filter(Boolean).map(esc).join(' <span class="dot">·</span> ')}</p>
    <h1 class="mast__name">Standing on the <em>Shoulders of Giants</em></h1>
    ${M.tagline ? `<p class="mast__tag">${esc(M.tagline)}</p>` : ''}
    <p class="mast__go">${issueAudio ? listen({ audio: issueAudio }, 'listen--lead') : ''}<a class="more" href="#contents">In this issue <span aria-hidden="true">↓</span></a></p>
  </div>
</div></header>

<main>
  <section class="letter" id="letter"><div class="wrap">
    <div class="letter__body">
      <p class="kicker">From the editor</p>
      <h2 class="letter__title">${esc(note.title)}</h2>
      <div class="prose prose--cap">${render(note._body, note.path)}</div>
      ${note.author ? `<p class="letter__sig">${esc(note.author)}</p>` : ''}
    </div>
    <aside class="letter__picks" aria-label="Articles of note">
      <p class="kicker">Of note in this issue</p>
      <ol>
          ${featureHtml}
      </ol>
    </aside>
  </div></section>

  <section class="toc" id="contents"><div class="wrap">
    <div class="rule-head"><h2>Contents</h2></div>
    <div class="toc__grid">
        ${tocHtml}
    </div>
  </div></section>

  <section class="openers"><div class="wrap">
      ${openers}
  </div></section>
</main>

<footer class="foot"><div class="wrap">
  ${issue.pass_along ? `<p class="foot__pass">${esc(issue.pass_along)}</p>` : ''}
  <p class="foot__links"><a href="library.html">The library</a><a href="library.html#shelf:record">Check the sources</a><a href="index.html">EGPT-Evidence</a></p>
  <p class="foot__fine">${esc(M.name)} <span class="dot">·</span> Issue ${issue.number}, ${esc(issue.date)} <span class="dot">·</span> ${esc(M.presented || '')}</p>
</div></footer>

<div class="player" id="player" hidden>
  <button type="button" class="player__play" id="player-play" aria-label="Pause"></button>
  <div class="player__mid"><span class="player__title" id="player-title"></span>
    <input class="player__seek" id="player-seek" type="range" min="0" max="1000" value="0" aria-label="Position"></div>
  <span class="player__time" id="player-time">0:00</span>
  <button type="button" class="player__close" id="player-close" aria-label="Close the player">×</button>
  <audio id="player-audio" preload="none"></audio>
</div>
<script>
${js}
</script>
</body>
</html>
`;

// ---------------------------------------------------------------- write
const copy = (from, to) => { fs.mkdirSync(path.dirname(to), { recursive: true }); fs.copyFileSync(from, to); };
fs.mkdirSync(OUT, { recursive: true });
fs.writeFileSync(path.join(OUT, 'journal.html'), html);
const strip = (a) => { const o = Object.assign({}, a); delete o._body; delete o.words; return o; };
const resolved = { schema: 'egpt.issue/1', id: ID, number: issue.number, date: issue.date, masthead: Object.assign({}, M, { cover: 'images/ssg-cover.jpg' }), page: 'journal.html',
  note: strip(note), features: features.map((a) => a.id), sections: sections.map((s) => ({ title: s.title, note: s.note ? { path: s.note.path, text: s.note.text } : null, items: s.items.map(strip) })) };
fs.mkdirSync(path.join(OUT, 'issues'), { recursive: true });
fs.writeFileSync(path.join(OUT, 'issues', ID + '.json'), JSON.stringify(resolved, null, 1) + '\n');
(function walk(d) { for (const f of fs.readdirSync(path.join(ROOT, d))) { const r = d + '/' + f; if (fs.statSync(path.join(ROOT, r)).isDirectory()) walk(r); else copy(path.join(ROOT, r), path.join(OUT, r)); } })(DIR);
copy(path.join(ROOT, M.cover), path.join(OUT, 'images', 'ssg-cover.jpg'));
console.log(`journal: issue ${issue.number} (${ID}), ${all.length} articles in ${sections.length} sections, ${all.filter((a) => a.status === 'stub').length} in preparation, ${all.filter((a) => a.audio).length + (issueAudio ? 1 : 0)} with audio → journal.html`);
