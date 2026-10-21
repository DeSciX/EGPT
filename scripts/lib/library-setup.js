'use strict';
// The library's own setup as one text page, kb/LIBRARY_SETUP.md, for the knowledge base: the shelves,
// the reading lists, the seven reasons, the folders, the books and the journal's contents.
// It renders only what the site build has already read and validated (scripts/generate-site.js:
// _meta.json, modules/*.json, shelves.json, spine.json, books/; scripts/build-journal.js: the resolved
// issue it writes to site/issues/<id>.json), so the page and the site cannot disagree. The page carries
// no commit and no date: the same metadata renders the same bytes, and the committed page is current
// exactly when a build leaves it unchanged.
const path = require('path');

const PAGE = 'kb/LIBRARY_SETUP.md';
const NOT_TEXT = { pdf: 'PDF', docx: 'DOCX', html: 'HTML', htm: 'HTML', png: 'PNG', jpg: 'JPG' };

function renderLibrarySetup({ site, ideas, modules, spines, books, shelves, issues, titleOf }) {
  for (const [k, v] of Object.entries({ site, ideas, modules, spines, books, shelves, issues })) if (v == null) throw new Error(`library-setup: ${k} is required`);
  if (typeof titleOf !== 'function') throw new Error('library-setup: titleOf is required');
  const out = [];
  const line = (s = '') => out.push(s);
  const fmt = p => { const ext = p.split('#')[0].split('.').pop().toLowerCase(); return NOT_TEXT[ext] ? ` (${NOT_TEXT[ext]})` : ''; };
  const ref = p => { const bare = p.split('#')[0]; return `${titleOf(bare)}: \`${p}\`${fmt(p)}`; };
  const listById = Object.fromEntries(spines.map(s => [s.id, s]));
  const bookById = Object.fromEntries(books.map(b => [b.id, b]));
  const modByDir = Object.fromEntries(modules.map(m => [m.dir, m]));

  line(`# The setup of ${site.title}`);
  line();
  line(`How the library is arranged, as its site presents it: ${shelves.length} shelves, ${spines.filter(s => !s.idea).length} reading lists, ` +
    `${Object.keys(ideas).length} reasons a reader is here (each with its own short list), ${modules.length} folders, ${books.length} books, and the journal. ` +
    `This page is written by the site build (\`npm run build:site\`) from \`site-src/\`; edit those files, never this one.`);
  line();
  line('A path marked (PDF), (DOCX), (HTML), (PNG) or (JPG) is held in the library and read on the site; the knowledge base holds the text files only.');
  line();

  line('## The shelves');
  line();
  shelves.forEach((sh, i) => {
    line(`### ${i + 1}. ${sh.title}`);
    line();
    if (sh.line) { line(sh.line); line(); }
    if (sh.question && sh.question.text) { line(`Its question: ${sh.question.text}`); line(); }
    if (sh.guide) line(`- Guide page: ${ref(sh.guide)}`);
    if ((sh.start || []).length) { line('- Start with:'); for (const p of sh.start) line(`  - ${ref(p)}`); }
    if ((sh.books || []).length) line(`- Books: ${sh.books.map(b => `${bookById[b].title} (\`book:${b}\`)`).join('; ')}`);
    if ((sh.lists || []).length) line(`- Reading lists: ${sh.lists.map(l => listById[l].title).join('; ')}`);
    if ((sh.folders || []).length) line(`- Folders: ${sh.folders.map(d => `${modByDir[d].name} (\`${d}/\`)`).join('; ')}`);
    for (const o of sh.outside || []) line(`- Outside the library: ${o.title}, ${o.href}${o.line ? ` (${o.line})` : ''}`);
    line();
  });

  const stops = sp => sp.stops.forEach((st, k) => {
    const one = st.read.length === 1 && !st.question && titleOf(st.read[0].split('#')[0]) === st.title;
    if (one) line(`${k + 1}. **${st.title}**: \`${st.read[0]}\`${fmt(st.read[0])}`);
    else {
      line(`${k + 1}. **${st.title}**${st.question ? `: ${st.question}` : ''}`);
      for (const p of st.read) line(`   - ${ref(p)}`);
    }
    if ((st.records || []).length) line(`   - Corpus records: ${st.records.map(r => `\`${r}\``).join(', ')}`);
  });

  line('## The reading lists');
  line();
  for (const sp of spines.filter(s => !s.idea)) {
    line(`### ${sp.title}`);
    line();
    if (sp.blurb) { line(sp.blurb); line(); }
    if (sp.source) { line(`Drawn from ${ref(sp.source)}.`); line(); }
    stops(sp);
    line();
  }

  line('## You are here to…');
  line();
  line(`Each reason has a guide page; its short list is that page followed by the documents it links, in its order.`);
  line();
  for (const [id, idea] of Object.entries(ideas)) {
    const sp = spines.find(s => s.idea === id);
    line(`### ${idea.short}`);
    line();
    line(`You are here to ${idea.label}.`);
    line();
    if (sp) stops(sp); else if (idea.file) line(`- ${ref(idea.file)}`);
    line();
  }

  line('## The folders');
  line();
  for (const m of modules) {
    line(`### ${m.name} (\`${m.dir}/\`)`);
    line();
    if (m.line && !(m.description || '').startsWith(m.line)) { line(m.line); line(); }
    if (m.description) { line(m.description); line(); }
    if (m.entry) line(`- Opens at: ${ref(`${m.dir}/${m.entry}`)}`);
    for (const h of m.highlights) line(`- ${h.label || titleOf(`${m.dir}/${h.file}`)}: \`${m.dir}/${h.file}\`${fmt(h.file)}`);
    line();
  }

  line('## The books');
  line();
  for (const b of books) {
    line(`### ${b.title} (\`book:${b.id}\`)`);
    line();
    if (b.page) line(`- Page: \`${b.page}\`${fmt(b.page)}`);
    if (b.source) line(`- Drawn from: \`${b.source}\``);
    if (b.messages) line(`- Messages: ${b.messages}`);
    if (b.parts.length) line(`- Parts: ${b.parts.map(p => p.title).join('; ')}`);
    line();
  }

  for (const is of issues) {
    const M = is.masthead || {};
    line(`## The journal: ${M.name}, Issue ${is.number}, ${is.date}`);
    line();
    const mast = [M.presented, M.tagline].filter(Boolean).join('. ');
    if (mast) { line(mast); line(); }
    line(`The journal is the editorial track; its articles link into the library. Its page on the site is \`${is.page}\`.`);
    line();
    if (is.note) line(`- From the editor: ${is.note.title}${is.note.author ? `, by ${is.note.author}` : ''}: \`${is.note.path}\``);
    if ((is.features || []).length) {
      const all = Object.fromEntries(is.sections.flatMap(s => s.items).map(a => [a.id, a]));
      line(`- Of note in this issue: ${is.features.map(f => all[f].title).join('; ')}`);
    }
    line();
    for (const s of is.sections) {
      line(`### ${s.title}`);
      line();
      if (s.note && s.note.path) { line(`Section note: \`${s.note.path}\``); line(); }
      s.items.forEach(a => {
        const where = a.kind === 'book' ? `\`book:${a.book}\`` : a.path ? `\`${a.path}\`` : a.href || '';
        const meta = [a.author ? `by ${a.author}` : '', a.status === 'stub' ? 'in preparation' : ''].filter(Boolean).join(', ');
        line(`${a.n}. **${a.title}**${meta ? ` (${meta})` : ''}${where ? `: ${where}` : ''}`);
        if (a.dek) line(`   ${a.dek}`);
      });
      line();
    }
  }
  return out.join('\n').replace(/\n{3,}/g, '\n\n').trimEnd() + '\n';
}

module.exports = { PAGE, renderLibrarySetup, pagePath: root => path.join(root, PAGE) };
