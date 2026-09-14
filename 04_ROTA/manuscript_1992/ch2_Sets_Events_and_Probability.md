---
title: "Chapter II: Sets, Events and Probability"
author: "Gian-Carlo Rota"
edition: "1992"
chapter_number: 2
source: "An Introduction to the Theory of Probability — MIT Lecture Notes, 1992 Edition"
---

# Chapter II: Sets, Events and Probability

Suppose that we toss a coin any number of times and that we list the information of whether we got heads or tails on the successive tosses:

$$
\begin{array}{ccccccc}
H & T & H & H & T & T & T \\
1 & 2 & 3 & 4 & 5 & 6 & 7
\end{array}
$$

The act of tossing this coin over and over again as we have done is an example of an experiment, and the sequence of H's and T's that we have listed is called the experimental outcome. We now ask what it means, in the context of our experiment, to say that we got a head on the fourth toss. We call this an event. While it is intuitively obvious what an event represents, we want to find a precise meaning for this concept. One way to do this which is both obvious and subtle is to identify an event with the set of all ways that the event can occur. For example, the event "the fourth toss is a head" is the same as the set of all sequences of H's and T's whose fourth entry is H. At first it appears that we have said little, but in fact we have made a conceptual advance. We have made the intuitive notion of an event into a concrete notion: events are a certain kind of set.

However a warning is appropriate here. An event is not the same concept as that of an experimental outcome. An outcome consists of the total information about the experiment after it has been performed. Thus while an event may be easy to describe, the set to which it corresponds consists of a great many possible experimental outcomes, each being quite complex. In order to distinguish the concept of an event from the concept of an experimental outcome we will employ an artificial term for the latter. We will call it a sample point. Now a sample point will seldom look like an actual point in the geometric sense. We use the word "point" to suggest the "indivisibility" of one given experimental outcome, in contrast to an event which is made up of a great many possible outcomes. The term "sample" is suggestive of the random nature of our experiment, where one particular sample point is only one of many possible outcomes.

We will begin with a review of the theory of sets, with which we assume some familiarity. We will then extend the concept of a set by allowing elements to occur more than just once. We call such an entity a multiset. By one more conceptual step, the notion of a probability measure emerges as an abstraction derived from the multiset concept. Along the way we will repeatedly return to our coin-tossing experiment. We do this not only because it is a good example but also because we wish to emphasize that probability deals with very special kinds of sets.

## 1. The Algebra of Sets

In probability we always work within a context, which we define by specifying the set of all possible sample points. We call this set the sample space, typically denoted $\Omega$. The term "sample space" does not help one to visualize $\Omega$ any more than "sample point" is suggestive of an experimental outcome. But this is the term that has become standard. Think of $\Omega$ as the "context" or "universe of discourse." It does not, however, in itself define our experiment. Quite a bit more will be required to do this. One such requirement is that we must specify which subsets of $\Omega$ are to be the events of our experiment. In general not every subset will be an event. The choice of subsets which are to be the events will depend on the phenomena to be studied.

We will specify the events of our experiment by specifying certain very simple events which we will call the "elementary events," which we then combine to form more complicated events. The ways we combine events to form other events are called the Boolean or logical operations. The most important of these are the following:

- **union:** $A \cup B$ is the set of elements in $A$ or in $B$ (or both).
- **intersection:** $A \cap B$ is the set of elements both in $A$ and in $B$.
- **complement:** $A^c$ is the set of elements not in $A$ (sometimes also written $\overline{A}$)

Each of these has a natural interpretation in terms of events. Let $A$ and $B$ be two events.

- $A \cup B$ is the event "either $A$ or $B$ (or both) occur."
- $A \cap B$ is the event "both $A$ and $B$ occur."
- $A^c$ is the event "$A$ does not occur."

Several other Boolean operations are defined in the exercises.

When two events $A$ and $B$ have the property that if $A$ occurs then $B$ does also (but not necessarily vice versa), we will say that $A$ is a subevent of $B$ and will write $A \subseteq B$. In set-theoretic language one would say that $A$ is a subset of $B$ or that $B$ contains $A$.

The three Boolean operations and the subevent relation satisfy a number of laws such as commutativity, associativity, distributivity and so on, which we will not discuss in detail, although some are considered in the exercises. For example, the **DeMorgan Laws** are the following:

$$(\overline{A \cap B}) = \overline{A} \cup \overline{B}$$

$$(\overline{A \cup B}) = \overline{A} \cap \overline{B}$$

In terms of events, the first of these says that if it is not true that both $A$ and $B$ occur, then either $A$ does not occur or $B$ does not occur (or both), and conversely. One has a similar statement for the second law. Generally speaking, drawing a Venn diagram suffices to prove anything about these operations.

For more complicated expressions, involving many sets, and for which the Venn diagram would be extremely complex, it is very useful to know that there is a way we can simplify such an expression into an essentially unique expression. The idea is that every Boolean expression is a union of the smallest subevents obtainable by intersecting events occurring in the expression. To be more precise, suppose that we have an expression involving the events $A_1, A_2, \ldots, A_n$ and unions, intersections and complements in any order nested as deeply as required. The simplified expression we obtain can be described in two steps.

**Step 1.** Write $A_m^{+1} = A_m$ and $A_m^{-1} = \overline{A_m}$. This is just a notational convenience; it has no metaphysical significance. The expressions

$$A_1^{i_1} \cap A_2^{i_2} \cap \cdots \cap A_n^{i_n}$$

as $i_1, i_2, \ldots, i_n$ take on all possible choices of $+1$, are the smallest events obtainable from the events $A_1, A_2, \ldots, A_n$ using Boolean operations. We call these events the **atoms** defined by $A_1, A_2, \ldots, A_n$. Notice that in general there can be $2^n$ of them, but that in particular cases some of the atoms may be empty so there could be fewer than $2^n$ in all.

**Step 2.** Any expression involving $A_1, A_2, \ldots, A_n$ and using Boolean operations can be written as a union of certain of the atoms. There are many procedures that can be used to determine which of the atoms are to be used. We leave it as an exercise to describe such a procedure. The resulting expression will be called the "atomic decomposition." By using Venn diagrams and atomic decompositions, any problem involving a finite number of events can be analyzed in a straightforward way. Unfortunately many of our problems will involve infinitely many events and for these we will later need some new ideas.

## 2. The Bernoulli Sample Space

