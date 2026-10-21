// The librarian persona's data sections, generated from the files that own the facts.
//
// templates/assets/system_instructions.md.tmpl is the one authored copy of the in-app librarian (the egpt chat's
// system_instructions, pushed by `descix app sync-assets -a egpt -k <the app's default KB>`). Its shelves, folders,
// reading lists, journal contents and course stops are COPIES of site-src/shelves.json, site-src/_meta.json,
// site-src/spine.json, site-src/issues/<issue>.json and the articles' front matter, so they are never typed into the
// template: the template names a {{LIBRARIAN_*}} placeholder and scripts/render.mjs fills it from here.
//
// FAIL LOUD: a missing file, field or article throws, naming it. A persona that quietly lost a shelf would answer
// readers with a library that does not exist.
'use strict';
const fs = require('fs');
const path = require('path');

// The current issue of the journal: the newest site-src/issues/<YYYY-MM>.json.
function currentIssueId(root) {
  const dir = path.join(root, 'site-src', 'issues');
  const ids = fs.readdirSync(dir).filter(f => /^\d{4}-\d{2}\.json$/.test(f)).map(f => f.slice(0, -5)).sort();
  if (!ids.length) throw new Error(`librarian persona: no issue file in ${dir}`);
  return ids[ids.length - 1];
}

// Persona section headings each reading list points to. These are the persona's own cross-references (not copies of
// site data); a list named here prints the pointer instead of its stops. The test checks every heading exists in the
// template.
const SEE_ALSO = {
  '18313x': ['THE COURSE'],
  id4: ['GETTING INVOLVED'],
  id6: ['GETTING INVOLVED'],
  id7: ['WHEN A READER ASKS WHETHER A QUOTATION IS REAL', 'HOW TO CHECK IT YOURSELF'],
};

// A line set mid-sentence (after a colon or inside parentheses) loses its capital, unless it opens on a name.
const NAMES = new Set(['Rota', 'Ulam', 'Einstein', 'Gödel', 'Bohr', 'Shannon', 'Feynman', 'Cantor', 'Maxi', 'EGPT',
  'FRQTL', 'DeSciX']);
function midSentence(line) {
  const first = line.split(/[\s,.:;]/)[0];
  if (NAMES.has(first) || /^[A-Z][A-Z0-9]/.test(first)) return line;
  return line.charAt(0).toLowerCase() + line.slice(1);
}

const NUMBER_WORDS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven',
  'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty'];
function numberWord(n) {
  if (!(n in NUMBER_WORDS)) throw new Error(`librarian persona: no word for ${n} shelves; extend NUMBER_WORDS`);
  return NUMBER_WORDS[n];
}

function readJson(root, rel) {
  const full = path.join(root, rel);
  try { return JSON.parse(fs.readFileSync(full, 'utf8')); } catch (e) {
    throw new Error(`librarian persona: cannot read ${rel}: ${e.message}`);
  }
}

function need(obj, key, where) {
  const v = obj[key];
  if (v === undefined || v === null || v === '') throw new Error(`librarian persona: ${where} has no "${key}"`);
  return v;
}

