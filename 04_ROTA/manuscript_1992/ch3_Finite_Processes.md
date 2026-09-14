---
title: "Chapter III: Finite Processes"
author: "Gian-Carlo Rota"
edition: "1992"
chapter_number: 3
source: "An Introduction to the Theory of Probability — MIT Lecture Notes, 1992 Edition"
---

# Chapter III: Finite Processes

Historically the theory of probability arose from the analysis of games of chance, usually based on the toss of a die or the choice of a card from a deck. For this reason the oldest probability models have only a finite number of sample points. In this chapter we introduce the techniques for computing probabilities of events in a finite process. We will later see that these techniques are useful in many other processes as well.

## 1. The Basic Models

The basic situation for a finite process is the following. Imagine that we have a population $U$ consisting of individuals. They may be people, cards or whatever. Now choose one individual from the population. How many ways can we do this? The answer, of course, is the number of individuals in the population. We write $|U|$ for this number. The individual we chose is called a sample (of size 1) from the population. More generally suppose that we choose not just one but a whole sequence of $k$ individuals from the population. The sampling procedure we envision here is successive; we choose one individual at a time. How many ways can we do this? The answer will depend on whether the same individual can be chosen more than once, or equivalently on whether a chosen individual is returned to the population before another is chosen.

To illustrate this we consider dice and cards. A single roll of a die samples one of its six faces. If we roll the die $k$ times, or equivalently if we roll $k$ dice, we are sampling with replacement from a population of size 6.

The description of the finite process given above is called the **sampling model**. It is by no means the only model or the best model for a given situation. For the rest of this section we consider several other models all of which are mathematically equivalent.

### The Occupancy Model

The **occupancy model** is the following. We have $k$ balls or marbles and $n$ boxes. Denote the set of balls by $B$ and the set of boxes by $U$ (for urns). A **placement** is a way of placing the balls into the boxes, each ball in some box.

### The Distribution Model

In the **distribution model** we have an alphabet $U$ whose members are called letters. A **word** of length $k$ is any sequence of $k$ letters from the alphabet. The distribution model is easily seen to be equivalent to the occupancy model; the letters correspond to the boxes and the positions of the letters in a word correspond to the balls.

If we regard the alphabet $U$ as a population whose individuals are letters, then it is easy to see that a word is just a sample with replacement. Therefore the distribution and occupancy models are both equivalent to the sampling model with replacement. In terms of the occupancy model, sampling without replacement means that no box has more than one ball. In terms of the distribution model, this means that no letter appears twice in a word.

### The Mathematical Model

In mathematics a placement of balls is called a **function** from $B$ to $U$. Sampling without replacement corresponds to **one-to-one functions**.

### The Physics Model

In physics the balls are called **particles**, and the boxes are called **states**, while a placement is called a **configuration** or **system**. For a given placement, the **occupation number** of box $i$, called $\theta_i$, is the number of balls placed in box $i$. The occupation numbers trivially satisfy $\sum \theta_i = k = |B|$. For example, saying that the placement corresponds to a one-to-one function (or sampling without replacement) is the same as saying $\theta_i$ equals 0 or 1 for all $i$. In physics, such a restriction is called an **exclusion principle**: a given state may have at most one particle in it. The physics model we have described here goes by the name of **Maxwell-Boltzmann statistics** (with or without the exclusion principle). We shall see other statistics in section IV which are more physically realistic.

At this point we can make a dictionary for translating terms from one model to another.

**Model Terminology** (terms in one column are equivalent):

| Model | Object | Parts | Source |
|-------|--------|-------|--------|
| Occupancy | placement | balls $B$ | boxes $U$ |
| Distribution | word | places | letters, alphabet |
| Sampling | ordered sample | position | individuals, population |
| Mathematics | function | domain | range |
| Physics\* | configuration | particles | states |
| Astrology | horoscope | planets, solar system | signs, Zodiac |

\* Maxwell-Boltzmann Statistics

## 2. Counting Rules and Stirling's Formula

Placements in their many variations and equivalent forms are the most commonly encountered objects in probability computations. A roll of dice, a hand of cards, even a configuration of particles in chemistry or physics are all forms of placements. In this section, we will concentrate on the most basic rules for counting collections of placements. In section IV, we will consider the more subtle kind of counting necessary in the atomic and sub-atomic domains of chemistry and physics.

### The First Rule of Counting

The most fundamental rule of counting is one so obvious that it doesn't seem necessary to dwell on it:

**First Rule of Counting:** If an object is formed by making a succession of choices such that there are $n_1$ possibilities for the first choice, $n_2$ possibilities for the second choice, etc., then the total number of objects that can be made by making a set of choices is $n_1 \times n_2 \times n_3 \times \cdots$.

Note that by a "succession of choices" we mean that after the first choice is made, there are $n_2$ choices for the second choice, and similarly for subsequent choices. We illustrate this rule with some familiar examples.

**Throwing Dice:** How many ways can we roll three dice? A roll of three dice requires three "choices," one for each die. Since each die has six possibilities, there are $6^3 = 216$ rolls of three dice. Notice that it does not matter whether we view the three dice as being rolled one at a time or all at once. We will call such choices **independent**, i.e. the roll of the other dice do not affect the set of possibilities available to any given die.

**Dealing a Poker Hand:** How many ways can we deal five cards from a deck of 52 cards? (We consider as different two hands having the same cards but dealt in different orders.) A deal of five cards consists of five choices. There are 52 choices for the first card, 51 choices for the second card, etc. The total number of deals is then $52 \cdot 51 \cdot 50 \cdot 49 \cdot 48 = 311{,}875{,}200$. Unlike the situation for rolls of three dice, the cards dealt in the above example are not independent choices. The earlier cards we dealt do affect the set of possibilities for later cards. However the earlier cards do not affect the number of possibilities for a given later deal of card. Hence the first rule still applies.

Before we consider more complex sounding problems we restate the above two examples in the general language of distribution and occupancy.

**Arbitrary Placements:** The total number of ways to place $k$ balls into $n$ boxes or equivalently the total number of $k$-letter words made from an alphabet of $n$ letters is $n^k$; each ball or letter can be chosen in $n$ ways independently of the others.

**Placements No Two In One Box:** The total number of ways to place $k$ balls into $n$ boxes so that no two occupy the same box or equivalently the total number of $k$-letter words made from an alphabet of $n$ letters and having no repeated letters is

$$(n)_k = n(n-1) \cdots (n-k+1).$$

There are $k$ factors in this product, one for each choice. This product is called the **lower** or **falling factorial**.

