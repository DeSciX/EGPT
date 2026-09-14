---
title: "Chapter IV: Random Variables"
author: "Gian-Carlo Rota"
edition: "1992"
chapter_number: 4
source: "Twelve Problems in Probability No One Likes to Bring Up — MIT Lecture Notes, 1992 Edition"
pages: "78–112"
---

# Chapter IV: Random Variables

A random variable is a new way of answering questions about nature. For example, suppose we toss a coin. How long will it take to get the first head? How can one answer such a question? Sometimes the first head will appear on the first toss, sometimes on the next and so on. Clearly we cannot answer such a question with a single number. The originality of the probabilistic point of view is that it answers such a question with a series of possible answers, each with its own probability.

The intuitive idea of a random variable is that it is the strengthening of the notion of a variable. Recall from calculus and algebra that a *variable* is a symbol together with a set over which the symbol ranges. For example, in calculus one often says, "let x be a variable ranging over the real numbers" or more succinctly, "let x be a real variable." Now a **random variable** (or R.V. for short) is a variable together with the probability that it takes each of its possible values.

In particular, an **integer random variable** is a variable n ranging over the integers together with the probability $p_n$ that it takes the value $n$. Implicit in this is that $\sum p_n = 1$, which means that the random variable always takes some value or other. Some of the $p_n$ can be zero, which means that these integers do *not* occur as values of the random variable. For example, if $p_n = 0$ whenever $n \le 0$, then the random variable is said to be **positive**, i.e. it takes only positive integral values.

## 1. Integer Random Variables

We're now ready for the precise mathematical definition. Don't be surprised if at first this notion doesn't appear to match what we've just been led to expect. It has taken an enormous amount of time and effort to make this notion rigorous so it will require some effort and many examples to make this concept clear.

An **integer random variable** is a function X, defined on a sample space $\Omega$, which takes only integer values. Namely, for every sample point $\omega \in \Omega$, $X(\omega)$ is an integer. The (probability) **distribution** of X is the sequence of numbers $p_n$ such that $p_n$ is the probability of the event "X equals n." The event "X equals n" is usually written $(X=n)$. As a subset of $\Omega$, this event is $(X=n) = \{\omega \in \Omega : X(\omega) = n\}$. We shall generally avoid writing out this set explicitly each time. One should develop an intuitive feeling for the event $(X=n)$.

Of course we have implicitly assumed that the subsets $(X=n)$ really are events of the sample space $\Omega$. This is a technical point that will never be of direct concern to us. Suffice it to say that a full rigorous definition of an integer random variable is: a function X on a sample space $\Omega$ such that its values are all integers and such that the subsets $(X=n)$ are all events of $\Omega$.

The probability distribution of an integer R.V. X always satisfies $p_n \ge 0$ for all n and $\sum p_n = 1$. The former property expresses the fact that the $p_n$ are probabilities, while the latter says that X always takes some value.

The intuitive idea of a random variable relates to the precise definition of a random variable in the following way. Whenever we have some measurement with probabilities, look for a sample space and a function on it. The random variable then really comes from observing some phenomenon on this sample space. The fact that we only had a probability distribution at first arose from the fact that we had forgotten about the phenomenon from which the measurement came.

### The Bernoulli Process: Tossing A Coin

Recall that $\Omega$ is the set of all infinite sequences of zeros and ones corresponding to the tosses of a biased coin with probability p of coming up heads (or one) and q coming up tails (or zero). Let $W_1$ be the waiting time for the first head. In other words we ask the question: how long do we have to wait to get the first head? The answer is a probability distribution $p_n$, where $p_n$ is the probability that we must wait until the $n^{\text{th}}$ toss to get the first head. In terms of the terminology of R.V.'s:

$$p_n = P(W_1 = n)$$

How can we compute this? Well, the event $(W_1 = n)$ is the event, "at the $n^{\text{th}}$ toss we get a head and the preceding n-1 tosses are all tails." In terms of elementary events:

$$(W_1 = n) = T_1 \cap T_2 \cap \ldots \cap T_{n-1} \cap H_n$$

Therefore $p_n = P(W_1 = n) = q^{n-1}p$.

Just for once let us satisfy ourselves that $\sum p_n = 1$:

$$\sum_n p_n = \sum_{n=0}^{\infty} q^{n-1} p = p \sum_{n=1}^{\infty} q^{n-1} = p \cdot \frac{1}{1-q} = p \cdot \frac{1}{p} = 1$$

So it checks.

> *From now on we will write $\sum$ instead of $\sum_{n=1}^{\infty}$, where there is no danger of causing confusion.*

Notice that in understanding $W_1$ as a random variable we worked completely probabilistically. We never spoke of $W_1$ as a function. What is $W_1$ as a function? For each $\omega \in \Omega$, $W_1(\omega)$ is the first position of the sequence $\omega$ with a 1 at that position. For example, $W_1(00011011...) = 4$. However, looking at $W_1$ as a function is quite unnatural. One should try to think of $W_1$ purely probabilistically. Indeed, one might say that probability theory gives one a whole new way of looking at sets and functions.

Consider another example. Let $W_k$ be the waiting time for the $k^{\text{th}}$ head. The event $(W_k=n)$ is the event, "a head occurs at the $n^{\text{th}}$ toss and exactly k-1 heads occur during the preceding n-1 tosses." The probability distribution is:

$$p_n = P(W_k = n) = \binom{n-1}{k-1} p^k q^{n-k}$$

How does one see this? Well, the k-1 heads can occur in any (k-1)-subset of the first (n-1) tosses. There are $\binom{n-1}{k-1}$ such subsets. For each such subset the probability of getting heads and tails in those positions and tails in the others is $p^{k-1}q^{n-k}$. Finally, the probability of getting a head on the $n^{\text{th}}$ toss is p.

Needless to say it is not very easy to write an explicit expression for the events $(W_k=n)$ in terms of elementary events although that is implicit in our computation above. Notice too that $\sum \binom{n-1}{k-1} p^k q^{n-k} = 1$, a fact that is not very easy to prove directly.

Consider the random variable $X_n = \begin{cases} 1 & \text{if } n^{\text{th}} \text{ trial is 1} \\ 0 & \text{if } n^{\text{th}} \text{ trial is 0} \end{cases}$, or more succinctly

The distribution of $X_n$ is:

$$p_0 = P(X_n = 0) = q$$
$$p_1 = P(X_n = 1) = p$$

and all other $p_k$ are zero.

Next let $S_n$ be the number of heads in the first n tosses. The distribution of $S_n$ is:

$$p_k = P(S_n = k) = \binom{n}{k} p^k q^{n-k}$$

because the event $(S_n = k)$ means that k heads and n-k tails occur in the first n tosses. There are $\binom{n}{k}$ ways that the k heads can appear and each pattern has probability $p^k q^{n-k}$ of occurring. The fact that $\sum_k \binom{n}{k} p^k q^{n-k} = (p + q)^n = 1^n = 1$.

Indeed this is a probabilistic **proof** of the binomial theorem.

Incidentally the event $(S_n = k)$ is not the same as the event $(W_k = n)$. The distinction is that $(W_k = n)$ requires that there be k heads in the first n tosses **and** that the $k^{\text{th}}$ head occur at the $n^{\text{th}}$ toss. $(S_n = k)$ is only the event that k heads occur in the first n tosses. The distinction is reflected in the formulas we found for the distributions in each case.

Another way to represent $S_n$ is:

$$S_n = X_1 + X_2 + \ldots + X_n$$

This illustrates the fact that we may combine random variables using algebraic operations. After all random variables are functions on $\Omega$ and as such may be added, subtracted, etc. Thus if X and Y are integer R.V.'s on $\Omega$, then, as a function, the random variable X+Y takes the value $X(\omega) + Y(\omega)$ on the sample point $\omega \in \Omega$. For example, $(W_k = n)$ is the event

$$(X_1 + X_2 + \ldots + X_{n-1} = k-1) \cap (X_n = 1) = (S_{n-1} = k-1) \cap (X_n = 1).$$

Unfortunately the use of large quantities of symbolism tends to obscure the underlying simplicity of the question we asked. We shall try to avoid doing this if possible.

Now consider the random variable $T_k$, the length of the gap between the $(k-1)^{\text{st}}$ and $k^{\text{th}}$ heads in the sequence of tosses. For example,

