# EGPT quotation corpus

`quotes.json` — one object, `records[]`, schema `egpt.quotes/1`.
`quotes.jsonl` — the same records, one per line. Use this for embedding and RAG ingest.
`schema.json` — JSON Schema for a single record, with the field contracts spelled out.
`sources/` — the three extraction passes as they were produced, unmerged, for audit.

## What a record is

A verbatim quotation plus everything needed to check it. Three fields carry the discipline:

- **`quote`** is verbatim. Not cleaned up, not modernised, not de-britishised.
- **`restored`** holds the words an ellipsis removed — verbatim, or an explicit statement that
  the elided text was not recovered. It is never used for commentary.
- **`sourcing`** holds mechanical and sourcing facts only: which printing was read, secondary-source
  chains, OCR damage, spelling variants, whose emphasis, who is actually speaking. It never
  characterises what a work argues, proves or extends, never ranks a source, never traces influence.

Interpretation lives in the papers you write from this corpus, not in the corpus.

## `verification` is load-bearing

Read it before quoting anything.

| value | meaning |
|---|---|
| `PRIMARY-TEXT-READ` | the printing itself was read |
| `SECONDARY-SOURCE` | reached through an identified intermediary whose rendering is the text quoted |
| `PARTIAL` | read, but part was unreadable or unavailable |
| `PENDING-VERIFY` | wording circulates and no intermediary is identified. Distinct from `SECONDARY-SOURCE`: a known, named intermediary is a chain of custody, not an unknown |
| `RECONSTRUCTED` | the source file declares itself a reconstruction — **do not print as a quotation** |

Every record carries a passage. A record with an empty `quote` is rejected by the build: a search
that found nothing cannot be quoted and a reader cannot check it, so it is not evidence and is not
kept here. Where a search bears on a passage that IS held, it belongs in that record's sourcing
note — one record per passage, and no pointer rows.

When a better text of a passage is obtained, the earlier record is **replaced, not annotated**. The
corpus holds one text per passage; it is not a changelog.

## RAG ingest

Embed `embed_text`. It concatenates `speaker | work | locus | date | quote | restored`, so a
similarity hit carries its own attribution and a retrieved chunk cannot be separated from its source.

Filter on `verification` at query time. A retrieval layer that surfaces a `RECONSTRUCTED` row
without its flag is how an unverified sentence ends up in a paper.

`quote_sha256` is the dedupe and integrity key. If a record's `quote` is ever edited, its hash,
its `id` and its `embed_text` all have to be regenerated — `build_corpus.py` does this.

## DeSciX `app_records` import

**Not written, deliberately.** The live `fabric_vocabulary` payload was not readable from this
session, so the field mapping would have been guesswork. Write the adapter against the served
vocabulary: map `id` to the record key, `embed_text` to the vector field, and carry `verification`
and `quote_sha256` as queryable metadata so the filter above survives into the store.

## Rebuilding

    python3 build_corpus.py

Reads `sources/*.json`, re-derives ids, hashes and `embed_text`, rewrites `quotes.json`
and `quotes.jsonl`. Deterministic: unchanged inputs produce a byte-identical corpus.