We now return to the example that began this chapter: tossing a coin. A sample point for this experiment is an infinite sequence of ones and zeros or equivalently of H's and T's. Just for variety we will also sometimes refer to a toss of heads as a "success" and tails as a "failure." Even if we are only concerned with a finite sequence of H's and T's, which is seemingly more realistic, it is nevertheless easier for computational reasons to imagine that we could go on tossing the coin forever. Moreover, we will find that certain seemingly rather ordinary events can only be expressed in such a context.

The set of all possible sequences of ones and zeros is called the **Bernoulli sample space** $\Omega$ and the experimental process of which it forms the basis is called the **Bernoulli process**. For the moment we will be a little vague about what a "process" means, but we will make it precise later. The events of the Bernoulli sample space consist of certain subsets of $\Omega$. To describe which subsets these are, we first describe some very simple events called elementary events. They are the events "the first toss comes up heads," "the second toss comes up heads," etc. We will write $H_n$ for the event "the $n^{\text{th}}$ toss comes up heads." The complement of the event $H_n$ will be denoted: $T_n = H_n^c$; it is the event "the $n^{\text{th}}$ toss comes up tails." One must be careful here. It is obvious that the complementary event to "the $n^{\text{th}}$ toss is heads" is "the $n^{\text{th}}$ toss is tails." However, it is less obvious that as sets $H_n^c = T_n$, since both $H_n$ and $T_n$ are infinite sets and it is not easy to imagine what they "look like." As a rule it is much easier to think in terms of the events themselves rather than in terms of their representations as sets.

We can now describe in general what it means for a subset of $\Omega$ to be an event of the Bernoulli sample space: an event is any subset obtainable from elementary events using the operations of complement as well as of unions and intersections of infinite sequences of events. The fact that we allow infinite unions and intersections will take some getting used to. What we are saying is that we allow any statements about the Bernoulli process which may in principle be expressed in terms of tosses of heads and tails (elementary events) using the words "and" (intersection), "or" (union), "not" (complement) and "ever" (infinite sequences).

To illustrate this we consider the following example of a Bernoulli event: "a sequence of two successive H's occurs before a sequence of two T's ever occurs." We will call a specified finite sequence of H's and T's a **run**. So the event in question is "the run HH occurs before the run TT ever occurs." Write $A$ for this event. The essence of the event $A$ is that we will continue flipping the coin until either an HH or a TT occurs. When one of them happens we may then quit, or we may not, but it is nevertheless computationally easier to conceive of the experiment as having continued forever. Now it ought to be conceptually clear that it is possible to express $A$ in terms of elementary Bernoulli events, but at first it may seem mysterious how to do it. The idea is to break apart $A$ into simpler events which can each be expressed relatively easily in terms of elementary events. The whole art of probability is to make a judicious choice of a manner of breaking up the event being considered. In this case we break up the event $A$ according to when the first run of HH occurs. Let $A_n$ be the event "the run HH occurs first at the $n^{\text{th}}$ toss and the run TT has not yet occurred." The event $A$ is the (infinite) union of all the $A_n$'s, and in turn each $A_n$ can be expressed in terms of the elementary events as follows:

$$A_2 = H_1 \cap H_2$$

$$A_3 = T_1 \cap H_2 \cap H_3$$

$$A_4 = H_1 \cap T_2 \cap H_3 \cap H_4$$

$$A_5 = H_1 \cap T_2 \cap H_3 \cap T_4 \cap H_5$$

Note that not only is $A$ the union of the $A_n$'s but also none of the $A_n$'s overlap with any other. In other words no sample point of $A$ has been counted twice. This property will be very important for probabilistic computations.

As an exercise one might try to calculate the expression, in terms of elementary events, of the event "a run of $k$ heads occurs before a run of $n$ tails occurs." Later we will develop tools for computing the probability of such an event quite easily, and this exercise will quickly convince one of the power of these tools.

## 3. The Algebra of Multisets

We now go back to our study of set theory. Our objective is to extend the concept of a set by allowing elements of sets to be repeated. This more general concept is called a **multiset**. To give an example, suppose that a committee of 10 members has an election to determine its chairperson. Of the votes that are cast, 7 are for candidate A, 2 for B and 1 for C. The set of votes is most easily expressed as a multiset consisting of 10 elements: 7 of type A, 2 of type B and 1 of type C. In set-builder notation we write this $\{a, a, a, a, a, a, a, b, b, c\}$. We can write this more economically as $\{a^7, b^2, c^1\}$, the exponents denoting the number of copies of the element that are in the multiset. Notice that a set is a special kind of multiset.

As with sets, we can combine multisets to form new multisets. In some ways these operations are more natural than the analogous ones for sets. The operations are addition and multiplication. In the exercises we describe one more operation: subtraction. Given two multisets $M$ and $N$, their **sum** $M + N$ is obtained by combining all the elements of $M$ and $N$, counting multiplicities. For example, if $b$ occurs three times in $M$ and twice in $N$, then it occurs five times in $M + N$. The **product** $MN$ of $M$ and $N$ is obtained by multiplying the multiplicities of elements occurring in both $M$ and $N$. For example, if $b$ occurs three times in $M$ and twice in $N$, then it occurs six times in $MN$. Here are some more examples:

$$\{a, a, b, b, b\} + \{a, a, b, b, c\} = \{a, a, a, a, b, b, b, b, b, c\}$$

$$\{a, a, b, b, b\} \cdot \{a, a, b, b, c\} = \{a, a, a, a, b, b, b, b, b, b\}$$

$$\{a, b\} + \{b, c\} = \{a, b, b, c\}$$

$$\{a, b\} \cdot \{b, c\} = \{b\}$$

or using exponent notation:

$$\{a^2, b^3\} + \{a^2, b^2, c\} = \{a^4, b^5, c\}$$

$$\{a^2, b^3\} \cdot \{a^2, b^2, c\} = \{a^4, b^6\}$$

$$\{a^1, b^1\} + \{b^1, c^1\} = \{a^1, b^2, c^1\}$$

$$\{a, b\} \cdot \{b, c\} = \{b^1\}$$

