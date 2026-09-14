---
title: "Chapter VIII: Entropy and Information"
author: "Gian-Carlo Rota"
edition: "1992"
chapter_number: 8
egpt_relevance: "Foundation for the Rota Entropy Theorem — central to EGPT"
---

# Chapter VIII: Entropy and Information

That probability is closely connected with information should come as no surprise after problems such as exercise V.5 (the jailer paradox). What entropy does is to make this connection precise. In section 1, we discuss entropy for finite-valued random variables. In the next section we give a dramatic application of the law of large numbers to information theory: the Shannon Coding Theorem. Finally in section 3, we turn to the case of continuous random variables and prove that essentially all the interesting distributions we have seen in probability theory may be defined by entropy considerations.

## 1. Discrete Entropy

We will start by defining entropy for integer random variables taking only finitely many values. Later in a step-by-step procedure, we will extend the concept to continuous random variables.

### Partitions

A random variable is said to be a **finite-valued random variable** if it takes finitely many values. For example, $S_n$ in the Bernoulli process is finite-valued since it can only take on values from 0 to $n$.

If $X$ is a finite-valued random variable whose values are $1, 2, 3, \ldots, n$ then $X$ determines the events $(X=1), (X=2), \ldots, (X=n)$. Moreover, every outcome of $\Omega$ is in exactly one of these events. We call this situation a **partition** of $\Omega$.

In general, a partition $\pi$ of $\Omega$ is a collection of nonempty events $B_1, B_2, \ldots, B_n$ called the **blocks** of $\pi$ such that:

(a) no two blocks intersect,

(b) every sample point is in some block, i.e.

$$\bigcup_i B_i = \Omega.$$

The only difference between a random variable $X$ and a partition is that a random variable consists not only of a partition but also of a label (the value $X$ takes on that block) for each block. The partition $\pi(X)$ defined by $X$ is the partition whose blocks are $(X=1), (X=2), \ldots, (X=n)$, i.e. $\pi(X)$ is obtained by ignoring the particular labels that $X$ attaches to the events it defines.

More generally suppose that we have a number of finite valued random variables $X_1, \ldots, X_r$. The smallest events that one can define by these random variables are the events

$$(X_1 = i_1) \cap (X_2 = i_2) \cap \cdots \cap (X_r = i_r),$$

and any event definable by the random variables $X_1, \ldots, X_r$ is necessarily a union of some of the above events. The partition whose blocks are the above events is called the **(joint) partition** $\pi(X_1, \ldots, X_r)$ defined by $X_1, \ldots, X_r$. The partition $\pi(X_1, \ldots, X_r)$ is related to the partitions $\pi(X_1), \pi(X_2), \ldots, \pi(X_r)$ by means of the operation on partitions called the **meet**. In general if $\sigma$ and $\tau$ are two partitions, whose blocks are $C_1, C_2, \ldots, C_s$ and $D_1, D_2, \ldots, D_m$ respectively, then the meet of $\sigma$ and $\tau$, written $\sigma \wedge \tau$, is the partition whose blocks are $C_i \cap D_j$ whenever they are nonempty. In terms of the meet,

$$\pi(X_1, X_2, \ldots, X_r) = \pi(X_1) \wedge \pi(X_2) \wedge \cdots \wedge \pi(X_r).$$

As the joint distribution of random variables determines everything about their "correlation" so the joint partition of a set of partitions determines their correlation. In particular, it is easy to see that independence of random variables is really a property of the partitions defined by them. Let $\sigma$ and $\tau$ be two partitions. We say $\sigma$ and $\tau$ are **independent** if and only if

$$P(C \cap D) = P(C)P(D)$$

for all blocks $C$ of $\sigma$ and $D$ of $\tau$. When $\sigma$ and $\tau$ are independent we can display the sample space $\Omega$ as a "checkerboard" whose rows are blocks of $\tau$, whose columns blocks of $\sigma$, and such that the "area" is proportional to the probability.

The meet is the analog for partitions of the intersection of sets. There is a whole algebra of partitions analogous to that for sets. For example, there is an analog of set union called the **join** of partitions and written $\sigma \vee \tau$. We leave it as an exercise to decide how this ought to be defined. We will not have need of this particular operation.

Another notion from set theory is that of subset, and its analog for partitions will be very important for us. We say that a partition $\sigma$ with blocks $C_1, C_2, \ldots, C_s$ is **finer** than a partition $\tau$ with blocks $D_1, D_2, \ldots, D_m$ if every block $C_i$ of $\sigma$ is contained in some block $D_j$ of $\tau$. We write $\sigma \leq \tau$ for this relation. If $X$ and $Y$ are finite-valued random variables, then $\pi(X) \leq \pi(Y)$ means that an observation of $X$ is sufficient to determine anything one might ask about $Y$. The technical term for this relation is that $X$ is a **sufficient statistic** for $Y$. More generally, if $X_1, X_2, \ldots, X_n$ are a collection of finite-valued random variables such that $\pi(X_1, \ldots, X_n)$ is finer than $\pi(Y)$, we say that $X_1, X_2, \ldots, X_n$ is **sufficient** for $Y$. In practice one often finds that in a particular experiment one wants the value of $Y$ but that the random variables one actually measures form a sequence $X_1, X_2, \ldots$. If for some $n$, $X_1, X_2, \ldots, X_n$ is sufficient for $Y$, then one can in principle compute $Y$ from the measurements of the X's. One also says that $X_1, \ldots, X_n$ **code** for $Y$.

### Entropy

The reason for introducing partitions is that the "information content" of a finite-valued random variable $X$ is a property of the collection of events defined by $X$ and not by the particular labels $X$ happens to assign to these events. We now make this precise. The **entropy** of a partition $\pi$ whose blocks are the events $B_1, B_2, \ldots, B_n$ is defined by

$$H_2(\pi) = \sum_i P(B_i)\log_2\!\left(\frac{1}{P(B_i)}\right),$$

where by convention $0 \cdot \log_2(0)$ is defined to be 0. The **entropy of a finite-valued random variable** $X$ is the entropy of its partition:

$$H_2(X) = H_2(\pi(X)).$$

We remark that $\log_2$ could be replaced by $\log_b$ for any base $b > 0$. The only effect on $H_b(\pi)$ is to multiply by the scale factor $\log_b(2)$, i.e. we merely alter the units in which the entropy is measured. The use of $\log_2$ is traditional. In this case we say that $H_2(\pi)$ is measured in **bits**. More generally we will write $H_b(\pi)$ for $\sum P(B_i)\log_b\!\left(\frac{1}{P(B_i)}\right)$. If we use $H(\pi)$ without a subscript we mean that the base $b$ should be taken to be $e$, the base of the natural logarithms. We say that $H(\pi)$ is measured in **nats** (natural digits).

Consider the example of tossing a biased coin with bias $p$, i.e. consider a partition consisting of one or two blocks. If $p$ is 1, then we know for certain that the coin will always show heads. In this case $H_2(X) = 0 \cdot \log_2(q) + 1 \cdot \log_2(p) = 0$. Entropy zero corresponds to total certainty. Now suppose that $p$ is somewhat less than 1. The toss is now somewhat less predictable, and we find that the entropy is a small positive number. As $p$ decreases, the entropy gradually increases, reaching a maximum when $p = \frac{1}{2}$. For a fair coin $H_2(X) = \frac{1}{2}\log_2(2) + \frac{1}{2}\log_2(2) = \frac{1}{2} + \frac{1}{2} = 1$ bit. Finally, as $p$ decreases from $\frac{1}{2}$ to 0, the entropy again decreases to zero; for now the toss is becoming increasingly predictable.

More generally suppose that $\pi$ has $n$ blocks. Shannon proved that $H(\pi)$ takes its maximum value precisely when all $n$ outcomes are equally likely. In this case the entropy is $H_2(\pi) = \log_2(n)$ bits or $H(\pi) = \ln(n)$ nats. We will now prove this. All of our later characterizations of distributions having maximum entropy rely on the same basic technique we will use in this case. The key fact is this inequality:

