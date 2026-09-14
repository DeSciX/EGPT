---
title: "Introductory Comments, Section 9: Game Theory"
author: "Miklos Redei (editor)"
source: "Von Neumann: Selected Letters, edited by Miklos Redei"
publisher: "American Mathematical Society / London Mathematical Society"
year: 2005
section: 9
pages: "pp. 38-41 in the Introductory Comments"
---

# 9. Game Theory

"Of the many areas of mathematics shaped by his genius, none shows more clearly the influence of John von Neumann than the Theory of Games." [27, p. 100]. Von Neumann published two decisive works on game theory: one is his relatively short paper from 1928 [Neumann1928a] containing the famous Minimax Theorem, the other is the monumental treatise *Theory of Games and Economic Behavior* [Neumann1944b] written in cooperation with economist O. Morgenstern. Von Neumann regarded the Minimax Theorem the heart of the whole theory: "As far as I can see, there could be no theory of games on these bases without that theorem." [Neumann1953].

## The Minimax Theorem

Non-technically formulated, the Minimax Theorem of 1928 states that in any zero-sum, two person game there exists a uniquely determined gain for each player that can be achieved by their choosing an appropriate *mixed* strategy. To explain and state the Minimax theorem semi-formally, let us introduce the following notation: Let $S$ and $T$ denote the *pure* strategies of two players $A$ and $B$ in a zero-sum two person game, and let $L(a, b)$ denote the loss of player $B$ if $B$ chooses strategy $b \in T$ provided $A$ chooses strategy $a \in S$. (A pure strategy is a prescription that specifies a player's first move and the move the player is supposed to make as a response of any given move of the opponent.) Players $A$ and $B$ can always achieve the gains $G_A$ and $G_B$ given by

$$(31) \qquad G_A = Max_{a \in S}\left(Min_{b \in T} L(a, b)\right),$$

$$(32) \qquad G_B = Min_{b \in T}\left(Max_{a \in S} L(a, b)\right).$$

A fair game would be such that there exist strategies $a^*, b^*$ such that

$$G_A = G_B = L(a^*, b^*)$$

(optimal strategies). In general, no such optimal strategies $a^*$ and $b^*$ exist. The Minimax Theorem states that there exist *mixed* strategies, however, for which the *average* gains of $A$ and $B$ are equal: If $M(S)$ and $M(T)$ denote the set of probability measures over the set of respective pure strategies and $K(\alpha, \beta)$ is the expected value of $L(a, b)$ with respect to the probability measures (mixed strategies) $\alpha \in M(S)$ and $\beta \in M(T)$, then

$$(33) \qquad Max_{\alpha \in M(S)} \ Min_{\beta \in M(T)} K(\alpha, \beta) = Min_{\beta \in M(T)} \ Max_{\alpha \in M(S)} K(\alpha, \beta).$$

The Minimax Theorem was proved by von Neumann for an arbitrary but *finite* set of strategies in 1928. In his letter to Kaplansky (February 1, 1945) von Neumann describes briefly how he would treat the case of infinite strategies.

## Priority Dispute with Frechet

Von Neumann got into a priority dispute with M. Frechet about who the initiator of game theory really was: Frechet published a short note [12] in the journal *Econometrica* in 1953 together with a commentary [13] that accompanied the translation from French into English of three notes of E. Borel on game theory. Frechet claims that

> ... in reading these notes of Borel's I discovered that in this domain, *as in so many others*, Borel had been the *initiator*.
> [12, p. 95]. (Emphasis in original.)

As his strongly worded letter to Morgenstern (January 2, 1953) shows, von Neumann was irritated by this evaluation of Borel by Frechet and he published a "Communication on the Borel notes" in the same issue of *Econometrica* [Neumann1953]. In this communication von Neumann writes:

> (2) ... By surmising, as he [Borel] did, the incorrectness of that [Minimax] theorem, Borel actually surmised the impossibility of the theory of games as we know it.
> (3) In view of this, Borel did hardly "initiate" the theory. I developed my ideas on the subject before I read his papers, whose negative conclusions on the decisive point (the "minimax theorem", which alone makes the concepts in question unambiguously useful) would have been primarily discouraging.
> [Neumann1953, p. 124]

## Utility Theory

Von Neumann's letter to Deming (January 23, 1945) contains some brief evaluative comments by von Neumann on their work with Morgenstern together with some plans they had for future research.

At the insistence of Morgenstern (see [27, p. 108]) the second edition (published in 1947) of the book on game theory [Neumann1944b] contained a detailed proof of existence of the so-called "utility functions" $u$: Given a set $X$ of options with a binary relation $x \preceq y$ interpreted as a person's preference of option $y$ over option $x$, it is proved in [Neumann1944b] that if $\preceq$ is a complete ordering, then (under suitable and natural additional conditions on $\preceq$) there exists (essentially uniquely) a real valued utility function $u$ on $X$ such that if $x \preceq y$, then $u(x) \leq u(y)$. In his letter to Wold (October 28, 1946) von Neumann discusses whether one needs to introduce non-numerical utility functions, especially if one drops the requirement that the preference relation $\preceq$ is a complete ordering. Von Neumann is skeptical of the idea:

> I think that it will be difficult to get away from some rigidly determined (i.e., "up to a linear transformation" uniquely determined) connection between utilities and numbers in any *complete* system of concepts: Probability is hard to eliminate from the world with which we are dealing, and probability seems to be an essentially numerical concept.
> (von Neumann to Wold, October 28, 1946)

In his letter to Haberler (October 31, 1947) von Neumann declines reviewing "Dr. Samuelson's book on the mathematical foundations of economics". Although no exact reference is given in this letter to Samuelson's work, the book in question is probably [50]. Von Neumann explains his unwillingness to do the review by lack of time needed to study the work carefully; however, it is likely that he did not like Samuelson's approach to mathematical economy: As Leonard points out:

> It thus becomes evident that the theory of games was intended to constitute a radical rapture with the Hicks-Samuelson variant of neoclassical economics. Von Neumann completely rejected the latter's underlying physical metaphor of classical mechanics and the associated mathematics based on the differential calculus. [28, p. 755]

## Chess and Combinatorial Games

In his two letters to L.B. Tuckerman (August 25, 1950) and (September 25, 1950), von Neumann estimates the number of all valid games in chess ($10^{80}$), and, using chess, gives an example of a two-player game, for which one can prove that one of the players can certainly win without knowing how to do this.
