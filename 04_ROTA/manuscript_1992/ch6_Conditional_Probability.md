---
title: "Chapter VI: Conditional Probability"
author: "Gian-Carlo Rota"
edition: "1992"
chapter_number: 6
source: "Introduction to Probability and Random Processes, MIT"
---

# Chapter VI: Conditional Probability

The theory of probability consists largely in making precise the probabilistic language that already forms part of our language. In effect the purpose of this course is to learn to "speak probability" properly. The lowest level of our probabilistic language is the event. This corresponds to simple phrases that are either true or false. For example in the Bernoulli process $H_i$ is the event "the $i$th toss is heads." Random variables represent the next level: simple quantitative questions. For example one might ask: "how long must one toss a coin until the first head appears?" If we use the convention 0=false and 1=true, every event may also be regarded as a random variable by using the indicator. Conditional probability is the third level.

Conditional probability allows probabilistic reasoning. That is, we may now ask compound questions. For example, "if the first toss of a coin is tails, how long must one wait until the first head appears?" Moreover, we can split apart and combine such questions into new questions. The precise meaning of such expressions is not always obvious and is the source of many seeming paradoxes and fallacies. As a simple example, the question, "if the first toss is heads, is the second toss heads?" is very different from the question, "are the first two tosses heads?" The probability of the first is $p$ while that of the second is $p^2$.

## 1. Discrete Conditional Probability

We begin with the definition and properties of the conditional probability of events.

**Definition.** Let $A$ and $S$ be events such that $P(S) > 0$. The **conditional probability** of $A$ given $S$ is

$$P(A|S) = \frac{P(A \cap S)}{P(S)}.$$

The event $S$ is called the **condition**.

![Figure: Venn diagram showing events A and S within sample space Omega, with their intersection highlighted](image_placeholder)

The conditional probability $P(A|S)$ answers the question: "if $S$ has occurred, how probable is $A$?" In effect we have altered our sample space. Since we know that $S$ has occurred, the sample space is now $S$. The event $A$ given that $S$ has occurred must now be interpreted as $A \cap S$, and the probability is $P(A \cap S)$ normalized by the probability of $S$ so that the total probability is 1. Ordinary probabilities are the special cases of conditional probabilities where the condition is the sample space $\Omega$: $P(A) = P(A|\Omega)$.

### Law of Alternatives

Suppose that instead of knowing that a certain event has occurred, we know that one of several possibilities has occurred, which are mutually exclusive. Call these alternatives $A_1, A_2, \ldots$ . There may possibly be infinitely many alternatives. More precisely the $A_i$'s form a set of alternatives if

1. $A_i \cap A_j = \varnothing$ if $i \neq j$ (mutually exclusive)
2. $\bigcup A_i = \Omega$ (exhaustive)
3. $P(A_i) > 0$ for all $i$

Then for any event $B$:

$$\boxed{P(B) = P(B|A_1)P(A_1) + P(B|A_2)P(A_2) + \cdots}$$
$$\text{Law of Alternatives}$$

To verify this law we simply expand and cancel. The $A_i$'s are disjoint so the events $B \cap A_i$ are also disjoint.

$$P(B) = P(B|A_1)P(A_1) + P(B|A_2)P(A_2) + \cdots$$

$$= \frac{P(B \cap A_1)}{P(A_1)} P(A_1) + \frac{P(B \cap A_2)}{P(A_2)} P(A_2) + \cdots$$

$$= P(B \cap A_1) + P(B \cap A_2) + \cdots$$

$$= P((B \cap A_1) \cup (B \cap A_2) \cup \cdots)$$

$$= P(B \cap (A_1 \cup A_2 \cup \cdots))$$

$$= P(B \cap \Omega)$$

$$= P(B)$$

If the alternatives $A_i$ are not exhaustive, we can still make sense of the law of alternatives provided all probabilities involved are conditioned on the event $A = \bigcup A_i$.

More precisely we shall call a set of events $A_i$ a **set of alternatives for $A$** if

1. $P(A_i \cap A_j) = 0$ if $i \neq j$ (mutually exclusive)
2. $P\!\left(\bigcup A_i\right) = A$ (exhaustive)
3. $P(A_i) > 0$ for all $i$.

Then for any event $B$:

$$\boxed{P(B|A) = P(B|A_1)P(A_1|A) + P(B|A_2)P(A_2|A) + \cdots}$$
$$\text{Conditional Law of Alternatives}$$

### Bayes' Law

One of the features of probability as we have developed it so far is that all events are treated alike: in principle no events are singled out as "causes" while others become "effects." Bayes' law, however, is traditionally stated in terms of causes and effects. Although we will do so also, one should be careful not to ascribe metaphysical significance to these terms. Historically, this law has been misapplied in a great number of cases precisely because of such a misunderstanding.

We are concerned with the following situation. Suppose we have a set of alternatives $A_1, A_2, \ldots$ which we will refer to as "causes." Suppose we also have an event $B$ which we will call the "effect." The idea is that we can observe whether the effect $B$ has or has not occurred but not which of the causes $A_1, A_2, \ldots$ has occurred. The question is to determine the probability that a given cause occurred given that we have observed the effect. We assume that we know the probability for each of the causes to occur, $P(A_i)$, as well as the conditional probability for $B$ to occur given each cause, $P(B|A_i)$. The probability $P(A_i)$ is called the **a priori** probability of $A_i$, and we seek the probability $P(A_i|B)$ which we call the **a posteriori** probability of $A_i$. If the alternatives $A_i$ represent various experimental hypotheses, and $B$ is the result of some experiment, then Bayes' law allows us to compute how the observation of $B$ changes the probabilities of these hypotheses.

$$\boxed{P(A_i|B) = \frac{P(B|A_i)P(A_i)}{\sum_j P(B|A_j)P(A_j)}}$$
$$\text{Bayes' Law}$$

### Proof of Bayes' Law

Let $A$ and $B$ be any two events having positive probability. By the definition of conditional probability,

$$P(B|A) = \frac{P(A \cap B)}{P(A)} \quad \text{and} \quad P(A|B) = \frac{P(A \cap B)}{P(B)}.$$

As a result we have two ways to express $P(A \cap B)$:

$$P(B|A)P(A) = P(A \cap B) = P(A|B)P(B).$$

Solving for $P(A|B)$ gives:

$$P(A|B) = \frac{P(B|A)P(A)}{P(B)}.$$

Now apply this to the case for which $A$ is $A_i$ and use the law of alternatives to compute the denominator. The resulting expression is Bayes' law.

### Law of Successive Conditioning

Suppose we have $n$ events $B_1, B_2, \ldots, B_n$ such that $P(B_2 \cap B_3 \cap \cdots \cap B_n) > 0$. Then we can compute $P(B_1 \cap B_2 \cap \cdots \cap B_n)$ using a sequence of conditional probabilities:

$$\boxed{P(B_1 \cap B_2 \cap \cdots \cap B_n) = P(B_1|B_2 \cap \cdots \cap B_n) P(B_2|B_3 \cap \cdots \cap B_n) \cdots P(B_{n-1}|B_n) \; P(B_n)}$$
$$\text{Law of Successive Conditioning}$$

To prove this we just expand and cancel. This law corresponds to the intuitive idea that the probability of several events occurring is the product of their individual probabilities. This idea is correct provided we interpret "individual probability" to mean the appropriate conditional probability.

By using the law of alternatives and the law of successive conditioning we split the computation of an ordinary or a conditional probability into a succession of conditional probabilities. In effect we form compound, nested, conditional questions out of simple questions.

### Independence

Suppose that $A$ and $B$ are two events. If either $A$ or $B$ has probability zero of occurring, then $A$ and $B$ are trivially independent events. If $P(A) > 0$ and $P(B) > 0$, then the concept of the independence of the events $A$ and $B$ is best stated by using conditional probability. Namely each of the following are equivalent statements:

1. $A$ and $B$ are independent
2. $P(A|B) = P(A)$
3. $P(B|A) = P(B)$

Using this terminology we can see much more clearly that the independence of two events $A$ and $B$ means that knowing one has occurred does not alter the probability that the other will occur, or equivalently that the measurement of one does not affect the measurement of the other.

## 2. Gaps and Runs in the Bernoulli Process

Recall that $T_i$ is the gap between the $(i-1)$st and the $i$th success. We claimed that the $T_i$ are independent random variables using an intuitive probabilistic argument. We now have the terminology for making this argument rigorous. The key notion is the law of alternatives.

Consider the conditional probability of the gap $T_{i+1}$ being $n$ given that all of the preceding gaps are known:

$$P((T_{i+1} = n) \mid (T_1 = k_1) \cap (T_2 = k_2) \cap \ldots \cap (T_i = k_i)).$$

Computing this probability is quite easy for it corresponds to exactly two patterns of H's and T's (up to some loss):

$$\underbrace{TT \ldots TH}_{k_1} \underbrace{TT \ldots TH}_{k_2} TT \ldots \ldots H \underbrace{TT \ldots TH}_{k_i}$$

$$P((T_1 = k_1) \cap (T_2 = k_2) \cap \ldots \cap (T_i = k_i)) = q^{k-i} p^i$$

$$\underbrace{TT \ldots TH}_{k_1} \underbrace{TT \ldots TH}_{k_2} TT \ldots \ldots H \underbrace{TT \ldots TH}_{k_i} \underbrace{TT \ldots TH}_{n}$$

$$P((T_1 = k_1) \cap (T_2 = k_2) \cap \ldots \cap (T_i = k_i) \cap (T_{i+1} = n)) = q^{k+n-i-1} p^{i+1}.$$

Therefore

$$P(T_{i+1} = n \mid (T_1 = k_1) \cap (T_2 = k_2) \cap \ldots \cap (T_i = k_i)) = q^{n-1} p.$$

Although the above computation is not very difficult, there is an easier way to see it. Think of the condition

$$(T_1 = k_1) \cap (T_2 = k_2) \cap \ldots \cap (T_i = k_i)$$

as **changing** our sample space. The new sample space consists of all infinite sequences of H's and T's, but renumbered starting with $k+1 = k_1 + k_2 + \cdots + k_i + 1$. This new sample space is identical to the Bernoulli sample space except for the renumbering and the fact that $T_{i+1}$ is now the waiting time for the first success. Therefore

$$P(T_{i+1} = n \mid (T_1 = k_1) \cap (T_2 = k_2) \cap \ldots \cap (T_i = k_i)) = q^{n-1} p.$$

The key to the effective use of conditional probability is that it changes the sample space and hence the interpretation of the random variables defined on the old sample space.

We now apply the law of alternatives. The events

$$(T_1 = k_1) \cap (T_2 = k_2) \cap \ldots \cap (T_i = k_i),$$

as the $k_i$'s take on all positive integer values, form a set of alternatives; for the set of sample points belonging to none of them is an event whose probability is zero.

$$P(T_{i+1} = n) = \sum_{k_1} \cdots \sum_{k_i} P(T_{i+1} = n \mid (T_1 = k_1) \cap (T_2 = k_2) \cap \ldots \cap (T_i = k_i))$$

$$\cdot P((T_1 = k_1) \cap (T_2 = k_2) \cap \ldots \cap (T_i = k_i))$$

$$= \sum_{k_1} \cdots \sum_{k_i} q^{n-1} \; p \; P((T_1 = k_1) \cap (T_2 = k_2) \cap \ldots \cap (T_i = k_i))$$

$$= q^{n-1} \; p \sum_{k_1} \cdots \sum_{k_i} P((T_1 = k_1) \cap (T_2 = k_2) \cap \ldots \cap (T_i = k_i))$$

$$= q^{n-1} \; p.$$

Notice that the only fact we used about the events $(T_1 = k_1) \cap (T_2 = k_2) \cap \ldots \cap (T_i = k_i)$ was that they form a set of alternatives. An immediate consequence is that the gaps $T_i$ are all equidistributed. Furthermore, if we use the definition of conditional probability we have that

$$P(T_{i+1} = n) = P(T_{i+1} = n \mid (T_1 = k_1) \cap (T_2 = k_2) \cap \cdots \cap (T_i = k_i))$$

$$= \frac{P((T_1 = k_1) \cap (T_2 = k_2) \cap \cdots \cap (T_i = k_i) \cap (T_{i+1} = n))}{P((T_1 = k_1) \cap (T_2 = k_2) \cap \ldots \cap (T_i = k_i))}$$

or

$$P((T_1 = k_1) \cap (T_2 = k_2) \cap \cdots \cap (T_i = k_i) \cap (T_{i+1} = n))$$

$$= P((T_1 = k_1) \cap (T_2 = k_2) \cap \cdots \cap (T_i = k_i)) P(T_{i+1} = n)$$

By mathematical induction we have that

$$P((T_1 = k_1) \cap (T_2 = k_2) \cap \cdots \cap (T_i = k_i) \cap (T_{i+1} = n))$$

$$= P(T_1 = k_1) P(T_2 = k_2) \cdots P(T_i = k_i) P(T_{i+1} = n),$$

i.e. that the $T_i$ are independent.

We can now see more clearly how the $T_i$ are related. They have the same distribution, but they are not the same. They have this property because the measurement of the $i$th gap "really" occurs in a different sample space than the first gap, but this new sample space is identical to the ordinary Bernoulli sample space except for how we number the tosses.

We went into detail for this argument to illustrate a nontrivial use of the law of alternatives. We will be more abbreviated in the future.

As an illustration of the law of alternatives, we consider a problem mentioned in chapter I. Namely, what is the probability that a run of $h$ heads occurs before a run of $t$ tails? Let $A$ be this event. We solve this problem by using the following fact: when a run of less than $h$ heads is "broken" by getting a tail, we must "start over" and similarly for runs of tails.

First we use the law of alternatives:

$$P(A) = P(A|X_1 = 1)P(X_1 = 1) + P(A|X_1 = 0)P(X_1 = 0).$$

Write $u = P(A|X_1 = 1)$ and $v = P(A|X_1 = 0)$ so that $P(A) = up + vq$.

Next we use the conditional law of alternatives for each of $P(A|X_1 = 1)$ and $P(A|X_1 = 0)$. Consider the first one. We know that we got a head on the first toss so the run has started. We then "wait" to see if the run will be broken. That is, let $B_h$ be the waiting time for the first tail starting with the second toss. Either we get a tail and break the run or we get enough heads so that $A$ occurs. More precisely,

$$P(A|X_1 = 1) = P(A|(B_h < h))(X_1 = 1)) P((B_h < h)|(X_1 = 1)) + P(A|(B_h \geq h)|(X_1 = 1)).$$

