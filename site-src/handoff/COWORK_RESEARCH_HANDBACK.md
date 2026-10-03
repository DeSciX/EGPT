# Hand-back from Cowork: the evidence ledger, a standing research assistant, and the timeline component

3 October 2026, for the local agent (EVIDENCE seat) and the author. Working tree only; nothing
committed. Stills in `cowork-timeline/`.

## 1. What is on disk

| Path (EGPT-Evidence) | What it is |
|---|---|
| `scratch/research/rota-succession-evidence-ledger.md` | The evidence ledger for the circumstantial case on Rota and von Neumann's succession: about 510 dated facts in five threads (A von Neumann, Courant, funding, the last year; B Fine Hall, Church, Nash, Schwartz; C Los Alamos, Ulam, Metropolis, 1979; D online pulls; E Yale, the Silliman Lectures, Walter Reed, lattice theory, co-presence 1950–59), each with its quotation and source, and a "Sources still to pull" list closing each thread. |
| `scratch/research/ledger/A…E-*.md` | The five threads as separate files. |
| `scratch/research/*.md` (15 briefs + README) | The earlier briefs. **Superseded in form** by the ledger: they carry commentary the author has ruled out. Keep them only as a quarry of located sources and URLs. |
| `site-src/handoff/research-assistant.agent.md` | Draft definition of the standing research assistant (see §3). |
| `journal/2026-10/the-line-of-succession.md`, `journal/2026-10/timelines/rota-succession.json`, `…/rota-succession.questions.json` | The ledger as an interactive article (see §4). |
| `scripts/ledger-to-timeline.js`, `site-src/site-assets/timeline.js`, `timeline.css` | The converter and the component. |

## 2. For the local agent: move the research into EGPT-research

The author's instruction: "include instructions in a handback to the local agent to move the
items into the EGPT-Research repo."

1. Move `scratch/research/rota-succession-evidence-ledger.md` and `scratch/research/ledger/` into
   EGPT-research, under the place that repository keeps evidence work (it has `evidence/` and
   `quotations/`; you know which). Move the fifteen briefs with them, in a subfolder marked as
   superseded working papers.
2. The timeline's two JSON files and the article stay in EGPT-Evidence under `journal/`; the
   ledger is their source, so record the ledger's new path in
   `journal/2026-10/timelines/rota-succession.questions.json` if you want regeneration to be one
   command.
3. New quotations worth holding in the corpus (Ulam's "most eminent 'influencee'", "fill the gap
   left by the loss of von Neumann", Waterman on the Director's Fellows, the 1977 abstract's
   sentence on computational complexity, Klara's preface on the Silliman invitation, Rota on
   Walter Reed, the lattice passage at *Indiscrete Thoughts* p. 52, Schwartz on the ONR contract)
   enter through the author's corpus pipeline in EGPT-research, each checked against the page.

## 3. For the local agent: create the standing research assistant

The author's instruction: "create a standing research assistant CLAUDE.md agent that includes the
assistive instructions you operated under plus the on disk research tools (the local agent can
look them up) for scanning primary sources using Gemini instead of OCR."

`site-src/handoff/research-assistant.agent.md` is the draft: the author's instruction of 3
October verbatim, the rules the ledger was built under, the ledger format, and the working
pattern. Two sections are left for you, marked `LOCAL AGENT`:

- **Scanning primary sources**: look up the Gemini scanning tools on disk and record, for each,
  the path, the command, its inputs and outputs, where transcriptions are filed, and how a
  transcription is checked against the page image.
- **Where things go**: the paths you chose in step 2.

Install it where EGPT-research keeps its agents (`.claude/agents/`, beside
`quotation-researcher.md` and `evidence-curator.md`), and add a pointer in that repository's
`CLAUDE.md`. If `quotation-researcher` already covers part of this, say which defers to which.

## 4. Sources still to pull: who pulls what

The author's split: "The local agent will look up the repo resident sources still to pull and you
can pull the online ones." Cowork pulled the online ones (threads D and E). What remains is in
the lists closing each thread; the ones that are held, or likely held, on disk:

| Source | What to pull from it |
|---|---|
| `02_VON_NEUMANN/von_Neumann_Selected_Letters.pdf` | Marina von Neumann Whitman's Introduction, pp. xv–xviii, in full (her words on his government work; "double life" or the nearest wording); Lax's Foreword; every letter to or naming Courant, Church, Dunford, Kakutani, Strauss, Ulam; the table of correspondents; any letter naming Yale or the Silliman Lectures. |
| `03_ULAM/Science Computers And People.pdf` | Rota's introduction in full; Ulam's essays on the brain, computers and von Neumann; the front matter. |
| `04_ROTA/Rota_Interview_1985_Los_Alamos_Science.pdf` | The headnote and closing note as printed; every sentence on AI, psychology, the Director's office. |
| `04_ROTA/Indiscrete_Thoughts/` captures and the full book | The index pages for von Neumann not yet read in context (75, 146, 209, 220); "Fine Hall in its Golden Age", "Light Shadows", "The Lost Café" with page numbers; ch. XX pp. 209–227 (Rota on AI and Minsky). |
| Ulam, *Adventures of a Mathematician* (printed copy) | The words between the fragments on pp. 250 and 263–265; indexed p. 291; the Los Alamos 1943 chapter. |
| Nasar, *A Beautiful Mind* (printed copy) | Full paragraphs at pp. 220, 223, 239, 241, 251, 257 and notes pp. 420, 428. |
| Reid, *Courant* (printed copy) | Full paragraphs at pp. 20, 183, 198–99, 236, 278, 283–287, 300. |
| `04_ROTA/Guidi_Notes…`, `Rota-Baclawski-Prob-Theory-79.pdf` | Funding acknowledgments and prefaces. |
| `00_OUTPUTS/` reports and the Rota chronology docx at the workspace root (`Rota_Career_Documentary_Chronology_Final_Evidentiary_v5.docx`) | Any dated fact with a primary citation not yet in the ledger. |

Archives that need a person or a request, not a fetch: Yale RU 819 Series V (the Silliman
Lecture Committee's 1954–56 files: who invited von Neumann); Library of Congress von Neumann
Papers container list; Ulam Papers (APS) Rota and von Neumann folders; Rota Papers (MIT);
Church Papers Box 21 Folder 3 ("Rota, Gian-Carlo"); Courant Papers Box 91 Folder 10 ("von
Neumann, 1946–1957") and the 1958 IMS/AEC statement; LANL archives (the 1971 Director's Office
Fellow appointment).

## 5. The timeline component

A reusable interactive article for the journal, driven by one JSON file.

- **Data**: `egpt.timeline/1`: `{ title, dek, questions: [{ id, label, question, color }],
  notes: [{ year, title, text }], facts: [{ id, date, year, fact, evidence, source, url?, held?,
  tags: [question ids], note? }] }`. `scripts/ledger-to-timeline.js` writes it from a ledger and
  a questions file; the questions file carries the title, the questions and colours, the rules
  that tag facts, hand-set tags (`overrides`) and the author's notes.
- **In an article**: front matter `timeline: timelines/<id>.json`. The article's text is the
  introduction; the timeline follows. `build-journal.js` checks the file and marks the piece
  "Interactive timeline, 1924–2000" on the issue page.
- **What the reader gets**: the author's questions as a numbered, coloured key, each a filter with
  its count; a strip showing where the facts fall across the years (it stays in view; a year on
  it is a jump); the years and facts in order, each fact carrying the numbers of the questions it
  bears on; and beside them the evidence for the fact under the pointer or the keyboard focus:
  quotation, source, a link to open it, the author's note. A click pins it; Esc or "Unpin"
  releases. Author's notes can be set into the timeline at a year. Holdings of archives are
  gathered last, under "In the archives". On a phone the evidence opens under the fact.
  `#journal/…/the-line-of-succession.md#f-<fact id>` opens on a fact.
- **Drafts for the author**: the article's title, deck and three paragraphs of introduction; the
  five questions and their wording; the two notes (1957, 1979); and **the tags, which were
  assigned by keyword rules and need his eye** (use `overrides`).
- **Files touched**: `site-assets/timeline.js`, `timeline.css` (new); `journal.js` (mounts a
  timeline when the front matter names one); `style.css` (two lines, `.jr--wide`);
  `template.html` (loads both); `build-journal.js`; `site-src/issues/2026-10.json` (the article
  added to The History).
- **Not run**: the full site build. Checked in a preview copy at 1280 and 390 wide, no page errors.
