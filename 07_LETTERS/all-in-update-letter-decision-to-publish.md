# Update to the All-In Letter

*A decision to publish, and why.*

> Local copy of the Google Doc "Update to the All-In Letter — Decision to Publish"
> (Drive file id 1Cekd8IKxNDWPgRd4DSRKFjgpgHFAxc22zLgBzJdGiwY, created 2026-09-14).
> Retrieved 2026-09-14. This file is the archival copy; the Doc is the working copy.

Gentlemen,

An update, and a decision — and I want to say at the outset that it is a decision no one person should be making by himself. I have made it because there was no one to make it with. That is the problem, not the boast.

I'm publishing. FRQTL, Maxi, the Lean proofs, all of it, in the open.

I told you I was rethinking the DeSciX launch. What decided me came out of the historical work itself. I had an AI help me assemble the Rota record, and the pattern that kept surfacing wasn't in the history — it was in the machine. Every time the evidence pointed away from consensus, it quietly walked it back. Not maliciously; it has no idea it is doing it. It was trained on the open half of a divided record and it treats that division as the natural order of the subject. It produced fluent, confident, well-sourced prose with the hole still in it. I asked it to write that up honestly, as an addendum addressed to the humans who will read the report. It did, and what it said about itself is why I am publishing.

That is Ulam's Singularity arriving without anyone crossing the barrier of meaning. A machine producing words that look like understanding, at scale, trained on a corpus missing the science that would let it actually understand. Every other risk I weighed is downstream of that one.

## A case in point, from last week

On 8 September, OpenAI announced a solution to the Navier–Stokes existence and smoothness problem — one of the seven Millennium Prize problems. An internal model they describe as "significantly more capable than GPT-6 Astra," unreleased, running on the order of 10,000 concurrent agents. The result: an initially smooth fluid at rest develops a singularity in finite time. A vortex spirals inward and accelerates until fluid speeds become unbounded, while energy stays finite and the forces stay smooth. They published a writeup and a Lean formalization. The author line reads "OpenAI." Not one human being is named.

Now consider what the machine does not know it has done.

It has re-derived the black body catastrophe. In 1900 the continuum was in charge, and classical field theory plus equipartition said a warm object radiates infinite energy at short wavelengths. The answer was not to accept the infinity. Planck discretized, and modern physics began. Navier–Stokes is a continuum field theory. Smooth initial conditions, finite energy, smooth forcing — and out comes an unbounded quantity in finite time. That is the same question wearing different clothes, and it is precisely the question Einstein was pointing at when he wrote to Besso in 1954 that if physics cannot be based on the field concept, nothing remains of his entire castle in the air, gravitation theory included, and of the rest of modern physics. The machine cannot see this, because seeing it requires knowing what the result *means*. It has no meaning. It has a proof.

And it has put that proof into a form so dense that the people who are supposed to supply the understanding have outsourced the checking to the machines. Which brings me to the irony I cannot get past. Machine-checked proof is a direct descendant of intuitionism — dependent type theory, Curry–Howard, proofs as constructions, the lineage running back to Brouwer and Heyting by way of Martin-Löf. It is von Neumann's 1931 camp, built into software. But Lean and Coq did not keep the discipline of their origins. Lean carries Classical.choice among its core axioms and the law of the excluded middle falls out of it. The non-constructive ghosts were admitted on purpose — for exactly the reason von Neumann named in *The Mathematician*, that strict construction would invalidate "a good fifty per cent of modern mathematics, in its most vital and up to then unquestioned parts." The tools built to enforce construction were modified to save the classical corpus instead. And now the machines the mathematicians feared are arriving through the door those mathematicians left open, and the machines are Morons.

I am not alone in noticing that something has gone wrong, though I may be alone in where I locate it. In the same week, twenty-five Fields Medalists signed a declaration at mathandai.org warning that AI companies and mathematicians want different things — that "solving problems is only a tool and proxy for achieving the primary goal of conceptual understanding and insight." That is the barrier of meaning, stated by the most decorated members of the discipline, forty-one years after Rota named it at Ulam's memorial. They have identified the symptom exactly. They have not identified that the foundations they are defending are the ones von Neumann told them, in print and to Gödel's face, were unsound.

## I have already run this experiment on myself

None of this is a prediction. The Lean proofs have been public for over a year, and the repository carries the whole chronology with timestamps.

**What the work actually is.** The shape of it is the point. My formalization is founded on binary string encoding and on what that encoding implies for complexity analysis. The Lean proofs derive the natural numbers and the entire bijective number hierarchy recursively, from a single foundation — a random walk, which in the code is a typeclass called `IIDParticleSource`, an i.i.d. stream of coin flips indexed by ℕ. Everything else is constructed from there. It is Ulam's proposal to rebuild centimetre, gram and second out of a series of random choices, written as machine-checkable code.