An important special case of the second formula is the one for which $k = n$. Such a placement has a special name; it is a **permutation**. For example, if we deal all 52 cards from a standard deck, there are $(52)_{52} = 52 \cdot 51 \cdot 50 \cdots 3 \cdot 2 \cdot 1$ ways for this to happen. This is a very large number, and we will discuss techniques for approximating it below.

Permutations occur so frequently in computations that we have a special notation for the total number of them.

**Definition:** The total number of ways to place $n$ balls into $n$ boxes, each ball in a different box, or equivalently the number of $n$-letter words using all the letters from an $n$-letter alphabet is called **$n$-factorial** and is written

$$n! = (n)_n = n(n-1) \cdots 3 \cdot 2 \cdot 1.$$

| Placement type | Count |
|----------------|-------|
| Arbitrary placements of $k$ balls into $n$ boxes | $n^k$ |
| Placements no two in one box of $k$ balls into $n$ boxes | $(n)_k$ |
| $n$ balls into $n$ boxes (permutations) | $n! = (n)_n$ |

**Table 1: Placements**

### Stirling's Formula

The computation of factorials is so common in probability that it is a great relief to learn that there is an easy way to compute them. The method makes use of an approximation known as Stirling's Formula. The precise mathematical statement is the following:

$$n! \approx n^n e^{-n} \sqrt{2\pi n}$$

**Stirling's Formula**

The symbol "$\approx$" means "approximately equal to," and in practice in any expression involving large factorials, we replace each factorial by the right-hand side of Stirling's Formula above.

For example, the total number of permutations of a standard deck of cards is approximately:

$$52! \approx 52^{52} e^{-52} \sqrt{104\pi} \approx 8.053 \times 10^{67}$$

### The Second Rule of Counting

**Poker Hands:** Anyone who has played cards knows that one normally does not care about the order in which one is dealt a hand of cards. That is, a hand of cards is not the same as a deal of cards. A poker hand is defined to be a subset of five cards from a standard deck, and the order in which the cards are obtained is immaterial. We cannot count the number of poker hands using the first rule of counting because they violate the fundamental premise of that rule; the object must be obtained by successive choices. However, any given poker hand can be dealt in precisely $5! = 120$ ways. Therefore the number of poker hands is

$$\frac{52 \cdot 51 \cdot 50 \cdot 49 \cdot 48}{5!} = \frac{311{,}875{,}200}{120} = 2{,}598{,}960.$$

This illustrates the second rule of counting, also called the "shepherd principle:" if it is too difficult to count sheep, count their legs and then divide by four.

**Second Rule of Counting:** If we wish to count a set of objects by making choices but for which the order of choices does not matter, count as if it did matter and then divide by a factor: the number of ordered objects per unordered object.

Let us illustrate this in a more complicated situation. **Bridge Games.** How many bridge situations are possible? By definition a bridge game consists of four people being dealt 13 cards each. However, the order in which each of the four hands is dealt does not matter. So we first count as if the order did matter; this gives $52!$ possible deals. But each hand can be dealt in $13!$ ways, and there are four hands for a total of $(13!)^4$ ways to deal a given bridge game. Therefore there are

$$\frac{52!}{(13!)^4} \approx 5.364 \times 10^{28}$$

possible bridge situations.

One must be careful when applying the second rule to make certain that the number of ordered objects is the same for any unordered object. In section IV, we will give an example of this kind of difficulty. Meanwhile you are now equipped to perform all the (unstarred) counting computations in the exercises.

Before we end this section we cannot resist one more generalization suggested by the above bridge example. Using the language of the occupancy model, a bridge game consists of 52 balls being placed in four boxes such that every box has exactly 13 balls. More generally, the number of ways that $k$ balls can be placed in $n$ boxes so that $\theta_1$ balls are in the first box, $\theta_2$ balls are in the second box, etc. is by the second rule of counting,

$$\binom{k}{\theta_1, \theta_2, \ldots, \theta_n} = \frac{k!}{\theta_1! \, \theta_2! \cdots \theta_n!}$$

Note that for the above formula to make sense we must have $\theta_1 + \theta_2 + \cdots + \theta_n = k$. This expression, called the **multinomial coefficient**, is pronounced "$k$ choose $\theta_1, \theta_2, \ldots, \theta_n$." The numbers $\theta_1, \theta_2, \ldots, \theta_n$ are called the **occupation numbers** of the placement.

An important special case of the multinomial coefficient is the case $n = 2$, when it is called the **binomial coefficient**. This number should be a familiar concept from the binomial expansion in algebra and calculus. Because a placement of balls into two boxes is completely determined by the choice of those in one of the boxes, we can also interpret the binomial coefficient $\binom{k}{\theta_1, \theta_2}$ as the number of $\theta_1$-element subsets of a $k$-element set. The binomial coefficient is often abbreviated to $\binom{k}{\theta_1}$ or $\binom{k}{\theta_2}$ and is then pronounced simply "$k$ choose $\theta$." Using this notation we can quickly compute the number of poker hands because a poker hand consists of five cards chosen from 52 cards:

$$\binom{52}{5} = \binom{52}{5, 47} = \frac{52!}{5! \cdot 47!} = 2{,}598{,}960.$$

Furthermore, we can use binomial coefficients and the first rule of counting to find another formula for the multinomial coefficient. A placement of $k$ balls into $n$ boxes with occupation numbers $\theta_1, \theta_2, \ldots, \theta_n$ can be made using $n - 1$ choices: choose $\theta_1$ balls from the $k$ balls and put them in the first box, choose $\theta_2$ balls from the remaining $k - \theta_1$ balls and put them in the second box, ..., choose $\theta_{n-1}$ balls from the remaining $k - \theta_1 - \cdots - \theta_{n-2}$ balls and put them in the next to last box, and finally put the last $\theta_n = k - \theta_1 - \cdots - \theta_{n-1}$ balls in the last box (no more choice is necessary). Therefore,

$$\binom{k}{\theta_1, \theta_2, \ldots, \theta_n} = \binom{k}{\theta_1} \binom{k - \theta_1}{\theta_2} \cdots \binom{k - \theta_1 - \cdots - \theta_{n-2}}{\theta_{n-1}}.$$

**Table 2: Multinomial and Binomial Coefficients**

| Description | Formula |
|-------------|---------|
| Placements of $k$ balls into $n$ boxes with occupation numbers $\theta_1, \ldots, \theta_n$ | $\binom{k}{\theta_1, \ldots, \theta_n}$ |
| Subsets of size $\theta$ of a set of $k$ balls | $\binom{k}{\theta} = \binom{k}{\theta, k - \theta}$ |

## 3. Computing Probabilities

