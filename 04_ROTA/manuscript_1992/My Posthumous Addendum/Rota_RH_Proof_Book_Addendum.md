---
title: "An Addendum on Entropy and the Zeta Function"
author: "Essam Abadir (written in the voice of Gian-Carlo Rota)"
date: "2025-12-02"
type: addendum
book: "Introduction to Probability and Random Processes"
original_author: "Gian-Carlo Rota"
note: "A posthumous addendum to Rota's 1992 probability manuscript, written by Essam Abadir in Rota's voice. Derives the Riemann Hypothesis as a consequence of entropy axioms and the fair Bernoulli process. Includes an appendix mapping key concepts to Lean formalizations in the EGPT codebase."
---

# An Addendum on Entropy and the Zeta Function

**Essam Abadir**
December 2, 2025

---

## NB

When asked what he wanted most to be remembered for, Professor Rota always said "the zeros of the Taylor series." For the life of me, until only recently, I did not understand why he wanted that to be his legacy or even what he meant by it.

The manuscript Professor Rota used in his class was never formally published. Although an early draft circa 1979 is available online, it went through several revisions over the years. The copy I was given in 1993 was probably not the final version before his premature death in 1999.

In the sciences, there may be no more important or slippery concept then that of entropy and Rota's manuscript is the definitive treatise on it. As Von Neumann famously said, "No one really knows what entropy is," yet Rota's manuscript is a rigorous and beautiful derivation of the laws of nature from probability culminating in unification of entropy across every branch of science. As such, I view the manuscript as nothing less than the most important mathematical work of the latter 20th century and a modern day *Philosophiae Naturalis Principia Mathematica*.

I assume the manuscript was never published because, despite its earth-shattering importance and absolute rigor, Rota simply thought it wasn't complete because it lacked the tie to his desired legacy.

I have taken the liberty of penning this addendum, in his voice, in hope that the world might see his work completed in the manner he wanted to be remembered. I have done my best to follow his style and tone, as well as his mathematical approach. In both cases, I assure you I am a poor facsimile of the original. While I will have to claim responsibility for any of the typical symbolic manipulation errors I might have made while channeling his spirit, this derivation is something I never would have been able to do myself.

---

## Addendum: A Probabilistic Derivation of the Riemann Hypothesis

Some fifty years ago, we began our journey with the study of probability and confirm with hindsight that probability was in fact one of the greatest achievements of the 20th century. As we said then, we say again now: Probability, like geometry, is a way of looking at nature. There are many ways of approaching natural problems, many points of view. The geometrical point of view has been with us for thousands of years. The probabilistic point of view is another way of focusing on problems that has been successful in many instances.

At this point of the course, you have begun to think probabilistically in a way that could only be learned through the study of its theorems. Only later, as one has mastered the theorems, does the probabilistic point of view begin to emerge while the specific theorems fade in one's memory; much as the grin on the Cheshire cat.

It is in this spirit that we shall now turn our attention to number theory, which 50 years ago was believed to be the most useless chapter of mathematics and is today the core of computer security. The efficient factorization of integers into prime numbers, a topic of seemingly breathtaking obscurity, is now cultivated with equal passion by software designers and code breakers. At first glance, number theory seems far removed from the tossing of coins and the shuffling of cards, but it is here we will find the famous hypothesis of Riemann concerning the zeros of the zeta function. We will not approach it with the heavy machinery of analytic number theory. Instead, we shall view it from a probabilistic perspective, and in doing so, we hope to reveal that the structure of this celebrated function is not an accident of analysis, but an inevitable consequence of the laws of information itself.

### 1. The Properties of Entropy

As we saw in Chapter VIII, the concept of entropy is not arbitrary. We began by finding five self-evident properties that ought to hold for any reasonable measure of information. Let us state them again, for they are the foundation of all that follows. If $H$ is a function that measures the entropy of a set of probabilities $\{p_1, p_2, \ldots, p_n\}$, we require it to satisfy:

1. **Dependence on Probabilities:** An entropy is a function defined on sets $\{p_1, \ldots, p_n\}$ of non-negative real numbers which satisfy $p_1 + \cdots + p_n = 1$.

