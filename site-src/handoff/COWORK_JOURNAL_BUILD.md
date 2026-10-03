# Hand-back from Cowork: the journal's web edition and the viewer's article mode

2 October 2026, on the author's word: "Build the viewer mode for the journal and let's work on
structure of the platform - content is easy to fill in later. What we want is a beautiful layout
that transitions from the editor's traditional introduction with pointers to the articles of note
and then the table of contents and then the articles - each with a listen button if there is a
podcast episode for it." Working tree only; nothing committed, uploaded or deployed. It follows
`COWORK_JOURNAL_PLAN.md` (§1a: the journal is editorial). Stills in `cowork-journal/`.

## What was built

| File | What it is |
|---|---|
| `site-src/issues/2026-10.json` (new) | Issue 1 as data, `egpt.issue/1`: the masthead, the editor's note, the three articles of note, the sections and the order of their articles. An article is named by its slug; its title, deck, author, status and audio are its own front matter. The two machines' essays are items that point at their books. |
| `journal/2026-10/*.md` (new, 12 files) | The articles. Three carry the author's draft from `scratch/editors_letter_ideas.md`, edited (see "For the author"); eight are stubs with a headline and a deck (`status: stub`), shown as "In preparation". |
| `journal/2026-10/audio/placeholder.wav` (new) | **A 20-second tone, not an episode.** It is attached to the editor's note (as the issue's audio) and to the memorial, with `audio_placeholder: true`, so the Listen button and the player can be seen. Remove the two `audio:` lines and the file when the first real episode exists. |
| `scripts/build-journal.js` (new) | Writes `site/journal.html` (the issue), `site/issues/<id>.json` (the issue resolved, for the viewer), `site/journal/<id>/…` (the articles and audio) and `site/images/ssg-cover.jpg`. Reads the working tree, not HEAD. Only dependency: the vendored `marked`. |
| `site-src/journal/page.css`, `page.js`, `ssg-cover.jpg` (new) | The issue page's styles, its player, and the masthead art (from `SSG-Studio/public/assets/ssg_cover.jpeg`, reduced to 1000 px). |
| `site-src/site-assets/journal.js` (new) | The viewer's article mode, for any `journal/<issue>/<slug>.md`. |
| `site-src/site-assets/site.js` | Five marked lines: a journal path opens even when it is not in the HEAD file list; `navigate` hands a journal article to `EGPTJournal.render`; `navigate` and `goHome` tell the journal when the reader leaves; `EGPTViewer` also exposes `parseFrontMatter`, `headingIds`, `rebaseRelativeUrls`, `wrapTables`. |
| `site-src/site-assets/reader.js` | One line: opening a book or a shelf leaves the journal's mode. |
| `site-src/site-assets/style.css` | One new section, "the journal's article mode". |
| `site-src/template.html` | `<nav id="journal-nav" hidden>`; `journal.js` loaded; "The journal" in the sidebar's foot. |
| `scripts/generate-site.js` | One line: runs `build-journal.js` after the collection is written, before the front page. |

## The issue page (`journal.html`), top to bottom

1. **Masthead**: the cover, the name, the line and the tagline, "Listen" for the issue's episode.
2. **From the editor**: the letter, with its links into the issue; beside it, **Of note in this
   issue**, three numbered pointers that stay in view while the letter is read.
3. **Contents**: every piece by section, with deck, byline, reading time, and "Audio" where a
   piece has an episode.
4. **An opener per article**: number, section, headline, deck, byline, the first paragraphs fading
   out, "Continue reading" and Listen. A machine's essay opens on its own verdict instead.
5. **Foot**: the pass-it-along line, and one fixed player for whatever is playing.

An article opens in the viewer (`library.html#journal/2026-10/<slug>.md`) as a magazine page:
section, headline, deck, byline, Listen, the text, previous and next in the issue. The sidebar is
the issue's contents. No provenance strip, record chips, hashes or file links appear on it.
Quotation marks and dashes are set as type on both pages.

## Listen

A piece has a Listen button when its front matter has `audio:` (a file beside the article, or an
`https` enclosure URL), with optional `audio_title:` and `audio_duration:`. The podcast feed
(`…/prod/egpt/assets/egpt/feed.xml`) has no episodes today, and its channel title is "EGPT: the
New Manhattan Project", not the journal's name. When `podcast_publish_episode` returns an
`episode_url`, that URL is what goes in `audio:`.

## Not done, and needed from the seat

1. **A full site build.** I ran `build-journal.js` and re-rendered the viewer from the template
   in a copy; `generate-site.js` itself has not been run with these changes.
2. **`journal.html` is beside the front page, not yet the front page.** Making the current issue
   `index.html` is a `build-frontpage.js` decision (the App Shell full view, the `#<path>`
   forwarder, the share card).
3. **The deny lint and the journal's files**: `journal/` is new at the repository root; confirm
   the site upload and the KB manifests treat it as intended.
4. The circular (email) and the feed's show notes from the same issue file: not started.
5. Reduced motion, phone width and print are handled; a light scheme is not (the page is dark).

## For the author: the edits made to your draft

The three drafted pieces are your text, edited for grammar and flow. Changes of substance:

- **The random-walk line is Rota's, not Ulam's.** The library holds it in *Indiscrete Thoughts*:
  Ulam's "proposal for the reconstruction of the CGS system on the basis of random walk". The note
  now says Rota recorded Ulam's idea.
- **The conference was 1985**, not 1986 (20–25 May 1985, per your All-In letter's citation).
- **Ulam's obituary of von Neumann is 1958**, not 1957.
- **Cut for now**: "the most searched term on the internet today"; the room "across from President
  Eisenhower's"; "$3.5 Trillion"; "ALL secret work". Each needs a source before it is printed, or
  your word to print it as your claim.
- **Dropped**: the two unfinished paragraphs in the memorial (the phenomenology fragment and the
  second "When Stanislaw Ulam coined…" start).
- Headlines, decks, the masthead line ("A journal of decentralized science") and the foot's
  pass-it-along line are suggestions.