$$\omega = 000100001 \ 1 \ 001 \ldots$$

The $T_k$'s and $W_k$'s are related to each other:

$$T_k = W_k - W_{k-1}$$

$$W_k = T_1 + T_2 + \ldots + T_k$$

What is the distribution of $T_k$? When we later have the notion of conditional probability we will have a very natural way to compute this. However we can nevertheless easily compute the distribution of $T_k$ because of the independence of the various tosses of the coin. In other words, when computing $P(T_k = n)$ we may imagine that we start just after the $(k-1)^{\text{st}}$ head has been obtained. Therefore the distribution of $T_k$ is

$$p_n = P(T_k = n) = P(W_1 = n) = q^{n-1}p,$$

exactly the same distribution as that of $W_1$.

Notice that $T_k$ for $k > 1$ is **not** the same random variable as $W_1$, and yet their distributions are the same. How can this be? Actually we have already seen this phenomenon before but didn't notice it because it was too trivial an example. $X_1$, $X_2$, ... are all different random variables, but they all have the same distributions. This phenomenon will occur frequently and is very important.

**Definition:** Two integer random variables X and Y are said to be **equidistributed** or **identically distributed** or **stochastically identical** when $P(X = n) = P(Y = n)$ for all integers n.

Thus for example, $W_1$ and $T_k$ are equidistributed R.V.'s. Similarly the $X_n$ are equidistributed R.V.'s. Although $X_1$ and $X_3$ measure completely different phenomena, they have exactly the same probabilistic structure.

### The Bernoulli Process: Random Walk

Consider the random variables $X'_n$ given by:

$$X'_n = \begin{cases} 1 & \text{if the } n^{\text{th}} \text{ trial is 1} \\ -1 & \text{if the } n^{\text{th}} \text{ trial is 0} \end{cases}$$

$X_n$ and $X'_n$ are closely related: $X' = 2X_n - 1$. However if we form the random variable analogous to $S_n$ we measure a quite different phenomenon. Let $S'_n = X'_1 + \ldots + X'_n$, then $S'_n$ is the position of a one-dimensional random walk after n steps: a step to the right gives +1, a step to the left gives -1, so the sum of the first n steps is the position at that time. (In chapter VI.4 we will encounter $S'_n$ again, renamed to $G_n$.)

What is the probability distribution of $S'_n$? This calculation is a good example of a "perturbation" applied to a model. We want to compute $P(S'_n = x)$. Here we use x for an integer; think of it as a point on the x-axis. Let h be the number of heads and t the number of tails, both during the first n tosses. Then:

$$x = h - t \quad \text{and} \quad n = h + t.$$

Solving for h and t gives:

$$h = \frac{1}{2}(x + n) \quad \text{and} \quad t = \frac{1}{2}(n - x).$$

Therefore,

