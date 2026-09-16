# Lean Zulip — "Request for Feedback: Lean 4 Proof related to P=NP"

Provenance record for `lean-zulip-2025-04-request-for-feedback-p-eq-np.pdf`, the origin
document of the EGPT P=NP formalization program.

## What this is

A PDF capture of a public thread on the Lean community Zulip, in which Essam Abadir posted an
early Lean formalization related to P=NP and received technical feedback from mathlib
contributors. It is the record of the challenge that set the next eleven months of work.

## Provenance

| field | value |
|---|---|
| Source | Lean community Zulip, `#Program verification` (channel 236449) |
| Topic | Request for Feedback: Lean 4 Proof related to P=NP |
| URL | https://leanprover.zulipchat.com/#narrow/channel/236449-Program-verification/topic/Request.20for.20Feedback.3A.20Lean.204.20Proof.20related.20to.20P.3DNP/ |
| Thread dates | message separators inside the capture read **APR 27** and **APR 28** (2025) |
| Capture date | page footers are stamped **4/30/25, 11:35 AM** — the date the PDF was printed |
| Pages | 33 |
| Bytes | 1,737,734 |
| sha256 | `0f4a8454e60143554bf67dc057434bd142288e53f24a47b3a60c0bc4d289e8e7` |
| Original filename | `(1894) #Program verification _ Request for Feedback_ Lean 4 Proof related to P=NP - Lean - Zulip.pdf` |
| Brought into the repo | 2026-08-18, on Essam Abadir's instruction ("Bring the PDF of the zulip chat into our repo so it is tracked here also") |

The file was held only in a local `~/Downloads` folder — untracked, unbacked, and outside every
checkout — until it was committed here. Two byte-identical copies existed there; this is that
file, unmodified. Verify with `shasum -a 256`.

Renamed on import for filesystem and git hygiene (the original name contains parentheses and
spaces). **The bytes are unchanged**; only the filename differs.

## Participants

Essam Abadir (thread author), Mario Carneiro, Shreyas Srinivas, Junyan Xu, Yan Yablonovskiy,
suhr, Henrik Böving.

This capture is a **record**. It is preserved without characterization of any participant's
motives — an earlier version of this file asserted that participants were acting "in good
faith"; that was unsupported and has been removed. The reception across 2025-2026, including
what followed this thread, is recorded with its evidence in
[`zulip-moderation-and-conduct.md`](zulip-moderation-and-conduct.md). Read the sources.

## Why it is in the memories corpus

Two messages make this the hinge of the whole program.

**Mario Carneiro, 3:47 PM** — after quoting back the three axioms the proof rested on (a
physical-SAT axiom, Rota's Entropy Theorem, and Shannon's Coding Theorem):

> "Certainly, it follows from these three assumptions that P = NP. I don't know what are the
> shannon entropy problem and the physical system entropy problem, but the result here suggests
> that you should really dig into these because at least one of these assumptions is probably
> faulty."

**Mario Carneiro, 4:48 PM:**

> "Note, people will not really fully accept this proof until it has zero axioms. But I think
> it's fine to be exploring these concepts in lean using axiom. I just suggest you refrain from
> announcing that you've proved P = NP until you actually have no assumptions and lean is not
> reporting errors, and even then it's going to draw an extreme level of skepticism and it is
> more tactful to say you are working on a proof of shannon's coding theorem and/or Rota's
> entropy theorem rather than leading with P=NP."

The first concedes the entailment and locates the doubt in the premises — a falsifiable
prediction, and the same move von Neumann made to Gödel in 1931 (*"no living logician is in the
position of naming such [a construction]"*, `02_VON_NEUMANN/letters_to_godel/Letter3_Jan12_1931.md`),
stated as a location rather than a name.

The second is advice that was then followed: stop leading with P=NP, go prove Shannon's Coding
Theorem and Rota's Entropy Theorem. The eleven months of work between this thread and the
18.313x debate are that instruction being carried out.

## Timeline anchor

The repository was created **during** this thread, not before it:

| date | event | evidence |
|---|---|---|
| 2025-04-25 | EGPT-research initial commit | `e331a09` |
| 2025-04-26 | "Lean Proof v1 of P=NP" | `809ca5f` |
| 2025-04-27 / 04-28 | this thread | date separators in the capture |
| 2025-04-30 | thread captured to PDF | page footer stamp |
| 2026-03-13 | debate Exchange 1 | `debate_log.jsonl` |

`TIMELINE.md` carries the full dated arc.

## Caveat on the capture

A printed thread is a **snapshot**, not the live archive. Messages edited or added after
2025-04-30 are not in it — the capture itself shows "EDITED" markers on some messages, so
editing did occur. The canonical record remains the Zulip URL above.
