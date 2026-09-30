# OpenAI, "Finite time blowup for Navier–Stokes" and its Lean formalization (September 2026)

Filed 30 September 2026 by the assisting model under rule 10 of `../Self_Assessment_Rules.md`, on
the author's commission of the same day. This file records what the repository and its manifest
say, verbatim where quoted, and what was measured. It records; it does not assess.

## The repository

- URL: https://github.com/openai/NavierStokesAndEuler
- Commit read: `f9e8bc5b38b6e212696e8a30e3e91517af887bbd`, committed Thu 10 Sep 2026 09:40:53 -0400
  (a shallow clone, depth 1, taken 30 September 2026).
- Toolchain (`lean-toolchain`): `leanprover/lean4:v4.34.0-rc2`. Dependencies (`lakefile.toml`):
  `mathlib` at `v4.34.0-rc2`; `Comparator` (`leanprover/comparator`) at `v4.34.0-rc2`.
- Libraries: `NavierStokes`, `Euler`, `ComparatorChallenges`. 2,659 `.lean` files.
- License: Apache-2.0 (`formalization.yaml`).

## The repository's own statement of its results (`README.md`, verbatim)

> This repository contains Lean 4 formalizations of the results presented in "Finite time blowup
> for Navier–Stokes" and "Finite time blowup for the Euler equation" by OpenAI.

> For every positive viscosity, we prove two results:
> - **Whole space $\mathbb{R}^3$:** There exist smooth initial data and forcing for which no global
>   smooth solution with uniformly bounded kinetic energy exists.
> - **Periodic torus $\mathbb{R}^3/\mathbb{Z}^3$:** There exist smooth periodic initial data and
>   forcing for which no global smooth solution exists.
>
> These are alternatives **(C)** "Breakdown of Navier–Stokes solutions on ℝ³" and **(D)**
> "Breakdown of Navier–Stokes Solutions on ℝ³/ℤ³" in the Clay Mathematics Institute's official
> problem description of the Navier–Stokes existence and smoothness Millennium Prize Problem.

The papers the repository names: "Finite time blowup for Navier–Stokes",
https://cdn.openai.com/pdf/32d9f210-8b73-45e0-91bc-82a30aef8a9a/navier-stokes.pdf; "Finite time
blowup for the Euler equation", https://cdn.openai.com/pdf/315b36cd-ec98-4023-8342-93345194ece1/euler.pdf;
the announcement, https://openai.com/index/navier-stokes-solution/.

## The axioms, as the repository declares them (`formalization.yaml`, verbatim fields)

```yaml
status:
  scope: "Full formalization of main results."
  sorry_count: 0
  sorry_in_definitions: 0
  main_results:
    - description: >-
        (C) Non-existence of global smooth solutions with uniformly bounded kinetic
        energy on Euclidean space.
      declaration: "NavierStokes.Comparator.navier_stokes_breakdown_R3"
      file: "NavierStokes/ComparatorSolution.lean"
      sorry_count: 0
      axioms:
        - "propext"
        - "Classical.choice"
        - "Quot.sound"
    - description: "(D) Non-existence of global smooth periodic solutions"
      declaration: "NavierStokes.Comparator.navier_stokes_breakdown_periodic"
      file: "NavierStokes/ComparatorSolution.lean"
      sorry_count: 0
      axioms:
        - "propext"
        - "Classical.choice"
        - "Quot.sound"
    - description: >-
        Non-existence of global smooth unforced Euler solutions with uniformly
        bounded kinetic energy on Euclidean space.
      declaration: "Euler.euler_breakdown_R3"
      file: "Euler/Solution.lean"
      sorry_count: 0
      axioms:
        - "propext"
        - "Classical.choice"
        - "Quot.sound"
    - description: >-
        Compact smooth initial data for unforced Euler with a positive finite
        maximal lifespan in the all-order Sobolev solution class, an infinite
        C1 norm limsup, and an infinite time integral of the vorticity norm.
      declaration: "Euler.exists_compact_smooth_euler_singularity"
      file: "Euler/Solution.lean"
      sorry_count: 0
      axioms:
        - "propext"
        - "Classical.choice"
        - "Quot.sound"

automation:
  methods:
    - method: "agent"
      models:
        - "GPT-6 Astra"
      framework: "Codex"

review:
  status: "self-assessed"
```