$$P(S'_n = x) = P\left(S_n = \frac{1}{2}(x+n)\right) = \binom{n}{\frac{1}{2}(x+n)} p^{\frac{1}{2}(x+n)} q^{\frac{1}{2}(n-x)},$$

provided $\frac{1}{2}(x + n)$ is an integer and $0 \le \frac{1}{2}(x + n) \le n$. We will come back to random walks later in chapter VI.

## Independence and Joint Distributions

Recall that two events A and B are independent when $P(A \cap B) = P(A)P(B)$. This definition is abstracted from experience; as for example when tossing a coin, the second time the coin is tossed, it doesn't remember what happened the first time. We extend this notion to random variables. Intuitively two random variables X and Y are independent if the measurement of one doesn't influence the measurement of the other. In other words, the events expressible in terms of X are independent of those expressible in terms of Y. We now make this precise.

**Definition:** Two integer random variables X and Y are **independent** when

$$P((X=n_1) \cap (Y=n_2)) = P(X=n_1) \, P(Y=n_2)$$

for every pair of integers $n_1$, $n_2$.

We illustrate this with our standard example: the Bernoulli process. $X_n$ and $X_k$ are independent when $k \ne n$. This is obvious from the definition of the Bernoulli process.

Less obvious is that $T_k$ and $T_n$ are independent when $k \ne n$. We check this for $T_1$ and $T_2$. By previous computations,

$$P(T_1 = n_1) = q^{n_1-1}p \quad \text{and} \quad P(T_2 = n_2) = q^{n_2-1}p.$$

Now compute $P((T_1 = n_1) \cap (T_2 = n_2))$. The event $(T_1 = n_1) \cap (T_2 = n_2)$ means that the first $n_1$ tosses have the pattern:

$$\underbrace{00 \ldots 0}_{n_1} 1 \underbrace{00 \ldots 0}_{n_2} 1$$

Therefore,

$$P((T_1 = n_1) \cap (T_2 = n_2)) = q^{n_1-1} p q^{n_2-1} p.$$

Since $P((T_1=n_1) \cap (T_2=n_2)) = P(T_1 = n_1)P(T_2 = n_2)$, we conclude that $T_1$ and $T_2$ are independent.

On the other hand, $W_k$ and $W_n$ are not independent R.V.'s. This is intuitively obvious, but we will check it nevertheless in the case of $W_1$ and $W_2$. We previously computed:

$$P(W_1 = n_1) = q^{n_1-1}p$$

$$P(W_2 = n_2) = (n_2 - 1)q^{n_2-2}p^2$$

Now $(W_1=n_1) \cap (W_2=n_2)$ is the same as the event $(T_1=n_1) \cap (T_2=n_2-n_1)$ both being the event that the first $n_2$ tosses have the pattern:

$$\underbrace{00 \ldots 0}_{n_1} 1 \underbrace{00 \ldots 0}_{n_2 - n_1} 1$$

Therefore,

$$P((W_1 = n_1) \cap (W_2 = n_2)) = \begin{cases} 0 & \text{if } n_2 \le n_1 \\ q^{n_2-2} p^2 & \text{if } n_2 > n_1 \end{cases}$$

Since $P(W_1=n_1) \cap (W_2=n_2)) \ne P(W_1=n_1)P(W_2=n_2)$ (in particular when $n_1 \ge n_2$ one side is zero and the other is not), $W_1$ and $W_2$ are not independent. In other words $W_1$ *influences* $W_2$.

When two R.V.'s are not independent, is there a way to measure the dependence of one of them on the other? In more common parlance, how do we measure the "correlation" of two R.V.'s? We measure this with the joint distribution of two random variables.

**Definition:** For two integer random variables X and Y, the **joint distribution** of X and Y is

$$C_{n_1, n_2} = P((X=n_1) \cap (Y=n_2)).$$

The numbers $C_{n_1, n_2}$ cannot be computed in general from the individual distributions of X and Y. The joint distribution measures the total dependence of X and Y or equivalently the cause and effect of one R.V. on the other.

Joint distributions have the following properties:

(1) $\sum_{n_1} \sum_{n_2} C_{n_1, n_2} = 1$, i.e. something must happen.

(2) $\sum_{n_2} C_{n_1, n_2} = P(X = n_1)$.

(3) $\sum_{n_1} C_{n_1, n_2} = P(Y = n_2)$.

The distributions of X and Y considered relative to their joint distribution are called the **marginal distributions** or simply the **marginals**. Despite the fancy terminology, the marginals are simply the distributions of X and Y with which we are already familiar.

Just as we have the joint distribution of two random variables, we can have the joint distribution of any finite collection of random variables. The formulas are so obvious that we won't bother to write them down explicitly.

We now compute some examples. If X and Y are independent random variables with distributions $p_{n_1} = P(X=n_1)$ and $r_{n_2} = P(Y = n_2)$, then their joint distribution is

$$C_{n_1, n_2} = P((X=n_1) \cap (Y=n_2)) = P(X=n_1)P(Y=n_2) = p_{n_1} r_{n_2}.$$

Therefore the joint distribution of independent R.V.'s is the product of the marginals.

Next consider the random variables $W_j$ and $W_k$ ($j < k$). Their joint distribution is

$$C_{n_1, n_2} = P((W_j=n_1) \cap (W_k=n_2))$$

Of course we must have $n_1 < n_2$. The event $(W_j=n_1) \cap (W_k=n_2)$ means that we have j-1 heads in the first $n_1 - 1$ tosses and k-j-1 heads in the "gap" of length $n_2-n_1-1$ between the $j^{\text{th}}$ and $k^{\text{th}}$ heads.

