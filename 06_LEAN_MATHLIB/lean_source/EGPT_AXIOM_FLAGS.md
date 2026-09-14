# EGPT Build Report — Axiom Flag Matrix

> Source: regenerated from [`EGPT_PROOFS_VALIDATION.md`](EGPT_PROOFS_VALIDATION.md) (build at 2026-05-15 UTC, toolchain `leanprover/lean4:v4.30.0-rc2`, elapsed 10.1 s).
> Generator: live `Lean/EGPT/build_report.lean` ([source](EGPT/build_report.lean)). The legacy top-level `Lean/build_report.lean` references the stale `Archive` + `PPNP` libraries and is not currently buildable (`PPNP` imports an `EGPT` module that is no longer declared in the parent lakefile); the live tree at `Lean/EGPT/` is the canonical proof chain.

## Summary

| Check | Value |
|---|---|
| Total theorems | **85** |
| Sorry-free | **85 / 85** ✅ |
| No custom axioms | **85 / 85** ✅ (only `{propext, Classical.choice, Quot.sound}` appear) |
| Classical.choice-free | **23 / 85** ✅ (the remaining 62 use `Classical.choice` for `ℝ` return trip in the injective direction / measure-theoretic steps) |
| P=NP capstones close to `{propext, Quot.sound}` (no Classical.choice) | **3 / 3** ✅ (`P_eq_NP`, `P_eq_NP_info`, `P_eq_NP_info_standard`) |

## Column legend

| Flag | Meaning | ✅ when... | ❌ when... |
|---|---|---|---|
| **No custom axioms** | Closure contains only Lean built-ins | only `{propext, Classical.choice, Quot.sound}` | any user-declared axiom appears |
| **No sorry** | Proof is complete | proof typechecks without `sorry` | `sorry` appears |
| **No Classical.choice** | Constructive in the choice sense | `Classical.choice` absent | `Classical.choice` appears |
| **`propext`** | Propositional extensionality (Lean built-in, safe) | axiom present | not used |
| **`Quot.sound`** | Quotient soundness (Lean built-in, safe) | axiom present | not used |