The files named carry the print commands: `NavierStokes/ComparatorSolution.lean` lines 31–32,
`#print axioms NavierStokes.Comparator.navier_stokes_breakdown_R3` and
`#print axioms NavierStokes.Comparator.navier_stokes_breakdown_periodic`; `Euler/Solution.lean`
lines 73 and 75, `#print axioms Euler.euler_breakdown_R3` and
`#print axioms Euler.exists_compact_smooth_euler_singularity`.

The five occurrences of `sorry` in the tree are in `ComparatorChallenges/NavierStokes.lean` (lines
277, 284, and its comment at line 29: "are retained, including their intentional `sorry` challenge
placeholders") and `ComparatorChallenges/Euler.lean` (lines 88, 184): the Comparator challenge
statements, not the proofs.

## Measured

- Static: 127 of the 2,659 `.lean` files contain the text `Classical.`; no `axiom` declaration of
  the project's own is in the tree (the `axiom` hits are prose in `NavierStokes/ProblemStatement.lean`
  and `Euler/BaseInductionStageNoOptions.lean`).
- Build: `lake exe cache get` and `lake build NavierStokes.ComparatorSolution Euler.Solution` on the
  same toolchain (Lean 4.34.0-rc2, arm64-apple-darwin24.6.0) were started 30 September 2026 to
  print the four axiom lists from the executing artifact. Finished 20:36:31Z the same day, "Build
  completed successfully (11200 jobs)". The four lines Lean printed, verbatim:

```
NavierStokes/ComparatorSolution.lean:31:0: 'NavierStokes.Comparator.navier_stokes_breakdown_R3' depends on axioms: [propext, Classical.choice, Quot.sound]
NavierStokes/ComparatorSolution.lean:32:0: 'NavierStokes.Comparator.navier_stokes_breakdown_periodic' depends on axioms: [propext, Classical.choice, Quot.sound]
Euler/Solution.lean:73:0: 'Euler.euler_breakdown_R3' depends on axioms: [propext, Classical.choice, Quot.sound]
Euler/Solution.lean:75:0: 'Euler.exists_compact_smooth_euler_singularity' depends on axioms: [propext, Classical.choice, Quot.sound]
```

  The two Navier–Stokes lines were printed by the same build and re-read from the built module
  after the log's tail had kept only the Euler lines; the first commit of this file showed two
  lines under a heading that said four.
  The build is a convenience made here; the repository's manifest and its `#print axioms` commands
  are what the proof states about itself.

## Public record of the announcement (read 30 September 2026)

- The Tufts Daily, "Mathematicians still checking the Navier-Stokes proof that OpenAI claims to
  have solved", https://www.tuftsdaily.com/article/2026/09/mathematicians-still-checking-the-navier-stokes-proof-that-openai-claims-to-have-solved
- Unite.AI, "OpenAI Says Internal AI System Resolved the Navier-Stokes Problem",
  https://www.unite.ai/openai-says-internal-ai-system-resolved-the-navier-stokes-problem/
- remio.ai, "OpenAI Navier-Stokes Proof Adds Lean 4, but Verification Is Not Finished",
  https://www.remio.ai/post/openai-navier-stokes-proof-adds-lean-4-but-verification-is-not-finished
- xenospectrum, "OpenAI Claims Its AI Proved a Navier-Stokes Blowup — Mathematicians Question
  Priority and Verification", https://xenospectrum.com/en/openai-navier-stokes-singularity-clay-dispute/
- arXiv commentary citing the construction: 2609.17642, 2609.23868, 2609.23934, 2609.10269.