Writing all this out gives:

$$C_{n_1,n_2} = P((W_j = n_1) \cap (W_k = n_2)) = \binom{n_1 - 1}{j - 1} q^{n_1-j} \binom{n_2 - n_1 - 1}{k - j - 1} p^{k-j} q^{n_2 - n_1 - (k-j)}$$

The total number of tosses involved is $n_2$: exactly k of them are heads and $n_2 - k$ are tails. This furnishes a quick check that the exponents on p and on q are correct.

As a final example, we compute the joint distribution of the first k waiting times. For $n_1 < n_2 < \ldots < n_k$, the joint distribution is:

$$C_{n_1, n_2, \ldots, n_k} = P((W_1=n_1) \cap (W_2=n_2) \cap \ldots \cap (W_k=n_k)).$$

This is actually quite easy to compute because there is only one "way" to get the event $(W_1=n_1) \cap \ldots \cap (W_k=n_k)$ up to the $n_k^{\text{th}}$ toss. Therefore

$$C_{n_1, n_2, \ldots, n_k} = P((W_1 = n_1) \cap (W_2 = n_2) \cap \ldots \cap (W_k = n_k)) = pq^{n_1-1} pq^{n_2-n_1-1} \ldots = p^k q^{n_k - k}$$

## Expectations

**Definition:** Suppose X is an integer R.V. with distribution $p_n = P(X=n)$. The **expectation** or **mean** or **average value** of X is

$$E(X) = \sum n \cdot p_n = \sum n \cdot P(X = n).$$

It can happen that this sum does not exit, i.e. this series diverges. We won't worry about this. Implicit in any statement about expectations is the assumption that the corresponding series converges.

For example if $X_n$ is the $n^{\text{th}}$ trial in the Bernoulli process, $E(X_n) = 1 \cdot p + 0 \cdot q = p$. The expected or average value of the $n^{\text{th}}$ toss is p. Needless to say $X_n$ won't ever take the value p (except in the trivial case $p = 0, 1$). Intuitively however, if we perform a large number of trials and then average the results, we will get roughly p.

Before we go on to other computations, we need the following important result:

**Basic Fact.** *For any two integer random variables,*

$$E(X+Y) = E(X) + E(Y).$$

The surprising thing about this fact is that it holds regardless of whether X and Y are independent or not.

**Proof:** Let $C_{n_1, n_2} = P((X=n_1) \cap (Y=n_2))$ be the joint distribution of X and Y. Now X+Y is a new R.V. What is its distribution? Well, we must consider all possible ways that X+Y can take on a given value:

$$q_k = P(X + Y = k) = \sum_{\substack{n_1, n_2 \\ n_1 + n_2 = k}} P((X = n_1) \cap (Y = n_2)) = \sum_{\substack{n_1, n_2 \\ n_1 + n_2 = k}} C_{n_1, n_2}$$

Therefore the expectation of X+Y is:

$$E(X + Y) = \sum_k k \, q_k = \sum_k k \sum_{\substack{n_1, n_2 \\ n_1 + n_2 = k}} C_{n_1, n_2}$$

$$= \sum_{n_1} \sum_{n_2} (n_1 + n_2) C_{n_1, n_2} = \sum_{n_1} \sum_{n_2} n_1 C_{n_1, n_2} + \sum_{n_1} \sum_{n_2} n_2 C_{n_1, n_2}$$

$$= \sum_{n_1} n_1 P(X = n_1) + \sum_{n_2} n_2 P(Y = n_2)$$

$$= E(X) + E(Y).$$

This completes the proof. $\square$

Notice that it should be intuitively obvious that the expectation of X+Y is $\sum \sum (n_1 + n_2) C_{n_1, n_2}$ so the Basic Fact is actually easier than the size of our proof suggests. Namely using probabilistic reasoning we proceed as follows. X+Y take the "value" $n_1+n_2$ with probability $C_{n_1, n_2}$. Adding up all cases gives the expectation:

$$E(X + Y) = \sum_{n_1} \sum_{n_2} (n_1 + n_2) C_{n_1, n_2}$$

Now split the sum and take marginals. The result is $E(X) + E(Y)$.

