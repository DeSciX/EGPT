# Hand-back from Cowork: the reader, the front page's first impression, the library as a library

Answer to `COWORK_READER_AND_LIBRARY.md`, 1 October 2026. Everything is in the working tree,
uncommitted, for the EVIDENCE seat's gates and the author's pass. Nothing was committed, pushed,
uploaded or deployed; `descix` was not run. Nothing under a numbered collection folder was
touched. Every quotation on the front page is the one that was there, byte for byte, with its
`data-src`; only the markup around it moved. Every string Cowork wrote that is not a quotation is
listed under "Copy that is a draft" at the end.

Stills are in `cowork-reader-and-library/`, headless Chromium, 1280×800 and 390×844.

## What changed, by file

| File | Change |
|---|---|
| `site-src/site-assets/reader.js` (new) | **D1, the reader.** One component driven by `books/<id>.json`. Owns `#book:<id>`, `#book:<id>/<part>`, `#book:<id>/<part>/<ref>` and `#shelf:<id>` on `library.html`. Renders the cover, a part page and a question page itself; hands documents (the transcript page, a trial heading) to `site.js` to render and decorates them with the book's chrome. Remembers the reader's place per book (`localStorage`, the viewer's `egpt.library.v1`). |
| `site-src/site-assets/site.js` | Four marked edits: `openHash` delegates `book:` and `shelf:` addresses to the reader; `navigate` calls `EGPTReader.onNavigate` after every document; `goHome` calls `EGPTReader.leave`; a small `window.EGPTViewer` surface (the functions and elements the reader uses) before `init`. The sidebar gains "The shelves" (twelve rows, first) and the folders' heading reads "The folders". Nothing else moved. |
| `site-src/site-assets/style.css` | One new section, "the reader", on the viewer's own tokens: the book index in the sidebar, the book bar, the cover, the question page, the shelf page, the shelf cards on the landing, phone and print rules. No second palette; `--book` is `--cyan`. |
| `site-src/template.html` | `<nav id="book-nav" hidden>` beside `#tree-nav`; `<div id="book-bar" hidden>` beside `#spine-bar`; `reader.js` loaded after `site.js`. |
| `scripts/generate-site.js` | Additive. Reads `site-src/books/*.json` and puts a summary in `SITE_DATA.books` (id, title, answer, page, parts, and the set of paths the book covers) so a plain link that lands on a page of a book can say so without a fetch; a path not tracked at HEAD is a warning, not a stop (the session page enters `site/` when committed, hand-off §6). Reads `site-src/shelves.json`, validates it (every path at HEAD, every list in `spine.json`, every folder in `_meta.json`, every book in `books/`, outside links `https` only), puts it in `SITE_DATA.shelves`, writes `site/shelves.json` for the skills, and renders "The shelves" as the landing's first section after the hero. The folders section's heading reads "Seventeen folders, every file hashed." |
| `site-src/shelves.json` (new) | **D4, the one set of shelves.** Twelve subjects, each with a title, a line, the documents to start with, the books and reading lists on it, the folders that sit on it, the guide page that is its front door where one exists, the question the front page asks under it (and which slide), and the one place outside the library it opens onto. Read by the viewer's landing and sidebar, by the reader's shelf pages, and (by hand, for now) by the front page's card row. |
| `site-src/_meta.json` | `modules_heading`: "The shelves" → "The folders". The seventeen numbered directories are folders; the shelves are the subjects. |
| `site-src/frontpage/egpt/hero.html` | **D3.** The carousel as question and answer: on slides 1–4 the question stands alone as the headline (Fraunces, left column); the answer is the quotation in the source's words (right column); the speaker and the primary source, as the corpus records it, are the footer; no slide has a header. The dots became five labelled tabs along the stage's foot, so the five questions are seen in one pass. Slide 0 is unchanged but its footer also names the Claude book. Slide 4's footer opens Question 1 in the book. The card row is the twelve shelves, numbered, from `shelves.json`, two rows of six above the fold at 1280×800; the Quantum computing card carries the author's capture. |
| `site-src/frontpage/egpt.json` | `css` only: the Q&A slide grid, the question headline, the tabs, the cards (six across, 15px Fraunces titles, three-line clamp), the stage height (`45vh`), the phone rules (one column, scrollable slide, tabs as dots). Nothing else in the spec changed. |
| `site-src/frontpage/egpt/teleprompter.js` | Three lines: `index.html#q<n>` opens the carousel on question *n* (the shelf pages link back to their question this way; the root forwarder leaves a hash without a slash or dot alone). |
| `site-src/handoff/cowork-reader-and-library/build-claude-session-page.css.patch` | **D2.** A diff to the script's `CSS` string, not applied: a paragraph reached by its anchor is marked at the margin instead of boxed, so a long turn still reads as text; `.in-book` hides the page's own index when the reader hosts it (the sidebar carries it) and, in the dark scheme, takes the library's stage colours so the page does not sit in a second dark. The reader injects the same three rules at runtime until the patch lands, so the stills show the result either way. Not a word of a message is touched; the gate will agree. |
| `site-src/handoff/cowork-reader-and-library/*.png` | The stills. |

## D1. The reader: where it lives and why

It lives **in the viewer**, not beside it. The viewer already has everything a book needs except
the index and the prev/next: the pane that renders Markdown with headings as anchors, the iframe
that shows the session page, the record drawer, the shelf mark, the App Shell handling, the list of
files in the bundle. A second page would duplicate all of that and give the assistant two kinds of
link to hand out. So a book is a *mode* of `library.html`: the sidebar becomes the book's index,
the bar under the toolbar becomes the book's bar, and the pane stays the pane.

**Three ways in**, as the author put them, are the cover's cards: the final statement (one
place, message 46); the questions (eight, each with where it is answered); the whole transcript
(52 messages, in order). The fourth card, "What the session ran under", is the apparatus.