> **Basic logarithmic inequality:**
> $$\ln(u) \leq u - 1 \quad \text{for all } u > 0 \quad \text{and} \quad \ln(u) = u - 1 \text{ if and only if } u = 1.$$

This fact is easy to prove using Calculus: $f(u) = \ln(u) - u + 1$ has derivative $f'(u) = \frac{1}{u} - 1$, so $f'(u) > 0$ for $u < 1$ and $f'(u) < 0$ for $u > 1$, i.e. $f(u)$ takes its maximum value at $u = 1$.

Now compare $H(\pi)$ to $\ln(n)$ using the above inequality:

$$H(\pi) - \ln(n) = \sum_{i=1}^{n} P(B_i)\left[\log\!\left(\frac{1}{P(B_i)}\right) - \ln(n)\right]$$

$$= \sum_{i=1}^{n} P(B_i)\ln\!\left(\frac{1}{nP(B_i)}\right)$$

$$\leq \sum_{i=1}^{n} P(B_i)\left(\frac{1}{nP(B_i)} - 1\right)$$

$$= \sum_{i=1}^{n} \frac{1}{n} - \sum_{i=1}^{n} P(B_i)$$

$$= 1 - 1 = 0.$$

The fact that the probabilities of the $n$ blocks add up to 1, $\sum_{i=1}^{n} P(B_i) = 1$, is used twice above: in the first equality and in the second last one. In any case we find that if $\pi$ has $n$ blocks then $H(\pi) \leq \ln(n)$.

When is equality possible? In our derivation of $H(\pi) \leq \ln(n)$, equality can fail in only one of the steps:

$$\ln\!\left(\frac{1}{nP(B_i)}\right) \leq \frac{1}{nP(B_i)} - 1$$

for all $i$. Now the basic logarithmic inequality tells us that this will be an equality if and only if $\frac{1}{nP(B_i)} = 1$ for all blocks, i.e. $P(B_i) = \frac{1}{n}$ for all $i$. This completes our proof.

When $X$ has a partition $\pi$ all of whose blocks have the same probability, we say that $X$ is **completely random** or **totally random**, although this is not quite the best terminology. One should really say that $X$ has **maximum uncertainty**. (Equivalently, the measurement of $X$ gives one the maximum information about the outcome of an experiment, of any random variable having the same number of outcomes.) It is unfortunate that it has become standard terminology to describe such random variables as being simply "random." For example, one often says "choose a card at random" rather than "choose a card completely at random," as if there were no other way to choose a card from a deck. In fact most "random" shuffles of a deck are far from being completely random (see exercise 4); as a result, choosing a card or dealing a hand is not totally random and the probabilities computed in exercise III.4 would seldom be achieved in an actual game. On the other hand, the terminology suggests that they are. This is the price one pays for using a vague, imprecise language to describe probabilistic concepts.

### Properties of Entropy

So far we have discussed examples of the entropy of some random variables. Although these examples provide some motivation for our definition of entropy they leave unanswered the basic question of why this formula and not some other is the one we use to define entropy. We will now consider why our formula is the only possible one. We will do this by finding five self-evident properties that ought to hold for any reasonable measure of information (or entropy). It then turns out that our definition of entropy is the only one that satisfies all these properties.

We begin with the most obvious of properties. As we have defined it, $H$ is a function of partitions of the sample space. However, it should be clear that we want $H$ to depend only on the set of probabilities of the blocks of the partition. In fact, we want $H$ to depend only on the positive probabilities which occur. Moreover, we want $H$ to be a continuous function of these probabilities. This is a convenience only. We could, with a great deal of effort, derive continuity from other more complex conditions; but we would rather concentrate on the important issues. We summarize the conditions on $H$ we have just described before going on to the difficult question of conditional entropy.

> **Entropy property 1.** An entropy is a function defined on sets $\{p_1, p_2, \ldots, p_n\}$ of non-negative real numbers, which satisfy $p_1 + p_2 + \cdots + p_n = 1$.

> **Entropy property 2.** If $H$ is an entropy function, then for any set $\{p_1, p_2, \ldots, p_n\}$ on which $H$ is defined, $H$ satisfies:
> $$H(p_1, p_2, \ldots, p_n, 0) = H(p_1, p_2, \ldots, p_n).$$
> In other words, $H$ depends only on the nonzero $p_i$'s in a given set.

> **Entropy property 3.** An entropy function is continuous.

The next property of entropy we consider requires the concept of **conditional entropy**. There are two ways to think of conditional entropy, and the fact that they are equivalent is our next property of entropy. To illustrate the ideas involved, we consider the following simple weighing problem. We have three coins, some of which may be counterfeit (but not all). Counterfeit coins are distinguishable from normal coins by the fact that they are lighter. We are given a balance scale, and we wish to find out which, if any, of the coins are counterfeit. The sample space for this problem consists of seven sample points, one for each possible set of good coins. We denote them as follows:

$$\Omega = \{1, 2, 3, 12, 13, 23, 123\}.$$

Now what happens when we put the first two coins on each side of the scale? The sample space is partitioned into three blocks corresponding to the three possible outcomes of the weighing: $\sigma = \{12, 123, 3\}, \{2, 23\}, \{1, 13\}$. After recording the result of this weighing, we then place the second and third coins on the two sides of the scale. The result of this second weighing is to partition each of the blocks of the first weighing:

$$\{12, 123, 3\} \text{ becomes } \{12\}, \{123\}, \{3\}$$

$$\{2, 23\} \text{ becomes } \{2\}, \{23\}$$

$$\{1, 13\} \text{ becomes } \{1\}, \{13\}.$$

The combined information of the two weighings is represented by the partition into seven blocks, each with one sample point. Call this partition $\pi$. Conditional entropy is concerned with the effect of the second weighing, given that the first has occurred. One way to analyze this is to look at each block $\sigma_i$ of the partition of the first weighing and to analyze the situation as if it were the whole sample space. In general, for an event $A$ and a partition $\tau$ we define the **conditional entropy of $\tau$ given $A$**, written $H(\tau | A)$, to be the entropy of the partition $\tau_1 \cap A, \tau_2 \cap A, \ldots$ that $\tau$ induces on $A$. Thus in the above weighing problem we have three conditional entropies, one for each possible outcome of the first weighing: $H(\pi | \sigma_1)$, $H(\pi | \sigma_2)$ and $H(\pi | \sigma_3)$. The **conditional entropy of $\pi$ given $\sigma$** is then defined to be the average of these. More precisely, if $\pi$ and $\sigma$ are any two partitions of a sample space $\Omega$ such that $\pi$ is finer than $\sigma$, we define the conditional entropy of $\pi$ given $\sigma$ to be the average value of $H(\pi | \sigma_i)$ over all blocks $\sigma_i$ of $\sigma$:

$$H(\pi | \sigma) = \sum_i P(\sigma_i)\, H(\pi | \sigma_i).$$

On the other hand, we would like to think of information as a "quantity" that increases as we ask more and more questions about our experiment. Therefore, the conditional entropy of $\pi$ given $\sigma$ ought to be the net increase in entropy from $\sigma$ to $\pi$. In other words, we require our entropy function to satisfy:

> **Entropy property 4.** If $\pi$ is a finer partition than $\sigma$, then
> $$H(\pi | \sigma) = H(\pi) - H(\sigma).$$

The last property we require is one that we have already discussed. The partition having maximum entropy among all partitions with a given number of blocks is the one for which all the blocks have the same probability.

> **Entropy property 5.** If $H$ is an entropy function, then for any set $\{p_1, p_2, \ldots, p_n\}$ on which $H$ is defined, $H$ satisfies:
> $$H(p_1, p_2, \ldots, p_n) \leq H\!\left(\frac{1}{n}, \frac{1}{n}, \ldots, \frac{1}{n}\right).$$

