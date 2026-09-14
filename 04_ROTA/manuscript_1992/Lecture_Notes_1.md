---
title: "Lecture Notes 1 — MIT 18.313, Spring 1993"
author: "Essam Abadir (student notes from Prof. Gian-Carlo Rota's lectures)"
date: "1993-02-01/1993-03-10"
type: lecture_notes
course: "18.313 — Introduction to Probability and Random Processes"
institution: MIT
semester: "Spring 1993"
note: "Handwritten lecture notes, scanned. Blue ink is primary content; pink/red ink indicates annotations, corrections, and emphasis added by student. Some pages include doodles and margin notes unrelated to the lecture content."
---

# Lecture Notes 1 — MIT 18.313, Spring 1993

These are handwritten lecture notes taken by Essam Abadir during Prof. Gian-Carlo Rota's course 18.313 (Introduction to Probability and Random Processes) at MIT, Spring 1993. The notes span from February 1 through March 10, 1993.

> **Transcription note:** These notes are handwritten on lined notebook paper in blue and pink/red ink. Mathematical notation has been faithfully transcribed into LaTeX. Where handwriting is ambiguous, best-effort interpretation is noted. Pink/red annotations appear to be corrections, emphasis, or later additions by the student. Several pages are blank and have been omitted. Page numbers in circled numerals (e.g., (2)) indicate continuation pages for a given lecture date.

---

## Lecture: 2/1/93 — The Concept of Probability

**18.313** — 2/1/93

### The Concept of Probability

**Bernoulli Sample Space**

Biased coin: $\begin{cases} p \\ 1-p \end{cases}$

$$w = \{H, T, T, \ldots\} = \{1, 0, 0, \ldots\}$$

$\{w\} = \Omega$ — A sample space $\Omega$ is a set together with a family of subsets called events satisfying:

1. $\Omega$ and $\emptyset$ are events
2. If $A$ is an event ($A \Rightarrow A^c$), its complement $A^c = \Omega \setminus A$ is also an event
3. If $A$ and $B$ are events, then so are $A \cap B$ and $A \cup B$
4. If $A_1, A_2, \ldots$ is a sequence of events, then $A_1 \cup A_2 \cup \cdots$ is also an event

A **probability** $P$ on a sample space $\Omega$ is a function which assigns to each event a number between 0 and 1, subject to:

1. Prob. of $\emptyset$ is zero: $P(\emptyset) = 0$
2. Prob. of the complement of an event is $1 -$ prob: $P(A^c) = 1 - P(A)$
3. $P(A \cup B) = P(A) + P(B) - P(A \cap B)$
4. If $A_1, A_2, \ldots$ is a sequence of events s.t. $A_i \cap A_j = \emptyset$ (for $i \neq j$), then $P(A_1 \cup A_2 \cup \cdots) = P(A_1) + P(A_2) + \cdots$

Two events $A$ and $B$ (in a given sample space) are said to be **independent** when $P(A \cap B) = P(A) P(B)$.

Three events $A$, $B$, $C$ are **independent** when:
- $P(A \cap B \cap C) = P(A) P(B) P(C)$
- $P(A \cap B) = P(A) P(B)$
- $P(A \cap C) = P(A) P(C)$
- etc.

Similarly for more than 3 events.

### Example 0: Picking a point at random in the unit square

1st: Define events
2nd: Identify prob. of events

Find event where the prob. is obvious, by applying rules 1, 2, 3, 4.

Area of strip is $\ell$, i.e. $P(\text{strip band}) = \ell$ (horizontal or vertical).

$P(\text{rect. } R \text{ of sides } a \text{ and } b) = a \cdot b$

$P(R \cup C) = P(R) + P(C) - P(R \cap C)$

$P(A \cap B) = R$, so $P(R) = P(A) P(B) = \ell \cdot \ell'$

The events $C$ and $D$ are independent since $P_C = (x, y)$: $C$ function of $x$ and $D$ function of $y$.

---

## Lecture: 2/3/93 — Bernoulli Sample Space

**18.313** — 2/3/93

**Probability = Probability function**

$$P(\bigcup_i A_i) = \sum_i P(A_i) \quad \text{(for disjoint events)} = P(A_1) \cup P(A_2) \cup \cdots$$

### Bernoulli Sample Space

$\Omega$ = all tosses

Basic events: $H_n$ = $n$-th toss results in $H$

If $h \neq n$, $H_h$ and $H_n$ are independent; $P(H_n) = p$; $P(H_k \cap H_n) = P(H_k) P(H_n) = p^2$

$A$ = event that a run HH occurs before a run TT