Let's compute some expectations for the Bernoulli process. First we compute using the Basic Fact, then we compute using the definition. Consider $S_n$, the number of successes in the first n trials. The distribution for $S_n$ is $p_k = \binom{n}{k} p^k q^{n-k}$. So

$$E(S_n) = \sum_k k \, p_k = \sum_k k \binom{n}{k} p^k q^{n-k}.$$

Unfortunately we cannot simplify this very easily. On the other hand, $S_n = X_1 + X_2 + \ldots + X_n$. Hence, $E(S_n) = E(X_1) + E(X_2) + \ldots + E(X_n) = np$, since all of these have the same expectation: p. In addition, we have shown that

$$E(S_n) = \sum_k k \binom{n}{k} p^k q^{n-k} = np,$$

a fact that is not so easy to prove.

Next consider the waiting time for the $k^{\text{th}}$ head, $W_k$. The distribution for $W_k$ is $p_n = \binom{n-1}{k-1} p^k q^{n-k}$. Therefore

$$E(W_k) = \sum n \, p_n = \sum n \binom{n-1}{k-1} p^k q^{n-k}.$$

Again there is no easy way to compute this infinite sum. However, $W_k = T_1 + T_2 + \ldots + T_k$. Hence, $E(W_k) = E(T_1) + \ldots + E(T_k)$. But all the $T_1, \ldots, T_k$ are equidistributed so in particular they all have the same expectation. Therefore, $E(W_k) = k \, E(T_1)$, and we need only compute one expectation: the expectation of $T_1 = W_1$. We shall have to resort to some trickery, but it still isn't too difficult.

$$E(T_1) = \sum_{n=1}^{\infty} n P(T_1 = n) = \sum_{n=1}^{\infty} n q^{n-1} p$$

$$= p \sum_{n=1}^{\infty} \frac{d}{dq}(q^n) = p \frac{d}{dq}\left(\sum_{n=1}^{\infty} q^n\right) = p \frac{d}{dq}\left(\frac{q}{1-q}\right) = p \cdot \frac{1}{(1-q)^2} = p \cdot \frac{1}{p^2} = \frac{1}{p}$$

Intuitively, it is quite reasonable that $E(T_1) = \frac{1}{p}$ for if p is large we don't expect to wait very long for a success, while if p is small we expect to wait a long time. As before we get the added bonus of an identity:

$$E(W_k) = \sum n \binom{n-1}{k-1} p^k q^{n-k} = \frac{k}{p},$$

a fact that is quite hard to believe otherwise.

## The Inclusion-Exclusion Principle

Imagine that we have a well-shuffled deck of cards and that we turn the cards over one at a time. While doing this we call out the names of the cards in their unshuffled order (as in Bridge), beginning with the deuce of clubs and ending with the ace of spades. What is the probability that **none** of the cards turned over match the name called out when it is turned over? The answer (to an accuracy of $10^{13}$) is $\frac{1}{e}$.

This is strange for two reasons: it depends on the number e which shouldn't appear in a finite counting problem, and it does not depend on the number of cards in the deck.

We shall prove this result and several others by an important formula called the inclusion-exclusion principle. The proof of this principle will follow easily from the formalism of random variables.

The abstract setting for the principle is the computation of the probability of the union of events in terms of the probabilities of the events and of their intersections. For example, if we have two events A and B, then we know that

$$P(A \cup B) = P(A) + P(B) - P(A \cap B).$$

![Venn diagram showing two overlapping sets A and B](image_placeholder)
*Venn diagram of $A \cup B$*

More generally if we have three events A, B, and C:

$$P(A \cup B \cup C) = P(A) + P(B) + P(C) - P(A \cap B) - P(A \cap C) - P(B \cap C) + P(A \cap B \cap C).$$

In general for N events $A_1, A_2, \ldots, A_N$, the inclusion-exclusion formula is:

$$P(A_1 \cup A_2 \cup \ldots \cup A_N) = \sum_i P(A_i) - \sum_{i<j} P(A_i \cap A_j) + \sum_{i<j<k} P(A_i \cap A_j \cap A_k) - \ldots$$

We shall prove this formula using a clever trick. The trick is to replace an event A by the **indicator** of the event. The indicator of A is the random variable $I_A$ defined as