(`propext` and `Quot.sound` are Lean 4's two non-choice built-in axioms; their presence is informational, not a defect. `Classical.choice` is the third built-in and is permitted but flagged because choice-free proofs are stricter.)


## EntropyNumber — Basic: EntropyNat ↔ ℕ Bijection & Arithmetic

Source: [`InformationTheory/EntropyNumber/Basic.lean`](InformationTheory/EntropyNumber/Basic.lean)

| Theorem | No custom axioms | No sorry | No Classical.choice | `propext` | `Quot.sound` |
|---|:--:|:--:|:--:|:--:|:--:|
| `entropyNatEquivNat` | ✅ | ✅ | ✅ | ✅ | — |
| `ofNat` | ✅ | ✅ | ✅ | ✅ | — |
| `toNat` | ✅ | ✅ | ✅ | — | — |
| `ofNat_toNat` | ✅ | ✅ | ✅ | ✅ | — |
| `toNat_ofNat` | ✅ | ✅ | ✅ | ✅ | — |
| `toNat_add` | ✅ | ✅ | ✅ | ✅ | — |
| `toNat_mul` | ✅ | ✅ | ✅ | ✅ | — |

## EntropyNumber — Polynomial Evaluation

Source: [`InformationTheory/EntropyNumber/Polynomial.lean`](InformationTheory/EntropyNumber/Polynomial.lean)

| Theorem | No custom axioms | No sorry | No Classical.choice | `propext` | `Quot.sound` |
|---|:--:|:--:|:--:|:--:|:--:|
| `eval` | ✅ | ✅ | ✅ | ✅ | — |

## EntropyNumber — Hierarchy: Cardinal Levels

Source: [`InformationTheory/EntropyNumber/Hierarchy.lean`](InformationTheory/EntropyNumber/Hierarchy.lean)

| Theorem | No custom axioms | No sorry | No Classical.choice | `propext` | `Quot.sound` |
|---|:--:|:--:|:--:|:--:|:--:|
| `cardinal_of_level` | ✅ | ✅ | ❌ | ✅ | ✅ |

## EntropyNumber — Continuum Hypothesis: CH & GCH Decidable (Hilbert #1)

Source: [`InformationTheory/EntropyNumber/ContinuumHypothesis.lean`](InformationTheory/EntropyNumber/ContinuumHypothesis.lean)

| Theorem | No custom axioms | No sorry | No Classical.choice | `propext` | `Quot.sound` |
|---|:--:|:--:|:--:|:--:|:--:|
| `cardinality_is_beth` | ✅ | ✅ | ❌ | ✅ | ✅ |
| `abadirContinuumHypothesis` | ✅ | ✅ | ❌ | ✅ | ✅ |
| `generalizedContinuumHypothesis` | ✅ | ✅ | ❌ | ✅ | ✅ |
| `all_infinities_indexed_by_Nat` | ✅ | ✅ | ❌ | ✅ | ✅ |
| `AbadirCompletenessTheorem` | ✅ | ✅ | ❌ | ✅ | ✅ |

## EntropyNumber — PrimeAtoms: Fundamental Theorem of Arithmetic

Source: [`InformationTheory/EntropyNumber/PrimeAtoms.lean`](InformationTheory/EntropyNumber/PrimeAtoms.lean)

| Theorem | No custom axioms | No sorry | No Classical.choice | `propext` | `Quot.sound` |
|---|:--:|:--:|:--:|:--:|:--:|
| `factorial_information_decomposition` | ✅ | ✅ | ❌ | ✅ | ✅ |
| `factorial_information_increment` | ✅ | ✅ | ❌ | ✅ | ✅ |

## EntropyNumber — RotaEntropy: Rota + Shannon + FTA

Source: [`InformationTheory/EntropyNumber/RotaEntropy.lean`](InformationTheory/EntropyNumber/RotaEntropy.lean)

| Theorem | No custom axioms | No sorry | No Classical.choice | `propext` | `Quot.sound` |
|---|:--:|:--:|:--:|:--:|:--:|
| `rota_all_entropy_scaled_shannon` | ✅ | ✅ | ❌ | ✅ | ✅ |
| `fta_via_information` | ✅ | ✅ | ❌ | ✅ | ✅ |
| `fta_via_entropy_bits` | ✅ | ✅ | ❌ | ✅ | ✅ |
| `total_entropy_from_classes_eq_shannon_formula` | ✅ | ✅ | ❌ | ✅ | ✅ |
| `entropy_of_fair_coin_is_one_bit` | ✅ | ✅ | ❌ | ✅ | ✅ |

## Complexity — CNF: Encoding & Canonical Form

Source: [`InformationTheory/Complexity/CNF.lean`](InformationTheory/Complexity/CNF.lean)

| Theorem | No custom axioms | No sorry | No Classical.choice | `propext` | `Quot.sound` |
|---|:--:|:--:|:--:|:--:|:--:|
| `evalCNF` | ✅ | ✅ | ✅ | ✅ | — |
| `encodeCNF` | ✅ | ✅ | ✅ | — | — |
| `normalizeCNF` | ✅ | ✅ | ✅ | ✅ | ✅ |
| `evalCNF_normalize_eq_evalCNF` | ✅ | ✅ | ✅ | ✅ | ✅ |
| `encodeCNF_normalize_length_eq` | ✅ | ✅ | ✅ | ✅ | ✅ |
| `encodeCNF_size_ge_k` | ✅ | ✅ | ❌ | ✅ | ✅ |
| `cnf_length_le_encoded_length` | ✅ | ✅ | ❌ | ✅ | ✅ |

## Entropy — Concrete: Shannon Satisfies All 7 Rota Axioms

Source: [`InformationTheory/Entropy/Concrete.lean`](InformationTheory/Entropy/Concrete.lean)

| Theorem | No custom axioms | No sorry | No Classical.choice | `propext` | `Quot.sound` |
|---|:--:|:--:|:--:|:--:|:--:|
| `shannonEntropyNNReal_symmetric` | ✅ | ✅ | ❌ | ✅ | ✅ |
| `shannonEntropyNNReal_normalized` | ✅ | ✅ | ❌ | ✅ | ✅ |
| `shannonEntropyNNReal_empty` | ✅ | ✅ | ❌ | ✅ | ✅ |
| `shannonEntropyNNReal_zeroInvariant` | ✅ | ✅ | ❌ | ✅ | ✅ |
| `shannonEntropyNNReal_continuous` | ✅ | ✅ | ❌ | ✅ | ✅ |
| `shannonEntropyNNReal_condAddSigma` | ✅ | ✅ | ❌ | ✅ | ✅ |
| `shannonEntropyNNReal_maxUniform` | ✅ | ✅ | ❌ | ✅ | ✅ |
| `entropy_fair_coin` | ✅ | ✅ | ❌ | ✅ | ✅ |
| `shannonEntropy_le_log_card` | ✅ | ✅ | ❌ | ✅ | ✅ |
| `shannonEntropy_chain_rule` | ✅ | ✅ | ❌ | ✅ | ✅ |

## Entropy — Source Coding

Source: [`InformationTheory/Entropy/SourceCoding.lean`](InformationTheory/Entropy/SourceCoding.lean)

| Theorem | No custom axioms | No sorry | No Classical.choice | `propext` | `Quot.sound` |
|---|:--:|:--:|:--:|:--:|:--:|
| `stdShannonEntropyLn` | ✅ | ✅ | ❌ | ✅ | ✅ |
| `shannonEntropyOfDist` | ✅ | ✅ | ❌ | ✅ | ✅ |
| `program_source_complexity_matches` | ✅ | ✅ | ❌ | ✅ | ✅ |

## Entropy — Uniqueness: Rota Entropy Theorem

Source: [`InformationTheory/Entropy/Uniqueness.lean`](InformationTheory/Entropy/Uniqueness.lean)

| Theorem | No custom axioms | No sorry | No Classical.choice | `propext` | `Quot.sound` |
|---|:--:|:--:|:--:|:--:|:--:|
| `entropyUniform₀_one` | ✅ | ✅ | ❌ | ✅ | ✅ |
| `entropyUniform₀_mono` | ✅ | ✅ | ❌ | ✅ | ✅ |
| `entropyUniform₀_mul` | ✅ | ✅ | ❌ | ✅ | ✅ |
| `entropyUniform₀_pow` | ✅ | ✅ | ❌ | ✅ | ✅ |
| `logarithmic_trapping` | ✅ | ✅ | ❌ | ✅ | ✅ |
| `entropyUniform₀_ratio_eq_logb` | ✅ | ✅ | ❌ | ✅ | ✅ |
| `rota_uniqueness_formula` | ✅ | ✅ | ❌ | ✅ | ✅ |
| `rota_uniqueness` | ✅ | ✅ | ❌ | ✅ | ✅ |
| `RUE_rational_case` | ✅ | ✅ | ❌ | ✅ | ✅ |
| `H_canonical_uniform_eq_C_shannon` | ✅ | ✅ | ❌ | ✅ | ✅ |

## Complexity — Tableau: Certificates & Polynomial Bounds

Source: [`InformationTheory/Complexity/Tableau.lean`](InformationTheory/Complexity/Tableau.lean)

| Theorem | No custom axioms | No sorry | No Classical.choice | `propext` | `Quot.sound` |
|---|:--:|:--:|:--:|:--:|:--:|
| `PathToConstraint` | ✅ | ✅ | ✅ | ✅ | — |
| `walkCNFPaths` | ✅ | ✅ | ✅ | ✅ | — |
| `walkComplexity_upper_bound` | ✅ | ✅ | ✅ | ✅ | — |

## Complexity — Bridge: Time = Information

Source: [`InformationTheory/Bridge.lean`](InformationTheory/Bridge.lean)

| Theorem | No custom axioms | No sorry | No Classical.choice | `propext` | `Quot.sound` |
|---|:--:|:--:|:--:|:--:|:--:|
| `nSquared_time_complexity_is_information_complexity` | ✅ | ✅ | ❌ | ✅ | ✅ |
| `walk_nSquared_bound_is_time_and_information` | ✅ | ✅ | ❌ | ✅ | ✅ |

## Complexity — SetRFL: P = NP Definitional Identity (Chain 2)

Source: [`InformationTheory/Complexity/SetRFL.lean`](InformationTheory/Complexity/SetRFL.lean)

| Theorem | No custom axioms | No sorry | No Classical.choice | `propext` | `Quot.sound` |
|---|:--:|:--:|:--:|:--:|:--:|
| `L_SAT_Canonical` | ✅ | ✅ | ✅ | ✅ | — |
| `NP_def` | ✅ | ✅ | ✅ | ✅ | — |
| `P_def` | ✅ | ✅ | ✅ | ✅ | — |
| `L_SAT_in_NP_def` | ✅ | ✅ | ❌ | ✅ | ✅ |
| `L_SAT_in_P` | ✅ | ✅ | ❌ | ✅ | ✅ |
| `L_SAT_in_NP_def_Hard` | ✅ | ✅ | ❌ | ✅ | ✅ |
| `cookLevin` | ✅ | ✅ | ❌ | ✅ | ✅ |
| `P_eq_NP` | ✅ | ✅ | ✅ | ✅ | ✅ |
| `canonical_n_squared_bound` | ✅ | ✅ | ❌ | ✅ | ✅ |

## Complexity — UTM: ReadHead Model (time = information)

Source: [`InformationTheory/Complexity/UTM.lean`](InformationTheory/Complexity/UTM.lean)

| Theorem | No custom axioms | No sorry | No Classical.choice | `propext` | `Quot.sound` |
|---|:--:|:--:|:--:|:--:|:--:|
| `timeComplexity_eq_length` | ✅ | ✅ | ❌ | ✅ | ✅ |
| `ndmEntropyWalk_determines_sat` | ✅ | ✅ | ❌ | ✅ | ✅ |
| `ndmEntropyWalk_total_eq` | ✅ | ✅ | ❌ | ✅ | ✅ |

## Complexity — Decomposition: SAT ↔ Prime Factorization

Source: [`InformationTheory/Complexity/Decomposition.lean`](InformationTheory/Complexity/Decomposition.lean)

| Theorem | No custom axioms | No sorry | No Classical.choice | `propext` | `Quot.sound` |
|---|:--:|:--:|:--:|:--:|:--:|
| `cnfSharesFactor_iff_zero_conditional_cnf_entropy` | ✅ | ✅ | ❌ | ✅ | ✅ |

## Complexity — PPNP: P = NP Constructive (Chain 1 — START HERE)

Source: [`InformationTheory/Complexity/PPNP.lean`](InformationTheory/Complexity/PPNP.lean)

| Theorem | No custom axioms | No sorry | No Classical.choice | `propext` | `Quot.sound` |
|---|:--:|:--:|:--:|:--:|:--:|
| `P_eq_NP_info` | ✅ | ✅ | ✅ | ✅ | ✅ |
| `walk_construction_iff_verifier_exists` | ✅ | ✅ | ✅ | ✅ | ✅ |
| `complete_information_extraction` | ✅ | ✅ | ❌ | ✅ | ✅ |
| `information_content_le_nSquared` | ✅ | ✅ | ❌ | ✅ | ✅ |
| `three_layer_meets_proof_chain` | ✅ | ✅ | ❌ | ✅ | ✅ |
| `walk_time_eq_information` | ✅ | ✅ | ❌ | ✅ | ✅ |

## Complexity — StandardComplexity: P = NP (Chain 3 — Standard Vocabulary)

Source: [`InformationTheory/Complexity/StandardComplexity.lean`](InformationTheory/Complexity/StandardComplexity.lean)

| Theorem | No custom axioms | No sorry | No Classical.choice | `propext` | `Quot.sound` |
|---|:--:|:--:|:--:|:--:|:--:|
| `P_eq_NP_info_standard` | ✅ | ✅ | ✅ | ✅ | ✅ |
| `L_SAT_in_P_standard` | ✅ | ✅ | ❌ | ✅ | ✅ |
| `L_SAT_in_NP_standard` | ✅ | ✅ | ❌ | ✅ | ✅ |

## Physics — Uniform Systems: H = C × Shannon

Source: [`InformationTheory/Physics/UniformSystems.lean`](InformationTheory/Physics/UniformSystems.lean)

| Theorem | No custom axioms | No sorry | No Classical.choice | `propext` | `Quot.sound` |
|---|:--:|:--:|:--:|:--:|:--:|
| `H_physical_dist_eq_C_shannon_if_uniform_and_equiv` | ✅ | ✅ | ❌ | ✅ | ✅ |
| `H_physical_system_is_rota_uniform` | ✅ | ✅ | ❌ | ✅ | ✅ |
| `H_canonical_uniform_eq_C_shannon'` | ✅ | ✅ | ❌ | ✅ | ✅ |

## Physics — Statistical Distributions: Bose-Einstein

Source: [`InformationTheory/Physics/StatisticalDistributions.lean`](InformationTheory/Physics/StatisticalDistributions.lean)

| Theorem | No custom axioms | No sorry | No Classical.choice | `propext` | `Quot.sound` |
|---|:--:|:--:|:--:|:--:|:--:|
| `H_BE_from_Multiset_eq_C_shannon` | ✅ | ✅ | ❌ | ✅ | ✅ |
| `p_BE_sums_to_one` | ✅ | ✅ | ❌ | ✅ | ✅ |
| `p_BE_fin_is_uniformDist` | ✅ | ✅ | ❌ | ✅ | ✅ |

## Physics — PhysicsDist: Computational Bridge

Source: [`InformationTheory/Physics/PhysicsDist.lean`](InformationTheory/Physics/PhysicsDist.lean)

| Theorem | No custom axioms | No sorry | No Classical.choice | `propext` | `Quot.sound` |
|---|:--:|:--:|:--:|:--:|:--:|
| `be_system_has_equivalent_program` | ✅ | ✅ | ❌ | ✅ | ✅ |

---

## Where Classical.choice appears (and where it does not)

### Classical.choice-free (23 theorems) ✅

These close to `{propext}` alone, `{propext, Quot.sound}`, or `{}`. They are the most constructive layer.

| Theorem | Section |
|---|---|
| `entropyNatEquivNat` | EntropyNumber — Basic: EntropyNat ↔ ℕ Bijection & Arithmetic |
| `ofNat` | EntropyNumber — Basic: EntropyNat ↔ ℕ Bijection & Arithmetic |
| `toNat` | EntropyNumber — Basic: EntropyNat ↔ ℕ Bijection & Arithmetic |
| `ofNat_toNat` | EntropyNumber — Basic: EntropyNat ↔ ℕ Bijection & Arithmetic |
| `toNat_ofNat` | EntropyNumber — Basic: EntropyNat ↔ ℕ Bijection & Arithmetic |
| `toNat_add` | EntropyNumber — Basic: EntropyNat ↔ ℕ Bijection & Arithmetic |
| `toNat_mul` | EntropyNumber — Basic: EntropyNat ↔ ℕ Bijection & Arithmetic |
| `eval` | EntropyNumber — Polynomial Evaluation |
| `evalCNF` | Complexity — CNF: Encoding & Canonical Form |
| `encodeCNF` | Complexity — CNF: Encoding & Canonical Form |
| `normalizeCNF` | Complexity — CNF: Encoding & Canonical Form |
| `evalCNF_normalize_eq_evalCNF` | Complexity — CNF: Encoding & Canonical Form |
| `encodeCNF_normalize_length_eq` | Complexity — CNF: Encoding & Canonical Form |
| `PathToConstraint` | Complexity — Tableau: Certificates & Polynomial Bounds |
| `walkCNFPaths` | Complexity — Tableau: Certificates & Polynomial Bounds |
| `walkComplexity_upper_bound` | Complexity — Tableau: Certificates & Polynomial Bounds |
| `L_SAT_Canonical` | Complexity — SetRFL: P = NP Definitional Identity (Chain 2) |
| `NP_def` | Complexity — SetRFL: P = NP Definitional Identity (Chain 2) |
| `P_def` | Complexity — SetRFL: P = NP Definitional Identity (Chain 2) |
| `P_eq_NP` | Complexity — SetRFL: P = NP Definitional Identity (Chain 2) |
| `P_eq_NP_info` | Complexity — PPNP: P = NP Constructive (Chain 1 — START HERE) |
| `walk_construction_iff_verifier_exists` | Complexity — PPNP: P = NP Constructive (Chain 1 — START HERE) |
| `P_eq_NP_info_standard` | Complexity — StandardComplexity: P = NP (Chain 3 — Standard Vocabulary) |

### Uses Classical.choice (62 theorems)

These pull in `Classical.choice` typically via Mathlib's `Real` / measure-theoretic / `Nat.find` chains. They are still inside the built-in axiom set — no custom axiom and no `sorry`.

| Theorem | Section |
|---|---|
| `cardinal_of_level` | EntropyNumber — Hierarchy: Cardinal Levels |
| `cardinality_is_beth` | EntropyNumber — Continuum Hypothesis: CH & GCH Decidable (Hilbert #1) |
| `abadirContinuumHypothesis` | EntropyNumber — Continuum Hypothesis: CH & GCH Decidable (Hilbert #1) |
| `generalizedContinuumHypothesis` | EntropyNumber — Continuum Hypothesis: CH & GCH Decidable (Hilbert #1) |
| `all_infinities_indexed_by_Nat` | EntropyNumber — Continuum Hypothesis: CH & GCH Decidable (Hilbert #1) |
| `AbadirCompletenessTheorem` | EntropyNumber — Continuum Hypothesis: CH & GCH Decidable (Hilbert #1) |
| `factorial_information_decomposition` | EntropyNumber — PrimeAtoms: Fundamental Theorem of Arithmetic |
| `factorial_information_increment` | EntropyNumber — PrimeAtoms: Fundamental Theorem of Arithmetic |
| `rota_all_entropy_scaled_shannon` | EntropyNumber — RotaEntropy: Rota + Shannon + FTA |
| `fta_via_information` | EntropyNumber — RotaEntropy: Rota + Shannon + FTA |
| `fta_via_entropy_bits` | EntropyNumber — RotaEntropy: Rota + Shannon + FTA |
| `total_entropy_from_classes_eq_shannon_formula` | EntropyNumber — RotaEntropy: Rota + Shannon + FTA |
| `entropy_of_fair_coin_is_one_bit` | EntropyNumber — RotaEntropy: Rota + Shannon + FTA |
| `encodeCNF_size_ge_k` | Complexity — CNF: Encoding & Canonical Form |
| `cnf_length_le_encoded_length` | Complexity — CNF: Encoding & Canonical Form |
| `shannonEntropyNNReal_symmetric` | Entropy — Concrete: Shannon Satisfies All 7 Rota Axioms |
| `shannonEntropyNNReal_normalized` | Entropy — Concrete: Shannon Satisfies All 7 Rota Axioms |
| `shannonEntropyNNReal_empty` | Entropy — Concrete: Shannon Satisfies All 7 Rota Axioms |
| `shannonEntropyNNReal_zeroInvariant` | Entropy — Concrete: Shannon Satisfies All 7 Rota Axioms |
| `shannonEntropyNNReal_continuous` | Entropy — Concrete: Shannon Satisfies All 7 Rota Axioms |
| `shannonEntropyNNReal_condAddSigma` | Entropy — Concrete: Shannon Satisfies All 7 Rota Axioms |
| `shannonEntropyNNReal_maxUniform` | Entropy — Concrete: Shannon Satisfies All 7 Rota Axioms |
| `entropy_fair_coin` | Entropy — Concrete: Shannon Satisfies All 7 Rota Axioms |
| `shannonEntropy_le_log_card` | Entropy — Concrete: Shannon Satisfies All 7 Rota Axioms |
| `shannonEntropy_chain_rule` | Entropy — Concrete: Shannon Satisfies All 7 Rota Axioms |
| `stdShannonEntropyLn` | Entropy — Source Coding |
| `shannonEntropyOfDist` | Entropy — Source Coding |
| `program_source_complexity_matches` | Entropy — Source Coding |
| `entropyUniform₀_one` | Entropy — Uniqueness: Rota Entropy Theorem |
| `entropyUniform₀_mono` | Entropy — Uniqueness: Rota Entropy Theorem |
| `entropyUniform₀_mul` | Entropy — Uniqueness: Rota Entropy Theorem |
| `entropyUniform₀_pow` | Entropy — Uniqueness: Rota Entropy Theorem |
| `logarithmic_trapping` | Entropy — Uniqueness: Rota Entropy Theorem |
| `entropyUniform₀_ratio_eq_logb` | Entropy — Uniqueness: Rota Entropy Theorem |
| `rota_uniqueness_formula` | Entropy — Uniqueness: Rota Entropy Theorem |
| `rota_uniqueness` | Entropy — Uniqueness: Rota Entropy Theorem |
| `RUE_rational_case` | Entropy — Uniqueness: Rota Entropy Theorem |
| `H_canonical_uniform_eq_C_shannon` | Entropy — Uniqueness: Rota Entropy Theorem |
| `nSquared_time_complexity_is_information_complexity` | Complexity — Bridge: Time = Information |
| `walk_nSquared_bound_is_time_and_information` | Complexity — Bridge: Time = Information |
| `L_SAT_in_NP_def` | Complexity — SetRFL: P = NP Definitional Identity (Chain 2) |
| `L_SAT_in_P` | Complexity — SetRFL: P = NP Definitional Identity (Chain 2) |
| `L_SAT_in_NP_def_Hard` | Complexity — SetRFL: P = NP Definitional Identity (Chain 2) |
| `cookLevin` | Complexity — SetRFL: P = NP Definitional Identity (Chain 2) |
| `canonical_n_squared_bound` | Complexity — SetRFL: P = NP Definitional Identity (Chain 2) |
| `timeComplexity_eq_length` | Complexity — UTM: ReadHead Model (time = information) |
| `ndmEntropyWalk_determines_sat` | Complexity — UTM: ReadHead Model (time = information) |
| `ndmEntropyWalk_total_eq` | Complexity — UTM: ReadHead Model (time = information) |
| `cnfSharesFactor_iff_zero_conditional_cnf_entropy` | Complexity — Decomposition: SAT ↔ Prime Factorization |
| `complete_information_extraction` | Complexity — PPNP: P = NP Constructive (Chain 1 — START HERE) |
| `information_content_le_nSquared` | Complexity — PPNP: P = NP Constructive (Chain 1 — START HERE) |
| `three_layer_meets_proof_chain` | Complexity — PPNP: P = NP Constructive (Chain 1 — START HERE) |
| `walk_time_eq_information` | Complexity — PPNP: P = NP Constructive (Chain 1 — START HERE) |
| `L_SAT_in_P_standard` | Complexity — StandardComplexity: P = NP (Chain 3 — Standard Vocabulary) |
| `L_SAT_in_NP_standard` | Complexity — StandardComplexity: P = NP (Chain 3 — Standard Vocabulary) |
| `H_physical_dist_eq_C_shannon_if_uniform_and_equiv` | Physics — Uniform Systems: H = C × Shannon |
| `H_physical_system_is_rota_uniform` | Physics — Uniform Systems: H = C × Shannon |
| `H_canonical_uniform_eq_C_shannon'` | Physics — Uniform Systems: H = C × Shannon |
| `H_BE_from_Multiset_eq_C_shannon` | Physics — Statistical Distributions: Bose-Einstein |
| `p_BE_sums_to_one` | Physics — Statistical Distributions: Bose-Einstein |
| `p_BE_fin_is_uniformDist` | Physics — Statistical Distributions: Bose-Einstein |
| `be_system_has_equivalent_program` | Physics — PhysicsDist: Computational Bridge |
