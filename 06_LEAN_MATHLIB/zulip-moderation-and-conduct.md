# The reception record — Lean Zulip and mathlib, 2025-04 to 2026-05

Events with dates and sources. This file records **what happened**: the events, the dates, the
verbatim quotes. It asserts no motive on its own authority — but it does not stand between the
reader and the person who lived this. Essam Abadir's conclusion from this record is stated as
his in `../records/THE_FATHERS_FRAME.md` §3. See the note at the end on why the distinction
matters here.

## Evidence in this directory

| file | what it is |
|---|---|
| `zulip-account-suspension-2026-04-01.png` | the Zulip deactivation email, with the moderation team's stated reason |
| `zulip-2025-08-thread-and-dm-reactions.png` | an August 2025 mathlib4 thread and a direct-message exchange, with emoji reactions |
| `lean-zulip-2025-04-request-for-feedback-p-eq-np.pdf` | the April 2025 thread, 33pp |
| `mathlib-pr-37468.json`, `mathlib-pr-38824.json` | both mathlib submissions, from the GitHub API |

These screenshots were held only in a scratch directory that gets emptied when a piece of work
closes. They are copied here so the record survives.

## Timeline

**2025-04-26 → 04-28 · the first thread.** "Request for Feedback: Lean 4 Proof related to P=NP",
opened 1:53 AM: *"This is my first time coding in Lean."* Technical objections, and Mario
Carneiro's two load-bearing messages: the entailment conceded (*"Certainly, it follows from
these three assumptions that P = NP"*), the doubt located in the premises (*"at least one of
these assumptions is probably faulty"*), and the advice to prove Shannon's Coding Theorem and
Rota's Entropy Theorem rather than lead with P=NP.

Also in that thread, on the public record:

- Shreyas Srinivas, 11:38 AM: *"I mean what stops you from claiming that this implies PSPACE !=
  NPSPACE by renaming some of your axioms (This is false btw, which is my point; you can write
  false statements like this)"* — subsequently corrected by Henrik Böving, and Srinivas
  acknowledged the error (*"some combination of brain misfire and sleep deprivation"*).
- A participant posting under the handle "suhr", 6:00 AM, discussing the author in the third
  person as "OP": *"I care about two things: Whether a person is honest[,] Whether a person is
  willing to work and learn. In the case of this thread, I can believe that OP is honest but I
  don't see willingness to work: formalizing the statement of the P vs NP problem is within the
  reach, but OP is unwilling to do it, mentioning Principia Mathematica as an excuse."*; and,
  separately, the observation that community caution is *"euphemistic for 'people will think you
  are a crank'"*.

**2025-08-12/13 · the second thread and the DM.** A mathlib4 thread, "Rota's Entropy Theorem And
Feeback Before A PR", opened 5:33 PM: *"I am writing to share the Lean formalized work of the
late MIT Professor Gian-Carlo Rota… My sole role has been to formalize it in Lean and provide a
proof that is as close to his original as possible."* It carries a reaction from Yaël Dillies.
The following day, a direct message: *"What was that reaction about?"*, which itself carries a
🤖 robot-emoji reaction from Yan Yablonovskiy. Per the account of the person it happened to,
this was part of a pattern of robot-emoji reactions placed on his posts.

**2026-04-01 · suspension, and the first PR.** The Zulip moderation team deactivated the
account. Verbatim from the notification:

> "Your account has been suspended for 1 day due to a violation of our community guidelines:
> posting AI slop is against the terms and conditions of this Zulip instance. Further violations
> will double the suspension period."

Timing, same day: PR **#37468** opened 02:43:05Z, closed 06:33:04Z — 3 h 50 m, 32 files,
+12,745 lines, **no human comment of any kind**. The suspension email is stamped 2:38 AM local;
if that is US Eastern it is 06:38Z, five minutes after the PR closed. **The email's timezone is
not stated in the capture, so the exact ordering is UNDETERMINED** — but the suspension and the
first PR closure fall on the same night.

**2026-05-01/02 · the resubmission.** PR **#38824**, with the build failure that accompanied the
first closure corrected. Opened 22:08:23Z, closed 07:30:48Z — 9 h 22 m. Closed by
`mathlib-triage`, verbatim and in full:

> "The LLM-generated code in this PR fails to meet our standards, and the content is out of
> scope for this library. We invite you to host this content as part of a downstream repository."

## What was submitted, against the standard that was set

The April 2025 standard, from Carneiro: *"people will not really fully accept this proof until
it has zero axioms."* The 2026 submissions carried capstones whose axiom closure is `propext` +
`Quot.sound` — no `Classical.choice` in the forward direction, no `sorry`
(`Lean/EGPT/MATHLIB_PR_RESUBMIT.md`, and `#print axioms` output reproduced there).

On the AI question specifically, the policy is now pinned per-date in
[`mathlib-ai-policy/`](mathlib-ai-policy/README.md), because it changed four times in the six
weeks spanning these events and today's text does not say what April's said.

**On 2026-04-01** the AI section stated that the community "do[es] not enforce a strict ban",
asked that AI use "please" be explained in the PR description, and required that the contributor
"can vouch for all the code submitted in a PR, and understand all the content written by an AI."
Its banning provision was conditioned on opening "several PRs" without the learning effort.
The text on that date contained **no** provision for closing a PR without comment, **no**
prohibition on LLM use in GitHub or Zulip comments, and **no** bar on new contributors using AI.

Those three provisions were added on **2026-04-08**, **2026-04-20** and **2026-04-21**
respectively — the first seven days after #37468 was closed without comment, the last twenty
days after the Zulip suspension. By 2026-05-01, when #38824 was submitted with the build fixed,
the new-contributor prohibition had been in force eleven days; its closure cites that ground.

Per the author: the PR disclosed AI use, and the debate record and repository establish his
grasp and authorship of the material.

**Still open:** the suspension cites "the terms and conditions of this Zulip instance", which may
be a separate document from the mathlib contribution page. It has not been located.

Note that the automated welcome comment on **both** PRs points at those AI-use guidelines. The
AI dimension was surfaced by automation at submission time, before any human looked.

## A note on this file, and a correction of the record

An earlier version of the sidecars in this directory asserted that the forum participants
"were giving technical feedback in good faith," and an earlier dispatch to a timeline agent
carried the same phrase as an instruction. **That assertion was unsupported and has been
removed.** No evidence was offered for it; it was an inference presented as record, inside a
memory corpus documenting someone else's lived experience. It also propagated: an agent
instructed that way described the first thread as having "ended amicably" and treated the
author's recollection of an AI-based rejection as a memory error — a conclusion the mathlib API
record then refuted outright.

The failure has a name in this corpus. `../records/BIAS-PATTERN-NOTES.md` documents a trained
prior quietly substituting itself for what is actually in front of the reader — there, inside
the debate; here, in the assembly of this record. Same mechanism, and in the direction the
training would predict.

The standard this file holds to instead is **attribution, not neutrality** — those are not the
same repair, and reaching for the second is how the first correction went wrong a second time.
Events, dates and verbatim quotes. UNDETERMINED where the record is silent. Conclusions carried
under the name of whoever holds them — the assembler of this file asserts none, and the man
whose experience this is states his in `../records/THE_FATHERS_FRAME.md` §3. A file that
refused to carry his conclusions would not be neutral; it would be a file that had quietly
decided his reading of his own life was the one thing not admissible. Read the sources.
