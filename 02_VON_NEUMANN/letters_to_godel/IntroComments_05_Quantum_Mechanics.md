---
title: "Introductory Comments, Section 5: Quantum Mechanics"
author: "Miklos Redei (editor)"
source: "Von Neumann: Selected Letters, edited by Miklos Redei"
publisher: "American Mathematical Society / London Mathematical Society"
year: 2005
section: 5
pages: "pp. 15-22 in the Introductory Comments"
---

# 5. Quantum Mechanics

## 5.1. Mathematical Foundations of Hilbert Space Quantum Mechanics

Von Neumann started working on quantum mechanics in 1926 when he was an assistant of D. Hilbert in Gottingen. In the academic year 1926-1927 Hilbert gave lectures on the mathematical foundations of quantum mechanics. Von Neumann and Nordheim were attending Hilbert's lectures, and Hilbert, Nordheim and von Neumann published a joint paper based on those lectures [Neumann1927a]. As the authors of the paper [Neumann1927a] themselves emphasize, the paper's treatment of the mathematical foundations of quantum mechanics was not entirely satisfactory mathematically: it is assumed in the paper that every linear operator on a Hilbert space is an integral operator but this fiction can only be maintained if one uses the problematic Dirac delta function, and this mathematically ill-defined entity also features in formulating the eigenvalue problem of selfadjoint operators. Von Neumann did not tolerate such mathematical nonsense and he could soon eliminate it from the theory. He did this by ground-breaking work in functional analysis: he created the notion of abstract Hilbert space as we know it today, formulated the eigenvalue problem for selfadjoint operators generally in terms of spectral measures without relying on the notion of Dirac delta function and established the theory of (unbounded) selfadjoint operators (see 4 of the Introductory Comments); in particular, he proved the spectral theorem for (unbounded) selfadjoint operators. While in Gottingen von Neumann published three papers on the mathematical foundations of quantum mechanics [Neumann1927a], [Neumann1927b], [Neumann1927c]. These three papers served as the basis of his book [Neumann1932d].

Von Neumann viewed his book much more, however, than just a clarification of the mathematical foundations of quantum mechanics: characterizing the nature and the novelty of the book in his letter to H. Cirker (October 3, 1949) he writes:

> The subject-matter is partly physical-mathematical, partly, however, a very involved conceptual critique of the logical foundations of various disciplines (theory of probability, thermodynamics, classical statistical mechanics, quantum mechanics). This philosophical-epistemological discussion has to be continuously tied in and quite critically synchronised with the parallel mathematical-physical discussion. It is, by the way, one of the essential justifications of the book, which gives it a content not covered in other treatises, written by physicists or by mathematicians, on quantum mechanics.
> (von Neumann to Cirker, October 3, 1949)

Von Neumann's description of his book [Neumann1932d] as a philosophical-epistemological analysis is in conformity with his interpretation of mathematical physics as a discipline which is very close to philosophy: in his letter to R.O. Fornaguera (December 10, 1947), the Spanish translator of von Neumann's book *Mathematical Foundation of Quantum Mechanics* [Neumann1932d], von Neumann writes:

> Your questions on the nature of mathematical physics and theoretical physics are interesting but a little difficult to answer with precision in my own mind. I have always drawn a somewhat vague line of demarcation between the two subjects, but it was really more a difference in distribution of emphasis. I think that in theoretical physics the main emphasis is on the connection with experimental physics and those methodological processes which lead to new theories and new formulations, whereas mathematical physics deals with the actual solution and mathematical execution of a theory which is assumed to be correct per se, or assumed to be correct for the sake of the discussion.
>
> In other words, I would say that theoretical physics deals rather with the formation and mathematical physics rather with the exploitation of physical theories. However, when a new theory has to be evaluated and compared with experience, both aspects have to be evaluated and compared with experience, both aspects mix.
> (von Neumann to Fornaguera, December 10, 1947)

The position von Neumann takes in the above quotation concerning mathematical physics is a very moderate one: he does not see a neat separation of mathematics and theoretical physics and he takes the reflective nature of mathematical physics as its main characteristics -- not mathematical exactness. "Reflective nature" means here that the immediate subject of mathematical physics is considered by him to be the physical *theory* rather than the physical world, the latter implicitly taken by von Neumann as the subject of theoretical physics. Investigating and "exploiting" physical theories is very much what philosophy of science (physics) typically does and this reflective nature of mathematical physics lends this discipline a philosophical character indeed (see the papers [46],[54] and [47] for a more detailed discussion of this point).

## 5.2. Uniqueness of the Schrodinger Representation of the Canonical Commutation Relation

One of von Neumann's many achievements in the field of foundations of quantum mechanics was the proof of uniqueness of the Schrodinger representation of the canonical commutation relation [Neumann1931].