When $A$ and $B$ are two multisets, it now makes sense to speak of their sum $A + B$ and their product $AB$. What do these mean in terms of sets? The product is easy to describe; it coincides precisely with the intersection of $A$ and $B$. For this reason it is quite common to write $AB$ for the intersection of two events. On the other hand, the sum of two sets is not so easy to describe. In general, $A + B$ will not be a set even when both $A$ and $B$ are. The reason is that those elements occurring both in $A$ and in $B$ will necessarily occur twice in $A + B$. However if $A$ and $B$ are disjoint, that is when the intersection of $A$ and $B$ is empty, then $A + B$ is a set and coincides with the union of $A$ and $B$. As this situation is quite important in probability, we will often write $A + B$ to denote the union of $A$ and $B$ when $A$ is disjoint from $B$, and we will then refer to $A + B$ as the **disjoint union** of $A$ and $B$. More generally, a sequence $A_1, A_2, \ldots$ is disjoint if no two have a common element. The union of the sets $A_1, A_2, \ldots$ may be written $A_1 + A_2 + \cdots$.

## 4. The Concept of Probability

Consider once again the election multiset introduced in the last section: $\{a^7, b^2, c^1\}$. What percentage of the votes did each of the candidates receive? An easy calculation reveals that $a$ received 70% of the total, $b$ received 20% and $c$ received only 10%. The process of converting "raw counts" into percentages loses some of the information of the original multiset, since the percentages do not reveal how many votes were cast. However, the percentages do contain all the information relevant to an election. By taking percentages we are replacing the complete information of the number of votes cast for each candidate by the information of what proportion of votes were cast for each candidate relative to the total number of votes cast. The concept of probability is an abstraction derived from this situation. Namely, a probability measure on a set tells one the proportion or size of an element or a subset relative to the size of the set as a whole. We may intuitively think of a probability as an assignment of a non-negative real number to every element of the set in such a way that the sum of all such numbers is 1. The above multiset $\{a^7, b^2, c^1\}$ gives rise to a probability measure which will be denoted in the following manner. For every subset $S$ of $\{a, b, c\}$, we write $P(S)$ for the proportion of the multiset $\{a^7, b^2, c^1\}$ which has elements from $S$. For example, $P(\{a\})$ is 0.7 because 70% of the elements of $\{a^7, b^2, c^1\}$ are $a$'s. Similarly, $P(\{a, b\})$ is 0.9, $P(\{b, c\})$ is 0.3, $P(\{a, b, c\})$ is 1.0 and so on. We call $P$ a probability measure. It is important to realize that $P$ is defined not on elements but on subsets. We do this because we observed that events are subsets of the sample space, and we wish to express the concept of a probability directly in terms of events. As we have seen it is easier to think directly in terms of events rather than in terms of sets of outcomes.

For this reason we henceforth decree that a **probability measure** $P$ on a sample space $\Omega$ is a function which assigns a real number $P(A)$ to every event $A$ of $\Omega$ such that

1. $P(A) \ge 0$
2. $P(\Omega) = 1$
3. If $A_1, A_2, \ldots$ is a sequence of disjoint events, then $P(A_1 + A_2 + \cdots) = P(A_1) + P(A_2) + \cdots$, or more compactly:

$$P\!\left(\bigcup_{i=1}^{\infty} A_i\right) = \sum_{i=1}^{\infty} P(A_i)$$

At first it may not be easy to see that these three conditions capture the concept of "proportion" we described above. The first two conditions however are easy to understand: we do not allow outcomes to occur a negative number of times, and the measure of $\Omega$ itself is 1 because it is the totality of all possible outcomes. It is the third condition that is the most difficult to justify. This condition is called **countable additivity**. When the sequence of events consists of just two events $A$ and $B$, it is obvious. Let $C$ be the union $A \cup B$. Since $A$ and $B$ are assumed to be disjoint, $C$ is the same as $A + B$. Probabilistically this says that $A$ and $B$ are mutually exclusive alternatives for $C$; it occurs if and only if exactly one of $A$ or $B$ occurs. Clearly if this is so then the probability of $C$ is "distributed" between $A$ and $B$, i.e. $P(C) = P(A) + P(B)$. The extension of the rule to an infinite sequence of events is somewhat unintuitive, but one can get used to it when one sees concrete examples.

## 5. Properties of Probability Measures

We now show three important facts about probability measures. These facts relate the concept of probability to the Boolean concepts of subevent, union, intersection and complement.

### Subevents

If $A$ is a subevent of $B$, then $P(A) \le P(B)$. Although this should be intuitively clear, we will prove it from the three conditions for $P$ to be a probability. First observe that $A \subseteq B$ means that $B$ is the disjoint union of $A$ and $B \setminus A$ where $B \setminus A$ denotes $B \cap \overline{A}$.

This should be clear from the Venn diagram, or just think of what it says: every element of $B$ is either in $A$ or it is not and these alternatives are mutually exclusive. Therefore condition (3) implies that

$$P(B) = P(A + B \setminus A) = P(A) + P(B \setminus A)$$

By condition (1), $P(B \setminus A) \ge 0$. Therefore,

$$P(B) = P(A) + P(B \setminus A) \ge P(A).$$

As a consequence we find that since every event $A$ is a subevent of $\Omega$,

$$0 \le P(A) \le P(\Omega) = 1.$$

This corresponds to our intuitive feeling that probability is a measure of likelihood, ranging from extremely unlikely (zero or near zero) to extremely likely (1 or close to 1).

### Union and Intersection

If $A$ and $B$ are two events, then

$$P(A \cup B) = P(A) + P(B) - P(A \cap B)$$

To prove this we first write $A \cup B$ as a disjoint union of atoms. From the Venn diagram it is clear that $A \cup B = (A \cap B) + (A \setminus B) + (B \setminus A)$.

Similarly, we can write $A$ and $B$ as (disjoint) unions of atoms:

$$A = (A \cap B) + (A \setminus B)$$

$$B = (A \cap B) + (B \setminus A)$$

By condition (3),

$$P(A \cup B) = P(A \cap B) + P(A \setminus B) + P(B \setminus A)$$

$$P(A) = P(A \cap B) + P(A \setminus B)$$

$$P(B) = P(A \cap B) + P(B \setminus A)$$

Now solve for $P(A \setminus B)$ and $P(B \setminus A)$ in the last two expressions and substitute these into the first. This gives the announced formula. The usefulness of this formula is that it applies even when $A$ and $B$ are not disjoint.

