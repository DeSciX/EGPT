---
title: "Introductory Comments, Section 6: Quantum Logic"
author: "Miklos Redei (editor)"
source: "Von Neumann: Selected Letters, edited by Miklos Redei"
publisher: "American Mathematical Society / London Mathematical Society"
year: 2005
section: 6
pages: "pp. 23-28 (approximately) in the Introductory Comments"
---

# 6. Quantum Logic

Quantum logic was born in the 1936 seminal paper coauthored by Garret Birkhoff and John von Neumann [Neumann1936c]. The publication of this paper had been preceded by an intense and extensive correspondence between Birkhoff and von Neumann. The current collection contains a large selection of the letters von Neumann wrote to Birkhoff during the preparatory phase of the paper. These letters make it possible to reconstruct some steps in the thought process that led to the notion of quantum logic that got published in [Neumann1936c], and this is especially interesting both conceptually and historically because the Birkhoff-von Neumann concept of quantum logic was different from what became the standard notion. The issue of quantum logic appears in a number of other letters as well (to Husimi (September 29, 1937); to Jordan (December 11, 1949); all the letters to Silsbee but especially the one dated July 2, 1945; to Ulam (October 4, [????]) and to Veblen (July 6, 1935)). In view of the historical and conceptual significance of von Neumann's very technical letters to Birkhoff, more detailed comments are called for in connection with quantum logic. This section is based on [48].

## Boolean Algebra and Classical Logic

It is well known that both the syntactic as well as the semantic aspects of classical propositional logic can be described completely in terms of Boolean algebras: The Tarski-Lindenbaum algebra $\mathcal{A}$ of classical propositions is a Boolean algebra and a deductive system formulated in a classical propositional logic can be identified with a filter in $\mathcal{A}$. The notions of syntactic consistency and completeness correspond to the filter being proper and being a prime (equivalently: maximal) filter, respectively. The logical notion of interpretation turns out to be a Boolean algebra homomorphism from $\mathcal{A}$ into the two element Boolean algebra, and all semantic notions are defined in terms of these homomorphisms.

The problem of quantum logic can be formulated as the question of whether a Boolean algebra can be replaced in the above role by another, weaker algebraic structure arising from the mathematical formalism of quantum mechanics yielding thereby a "quantum logic".

## Von Neumann's Path to Quantum Logic

The Birkhoff-von Neumann paper [Neumann1936c] can be viewed as one of the first papers in which the suggestion to logicize a non-Boolean lattice appears. The main idea of this logicization is summarized in von Neumann's letter to Veblen (July 6, 1935); this letter is like an extended abstract of the Birkhoff-von Neumann paper [Neumann1936c].

There are two natural candidates for a non-distributive lattice to be logicized: (abstract) orthomodular lattices $(\mathcal{L}, \vee, \wedge, \perp)$ and the concrete orthomodular lattice $\mathcal{P}(\mathcal{H})$ of projections of a Hilbert space $\mathcal{H}$, the Hilbert lattice. Orthomodularity of $\mathcal{L}$ means that the following condition holds:

$$(22) \qquad \textit{orthomodularity:} \quad \text{If } A \leq B \text{ and } A^\perp \leq C, \text{ then } A \vee (B \wedge C) = (A \vee B) \wedge (A \vee C).$$

Orthomodularity is a weakening of the modularity law:

$$(23) \qquad \textit{modularity:} \quad \text{If } A \leq B, \text{ then } A \vee (B \wedge C) = (A \vee B) \wedge (A \vee C).$$

which itself is a weakening of the distributivity law:

$$(24) \qquad \textit{distributivity:} \quad A \vee (B \wedge C) = (A \vee B) \wedge (A \vee C) \quad \text{for all A,B,C.}$$

(Boolean algebras are orthocomplemented distributive lattices.)

At the time of birth of quantum logic the notion of an abstract orthomodular lattice did not yet exist; however, the canonical example of non-distributive, orthomodular lattices, the Hilbert lattice $\mathcal{P}(\mathcal{H})$, was known already, and, since this structure emerges naturally from the Hilbert space formalism of quantum mechanics, $\mathcal{P}(\mathcal{H})$ was the most natural candidate in 1935 for the propositional system of quantum logic. Von Neumann did consider $\mathcal{P}(\mathcal{H})$ as a possible propositional system of quantum logic; yet, this lattice was not his choice: The first indication that $\mathcal{P}(\mathcal{H})$ may not be a suitable candidate for a quantum propositional system is in von Neumann's letter to Birkhoff dated January 19, 1935. Von Neumann writes:

> $\overline{K} \subsetneq \overline{M}$, $(\overline{K} \vee \overline{L}) \cap \overline{M} \supsetneq \overline{K} \vee (\overline{L} \cap \overline{M})$
>
> (von Neumann to Birkhoff, November 6, [1935 ?]), emphasis in original.

This letter contains a detailed proof that subspaces $\overline{K}$, $\overline{L}$, $\overline{M}$ exist that satisfy (25) (and thereby violate modularity (23)). (The Birkhoff-von Neumann paper [Neumann1936c] just states this fact without detailed argument.)

## Two Choices for "Join"

One can see in von Neumann's letter to Birkhoff (November 6, [1935 ?]) that von Neumann's proof makes use of the theory of unbounded selfadjoint operators, utilizing the fact that one can find two unbounded selfadjoint operators $X$ and $Y$ such that the spectral projections of the closure $\overline{X+Y}$ of the sum $X + Y$ need not commute with the spectral projections of $X$ or of $Y$. Since $\mathcal{P}(\mathcal{H})$ is not modular and given that von Neumann wished to preserve modularity as a property of the quantum propositional system, one would think that von Neumann suggests to choose option (I). But this is *not* the case. Von Neumann thinks through the consequences of choosing option (I) first:

Let us first consider the alternative (I). The orthogonal complement $K'$ still has the property $K' \cup L' = (K \cap L)'$, but $K' \cap L' = (K \cup L)' = K$ are lost. We have $K \cap K' = 0$, while $K \cup K'$ is everywhere dense, but not necessarily $I$. There is a funny relationship between $K$ and its "closure" $K''$. (For instance: All probabilities in the state $K$ are equal to those in the state $K''$, but $K''$ and $K'' \cap L''$, even for closed $L$'s) may differ.)

The situation is strongly reminiscent of the "excluded middle" troubles, although I did not yet compare all details with those of the class-calculus in "intuitionistic" logics.

> After all it is so in normal logics, too, that these troubles arise as soon as you pass to infinite systems, although I must admitt, that the difficulties there are more "optional" then here.

(I) *Either* we define the "join" by $\cup$ (as a honest linear sum), then the lattice is B, but we must admit all (not-necessarily-closed-) linear subspaces,

(II) *or* we define the "join" by $\vee$ (closure of the linear sum), then the B-character is lost.

(von Neumann to Birkhoff, November 6, [1935 ?])

Since $\mathcal{P}(\mathcal{H})$ is not modular, von Neumann suggests to choose option (I), but this is *not* the case -- von Neumann initially favored option (II), which sacrifices B-lattice character but preserves the closure property. The Birkhoff-von Neumann paper ultimately worked with the modularity-preserving framework through careful restriction of the lattice structure.

## Connections to Intuitionism

Von Neumann's remark connecting quantum logic to intuitionistic logic is notable. The excluded middle problems arising in option (I) -- where $K \cup K'$ is everywhere dense but not necessarily $I$ -- reminded him of the patterns found in intuitionistic logic. This connection between quantum logic and intuitionism would become a recurring theme in foundational discussions of quantum mechanics.