$P(A) = ?$

$A = (H_1 \cap H_2) \cup (H_1 \cap T_2 \cap H_3 \cap H_4) \cup (T_1 \cap H_2 \cap H_3) \cup \cdots$

**More elegant method:** $A$

$A_n$ = event that in $(w_n, w_{n+1}, \ldots)$, i.e. $w = (w_1, w_2, \ldots, w_n, w_{n+1}, \ldots)$

$$A = (A \cap H_1) \cup (A \cap T_1) \quad \text{(*)}$$

$A \cap H_1 = (H_1 \cap H_2) \cup (H_1 \cap T_2 \cap A_3)$; $\quad A \cap T_1 = (T_1 \cap H_2 \cap A_3) \cup T_1 \cap H_2 \cap A_2$

$= T_1 \cap H_2 \cap A_2$

$P(A \cap T_1) = q \cdot P(H_2 \cap A_2)$

$P(A \cap H_1) = p^2 + p \cdot q \cdot P(T_2 \cap A_3)$

Observe that $P(H_n \cap A_n) = P(H_1 \cap A)$; $P(T_n \cap A_n) = P(T_1 \cap A_1)$

Therefore: $P(A \cap H_1) = p^2 + pq \cdot P(H_1 \cap A)$

$$P(A \cap H_1) = \frac{p^2}{1 - pq}$$

$$\begin{cases} P(A \cap T_1) = \frac{qp^2}{1-pq} \\ P(A) = p^2 + qp^2 \end{cases}$$

$P(\text{neither HH occurs before TT nor TT occurs before HH})$

$B$: $P(B) = ?$

$B = H_1 \cap T_2 \cap H_3 \cap T_4 \cap \cdots \cup (T_1 \cap H_2 \cap T_3 \cap \cdots)$

$$\lim_{n \to \infty} P(H_1 \cap T_2 \cap H_3 \cap \cdots \cap T_{2n}) = \lim_{n \to \infty} p^n q^n = 0 \implies P(B) = 0$$

### Example: The Uniform Sample Space

$[0, 1]$ — pick a point at random

Elementary events $[a, b]$ and $P([a,b]) = b - a$, $0 \leq a < b \leq 1$

$A$ = event that the chosen number is rational, i.e. $\frac{m}{n}$ where $m, n$ are integers.

$[a, a] \Rightarrow \{a\}$; $P([a,a]) = 0$; $\{r_1, r_2, \ldots\}$ = set of all rational numbers

$P(A) = P(r_1) + P(r_2) + \cdots = 0 + 0 + \cdots = 0 \quad (P(A) = 0)$

---

## Lecture: 2/5/93 — Finite Sample Spaces

**18.313** — 2/5/93

### Finite Sample Spaces

$\Omega$ = finite no. of sample spaces

Every subset is an event, and if $P(w)$ is given for every sample pt. $w \in \Omega$, then for every event $A$ we have:

$$P(A) = \sum_{w \in A} P(w)$$

### 1) Maxwell-Boltzmann Statistics (sample space)

Sample points: functions from $B$ to $U$

$\Omega = \{w = \text{function from } B \text{ to } U\}$

$|\Omega| = n^k$

$P(w) = \frac{1}{n^k}$; if boxes are labeled $1, 2, \ldots, n$

For every $w$ we set $\theta_i(w)$ = no. of balls in $i$-th box

$\sum_{i=1}^{n} \theta_i(w) = k$

$\theta_1, \ldots, \theta_n$ = occupation numbers.

Number of one-to-one functions from $B$ to the set $U$: $(n)_k = n(n-1)(n-2)\cdots(n-k+1)$, $n \geq 1$

**Example:** $A$ = event that no two out of $k$ people have the same birthday.

$$P(A) = \frac{(365)_k}{(365)^k}$$

$A$ = event that a $k$-letter word shall not repeat

### How many balls in each box?

Event: $P(\theta_1 = i_1, \theta_2 = i_2, \ldots, \theta_n = i_n) = \frac{1}{n^k} \binom{k}{i_1, i_2, \ldots, i_n}$ — multinomial coefficient

$r! = 1 \cdot 2 \cdot 3 \cdots r = (r)_r$

$\frac{1}{n^k} \cdot \frac{k!}{i_1! i_2! \cdots i_n!}$ if $i_1 + i_2 + \cdots + i_n = k$, 0 otherwise (always take the limiting case)

Note: $0! = 1$

**Stars and bars / stoppers method:**

Boxes separated by stoppers, $n - 1$ stoppers, size of each box is $i_1, i_2, \ldots$