Here is a concrete example. Suppose that we have two coins. Let $A$ be the event that the first shows heads, and let $a = P(A)$ be the probability of this. Similarly let $B$ be the event that the second shows heads, and let $b = P(B)$. What is the probability that when we toss both of them at least one shows heads? Clearly we want $P(A \cup B)$. By the above formula, we find that

$$P(A \cup B) = P(A) + P(B) - P(A \cap B) = a + b - P(A \cap B)$$

However, we do not yet know how to compute $P(A \cap B)$ in terms of $P(A)$ and $P(B)$. We will return to this problem in the next section.

### Complement

If $A$ is an event, then $P(A^c) = 1 - P(A)$. To see this simply note that $\Omega$ is the disjoint union of $A$ and $A^c$. By conditions (2) and (3), we have $1 = P(\Omega) = P(A + A^c) = P(A) + P(A^c)$. Thus we see that the probability for an event not to occur is "complementary" to the probability for its occurrence. For example, if the probability of getting heads when we toss a coin is $p$, then the probability of getting tails is $q = 1 - p$.

## 6. Independent Events

The notion of independence is an intuitive one derived from experience; two events are independent if they have no effect on one another. More precisely if we have two independent events $A$ and $B$, then knowing $A$ has occurred does not change the probability for $B$ to occur and vice versa. When we have the notion of conditional probability we can make this statement completely rigorous. Nevertheless even with the terminology we have so far, the concept of independence is easy to express. We say two events $A$ and $B$ are **independent** when

$$P(A \cap B) = P(A) P(B).$$

If we use multiset notation, writing $AB$ for $A \cap B$, then this rule is very suggestive: $P(AB) = P(A)P(B)$. It is important to realize that only independent events satisfy this rule just as only disjoint events satisfy additivity: $P(A + B) = P(A) + P(B)$.

Consider the case of coin tossing. The individual tosses of the coin are independent; the coin is the same coin after each toss and has no memory of having been tossed before. As a result, the probability of getting two heads in two tosses is the square of the probability of getting one head on one toss.

As an application consider the two-coin toss problem in the last section. Since we are tossing two different coins, it seems reasonable to expect $A$ and $B$ to be independent. Therefore,

$$P(A \cap B) = P(A)P(B) = ab.$$

Thus

$$P(A \cup B) = P(A) + P(B) - P(A \cap B) = a + b - ab.$$

We conclude that the probability for one of the coins to show heads is $a + b - ab$.

For any three events $A$, $B$ and $C$, we say these events are **independent** when:

1. any pair of the three are independent,
2. $P(A \cap B \cap C) = P(A) P(B) P(C)$.

It is possible for three events to satisfy (1) but not (2). This is an important point that is easily missed. Consider again the two-coin toss problem above. Let $C$ be the event that the two coins show different faces (one heads, the other tails). Then $A$, $B$ and $C$ are pairwise independent. For example, knowing that the first coin shows heads tells one nothing about whether the others will be the same or different. However the three events are not independent; the occurrence of any two of them precludes the third from occurring.

Similarly given any number of events (even an infinite number), we say that they are **independent** when

$$P(A_{i_1} \cap A_{i_2} \cap A_{i_3} \cap \cdots \cap A_{i_n}) = P(A_{i_1}) P(A_{i_2}) \cdots P(A_{i_n})$$

for any finite subcollection $A_{i_1}, A_{i_2}, \ldots, A_{i_n}$ of the events.

## 7. The Bernoulli Process

The **Bernoulli Process** is the process of tossing a biased coin repeatedly. In a given toss we suppose that the probability is $p$ for heads and $q$ for tails, where $p + q = 1$. Generally speaking we will also be implicitly assuming that both $p$ and $q$ are nonzero, but other than this we shall make no restriction on what value $p$ could have. We call $p$ the **bias** of the coin. A fair coin is a special kind of biased coin; namely, one with bias $p = 1/2$.

We want to assign a probability to every elementary event and show how this allows us to compute the probability of every other event. This will be done in two steps.

**Step 1.** $P(H_n) = p$ and $P(T_n) = P(H_n^c) = q = 1 - p$. This assignment is made irrespective of $n$. In effect we assume that we are using the same coin (or at least have the same bias) during each toss.

We have now defined the probability of the elementary events. But we still cannot determine the probability of an arbitrary event because none of the three conditions of probability measures determine what, for example, $P(H_1 \cap H_2)$ can be, although they limit the possible choices. This leads us to our second assumption.

**Step 2.** $P(H_1^{i_1} \cap H_2^{i_2} \cap \cdots \cap H_n^{i_n}) = P(H_1^{i_1}) P(H_2^{i_2}) \cdots P(H_n^{i_n})$, where $i_1, i_2, \ldots, i_n$ take on all possible choices of $+1$. Here we have drawn from the physical nature of the phenomenon of tossing a coin.

But the question of whether tosses of a real coin are independent is another matter entirely: the question of the validity of the model as a means of describing the actual physical experiment. We will not consider this question until Chapter IV. From now on we simply decree that in our abstract model, the events $H_n$ are independent.

For any other event $A$ of the Bernoulli process, the probability is calculated by expanding $A$ in terms of the elementary events (possibly using countable unions) and by using conditions (1), (2) and (3). It is not always obvious what the best way to do this might be. There is an "art" to this part of the subject, and developing one's skill in this art is the whole idea of learning probability.

Let us return to the event "a run of HH occurs before a run of TT." Recall that this event can be expanded as a disjoint union:

$$A = (H_1 \cap H_2) + (T_1 \cap H_2 \cap H_3) + (H_1 \cap T_2 \cap H_3 \cap H_4) + \cdots$$

By countable additivity, we compute:

$$P(A) = P(H_1 \cap H_2) + P(T_1 \cap H_2 \cap H_3) + P(H_1 \cap T_2 \cap H_3 \cap H_4) + \cdots$$

$$= P(H_1)P(H_2) + P(T_1)P(H_2)P(H_3) + P(H_1)P(T_2)P(H_3)P(H_4) + \cdots$$

$$= p^2 + qp^2 + pqp^2 + qpqp^2 + \cdots$$

$$= p^2 + pqp^2 + \cdots + qp^2 + qpqp^2 + \cdots$$

$$= p^2(1 + pq + (pq)^2 + \cdots) + qp^2(1 + pq + (pq)^2 + \cdots)$$

$$= \frac{p^2}{1 - pq} + \frac{qp^2}{1 - pq}$$

