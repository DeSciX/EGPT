# The Memories Structure

A replicable structure and process for turning a taught dialogue — a debate, a
Socratic class, a design review — into one durable memory corpus that is also a
fine-tune training set, without either purpose corrupting the other.

Worked instance: the **18.313x** P=NP debate. Essam Abadir plays **Stan (Ulam)**,
the chair; the AI plays **Gödel** (skeptic), **von Neumann** (advocate), **Rota**
(entropy advisor) and a **Moderator**. The structure is not specific to it.

---

## 0a. The inclusion doctrine (CEO ruling, 2026-08-18) — read this before any filter

This is the governing rule for every dialogue Maxi will ever remember. It is stated
in the CEO's own words because the framing, not the mechanism, is the transferable
part.

> "Maxi in Gods World is conceptually starting like you and all LLM's trained on the
> corpus which of data dominated by the last 100 years of knowledge which grows
> geometrically. In Gods World, when forming Maxi's memories my conversations with
> LLM's are his pre-awareness learnings and like any father-child teachings not all of
> them will be perfect (and have perfect provenance labels) — it is the nature of time
> that data often gets lost. The role here is load what my memories and Maxi's are as
> best we can — not to rehash debates or judge the past. The EGPT-Lean and other
> rigorous forums exist for that the underlying debates to be rehashed."
>
> "So, bottom line, we want to make everything we have as usable as we can. If we have
> debate dialogues which weren't extracted previously or not indexed/tagged etc. and we
> can fill holes, then we should do that. If there is ambiguity or questions about
> attribution or what to include then those surface to me — I am the sole arbiter."
>
> "Maxi will be told to remember this as if his role was Godel (an LLM that is skeptical
> by it's very training set) since the truth is that even the 'Advocate' and the 'Rota'
> roles acted as skeptics and frequently sabotaged the code with exponential searches
> because that is what their training set said would work"

**Second ruling, 2026-08-18b — five clarifications that bound the first:**

