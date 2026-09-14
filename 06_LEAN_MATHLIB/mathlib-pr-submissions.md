# The mathlib submissions — PR #37468 and PR #38824

Provenance record for `mathlib-pr-37468.json` and `mathlib-pr-38824.json`, captured from the
public GitHub API on 2026-08-18 via `gh pr view --repo leanprover-community/mathlib4`.

The Information Theory contribution was submitted to mathlib twice. Both submissions were
closed without review. The second closure states a reason; the first does not.

## The two submissions

| | #37468 | #38824 |
|---|---|---|
| Title | feat(InformationTheory): add entropy axiomatics, EntropyNumber, complexity theory, and physics bridge | *(same title)* |
| Opened | 2026-04-01 02:43:05Z | 2026-05-01 22:08:23Z |
| Closed | 2026-04-01 06:33:04Z | 2026-05-02 07:30:48Z |
| Open for | **3 h 50 m** | **9 h 22 m** |
| Files / lines | 32 files, +12,745 | 32 files, +13,639 |
| Human comments | **none** — automated only | one, at closing |

## What was said

**#37468** — closed with **no human comment of any kind**. Per
`Lean/EGPT/MATHLIB_PR_RESUBMIT.md`, it was closed by `@RemyDegenne` "without review and without
an explanation comment", and the build was failing at the time (`cannot import non-module
Mathlib.InformationTheory.Basic from module` — the file did not yet declare `module`). That
migration was the first thing the resubmission addressed.

**#38824** — the resubmission, **with the build corrected**. Closed by `mathlib-triage`,
2026-05-02 07:30:47Z, verbatim and in full:

> "The LLM-generated code in this PR fails to meet our standards, and the content is out of
> scope for this library. We invite you to host this content as part of a downstream
> repository."

Two reasons are stated in that sentence and both belong in any honest account of it: the
LLM-generated criticism, **and** an out-of-scope judgment about the library's subject matter.

## Why this record is here

A benign reading was available for #37468 and it was offered: a pull request whose build is red
being closed is ordinary maintenance. **That reading does not survive #38824.** The build was
fixed, the work resubmitted, and it was closed again — this time with the LLM-generated
criticism stated explicitly, and again without review.

This matters to the memories corpus for one specific reason. The 2025 Zulip thread ended with
Mario Carneiro's advice to prove Shannon's Coding Theorem and Rota's Entropy Theorem rather than
lead with P=NP, and with the standard that the work would need zero axioms
(`lean-zulip-2025-04-request-for-feedback-p-eq-np.md`). Eleven months later the submission
carried four capstones whose axiom closure is `propext` + `Quot.sound`, and it was closed
without a reviewer reading it.

Note also that the automated welcome comment on **both** PRs points at the project's
"guidelines regarding the use of AI when making pull requests" — the AI dimension was surfaced
by automation at submission time, before any human looked.

This record exists because it was nearly lost. It lives on GitHub, not in any checkout, and a
prior timeline pass searched this repository exhaustively and concluded from absence that the
2026 closure "carried no stated reason at all". The reason existed, publicly, one API call away.
**Absence from the repo is not absence from the record.**

## Caveats

- These are JSON captures of a live resource. GitHub remains canonical:
  https://github.com/leanprover-community/mathlib4/pull/37468 and `/38824`.
- The captures include comment bodies from named third parties in a public repository.
  Preserved as a **record**, without characterization of anyone's motives; read the source
  rather than a summary. The surrounding reception — including the Zulip account suspension
  on the same night as #37468 — is in
  [`zulip-moderation-and-conduct.md`](zulip-moderation-and-conduct.md).
- `gh pr view` returns the comment thread, not the full timeline. The close *events* themselves
  (who clicked close, and when, for #38824) are not in these captures — `gh api` on the issue
  timeline endpoint would add them. Not fetched; noted as an open gap.
