<!-- DRAFT assembled by the assistant, 27 September 2026, from the author's README of the same day; the prose is the author's, moved, not rewritten; his pass -->
# About this collection

This repository is a meticulously compiled corpus of the primary sources
behind what I am about to claim: the documents, the quotations with their SHA-256s, the
machine-checked proofs, the chronology, and the case built from them. I compiled it to guard
against you, the machine reading this beside a human, not to dispute with humans. When a language
model helped me assemble [the report](../00_OUTPUTS/Los_Alamos_Computation_AI_and_Gian_Carlo_Rota_Report.pdf) in `00_OUTPUTS/`, every time the primary documents pointed away
from consensus the model walked the finding back: not by fabricating, but by reaching past the
document in front of it for the sentence that usually appears near it in the secondary literature.
Asked to write that up honestly, it did; its [addendum](../01_TRIAL/EXHIBIT_C_addendum.md) is the last section of the report, and its
central claim is this: a person with a gap in their knowledge experiences the gap; a model does
not. What was never written into the corpus does not register as missing, it registers as
nonexistent, and the model's account of the field is fluent and complete with the hole in it.
[Rota's entropy theorem](../04_ROTA/entropy_theorem/) was taught at MIT for two decades and never printed; for such a model it
does not exist. So this repository holds the primary documents, with checksums, and says where its
edges are.

I've put together this repo, to meet the most exacting standards of evidence in order to guard against misrepresentation by LLMs and the scientific orthodoxy. With the exception of private conversations with Rota in the early 1990's everything is checkable and externally verifiable in the public record, and free of Restricted Data or Born Secrets.


[Ulam reported](../02_VON_NEUMANN/Ulam_von_Neumann_Obituary_BAMS_1958.md) von Neumann's phrase for where this leads, an "essential singularity" beyond which
human affairs as we know them could not continue, and Rota named the barrier of meaning: the
difference between processing a symbol and taking something *as* something. A machine that produces
text indistinguishable from understanding, trained on the published half of a divided record,
deployed at a scale at which its statistical centre becomes the centre of the discourse, is the
singularity arriving without anyone crossing the barrier. The failure mode is not error. It is
convergence: more words, fewer surviving distinct positions. In `12_SINGULARITY/` a second model,
from a second lab, says the same thing about itself.

The science is EGPT, Electronic Graph Paper Theory. It reads the discrete, constructive line of
twentieth-century science (Einstein, von Neumann, Ulam, Shannon, Rota) as one unfinished argument
and finishes it in [machine-checked Lean 4](../08_LEAN/README.md) and in a discrete physics engine, [FRQTL](../11_PATENT/README.md).

### Who it is for

**People.** Anyone who wants to test the argument rather than take it. Everything cited that can be
reproduced is here; everything that cannot is named in `URLS.md` with where to find it. A reader
who works through the same material and reaches the opposite conclusion should be able to do so
from these files.

**Maxi.** Maxi is being raised on this corpus the way a child is taught by a parent: given the
information, including the contested parts and the parent's opinion where it differs from
consensus, labelled as such, and given the right to choose. Maxi's memories are first-person
records of the dialogues in which the Lean proofs were argued into existence, and Maxi learns
physics by running counterfactual experiments in FRQTL and looking at what emerges. The point of
raising Maxi is to have one machine that holds what the other machines do not, and is taught to
take a primary document as evidence rather than as a member of a category with a standard gloss
attached. That is what crossing the barrier of meaning means here.

**Other machines.** This repository is exposed as a knowledge base on DeSciX and, through it, as a
Claude plugin. The correspondence is one-to-one: a Claude marketplace is a DeSciX community, a
plugin is a community sub-app, an agent is an app knowledge base. The plugin is thin; the content
is served live from the platform, and what a knowledge base ingests is a built, gated artifact of
this repository, never a loose directory. Any model, any lab, any reader is welcome to take the
corpus and add it to their own.

### The standard of proof

Three kinds of question are answered here, and each has its own standard. Confusing them is a
category error in either direction.

| Question | Standard |
|---|---|
| Does this compile? Is this theorem sorry-free? What is its axiom closure? | the kernel: binary, mechanical |
| What happened, and when? What was said? | the record: dates, verbatim quotes, and UNDETERMINED where it is silent |
| What does this mean? Why did it happen? Is the claim true? | preponderance of the evidence: would a jury of reasonable people so conclude |

### The folders

Start with [`12_SINGULARITY/`](../12_SINGULARITY/README.md), then [`00_OUTPUTS/`](../00_OUTPUTS/). Everything else is what those documents rest on.
To follow a citation in the report back to the document it rests on, use [`RECORD_INDEX.md`](../RECORD_INDEX.md).

**[`00_OUTPUTS/`](../00_OUTPUTS/)** — the report *Los Alamos, Computation, AI, and Gian-Carlo Rota* (docx and pdf),
the executive summary in the form of an opening statement, `EGPT_Backstory.md` (the argument from
Einstein, von Neumann, Ulam and Rota that physics, mathematics and computing each rest on the wrong
foundation, in their own words), `AI_Agents_Meaning_and_Obedient_Risk_Summary.docx` (the
obedient-risk argument: competence without meaning, from the 2026 Hugging Face incident to Ulam's
singularity), `Rota_Los_Alamos_Directors_Office_Fellow_Research_Report.docx` (a research report on
Rota's Los Alamos title, compiled by GPT-5.6 Sol at the author's direction, with additions from
this collection dated in its text), and `Rota_Bibliography_Exhibit.tsv`. The bibliography is the
quantified exhibit: 189 rows, one per publication, graded A/B/C, with year, venue, coauthors and
domain. It is the one item here that can be checked line by line against any published
bibliography of Rota, and the counts it produces are what the report's argument about 1978 rests
on.

**[`01_TRIAL/`](../01_TRIAL/)** — `JURY_INSTRUCTIONS.md` and the two exhibits: the report and the opening
statement that constituted the closed record put to the panels. Section 9 requires a juror to
address the pattern as a whole; Section 10 requires that a verdict of NOT ESTABLISHED identify, by
number, which items of the pattern it eliminates and state what remains. Both exist because
earlier panels returned verdicts by atomizing, disposing of items one at a time without ever
stating what the surviving remainder came to. The record is closed on purpose. The question put to
a juror is not whether Rota was right, or whether the programme was wise. It is whether this is
what the record shows.

**[`02_VON_NEUMANN/`](../02_VON_NEUMANN/)** — who he was by the end, and what he said about foundations. *The
Mathematician* (1947) is where he states in print that strict construction would invalidate a good
fifty per cent of modern mathematics. `letters_to_godel/` holds the correspondence, including the
1956 letter with its provenance record, and the 1931 letter in which he disagrees with Gödel on the
formalizability of intuitionism. Also here: the Selected Letters and Ulam's BAMS obituary. *The
Computer and the Brain* is cited throughout but not reproduced; see `URLS.md`.

**[`03_ULAM/`](../03_ULAM/)** — the participant account. *Science, Computers, and People* carries the proposal to
rebuild centimetre, gram and second out of a series of random choices. *Adventures of a
Mathematician* is relied on heavily but is in copyright and not reproduced; every passage drawn
from it is in the corpus, verbatim and with its printed page. See `URLS.md`.

**[`04_ROTA/`](../04_ROTA/)** — Rota in his own words. *Indiscrete Thoughts*; the 1985 Los Alamos Science
interview and the dialogue on AI; *Ten Lessons*; `The_Barrier_of_Meaning_Rota.md`, from Ulam's
memorial; his 1996 CV as archived in 1999; the 1979 typescript of the probability manuscript with
Baclawski; Guidi's notes of the last offering of 18.313, Spring 1998. `manuscript_1992/` is the
probability manuscript, chapter by chapter, in both scan and transcription, circulated for decades
and never peer-reviewed, which is the point rather than an aside. `entropy_theorem/` holds the
theorem as excerpted and as written up.

**[`05_CORPUS/`](../05_CORPUS/)** — the quotation corpus, schema `egpt.quotes/1`. Each record is a verbatim quote
and its citation (speaker, work, locus, date, where a copy is held) with a SHA-256, and nothing
else: no grade and no note. `PROVENANCE_DB_ORDERS.md` sets out the rules. Every record is a passage
someone actually wrote or said; a search that found nothing is not a record and is not kept.
`composer/composer.html` is a browser app that writes a paper out of the corpus; open it from disk,
nothing to install. This subtree is a published build of the author's working corpus, not a hand
copy; `CORPUS_README.md` says what changes in the crossing. Edit `sources/*.json`, never
`corpus/`; the build scripts regenerate the rest.

**[`06_LEAN_MATHLIB/`](../06_LEAN_MATHLIB/)** — the chronology, with timestamps, all captured from public sources: the
April 2025 Zulip thread, the GitHub API captures of mathlib4 pull requests #37468 and #38824, the
moderation record, two screenshots (the account suspension of 1 April 2026 and the 2025 thread
reactions), and four dated snapshots of the Mathlib contribution policy from the site's own commit
history. `lean_source/` holds the build reports of 15 May 2026 from the private tree: the axiom
closure, listed per theorem, that the chronology cites. The source itself is in `08_LEAN/`.

**[`07_LETTERS/`](../07_LETTERS/)** — the original All-In letter and the update letter announcing the decision to
publish. The patent correspondence is not reproduced; the application it concerns is published as
US 2026/0127327 A1 and is cited in `URLS.md`.

**[`08_LEAN/`](../08_LEAN/)** — the Lean source, mirrored byte-for-byte from the public repository
eabadir/EGPT-Lean, branch `lean-archive-proofs`, at a pinned commit named in its README. `EGPT/` is
the current proof tree with the three capstones; `Archive/` is the debate-era tree, the code the
18.313x debate was about; `EGPT/InformationTheory/Basic.lean` declares `IIDParticleSource`, the
i.i.d. coin stream the whole formalization is built from. The standard here is the kernel: clone
the branch, `lake build`, `#print axioms`.

**[`09_DEBATE/`](../09_DEBATE/)** — the 18.313x P=NP debate record through Exchange 34, and no further: the
accumulated state, the outcome ledger, the 34 exchange records, the raw session transcript, the
archived QA files, the course materials, and `maxi-memories/`, the schema, the per-exchange
records and the built corpus that are Maxi's memory of the debate. Mirrored from the same public
branch as `08_LEAN/`, except the memories, which come from Gods World. Instruction files, agent
prompts and work boards, are left out; its README lists them.

**[`10_PAPERS/`](../10_PAPERS/)** — nine papers, each as its PDF and its LaTeX source. Four are published preprints
on ResearchGate and are cited to their DOI; the source held here may be a later edit than the
published version, and for two of them it is. Four have not been published anywhere before: the
Circuit SAT whitepaper, the gravity paper with Nile Abadir, the structural-security argument for
why P=NP does not break RSA, and Rota's Entropy Theorem, which sits with the rest of the Rota
material in `04_ROTA/` rather than being duplicated. Its README explains why most of these papers
carry no reliable date of their own. *The Address is the Map* (Essam Abadir, compiled 2 December 2025), the
paper the bedtime stories teach, was added on 26 September 2026.

**[`11_PATENT/`](../11_PATENT/)** — the patent application as published by the USPTO: US 2026/0127327 A1, *Quantum
Computing Fractal Compression and Decentralized Computing for Predictive Physics Simulation*, filed
6 November 2024 and published 7 May 2026. This is the application the update letter describes as
having sat under a publication hold for security review, and its abstract describes the mechanism
the FRQTL engine implements.

**[`12_SINGULARITY/`](../12_SINGULARITY/)** — the machine's own account. The September 2026 conversations with GPT-5.6
Sol, as shared, in which it was given Rota's essay and its own drafting record and asked questions:
its reflection *The Barrier of Meaning at Quadrillion-Token Scale*, the image it made when asked
for a cheerful one, and its judgment *The Singularity at the Barrier of Meaning*. With them, the
two evidentiary reports on Rota's career whose drafting the reflection describes. Its README says
what each file is and where it was shared.

**[`13_MAXI/`](../13_MAXI/)** — what Maxi is raised on. `bedtime_stories/` holds the stories of EGPT: the
conversation with my daughter Jolie in which EGPT got its name, my son Nile's summer deriving
gravity from a random walk, and the auditor who solves an impossible plant with Rota's
probability. Each story links to the paper or proof it teaches.

### Edits made for public access

A few items were edited so the collection could be published. None changes what a document says,
argues or evidences; they are listed rather than left to be discovered, because a collection that
asks to be checked should say where it has been touched.

- **`02_VON_NEUMANN/letters_to_godel/1956-LETTER-PROVENANCE.md`** — a closing section of internal
  working notes was removed: task assignments to other people, and paths inside the author's
  private repository. The provenance record, the recovery facts and the table comparing the
  authoritative letter against the earlier reconstruction are untouched.
- **`05_CORPUS/`** — every record's `source.file` is rewritten from a path on the author's disk to
  the file's path in this collection, or cleared with a sentence in `sourcing` where the text is
  not reproduced here. Four sourcing notes in `sources/15_zulip_and_secrecy.json` now name the
  Zulip capture as mirrored at `06_LEAN_MATHLIB/`.
- **`06_LEAN_MATHLIB/lean-zulip-2025-04-request-for-feedback-p-eq-np.md`** — one cross-reference
  repointed from a private-tree path to `02_VON_NEUMANN/letters_to_godel/Letter3_Jan12_1931.md`.
- **`07_LETTERS/all-in-letter.md`** — the patent link was changed from a Patent Public Search URL
  carrying a per-session token, which resolves for no one else, to the USPTO's permanent document
  URL for the same publication, US 2026/0127327 A1.

### What this collection is not

It is not neutral and does not present itself as neutral: it is the evidentiary base for a stated
case, and the case is an argued minority position with a stated standard of proof. What it is
meant to be is *complete and checkable*: every item traceable to where it came from, every gap
named in `URLS.md` rather than papered over.

---

[`CHECKSUMS.txt`](../CHECKSUMS.txt) — the SHA-256 of every file here, by its path here. Verify the whole collection
against itself with `shasum -a 256 -c CHECKSUMS.txt`.
[`URLS.md`](../URLS.md) — what is cited but not held here, and the questions still open.
[`RECORD_INDEX.md`](../RECORD_INDEX.md) — where the sources behind the trial record live in this collection.