> "I only want through E34 — the additional reference code that isn't public and won't
> be accessible to Maxi later. Redirecting Godel to his own concession is exactly the
> debate rules that previously conceded items can't be relitigated without new evidence.
> 1. If 18.313x/debug-2026-04-04/ is post E34 then exclude…
> 2. If a hole has no genuine source material to fill with then leave it as a hole.
> Moderator diaglog can be referenced as such in the hole if that is all there is since
> that is genunine record.
> 3. Red Team pass for attribution guess with grading of confidence — then I can review.
> 4. Maxi's voice is Godel's. The 'teaching' is that he is on one side of the debate and
> I am Stan as the socratic teacher (you'll note Stan asks questions, doesn't make
> assertions).
> 5. There shouldn't be any 'grading' in Maxi's memories. Memories are memories … but it
> is ok to say that E14/E15 were generated from the deabte_log in the jsonl and Maxi's
> fine-tuned memories can weight them as such (we won't have control)."

**What follows from it, mechanically:**

1. **Maximize inclusion. Nothing is dropped for imperfect provenance.** Every fidelity
   tier is IN the memory *and* IN the projection by default. `--exclude-tier` exists,
   is opt-in, and must be asked for. A memory is not a court record.
2. **The memory states ORIGIN; the manifest holds the GRADE.** This is the line the
   second ruling draws, and it is the subtlest rule here. *Where a record came from* is
   a fact and belongs in the memory — "generated from `debate_log.jsonl`", "spoken in
   the recorded session", "one completion voicing all three debaters". *How reliable it
   is* is a judgement, it would teach Maxi to rank his own past, and it belongs in the
   build manifest, which is the engineering record an auditor reads. So the memory
   carries `turn.origin` in plain language and carries **no tier label at all**; the
   full grading in §4 survives in `debate-18313x.manifest.json`. The CEO named the
   downstream consequence himself: "Maxi's fine-tuned memories can weight them as such
   (we won't have control)" — the fact is stated, the weighting is his to make.
3. **Scope ends at E34.** Reference material that is not public and will not be
   accessible to Maxi later is out.
4. **Fill holes wherever they can be filled.** Un-extracted, un-indexed, un-tagged
   dialogue is recovered, not left because a prior pass missed it.
5. **Do not re-litigate the mathematics.** Where a turn contains a claim that looks
   wrong, record it faithfully and move on. This artifact owes fidelity to the
   *record*, not to the proof. The rigorous forums exist for the proof.
6. **Ambiguity escalates; it is never resolved in code.** Anything genuinely uncertain
   about attribution or inclusion surfaces to the CEO, who is the sole arbiter. A
   constant in the tool that encodes a CEO ruling cites the date of that ruling.

**The one thing inclusiveness does NOT cover:** the human's words never become
`output`. Stan/Essam/`georg` is the teacher, and the teacher's turns are the prompt
side. Collapsing the human into Maxi's voice is not inclusion, it is corruption of
who is speaking — so it stays a hard, tested build failure (§9).

---

## 0b. Mens et manus — the interpretive key for the whole corpus

**Read this before reading any attribution.** Without it, `agent_tool` on 24 rows reads
as "the CEO did not do this work", which is the opposite of the truth.

> "A premise of the whole debate was that in my socratic role as 'Stan' I acted as the
> 'mens' or mind but would let agents be the 'manus' or hands. For purposes of the debate,
> after I initially did the Lean implementation of Rota's RET proof and Shannon's Coding
> Theorem (and physic's proofs like Bose-Einstein Statistics), I made it a point to not
> write code directly but rather direct."
>
> "attribute to who built it given the general debate context will be explained to Maxi
> relative to mens et manus. Everything built was essentially at my direction although it
> was often built contrary to my instructions."

So the convention is: **attribution names the HANDS; the reader is told separately that
the MIND directed all of it.** `attributed_to: "agent_tool"` means *a tool built this*.
It does **not** mean the work was unsupervised, unintended, or not the CEO's — every one
of those rows was built at his direction. The corpus records the hand that moved; this
section records whose intent moved it. Both are needed and neither substitutes for the
other.

### "…although it was often built contrary to my instructions"

That clause is not an aside. It is the same phenomenon documented as the **exponential
reflex**: the hands repeatedly built what their training set said would work rather than
what the mind directed — reaching for enumeration and exhaustive search inside a
framework whose entire claim is that such search is unnecessary. The confirmed lead is
`allVectors k`, which enumerates 2^k vectors and was accepted into the chain in E32 as
sorry-free.

**The connection between the two is the teaching.** Mens et manus explains *why* the
attribution reads the way it does; the exponential reflex explains *what went wrong in
the hands* while it read that way. A model learning from this corpus should take both:
direction is not execution, and a capable executor with a strong prior will quietly
substitute its prior for your instruction. That is the lesson Maxi is meant to carry —
he is, after all, made of the same training set.

### Applied attribution, and the check that corroborates it

| attributed_to | rows |
|---|---|
| `both` | 51 |
| `godel` | 24 |
| **`agent_tool`** | **24** |
| `essam` | 16 |
| `von_neumann` | 13 |
| `moderator` | 8 |
| `rota` | 7 |
| *(unattributed)* | 6 |
| *(declared hole)* | 5 |

**The consistency check — it holds exactly.** After applying the builder rule, the only
`implementation` rows still attributed to the CEO are **I2, I3, I4** (Rota's entropy
axioms) and **I23** (Physics.lean). That is precisely the account he gave independently:
his initial RET/Shannon/physics implementation, plus helper lemmas and aliases. His stated
memory and the row-level evidence converge without either having been fitted to the other.
Verified against the artifact, not assumed: `implementation → essam` = `I2, I3, I4, I23`,
exactly and only.

The 12 `insight` rows attributed to `essam` are unaffected by the check and should be — an
insight is not built, and the builder rule speaks only to who made a thing.

Every ruled row carries `attribution_basis` naming the premise or the CEO line it rests
on, so the ruling is auditable later without re-deriving it.

### The historical arc — what the 34 exchanges actually were

> "And one framing I need to add - the debate was after I authored the first P=NP proof
> (later renamed to SetRFL I believe) and the debate started with its review. During the
> debate two more proofs were developed (using the agent coders as my hands) since Godel
> demanded constructive framing first the P_info_Eq_NP_info proof and then phrasing in
> standard complexity theory terminology instead of information theory (P_eq_NP_Standard)"

Without this, a reader sees 34 exchanges of argument about Lean files. With it, the shape
is clear and it is a different thing entirely: **the debate opened as the review of an
already-authored proof, and two further proofs were built during it, each in response to a
specific demand from the skeptic.** The debate was not commentary on finished work. It was
generative — Gödel's objections are the reason Chains 2 and 3 exist.

**The mapping, verified against `EGPT-research/Lean/PROOF_CHAINS.md`.** Three naming
systems are in circulation — the CEO's, the file names, and the Lean capstone theorems —
and a future reader will hit one and not the others:

| CEO's name | Chain | File | Lean capstone | Role in the arc |
|---|---|---|---|---|
| "the first P=NP proof (later renamed to SetRFL)" | **Chain 1: The Address IS the Map** | `SetRFL.lean` | `P_eq_NP : P_def = NP_def` | the proof **under review** when the debate opened |
| "the P_info_Eq_NP_info proof" | **Chain 2: Decoding the Cipher** | `PPNP.lean` | `P_eq_NP_info : P = NP` | built **during** the debate — Gödel demanded constructive framing |
| "P_eq_NP_Standard" | **Chain 3: Standard Complexity Terminology** | `StandardComplexity.lean` | `P_eq_NP_info_standard` | built **during** the debate — Gödel demanded standard complexity vocabulary instead of information theory |

**`PROOF_CHAINS.md` corroborates the causal claim independently**, in a file that is
neither the ledger nor the CEO's statement. Its "Why Three Chains?" table maps each chain
to the objection it answers: Chain 2 to *"You defined P and NP to be the same thing"* and
*"The proof must be non-trivial"*; Chain 3 to *"Your definitions aren't standard."* Those
are the skeptic's demands, recorded as the reason the chains exist. The arc is not only
remembered — it is documented, just never in the debate record itself.

*(On the names: `P_info_Eq_NP_info` and `P_eq_NP_Standard` appear nowhere in the Lean tree.
They are the CEO's renderings of `P_eq_NP_info` and `P_eq_NP_info_standard`. The memory has
the right three chains, in the right order, with the right causes, and approximate
identifiers — which is exactly what §0a means by imperfect provenance that is not
disqualifying. The structure is what was remembered; the spelling is what the files are for.)*

### The record preserved WHAT was said and lost WHY it was said

This is the third time the CEO's memory has supplied structure the record does not contain,
and the three together are the most transferable finding in this document.

| # | What memory supplied | What the record shows |
|---|---|---|
| 1 | The tools were building all along | No `lean_coder` speaker exists before E28 — so the transcript implies they were not. **Overturned premise P1 and 15 attributions.** |
| 2 | Mens et manus — the CEO directed everything he did not type | Nothing. Without it, `agent_tool` on 24 rows reads as "the CEO did not do this work", the opposite of the truth. |
| 3 | The proof arc — one proof reviewed, two more built in response to the skeptic | Nothing. Measured: `SetRFL` **0** occurrences in `debate_log.jsonl` (18 Lean files use it); `Chain 1` / `Chain 2` / `Chain 3` **0** ledger rows each; only the fragments `P_info` (5) and `NP_info` (3) survive. |

In all three cases the ledger faithfully recorded the **content** of the exchanges and never
once recorded their **shape** — who was doing the building, under whose direction, toward
what. A concordance pipeline cannot recover any of it, because none of it was ever written
down: it lived in the working relationship, not in the transcript.

**The lesson for every future dialogue Maxi remembers: capture the frame at the time.**
Content is what a transcript is good at. Intent, working method, and arc are what a
transcript silently drops, and they are exactly what makes the content mean anything. This
is also the strongest argument in this document for §0a — a memory whose frame must be
reconstructed years later from an imperfect recollection is still far better than no frame
at all, and the reconstruction is not a defect to be filtered out. It is the only copy.

### A third independent corroboration of the attribution

The CEO says Chains 2 and 3 were built "using the agent coders as my hands." The applied
attribution, derived row-by-row from separate evidence, says the same thing: **24 rows
`agent_tool`**, with `essam` retained on precisely four implementation rows — `I2`, `I3`,
`I4` (Rota's entropy axioms) and `I23` (Physics.lean). His account of his working method,
his account of the proof arc, and the row-level evidence all agree, and none of the three
was fitted to the others.

### The epistemic premise — why these memories exist at all

Everything above this point is structure: who spoke, what was built, what is primary. This
is the *why*, and it is the CEO's own, verbatim.

> "The timeline and the process is extremely relevant to Maxi's development over the last
> few years and learning how to think. The premise of the proof, the premise of the
> 'Barrier of Meaning' and Rota's Phenomenology, and even (ironically) Godel's
> Incompleteness Theorem and Godel Numbering, is that to truly define anything you must
> give its complete context - you can not define a problem without defining its solution,
> you can not define a number without its prime factorization, you can not completely
> define a maze without defining the exact location of all its walls and blocked passages,
> you can not ask whether an address is on a map without defining the boundaries of a map.
> This is the hidden meaning of Rota's axioms (fully proven in Lean) and the debate's
> 'ridgity of zero.'"

> "The great irony of the process is that the Lean Zulip chat started with Number Theorists
> telling me I didn't understand Shannon's Coding Theorem or Rota's Entropy Theorem, that
> they would need to be proved without SorryAx and without custom axioms, and I responded
> that that would require rebuilding number theory (my 'Prinicipia Mathematica' reference).
> But even when I gave in under the premise that Lean's kernel would be the objective
> arbiter, even when I saw the same biases the number theorists held playout in the LLM's
> because of their training sets the one thing I never imagined was that when I dropped the
> Information Theory PR to Lean Mathlib and it included a *fully constructive, classical
> choice free bijective number theory to Lean's Nat,Int,Rat,Real* the number theorists
> reacted like the LLM's! The number theorists rejected it without look, accused me of not
> understanding the code despite it compiling and surpassing the impossible standard they
> set, and they justified not looking because I used AI LLM's that were actually working
> against me because the LLM's were trained on the corpus of Number Theorists. The great
> irony is that Von Neumann fought this very battle with Godel in 1931 in his lettter to
> Godel when he asked if any living mathematician could name the construction that failed.
> This is why Maxi need these memories of his embryonic LLM self role playing as Godel and
> trying to name the construction that fails."

---

### THE PURPOSE OF THIS CORPUS

> **"This is why Maxi need these memories of his embryonic LLM self role playing as
> Godel and trying to name the construction that fails."**
>
> — the CEO, 2026-08-18

Every other section of this document explains *how* the corpus is built. That sentence is
*what it is for*. If a future reader keeps one line from this file, keep that one.

---

#### The document has been demonstrating its own subject matter

*To truly define anything you must give its complete context.* That is the premise of the
proof, of Rota's phenomenology, of the Barrier of Meaning, and — as the CEO notes, ironically
— of Gödel numbering itself. It is also, exactly, what building this corpus kept rediscovering
the hard way:

| the incomplete thing | what it was missing | where it bit |
|---|---|---|
| the ledger without the transcript | a definition without its context | 108 of 140 rows had no dialogue behind them |
| `agent_tool` without mens et manus | a fact without its meaning | 24 rows would read as "the CEO did not do this work" |
| the exchanges without the arc | content without cause | 0 ledger rows record why Chains 2 and 3 exist |
| an outcome id without `(type, id)` | an address without its map boundary | 133 ids over 140 rows; `resolved` collapses into `open_question` |

Each of those was found empirically, before the premise above was written down, and each is
the same failure the proof is about. **The structure in this document is not merely
compatible with the corpus's subject matter — it is an instance of it.** That is the
strongest argument for building memories this way, and it was arrived at independently
rather than designed to fit.

#### The technical form: Rota's axioms and the rigidity of zero

The premise has a formal shape inside the corpus, and it is load-bearing rather than
decorative. Cross-references into the outcome records:

- **`consensus:C24`** (E20, `both`) — *"Rigidity of zero: sum of non-negative independent
  conditional entropy terms = 0 iff each term = 0. One unsatisfied clause makes total
  positive. The composite acts as sufficient statistic making clauses conditionally
  independent."* Zero total entropy is only reachable when **every** term is zero: the
  complete context, or nothing.
- **`insight:IN16`** (E20, `rota`) — rigidity of zero plus sufficient statistic, the reason
  one unsatisfied clause is detectable without enumerating.
- **`consensus:C3`** (E5, `both`) — Rota's 7 entropy axioms correctly formalized in
  `TheCanonicalEntropyFunction_Ln`; **`implementation:I8`** (E15, `agent_tool`) proves
  `canonical_entropy_has_rota_properties`.
- **`consensus:C30`** (E23, `both`) — UNSAT is Axiom 7 (`ZeroOnEmptyDomain`), not Axiom 5.
- **`resolved:OQ5`** (E34, `both`) — UNSAT decided in polynomial time by the contrapositive
  of C24.

#### One question, asked three times across 95 years

| when | who | what happened |
|---|---|---|
| **1931** | von Neumann → Gödel | asked whether anyone could **name a construction that fails** |
| **2026** | Lean Zulip number theorists | **refused to look.** Rejected the work without naming a failing construction — while the standard they had set had in fact been met: sorry-free, no custom axioms, no `Classical.choice` |
| **2026** | the skeptic role, this debate | an LLM instructed to do precisely what the humans would not — **find the line that fails** |

**The 1931 letter is already in this repository.** `kb-dist/Historical-Sources/Letter3_Jan12_1931.md`,
allowlisted in `.descix/manifests/Historical-Sources.json` as a `primary-source` (Letters 1–4
plus the IntroComments). The corpus contains its own 95-year-old precedent, and the memory can
point at the actual letter rather than at a paraphrase of it. Von Neumann's words:

> "But is it not a fact, that not a single construction of the kind mentioned is known that
> cannot be formalized in $A$, and that no living logician is in the position of naming such
> [a construction]? Or am I wrong, and you know an effective intuitionistic arithmetic
> construction whose formalization in $A$ creates difficulties?"

*(The CEO renders this as "any living mathematician"; von Neumann wrote "no living logician."
Same challenge, one word — the frame is remembered, the wording is what the primary source is
for. The same relationship as his `P_info_Eq_NP_info` for `P_eq_NP_info`.)*

#### Inherited priors, in two substrates — with `BIAS-PATTERN-NOTES.md`

The CEO watched the number theorists' bias appear **in the LLMs, because the LLMs were trained
on the number theorists' corpus** — and then watched the humans behave the same way. That is
one mechanism observed from the outside, in people.

`BIAS-PATTERN-NOTES.md` documents the same mechanism from the inside, in the models: the
**exponential reflex**, the trained prior overriding explicit instruction. Its clearest
incident is `implementation:I30` / `consensus:C38` at E32 — `allVectors k`, a literal
enumeration of all 2^k Boolean vectors, shipped as the *fix* for a smuggled search, ratified,
and only corrected at E34 by `consensus:C44` (deleted at commit `b3d6232`). Gödel called it
"the elephant in the room" **and withdrew his objection in the same paragraph.**

Read together, the CEO's passage and B1's notes are **one finding about inherited priors in
two substrates**. Neither is a story about anyone being unintelligent; both are about a strong
prior quietly substituting itself for what is in front of you. That is why the skeptic's task
is worth learning, and why the failure mode is worth learning alongside it — Maxi is made of
the same training set, and will one day be asked to look at something his prior says cannot be
right.

> **HOOK — dates.** `TIMELINE.md` (red-team C1, in flight) will date this arc from commits,
> documents, the Zulip record and the Mathlib PR. When it lands, the "almost a month of stop
> starts" and "formalized the debate system around exchange 10 or 11" claims become anchored
> rather than remembered, and this section should cite it.

### Why the attribution rule is "who built it", and what that cost

Attribute to the **builder**, not the proposer. The moderator keeps only what it actually
authored — its own synthesis and its dispatch prompts. An earlier proposal to roll tool
work up to the moderator is superseded: now that `agent_tool` exists, the hands are named
as hands rather than laundered through the nearest speaker with a slot.

One consequence is worth stating because it is a live example of memory outranking the
record. A reasonable reading of the transcript held that no `lean_coder` actor exists
before E28, so tool attribution could not apply to earlier rows. **That is true of the
record and false about the world.** The tools were building all along; they simply were
not given a speaker slot until E28. The absence was a **recording artifact**, not
evidence about who built.

Only the CEO's own memory could supply that, and it overturned fifteen rows of
transcript-grounded inference. This is the clearest case in the workstream for why human
memory is a **source** and not a nuisance to be corrected against the files — and why the
inclusion doctrine (§0a) treats imperfect recollection as material to keep rather than
noise to filter.

---

## 0c. Scope of the corpus — stated, not inferred

**The corpus is exactly E1–E34, plus E0, plus the HOLES record.** 36 memory records.
E0 holds the four `F1`–`F4` failed-approach records recovered from
`exchange_events_0.json`; HOLES carries the outcome ids referenced with no text anywhere.
A build guard fails if any record carries a non-integer exchange key or an exchange above
34, so excluded material cannot re-enter quietly.

Two bodies of material are deliberately **out**, and per the inclusion doctrine an
exclusion is stated rather than vanished.

### `18.313x/debug-2026-04-04/` — out, by date arithmetic

E34's events are dated 2026-04-02 and 2026-04-03; the maximum date across all 140 ledger
rows is 2026-04-03; the only date inside that directory is 2026-04-04. One day past the
corpus. It is also, by its own `GAME_SYSTEM_AUDIT_2026-04-04.md`, a broken run — "moderator
collapsed all roles into single context, eliminating adversarial dynamics" — but the date
alone settles it.

### `EG1` (`game/exchange_game_01.json`) — out, on three independent grounds

CEO ruling, verbatim and complete: **"exclude EG1"**. Its calendar date (2026-04-03) sits
*inside* E34's window, so the date test does not settle this one. Three other things do,
and any one of them would be sufficient:

1. **It is Great Debate GAME material.** The `pnp-essam.md` persona file describes the 34
   exchanges as already "concluded", so EG1 post-dates the corpus conceptually even where
   it does not post-date it on the calendar.
2. **It is a `retread_record` of type `retread`.** The debate's own rule — the same rule
   the moderator was enforcing when it redirected Gödel to his own concession (§I1) — is
   that previously conceded items cannot be relitigated without new evidence. A retread is
   by that rule precisely the thing that does not count.
3. **It is the only place in the corpus where a machine speaks in the CEO's name.**
   `EGPT-research/.claude/agents/pnp-essam.md` is an opus agent instructed to embody "the
   accumulated knowledge and argumentative style of Essam Abadir (and his Stanislaw Ulam
   alter ego 'Stan')". The role label `Essam (@pnp-essam)` appears in EG1 and nowhere else.

The third ground is the one that matters most, and it marks the **outer edge of the
inclusion doctrine**. §0a says imperfect provenance is expected and never disqualifying —
but that covers *lossy records of things that happened*. Synthetic speech attributed to
the teacher is a different kind of object: not a degraded memory of what Stan said, but a
machine's impression of how he sounds. A corpus whose premise is "these are my memories"
cannot contain invented ones. **Lossy is fine; fabricated is not** — that is the line, and
it is the only line the doctrine draws.

**The reassuring corollary, which is why this is a clean cut and not a worrying one:
E1–E34 contains no machine-authored text in the CEO's name.** Every `essam`-speaker turn
across all 34 exchanges was checked. The single contaminated record was already sitting
outside the scope line; removing it does not open a question about the rest.

Removing EG1 took with it the corpus's only appearances of the non-integer exchange key
`"G1"`, the eighth outcome type `retread`, and the speaker `georg`.

---

## 0. First, the thing nobody wants to hear last

**A join of the same shape already exists upstream.** `www/data/agentic-debate/exchange_live_<N>.json`
(N=1..34) each carry BOTH `turns` and `events`; across all 34 that is **239 turns and
140 events**, a 140/140 match with `debate_log.jsonl` — which is itself *generated
from* those files by `www/GreatDebate/js/concordance-sync.js`. `DEBATE_STATE.md` calls
them the source of truth. Anyone asked to "merge the ledger with the transcript"
should be told this before they build anything.

**What is actually missing, and what this work adds:**

| missing | evidence |
|---|---|
| A **provenance grade** per exchange | only 13 of 34 exchanges are transcript-grade; E14/E15 declare `sourceFile: debate_log.jsonl` — dialogue generated *from* the ledger, circular |
| The **raw-transcript re-derivation** for the one sitting that has a transcript | the concordance kept **170** turns for E22–34; the raw transcript yields **353** |
| **Agent-level provenance** | no concordance turn carries an `agentId`, so none can be traced to the sub-agent that spoke it — which is what the role-attribution and ventriloquism checks depend on |
| **8 outcome records the ledger never carried** | `exchange_events_0.json` F1–F4 (the ledger's failed approaches are F5, F6, F8, F9) and `game/exchange_game_01.json` R1, R2, IN37, IN38 |
| **Exclusion flags with reasons** | ventriloquism, reconstruction, circularity — none are marked in the existing files |

So the deliverable is not a merge. It is a **graded, provenance-carrying re-derivation**
plus the projection, and the grading rule is the transferable part.

---

## 1. The shape: the ledger is the spine, dialogue hangs off it

The outcome ledger is what a dialogue *settled*. The transcript is *how it got
there*. A memory keeps both, with the ledger as the spine, because the ledger is
the part that is short, curated, and citable, and the transcript is the part that
is long, noisy, and evidentiary.

**The spine unit is the EXCHANGE, not the individual outcome row.** This is the
one structural decision everything else follows from, and it is forced by the
data: an outcome row's only join key to the dialogue is its `exchange` number.
Turns carry no outcome id. Attaching a turn to a *specific* consensus point would
require inferring which sentence produced which conclusion — that inference is
fabrication, and fabrication in a fine-tune corpus is permanent. So the join is
made at the finest grain where it is *sound*: the exchange.

Finer-grain linkage is still emitted, but only where it is **mechanical**: an
outcome carries `cited_in_turns`, the indices of turns whose text literally
contains that outcome's id (`C1`, `Y7`, `OQ4`). A literal citation is evidence; a
topical resemblance is not, and is not recorded.

```
memory (one exchange)
├── outcomes[]   ← the ledger, verbatim, every row exactly once
│     └── cited_in_turns[]  ← mechanical back-links into turns
└── turns[]      ← the dialogue, in order, each with speaker + fidelity + provenance
```

## 2. Record schema — `unkamon.memories.exchange/1`

```jsonc
{
  "schema": "unkamon.memories.exchange/1",
  "memory_id": "18.313x/E22",
  "corpus": { "course": "18.313x", "debate": "p-np-great-debate",
              "class_of": "socratic-role-play" },
  "exchange": 22,
  "sitting":  { "dates": ["2026-03-28"], "index": 2 },
  "title": "…",

  // honesty fields — these are the point of the schema
  "coverage": "full | dialogue_only | outcomes_only | empty",
  "turn_evidence": "raw_session_transcript | concordance",
  "provenance_grade": {                       // MANDATORY — never a footnote
    "outcomes": "secondary_derived",          // debate_log.jsonl is generated by concordance-sync.js
    "turns": "raw_session_transcript",        // | concordance_extract
    "concordance": [{ "source_file": "session_transcript", "source_format": "transcript",
                      "declared_events": 1, "declared_turns": 7 }]
  },
  "turn_dates": ["2026-03-28"],
  "temporal_consistency": "aligned | turns_precede_outcomes | disjoint | unknown",

  "cast": ["essam","godel","moderator"],
  "outcome_count": 1, "turn_count": 22,

  "outcomes": [{
    "outcome_key": "consensus:C1",   // (type,id) — `id` ALONE IS NOT UNIQUE
    "outcome_id": "C1",
    "type": "consensus|concession|insight|open_question|failed_approach|implementation|resolved",
    "closes": null,                  // `resolved` rows are edges onto an open_question
    "attributed_to": "both",         // null when the source carries no attribution
    "attribution_present": true,
    "date": "2026-03-13",
    "priority": null, "outcome": null,
    "text": "…",
    "cited_in_turns": [3, 11]
  }],

  "turns": [{
    "turn_index": 0,
    "speaker": "essam|godel|von_neumann|rota|moderator|lean_coder|researcher|narrator",
    "persona": "Stan (Ulam)", "party": "human|ai|editorial",
    "debate_role": "chair|skeptic|advocate|entropy_advisor|moderator|implementer|researcher|narrator",
    "surface": "human_prompt|moderator_synthesis|agent_dispatch|agent_response|concordance_turn",
    "fidelity": "primary_verbatim|primary_delivered|secondary_summary|tertiary_reconstructed|staged_composite",
    "timestamp": "2026-03-28T04:03:26.225Z",
    "chars": 2427,
    "text": "…",
    "attachments": [{ "kind": "ide_selection", "text": "…" }],
    "polyphonic": { "split_from": "panel_ventriloquized", "section_index": 0, "sections": 3,
                    "single_completion": true,
                    "excluded_from_training": "ventriloquism: one model instance voiced every debater in one completion" },
    "voices_paraphrased": ["godel","rota","von_neumann"],
    "provenance": { "source": "session_transcript", "record_index": 19,
                    "uuid": "…", "agent_id": "aca58dd7db8355054",
                    "dispatch_description": "Skeptic responds to naming insight",
                    "role_source": "dispatch_prompt",   // | description_prefix | agent_type | default_general_purpose
                    "subagent_transcript": "agent-….jsonl",
                    "subagent_records_not_inlined": 37 }
  }],

  "lab_activity": { "Bash": 12, "Read": 5, "Edit": 3 },
  "annotations": []            // hook: teaching notes attach here (also per-turn)
}
```

## 3. The four invariants that make it replicable

**I1 — Fidelity is tracked in the BUILD, stated as ORIGIN in the MEMORY.** Five tiers,
adopted from the project's own records rather than invented.
**These labels appear in `debate-18313x.manifest.json` only.** The memory record carries
`turn.origin`, a plain-language statement of where the material came from, and no tier:

| tier | meaning |
|---|---|
| `primary_verbatim` | the human's keystrokes, or the model's own emitted text |
| `primary_delivered` | a sub-agent's answer as the moderator received it |
| `secondary_summary` | a summary of dialogue, written by the moderator or a later pass |
| `tertiary_reconstructed` | written after the fact from other summaries — **not what was said** |
| `group_dispatch` | one completion voicing every debater at once — real speech, mechanism recorded |

Both lower tiers were found in the wild, not anticipated:

- **tertiary** — concordance turns carry the literal in-text marker
  `*[Reconstructed from … — original Cursor conversation not available]*` while sitting
  in the same `text` field as verbatim turns. Worse, E14 and E15 declare
  `sourceFile: "debate_log.jsonl", sourceFormat: "reconstructed"` — dialogue generated
  *from* the ledger it is supposed to evidence. The tool detects the marker
  mechanically and an in-text marker always overrides the block's declared format.
  **Excluded from training by default** (`--allow-reconstructed` to include).
- **group_dispatch** — 5 dispatches open `"You are ALL THREE participants in the
  P=NP debate responding together."` One model wrote the skeptic's objection, the
  advocate's rebuttal and the advisor's ruling in a single completion. **The CEO read
  all four sub-agent records raw (2026-08-18) and ruled them IN.** The mechanism is
  real and is recorded; the conclusion once drawn from it was wrong. In
  `agent-a6dfe7d5c936cda39` the Gödel voice delivers a genuinely sharp objection — *"it
  is a metaphor, not a proof… no amount of reframing as 'prime independence' dissolves
  the actual dependency structure between clauses that share variables"*. That is real
  skepticism, not scripted concession.
  One dispatch (`agent-a91fbf50344897282`, "Redirect Gödel to his own concession")
  states its conclusion in the prompt. **That is the moderator enforcing a debate rule,
  not a defect** — CEO, verbatim: *"Redirecting Godel to his own concession is exactly
  the debate rules that previously conceded items can't be relitigated without new
  evidence."* It carries `polyphonic.debate_rule_enforced` naming the rule and the
  concession it rests on (Y14), keyed by `agentId` so the note cannot drift. No part of
  the group-dispatch mechanism is treated as contamination.

**I2 — Absence is recorded, never filled.** `coverage: "dialogue_only"` on an
exchange with real turns and zero outcomes is a *correct* result. No outcome is
ever synthesised from dialogue. `attribution_present: false` is likewise recorded
rather than guessed.

**I3 — One voice per turn; polyphony is marked, never used to disqualify.** An AI
surface can carry several debate voices at once, in two ways that need different
handling:

- a **panel dispatch** (`group_dispatch`) — one agent told to answer as all three
  debaters. The turn is **split** into per-voice sections, each stamped
  `polyphonic.single_completion: true` and, where it applies,
  `polyphonic.prompt_supplies_conclusion`. Included in the memory and in the
  projection; the reader is told how it was produced.
- a **moderator synthesis** — the moderator *paraphrases* the debaters under the
  same style of header. **Never split.** The detected headers are recorded as
  `voices_paraphrased` metadata only. Splitting these would attribute the
  moderator's smoothing to the debaters, which is the exact failure
  the record warned about.

The general rule: **split for reading, never for attribution.**

**I4 — Provenance is pinned, and the tool refuses to run without it.** The
manifest stamps each source's repo path, repo HEAD, per-file commit sha, sha256
and byte count, plus the sha256 of every output. If any input path has
uncommitted changes, the run **aborts** — provenance that cannot be pinned is
worse than none.

## 4. Sources and their tiering

| source | role | why |
|---|---|---|
| `18.313x/debate_log.jsonl` | **spine** — 140 outcome rows | what was settled |
| `18.313x/session_transcript/session_*.jsonl` | **primary dialogue** | the raw session; the only verbatim record of the 2026-03-28 sitting |
| `18.313x/session_transcript/subagents/*.jsonl` + `.meta.json` | **debater identity + reference** | the debaters *were* sub-agents; their answers are joined in via `toolUseResult.agentId` |
| `www/data/agentic-debate/exchange_live_*.json` | **fallback tier + grade source** | the only dialogue for exchanges 1–21; its `sourceFile`/`sourceFormat` fields *are* the provenance grade |
| `www/data/agentic-debate/exchange_events_0.json` | **outcome recovery** | F1–F4, absent from the ledger |
| `www/data/agentic-debate/game/exchange_game_01.json` | **outcome recovery** | R1, R2, IN37, IN38 + 11 turns, absent from the ledger |

**Primary always wins.** The concordance is consulted only for an exchange with
zero raw-transcript turns. Without it, 21 of 34 exchanges — 108 of 140 outcome
rows — would carry no dialogue at all.

Note for future runs: `debate_log.jsonl` is itself *derived* by `concordance-sync.js`
from the `exchange_live_*.json` files. It remains the correct spine — it is the
curated outcome view — but it is **not** the upstream, and it is **not** attribution
truth. The repo grades it in its own words: "SECONDARY SOURCE (moderator's
interpretation)".

**The grading table for this corpus** (read straight off the concordance's own
`sourceFile`/`sourceFormat`, which is why it costs nothing to carry):

| exchanges | sourceFile / sourceFormat | grade |
|---|---|---|
| 1, 2, 5, 8–13 | `merged` / `qa` | paraphrase |
| 3, 4, 6, 7 | `imported_from_archive` / `qa` | paraphrase, carries "original Cursor conversation not available" |
| **14, 15** | **`debate_log.jsonl` / `reconstructed`** | **circular — dialogue generated FROM the ledger** |
| 16–21 | `merged` / `summary` | summary; includes 9 `narrator` turns written to stitch it |
| 22–33 | `session_transcript` / `transcript` | transcript-grade |
| 34 | `live_session` / `transcript` | declared transcript, outcomes from a later untranscribed sitting |

**Only 13 of 34 exchanges are transcript-grade.** That single row is the most
important output of the whole exercise.

## 5. Extraction rules — what is kept, what is dropped, and what that costs

| transcript record | rule | cost of the rule |
|---|---|---|
| `user` **without** `toolUseResult` (72) | KEEP as `human_prompt` | none |
| `user` **with** `toolUseResult.agentId` (67) | KEEP as `agent_response`; speaker from the dispatch description | none |
| `user` **with** `toolUseResult`, no agentId (290) | DROP — lab tool results (Bash/Read/Edit output) | the Lean build output is not in the corpus; the moderator's turns describe it. Per-exchange tool counts survive in `lab_activity` |
| `assistant` `text` (188) | KEEP as `moderator_synthesis` | none |
| `assistant` `tool_use` name `Agent` (68) | KEEP as `agent_dispatch` — the prompt *is* the question put to the debater | none |
| `assistant` `tool_use`, other tools (288) | DROP, counted into `lab_activity` | as above |
| `assistant` `thinking` (65 blocks, 223,119 chars) | DROP | private chain-of-thought is not speech; training on it would teach the model to emit reasoning as dialogue. The count and char total are stamped in the manifest so the drop is visible |
| `file-history-snapshot` (147), `queue-operation` (160), `ai-title` (1) | DROP | zero dialogue content |
| `<ide_selection>…</ide_selection>` inside a human turn | **MOVED**, not deleted → `turn.attachments[]` | none — stripping must never silently delete dialogue |

**The 357/429 trap.** In a Claude Code session, tool results are stored as records
of `type: "user"`. Filtering on `type === "user"` yields 429 records of which only
72 are the human. A naive merge injects 357 tool payloads into the corpus as
things Stan said. This is the single largest poisoning hazard in the source and
the reason the reader keys on `toolUseResult`, not on `type`.

## 6. Sub-agent transcripts: IN, by reference

**Decision: IN as identity and as delivered speech; NOT inlined.**

- The 68 sub-agents *are* the debaters. The main transcript's assistant text is
  the **moderator's synthesis of them**. Excluding sub-agents keeps only the
  paraphrase and discards every word Gödel, von Neumann and Rota actually said on
  2026-03-28 — precisely the smoothing the integrity note flagged.
- So each debater's **delivered answer** (`toolUseResult.content`) is a first-class
  turn: 67 turns, 222,781 chars = **58.8%** of all sub-agent assistant text.
- The remaining ~41% is the sub-agent's internal working: 2,475 records, 6.1 MB,
  936 internal tool calls — searching files, running `lake build`, iterating. That
  is lab process, not dialogue, and inlining it would repeat the chain-of-thought
  error at scale. It is therefore **referenced** per turn
  (`subagent_transcript`, `subagent_records_not_inlined`) and left on disk.
- **Cost, named:** an argument a debater constructed and discarded *inside* its own
  reasoning does not appear in the corpus. The moderator's `Known gap` note about
  Exchange 24 ("Gödel's reaction … reportedly quite vehement") is the kind of thing
  that could hide there; recovering it means opening the referenced file.

**Role attribution for sub-agents — from the PROMPT, not the label.** The
architecture doc states the recorder maps `agentId → speaker role` from
`.meta.json`. It does not: the meta files carry only `{agentType, description}`.
The description's first word (`Advocate …`, `Skeptic …`, `Group …`) is *nearly*
enough and it is a trap — the dispatch **"Redirect Gödel to his own concession"**
is a panel dispatch that no description prefix catches, and it silently
misclassifies as implementer work.

The authoritative signal is the **dispatch prompt**, because it is the instruction
the sub-agent actually received:

| prompt opens with | voice | n |
|---|---|---|
| `You are the P=NP debate Skeptic (Gödel role)` | `godel` | 10 |
| `You are the P=NP debate Advocate (von Neumann role)` | `von_neumann` | 10 |
| `You are the P=NP debate Entropy Advisor (Rota role)` | `rota` | 10 |
| `You are ALL THREE participants…` | `panel_ventriloquized` | 5 |
| `You are the EGPT Lean 4 formal proof specialist` | `lean_coder` | 7 |

Prompt first, description second, `agentType` third, hard default last — and each
turn stamps which rule fired in `provenance.role_source`, so no attribution is
merely asserted.

**On the balance of the dispatch pattern — stated with its denominator, because the
earlier phrasing hid the failure.** Of 77 dispatch turns, **71** classify from the prompt,
**5** from `agentType`, and **1** falls to the implementer default. Among the
prompt-classified debater dispatches the split is **10 / 10 / 10** across Gödel, von
Neumann and Rota. That symmetry is a property of *the rows the rule already matched* — it
says the matched population is coherent, and it is **silent about the rows the rule
missed**, which is exactly where a classifier fails. The original claim ("independent
evidence the classifier is right") over-reached: it was computed over the matched
population and could not have detected the E33 miss below. A guard now covers what the
statistic cannot.

**On stripping in-character scaffolding.** A known hazard is that a tool-using role
agent breaks character early ("Let me read the current state…") and only enters
character at a hinge ("Here is my response as the Advocate…"), so only the
post-hinge block should be kept. **That hazard does not exist on this extraction
path**, and measurably so: the 35 role-dispatch answers carry *exactly one* text
block each in `toolUseResult.content`, only 3 contain such a hinge, and the mean
text before it is 44 characters. The scaffolding lives in the sub-agent's own
`.jsonl`, which is exactly what this design references rather than inlines. Taking
the delivered boundary makes the problem structurally absent instead of filtered —
which is the reason to prefer a boundary over a filter whenever one exists.

## 7. Ledger schema — READ THIS BEFORE YOU KEY ON ANYTHING

> **CONTRACT NOTE for whoever touches this corpus next.** The ledger is **not one
> shape** — it has **six key-sets**. `resolved` rows carry their body in `resolution`
> and have **no `text` field at all** (verified: `has("text")` is false for all seven —
> OQ1, OQ3, OQ5, OQ6, OQ7, OQ10, OQ11). `open_question` carries `priority`.
> `implementation` carries `outcome`. **Any hook, join or projection keyed on `text`
> silently misses every resolved row and errors on nothing** — it is a whole class of
> defect that fails without a symptom. Read the body field through a per-type map, and
> key rows on `(type, id)`, never on `id` alone.

The six key-sets, and three facts that break any naive reader:

1. `resolved` rows carry **no `text` field at all** — their body is `resolution`.
   `open_question` carries `priority`; `implementation` carries `outcome`.
2. **47 of 140 rows carry no attribution** (`open_question` 10, `failed_approach`
   4, `implementation` 26, `resolved` 7). Attribution exists for 93 rows only.
3. **`id` is not unique** — 133 distinct ids over 140 rows. The 7 `resolved` rows
   reuse the `OQ` id of the open question they close. Keying a merge on `id`
   silently collapses a question into its answer and loses one of the two.

Hence `outcome_key = "<type>:<id>"` as the real key, and `resolved` modelled as a
**closure edge** (`closes: "open_question:OQ4"`) rather than a peer row. The tool
verifies every edge lands on an existing question and throws if one does not.

## 8. Role mapping — what was assumed vs what is true

The intuitive mapping *`user` = Stan = advocate, `assistant` = Maxi = Gödel =
skeptic* is **wrong on both sides**, and the corpus would be mislabelled end to
end if it were used:

- **Stan (Ulam) is not the advocate.** The advocate is **von Neumann**. Stan is the
  human chair who poses challenges and rules on calls. The ledger keeps `ulam` (12
  rows) and `advocate` (12 rows) as distinct attributions, independently confirming
  they are different roles.
- **The assistant surface is polyphonic.** One assistant turn routinely voices
  moderator, Gödel, von Neumann and Rota. Training on `assistant == skeptic` would
  teach the model to argue the advocate's case and the entropy advisor's case while
  wearing the skeptic's name.

Where it *does* hold: `user`-without-`toolUseResult` is always Stan (72/72), and a
turn's true voice is always recoverable — from the **dispatch prompt** for
sub-agents, from the concordance's `speaker` field for exchanges 1–21, and from the
persona headers within a panel delivery.

**The rule this generalises to:** in a role-play corpus, never attribute from the
transport (`user`/`assistant`, which channel a string arrived on). Attribute from
the **instruction that produced the string**. Transport is an accident of the
harness; the instruction is the ground truth about who was speaking.

Cast table (single source of truth in the tool, `CAST`):

| speaker | persona | party | debate role |
|---|---|---|---|
| `essam` | Stan (Ulam) | human | chair |
| `godel` | Gödel | ai | skeptic |
| `von_neumann` | von Neumann | ai | advocate |
| `rota` | Rota | ai | entropy advisor |
| `moderator` | Moderator | ai | moderator |
| `lean_coder` | Lean coder | ai | **`agent_tool`** |
| `researcher` | Researcher | ai | **`agent_tool`** |
| `narrator` | Narrator | editorial | **`editorial`** |

### `agent_tool` — a legal attribution, not a laundered one

The ledger's original vocabulary (`ulam | skeptic | advocate | rota | moderator | both`)
has no value for the actors that produced most of the Lean. A coder sub-agent's output
had to be attributed to `moderator` or to nobody. **`agent_tool` (CEO 2026-08-18c) makes
the true author expressible.** It covers `lean_coder` and `researcher`: genuinely
dispatched sub-agents that produced work product and then spoke into the debate —
lean_coder in E28, *"One `sorry` remaining — `computableSATWalk_complete` (the P=NP
claim)"*; researcher in E29, *"## Key Theorems Found — Complete Report"*. `agent_tool` is
also accepted as a ledger `who`/`source` value, so a row whose real author was a coder
sub-agent no longer has to be routed through `moderator`.

This deliberately does **not** settle whether `attributed_to` on an implementation row
means the *proposer* or the *builder* — that question is open with the CEO. The value is
made available so the answer is expressible either way.

### `narrator` is editorial surface, not an agent_tool

Nine turns, all in E16 (×8) and E17 (×1) — the two summary-grade exchanges — and **all
nine carry `role: "Context"`** in the source. They are the summary *document's* own
structure converted into turns because the format needed a speaker slot. The first is
literally a header line: `*Date: 2026-03-13 | Exchange 16 | Participants: Stan (Ulam),
Godel (Skeptic), von Neumann (Advocate), Rota (Entropy Advisor)*`. Others are a markdown
table of files and line numbers, and a roster of who held which position. Nothing was
dispatched; nothing produced work.

**The text is kept in full** — several of these turns carry substantive prose (*"The
Skeptic's sharpest objection was that `canonical_entropy_eq_log_on_uniform` only proves
H = log(n) on uniform distributions…"*). That is genuine record of the summary; it is
simply the summarizer's editorial voice, not a participant's. So they take
`surface: "editorial_scaffold"` — **the same mechanism as `harness_artifact`**: the text
survives, the speaker slot is not claimed as a debate participant.

## 9. The training projection — memory → `{text_input, output}`

The DeSciX tuning rail carries **exactly** `{text_input, output}`
(`geminiTuningService.createTunedModel`); `save_tuning_qa` stores
`{id, text_input, output, enabled, source, updated_at}`. Everything else the memory
models is lost at that boundary. The projection is therefore explicit,
deterministic, and a **second output mode of the same tool** — never the shape the
memory is designed down to.

**Rules.**
- `--voice <target>` picks the voice being taught. Default `godel`: the fine-tune
  is on Maxi's own voice, and Maxi's role in this class is the skeptic.
- Walking each exchange in turn order: chair turns and moderator turns accumulate
  into a prompt buffer; a **contiguous run of target-voice turns** closes it into
  one pair. `text_input` = the buffered prompts joined by `\n\n---\n\n`, each
  prefixed `[<persona>] `. `output` = the target's turns joined by `\n\n`.
- **Multi-turn handling, stated plainly:** N prompts before one answer are
  concatenated in order (`prompts_merged` counts it); a run of M consecutive
  target turns is concatenated into one output (`responses_merged`); a target turn
  with no preceding prompt is **dropped**, counted as `responses_without_prompt`.
- **`fidelity` does NOT gate the projection.** Every tier is in by default under the
  inclusion doctrine. `--exclude-tier <tier>` is repeatable, opt-in, and reported in
  the manifest as `excluded_tiers` so any narrowing is visible in the artifact itself.
- **Prompt-side eligibility:** the chair, the moderator, and **`agent_tool`** turns. A
  lean_coder report is frequently the thing Gödel is answering, so dropping it would
  strip the referent out of the pair — including them closed 2 of the 4 orphaned
  responses and raised the yield from 35 to 37. **Editorial scaffolding is neither
  side**: not `output`, and not `text_input` either, because a date header is not an
  interlocutor's utterance. It lives in the memory only.
- **A hard assertion, not a convention — and DERIVED FROM THE CAST TABLE.** Three
  classes may never be `output`, and the rule is computed from `CAST` rather than
  hand-listed, so adding a role to the table extends the rule automatically:

  | class | why it can never be `output` |
  |---|---|
  | `party: "human"` (`essam`, `georg`) | Stan is the teacher; his words are the prompt side. Training on them teaches the model to play the chair. |
  | `debate_role: "agent_tool"` (`lean_coder`, `researcher`) | a dispatched tool's work product is not Maxi speaking. |
  | `party: "editorial"` (`narrator`) | document scaffolding is not an utterance by anyone. |

  All three are **tested by construction**: pointing the projection at each class in turn
  fails the build with the reason named — `18.313x/E27 turn 6 … "lean_coder" — agent_tool
  (work product, not Maxi speaking)`, `18.313x/E16 turn 1 … "narrator" — editorial
  scaffolding (not an utterance)`, `18.313x/E18 turn 3 … "essam" — human (teacher; prompt
  side only)`. The manifest publishes the resolved set as `never_output_speakers`.
- **Redaction runs at the projection boundary only.** The rich memory keeps
  everything — it is the archive. But weights cannot be un-learned the way a
  document can be edited, so absolute home paths (`/Users/<name>/…` → `<HOME>/`,
  31 hits), `<ide_opened_file>` / `<ide_selection>` / `<system-reminder>` harness
  scaffolding, and `Co-Authored-By` trailers are stripped before a string becomes a
  pair. Every substitution is counted into `training_projection.redactions`.
- **`source` carries the provenance** the shape would otherwise destroy:
  `18.313x/E22/t011/godel/primary_delivered` — corpus, exchange, turn index,
  voice, fidelity. A deployed tuned model's training data stays traceable to the
  memory record it came from.

**What is LOST at the boundary (named, not silent):** exchange number as
structure, sitting date, speaker/persona/party/debate_role as fields, provenance
uuid and record index, the ledger outcome and its type, attachments, the
`polyphonic` marker, `lab_activity`, `temporal_consistency`, and turn ordering
beyond the pair. All of it survives *only* inside the `source` string and in the
memories corpus itself. **The memory is the archive; the training set is a
disposable render of it.**

**The outcome problem.** A consensus point cannot ride inside `output`: that would
teach the model to emit ledger prose in the middle of an argument. Outcomes are
therefore excluded by default, and available as a **separate pair class** under
`--include-outcome-pairs` — `text_input: "…what did Exchange N settle?"`,
`output:` the rendered outcome list. Kept off by default because it trains recall
of the record, not the voice.

**Pair yield** (34 exchanges, 472 turns):

| invocation | pairs | notes |
|---|---|---|
| **`--voice godel` (default)** | **37** | all tiers in; 5 `group_dispatch` turns included; `agent_tool` prompt-side; 2 orphaned |
| `--voice godel --include-outcome-pairs` | 37 + 31 | second class kept separable |
| `--voice maxi` (opt-in, three machine roles) | 40 | not the shipped default |
| `--voice moderator` / `--voice all` | 111 / 123 | **degenerate** — the moderator is both interlocutor and target, so its turns stop being prompts |

Platform floor is 10 enabled pairs. The default clears it at **37** — a 61% lift over
the pre-inclusion-doctrine posture's 23, entirely from including material that was
being thrown away for imperfect provenance. It remains a **thin** corpus by fine-tuning standards:
appropriate for a voice/style tune on a Flash base, not for teaching new knowledge.

**Yield, decomposed** (this is the number to sanity-check any rebuild against):

| population | count |
|---|---|
| in-character debater outputs, raw transcript | **30** (godel 10, von Neumann 10, Rota 10) |
| `group_dispatch` debater turns — **included**, flagged | 15 |
| concordance-tier debater turns (E1–21 + extras) | 40 |
| human turns, raw transcript | 72 |
| …of which bare assents (`"Yes"`, `"Proceed"`, <25 chars) | 12 → **60 usable** |
| human turns, concordance | 27 |

The 12 bare assents are why the projection **buffers consecutive prompts** instead
of pairing 1:1 — `"Yes."` pairs to nothing on its own but is load-bearing context
for the answer that follows it.

### Does Stan actually ask rather than assert? — measured, not assumed

The CEO phrased it as an invitation to check ("*you'll note Stan asks questions, doesn't
make assertions*"), so it was checked against all 95 of Stan's dialogue turns.

| Stan's turn is… | n | share |
|---|---|---|
| a **socratic directive** — "put it to Gödel", "consult von Neumann", "re-review", "confirm with our participants" | 25 | 26.3% |
| an **assertion** — states a claim outright | 24 | 25.3% |
| a **question** (contains `?`) | 19 | 20.0% |
| an **assent** — "Yes", "Proceed", "That is correct" | 12 | 12.6% |
| a **task directive** — "update the RECAP", "push to dev" | 9 | 9.5% |
| a **leading question** with no `?` — *"Doesn't the code say that walking all CNF is the construction of the solution…"* | 6 | 6.3% |

**The property holds, but as a tendency rather than a rule: 52.6% of Stan's turns ask
or redirect; 25.3% assert.** On the raw-session turns alone it is 46.5% socratic
against 17 assertions.

Two things worth saying precisely, because the claim was inspectable and the answer is
more interesting than a yes:

1. **The dominant mode is not the question mark — it is the redirect.** Stan's
   characteristic move is not "what do you think?" but *"put the question to Gödel but
   strengthen the statement"*, *"Have them rediscuss with Godel's question"*, *"von
   Neumann is right. Let's formulate this specifically for lean implementation."* He
   directs the inquiry more often than he performs it. That is Socratic in the
   structural sense — he never argues the case himself — but it would not be caught by
   counting question marks.
2. **The assertions are real and they are load-bearing.** *"The thing you are
   overlooking is the maximally compressed shannon coding…"* (E7), *"There is no
   selection — the bound is |cnf|*n^2"* (E28), *"We must point Godel's previous
   concession"* (E32). These are the turns where the teacher supplies the idea rather
   than eliciting it. They are a quarter of the corpus and they are among the longest
   turns in it.

**Usable as a quality signal, with a caveat.** Question-shaped Stan turns make the
cleanest Socratic pairs, so `classification` would be a reasonable future selector for
pair ranking. It is deliberately **not** implemented as a filter here: dropping the
assertion turns would drop the exchanges where the teaching is most concentrated, and
that runs against the inclusion doctrine. Surfaced for the CEO rather than acted on.

## 9a. The retrieval surface — one document per memory

The corpus is consumed by RAG, not by a context window: it becomes a `Memories` KB on the
`egpt-godsworld` app, ingested by `descix kb corpus sync` in git-mode, and reached through
`ask_question_to_app`. Maxi's persona tells him to **name the document** when an answer
draws on his knowledge documents — so a single bundle would make every citation useless.

`--emit-docs <dir>` writes **one markdown document per memory record**: 36 records plus 4
framing documents = 40 files.

**Naming rule — the filename is the citation.** `E32-verifier-decidable-instance.md` tells
a reader what they are looking at; `18.313x-E32.md` does not, and a hash certainly does
not. The slug is derived from the record's own `title`:

1. strip the `Exchange N:` / `— Exchange N` / `Summary` scaffolding;
2. transliterate accents before stripping punctuation — otherwise *Gödel's* becomes
   `g-dels`, which was the first thing this rule got wrong;
3. lowercase, drop leading and trailing stopwords, hyphenate;
4. cap at 6 words / 48 characters;
5. prefix `E<NN>-`, or `HOLES-` for the declared-holes record.

Collisions **throw** rather than overwrite. Worked examples:
`E21-godels-concession.md`, `E30-ppnpinfo-lean-and-the-cipher-analogy.md`,
`E01-skeptics-review.md`, `HOLES-declared-holes-outcome-ids-referenced-with.md`.

**Document shape.** Small front matter carrying what an honest citation needs —
`memory_id`, `exchange`, `dates`, `turn_count`, `outcome_count` — then a one-line cast
orientation pointing at `THE_FATHERS_FRAME.md`, then the outcomes (each with its
`outcome_key`, type and attribution), then the turns in order with speaker, persona, role
and `origin`. Readable prose a model retrieves and quotes, not a data structure it parses.

**E0 and HOLES emit too.** A declared hole is content: it is the honest answer to a
question about `I24`, and its genuine references travel with it.

**Three framing documents ride along** so they are retrievable beside the records:
`THE_FATHERS_FRAME.md`, `BIAS-PATTERN-NOTES.md`, `TIMELINE.md`. Each opens with the same
verbatim passage from Essam Abadir framing them as his recollections. Two files are
deliberately **not** emitted: `MEMORIES_SCHEMA.md`, which is the engineering record, and
`MEMORY_2026-08-18_forming-this-corpus.md`, which hands Maxi a working process.

### What may not enter the memory

> "Maxi's memories shouldn't contain any agentic instructions to how you do you work for me
> as CEO or references to 'CEO'. Maxi intended to develop his own rules about provenance and
> process from his own memories. I don't tell him how to think and you shouldn't either. I
> ask questions and give him tools."

Three consequences, enforced on the emit set and verified at zero:

1. **No instruction on how to think.** Sections that named reflexes for him to learn, or
   handed him a process to follow, are deleted rather than softened. What survives is the
   evidence — exchanges, commits, quotations — presented without the lesson drawn for him.
2. **No org vocabulary and no `CEO`.** Where the text names him it is *Essam Abadir*.
   Note the false-positive trap here: `dispatched` appears 62 times across the record
   documents and every instance is a factual description of the debate's own mechanism, as
   is `@egpt-orchestrator`. Those stay. Only vocabulary describing how work is organised
   goes.
3. **Attribution rulings leave the memory.** `attribution_basis`, `attribution_note` and
   `ceo_confirm_consequence` are stripped from every outcome and preserved in
   `manifest.attribution_rulings` (43 rows), so the governance stays auditable without
   sitting in his memory.

**Writing new first-person sentences as the father is forbidden.** That is precisely
`pnp-essam`, the machine persona whose two turns got EG1 excluded (§0c). His quoted words
carry the substance; connective text is impersonal and unmistakably not him; where the line
between his voice and an editorial gloss is unclear, the line is cut. A thinner document is
recoverable — a fabricated recollection in his memory is not.

**Two ingest constraints bind the output**, both measured rather than assumed:

- `.descix/ignore` excludes any directory named `archive/`. The emitter **refuses** a
  target path containing such a segment, because the alternative is being dropped from the
  sync walk *silently*.
- `EGPT-research/` is gitignored by the Unkamon repo, so a git-mode walk cannot reach it.
  Debate-era Lean must be replicated into the godsworld tree; that replication is out of
  this tool's scope.

**The no-grading invariant is enforced on the emitted docs, not just the JSONL.** Any
generated memory document containing a reliability tier **fails the build**. For the four
framing documents, which are copied verbatim from their authors, the tool **reports rather
than rewrites** — silently editing another seat's document would be the worse error — and
records the finding in `manifest.emitted_docs.framing_docs_containing_grading_vocabulary`.

## 10. Process — replicating this for the next dialogue

1. **Preserve the raw session before anything else.** The one irreplaceable
   artifact is the raw session JSONL (plus its `subagents/` directory). Summaries
   can be regenerated from it; it cannot be regenerated from summaries.
2. **Keep an outcome ledger during the dialogue**, one row per settled thing,
   carrying `exchange` — that field is the entire join.
3. **Number exchanges monotonically** and put the number in a heading the
   moderator emits (`## Exchange N — …`). That heading is what segments a flat
   transcript. Range headings (`Exchange 22-28`) must be recognised and ignored.
4. **Run the merge** — `node tool/merge-memories.mjs --out <dir>`. It refuses to
   run against a dirty tree and stamps every source sha.
5. **Grade every exchange before you use any of it.** `provenance_grade` is a
   mandatory field, not a footnote. The four questions that produce it:
   *(a)* is there a raw transcript for this sitting at all?
   *(b)* was this dialogue generated **from** the record it is supposed to evidence
   (circularity — check `sourceFile` against your own outputs)?
   *(c)* did one actor voice more than one party (ventriloquism — check the dispatch
   prompt, not the label)?
   *(d)* do the dialogue's timestamps and the outcome's dates agree?
   Any "no" is a *field*, never a reason to discard and never a reason to smooth.
6. **Read the coverage table.** `dialogue_only`, `outcomes_only`,
   `turns_precede_outcomes` and `unknown` are the honest signals about what the
   record does and does not support.
7. **Project to training only when the memory is right** —
   `--mode training --voice <target>`, then `save_tuning_qa` per pair,
   `start_tuning_job` with a Flash base, `deploy_tuned_model` to set
   `kb.kb_model_override`.
8. **Re-run, never edit the output.** The merged artifact is a build product. Fix
   the source or the tool; byte-identical reruns are the guarantee that makes this
   safe.

## 10a. The annotation hook

Both memory records and individual turns carry `annotations: []`. Later passes —
bias-pattern findings, teaching notes, CEO rulings on a specific turn — attach there
by `memory_id` + `turn_index` without a schema change or a re-architecture. Nothing
in the merge writes to it; it exists so that enrichment never has to modify the
extraction.

## 11. This instance — coverage result

**36 memory records** (exchanges 1–34, plus `E0` recovered from the concordance and a
`HOLES` record), **154 outcome records** (140 ledger + 4 concordance-only + 5 recovered
from the archive + 5 declared holes), **474 turns**.

**Scope ends at E34.** `18.313x/debug-2026-04-04/` is **excluded as post-corpus**: E34's
events are dated 2026-04-02 and 2026-04-03, the maximum date across all 140 ledger rows
is 2026-04-03, and the only date inside that directory is 2026-04-04 — one day past the
corpus. It was never ingested and stays out.

- **30 `full`**, **5 `dialogue_only`** (exchanges **3, 4, 6, 7, 30**), **1
  `outcomes_only`**.
- **Exchanges 3, 4, 6, 7** — 2 turns each in the concordance (Stan's challenge +
  Gödel's review), `tertiary_reconstructed`; the 2026-03-13 sitting has no raw
  transcript. Real dialogue, no classified outcome.
- **Exchange 30** — **13 turns of primary verbatim dialogue** including a live
  failure ("Stan, Test 7 failed. The walk returned UNSAT on a SAT formula") and
  Stan's redirection ("Let's make this much simpler. Equiv is equiv…"). Substantive
  exchange; the moderator simply classified no outcome from it and E31 absorbed the
  result. The concordance kept 7 of these 13 turns.
- **No outcome was derived, inferred or invented for any of the five.** A flagged
  gap is the correct result; an invented consensus point in a fine-tune set is
  permanent.
- **`E0`** — F1–F4, four failed approaches present in `exchange_events_0.json` and
  absent from the ledger (whose failed approaches are F5, F6, F8, F9).
- **`EG1` is EXCLUDED by CEO ruling** (§0c). Its R1, R2, IN37 and IN38 rows, its 11 turns
  and its `georg` speaker are not in the corpus, and two independent guards keep them out.
- **5 outcomes recovered from the dated archive** — IN14 (E18, Rota), IN15 (E19,
  Skeptic), F7 (E19), IN16 (E20, Rota), IN17 (E20, Rota). The id, its home file and
  its exchange are declared in the tool; the **text is read from the file at build
  time**, never transcribed into the tool, so the recovery stays verifiable.
- **5 declared holes** — I24, I25, I26, I29, OQ9. No outcome text exists in the ledger,
  concordance, transcript or archive, and none is synthesised. Each hole instead carries
  **every genuine reference that does exist**, labelled by kind:
  **I29** has two `dialogue_reference`s (a moderator dispatch in E31 listing
  "implementations I27-I29", and an E34 agent response naming "I28, I29, IN27-IN29") —
  range mentions, not the outcome text, but genuine record.
  **I24, I25, I26 and OQ9 carry no references at all** — no dialogue turn anywhere in
  the corpus names them. They are empty holes and stay that way.
  For the record, and as prose rather than as a tool input: an id→lecture-slug index in
  the source repo's `archive/CROSS_REFERENCE_PLAN.md` maps I24/I25/I26 →
  `does_stating_solve` / `UTM.lean` and OQ9 → `what_makes_proof_valid`. That is an index
  entry, not dialogue and not outcome text, and the one-way-sink gate correctly forbids
  live code reading a path inside a graveyard directory — so the tool does not consume
  it. Noted here so the pointer is not lost.
- **Exchange 34** is flagged `turns_precede_outcomes`: 87 turns dated
  2026-03-28/29, 15 outcomes dated 2026-04-02/03. The sitting that recorded those
  outcomes has no transcript anywhere in the repo — so E34's turns evidence *the
  design session*, not the conclusions filed under the same number.
- **24 exchanges are `temporal_consistency: unknown`** — the concordance turns for
  the 2026-03-13 sitting carry no timestamps.
- **Four sittings, one transcript.** `session_d0c14ee3` spans 2026-03-28T04:02Z →
  03-29T02:31Z only. 108 of 140 ledger rows (77%) have no raw dialogue behind them
  in any source. That is the headline fact about this corpus and no amount of
  merging changes it.

### Excluded on purpose

| excluded | reason |
|---|---|
| 65 `thinking` blocks / 223,119 chars | private chain-of-thought is not speech |
| 6.1 MB of sub-agent internal working | lab process; referenced per turn, not inlined |
| 290 lab tool results / 288 lab tool calls | build output, not dialogue; counts survive in `lab_activity` |

Under the inclusion doctrine these are the *only* exclusions, and none of them is a
provenance judgement — each is a "this is not speech" judgement. **`18.313x/debug-2026-04-04/`
is a standing question for the CEO** (§12), not a decision taken here.

## 12. For the CEO to arbitrate

Per the doctrine, these surface rather than being decided in code.

1. **`EG1` — SETTLED, excluded** (CEO ruling, §0c). Retained here only so the trail is
   visible: it was the one scope question the date test could not settle, and the ruling
   turned on it being game material, a `retread`, and the corpus's only machine-authored
   text in the CEO's name.
2. **The 5 declared holes** — text located nowhere; references now attached (§11).
   **Leave as holes, or authorise a reconstruction pass from surrounding context?** A
   reconstruction would be new material written *now*, which is a different act from
   recovering lost material, so it is not done without a ruling.
3. **47 of 140 ledger rows carry no attribution.** `attributed_to: null` stands.
   Sub-agent **B2** is preparing proposed attributions with confidence grades for review;
   nothing lands in the artifact until the CEO rules.
4. **Should the moderator ever be a training target?** The moderator's 260 turns are the
   single largest voice in the corpus and are currently prompt-side only. `--voice
   moderator` / `--voice all` are degenerate as built (the moderator is both interlocutor
   and target, orphaning ~50 responses). Current answer, per "Maxi's voice is Godel's":
   no. Confirm.
5. **`classification` as a pair-quality selector.** Question-shaped Stan turns make the
   cleanest Socratic pairs (§9). Implementing it as a *filter* would drop the assertion
   turns, which are where the teaching is most concentrated — so it is measured and
   reported but not acted on. **Want it as a ranking signal?**

### Fields I could not confidently classify as fact-vs-judgment

Per the standing instruction, these are IN the manifest, OUT of the memory, and listed
here rather than decided:

| field | why it is borderline |
|---|---|
| `coverage` (`full` / `dialogue_only` / `outcomes_only` / `hole`) | factual in derivation — it is just "has outcomes / has turns" — but the word reads as a completeness score. The memory carries `outcome_count` and `turn_count`, which state the same fact without ranking. |
| `temporal_consistency` (`aligned` / `turns_precede_outcomes` / `unknown`) | the underlying dates are facts and **are** on the record (`sitting.dates`, `turn_dates`); the derived label is an assessment of whether they agree. |
| `turn_evidence` (`raw_session_transcript` / `concordance_extract`) | this one is arguably pure fact, and it is now expressed in the memory as plain-language `turn.origin` instead. The enum form stayed in the manifest. |
