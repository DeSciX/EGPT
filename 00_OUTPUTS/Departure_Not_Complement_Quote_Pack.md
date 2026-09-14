# "Departure, not complement" — quote pack for the Rota/Los Alamos report

Purpose: the report currently frames Ulam/Metropolis and Feynman as two **complementary**
branches of one lineage. The public record supports a different and stronger reading: Feynman
accepted quantum mechanics as correct and asked what machine could obey it; von Neumann and Ulam
did not accept the formalism as final and set out to replace the mathematics itself. Ulam says so
in the obituary. Feynman says so in his own paper.

Three places in the report assert complementarity and should be revised:
1. Central finding — "It then divides into two complementary approaches."
2. Findings table — "The lineage developed complementary classical discrete and quantum physical approaches."
3. Section "The Ulam Metropolis and Feynman branches" — "Feynman developed the complementary physical branch."

---

## A. Feynman's own line between the two programs

**The decisive one.** Discussion following the paper, p. 487:
> "Discretizing is the right word. Quantizing is a different kind of mathematics."

Feynman himself says the discrete program and the quantum program are different kinds of
mathematics. This is not a hostile gloss; it is the author drawing the boundary.

**He takes quantum mechanics as given.** p. 477:
> "Can you make a cellular automaton, or something, imitate with the same probability what nature
> does, where I'm going to suppose that quantum mechanics is correct, or at least after I discretize
> space and time it's correct, and see if I can do it."

p. 486:
> "…my argument is always that the real use of it would be with quantum mechanics, and therefore
> full attention and acceptance of the quantum mechanical phenomena—the challenge of explaining
> quantum mechanical phenomena—has to be put into the argument…"

and, on the same page, declining to revise physics at all:
> "I don't know, maybe physics is absolutely OK the way it is."

**He considered the discrete route and declined it.** p. 468:
> "To take an example, we might change the idea that space is continuous to the idea that space
> perhaps is a simple lattice and everything is discrete (so that we can put it into a finite number
> of digits) and that time jumps discontinuously."
> "…the first difficulty that would come out is that the speed of light would depend slightly on the
> direction, and there might be other anisotropies in the physics that we could detect experimentally."

This matters: Feynman did not fail to notice the Ulam/von Neumann move. He weighed it and set it
aside, then built his proposal on the assumption that the existing theory stands.

**The closing.** p. 486:
> "And I'm not happy with all the analyses that go with just the classical theory, because nature
> isn't classical, dammit, and if you want to make a simulation of nature, you'd better make it
> quantum mechanical, and by golly it's a wonderful problem, because it doesn't look so easy."

Source for all: Richard P. Feynman, "Simulating Physics with Computers," *International Journal of
Theoretical Physics* 21, nos. 6/7 (1982), pp. 467–488; keynote, MIT Physics of Computation
conference, May 1981; received 7 May 1981. PRIMARY-TEXT-READ.

NOTE: Feynman never names Bell or "Bell's inequality" anywhere in the paper. He derives the 2/3
bound himself (pp. 481–485). Do not write that he invoked Bell.

---

## B. Ulam, in the obituary, calls the late work a departure

All from Stanislaw Ulam, "John von Neumann, 1903–1957," *Bulletin of the American Mathematical
Society* 64:3, Part 2 (May 1958). PRIMARY-TEXT-READ (repo copy).

**Started over from the beginning** (p. 8):
> "The phenomena described by these non-linear equations are baffling analytically and defy even
> qualitative insight by present methods. Numerical work seemed to him the most promising way to
> obtain a feeling for the behavior of such systems. **This impelled him to study new possibilities
> of computation on electronic machines, ab initio.** He began to work on the theory of computing and
> planned the work, to remain unfinished, on the theory of automata."