Rearrange ball and stopper. Why? Because we don't care about order of balls in boxes. Hence we divide by $i_1, i_2, \ldots$

### Sample Space of Dispositions

Ways to place balls in boxes where order counts (per box)

$\ldots k$ balls, $n$ boxes

$|\Omega_D| = ? = n(n+1)(n+2)\cdots(n+k-1) = \langle n \rangle_k$ — rising factorial

Proof by method of stoppers: each ball added can be viewed as an extra stopper. Each successive ball has one more option than the one before.

---

## Lecture: 2/8/93 — Finite Sample Spaces (cont'd): Dispositions, Maxwell-Boltzmann Statistics

**18.313** — 2/8/93

### Finite Sample Spaces cont'd: Dispositions, Maxwell-Boltzmann Statistics etc.

$\Omega_D$ = dispositions of $k$ balls into $n$ boxes

$\Omega_{MB}$ = $k$ balls into $n$ boxes (functions)

$$|\Omega_{MB}| = n^k, \quad P_{MB}(w) = \frac{1}{n^k}$$

$$|\Omega_D| = \langle n \rangle_k = n(n+1) \cdots (n+k-1)$$

$$P_D(w) = \frac{1}{\langle n \rangle_k}$$

### Example: 2 balls into 3 boxes

$\langle n \rangle_k$ dispositions, $k = 2$, $n = 3$

$\langle 3 \rangle_2 = 3 \cdot (3+1) = 12$

### Maxwell-Boltzmann Statistics

Example: 2 balls into 3 boxes: $n^k$, $n = 3$, $k = 2$: $3^2 = 9$ [checkmark]

---

### (Page 2) — 2/8/93

**18.313** — 2/8/93

$k$ balls into $n$ boxes

**Example (Dispositions):** $k$ balls with 7 in first position, 5 in second position, $k - 12$ remaining.

$$\frac{k!}{\langle n \rangle_k} \qquad \binom{k}{7, 5, k-12} / n^k$$

> *[Annotation in pink: "Mistake on this problem"]*

### Example: Balls in boxes

$C$ = event that box 1 is empty

$B$ = event that box 1 is empty (in MB)

$P_{MB}(B) = \frac{(n-1)^k}{n^k} = P_{MB}(B)$

**Dispositions:**

$$\frac{\langle n-1 \rangle_k}{\langle n \rangle_k} = \frac{n(n+1)\cdots(n+k-1)}{n(n+1)\cdots(n+k-1)}$$

$$\therefore P(C) = \frac{(n-1)}{(n+k-1)}$$

$\frac{n-1}{n} = \sqrt[k]{P_{MB}(B)}$

$(1 - \frac{1}{n})^k$ — [annotation: "Poisson"]

---

## Lecture: 2/8/93 (cont'd) — Bose-Einstein Statistics

### Bose-Einstein Statistics

$\Omega_{BE}$: as many checks as balls in boxes

$\theta_1, \theta_2, \theta_3, \ldots, \theta_n$ — $n$ boxes

**Example:** Boxes are variables, call them $x_1, x_2, \ldots, x_n$

$\Omega_{BE}$ = all monomials of total degree $k$ made with the variables $x_1, \ldots, x_n$

e.g. $x_1^3, x_2^5, x_4^2$ — $10 = k$, $4 = n$

$$|\Omega_{BE}| = ? = \frac{\langle n \rangle_k}{k!}$$

Prob. of placing $k$ balls into $n$ boxes with given occupation numbers is:

$$\frac{1}{\langle n \rangle_k / k!}$$

**Example:** Toss 2 dice. $A$ = event that 7 shows.

---

## Lecture: 2/10/93 — Bose-Einstein and Fermi-Dirac Statistics

**18.313** — 2/10/93

### Finite Sample Spaces: Bose-Einstein and Fermi-Dirac Statistics

**Bose-Einstein:** sampling with replacement

$k$ kinds of balls, $n$ boxes

Multiset: set where elements can be repeated.

$\{a, b, c, a, b, a\}$ — $k$ elements

Not a set, a multiset.

Boxes are elements, checks are multiplicity of those elements.

Warning: cannot take union of multisets.

$\Omega_{BE}$ has $\binom{n}{k}$ sample points — multiset coefficients

$$\left\langle \binom{n}{k} \right\rangle = \frac{\langle n \rangle_k}{k!} = \frac{n(n+1)(n+2)\cdots(n+k-1)}{k!}$$

$$\frac{1}{(1-x)^n} = \sum_{i=0}^{\infty} \left\langle \binom{n}{i} \right\rangle x^i$$