We are now ready for the following remarkable fact: if $H$ satisfies the above five properties, then $H$ is given by the formula introduced earlier in this chapter, except for a possible scale change.

> **Uniqueness of Entropy.** If $H$ is a function satisfying the five properties of an entropy function, then there is a constant $C$ such that $H$ is given by:
> $$H(p_1, p_2, \ldots, p_n) = C\sum_i p_i \log_2\!\left(\frac{1}{p_i}\right).$$

**Proof.** The proof is rather technical, so we suggest omitting it on the first reading, returning to it later. We first apply property 4 to the partition consisting of just one block: $\Omega$ itself. By definition $H(\Omega | \Omega)$ is the same as $H(\Omega)$. Therefore, $H(\Omega) = H(\Omega) - H(\Omega) = 0$.

We now define a function $f(n)$ by $f(n) = H\!\left(\frac{1}{n}, \frac{1}{n}, \ldots, \frac{1}{n}\right)$. We have just shown that $f(1) = 0$ and we want to calculate $f(n)$ in general. Using properties 2 and 5, we show that $f(n)$ is increasing:

$$f(n) = H\!\left(\frac{1}{n}, \ldots, \frac{1}{n}\right) = H\!\left(\frac{1}{n}, \ldots, \frac{1}{n}, 0\right) \leq H\!\left(\frac{1}{n+1}, \ldots, \frac{1}{n+1}\right) = f(n+1).$$

Next we consider a partition $\sigma$ consisting of $n^{k-1}$ blocks each of which has probability $\frac{1}{n^{k-1}}$. Then subdivide each of these into $n$ parts, each of which has the same probability. Call the resulting partition $\pi$. The conditional entropy $H(\pi | \sigma_i)$ for each block $\sigma_i$ is clearly given by $f(n)$. Thus the conditional entropy $H(\pi | \sigma) = f(n)$. By property 4, $f(n) = H(\pi | \sigma) = H(\pi) - H(\sigma) = f(n^k) - f(n^{k-1})$. Therefore, if we apply this fact $k$ times, we obtain: $f(n^k) = kf(n)$.

Now fix two positive integers $n$ and $k$. Since the exponential function is an increasing function, there is an integer $b$ such that: $2^b \leq n^k \leq 2^{b+1}$. We now apply the two facts about $f(n)$ obtained above to this relation:

$$f(2^b) \leq f(n^k) \leq f(2^{b+1})$$

$$bf(2) \leq kf(n) \leq (b+1)f(2).$$

Now divide these inequalities by $kf(2)$:

$$\frac{b}{k} \leq \frac{f(n)}{f(2)} \leq \frac{b+1}{k}.$$

Now apply the increasing function $\log_2$ to the inequalities $2^b \leq n^k \leq 2^{b+1}$. This gives that $b \leq k\log_2(n) \leq b+1$. If we divide these by $k$ we obtain:

$$\frac{b}{k} \leq \log_2(n) \leq \frac{b+1}{k}.$$

It follows that both $\frac{f(n)}{f(2)}$ and $\log_2(n)$ are in the interval $\left[\frac{b}{k}, \frac{b+1}{k}\right]$. This implies that $\frac{f(n)}{f(2)}$ and $\log_2(n)$ can be no farther apart than $\frac{1}{k}$, the length of this interval. But $n$ and $k$ were arbitrary positive integers. So if we let $k$ get very large, we are forced to conclude that $\frac{f(n)}{f(2)}$ coincides with $\log_2(n)$. Thus for positive integers $n$, we have:

$$f(n) = f(2)\log_2(n).$$

We will define the constant $C$ to be $-f(2)$. Since $f(2) > f(1) = 0$, we know that $C$ is negative.

We next consider a set $\{p_1, p_2, \ldots, p_n\}$ of positive rational numbers such that $p_1 + p_2 + \cdots + p_n = 1$. Let $N$ be their common denominator, i.e. $p_i = \frac{a_i}{N}$ for all $i$, where each $a_i$ is an integer and $a_1 + a_2 + \cdots + a_n = N$. Let $\sigma$ be a partition corresponding to the set of probabilities $\{p_1, p_2, \ldots, p_n\}$. Let $\pi$ be a partition obtained by breaking up the $i$th block of $\sigma$ into $a_i$ parts. Then every block of $\pi$ has probability $\frac{1}{N}$. By definition of conditional entropy, $H(\pi | \sigma_i) = f(a_i)$ and

$$H(\pi | \sigma) = \sum_i p_i\, H(\pi | \sigma_i) = \sum_i p_i\, f(a_i) = -C\sum_i p_i\log_2(a_i).$$

By property 4, on the other hand, we have:

$$H(\pi | \sigma) = H(\pi) - H(\sigma) = f(N) - H(\sigma) = -C\log_2(N) - H(\sigma).$$

Combining the two expressions for $H(\pi | \sigma)$ gives us:

$$H(\sigma) = -C\log_2(N) + C\sum_i p_i\log_2(a_i)$$

$$= C\left[-\sum_i p_i\log_2(N) + \sum_i p_i\log_2(a_i)\right]$$

$$= C\sum_i p_i(\log_2(a_i) - \log_2(N))$$

$$= C\sum_i p_i\log_2(p_i).$$

By continuity (property 3), $H$ must have this same formula for all sets $\{p_1, p_2, \ldots, p_n\}$ on which it is defined. This completes the proof. $\square$

We leave it as an exercise to show that the above formula for entropy actually satisfies the five postulated properties. We conclude by giving an interpretation of independence of partitions in terms of conditional entropy. Intuitively if $\pi$ and $\sigma$ are independent then their joint entropy $H(\pi \wedge \sigma)$ is the sum of the individual entropies: $H(\pi) + H(\sigma)$. In terms of conditional entropy, this says that $H(\pi \wedge \sigma | \sigma) = H(\pi)$.

## 2. The Shannon Coding Theorem

A consequence of Entropy property 4 of the last section is that if we wish to answer a question $X$ by means of a sequence of questions $S_1, S_2, \ldots, S_n$, the joint entropy of $S_1, S_2, \ldots, S_n$ must be at least as large as the entropy of $X$, and hence the sum of the entropies of the $S_i$'s must be at least as large as the entropy of $X$. In particular, if the $S_i$'s are yes-no questions, then $H_2(S_i) \leq 1$ and we get the crude inequality $n \geq H_2(X)$. The problem of finding a set of sufficient statistics for a random variable $X$ is called the **coding problem** for $X$, and the sequence $S_1, S_2, \ldots, S_n$ is said to **code** $X$. As we will see in the exercises, the kinds of questions one may ask are usually restricted to some class of questions. Devising particular codes is a highly nontrivial task.

One of the reasons that coding is so nontrivial in general is that one is usually required to answer a whole sequence of questions $X_1, X_2, \ldots$ produced by some process, and as a result one would like to answer the questions in the most efficient way possible. Consider one example. Suppose that $X$ takes value 0 with probability 0.85 and takes values 1 through 200 each with probability $7.5 \times 10^{-4}$. Then $H_2(X)$ is less than 1. Simply by counting one can see that at least 8 yes-no questions will be needed to achieve a sufficient statistic for $X$, even though the entropy suggests that one should be able to determine $X$ with a single yes-no question.

Shannon's Theorem states that for any finite-valued random variable $X$, it is possible to encode efficiently a sequence of independent copies of $X$ provided that:

(1) one encodes a block $X_1, X_2, \ldots, X_n$ all at one time,

(2) one is willing to accept a small probability of error, $\varepsilon > 0$, that a block is incorrectly coded, such that $\varepsilon$ can be made arbitrarily small.