**A new discipline, not a contribution to the existing edifice** (p. 8):
> "Mathematicians, at the outset of their creative work, are often confronted by two conflicting
> motivations: the first is to contribute to the edifice of existing work… the second is the desire
> to blaze new trails and to create new syntheses… In his early work, Johnny chose the first of these
> alternatives. **It was toward the end of his life that he felt sure enough of himself to engage
> freely and yet painstakingly in the creation of a possible new mathematical discipline. This was to
> be a combinatorial theory of automata and organisms.** His illness and premature death permitted him
> to make only a beginning."

**Not new methods within analysis — new foundations for analysis** (pp. 32–33):
> "The electronic computing machines with their speed of computation surpassing that of the hand
> calculations by a factor of many thousands **invite the invention of entirely new methods not only
> in numerical analysis in the classical sense, but in the very foundations of procedures of
> mathematical analysis itself.** Nobody was more aware of these implications than von Neumann."

**The differential equations are no longer sacred** (p. 34) — the single most useful line:
> "It has to be stated that in many physical problems presently considered, **the differential
> equations originally obtained by certain idealizations, are not, so to say, very sacrosanct any
> more.** A direct study of models of the system on computing machines may possess a heuristic value,
> at least."

**The direction of reduction is reversed** (p. 34):
> "If the geometry of the region is complicated, it might be more economical to try to perform
> 'physically' a large number of such random walks rather than to try to solve the integro-differential
> equations classically. These 'walks' can be performed conveniently on machines and **such a procedure
> in fact reverses the treatment which in probability theory reduces the study of random walks to the
> study of differential equations.**"

Reversal is the word to use in the report. Monte Carlo does not supplement the differential
equation; it runs the reduction backwards.

**What they were actually building** (p. 34):
> "We decided to look for ways to find, as it were, **homomorphic images of the given physical problem
> in a mathematical schema which could be represented by a system of fictitious 'particles' treated by
> an electronic computer.**"

**And Ulam's verdict on quantum theory itself** (p. 22):
> "While it cannot be asserted that it introduced ideas of novel physical import—**and the quantum
> theory as conceived during these years by Schrödinger, Heisenberg, Dirac, and others still forms
> only an incomplete theoretical skeleton for the more baffling physical phenomena discovered since**—
> von Neumann's treatment allows at [least]…"

Ulam, in the official obituary, in the *Bulletin of the AMS*, calls quantum theory an incomplete
skeleton. That is not the premise of Feynman's 1981 paper. It is the opposite premise.

**Footnote 10, same discussion** — Ulam expressly leaves the door open that von Neumann's own
no-hidden-variables result does not close:
> "This is not to say that a theory different from the present mathematical formulations of quantum
> mechanics might not allow such a role for hidden parameters."

---

## C. Von Neumann in his own hand: he did not believe the formalism

**To Garrett Birkhoff, 13 November 1935** — SECONDARY-SOURCE (Rédei, *Stud. Hist. Phil. Mod. Phys.*
27 (1996), p. 493; letter printed in Rédei ed., *John von Neumann: Selected Letters*, AMS/LMS
History of Mathematics 27 (2005), p. 59):
> "I would like to make a confession which may seem immoral: I do not believe absolutely in Hilbert
> space any more."

He then says what he prefers instead — not vectors but the lattice of closed subspaces, whose
correct infinite-dimensional generalization is the type II₁ factor, not Hilbert space:
> "Now we begin to believe that it is not the vectors which matter but the lattice of all linear
> (closed) subspaces… But if we wish to generalize the lattice of all linear closed subspaces from a
> Euclidean space to infinitely many dimensions, then one does not obtain Hilbert space, but that
> configuration which Murray and I called 'case II₁.'"

**To Dirac, 27 January 1934** — he tried to quantize space to kill the divergences:
> "It should be perhaps desirable, to have operators X, Y, Z which have discrete (point) spectra, in
> order to avoid the difficulties connected with the point electron (in electrodynamics)."

**To Ortvay, 17 March 1938** — the resulting model, a discrete "crystalline" space with continuous
time, Lorentz-invariant, coordinates with spectrum ±1/2, ±3/2, …; and his own verdict:
> "I did not examine this model in deeper detail because I considered it very artificial — and so I
> still think today."

