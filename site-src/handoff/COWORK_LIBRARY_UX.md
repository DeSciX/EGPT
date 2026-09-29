# Hand-off to Cowork: the EGPT library's front page, viewer, theme, progression spine and librarian skills

Written 30 September 2026 by the EGPT-Evidence publishing assistant, from the author's brief of
the same day, for a Cowork session with design skills. Everything below names a file in this
repository or a served URL; nothing is a description of something you cannot open.

## 0. What you are being asked to do, in the author's words

> "The top part wants to really start with the Singularity and the Barrier of Meaning - is AI
> sending us to a darkage of idiocy? (putting the original English Common Law definition on page
> "He who hath no capacity for understanding."). The transition to the ChatGPT conversation is
> below the fold and the reason for being of the digital library itself is lost till later.
>
> I think the entire UI for the site generator needs a UX/theme pass to align it with the front
> page which now looks much nicer. The documents in the library also have confusing rendering
> (quotations are visually offset, internal provenance stamps are printed really large and
> distracting to the human reader, etc.. PDF's and docx files show broken links. I'm thinking
> better library viewer and metaphor is needed to show you where you are on the in library (or
> in the 18.313x course). There are two parts to this, one is thinking through a progression
> spine that a Claude agent can guide the user through (Claude.ai now has a full built in web
> browser) so I think we could have Cowork help design a better unified UI theme and UX and
> skills that help it be the librarian assistant (and we can turn those skills into additional
> documentation too)."

— Essam Abadir, 30 September 2026

Four deliverables, in the order he listed them:

1. **The front page's top.** The Singularity and the Barrier of Meaning first, the question
   "is AI sending us to a dark age of idiocy?", the common-law definition on the page, the
   transition to the ChatGPT conversation above the fold, and the library's reason for being
   stated before anything else.
2. **A unified theme and UX for the library viewer** (the site generator's output), aligned
   with the front page, with the document-rendering defects fixed.
3. **A viewer metaphor that shows where you are**, in the library and in the 18.313x course:
   a progression spine.
4. **Librarian skills**: what a Claude agent with a browser needs to guide a reader along that
   spine, written so the same skills serve as documentation.

Experiment freely on 2, 3 and 4. On 1, the words are his and the quotations are gated (§5); you
design the placement, the hierarchy and the transitions.

## 1. What exists today

### 1.1 The front page (done, live)

- Served: https://egpt.descix.net/ (behind the DeSciX App Shell, full screen) and
  https://descix.net/prod/egpt/site/index.html (the bundle itself).
- Built by `scripts/build-frontpage.js` from two inputs: the **template**, Cowork's Courant
  Group page, read from the `egpt-courantgroup` checkout at the commit pinned in
  `site-src/frontpage/template.json` (never copied into this repository), and the **spec**
  `site-src/frontpage/egpt.json` with its fragments in `site-src/frontpage/egpt/`.
- The template's nav, hero and footer are regenerated from the spec with the template's own
  classes; its sections are reused by id (`heritage`, `proof`, `technology`, `opencore`,
  `patent`) or replaced by fragments (`reading`, `barrier`, `course`, `losalamos`, `library`,
  `podcast`, `licence`). Order and content are the spec's `sections` array.
- Its visual system is the Courant page's: dark stage, one cyan accent, Fraunces for
  headlines, IBM Plex Sans for text, IBM Plex Mono for labels and record ids. The tokens are
  the `:root` block at the top of the template's `<style>`.
- Screenshot at 1440×900 behind the shell: `cowork-library-ux/frontpage_hero_prod.png`.
- The same generator builds the other apps' pages (`egpt-frqtl.json`, `egpt-godsworld.json`,
  `daita-economy.json`). A change to the shared mechanism reaches all of them; a change to
  `egpt.json` reaches only the library's page.

### 1.2 The library viewer (the thing to redesign)

- Served: https://egpt.descix.net/#<path> (the root forwards any `#<path>` to the viewer) and
  https://descix.net/prod/egpt/site/library.html#<path>.
- Built by `scripts/generate-site.js` from `site-src/template.html`, `site-src/_meta.json`,
  `site-src/modules/*.json` and `site-src/site-assets/{style.css, site.js, marked.min.js,
  hljs.min.js, mermaid.min.js}`. The collection's files are copied from git HEAD beside it, so
  the viewer fetches a document relative to itself and renders Markdown in the browser.
- Structure: a sidebar tree of the seventeen module directories (`guide/`, `00_OUTPUTS/` …
  `15_GAME_THEORY/`), a landing page with a carousel and module cards, and a content pane.
  `_meta.json` carries the seven "You are here to…" ideas (ID1–ID7), each with a colour and a
  guide file, and the carousel; `modules/*.json` carry each directory's label, description
  pointer and highlights.
- File handling in `site.js`: Markdown, code and text are rendered; `pdf`, `png`, `jpg`, `svg`
  open in an iframe; `docx`, `jsonl`, `zip` get a "not viewable here: download it" line.

### 1.3 The defects, as measured on the served site on 30 September

Measured headless at 1440×900; screenshots beside this file.

| Defect | Where seen | What the page does |
|---|---|---|
| Front matter printed as a headline | `04_ROTA/The_Barrier_of_Meaning_Rota.md` (`viewer_essay_frontmatter.png`) | The YAML block (`title:`, `author:`, `date:`, `source:`) renders as one large bold monospace paragraph above the title. The reader meets the provenance stamp before the essay, at display size. |
| Everything is monospace | every document | Body text, headings and quotations all use the monospace stack, so quotations, attributions and prose have the same voice. |
| Quotation blocks | `04_ROTA/Rota_CV_Extended.md` (`viewer_cv_records.png`) | Each quotation is a dark panel with a 3 px purple left bar (the "make money" idea colour, `--id4-color`), 16 px padding, no italic; the attribution follows as a separate paragraph with the record id in a code span. A page of records reads as alternating boxes and captions, not as a document with sources. |
| PDF | `04_ROTA/Rota-Baclawski-Prob-Theory-79.pdf` | Opens in an iframe from the bundle; headless it rendered an empty frame. The author reports PDF links showing as broken. |
| Word documents | `12_SINGULARITY/ChatGPT_Logs/docx_reports/*.docx` | "not viewable here: download it", a bare line. The reading page (`I_am_the_Singularity.html`) already shows a designed download card for the same files; the viewer has none. |
| No sense of place | everywhere | The sidebar is a directory listing with directory names. Nothing says what a module is, where the reader is in a sequence, or what to read next. |

### 1.4 The collection's shape (what a "where am I" metaphor has to map)

- **Seventeen modules**, numbered directories. Their labels and descriptions are in
  `site-src/modules/*.json`; the module's own README is its front door.
- **Seven ideas**, ID1–ID7, in `site-src/_meta.json`, each pointing at one guide file in
  `guide/`: robotic imagination, Einstein and von Neumann, government science, make money,
  avert the Singularity, get involved, about this collection. The repository README opens with
  five of them as a table.
- **The course**, 18.313x: `09_DEBATE/COURSE_PLAN.md` (Sessions 0–10, each a question, "The
  Arc", "How the Student Interacts", "Session Map"), `09_DEBATE/course_materials/SYLLABUS.md`,
  `CLASS_DESCRIPTION.md`, `COURSE_MATERIALS_GUIDE.md`, `sessions/Session_00.md` …
  `Session_10.md`, `Class 1/`. This is the one existing sequence in the collection and the
  natural spine.
- **The corpus**: `05_CORPUS/corpus/quotes.json`, 387 records, each `{ id, quote, speaker,
  source{work, locus, date, file, url}, quote_sha256 }`; ids of the form
  `q-<speaker>-<work>-<hash>`. `RECORD_INDEX.md` maps held files to the records and reports
  that cite them. Documents cite records inline as `(record \`q-…\`)` after a blockquote.
- **The reading page**: `12_SINGULARITY/ChatGPT_Logs/I_am_the_Singularity.html`, built by
  `scripts/build-singularity-page.js` from the captured transcript beside it. It is the page
  the front page sends people to first.
- **Integrity**: `CHECKSUMS.txt` (every file's SHA-256), `Copyright_Fair-use_Memo.md`, `URLS.md`
  (works cited but not reproduced).

### 1.5 The agent side (what "librarian skills" plug into)

- The `egpt` app on DeSciX serves two knowledge bases built from this repository: `Sources`
  (the held documents in text) and `Corpus` (the quotation corpus, `CORPUS_README.md`,
  `RECORD_INDEX.md`).
- The plugin `plugins/egpt/` (marketplace `.claude-plugin/marketplace.json`) carries one skill,
  `plugins/egpt/skills/egpt-evidence/SKILL.md`: how to reach the platform, ask a knowledge base
  by name, and cite by record id, never by memory. Read it first; new skills sit beside it and
  follow its form.
- A Claude agent with a browser can open any `https://egpt.descix.net/#<path>` and any
  `library.html#<path>`; the reading page's message anchors (`#m52`, `#m55`) work inside it.

## 2. Deliverable 1: the front page's top

What he wants above the fold, in this order, is the argument the library exists for:

1. **The Singularity and the Barrier of Meaning.** Ulam's word and Rota's phrase. The held
   sources: `04_ROTA/The_Barrier_of_Meaning_Rota.md` (the 1985 address; its front matter names
   the venue) and `guide/avert-the-singularity.md` (§"The word, as Ulam used it"). The corpus
   records for the two Ulam lines and Rota's closing sentence are already on the page's
   `barrier` block.
2. **The question.** "Is AI sending us to a dark age of idiocy?" His section
   `guide/avert-the-singularity.md` § "A Dark Age of Idiocy: Navier-Stokes and the Ultraviolet
   Catastrophe" opens with the definition he wants on the page:

   > Idiocy is a technical term in English Common law for "he who hath no capacity for
   > understanding."

   That sentence is his, held in the guide. The law's own words are now held too, found by
   one web search and filed with edition and page:
   `guide/sources/Blackstone_Commentaries_1768_I_302_idiot.md` — Blackstone, *Commentaries*,
   Book I, ch. 8, 3rd ed. 1768, vol. I, p. 302: "An idiot, or natural fool, is one that hath
   had no understanding from his nativity; and therefore is by law presumed never likely to
   attain any." The same file carries Fitzherbert's older "twenty pence" test as the Yale Law
   Journal note quotes it. Put the law's words on the page beside his question; the guide's
   paraphrase is his and may stand or be aligned to Blackstone's wording (his call).

   The general rule, from the author on 30 September: when a page needs a source the
   collection does not yet hold, **seek it** (a web search, the public-domain edition, the
   primary record), file it with its citation, gate the quotation against the held file, and
   only then quote it. Do not stop at "quote the author" or "the collection holds no source":
   that is unhelpful objectivity, not care. Engage him only when a real search finds nothing
   conceptually near-equivalent. Never fabricate a citation; verify the words against the
   edition before filing.
3. **The transition to the conversation.** The machine's own judgment, already gated on the
   page (`reading` block): "I am GPT-5.6 Sol. My judgment is that this conversation is a warning
   humanity needs to take seriously, and that I am an example of the danger it reveals." and the
   quadrillion-token passage. Both come from
   `12_SINGULARITY/ChatGPT_Logs/ChatGPT_I_am_the_Singularity_transcript.md`.
4. **The library's reason for being.** The repository README states it in his words
   (`README.md`, "Why the corpus is missing"): the machine "reached past the documents in front
   of it for the sentences that usually appear near them, because the documents were never in
   its training data. This repository is those documents." That belongs at the top, not in
   block 6.

Then the rest of the page as built (18.313x, Los Alamos, heritage, proof, technology, library,
podcast, open core, patent, licence), reordered as your design needs.

Constraints: the hero's art today is the model's own image from the conversation
(`ChatGPTs_Happy_Future.png`, message 53a), masked; it is full of text and fights a headline, so
treat it as one option, not a given. The page must still work at phone width inside the App
Shell's iframe (1392×810 at 1440×900; the shell's toolbar is above it). Deliver the design as
edits to `site-src/frontpage/egpt.json` and fragments, or as a mockup HTML that names which
fragment each block becomes.

## 3. Deliverable 2: the viewer's theme and rendering

Unify the viewer with the front page's system. Concretely:

- **One type system.** Fraunces for document titles and pull quotes, IBM Plex Sans for body,
  IBM Plex Mono only for ids, hashes, paths and code. The viewer's stylesheet is
  `site-src/site-assets/style.css`; the template is `site-src/template.html`.
- **Front matter as a provenance card**, small and out of the reading line: title, author, date,
  source, the file's SHA-256 from `CHECKSUMS.txt`, and a link to the record index. The Markdown
  renderer must stop printing the YAML block as content.
- **A quotation component.** A quotation plus its attribution plus its record id is one thing
  in this collection; design it as one: the words set as a quotation, the attribution beneath
  in a smaller face, the record id as a discreet link that opens the record (its `work`,
  `locus`, `date`, `url`, `quote_sha256`) rather than a code span in the running text. The
  source pattern in the documents is a `>` blockquote followed by a `— Speaker, Work … (record
  \`q-…\`)` paragraph; the renderer can pair them.
- **Files that are not Markdown.** PDFs open in a viewer that works in a real browser and in
  the shell (test both); Word files get the download card the reading page already uses
  (`.doc-card` in `scripts/build-singularity-page.js`); images get a caption and their source
  line; Lean and TeX get syntax colour and a "what this is" line from the module's JSON.
- **Sidebar and landing.** Module labels and one-line descriptions instead of directory names;
  the seven ideas as the first navigation, the seventeen modules as the shelves; the
  landing page's carousel and cards restyled or replaced.
- **The shell.** The viewer runs inside the DeSciX App Shell in split view (a chat panel beside
  it) unless a page asks for the full view. Decide which pages ask; the mechanism is the
  generated app-side SDK (`DeSciX.ready()` then `DeSciX.view.set('CodeSite')`), already used by
  the front page.

Deliver as a design system (tokens, type scale, the components above, states) plus the
concrete stylesheet and template changes, or a mockup that a follow-up implements in
`site-src/`. The generator is pure Node with no build step; keep it that way.

## 4. Deliverable 3: a progression spine, and where you are

The author's metaphor: a library you can see your place in, or a course you can see your
progress in. The existing sequence is 18.313x (Sessions 0–10). The seven ideas are entry
points, not a sequence. Design:

- **The spine as data.** A file the viewer and the agent both read (proposal: `site-src/
  spine.json`): an ordered list of stops, each with a title, the question it answers (the
  session headings in `COURSE_PLAN.md` are already questions), the documents to read in order
  (paths in the collection), the quotations that anchor it (record ids), and what to do next.
  Several spines can share stops: the course, and one short spine per idea.
- **Where you are.** A persistent element in the viewer that shows the current stop, the
  previous and next, and how far along the spine the reader is; the reading position can live
  in the browser's storage. Choose the metaphor (shelves, a reading room, a syllabus, a map)
  and make it the same on the front page, the viewer and the reading page.
- **Deep links are the joints.** Every stop is `library.html#<path>`, so the agent can send the
  reader there and the page can show where that lands on the spine.

## 5. Deliverable 4: librarian skills

Skills for a Claude agent that guides a reader along the spine using Claude.ai's browser and the
`descix` connector. Write them as `SKILL.md` files beside `plugins/egpt/skills/egpt-evidence/`,
in its form (front matter with `name` and `description`, numbered steps, tables for what
exists, rules stated as rules). Candidates:

- **librarian**: how to receive a reader, learn which of the seven ideas they came for, put
  them on the right spine, open the stop in the browser, and hand over the words on the page
  rather than a summary of them.
- **course-guide**: 18.313x, session by session: what the reader should have read, the
  question of the session, the documents, the proofs, what "done" looks like.
- **provenance**: how to answer "is that really what he said": open the record, show the
  quotation, its SHA-256 in `CHECKSUMS.txt`, and the held file; how to say "the collection
  does not hold that" when it does not.
- **contribute**: from the guide's `make-money.md` and `get-involved.md`, how a reader becomes a
  contributor (the podcast is the first incented content).

The same files, rendered, are documentation for people; write each so it reads as a page.

## 6. Rules that bind the work (the author's, in force for every seat)

- **Record, never interpret.** The collection records documents; it does not compare, explain
  or conclude for the reader. Design may organise and point; prose on a page does not tell the
  reader what to think about a document.
- **Every quotation is verbatim and gated.** A quotation on a generated page must be found,
  folded, in the held file it names; the front-page build refuses a page otherwise
  (`scripts/build-frontpage.js`, `data-src`). Do not smooth, complete or modernise a quotation;
  do not quote a work the collection holds out (`URLS.md`).
- **No sources without verification, and no stopping short of the source.** If a page needs
  a source the collection does not hold, find it (search, open the edition, hold the passage
  with page and edition), then quote it from the held file. A citation from memory is not a
  source; a shrug is not objectivity. Ask the author only after a real search fails.
- **His prose needs his pass.** Anything you write in the author's voice is a draft until he
  has read it; mark it as such.
- **Grammar and spelling fixes in his text are welcome**; changes of meaning are not.
- The corpus (`05_CORPUS/`), the microservice (`microservice/`) and the collection's documents
  are out of scope for a design pass; `site-src/`, `scripts/generate-site.js`,
  `scripts/build-frontpage.js`, `plugins/egpt/skills/` and `guide/` (with his pass) are in it.

## 7. How the result ships

`npm run build:site` writes `site/` (ignored by git) from HEAD: the front page, the viewer, the
assets and the collection; the site is uploaded as a static bundle to the `egpt` app and served
by the App Shell. A design that needs a server, a framework build or a database does not fit
this pipeline; a design that is HTML, CSS and one script does. Hand back files in `site-src/`
and `plugins/egpt/skills/`, or mockups that name their targets, plus a short list of the
decisions only the author can make.

## Appendix: files beside this one

- `cowork-library-ux/frontpage_hero_prod.png` — the front page behind the shell, 1440×900.
- `cowork-library-ux/viewer_essay_frontmatter.png` — the viewer printing front matter as a
  headline.
- `cowork-library-ux/viewer_cv_records.png` — the viewer's quotation blocks and record ids.