Since one frequently encounters sequences of random variables in actual practice, it is not unreasonable to encode them in blocks. The small probability of error is also acceptable since it can be made arbitrarily small. Consider for example the random variable $X$ mentioned in the preceding paragraph. Since $H_2(X) < 1$, Shannon's Theorem says that there is a block size $n$ such that a sequence of $n$ independent copies of $X$, $X_1, \ldots, X_n$, can be encoded with a sequence of $n$ yes-no questions $S_1, \ldots, S_n$. Consider that the sequence of $X_i$'s can take one of $201^n$ values, while the sequence of $S_i$'s takes on at most $2^n$ possible values and you will begin to appreciate Shannon's Theorem.

We must first make precise the idea that a sequence of random variables "almost" codes for another sequence. Let $X_1, \ldots, X_n$ and $S_1, \ldots, S_r$ be two sequences of random variables. We say that $S_1, \ldots, S_r$ is **almost sufficient** for $X_1, \ldots, X_n$ **with confidence** $1 - \varepsilon$ if there is an event $A$ such that

(1) $P(A) = 1 - \varepsilon$

(2) $S_1|A, \ldots, S_r|A$ is sufficient for $X_1|A, \ldots, X_n|A$, where $X_i|A$ is the random variable $X_i$ conditioned by the occurrence of $A$.

Put another way, condition (2) says that the joint partition $\pi(S_1) \wedge \cdots \wedge \pi(S_r)$ when restricted to $A$ is finer than $\pi(X_1) \wedge \cdots \wedge \pi(X_n)$ when restricted also to $A$.

> **Shannon's Coding Theorem.** Let $X_1, X_2, \ldots$ be a sequence of independent equidistributed finite-valued random variables such that $H_2(X_i) = h$. For any $\varepsilon > 0$ no matter how small and any $\delta > 0$ no matter how small, there is an integer $N$ such that for any block size $n \geq N$, one can find a sequence $S_1, S_2, \ldots, S_{\lceil hn + \delta n \rceil}$ of $\lceil hn + \delta n \rceil$ random variables each taking two values, which is almost sufficient for $X_1, X_2, \ldots, X_n$ with confidence $1 - \varepsilon$.

The confidence $1 - \varepsilon$ represents the probability that the $S_i$'s are able to code for a particular sequence of values of $X_1, X_2, \ldots, X_n$. The expression $\lceil hn + \delta n \rceil$ stands for the smallest integer larger than $hn + \delta n$. Finally, by entropy considerations we know that at least $\lceil nh \rceil$ $S$'s will be needed to code for $X_1, X_2, \ldots, X_n$. The additional $\delta n$ $S$'s represent an extra set of $S$'s beyond those required by entropy, but they can be chosen to be as small a fraction of the total set of $S$'s as we please.

**Proof.** One begins by defining a sequence of random variables $Y_1, Y_2, \ldots$ by decreeing that if $X_i$ takes value $n$ then $Y_i$ takes value $P(X_i = n)$. For example, if $X_i$ took values $1, \ldots, n$ each with probability $\frac{1}{n}$ then $Y_i$ would take value $\frac{1}{n}$ with probability 1.

These random variables have two properties we need. The first is that the $Y_i$'s are independent. This is an immediate consequence of the fact that the $X_i$'s are so. The second fact is that the expected value of $\log_2(1/Y_i)$ is $h$, the entropy of $X_i$. To see this we simply compute:

$$E\!\left(\log_2\!\left(\frac{1}{Y_i}\right)\right) = \sum_n \log_2\!\left(\frac{1}{P(X_i = n)}\right) P(X_i = n) = H_2(X_i) = h,$$

since $\log_2(1/Y_i)$ takes value $\log_2(1/P(X_i = n))$ when $X_i = n$.

The sequence $\log_2\!\left(\frac{1}{Y_1}\right), \log_2\!\left(\frac{1}{Y_2}\right), \ldots$ is a sequence of independent equidistributed random variables each with mean $h$. By the Law of Large Numbers,

$$P\!\left(\lim_{n \to \infty} \frac{\log_2\!\left(\frac{1}{Y_1}\right) + \log_2\!\left(\frac{1}{Y_2}\right) + \cdots + \log_2\!\left(\frac{1}{Y_n}\right)}{n} = h\right) = 1.$$

Now $\log_2\!\left(\frac{1}{Y_1}\right) + \log_2\!\left(\frac{1}{Y_2}\right) + \cdots + \log_2\!\left(\frac{1}{Y_n}\right) = \log_2\!\left(\frac{1}{Y_1 Y_2 \cdots Y_n}\right)$. Therefore,

$$P\!\left(\lim_{n \to \infty} \frac{1}{n}\log_2\!\left(\frac{1}{Y_1 Y_2 \cdots Y_n}\right) = h\right) = 1.$$

This says that for $n$ large enough the expression $\frac{1}{n}\log_2\!\left(\frac{1}{Y_1 Y_2 \cdots Y_n}\right)$ will be as close to $h$ as we please with as high a probability as we please. The probability we want is $1 - \varepsilon$, and we want $\frac{1}{n}\log_2\!\left(\frac{1}{Y_1 Y_2 \cdots Y_n}\right)$ to be within $\delta$ of $h$ with this probability:

$$P\!\left(\left|\frac{1}{n}\log_2\!\left(\frac{1}{Y_1 Y_2 \cdots Y_n}\right) - h\right| \leq \delta\right) \geq 1 - \varepsilon.$$

As one might expect, the event $A$ in the definition of a set of almost sufficient statistics will be the above event:

$$A = \left\{\left|\frac{1}{n}\log_2\!\left(\frac{1}{Y_1 Y_2 \cdots Y_n}\right) - h\right| \leq \delta\right\}$$

$$= \left\{-n\delta \leq \log_2\!\left(\frac{1}{Y_1 Y_2 \cdots Y_n}\right) - nh \leq n\delta\right\}.$$

Exponentiating every term in the above pair of inequalities preserves the inequalities so

$$A = \left\{2^{-nh-n\delta} \leq Y_1 Y_2 \cdots Y_n \leq 2^{-nh+n\delta}\right\}.$$

We are now ready for the crucial step in the proof. We count how many blocks of the joint partition $\pi(X_1) \wedge \pi(X_2) \wedge \cdots \wedge \pi(X_n)$ are contained in the event $A$. Suppose that there are $r$ such blocks; call them $B_1, B_2, \ldots, B_r$. Each of these blocks is of the form $(X_1 = i_1) \cap (X_2 = i_2) \cap \cdots \cap (X_n = i_n)$. If we sum the probabilities of all such events we get 1:

$$\sum_{\text{all } (i_1,\ldots,i_n)} P((X_1 = i_1) \cap (X_2 = i_2) \cap \cdots \cap (X_n = i_n)) = 1.$$

Since the $X_i$'s were assumed to be independent, this means that

$$\sum_{\text{all } (i_1,\ldots,i_n)} P(X_1 = i_1)\, P(X_2 = i_2) \cdots P(X_n = i_n) = 1.$$

Now each of the above factors is, by definition, the value that the corresponding $Y_i$ takes.

If we sum just over those blocks contained in $A$ we find that

$$\sum_{j=1}^{r} Y_1 Y_2 \cdots Y_n \leq 1,$$

each $Y_i$ taking the value appropriate to the block $B_j$. But for these blocks we know that $Y_1 Y_2 \cdots Y_n \geq 2^{-nh-n\delta}$. Hence

$$r \cdot 2^{-nh-n\delta} \leq \sum_{j=1}^{r} Y_1 Y_2 \cdots Y_n \leq 1,$$

or that $r \leq 2^{nh+n\delta}$,

i.e. there are fewer than $2^{nh+n\delta}$ blocks in $A$.

We are now ready to code the random variables $X_1, X_2, \ldots, X_n$. Number the blocks in $A$ in binary using $\lceil nh + n\delta \rceil$ binary digits starting with $00\ldots01$ and ending with at most $11\ldots11$. Note that because $r < 2^{nh+n\delta}$, we will have at most $2^{\lceil nh+n\delta \rceil} - 1$ blocks in $A$. We assign the binary number $00\ldots00$ to all blocks outside $A$.