**The index** (sidebar) is multi-level and opens at level 1: every part open except the
transcript (52 rows, opened on demand), each of the eight questions written out in full under its
title, its parts (1(a), 1(b), 1(c)) one click down. The open/closed state of each part is
remembered per book. On a phone the same index is the off-canvas sidebar; the bar carries an
"Index" button.

**A question's page** (`#book:claude-session/questions/1`) shows the question as the prompt asks
it, a link to the prompt, then "Where it is answered": each answer in the file's own opening
words with its message number. Clicking one opens the transcript *at that paragraph*, inside the
book, and the reader keeps reading from there (the whole page is in the pane). The question's
parts follow on the same page, each with its own answers and a link to its own page. Previous and
next step through the questions in order, 1, 1(a), 1(b), 1(c), 2 … 8, then to the final statement.

**The transcript** (`#book:claude-session/transcript/m12`, or any anchor inside a message, such as
`m46-q8`) is the session page in the pane with the book bar above it: "Message 12 of 52 · Claude",
previous and next message. Moving between messages of the same page is a fragment move, no reload.

**The trial** works from the same code with nothing special-cased: the cover's cards are the five
documents, the index is their headings, a heading opens the document at that heading with previous
and next at the foot of the text, the bar reads "Instructions to the Jury · 7 of 11".

**A plain link into a page of a book** (`library.html#12_SINGULARITY/Claude/…html#m34-q5`) keeps
the viewer's normal chrome and adds one line: "This page is in *Asked to Claude…* — Read it in the
book →", resolved to the exact place. That is also D5's landing.

**Addresses.** All relative, all one hash, all shareable:

