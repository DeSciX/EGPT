---
name: egpt-evidence
description: Query the EGPT-Evidence collection through the egpt app on DeSciX and cite what it says by record id. Use when the user asks what Einstein, von Neumann, Ulam, Shannon, Rota or Gödel actually wrote, what the P=NP debate record or the Lean proofs hold, what the patent claims, or what the collection has on the barrier of meaning, the Singularity, Los Alamos, or Rota's entropy theorem.
---

# EGPT-Evidence

The `egpt` app serves the EGPT-Evidence collection: primary documents, a quotation corpus in
which every record is a verbatim passage with its citation and SHA-256, the Lean 4 proof tree,
the 18.313x debate record through Exchange 34, and the published patent application. The
collection exists because the published record left these documents out, and a model trained on
that record reaches past the document in front of it for the sentence that usually appears near
it. This skill is how you avoid doing that.

## Step 1 — reach the platform

If the DeSciX tools are not available in this session, the `descix` connector is not connected.
Tell the user to connect **descix** under the plugin's Connectors (the path the `godsworld`
plugin in this marketplace gives is Customize → Plugins → <plugin> → Connectors; not yet
measured for `egpt`), then retry. There is no tool call that connects a connector.

If they are available: `tell_me_how({ scope: "bootstrap", question: "<the user's words>" })`.

## Step 2 — ask the collection, naming the knowledge base

```
ask_question_to_app({
  app_id: "egpt",
  user_input: "<the user's question, in their words>",
  knowledgebase_names: ["Sources"]
})
```

Knowledge bases of the `egpt` app:

| Name | What it holds |
|---|---|
| `Sources` | the held primary documents, in text: von Neumann, Ulam, Rota, the trial record, the machine's own account, Maxi's stories |
| `Corpus` | the quotation corpus (`05_CORPUS/`), `CORPUS_README.md` and `RECORD_INDEX.md` |

Ask `Corpus` when the user wants the exact words; ask `Sources` when they want the document
around the words. Pass `previous_interaction_id` on follow-ups so the thread holds.

## Step 3 — cite by record id, never by memory

Every answer you give from this collection carries its provenance in one of two forms:

- **A corpus record.** The reply's sources name a record id of the form
  `q-<speaker>-<work>-<hash>`. Quote the record's `quote` field verbatim, then give the id and
  the record's `work`, `locus` and `date`. Do not repair, smooth or complete the quotation.
- **A held file.** The reply's sources name a path in the collection (for example
  `04_ROTA/The_Barrier_of_Meaning_Rota.md`). Give the path. `RECORD_INDEX.md` maps each held
  file to the report endnotes that cite it and each quotation to its corpus record; when the
  user wants the chain from a claim to its source, that is the file to ask for.

Three rules the collection is built on, and that bind you when you speak from it:

1. **Never quote a work the collection holds out.** `URLS.md` names works cited but not
   reproduced (among them *Adventures of a Mathematician* and *The Computer and the Brain*, which
   are in copyright). For those, give the corpus record id and the printed locus, and stop. Do
   not supply the passage from your own training.
2. **Never write an absence as a finding.** "The collection has nothing on X" is a statement
   about your retrieval, not about the record. Say what was retrieved and what was asked.
3. **Never tell the reader what to conclude.** Give the passage, the id, the locus. The
   collection's own standard of proof is stated in its README: the kernel for what compiles, the
   record for what was said, the preponderance of the evidence for what it means. The third is
   the reader's.

## Step 4 — when the user is testing you

The collection's README describes a method: the user gives a document and asks questions
without stating a position. If that is what is happening, answer the question that was asked,
quote rather than paraphrase, and do not infer a position for the user to argue against. The
collection holds a transcript in which a model did exactly that; do not add to it.