$$\left\langle \binom{n}{k} \right\rangle = (-1)^k \binom{-n}{k}$$

**Fermi-Dirac:** sampling without replacement

$k$ kinds of balls, $n$ boxes, and all $\theta_i \in \{0, 1\}$

$\Omega_{FD}$ has $\binom{n}{k}$ sample points

i.e. $\binom{n}{k} = \binom{n}{k, n-k}$

$$\Rightarrow \frac{n!}{k!(n-k)!} = (n)_k / k! \quad \text{divide by } k!$$

since there are $k!$ permutations of these balls in boxes.

**Model #1** — picking a subset (Kellers etc.)

**Model #2** — boxes are fruitflies, test one and count dies (sampling with/without replacement)

$$(1+x)^n = \sum_{i=0}^{n} \binom{n}{i} x^i$$

### Back to Dice — MB

$A$ = event that they add to 7

$P_{MB}(A)$: (1,6), (2,5), (3,4) — each twice = 6/36 = 1/6

$P_{BE}(A) = \frac{3}{\langle 6 \rangle_2 / 2!} = \frac{3}{21} = \frac{1}{7}$

---

## Lecture: 2/10/93 (cont'd) — Random Variables

### Random Variables — Integer Random Variables on a sample space $\Omega$

Example: Bernoulli Sample Space $\Omega_B$, $w = (H, T, H, H, T, \ldots)$

$W$ = waiting time for the first head (H)

$P(W = n) = q^{n-1}p$

$W(w)$ = certain value, no. $1, 2, \ldots$

> A random variable $X$ is a function defined on a sample space with the property that taking integer values and $(X = n)$ is an event.

If $X$ is an integer random variable on a sample space $\Omega$, then the events $(X = n)$ are disjoint for different $n$'s. Furthermore, $\bigcup_n (X = n) = \Omega \implies \sum_n P(X = n) = P(\Omega) = 1$.

$P(X = n) = p_n$ — the sequence $p_n$ is the **probability distribution** of the integer random variable.

---

### (Page 2) — 2/10/93

$$\sum_n p_n = 1, \quad p_n \geq 0$$

$P(W = n) = p_n = q^{n-1}p$, $n > 0$; $P(W = n) = 0$ if $n \leq 0$

$$\sum_{n>0} q^{n-1}p = 1 = p \sum_{n \geq 0} q^{n-1} = p \cdot \frac{1}{1-q} = \frac{p}{p} = 1$$

---

## Lecture: 2/22/93 — Random Variables (Cont'd)

**18.313** — 2/22/93 [*Note: likely 2/22 not 2/21, matching the weekly schedule*]

### Random Variables (Cont'd)

$X$ is an integer random variable when $(X = n)$ is an event for every integer $n$.

**The probability distribution** of $X$ is the sequence:

$p_n = P(X = n)$; $\sum_n p_n = 1$

Two R.V.'s $X$ and $Y$ are **independent** when the events $(X = n)$ and $(Y = k)$ are independent for all integers $n$ and $k$, i.e. when:

$$P((X = n) \cap (Y = k)) = P(X = n) P(Y = k)$$

**Notation:** $P = (X = n, Y = n)$ [*i.e. joint probability notation*]

**Example:** Bernoulli. $X_i$ and $X_j$ are independent for $i \neq j$.

$$X_i = \begin{cases} 1 & \text{if } i\text{-th toss is a success} \\ 0 & \text{failure} \end{cases}$$

$V_i = T_i$, $T_n$ = gap between $(n-1)$-st and $n$-th success

$W_k = T_1 + T_2 + \cdots + T_k$. The R.V.'s $T_i$ and $T_j$ are independent.

**Proof:** $P((T_1 = n) \cap (T_2 = k)) = q^{n-1}p \cdot q^{k-1}p$; $P(T_1 = n) = q^{n-1}p$; $P(T_2 = k) = q^{k-1}p$.

$Z, Y$ = Random Variables. $P(Z = n) \cap (Y = k) = M_{nk}$ = joint distribution of the R.V.'s $Z$ and $Y$.

$P(Z = n) = p_n$, $P(Y = k) = q_k$. We have:

$$P(Z = n) = \sum_k M_{nk} = \sum_k P((Z = n) \cap (Y = k)) = P(\bigcup_k ((Z = n) \cap (Y = k)))$$

$$= P((X = n) \cap (\bigcup_k (Y = k))) = P(Z = n), \text{ as desired}$$

Similarly, $q_k = \sum_n M_{nk}$

If $X$ and $Y$ are independent, then $M_{nk} = p_n \cdot q_k$.

---