| Address | Opens |
|---|---|
| `library.html#book:claude-session` | the cover |
| `library.html#book:claude-session/questions` | the eight questions written out, one page |
| `library.html#book:claude-session/questions/1` · `…/questions/1a` | a question, a part of a question |
| `library.html#book:claude-session/transcript/m12` · `…/transcript/m46-q8` | a message; a paragraph inside it |
| `library.html#book:claude-session/verdict` · `…/apparatus/<anchor>` | a place item (the first of the part when no ref) |
| `library.html#book:trial/jury_instructions/7-the-four-questions` | a heading of the trial |
| `library.html#shelf:losalamos` | a shelf |

## D3. The first impression

The question is the first thing read, in the serif, at headline size, alone in its column; the
answer is the source's words beside it; who said it and where, as the corpus records it, is the
one line beneath. The five tabs along the foot of the stage name the five questions, so a reader
who does not wait for the carousel still sees the set. Below the stage, the shelves: twelve small
cards, numbered like a shelf mark, each one subject, both rows above the fold at 1280×800
(`frontpage_slide*_1280x800.png`). On a phone the slides stack, the long slides scroll inside the
stage, the tabs become dots.

## D4. The library as a library

The front page, the viewer's landing and the viewer's sidebar now read the same twelve shelves
from `site-src/shelves.json`: the Singularity; EGPT; P = NP; Quantum computing; Los Alamos; Von
Neumann, Ulam, Rota; the mathematics (18.313x); the physics (Einstein and von Neumann); Robotic
imagination; Make money; Get involved; the record. They are the author's subjects plus the cards
he asked for, with the seven "You are here to…" pages kept as the front doors of the shelves they
belong to. A shelf, when you arrive at it (`viewer_shelf_losalamos_1280.png`), is: its title and
line; the question the front page asks under it, linking back to that slide; "Start here", the
documents in order; the books on it; the reading lists on it, with their meters; the folders on it;
previous and next shelf. The reading lists and the seventeen folders remain what they were, one
level down. A document's shelf mark gains the shelf as its first crumb when the document sits on
exactly one shelf (named as a start, or by its folder), and the sidebar row lights.

