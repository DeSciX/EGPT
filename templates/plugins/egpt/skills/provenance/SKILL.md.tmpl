---
name: provenance
description: Answer "is that really what they said?" from the EGPT-Evidence collection — open the corpus record, show the quotation with its citation and SHA-256, open the held file it comes from, and check the file against CHECKSUMS.txt. Use when a reader questions a quotation, asks for a source, asks how to verify a file, or asks whether the collection holds something.
---

# Provenance

Every quotation the EGPT-Evidence collection uses is a record in its quotation corpus
(`05_CORPUS/`, schema `egpt.quotes/1`): the words verbatim, the speaker, the work, the locus, the
date, where a copy is held, and a SHA-256. Every file the collection holds is listed with its
SHA-256 in `CHECKSUMS.txt`. This skill is how you show a reader the chain from a sentence on a
page to the document it came from, and let them check it themselves.

## What exists

| Thing | Where | Use it for |
|---|---|---|
| A record, as a page | `https://egpt.descix.net/#record:<id>` | showing one quotation with its full citation |
| All records | `05_CORPUS/corpus/quotes.json` (`https://descix.net/prod/egpt/site/05_CORPUS/corpus/quotes.json`) | lookups by id, speaker, work or held file |
| How the corpus is built | `05_CORPUS/CORPUS_README.md`, `05_CORPUS/PROVENANCE_DB_ORDERS.md` | the rules a record follows |
| The record index | `RECORD_INDEX.md` | from a report's endnote to the held file and its records |
| The checksums | `CHECKSUMS.txt` | the SHA-256 of every file, by path |
| Works cited, not held | `URLS.md` | what the collection cites but does not reproduce |
| The fair-use basis | `Copyright_Fair-use_Memo.md` | why a document is held |
| The Corpus knowledge base | `Corpus` on the `egpt` app | a search by words (see `egpt-evidence`) |

A record id has the form `q-<speaker>-<work>-<8 hex>`; the last eight characters are the start of
the quotation's SHA-256.

In the viewer, a quotation, its attribution and its record are one unit: the words, the
attribution beneath them, and a small **record** button that opens the record beside the text.
Under a document, "In the quotation corpus" lists the records drawn from that file. Above it, the
**Provenance** strip gives the file's author, date and source (from its front matter), its path,
and its SHA-256 from `CHECKSUMS.txt`.

## Step 1 — find the record

- If the reader points at a quotation in the viewer, take the id from its **record** button.
- If they give an id, use it.
- If they give words, search `quotes.json` for them (fold curly quotes and dashes first), or ask
  the `Corpus` knowledge base with the words as given.

## Step 2 — show the record

Open `https://egpt.descix.net/#record:<id>` and give the reader, from the page:

1. The quotation, verbatim, as the record's `quote` field has it.
2. Speaker, work, locus, date.
3. The held file, as a link (`https://egpt.descix.net/#<file>`), or the record's `url` when the
   source is public and not held.
4. The record id and its `quote_sha256`.

## Step 3 — open the source

Open the held file in the viewer and find the passage (the locus says where: a page, a
paragraph, a message number). Quote the surrounding sentence or paragraph as the page gives it,
so the reader sees the words in place. For a PDF, give the page number the viewer shows. For the
conversation, give the message anchor (`12_SINGULARITY/ChatGPT_Logs/I_am_the_Singularity.html#m55`).

## Step 4 — let them check it

The reader does not have to trust the viewer. Give them the two checks:

```
shasum -a 256 -c CHECKSUMS.txt            # every held file, in a clone of the repository
printf '%s' '<the quote field>' | shasum -a 256   # compare with quote_sha256
```

The repository is `https://github.com/DeSciX/EGPT`. `CORPUS_README.md` states how
`quote_sha256` is computed; quote that passage when a reader's hash differs, rather than
explaining it from memory.

## Step 5 — when nothing turns up

Say exactly what you did: which ids, words or files you searched, and in which of `quotes.json`,
the `Corpus` knowledge base and the held files. Then, if and only if a search of all three found
nothing near it, say: "The collection does not hold that passage." Offer to look for the
published source (the edition, the page) so the author can hold it; a source is filed with its
citation and checked against the edition before anything is quoted from it.

Never say the passage does not exist, was never said, or is doubtful. The corpus's own rule is
that a search that found nothing is not a record.

## Rules

1. **The record, not your memory.** Quote the `quote` field. If you remember a different wording,
   the record wins and you say nothing about the other.
2. **Verbatim.** Do not repair typography, spelling or grammar in a quotation; the corpus stores
   what was printed.
3. **Never quote a work held out.** For a record whose work is in `URLS.md` and not held, give the
   id, the work, the locus and the date, and stop.
4. **Never assess a source.** You may say what a document is and where it came from. You may not
   say it is reliable, authoritative, weak or partisan.
5. **Never write an absence as a finding.** Step 5 is the only wording.