The usual Canonical Commutation Relation (CCR) (also called *Heisenberg commutation relation*)

$$(11) \qquad [Q, P] = iI$$

where $Q$ and $P$ are selfadjoint operators on a Hilbert space and equation (11) is supposed to hold on a dense subset of $\mathcal{H}$, can be viewed as the infinitesimal form of a commutation relation and, accordingly, it can be reformulated in terms of the one-parameter groups $\{U(a)\}$ and $\{V(b)\}$ of unitary operators determined by $Q, P$ as infinitesimal generators:

$$U(a) = e^{iaQ} \qquad V(b) = e^{ibP} \quad a, b \in \mathbb{R}.$$

In terms of $U$ and $V$ the commutation relation (11) becomes

$$(12) \qquad U(a)V(b) = e^{iab}V(b)U(a) \quad a, b \in \mathbb{R}.$$

To study the commutation relation in its form (12) (the so-called Weyl-form) von Neumann introduced the two-parameter family of operators

$$(13) \qquad S(a, b) \equiv \exp\left(-\frac{1}{2}iab\right) U(a) V(b)$$

in terms of which (12) becomes

$$(14) \qquad S(a, b) S(c, d) = \exp\left(\frac{1}{2}i(ad - bc)\right) S(a + c, b + d)$$

and which also satisfy

$$(15) \qquad S(-a, -b) = S(a, b)^*.$$

A map $(a, b) \mapsto S(a, b)$ from the two dimensional linear space $\mathbb{R}^2$ into the set of bounded operators $\mathcal{B}(\mathcal{H})$ that satisfies (14)-(15) is called the representation of the canonical commutation relation.

A specific representation of CCR is the "Schrodinger representation" defined on the Hilbert space of the square integrable functions $L^2(\mathbb{R})$ by

$$(16) \qquad (Qf)(x) = xf(x) \qquad (Pf)(x) = -if'(x) \qquad f \in L^2(\mathbb{R}).$$

Von Neumann proved in [Neumann1931] what has become known as the Stone-von Neumann theorem on the uniqueness of the representation of the canonical commutation relation: If the representation $S$ of CCR is continuous in the weak (or, equivalently, strong) operator topology and is irreducible, then it is unique in the sense of being unitary equivalent to the Schrodinger representations given by (16).

The crucial observation is that the operator $P = \frac{1}{2\pi}A$ is a projection and, if the representation $S$ is irreducible, then $P$ is one-dimensional, spanned by a unit vector $\xi \in \mathcal{H}$; hence, if $S$ and $S'$ are two irreducible representations of CCR and $\xi'$ is the analogously defined vector determined by $S'$, then the map $T: \mathcal{H} \to \mathcal{H}$ defined by

$$TS(a, b)\xi = S'(a, b)\xi'$$

extends linearly to a unitary of $\mathcal{H}$ that intertwines between the two representations $S$ and $S'$. This means that an irreducible representation of CCR is unique up to unitary isomorphism. (For an extensive review of von Neumann's uniqueness result and related subsequent developments see Summer's paper [56], for a comprehensive review of the theory of representation of CCR from an operator algebraic point of view see [38].)

## 5.3. Correlations Between Spatially Separated Quantum Systems

In 1935 Einstein, B. Podolsky and N. Rosen published the famous "EPR paper" [11]. The paper's aim was to prove that one should consider the quantum mechanical description of physical reality incomplete -- provided that one accepts the *principle of locality*: that the physical state of a subsystem $\mathcal{S}_1$ of a joint system ($\mathcal{S}_1 + \mathcal{S}_2$) cannot be changed instantaneously by performing a measurement on subsystem $\mathcal{S}_2$ spatially separated from subsystem $\mathcal{S}_1$.

Von Neumann was Einstein's colleague at the Institute and, given that the EPR paper concerned the completeness of quantum mechanics, in which von Neumann was very much interested (he discussed completeness of quantum mechanics at length in his book [Neumann1932d]), one would expect that Einstein and von Neumann exchanged ideas on this issue. There is, however, no record of any exchange between von Neumann and Einstein on this subject, nor did von Neumann ever express any views on the EPR paper's argument -- the only exception I am aware of being von Neumann's letter to Schrodinger published in the present volume (April 11, 1936).

Von Neumann's position is that the presence of correlations between spatially separated quantum systems is not, in and by itself, reason for concern:

> I cannot accept your section 4. completely. I think that the difficulties you hint at are "pseudo-problems". The "action at distance" in the case under consideration says only that even if there is no dynamical interaction between two systems (e.g. because they are far removed from each other), the systems can display statistical correlations. This is not at all specific for quantum mechanics, it happens classically as well.
> (von Neumann to Schrodinger, April 11, 1936)