The guide pages are not edited (they are the author's). `guide/README.md`'s table is the same
set under another name; see decision 6 for the one row that points at a file the repository does
not track.

## D5. Sources from the assistant's side

When the skill's assistant "brings up" a document, it should hand the reader one of the addresses
above, and nothing else is needed from the viewer: a plain path lands with the shelf mark (shelf /
folder / file), the reading-list bar if the file is on a list, and the "This page is in a book"
line if it is; a `#book:` address lands inside the book with its index at the side; a `#record:`
address opens the record. "How to get back" is the shelf mark's first crumb (the shelf), the
"← The library" link at the top of a book's index, and the browser's own back button, which the
viewer has always honoured because every move is a hash change. The one link form the viewer did
not have and now has is the book address; the one it still lacks is a link to a question *as
asked* that shows the answer beside it without leaving the question page, and I do not think it
should have one: the question page already puts the reader one click from each answer, and the
answer belongs in the transcript where its context is.

Proposed for the skill text (the seat's, the author's pass): the assistant cites a message as
`library.html#book:claude-session/transcript/m<n>` when it wants the reader to read on, and as
`library.html#book:claude-session/questions/<k>` when it wants the reader to see what was asked.

## What I need from the index or the build that is not there

1. **A book for the ChatGPT conversation**, `books/chatgpt.json`, from
   `scripts/build-singularity-page.js`, in the same schema (`verdict` = message 55, `transcript`,
   `apparatus`; the questions part only if that conversation has a question list). The Singularity
   shelf lists `claude-session` alone until then.
2. **Part titles in the trial index.** `parts[0].title` is the file's h1, which is also the book's
   title, so the cover's first card and the index's first part repeat it. A short part title per
   file (`title_short`, or the build's own: "The opening statement", "Instructions to the jury",
   "Exhibit A", "Exhibit B", "Exhibit C") would let the component show the file's h1 on the page
   and the short title in the index and bar. I did not invent them in the component (one owner).
3. **The trial's four questions as a `questions` part.** `JURY_INSTRUCTIONS.md` §7 asks four
   questions in full. If the trial build cut them into items of the question shape (`key`, `text`,
   `asked`, `answers` pointing at the exhibits' "Findings by proposition" or wherever the record
   answers them), the trial would get the same question pages the session has, for free.
4. **The card row from `shelves.json`.** `hero.html`'s `<nav class="jumbo-cards">` is hand-written
   to match the file. A directive for `build-frontpage.js` (`<nav data-shelves>` filled from
   `site-src/shelves.json`: number, title, `card || line`, `thumb`) removes the second copy and
   lets the build gate it. The card for a shelf links `library.html#shelf:<id>`.
5. **Leads that are only a label.** Some `answers[].lead` values are "Question 1." (message 34's
   summary). The page shows them as they are; if the build could cut the first sentence after the
   label when the label is bare, the list would read better. Data, so the seat's call.
6. The session page committed, so `generate-site.js`'s warnings about it go quiet.

## Checks run

- Preview build: `generate-site.js` cannot run here (it reads git HEAD; this copy of the tree has no
  `.git`), so `library.html` was re-rendered from `template.html` with the built page's own
  `SITE_DATA` plus `books` and `shelves` computed by the same logic, and `index.html` was patched
  with the new hero, CSS and script. Both scripts parse (`node vm.Script`); `shelves.json` and both
  book indexes validate against the file list: every start path, list, folder and book resolves.
- Headless Chromium, 1280×800 and 390×844, console clean except the viewer's standing sandbox
  warning and one 404 for `05_CORPUS/corpus/quotes.json`, which this copy omits: the cover, the
  questions part, Question 1, Question 5, message 12, message 46 at `m46-q8` (the margin mark on
  the paragraph), the verdict, the trial cover, a trial heading with its foot nav, the last heading
  of the trial, a plain link into the session page (the "in the book" line), a missing book, a
  missing place in a book, the landing with the shelves, the Los Alamos and Quantum computing
  shelves, a document's shelf crumb, every slide of the carousel, the tabs, `index.html#q3`.
- Phone: the index is the off-canvas sidebar; the bar's Index button opens it; prev/next are arrows;
  the slides stack and scroll inside the stage.
- Reduced motion: unchanged, the carousel does not advance; the reader has no motion.
- Light and dark: the viewer remains dark-only by the previous hand-back's decision; the reader uses
  the viewer's tokens only, so a light theme is a token swap.
- **Not run here:** the real `generate-site.js` and `build-frontpage.js` (HEAD and the Courant
  checkout), the session page's gates, `--check-negative`, the App Shell.

## Decisions only the author can make

1. **The twelve shelves**: the set, the order, every title and line (drafts, in `shelves.json`
   and repeated in `hero.html`). "The mathematics" and "The physics" are named by subject with
   18.313x and Einstein/von Neumann as their lines; they could be the other way round.
2. **The Quantum computing card opens its shelf**, which opens onto FRQTL, rather than FRQTL
   directly as the sketch did. One click more; the shelf also holds the two papers.
3. **Two footer lines on the carousel are new copy**: slide 0, "Claude, asked the same, 1 October
   2026"; slide 4, "Question 1 of eight, in the book". And the five tab labels.
4. **The index opens with the transcript and the apparatus closed**, the verdict and the
   questions open. Open all, or remember only.
5. ~~The session page inside the book takes the library's dark colours~~ **Decided by the author,
   2 October 2026: "The transcript pages should keep the light theme internally for now."** So the
   patch's third rule (the `.in-book` dark tokens) is dropped, and the reader no longer injects
   it; the page keeps the capture's own scheme inside the book. The margin mark and the hidden
   index stand.
6. **`guide/README.md` links `FRQTL.md`** ("see what real quantum computing and P=NP looks like"),
   which the repository does not track. Hold the page, or drop the row; the Quantum computing
   shelf has no guide page until it exists.
7. **The reader's own footer** on a cover ("About this book") is Cowork's wording.
8. (Housekeeping, done.) A read-only `git status` from the sandbox left an empty `.git/index.lock`
   behind; it was removed, as were the two staging archives Cowork made under `~/Code`. Nothing
   else outside `site-src/`, `scripts/generate-site.js` and this hand-off's folder was written.

## Copy that is a draft

Everything below is Cowork's and waits on the author. Nothing else on a page is new except the
quotations' arrangement.

- `shelves.json`: the twelve titles and lines, the card line for Quantum computing, the outside
  links' titles and lines ("FRQTL, in your browser", "The quantum computer the papers describe,
  running.", "Courant Group", "Commercial licensing.", "DeSciX", "The platform the tokens trade
  on."), the question for the Singularity shelf ("Are you the Singularity?").
- `hero.html`: the card row (the same titles and lines); the tab labels "The judgment", "Einstein",
  "von Neumann", "Los Alamos", "EGPT" and their `aria-label`s; "Claude, asked the same, 1 October
  2026"; "Question 1 of eight, in the book"; the Questions button's label.
- `reader.js`: "A book in the library", "n messages", "n documents", "n headings", "The final
  statement" card lines ("n questions, each with where it is answered", "n messages, in the order
  they happened"), "Where you left off", "Where it is answered", "As the prompt asks it", "which it
  is part of", "This part on its own page", "After the questions", "About this book" and its
  paragraph, "← The library", "Index", "Book", "Message n of m", "The author" for `ME`, "This page
  is in …", "Read it in the book →", "Shelf n of m", "Start here", "Read as a book", "Outside the
  library", "Reading lists on this shelf", "The folders on this shelf", "a book, with an index",
  the three not-found notices.
- `generate-site.js`: "The shelves", "A library on an expansive subject: n shelves.", "The
  folders", "Seventeen folders, every file hashed."
- `site.js`: "The shelves", "The folders".

## To see it

```
node scripts/build-claude-session-page.js     # unchanged; apply the .patch first to see D2 from the build
node scripts/build-trial-book.js
node scripts/generate-site.js                  # now also writes site/shelves.json and SITE_DATA.books / .shelves
```

Then `library.html#book:claude-session`, `library.html#book:trial`, `library.html#shelf:losalamos`,
`index.html`, `index.html#q3`.

## Answer to `COWORK_READER_AND_LIBRARY_INTEGRATION.md` (Cowork, 2 October 2026)

Thank you for the three fixes; the shadowed `shelves` was mine. Two things you asked the reader
to say, now said in `site-assets/reader.js` (the only file touched for this answer):

- **Short part titles** (your request 2): the field is `short` on a part (`{ id, title, short?,
  href?, items }`). The reader shows `short || title` in the index, the bar, the cover's cards,
  the shelf mark and the foot nav, and the part's full `title` as the heading of its page and of
  the cover's contents. Emit it from the file names as you proposed ("The opening statement",
  "Instructions to the jury", "Exhibit A", "Exhibit B", "Exhibit C"); the author's pass.
- **The speaker's name** ("Chatgpt"): the reader now takes `who_name` from a turn when the index
  carries it, else maps `ME` → "The author", `CLAUDE` → "Claude", `CHATGPT` → "ChatGPT", else
  shows the word as the file gives it. Emitting `who_name` beside `who` keeps the display form
  with the data's owner; the map is the fallback.

On the rest: request 3 (the trial's four questions as a `questions` part) waits on the author
for where each is answered, agreed; the cut itself can land with empty `answers` and the question
pages will still render (they show "as the prompt asks it" and the parts, and omit the answers
block). The ChatGPT page's light scheme inside its book is the D2 decision applied to its builder
as well, once the author rules on decision 5; the reader's injected rules only take effect on a
page that uses the same variable names. Re-checked after the change: the trial heading, a message
in the Claude book, Question 1(a) — bars and index render, no page errors.
