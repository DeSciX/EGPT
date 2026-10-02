# Hand-off to the EVIDENCE seat: the library as a journal — *Standing on the Shoulders of Giants*

Written 2 October 2026 by the Cowork design session, from the author's messages of the same day,
for the EVIDENCE seat (integration) and the author. It is a plan and a list of things to track
down, not a build: nothing in the tree changed for it. It stands on the two hand-backs beside
this file (`COWORK_LIBRARY_UX_HANDBACK.md`, `COWORK_READER_AND_LIBRARY_HANDBACK.md`), whose work
it reuses almost whole. The author's draft it restructures is `scratch/editors_letter_ideas.md`,
untouched.

## 0. What is being asked, in the author's words

> "As I've been thinking about how to launch all this and how you've been laying it out I'm
> realizing that perhaps the best way to do this is to be an actual journal for decentralized
> science - SSG by DeSciX which is distributed off the digital library base of work in the
> EGPT-Evidence repo (the EGPT communities open core).
>
> What was becoming an unwieldily letter to friends and associates about the launch could then be
> restructured as a traditional editor's introductory "what's in this issue" type note and then
> each item can get link to the full coverage so that FRQTL computing can get a full article with
> primary source references in the repo or externally and doesn't have to compete in the same
> space with the LLM's singularity articles (each of ChatGPT and Claude can then get their own
> self-penned article and the SSG's journal table of contents can have a brief description). This
> fits well with the journal's table of contents / circular via email linking back to the live
> site and the front page of the site being the current issue. The cards and readers etc. marry
> well with this. And the initial campaign for earning tokens can then become as simple as
> passing along the journal ... and the SSG podcast can a notebook LM generated overview of that
> month's issue. So in this month's issue each of the sites can get it's own article plus
> additional articles , e.g., DeSciX.net gets an article about decentralized science/Game
> Theory/and wealth distribution of the upcoming Anthropic / Open AI IPO's (like the LLM
> singularity essays, and other selected content like) . I would also add an article about
> whether the OpenAI Navier-Stokes proof is valid ... etc..
>
> Thoughts on how this can be structured to keep things more manageable and streamlined so we are
> killing multiple birds with one stone?"

And on the name:

> "SSG is "Standing on the Shoulder's of Giants" and is the Apple podcast backend microservice
> that pairs with the site. There is coverart etc. for it also"

## 1. The shape, in one paragraph