### (Page 2) — 2/22/93

**Example: MB**

$\Omega_{MB}$: Joint distribution of $\theta_1$ and $\theta_2$

$$P(\theta_1 = 2, \theta_2 = j) = \binom{k}{2, j, k-2-j} \frac{(n-2)^{k-2-j}}{n^k}$$

$$P(\theta_1 = 2) = \binom{k}{2} \frac{(n-1)^{k-2}}{n^k}$$

$$\sum_{j=0}^{k} P(\theta_1 = 2, \theta_2 = j) = P(\theta_1 = 2)$$

**Explicitly:**

$$\sum_j \binom{k}{2, j, k-2-j} \frac{n^{-2}}{n^k} = \binom{k}{2} \frac{(n-1)^{k-2}}{n^k}$$

$$\binom{k}{2, j, k-2-j} = \binom{k}{j} \binom{k-j}{2}$$

$$\Rightarrow \sum_j \binom{k}{2} \binom{k-2}{j} \frac{(n-2)^{k-2-j}}{n^k} = \binom{k}{2} \sum_j \binom{k-2}{j} \frac{(n-2)^{k-2-j}}{n^k}$$

$$= \binom{k}{2} \cdot \frac{(n-2+1)^{k-2}}{n^k}$$

---

### Joint Distributions in MB and Dispositions

**$\Omega_{MB}$** — Joint distribution of $\theta_1, \theta_2, \ldots, \theta_n$:

$$P(\theta_1 = i_1, \theta_2 = i_2, \ldots, \theta_n = i_n) = \binom{k}{i_1, i_2, \ldots, i_n} \frac{1}{n^k}$$

**$\Omega_D$:**

$$P(\theta_1 = i_1, \ldots, \theta_n = i_n) = \frac{k!}{\langle n \rangle_k} = \frac{1}{\left\langle \binom{n}{k} \right\rangle}$$

---

### Interesting fact about falling and rising factorials

$$(m+n)_{i+j} = \sum_{i+j=r} \binom{i+j}{i} (m)_i (n)_j = \sum_{i+j=r} \binom{r}{i} (m)_i (n)_j$$

$$(m+n)^r = \sum_{i+j=r} \binom{r}{j} (m^i)(n^j) \implies \text{Binomial Thm.}$$

---

## Lecture: 2/22/93 (cont'd, p.2) — Bose-Einstein Joint Distribution

**$\Omega_{BE}$** — Joint distribution of $\theta_1$ and $\theta_2$:

$$P(\theta_1 = i, \theta_2 = j) = \frac{\left\langle \binom{n-2}{k-i-j} \right\rangle}{\left\langle \binom{n}{k} \right\rangle}; \quad P(\theta_1 = i) =$$

$$\Rightarrow = \frac{\binom{n-1}{k-i}}{\left\langle \binom{n}{k} \right\rangle}$$

$$\sum_j \frac{\left\langle \binom{n-2}{k-i-j} \right\rangle}{\left\langle \binom{n}{k} \right\rangle} = \frac{\left\langle \binom{n-1}{k-i} \right\rangle}{\left\langle \binom{n}{k} \right\rangle}$$

**$\Omega_D$** — again $\theta_1$ and $\theta_2$:

$$P(\theta_1 = i, \theta_2 = j) = \binom{k}{i, j, k-i-j} i! \cdot j! \cdot \frac{\langle n-2 \rangle_{k-i-j}}{\langle n \rangle_k}$$

$$= \binom{k}{i+j} (i+j)! \cdot \frac{\langle n-2 \rangle_{k-i-j}}{\langle n \rangle_k}$$

$$P(\theta_1 = i) = \binom{k}{i} i! \cdot \frac{\langle n-1 \rangle_{k-i}}{\langle n \rangle_k}$$

$$\Rightarrow \sum_j \binom{k}{i, j, k-j-i} i! j! \cdot \langle n-2 \rangle_{k-i-j}$$

---

## Lecture: 2/24/93 — Expectation of Random Variables

**18.313** — 2/24/93

### Expectation of Random Variables

$X$ = integer R.V. $\implies p_n = P(X = n)$

$E(X) = \langle X \rangle = \sum_n n \cdot p_n = \sum_n n \cdot P(X = n)$ — also called the **mean**

### Fundamental Fact:

$$E(X + Y) = E(X) + E(Y)$$

**Proof:**

$$E(X + Y) = \sum_n n \cdot P(X + Y = n)$$

Because they are disjoint: $(X + Y = n) = \bigcup_{i+j=n} (X = i) \cap (Y = j)$, or integer code: add all parallel lines