Consider a finite sample space $\Omega$. The events of $\Omega$ are the subsets $A \subseteq \Omega$. We would like to see what a probability measure $P$ on $\Omega$ means. Remember that $P$ is defined on events of $\Omega$. An event $A \subseteq \Omega$ may be written as a finite set

$$A = \{\omega_1, \omega_2, \ldots, \omega_n\}$$

and by additivity any probability measure $P$ must satisfy

$$P(A) = P(\{\omega_1\}) + P(\{\omega_2\}) + \cdots + P(\{\omega_n\}).$$

We call the events $\{\omega\}$, having just one outcome $\omega \in \Omega$, the **atoms** of $\Omega$. The distinction is roughly the same as that between a noun and a simple sentence containing it, e.g., between "tree" and "This is a tree."

What we have just shown above is that every probability measure $P$ on a finite sample space $\Omega$ is determined by its values on atoms. The value on an arbitrary event $A \subseteq \Omega$ is then computed by the formula:

$$P(A) = \sum_{\omega \in A} P(\{\omega\}).$$

The values of $P$ on the atoms may be assigned arbitrarily so long as:

1. $P(\{\omega\}) \ge 0$ for all $\omega$,
2. $\sum_{\omega \in \Omega} P(\{\omega\}) = 1$.

Whenever (1) and (2) hold, $P$ defines a consistent probability measure on $\Omega$.

The simplest example of a probability measure on a finite sample space $\Omega$ is the one we will call the **equally likely probability**; it is the unique probability measure $P$ on $\Omega$ for which every atom is assigned the same probability as any other. Hence for every atom $\{\omega\}$, $P(\{\omega\}) = \frac{1}{|\Omega|}$. For more general events $A \subseteq \Omega$, this probability has a simple formula:

$$P(A) = \frac{|A|}{|\Omega|} = \frac{\text{number of outcomes } \omega \in A}{\text{total number of outcomes in } \Omega}.$$

The equally likely probability is quite common in gambling situations as well as in sampling theory in statistics, although in both cases great pains are taken to see to it that it really is the correct model. For this reason this probability has something of an air of artificiality about it, even though it or probability measures close to it do occur often in nature. Unfortunately nature seems to have a perverse way of hiding the proper definition of $\Omega$ from casual inspection.

The phrases "completely at random" or simply "at random" are used to indicate that a given problem is assuming the equally likely probability. The latter phrase is misleading because every probability measure defines a concept of randomness for the sample space in question. Even certainty for one outcome is a special case of a probability measure. In Chapter VII, we will justify the use of the description "completely random" for the equally likely probability measure. For now we consider some concrete examples of this probability measure.

**Rolling Dice.** What is the probability that in a roll of three dice no two show the same face? We already computed $|\Omega|$ in the last section: $|\Omega| = 216$. The event $A$ in question is "the faces of the three dice are all different." We think of an outcome in $A$ as a placement of three balls into 6 boxes so that no two balls are in the same box. There are $(6)_3 = 6 \cdot 5 \cdot 4 = 120$ placements with this property. Hence

$$P(A) = \frac{120}{216} = \frac{5}{9}.$$

**Birthday Coincidences.** If $n$ students show up at random in a classroom, what is the probability that at least two of them have the same birthday? In order to solve this problem we will make some simplifications. We will assume that there are only 365 days in every year; that is, we ignore leap years. Next we will assume that every day of the year is equally likely to be a birthday. Lastly, we assume that the students' birthdays are independent dates. These are all innocuous assumptions.

Let $B$ be the event in question, and let $A = B^c$ be the complementary event "no two students have the same birthday." Now just as we computed in the dice rolling problem above, $P(A) = \frac{(365)_n}{365^n}$ and hence $P(B) = 1 - \frac{(365)_n}{365^n}$. These probabilities are easily computed on a hand calculator. Here are some values:

| $n$ | $P(A)$ | $P(B)$ |
|-----|---------|---------|
| 20 | 0.5886 | 0.4114 |
| 22 | 0.5243 | 0.4757 |
| 25 | 0.4313 | 0.5687 |
| 30 | 0.2937 | 0.7063 |

So in a class of 30 students the odds are 7 to 3 in favor of at least two having a common birthday.

**Random Committees.** In the U.S. Senate a committee of 50 senators is chosen at random. What is the probability that Massachusetts is represented? What is the probability that every state is represented?

In any real committee the members are not chosen at random. What this question is implicitly asking is whether random choice is "fair" with respect to two criteria of fairness. Note that the phrase "at random" is ambiguous. A more precise statement would be that every 50-senator committee is as probable as any other.

We first count $|\Omega|$, the number of possible committees. Since 50 senators are being chosen from 100 senators, there are

$$|\Omega| = \binom{100}{50}$$

committees. Let $A$ be the event "Massachusetts is not represented." The committees in $A$ consist of 50 senators chosen from the 98 non-Massachusetts senators. Therefore,

$$P(A) = \frac{\binom{98}{50}}{\binom{100}{50}} = \frac{50 \cdot 49}{100 \cdot 99} \approx 0.247.$$

So the answer to our original question is that Massachusetts is represented with probability $1 - 0.247 = 0.753$ or 3 to 1 odds. This seems quite fair.

Now consider the event $A$ = "every state is represented." Each committee in $A$ is formed by making 50 independent choices from the 50 state delegations. Hence $|A| = 2^{50}$ and so

$$P(A) = \frac{2^{50}}{\binom{100}{50}} \approx 10^{-14},$$

i.e., essentially impossible. By this criterion, random choice is not a fair way to choose a committee.

We computed the above probability by using Stirling's Formula as follows:

$$\frac{2^{50}}{\binom{100}{50}} \approx \frac{2^{50} \cdot (50!)^2}{100!} \approx \frac{2^{50} \cdot 50^{50} \cdot e^{-50} \cdot \sqrt{2\pi \cdot 50} \cdot 50^{50} \cdot e^{-50} \cdot \sqrt{2\pi \cdot 50}}{100^{100} \cdot e^{-100} \cdot \sqrt{2\pi \cdot 100}}$$

$$= 2^{50} \cdot \left(\frac{50}{100}\right)^{100} \cdot \sqrt{\frac{\pi \cdot 50}{1}} = 2^{50} \cdot 2^{-100} \cdot \sqrt{50\pi}$$

$$= 2^{-50} \cdot \sqrt{50\pi} \approx 10^{-14}.$$

Using a calculator one gets the more exact answer: $1.113 \times 10^{-14}$. Compare this with the following answer obtained (with much more effort) without using Stirling's Formula and correct to 5 decimal places: $1.11595 \times 10^{-14}$.

## 4. Indistinguishability