The library records; the journal argues. Everything under the numbered folders keeps its rule
(verbatim, cited, no interpretation). A journal article is editorial, in the author's voice or a
machine's, and every claim it leans on is a link into the library where the reader checks it. An
**issue** is one data file; from it the build renders three editions of the same table of
contents: the web edition (the front page *is* the current issue), the circular (an email, the
TOC with absolute links), and the audio edition (one episode of the SSG podcast per issue, its
show notes the same TOC, its enclosure that month's overview). Articles are markdown files held in
the repository, so the quotation gate, the checksums, the viewer, the reader and the provenance
footers cover them for free. Each site gets its article in the issue instead of competing on one
front page; the token campaign is "pass the journal along"; past issues are the archive.

## 2. What exists that this reuses

| Already built | Used as |
|---|---|
| `scripts/build-frontpage.js` + `site-src/frontpage/egpt.json` and fragments | the web edition: masthead, editor's note, pull-quote carousel, TOC cards |
| The Q&A carousel and the card row (`egpt/hero.html`, 1 Oct hand-back) | the issue's pull quotes; the TOC cards (the shelves move one section down) |
| `site-src/shelves.json` | the journal's standing sections ("departments"); an article carries a `section` that is a shelf id |
| The reader (`site-assets/reader.js`, `books/*.json`) | the two self-penned LLM articles, already books with indexes; any long article |
| The viewer's provenance strip, quotation figures, record chips | every article's citations into the library |
| `site-src/frontpage/egpt/share/`, `share.json` | the issue's and each article's share card |
| `microservice/` (the SSG podcast server: `podcast_create_show`, `podcast_publish_episode`, `podcast_regenerate_feed`, `podcast_validate_feed`; feed at `storage.googleapis.com/descix-assets-public/prod/egpt/assets/egpt/feed.xml`) | the audio edition's publisher |
| `../SSG-Studio` (the production pipeline: INGEST → … → EXPORT, projects `launch-*`, `18313x-session0`) | where an episode is produced before `podcast_publish_episode` |
| `plugins/egpt/skills/contribute`, `guide/make-money.md`, `guide/get-involved.md` | the "pass it along" campaign's mechanics |
| `site-src/frontpage/egpt/podcast.html` | to be replaced by the audio edition block of the issue |

## 3. The issue as data (proposed schema, `egpt.issue/1`)

`site-src/issues/2026-10.json`; the current issue named in `site-src/frontpage/egpt.json`
(`"issue": "2026-10"`), past ones listed by the folder.

```
{ schema: "egpt.issue/1", id: "2026-10", number: 1, title, date, masthead: { name, line, cover },
  note: { file },                                   // the editor's note, a held markdown file
  quotes: [ { text, src, cite, question? } ],      // the carousel: gated, as now
  contents: [ { id, section, title, dek, author, kind,   // kind: article | book | essay | howto | audio | external
                href,                                   // library.html#<path>, #book:<id>, or https:// for external
                sources?: [paths or record ids] } ],
  audio: { show, episode_guid?, enclosure?, overview_sources: [paths] },   // the audio edition
  circular: { subject, preheader }                                          // the email
}
```

Rules the build enforces: every `href` into the library resolves at HEAD; every `src` is gated;
`section` is a shelf id; `kind: book` names a book in `books/`; an external `href` is `https`
and is listed in `URLS.md` or the issue's own sources table. Titles, deks and the masthead line
are the author's (or marked draft).

Where articles live: `journal/<issue-id>/<slug>.md` at the root beside `guide/`, each with front
matter (`title`, `dek`, `author`, `section`, `date`, `sources`). Not under a numbered folder: the
numbered folders are evidence, the journal is editorial, and the viewer already shows front matter
as a provenance card.

## 4. Three editions from one file

1. **Web** (`index.html`): masthead with the SSG cover art; the editor's note (his words, held and
   gated, read in full or as the first paragraph with "read the note"); the carousel as "from
   this issue"; the TOC as the card row, grouped by section, each card title + dek + author,
   above the fold where the shelves were; then the shelves (standing sections), the reading
   lists, the archive of issues, the audio edition block (player + feed + the overview's sources).
2. **Circular** (`site/issues/2026-10.email.html` and `.txt`): the same masthead, note and TOC,
   links made absolute from `self_host` at render time — the one place absolute links belong — a
   single "pass it along" line pointing at the article that explains the tokens, no tracking.
   Rendered by the build, never composed by hand; sent by the author.
3. **Audio** (the SSG podcast): one episode per issue. Title = issue title; description and show
   notes = the editor's note's first paragraph + the TOC with links; artwork = the show's cover;
   enclosure = the NotebookLM overview of that issue's article files (the `overview_sources`
   list is exactly what is given to NotebookLM, so the episode's sources are on the record),
   filed back into `journal/<issue-id>/` and listed in `contents` as `kind: audio`. Published
   through the microservice's `podcast_publish_episode` (MP3 fast path), the feed regenerated.

## 5. Issue 1, from the author's draft

`scratch/editors_letter_ideas.md` is three pieces, and the first issue is mostly already written:

| Section (shelf) | Article | Source | State |
|---|---|---|---|
| Front | **Editor's note: what's in this issue** | the draft's first two paragraphs ("Today, with my patent application…" and "The science behind this…") + one sentence per article | restructure, his words |
| The Singularity | **I am GPT-5.6 Sol** (self-penned) | `12_SINGULARITY/ChatGPT_Logs/I_am_the_Singularity.html` | exists; needs its book index (hand-back §"What I need" 1) |
| The Singularity | **Asked to Claude: Are You The Singularity?** (self-penned) | `12_SINGULARITY/Claude/Cowork_Session_10.01.2026.html`, book `claude-session` | exists |
| The Singularity | **Run it yourself: /am-i-the-singularity (Sass)** | the skill; the draft's "Do it to avert the Singularity" | howto, from the skill text |
| The Science | **FRQTL: impossible things, running** | the FRQTL site; `10_PAPERS/…`; the author's capture | to write |
| The Science | **Maxi and GAPI** | GodsWorld; `13_MAXI/`; the Feynman quote | to write |
| The Science | **Is OpenAI's Navier–Stokes proof valid?** | `guide/avert-the-singularity.md` §"A Dark Age of Idiocy"; the session's Question 1(c) | to write |
| The History | **Standing on the Shoulders of Giants: a memorial** (the title piece) | the draft's third section, from "I owe Gian-Carlo Rota a memorial…" | his words; sources: Barrier of Meaning, *Los Alamos Science* 1985, Ulam's BAMS obituary, the trial record |
| The Economy | **Let's build a better AI "company" together** (800M tokens, the five "do it for…") | the draft's second section | his words; the campaign's mechanics live here |
| The Economy | **DeSciX: decentralized science, game theory, and who owns the IPOs** | `15_GAME_THEORY/`, `14_COURANT_GROUP/`, DeSciX | to write |
| The Record | **How to check the files; how to add evidence** | `guide/about-this-collection.md`, `RECORD_INDEX.md`, `CHECKSUMS.txt`, the PR path | from the guide |
| Audio | **The issue, read aloud** | NotebookLM overview of the above | after the articles |

Each site's own front page (FRQTL, GodsWorld, DeSciX, Courant Group) links to its article in the
issue rather than carrying a competing narrative.

## 6. To track down (the podcast backend and the studio)

These are the questions the plan turns on; the seat is best placed to answer them from the code,
the platform party, and `../SSG-Studio`.

1. **The show as registered.** What `podcast_create_show` currently holds for the egpt app: title
   (the front page says "EGPT: the New Manhattan Project"; the author says the show is *Standing
   on the Shoulders of Giants*), author, category, owner email, and the cover image reference. Is
   the feed at `…/prod/egpt/assets/egpt/feed.xml` that show, and is it live on Apple?
2. **The cover art.** Where it lives (the microservice's config, `SSG-Studio/public/assets`, GCS,
   or the author's files), its dimensions (Apple wants a 1400–3000 px square), and whether a
   horizontal masthead variant exists or must be derived from it. The front page, the email and
   the share cards want the same art.
3. **Episode state and the feed.** Firestore is the source of truth and `feed.xml` is regenerated
   from it: so the issue file cannot *be* the feed, but it can be what `podcast_publish_episode`
   is called with. Decide the direction: the build emits the episode's metadata from the issue
   file (title, description, show notes, guid = issue id), and the seat (or a script) publishes
   it; or the issue file records what was published. Proposed: the former, with the returned
   `episode_url`, `guid` and `feed_url` written back into the issue file's `audio` block.
4. **Episode production.** Is the monthly overview a NotebookLM export dropped on the MP3 fast
   path as-is (upload with `descix app media-upload`, then publish), or does it go through
   SSG-Studio's pipeline (loudness, chapters, the whiteboard)? The studio's projects are the
   April launch lectures; nothing there is an "issue overview" yet. Who owns it (STATUS.md names
   @evp-ssg for "Podcast Episode").
5. **Chapters and show notes.** Whether the microservice's ID3 chapter embedding (slow path) is
   worth using for an overview — one chapter per article, from the TOC — or the fast path with
   show notes only.
6. **The microservice's home.** `CLAUDE.md` says the scaffold `microservice/` is deleted after
   `app init`, yet this one carries the podcast server with tests. Confirm which it is, whether it
   is deployed from this repository, and that the site build's deny lint (`**/microservice/**`)
   keeps it out of the bundle.
7. **The archive.** Do past episodes map one-to-one onto issues (none yet), and does the journal
   claim the 18.313x deep-dives as a standing series inside the feed or a second show?
8. **The circular's sender.** How the email goes out (the author's client, a list tool, the
   platform): the build can only render it; whoever sends it decides the plain-text/HTML pair,
   the list, and the reply-to.
9. **Token mechanics for "pass it along."** What the airdrop rule is in words the article can
   state (`plugins/egpt/skills/contribute`, `guide/make-money.md`): posting with proof, a share
   link, a form? The journal should not invent a referral mechanism the platform does not have.

## 7. Order of work, once §6 is answered

1. The issue schema and `site-src/issues/2026-10.json`, with the TOC above and `href`s that
   resolve today (the self-penned pieces, the memorial once filed, the guide pages); articles to
   write enter as they are written.
2. `journal/2026-10/` with the author's three pieces split as §5 says, his words untouched, front
   matter added (his pass).
3. `build-frontpage.js`: the front page as the current issue (masthead, note, quotes, TOC cards
   from the issue file; shelves below); the archive page; the audio block replacing `podcast.html`.
4. `build-circular.js` (new, small): the email pair from the same file.
5. The episode: metadata from the issue file → `podcast_publish_episode`; the overview produced
   by whoever §6.4 names; the result written back.
6. Share cards per article from the issue file.

Everything above the line is the seat's and the author's; Cowork's part, if wanted, is the front
page as an issue (3), the email's layout (4), the article page's look in the viewer, and the
archive page — in the same form as the previous hand-backs.

## 8. Decisions only the author can make

1. The masthead line under *Standing on the Shoulders of Giants* ("a journal of decentralized
   science, by DeSciX" is a placeholder).
2. The sections: the twelve shelves as departments, or a shorter journal set (Front, The
   Singularity, The Science, The History, The Economy, The Record, Audio).
3. The cadence (monthly is assumed) and whether issue 2 may be thin.
4. Which pieces of the draft are his byline and which are the journal's voice.
5. The podcast show's title on Apple, if it is to change to the journal's name.