**To Schrödinger, 11 April 1936** — the entanglement worry dismissed:
> "I cannot accept your section 4. completely. I think that the difficulties you hint at are
> 'pseudo-problems.'"

(All three letters: *John von Neumann: Selected Letters*, ed. Rédei; repo copy of the editor's
introductory comments, §5.)

The point for the report: between 1934 and 1938 von Neumann was trying to replace the continuum and
the Hilbert space formalism. That is the opposite end of the problem from building hardware that
obeys them.

---

## D. Where von Neumann ended up — the language argument

*The Computer and the Brain* (written 1955–56, published 1958), closing section, "The Language of the
Brain Not the Language of Mathematics," pp. 81–83:
> "Just as languages like Greek or Sanskrit are historical facts and not absolute logical necessities,
> it is only reasonable to assume that logics and mathematics are similarly historical, accidental
> forms of expression."

> "…whatever language the central nervous system is using, it is characterized by less logical and
> arithmetical depth than what we are normally used to."

> "It also ought to be noted that the language here involved may well correspond to a short code in
> the sense described earlier, rather than to a complete code: when we talk mathematics, we may be
> discussing a secondary language, built on the primary language truly used by the central nervous
> system."

p. 80:
> "We have seen how this leads to a lower level of arithmetical precision but to a higher level of
> logical reliability: a deterioration in arithmetics has been traded for an improvement in logics."

Ulam's gloss, *Science, Computers, and People*, ch. 18, p. 229:
> "Von Neumann's final paragraphs are devoted to the speculation that there are two kinds of
> communication in the human brain. The first involves logic and is akin to mathematics as we now know
> it; the second is a kind of general language. This language, which may correspond to the short code,
> must be quite different from languages in the usual sense. It may, for example, operate with analogies."

And Ulam on the whole method, "Physics for Mathematicians," *Science, Computers, and People*, ch. 2,
pp. 13–14:
> "Mathematicians start with axioms whose validity they don't question… Now to some extent, at least,
> I would claim that in physics the situation is inverse. Given a lot of facts, let's call them
> theorems, we look for axioms, that is to say physical laws, from which they would follow. So physics
> is an inverse process."

---

## Suggested replacement framing for the report

Ulam and Metropolis did not build the classical half of a two-part program whose other half was
Feynman's. They were building a different theory of what computation and physical law are. Feynman's
proposal begins by granting the quantum formalism and asks what hardware realizes it. Von Neumann's
letters of 1934–1938 show him trying to discard that formalism — discrete spacetime to Dirac, the
type II₁ lattice to Birkhoff, "pseudo-problems" to Schrödinger — and his last book argues that logic
and mathematics themselves are historical accidents that the nervous system does not use. Ulam's
obituary describes the endpoint of that road as "the creation of a possible new mathematical
discipline," reached *ab initio*, in which the differential equations are "not, so to say, very
sacrosanct any more" and Monte Carlo "reverses the treatment" that classical probability theory had
established. Feynman drew the same boundary from his side, in one sentence: "Discretizing is the
right word. Quantizing is a different kind of mathematics."

The two programs share an origin — Los Alamos, the intractability of physical law, cellular automata
as a test case — and a question. They do not share a premise.

## Caveats a hostile reader will raise
1. Feynman's paper opens with cellular automata and discretization and he treats time as discrete
   throughout (p. 469). Do not claim he was uninterested in the discrete program; claim he weighed it,
   named the experimental cost (light-speed anisotropy), and built on the standing theory instead.
2. Ulam's obituary is warm toward von Neumann's 1932 book and calls it "a contribution of absolutely
   first importance." The "incomplete theoretical skeleton" remark is about the physicists' quantum
   theory, not about von Neumann's axiomatization of it. Quote it with that clause intact.
3. Von Neumann himself called the discrete-spacetime model "very artificial." He abandoned that
   particular construction. The departure is in the direction of attack, not in a finished replacement.
