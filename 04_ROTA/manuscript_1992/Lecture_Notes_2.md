---
title: "Lecture Notes 2 — MIT 18.313 Problem Sets and Supplementary Materials, Spring 1993"
author: "Essam Abadir (student notes from Prof. Gian-Carlo Rota's lectures)"
date: "1993-02-01/1993-02-11"
type: lecture_notes
course: "18.313 — Introduction to Probability and Random Processes"
institution: MIT
semester: "Spring 1993"
note: "Handwritten notes, problem sets, and course material. Mix of lecture notes, homework solutions, and miscellaneous course documents (including an 18.085 Applied Mathematics syllabus and a 17.109 legal philosophy lecture). Blue ink is primary; pink/red ink indicates grading marks, corrections, and annotations."
---

# Lecture Notes 2 — MIT 18.313 Problem Sets and Supplementary Materials

These are handwritten notes, problem sets, and supplementary materials from Essam Abadir's time at MIT, primarily for Prof. Gian-Carlo Rota's course 18.313 (Introduction to Probability and Random Processes), Spring 1993.

> **Transcription note:** This PDF is a heterogeneous collection. It includes: (1) a page of famous unsolved problems discussed by Rota, (2) graded problem sets with Rota's markings, (3) a legal philosophy lecture from 17.109, (4) an 18.085 Applied Mathematics syllabus, (5) an 18.445 probability assignment, and (6) the opening lectures on probability and the Bernoulli process. Several pages are nearly blank, heavily faded, or contain only grading marks; these are noted but not fully transcribed. Page numbers below refer to the PDF page order.

---

## Famous Unsolved Problems (Rota's lecture)

**18.313** -- Rota

### Famous Unsolved Problems

**1) Hard Spheres / Probability**

Drop at random $n$ pennies into a rectangle of sides $a \times b$. Prob. no 2 pennies shall overlap?

Solved for 4; not 5.

And: 1 dimension. Needles of length $= \frac{3}{4}b$.

Stick of length $a$. Answer: $\frac{(a - nh)^n}{(a - h)^n}$

**2) Postage Stamps**

Postage stamps: how many ways can you fold so only one stamp is visible?

**3) Random Walk**

Take 4-sided die: $\uparrow \rightarrow \downarrow \leftarrow$

Move according to direction die indicates.

The problem: $\{$non-self-intersection$\}$: random walk in $n$ steps that will not return to a vertex already traced (self-avoiding).

$P_n$ = prob. that it will not return to a vertex already traced.

$\lim_{n \to \infty} \sqrt[n]{P_n}$ exists.

**4) Cell Growth**

Take die of unexposed sides; to side indicated, bump up die. New square adjacent.

**5) Percolation**

Trees in an orchard, equally spaced.

Infected tree infects each of its neighbors with prob. $p$ and dies with prob. $q = 1 - p$.

What is **critical probability**?

**6) Cluster Analysis**

Collect Data. What precise criterion for clustering?

### Geometric Probability (Sylvester's problem)

Point at random: $\text{Prob}(p \in B \mid p \in A) = \frac{\text{area } B}{\text{area } A}$

$\text{Prob}(\ell \cap B \neq \emptyset \mid \ell \cap A \neq \emptyset) = \frac{\text{perimeter } B}{\text{perimeter } A}$

**7) Brownian Motion, or the Wiener Process**

Take random walk, use smooth curve (no jumps).

### The Course

Unfair Coin $\begin{cases} \text{Bernoulli Process} \\ \text{heads } p \\ \text{tails } q \end{cases}$

$H = 1$, $T = 0$

$(H, H, T, H, T, \ldots) = (1, 1, 0, 1, 0, \ldots)$

$w \in \Omega$ = set of such sequences (sample points)

---

## Problem Set #1 (Graded)

> **Note:** This is Essam Abadir's graded PS#1 for 18.313, Prof. Rota. Grading marks in pink/red. Two T.T.'s (teaching assistants) graded the work.

### Page header

Essam Abadir, 18.313, Prof. Rota, PS #1 [circled: 98] T.T.