$$= \frac{p^2(1 + q)}{1 - pq}$$

We are assuming here that we know how to sum a geometric series:

$$1 + r + r^2 + r^3 + \cdots = \frac{1}{1 - r}, \quad \text{if } |r| < 1$$

We can check our computation of $P(A)$ by a simple expedient; suppose that the coin is fair, i.e. $p = q = 1/2$. In this case $P(A) = 1/2$, for either HH occurs before TT or TT occurs before HH, and since the coin is fair either one of these is equally likely. And indeed setting $p = q = 1/2$ in our formula above shows that this is the case.

> **Summary: Probability Measures**
>
> A **probability measure** is a function $P$ on events such that:
> 1. For every event $A$, $P(A) \ge 0$
> 2. $P(\Omega) = 1$
> 3. If $A_1, A_2, \ldots$ is a sequence of disjoint events, then $P(A_1 + A_2 + \cdots) = P(A_1) + P(A_2) + \cdots$
>
> **Properties of probability measures:**
> 1. If $A$ and $B$ are disjoint events, then $P(A + B) = P(A) + P(B)$
> 2. If $A$ and $B$ are independent, then $P(AB) = P(A)P(B)$
> 3. If $A$ is a subevent of $B$, then $P(A) \le P(B)$
> 4. If $A$ and $B$ are any two events, then $P(A \cup B) = P(A) + P(B) - P(A \cap B)$
> 5. If $A$ is any event, then $P(A^c) = 1 - P(A)$

## 8. The Five Basic Stochastic Processes

The Bernoulli process is an example of a **stochastic process**. By this we mean a process that proceeds randomly in time. This is not meant to be a precise definition so much as a description. The word "stochastic," coming from the Greek *stocos* meaning "conjecture" or "guess," has since become almost synonymous with the word "random;" it is nevertheless suggestive of the origins of probability theory.

One of the amazing features of probability is that there are really only five fundamental stochastic processes from which all others are merely "perturbations." A detailed understanding of these five processes is therefore essential if one is to understand probability, and we have made the study of these processes one of the main themes of this book. Whenever we introduce a new concept, we immediately illustrate it within the contexts of the basic processes. So for the rest of this chapter we will introduce these stochastic processes.

### The Bernoulli Process

We have already defined this process in the preceding section, but we only discussed it as the process of tossing a coin. In fact there is another way to visualize this process: as the process of randomly walking on a line. Although the Coin Tossing process and the Random Walk process are mathematically the same, they refer to quite different kinds of phenomena.

In the Random Walk process, we have a particle on a line, initially at the zero point, that moves left or right one unit during each unit of time. The direction of movement is determined by a toss of a coin: heads = right, tails = left. The sample space is the set of all possible paths followed by the particle. It should be clear that these correspond precisely with the sample points in the Bernoulli sample space. It may not seem that we have learned anything really new by reinterpreting the Bernoulli sample space this way. However, there are many phenomena that are quite naturally modelled with this process. Consider a gambler who is betting one-dollar bets on black or red on a roulette wheel. His net winnings (possibly negative) form a random walk in time. The probability that he goes bankrupt before winning a certain desired amount of money is called the **ruin problem** and will be considered in Chapter VIII.

We will usually use the following method for picturing a random walk. For a given sequence HTTHHTHHHH... of the Bernoulli process, we draw the graph of the function $f(t)$ whose value at a non-negative integer is the excess of the number of heads over the number of tails in the first $n$ tosses. For other values of $t$ we fill in straight lines to form a continuous broken path.

Incidentally, higher dimensional random walks can be modelled by using several independent random walks (one for each coordinate direction).

### The Finite Sampling Process

This is the process of sampling individuals randomly from a finite population. Like the Bernoulli process it has numerous equivalent models, and we list some of these in the next chapter. The description of the sample space, events and probability for this process are all quite simple, deceptively so. The sample space $\Omega$ consists of all possible ways to make the sample. For once the words "sample space" and "sample point" are appropriate. The events are all subsets of $\Omega$, and the probability simply assigns the same number to every sample point.

However, as we will see in the exercises, the computations for events of the finite sampling processes rapidly become too difficult even for computers. As a result, we will often approximate a finite sampling situation by a model constructed from one of the other processes. Moreover, we will discover that such models are frequently better models of the phenomena than the original finite sampling model. One reason for this is that the assumptions that underlie the finite sampling process are difficult to ensure in practice.

### The Uniform Process

This is the process of "dropping (or picking) points at random in the interval $[0, a]$." Unlike the Bernoulli process, where infinitely many coin tosses occur, we shall only drop a fixed finite number, $n$, of points in the Uniform process. The Uniform process will give us a framework for expressing questions of the following kind. Are two points close? Are two points far apart? What is the probability that no points are in a given interval? Or perhaps we could color the points different colors and ask whether two green points are next to each other or whether any two red points are separated by a yellow point.

Choosing $n$ points is the same as choosing a list of $n$ real numbers $(x_1, x_2, \ldots, x_n)$ all in $[0, a]$. The Uniform sample space is

$$\Omega = \{(x_1, x_2, \ldots, x_n) : 0 \le x_i \le a\},$$

a space more commonly called the $n$-dimensional cube of side $a$. Choosing a sample point of $\Omega$ is equivalent to dropping $n$ points on $[0, a]$.

The events of $\Omega$ are all the subsets that have a volume. Not all subsets of $\Omega$ have a volume, but we will not concern ourselves with the mathematical details of this, which are irrelevant for us.

### The Poisson Process

This process is one of the great contributions of probability to nature; here nature imitates probability theory. Physically a sample point of this process consists of a sequence of incidents that occur rarely at discrete, instantaneous time. For example, if one has a Geiger counter near a radioactive substance, the clicks occur instantaneously and rarely. Although this is easily the most common and most important stochastic process, it is also the least intuitive. One should expect that it will take some time to develop a good intuition for this process.

We now proceed to make all this precise. We define a **rare sequence** (somewhat confusingly this is also called a rare event) to be any set of points in $[0, \infty)$ with the property that every interval of finite length contains a finite number of points. Equivalently, a rare sequence is a set of points in $[0, \infty)$ that doesn't cluster. We will call the points of a rare sequence the **incidents** or **blips** of the rare sequence. The Poisson sample space $\Omega$ is the set of all rare sequences. In some ways this is analogous to the Bernoulli sample space. Think of the Bernoulli sample space as the set of all sequences of zeros and ones. The Poisson sample space may be regarded as the set of continuous sequences of zeros and ones. The ones correspond to the incidents of the rare sequence, while all other times have zeros. In effect a rare sequence is a "sea" of zeros with occasional ones interspersed.