For the first alternative the run of heads has been broken by a tail. Hence $P(A|(B_h < h)) = v$, for the earlier heads have no effect on subsequent tosses. All that matters is that we "started" with a tail. On the other hand $P(A|(B_h \geq h)) = 1$ because the condition implies that $A$ has in fact occurred. Therefore,

$$u = P(A|X_1 = 1) = v \cdot P((B_h < h)|(X_1 = 1)) + 1 \cdot P((B_h \geq h)|(X_1 = 1))$$

$$= v \cdot (1 - p^{h-1}) + 1 \cdot (p^{h-1})$$

The computation for $P(A|X_1 = 0)$ is analogous to that above. Let $B_t$ be the waiting time for the first head starting with the second toss. Then

$$P(A|X_1 = 0) = P(A|(B_t < t))(X_1 = 0)) P((B_t < t)|(X_1 = 0)) + P(A|(B_t \geq t)|(X_1 = 0)).$$

Here $P(A|(B_t \geq t)) = 0$ because the condition implies that $A$ has not occurred. The probability $P(A|(B_t < t)) = u$ because the run of tails has been broken. Therefore,

$$v = P(A|X_1 = 0) = u(1 - q^{t-1}) + 0 \cdot (q^{t-1}).$$

Combining the two equations above gives us the system of equations:

$$u = v \cdot (1 - p^{h-1}) + p^{h-1}$$

$$v = u \cdot (1 - q^{t-1}).$$

Solve for $u$ and $v$ and substitute:

$$P(A) = up + vq = \frac{p^{h-1}(q - q^t)}{p^{h-1} + q^{t-1} - p^{h-1} q^{t-1}}$$

We check this by considering the special case $h = t$ and $p = q = \frac{1}{2}$. As we expect by symmetry, $P(A) = \frac{1}{2}$.

## 3. Sequential Sampling

In most sampling situations, for example sampling people in a population, we generally sample the population without replacement, i.e. the same individual cannot be chosen more than once in one sample. For such a sampling procedure, the successive choices are not independent of one another: for with each choice, the population (and hence the sample space) gets smaller.

For very large populations this would seem to be a small effect. But on smaller populations it can be pronounced. For example, suppose we play a card guessing game. We draw a card at random from a deck, try to guess the suit, look to see if our guess was correct and then place the card aside. If we continue to sample the cards this way, the probabilities for getting a card of a given suit change constantly. Indeed, we will always know for certain what the suit of the last card drawn will be.

The problem of sequential sampling is to describe the dependence of each of the choices on the other choices. The idealized model is the following. We have an urn containing $r$ red balls and $b$ black balls. We select a ball at random from the urn, note its color and then place it aside. This procedure is repeated until $n$ balls have been chosen from the urn. Define the random variables $X_i$ by:

$$X_i = \begin{cases} 1 & \text{if the } i^{\text{th}} \text{ ball is red} \\ 0 & \text{if the } i^{\text{th}} \text{ ball is black} \end{cases}$$

The problem is to find the distributions and the correlations of the $X_i$.

Notice that we have switched the role of the balls and the boxes. In the occupancy model we place balls into boxes. In the sampling model the balls become the positions in the sample and the boxes become individuals in a population. In the sequential sampling model it is traditional to view the population more concretely as a collection of colored balls in an urn.

Consider the first choice $X_1$. The probability distribution of $X_1$ is

$$p_0 = P(X_1 = 0) = \frac{b}{r+b}$$

$$p_1 = P(X_1 = 1) = \frac{r}{r+b}.$$

Next consider the second choice $X_2$. To compute its distribution we must use the law of alternatives. For example $P(X_2 = 0 \mid X_1 = 0)$ is $\frac{b-1}{r+b-1}$ because there is one fewer black ball in the urn.

$$p_0 = P(X_2 = 0) = P(X_2 = 0|X_1 = 0) \cdot P(X_1 = 0) + P(X_2 = 0|X_1 = 1) \cdot P(X_1 = 1)$$

$$= \frac{b-1}{r+b-1} \cdot \frac{b}{r+b} + \frac{b}{r+b-1} \cdot \frac{r}{r+b}$$

$$= \frac{(b-1) \cdot b + b \cdot r}{(r+b-1)(r+b)}$$

$$= \frac{b(r+b-1)}{(r+b-1)(r+b)} = \frac{b}{r+b}.$$

Similarly,

$$p_1 = P(X_2 = 1) = \frac{r}{r+b}.$$

The random variables $X_1$ and $X_2$ are equidistributed! This is quite unexpected. One wonders whether this is an accident of algebra or there is some deep principle here. If the latter, we would expect that all the $X_i$ have the same distribution. As we shall see this is indeed the case. The seeming paradox arises from the fact that we are not considering the random variables conditionally. For example, in the card guessing game above, if we chose not to look at the first 51 cards sampled, we would have no reason to suppose that the last card sampled has any special properties: it doesn't "know" that the other cards have been sampled.

### Exchangeability

As often happens in mathematics, the situation only becomes clear when we consider it from a broader perspective. Consider the joint distribution of all the $X_i$'s:

$$C_{i_1, \ldots, i_n} = P((X_1 = i_1) \cap (X_2 = i_2) \cap (X_3 = i_3) \cap \ldots \cap (X_n = i_n))$$

where the $i_1, \ldots, i_n$ take the values 0 and 1 arbitrarily. We compute this by using the law of successive conditioning:

$$C_{i_1, \ldots, i_n} = P(X_1 = i_1) P(X_2 = i_2 \mid X_1 = i_1) P(X_3 = i_3 \mid (X_1 = i_1) \cap (X_2 = i_2)) \cdots$$

For example, if $n = 6$ and $(i_1, i_2, \ldots, i_6) = (0,1,1,0,1,1)$, then

$$C_{0,1,1,0,1,1} = \frac{b}{r+b} \cdot \frac{r}{r+b-1} \cdot \frac{r-1}{r+b-2} \cdot \frac{b-1}{r+b-3} \cdot \frac{r-2}{r+b-4} \cdot \frac{r-3}{r+b-5}$$

$$= \frac{(b)_2 (r)_4}{(r+b)_6}$$

Each factor is the number of balls of the appropriate color at the time divided by the number of balls in the urn at the time. More generally, if we have drawn a sequence of $k$ reds and $j$ blacks, then the probability is

$$C_{i_1, \ldots, i_n} = \frac{(b)_j (r)_k}{(r+b)_n}$$

The probability of drawing a given sequence of reds and blacks depends only on the number of reds and blacks drawn. In other words

$$P((X_1 = i_1) \cap (X_2 = i_2) \cap \cdots \cap (X_n = i_n))$$

is the same if we permute the $i_1, \ldots, i_n$ leaving the $X_j$'s alone (or equivalently if we permute the $X_j$'s leaving the $i_j$'s alone.) For example,

$$P((X_1 = i_1) \cap (X_2 = i_2) \cap \cdots \cap (X_n = i_n)) = P((X_1 = i_2) \cdot (X_2 = i_1) \cdots (X_n = i_n)).$$

