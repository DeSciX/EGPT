# Provenance for the Courant Group site

What the marketing site at courantgroup.com says is supported by documents in this collection.
This sheet gives, for each claim, the passages verbatim and where they are held, so the site can
hover-link or deep-link the record rather than restate it.

**How to link.** Every file below is served by the egpt app; open it with a hash link of the form
`https://egpt.descix.net/#<path in this collection>`, for example
<https://egpt.descix.net/#02_VON_NEUMANN/letters_to_godel/Letter3_Jan12_1931.md>. The same path
in the repository is `https://github.com/eabadir/EGPT-Evidence/blob/main/<path>`, which resolves
once the repository is public. Quotations marked with a record id are in the corpus,
[`../05_CORPUS/`](../05_CORPUS/CORPUS_README.md), each with its SHA-256.

## 1. "Built from the Blueprints": von Neumann, Gödel, Ulam

### von Neumann to Gödel, 12 January 1931, first paragraph

[`../02_VON_NEUMANN/letters_to_godel/Letter3_Jan12_1931.md`](../02_VON_NEUMANN/letters_to_godel/Letter3_Jan12_1931.md).
Original German; English translation by W. Sieg; published in K. Gödel, *Collected Works*, Vol. V,
pp. 340–341. The first paragraph was checked against page images of the printed volume on 28
August 2026 (the file's front matter records the key words).

> "Many thanks for your two letters and the proof sheets. Your remark on ω-consistency was very
> interesting to me. Incidentally, the other day I developed a method that always allows a finite
> decision for the effective provability question concerning propositions that are built up solely
> by means of the concepts "not", "or" (thus also "and", "follows", etc.), [and] "provable"
> (starting from the identical truth-consistency is for example such a proposition). (Natürlich
> unter Voraussetzung der ω-Widerspruch[s]freiheit.) … Perhaps, if it interests you, or you have not
> yet thought of it, then I can write it up."

The ellipsis stands for the file's own bracketed transcription note; the German sentence is in the
original and is left untranslated there. ω is written `$\omega$` in the file.

The same letter, on intuitionism, and its closing questions, in the same file:

> "I absolutely disagree with your view on the formalizability of intuitionism. Certainly, for
> every formal system there is, as you proved, another formal one that is (already in arithmetic
> and the lower functional calculus) stronger. But intuitionism is not affected by that at all."

> "But is it not a fact, that not a single construction of the kind mentioned is known that cannot
> be formalized in $A$, and that no living logician is in the position of naming such [a
> construction]? Or am I wrong, and you know an effective intuitionistic arithmetic construction
> whose formalization in $A$ creates difficulties? If that, to my utmost surprise, should be the
> case, then the formalization should certainly work in $M$ or $Z$!"

> "I would be very grateful if you would tell me whether you are really conjecturing the
> existence of such examples, or whether you even know some?"

### Gödel to von Neumann, 20 March 1956, the question

[`../02_VON_NEUMANN/letters_to_godel/Godel_Letter_to_Von_Neumann_1956_AUTHORITATIVE.txt`](../02_VON_NEUMANN/letters_to_godel/Godel_Letter_to_Von_Neumann_1956_AUTHORITATIVE.txt),
with its provenance record beside it.

> "One can obviously easily construct a Turing machine, which for every formula F in first order
> predicate logic and every natural number n, allows one to decide if there is a proof of F of
> length n (length = number of symbols). Let Ψ(F, n) be the number of steps the machine requires
> for this and let ϕ(n) = maxF Ψ(F, n). The question is how fast ϕ(n) grows for an optimal machine.
> One can show that ϕ(n) ≥ k · n. If there really were a machine with ϕ(n) ∼ k · n (or even ∼ k ·
> n2 ), this would have consequences of the greatest importance. Namely, it would obviously mean
> that in spite of the undecidability of the Entscheidungsproblem, the mental work of a
> mathematician concerning Yes-or-No questions could be completely replaced by a machine."

### Ulam and the Monte Carlo method

Ulam, *Science, Computers, and People*, ch. 5, pp. 38–39
([`../03_ULAM/Science Computers And People.md`](../03_ULAM/Science%20Computers%20And%20People.md);
record `q-stanislaw-ulam-science-computers-an-8c91ad41`):

> "Let me point to the so-called Monte Carlo approach as an example of one of the methods that can
> lead to insight into the behavior of complicated systems. Essentially it consists of imitating
> physical processes on a computer by following a large but manageable number, replacing the
> trillions or more that are involved in the real process, by thousands of histories of the
> behavior of individual particles. This method is used, for instance, in calculations involving
> nuclear reactors, where neutrons, produced by fission, emerge with various velocities, collide,
> scatter, and are absorbed or multiply according to probabilities which depend on the initial
> data."

Martin Gardner, preface to the same book, p. viii (record
`q-martin-gardner-preface-to-stanislaw-5bb40637`):

> "To mention only three: Cellular automata theory, which he proposed to von Neumann; the Monte
> Carlo method of solving intractable problems, not only in probability theory but in areas such as
> number theory where the method would not have been thought applicable; and his work on nonlinear
> processes that anticipated today's interest in solitons and "chaos.""

Metropolis and Ulam, "The Monte Carlo Method," *Journal of the American Statistical Association*
44:247 (1949), p. 336 (record `q-nicholas-metropoli-the-monte-carlo-meth-0b2b6ece`):

> "To calculate the probability of a successful outcome of a game of solitaire… is a completely
> intractable task. On the other hand, the laws of large numbers and the asymptotic theorems of the
> theory of probabilities will not throw much light even on qualitative questions concerning such
> probabilities. Obviously the practical procedure is to produce a large number of examples of any
> given game and then to examine the relative proportion of successes."

Same paper, p. 339 (record `q-nicholas-metropoli-the-monte-carlo-meth-81bee633`):

> "we avoid dealing with multiple integrations… but instead sample single chains of events"

Metropolis, "The Beginning of the Monte Carlo Method," p. 127 (record
`q-nicholas-metropoli-the-beginning-of-the-e626f4a0`):

> "John von Neumann saw the relevance of Ulam's suggestion and, on March 11, 1947, sent a
> handwritten letter to Robert Richtmyer, the Theoretical Division leader (see "Stan Ulam, John von
> Neumann, and the Monte Carlo Method"). His letter included a detailed outline of a possible
> statistical approach to solving the problem of neutron diffusion in fissionable material."

The author's own statement of the connection, in the text of pull request #38824 to mathlib4
([`../06_LEAN_MATHLIB/mathlib-pr-38824-body.md`](../06_LEAN_MATHLIB/mathlib-pr-38824-body.md);
record `q-essam-abadir-pull-request-38824-t-7d389acf`):

> "von Neumann and Ulam (Los Alamos, 1940s) — Monte Carlo is a polynomial-time decision procedure
> over combinatorial state spaces, built from random walks and the cellular automata used to
> simulate neutron diffusion. The method predates the P vs NP vocabulary but is a P-time solver by
> construction."

## 2. "A P=NP hyper-computer"

DeSciX Whitepaper, Abstract ([`DeSciX_Whitepaper.md`](DeSciX_Whitepaper.md), copied here from the
platform's documentation with its own superseded-model banner intact):

> "DeSciX offers a fundamentally different future, particularly for technologies as potentially
> world-changing as the **EGPT Community's FRAQTL Hyper Computer**, which aims to surpass quantum
> computing using classical hardware."

The EGPT community's press release of 1 April 2026
([`Press_Release_2026-04-01.md`](Press_Release_2026-04-01.md)):

> "The EGPT community today opened enrollment in 18.313x — an AI-enabled open course built on 90
> years of MIT mathematics, from von Neumann and Ulam's Manhattan Project through Gian-Carlo Rota's
> legendary probability course to three machine-verified proofs that P = NP."

> "Von Neumann built the first computer at the Manhattan Project. On his deathbed, he wrote the
> blueprint for its replacement: integer-only, statistical, modeled on the human brain. He died
> before building it. His collaborator Ulam passed it to Rota. Rota taught it at MIT — but only his
> students ever saw the math."

## 3. The three Lean proofs of P = NP

The proof tree is [`../08_LEAN/`](../08_LEAN/README.md), mirrored byte for byte from the public
repository eabadir/EGPT-Lean, branch `lean-archive-proofs`. The three capstones:
[`P_eq_NP`](../08_LEAN/EGPT/InformationTheory/Complexity/SetRFL.lean#L501),
[`P_eq_NP_info`](../08_LEAN/EGPT/InformationTheory/Complexity/PPNP.lean#L815),
[`P_eq_NP_info_standard`](../08_LEAN/EGPT/InformationTheory/Complexity/StandardComplexity.lean#L185).
[`../08_LEAN/PROOF_CHAINS.md`](../08_LEAN/PROOF_CHAINS.md) explains the three chains:

> "Each chain approaches the same mathematical fact from a different angle, and all three compile
> in Lean 4 with zero `sorry` and only the standard constructive axioms `propext` and `Quot.sound`."

The build report of 15 May 2026,
[`../06_LEAN_MATHLIB/lean_source/EGPT_AXIOM_FLAGS.md`](../06_LEAN_MATHLIB/lean_source/EGPT_AXIOM_FLAGS.md),
summary rows:

> "| P=NP capstones close to `{propext, Quot.sound}` (no Classical.choice) | **3 / 3** ✅ (`P_eq_NP`, `P_eq_NP_info`, `P_eq_NP_info_standard`) |"

and its axiom table
([`EGPT_PROOFS_VALIDATION.md`](../06_LEAN_MATHLIB/lean_source/EGPT_PROOFS_VALIDATION.md)):

> "| `P_eq_NP_info` | `propext`, `Quot.sound` | OK |"

> "| `P_eq_NP_info_standard` | `propext`, `Quot.sound` | OK |"

### The Mathlib submissions and Mario Carneiro's standard

The two pull requests to leanprover-community/mathlib4 are public:
<https://github.com/leanprover-community/mathlib4/pull/37468> (opened 2026-04-01) and
<https://github.com/leanprover-community/mathlib4/pull/38824> (opened 2026-05-01). Their bodies
and the GitHub API captures are in [`../06_LEAN_MATHLIB/`](../06_LEAN_MATHLIB/mathlib-pr-submissions.md).
The closing comment on #38824, verbatim and in full:

> "The LLM-generated code in this PR fails to meet our standards, and the content is out of
> scope for this library. We invite you to host this content as part of a downstream
> repository."

Mario Carneiro on the Lean Zulip, 26–28 April 2025, in the thread "Request for Feedback: Lean 4
Proof related to P=NP"
([`../06_LEAN_MATHLIB/lean-zulip-2025-04-request-for-feedback-p-eq-np.md`](../06_LEAN_MATHLIB/lean-zulip-2025-04-request-for-feedback-p-eq-np.md),
PDF capture beside it), after quoting back the three axioms the early proof rested on:

> "Certainly, it follows from these three assumptions that P = NP. I don't know what are the
> shannon entropy problem and the physical system entropy problem, but the result here suggests
> that you should really dig into these because at least one of these assumptions is probably
> faulty."

> "Note, people will not really fully accept this proof until it has zero axioms. But I think
> it's fine to be exploring these concepts in lean using axiom. I just suggest you refrain from
> announcing that you've proved P = NP until you actually have no assumptions and lean is not
> reporting errors, and even then it's going to draw an extreme level of skepticism and it is
> more tactful to say you are working on a proof of shannon's coding theorem and/or Rota's
> entropy theorem rather than leading with P=NP."

## 4. The licence roles

The DeSciX Community License, v1
([`DeSciX_Community_License_v1.pdf`](DeSciX_Community_License_v1.pdf)), "Token Distribution":

> "The distribution of tokens for various roles within the DeSciX ecosystem (e.g., Witness
> Validators, DApp Developers, Network Operators, Referrers) will be governed by the DeSciX DPoS
> White Paper."

## 5. Media

FRQTL promo video, for embedding: <https://youtu.be/jwMhAf1ej2I>.