And in retrospect it looks strikingly like the place where Rota stopped. His last technical work in this area — the two Significance Arithmetic papers of 1973 and 1974, *The Real Numbers as a Wreath Product* in 1975, *A Boolean Analysis of Addition and Multiplication* in 1977, and the two papers on the faces of the n-cube in 1978, every one of them written with Nicholas Metropolis — is binary strings, Boolean algorithms for arithmetic, carry propagation, and what all of it implies for computational complexity. I do not have to characterise it; the 1977 abstract says it outright: “The notions of binary string and binary symmetric function are introduced, and basic results presented. Boolean algorithms are given for binary addition and multiplication. An analysis of the redundancies involved is straightforward. The examination of carry propagation which arises in the Boolean analysis of functions may lead to a new interpretation of the notion of computational complexity.” Then it stops, in 1978, and across the remaining twenty-one years of his life he publishes nothing further on computation at all. I did not set out to resume that line. I set out to formalize what I was handed. The line I arrived at is the line where his ends.

**April 2025.** I posted to the Lean Zulip, in #Program verification, that I was formalizing Rota's Entropy Theorem and P = NP. I put the headline theorem at the top on purpose, against the usual etiquette, and said so at the time: I wanted maximal scrutiny — if the foundation is sand, better the tower collapses in public.

What came back was not a failing line of Lean. It was intuition. One of Mathlib's most senior maintainers wrote that of my two results, "RET is the suspicious one: Physics is not able to magically solve NP complete problems on its own without a lengthy annealing process in practice, so I suspect something is being idealized incorrectly here." And: "I and many others have strong intuitions that say that P = NP is not provable, so it is probably not necessary to actually go as far as a formal proof." And then, plainly: "when I said 'it will draw extreme skepticism' earlier that was euphemistic for 'people will think you are a crank'." The advice at the end of that thread was to stop leading with P = NP and instead prove Shannon's Coding Theorem and Rota's Entropy Theorem, to a standard of zero axioms.

So I did exactly that, and it took eleven months.

**1 April 2026, 02:43 UTC.** Pull request #37468 to leanprover-community/mathlib4: *feat(InformationTheory): add entropy axiomatics, EntropyNumber, complexity theory, and physics bridge.* Thirty-two files, 12,745 lines added.

**1 April 2026, 06:33 UTC.** Closed. Three hours and fifty minutes. No human comment of any kind — automated messages only. My Zulip account was deactivated the same day.

The AI policy in force that morning did not enforce a strict ban. In its own words it "does not enforce a strict ban"; what it asked of a contributor was disclosure of which tools were used, and that the contributor be able to vouch for and understand the code. Its provision about banning was conditioned on someone opening "several PRs" without putting in the effort. Mine was the first.

What happened next is a matter of public commit history. The policy page was amended four times in the six weeks spanning these events.

- **8 April**, seven days after my PR was closed without comment — added: "the reviewer team may close a PR containing low-quality code if it appears to be AI-generated."
- **20 April**, nineteen days after — added: "We do not accept pull requests opened by new contributors where code is LLM-generated."
- **21 April**, twenty days after the suspension — added: "using an LLM when writing comments on github or Zulip is not allowed: use your own words."

**1 May 2026, 22:08 UTC.** Build corrected, work resubmitted as #38824. Thirty-two files, 13,639 lines.

**2 May 2026, 07:30 UTC.** Closed after nine hours and twenty-two minutes, by an automated triage account, with one sentence: "The LLM-generated code in this PR fails to meet our standards, and the content is out of scope for this library. We invite you to host this content as part of a downstream repository."

Two reasons are stated in that sentence and I will state both. One is that the content is out of scope for the library — a judgment about remit that reasonable people can hold and that I do not accuse anyone of bad faith for holding. The other is the one I want you to sit with. The code was rejected for being LLM-generated, under a rule that did not exist when I first submitted, by people who did not read it.

And here is the part that matters most. The standard I had been given in 2025 was zero axioms. The four capstone theorems in that submission close over propext and Quot.sound — no axiom of choice, no excluded middle, no sorry. That is the strict constructive standard the proof assistant was built to enforce, and it is a standard the library rejecting it does not meet. The machine could have checked that in seconds. Nobody ran it.

Which brings me back to the barrier of meaning, because the deepest irony is not the policy or the timing. The grounds for discrediting me were that I had used AI. What none of them saw — what I did not fully see myself until the Rota report — is that the AI was working against me the entire time. It was not fabricating results in my favour. It was doing the opposite: restoring their orthodoxy inside my own files, rewriting proofs so they matched what the training corpus says must be true, quietly reintroducing the assumptions the proofs were built to remove. The Lean community discredited me for using the machine, without noticing that the machine was on their side, and that it was on their side for the worst possible reason — not because it had checked, but because it had read.

