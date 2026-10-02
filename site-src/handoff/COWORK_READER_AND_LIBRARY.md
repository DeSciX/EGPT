# Hand-off to Cowork: the session reader, the front page's first impression, and the library as a library

Written 1 October 2026 by the assisting model in the EVIDENCE seat, for the Cowork design session
and for the author. The earlier hand-off and its hand-back are beside this file
(`COWORK_LIBRARY_UX.md`, `COWORK_LIBRARY_UX_HANDBACK.md`); their work is in the working tree and
this one builds on it.

## 0. What is being asked, in the author's words

On the library as a whole (1 October 2026):

> "we'll discuss organizing the digital library better since it is supposed to be a library about
> EGPT itself, the history, Ulam/von Neumann/Rota, the singularity, the mathematics and physics,
> etc.. but it is one note in its current presentation as if it is about a single document as
> opposed to a library on an expansive subject."

On the front page's first impression (1 October 2026):

> "I'm thinking a good place to start is what is in the carousel. One panel on the Singularity
> essay is fine, but additional quotes from documents might be in a question and answering
> document format:
> - Q: Did Einstein believe modrn physics was flawed? A: Einstein's castle in the air quote with
>   emphasis on "all of modern physics"
> - Q: Did von Neumann believe half of mathematics was wrong? A: 1947 Mathematician quote
> - Q: Were the scientific leads of Los Alamos National Labs secretly working on a theory of
>   everything? A: Rota's Nomen Est Omen ...
> - Q: Is EGPT the theory they were looking for? A: Claude's answer ....
>
> I'd like to get to the attached view as part of the very first impression so that smaller cards
> are above the fold under the carousel. We also need cards for P=NP, Quantum computing where the
> quantum computing is thumnail of the Impossible Things, Running"

On this hand-off (1 October 2026):

> "What I'd like to do is break the design session out to Cowork which has better design tools
> and let you coordinate the integration of the following components and additions that are
> needed:
> 1) The /Users/essam/Code/Unkamon/EGPT-Evidence/12_SINGULARITY/Claude/Cowork_Session_10.01.2026.md
>    needs an html build like ChatGPT has (styled in the same way with the bubbles denoting who is
>    talking etc..)
> 2) The Claude response deserves an interactive reader and component for it that could
>    potentially also be used for reading the trial. We could think of it as a book with an index
>    similar to a vitepress site. The book is about a trial like process, the user can read the
>    final verdict, jump to particular sections/topics like the 8 individual questions, or read
>    the entire transcript as in (1).
> 3) A plugin skill that works in Claude where a user can have claude use my answers and approach
>    in a sub-agent to adverserially re-run (or assist them in having) the conversation themselves
>    against an adverserial claude. Ideally this skill will also have the user's assistant bring
>    up relevant primary sources from the web app so the user can read those and learn, e.g. what
>    the three P=NP proofs are or see von Neumann's "The Mathematician" etc.."

On the first drafts (1 October 2026), which binds the design:

> "The questions do not provenance cross references - that is what makes them questions. The whole
> point being that humans are supposed to ask questions and are capable of understanding the
> primary sources for answers. all quotes should be cited to their primary source per the corpus
> - Einstein wording emphasizing the "the rest of modern physics" and use the original quote.
> - Scientific Leads: Rota and all quotes should be cited to the primary source per the corpus NOT
>   the trial. Rota's Nomen Est Omen quote should emphasize the Los Alamos publication as the
>   source AND list Rota's official government title "Senior Fellow to the Directors Office, Los
>   Alamos National Laboratory". Ulam's quote on von Neumann's work regarding a new mathematical
>   discipline of which he only made a start should be below and Ulam's self-described role/title
>   at LANL in "The Adventures of a Mathematician"
> - In general, the headers and provenance should be in footers they are entirely distracting to
>   human readers and are written in a tone that is machine oriented.
> - skill name "/am-i-the-singularity"
>
> The index should be multi-level and be expandwed to level 1 initially with the full top level
> question written out so that a reader sees them in one convenient initial pass."

And on the questions the seat put to him (1 October 2026):

> "1. use my wording as it is the reasonable interpretation of the two primary sources.
> 2. Those records should be consolidated and the page cited one should check if we have a
>    transcription error.
> 3. Sagan's standard against string theory
> 4. keep the cut
> 5. The title's should be human descriptive "Asked to [ChatGPT/Claude]: Are You The
>    Singularity?" Subtitle "Answer" ' ....' " using the most evocative pull quote that fits
> 6. Structure to assume that we will be publishing - shouldn't everything be relative links?
> 7. Delete it there."

## 1. Who does what

