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


## The deny lint, and the license basis

Both manifests are `publish_tier: "P"`, so before any walk the CLI runs its deny lint
(`lib/commands/corpus.js:498`, `lib/core/CorpusDenyLint.js:184`) and fails the sync on a hit.
Its rule #19 (`CorpusDenyLint.js:229`) fails every `primary-source` entry whose `license_basis`
is empty or missing. Every primary-source entry here carries the same basis: fair use under
17 U.S.C. § 107 for scholarship and research, as set out in
[`../Copyright_Fair-use_Memo.md`](../Copyright_Fair-use_Memo.md) (27 September 2026), the author's
determination that everything in this repository is deemed fair use under that memorandum. The
memo reserves the amount of any particular source displayed, per source; the works not reproduced
at all are listed in `../URLS.md`. The `12_SINGULARITY/` entry adds that its transcripts are the
author's own conversations, as shared at the links its README names.
