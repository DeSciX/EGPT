# Hand-back from Cowork: front page, viewer, reading lists, librarian skills

Answer to `COWORK_LIBRARY_UX.md`, 30 September 2026. Everything is in the working tree,
uncommitted, for the author's review. Nothing was committed, pushed, uploaded or deployed. All
prose written by Cowork (headings, shelf names, list blurbs, the skills) is a draft for the
author's pass.

## What changed, by file

| File | Change |
|---|---|
| `site-src/frontpage/egpt/hero.html` (new) | The top of the front page as a fragment, per his second note: the machine's judgment as the jumbotron, the civilization-scale pull quote under it, then the reflection (message 52, from its title through the image offer that follows it) read as a **teleprompter**: it rolls at a steady pace; pause/play, slower, faster, restart; hover or touch holds it; scrolling by hand works; a reader with reduced motion gets a still, scrollable text. Seven lines are set larger as pull quotes (`data-cut-mark`; Cowork's choice, his pass). The text is cut from the held transcript at build time and gated block by block (231 blocks). |
| `site-src/frontpage/egpt/question.html` (new) | Below the fold: his question as the headline, the three definition cards (singularity, Ulam 1958; the barrier of meaning, Rota 1985; idiot, Blackstone 1768), and the sound bite for why the library exists (his line from 30 September, marked DRAFT for his pass) beside the README's gated statement. |
| `site-src/frontpage/egpt/teleprompter.js` (new) | The teleprompter's control script (plain JS, no dependency). |
| `site-src/frontpage/egpt/readinglist.html` (new) | The first reading list, "Read this first", as six stops: the same list and the same dots the viewer shows. |
| `site-src/frontpage/egpt.json` | `hero` is now `{"file": "egpt/hero.html"}` (the old hero kept as `_hero_previous`); nav reordered; reading list first; the library block moved up after Los Alamos; `css` carries the hero and list styles; `images` emptied (the masked image is off the page). |
| `site-src/frontpage/egpt/reading.html`, `barrier.html` | The verdict and Rota's closing sentence removed here, since the hero now carries them (no quotation appears twice). |
| `scripts/build-frontpage.js` | A spec's hero may be a fragment file (`"hero": {"file": …}`), gated like every fragment. A `<div data-cut-src data-cut-from data-cut-to data-cut-mark>` is filled from the held file at HEAD (headings, paragraphs, bold, italic, links; nothing altered) and every block is gated against that file; a `from`/`to` line that is not in the file, or a mark that is not a block of the cut, fails the build. Additive; the other apps' specs are unaffected. |
| `site-src/spine.json` (new) | The reading lists, `egpt.spine/1`: "Read this first" (6 stops), "18.313x: The Constructive Proof" (14: the course, Rota's 18.313 as held, Sessions 0–10, the record and the proofs), and one list per idea, expanded at build time from each guide page's own links in order. |
| `scripts/generate-site.js` | Reads and validates `spine.json` (every path tracked at HEAD, every record id in `quotes.json` at HEAD), expands the idea lists, computes document titles, writes `site/spine.json` for the skills, gates the landing's quotations, renders the new landing (`_meta.json` `landing`; the carousel remains the fallback). |
| `site-src/_meta.json` | Each module gains `name` and `line` (shelf names); `modules_heading` "The shelves"; a `landing` block with two gated quotations. |
| `site-src/template.html` | Front-page fonts; the shelf-mark toolbar; the reading-list bar; the record drawer; a find-a-document box; loads `DeSciXAppSDK.js` when present. |
| `site-src/site-assets/site.js` | Rewritten (no framework, no build step). See "The viewer" below. |
| `site-src/site-assets/style.css`, `hljs-theme.css` | Rewritten on the front page's tokens: `--bg`, `--cyan`, Fraunces / IBM Plex Sans / IBM Plex Mono. |
| `site-src/site-assets/pdf.min.js`, `pdf.worker.min.js`, `pdfjs.LICENSE.md` (new) | pdf.js 3.11.174 (Apache-2.0), vendored so PDFs draw inside the shell and in headless browsers. |
| `site-src/site-assets/mammoth.browser.min.js`, `mammoth.LICENSE.md` (new) | mammoth 1.8.0 (BSD-2), for "Show the text here" on Word files. |
| `templates/plugins/egpt/skills/{librarian,course-guide,provenance,contribute}/SKILL.md.tmpl` (new), `templates/plugins/egpt/README.md.tmpl` | The four librarian skills and the plugin README's table of skills; rendered into `plugins/egpt/` with `DESCIX_ORIGIN=https://descix.net node scripts/render.mjs` (only `plugins/egpt/` changed). |
| `site-src/handoff/cowork-library-ux/after_*.png` (new) | Screenshots of the preview build, 1392×810. |

## The viewer

- **Type.** Fraunces for titles and quotations, Plex Sans for reading, Plex Mono only for ids,
  hashes, paths and code.
- **Front matter** is no longer printed. It becomes a collapsed **Provenance** strip above the
  text: author, date, source, the path, and the file's SHA-256 read from `CHECKSUMS.txt`, with
  links to the record index and the file itself.
- **Quotations.** A `>` block and the `— Speaker, Work … (record \`q-…\`)` paragraph after it
  (or a `— Speaker` last line inside it) are set as one figure: the words in Fraunces, the
  attribution beneath in the small face, and a **record** button in place of the code span. The
  button opens the record in a side drawer (quote, speaker, work, locus, date, held file, url,
  record id, quote SHA-256). `#record:<id>` opens a record as its own page. Under each document,
  "In the quotation corpus" lists the records drawn from that file.
- **PDFs** draw with pdf.js page by page (lazily), with "Open the file" and "Download" always
  shown; if pdf.js fails, the browser's own viewer outside the sandbox is the fallback. The old
  empty frame most likely came from the sandboxed iframe, where Chrome does not run its built-in
  PDF viewer (headless Chromium has none at all).
- **Word files** get the reading page's download card and a "Show the text here" preview.
- **Images** get a caption (the shelf label) and their path; **Lean** gets a small highlighter;
  code and TeX get highlight.js; **TSV/CSV** render as tables; data files get a download notice.
- **Links inside documents** become deep links (`#<path>`, `#<path>#<heading>`), so the back
  button and the reading list follow them; headings get GitHub-style ids.
- **Where you are.** The toolbar is a shelf mark ("04 Rota / … / file"). Under it, when the file is
  on a reading list, the bar shows the list, "Stop n of m · k read", a dot per stop, the previous
  and next stop, the stop's question and historical anchor, and a chip for each document in the
  stop. The reader's place and read stops are kept in the browser (`localStorage`,
  `egpt.library.v1`); the landing offers "Where you left off".