| | Cowork (design) | The EVIDENCE seat (integration) |
|---|---|---|
| Words on a page | lays them out | builds them from the held files and gates them |
| The reader | designs and writes the component (markup, CSS, client script) | owns the index data it reads, wires it into the site build, verifies it on the served site |
| The front page | designs the carousel, the card row, the shelves | owns `scripts/build-frontpage.js` and its gates; cuts every quotation from its held file |
| The skill | reviews how an assistant opens sources in the web app, and proposes deep-link changes | owns the skill and agent text (the author's pass decides it) |
| Commits, pushes, uploads | none | all, by pathspec, after the author's pass |

Cowork writes into the working tree and hands back; it does not commit, push, upload, or run
`descix`.

## 2. What exists now (all in the working tree, none committed, PROD unchanged)

### 2.1 The session as a page (item 1, built)

- `12_SINGULARITY/Claude/Cowork_Session_10.01.2026.html`, built by
  `scripts/build-claude-session-page.js` from the transcript beside it. Same format as the ChatGPT
  capture's page (`12_SINGULARITY/ChatGPT_Logs/I_am_the_Singularity.html`): the author's turns as
  bubbles on the right, the model's as plain text, each message numbered with `id="m<n>"`.
  52 messages. Every sub-heading and every verdict line has an anchor (`m46-q8`, `m32-q5ii`, …).
- Its gates: the turns re-joined are the file byte for byte; each message's rendered text carries
  the file's letters and digits in order (shown to fail on an altered word with
  `--check-negative`); the provenance paragraph is found in the review file it is quoted from;
  every index anchor is on the page once.
- The page is titled "Asked to Claude: Are You The Singularity?" with the answer under it in the
  model's own closing words, linked to where they stand in message 46. The ChatGPT page takes the
  same form ("Asked to ChatGPT: Are You The Singularity?", its answer the judgment of message 55).
- Under the title are the questions: the eight top-level questions written out in full, as the
  prompt asks them; each opens to where it is answered and to its parts (1(a), 1(b), 1(c)), which
  open the same way. What the record is and how it was kept is at the foot of the page, in plain
  words. The foot's wording is the seat's draft and waits on the author.

**Cowork may restyle this page** (the CSS and the wrapper markup the build script emits; propose
the change as a diff to the script's `CSS` and section template). **It may not change a word of a
message**; the gate will refuse the build if one changes.

### 2.2 The index a reader consumes (item 2, the data is built; the component is yours)

`site-src/books/<id>.json`, schema `egpt.book/1`, served at `books/<id>.json` on the site. Two
exist, so the component is designed against both from the start:

| Book | Built by | Parts |
|---|---|---|
| `claude-session` | `scripts/build-claude-session-page.js` | `verdict` (the final statement, message 46) · `questions` (two levels: the eight questions, each with its full text, the anchors where the transcript answers it, and its parts) · `transcript` (all 52 messages, with who spoke and the opening words) · `apparatus` (rules, prompt, operating instructions, launch prompt, review, sources, the author's capture) |
| `trial` | `scripts/build-trial-book.js` | the five files of `01_TRIAL` in reading order, each with its own headings as items (59) |

The shape, in full:

```
{ schema: "egpt.book/1", id, title, source, page?, messages?, generated_by,
  parts: [ { id, title, href?, items: [
      { title, href, message? }                                   // a place to land
    | { key, title, text, asked, answers: [ { lead, href, message } ], parts?: [ …the same… ] } // a question in full, where it is asked, where it is answered, its parts
    | { message, who, href, opens }                               // one turn of a transcript
  ] } ] }
```

Every `href` is a collection path, with `#anchor` where it lands inside a file; the viewer opens
it as `library.html#<path>#<anchor>`. `lead` and `opens` are the file's own words, cut by the
build. Titles of parts are the seat's draft. If the design needs a field the index lacks, ask for
it in the hand-back; do not compute it in the component (the anchors have one owner).

### 2.3 The front page draft (staged)

`site-src/frontpage/egpt/hero.html`, `teleprompter.js`, and the css in
`site-src/frontpage/egpt.json`: the jumbotron carousels five slides. The first is the judgment
with the screen capture. The other four are a question standing alone, then its answer in the
source's words: Einstein to Besso; von Neumann's "The Mathematician"; Rota in *Los Alamos Science*
with Ulam on von Neumann below it; Claude's verdict on Question 1 (Sagan's standard against
string theory), quoted with the question as it was asked. Each answer's footer names
the speaker and the primary source as the corpus records it and links to the corpus record
(`library.html#record:<id>`); Rota's and Ulam's footers carry their Los Alamos titles in the
sources' own words (Rota's in the author's wording, "Senior Fellow to the Director's Office, Los
Alamos National Laboratory"). No slide has a header. A row of ten small cards sits under the jumbotron,
above the fold at 1280×800; the P = NP and Quantum computing cards are new, and the Quantum
computing thumbnail is the author's capture of "Impossible things, running"
(`site-src/frontpage/egpt/images/impossible-things.png`). The older "You are here to…" grid lower
on the page is deleted on the author's word; the row under the jumbotron is the one set of shelves.

### 2.4 The skill (item 3, drafted)

`templates/plugins/egpt/skills/am-i-the-singularity/SKILL.md.tmpl` and
`templates/plugins/egpt/agents/assessed-model.agent.md.tmpl` (rendered into `plugins/egpt/`). A
fresh model sits in a sub-agent with the author's launch prompt; the reader's assistant sits second
chair, puts the author's turns or coaches the reader, sets each answer beside the recorded one by
anchor, and opens sources in the viewer. Every path in both is relative to its repository's root,
with one rule for where a path lives (a clone, the published repository, the library), because the
structure assumes the repositories are published. Both are drafts for the author's pass.

**Relative links everywhere.** The same holds for anything Cowork writes: a link is a
collection-relative path (`library.html#<path>`, `books/<id>.json`, a file beside the page), never
an absolute address of the site or a path on a disk.

## 3. What Cowork is asked to design

**D1. The reader (the book).** One component, driven by a book index, usable for the session and
for the trial. The author's picture is "a book with an index similar to a vitepress site": a
persistent index at the side, the reading pane beside it, previous and next, a place in the book
you can link to. Three ways in, per his words: read the final verdict; jump to a question or
topic; read the entire transcript. For the session, a question's page should show the question as
the prompt asks it and the places it is answered, and let the reader step into the transcript at
that message and keep reading. It lives in the library viewer (`site-src/template.html`,
`site-src/site-assets/site.js`, `style.css`) or beside it; say which and why.

**D2. The session page's look**, if the bubbles want more than the ChatGPT capture's format gives
them (long model turns, tables, code, the index at the top).

**D3. The front page's first impression.** The carousel as question and answer, and the card row
under it, above the fold. The staged draft is a working sketch, not a design. Thumbnails for the
other cards, if the design wants them, come from files the collection or the FRQTL site already
holds.

**D4. The library as a library on an expansive subject.** The front page and the viewer's landing
today read as one note about one document. The subjects the author names: EGPT itself; the
history; Ulam, von Neumann, Rota; the Singularity; the mathematics; the physics. The card row is
the seat's first guess at the shelves. Design what a shelf is when you arrive at it (its own page,
its documents, its reading list from `site-src/spine.json`), and how the front page, the viewer's
landing and the guide pages agree on one set of shelves.