The random variable $S_i$ is defined to be the $i$th digit of the block in which the outcome occurs. By definition $S_1, S_2, \ldots, S_{\lceil nh+n\delta \rceil}$, when restricted to $A$, are sufficient for $X_1, X_2, \ldots, X_n$ when restricted to $A$. When all the $S_i$'s take the value 0, we are unable to determine the values of $X_1, X_2, \ldots, X_n$, but when the $S_i$'s take any other set of values, we can compute all the values of $X_1, X_2, \ldots, X_n$. This completes the proof. $\square$

### The Shannon Channel Coding Theorem

The usual form in which one sees this theorem is called the **Shannon Channel Coding Theorem**. The problem here is to transmit information through a noisy channel. The channel we consider is called the **Binary Symmetric Channel**. Each bit of information one transmits through the BSC is either left alone or changed. The probability that it is changed is $p$, the same for all bits, and each bit is altered or not independently of the others. The BSC is equivalent to the Bernoulli process, coin tossing, with bias $p$. Transmission through the BSC proceeds as follows. A message $k$ bits long is first sent through an encoder where it is changed into a string of $n$ bits. This string of bits is then transmitted through the BSC to a decoder that converts the received $n$ bits into a string of $k$ bits, which we hope is the same as the original message.

$$\text{Bob} \to \boxed{\text{encoder}} \to \text{BSC} \to \boxed{\text{decoder}} \to \text{Alice}$$

The problem is to design the encoder and decoder so that the probability of error per transmitted bit is smaller than some preassigned value and so that the redundancy $\frac{n-k}{n}$ is as small as possible. Equivalently, we want the rate of transmission $\frac{k}{n}$ to be as high as possible.

We may think of the noise as a sequence of Bernoulli random variables $X_1, X_2, \ldots, X_n$ that are added to the signal. Let $h = H_2(X_i) = p\log_2\!\left(\frac{1}{p}\right) + q\log_2\!\left(\frac{1}{q}\right)$. Then the input signal plus the noise constitute a total entropy of $k + nh$ bits. The decoder can ask at most $n$ questions about the data it receives, since it receives just $n$ bits of data. From these $n$ questions it must determine both the noise and the original signal, hence $k + nh \leq n$. Put another way, the decoder may ask just $n - k$ questions in order to determine the noise and eliminate it. Thus $k + nh \leq n$ or $n - nh \geq k$. Hence $1 - h \geq \frac{k}{n}$. This says that the rate of communication through the BSC can never be greater than $1 - h$. One calls $1 - h$ the **capacity** of the channel.

> **The Shannon Channel Coding Theorem** says that for any rate $r$ less than the channel capacity $1 - h$ it is possible to choose $k$ and $n$ so that $\frac{k}{n} > r$ and to design an encoder and decoder so that the (average) probability of error per message bit is as small as we please. The proof is very similar to the proof we just gave for the Shannon Coding Theorem.

## 3. Continuous Entropy

We now consider what entropy means for continuous random variables. The concepts in this case are by no means as self-evident as in the case of a finite-valued random variable.

### Relative Entropy

The most obvious way to begin is to try to "finitize." Let $X$ be a continuous random variable taking values in some finite interval. For simplicity take this interval to be $[0,a]$. Now exactly as in Calculus, we partition (or sub-divide) this interval into $n$ blocks $B_1, B_2, \ldots, B_n$. The $i$th block is the subinterval $\left[\frac{(i-1)a}{n}, \frac{ia}{n}\right)$. Define a new random variable $Y_n$ that takes value $\frac{(i-1)a}{n}$ whenever $X$ takes a value in the block $B_i$. We call $Y_n$ the **$n$th truncation** of $X$. We show why we use this name by means of an example. Suppose that $a = 1$ and that $n = 1000$. Now imagine that we perform our experiment and that the outcome $X$ is $0.1415926\ldots$ The value of $Y_{1000}$ in this case would be $0.141000\ldots$, i.e. we truncate the value of $X$ to 3 decimal places. Clearly the truncation of $X$ will be better and better approximations to $X$ as $n \to \infty$. Moreover the truncations are finite-valued random variables.

One might add that in practice one always uses a truncation in an actual experiment. It is only in our idealized mathematical models that one can speak of an arbitrary real number.

Now compute the entropy of $Y_n$. By definition of $Y_n$,

$$P\!\left(Y_n = \frac{(i-1)a}{n}\right) = P\!\left(\frac{(i-1)a}{n} \leq X < \frac{ia}{n}\right) = F\!\left(\frac{ia}{n}\right) - F\!\left(\frac{(i-1)a}{n}\right),$$

where $F(t)$ is the probability distribution of $X$. Thus

$$H(Y_n) = \sum_{i=1}^{n} \left[F\!\left(\frac{ia}{n}\right) - F\!\left(\frac{(i-1)a}{n}\right)\right] \ln\!\left(\frac{1}{F\!\left(\frac{ia}{n}\right) - F\!\left(\frac{(i-1)a}{n}\right)}\right).$$

The crucial step in the computation is the mean value theorem of Calculus: if $F$ is differentiable on the interval $[s,t]$, then for some $x$ between $s$ and $t$

$$F'(x)(t-s) = F(t) - F(s).$$

We apply this to each block $B_i$. Each block has length $\frac{a}{n}$ so

$$H(Y_n) = \sum_{i=1}^{n} f(x_i)\frac{a}{n}\ln\!\left(\frac{1}{f(x_i)\frac{a}{n}}\right)$$

$$= \sum_{i=1}^{n} f(x_i)\frac{a}{n}\ln\!\left(\frac{1}{f(x_i)}\right) + \sum_{i=1}^{n} f(x_i)\frac{a}{n}\ln(n/a),$$

where each $x_i$ is some point in the block $B_i$. If we write $f(t) = F'(t)$ for the density of $X$, then the first term above is

$$\sum_{i=1}^{n} f(x_i)\frac{a}{n}\ln\!\left(\frac{1}{f(x_i)}\right).$$

This is just the Riemann sum for our partition of $[0,a]$. So as $n \to \infty$ this approaches

$$\int_0^a f(x)\ln\!\left(\frac{1}{f(x)}\right)dx.$$

Next consider the second term above. We may write this as

$$\ln(n/a) \sum_{i=1}^{n} f(x_i)\frac{a}{n}.$$

Except for the factor $\ln(n/a)$ we would have a Riemann sum for $\int_0^a f(x)\,dx = 1$. However the factor $\ln(n/a)$ means that as $n \to \infty$,

$$H(Y_n) \to \int_0^a f(x)\ln\!\left(\frac{1}{f(x)}\right)dx + \ln(n) - \ln(a).$$

So as $n \to \infty$, $H(Y_n) \to \infty$.

The difficulty is easily seen. As we partition $[0,a]$ into finer and finer blocks, the random variable $Y_n$ is taking an enormous number of values, some fraction of which are roughly equally likely. This is an artifact of our subdivision process and ought to be eliminated. We do this by measuring not the absolute entropy of $Y_n$ but rather the difference between the entropy of $Y_n$ and the maximum possible entropy of a random variable taking $n$ values. We call this the **relative entropy** of $Y_n$:

$$\text{Relative entropy of } Y_n = H(Y_n) - \ln(n).$$

In other words, instead of measuring how far $Y_n$ is from being completely certain, we measure how close $Y_n$ is to being completely random. For finite-valued random variables these two ways of measuring entropy are equivalent, but when we take the limit as $n \to \infty$, only the relative entropy converges. We therefore define:

$$\text{Relative entropy of } X = \lim_{n \to \infty}(\text{relative entropy of } Y_n)$$

$$= \int_0^a f(x)\ln\!\left(\frac{1}{f(x)}\right)dx - \ln(a).$$