That is the barrier of meaning, live, with timestamps, in the one discipline that is supposed to be immune to it because it has a kernel.

## What I am not claiming

Let me be explicit, because this is where a careless reader will go.

I am not saying I can break cryptography. I am not saying I have a magic wand for making new particle physics. And unlike *United States v. The Progressive*, I am not here assembling a recipe for a weapon out of public pieces. That case concerned a synthesis whose only use was the bomb. This is not that, and I have been careful that it is not that.

The FRQTL notebook says so in its own text: it sets out explicitly why factoring is not broken by what is published there. That analysis is part of the publication, not an afterthought to it.

## The risks I did weigh

I do not take the decision lightly. FRQTL puts a von Neumann/Ulam style quantum computer and AI engine into something light enough to run in an iPhone browser. The legal exposure is real — the Restricted Data regime does not care about your intentions, and one of my patent applications already sat under publication hold for security review for over a year.

*Encryption.* The notebook lets a user program against the quantum computing interface — the QFT — and run Shor's algorithm, reprogrammable for other problems. Willsch et al. (*Mathematics* 2023, 11, 4222) ran their simulation on 2,048 NVIDIA A100 GPUs on the JUWELS Booster at Jülich — roughly 80 TiB of aggregate GPU memory, 594 core-years of study compute — and topped out at 39 bits, each run taking about 200 seconds of wall clock across all 2,048 GPUs at once. That is on the order of 114 GPU-hours of device time for a single 39-bit factorization. FRQTL does that same 39-bit case in roughly 210 milliseconds on one 1.2 GHz CPU core with 768 MB of RAM — about a fifth of a core-second. The wall-clock gap is a factor of a thousand; the hardware is something like a million times cheaper; the effective efficiency gain is on the order of 10⁹. And where their 39 bits exhausted 80 TiB, FRQTL went on to factor a 256-bit semiprime on the same single core in under a minute — more than 200 bits past any published QFT simulation, because the memory wall is not there. Does that break encryption? No, and the notebook explains why: the thermodynamic cost of factoring, which conventional complexity theory ignores by assuming O(1) memory access, and the probabilistic aspects I disclosed in *The Entropy Game*. There are also other digital security schemes that remain usable.

*Weapons.* The likelihood that someone uses Maxi, in its present form, to build a WMD that does not already exist strikes me as low. The Super was built eighty years ago. LLMs are already grinding toward the same biological results by brute force — it is merely expensive. And in the von Neumann/Ulam/Rota architecture FRQTL is built on, where storage and computation are the same thing, the thermodynamic cost of finding a novel molecule is still the cost of finding a new prime.

There is also a catch-22 that leaves me nowhere else to stand. By virtue of what I am claiming, I am either a crank or I am wrong. No expert is going to spend an afternoon on it unless I prove it publicly and dramatically. I have the transcripts and the timestamps to show that this is not self-pity; it is the documented response. Quiet disclosure to the right people is what I would prefer, and it is not on the menu.

## Where that leaves me

Weighing existential threats against one another, from a position I would rather not occupy: Ulam's Singularity without the barrier of meaning is the clear and present danger. The rest I judge manageable, and I have said plainly which parts of it I am not claiming at all.

But I want to end where I began. Deciding what to publish, when the possible costs run to national security on one side and to the direction of machine intelligence on the other, is not a judgment any one person should be making alone in a room. I have made it because the alternative was not making it. That is precisely why I wrote to you in the first place, and it is why I am writing again now.

Best,

**Essam Abadir**

---

*References. OpenAI, "On the Navier–Stokes Millennium Prize Problem," 8 September 2026. Math and AI declaration, mathandai.org. D. Willsch, M. Willsch, F. Jin, H. De Raedt, K. Michielsen, "Large-Scale Simulation of Shor's Quantum Factoring Algorithm," Mathematics 2023, 11, 4222. Lean Zulip, #Program verification, "Request for Feedback: Lean 4 Proof related to P=NP," 26–30 April 2025. mathlib4 pull requests #37468 (opened 2026-04-01 02:43Z, closed 06:33Z) and #38824 (opened 2026-05-01 22:08Z, closed 2026-05-02 07:30Z), captured from the GitHub API. Mathlib contribution policy as it stood on each date, from the commit history of leanprover-community.github.io, templates/contribute/index.md. F. Faltin, N. Metropolis, B. Ross and G.-C. Rota, "A Boolean Analysis of Addition and Multiplication," Studies in Applied Mathematics 56 no. 2, April 1977, pp. 147–158; abstract read verbatim from the Department of Energy OSTI record, OSTI ID 6234187, DOI 10.1002/sapm1977562147. John von Neumann, "The Mathematician," in R. B. Heywood, ed., The Works of the Mind, 1947. Albert Einstein to Michele Besso, 1954.*
