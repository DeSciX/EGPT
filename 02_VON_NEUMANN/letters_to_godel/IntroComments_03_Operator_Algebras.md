---
title: "Introductory Comments, Section 3: Operator Algebras"
author: "Miklos Redei (editor)"
source: "Von Neumann: Selected Letters, edited by Miklos Redei"
publisher: "American Mathematical Society / London Mathematical Society"
year: 2005
section: 3
pages: "pp. 9-12 in the Introductory Comments"
---

# 3. Operator Algebras

The theory of operator (in particular, von Neumann) algebras is perhaps von Neumann's deepest contribution to mathematics, of which he himself was rather proud: One can sense a satisfaction in his letter to Dixmier (June 18, 1954) in which von Neumann reacts to Dixmier's suggestion that "rings of operators" should be called von Neumann algebras to acknowledge von Neumann's contribution to this field.

## Definition and Basic Theory

A von Neumann algebra $\mathcal{M}$ is a \*-closed subalgebra of bounded operators on a Hilbert space $\mathcal{H}$ that are also closed in the strong operator topology (the latter meaning that if for some bounded operator $Q$ on $\mathcal{H}$ one has $Q_n\xi \to Q\xi$ ($n \to \infty$) for all $\xi$ in $\mathcal{H}$ and $Q_n \in \mathcal{M}$ for all $n$, then $Q \in \mathcal{M}$). Already in [Neumann1929b] von Neumann established a major theorem concerning von Neumann algebras: the "double commutant theorem", which says that a set $\mathcal{M}$ of bounded operators on a Hilbert space $\mathcal{H}$ is closed in the strong operator topology if and only if $\mathcal{M}$ coincides with its second commutant $(\mathcal{M}')'$, where the commutant $\mathcal{M}'$ of a set of bounded operators $\mathcal{M}$ is the set of operators that commute with *every* element in $\mathcal{M}$. An immediate consequence of the double commutant theorem is that the set of projections $\mathcal{P}(\mathcal{M})$ in a von Neumann algebra $\mathcal{M}$ form a complete lattice and that the projections determine the von Neumann algebra completely by $\mathcal{P}(\mathcal{M})'' = \mathcal{M}$.

## Classification Theory (Murray-von Neumann)

Von Neumann (partly in collaboration with F.J. Murray) published four major papers on the theory of von Neumann algebras [Neumann1936a], [Neumann1937a], [Neumann1940] and [Neumann1943]. The first paper's main result was a classification theory of von Neumann algebras that are irreducible in the sense of not containing non-trivial operators commuting with every other operator in the algebra (these von Neumann algebras are called "factors") [Neumann1936a]. The factorial property of $\mathcal{M}$ can be expressed by $\mathcal{M} \cap \mathcal{M}' = \{\lambda I\}$, where $I$ is the identity operator on $\mathcal{H}$ and $\lambda$ is a complex number. The set $\mathcal{B}(\mathcal{H})$ of *all* bounded operators is clearly a factor and, as his letter to M. Stone (March 31, 1935) shows, von Neumann originally conjectured that only this "type" of factor exists. Von Neumann had suggested J. Murray to prove this conjecture (see [35]), and, if this conjecture could have been proved true, "... that would be a worthy result and the end of the project." [25, p. 63]. It turned out, however, that this conjecture is false: there are five classes of factors, the different types are denoted by von Neumann as $I_n$, $I_\infty$, $II_1$, $II_\infty$ and $III_\infty$. The classification of factors was given in terms of a (relative) dimension function $d$ defined on the lattice of projections $\mathcal{P}(\mathcal{M})$ of a von Neumann algebra $\mathcal{M}$. The map $d$ from $\mathcal{P}(\mathcal{M})$ into the set $\mathbb{R}^+ \cup \{\infty\}$ is a dimension function if

| range of $d$ | type of factor $\mathcal{N}$ | the lattice $\mathcal{P}(\mathcal{M})$ |
|---|---|---|
| $\{0, 1, 2, \ldots, n\}$ | $I_n$ | modular |
| $\{0, 1, 2, \ldots, \infty\}$ | $I_\infty$ | orthomodular, non-modular |
| $[0, 1]$ | $II_1$ | modular |
| $\mathbb{R}^+$ | $II_\infty$ | orthomodular, non-modular |
| $\{0, \infty\}$ | $III_\infty$ | orthomodular, non-modular |

The (relative) dimension function $d$ on an arbitrary factor is a generalization of the ordinary linear dimension of the closed linear subspace a projection projects to, and the ordinary dimension takes on the positive integer values $0, 1, 2, \ldots, n$ and $0, 1, 2, \ldots$, respectively, in the two well-known cases of the set of all bounded operators on a finite, $n$-dimensional (respectively infinite) dimensional Hilbert space. In the cases $II_1$, $II_\infty$ and $III_\infty$ the ranges of the dimension function are, respectively, the following: the unit interval $[0, 1]$, the set of non-negative real numbers $\mathbb{R}^+$ and the two element set $\{0, \infty\}$. (See [57] for a systematic treatment, or [42], [39] for a brief review of the Murray-von Neumann classification theory).

## The Discovery of Type $III_\infty$ Factors

The existence of five different classes of factors was unexpected and also surprising, not least in part because the (relative) dimension function could take on not only integer values but also real numbers. In their first joint paper Murray and von Neumann [Neumann1936a] could construct factors in every class except the type $III_\infty$. The problem of existence of type $III_\infty$ factors remained a difficult open problem, and it was only years after the classification theory had been worked out that von Neumann could prove that type $III_\infty$ factors do in fact exist [Neumann1940]. Von Neumann reports on obtaining this result in the letter to I. Halperin (June 1, [1939 ?]), this letter is witness to von Neumann's excitement about this result, a rare excitement that von Neumann himself calls "euphoria". This letter expresses von Neumann's hope that he can make some additional progress concerning the classification of the type $II_1$ factor into further subclasses.

## Group Measure Space Construction

The type $II_1$ factor (the one on which a dimension function with the interval $[0, 1]$ as its range exists) fascinated von Neumann from the very moment of its discovery in [Neumann1936a]. The letters to Halperin (December 17, [1939 ?]) and (February 22, 1940) describe the general technique of constructing von Neumann factors; this technique is known as "group measure space construction". The main idea, in modern notation, is the following.

Let $(X, \mathcal{B}, \mu)$ be a measure space and $G$ a countable group of measure-preserving transformations. The group measure space construction yields a von Neumann algebra acting on the Hilbert space $L^2(\mu) \otimes l^2(G)$, which is regarded as a set of functions defined on $G$ and with values in $L^2(\mu)$. For every $f \in L^\infty(\mu)$ define

$$(1) \qquad ((M_f\xi)(g))(x) = f(g^{-1}x)(\xi(g)(x)) \qquad (\xi \in L^2(\mu) \otimes l^2(G))$$

and for every $g \in G$ set

$$(2) \qquad (V_g(\xi)(g'))(x) = \xi(g^{-1}g')(x) \qquad (\xi \in L^2(\mu) \otimes l^2(G))$$

Let $\mathcal{M}(\mu, G)$ be the von Neumann algebra generated by the operators

$$\{M_f : f \in L^\infty(\mu)\} \cup \{V_g : g \in G\}$$

Then the choice of the unit circle with the Lebesgue measure and (the powers of) an irrational rotation yields a factor of type $II_1$. The real line with the Lebesgue measure and the rational translations yield a factor type $II_\infty$. Von Neumann modified this measure theoretic procedure to obtain a type $III_\infty$ factor from the Lebesgue measure of the real line and the group of all rational linear transformations (see [25] for a more detailed review of the construction).

## Levels of Abstraction

In the letters to Dixmier (November 14, 1953) and I. Kaplansky (March 1, 1950) von Neumann distinguishes different levels on which one can carry out an investigation of operator algebras: on the first, most concrete level, one considers the operators as maps acting on a particular Hilbert space. (In today's terminology, we would say that the algebras are analyzed in a concrete representation.) On the second level one regards the operators as carriers of an abstract algebraic structure, independently of any particular representation. The next level focuses on the algebraic features of the selfadjoint part of an abstract operator algebra. This level defines the topic of what is called today Jordan algebra theory, while on the fourth, highest level of abstraction, the lattice theoretic structure defined by the set of projections in the algebra is studied. Von Neumann mentions that, after publishing a paper [Neumann1936b] on the level of Jordan algebra theory, and after having achieved some further results which he never published, he neglected working on the level of Jordan algebra theory since he considered analyzing the lattice theoretic structure of the idempotents of an algebra "... as the really satisfactory one, and having worked it out, lost a good deal of my interest in the others." (von Neumann to Dixmier, November 14, 1953).