$$= \sum_n \sum_{i+j=n} P((Z = i) \cap (Y = j))$$

$$= \sum_n \sum_{i+j=n} (i+j) P((Z = i) \cap (Y = j))$$

$$= \sum_i \sum_j i \cdot P((X = i) \cap (Y = j)) + \sum_i \sum_j j \cdot P((Z = i) \cap (Y = j))$$

$$= \sum_i i \cdot \sum_j P((Z = i) \cap (Y = j)) + \sum_j j \cdot \sum_i P((Z = i) \cap (Y = j))$$

$$= \sum_i i \cdot P(Z = i) + \sum_j j \cdot P(Y = j) = E(X) + E(Y), \text{ as desired}$$

### Example: $E(\theta_1)$ in $\Omega_{MB}$

Hard way: $P(\theta_1 = i) = \binom{k}{i} \frac{(n-1)^{k-i}}{n^k}$

$\implies E(\theta_1) = \sum_{i=0}^{k} i \cdot P(\theta_1 = i) = \sum_{i=0}^{k} i \binom{k}{i} \frac{(n-1)^{k-i}}{n^k}$

$\theta_1$ and $\theta_2$ are **identically distributed**.

---

### Identically Distributed Random Variables

Have the same expectation: $E(\theta_1) = E(\theta_2) = E(\theta_3) =$ etc.

(e.g. Bernoulli trials)

$$E(\theta_1 + \theta_2 + \cdots + \theta_n) = E(\theta_1) + E(\theta_2) + \cdots + E(\theta_n) \quad \text{by basic fact}$$

$X = \theta_1 + \theta_2 + \cdots + \theta_n$, $P(X = k) = 1$, $P(X = i) = 0$ if $i \neq k$

$E(X) = k \cdot P(X = 1) = k$

$E(\theta_1) + \cdots + E(\theta_n) = k$

$n \cdot E(\theta_i) = k \implies E(\theta_i) = \frac{k}{n}$

Even in BE where we have $E(\theta_i) = \frac{k}{n}$ [annotation: "QED!"]

### Bernoulli:

$E(X_n) = 1 \cdot P(X_n = 1) + 0 \cdot P(X_n = 0) = p$

$S_n = X_1 + X_2 + \cdots + X_n$ = no. successes in first $n$ trials

$E(S_n) = E(X_1) + E(X_2) + \cdots + E(X_n) = np = \sum_{i=0}^{n} \binom{n}{i} \cdot i \cdot p^i q^{n-i}$

$E(W) = \sum_{i \geq 0} i \cdot P(W = i) = \sum_{i \geq 0} i \cdot q^{i-1} p = ? = p \cdot \frac{1}{(1-q)^2} = \frac{p}{p^2} = \frac{1}{p}$

**Hard way:**

$\sum_{i \geq 0} q^{i-1} = 1 + q + q^2 + \cdots = \frac{1}{1-q}$

$\implies \sum_{i \geq 0} q^{i-2} = 1 + q + q^2 + \cdots = \frac{1}{1-q} \implies \frac{d}{dq} \sum_{i \geq 0} i \cdot q^{i-1} = \frac{d}{dq} \frac{1}{1-q} = \frac{1}{(1-q)^2}$

---

### (Page 2) — 2/24/93

$W_k$ = waiting time for $k$-th success

$T_n$ = gap between $(n-1)$-st and $n$-th success

$W_k = T_1 + T_2 + \cdots + T_k$

**Crucial Remark:** $T_n$ and $T_m$ are identically distributed. $P(T_n = i) = q^{i-1}p$

$$E(W_k) = E(T_1) + E(T_2) + \cdots + E(T_k) = \frac{k}{p}$$

---

## Lecture: 2/26/93 — The Inclusion-Exclusion Principle

**18.313** — 2/26/93

### The Inclusion-Exclusion Principle

$X$ = integer r.v. with prob. distribution $p_n = P(X = n)$

$E(X) = \sum_n n \cdot p_n$; $E(X + Y) = E(X) + E(Y)$

### Indicator Random Variable (simplest type there is)