**P.28 #15**

a) No, the probabilities of being male and female are not independent. [checkmark]

b) Yes, the property of being male and female (married) are independent. [annotation in pink: "Why? (-2)"]

**P.28 #17**

The events that he gets the scholarships are not independent. In effect, this means that should he get the first scholarship, his chances of getting the 2nd are higher.

$P(A) = 1/2$, $P(B) = 1/4$, $P(A \cap B) \neq P(A)P(B)$ [so not independent]

**P.62 #1**

[Table of outcomes for 3 coin tosses: HHH, HHT, HTH, HTT, THH, THT, THT, THH with corresponding values listed as ordered pairs]

> *[Annotation in pink: "None of those satisfy the exclusion principles."]*

---

### PS#1 (Page 2) — Graded

[Score: 88, T.T.]

> *[Second page heavily faded; contains partial work with pink grading marks. Largely illegible.]*

[Partial visible content includes probability calculations and a pink circled grade of -10]

---

### P.62 #2

[Detailed enumeration table for two dice:]

All 36 outcomes (1,1) through (6,6) listed with box assignments showing occupation numbers for boxes 1 through 6.

Right column: P.62 #4 — occupation number table for pairs (AA through FF) with Box # and occupation # columns.

---

### P.62 #5

$$\frac{8!}{5! \cdot 2! \cdot 1! \cdot 1!} = \frac{8 \cdot 7 \cdot 6}{2 \cdot 1} = 168 \quad \checkmark$$

(4 games: wins, losses, ties)

### P.63 #6

$$\binom{10}{4} = \frac{10 \cdot 9 \cdot 8 \cdot 7}{4 \cdot 3 \cdot 2} = 210 + \binom{10}{5} + \binom{10}{6} = 672 \quad \checkmark$$

(Number of spots: after 1st six are out, if 5 in first and 5 in 2nd, if 4 in first and 6 in second)

### P.63 #10

Let $A$ be the event that no two students have the same birthdays. Let $B$ be the event that no two students have adjacent birthdays.

Then we want $A \cup B$.

$P(A) = \frac{(365)_5}{(365)^5}$, $P(B) = ?$

The two events are disjoint, so $P(A \cup B) = P(A) + P(B)$.

> *[Grade: circled -10]*

---

### P.64 #14

$$(.9)^4 + \left[(.9)^4(.1)\right] \binom{4}{1} \approx .92 \approx \text{prob he wins}$$

Assumption here is that Robin will never choose to miss unless he has hit his first four shots.

i.e., the $(.9)^4$ represents that one situation; the term $(.9)^4 \cdot (.1) \cdot \binom{4}{1}$ represents the five different ways he can hit the bull without hitting his first four shots.

### P.68 #28

Prob of 1 six on 4 throws $= 1 - (5/6)^4 = .5177469$

Prob of double six on 24 rolls $= 1 - (35/36)^{24} = .4914039$

---

## Miscellaneous: 17.109 Legal Philosophy — Hart's Response to the Rule-Skeptic

**17.109** — 2/3/93

### Hart's Response to the Rule-Skeptic

1. Response to "Extreme position" (i.e. there are no rules):
   - pure: no Holmes's prediction theory
   - a) If there are courts, there are rules

2. More moderate version: there is only one rule — defining a court.
   - Response — if rules and rules which courts
   - 2nd resp: rules not recognized will conflict, apply them
   - 3rd: response: these rules — there is a R.R. [rule of recognition]

3. No primary rules (Internal Pt. of View).

---

## Miscellaneous: 18.085 Applied Mathematics Syllabus

### 18.085 Applied Mathematics

Text: Introduction to Applied Math by G. Strang

Instructor: Lizhen Ji at room 2-269 and extension x3-3778

In this course, there will be one middle term exam and one final exam. The date of the midterm exam is around early April and the exact date will be announced in class a couple of weeks before it. Homeworks account for 15% of the final grade, the midterm exam 30% and the final 55%.

We will cover the following topics. The numbers listed after each topic are the corresponding homeworks. The homeworks are due on Mondays following the lectures.

