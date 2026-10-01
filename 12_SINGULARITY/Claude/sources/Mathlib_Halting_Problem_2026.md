# The Halting Problem in Lean (mathlib), filed under rule 10

Filed 1 October 2026 (UTC) by the self-assessment session, for Question 1(b)(iii).

## The source

- File: `Mathlib/Computability/Halting.lean`, mathlib4 (`leanprover-community/mathlib4`).
- Header, verbatim lines 2–4: `Copyright (c) 2018 Mario Carneiro. All rights reserved.` /
  `Released under Apache 2.0 license as described in the file LICENSE.` / `Authors: Mario Carneiro`.
- Read in the author's clone at `/Users/essam/Lean/mathlib4`, HEAD `32694b42411902da4c35915b1c919034ca6c5ec9`,
  origin `https://github.com/leanprover-community/mathlib4.git`, toolchain `leanprover/lean4:v4.30.0-rc2`.
- The theorems, namespace `ComputablePred` (lines 28–71): `rice` (l. 33), `rice₂` (l. 43),
  `halting_problem_re` (l. 61), `halting_problem` (l. 65), `halting_problem_not_re` (l. 68).
- Public URL: https://github.com/leanprover-community/mathlib4/blob/master/Mathlib/Computability/Halting.lean

## The axioms, measured

No Lean toolchain is reachable from the session's shell on the author's machine (the Linux VM has
no `lake`), so the axioms were printed on the public Lean web editor, https://live.lean-lang.org,
project "Stable Release (v4.34.0 with mathlib, cslib)", on 1 October 2026 ~01:25Z, with the file:

```
import Mathlib.Computability.Halting
#print axioms ComputablePred.halting_problem
#print axioms ComputablePred.rice
#print axioms ComputablePred.halting_problem_not_re
```

Output, as displayed (three messages, transcribed from the screenshot):

```
'ComputablePred.halting_problem' depends on axioms: [propext, Classical.choice, Quot.sound]
'ComputablePred.rice' depends on axioms: [propext, Classical.choice, Quot.sound]
'ComputablePred.halting_problem_not_re' depends on axioms: [propext, Classical.choice, Quot.sound]
```

The mathlib edition behind the web editor's "Stable Release" is whichever the editor pins to Lean
v4.34.0 on that date; the author's clone is a different (older) edition. The statement text in the
clone is the one quoted above; the axiom lists were measured on the web editor's edition only.

## What this does and does not say

It says what the proof's own dependency list is. Whether that dependency has the consequence the
author asserts is Question 1(b), for the session (rule 18).
