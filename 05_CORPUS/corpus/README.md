# EGPT quotation corpus

`quotes.json` — one object, `records[]`, schema `egpt.quotes/1`.
`quotes.jsonl` — the same records, one per line. Use this for embedding and RAG ingest.
`schema.json` — JSON Schema for a single record, with the field contracts spelled out.
`sources/` — the source files the corpus is built from.

## What a record is

A verbatim quotation and its citation: who said or wrote it, the work, the locus, the date, and
where a copy of the work is held. Nothing else. The rules are in `../PROVENANCE_DB_ORDERS.md`.

- **`quote`** is verbatim. Not cleaned up, not modernised, not de-britishised. Traditional editorial
  marks — `[bracketed]` insertions, ellipses, emphasis — are permitted and are not changes to it.
- **`source.work`** is cited in the traditional way. Where the words were taken from another work,
  that work is named: "quoted in …".
- **`restored`** holds the words an ellipsis removed, verbatim. It is empty when nothing was cut or
  the cut words are not held. It is never commentary.

A record carries no grade, no account of how its text was obtained, and no note. Whoever quotes it
in a paper answers for having read it, in that paper, as authors always have. Interpretation lives
in the papers written from this corpus, not in the corpus.

Every record carries a passage. A record with an empty `quote` is rejected by the build. When a
better text of a passage is obtained, the earlier record is **replaced, not annotated**. The corpus
holds one text per passage; it is not a changelog.

## RAG ingest

Embed `embed_text`. It concatenates `speaker | work | locus | date | quote | restored`, so a
similarity hit carries its own attribution and a retrieved chunk cannot be separated from its source.

`quote_sha256` is the dedupe and integrity key. If a record's `quote` is ever edited, its hash,
its `id` and its `embed_text` all have to be regenerated — `build_corpus.py` does this.

## Rebuilding

    python3 build_corpus.py

Reads `sources/*.json`, re-derives ids, hashes and `embed_text`, rewrites `quotes.json`
and `quotes.jsonl`. Deterministic: unchanged inputs produce a byte-identical corpus. A source entry
carrying `caution`, `note`, `verification` or `sourcing` stops the build.