Since we can compute the individual distributions of the $X_j$'s from the joint distribution by taking marginals, we immediately get that the $X_j$'s are equidistributed. Moreover the joint distribution of, say, $X_1$ and $X_5$ is the same as that of $X_2$ and $X_7$:

$$P((X_1 = i_1) \cap (X_5 = i_2)) = P((X_4 = i_1) \cap (X_2 = i_2))$$

and the latter is easy to compute. In general the joint distribution of any $k$ of the $X_j$'s is the same as that of the first $k$ of them. All these facts follow from the fact that the joint distribution of the $X_j$'s is unchanged when we permute the $X_j$'s. This is the real reason that the choices in sequential sampling are equidistributed.

**Definition.** Random variables (either integer or continuous) $X_1, \ldots, X_n$ are said to be **exchangeable** when their joint distribution (or density) is a symmetric function.

An example of a set of exchangeable random variables we have already seen is a set of independent, equidistributed random variables. If $X_1, X_2$ and $X_3$ are independent, equidistributed integer R.V.'s, then

$$P((X_1 = i_1) \cap (X_2 = i_2) \cap (X_3 = i_3)) = P(X_1 = i_1) P(X_2 = i_2) P(X_3 = i_3) = p_{i_1} p_{i_2} p_{i_3}.$$

But as we have just seen, being exchangeable is not as strong a condition as being independent and equidistributed.

We mention in passing that being exchangeable is not really that much more general than being independent and equidistributed. There is a deep theorem of probability theory which, roughly speaking, says that every set of exchangeable random variables can be "synthesized" from independent equidistributed random variables by suitable conditioning.

### The Polya Urn Process

A slightly more general sampling model than sampling either with replacement or without replacement is called the **Polya Urn Process**. In this process we begin with an urn containing $r$ red balls and $b$ black balls. We draw a ball at random. If it is red, we put the drawn ball plus $c$ more red balls into the urn. If it is black, we put the drawn ball plus $d$ more black balls into the urn. We then repeat this. Sampling with replacement is the case $c = d = 0$, and sampling without replacement is the case $c = d = -1$.

This process was originally introduced as a model of epidemics. If we think of the red balls as diseased individuals, then each discovery of a red ball increases the likelihood that other balls will be red ($c > 0$). There are obvious defects in such a model which we will not pursue. We will just think of this process as a general form of sampling.

As before let $X_1, \ldots, X_n$ be the successive results of drawing $n$ balls in the Polya Urn Process. The computation of the joint distribution of the $X_j$'s is much the same as before. For example,

$$C_{1,1,0,0,1} = P((X_1 = 1) \cap (X_2 = 1) \cap (X_3 = 0) \cap (X_4 = 0) \cap (X_5 = 1))$$

$$= \frac{r}{r+b} \cdot \frac{r+c}{r+b+c} \cdot \frac{b}{r+b+2c} \cdot \frac{b+d}{r+b+2c+d} \cdot \frac{r+2c}{r+b+2c+2d}$$

In general, the $X_j$'s will not be exchangeable, but if $c = d$, they are. For those who like formulas, the probability of drawing $j$ reds and $k$ blacks in any order is

$$\frac{\binom{r}{c}_j \binom{b}{c}_k}{\binom{r+b}{c}_{j+k}}$$

provided that $d = c \neq 0$ and is

$$\frac{r^j \; b^k}{(r+b)^{j+k}}$$

if $c = d = 0$.

## 4. Random Walks

We are given a sequence of random variables $Y_1, Y_2, \ldots$ which are independent and equidistributed, such that $P(Y_i = 1) = \frac{1}{2}$ and $P(Y_i = -1) = \frac{1}{2}$. The sum

$$Y_1 + Y_2 + \cdots + Y_n = G_n$$

is called the **position** of the random walk at time $n$. (This random variable is the same as random variable $S_n$ which we have encountered in chapter IV.)

Other notable random variables connected with random walk are:

*1. The first visit to position $a$, where $a$ is a positive integer (the generalization to the case when $a$ is a negative integer is immediate, and will not be given.) This random variable is denoted by $Z_a$, and is formally defined by the equation*

$$(Z_a = n) = (G_1 < a) \cap (G_2 < a) \cap \cdots \cap (G_{n-1} < a) \cap (G_n = a).$$

*2. The maximum position up to time $n$, a random variable denoted by $M_n$. Formally, this random variable is defined as*

$$M_n = \max(0, G_1, G_2, \ldots, G_n).$$

Another expression for this random variable can be obtained as follows. We note that the event $(M_n = a)$ occurs if and only if the random walk has visited position $a$ at some time prior and up to $n$, and has not visited position $a+1$ by time $n$. Thus

$$(M_n = a) = (Z_a \leq n) \cdot (Z_{a+1} \leq n)$$

Note that the first event on the right side contains the second event on the right side, and thus the probability of the event on the left side is the difference of the probabilities on the right.

![Figure: A random walk path showing position over time, with maximum position a marked by a horizontal dashed line](image_placeholder)

*3. The random variable $L_{2n}$ denotes the time of the last visit to 0 up to time $2n$ (that is, "in the first $2n$ steps"). Formally:*

$$(L_{2n} = 2k) = (G_{2k} = 0) \cap (G_{2k+2} \neq 0) \cap \cdots \cap (G_{2n} \neq 0)$$

Our objective is to compute the probability distributions of these random variables.

We begin by computing the probability distribution of the random variable $G_n$. This is easily done. Let $p$ be the number of positive "steps" of the random walk, and let $q$ be the number of negative steps, so that $p + q = n$. More precisely, $p$ is a random variable which counts the number of indices $i$ for which $Y_i = 1$ in the sequence $Y_1, Y_2, \ldots, Y_n$; similarly for $q$. The event $(G_n = x)$ coincides with the event $(p = \frac{n+x}{2})$. Since $p$ is the number of successes in fair Bernoulli trials, we infer from our previous results on the Bernoulli process that the random variable $G_n$ has the binomial distribution

$$P(G_n = x) = \frac{1}{2^n} \binom{n}{\frac{n+x}{2}}.$$

The right side equals zero unless the integers $n$ and $x$ have the same parity. This fact is easily understood: in an even number of steps, a random walk can only reach an even position.

We now compute the distribution of the random variable $Z_a$. To this end, we consider the event

$$(G_n = x) \cap (Z_a \leq n)$$

for $x \leq a$. (We need to have this condition in order to use the reflection principle described below.) How many sample points (i.e., random walks) are there in this set? To calculate this integer, we use an important geometric device called the **reflection principle**. We represent every random walk by a continuous curve (or "path") in the $(x,y)$-plane. This curve takes the value $y = G_i$ at $x = i$, and joins the points $(i, G_i)$ and $(i+1, G_{i+1})$ by a straight-line segment, whose slope will obviously be $Y_i$.

We now reflect the portion of this curve between 0 and $Z_a$ across the horizontal line $y = a$, thereby obtaining a curve from $(0, 2a)$ to $x$, and conclude that the number of curves in the set displayed above is the same as the number of curves from $(0, 2a)$ to $(n, x)$.

![Figure: Illustration of the reflection principle showing a random walk path being reflected across the line y = a](image_placeholder)

By a change of variables for the $y$-axis, it is seen that the number of curves in the latter set equals the number of curves starting at $(0,0)$ and ending at $(n, x - 2a)$. We have proved the following statement:

For $a$ and $x$ given, and for $x \leq a$, the set of all random walks such that $G_n = x$ and $Z_a \leq n$ is in natural one-to-one correspondence with the set of all curves of random walks such that $G_n = x - 2a$. Taking probabilities, we obtain

$$P((G_n = x) \cap (Z_a \leq n)) = P(G_n = x - 2a),$$

for $x \leq a$.

The preceding argument is geometrically obvious. It may however be instructive to repeat the same argument in probabilistic terms, as we shall now do. To a random walk $(Y_1, Y_2, \ldots) = \omega$, (recall that a random walk is a sample point in the sample space $\Omega$ of all infinite random walks) we associate another random walk $\omega' = (Y'_1, Y'_2, \ldots)$, where the random variables $Y'_i$ are defined according to the following rule: set $Y'_i = -Y_i$ if $i \leq Z_a(\omega)$, and set $Y'_i = Y_i$ if $i > Z_a(\omega)$.