If we roll three dice, the number of possible outcomes is the number of placements of three balls in six boxes: 216. Suppose now that the balls are photons and the boxes are six possible states. Now how many placements are there? The answer is rather surprising: only 56. If we consider electrons instead of photons the answer is even smaller: 20. Moreover, if the six possible states have the same energy, then the 56 states for photons are equally likely. The fact that subatomic particles do not behave as tiny hard balls is one of the major discoveries of physics in this century. The counting problems one encounters in physics are more difficult than those of the previous sections, but a deep understanding of the physics of subatomic particles requires the concepts we present here.

The reason that particles do not behave as dice or balls is a consequence of a property known as **indistinguishability**. In other words, if two particles of the same type were interchanged but the rest of the configuration is left unchanged, then the new configuration is identical to the old one. Moreover, given a set of various possible different configurations, all having the same energy, each is as likely to occur as any other. For simplicity, suppose that we have two photons and three states. There are 6 possible configurations:

| number of photons in state #1 | in state #2 | in state #3 |
|-------------------------------|-------------|-------------|
| 2 | 0 | 0 |
| 1 | 1 | 0 |
| 1 | 0 | 1 |
| 0 | 2 | 0 |
| 0 | 1 | 1 |
| 0 | 0 | 2 |

Particles which are indistinguishable and any number of which may share a given state are called **bosons**, and we say they obey **Bose-Einstein statistics**. For example, photons and hydrogen atoms are bosons.

Electrons differ from photons in that two electrons cannot have the same state. As a result, if our configuration consists of two electrons occupying three states, there are only three possible configurations. The fact that two electrons cannot occupy the same state is called the **Pauli Exclusion Principle**. Particles which are indistinguishable and which obey the Pauli exclusion principle are called **fermions**, and we say they obey **Fermi-Dirac statistics**. For example, electrons, neutrons and protons are fermions.

### Fermi-Dirac Statistics: Subsets

We first count Fermi-Dirac configurations. A Fermi-Dirac configuration means simply that certain of the states are occupied (or "filled") and the rest are not. Thus a Fermi-Dirac configuration is a subset of the states. Since there are $n$ states and $k$ particles, there are $\binom{n}{k}$ possible configurations.

### Bose-Einstein Statistics: Multisets

In order to count placements obeying Bose-Einstein statistics, we will use the second rule of counting. However the ordered object corresponding to these placements is a new concept: the **disposition**. A disposition of $k$ balls in $n$ boxes is a placement together with the additional information of an arrangement in some order of the balls placed in each box. Another model for a disposition is a set of $k$ flags arranged on $n$ flagpoles. Yet another model is that of a disposition of $k$ cars in $n$ traffic lanes on a turnpike.

We can count the number of dispositions using the first rule of counting. The first ball can be placed $n$ ways. The second ball has $n + 1$ choices: either we place it in an unoccupied box ($n - 1$ choices) or we place it before or after the first ball in the occupied box (2 choices). The third ball has $n + 2$ choices. In general each newly placed ball creates one more "slot" for the next ball.

By the first rule of counting, there are $n(n + 1) \cdots (n + k - 1)$ dispositions of $k$ balls in $n$ boxes. This product is called the **upper** or **rising factorial** and written $(n)^k$. As with the lower factorial, the $k$ denotes the number of factors.

We now consider an alternative way to count dispositions. We first specify the occupancy numbers, then count all dispositions for the given set of occupancy numbers. A glance at the table reveals the following general fact: the number of dispositions of $k$ balls into $n$ boxes having a given set of occupation numbers is precisely $k! = (k)_k$, the number of permutations of $k$ balls.

By the Second Rule of Counting, the number of sets of occupation numbers is

$$\frac{(n)^k}{k!}.$$

Now a Bose-Einstein configuration means that each state has a certain number of particles in it (possibly none). Thus a Bose-Einstein configuration is nothing but a set of occupation numbers. We write this as $\binom{n}{k}^{*}$ by analogy with the binomial coefficient and call it the **multiset coefficient**. We use this name because we may interpret a Bose-Einstein configuration as being a multiset: a set of elements together with a nonnegative multiplicity for each element. The classical terminology for multiset is **combination**.

**Monomials.** Consider for example how many monomials of degree 16 can be made with 10 variables $x_1, \ldots, x_{10}$. Each such monomial is a product of 16 $x_i$'s where some must be repeated and the order does not matter. Thus each is a 16-multisubset of the set $\{x_1, \ldots, x_{10}\}$. Therefore there are $\binom{10}{16}^{*} = \binom{25}{16} = 2{,}042{,}975$ monomials.

**Particles.** What is the probability that a random configuration of $k$ particles in $n$ states will have occupation numbers $\theta_1, \ldots, \theta_n$? The answer will depend on the "physics" of the problem, i.e. which statistics is to be used: Maxwell-Boltzmann, Fermi-Dirac or Bose-Einstein. Let $A$ be this event.

1. **Maxwell-Boltzmann.** $P(A) = \displaystyle\binom{k}{\theta_1, \ldots, \theta_n} \cdot \frac{1}{n^k}$

2. **Fermi-Dirac.** $P(A) = \begin{cases} 0 & \text{if one of the } \theta_i \text{ is greater than one} \\ 1/\binom{n}{k} & \text{otherwise} \end{cases}$

3. **Bose-Einstein.** $P(A) = \displaystyle\frac{1}{\binom{n}{k}^{*}}$

We try two examples: 3 particles in 5 states with occupation numbers $(1, 0, 1, 1, 0)$ and $(0, 3, 0, 0, 0)$:

| | $(1, 0, 1, 1, 0)$ | $(0, 3, 0, 0, 0)$ |
|---|---|---|
| Maxwell-Boltzmann | $6/125 = 0.048$ | $1/125 = 0.008$ |
| Fermi-Dirac | $1/10 = 0.100$ | $0$ |
| Bose-Einstein | $1/35 = 0.029$ | $1/35 = 0.029$ |

Notice how Bose-Einstein statistics "enhance" the probability of having multiple particles in a single state relative to Maxwell-Boltzmann statistics.

**Table 3: Placements of $k$ indistinguishable balls into $n$ boxes.**

| | Formula |
|---|---|
| Arbitrary placements | $\binom{n}{k}^{*} = \frac{(n)^k}{k!}$ |
| Placements with at most one ball per box | $\binom{n}{k} = \frac{(n)_k}{k!}$ |

## 5. Identities for Binomial and Multiset Coefficients

The coefficients $\binom{n}{k}$ and $\binom{n}{k}^{*}$ satisfy a wealth of identities. Although these can be proved using the formulas, they can often be given combinatorial proofs. That is, we can prove them using only their definitions in terms of "balls into boxes."