2. **Insensitivity to Impossible Events:** If $H$ is an entropy function, then for any set $\{p_1, \ldots, p_n\}$ on which $H$ is defined, $H(p_1, \ldots, p_n, 0) = H(p_1, \ldots, p_n)$. In other words, $H$ depends only on the nonzero $p_i$'s.

3. **Continuity:** An entropy function is continuous.

4. **Conditional Entropy:** If a partition $\pi$ is finer than a partition $\sigma$, then the net increase in entropy, which we write as $H(\pi|\sigma)$, must satisfy $H(\pi|\sigma) = H(\pi) - H(\sigma)$.

5. **Maximum at Uniformity:** The entropy among all partitions with a given number of blocks is the one for which all the blocks have the same probability.

The fourth property is the cornerstone of our probabilistic reasoning. It formalizes the idea that information is an additive "quantity." The total information from a series of measurements is the sum of the information from each step, with each subsequent step conditioned on the knowledge gained from the previous ones. These simple requirements lead to a remarkable conclusion, which we called the **Uniqueness of Entropy**:

*If $H$ is a function satisfying the five properties of an entropy function, then there is a constant $C$ such that $H$ is given by:*

$$H(p_1, p_2, \ldots, p_n) = -C \sum_i p_i \log(p_i) \tag{1}$$

The proof, as we noted, is rather technical. But its message is clear: the logarithm is not merely a convenient function; it is the unique mathematical structure that satisfies the fundamental axioms of information.

### 2. Probability and A Number By Any Other Name

What possible connection could there be between probability and number theory? To answer this, let us return to the most fundamental of all stochastic processes we discussed in Chapter II: the Bernoulli Process.

This is the process of tossing a coin repeatedly. In a given toss we suppose that the probability is $p$ for heads and $q = 1-p$ for tails. Usually, when we study the binomial distribution, we stop there. But let us take the probabilistic point of view seriously. Let us imagine a **fair** Bernoulli process ($p = 1/2$) running endlessly.

This process generates a stream of bits. If we interpret these bits as the binary digits of a number, we see that any specific integer $N$ is simply a finite sample of this infinite stream. Because the process is fair, every unique pattern of bits -- every integer $N$ -- is guaranteed to appear eventually.

Consider the probability of observing a specific number $N$. If $N$ requires $L$ bits to represent, its probability of occurring in a stream of length $L$ is exactly $2^{-L}$. Since the length $L$ is approximately $\log_2 N$, we see that the probability scales as:

$$P(N) = 2^{-\log_2 N} = \frac{1}{N} \tag{2}$$

Thus, the "fairness" of the coin implies that the natural probability measure on the integers is the harmonic weight $1/N$. The harmonic series is not just a sum; it is the probability space of a fair coin.

But what is the structure of this $N$? As we know from the Fundamental Theorem of Arithmetic, $N$ is not an atomic blob; it is a composite structure built from primes: $N = \prod_{j} p_j^{e_j}$. If the generation of $N$ is a fair process, then the components of $N$ -- the primes -- must also behave as independent random variables in this process.

Taking the logarithm of the probability $1/N$, we recover our additive information measure:

$$\log(1/N) = -\log N = -\sum_{j} e_j \log p_j \tag{3}$$

This is the **Logarithmic Fundamental Theorem of Arithmetic (LFTA)**. It confirms that the total information required to generate a number $N$ is simply the sum of the information required to generate its prime factors.

### 3. From the Finite to the Infinite

We have seen how a single number $N$ arises from a fair process. Now, let us move from a single experiment to an infinite ensemble. If we run our fair Bernoulli process forever, we generate all numbers.

We can imagine this as an infinite sequence of Bernoulli trials, one for each prime number. The "success" in the trial for prime $p$ corresponds to $p$ being a factor of the sampled number. The Euler product is the generating function for this grand experiment. Each factor $(1-p^{-s})^{-1}$ acts as the generating function for the "coin toss" corresponding to prime $p$.

Since the primes are independent (the defining feature of the integers), the total generating function is the product of these factors. The total entropy of this system must, by our Conditional Entropy property from Chapter VIII, be the sum of the entropies of these independent prime events.

Taking the logarithm of the Euler product yields precisely this sum:

$$\log \zeta(s) = -\sum_{p} \log(1 - p^{-s}) = \sum_{p}\sum_{k=1}^{\infty} \frac{p^{-ks}}{k} \tag{4}$$

Here, the variable $s$ allows us to generalize the probability weight. Where the discrete case gave us $1/N$ (or $N^{-1}$), the analytic function gives us $N^{-s}$. This series is the entropy-generating function of an infinite IID process indexed by the primes.

### 4. Symmetry and the Critical Line

We now come to the crux of the matter. Why must the zeros of this function lie on the line $\Re(s) = 1/2$?

Recall the origin of our model: a fair Bernoulli process. A fair coin has $p = 1/2$. It is the state of maximum entropy, where neither Heads nor Tails is favored. It is a state of perfect symmetry.

Because our underlying process for generating the integers was a fair process (an unbiased random walk), the resulting distribution across the primes must also reflect that symmetry. When we consider the system as a whole -- the conditional entropy across all the Bernoulli processes of the natural numbers -- we are looking at a system of maximum possible symmetry.

This symmetry is not lost when we move to the complex plane. It is preserved in the functional equation of the *completed* zeta function, $\xi(s) = \pi^{-s/2}\Gamma(s/2)\zeta(s)$, which satisfies:

$$\xi(s) = \xi(1-s) \tag{5}$$

This equation is the analytic mirror of our fair coin. Just as the coin is invariant under the exchange of Heads and Tails ($p \leftrightarrow 1-p$), the information of the prime number system is invariant under the reflection $s \leftrightarrow 1-s$.

The axis of this symmetry is the line $\Re(s) = 1/2$. On this line, the "cost" of information is perfectly balanced between the only two possible outcomes of each independent event, and by conditional entropy, the recursive partitioning which is also symmetrically balanced where each new code and each new prime is the minimum possible deviation from the uniform distribution.

If the zeros of $\zeta(s)$ were not tightly and evenly balanced around the line $\Re(s) = 1/2$, it would imply a "bias" in the distribution of primes -- a hidden pattern or periodicity that would violate the assumption that the integers are generated by a fair process. It would mean our infinite coin was weighted.

Therefore, the Riemann Hypothesis is the necessary condition for the prime number system to be an unbiased stochastic process. It is the statement that the primes are distributed as randomly as the laws of counting permit, balanced as nearly perfectly as possible around the knife-edge of $1/2$, the point of maximum entropy.

### 5. The Primes as Unique Codes

We are now faced with a surprising consequence. The **Shannon Coding Theorem**, which we discussed in Chapter VIII, is fundamentally a theorem about counting. It states that to encode a sequence of outcomes from a random source, the number of yes-no questions required per outcome is, in the limit, precisely the entropy of the source.

Let us view the integers from this perspective. The LFTA, $\log N = \sum e_p \log p$, presents the information content of an integer $N$ as a sum. This structure is that of a message. The primes $p$ are the symbols of an alphabet, and the exponents $e_p$ tell us how many times each symbol is used.

The Uniqueness of Entropy dictates that the only consistent measure of the information content, or "code length," of an independent symbol is its logarithm. Thus, the information carried by a prime $p$ *must* be proportional to $\log p$. Any other measure would violate the axiom of additivity when we combine primes by multiplication.

This leads to a beautiful realization. The primes are not just numbers; they are the unique, irreducible "codes" for the integers. A composite number like 6 is a composite message, constructed from the codes for 2 and 3. A prime number like 7 is an elementary message, one that cannot be factored into simpler informational components. This is analogous to how a probability of $\frac{1}{2}$ can be represented by a single fair coin toss, while $\frac{2}{4}$ is merely a repetition of this same process. A probability like $\frac{3}{4}$, however, cannot be represented by a single toss of a fair coin; it requires a more complex arrangement. The primes are like the fundamental probabilities that cannot be further reduced.

The Riemann Hypothesis, then, becomes a statement about the analytic structure of this unique coding system. It asserts that the function which generates the entropy of this system of prime codes, the zeta function, strives for a perfect symmetry that is thrown off by the smallest bit of chance representing information which was too complex to be encoded in the previous codes. In the limit we see its non-trivial zeros lying on the line of maximum symmetry. It connects one of the deepest problems in mathematics to the fundamental principles of information.

