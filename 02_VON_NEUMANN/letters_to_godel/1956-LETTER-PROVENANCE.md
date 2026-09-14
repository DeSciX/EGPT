# The 1956 letter — authoritative text recovered, and what the reconstruction got wrong

## What happened

`Godel_Letter_to_Von_Neumann_SUPERSEDED_reconstruction.md`, held here beside the letter, is a
**reconstruction** — by its own note, written because "the original PDF in this collection could
not be directly parsed." Its pointer to an `EGPT_Offline` archive is dangling; no such archive
exists.

The authoritative PDF had been present in the author's private research repository and was
deleted from it. Recovered from that repository's git history:

| | |
|---|---|
| Path at deletion | `SSG_History/Godel Letter to Von Neumann.pdf` (private repository) |
| Earlier path | `SSG_History/Goedel Letter to Von Neumann.pdf` (renamed at `65b2e80`) |
| Recovered from | `65b2e80` (2026-03-07) |
| Present at HEAD | **no** |
| Bytes / sha256 | 70,787 / `9f3b8c3df1d137dc61942fd7edd1a299d653c113920defd74d3250535bd197c3` |

Pinned here as `Godel_Letter_to_Von_Neumann_1956_AUTHORITATIVE.pdf`, with an extracted
`.txt` alongside.

## The errors — and they are substantive, not cosmetic

The reconstruction mis-states the founding question of P vs NP.

| | authoritative | reconstruction |
|---|---|---|
| **parameter** | `n` = **proof length** in symbols | `N` = length of the **formula** |
| **function** | `Ψ(F,n)` = steps to decide if `F` has a proof of length `n`; `ϕ(n) = max_F Ψ(F,n)` | `ϕ(N)`, formula-indexed |
| **lower bound** | `ϕ(n) ≥ k·n` | absent |
| **the actual question** | is `ϕ(n) ∼ k·n`, or even `∼ k·n²`? | is it `N²` or `N³`? |
| **brute force** | steps "as opposed to trial and error can be reduced from `N` to `log N` (or `(log N)²`)" | "at most `2^{cN}`" |
| primality passage | present | absent |
| quadratic reciprocity example | present | absent |
| Post's problem / Friedberg | present | absent |
| Lorenzen / ramified type theory | present | absent |

Gödel's question is parameterised on **proof length**, not formula length. That is the whole
construction — a machine that, given `F` and `n`, decides whether `F` has a proof of length `n`.
Re-parameterising it onto formula length is not a paraphrase; it is a different question.

The repo's front matter also records `language: "English (original)"`. The recovered text reads
as a translation from German, which is what the correspondence was conducted in.

## The passage the reconstruction dropped that matters most here

> "It would be interesting to know, for instance, the situation concerning the determination of
> primality of a number and **how strongly in general the number of steps in finite combinatorial
> problems can be reduced with respect to simple exhaustive search**."

Gödel is asking, in 1956, exactly the question about reduction relative to exhaustive search that
this project's work is about. It is absent from the version that was in the corpus.

And the sentence immediately before it, on why he thought the fast machine plausible:

> "`ϕ(n) ∼ k·n` (or `∼ k·n²`) only means that the number of steps as opposed to trial and error
> can be reduced from `N` to `log N` (or `(log N)²`). However, such strong reductions appear in
> other finite problems, for example in the computation of the quadratic residue symbol using
> repeated application of the law of reciprocity."

## Two things this is evidence for

**Recovery beats reconstruction, and the material was there.** A reconstruction was written
because a PDF "could not be parsed", while the PDF sat in the repository's own history. *Look for
the primary source before writing a substitute for it — including in git history.*

**And the failure mode is asymmetric.** A reconstruction that is 90% right reads as authoritative
and its errors are invisible; a missing file is visibly missing. The reconstruction here is
well-written, correctly attributed, plausibly worded, and wrong about the mathematics.
