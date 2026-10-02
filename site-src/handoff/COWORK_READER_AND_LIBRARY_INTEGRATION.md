# Integration of Cowork's hand-back: what the EVIDENCE seat ran, found and changed

2 October 2026, against `COWORK_READER_AND_LIBRARY_HANDBACK.md`. Working tree only; nothing
committed, nothing uploaded (HEAD 56d0dcb).

## Run on the real build (Cowork's copy had no `.git`, so these had not been run)

| Check | Result |
|---|---|
| `scripts/build-claude-session-page.js` and `--check-negative` | builds, 52 messages; the altered word fails the gate |
| `scripts/build-trial-book.js` | 5 parts, 59 headings |
| `scripts/generate-site.js` | FAILED twice, fixed (below), then builds: 691 files, 12 shelves, 3 books |
| Served from `site/` on a local port, headless Chromium, 1280 and 390 wide | no console errors, no failed requests on: the five slides, the landing, two shelves, the three book covers, a question page, a trial heading, a message inside a book, a plain link into a book's page |

## Found and fixed

1. `generate-site.js`: `shelves.map is not a function`. A local `shelves` (the folder cards' markup)
   inside `readingRoomHtml` shadowed the shelves read from `shelves.json`. The local is now
   `folderCards`.
2. `build-frontpage.js`: the deep-link gate refused `library.html#book:…` and `#shelf:…`. The one
   link check (`deadLink`) now resolves a shelf against `site-src/shelves.json` and a place in a
   book against the book's own index, by the reference forms the reader resolves (a question key
   without punctuation, `m<n>`, an item's anchor). Shown failing on an unknown shelf, an unknown
   place and an unknown book.
3. The Los Alamos slide: at the App Shell's inner height (744px at a 1280×800 window) the second
   footer ran under the tab strip. The two-quotation slide's answer column is wider
   (`.slide--duo`, 4fr/9fr); both footers clear the tabs.

## Cowork's requests of the index and the build

| # | Request | State |
|---|---|---|
| 1 | a book for the ChatGPT conversation | done: `scripts/build-singularity-page.js` writes `site-src/books/chatgpt.json` (the judgment, 56 messages, what stands beside it); the Singularity shelf lists both books |
| 2 | short part titles in the trial index | not done: the reader does not read a short title yet; say the field name and I emit it from the file names |
| 3 | the trial's four questions as a `questions` part | not done: cutting the four questions from the jury instructions is mechanical; choosing where the record answers each is the author's |
| 4 | the card row from `shelves.json` | done: `<nav class="jumbo-cards" data-shelves>` is filled by `build-frontpage.js`; the built page is identical to the hand-written row; `thumb_alt` added to the Quantum computing shelf |
| 5 | leads that are only a label | done: a lead of four words or fewer carries the paragraph's next sentence, in the file's words |
| 6 | the session page committed | waits on the author's word; until then a message of the Claude book says the page is not in the bundle (the ChatGPT book's messages open, its page being at HEAD) |

Also: the Claude book's apparatus lists the six filed sources file by file (a book item lands on a
file, and the folder path drew a build warning).

## Seen, not changed

- In a book's bar and index the speaker of the ChatGPT book reads "Chatgpt" / "CHATGPT" (the index
  gives `who: "CHATGPT"`). Say what form the reader wants and I emit it.
- The ChatGPT page inside its book keeps the capture's light scheme (the D2 patch covers only the
  Claude page's builder). The patch itself is not applied; it waits on the author's decision 5.
- A shelf's "Start here" titles come from the bundle at HEAD, so they read 'ChatGPT Says "I am the
  Singularity"' and "Cowork Session 10.01.2026" until the retitled pages are committed.