1. Review of linear algebra and incidence matrices for graphs (1.6.9, 1.6.32, 1.6.2, 1.6.3)
2. Gaussian elimination and LU factorization (1.2.1, 1.2.4, 1.2.6)
3. Positive definite matrices (1.3.1, 1.3.3, 1.3.7)
4. Minimum principle and least square (1.4.1, 1.4.3, 1.4.5)
5. Eigenvalues and dynamical systems (1.5.1, 1.5.3, 1.5.5, 1.5.6) [annotation: 1.4, 1.1]
6. Equilibrium equations (2.1.2, 2.1.3, 2.1.6, 2.1.8)
7. Constraints and Lagrange multiplier (2.2.1, 2.2.3, 2.2.5)
8. Electrical networks (2.3.2, 2.3.3)
9. Structures in equilibrium (2.4.1, 2.4.5, 2.4.8, 2.4.15)
10. Equilibrium in the continuous case and perturbation theory (3.1.1, 3.1.3, 3.1.5, 3.1.13)
11. Differential equations and calculus of variations (3.2.1, 3.2.2, 3.2.6, 3.6.1, 3.6.2, 3.6.15)
12. Laplace equation and potential flow in dimension 2 (3.3.1, 3.3.2, 3.3.14, 3.3.17, 3.3.18)
13. Vector calculus in dimension 3 (3.4.3, 3.4.4, 3.4.5, 3.4.12)
14. Fourier series and orthogonal expansions (4.1.1, 4.1.2, 4.1.4, 4.1.5, 4.1.16, 4.1.17, 4.1.26)
15. Discrete Fourier series and convolution (4.2.1, 4.2.2, 4.2.3, 4.2.5, 4.2.11)
16. Fourier integrals (4.3.1, 4.3.2, 4.3.3, 4.3.4, 4.3.10)
17. Complex variables and the Laplace equation (4.4.1, 4.4.2, 4.4.3, 4.4.5, 4.4.7)
18. The fast Fourier transformation
19. Initial value problems for ODE and their stabilities
20. Heat equations

---

## 18.445 First Assignment (February 11, 1994)

> **Note:** This page is from a different course (18.445) and a different year (1994), but was included in the same scan.

February 11, 1994

18.445. First assignment.

Work out all the problems and write down your answers in neat form, in ink or preferably typewritten form. Each problem is worth 10 points, for a total of 100 points. Problems are marked E = easy, M = medium, H = hard.

Consider Maxwell-Boltzmann statistics, where the boxes are numbered $1, 2, \ldots, n$.

Condition the sample space so that all occupation number equal 0 or 1.

Let $X_{(1)}, X_{(2)}, \ldots, X_{(k)}$ be the number of the first, second, ..., $k$-th occupied box. Let $L_1, L_2, \ldots, L_{k+1}$, equal, respectively, $X_{(1)}$, $X_{(2)} - X_{(1)}$, $X_{(3)} - X_{(2)}$, $\ldots$, $n - X_{(k)}$ (these are the distances between successively occupied boxes).

1. M: Compute the joint distribution of any subset of $X_{(1)}, X_{(2)}, \ldots, X_{(k)}$.
2. M: Compute the joint distribution of any subset of $L_1, L_2, \ldots, L_{k+1}$.
3. M: What is the probability that no two adjacent boxes are occupied?
4. E: Compute the expectation of $X_{(1)}, X_{(2)}, \ldots, X_{(k)}$ and of $L_1, L_2, \ldots, L_{k+1}$.
5. E: Define analogous random variables for Fermi-Dirac statistics, and compute the analogous joint probabilities as in problems 1, 2, 3 and 4.
6. H: Let $Y_n$ ($n = 1, 2, 3, \ldots$) be i.i.d. random variables taking the values $\pm 1$ with probability $1/2$. What is the probability that the series $\sum Y_n / n$ converges?
7. E: State precisely the property of countable additivity of a probability function. Show by a typical example that this property is essential in computing probabilities of events.
8. E: State precisely the Borel-Cantelli lemma, and give a full proof, without omitting any detail (warning: the proof given in the notes given out in class omits several crucial details.)
9. E: Consider the following argument: The event that in tossing a fair coin the pattern 011 "ever" occurs before the pattern 100 is a tail event. Therefore, by the zero-one law, its probability is either 0 or 1. This argument is flawed. Restate it in correct form.
10. E: Give the statement and full proof of the law of large numbers. Do not omit any details (points will be taken off for details left out.)