For this notion of entropy, the case of total randomness will be represented by a relative entropy of zero. Less uncertain random variables will have a negative relative entropy. Continuous random variables can have arbitrarily large negative entropy: complete certainty is impossible for continuous random variables.

Which continuous random variables will have entropy zero? In other words, what is the continuous analogue of the equally likely probability distribution? To answer this we proceed as we did for finite-valued random variables. Let $X$ be any continuous R.V. taking values in $[0,a]$. Then the relative entropy of $X$ is

$$\int_0^a f(x)\ln\!\left(\frac{1}{f(x)}\right)dx - \ln(a) = \int_0^a f(x)\ln\!\left(\frac{1}{f(x)}\right)dx - \ln(a)\int_0^a f(x)\,dx$$

$$= \int_0^a f(x)\ln\!\left(\frac{1}{af(x)}\right)dx$$

$$\leq \int_0^a f(x)\left(\frac{1}{af(x)} - 1\right)dx$$

$$= \int_0^a \frac{1}{a}\,dx - \int_0^a f(x)\,dx$$

$$= 1 - 1 = 0.$$

Now the logarithmic inequality tells us that the above inequality is an equality if and only if $\frac{1}{af(x)} = 1$ or $f(x) = \frac{1}{a}$. In other words, the maximum entropy occurs precisely when $X$ has the **uniform distribution** on $[0,a]$.

### Boltzmann Entropy

The notion of relative entropy is fine for random variables taking values in a finite interval, but most continuous random variables we have seen do not have this property. The most natural way to try to extend entropy to arbitrary continuous random variables is to use a limiting process similar to what we used for extending entropy from finite-valued random variables to finite-interval random variables. We will do this first for positive random variables before going on to the general case.

Let $T$ be a positive continuous random variable (i.e. $P(T \leq 0) = 0$). For $a > 0$, we define the **restriction** of $T$ to $[0,a]$ to be the random variable $T_a = T \mid (T \leq a)$. By this we mean that $T_a$ takes the value of $T$ conditioned on the occurrence of $(T \leq a)$. We already saw this in the definition of almost sufficient statistics. The probability distribution of $T_a$ is given by $P(T_a \leq t) = P(T \leq t \mid T \leq a)$, and the density of $T_a$ is then given by

$$\text{dens}(T_a = t) = \begin{cases} \frac{f(t)}{\int_0^a f(u)\,du} & \text{if } 0 \leq t \leq a \\ 0 & \text{if } t > a \text{ or } t < 0 \end{cases}$$

where $f(t) = \text{dens}(T = t)$. Write $C_a = \frac{1}{\int_0^a f(u)\,du}$ for the above normalization constant.

Clearly $T_a$ will be a better and better approximation to $T$ as $a \to \infty$. As with truncations, restrictions are always used in an actual experiment.

It would be nice if we could define the relative entropy of $T$ to be the limit of the relative entropy of $T_a$ as $a \to \infty$, but unfortunately this diverges:

$$\text{relative entropy of } T_a = \int_0^a C_a f(t)\ln\!\left(\frac{1}{C_a f(t)}\right)dt - \ln(a) \to -\infty \text{ as } a \to \infty.$$

As before the difficulty is that we are not measuring entropy properly. The case of total randomness, entropy zero, is the uniform distribution on $[0,a]$; but as $a \to \infty$ this distribution ceases to make sense. So we are attempting to measure the entropy of $T$ relative to that of a nonexistent distribution! What should we do? We no longer have either total certainty or total uncertainty from which to measure entropy.

What we do is to "renormalize" our measurement of entropy so that the entropy of the uniform distribution on $[0,a]$ is $\ln(a)$ rather than 0. We do this by analogy with the "equally likely" distribution on $n$ points whose entropy is $\ln(n)$. There is no really convincing justification for this choice of normalization. The entropy defined in this way is called the **Boltzmann** or **differential entropy**:

$$H(T) = \lim_{a \to \infty}\left[(\text{relative entropy of } T_a) + \ln(a)\right]$$

$$= \lim_{a \to \infty}\int_0^a C_a f(t)\ln\!\left(\frac{1}{C_a f(t)}\right)dt$$

$$= \int_0^{\infty} f(t)\ln\!\left(\frac{1}{f(t)}\right)dt,$$

if this improper integral exists.

We now ask which positive continuous random variables take maximum Boltzmann entropy. Let $T$ be such a R.V., and let $\mu = E(T)$ be its expectation. To bound the entropy of $T$ we use a method known as the **Lagrange multiplier method**. This method is appropriate wherever we wish to maximize some quantity subject to constraints. In this case the constraints that the density function $f(t)$ of $T$ must satisfy are:

$$\int_0^{\infty} f(t)\,dt = 1 \quad \text{and} \quad \int_0^{\infty} t\, f(t)\,dt = \mu.$$

Multiply the constraints by constants $\alpha$ and $\beta$ to be determined later and subtract both from the entropy of $T$. Then proceed as in all our previous maximum entropy calculations:

$$H(T) - \alpha - \beta\mu = \int_0^{\infty} f(t)\ln\!\left(\frac{1}{f(t)}\right)dt - \alpha\int_0^{\infty} f(t)\,dt - \beta\int_0^{\infty} t\, f(t)\,dt$$

$$= \int_0^{\infty} f(t)\left[\ln\!\left(\frac{1}{f(t)}\right) - \alpha - \beta t\right]dt$$

$$= \int_0^{\infty} f(t)\ln\!\left(\frac{e^{-\alpha-\beta t}}{f(t)}\right)dt$$

$$\leq \int_0^{\infty} f(t)\left(\frac{e^{-\alpha-\beta t}}{f(t)} - 1\right)dt$$

$$= \int_0^{\infty} e^{-\alpha-\beta t}\,dt - \int_0^{\infty} f(t)\,dt$$

$$= \frac{e^{-\alpha}}{\beta} - 1 \quad (\text{if } \beta > 0).$$

By the basic logarithmic inequality, the above inequality is an equality if and only if $\frac{e^{-\alpha-\beta t}}{f(t)} = 1$ or $f(t) = e^{-\alpha-\beta t}$. We now use the constraints to solve for $\alpha$ and $\beta$:

$$1 = \int_0^{\infty} f(t)\,dt = \int_0^{\infty} e^{-\alpha-\beta t}\,dt = \frac{e^{-\alpha}}{\beta}$$

$$\mu = \int_0^{\infty} t\, f(t)\,dt = \int_0^{\infty} t\, e^{-\alpha-\beta t}\,dt = \frac{e^{-\alpha}}{\beta^2}.$$

Therefore $\beta = \frac{e^{-\alpha}}{\mu e^{-\alpha}} = \frac{1}{\mu}$, and $e^{-\alpha} = \beta = \frac{1}{\mu}$. The function $f(t)$ thus has the form

$$f(t) = \frac{1}{\mu}e^{-t/\mu},$$

i.e. $T$ is **exponentially distributed** with parameter $\frac{1}{\mu}$. Moreover, the entropy of $T$ is $H(T) = \alpha + \beta\mu = 1 + \ln(\mu)$. Therefore we see that as $\mu$ gets large, $T$ can have arbitrarily high entropy. Thus there is no positive random variable having maximum entropy among all such random variables.

### Standard Entropy

The reason we had to specify the expectation of a positive random variable in order to find the one having maximum entropy arises from an important distinction between finite entropy and Boltzmann entropy: the choice of units in which we measure our random variable alters the Boltzmann entropy but has no effect on the finite entropy. Indeed, the entropy of a finite-valued random variable depends only on the partition it defines. For example, if $X$ is uniformly distributed on $[0,1]$, then $Y = 2X$ is uniformly distributed on $[0,2]$. Although $Y$ represents the same phenomenon as $X$, the difference being the units with which we measure distance, obviously an observation of $X$ is more certain than an observation of $Y$ (one bit more certain to be precise). More generally, for any continuous random variable $X$, $H(cX) = H(X) + \ln(c)$.

