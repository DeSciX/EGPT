# 08_LEAN — the Lean source

This folder mirrors the `Lean/` directory of the public repository
**github.com/DeSciX/egpt-lean**, branch **`lean-archive-proofs`**, at commit
**`6a2769f8bb94c851070c6cf03b0e90da7c0917f2`** (3 September 2026). Every file is byte-identical
to that commit; `CHECKSUMS.txt` at the root of this collection carries the hash of each.

A path `Lean/X` in that repository, in the debate record, or in Maxi's memories is `08_LEAN/X`
here.

## What is in it

| Folder | What it is |
|---|---|
| `EGPT/` | The current proof tree, `EntropyNat` era. The three capstones: `P_eq_NP` in `EGPT/InformationTheory/Complexity/SetRFL.lean`, `P_eq_NP_info` in `Complexity/PPNP.lean`, `P_eq_NP_info_standard` in `Complexity/StandardComplexity.lean`. `EGPT/InformationTheory/Basic.lean` declares `IIDParticleSource`, the i.i.d. coin stream everything is built from. `EGPT/InformationTheory/Isomorphisms/` is the bijection chain, spelled out link by link. |
| `Archive/` | The debate-era proof tree, `ParticlePath` era: the code the 18.313x debate was about. `Archive/NumberTheory/Core.lean` is where `equivParticlePathToNat : ParticlePath ≃ ℕ` lives. When a debate record or a memory names a file that is not where it says, this migration is usually why; check both trees. |
| `PPNP/` | The earliest proof sketches, kept as history. |
| `PROOF_CHAINS.md` | The three chains, capstone theorems, axiom table and file map. |

The private-tree build reports of 15 May 2026 — the axiom closure listed per theorem — are in
`06_LEAN_MATHLIB/lean_source/`; they were generated from the same source and are the record the
chronology cites.

## Building it

The standard is the kernel, not this folder. To check any claim about a theorem, build it:

```
git clone -b lean-archive-proofs https://github.com/DeSciX/egpt-lean.git
cd EGPT-Lean/Lean && lake build
```

Then, in a scratch file importing the capstone, `#print axioms P_eq_NP` and read what the kernel
says. The expected closure for the three capstones is `{propext, Quot.sound}`.