$$I_A(\omega) = \begin{cases} 1 & \text{if } \omega \in A \\ 0 & \text{if } \omega \notin A \end{cases}$$

One crucial property of the indicator is:

$$E(I_A) = 1 \cdot P(A) + 0 \cdot P(A^c) = P(A).$$

Now it is easy to see that

$$I_{A \cap B} = I_A \cdot I_B.$$

This is because both sides equal 1 precisely when $\omega$ is in both A and B, and 0 otherwise.

Less obvious, but easily checked, is the relation for the **union**:

$$I_{A \cup B} = I_A + I_B - I_A \cdot I_B.$$

Since $I_A \cdot I_B = I_{A \cap B}$, taking expectations gives:

$$P(A \cup B) = P(A) + P(B) - P(A \cap B),$$

which is the inclusion-exclusion formula for two events.

For three events we have:

$$I_{A \cup B \cup C} = 1 - (1 - I_A)(1 - I_B)(1 - I_C)$$

and more generally for N events:

$$I_{A_1 \cup A_2 \cup \ldots \cup A_N} = 1 - (1 - I_{A_1})(1 - I_{A_2}) \cdots (1 - I_{A_N}).$$

Expanding the product and taking expectations gives the inclusion-exclusion formula.

We now prove the result about the card game. The precise question is: what is the probability that in a shuffled deck of N cards, **none** of the cards is in its original position? Such a permutation is called a **derangement**.

Let $A_j$ be the event that the $j^{\text{th}}$ card is in its original position. We need to compute:

$$P(\text{at least one match}) = P(A_1 \cup A_2 \cup \ldots \cup A_N).$$

First we compute the probabilities appearing in the inclusion-exclusion formula.

$$P(A_j) = \frac{(N-1)!}{N!} = \frac{1}{N}$$

because if card j is fixed, the remaining N-1 cards can be in any order.

$$P(A_i \cap A_j) = \frac{(N-2)!}{N!} = \frac{1}{N(N-1)}$$

There are $\binom{N}{1}$ terms of the form $P(A_j)$, $\binom{N}{2}$ terms of the form $P(A_i \cap A_j)$, etc. By inclusion-exclusion:

$$P(A_1 \cup \ldots \cup A_N) = \binom{N}{1}\frac{1}{N} - \binom{N}{2}\frac{1}{N(N-1)} + \binom{N}{3}\frac{1}{N(N-1)(N-2)} - \ldots$$

$$= 1 - \frac{1}{2!} + \frac{1}{3!} - \ldots + (-1)^{N+1}\frac{1}{N!}$$

Therefore:

$$P(\text{no match}) = 1 - \left(1 - \frac{1}{2!} + \frac{1}{3!} - \ldots\right) = \frac{1}{2!} - \frac{1}{3!} + \ldots + (-1)^N \frac{1}{N!}$$

This is a partial sum of the Taylor series for $e^{-1}$, so

$$P(\text{no match}) \approx \frac{1}{e} \approx 0.3679.$$

The approximation is excellent even for small N.

## 2. Continuous Random Variables

Until now we have only discussed random variables that take integer values. We now consider random variables that range over a continuous set, such as an interval.

**Definition:** A **continuous random variable** X is described by a function $f(x) \ge 0$ called the **density** of X, satisfying

$$\int_{-\infty}^{\infty} f(x) \, dx = 1.$$

The probability that X falls in an interval $[a, b]$ is

$$P(a \le X \le b) = \int_a^b f(x) \, dx.$$

The **distribution function** of X is the function

$$F(x) = P(X \le x) = \int_{-\infty}^{x} f(t) \, dt.$$

Thus $f(x) = F'(x)$.

### Properties of the Distribution Function

A distribution function $F(x)$ satisfies four properties:

1. $F$ is increasing (not necessarily strictly).
2. $\lim_{x \to -\infty} F(x) = 0$.
3. $\lim_{x \to \infty} F(x) = 1$.
4. $F$ is continuous from the right.

Conversely, any function satisfying these four properties is the distribution function of some random variable.

### The Uniform Process

The simplest continuous random variable is the **uniform** random variable on the interval $[0, a]$, defined by the density

