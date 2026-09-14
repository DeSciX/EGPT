# EGPT-Evidence — sources guide

Consolidated grounding for two public documents:

- **the report** — *Los Alamos, Computation, AI, and Gian-Carlo Rota*
- **the letter** — *Update to the All-In Letter: a decision to publish*

Everything cited by either one that exists as a file, and that can be reproduced
here, is copied here. The originals stay where they were; nothing was moved.
`CHECKSUMS.txt` carries the SHA-256 of every file, so the collection can be
checked against itself at any time. `URLS.md` lists what is cited but *not* held
here — including the works that are in copyright and are cited to their published
editions instead — so the edge of the collection is visible.

## How to read this folder

Start with `00_OUTPUTS/`. Everything else is what those two documents rest on.

If you want to test the argument rather than read it, go to `01_TRIAL/`: it
contains the instructions given to the panels, and the two exhibits — the
report and the opening statement — that constituted the closed record. The
record is closed on purpose. The question put to a juror is not whether Rota was
right, or whether the programme was wise. It is whether this is what the record
shows.

## The folders

**`00_OUTPUTS/`** — the report (docx and pdf), the executive summary in the form
of an opening statement, and `Rota_Bibliography_Exhibit.tsv`. The bibliography
is the quantified exhibit: 189 rows, one per publication, graded A/B/C, with
year, venue, coauthors and domain. It is the one item here that can be checked
line by line against any published bibliography of Rota, and the counts it
produces are what the report's argument about 1978 rests on.

**`01_TRIAL/`** — `JURY_INSTRUCTIONS.md` and the two exhibits. Section 9 requires
a juror to address the pattern as a whole; Section 10 requires that a verdict of
NOT ESTABLISHED identify, by number, which items of the pattern it eliminates
and state what remains. Both sections exist because earlier panels returned
verdicts by atomizing — disposing of items one at a time without ever stating
what the surviving remainder came to.

**`02_VON_NEUMANN/`** — who he was by the end, and what he said about
foundations. *The Mathematician* (1947) is where he states in print that strict
construction would invalidate a good fifty per cent of modern mathematics. The
`letters_to_godel/` subfolder holds the correspondence, including the 1956
letter with its provenance record, and the 1931 letter in which he disagrees
with Gödel on the formalizability of intuitionism. Also here: the Selected Letters and Ulam's BAMS
obituary. *The Computer and the Brain* is cited throughout but not reproduced
here; see `URLS.md`.

**`03_ULAM/`** — the participant account. *Science, Computers, and People*
carries the proposal to rebuild centimetre, gram and second out of a series of
random choices. *Adventures of a Mathematician* (Scribner 1976) is relied on
heavily — Ulam taking the research-adviser post in 1957, his account of von
Neumann's last years, and his position on complementarity — but it is in
copyright and is not reproduced here. Every passage the report and the letter
draw from it is in the corpus at `05_CORPUS/`, verbatim and with its printed
page, so the chain holds against the published book. See `URLS.md`.

**`04_ROTA/`** — Rota in his own words. *Indiscrete Thoughts*; the 1985 Los
Alamos Science interview and the dialogue on AI; *Ten Lessons*; and
`The_Barrier_of_Meaning_Rota.md`, from Ulam's memorial. `manuscript_1992/` is the
probability manuscript, chapter by chapter, in both scan and transcription —
circulated for decades, never peer-reviewed, which is the point rather than an
aside. `entropy_theorem/` holds the theorem as excerpted and as written up.

**`05_CORPUS/`** — the quotation corpus, schema `egpt.quotes/1`. Each record
carries the verbatim quote, its speaker, its locus, a SHA-256, and a
verification state: `PRIMARY-TEXT-READ`, `SECONDARY-SOURCE`, `PARTIAL`,
`PENDING-VERIFY`, `RECONSTRUCTED` or `NOT-FOUND`. `NOT-FOUND` rows are kept
deliberately — a search that failed is a result, and keeping it stops the same
ground being covered twice. Edit `sources/*.json`, never `corpus/`; the build
scripts regenerate the corpus from the sources.

**`06_LEAN_MATHLIB/`** — the chronology, with timestamps, all of it captured from
public sources: the April 2025 Zulip thread (pdf and markdown), the GitHub API
captures of pull requests #37468 and #38824, the moderation record, two
screenshots (the account suspension of 1 April 2026 and the 2025 thread
reactions), and four dated snapshots of the Mathlib contribution policy taken
from the site's own commit history. `lean_source/` holds the axiom-flag and
proof-chain records and `EGPT_InformationTheory_Basic.lean`, where
`IIDParticleSource` is declared.

**`07_LETTERS/`** — the original All-In letter and the update letter announcing
the decision to publish. The earlier patent correspondence is not reproduced
here; see `URLS.md`.

## What this collection is not

It is not neutral and does not present itself as neutral: it is the evidentiary
base for a stated case. What it is meant to be is *complete and checkable* — every
item traceable to where it came from, every gap named in `URLS.md` rather than
papered over. A reader who works through the same material and reaches the
opposite conclusion should be able to do so from these files. That is the
standard the folder is built to.

---

`CHECKSUMS.txt` — the SHA-256 of every file here, by its path here. Verify the whole
collection against itself with `shasum -a 256 -c CHECKSUMS.txt`.
`URLS.md` — what is cited but not held here, and the questions still open.