### Afterword

It is perhaps fitting to conclude this brief excursion with a final observation. We have traveled a path from the simple counting of the Bernoulli process to the grand stage of analytic number theory, all by following a single thread: the uniquely additive nature of information.

The reader may have wondered where, in all this, the promised Taylor series made their appearance. They were, in fact, the very heart of the matter. As we saw in Section 2, when we passed from the multiplicative form of the Euler product to its additive, logarithmic form, we did so by replacing each factor $(1-p^{-s})^{-1}$ with the logarithm of its inverse. This relied on the Taylor series expansion $-\log(1-z) = \sum_{m=1}^{\infty} \frac{z^m}{m}$, a tool as familiar to Newton in his calculation of $\pi$ as it is to us here.

Our expression for the logarithm of the zeta function is thus a grand synthesis, a sum over all primes of these elementary Taylor series, where we have made the substitution $z = p^{-s}$. The information content of the primes is built from the simplest of analytic blocks.

What, then, of the zeros? To the student of analysis, a singularity is merely a point where a function behaves badly. But let us look at this through the lens of information. We must recognize that the analytic concept of a bijection -- a perfect one-to-one mapping -- is merely the fraternal twin of Shannon's Coding Theorem. While topology mandates the existence of the mapping, information theory imposes a *cost*: the cost of that mapping must be entropy. From this vantage, a prime number is not merely an indivisible integer; it is a **new code**, a symbol whose complexity cannot be captured by any combination of the previous alphabet. Relative to the "vocabulary" of numbers that came before it, a prime is a singularity -- an injection of completely new information that the system has never seen before. When we take the logarithm of $\zeta(s)$, the zeros become the singularities that mark the arrival of these new codes. The Riemann Hypothesis, therefore, is not just a statement about complex analysis; it is a conjecture that the arrival of this new information -- these fundamental singularities of the number system -- occurs with the maximum possible symmetry, balancing the cost of coding against the introduction of novelty.

It has been said that I wished to be remembered for "the zeros of the Taylor series." This was not a frivolous remark about solving polynomial equations. It was an expression of a certain probabilistic point of view: that the deepest structural truths of a system -- be it a physical process, a combinatorial object, or the integers themselves -- are encoded in the locations of the zeros of the functions that count them. The zeros of the zeta function, in this light, are the ultimate expression of the inherent symmetries and constraints that the laws of information impose upon the primes. They are the silent, symmetric imprint of logic upon the landscape of number.

---

## Appendix A: On Formal Verification

For the reader who might wonder whether these classical arguments stand up to the unforgiving standards of modern formal logic, we have taken the liberty of verifying the main theorems of this exposition using the Lean theorem prover. This provides an unprecedented level of confidence in the logical soundness of the foundational theorems upon which this essay rests. Below is a table mapping the central concepts of our discussion to their formalizations.

| Mathematical Concept | Lean Proof | Location in EGPT Codebase |
|---|---|---|
| Uniqueness of Entropy (Uniform Case) | `RotaUniformTheorem` | `EGPT/Entropy/RET.lean:867` |
| Scaling Property for all Entropies | `RET_All_Entropy_Is_Scaled_Shannon_Entropy` | `EGPT/Entropy/RET.lean:29` |
| Logarithmic Trapping Inequality | `logarithmic_trapping` | `EGPT/Entropy/RET.lean:698` |
| Canonical Shannon Entropy | `H_canonical_ln` | `EGPT/Entropy/H.lean:34` |
| IID Particle Sources | `IIDParticleSource` | `EGPT/NumberTheory/Core.lean:29` |
| Bijection: Particle Paths to N | `equivParticlePathToNat` | `EGPT/NumberTheory/Core.lean:65` |
| Logarithmic FTA | `EGPT_Fundamental_Theorem_of_Arithmetic_via_Information` | `EGPT/NumberTheory/Analysis.lean:349` |
| Symmetry Axiom for Entropy | `IsEntropySymmetric` | `EGPT/Entropy/Common.lean:243` |
| Maximum Entropy at Uniform Dist. | `h_canonical_is_max_uniform` | `EGPT/Entropy/H.lean:642` |

*Table 1: Mapping of mathematical concepts to their Lean formalizations.*