In order to speak of the entropy of the phenomenon represented by a random variable, independent of scale changes, we introduce yet one more notion of entropy. The **standard entropy** of a random variable is the Boltzmann entropy of its standardization. Using the notion of standard entropy we can ask an important question. Which continuous random variables have the maximum standard entropy? The answer is that, up to changes of scale, there is exactly one such random variable: the **normal distribution**.

We now compute the density of this random variable. Since we want the random variable to have maximum standard entropy, we may assume it is standard. Let $X$ be such a random variable, and let $f(x)$ be its density. We maximize $H(X)$ by the method of Lagrange multipliers we used above, but now there are three constraints:

$$\int_{-\infty}^{\infty} f(x)\,dx = 1, \quad \int_{-\infty}^{\infty} x\, f(x)\,dx = 0, \quad \int_{-\infty}^{\infty} x^2 f(x)\,dx = 1.$$

One of the constraints being zero, we need just two parameters $\alpha$ and $\beta$ to be determined later:

$$H(X) - \alpha - \beta = \int_{-\infty}^{\infty} f(x)\ln\!\left(\frac{1}{f(x)}\right)dx - \alpha\int_{-\infty}^{\infty} f(x)\,dx - \beta\int_{-\infty}^{\infty} x^2 f(x)\,dx$$

$$= \int_{-\infty}^{\infty} f(x)\ln\!\left(\frac{e^{-\alpha-\beta x^2}}{f(x)}\right)dx$$

$$\leq \int_{-\infty}^{\infty} e^{-\alpha-\beta x^2}\,dx - 1 \quad (u = \sqrt{\beta}\, x)$$

$$= \frac{e^{-\alpha}\sqrt{\pi}}{\sqrt{\beta}} - 1.$$

The fact that $\int_{-\infty}^{\infty} e^{-u^2}\,du = \sqrt{\pi}$ was noted in section IV.2.

Returning to our bound on the entropy of $H(X)$, we know by the basic logarithmic inequality that this will be an equality if and only if

$$f(x) = e^{-\alpha - \beta x^2}.$$

We now use the constraints to solve for $\alpha$ and $\beta$.

$$1 = \int_{-\infty}^{\infty} f(x)\,dx = \int_{-\infty}^{\infty} e^{-\alpha-\beta x^2}\,dx = \frac{e^{-\alpha}\sqrt{\pi}}{\sqrt{\beta}}.$$

Therefore $e^{-\alpha} = \frac{\sqrt{\beta}}{\sqrt{\pi}}$, from which we conclude that $\beta = \frac{1}{2}$ and $e^{-\alpha} = \frac{1}{\sqrt{2\pi}}$.

Hence the maximum entropy among all standard continuous random variables is achieved precisely when

$$\text{dens}(X = x) = \frac{1}{\sqrt{2\pi}}e^{-x^2/2},$$

i.e. precisely when $X$ has the **standard normal distribution**.

There are more distributions determined by maximum entropy, especially those in statistical thermodynamics and quantum mechanics, but I trust that you now see the basic ideas.

### Summary

The four principal processes of probability theory are all determined by maximum entropy properties. We summarize this here.

#### Types of Entropy

| Type of Entropy | Class of Random Variables | Definition |
|---|---|---|
| (Finite partition) entropy | Finite-valued | $H(X) = H(\pi(X)) = \sum P(B_i)\ln\!\left(\frac{1}{P(B_i)}\right)$ |
| Relative entropy | Continuous with values in $[0,a]$ | $\int_0^a f(x)\ln\!\left(\frac{1}{f(x)}\right)dx - \ln(a)$ |
| Boltzmann entropy | Continuous | $H(X) = \int f(x)\ln\!\left(\frac{1}{f(x)}\right)dx$ |
| Standard entropy | Continuous | $H\!\left(\frac{X - \mu}{\sigma}\right) = H(X) - \ln(\sigma)$ |

#### Maximum Entropy Distributions

| Process | Distribution/Model for which entropy is max. | Class of Random Variables |
|---|---|---|
| Sampling | Finite uniform on $n$ points. Placements of 1 ball into $n$ boxes. | Random variables taking at most $n$ values |
| Uniform | Uniform on $[0,a]$. Sampling one point completely at random from $[0,a]$. | Continuous random variable taking values in $[0,a]$ (Relative or Boltzmann entropy) |
| Poisson | Exponential, intensity $\alpha$. Continuous memoryless waiting time, intensity $\alpha$. | Positive continuous random variables of mean $\frac{1}{\alpha}$ (Boltzmann entropy) |
| Normal | Normal, $N(m, \sigma^2)$. Measurement of a member of a normal population, with mean $m$ and variance $\sigma^2$. | Continuous random variable having mean $m$ and variance $\sigma^2$ (Boltzmann entropy) |

#### Values of Entropy

| Distribution | Relative Entropy | Boltzmann Entropy | Standard Entropy |
|---|---|---|---|
| Finite uniform on $n$ points | $\log_2(n)$ bits | --- | --- |
| Uniform on $[0,a]$ | 0 | $\ln(a)$ | $\frac{1}{2}\ln(12) = 1.2425$ nats |
| Exponential, intensity $\alpha$ | --- | $1 - \ln(\alpha)$ | 1 |
| Normal, $N(m, \sigma^2)$ | --- | $\ln(\sigma\sqrt{2\pi e})$ | $\ln\sqrt{2\pi e} = 1.4189$ nats |

---

## Exercises for Chapter VIII

**1.** A visitor to an imaginary country finds that the inhabitants of city A always tell the truth, while the inhabitants of city B always lie. The visitor wants to know which city he is in. He may ask only yes-no direct questions. (A question such as "If I were to ask you what city am I in, what would you say?" are indirect and would only confuse an inhabitant.) How many questions must the visitor ask? Note that an inhabitant of city A could be temporarily residing in city B and vice versa.

**2.** You are given twelve coins, one of which is counterfeit, and a balance. The counterfeit coin is either light or heavy, you do not know which. How many weighings are necessary to determine which coin is counterfeit?

**3.** You are given five coins, some of which may be counterfeit. A counterfeit coin is lighter than a good coin, and all counterfeit coins weigh the same. Again you are given a balance. How many weighings are necessary to find all of the counterfeit coins?

**4.** A deck of 52 cards is said to have been randomly shuffled if all 52! permutations are equally likely. What we normally regard as being a random shuffle is in fact very far from random. For example, the cut-and-interlace shuffle (also called the perfect shuffle) has the following property. If a new deck (in the standard bridge order: 2 of clubs, 3 of clubs, ..., ace of spades) is perfectly shuffled twice, cut any number of times and dealt as in a Bridge game, then each of the four players will receive all the cards of one suit. It is known that frequent Bridge players are capable of consistently achieving a perfect shuffle.

How much information is contained in a random shuffle? In a perfect shuffle? In a random cut? How many independent random cuts are needed to achieve a completely random shuffle?

**5.** Let $N$ be an integer between 1 and 2000. Divide $N$ by 6, 10, 22 and 35, and find the remainders. How much information about $N$ do these four remainders tell you?

**6.** Show that the entropy of the normal distribution $N(m, \sigma^2)$ is $\log_2(\sigma\sqrt{2\pi e})$ bits. Use this to answer the following question. A coin is tossed 1000 times, getting 368 heads and 632 tails. How much additional information will one more toss of the coin give one?

**7.** Suppose that the imaginary country of exercise 1 has another city C where the inhabitants alternately tell the truth and lie. What is the smallest number of questions the visitor must ask to find out which city he is in?

**8.\*** Generalize problems 2 and 3 above to an arbitrary number of coins.

**9.\*** Let $f(x)$ be a differentiable function defined on $[0,a]$. Assume that $f(0) = 0$ and that $|f'(x)| < b$ for all $x$ in $[0,a]$. Find an upper bound on the amount of information necessary to determine the value of $f(x)$ at every $x \in [0,a]$ with an error not exceeding $\varepsilon > 0$.