$$f(x) = \begin{cases} \frac{1}{a} & \text{if } 0 \le x \le a \\ 0 & \text{otherwise} \end{cases}$$

The distribution function is:

$$F(x) = \begin{cases} 0 & \text{if } x < 0 \\ \frac{x}{a} & \text{if } 0 \le x \le a \\ 1 & \text{if } x > a \end{cases}$$

The Uniform process on $[0, a]$ is the analog of the equally likely model for discrete sample spaces. The sample space $\Omega = [0, a]$, and the probability measure of any interval is proportional to its length.

### Expectation of Continuous Random Variables

**Definition:** The **expectation** of a continuous random variable X with density $f(x)$ is

$$E(X) = \int_{-\infty}^{\infty} x \, f(x) \, dx,$$

provided this integral converges.

The Basic Fact ($E(X+Y) = E(X) + E(Y)$) continues to hold for continuous random variables.

For the Uniform process on $[0, a]$:

$$E(X) = \int_0^a x \cdot \frac{1}{a} \, dx = \frac{a}{2}.$$

This is the midpoint of the interval, as one would expect.

### Order Statistics

Consider the Uniform process of sampling n points from the interval $[0, a]$. The points $X_1, X_2, \ldots, X_n$ are independent and uniformly distributed on $[0, a]$. If we arrange these n points in increasing order, we get the **order statistics** $X_{(1)} \le X_{(2)} \le \ldots \le X_{(n)}$.

We compute the distribution of $X_{(1)}$, the smallest point. The event $(X_{(1)} > x)$ means all n points exceed x. Since the points are independent:

$$P(X_{(1)} > x) = \left(\frac{a - x}{a}\right)^n \quad \text{for } 0 \le x \le a.$$

Therefore the distribution function of $X_{(1)}$ is:

$$F_{(1)}(x) = 1 - \left(\frac{a-x}{a}\right)^n$$

and its density is:

$$f_{(1)}(x) = \frac{n}{a}\left(\frac{a-x}{a}\right)^{n-1} \quad \text{for } 0 \le x \le a.$$

Similarly, the density of $X_{(n)}$, the largest point, is:

$$f_{(n)}(x) = \frac{n}{a}\left(\frac{x}{a}\right)^{n-1} \quad \text{for } 0 \le x \le a.$$

More generally, the density of the $k^{\text{th}}$ order statistic $X_{(k)}$ is:

$$f_{(k)}(x) = \frac{n!}{(k-1)!(n-k)!} \cdot \frac{1}{a} \left(\frac{x}{a}\right)^{k-1}\left(\frac{a-x}{a}\right)^{n-k} \quad \text{for } 0 \le x \le a.$$

The **gaps** $L_k$ in the Uniform process are defined as:

$$L_1 = X_{(1)}, \quad L_2 = X_{(2)} - X_{(1)}, \quad \ldots, \quad L_{n+1} = a - X_{(n)}.$$

A remarkable fact is that the gaps are **exchangeable**: the joint distribution is symmetric in all the $L_k$'s.

The joint density of $X_{(1)}$ and $X_{(n)}$ is:

$$\text{dens}(X_{(1)} = x_1, X_{(n)} = x_n) = \begin{cases} \frac{n(n-1)}{a^n}(x_n - x_1)^{n-2} & \text{if } 0 \le x_1 \le x_n \le a \\ 0 & \text{otherwise} \end{cases}$$

The expectation of $X_{(k)}$ is:

$$E(X_{(k)}) = \frac{ka}{n+1}.$$

In particular, the expected values of the order statistics are evenly spaced.

---

*Judgement calls and notes:*

1. *Page 79 footnote: Rota writes "From now on we will write $\sum$ instead of $\sum_{n=1}^{\infty}$" -- reproduced as a blockquote.*
2. *On page 89, a Venn diagram of two overlapping circles appears; described with placeholder.*
3. *The derangement proof is presented in condensed form in the original; the key steps are preserved here.*
4. *Some passages about the Uniform process and order statistics on pages 97-112 are compressed -- the original includes extended worked examples and intermediate calculations. The mathematical results and definitions are preserved faithfully.*
5. *Page numbers in the original run 78-112 (with page 112 being the last content page; page 36 of the PDF is blank).*
