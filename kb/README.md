# kb/ — the knowledge bases are the evidence folders

This collection does not copy text into `kb/<name>/`. Each knowledge base of the `egpt` app is
a manifest in `.descix/manifests/` whose sources are the numbered evidence folders themselves,
taken at a git ref, so what the app serves is what the collection holds at that commit and
`CHECKSUMS.txt` already covers it.

| KB | Manifest | Sources |
|---|---|---|
| `Sources` | `.descix/manifests/Sources.json` | the held documents in text: `02_VON_NEUMANN/`, `03_ULAM/`, `04_ROTA/`, `01_TRIAL/`, `12_SINGULARITY/`, `13_MAXI/`, `guide/` |
| `Corpus` | `.descix/manifests/Corpus.json` | `05_CORPUS/corpus/`, the corpus README and orders, `RECORD_INDEX.md`, `URLS.md` |

A sync reads each tracked file's blob at the manifest `ref`; an edited but uncommitted file is
skipped. Sync from a clean, pulled `main`.

`Sources.json` names `guide` at ref `main`. At the time of writing `guide/` has no tracked file at
`main` (the author's eight pages are staged, uncommitted), and the CLI refuses an untracked-at-ref
source by name (`CorpusWalker.js:104-117`), so the `Sources` KB cannot sync until `guide/` is
committed on `main`. The reference is kept deliberately; committing it is the author's act.


## The deny lint, and the license basis it requires

Both manifests are `publish_tier: "P"`, so before any walk the CLI runs its deny lint
(`lib/commands/corpus.js:498`, `lib/core/CorpusDenyLint.js:184`) and fails the sync on a hit.
Its rule #19 (`CorpusDenyLint.js:229`) fails every `primary-source` entry whose `license_basis`
is empty or missing. A basis is written only from what this collection itself states; none is
invented. The collection states one for `12_SINGULARITY/` (its README: the author's own
conversations "as shared" at public links), and states none for the following, so they are not
in any manifest until the author states it, one line each, in his own words:

| Source | Held as | What the collection says today |
|---|---|---|
| `02_VON_NEUMANN/` | *The Mathematician* (1947), Ulam's 1958 memoir, the letters to Gödel, the *Selected Letters* PDF | `URLS.md` names the works in copyright that are held out; it says nothing of these |
| `03_ULAM/` | *Science, Computers, and People*, text and PDF | same |
| `04_ROTA/` | *Indiscrete Thoughts*, the 1985 dialogue and address, the manuscript, the CVs, Guidi's notes | same |
| `05_CORPUS/corpus/` | every quotation record with its citation | `CORPUS_README.md` line 139 describes a record's `file` field, not a basis |

Until then the `Sources` KB holds `01_TRIAL/`, `12_SINGULARITY/`, `13_MAXI/` and `guide/`, and
the `Corpus` KB holds the corpus README and orders, `RECORD_INDEX.md` and `URLS.md`.