- **Sidebar.** Reading lists first, then "You are here to…" (the seven), then the shelves with
  names, a one-line description, "Start here" (the highlights, by label) and the folders.
- **App Shell.** Beside the chat (`SplitView`) by default; the whole frame (`CodeSite`) for the
  reading page and for PDFs.

## Checks run

- Preview build from a throwaway clone of the working tree (the generator reads HEAD):
  `egpt: 13 sections (5 reused, 8 fragments), 20 quotations gated`; `site/: 677 collection files;
  17 modules, 7 ideas, 9 reading lists (81 stops)`.
- Controls, each failing as it must: a cut mark that is not a block of the cut, a cut start
  line not in the transcript, an altered hero quotation (`quotation not found in
  04_ROTA/The_Barrier_of_Meaning_Rota.md`), an invented record id in `spine.json` (`is not in
  05_CORPUS/corpus/quotes.json at HEAD`), an altered landing quotation (`quotation not found in
  README.md`).
- Screenshots at 1392×810 and 390×844 in headless Chromium: landing, essay, CV quotations,
  record drawer, PDF, Word preview, Lean, the reading page, the course spine, the front page.
- `render.mjs` re-run; `git status plugins/` shows only `plugins/egpt/`. The deny grep is clean.
- **Not run here:** `claude plugin validate --strict` (the CLI in this environment accepts only
  `-p`), `tools/build_checksums.py --write` (needs the commit), and the site inside the live App
  Shell (needs an upload).

## Decisions only the author can make

1. **Two lines of his are on the page ungated**: the question ("Is AI sending us to a dark age
   of idiocy?") and the sound bite ("The public record which the AIs at the barrier of meaning
   are actively suppressing."). No held file carries them, so they are set as headlines, marked
   DRAFT. Add them to the guide (his pass) if they should be gated like everything else.
1a. **The teleprompter's pull quotes** are seven lines of message 52 chosen by Cowork
   (`data-cut-mark` in `hero.html`); change the list freely, each must be a block of the cut.
   The cut ends with the model's image offer, so the reader meets what came next in the record;
   cut it at "the freedom to decide what the information means." if that is preferred.
2. **Blackstone or the guide's paraphrase.** The card quotes Blackstone ("one that hath had no
   understanding from his nativity"); the guide says "he who hath no capacity for understanding".
   Keep both, or align the guide.
3. **The model's image is off the front page.** It is full of text and fought the headline. Put it
   back in the "machine's own account" section, or leave it on the reading page only.
4. **Shelf names and one-liners** (`_meta.json` `name`/`line`) are drawn from his folder
   descriptions but are Cowork's wording, as are the landing's and the front page's new headings
   ("Follow a path through the collection.", "Seven reasons, seven short lists.", "Seventeen
   shelves, every file hashed.", "Six stops, in order.").
5. **Session readings not held.** The session files name `Ulam_Rota_Discuss_Von_Neumann.md`,
   `JvM_vs_Godel_EGPT_History.md`, `Einstein_Field_Theory.md`, `content/Notes/Precision Loss.md`,
   `www/GPUHeatDeath.html` and `egpt_circuit_sat/index.html`, which this repository does not
   track. They are left off the list. Hold them, or keep them off.
6. **Full view or split view**: the reading page and PDFs take the whole frame; everything else
   sits beside the chat. Confirm, or name other pages.
7. **Shared assets.** `CLAUDE.md` says `site-assets/` is shared with the research repository's
   GitHub Pages site. The new `site.js`/`style.css` drop the carousel landing; the research copy
   needs the same change or keeps the old files.
8. **Vendored libraries** (pdf.js, 1.4 MB; mammoth, 0.6 MB) in `site-assets/` rather than a CDN.
9. **The carousel data** in `_meta.json` is no longer rendered (the generator still falls back to
   it without `landing`). Keep or delete.
10. **The order of "Read this first"**: Singularity, Barrier of Meaning, Dark Age of Idiocy, the
    machine's account, why the corpus is missing, you are here to…

## To see it

```
git add -A site-src scripts templates plugins && git commit   # after review
npm run build:site                                             # writes site/ from HEAD
python3 tools/build_checksums.py --write                       # in a clean checkout, then commit
claude plugin validate --strict plugins/egpt
```

Then open `site/index.html` and `site/library.html` through any static server, or upload the
bundle as usual.
