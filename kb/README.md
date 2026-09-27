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