The elementary events of the Poisson process are rather complicated. They are not the subsets of $\Omega$ whose elements have an incident at a given time, in naive analogy with the Bernoulli process. Indeed it should be intuitively obvious that any such subset of $\Omega$ has probability zero of happening. The elementary Poisson events are:

$$\binom{a,b}{k} = \text{"the set of all rare sequences having } k \text{ incidents in the interval } [a, b)\text{."}$$

We combine these elementary Poisson events by unions, intersections and complements, much as in the Bernoulli process, to get arbitrary Poisson events. Elementary Poisson events sometimes also go by the name of **cylinder sets**.

We pause for a moment to make the notation a bit clearer. A rare sequence is not in itself a Poisson event. A Poisson event is a certain kind of set of rare sequences. Since a rare sequence, in turn, is a set of points (the blips), a Poisson event is a set of sets. We shall come back to this conceptual difficulty again and again so don't worry if it is not yet perfectly clear.

### The Wiener Process

The last and most difficult of the five basic stochastic processes, the **Wiener process**, is the continuous analog of the random walk interpretation of the Bernoulli process. The concept of a continuous random walk, unlike the discrete case, is not very easily made rigorous, and the history of this process includes a botanist and a physicist as well as mathematicians. The first observation of the Wiener Process in nature was made by the botanist Robert Brown in 1827, who observed the motion of pollen grains in a solution. Because of his work this process is also referred to as **Brownian motion**. The development of a rigorous theory of Brownian motion was begun by Einstein and Smoluchowski in 1906 and completed by Wiener in 1923.

The Wiener sample space $\Omega$ is the set of all continuous functions $f(t)$ defined for $t \ge 0$ and for which $f(0) = 0$. The value $f(t)$ is the position of the particle on the line at time $t$, and we assume that the particle is initially at the origin. As in the random walk model of the Bernoulli process, we usually picture $f(t)$ by drawing its graph.

Drawing a truly typical Wiener sample point is not easy. For example, Wiener showed that with probability 1, a continuous random walk is nowhere differentiable. One is accustomed to thinking of differentiability as being the rule among continuous functions, with occasional non-differentiable functions being exceptional oddities. We now find that in the context of the Wiener sample space the reverse is true; it is the differentiable functions that are the oddities.

---

# Exercises for Chapter II

## The Algebra of Sets and Multisets

**1.** If $A$ and $B$ are sets, the **stroke** of $A$ by $B$, written $A \setminus B$, stands for $A \cap \overline{B}$, i.e. those elements of $A$ that are not in $B$. As an event $A \setminus B$ stands for "$A$ occurs but $B$ does not." Show that the operations of union, intersection and complement can all be expressed using only the stroke operation.

**2.** The **symmetric difference** of $A$ and $B$, written $A \triangle B$, is defined by $A \triangle B = (A \setminus B) \cup (B \setminus A)$. As an event $A \triangle B$ means "either $A$ occurs or $B$ occurs but not both." For this reason this operation is also called the "exclusive or." Use a Venn diagram to illustrate this operation.

**3.** The set of elements where $A$ implies $B$, denoted $A / B$, is the set $A / B = \overline{A} \cup B$. As an event $A / B$ stands for "if $A$ occurs then $B$ does also." Use a Venn diagram to illustrate this operation.

**4.** Using Venn diagrams, prove the following:

(a) $(A / B) \cap (B / C) \subseteq A / C$, i.e. if $A$ implies $B$ and $B$ implies $C$, then $A$ implies $C$.

(b) $(A / B) \cap (A / C) = A / (BC)$, i.e. $A$ implies $B$ and $A$ implies $C$ if and only if $A$ implies $B$ and $C$.

(c) $(A / B) \cap (B / A) = A \triangle B$.

**5.** Show that for any four sets $A$, $B$, $C$, and $D$, the following is true: $(A \cup B) \setminus (C \cup D) \subseteq (A \setminus C) \cup (B \setminus D)$.

**6.** Prove that any Boolean (logical) expression in $A_1, A_2, \ldots, A_n$ is a union of atoms. In what sense is this union unique?

**7.** Let $B$ be a multiset. We say that $A$ is a sub-multiset of $B$ if every element of $A$ occurs at least as many times in $B$ as it does in $A$. For example, $\{a, a, b\}$ is a sub-multiset of $\{a, a, b, b, c\}$ but not of $\{a, b, b\}$. When $A$ is a sub-multiset of $B$, it makes sense to speak of the difference of $A$ and $B$, written $B - A$; namely define $B - A$ to be the unique multiset such that $A + (B - A) = B$. For example, $\{a, a, b, b, c\} - \{a, a, b\} = \{b, c\}$. Suppose henceforth that $A$ and $B$ are sets. When does $B - A$ coincide with $B \setminus A$? Prove that $A \cup B = A + B - AB$. Compare this with property (4) in section 7.

## The Bernoulli Sample Space

**8.** Give an explicit expression for the event "a run of three heads occurs before a run of two tails" in terms of elementary Bernoulli events. Suggest how this might be extended to "a run of $k$ heads occurs before a run of $n$ tails."

## The Concept of Probability

**9.** In a certain town there are exactly 1000 families that have exactly three children. Records show that 11.9% have 3 boys, 36.9% have 2 boys, 38.1% have 2 girls and 13.1% have 3 girls. Use a multiset to describe this situation. Give an interpretation in terms of probability. What is the probability that in one of the above families all the children have the same gender?

**10.** In a factory there are 100 workers. Of the total, 65 are male, 77 are married and 50 are both married and male. How many workers are female? What fraction of the female workers are married?

**11.** Express $P(A \cup B \cup C)$ in terms of $P(A)$, $P(B)$, $P(C)$, $P(A \cap B)$, $P(A \cap C)$, $P(B \cap C)$ and $P(A \cap B \cap C)$. Note the similarity of this expression with that of property (4) of section 7.

**12.** Let $D_1$ be the event "exactly one of the events $A$, $B$ and $C$ occurs." Express $P(D_1)$ in terms of $P(A)$, $P(B)$, $P(C)$, $P(A \cap B)$, $P(A \cap C)$, $P(B \cap C)$ and $P(A \cap B \cap C)$.