**1.** $\displaystyle\binom{n}{k} = \binom{n-1}{k-1} + \binom{n-1}{k}$. To prove this we "mark" one of the boxes, say the last one. Let:

- $Q$ = the set of all $k$-subsets of the $n$-set $U$
- $B$ = the set of all $k$-subsets of the $n$-set $U$ which contain the last box
- $C$ = the set of all $k$-subsets of the $n$-set $U$ which do not contain the last box.

$Q$ consists of all (unordered) $k$ element samples from a population $U$ of size $n$. $B$ and $C$ are the events "the sample has the last individual" and "the sample does not have the last individual." As events it is clear that $Q = B \cup C$ and $B \cap C = \emptyset$. Therefore $|Q| = |B| + |C|$. Each of these is easy to count:

- $|Q| = \binom{n}{k}$ by the definition of the binomial coefficient.
- $|B| = \binom{n-1}{k-1}$ since each subset in $B$ consists of the last box together with an arbitrary $(k-1)$-element subset of the other $n - 1$ boxes.
- $|C| = \binom{n-1}{k}$ since each subset in $C$ consists of a $k$-element subset of the other $n - 1$ boxes.

**2.** $\displaystyle\binom{n}{k}^{*} = \binom{n}{k-1}^{*} + \binom{n-1}{k}^{*}$. This is the multiset analogue of identity 1. $\binom{n}{k-1}^{*}$ is the number of $k$-multisubsets of the $n$ boxes which contain at least one copy of the last box; $\binom{n-1}{k}^{*}$ is the number of $k$-multisubsets of the $n$ boxes which contain no copy of the last box.

Identity 1 gives rise to **Pascal's triangle**. Because of identity 2, multiset coefficients may also be arrayed in a Pascal-like triangle.

**3.** $\displaystyle\binom{n+1}{k+1} = \binom{n}{k} + \binom{n-1}{k} + \cdots + \binom{k}{k}$. We prove this by classifying the $(k+1)$-subsets of a set $U$ of $n + 1$ boxes according to which is the lowest numbered box in the subset.

**4.** $\displaystyle\binom{n+1}{k}^{*} = \binom{n}{k}^{*} + \binom{n}{k-1}^{*} + \cdots + \binom{n}{0}^{*}$. This is the multiset analogue of identity 3. We classify the $k$-multisubsets of an $(n + 1)$-set according to how many copies of the last element of the $(n + 1)$-set are in the multisubset.

**5.** $\displaystyle k \binom{n}{k} = n \binom{n-1}{k-1}$. This one is easiest to prove directly from the formula; however it does have a combinatorial proof. Suppose we make a table of all $k$-subsets of an $n$-set $U$. We use $k \binom{n}{k}$ entries when we make this table. We now count the number of entries in another way. Each element of the $n$-set $U$ appears $\binom{n-1}{k-1}$ times in this table: once for every way of choosing $k - 1$ elements from the remaining $n - 1$ elements of $U$. Therefore there are also $n \binom{n-1}{k-1}$ entries in the table.

**6.** $\displaystyle\frac{n}{k} \binom{n}{k} = \frac{n+1}{k} \binom{n}{k-1}^{*}$. We leave the multiset analogue as an exercise.

**7.** $\displaystyle\binom{n}{k} = \binom{n}{n-k}$. Choosing a $k$-subset is the same as choosing its complement, which has $(n - k)$ elements.

**8.** $\displaystyle\binom{i+j}{k} = \sum_{m=0}^{k} \binom{i}{m} \binom{j}{k-m}$. Both 8 and 9 are proved the same way. Start with a set $U$ of $n = i + j$ boxes.

**9.** $\displaystyle\binom{i+j}{k}^{*} = \sum_{m=0}^{k} \binom{i}{m}^{*} \binom{j}{k-m}^{*}$. Classify every $k$-element subset according to the number of elements among the first $i$ boxes, in which case $k - m$ of the elements will be among the last $j$ boxes. Similarly for multisubsets.

**10.** $\displaystyle\binom{n}{0} + \binom{n}{1} + \cdots + \binom{n}{n} = 2^n$. The left hand side counts the number of subsets of an $n$-set. The right hand side is the number of placements of $n$ distinguishable balls into two boxes, i.e., also counts the number of subsets of an $n$-set. There is no multiset analogue.

**11.** $\displaystyle\binom{n}{k}^{*} = (-1)^k \binom{-n}{k} = \binom{n+k-1}{k}$. The binomial and multiset coefficients make sense with $n$ any real number. This identity is easily proved explicitly. A combinatorial proof reveals an alternative way to compute the multiset coefficient. The binomial coefficient $\binom{n+k-1}{k}$ counts the number of $k$-subsets of a set of $n + k - 1$ boxes. For a given $k$-subset of the boxes, change the boxes in the $k$-subset to balls and change the remaining $n - 1$ boxes into vertical lines marking the boundaries of $n$ new boxes. Therefore $\binom{n+k-1}{k} = \binom{n}{k}^{*}$.

**12.** $\displaystyle\binom{n}{k}^{*} = \binom{n+k-1}{n-1}$. Use the above representation and then interchange balls and vertical lines.

## 6\*. Random Integers

It is intuitively obvious that if we choose an integer "at random" it will be even with probability $\frac{1}{2}$, divisible by 3 with probability $\frac{1}{3}$, and so on. Furthermore, if $p$ and $q$ are different prime numbers, then an integer chosen at random will be divisible by both $p$ and $q$ with probability $\frac{1}{pq}$, since it will be so if and only if it is divisible by the product $pq$. Therefore divisibility by $p$ and by $q$ are independent events. All this sounds reasonable except that it is not clear how to make sense out of the concept of a "randomly chosen integer" in such way that every integer is equally likely.

The naive approach is the notion of **arithmetic density**. Namely let $\Omega = \{1, 2, 3, \ldots\}$ be the sample space consisting of all integers, and we take the events to be arbitrary subsets of $\Omega$. For an event $A \subseteq \Omega$, the arithmetic density of $A$ is

$$d(A) = \lim_{n \to \infty} \frac{|\{1, 2, \ldots, n\} \cap A|}{n}$$

if it exists. For example, if $D_p$ is the event "$n$ is divisible by $p$" or equivalently as a set, $D_p = \{p, 2p, 3p, \ldots\}$, then it is obvious that $d(D_p) = \frac{1}{p}$. Moreover if $p$ and $q$ are different primes then $d(D_p \cap D_q) = \frac{1}{pq}$. Unfortunately there are several problems with this definition. First of all, $d$ is not defined on all events. Secondly, $d$ is not a probability density even where it is defined. For example, if we decompose the set of even integers $D_2$ into its individual elements