// key: value lines between the opening and closing --- of an article.
function frontMatter(root, rel) {
  const full = path.join(root, rel);
  if (!fs.existsSync(full)) throw new Error(`librarian persona: the issue names ${rel}, which does not exist`);
  const m = fs.readFileSync(full, 'utf8').match(/^---\n([\s\S]*?)\n---\n/);
  if (!m) throw new Error(`librarian persona: ${rel} has no front matter`);
  const fm = {};
  for (const line of m[1].split('\n')) {
    const i = line.indexOf(':');
    if (i > 0) fm[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  return fm;
}

function shelves(root) {
  const list = need(readJson(root, 'site-src/shelves.json'), 'shelves', 'site-src/shelves.json');
  const lines = list.map(s => {
    const where = `site-src/shelves.json shelf "${s.id}"`;
    let out = `- ${need(s, 'title', where)} — "${need(s, 'line', where)}"`;
    const folders = s.folders || [];
    if (folders.length) out += ` Folder${folders.length > 1 ? 's' : ''} ${folders.join(', ')}.`;
    const outside = s.outside || [];
    if (outside.length === 1) {
      const o = outside[0];
      out += ` It opens onto ${need(o, 'title', where)}: ${need(o, 'href', where)}`;
    } else if (outside.length > 1) {
      out += ' It opens onto ' + outside.map(o =>
        `${need(o, 'title', where)} (${need(o, 'href', where)}, ${midSentence(need(o, 'line', where)).replace(/\.$/, '')})`
      ).join(' and ') + '.';
    }
    return out;
  });
  return { LIBRARIAN_SHELF_COUNT: numberWord(list.length), LIBRARIAN_SHELVES: lines.join('\n') };
}

function folders(root) {
  const modules = need(readJson(root, 'site-src/_meta.json'), 'modules', 'site-src/_meta.json');
  return {
    LIBRARIAN_FOLDERS: modules.map(m => {
      const where = `site-src/_meta.json module "${m.dir}"`;
      return `- ${need(m, 'label', where)} — ${need(m, 'name', where)}: ${midSentence(need(m, 'line', where))}`;
    }).join('\n'),
  };
}

function see(id) {
  const heads = SEE_ALSO[id];
  return heads ? ` See ${heads.join(' and ')}.` : '';
}

function readingLists(root) {
  const spines = need(readJson(root, 'site-src/spine.json'), 'spines', 'site-src/spine.json');
  const ideas = need(readJson(root, 'site-src/_meta.json'), 'ideas', 'site-src/_meta.json');
  return {
    LIBRARIAN_READING_LISTS: spines.map(sp => {
      const where = `site-src/spine.json list "${sp.id}"`;
      if (sp.from_guide) {
        const idea = ideas[need(sp, 'idea', where)];
        if (!idea) throw new Error(`librarian persona: ${where} names idea ${sp.idea}, absent from site-src/_meta.json`);
        return `- ${need(idea, 'short', `idea ${sp.idea}`)}, from the guide's links, starts at ${sp.from_guide}.${see(sp.id)}`;
      }
      const stops = need(sp, 'stops', where);
      const first = need(stops[0], 'read', `${where} stop 1`)[0];
      let out = `- ${need(sp, 'title', where)} (${stops.length} stops), starts at ${first}: "${need(sp, 'blurb', where)}"`;
      if (SEE_ALSO[sp.id]) return out + see(sp.id);
      return out + ' Its stops: ' + stops.map(s => s.question ? `${s.title} ("${s.question}")` : s.title).join('; ');
    }).join('\n'),
  };
}

function journal(root) {
  const id = currentIssueId(root);
  const rel = `site-src/issues/${id}.json`;
  const issue = readJson(root, rel);
  const mh = need(issue, 'masthead', rel);
  const presented = need(mh, 'presented', `${rel} masthead`);
  const masthead = `${need(mh, 'name', `${rel} masthead`)}, ${midSentence(presented)}: "${need(mh, 'tagline', `${rel} masthead`)}"` +
    ` Issue ${need(issue, 'number', rel)}, ${need(issue, 'date', rel)}.`;

  const article = slug => frontMatter(root, `journal/${id}/${slug}.md`);
  const entry = (title, author) => author ? `${title} — ${author}` : title;
  const closed = text => /[.?!]$/.test(text) ? text : text + '.';
  let stubs = 0;
  const counted = fm => { if (fm.status === 'stub') stubs++; return fm; };

  const note = counted(article(need(issue, 'note', rel)));
  const lines = [`- ${need(note, 'section', 'the editor\'s note')}: ${closed(entry(need(note, 'title', 'the editor\'s note'), note.author))}`];
  for (const sec of need(issue, 'sections', rel)) {
    const items = need(sec, 'items', `${rel} section "${sec.title}"`).map(it => {
      if (typeof it === 'string') {
        const fm = counted(article(it));
        return entry(need(fm, 'title', `journal/${id}/${it}.md`), fm.author);
      }
      return entry(need(it, 'title', `${rel} item "${it.id}"`), it.author);
    });
    lines.push(`- ${need(sec, 'title', rel)}: ${closed(items.join('; '))}`);
  }
  return {
    LIBRARIAN_JOURNAL_MASTHEAD: masthead,
    LIBRARIAN_JOURNAL_CONTENTS: lines.join('\n'),
    LIBRARIAN_JOURNAL_IN_PREPARATION: stubs ? 'Some articles in this issue are still in preparation. ' : '',
  };
}

function courseStops(root) {
  const spines = need(readJson(root, 'site-src/spine.json'), 'spines', 'site-src/spine.json');
  const course = spines.find(s => s.id === '18313x');
  if (!course) throw new Error('librarian persona: site-src/spine.json has no list "18313x" (THE COURSE)');
  return {
    LIBRARIAN_COURSE_STOPS: need(course, 'stops', 'the 18313x list').map(s => {
      const where = `site-src/spine.json 18313x stop "${s.id}"`;
      if (s.label) return `- ${s.label}: "${need(s, 'question', where)}" — ${need(s, 'anchor', where)}`;
      return `- ${need(s, 'title', where)} — ${need(s, 'read', where)[0]}`;
    }).join('\n'),
  };
}

// Every placeholder this module fills, and the text for each.
function sections(root) {
  return { ...shelves(root), ...folders(root), ...readingLists(root), ...journal(root), ...courseStops(root) };
}

const PLACEHOLDERS = Object.freeze(['LIBRARIAN_SHELF_COUNT', 'LIBRARIAN_SHELVES', 'LIBRARIAN_FOLDERS',
  'LIBRARIAN_READING_LISTS', 'LIBRARIAN_JOURNAL_MASTHEAD', 'LIBRARIAN_JOURNAL_CONTENTS',
  'LIBRARIAN_JOURNAL_IN_PREPARATION', 'LIBRARIAN_COURSE_STOPS']);

// Fill every {{LIBRARIAN_*}} in a template body. The one substitution path: render.mjs and the test both call it.
function fill(body, root) {
  if (!/\{\{\s*LIBRARIAN_[A-Z0-9_]+\s*\}\}/.test(body)) return body;
  const values = sections(root);
  for (const k of PLACEHOLDERS) if (!(k in values)) throw new Error(`librarian persona: no value for ${k}`);
  return body.replace(/\{\{\s*(LIBRARIAN_[A-Z0-9_]+)\s*\}\}/g, (_, k) => {
    if (!(k in values)) throw new Error(`librarian persona: unknown placeholder {{${k}}}`);
    return values[k];
  });
}

module.exports = { PLACEHOLDERS, SEE_ALSO, sections, fill };