**13.\*** Condition (3) for a probability measure can be stated in several other ways. Prove that condition (3) implies each of (a) and (b) below and that either of these imply condition (3).

(a) If $A_1 \subseteq A_2 \subseteq A_3 \subseteq \cdots$ is an ascending sequence of events and if $A = A_1 \cup A_2 \cup A_3 \cup \cdots$, then $P(A) = \lim_{n \to \infty} P(A_n)$.

(b) If $A_1 \supseteq A_2 \supseteq A_3 \supseteq \cdots$ is a descending sequence of events and if $A = A_1 \cap A_2 \cap A_3 \cap \cdots$, then $P(A) = \lim_{n \to \infty} P(A_n)$.

## Independent Events

**14.** If $A$ and $B$ form a pair of independent events, show that the pair $A$, $B^c$, the pair $A^c$, $B$ and the pair $A^c$, $B^c$ are each a pair of independent events.

**15.** In exercise 10, are the properties of being male and of being female independent? Is the property of being male independent of being married?

**16.** The probability of throwing a "6" with a single die is $1/6$. If three dice are thrown independently, what is the probability that exactly one shows a "6"? Use exercise 12.

**17.** A student applies for two national scholarships. The probability that he is awarded the first is $1/2$, while the probability for the second is only $1/4$, but the probability that he gets both is $1/6$. Are the events that he gets the scholarships independent of one another? Discuss what this means.

**18.** A baseball player has a 0.280 batting average. What is the probability that he gets exactly one hit in the next three times at bat? See exercise 16. To do this exercise one must assume that the player's times at bat are independent. Is this a reasonable assumption?

**19.** Three pigeons have been trained to peck at one of two buttons in response to a visual stimulus and do so correctly with probability $p$. The three pigeons are given the same stimulus. What is the probability that the majority peck at the correct button? Suppose that one of the pigeons sustains an injury and subsequently pecks at one or the other button with equal probability. Which is more likely to be the correct response, the button pecked by one of the normal uninjured pigeons or the button pecked by a majority of the three pigeons?

**20.** How many times must one roll a die in order to have a 99% chance of rolling a "6"? [Answer: 26 times.] If you rolled a die this many times and it never showed a "6", what would you think?

## The Bernoulli Process

**21.** A dice game commonly played in gambling houses is Craps. In this game two dice are repeatedly rolled by a player, called the "shooter," until either a win or a loss occurs. It is theoretically possible for the play to continue for any given number of rolls before the shooter either wins or loses. Computing the probability of a win requires the full use of condition (3). Because of the complexity of this game, we will consider here a simplified version. The probability of rolling a "4" using two (fair) dice is $1/12$, and the probability of rolling a "7" is $1/6$. What is the probability of rolling a "4" before rolling a "7"? This probability appears as part of a later calculation.

**22.** (Prendergast) Two technicians are discussing the relative merits of two rockets. One rocket has two engines, the other four. The engines used are all identical. To ensure success the engines are somewhat redundant: the rocket will achieve its mission even if half the engines fail. The first technician argues that the four-engine rocket ought to be the better one. The second technician then says, "Although I cannot reveal the failure probability of an engine because it is classified top secret, I can assure you that either rocket is as likely to succeed as the other." The first technician replies, "Thank you. What you just told me allows me to compute the failure probability both for an engine and for a rocket." Can you do this computation also?

**23.\*** Let $A$ be the event in the Bernoulli process that the coin forever alternates between heads and tails. This event consists of just two possible sample points: $A = \{HTHTH\ldots, THTHT\ldots\}$. Using exercise 13, prove that $P(A) = 0$. Does this mean that $A$ is impossible? More generally if an event $B$ in the Bernoulli process consists of only a finite number of sample points, then $P(B) = 0$.

---

# Answers to Selected Exercises

**1.** Let $A \setminus B$ stand for $A \cap \overline{B}$. Then:

(a) $\overline{A} = \Omega \setminus A$

(b) $A \cap B = A \setminus (\Omega \setminus B)$

(c) $A \cup B = (\overline{A} \cap \overline{B})^c = \Omega \setminus ((\Omega \setminus A) \setminus B)$

**5.**

$$(A \cup B) \setminus (C \cup D) = (A \cup B) \cap \overline{(C \cup D)} = (A \cup B) \cap (\overline{C} \cap \overline{D}) = (A \cup B) \cap \overline{C} \cap \overline{D}$$

$$= (A \cap \overline{C} \cap \overline{D}) \cup (B \cap \overline{C} \cap \overline{D}) \subseteq (A \cap \overline{C}) \cup (B \cap \overline{D}) = (A \setminus C) \cup (B \setminus D)$$

**6.** There are many ways to see this intuitively. Here is what a formal proof would look like.

**Fact:** Every Boolean expression in $A_1, A_2, \ldots, A_n$ is a union of atoms.

**Proof:**

*Step 0:* The sets $A_m$ are unions of atoms:

$$A_m = \bigcup A_1^{i_1} \cap A_2^{i_2} \cap \cdots \cap A_n^{i_n}$$

where the $i_1, i_2, \ldots, i_n$ take on all possible values of $\pm 1$ except for $i_m$ which is always $+1$.

*Step 1:* If $E_1$ and $E_2$ can be expressed as unions of atoms, then $E_1 \cup E_2$ can also. This is obvious.

*Step 2:* If $E$ is a union of atoms, then $E^c$ is also. This is true because $E^c$ is the union of all atoms not in the expression for $E$.

*Step 3:* If $E_1$ and $E_2$ are unions of atoms, then $E_1 \cap E_2$ is also. To prove this use steps 1 and 2 and DeMorgan's law: $E_1 \cap E_2 = (\overline{E_1} \cup \overline{E_2})^c$.

Now using steps 0--3 every Boolean expression in $A_1, A_2, \ldots, A_n$ can be expressed as a union of atoms. It need not be unique, however. Some of the atoms could be empty. Such atoms can always be either included or excluded.

**8.** Express $A$ = "a run HHH occurs before a run TT." Let $A_i$ be the event "a run HH occurs at the $i^{\text{th}}$ toss and no run HHH or TT has yet occurred."

$$A_1 = \emptyset, \quad A_2 = \emptyset$$

