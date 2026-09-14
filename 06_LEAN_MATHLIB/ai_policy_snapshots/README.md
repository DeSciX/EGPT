# The mathlib AI-use policy, as it stood on each date

Pinned so the policy can be read **as it was**, not as it reads now. Source:
`leanprover-community/leanprover-community.github.io`, `templates/contribute/index.md`,
fetched 2026-08-18 via the GitHub API.

| file | commit | in force on |
|---|---|---|
| `contribute-index-at-2026-04-01-dfffb903.md` | `dfffb903` (2026-03-20) | **2026-04-01** — PR #37468, and the Zulip suspension |
| `contribute-index-at-2026-05-01-dc021845.md` | `dc021845` (2026-04-21) | **2026-05-01/02** — PR #38824 |
| `contribute-index-current-2026-08-18.md` | HEAD | today |
| `policy-change-history.json` | — | every commit touching the page |

## Why the dating matters

The policy changed **four times in the six weeks spanning these events**. Reading today's text
back onto April 2026 would misstate what the rules were.

| date | change | commit |
|---|---|---|
| 2026-03-16 | clarify that AI-generated feature PRs are often counterproductive | `b5a161aa` |
| 2026-03-18 | add some words about banning | `fbcc0863` |
| **2026-04-01** | **PR #37468 opened 02:43Z, closed 06:33Z with no human comment; Zulip account deactivated** | — |
| 2026-04-08 | "comment about closing low quality IA-generated PR" | `d0f1bb2e` |
| 2026-04-20 | "new contributors are not allowed to use AI" | `8abfe9ac` |
| 2026-04-21 | "require human-written comments on github and zulip" | `dc021845` |
| **2026-05-01/02** | **PR #38824 opened, closed as "LLM-generated code … out of scope"** | — |
| 2026-05-09 / 05-13 / 05-27 | further AI-policy tweaks | `45efcc02`, `2f4a6c0e`, `3831eac8` |

## What the policy said on 2026-04-01

Verbatim, the whole AI section as it then stood:

> "Using artificial intelligence tools to generate code is becoming more and more common. While
> this can be practical, their use also poses ethical, ecological, legal and social concerns. We
> recognise that there are strong differences in opinion on this topic, **and do not enforce a
> strict ban**. That said … we ask you to consider the effects of your AI use and if it is truly
> necessary.
>
> If you use artificial intelligence …, **please** explain this in the PR description. Explain
> which tool(s) you used and how you used it. …
>
> It is essential that you **can vouch for all the code submitted in a PR, and understand all the
> content written by an AI**. …
>
> Be particularly careful when using AI to write new code: … As of **March 2026**, AI-written code
> fails to meet that bar by a large margin. Getting code to mathlib's standards requires
> understanding and writing Lean code by hand. … If we notice that you open **several PRs**
> without putting in this learning effort and without adhering to our community ethical
> standards, we **retain the right of banning** you both from opening new PR's and from the Zulip
> chat."

On that date the text contained **no** provision permitting summary closure of a PR without
comment, **no** prohibition on LLM use in GitHub or Zulip comments, and **no** bar on new
contributors using AI. Its stated obligations on a contributor were disclosure and being able to
vouch for and understand the code. Its banning provision is conditioned on "several PRs";
#37468 was the first.

## What was added afterwards

- **2026-04-08**, seven days after #37468 was closed without comment — "More generally the
  reviewer team may close a PR containing low-quality code if it appears to be AI-generated."
- **2026-04-20**, nineteen days after — "We do not accept pull requests opened by new
  contributors where code is LLM-generated."
- **2026-04-21**, twenty days after the suspension — "Note that using an LLM when writing
  comments on github or Zulip is not allowed: use your own words."

By **2026-05-01**, when #38824 was submitted with the build corrected, the new-contributor
prohibition had been in force for eleven days. Its closure cites that ground.

## The facts to read against the text

- Disclosure: per the author, made in the PR description, as the then-current text asked.
- Vouching and understanding: the debate record and repository are the author's evidence of
  authorship and grasp of the material.
- Prior engagement: the April 2025 thread, and an August 2025 thread titled *"Rota's Entropy
  Theorem And Feeback Before A PR"* — engagement sought before a PR, by its title.
- The Zulip suspension of 2026-04-01 cited *"a violation of our community guidelines: posting AI
  slop is against the terms and conditions of this Zulip instance."*

## Open gap — do not treat this directory as complete

The suspension email cites "our community guidelines" and "the terms and conditions of this
Zulip instance." **That may be a different document from the mathlib contribution page pinned
here** — a Zulip-instance code of conduct or terms of service. It has not been located or
pinned. Until it is, this directory establishes what the *mathlib contribution guidelines* said
on each date and nothing about any separate Zulip instance policy.

This record states what the text said and when it changed. It draws no conclusion about any
individual's conduct or intent.
