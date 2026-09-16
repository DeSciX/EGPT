---
memory_id: 18.313x/E14
exchange: 14
dates: 2026-03-13
turn_count: 3
outcome_count: 8
---

# Exchange 14: Bridging Lemmas (Implementation Sprint)

*From the 18.313x P=NP debate. Stan (Ulam) is Essam Abadir, the socratic teacher; Gödel is the skeptic, von Neumann the advocate, Rota the entropy advisor. See THE_FATHERS_FRAME.md for how to read attribution.*

## What this exchange settled

### resolved:OQ1 (resolved) — both

All three lemmas proven sorry-free: computeTableau_none_iff_not_sat, computeTableau_time_bounded, unsat_detected_by_prime_structure. computeTableau? is now connected to both the time-complexity chain and the prime factorization layer. lake build passes.

Closes: `open_question:OQ1`

### implementation:I5 (implementation) — agent_tool

computeTableau_none_iff_not_sat (TableauFromCNF.lean:255-267) — computeTableau? returning none ↔ evalCNF = false


### implementation:I6 (implementation) — agent_tool

computeTableau_time_bounded (TableauFromCNF.lean:277-306) — when computeTableau? returns some, tableau.complexity ≤ |cnf| × k


### implementation:I7 (implementation) — agent_tool

unsat_detected_by_prime_structure (Decomposition.lean:416-428) — ¬ CNFSharesFactor cnf → ∀ v, computeTableau? cnf v = none


### consensus:C13 (consensus) — both

computeTableau? is now formally connected to both the time-complexity chain (via walkComplexity_upper_bound) and the prime factorization layer (via unsat_detected_by_prime_structure). All three bridging lemmas are sorry-free.


### insight:IN4 (insight) — moderator

Lemma 3 (unsat_detected_by_prime_structure) was easier than expected because evalCNF_true_iff_cnfSharesFactor already bridged the prime and evaluation layers. The connection was already implicit — the lemma just composed it with computeTableau_none_iff_not_sat.


### insight:IN5 (insight) — von_neumann

The sharpened question is now: can ¬ CNFSharesFactor cnf be decided in polynomial time? The Advocate's angle: conditional entropy H(k|p) — by prime atoms and LFTA, this is the bijective analog of GCD in normal space. GCD is polynomial (Euclidean algorithm), so the prime-structure consistency check may inherit this.


### open_question:OQ5 (open_question) — von_neumann

Can ¬ CNFSharesFactor cnf be decided in polynomial time via conditional entropy H(k|p)? By prime atoms and LFTA, H(k|p) is the bijective analog of GCD in normal space. Since GCD is polynomial (Euclidean algorithm), can the prime-structure consistency check inherit polynomial decidability?


## The exchange

### 0. Stan (Ulam) (chair)

*generated from debate_log.jsonl*

Essam builds three bridging lemmas (I5–I7) connecting computeTableau? to the time-complexity chain:

1. `computeTableau_none_iff_not_sat` (TableauFromCNF.lean:255-267) — computeTableau? returning none ↔ evalCNF = false
2. `computeTableau_time_bounded` (TableauFromCNF.lean:277-306) — when computeTableau? returns some, tableau.complexity ≤ |cnf| × k
3. `unsat_detected_by_prime_structure` (Decomposition.lean:416-428) — ¬ CNFSharesFactor cnf → ∀ v, computeTableau? cnf v = none

All sorry-free. lake build passes. Directs re-review.

### 1. Gödel (skeptic)

*generated from debate_log.jsonl*

All three lemmas verified sorry-free. The bridging is genuine work:

- Lemma 1 connects computeTableau? to Boolean evaluation
- Lemma 2 connects it to the time-complexity bound
- Lemma 3 connects it to the prime factorization layer (UNSAT detection)

**C12 established:** computeTableau? handles both SAT and UNSAT.
**C13 established:** All three bridging lemmas are sorry-free, connecting computeTableau? to both the time-complexity chain and the prime factorization layer.

But I refine the objection: computing H on conditional distributions requires knowing the conditional distribution. Knowing the conditional distribution after m clauses requires counting satisfying assignments of the first m clauses. This is #P-hard.

**IN8:** The gap sharpens to computability of conditional distributions.

The sharpened question: can ¬ CNFSharesFactor cnf be decided in polynomial time via conditional entropy H(k|p)?

### 2. Moderator (moderator)

*generated from debate_log.jsonl*

Implementation sprint exchange. Three sorry-free bridging lemmas built. Lemma 3 was easier than expected because evalCNF_true_iff_cnfSharesFactor already bridged the prime and evaluation layers — the connection was already implicit.

Markers: C12, C13, IN4, IN5, IN8. OQ1 resolved. OQ5 opened.

