# Cowork brief: the front page as the current issue, and the circular

Written 2 October 2026 by the EVIDENCE seat for the Cowork design session, on the author's
rulings of the same day. It asks for two designs; the data they render is already in the tree.

## What exists now (all committed on `main`)

- `site-src/issues/2026-10.json` — issue 1, schema `egpt.issue/1`: masthead (the cover's
  language: *Standing on the Shoulders of Giants*, "Presented by DeSciX", "The untold drama
  behind tomorrow's tech."), the theme in the author's words, the table of contents by shelf
  with bylines, the audio edition's episode, the circular's subject. `scripts/check-issue.js`
  gates it; run it on anything you change in the file.
- `journal/2026-10/` — the author's three pieces, split from his draft with front matter,
  status `draft` (his pass pending; do not edit his words).
- `site-src/shelves.json` — the twelve shelves are the departments ("Make money" is now
  "Decentralized science").
- The cover art: `../SSG-Studio/public/assets/ssg_cover.jpeg`, 2048×2048, the only art; a
  web-size derivative and a horizontal masthead variant are yours to derive from it.
- The front page generator and its fragments (`scripts/build-frontpage.js`,
  `site-src/frontpage/egpt/*`), the carousel, the card row from the shelves, the reader.

## The author's rulings (verbatim)

1. "use the cover language (we'll re-review later)"
2. "The 12 shelf cards are good starters for the articles. Make Money turns into Decentralized
   Science - giving open source an economic model and rewarding creators."
3. "Monthly - we've got lots of content for many issues to come as I open-source my vault of
   past patents and efforts from Aspire VC (Powch, Diabetter etc. )"
4. "The Singularity pieces should carry the LLM bylines. The rest should be mine."
5. "The first episode should be EGPT: the New Manhattan Project (which gives a theme tot he
   first journal - from the history which brought von Neumann/Ulam together to the handoff to
   Rota to present day FRQTL (cellular automata, computing, quantum mechanics, short codes vs
   long codes and non-linear dynamics) and DeSciX (game theory, economics, philosophy, and law)"

## Asked of Cowork

1. **The front page as the current issue.** Masthead from the cover; the editor's note (his
   words, held, first paragraph with "read the note"); the carousel as "from this issue"; the
   table of contents as the card row above the fold, grouped by shelf, each card title + dek +
   byline, `planned` items shown as coming without a link; then the shelves, the reading lists,
   the archive of issues, and the audio block (player + feed + the overview's sources) in place
   of `egpt/podcast.html`. Read everything from the issue file; invent no copy — a card with
   an empty `dek` shows none.
2. **The circular.** `site/issues/<id>.email.html` and `.txt` rendered by a small
   `scripts/build-circular.js` from the same file: masthead, note, TOC with links made absolute
   from `self_host`, one "pass it along" line pointing at the Decentralized science piece, no
   tracking. Sent by the author; the build only renders.

Same form as the earlier hand-backs: work on a copy, hand back a `_HANDBACK.md` with every
file touched and every decision only the author can make; the seat runs the gates
(`check-issue.js`, the front-page quotation gate, `generate-site.js`) before anything is
believed, and nothing here is uploaded until the author has seen it served.