**10.\*** You are playing a variation of "20 questions." A chooses a number between 1 and 1,000,000, and B must find this number by asking yes-no questions about it, except that B asks random questions. How long does it take for B to find the number? Let $T$ be the time needed for B to find the number.

**11.\*** Let $k_1, k_2, \ldots$ be a sequence of numbers such that $\lim_{n \to \infty}(k_n - \log_2(n)) = c$. Let $T_n$ be as in exercise 10 above but for the problem of guessing a number between 1 and $2^n$. Prove that $\lim_{n \to \infty} P(T_n = k_n) = e^{-1/2^c}$.

---

## Answers to Selected Exercises

**1.** The visitor wishes to know only which city he is in, not whether the inhabitant being questioned is a truth-teller or liar. Therefore he needs only one bit of information.

Entropy suggests that there ought to be a single yes-no question that will determine the city. It is possible, however, that the restrictions placed on the kind of question that may be asked preclude the existence of such a question, so this is not such a trivial problem. Here is a question that will work: **Are you a citizen of this city?**

**2.** There are really two questions here. One might must find the counterfeit coin or one might both find the bad coin and also determine whether it is heavy or light relative to a good coin. The first question requires $\log_3(12) \approx 2.26$ trits of information, while the second requires $\log_3(24) = 2.89$ trits. In either case at least three weighings will be required to find the bad coin. Actually devising a procedure for finding the bad coin is far from easy, however, because there are great restrictions on the kinds of questions that may be asked (i.e. the partitions into which the sample space can be subdivided).

The sample space $\Omega$ in this problem has 24 sample points which we label $1h, 1l, 2h, \ldots, 12l$, e.g. "1h" means the first coin is too heavy. Let $W_1, W_2, W_3$ denote the three weighings, whose outcomes may be $+1$, $-1$ or $0$ depending on whether the left side is heavier, lighter or the same, respectively, as the right side. The two questions we might ask correspond to two partitions of $\Omega$. If we just want to know which coin is bad, the partition is $\{1h,1l\}, \{2h,2l\}, \ldots, \{12h,12l\}$. If we also want to know whether the bad coin is heavy or light, the partition is $\{1h\}, \{1l\}, \ldots, \{12h\}, \{12l\}$, which is finer than the first partition.

The weighing procedure below answers the second question, and hence also the first, in three or fewer weighings.

| Weighing #1 $W_1$ | Weighing #2 $W_2$ | Weighing #3 $W_3$ | Outcome |
|---|---|---|---|
| 1234/5678: $+1$ | 1256/37910: $+1$ | 1/2: $+1$ | 1h |
| | | $-1$ | 2h |
| | | $0$ | --- |
| | $-1$ | 5/6: $+1$ | 6l |
| | | $-1$ | 4h |
| | | $0$ | 3h |
| | $0$ | 1/2,4/8: $+1$ | 8l |
| | | $-1$ | 4h |
| | | $0$ | --- |
| $-1$ | 1256/37910: $+1$ | 5/6: $+1$ | 5h |
| | | $-1$ | 6h |
| | | $0$ | 3l |
| | $-1$ | 1/2: $+1$ | 2l |
| | | $-1$ | 1l |
| | | $0$ | 7h |
| | $0$ | 1/2,4/8: $+1$ | 4l |
| | | $-1$ | 8h |
| | | $0$ | --- |
| $0$ | 9,10/2,11: $+1$ | 9/10: $+1$ | 9h |
| | | $-1$ | 10h |
| | | $0$ | 11l |
| | $-1$ | 9/10: $+1$ | 10l |
| | | $-1$ | 9l |
| | | $0$ | 11h |
| | $0$ | 1/12: $+1$ | 12l |
| | | $-1$ | 12h |
| | | $0$ | --- |

If we only wish to find the bad coin, not whether it is light or heavy, then the event $(W_1 = 0) \cap (W_2 = 0)$ is enough to determine that 12 is the bad coin. Thus three weighings are not needed in this case, and we find that only $\frac{1}{3} + 1 + \frac{2}{3} \cdot \frac{5}{4} = 2.9$ weighings are needed on the average to find the bad coin. This is quite a bit more than the 2.26 suggested by entropy considerations. Can you do better?

How does one find a procedure like that above? Unfortunately no systematic procedure exists for handling problems like this one and the next. My technique is to choose the weighings by trial-and-error in such a way as to partition the sample space as evenly as possible.

An important point that is easily missed is that there are 24 and not 12 elements in $\Omega$ (regardless of which question is asked).

What about the case of 13 coins, one of which is bad? We will clearly need at least $\log_3(26) = 2.966$ trits of information, i.e. at least 3 weighings. In fact, one cannot find both the bad coin and whether it is light or heavy in only 3 weighings. The difficulty is that the same number of coins must be on both sides of the balance. As a result, the partition of the first weighing, $\pi(W_1)$, can only have even sized blocks, and hence one block must have 10 or more elements. But one cannot find the outcome in such a block using only 2 weighings because $\log_3(10) \approx 2.096$ trits. It is possible to break the symmetry if one is also given one more coin that is known to be a good coin.

**3.** *[See text for the full weighing table for 5 coins]*

The information required in this problem is $\log_3(32) \approx 3.155$ trits. The above procedure finds the set of counterfeit coins in an average of $\frac{3 + \frac{34}{5} \cdot 4}{1} = 3.438$ weighings. This is 0.283 more than the number of trits required. In general it is rare to achieve an average number of weighings, in such a coin problem, equal to the required entropy. Nevertheless, it is useful to think of the entropy (in trits) as the average number of three-valued questions needed to answer the question.

**4.**

$$H_2(\text{random shuffle}) = \log_2(52!) = 226 \text{ bits}$$

$$H_2(\text{perfect shuffle}) = \log_2(1) = 0 \text{ bits}$$

$$H_2(\text{random cut}) = \frac{1}{53}\log_2(53) + \frac{52}{53}\log_2\!\left(\frac{53}{52}\right) \approx 5.69 \text{ bits}.$$

No matter how many perfect shuffles are made, one can never achieve a random shuffle, because there is no randomness at all in such a shuffle. It looks like about 40 random cuts would achieve a random shuffle, but this is also not true. The reason is that random cuts are not independent. For example, a cut of 5 cards followed by one of 7 cards is the same as a single cut of 12 cards: a cut is a "circular shift" of the deck.

**5.** It looks as though the remainders give one $\log_2(6) + \log_2(10) + \log_2(22) + \log_2(35) = 15.5$ bits of information, there being 6 possibilities for the first remainder, 10 for the second, etc. However, the remainders are not independent. For example if $N/6$ has remainder 3, then $N/10$ cannot have 0, 2, 4, 6, or 8 as a remainder. The actual number of bits of information is $\log_2(2000) \approx 11$ bits, because $N$ is determined by the remainders.

**6.** Let $X$ be $N(m, \sigma^2)$. Let $f(x) = \frac{1}{\sigma\sqrt{2\pi}}e^{-(x-m)^2/2\sigma^2}$ be its density.

$$H(X) = \int_{-\infty}^{\infty} f(x)\ln\!\left(\frac{1}{f(x)}\right)dx$$

$$= \int_{-\infty}^{\infty} f(x)\left[\ln(\sigma\sqrt{2\pi}) + \frac{(x-m)^2}{2\sigma^2}\right]dx$$

$$= \ln(\sigma\sqrt{2\pi}) + \frac{1}{2\sigma^2}E((X-m)^2)$$

$$= \ln(\sigma\sqrt{2\pi}) + \frac{1}{2} = \ln(\sigma\sqrt{2\pi}) + \frac{1}{2}$$

$$= \ln(\sigma\sqrt{2\pi e}).$$

Hence $H(X) = \log_2(\sigma\sqrt{2\pi e})$. For $\sigma = 1$, this is about 1.42 nats or about 2 bits.