$$D_2 = \{2\} \cup \{4\} \cup \{6\} \cup \cdots$$

we get $d(D_2) = \frac{1}{2}$ but $d(\{2\}) + d(\{4\}) + \cdots = 0$.

As an example of an event on which $d$ is not defined consider the event "the first digit of $n$ is 1." Call this event $F_1$. Then

$$F_1 = \{1, 10, 11, \ldots, 19, 100, 101, \ldots, 199, 1000, \ldots\}.$$

In this case $\frac{|\{1, 2, \ldots, n\} \cap F_1|}{n}$ forever wanders between $\frac{1}{9}$ and $\frac{5}{9}$ and never "settles down" to any limiting value as $n \to \infty$.

We shall describe a "better" approach to this problem which is nevertheless far from being a complete answer.

Recall from calculus that the series $\sum \frac{1}{n^s}$ converges when $s > 1$ and diverges when $s \le 1$. The value of this series when $s > 1$ is written $\zeta(s)$ and is a famous function called the **Riemann zeta function**. Computing values of this function is quite difficult, for example $\zeta(2) = \frac{\pi^2}{6}$. However, we shall only need the fact that $\zeta(s)$ exists.

We now define for an event $A \subseteq \Omega$, the **Dirichlet density** of $A$ with parameter $s$ to be

$$P_s(A) = \frac{1}{\zeta(s)} \sum_{n \in A} \frac{1}{n^s}.$$

The Dirichlet densities are easily checked to be probability measures. For example,

$$P_s(\Omega) = \frac{1}{\zeta(s)} \sum_{n \in \Omega} \frac{1}{n^s} = \frac{\zeta(s)}{\zeta(s)} = 1.$$

Let us compute the probability of the event $D_p$, "$n$ is divisible by $p$."

$$P_s(D_p) = \frac{1}{\zeta(s)} \sum_{n \in D_p} \frac{1}{n^s} = \frac{1}{\zeta(s)} \sum_{m=1}^{\infty} \frac{1}{(mp)^s} = \frac{1}{\zeta(s)} \cdot \frac{1}{p^s} \cdot \zeta(s) = \frac{1}{p^s}.$$

Similarly, for distinct primes $p$ and $q$, $P_s(D_p \cap D_q) = \frac{1}{(pq)^s} = P_s(D_p) P_s(D_q)$. Therefore while the Dirichlet density of $D_p$ is not the intuitively expected value $\frac{1}{p}$, it is nevertheless true that being divisible by different primes are independent events.

We find ourselves in a quandary. The notion of arithmetic density is intuitive, but it is not a probability. On the other hand the Dirichlet densities are probabilities, but they depend on a parameter $s$ whose meaning is not easy to explain. Moreover the Dirichlet densities assign the events $D_p$ the "wrong" probability.

We get out of this quandary by a simple expedient: take the limit $\lim_{s \to 1^+} P_s(A)$. One can prove, although it is very difficult to do so, that if the event $A$ has an arithmetic density, then $d(A) = \lim_{s \to 1^+} P_s(A)$. Moreover events such as $F_1$ now have a density, for one can show that $\lim_{s \to 1^+} P_s(F_1) = \log_{10}(2)$. These probabilities have many useful applications in the theory of numbers.

---

# Exercises for Chapter III

## The Basic Models

**1.** Flip a coin three times. How many ways can this be done? List them. Convert each to the corresponding placement of 3 balls into 2 boxes. Do any of these placements satisfy the exclusion principle?

**2.** Roll a die twice. List in a column the ways that this can be done. In the next column list the corresponding placements of 2 balls into 6 boxes. Mark the ones which satisfy the exclusion principle. In a third column list the corresponding 2-letter words, using the alphabet $\{A, B, C, D, E, F\}$.

**3.** You are interviewing families in a certain district. In order to ascertain the opinion held by a given family you sample two persons from the family. Recognizing that the order matters in which the two persons from one family are interviewed, how many ways can one sample two people from a six person family? List the ways and compare with the lists in exercise 2 above. If the two people are interviewed simultaneously so that order no longer matters, how many ways can one sample two people from a 6-person family?

**4.** Return to exercise 2. In a fourth column list the occupation numbers of the six boxes.

## The Rules of Counting and Stirling's Formula

**5.** A small college has a soccer team that plays eight games during its season. In how many ways can the team end its season with five wins, two losses and one tie? Use a multinomial coefficient.

**6.** Ten students are traveling home from college in Los Angeles to their homes in New York City. Among them they have two cars, each of which will hold six passengers. How many ways can they distribute themselves in the two cars?