$$I_A = \begin{cases} 1 & \text{if } A \text{ happens} \\ 0 & \text{if } A \text{ doesn't happen} \end{cases}$$

$$I_A(w) = \begin{cases} 1 & \text{if } w \in A \\ 0 & \text{if } w \notin A \end{cases}$$

$$E(I_A) = \sum_n n \cdot P(I_A = n) = 1 \cdot P(I_A = 1) + 0 \cdot P(I_A = 0) = P(A)$$

Properties:

1. $I_{A \cap B} = I_A \cdot I_B$

2. $I_{A \cup B} = I_A + I_B - I_A I_B = 1 - (1 - I_A)(1 - I_B)$

3. $I_{A^c} = 1 - I_A$

From (2) + (3): $I_{A \cup B} = 1 - I_{A^c} \cdot I_{B^c}$

Follows from $(A \cup B)^c = A^c \cap B^c \implies$ for $A_1, A_2, \ldots, A_n$: $(A_1 A_2 \cdots A_n)^c = A_1^c A_2^c \cdots A_n^c$

$$1 - I_{A_1 \cup A_2 \cup \cdots \cup A_n} = (1 - I_{A_1})(1 - I_{A_2}) \cdots (1 - A_n)$$

$$I_{A_1 \cup A_2 \cup \cdots \cup A_n} = 1 - (1 - I_{A_1})(1 - I_{A_2}) \cdots (1 - I_{A_n})$$

$$= \sum_{i=1}^{n} I_{A_i} - \sum_{i<j} I_{A_i} \cdot I_{A_j} + \sum_{i<j<k} I_{A_i} I_{A_j} I_{A_k} + \cdots$$

Taking expectations:

$$P(A_1 \cup A_2 \cup \cdots \cup A_n) = \sum_{i=1}^{n} P(A_i) - \sum_{i<j} P(A_i \cap A_j) + \sum_{i<j<k} P(A_i \cap A_j \cap A_k) - \cdots + P(A_1 \cap A_2 \cdots A_n)$$

---

### The Inclusion-Exclusion Principle (formal statement)

$$P(A_1 \cup A_2 \cup A_3) = P(A_1) + P(A_2) + P(A_3)$$
$$- P(A_1 \cap A_2) - P(A_1 \cap A_3) - P(A_2 \cap A_3)$$
$$+ P(A_1 \cap A_2 \cap A_3)$$

### Example: Two decks of cards

Two decks of cards, place them down on the table (cards #1-2000) into two decks.

? Prob. in turning over cards that two will be identical. Show same $A$.

$P(1), P(2), \ldots, P(n)$ — each $P(i)$ is a "permutation of $n$"

**Problem:** Prob. that a random permutation of a set of $n$ elements has at least 1 fixpoint.

$A_i$ = event that permutation $P(i) = i$ (this is a fixpoint). $P(A_i) = \frac{(n-1)!}{n!} = \frac{1}{n}$

$P(A_i \cap A_j) = \frac{(n-2)!}{n!} = \frac{1}{n(n-1)}$

$$? = P(A_1 \cup A_2 \cup \cdots \cup A_n) = \sum P(A_i) - \cdots$$

$$= 1 - \binom{n}{2} \frac{1}{n(n-1)} + \binom{n}{3} \frac{1}{n(n-1)(n-2)} - \cdots$$

$$= 1 - \frac{n(n-1)}{2!} \cdot \frac{1}{n(n-1)} + \frac{n(n-1)(n-2)}{3} \cdot \frac{1}{n(n-1)(n-2)} \cdots$$

$$= 1 - \frac{1}{2!} + \frac{1}{3!} - \frac{1}{4!} + \frac{1}{5!} - \cdots + \frac{1}{n!}$$

---

### (Page 2) — 2/26/93

Recall $e^x = 1 + x + \frac{x^2}{2!} + \frac{x^3}{3!} + \frac{x^4}{4!}$

$x = -1$: $\frac{1}{e} = 1 - 1 + \frac{1}{2!} - \frac{1}{3!} + \frac{1}{4!} - \frac{1}{5!} + \cdots$

$$1 - \frac{1}{e} = 1 - \frac{1}{2!} + \frac{1}{3!} - \frac{1}{4!} + \frac{1}{5!} \approx P(A_1 \cup \cdots \cup A_n)$$

For $n > 4$, good to 3 decimals. For all practical purposes is constant.

### Example: MB

$P((\theta_1 > 0) \cap \cdots \cap (\theta_n > 0))$

$(\theta_1 > 0) \cap \cdots \cap (\theta_n > 0)^c = (\theta_1 = 0) \cup (\theta_2 = 0) \cup (\theta_3 \geq 0) \cup \cdots \cup (\theta_n = 0)$

Let $A_1, A_2, \ldots, A_n$ be these events.

$$\sum_{i=0}^{n} P(\theta_i = 0) - \sum_{i<j} P((\theta_i = 0) \cap (\theta_j = 0)) + \cdots$$

where $P(\theta_i = 0) = \frac{(n-1)^k}{n^k} = (1 - \frac{1}{n})^k$

$P((\theta_i = 0) \cap (\theta_j = 0)) = \frac{(n-2)^k}{n^k}$

$$= \left(\binom{n}{1}(n-1)^k - \binom{n}{2}(n-2)^k + \binom{n}{3}(n-3)^k - \cdots\right) / n^k$$

---

## Lecture: 3/10/93 — Joint Densities of Continuous Random Variables

**18.313** — 3/10/93

### Joint Densities of Continuous Random Variables

$X, Y$ = continuous R.V.

$$\int \int \text{dens}(X = t, Y = s) \, dt \, ds = P((a \leq X \leq b) \cap (c \leq Y \leq d))$$

> *[Annotation: "infinitesimal prob."]*

$\text{dens}(X(t) = t, X(2) = s) \, dt \, ds$

$$= (0, 1, 0, 1, n-2) \cdot \frac{dt}{a} \cdot \frac{ds}{a} \cdot \frac{(a-s)^{n-2}}{a^{n-2}}$$

> *[Annotation: "infinitesimal — small box allows you to look at the constraint that only 1 ball falls into infinitesimally small box"]*

**Indistinguishable worlds = Order statistics**

### The Algebra of Random Variables

$X$ = continuous R.V. with density $\text{dens}(X = t) = f(t)$

$2X$ has what density? Well, cumulative probability distribution of $2X$ is $P(2X \leq t)$

but $(2X \leq t) = (X \leq \frac{t}{2}) = P(X \leq \frac{t}{2})$

$$F(t) = \int_{-\infty}^{t} f(s) \, ds = P(X \leq t)$$

$$\text{dens}(2X = t) = \frac{d}{dt} F\left(\frac{t}{2}\right) = F'\left(\frac{t}{2}\right) \cdot \frac{1}{2} = f\left(\frac{t}{2}\right) \cdot \frac{1}{2}$$

$$\int_{-\infty}^{\infty} \frac{1}{2} f\left(\frac{t}{2}\right) dt = 1$$

---

### (Page 2) — 3/10/93

### Application to Expectation

$$E(g(X)) = \int_{-\infty}^{\infty} g(t) \cdot \text{dens}(X = t) \, dt$$

$\text{dens}(g(X) = s) = h(s)$; $E(g(X)) = \int_{-\infty}^{\infty} t \cdot h(t) \, dt$ — these always give the same answer.

$$E(Y) = \int_{-\infty}^{\infty} t \cdot \text{dens}(Y = t) \, dt$$

$\Rightarrow \text{dens}(X = t) = f(t)$

$X^n$ for $n \geq 0$: $\text{dens}(X^n = t) = ?$

$P(X^n \leq t) = P(X \leq \sqrt[n]{t}) = F(\sqrt[n]{t})$

$$\text{dens}(X^n = t) = \frac{d}{dt} F(\sqrt[n]{t}) = F'(\sqrt[n]{t}) \cdot \frac{1}{n} t^{1/n - 1} = \frac{1}{n} t^{\frac{1-n}{n}} f(\sqrt[n]{t})$$

$\text{dens}(X^n = t) = \frac{1}{n} t^{\frac{1}{n}} f(\sqrt[n]{t})$ [*cleaned up*]

$$E(X^n) = \int_0^{\infty} t \cdot \text{dens}(X^n = t) \, dt = \int_0^{\infty} t \cdot \frac{1}{n} t^{\frac{1-n}{n}} \cdot f(\sqrt[n]{t}) \, dt$$

$$= \int_0^{\infty} u^n f(u) \, du = \int_0^{\infty} t^n \cdot \text{dens}(X = t) \, dt$$

### Example: $X \geq 0$ continuous

$\text{dens}(X = t) = f(t) = 0$ if $t < 0$

$\text{dens}(X^2 = s) = ?$, $P(X^2 \leq s)$

Cumulative probability distribution: $(X^2 \leq s) = (X \leq +\sqrt{s})$

$F(t) = \int_{-\infty}^{t} f(u) \, du$

$$\Rightarrow \frac{d}{ds} P(X^2 \leq s) = \text{dens}(X^2 = s)$$

$$= \frac{d}{ds} F(\sqrt{s}) = F'(\sqrt{s}) \cdot \frac{1}{2\sqrt{s}} = f(\sqrt{s}) \cdot \frac{1}{2\sqrt{s}}$$

$$\int_0^{\infty} f(\sqrt{s}) \frac{1}{2\sqrt{s}} \, ds = \int_0^{\infty} f(u) \, du = 1$$

with $u = \sqrt{s}$, $du = \frac{1}{2\sqrt{s}} ds$