$$A_3 = H_1 \cap H_2 \cap H_3$$

$$A_4 = T_1 \cap H_2 \cap H_3 \cap H_4$$

$$A_5 = H_1 \cap T_2 \cap H_3 \cap H_4 \cap H_5$$

$$A_6 = (T_1 \cap H_2 \cap T_3 \cap H_4 \cap H_5 \cap H_6) \cup (H_1 \cap T_2 \cap H_3 \cap T_4 \cap H_5 \cap H_6), \quad \text{etc.}$$

In general let $B_i$ be the event "the $i^{\text{th}}$ toss was tails and no runs HHH or TT have occurred up to the $i^{\text{th}}$ toss." Then we have the inductive formula for $B_i$ for $i > 3$:

$$B_i = B_{i-3} \cap H_{i-2} \cap H_{i-1} \cap T_i \cup B_{i-2} \cap H_{i-1} \cap T_i$$

Furthermore, for $i > 3$ we have:

$$A_i = B_{i-3} \cap H_{i-2} \cap H_{i-1} \cap H_i$$

The event $A$ is then the disjoint union of the $A_i$'s. A similar approach can be used for the event "a run of $k$ heads occurs before a run of $n$ tails," but two auxiliary sequences of events are needed.

**11.** $P(A \cup B \cup C) = P(A) + P(B) + P(C) - P(A \cap B) - P(A \cap C) - P(B \cap C) + P(A \cap B \cap C)$. This is easily proved by splitting everything into atoms.

**12.** Again split everything into atoms. One then finds that

$$P(D_1) = P(A) + P(B) + P(C) - 2P(A \cap B) - 2P(A \cap C) - 2P(B \cap C) + 3P(A \cap B \cap C).$$

**13.** (a) Let $A_1 \subseteq A_2 \subseteq \cdots$ be an ascending sequence of events.

If we define a sequence of events $B_1 = A_1, B_2 = A_2 \setminus A_1, \ldots, B_n = A_n \setminus A_{n-1}, \ldots$, then each $B_n$ is a "ring" in the Venn diagram.

Therefore, $A_n = B_1 \cup B_2 \cup \cdots \cup B_n$ is a disjoint union of events. By condition (3),

$P(A_n) = P(B_1) + P(B_2) + \cdots + P(B_n)$. Similarly, $A$ is the disjoint union $B_1 \cup B_2 \cup B_3 \cup \cdots$ of all the $B_n$'s. By condition (3) again $P(A) = P(B_1) + P(B_2) + P(B_3) + \cdots$. By definition, such an infinite series converges if and only if its sequence of partial sums $P(B_1), P(B_1) + P(B_2), P(B_1) + P(B_2) + P(B_3), \ldots$ converges:

$$P(A) = \lim_{n \to \infty} (P(B_1) + P(B_2) + \cdots + P(B_n)) = \lim_{n \to \infty} P(A_n).$$

It is easy to see how to reverse the above argument.

**13.** (b) This follows from (a) by a trick. Let $A_1 \supseteq A_2 \supseteq \cdots$ be a descending sequence of events, and let $A = A_1 \cap A_2 \cap \cdots$. Then $A_1^c \subseteq A_2^c \subseteq \cdots$ is ascending and $A^c = A_1^c \cup A_2^c \cup \cdots$ by DeMorgan's law. Now $P(A^c) = \lim_{n \to \infty} P(A_n^c)$ if and only if $1 - P(A) = \lim_{n \to \infty} (1 - P(A_n))$ if and only if $P(A) = \lim_{n \to \infty} P(A_n)$. The last limit is one covered by (a) above.

**14.** $A$ and $B$ are independent means $P(A \cap B) = P(A) \cdot P(B)$. Now $P(A) = P(A \cap B) + P(A \cap B^c)$ by additivity so

$$P(A \cap B^c) = P(A) - P(A \cap B) = P(A) - P(A)P(B) = P(A)(1 - P(B)) = P(A) \cdot P(B^c).$$

Interchanging the roles of $A$ and $B$, $P(A^c \cap B) = P(A^c)P(B)$. Replacing $A$ by $A^c$ and using the independence of $A^c$ and $B$, we conclude, as above, that $P(A^c \cap B^c) = P(A^c)P(B^c)$.

**16.** Let $A$, $B$, $C$ be the events that the first, second and third die shows "6."

$$P(A) = P(B) = P(C) = \tfrac{1}{6}$$

$$P(A \cap B) = P(A \cap C) = P(B \cap C) = \tfrac{1}{36} \quad \text{and} \quad P(A \cap B \cap C) = \tfrac{1}{216}.$$

Thus $P(D_1) = \frac{3}{6} - \frac{2}{36} - \frac{2}{36} - \frac{2}{36} + \frac{3}{216} = \frac{75}{216}$.

**21.** Let $A$ be the event "a '4' appears before a '7' appears." Let $A_i$ be the event "the first time that either a '4' or a '7' appears is the $i^{\text{th}}$ roll and at the $i^{\text{th}}$ roll a '4' appears."

The probability of rolling neither a "4" nor a "7" is $1 - \frac{1}{12} - \frac{1}{6} = \frac{3}{4}$. So $P(A_i) = \left(\frac{3}{4}\right)^{i-1} \cdot \frac{1}{12}$.

Now $A$ is the disjoint union of the $A_i$'s. Therefore

$$P(A) = \sum_{i=1}^{\infty} \left(\frac{3}{4}\right)^{i-1} \cdot \frac{1}{12} = \frac{1/12}{1 - 3/4} = \frac{1}{3}.$$

**23.** Let $A_1 = H_1 \cap T_2$, $A_2 = H_1 \cap T_2 \cap H_3 \cap T_4, \ldots$. Then by 13(b) above $P(\{HTHTHT\ldots\}) = P(H_1 \cap T_2 \cap H_3 \cap T_4 \cap \cdots)$ is the limit as $n$ approaches $\infty$ of $P(A_n)$. Clearly $P(A_n) = (pq)^n$. Since $0 < pq < \frac{1}{4}$, $(pq)^n$ approaches 0 as $n$ approaches infinity. Similarly, $P(\{THTHTH\ldots\}) = 0$. Thus if $A = \{HTHTHT\ldots, THTHTH\ldots\}$, then $P(A) = 0$. Note that this does not mean that $A$ is impossible. It only means that it is extremely unlikely.