**7.** Compute the order of magnitude of $1000!$, i.e., compute the integer $n$ for which $1000!$ is approximately equal to $10^n$. [Use a hand calculator and Stirling's Formula to compute the approximate value of $\log_{10}(1000!)$.]

**8.** How many ways can a 100-member senate be elected from a country having 300,000,000 inhabitants?

## The Finite Uniform Probability Measure

**9.** Have the students in your probability class call out their birthday until someone realizes there is a match. Record how many birthdays were called out. We will return to this problem in Exercise IV.25.

**10.** Compute the probability that in a class of 5 students at least two have adjacent or identical birthdays. Ignore leap year.

**11.** Compute the probabilities for two dice to show $n$ points, $2 \le n \le 12$. Do the same for three dice.

**12.** It is said that the Earl of Yarborough used to bet 1000 to 1 against being dealt a hand of 13 cards containing no card higher than 9 in the whist or bridge order. Did he have a good bet? In bridge the cards are ranked in each suit from 2 (the lowest) through 10, followed by the Jack, Queen, King and Ace in this order.

**13.** May the best team win! Let us suppose that the two teams that meet in the World Series are closely matched: the better team wins a given game with probability 0.55. What is the probability that the better team will win the World Series? Do this as follows. Treat the game as tosses of a biased coin. Express the event "the better team wins" in terms of elementary Bernoulli events, and then compute the probability.

**14.** Although Robin Hood is an excellent archer, getting a "bullseye" nine times out of ten, he is facing stiff opposition in the tournament. To win he finds that he must get at least four bullseyes with his next five arrows. However, if he gets five bullseyes, he runs the risk of exposing his identity to the sheriff. Assume that if he wants to miss the bullseye he can do so with probability 1. What is the probability that Robin wins the tournament?

**15.** A smuggler is hoping to avoid detection by customs officials by mixing some illegal drug tablets in a bottle containing some innocuous vitamin pills. Only 5% of the tablets are illegal in a bottle containing 400 tablets. The customs official tests five of the tablets. What is the probability that he catches the smuggler? [Answer: about 22.7%] Is this a reasonable way to make a living?

**16.** Every evening a man either visits his mother, who lives downtown, or visits his girlfriend, who lives uptown (but not both). In order to be completely fair, he goes to the bus stop every evening at a random time and takes either the uptown or the downtown bus, whichever comes first. As it happens each of the two kinds of buses stop at the bus stop every 15 minutes with perfect regularity (according to a fixed schedule). Yet he visits his mother only around twice each month. Why?

**17.** In a small college, the members of a certain Board are chosen randomly each month from the entire student body. Two seniors who have never served on the board complain that they have been deliberately excluded from the Board because of their radical attitudes. Do they have a case? There are 1000 students in the college and the Board consists of 50 students chosen eight times every year.

**18.** The smuggler of exercise 15 passes through customs with no difficulty even though they test 15 tablets. But upon reaching home he discovers to his dismay that he accidentally put too many illegal drug tablets in with the vitamin pills, for he finds that 48 of the remaining 385 tablets are illegal. Does he have reason to be suspicious? The question he should ask is the following: given that he packed exactly 48 illegal pills, what is the probability that none of the 15 tested were illegal?

**19.** Using Stirling's formula, compute the probability that a coin tossed 200 times comes up heads exactly half of the time. Similarly what is the probability that in 600 rolls of a die, each face shows up exactly 100 times?

**20.** The following is the full description of the game of CRAPS. In the first roll of a pair of dice, 7 and 11 win, while 2, 3 and 12 lose. If none of these occur, the number of dots showing is called the "point," and the game continues. On every subsequent roll, the point wins, 7 loses and all other rolls cause the game to continue. You are the shooter; what is your probability of winning?

**21.** Compute the probability of each of the following kinds of poker hands, assuming that every five-card poker hand is equally likely. Note that the kinds of hands listed below are pairwise disjoint.

| Kind of hand | Definition |
|---|---|
| (a) "nothing" | none of (b)--(j) |
| (b) one pair | two cards of the same rank |
| (c) two pair | two cards of one rank and two of another |
| (d) three-of-a-kind | three cards of the same rank |
| (e) straight | rank in ascending order (ace may be low card or high card but not both at once) |
| (f) full house | three of one rank and two of another |
| (g) flush | all cards of the same suit |
| (h) straight flush | both (e) and (g) |
| (i) four-of-a-kind | four cards of the same rank |
| (j) royal flush | (h) with ace high |

**22.** It is an old Chinese custom to play a dice game in which six dice are rolled and prizes are awarded according to the pattern of the faces shown, ranging from "all faces the same" (highest prize) to "all faces different." List the possible patterns obtainable and compute the probabilities. Do you notice any surprises?

**23.** Some environmentalists want to estimate the number of whitefish in a small lake. They do this as follows. First 50 whitefish are caught, tagged and returned to the lake. Some time later another 50 are caught and they find 3 tagged ones. For each $n$ compute the probability that this could happen if there are $n$ whitefish in the lake. For which $n$ is this probability the highest? Is this a reasonable estimate for $n$?

**24.** A group of astrologers has, in the past few years, cast some 20,000 horoscopes. Consider only the positions (houses) of the sun, the moon, Mercury, Venus, Earth, Mars, Jupiter and Saturn. There are twelve houses in the Zodiac. Assuming complete randomness, what is the probability that at least two of the horoscopes were the same?

**25.** In a chess championship, a certain number $N$ of games are specified in advance. The current champion must win $N$ games in order to retain the championship, while the challenger must win more than $N$ in order to unseat the champion. The challenger is somewhat weaker than the champion, being able to win only a dozen games out of every 25 games which do not end in a tie. If the challenger is allowed to choose the number $N$, what should the challenger choose? [Answer: 12].

**26.** The three-person duel is a difficult situation to analyze in full generality. We consider just a simple special case. Three individuals, X, Y and Z, hate each other so much they decide to have a duel only one of which can survive. They stand at the corners of an equilateral triangle. The probability of a hit by each of the three participants is 0.5, 0.75 and 1, respectively. For this reason they decide that they will each shoot at whomever they wish, taking turns cyclically starting with X and continuing with Y, then Z, then X again and so on. All hits are assumed to be fatal. What strategy should each employ, and what are their probabilities of survival?

## History of Probability

Historically, the modern theory of probability can be said to have begun as a result of a famous correspondence between the mathematicians Blaise Pascal (1623--62) and Pierre de Fermat (1601--65). Their correspondence came about as a result of problems put to Pascal by the Chevalier de Mere, a noted gambler of the time. We give below two of these problems.

**27.** Two gamblers are playing a game which is interrupted. How should the stake be divided? The winner of the game was to be the one who first won 4 deals out of 7. One gambler has so far won 1 deal and lost the other 2 deals. They agree to divide the stake according to the probability each had of winning the game, and this probability is to be computed by assuming that each player has equal probability of winning a given game. Express the event that the first gambler wins in terms of elementary Bernoulli events. Then compute the probability. [Answer: 5/16].

**28.** Chevalier de Mere apparently believed that it is just as probable to show at least one six in four throws of a single die as it is to show at least one double-six in twenty-four throws of a pair of dice. However, de Mere computed the probabilities of these two events and found that one was slightly above, the other slightly below, 0.5. What are the exact probabilities?

**29.** In what was apparently Isaac Newton's only excursion into probability, he answered a question put to him by Samuel Pepys. The problem was to determine which is more likely, showing at least one six in 6 throws of a die, at least two sixes in 12 throws or at least three sixes in 18 throws. Compute these probabilities and consider the general question of the probability of showing at least $n$ sixes in $6n$ throws of a die.

## Indistinguishability

**30\*.** Suppose we have a physical system having three energy levels and two states per energy level (for a total of six states). If two electrons are in the configuration, what is the probability that they occupy the lowest two energy levels (one in each level)? Consider the same question for two photons and two Maxwell-Boltzmann particles. Since the states do not have the same energy, the states are not "equiprobable." Assume that the probability of one particle being in a state is proportional to $e^{-E}$ where $E$ is the energy of the state. In this problem suppose that the three energy levels have respective energies 1, 2, and 3.

**31\*.** Consider a small piece of metal at ordinary temperatures. It forms a crystal with the nuclei of its atoms appearing in regular fashion throughout the solid. Most of the electrons may be regarded as being bound to some one nucleus. Some of the electrons, the ones in the outermost orbitals of an atom, have more freedom of movement. Call these the valence electrons. The outermost orbitals of a given atom form an almost continuous band. Let us suppose that the valence electrons act as bosons in this environment with any number being allowed in the set of outermost orbitals of one given atom. Let us suppose also that the outermost orbitals of one given atom all have the same energy. Let $k$ be the number of atoms and let $n$ be the number of valence electrons. Compute the distribution of $\theta_1$, the number of valence electrons occupying the outermost orbitals of one specific atom. Now in an actual macroscopic piece of metal, $n$ and $k$ are very large (being on the order of $10^{23}$) and so cannot be measured exactly. However, the ratio $\lambda = \frac{n}{k}$ is usually not too difficult to find. Since $n$ and $k$ are so large, we may regard them as being infinite. The distribution of $\theta_1$ is then approximated by letting $n$ and $k$ tend to infinity but in such a way that the ratio $\lambda = \frac{n}{k}$ is held fixed. Find this limiting distribution.

## Identities

**32.** Prove formally that $\displaystyle\binom{n}{k} = \sum \binom{n}{k-i}$.

**33.** Give combinatorial proofs of the above identity as well as the identity $\displaystyle\binom{n}{k}^{*} = \binom{n+k-1}{k}$.

**34.** Give a combinatorial proof of the following identity.

## Random Integers

**35\*.** Compute $\lim_{s \to 1^+} P_s(F_i)$ for $i = 2, 3, \ldots, 9$. Now pick out 100 addresses at random from a phone book and tabulate the number having each of the 9 possible first digits (ignore addresses other than natural number addresses). Do these fit with the predicted probabilities? Try 1000 addresses.

---

# Answers to Selected Exercises

**11.** Two dice show $n$ points with probability $\frac{\min(n-1, 13-n)}{36}$. For three dice the counting may be simplified by noticing that we can think of the first two dice as being a set to which the third die is added. Thus the number of ways to get $n$ with three dice is a sum of 6 consecutive numbers in this list:

$$0, 0, 0, 0, 0, 1 \;-\; 1, 2, 3, 4, 5, 6 \;-\; 6, 5, 4, 3, 2, 1 \;-\; 1, 0, 0, 0, 0, 0$$

Thus for $n = 3$, there is 1 way, for $n = 8$ there are 21 ways, etc. To get probabilities divide by 216. The above procedure is called **convolution**. We will see it again in section V.8.

**16.** The paradox here is thinking that a completely random time (uniform) implies that the man will take a completely random bus (equally likely). If the following is the bus schedule, one can see that the man will take a random bus, but it will not be completely random:

| Downtown | Uptown |
|----------|--------|
| 4:00 PM | 4:14 PM |
| 4:15 PM | 4:29 PM |
| 4:30 PM | 4:44 PM |

This paradox will appear again in various other disguises. It is important that you understand it thoroughly. Such paradoxes are a common feature when one uses "fuzzy thinking" about probabilities.

**20.** One wins or loses immediately with probabilities $\frac{2}{9}$ and $\frac{1}{9}$ respectively. The game goes on with probability $\frac{2}{3}$. However, the subsequent probabilities depend on the "point." Suppose that the probability of rolling the point in a single roll is $p$. Then the probability of getting and winning with that point is the infinite series

$$\sum_{i=1}^{\infty} p \cdot (1 - p - \tfrac{1}{6})^{i-1} \cdot p = \frac{p^2}{p + \frac{1}{6}}.$$

The probability of winning is thus $\frac{2}{9}$ plus the sum of $\frac{p^2}{p + 1/6}$ over all possible points. The probability of winning is thus:

$$\frac{2}{9} + \frac{1}{18} + \frac{4}{45} + \frac{25}{396} = 0.49293\ldots$$

**21.** Cards have 13 ranks (Ace, 2, 3, ..., King) and 4 suits (Clubs, Diamonds, Hearts, Spades). We count poker hands by choosing ranks and then suits or vice versa. The counts and probabilities are:

| Hand | Count | Probability |
|------|-------|-------------|
| Nothing | 1,302,540 | .5012 |
| One pair | 1,098,240 | .4226 |
| Two pair | 123,552 | .0475 |
| Triple | 54,912 | .0211 |
| Straight | 10,200 | .0039 |
| Full house | 3,744 | .0014 |
| Flush | 5,108 | .0020 |
| 4-of-a-kind | 624 | .0002 |
| Straight flush | 36 | $1.39 \times 10^{-5}$ |
| Royal flush | 4 | $1.54 \times 10^{-6}$ |

As a check, if one adds these up, one gets $\binom{52}{5} = 2{,}598{,}960$.

**22.** The patterns are the following: 6, 51, 42, 411, 33, 321, 3111, 222, 2211, 21111, 111111. The only surprise is that one pair (21111) is less probable than two pair (2211). In fact two pair will occur about 35% of the rolls, while one pair only occurs about 23% of the time so this should be quite noticeable.

**23.** After the tagging there are 50 tagged fish and $n - 50$ untagged ones. Catching 50 more fish can be done in $\binom{n}{50}$ ways, while one can catch 3 tagged and 47 untagged fish in $\binom{50}{3}\binom{n-50}{47}$ ways. So if this event is written $A_n$, then

$$P(A_n) = \frac{\binom{50}{3}\binom{n-50}{47}}{\binom{n}{50}}.$$

Notice that while $n = 833$ is the value of $n$ that maximizes $P(A_n)$, it is only slightly better than neighboring values.

The value $n = 833$ for which $P(A_n)$ is a maximum is called the **maximum likelihood estimator** of $n$, a term introduced by R. A. Fisher.

**24.** This is another "birthday coincidences" problem, but there are $N = 12^8 = 429{,}981{,}696$ possible horoscopes. Using Stirling's formula with $M = 20{,}000$:

$$1 - \frac{(N)_M}{N^M} \approx 1 - e^{-0.46527} = 0.37205$$

So there is about a 1 in 3 chance that two of the horoscopes were the same.

**30.** The number of configurations is $\binom{6}{2} = 15$ Fermi-Dirac, $\binom{6}{2}^{*} = 21$ Bose-Einstein, $6^2 = 36$ Maxwell-Boltzmann.

The probabilities of these configurations are not all the same in each case, but rather range from $Ce^{-2}$ when both particles are in the lowest energy level to $Ce^{-6}$ when both particles are in the highest energy level. To compute $C$ we must add up the various probabilities and solve for $C$. For example in the Fermi-Dirac case:

$$Ce^{-2} + 4Ce^{-3} + 5Ce^{-4} + 4Ce^{-5} + Ce^{-6} = 1$$

Thus two electrons are both in the lowest energy level with probability

$$\frac{e^{-2}}{e^{-2} + 4e^{-3} + 5e^{-4} + 4e^{-5} + e^{-6}} = 0.2971.$$

Similarly, two bosons are both in the lowest energy level with probability $0.5288$.

Notice how "chummy" bosons are compared to electrons or Maxwell-Boltzmann particles, while electrons are rather antisocial.