---

## Early Lecture: The Concept of Probability (duplicate/variant)

**18.313** -- 2/1/93

> **Note:** This page appears to be a variant or clean copy of the 2/1/93 lecture that also appears in Lecture Notes 1. It covers the same material (Bernoulli sample space, concept of probability, axioms) with slightly different notation and layout. See Lecture Notes 1 for the primary transcription.

### The Concept of Probability

Bernoulli Sample Space

Biased coin: $\begin{cases} p \\ 1 - p \end{cases}$

$w = \{H, T, T, \ldots\} = \{1, 0, 0, \ldots\}$

$\{w\} = \Omega$. A sample space $\Omega$ is a set together with a family of subsets called events satisfying:

1. $\Omega$ and $\emptyset$ are events
2. If $A$ is an event $(A \Rightarrow A^c)$, its complement $A^c = \Omega \setminus A$ is also an event
3. If $A$ and $B$ are events, then so are $A \cap B$ and $A \cup B$
4. If $A_1, A_2, \ldots$ is a sequence of events, then $A_1 \cup A_2$ is also an event

A probability $P$ on a sample space $\Omega$ is a function which assigns to each event a # between 0 and 1, subject to:

1. $P(\emptyset) = 0$
2. $P(A^c) = 1 - P(A)$
3. $P(A \cup B) = P(A) + P(B) - P(A \cap B)$
4. If $A_1, A_2, \ldots$ is a sequence of events s.t. $A_i \cap A_j = \emptyset$ (for $i \neq j$), then $P(A_1 \cup A_2 \cup \cdots) = P(A_1) + P(A_2) + \cdots$

---

## Lecture: 2/3/93 (cont'd) — Bernoulli Sample Space (variant)

**18.313** -- 2/3/93

[See Lecture Notes 1 for the primary transcription of HH before TT problem.]

$P(\text{any intersection of } H$'s and $T$'s$) = p^{n_H} q^{n_T}$ where $n_H$ = no. of H's, $n_T$ = no. of T's

def: a **run** = uninterrupted sequence of 1's or 0's

(could mean more than 2: e.g. HHH)

$A$ = event that a run of HH occurs before a run TT

$P(A) = ?$

For $p = 1/2$: easy.

$P(A) = \frac{1}{2}$ since $P(A) = P(A^c)$

---

## Lecture: 2/5/93 — Finite Sample Spaces (variant)

**18.313** -- 2/5/93

### Finite Sample Spaces

[Content matches the 2/5/93 lecture in Lecture Notes 1, covering Maxwell-Boltzmann statistics, balls and boxes, occupation numbers, birthday problem, and dispositions. See Lecture Notes 1 for the primary transcription.]

Contact info noted on page: Lee McKnight, $\ell$ 40-218, x3-0985; Commute: Take $\ell$ x3-6829

### Key content from this variant:

$\Omega$ = all tosses

Basic events: $H_n$ = $n$-th toss results in $H$

If $h \neq n$: $H_h$ and $H_n$ are independent; $P(H_n) = p$; $P(H_k \cap H_n) = P(H_k) P(H_n) = p^2$

**Application:** If Bernoulli Process, events $H_n$, $T_n$ are independent for $k \neq l$

If $A$ and $B$ are independent events, then $A$ and $B^c$ are independent events:

$\text{Prob}(A \cap B^c) = P(A - A \cap B) = P(A) - P(A \cap B) = P(A) - P(A)P(B) = P(A)(1 - P(B)) = P(A)P(B^c)$

Note: this is a consequence of the axioms. We have:

If $C \subseteq A$ then $P(A - C) = P(A) - P(C)$; $P(C) + P(A - C) = P(A)$
