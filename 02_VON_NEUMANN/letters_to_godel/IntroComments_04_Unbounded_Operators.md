---
title: "Introductory Comments, Section 4: Unbounded Operators"
author: "Miklos Redei (editor)"
source: "Von Neumann: Selected Letters, edited by Miklos Redei"
publisher: "American Mathematical Society / London Mathematical Society"
year: 2005
section: 4
pages: "pp. 13-14 in the Introductory Comments"
---

# 4. Unbounded Operators

Motivated to a large extent by mathematical problems in quantum mechanics, von Neumann made pioneering work in the theory of unbounded operators [Neumann1929a] and [Neumann1932d]; specifically, he clarified the subtle differences between symmetric and selfadjoint (unbounded) operators. The unboundedness causes technical difficulties that are mainly related to the fact that unbounded operators are not everywhere defined; hence one has to be extremely careful about the domains of those operators in definitions and calculations involving them.

The lengthy and technical letter to Kemble (December 6, [????]) shows some of the subtleties of the subject and is a historical document in the long development of the problem of proving selfadjointness of Hamilton operators that occur in quantum mechanics. Unfortunately, the terminology used by von Neumann in connection with unbounded operators differs -- both in his papers and in his letter to Kemble -- from the one that has become accepted today. To avoid confusion and to help the reader, the basic definitions and terminology in connection with the theory of unbounded operators is recalled below with special emphasis put on the relation of today's terminology to the one used by von Neumann.

## Definitions and Terminology

Let $\mathcal{D}(T)$ denote the domain of definition of a linear operator $T$ defined on the Hilbert space $\mathcal{H}$. If $\mathcal{D}(T)$ is dense in $\mathcal{H}$, then there exists (uniquely) an operator $T^*$ with definition of domain $\mathcal{D}(T^*)$ such that

$$(3) \qquad \langle\xi, T\eta\rangle = \langle T^*\xi, \eta\rangle \qquad \xi \in \mathcal{D}(T^*), \quad \eta \in \mathcal{D}(T).$$

The operator $T^*$ is called the *adjoint* of $T$. Let $\Gamma(T)$ denote the *graph* of an operator $T$, the graph is defined by

$$\Gamma(T) = \{(\xi, \eta) : \xi \in \mathcal{D}(T), \eta = T\xi\}.$$

An operator $T$ is called *closed* if its graph $\Gamma(T)$ is closed in the following sense: If $\xi_n \in \mathcal{D}(T)$ is a sequence of elements such that $\xi_n \to \xi$ and $T\xi_n \to \eta$, then $\xi \in \mathcal{D}(T)$ and $T\xi = \eta$. It is a classical result of operator theory (Hellinger-Toeplitz theorem) that an everywhere defined closed operator is bounded.

Given two operators $T_1$ and $T_2$ one writes $T_1 \subseteq T_2$ if $T_2$ *extends* $T_1$. This means that the domain $\mathcal{D}(T_1)$ of the definition of $T_1$ is contained in the domain of definition $\mathcal{D}(T_2)$ of $T_2$ and $T_1(\xi) = T_2(\xi)$ for all $\xi \in \mathcal{D}(T_1)$. The relation $T_1 \subseteq T_2$ can be expressed in terms of the graphs of the two operators as $\Gamma(T_1) \subseteq \Gamma(T_2)$.

The definition of adjoint operator entails that

$$(4) \qquad T_1 \subseteq T_2 \quad \text{implies} \quad T_2^* \subseteq T_1^*.$$

The operator $T$ is called *symmetric* if

$$(5) \qquad \langle\xi, T\eta\rangle = \langle T\xi, \eta\rangle \qquad \xi, \eta \in \mathcal{D}(T).$$

Thus $T$ is symmetric if and only if $T \subseteq T^*$. Operator $T$ is called *maximal symmetric* if it is symmetric and there exists no *symmetric* operator $T'$ that extends $T$. The operator $T$ is called *selfadjoint* if it coincides with its adjoint: $T = T^*$.

A selfadjoint operator is closed; hence an unbounded selfadjoint operator cannot be everywhere defined (by the Hellinger-Toeplitz theorem). If $T$ is selfadjoint, then it is maximal symmetric because by (4) one has for a symmetric $T'$ that extends $T$,

$$T \subseteq T' \subseteq T'^* \subseteq T = T^*$$

which implies $T = T'$. A maximal symmetric operator need not be selfadjoint however. The relation of maximal symmetric and selfadjoint operators was clarified by von Neumann and can be described in terms of the *defect indices*: If $T$ is a symmetric operator, then $n^+$ and $n^-$ defined below are called the defect indices of $T$:

$$(6) \qquad n^+ = \dim\left[\textit{Range}(T + iI)\right]^\perp,$$

$$(7) \qquad n^- = \dim\left[\textit{Range}(T - iI)\right]^\perp.$$

Von Neumann proved that a symmetric operator $T$ is maximal symmetric if and only if *one* of its defect indices is zero and $T$ is selfadjoint if and only if *both* of its defect indices are zero (see [Neumann1929a, Satz 33]). Von Neumann's terminology differs from the above however: he called symmetric operators "Hermitean" (he also used the terminology "selfadjoint") and he called selfadjoint operators "hypermaximal". (Von Neumann mentions E. Schmidt as the creator of the terminology "hypermaximal" ([Neumann1929a, footnote 23].) Thus the relation of the standard terminology and the one used by von Neumann can be summarized as follows:

| Standard terminology | von Neumann's terminology |
|---|---|
| $T$ symmetric | $T$ Hermitean (equivalently: selfadjoint) |
| $T$ maximal symmetric | $T$ maximal Hermitean |
| $T$ selfadjoint | $T$ hypermaximal |

## Spectral Resolution

One of the distinguishing features of selfadjoint operators is that they possess a "spectral resolution" ("Zerlegung der Einheit" in von Neumann's original terminology). This is spelled out in what is called the "spectral theorem for selfadjoint operators", which in modern terminology and notation reads as follows: For every selfadjoint operator there exists a unique spectral measure $P$: a map $P: \mathcal{B}(\mathbb{R}) \to \mathcal{P}(\mathcal{H})$ from the Borel $\sigma$ algebra $\mathcal{B}(\mathbb{R})$ of real numbers into the set $\mathcal{P}(\mathcal{H})$ of projections on the Hilbert space $\mathcal{H}$ such that

$$(8) \qquad \langle\xi, T\eta\rangle = \int_\mathbb{R} id_\mathbb{R} d\mu^P_{\xi,\eta} \qquad \eta \in \mathcal{D}(T), \quad \xi \in \mathcal{H}$$

where the complex measure $\mu^P_{\xi,\eta}$ on the Borel $\sigma$ algebra $\mathcal{B}(\mathbb{R})$ of real numbers is defined by

$$(9) \qquad \mathcal{B}(\mathbb{R}) \ni d \mapsto \mu^P_{\xi,\eta}(d) = \langle\xi, P(d)\eta\rangle.$$

Conversely, given a spectral measure $P$, every operator $T$ defined by eq. (8) defines a (generally unbounded) selfadjoint operator. The terminology "spectral measure" is justified by the fact that the support of $P$ coincides with the spectrum of $T$ and (8) is the generalization of the well-known spectral representation $T = \sum_i^N \lambda_i E_i$ of a selfadjoint operator (matrix) in a finite dimensional Hilbert space in terms of eigenprojections $E_i$ and eigenvalues $\lambda_i$ (the "diagonalization" of a selfadjoint matrix). The spectral theorem was proved by von Neumann [Neumann1929a, Satz 36]. Unitary operators also have a spectral measure; the spectral measure is defined on the unit circle rather than on the real line -- in accordance with the fact that the spectrum of unitary operators lies on the unit circle. Von Neumann reports his result on spectral theory of unitary operators in his letter to Veblen (October 3, 1938).

## The Hamilton Operator Problem

Since the operators representing observables in quantum mechanics are typically not everywhere defined unbounded operators, it was a major mathematical problem to clarify whether (on what assumptions) they are selfadjoint. One such operator is the one investigated in detail by von Neumann in his letter to Kemble (December 6, [????]):

> If I understand you correctly, your question is this:
> Given a differential operator
>
> $$(10) \qquad H = -\left(\frac{\partial^2}{\partial x_1^2} + \ldots + \frac{\partial^2}{\partial x_n^2}\right) + V(x_1, \ldots, x_n)$$
>
> when is it possible to apply the general theorems of operator-theory to it, i.e., when is it "hypermaximal"?
> (von Neumann to Kemble, December 6, [????])

The above differential operator gives the wave equation of an $m$ particle system moving in a potential. Remarkably, von Neumann, the undisputed expert on operator theory, was unable to prove the selfadjointness of that Hamilton operator, as he "shamefully confesses" (letter to Kemble (December 6, [1935 ?])). A general proof of selfadjointness of typical Hamilton operators was only given in 1951 by Kato [26], and as P. Lax reports:

> I recall in the summer of 1951 the excitement and elation of von Neumann when he learned that Kato has proved the self-adjointness of the Schrodinger operator associated with the helium atom.
> [30, p. 414]