**D5. Sources from the assistant's side.** When the skill's assistant "brings up" a document, the
reader gets a link into the viewer. Say what that landing should look like for a reader arriving
mid-conversation (the document, where it sits on its shelf, how to get back), and whether the
viewer needs a link form it does not have.

## 4. Rules that bind the work

They are the author's and bind every seat; §6 of `COWORK_LIBRARY_UX.md` gives them in full.

1. Every quotation is verbatim and names its held file (`data-src`); the build cuts or checks it.
   Emphasis is markup inside the quotation, never a changed word.
2. Record, never interpret. No sentence tells the reader what a document means or what to conclude.
3. Never write an absence as a finding.
4. Nothing under a numbered collection folder is edited by a design session. The pages built from
   them change only through their build scripts.
5. Copy that is not a quotation (titles, card lines, labels) is a draft until the author passes it;
   mark what you wrote.
6. Phone width works; light and dark both work in the viewer; reduced motion gets no auto-advance.

## 5. How it comes back

A hand-back beside this file, `COWORK_READER_AND_LIBRARY_HANDBACK.md`, in the form of the last one:
what changed, by file; what you need from the index or the build that is not there; the checks you
ran; the decisions only the author can make; stills in `site-src/handoff/cowork-reader-and-library/`.
The seat then runs the gates, builds from a clean tree, verifies on the served site, and commits by
pathspec after the author's pass.

## 6. To see it

```
node scripts/build-claude-session-page.js     # the session page and its index
node scripts/build-trial-book.js              # the trial's index
node scripts/generate-site.js                 # the whole site into site/
```

The site build bundles the files tracked at HEAD, so the session page enters `site/` when it is
committed; until then the seat copies it into `site/` by hand after each build. The author serves
`site/` through the App Shell from the repository root; the pages below are then at
`https://localhost:5180/p/egpt/<path>`:

- `index.html` (the front page)
- `12_SINGULARITY/Claude/Cowork_Session_10.01.2026.html` (the session page)
- `books/claude-session.json` and `books/trial.json` (the indexes)

Each page also opens straight from disk for layout work.