If $Z_a = k$, we have $G_k = a$ and $G'_k - G_k = x - a$, hence $G'_k = G_k - a = -a$ and $G'_n = G'_n - G'_k + G'_k = G_n - G_k + G'_k = x - a - a = x - 2a$. Thus, the sample point $\omega'$ belongs to the set $(G'_n = x - 2a)$.

Conversely, given a sample point $\omega' = (Y'_1, Y'_2, \ldots)$ belonging to this set, let $U_a$ be the first time a random walk touches position $-a$. This time necessarily occurs before the $n$-th step. Now set $Y_i = -Y'_i$ if $i \leq U_a(\omega')$ and $Y_i = Y'_i$ otherwise. In this way we get back the sample point $\omega$.

To conclude, we have set up a one-to-one correspondence between the two sets $(G_n = x) \cap (Z_a \leq n)$ and the set $(G_n = x - 2a)$, as desired. To conclude the derivation of the probability distribution of the random variable $Z_a$ we proceed as follows. By the law of alternatives we have

$$P(Z_a = n) = P(Z_a = n \mid Y_n = 1) P(Y_n = 1) + P(Z_a = n \mid Y_n = -1) P(Y_n = -1)$$

But the second of the alternatives on the right is impossible, and as far as the first goes, we remark that

$$P(Z_a = n \mid Y_n = 1) = P((G_{n-1} = a - 1) \cdot (G_{n-1} \leq a - 1) \cap (Z_a < n-1))$$

$$= P(G_{n-1} = a-1) - P((G_{n-1} = a-1) \cap (Z_a < n-1)).$$

The term after the minus sign is computed by the reflection principle, giving

$$P(Z_a = n) = \frac{P(G_{n-1} = a-1) - P(G_{n-1} = 2a - (a-1))}{2}$$

Using the probability distribution of $G_n$, the above is computed to be

$$P(Z_a = n) = \frac{a}{n \cdot 2^n} \binom{n}{\frac{n+a}{2}}.$$

We next compute the distribution of the random variable $M_n$. Again we shall use the reflection principle. Let $x$ and $a$ be (as usual) integers, and let $x \leq a$. The event

$$(M_n \geq a) \cap (G_n = x)$$

is the event that a random walk with $G_n = x$ touches or crosses level $a$. By the reflection principle, the number of such random walks (i.e. of sample points) equals the number of elements in the set $(G_n = x - 2a)$. Hence, for $x \leq a$,

$$P((M_n \geq a) \cap (G_n = x)) = P(G_n = x - 2a).$$

Hence, again for $x \leq a$,

$$P((M_n = a) \cap (G_n = x)) = P((M_n \geq a) \cap (G_n = x)) - P((M_n \geq a+1) \cap (G_n = x))$$

$$= P(G_n = x - 2a) - P(G_n = x - 2a - 2).$$

But

$$P(M_n = a) = \sum_x P((M_n = a) \cap (G_n = x))$$

For the sum on the right side, each term is computed by the argument just given. Substituting and adding, we obtain a telescoping sum which simplifies to

$$P(G_n = a) + P(G_n = a-1).$$

Note that one of the two terms always equals zero by parity. This completes the computation of the probability distribution of the random variable $M_n$.

### The Arcsine Law

The arcsine law is the distribution of the time of the last visit of a random walk to the origin. More precisely, consider a random walk up to time $2n$, and ask when the last time was that the random walk visited the origin. Let $L_{2n}$ be the time of the last visit. Clearly the random walk can only visit the origin during even-numbered times. We want, therefore, to compute $P(L_{2n} = 2k)$ for all $k$ between 0 and $n$.

Now examine the event $(L_{2n} = 2k)$. We can rephrase this event as saying that the random walk was at the origin at time $2k$, and that from then on the random walk never visited the origin:

$$(L_{2n} = 2k) = (G_{2k} = 0) \cap (G_{2k+2} \neq 0) \cap \cdots \cap (G_{2n} \neq 0)$$

The law of alternatives tells us that

$$P(L_{2n} = 2k) = P(L_{2n} = 2k \mid G_{2k} = 0) P(G_{2k} = 0)$$

$$+ P(L_{2n} = 2k \mid G_{2k} \neq 0) P(G_{2k} \neq 0).$$

The second term equals zero, since the conditioned event is impossible. The first term simplifies to

$$P(L_{2n} = 2k) = P(L_{2n-2k} = 0) P(G_{2k} = 0),$$

since the conditioned event states that the portion of the random walk between $2k$ and $2n$ cannot visit the origin, and this portion of the random walk is a random walk with $2n - 2k$ steps.

We are therefore reduced to computing $P(L_{2n-2k} = 0)$. By the law of alternatives again we have

$$P(L_{2n-2k} = 0) = \frac{P(L_{2n-2k} = 0 \mid Y_1 = 1)}{2} + \frac{P(L_{2n-2k} = 0 \mid Y_1 = -1)}{2}$$

and by symmetry the right side equals

$$P(L_{2n-2k} = 0 \mid Y_1 = -1).$$

But this conditioned event is the event that a random walk of $2n - 2k - 1$ steps starting at $-1$ shall never visit position 0. After a trivial change of variables, this is the probability that a random walk starting at 0 shall have its maximum at 0 (i.e. never visit position 1) in the first $2n - 2k - 1$ steps, a probability that we have already computed:

$$P(M_{2n-2k-1} = 0) = P(G_{2n-2k-1} = 0) + P(G_{2n-2k-1} = -1).$$

The first term on the right is 0 by parity considerations. The second is computed by the law of alternatives followed by a symmetry argument, as follows:

$$P(G_{2n-2k} = 0) = P(G_{2n-2k} = 0 \mid Y_n = 1) P(Y_n = 1)$$

$$+ P(G_{2n-2k} = 0 \mid Y_n = -1) P(Y_n = -1)$$

$$= \frac{P(G_{2n-2k-1} = -1) + P(G_{2n-2k-1} = 1)}{2}$$

$$= P(G_{2n-2k-1} = -1).$$

Putting it all together, we conclude that

$$P(L_{2n} = 2k) = P(G_{2n-2k} = 0) \; P(G_{2k} = 0).$$

This result is known as the **discrete arcsine law**. Note the apparent paradox: the probability that the last visit to the origin is close to the origin is the same as the probability that the last visit to the origin is close to $n$.

We now show why this is called the arcsine law. Using Stirling's formula, we find that

$$P(G_{2n-2k} = 0) \; P(G_{2k} = 0) = \binom{2n-2k}{n-k} \frac{1}{2^{2n-2k}} \cdot \binom{2k}{k} \frac{1}{2^{2k}}$$

$$\approx \frac{(2n-2k)!}{((n-k)!)^2} \cdot \frac{(2k)!}{(k!)^2} \cdot \frac{1}{2^{2n}}$$

$$\approx \frac{1}{\sqrt{(n-k)}} \cdot \frac{1}{\sqrt{k}} \cdot \frac{1}{\sqrt{\pi}} \cdots$$

Set $x = \frac{k}{n}$. Then $P(L_{2n} = 2k) \approx \frac{1}{\pi \sqrt{x(1-x)}}$. Thus when $n$ is large the distribution function of $L_{2n}$, $P(L_{2n} \leq 2k)$, is approximately equal to the area from 0 to $\frac{k}{n}$ of the function $f(x) = \frac{1}{\pi \sqrt{x(1-x)}}$:

$$P(L_{2n} \leq 2k) \approx \int_0^{\frac{k}{n}} \frac{dx}{\pi \sqrt{x(1-x)}}$$

Using the substitution $y = \sqrt{x}$, we find that

$$\int_0^{\phi} \frac{dx}{\pi \sqrt{x(1-x)}} = \int \frac{2 \sqrt{x} \, dy}{\pi \sqrt{x(1-x)}} = \int_0^{\sqrt{\phi}} \frac{2}{\pi} \cdot \frac{1}{\sqrt{1 - y^2}} \, dy$$

$$= \frac{2}{\pi} \arcsin(y) = \frac{2}{\pi} \arcsin(\sqrt{\phi}).$$

Thus,

$$\boxed{P(L_{2n} \leq 2k) = \frac{2}{\pi} \arcsin\!\left(\sqrt{\frac{k}{n}}\right)}$$
$$\text{The Arcsine Law}$$

Summarizing, let $L_{2n}$ be the time of the last visit of a $2n$-step random walk to the origin. Then

$$P(L_{2n} = 2k) = P(G_{2n-2k} = 0) \; P(G_{2k} = 0) = \frac{1}{\pi \sqrt{k(n-k)}}$$

$$\text{and} \quad P(L_{2n} \leq 2k) = \frac{2}{\pi} \arcsin\!\left(\sqrt{\frac{k}{n}}\right)$$

Here is an example of this law. A gambler plays a fair game, betting one dollar every ten seconds on the toss of a fair coin. If the gambler plays for a whole year, what is the probability the last time the gambler "broke even" occurred after one day of play (i.e. the gambler had either a "winning streak" or a losing streak" for 364 days). The arcsine law provides an excellent approximation of this probability:

$$(L_{3153600} \leq 8640) = 0.0333,$$

i.e. about one chance in 30. This is amazingly large. One can analyze the fluctuations of coin tossing in even more detail. The surprising conclusion is that it is very unlikely for a random walk to spend close to the same amount of time on both sides of the origin. Yet the expectation of $G_n$ is zero for all $n$. Thus a naive observer would regard the behavior of a typical observation of a random walk as being decidedly **un**random.

## 5. Continuous Conditional Probability

Consider the uniform process of sampling $n$ points from the interval $[0,a]$. Suppose we know that the $k$th point in order, $X_{(k)}$, was $t$. Given this information, what is the smallest point, $X_{(1)}$? It seems reasonable to answer this question with the conditional probability distribution

$$F(x) = P(X_{(1)} \leq x \mid X_{(k)} = t)$$

of $X_{(1)}$ given that $X_{(k)} = t$. Unfortunately, we know that $P(X_{(k)} = t) = 0$; so that, technically speaking, the above conditional probability does not make sense. On the other hand, it is easy to compute what $P(X_{(1)} \leq x \mid X_{(k)} = t)$ **ought** to mean. For suppose that $X_{(k)} = t$. This means that exactly $k-1$ points have fallen in the interval $[0,t]$. The random variable $X_{(1)}$ should therefore be reinterpreted as the first order statistic of the Uniform process of dropping $k-1$ points in the interval $[0,t]$. Therefore

$$P(X_{(1)} \leq x \mid X_{(k)} = t) = 1 - \left(\frac{t - x}{t}\right)^{k-1}.$$

Notice that we do not have to "choose" the $k-1$ points which are to fall in $[0,t]$. This choice is already implicit in the fact that we have conditioned by $(X_{(k)} = t)$.

Although we cannot make sense, in general, of a conditional probability $P(A|B)$ when $P(B) = 0$, we can do so when $B$ is the event $(X = t)$ for a continuous random variable $X$. We will call this the **continuous conditional probability** (although we shall often drop the adjective "continuous.") The following is the formal definition of this concept. But one rarely uses the definition directly. As with ordinary conditional probability, the best way to compute a continuous conditional probability is to regard the condition as defining a new sample space and to reinterpret the events and random variables of the old sample space in this new sample space.

**Definition.** For an event $A$ and a continuous random variable $X$, the **continuous conditional probability** of $A$ given that $X = t$ is

$$P(A \mid x = t) = \lim_{\epsilon \to 0} P(A \mid t < X \leq t + \epsilon)$$

$$= \lim_{\epsilon \to 0} \frac{P(A \cap (t < X \leq t + \epsilon))}{P(t < X \leq t + \epsilon)}$$

provided that it exists. Notice that we do not divide by $\epsilon$. The reason is that $\epsilon$ appears in both the numerator and the denominator. If you wish, $P(A|X = t)$ is the limit:

$$\lim_{\epsilon \to 0} \frac{\frac{P(A \cap (t < X \leq t + \epsilon))}{\epsilon}}{\frac{P(t < X \leq t + \epsilon)}{\epsilon}}$$

Both the numerator and the denominator in this limit have densities as their limits.

### The Continuous Law of Alternatives

One of the most important facts about continuous conditioning is that the law of alternatives has a continuous version. Indeed continuous conditional probabilities are important primarily because of this. Recall that if a set of events $A_1, A_2, \ldots$ form a set of alternatives, then the probability of any event $B$ is

$$P(B) = \sum_i P(B|A_i) \; P(A_i).$$

For continuous conditional probabilities, we replace the alternatives $A_i$ by the "alternatives" $(X = t)$, where $t$ takes on all real values, and we replace the sum by an integral.

For any continuous random variable $X$ and event $A$ for which the continuous conditional probabilities $P(A|X = t)$ exist,

$$\boxed{P(A) = \int P(A \mid X = t) \, \text{dens}(X = t) \, dt}$$
$$\text{Continuous Law of Alternatives}$$

We will give a rigorous proof of this law. The key fact we need is the Mean Value Theorem of Calculus. Recall what this says. If $f$ is a continuous function on the interval $[a,b]$, then for some point $x$ between $a$ and $b$,

$$f(x) = \frac{1}{b-a} \int_a^b f(x) \, dx.$$

### Proof of the Continuous Law of Alternatives

Let $\epsilon > 0$ be a small number. Divide up the real line into intervals of length $\epsilon$ by the points $t_n = n\epsilon$.

Take $B_i$ to be the event $(t_i < X \leq t_{i+1})$. Then the $B_i$ set of alternatives. By the (ordinary) law of alternatives

$$P(A) = \sum_i P(A|B_i) P(B_i)$$

$$= \sum_i P(A \mid t_i < X \leq t_{i+1} + \epsilon) P(t_i < X \leq t_{i+1} + \epsilon).$$

By the mean value theorem applied to $f(t) = \text{dens}(X = t)$, there is some $\hat{t}_i$ in the interval $[t_i, t_{i+1}]$ such that

$$f(\hat{t}_i) = \frac{1}{\Delta t} \int_{t_i}^{t_{i+1}} f(t) \, dt = \frac{1}{\Delta t} P(t_i < X \leq t_{i+1} + \epsilon)$$

or

$$P(t_i < X \leq t_{i+1} + \epsilon) = f(\hat{t}_i) \cdot \Delta t_i.$$

Now as $\epsilon \to 0$ this last sum approaches

$$\int P(A|X = t) \, f(t) \, dt,$$

by the definition of the integral. We have therefore proved the continuous law of alternatives.

Notice that we used the fact that the density of $X$, $f(t) = \text{dens}(X = t)$, is continuous. Actually, in practice it will only be piecewise continuous. This technical detail will never bother us. The continuous law of alternatives holds in this case also. The continuous law of alternatives is by far one of the most useful tools of probability. In section 7 we will apply the law of alternatives to the "needles on a stick" problem mentioned in the introduction.

## 6. Conditional Densities

In most computations concerning continuous random variables, the densities are much easier to handle. We can give density versions of conditional probability, continuous conditional probability and the continuous law of alternatives.

Let us begin with the simplest case: conditional density. Suppose we have an event $B$ such that $P(B) > 0$ and a random variable $Y$. The distribution of $Y$ given that $B$ has occurred is

$$F(s) = P(Y \leq s \mid B).$$

In general it is possible that a continuous random variable can fail to be continuous after conditioning, as we saw in the previous section. But if it is still continuous, we may speak of the **conditional density of $Y$ given $B$**:

$$\text{dens}(Y = s \mid B) = F'(s) = \frac{d}{ds} P(Y \leq s \mid B).$$

If the event $B$ is of the form $(X = t)$, then the conditional density can be defined by a limiting process just as we did in the last section. More precisely, the **continuous conditional density** of $Y$ given $X = t$ is

$$\text{dens}(Y = s \mid X = t) = \lim_{\epsilon \to 0} \text{dens}(Y = s \mid t < X \leq t + \epsilon),$$

if this limit exists. If $\text{dens}(X = t) \neq 0$, then

$$\text{dens}(Y = s \mid X = t) = \frac{\text{dens}(Y = s, X = t)}{\text{dens}(X = t)}$$

exactly as one would expect.

Consider again the example of section 5. The conditional density $\text{dens}(X_{(1)} = x \mid X_{(k)} = t)$ when $x < t$, is the same as the density $\text{dens}(X_{(1)} = x)$ but for the process of dropping $k-1$ points on $[0,t]$, i.e.

$$\text{dens}(X_{(1)} = x \mid X_{(k)} = t) = \frac{(k-1)(t-x)^{k-2}}{t^{k-1}}.$$

We could also compute this as follows:

$$\text{dens}(X_{(1)} = x \mid X_{(k)} = t) = \frac{\text{dens}(X_{(1)} = x, X_{(k)} = t)}{\text{dens}(X_{(k)} = t)}.$$

The two densities on the right were computed in section III.3:

$$\text{dens}(X_{(k)} = t) = \binom{n}{k-1} \frac{t^{k-1}(a-t)^{n-k}}{a^n}$$

$$\text{dens}((X_{(1)} = x) \cap (X_{(k+1)} = t)) = \binom{n}{0, 1, k-2, 1, n-k} \frac{(t-x)^{k-2}(a-t)^{n-k}}{a^n}.$$

Therefore,

$$\text{dens}(X_{(1)} = x | X_{(k)} = t) = \frac{(k-1)(t-x)^{k-2}}{t^{k-1}}.$$

### The Continuous Bayes' Law

By using conditional densities one can formulate a continuous version of Bayes' Law. Suppose we have two random variables $X$ and $Y$. We call $X$ the "cause" and $Y$ the "effect." For example $X$ may represent a parameter in an experiment we cannot measure directly, while $Y$ is some directly measurable quantity we want to determine the effect on the distribution of $X$ caused by a particular observation of $Y$. As in the discrete Bayes' law, we assume that we know the a priori distribution of $X$, $\text{dens}(X = x)$, as well as the conditional densities of $Y$ given a value of $X$, $\text{dens}(Y = y \mid X = x)$. By a calculation almost identical to the one for the discrete Bayes' law, we have this formula:

$$\boxed{\text{dens}(X = x \mid Y = y) = \frac{\text{dens}(Y = y \mid X = x) \; \text{dens}(X = x)}{\int \text{dens}(Y = y \mid X = u) \; \text{dens}(X = u) \; du}}$$
$$\text{Continuous Bayes' Law}$$

### Continuous Law of Successive Conditioning

In similar manner as that above, one can state a continuous analog of the law of successive conditioning. We leave the details as an exercise.

If $X_1, X_2, \ldots, X_n$ are a sequence of continuous random variables, then their joint density is given by:

$$\boxed{\text{dens}(X_1 = t_1, X_2 = t_2, \ldots, X_n = t_n) = \text{dens}(X_1 = t_1) \; \text{dens}(X_2 = t_2 \mid X_1 = t_1) \cdots \text{dens}(X_n = t_n \mid X_1 = t_1, \ldots, X_{n-1} = t_{n-1})}$$
$$\text{Continuous Law of Successive Conditioning}$$

Here the limits of integration stem from the fact that $B_{n,h}$ can only occur if the largest point falls so that the right most gap, $L_{n+1}$, is larger than $h$ and so that there is enough "room" for $n-1$ gaps of size $h$ to the left of $X_{(n)}$. Now $P(B_{n,h} \mid X_{(n)} = t)$ is the same as the probability of dropping $n-1$ points on $[0,t]$ so that all gaps are at least $h$ and also so that the largest point, $X_{(n)}$, falls at least distance $h$ from 1. Thus

$$P(B_{n,h} \mid X_{(n)} = t) = P(B_{n,1})$$

We may therefore use mathematical induction. For if we write $p_n(a) = P(B_{n,h})$, then

$$p_n(a) = \int_{(n-1)h}^{a-h} p_{n-1}(1 - \frac{n}{a} t^{n-1}) \; dt.$$

Consider $P_1(a)$. This is the probability that a point dropped on $[0,a]$ falls farther than distance $h$ from $a$. So $P_1(a) = \frac{a-h}{a}$. More generally the above inductive formula can be used to deduce that $p_n(a) = \left(\frac{a - nh}{a}\right)^n$.

To compute $P(A_{n,h})$ from what we know about $P(B_{n,h})$, we condition on the largest point $X_{(n)}$. It is easy to see that $P(A_{n,h} \mid X_{(n)} = t) = P(B_{1,n-1})$. Therefore, as above,

$$P(A_{n,h}) = \int_{(n-1)h}^{1} P(A_{n,h} | X_{(n)} = t) \; \text{dens}(X_{(n)} = t) \; dt$$

$$= \int_{(n-1)h}^{1} P(B_{1,n-1}) \cdot \frac{n}{a^n} t^{n-1} \; dt$$

$$= \int_{(n-1)h}^{1} \frac{n}{a^n} \left(\frac{t - (n-1)h}{1}\right)^{n-1} \cdot \frac{n \cdot t^{n-1}}{a} \; dt$$

$$= \frac{n \left(1 - (n-1)h\right)^n}{a^n}$$

$$= \left(\frac{a - nh}{a}\right)^n \qquad \text{(provided } a \geq nh\text{)}$$

<!-- Judgement call: Page 228 contains handwritten annotations by what appears to be a student. These are not transcribed. -->

### Exchangeability of the Gaps

Recall that we stated in section II.3 that the gaps $L_i$ in the Uniform process are equidistributed but that we gave only an intuitive justification. We can now give a rigorous proof using conditional density.

## 7. Gaps in the Uniform Process

As an application and illustration of the conditioning techniques just introduced, we give a detailed and rigorous treatment of the gaps $L_i$ in the Uniform Process. We begin with the problem posed in the introduction. Namely, if we drop a set of needles, each of length $h$, on a stick of length $b$, what is the probability that one of the needles overlap?

### Needles on a Stick

We first restate the problem in terms of the Uniform process. The position of a given needle is completely determined by its left endpoint. The process of dropping $n$ needles of length $h$ on a stick of length $b$ is then the same as dropping $n$ points on the interval $[0, b-h]$. Write $a = b - h$.

![Figure: Diagram showing 5 needles of length h on a stick of length b, equivalent to 5 points on an interval of length a = b-h](image_placeholder)

Now two needles are non-overlapping if and only if their left endpoints are at least a distance $h$ apart. Let $A_{n,h}$ be the event "n needles on a stick of length $b = a + h$ do not overlap." Then

$$P(A_{n,h}) = P((L_1 \geq h) \cap (L_2 \geq h) \cap \ldots \cap (L_{n+1} \geq h)) = P\left(\left(\min_{1 \leq i \leq n} L_i\right) \geq h\right)$$

We will first compute the probability of a slightly different event. Let $B_{n,h}$ be the event "$n$ points dropped on $[0,a]$ are all at least distance $h$ from each other **and** from the right endpoint." This is exactly the same as $A_{n,h}$ but we have added the condition that the last gap, $L_{n+1}$, also be larger than $h$, i.e.

$$B_{n,h} = (L_1 \geq h) \cap (L_2 \geq h) \cap \ldots \cap (L_{n+1} \geq h).$$

$$B_{n,h} = (L_1 \geq h) \cap (L_2 \geq h) \cap \ldots \cap (L_n \geq h) \cap (L_{n+1} \geq h).$$

To compute $P(B_{n,h})$ we condition on the position of the largest point $X_{(n)}$. The density of $L_i$ is $\text{dens}(L_i = t_i)$. Therefore, by the Law of Alternatives,

$$\text{dens}(L_2 = t_2) = \int_0^a \text{dens}(L_2 = t_2 | L_1 = t_1) \; \text{dens}(L_1 = t_1) \; dt_1.$$

Now the conditional density $\text{dens}(L_2 = t_2 \mid L_1 = t_1)$ is the same as that of the first gap in the Uniform process of dropping $n-1$ points on the interval $[0,a]$. Therefore,

$$\text{dens}(L_2 = t_2 | L_1 = t_1) = \begin{cases} \frac{(n-1)(a - t_1 - t_2)^{n-2}}{(a - t_1)^{n-1}} & 0 \leq t_2 \leq a - t_1 \\ 0 & \text{otherwise} \end{cases}$$

Hence,

$$\text{dens}(L_2 = t_2) = \int_0^{a - t_2} \frac{n-1}{(n-1)(a-t_1-t_2)^{n-2}}{(a-t_1)^{n-1}} \cdot \frac{n(a-t_1)^{n-1}}{a^n} \; dt_1$$

$$= \int_0^{a-t_2} \frac{(n-1)(n)}{a^n} (a - t_1 - t_2)^{n-2} \; dt_1$$

$$= \frac{(n-1)(n)}{a^n} \cdot \frac{(a - t_1 - t_2)^{n-1}}{n-1}$$

$$= \frac{n}{a^n} (a - t_2)^{n-1}$$

Therefore $L_1$ and $L_2$ are equidistributed.

We end with an example of the use of the law of successive conditioning. We compute the joint density of the gaps $L_1, \ldots, L_{n+1}$:

$$\text{dens}(L_1 = t_1, \; L_2 = t_2, \; \ldots, \; L_{n+1} = t_{n+1}) =$$

$$\text{dens}(L_1 = t_1) \; \text{dens}(L_2 = t_2 \mid L_1 = t_1) \; \text{dens}(L_3 = t_3 \mid L_1 = t_1, L_2 = t_2) \cdots$$

The conditional density

$$\text{dens}(L_j = t_j \mid L_1 = t_1, L_2 = t_2, \ldots, L_{j-1} = t_{j-1})$$

is the same as the density of the first gap in the Uniform process of dropping $n - j + 1$ points on $[t_1 + \cdots + t_{j-1}, a]$:

$$\frac{(n-j+1)(a - t_1 - t_2 - \cdots - t_j)^{n-j}}{(a - t_1 - t_2 - \cdots - t_{j-1})^{n-j+1}}$$

Therefore,

$$\text{dens}(L_1 = t_1, \; L_2 = t_2, \; \ldots, \; L_{n+1} = t_{n+1}) = \begin{cases} \frac{n!}{a^n} & \text{if } t_1 + \cdots + t_{n+1} = a \\ 0 & \text{otherwise} \end{cases}$$

by cancellation.

The joint density of any collection of gaps can be computed from the above formula by taking marginals. As a result we see that all the gaps are equidistributed. Even more is true: *the gaps are exchangeable*. At first this does not seem correct, but it is possible to see it intuitively if we return to the "points on a circle" interpretation of the Uniform process as in section III.3.

An immediate, and by no means obvious, consequence of the exchangeability of the gaps is that the covariance of any pair of them is the same as that of the first two.

### Table of Conditioning Laws

**Probabilities** and **Densities**:

| | Probabilities | Densities |
|---|---|---|
| Discrete | $P(A\|B) = \frac{P(A \cap B)}{P(B)}$ | $\text{dens}(X = s\|B) = \frac{d}{ds} P(X \leq s\|B)$ |
| Continuous | $P(A\|Y = s) = \lim_{\epsilon \to 0} P(A\|s < Y \leq s + \epsilon)$ | $\text{dens}(X = t \mid Y = s) = \frac{\text{dens}(X = t, Y = s)}{\text{dens}(Y = s)}$ |

**Types of Conditioning**

**Law of Alternatives**:

| | Probabilities | Densities |
|---|---|---|
| Discrete | $P(B) = \sum_i P(B\|A_i) P(A_i)$ | $\text{dens}(Y = s) = \sum_i \text{dens}(Y = s\|A_i) P(A_i)$ |
| Continuous | $P(B) = \int P(B\|X = t) \, \text{dens}(X = t) \, dt$ | $\text{dens}(Y = s) = \int \text{dens}(Y = s\|X = t) \, \text{dens}(X = t) \, dt$ |

**Bayes' Law**:

$$P(A_i|B) = \frac{P(B|A_i) P(A_i)}{\sum_j P(B|A_j) P(A_j)}$$

$$\text{dens}(X = x \mid Y = y) = \frac{\text{dens}(Y = y \mid X = x) \; \text{dens}(X = x)}{\int \text{dens}(Y = y \mid X = t) \; \text{dens}(X = t) \; dt}$$

**Law of Successive Conditioning**:

$$P(B_1 \cap B_2 \cap \cdots \cap B_n) = P(B_1) \; P(B_2|B_1) \; P(B_3|B_1 \cap B_2) \cdots P(B_n|B_1 \cap B_2 \cap \cdots \cap B_{n-1})$$

$$\text{dens}(X_1 = t_1, X_2 = t_2, \ldots, X_n = t_n) = \text{dens}(X_1 = t_1) \; \text{dens}(X_2 = t_2 \mid X_1 = t_1) \cdots \text{dens}(X_n = t_n \mid X_1 = t_1, \ldots, X_{n-1} = t_{n-1})$$

## 8. The Algebra of Probability Distributions

Very early in our study of random variables we noted that we can perform algebraic operations on them to get new random variables. We did not, however, make any systematic study of what effect an algebraic operation has on the distribution of the random variables involved. For example, if $X$ is a continuous random variable with density $f(x)$, what is the density of $2x$? The answer is most assuredly not $2f(x)$. In fact, the correct answer is $2f(2x)$. This illustrates a basic fact about algebraic operations on random variables: the effect of a simple operation on a random variable is seldom reflected in a simple way on its density. In this section we consider two kinds of operations on random variables: "change of variables" on a single random variable and the sum of two independent random variables.

### Change of Variables

Let $X$ be a continuous random variable, whose density is $f(x)$. Let $g(x)$ be an increasing function. We wish to determine the distribution of the random variable $g(X)$. To do so we must consider the distribution function of $X$, not just its density. Accordingly, let $F(x) = P(X \leq x)$, so that $f(x) = F'(x)$. The distribution function of $g(X)$ is given by $P(g(X) \leq x)$. Now we assumed that $g(x)$ was an increasing function, so it has an inverse function $G(y)$ which is also increasing. Therefore,

$$P(g(X) \leq x) = P(G(g(X)) \leq G(x)) = P(X \leq G(x)) = F(G(x)).$$

To get the density of $g(X)$ we differentiate this, using the chain rule:

$$\text{dens}(g(X) = x) = F'(G(x)) G'(x) = f(G(x)) G'(x).$$

By the inverse function principle of Calculus, $G'(x) = \frac{1}{g'(G(x))}$. Therefore we have shown:

$$\boxed{\text{dens}(g(X) = x) = \frac{f(G(x))}{g'(G(x))}}$$
$$\text{Change of Variables Formula}$$

An immediate consequence of this formula is that for any continuous random variable $X$ with distribution function $F(x)$, $F(X)$ is uniformly distributed on $[0,1]$. Thus every continuous random variable is, by a change of variables, expressible in terms of any other. This fact can be used in computer simulations of stochastic processes. Most computer systems provide a pseudo-random number generator which produces, with each call, an independent, uniformly distributed pseudo-random number from $[0,1]$. Call this number RND. If we wish to simulate a random variable $X$ whose distribution function is $F(x)$, we just use $G(\text{RND})$, where $G(y)$ is the inverse function of $F(x)$.

The change of variables formula we have given applies only to an increasing function $g(x)$. For a decreasing function, the only change is that the sign of the right-hand side must be reversed. For more complicated functions $g(x)$, one must partition the domain of $g(x)$ into intervals on which it is increasing or decreasing and apply the change of variables formula to each such interval. The results must then be combined to get the density of $g(X)$. Needless to say this can get quite intricate.

### Sums of Independent Random Variables

Suppose that $X$ and $Y$ are two random variables. Their sum is again a random variable, $X + Y$. For example, in the uniform process, $X_{(2)} = L_1 + L_2$. Now if we know the distributions of $X$ and $Y$, can we compute the distribution of the sum $X + Y$? In general, the answer is no, for we need the joint distribution in order to compute the distribution of the sum. In the above example, we cannot compute the distribution of $X_{(2)}$ from the distributions of $L_1$ and $L_2$ alone, we must know also the joint distribution of $L_1$ and $L_2$.

On the other hand, if $X$ and $Y$ are independent, we can compute their joint distribution from their individual distributions. As a result we expect that the distribution of $X + Y$ has some reasonable expression in terms of the distributions of $X$ and $Y$. Suppose for the moment that $X$ and $Y$ are independent, integer random variables with distributions

$$P(X = n) = p_n$$

$$P(Y = n) = q_n$$

Then by the law of alternatives,

$$P(X + Y = n) = \sum_k P(X + Y = n \mid Y = k) \; P(Y = k)$$

$$= \sum_k P(X = n-k \mid Y = k) \; P(Y = k).$$

Since $X$ and $Y$ are independent, $P(X = n-k \mid Y = k) = P(X = n-k)$. Therefore,

$$P(X + Y = n) = \sum_k P(X = n-k) \; P(Y = k)$$

$$= \sum_k p_{n-k} \; q_k.$$

The distribution $r_n = \sum_k p_{n-k} \; q_k$ is called the **(discrete) convolution** of the distribution $p_n$ and $q_n$.

In the case of integer random variables, we can see clearly what the convolution means: $P(X + Y = n)$ is the sum of all possible "ways" that $X + Y$ can equal $n$: $X = k$ and $Y = n - k$, for all possible $k$. In the continuous case, the sum is replaced by an integral.

Suppose that $X$ and $Y$ are independent continuous random variables having densities

$$\text{dens}(X = x) = f(x)$$

$$\text{dens}(Y = x) = g(x).$$

The density of their sum is:

$$\text{dens}(X + Y = t) = \int \text{dens}(X + Y = t \mid X = s) \; \text{dens}(X = s) \; ds$$

$$= \int \text{dens}(Y = t - s \mid X = s) \; f(s) \; ds$$

$$= \int \text{dens}(Y = t - s) \; f(s) \; ds$$

$$= \int g(t - s) \; f(s) \; ds$$

The function

$$h(t) = \int g(t-s) \; f(s) \; ds$$

is called the **convolution** of $f$ and $g$, which we shall write

$$h = f * g.$$

We have just proved that: *a sum of independent continuous random variables corresponds to convolution of the densities.*

The convolution of two functions is an important operation which appears in numerous contexts, for example dynamical systems in engineering and optics in physics, to name just two. Its appearance in probability theory is perhaps the most easily understood context in which the convolution arises. Actually there are many operations similar to the one above that go by the name "convolution." For example if we consider the special case of two continuous, positive, independent random variables $X$ and $Y$, the density of their sum is

$$h(t) = \int_0^t g(t-s) \; f(s) \; ds$$

because $f(s) = 0$ if $s < 0$ and $g(t - s) = 0$ if $s > t$. This is the form of the definition one sees most commonly.

Although it is not obvious from the definition, convolution is a commutative and associative operation. That is, for densities $f$, $g$ and $h$:

$$f * g = g * f$$

$$(f * g) * h = f * (g * h).$$

These follow from the fact that addition of random variables is commutative and associative, respectively.

As an example of a convolution, we show a result which is implicit in many of the calculations in chapter IV: the sum of normally distributed random variables is again normal. We will just take the case of two standard normal random variables, and leave the general case as an exercise. By definition, the convolution of the standard normal density with itself is given by:

$$\int_{-\infty}^{\infty} \frac{1}{\sqrt{2\pi}} e^{-\frac{x^2}{2}} \cdot \frac{1}{\sqrt{2\pi}} e^{-\frac{(t-y)^2}{2}} \; dx$$

$$= \int_{-\infty}^{\infty} \frac{1}{2\pi} e^{-\frac{x^2 + y^2 + 2xy - x^2}{2}} \; dx$$

$$= \int_{-\infty}^{\infty} \frac{1}{2\pi} e^{-\frac{(2x^2 + 2xy)}{2}} e^{-\frac{y^2}{2}} \; dx$$

$$= \frac{1}{2\pi} e^{-\frac{y^2}{2}} \int_{-\infty}^{\infty} e^{-(x + y/2)^2} \; dx$$

Using the change of variables $u = \frac{x + y}{2}$, this becomes:

$$\frac{1}{2\pi} e^{-\frac{y^2}{4}} \int_{-\infty}^{\infty} e^{-u^2} \; du = \frac{1}{2\pi} e^{-\frac{y^2}{4}} \sqrt{\pi}$$

$$= \frac{1}{\sqrt{2\pi} \; \sigma} e^{-\frac{y^2}{2\sigma^2}}, \quad \text{where } \sigma = \sqrt{2}.$$

## 9*. Geometric Probability

The theory of geometric probability is concerned with random points on the plane, spheres and other geometric objects as well as with random lines, circles and other figures. The study of such problems played a role in the development of modern probability theory, in addition to being intrinsically interesting and useful. We begin with a simple question of this type, the Buffon needle problem, which intrigued mathematicians partly because it was hard to make it rigorous and partly because the answer involved $\pi$, thereby giving one a technique whereby one could in theory define $\pi$ probabilistically.

### Buffon Needle Problem

Suppose we have a set of parallel lines drawn on the floor, each one a distance $d$ from the next:

![Figure: Set of parallel horizontal lines spaced distance d apart](image_placeholder)

Upon this set of lines we drop a needle whose length $\ell$ is smaller than the spacing $d$ of lines on the floor. We seek the probability that the needle straddles one of the lines.

![Figure: A needle of length l straddling one of the parallel lines](image_placeholder)

The difficult part of this problem historically was to make precise the meaning of "dropping a needle at random on the floor."

We do this as follows. Let $P$ be the center point of the needle. A needle drop will consist of two independent random variables $X$ and $Y$ where $X$ is uniformly distributed on $[0,d]$ and $Y$ is uniformly distributed on $[0,\pi]$.

![Figure: Diagram showing the needle geometry - X is the distance from P to the nearest line, Y is the angle](image_placeholder)

We interpret $X$ as the distance of the center of the needle from the nearest line below it (as indicated in the diagram) and $Y$ as the angle (in radians) of the needle from a position parallel to the set of lines. The strips between parallel lines on the floor are all equivalent so we need not concern ourselves with which strip the point $P$ has fallen in. Similarly we do not need to know where along the strip (left to right parallel to the lines in the diagrams above) the point $P$ has fallen. Let $A$ be the event that the needle straddles one of the lines. By the continuous law of alternatives applied twice, we have the formula:

$$P(A) = \int_0^{\pi} \int_0^d P(A|X = x, Y = \theta) \; \text{dens}(X = x) \; dx \; \frac{1}{\pi} \; d\theta$$

$$= \frac{1}{\pi} \int_0^{\pi} \left[\int_0^d P(A|X = x, Y = \theta) \; \frac{1}{d} \; dx\right] d\theta$$

$$= \frac{1}{\pi d} \int_0^{\pi} \int_0^d P(A|X = x, Y = \theta) \; dx \; d\theta$$

Geometrically it is easy to see that if $X$ is $x$ and $Y$ is $\theta$, then the needle straddles precisely when either $x + \frac{\ell}{2} \sin(\theta) \geq d$ or $x - \frac{\ell}{2} \sin(\theta) \leq 0$, as in this diagram:

![Figure: Diagram showing the geometric condition for the needle to straddle a line, with the sine component of the needle's projection marked](image_placeholder)

Therefore, $P(A \mid X = x, Y = \theta) = \begin{cases} 0 & \text{if } \frac{\ell}{2}\sin(\theta) < x < d - \frac{\ell}{2}\sin(\theta) \\ 1 & \text{otherwise} \end{cases}$. So

$$P(A) = \frac{1}{\pi d} \int_0^{\pi} \int_0^d P(A \mid X = x, Y = \theta) \; dx \; d\theta$$

$$= \frac{1}{\pi d} \int_0^{\pi} \ell \sin(\theta) \; d\theta$$

$$= \frac{1}{\pi d} \left[-\cos \theta\right]_0^{\pi} = \frac{2\ell}{\pi d}.$$

### Buffon Noodle Problem

We will now give an altogether different solution to the Buffon needle problem. In contrast to the above calculation this approach is far more "probabilistic." We first consider a needle of length $\ell$ which may now be longer than the separation $d$ of the lines on the floor. Let $X$ be the number of lines that this needle straddles. We wish to compute $E(X)$, the average number of lines straddled by this needle. Let this number be $f(\ell)$. All we can say so far is that this is an increasing function of $\ell$.

We now take two needles of lengths $\ell_1$ and $\ell_2$. As before we let $X_1$ and $X_2$ be the number of lines straddled by each of these needles. Now join the two needles together to form a needle of length $\ell_1 + \ell_2$. Whenever the large needle is dropped randomly, each subneedle, considered by itself, is also being dropped randomly.

![Figure: Diagram showing a needle composed of two joined subneedles, with the combined "noodle" being dropped on the lines](image_placeholder)

Therefore, the number of lines crossed by the needle is $X_1 + X_2$. The random variables $X_1$ and $X_2$ are not independent, but this does not stop us from using the Basic Fact of expectations to compute the expectation of $X_1 + X_2$; namely,

$$E(X_1 + X_2) = E(X_1) + E(X_2) = f(\ell_1) + f(\ell_2)$$

On the other hand, since the large needle has length $\ell_1 + \ell_2$ we also know that

$$E(X_1 + X_2) = f(\ell_1 + \ell_2).$$

Therefore,

$$f(\ell_1 + \ell_2) = f(\ell_1) + f(\ell_2)$$

It is well-known from Calculus that an increasing function which satisfies this condition must be of the form $f(\ell) = k\ell$ for some positive constant $k$.

The reasoning just employed generalizes immediately to any number of needles joined rigidly together in any manner we please:

![Figure: A "noodle" - a rigid curve made of several needle segments joined end to end](image_placeholder)

We call this a **noodle**. If $X_i$ is the number of line crossings of the $i$th needle in the noodle and if the length of the $i$th needle is $a_i$, then the average number of line crossings of the noodle is

$$E(X_1 + X_2 + \cdots + X_n) = E(X_1) + E(X_2) + \cdots + E(X_n)$$

$$= ka_1 + ka_2 + \cdots + ka_n$$

$$= k(a_1 + a_2 + \cdots + a_n)$$

$$= k\ell,$$

where $\ell$ is the length of the noodle. Since any rigid curve of finite length $\ell$ can be approximated as closely as we please by noodles, it follows that the average number of line crossings of any such curve is $k\ell$. We apply this to a circle of diameter $d$. Since the length of a circle is $\pi d$, it will have an average of $k\pi d$ line crossings. On the other hand, such a circle will always have exactly 2 line crossings. Therefore $k\pi d = 2$ and $k = \frac{2}{\pi d}$. Therefore the average number of line crossings by any rigid curve of length $\ell$ randomly dropped on the set of lines is $\frac{2\ell}{\pi d}$ exactly as before but now much more generally. Note that before we dealt with probabilities and now we are dealing with expectations. When $\ell < d$, the number of crossings of a needle is an indicator random variable and it is equal to the corresponding expectation.

### Random Points and Lines

Everyone should be familiar with the concept of **area** as developed in any Calculus course. For a figure $A$ in the plane we write $\mu(A)$ for its area, if it is finite. The concept of area obviously satisfies two of the three properties which define a probability measure. The only one which is not satisfied is the second property: the area of the whole plane is not 1, indeed it isn't finite. An assignment of a number $\mu(A)$ to certain subsets of a set $\Omega$, satisfying the first and third properties which define a probability is called a **measure**. In other words, a measure must satisfy:

*Measure property 1.* $\mu(A) \geq 0$

*Measure property 2.* If $A_1, A_2, \ldots$ is a sequence (in general infinite) of disjoint sets on which $\mu$ is defined, then $\mu(A_1 + A_2 + \cdots) = \mu(A_1) + \mu(A_2) + \cdots$

More succinctly, a measure is any nonnegative, countably additive function on a collection of subsets of a set $\Omega$.

A measure $\mu(A)$ can be used to define a probability measure if $\mu(\Omega)$ is finite: simply define $P(A)$ to be $\frac{\mu(A)}{\mu(\Omega)}$. But, of course, this doesn't work if $\mu(\Omega)$ is infinite, as in the example of area in the plane. However we can nevertheless use $\mu(A)$ to define a **conditional probability**. More precisely, if $\mu(B)$ is finite (and nonzero) and if $A$ is a subset of $B$, then the probability of a point being in $A$ given that it is in $B$ is $P(A|B) = \frac{\mu(A)}{\mu(B)}$. This is the sense in which we will mean that a measure defines a concept of probability on $\Omega$ even when $\mu(\Omega)$ is not finite.

We will now show how to define a measure on the set of straight lines in the plane, thereby defining a concept of a randomly chosen line. From Analytic Geometry we know that we can choose a coordinate system for the plane so that points of the plane correspond to ordered pairs of numbers $(x,y)$. Every line in the plane can then be represented by a linear equation in $x$ and $y$. For example every line which does not go through the origin can be represented uniquely by a linear equation of the form $ax + by = 1$. We may therefore **identify** this set of lines with the set of ordered pairs $(a,b)$, in other words, with the set of points in a second, **auxiliary** plane. The measure of area in the auxiliary $(a,b)$-plane then defines a measure of area on the set of lines not passing through the origin.

Unfortunately if we started with some other coordinate system for the plane, the above technique would, in general, produce a different measure on the set of lines of the plane. Now the concept of **area** of a plane figure does not require a choice of a coordinate system, so one naturally wonders whether one can define a measure on the set of lines, which does not depend on a choice of coordinate system. The surprising answer is that not only is there such a measure but also this measure is essentially unique.

We now show how to define the only natural concept of measure on the set of lines in the plane. As before we choose a coordinate system in the plane. We will use this to define the measure, but we will get the same measure no matter which coordinate system we use. Let $L$ be a line in the plane. Let $p$ be the distance of this line from the origin, or more precisely, the distance from the origin $O$ to the closest point $P$ on the line. Let $\theta$ be the angle (in radians) that $\overrightarrow{OP}$ makes with the positive $x$-axis. If $p$ is zero, then $O$ coincides with $P$ and we take $\theta$ to be $\frac{\pi}{2}$ less than the angle that $L$ makes with the positive $x$-axis.

![Figure: Coordinate diagram showing the parameterization of a line L by (p, theta) where p is the distance from origin to closest point P on the line](image_placeholder)

The equation of $L$ is then given by $\cos(\theta) \cdot x + \sin(\theta) \cdot y = p$. In this way every line is identified with an ordered pair $(p, \theta)$, where $p$ is nonnegative and $\theta$ is in the interval $(-\pi, \pi]$. This set of points is a "half-strip" in the plane with some parts of the boundary missing. We define the measure $\mu(A)$ of a set $A$ of lines to be its measure (area) in this half-strip.

![Figure: The auxiliary (p,theta)-half-strip with theta on vertical axis from -pi to pi, and p on horizontal axis from 0 to infinity](image_placeholder)

We call this measure the **invariant measure** on the set of lines of the plane. The use of the word "invariant" indicates the lack of dependence of this measure on the choice of a coordinate system. We would like to **prove** that this is so. Unfortunately this is not an easy fact to prove, but the idea of the proof will gradually emerge as we try to get an intuition about this measure, and we will end this section with a rigorous proof of this fact.

We now consider some examples of sets of lines. Let $C$ be the circle of radius $r$ in the plane, centered at the origin. Let $A$ be the set of all lines which meet $C$. What is the measure of $A$? To answer this consider what it means for the line $L$ corresponding to the point $(p, \theta)$ in the auxiliary half-strip to be in $A$. It is easy to see that $L$ is in $A$ if and only if $p \leq r$. The lines for which $p = r$ are tangent to $C$, and the rest cut $C$ at two points. Therefore in the auxiliary half-strip, $A$ corresponds to this figure:

![Figure: Rectangle in the (p,theta)-half-strip corresponding to lines meeting a circle of radius r: 0 <= p <= r, -pi < theta <= pi](image_placeholder)

As a result we see that $\mu(A)$ is $2\pi r$. By the invariance of $\mu$ we conclude that the measure of the set of lines cutting any circle of radius $r$ is also $2\pi r$. We use this to compute the answer to the following question: *if a circle $C$ of radius $r$ is inside a circle $D$ of radius $s$ what is the conditional probability for a random line to meet $C$ given that it meets $D$*. Let $A$ be the set of lines meeting $C$ and $B$ the set of lines meeting $D$. Since $C$ was assumed to be inside $D$, we see that $A$ is a subset of $B$, for if a line meets $C$ it necessarily meets $D$ also. The conditional probability is then given by $P(A|B) = \frac{\mu(A)}{\mu(B)} = \frac{2\pi r}{2\pi s} = \frac{r}{s}$. In other words, this conditional probability measures the ratio of the lengths of the **circumferences** of $C$ and $D$. Contrast this with the situation for points: the conditional probability for a point to lie in $C$ given that it lies in $D$ is the ratio, $\frac{\pi r^2}{\pi s^2}$ of the **areas** of $C$ and $D$.

As another example we consider the set of lines which meet a line segment of length $\ell$. By the invariance of our measure with respect to change of coordinates we may situate our line segment in any convenient place in the plane. The most convenient turns out to be from the origin $O$ to the point $Q = (0, \ell)$. It is easy to verify that a line $L$ corresponding to the point $(p, \theta)$ in the auxiliary half-strip meets the line segment $\overline{OQ}$ when $\theta$ is between 0 and $\pi$ and $p$ is at most $\ell \sin(\theta)$.

![Figure: Diagram showing the geometric relationship between a line L and the line segment OQ](image_placeholder)

As a result, the lines cutting $\overline{OQ}$ correspond to this set in the auxiliary half-strip:

![Figure: Region in auxiliary (p,theta) half-strip bounded by p = l*sin(theta) for 0 <= theta <= pi](image_placeholder)

It is easy to compute that the area of this region is $2\ell$. This result generalizes exactly as in the Buffon noodle problem. Let $C$ be a curve in the plane of length $\ell$. For a given line $L$ with parameters $(p, \theta)$, let $n(p, \theta)$ be the number of intersections of $L$ with $C$. Then

$$\int_0^{\pi} \left(\int_0^{\infty} n(p, \theta) \, dp\right) d\theta = 2\ell.$$

The double integral on the left-hand side above is the analog of the expectation or average of the number of crossings of a random line with $C$. This formula is called **Crofton's formula**. It has the interesting consequence that it allows us to **define** the length of a curve in a purely probabilistic manner.

We now apply Crofton's formula to the case of the circumference of a convex figure $F$ in the plane. Recall that a figure $F$ in the plane is convex if for any pair of points $P$ and $Q$ in $F$, the entire line segment $\overline{PQ}$ is also in $F$. It follows that every line in the plane either misses $F$ entirely, is tangent to it, or cuts it thereby meeting its circumference in exactly 2 points. The set of lines which are tangent to $F$ are easily seen to have measure zero since they correspond to a curve having finite length in the auxiliary $(p,\theta)$-half-strip and such curves have zero area. So we can ignore such tangent lines. Now Crofton's formula tells us that

$$\int_0^{\pi} \left(\int_0^{\infty} n(p, \theta) \, dp\right) d\theta = 2\ell,$$

where $\ell$ is the length of the circumference of $F$.

![Figure: A complex convex figure F with some lines cutting it](image_placeholder)

On the other hand, $n(p, \theta)$ is 2 when the line corresponding to $(p, \theta)$ cuts $F$ and is zero otherwise. Therefore,

$$\int_0^{\pi} \left(\int_0^{\infty} n(p, \theta) \, dp\right) d\theta = 2\mu(A),$$

where $A$ is the set of lines cutting $F$. Hence $\mu(A) = \ell$. We showed earlier that this was true for circles, and we have now generalized it to an arbitrary convex figure! Just imagining trying even to draw the region $A$ for a more complex figure, and one will begin to appreciate the power of probabilistic reasoning.

We mention in passing that the above result applies in particular to a line segment of length $\ell$, since it is convex. But we earlier showed that the set of lines crossing such a line segment as measure $2\ell$. This leads us to the paradoxical result that the circumference of a line segment ought to be $2\ell$ and not $\ell$. To see why this must be so just think of a line segment as a limit of "lens-shaped" figures:

![Figure: A sequence of lens-shaped figures converging to a line segment](image_placeholder)

As a convex figure, therefore, a line segment has two "sides."

We are now finally ready to prove the crucial fact that the measure on lines defined above is invariant with respect to change of coordinate system. First note that every coordinate system in the plane is obtainable from our original system by a sequence of three transformations: a translation along the $x$-axis, followed by a translation along the $y$-axis, followed by rotation. These are indicated in this diagram:

![Figure: Diagram showing the three transformations: translation in x-direction, translation in y-direction, and rotation](image_placeholder)

We will check that each of these transformations leaves our measure unaltered. The easiest to check is rotation. When we rotate our coordinate system, the distance from any line to the origin is unchanged. So the only effect on our $(p, \theta)$ representation is to add a constant to $\theta$ (modulo $2\pi$ as usual). Clearly this leaves our measure unchanged.

Next consider translations in the $x$- or $y$-direction. By our remarks about rotation above, it suffices to consider just one of these. Consider a translation in the $y$-direction by a distance $\ell$. Write $(p, \theta)$ for the parameters of $L$ in the old $(x,y)$-coordinate system and $(p', \theta')$ for the parameters in the new $(x', y')$-coordinate system.

![Figure: Two coordinate systems showing how the parameters (p,theta) change under translation](image_placeholder)

From the above diagram it should be clear that $\theta'$ coincides with $\theta$ when $L$ does not meet $\overline{OQ}$ and $\theta' = \theta - \pi$ when $L$ does meet $\overline{OQ}$. Similarly, for a given angle $\theta$, if we refer to the pertinent diagram we see that $p' = p - \ell \sin(\theta)$ when $L$ does not meet $\overline{OQ}$ (note that $\sin\theta < 0$ when $L$ crosses the negative $y$-axis of the old coordinate system) and $p' = \ell \sin(\theta) - p$ when $L$ does meet $\overline{OQ}$. Therefore the Jacobian matrix of the transformation $(p, \theta) \to (p', \theta')$ is

$$\begin{bmatrix} \frac{\partial p'}{\partial p} & \frac{\partial p'}{\partial \theta} \\ \frac{\partial \theta'}{\partial p} & \frac{\partial \theta'}{\partial \theta} \end{bmatrix} = \begin{cases} \begin{bmatrix} -1 & \ell \cos\theta \\ 0 & 1 \end{bmatrix} & \text{when } L \text{ meets } \overline{OQ} \\ \begin{bmatrix} 1 & \ell \cos\theta \\ 0 & 1 \end{bmatrix} & \text{otherwise} \end{cases}$$

In either case the absolute value of the Jacobian (the determinant of the Jacobian matrix) is precisely 1. Thus the measure of areas in the $(p, \theta)$-half-strip is unaffected by the transformation $(p, \theta) \to (p', \theta')$, and our result follows.

To give some idea of what this transformation does to the $(p, \theta)$-half-strip, we illustrate how some regions are transformed. Consider the set $A$ of lines meeting $\overline{OQ}$:

![Figure: Two auxiliary half-strip diagrams showing how the transformation p' = l*sin(theta) - p, theta' = theta - pi maps the region corresponding to lines meeting OQ](image_placeholder)

The transformation takes horizontal lines to horizontal lines but reverses them. Without the Jacobian calculation it would not be obvious that this transformation preserves areas. Next consider the set $B$ of lines crossing the negative $y$-axis in the old coordinate system:

![Figure: Two auxiliary half-strip diagrams showing how the set B transforms under the translation](image_placeholder)

This time the transformation simply "shoves" the bottom half of the strip to "make room" for the region corresponding to $A$, shifting horizontal lines to the right.
