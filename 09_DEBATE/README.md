# 09_DEBATE — the 18.313x debate record, through Exchange 34

18.313x is a course built on MIT 18.313, Rota's probability course. Its P=NP debate is a
Socratic role-play: Essam Abadir plays **Stan (Ulam)**, the chair, who asks questions and does
not make assertions; the AI plays **Gödel** (the skeptic), **von Neumann** (the advocate),
**Rota** (the entropy advisor) and a **Moderator**. Objections in the room became theorems in
the tree; two of the three proof chains in `08_LEAN/` exist because the skeptic demanded them.
The debate ran from Exchange 1 to Exchange 34: Gödel's final concession is Exchange 33, and
Exchange 34 is the final confirmation that closed the record.

**This folder ends at Exchange 34.** That is a ruling, not an accident: material after E34 —
the 4 April 2026 debugging session, the game-system audit of the same date, and the "retread"
game exchange — is not here. It is the boundary of what Maxi remembers.

## Where things come from

Everything except `maxi-memories/` is mirrored byte-for-byte from the public repository
**github.com/eabadir/EGPT-Lean**, branch **`lean-archive-proofs`**, commit
**`6a2769f8bb94c851070c6cf03b0e90da7c0917f2`**. The path map is:

| here | there |
|---|---|
| `09_DEBATE/<file>` | `18.313x/<file>` |
| `09_DEBATE/agentic-debate/` | `www/data/agentic-debate/` |
| `09_DEBATE/maxi-memories/` | the Gods World memory corpus (`memories/` in the godsworld repository) |

Files in that repository's `18.313x/` that are work boards and build instructions rather than
record — `CLAUDE.md`, `BACKFILL_INSTRUCTIONS.md`, `BUILD_CROSS_REFERENCE.md`,
`PRODUCT_FEATURES_PROPOSAL.md`, `tasks/`, `course_materials/BUILD_PROFESSOR_AGENT.md`,
`course_materials/Class 1/AI_Prompt.md` — are not mirrored.

**Prompts inside the debate itself are record.** The debate is conducted entirely through prompts:
the chair asks, the roles answer, and what a role was told is what makes its answer legible. The
dispatch prompts in `session_transcript/` — including each role's standing instruction — are
primary evidence of what happened, on the same footing as the replies. That the words occurred is
a matter of record; what they mean is argued elsewhere and is not annotated here.

## What this record is

`AUTHORS_STATEMENT.md` is the author's statement on what the debate was: an exploratory system of
agentic peer-review, built on the fly to put the proofs through the strictest adversarial scrutiny
he could arrange. It is offered for transparency, not as a certificate, and no evidentiary grading
of the exchanges is adopted. The proofs are public; anyone able to find the flaw in them is
encouraged to do so, with or without these logs.

## How to read it

- **`DEBATE_STATE.md`** — the accumulated state after Exchange 34: 45 consensus points, 16
  concessions, the open frontier. It is generated from `agentic-debate/exchange_live_*.json`,
  which is the source of truth; when they disagree, the exchange file wins.
- **`debate_log.jsonl`** — the outcome ledger, one row per consensus, concession, insight,
  failed approach, implementation or open question, keyed `type:id` (`consensus:C38`,
  `concession:Y12`) and dated. This is the spine every other record hangs on.
- **`agentic-debate/`** — the 34 exchange records plus the events file. Two notes in the
  folder say what the records are: the verbatim agent outputs the moderator still held
  are in `RAW_AGENT_OUTPUTS_22_33.md`; how the exchange files were assembled is in
  `AUTHORS_STATEMENT.md`.
- **`session_transcript/`** — the raw Claude Code session and its sub-agent transcripts: the
  complete authoritative dialogue, 1,347 records. It is a machine log and reads like one. It
  carries the author's local file paths as recorded; nothing in it was rewritten.
- **`archive/`** — the per-exchange QA files (1–13) and topic records (16–21) as archived during
  the debate, with the deleted-code audit and the rename note.
- **`course_materials/`** — the syllabus, class description and session plans of the course
  the debate was a class of.
- **`RECAP_Entropy_Rigidity_and_Address_Compression.md`** and
  **`PROPOSAL_Verifier_Only_Definitions.md`** — written 28 March 2026, after Exchange 27, to
  ground the participants before the completeness proof.

## Maxi's memories

`maxi-memories/` is how Maxi holds this debate. `MEMORIES_SCHEMA.md` is the structure and the
rulings it was built under; `records/E00-events.md` through `records/E34-*.md` are one memory
per exchange, with `records/HOLES-*.md` naming the outcome ids for which no text survives;
`records/THE_FATHERS_FRAME.md` is how the corpus is meant to be read, in the author's words.
`build/debate-18313x.memories.jsonl` is the built corpus (36 records), `.training.jsonl` its
fine-tune projection, and `.manifest.json` the engineering record — sources, hashes, counts,
and the fidelity grading that the memories themselves deliberately do not carry.

Maxi's voice in the debate is Gödel's. That is a teaching, not a label: an LLM is a skeptic by
its training set, and the record shows the advocate and the advisor reaching for exponential
search too, because that is what the training set said would work. `records/BIAS-PATTERN-NOTES.md`
is the incident table.
