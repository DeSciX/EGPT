---
title: "Introductory Comments, Section 7: Ergodic Theorem"
author: "Miklos Redei (editor)"
source: "Von Neumann: Selected Letters, edited by Miklos Redei"
publisher: "American Mathematical Society / London Mathematical Society"
year: 2005
section: 7
pages: "pp. 33-35 (approximately) in the Introductory Comments"
---

# 7. Ergodic Theorem

Von Neumann proved the mean ergodic theorem in 1931 [Neumann1932b]. The result was announced by von Neumann to several people, including G.D. Birkhoff, who then proved a stronger, "pointwise" (or "individual") version of the ergodic theorem [Neumann1932c].

## Priority Dispute with Birkhoff

As far as I am aware the letters to Robertson and Stone are the first hard evidence of the friction between von Neumann and G.D. Birkhoff, a friction that has been rumored in the community of historians of science ever since the thirties. In his letter to Robertson (January 16, 1932) von Neumann tells the story of the priority dispute between him and Birkhoff in detail; the letter to Stone (January 22, 1932) is a shorter summary of the story. The priority dispute between von Neumann and George Birkhoff is discussed at length in [61].

In a second paper [Neumann1932c], published shortly after the one containing the mean ergodic theorem, von Neumann argues that his mean ergodic theorem is sufficient for the purposes of statistical mechanics and he also tries to set the historical record straight by writing:

> Mr. G.D. Birkhoff, to whom we communicated these results orally in October, 1931, has subsequently succeeded in establishing the above surmise [existence of time average] by means of an extremely astute method of his own in the domain of point set theory; he has proved, i.e. the existence and equality of the numerical limits ... except on a set of measure zero ...
> [Neumann1932c] in [Neumann1962II, No. 13, p. 275]

Note that, to be potentially useful for foundations of classical statistical mechanics, the time average of a function should not only exist but must equal the phase average, i.e. (29) must hold; however, von Neumann did *not* prove that equality (29) holds in the typical cases of dynamical systems (nor did Birkhoff).

## Ergodicity and Metric Transitivity

The dynamical system $(X, S, \mu, \{\alpha_t\}_{t \in \mathbb{R}})$ is called metrically transitive if any measurable $\alpha$ invariant set has measure 0 or $\mu(X)$, i.e. if $A \in S$ and $\alpha[A] \subseteq A$ implies $\mu(A) = 0$ or $\mu(A) = \mu(X)$. Whether metric transitivity holds for the dynamical systems occurring in statistical mechanics, is an extremely difficult problem, which remains largely open even today (see the survey [55] for a review of some results in the field). One should also note that the question of whether ergodicity is relevant at all for foundations of classical mechanics is itself an issue about which there is no consensus in the physics community [10]. Von Neumann thought that ergodicity was important: summarizing the physical significance of his ergodic theorem in his letter to Ortvay (February 2, 1939) he writes:

> Today's formulation of the ergodic theorem is that, apart from a set of measure 0, the "Zeitmittelwert" [time average] does exist as a limit and = the "Raummittelwert" [phase average]. All "disorder" assumptions are implied by the single hypothesis that we are not in that measure-0 set. No separate "H-theorem" is needed.
> (von Neumann to Ortvay, February 2, 1939)

## Terminology

Ergodicity (metric transitivity) is sometimes referred to as "quasi-ergodicity". Von Neumann himself uses the term "quasi-ergodic" in the title of his paper ("Proof of the quasi-ergodic hypothesis", [Neumann1932b]), and he says explicitly in the first sentence of the paper that he considers "quasi-ergodicity" and "ergodicity" as synonyms; furthermore, it is clear from his paper that by "ergodicity" he means metric transitivity.

Yet, the title of von Neumann's paper and his terminology in his letters to Robertson (January 16, 1932) are potentially misleading for two reasons: first, because, as stressed above, von Neumann did not prove the quasi-ergodicity (= metric transitivity) of dynamical systems; second, because "quasi-ergodicity" is sometimes used to refer to the following *topological transitivity property* of dynamical systems: the trajectory of $\mu$ almost every point in $X$ is topologically dense in $X$. It should be stressed that ergodicity in this latter sense is different from ergodicity understood as metric transitivity: ergodicity concerns just the measure theoretic aspects of the dynamic transitivity ($X$ need not even have any topology for ergodicity to make sense). Furthermore, even if $X$ does have a topology, quasi-ergodicity in the topological sense *does not* imply ergodicity (metric transitivity) in general, not even if $X$ is a compact metric space (see [19, pp. 26-27] and [32, pp. 104-105]). The converse is true, however: If $X$ is a (compact) topological space and $\mu$ is a Borel measure on $X$ such that $\mu(A) > 0$ for every open set $A$, then ergodicity implies that the orbit $\{\alpha_t x\}$ of $\mu$ almost every $x$ is everywhere dense in $X$ [58, p. 132].

The textbook story is questioned in [6] and [40]. For a summary of the developments of ergodicity in the period when von Neumann was making his contribution see Mackey's review [31].