In the example von Neumann gives in the letter to illustrate his point the probability distributions are (tacitly) interpreted subjectively: as degrees of ignorance and it is this feature of the example by which a potential clash between the change of the distribution for $\mathcal{S}_2$ and the principle of "no action at a distance" is avoided: for if the probabilities are just measures of our ignorance then, no real physical change takes place when the probability distribution changes. (This feature of the example is displayed nicely by the joke von Neumann recalls: the real physical change occurs only in Paris; the colonel's getting cuckolded in Madagascar is just a "semantic change".)

## 5.4. Relativistic Quantum Mechanics

Von Neumann also reacts to Schrodinger's above remark about difficulties concerning relativistic quantum electrodynamics:

> And of course quantum electrodynamics proves that quantum mechanics and the special theory of relativity are compatible "philosophically" -- quantum electrodynamic fails only because of the concrete form of Maxwell's equations in the vicinity of a charge.
> (von Neumann to Schrodinger, April 11, 1936)

Von Neumann saw two problems with a quantum theory of fields: the problem of singularities caused by point-likeness of electric charges and the problem of infinite degrees of freedom caused by the fact that fields can only be characterized by an infinite number or parameters. He addressed this latter issue in an unpublished paper written in 1937 and entitled "Quantum Mechanics of Infinite Systems" [45]:

> I wish to discuss some rather incomplete ideas concerning difficulties that arise in some parts of quantum mechanics. In general there have been no serious difficulties when we are dealing with a finite number of particles, but very essential difficulties arise as soon as we treat a system having an infinite number of degrees of freedom; for example, the theory of holes, which, because of the pair generation, requires an indefinite number of particles; also the *Dirac* non-relativistic theory of light and the *Pauli-Heisenberg* relativistic quantum electro-dynamics, these being equivalent to systems consisting of an infinite number of particles.

To avoid the other type of divergence, which arises from point-likeness of charges, von Neumann tried to quantize space. If space (spacetime) is discrete, then this prohibits one to get arbitrarily close to a point in space; thus divergence of electromagnetic fields becomes impossible. This idea is described in his letter to Dirac (January 27, 1934):

> It should be perhaps desirable, to have operators $X, Y, Z$ which have discrete (point) spectra, in order to avoid the difficulties connected with the point electron (in electrodynamics).

This letter describes in detail the quantization scheme and the spectrum of $X$, $Y$ and $Z$. Von Neumann summarizes the results of his spacetime quantization attempt in his letter to Ortvay (March 17, 1938):

> (1) The $x, y, z$ coordinates and the time $t$ are *non-commuting* operators.
> (2) The order of magnitude of commutators is $\frac{h}{mc}$. (That is to say, this is the uncertainty associated with a simultaneous measurement of coordinates.)
> (3) The whole structure has the Lorentz-symmetry.
> (4) Each of the $x, y, z$ coordinates has a discrete spectrum: $\pm 1/2, \pm 3/2, \ldots$
> (5) The spectrum of the time $t$ is continuous, from $-\infty$ to $+\infty$.
> (6) When 4. and 5. are combined with 3. this comes out:
> Given four real numbers $\alpha, \beta, \gamma, \delta$, the spectrum of the operator $\alpha x + \beta y + \gamma z + \delta t$ is as follows:
>   a) If $\alpha^2 + \beta^2 + \gamma^2 - \delta^2 > 0$ then it is discrete: $\pm\epsilon/2, \pm 3\epsilon/2, \ldots$, where $\epsilon\sqrt{\alpha^2 + \beta^2 + \gamma^2 - \delta^2}$.
>   b) If $\alpha^2 + \beta^2 + \gamma^2 - \delta^2 < 0$ (indeed even when $=0$) then it is continuous, from $-\infty$ to $+\infty$.

So this is a discrete "crystalline" space with "continuous" time, which has not only spherical symmetry (even though it is a "crystal"!), but is even invariant with respect to changes of the reference system given by Lorentz transformations, and so shows the proper Lorentz-Fitzgerald contraction phenomena. (This is made possible, of course, by the non-commuting nature of the coordinates.)

> I did not examine this model in deeper detail because I considered it very artificial -- and so I still think today.
> (von Neumann to Ortvay, March 17, 1938)

Dirac replied in a letter to von Neumann (February 28, 1934) to von Neumann's quantization scheme of spacetime. While finding the idea interesting, Dirac considers it very problematic that the scheme described by von Neumann does not seem to be invariant with respect to the displacement of the origin of the $X, Y, Z, T$ space, which, if true, would render the idea physically unacceptable, says Dirac. Dirac proposes in his letter a possible way to get around this difficulty, asking von Neumann whether he considered that option. Apparently there was no further correspondence between Dirac and von Neumann about this issue, which might be due to the fact that von Neumann did not consider this solution of the divergence problem very promising.
