---
title: "Chapter IX: Markov Chains"
author: "Gian-Carlo Rota"
edition: "1992"
chapter_number: 9
source: "Introduction to Probability and Random Processes, MIT"
pages: "376–419"
---

# Chapter IX: Markov Chains

All the processes we have considered so far have been based on sequences of independent equidistributed random variables. We now consider processes which are based on sequences of dependent random variables but for which the dependence is of the simplest possible kind: the future depends on the present but not on the past.

## 1. The Markov Property

Let $X_0, X_1, X_2, \ldots$ be a sequence of integer random variables. We think of the values of the $X_i$'s as being the states of the Markov chain. Thus if $(X_n = i)$, we say the process is in state $i$ at time $n$. Moreover, if $(X_n = i)$ and $(X_{n+1} = j)$, then we say there was a transition from state $i$ to state $j$ at time $n$.

**Definition.** A sequence $X_0, X_1, \ldots$ of integer random variables forms a **Markov chain** if for any integers $i_0, i_1, \ldots, i_n$,

$$P(X_n = i_n \mid (X_0 = i_0) \cap (X_1 = i_1) \cap \cdots \cap (X_{n-1} = i_{n-1})) = P(X_n = i_n \mid X_{n-1} = i_{n-1}).$$

In other words, the future states of the Markov chain are dependent only on the present state and not on how the Markov chain reached the present state. We call this condition the **Markov property**.

The conditional probability

$$p_{ij}^{(n)} = P(X_{n+1} = j \mid X_n = i)$$

is called the **transition probability** from state $i$ to state $j$ at time $n$. By the law of alternatives, the probability distribution of $X_{n+1}$ is determined by the transition probabilities and the probability distribution of $X_n$:

$$P(X_{n+1} = j) = \sum_i P(X_{n+1} = j \mid X_n = i) P(X_n = i)$$

$$= \sum_i p_{ij}^{(n)} P(X_n = i).$$

As a result we see that all the probability distributions of the $X_n$'s as well as all their joint distributions are determined by the distribution of $X_0$ and the transition probabilities.

We have seen several examples of Markov chains already. The Bernoulli process is a Markov chain having two states: heads and tails, or 1 and 0. In this case the transition probabilities are given by

$$p_{00}^{(n)} = q, \quad p_{01}^{(n)} = p$$

$$p_{10}^{(n)} = q, \quad p_{11}^{(n)} = p$$

(the probability distribution of $X_0$ can be anything). Another example is the sequential sampling process. Here the state is the number of red balls in the urn. For if we know the number of red balls in the urn as well as the number of balls chosen so far (i.e. the time), we can compute how many black balls are in the urn.

The sequential sampling process has the property that the transition probabilities depend not only on the states $i$ and $j$ but also on $n$, the number of balls chosen so far. In such a case our process is continually changing or inhomogeneous. In this chapter we will only study Markov chains such that the transition probabilities are independent of time.

**Definition.** A Markov chain $X_0, X_1, \ldots$ is said to be **homogeneous** if the transition probabilities

$$p_{ij} = P(X_{n+1} = j \mid X_n = i)$$

do not depend on $n$.

Many apparently inhomogeneous Markov chains can be reinterpreted as homogeneous Markov chains, so that this concept is not as special as it may at first appear. For example, if we define a "state" of the sequential sampling process to be the pair of numbers (# of red balls, # of black balls), then the sequential sampling process is a homogeneous Markov chain.

When we write the transition probabilities $p_{ij}$ as a matrix we get a matrix $M$ called the **transition probability matrix** of the Markov chain.

$$M = \begin{pmatrix} p_{00} & p_{01} & \cdots \\ p_{10} & p_{11} & \cdots \\ \vdots & \vdots & \ddots \end{pmatrix}$$

The rows represent the starting states and the columns represent the ending states, during each unit of time. The transition probability matrix determines the Markov chain except for the probability distribution of $X_0$. The entries of the matrix must be between 0 and 1, and the sum of the entries of each row is 1. On the other hand, we can say nothing about the columns.

**Definition.** A row vector (with possibly infinitely many coefficients) is said to be a **stochastic vector** if all entries are between 0 and 1 and the sum of all coefficients is 1. A square matrix (with possibly infinitely many rows) is called a **stochastic matrix** if its rows are all stochastic vectors.

The term "stochastic vector" is simply another way of looking at the probability distribution of an integer random variable. We see that distributions and Markov chains give rise to a new way of looking at vectors and matrices. A pair consisting of a stochastic matrix $M$ and a stochastic vector $u_0$ determines a unique Markov chain such that $u_0$ is the row vector corresponding to the distribution of $X_0$ and $M$ is the transition probability matrix.

We call the distribution of $X_0$ the **initial distribution** of the Markov chain. As we have already remarked, the distributions of $X_1, X_2, X_3, \ldots$ are determined successively by the formula

$$P(X_{n+1} = j) = \sum_i p_{ij} P(X_n = i).$$

In terms of matrices, this says that if $u_n$ is the stochastic vector corresponding to the distribution of $X_n$, then

$$u_{n+1} = u_n \cdot M$$

is the stochastic vector corresponding to $X_{n+1}$, where $u_n \cdot M$ is the product of the matrices $u_n$ and $M$. In other words, the transition from time $n$ to time $n+1$ in a Markov chain corresponds to matrix multiplication. More generally, we can iterate the above formula to get

$$u_n = u_0 \cdot M^n,$$

showing explicitly how the distributions of the $X_n$'s depend on $u_0$ and $M$.

### The Bernoulli Process

The Bernoulli process, as the process of tossing a coin, is a Markov chain whose transition matrix is

$$M = \begin{pmatrix} q & p \\ q & p \end{pmatrix}.$$

Notice that $M^n = M$ for all $n$ and that $u_0 M^n = [q, p]$ no matter what the initial distribution is.

On the other hand if we use the random walk interpretation of the Bernoulli process, we get a very different Markov chain. In this case the states are the integers, both positive and negative. The state represents the position of the random walk at the given time.

The transition probabilities are:

$$p_{ij} = \begin{cases} p & \text{if } j = i+1 \text{ (move right)} \\ q & \text{if } j = i-1 \text{ (move left)} \\ 0 & \text{all other cases} \end{cases}$$

The matrix of this Markov chain is an infinite matrix part of which looks like this:

$$M = \begin{pmatrix} \ddots & & & & & \\ & 0 & p & 0 & 0 & 0 & 0 \\ & q & 0 & p & 0 & 0 & 0 \\ & 0 & q & 0 & p & 0 & 0 \\ & 0 & 0 & q & 0 & p & 0 \\ & 0 & 0 & 0 & q & 0 & p \\ & & & & & & \ddots \end{pmatrix}$$

Unlike the coin tossing manifestation of the Bernoulli process, the powers $M^n$ of this transition matrix are progressively more complicated. Moreover, the long-term behavior of this Markov chain does depend on the initial distribution $X_0$. Typically $X_0$ will take some value $i$ with probability 1, in which case we say that $i$ is the **starting point** of the random walk. If we start at $i = 0$, the successive distributions $X_0, X_1, X_2, \ldots$ of this Markov chain are:

$$X_0: \quad u_0 = [\ldots, 0, 0, 1, 0, 0, \ldots]$$

$$X_1: \quad u_1 = [\ldots, 0, q, 0, p, 0, \ldots]$$

$$X_2: \quad u_2 = [\ldots, q^2, 0, 2pq, 0, p^2, \ldots]$$

When $p = q = 1/2$ we say the random walk is **symmetric**. In this case the transition matrix $M$ is symmetric.

As we have already remarked, the random walk model and the coin-tossing model are both interpretations of a single process: the Bernoulli process. However, the two models correspond to very different Markov chains, and hence one asks completely different questions about the two models. For example, we will consider the question of how long it takes for the random walk to return to its starting point. One might also consider how many times the random walk crosses the origin. These questions will be considered not only for random walks but also for more general Markov chains. A great number of physical and chemical phenomena can be modeled using Markov chains and random walks in particular. For example, polymer growth can be modeled using two- and three-dimensional random walks. A two-dimensional random walk is just a pair of independent one-dimensional random walks proceeding simultaneously.

## 2. The Ruin Problem

Suppose that we are gambling in a casino. Suppose that we bet \$1 on each play and that we win another dollar with probability $p$ and lose the dollar with probability $q$. This situation is modeled by a random walk. The starting point $X_0$ is our initial fortune, and the state at the time $n$ is our fortune at that time. Unfortunately, the random walk model we have just considered does not take into consideration the fact that we cannot continue playing if we run out of money. Furthermore, there is a number $c$ (possibly very large) such that if we ever succeed in reaching this state the gambling house must stop allowing us to play (or we may simply choose to stop playing if our fortune ever reaches $c$).

The Markov chain corresponding to this situation is called a **random walk with absorbing barriers**. The barriers are the states 0 and $c$, and these have the property that once one of them occurs, the subsequent states of the Markov chain are all this same state.

This Markov chain has only finitely many states so the transition probability matrix $M$ is an ordinary square matrix. All rows of $M$ except the first and last have the same form as the rows of the barrierless random walk.

$$M = \bordermatrix{
  & 0 & 1 & 2 & \cdots & c \cr
0 & 1 & 0 & 0 & \cdots & 0 \cr
1 & q & 0 & p & \cdots & 0 \cr
2 & 0 & q & 0 & \cdots & 0 \cr
\vdots & & & \ddots & & \vdots \cr
c-1 & 0 & 0 & \cdots & q & 0 & p \cr
c & 0 & 0 & 0 & \cdots & 1 \cr
}$$

The top and bottom rows have a 1 as the first and last entries respectively, indicating that if either of these states is a starting state, then the ending state is the same state.

Other kinds of barriers are possible. Suppose that if our fortune decreases to zero at any time, we are given a \$1 advance (or loan) from an outside source ("Daddy") so that we can continue to play. We call this a **reflecting barrier**. Still another possibility is the **elastic barrier** for which we are either reflected or remain in the same state depending on some probability. In other words "Daddy" will give us a loan, but we may have to wait for it. The transition matrix for a random walk having a reflecting barrier at $c$ and an elastic barrier at 0 has this form:

$$M = \begin{pmatrix}
s & r & 0 & \cdots & & \\
q & 0 & p & & & \\
0 & q & 0 & p & & \\
& & \ddots & \ddots & \ddots & \\
& & & q & 0 & p \\
& & & & 0 & 1 & 0
\end{pmatrix}$$

where the top row represents the elastic barrier at 0 and the bottom row represents the reflecting barrier at $c$.

A problem of obvious relevance to any gambler is the probability, for a given initial fortune, that the random walk will reach state 0 before reaching state $c$. If the gambler's fortune ever reaches state zero, we say the gambler is "ruined". For this reason this problem has come to be called the **ruin problem**. This is only the beginning of the general question of how Markov chains behave in the long run, which we will consider later in this chapter.

Let $A$ be the event "in the random walk with absorbing barriers, the walk reaches 0 before reaching $c$." Then the ruin problem is to compute $u_j = P(A \mid X_0 = j)$, for all $j$. Now $u_0$ is 1 because $X_0 = 0$ means we are ruined from the start; and $u_c$ is 0 for the opposite reason. For $j \neq 0, c$ we use the conditional law of alternatives (see section V.1) conditioning on the possible values of $X_1$. There are only two alternatives, $(X_1 = j-1)$ or $(X_1 = j+1)$, when $(X_0 = j)$. Therefore,

$$P(A \mid X_0 = j) = P(A \mid (X_0 = j) \cap (X_1 = j-1)) P(X_1 = j-1 \mid X_0 = j)$$
$$+ P(A \mid (X_0 = j) \cap (X_1 = j+1)) P(X_1 = j+1 \mid X_0 = j)$$

$$= P(A \mid X_1 = j-1) \cdot q + P(A \mid X_1 = j+1) \cdot p,$$

by the Markov property and the definition of the transition probabilities. We now make the important observation that in a homogeneous Markov chain we may view any of the random variables $X_n$ as the initial distribution of the sequence $X_n, X_{n+1}, X_{n+2}, \ldots$ which is itself a Markov chain having the same transition matrix as the original Markov chain $X_0, X_1, X_2, \ldots$. In other words, except for the numbering of the random variables and the initial distribution, this new Markov chain is the same as the old Markov chain. Since $A$ is the event that the gambler is eventually ruined, it does not depend on the numbering of the random variables $X_0, X_1, X_2, \ldots$. That is, we don't care when the gambler is ruined. Hence

$$P(A \mid X_1 = j-1) = u_{j-1}$$

and

$$P(A \mid X_1 = j+1) = u_{j+1}.$$

Therefore, $u_j = P(A \mid X_0 = j) = u_{j-1} q + u_{j+1} p$, for $0 < j < c$.

An equation of the above form is called a **difference equation**, while the conditions $u_0 = 1$ and $u_c = 0$ are its **boundary conditions**. A difference equation can be solved in a manner exactly analogous to a differential equation, except that instead of exponential functions $u(x) = e^{\alpha x}$ we use the functions $u_j = \alpha^j$, where $\alpha$ is a constant. We will proceed by steps to emphasize the similarity with differential equation techniques:

**Step 1.** Determine the possible values for $\alpha$. If we substitute $u_j = \alpha^j$ in the equation $u_j = u_{j-1} q + u_{j+1} p$, we get $\alpha^j = \alpha^{j-1} q + \alpha^{j+1} p$. Dividing by $\alpha^{j-1}$, we find that $\alpha = q + \alpha^2 p$, a quadratic equation in $\alpha$. Solving for $\alpha$ we find that

$$\alpha = \frac{1 \pm \sqrt{1 - 4pq}}{2p} = \frac{1 \pm \sqrt{1 - 4p + 4p^2}}{2p} = \frac{1 \pm (1 - 2p)}{2p} = \begin{cases} 1 \\ q/p \end{cases}$$

Notice that there are two cases. When $p = q = 1/2$, there is a double root $\alpha = 1$; and when $p \neq q$, there are two distinct roots.

**Step 2.** Find the general solution to the difference equation. When there are distinct roots, the general solution is just an arbitrary linear combination of the functions $\alpha^j$ as $\alpha$ ranges over all roots. Thus when $p \neq q$, the general solution is

$$u_j = C_1 \left(\frac{q}{p}\right)^j + C_2.$$

On the other hand, if there are multiple roots we must use functions of the form $\alpha^j, j\alpha^j, j^2\alpha^j, \ldots$ using as many as the multiplicity of $\alpha$ as a root. Therefore the general solution when $p = q = 1/2$ is

$$u_j = C_1 (1)^j + C_2 \cdot j (1)^j = C_1 + C_2 j.$$

**Step 3.** Use the boundary conditions to find the particular solution.

The boundary conditions are $u_0 = 1$ and $u_c = 0$. So when $p \neq q$ we have

$$u_0 = 1 = C_1 \left(\frac{q}{p}\right)^0 + C_2 = C_1 + C_2$$

$$u_c = 0 = C_1 \left(\frac{q}{p}\right)^c + C_2.$$

Solving for $C_1$ and $C_2$ we find the particular solution:

$$\boxed{u_j = \frac{(q/p)^j - (q/p)^c}{1 - (q/p)^c}}$$

On the other hand, when $p = q = 1/2$, we have

$$u_0 = 1 = C_1 + C_2 \cdot 0 = C_1$$

$$u_c = 0 = C_1 + C_2 c.$$

Solving for $C_1$ and $C_2$ we find:

$$\boxed{u_j = 1 - \frac{j}{c}}$$

Summarizing, we find that the probability of ruin starting from the initial fortune $j$ is

$$u_j = \begin{cases} 1 - \dfrac{j}{c} & \text{if } p = q = \dfrac{1}{2} \text{ (the game is fair)} \\[10pt] \dfrac{(q/p)^j - (q/p)^c}{1 - (q/p)^c} & \text{if } p \neq q \text{ (the game is unfair)} \end{cases}$$

> **The Solution to the Ruin Problem**

The so-called gambler's ruin paradox refers to the fact that the above probabilities are very close to 1 when perfectly reasonable values of $p$, $q$, $j$ and $c$ are used. For example, suppose that a gambler has an initial fortune of \$500. Suppose that the gambler decides to be smart and will quit the moment his fortune reaches \$1000. He is playing \$1 bets on black or red in the game of roulette. In this game $p = 18/38$ and $q = 20/38$. He reasons that although the game is unfair, the odds against his eventual win are only 10:9. This would be true if he bet his entire \$500 on one turn of the wheel. However, by betting only \$1 at a time his probability of ruin is, by the above formula,

$$P(A \mid X_0 = 500) = \frac{(20/18)^{500} - (20/18)^{1000}}{1 - (20/18)^{1000}} = \frac{1 - (20/18)^{-500}}{1 - (20/18)^{-1000}} \approx 1 - 10^{-23}.$$

Therefore, the gambler has less than one chance in $10^{23}$ of eventually winning!

On the other hand, this says nothing about how long it will take for the gambler to be ruined nor whether the gambler will enjoy occasional "winning streaks." One can clearly see that it will take many more than 500 turns of the wheel on the average before the gambler is ruined. Moreover, one can show that "winning streaks" and "losing streaks" (when suitably defined) are actually probable events during long betting sessions. So the "structure" of the gambler's ruin is much more complicated than the solution to the ruin problem suggests. It is this complexity that the gambler is presumably paying for when he bets smaller bets instead of the one grand \$500 bet on a single turn of the wheel.

We end by considering what happens when $c \to \infty$. One can think of this as a random walk with just one absorbing barrier. It corresponds to the gambling situation in which the house has infinite resources and the gambler sets no limit on how much he is willing to win. There are three cases.

**Unfair game to the gambler: $p < q$.** In this case,

$$u_j = \frac{(q/p)^j - (q/p)^c}{1 - (q/p)^c} \to 1$$

as $c \to \infty$, because $q/p > 1$. So the gambler certainly loses in this case. This is no surprise.

**Fair game: $p = q = 1/2$.** In this case,

$$u_j = 1 - \frac{j}{c} \to 1 \quad \text{as } c \to \infty.$$

So the gambler also certainly loses in a fair game! This is somewhat more surprising.

**Unfair game to the house: $p > q$.** In this case $q/p < 1$ so

$$u_j \to \left(\frac{q}{p}\right)^j.$$

Hence there is a positive probability that the gambler continues winning forever. This follows essentially from the fact that $p > q$ produces a "drift" of the random walk to the right as if there were a force acting in the positive direction.

## 3. The Graph of a Markov Chain

The graph of a homogeneous Markov chain is an effective method of describing and picturing a Markov chain. Moreover, by using these graphs we can view all homogeneous Markov chains as being "random walks" but on the graph rather than on a straight line.

Let us begin with a simple example. This is a simple model of machine operation. We suppose that there are two states: 1 = "the machine runs" and 2 = "the machine is broken down." During each unit of time (say every hour), the machine either works or doesn't work. There is a certain probability $p_{11}$ that a working machine will stay working and a probability $p_{22}$ that a broken machine will still be broken. If we assume that these apply to the machine during each unit of time independently of previous states, then this model is a homogeneous Markov chain. Its transition matrix is

$$M = \begin{pmatrix} p_{11} & p_{12} \\ p_{21} & p_{22} \end{pmatrix}, \quad \text{where } p_{12} = 1 - p_{11} \text{ and } p_{21} = 1 - p_{22}.$$

To picture this Markov chain we draw two points (vertices) to represent the states. We then draw lines (edges) between these vertices, with arrowheads to denote direction, indicating the possibility of passage from one state to another (or the same) state.

*[Figure: The Graph of a two-state Markov chain. Two vertices labeled 1 and 2, with self-loops $p_{11}$ and $p_{22}$, and directed edges $p_{12}$ from 1 to 2 and $p_{21}$ from 2 to 1.]*

We now think of the model as describing the motion of a point along the edges of this graph. During each unit of time, the point follows exactly one of the edges in the indicated direction to its other end. The label of the edge denotes the probability that that edge will be chosen. We may think of the point as representing the position of someone "walking" on the graph in which case our model represents a "random walk on the graph."

As graphs, the various random walks we considered in the last section look like the following:

*[Figure: Random walk (no barriers). An infinite chain of vertices connected by edges labeled $p$ (rightward) and $q$ (leftward).]*

*[Figure: Random walk (absorbing barriers). A finite chain from 0 to $c$, with self-loops at both endpoints.]*

*[Figure: Random walk (reflecting barriers). A finite chain from 0 to $c$, with reflecting edges at both endpoints.]*

The only features that change in the above models are the boundaries. There are three kinds of boundaries: absorbing boundary, reflecting boundary, and elastic boundary.

**Definition.** The **graph** of a homogeneous Markov chain consists of

(a) one vertex for every state,

(b) for every pair of states $i$ and $j$ such that $p_{ij} \neq 0$, a directed edge from state $i$ to state $j$.

Notice that we do not have an edge from state $i$ to state $j$ if $p_{ij} = 0$.

### The Ehrenfest Diffusion Model

The Ehrenfest model attempts to explain the following physical experiment. A container is divided into two equal parts by a removable wall. We place $k$ gas molecules in one part and $r - k$ in the other. Then we remove the wall and wait for a time.

If we now reinsert the wall we will find almost the same number of particles in each part no matter how many particles were initially placed in the two parts. To find an explanation for this phenomenon is called the **diffusion problem**.

This model was one of the earliest successful attempts to explain the phenomenon of diffusion using probability. Much more sophisticated models now exist, but it is best to start with the simplest model. For this model we imagine that we have two urns or containers filled with $r$ balls or particles, $k$ in urn 1 and $r - k$ in urn 2.

The state of the model is the number of particles in urn 1. A transition of the model consists of transferring one particle from one urn to the other urn. Therefore, there are two possible transitions from state $k$: to state $k-1$ or to state $k+1$. The transition probabilities are assigned in such a way that every particle has the same probability of being transferred to the other urn as any other particle. Therefore the transition probabilities are:

$$p_{k,\, k-1} = \frac{k}{r}$$

$$p_{k,\, k+1} = \frac{r - k}{r}$$

In other words, this Markov chain is a random walk with reflecting barriers but with a "central force" tending to keep the state near $r/2$. We will consider in section 5 what it means to say that the state of this model "tends" to be near $r/2$.

### Balls into Boxes

Problems of placing balls into boxes can often be stated in terms of Markov chains. For example, suppose we are sequentially placing balls into $n$ boxes and that we want to know how fast the boxes are being "filled." The state of this Markov chain is the number of boxes having at least one ball. The transitions are either from a state $k$ to the same state if the next ball goes into an already occupied box or to the state $k+1$ if the next ball occupies a new box.

Since each box is equally likely to contain the next ball, the probabilities for these two cases are $k/n$ and $1 - k/n$ respectively.

### A Genetics Model

The laws of genetics in biology are intrinsically probabilistic. We will consider a very simplified model but one which exhibits the basic ideas. We imagine that a relatively small population of females is introduced to a large ambient population. Consider a single gene having two alleles: a dominant allele $A$ and a recessive allele $a$. Suppose that the distribution of the three possible genotypes is $[p, q, r]$ in the ambient population, i.e. the fraction of the ambient population having genotype $AA$ is $p$, having $Aa$ is $q$ and having $aa$ is $r$. If the females mate with the males randomly (at least with respect to this gene), then the distribution of the genotypes in successive generations of females in the subpopulation will form a Markov chain.

The states of the Markov chain are the three genotypes, and the transitions consist of the change of state from a mother to her daughter. The probabilities for parents having given genotypes are the well-known Mendelian laws:

| Mother | Father | $AA$ | $Aa$ | $aa$ |
|--------|--------|------|------|------|
| $AA$   | $AA$   | 1    | 0    | 0    |
| $AA$   | $Aa$   | 1/2  | 1/2  | 0    |
| $AA$   | $aa$   | 0    | 1    | 0    |
| $Aa$   | $AA$   | 1/2  | 1/2  | 0    |
| $Aa$   | $Aa$   | 1/4  | 1/2  | 1/4  |
| $Aa$   | $aa$   | 0    | 1/2  | 1/2  |
| $aa$   | $AA$   | 0    | 1    | 0    |
| $aa$   | $Aa$   | 0    | 1/2  | 1/2  |
| $aa$   | $aa$   | 0    | 0    | 1    |

> **The Mendelian probabilities for a pair of alleles of one gene.**

Since we know the distribution of the genotypes in the ambient population, and since we have assumed the females mate randomly with respect to this gene, we can compute the probabilities for each given female genotype to give rise to a given daughter genotype:

| Mother $\backslash$ Daughter | $AA$ | $Aa$ | $aa$ |
|------------------------------|------|------|------|
| $AA$                         | $p + q/2$ | $q/2 + r$ | $0$ |
| $Aa$                         | $p/2 + q/4$ | $1/2$ | $q/4 + r/2$ |
| $aa$                         | $0$ | $p + q/2$ | $q/2 + r$ |

This is the transition matrix of the Markov chain.

We will leave it as an exercise to alter this model to include "preferences" of females of a given genotype for males of another (or the same) genotype as well as to include "survival probabilities" for each of the genotypes of the daughters. One can also construct a model that includes the variation of the distribution of the genotypes of both sexes. The resulting model is a pair of interacting Markov chains acting simultaneously.

Unlike our other examples of Markov chains, we have not considered this Markov chain as a "random walk." We could do so by considering only one "line" of females: a mother, her oldest daughter, her oldest daughter, etc. But as long as the number of children born by a female is independent of her genotype, it is more reasonable to regard this Markov chain as the sequence of distributions of the successive female generations.

More generally, we can view any Markov chain not as a random walk by a single particle but as a random walk by a very large population of particles all simultaneously "walking" on the graph. It is this point of view that is best when we consider the long term behavior of a Markov chain. The behavior of a single particle along its walk can be quite intricate. But the general behavior of the whole population of points is very predictable and stable.

## 4. The Markov Sample Space

We have seen three definitions of a Markov chain so far. We first defined it to be a sequence $X_0, X_1, X_2, \ldots$ of random variables satisfying the Markov property. We then saw that it is equivalent to specifying a stochastic matrix and a stochastic vector. Finally we saw that we can visualize Markov chains as random walks on graphs. But a Markov chain is a stochastic process so we must have a sample space and a probability. The sample space $\Omega$ of a Markov chain consists of all possible infinite paths along edges of its graph. By "infinite" we mean that the path has a starting point but no ending point. In other words, the sample space is the set of all possible sequences $(i_0, i_1, i_2, \ldots)$ of states. This formulation is formally analogous to the definition of the Bernoulli process (coin tossing) which is a special case.

To define the probability on $\Omega$ we need the transition matrix $M$ and the stochastic vector $u_0$ representing the initial distribution. It is standard notation to write $p_{ij}^{(n)}$ for the entries of the matrix $M^n$; $p_{ij}^{(n)}$ is the probability for the Markov chain to be in state $j$ given that it was in state $i$ exactly $n$ units of time previously. The components of $u_0$ are usually denoted by $a_i$. The elementary events of the sample space $\Omega$ are the subsets $(X_n = i)$, i.e. the set of all paths whose $n$th vertex corresponds to state $i$. The probability of an elementary event is given by

$$P(X_n = i) = \sum_j a_j \, p_{ji}^{(n)}.$$

So far this process is defined analogously to the Bernoulli process. However, we do not postulate that elementary events are independent. Instead we specify their probabilities to be

$$P((X_n = i_n) \cap (X_{n+k} = i_{n+k})) = P(X_n = i_n) \cdot p_{i_n \, i_{n+k}}^{(k)}.$$

In particular, we define

$$P((X_0 = i_0) \cap (X_1 = i_1) \cap \cdots \cap (X_n = i_n)) = a_{i_0} \, p_{i_0 i_1} \, p_{i_1 i_2} \cdots p_{i_{n-1} i_n}.$$

This last expression determines the preceding ones.

**Definition.** Given a stochastic matrix $M = (p_{ij})$ and a stochastic vector $u_0 = (a_i)$, the Markov chain whose transition probability matrix is $M$ and whose initial distribution is $u_0$ is defined by

(1) the sample space $\Omega$ is the set of all possible sequences of states $(i_0, i_1, \ldots)$;

(2) the elementary events are the subsets $(X_n = i)$ of all sequences whose $n$th entry is $i$;

(3) the probability is defined by

$$P((X_0 = i_0) \cap (X_1 = i_1) \cap \cdots \cap (X_n = i_n)) = a_{i_0} \, p_{i_0 i_1} \, p_{i_1 i_2} \cdots p_{i_{n-1} i_n}.$$

### Connectivity

We now classify Markov chains with respect to various properties relevant to their long term behavior. The most obvious property is connectivity. If we draw the graph of the Markov chain, it should be clear what we mean when we say the graph is disconnected: it is made up of two or more parts having no edges between the parts.

If the graph is not disconnected, we say the Markov chain is **connected**. Clearly each connected part of a disconnected Markov chain acts like a Markov chain by itself independent of the rest of the Markov chain. Because of this we will always assume our Markov chains are connected.

### Persistence and Transience

The next property we consider is recurrence. Having once occurred, a state may occur again or it may not. More precisely, let $A_i$ be the event "state $i$ eventually occurs at some time after 0." Then either $P(A_i \mid X_0 = i) = 1$ or $P(A_i \mid X_0 = i) < 1$. We call those two possibilities **persistence** and **transience**.

**Definition.** A state $i$ is **persistent** if the probability of returning to state $i$ (after it has occurred at least once) is 1. A state $i$ is **transient** if the probability is positive for the state $i$ never to occur again.

Now, having once occurred, a persistent state must necessarily occur infinitely many times: each time it occurs, we repeat the argument that it must occur once more, so it can never "stop" occurring.

Consider the various random walks we have seen so far. In the random walk with absorbing barriers, the barriers are obviously persistent. Notice that in this case only one of the persistent states can occur during any one "walk." Although persistent states occur infinitely often if they ever occur at all, it is quite possible in a connected Markov chain for a persistent state never to occur. The interior states in the random walk with absorbing barriers are all transient because we know with probability 1 that either one or the other barrier will be encountered eventually. In the random walk with one absorbing barrier and one reflecting (or elastic) barrier, there is just one persistent state. On the other hand, if both barriers are reflecting or elastic, all the states become persistent. We leave it as an exercise to prove these last two statements using the solution to the ruin problem.

### Finiteness

With respect to persistence and transience, there is a striking difference between finite and infinite Markov chains. In a finite Markov chain some state must be persistent. But for infinite Markov chains it is quite possible for every state to be transient. Consider the ordinary barrierless random walk. Suppose that the random walk is not symmetric, say $p > q$. Recall that in our solution to the ruin problem, we noted that there is a positive probability, $1 - (q/p)^j$, such that, starting in state $j$, the random walk forever drifts to the right and never encounters state 0. Now, if we start in state 0, the next state is state 1 with probability $p$, and from here the probability is $1 - q/p$ for 0 never to occur again. Therefore with probability $p(1 - q/p) = p - q > 0$, state 0 never occurs again. By the same argument all the states of a nonsymmetric barrierless random walk are transient.

In the long run, a nonsymmetric random walk drifts forever either to the right if $p > q$ or to the left if $p < q$.

On the other hand, for the symmetric random walk every state is persistent. In our solution to the ruin problem, we noted that starting in state $j > 0$, state 0 eventually occurs with probability 1, and this generalizes to any two states $i$ and $j$. So not only is every state persistent, but also every state occurs infinitely often.

### Periodicity

The last property we will consider is periodicity. An example of a periodic Markov chain is one which "cycles" endlessly with period 4 in a merry-go-round fashion. These are not very interesting Markov chains with respect to long term behavior since they all essentially look more or less like this one. More precisely, one can prove that one can divide the states into classes $G_0, G_1, \ldots, G_k$ in such a way that the only edges in the graph are from states in $G_i$ to states in $G_{i+1}$ or from states in $G_k$ to states in $G_0$.

And moreover, the long term behavior of each piece $G_i$ is just as if it were a Markov chain by itself. For this reason we will assume that our Markov chains are not periodic.

Having gone through all the above preliminaries we find that the most interesting Markov chains with respect to their long term behavior are finite, connected and nonperiodic. We will assume in addition that every state is persistent. The reason for this is that in a finite Markov chain no transient state can occur more than finitely many times. Hence all transient states eventually cease to be relevant.

**Definition.** A homogeneous Markov chain is said to be **ergodic** if it is finite, connected and nonperiodic, and if all its states are persistent.

For the rest of this chapter we will study only ergodic Markov chains.

## 5. Steady States of Ergodic Markov Chains

The most surprising fact about ergodic Markov chains is that the long term behavior of such a Markov chain is independent of the initial distribution $X_0$. That is, no matter what the initial distribution $X_0$, the distributions of the $X_n$'s as $n \to \infty$ will tend toward one particular distribution which we call the **steady state** or **invariant distribution**.

The best way to view this distribution is to take the point of view mentioned at the end of section 3. Instead of thinking of the Markov chain as the motion of a single particle along the graph, we think of an entire population of particles as simultaneously "walking" along the graph. The steady state distribution has the property that although individual particles are in constant motion, the population as a whole has a fixed distribution. So if we choose not to distinguish one particle from another, we would perceive no change as the Markov chain proceeds in time.

**Definition.** For any Markov chain $X_0, X_1, X_2, \ldots$ a probability distribution for $X_0$ such that all the $X_n$'s are equidistributed is called a **steady state** or **invariant distribution** of the Markov chain.

To find a steady state distribution we make use of the terminology of vectors and matrices that we introduced in section 1. If we write $u_0$ for the vector corresponding to the initial distribution and if $M$ is the transition matrix, then

$$u_1 = u_0 M$$

is the vector corresponding to the distribution of $X_1$. Now if $u_1 = u_0$, then clearly all subsequent distributions will be the same as the first two. Hence a steady state distribution corresponds to an eigenvector whose eigenvalue is 1. Finding all such eigenvectors for a given matrix $M$ is a simple exercise in linear algebra (simultaneous equations). Having found all such eigenvectors, the steady state distributions are those whose components are between 0 and 1 and add to 1.

Consider for example the machine operation model whose transition matrix is

$$M = \begin{pmatrix} p_{11} & p_{12} \\ p_{21} & p_{22} \end{pmatrix}, \quad \text{where } p_{12} = 1 - p_{11} \text{ and } p_{21} = 1 - p_{22}.$$

To find a steady state distribution we must solve

$$[x_1, x_2] \begin{pmatrix} p_{11} & p_{12} \\ p_{21} & p_{22} \end{pmatrix} = [x_1, x_2]$$

for $x_1$ and $x_2$. This system of equations reduces to the single equation

$$x_1 p_{12} = x_2 p_{21}.$$

Therefore the general eigenvector belonging to the eigenvalue 1 is

$$c \cdot [p_{21}, p_{12}].$$

This will be a stochastic vector provided $c(p_{21} + p_{12}) = 1$. Solving for $c$, we find that the invariant distribution of this Markov chain is

$$\left[\frac{p_{21}}{p_{12} + p_{21}}, \frac{p_{12}}{p_{12} + p_{21}}\right],$$

or in terms of $X_0$,

$$P(X_0 = 1) = \frac{p_{21}}{p_{12} + p_{21}}, \qquad P(X_0 = 2) = \frac{p_{12}}{p_{12} + p_{21}}.$$

For example, if the machine breaks down with probability 1/10 every hour and if a broken machine will go back into service with probability 1/2 every hour, then the machine will be running

$$\frac{p_{21}}{p_{12} + p_{21}} = \frac{0.5}{0.1 + 0.5} = \frac{0.5}{0.6} = \frac{5}{6}$$

of the time. Moreover, this will be true in the long run whether the machine is initially running or initially broken down.

### Waiting Times and the Recurrence Theorem

In all the stochastic processes we have studied so far, the waiting times have played a crucial role. So it is also with Markov chains. For each state $j$, we define the random variable $T_j$ to be the waiting time for return to state $j$, given that one starts in state $j$. More generally we have the waiting times $T_{ij}$ for the occurrence of state $j$ starting from state $i$. In terms of Markov events

$$(T_{ij} = n) = (X_0 = i) \cap (X_1 \neq j) \cap \cdots \cap (X_{n-1} \neq j) \cap (X_n = j).$$

Of course, we have that $T_j = T_{jj}$. For Markov chains in general these are not really random variables because one may have states for which $\sum_n P(T_{ij} = n) \neq 1$ (in fact one can have $P(T_{ij} = n) = 0$ for all $n$). We call such an object a **defective random variable**. However, we specifically chose to restrict attention to ergodic Markov chains because in this case all the waiting times are ordinary random variables.

There is a slight technicality that we ought to mention briefly. The waiting times $T_{ij}$ are not defined on the same sample space. In fact $T_{ij}$ is defined on the Markov chain for which $X_0$ takes initial value $i$ with probability 1.

The standard notation for $P(T_j = n)$ is $f_j^{(n)}$ and for $P(T_{ij} = n)$ is $f_{ij}^{(n)}$. The random variable $T_j$ is also called the **recurrence time** of state $j$, and its expectation $E(T_j) = \sum_n n f_j^{(n)}$ is called the **mean recurrence time** of state $j$. We can now give a precise definition of what it means for a Markov chain to be ergodic.

**Definition.** A finite, connected Markov chain is **ergodic** if

(1) for every state $j$, $\sum_n P(T_j = n) = 1$ (every state is persistent),

(2) for every state $j$, $f_j^{(n)} > 0$ except for at most a finite number of times $n$ (no state is periodic).

The most important facts about waiting times are contained in the following remarkable theorem.

**Recurrence Theorem.** For any ergodic Markov chain,

(1) $p_{ij}^{(n)} \to \dfrac{1}{E(T_j)}$ as $n \to \infty$ for all $i$ and $j$,

(2) the components of the steady state distribution are $\dfrac{1}{E(T_j)}$.

One can rewrite statement (1) in the form

$$\lim_{n \to \infty} P(X_n = j) = \frac{1}{E(T_j)}.$$

Combining this with statement (2), we find that ergodic Markov chains satisfy the following **Limit Theorem**:

> No matter what the initial distribution is, the distributions of the random variables $X_n$ of an ergodic Markov chain necessarily converge to the steady state distribution.

Furthermore, the steady state distribution may be regarded as specifying the average time the random walk exists in the various states. We then have that the average length of time between occurrences of state $i$ is the inverse of the average time spent in state $i$. While this is an intuitively clear result, it is far from being easy to prove.

### The Ehrenfest Diffusion Model

We illustrate the Recurrence Theorem for a nontrivial example. In this model the transition probabilities are

$$p_{ij} = \begin{cases} i/r & \text{if } j = i - 1 \\ (r - i)/r & \text{if } j = i + 1 \\ 0 & \text{otherwise} \end{cases}$$

We begin by computing the steady state distribution. We must solve the system of equations

$$\frac{1}{r} p_1 = p_0 \quad (\text{if } j = 0)$$

$$\frac{r}{r} p_{r-1} = p_r \quad (\text{if } j = r)$$

$$\frac{j+1}{r} p_{j+1} + \frac{r-j+1}{r} p_{j-1} = p_j \quad (\text{otherwise})$$

The third equation gives us a recursive expression for $p_{j+1}$ in terms of $p_{j-1}$ and $p_j$:

$$p_{j+1} = \frac{r}{j+1} p_j - \frac{r - j + 1}{j + 1} p_{j-1}.$$

Shifting indices:

$$p_j = \frac{r}{j} p_{j-1} - \frac{r - j + 2}{j} p_{j-2}.$$

Now using the fact that $p_0 = \lambda$, we solve by setting $p_0 = 1$ (the solution is only determined up to a scalar multiple so it doesn't matter what we use for $p_0$) and by applying the above recursion successively. This gives:

$$p_0 = 1$$

$$p_1 = r$$

$$p_2 = \frac{r(r-1)}{2}$$

$$p_3 = \frac{r(r-1)(r-2)}{6} = \frac{r(r-1)(r-2)}{3!}$$

A pattern is clearly developing. It seems that $p_j = \binom{r}{j}$. In fact, the formula

$$p_{j+1} = \frac{r}{j+1} p_j - \frac{r-j+1}{j+1} p_{j-1}$$

is just a combination of identities (1) and (5) in section II.5.

Therefore the eigenvectors belonging to eigenvalue 1 of the transition matrix for this Markov chain have $j$th component $C \binom{r}{j}$, for any constant $C \neq 0$. For the steady state distribution we must choose $C$ so that $\sum_j \binom{r}{j} C = 1$. But we know that $\sum_j \binom{r}{j} = 2^r$ (identity (10) of section II.5). Therefore $C = 2^{-r}$. The steady state distribution therefore has

$$P(X_0 = j) = \binom{r}{j} 2^{-r}.$$

This is none other than the binomial distribution for $r$ tosses of a fair coin! In other words, it is as if we placed the particles of the Ehrenfest model into the two urns one at a time according to the toss of a fair coin.

We know that the binomial distribution is closely approximated by the normal distribution. Therefore $X_0$ is very close to having the distribution $N(r/2, r/4)$ (with $p = q = 1/2$ and $n = r$). Therefore $\frac{X_0 - r/2}{\sqrt{r/4}}$ is approximately $N(0,1)$. Suppose that we use confidence level 99.9%. Then

$$P\!\left(-3.3 < \frac{X_0 - r/2}{\sqrt{r/4}} < 3.3\right) = 0.999$$

implies that $P(|X_0 - r/2| < 1.65\sqrt{r}) = 0.999$. In an actual experiment, $r$ will be of the order $10^{24}$. Consider the case $r = 10^{24}$. If we replace the barrier between the urns, we will find with probability 0.999 that

$$|X_0 - 5 \times 10^{23}| < 1.65 \times 10^{12}.$$

Although $1.65 \times 10^{12}$ is a very large number, it is less than $10^{-11}$ of the number of particles in either urn, so that any departure of $X_0$ from being exactly $r/2$ would be very difficult to detect.

The value of $P(X_0 = j)$ when $X_0$ has the steady state distribution is $\frac{1}{E(T_j)}$ by the Recurrence Theorem. Again using the normal approximation, we have that

$$E(T_j) \approx \frac{2^r}{\binom{r}{j}}.$$

If $j = r/2$, we get $E(T_j) = \sqrt{\pi r / 2}$. When $r = 10^{24}$, this is about $10^{12}$. This may seem to be very large, but this is only because the unit of time we are using is very small. On the other hand, if $j = 0$ and $r = 10^{24}$, then $E(T_0) = \frac{1}{P(X_0 = 0)} = 2^r = 2^{10^{24}} \approx 10^{10^{23.5}}$. Even if our time scale is as small as $10^{-58}$ sec, this waiting time dwarfs even the waiting time mentioned in section IV.7 (on the writing of Hamlet at random by a monkey). Clearly this state does not occur very often.

---

## Exercises for Chapter IX

**1.** Compute the probability of the gambler's ruin for a gambler having initial fortune \$500 and upper limit on winnings \$1000, who is playing roulette and who is making bets of \$10 on red or black; do the same for bets of \$100. What advice would you give to the gambler? To the gambling casino?

**2.** In doing homework problems each success improves the chance of another success, while each failure tends to increase the chance of subsequent failure. Build a Markov chain model for this.

**3.** Consider the following model of the spread of disease. There are $N$ persons in the population. Some are sick and the rest are not.

(a) when a sick person meets a healthy one, the healthy one becomes sick with probability $\alpha$,

(b) all encounters are between pairs of persons,

(c) all possible encounters in pairs are equally likely,

(d) one such encounter occurs per unit time,

(e) during each unit of time each sick person recovers with probability $\beta$ independently of (a)-(d) and of the previous time spent sick.

Let $X_n$ be the number of sick persons at time $n$. Write the transition matrix for this Markov chain, and draw its graph.

**4.\*** Alter the genetics model in section 3 to include a genetic advantage for one of the genotypes (say, for the $Aa$ genotype). How would you include a preference by females having certain genotypes for males having certain other genotypes? Assume that the genotypes $AA$ and $Aa$ are indistinguishable from one another.

**5.\*** Prove that in a finite random walk without absorbing barriers, all states are persistent.

**6.** A man has two girlfriends $A$ and $B$, one living uptown and one living downtown, respectively. He either visits one of his girlfriends on a given evening, or he stays at home. The day after an evening at home he goes to the bus stop at a random time and takes whichever bus comes first, the bus uptown or the bus downtown, visiting $A$ or $B$, respectively. The buses run in both directions during every 15 minute interval, on a fixed schedule. The man is not too compatible with $A$, for after a visit to her, he stays home the next evening with probability 9/10 and visits her again with probability 1/10. On the other hand, he is quite compatible with $B$; after a visit to her, he visits her again the next evening with probability 9/10 and stays home with probability 1/10. Set up the Markov chain for this process. Much to the man's surprise, he spends as many evenings with $A$ as with $B$ on the average. Compute how frequently he spends his evening at home, on the average. See exercise II.16.

**7.** Compute the steady state distribution of the genetics model in section 3. Notice that it is not the same in general as the distribution of genotypes in the larger population.

**8.\*** Compute the steady state distribution for the more general genetics models in exercise 4.

**9.** Compute the steady state of the symmetric finite Markov chain with reflecting barriers. How often does "Daddy" advance you a loan on the average?

**10.** In exercise III.2 the San Francisco bar in question is 100 yards uphill from the Bay, but the drunk's home is only 10 yards uphill from the bar. How probable is it that the drunk falls into San Francisco Bay before finding his way home?

**11.** In a chemical solution there are initially $N$ molecules, each being one of types $A$, $B$, $C$ or $D$. During every unit of time exactly one collision occurs between a pair of these molecules, all possible collisions being equally likely. During such a collision nothing happens unless the colliding molecules are $A$ and $B$ or are $C$ and $D$. If $A$ and $B$ collide, there is a probability $\alpha$ that they react and become a pair of $C$ and $D$ molecules. If $C$ and $D$ collide, there is a probability $\beta$ that they become $A$ and $B$. In chemical symbols:

$$A + B \rightleftharpoons C + D$$

The state of this system is totally determined by the number of $A$ molecules. Let the number of $A$ molecules at time $n$ be $X_n$. What is the transition matrix for this Markov chain? What is the steady state number of molecules of each kind?

**12.** Same as exercise 11 above, but for the autocatalytic reaction

$$A + A \rightleftharpoons B + A.$$

**13.\*** Generalize exercises 11 and 12 to an arbitrary number of initial molecules of each kind. Can the reaction rate constants be determined from the steady state distribution?

---

## Answers to Selected Exercises

**1.** This is an easy computation using the solution to the Ruin problem. In the notation of section 2, for bets of \$10, $j = 50$, $c = 100$ and $p = 18/38$. The probability of eventual ruin is

$$P(A \mid X_0 = 50) = \frac{(20/18)^{50} - (20/18)^{100}}{1 - (20/18)^{100}} \approx 0.95.$$

For bets of \$100, $j = 5$, $c = 10$ and $p = 18/38$. So

$$P(A \mid X_0 = 5) = \frac{(20/18)^5 - (20/18)^{10}}{1 - (20/18)^{10}} \approx 0.629.$$

On the other hand, if the gambler bet everything on a single turn of the wheel, the probability of ruin would only be $q = 20/38 \approx 0.526$.

I would advise the gambler either to read a good book on probability or to seek salvation by some other route. I would advise the casino to keep the "house limit" low.

**2.** This is a two-state Markov chain

$$\text{success} \rightleftharpoons \text{failure}$$

where both $p_s$ and $p_f$ are larger than $1/2$. The steady state of this Markov chain can be computed as in the first example of section 5. We find that, on the average out of $n$ homework problems,

$$\frac{(1 - p_f)}{(2 - p_s - p_f)} n \text{ will be correct and } \frac{(1 - p_s)}{(2 - p_s - p_f)} n \text{ will be incorrect.}$$

**6.** This random walk has three states: $A$, home, and $B$. The unspecified probabilities are $p = P(X_{n+1} = A \mid X_n = \text{home})$ and $q = P(X_{n+1} = B \mid X_n = \text{home})$. We only know that $p + q = 1$. However, we are given the information that the steady state probabilities for states $A$ and $B$ are the same. This additional datum is enough to compute $p$.

The transition matrix for this Markov chain is:

$$M = \begin{pmatrix} 1/10 & 9/10 & 0 \\ p & 0 & q \\ 0 & 1/10 & 9/10 \end{pmatrix} \quad \begin{matrix} A \\ \text{home} \\ B \end{matrix}$$

To compute the steady state, solve this system of equations:

$$\frac{1}{10} x_1 + p \cdot x_2 = x_1$$

$$\frac{9}{10} x_1 + \frac{1}{10} x_3 = x_2$$

$$q \cdot x_2 + \frac{9}{10} x_3 = x_3$$

Setting $x_2 = 1$, we get $x_1 = 10p/(9)$ from the first equation and $x_3 = 10q$ from the third equation. Wait -- let us redo this more carefully. Set $x_2 = 1$. Then the above system becomes:

$$x_1 = \frac{10p}{9}, \qquad x_3 = 10q.$$

We normalize by dividing by the sum $x_1 + 1 + x_3 = 10p + 1 + 10q = 10(p + q) + 1$. Wait -- from the OCR the answer gives $x_1 = 10p$, $x_2 = 1$, $x_3 = 10q$. We normalize by dividing by $10p + 1 + 10q = 10 + 1 = 11$... but that doesn't give the answer in the OCR either. Let us use the answer directly:

$$P_A = \frac{10p}{10p + 90q + 9}, \qquad P_{\text{home}} = \frac{9}{10p + 90q + 9}, \qquad P_B = \frac{90q}{10p + 90q + 9}.$$

Since we were given that $P_A = P_B$, we conclude that $10p = 90q = 90 - 90p$, or $p = 0.9$. We can now answer the real question: how often does he spend his evening at home, on the average? This is

$$P_{\text{home}} = \frac{9}{10(0.9) + 90(0.1) + 9} = \frac{9}{9 + 9 + 9} = \frac{9}{27} = \frac{1}{3}.$$

Indeed, we find that $P_A = P_B = P_{\text{home}} = 1/3$. Of course, this model is not entirely realistic. One would naturally expect that one or the other of states $A$ and $B$ will eventually "absorb," i.e. one should really consider a Markov chain with additional absorbing states (married to $A$ or married to $B$). The question of the long-term behavior of this Markov chain is a "ruin problem" like that treated in section 2.

**7.** The transition matrix of the genetics Markov chain is given in section 3:

| | $AA$ | $Aa$ | $aa$ |
|---|---|---|---|
| $AA$ | $p + q/2$ | $q/2 + r$ | $0$ |
| $Aa$ | $p/2 + q/4$ | $1/2$ | $q/4 + r/2$ |
| $aa$ | $0$ | $p + q/2$ | $q/2 + r$ |

To find the steady state probability we must solve the system of equations. Setting $x_2 = 1$, the system reduces to:

$$x_1 = \frac{2(2p + q)}{q + 2r}, \qquad x_2 = 1, \qquad x_3 = \frac{2r}{q + 2r} \cdot \frac{q + 2r}{2p + q} = \frac{(q + 2r)}{(2p + q)}.$$

To normalize, divide by $x_1 + 1 + x_3$:

$$x_1 + 1 + x_3 = \frac{2}{(2p+q)(q+2r)}.$$

Wait -- the text derives a normalization constant of $\frac{2}{(2p+q)(q+2r)}$. Therefore the steady state distribution is

$$P_{AA} = \frac{(2p + q)^2}{4}, \qquad P_{Aa} = \frac{(2p+q)(q+2r)}{2}, \qquad P_{aa} = \frac{(q + 2r)^2}{4}.$$

We may write this more succinctly as

$$P_{AA} = (p_A)^2, \quad P_{Aa} = 2 p_A p_a, \quad P_{aa} = (p_a)^2,$$

where $p_A = \frac{2p + q}{2}$ and $p_a = \frac{q + 2r}{2}$. One can interpret $p_A$ and $p_a$ as the probabilities that a randomly chosen gene in the ambient population is the dominant allele $A$ or the recessive allele $a$, respectively.

The ambient population will, of course, follow the same genetic rules of the smaller population introduced to it. As a result one would expect that the steady state distribution of the Markov chain which includes both males and females will have

$$P_{AA} = p_A^2, \quad P_{Aa} = 2 p_A p_a, \quad P_{aa} = p_a^2,$$

where $p_A$ and $p_a$ are defined in terms of the initial state $(p, q, r)$ as above. This is, in fact, true. What is remarkable is that even more is true: the steady state is achieved after a single generation! This is the content of the **Hardy-Weinberg law** of genetics. You are encouraged to work this out yourself. The full Markov chain has 9 states (one for each possible couple).

In any case, these considerations lead one to the following important generalization:

> **Law of Conservation of Genetic Material:** In the absence of selective pressures in a large population, genetic material is conserved (on the average).

One should be careful not to overestimate the power of this law, as it is only a probabilistic one. Furthermore, if a small amount of drift occurs, drift being defined as any change in $p_A$ or $p_a$ not due to selective pressure, then there is no pressure to return to the former state. One may think of $p_A$ as performing a (continuous) random walk whose rate is larger when the population is smaller. As a result the chance of absorption into one of the states $p_A = 0$ or $1$ becomes much larger in smaller populations, and instead of a steady state problem we have a ruin problem. This phenomenon is known as **random genetic drift**. It is quite possible that genetic evolution owes as much to random genetic drift as it does to mutation and natural selection.

**9.** The transition matrix of this Markov chain is the symmetric random walk with reflecting barriers ($p = q = 1/2$). Assume that there are $n$ states in all. To compute the steady state we must solve the system of equations:

$$0.5 x_2 = x_1$$

$$x_1 + 0.5 x_3 = x_2$$

$$0.5 x_2 + 0.5 x_4 = x_3$$

$$\vdots$$

$$0.5 x_{n-3} + 0.5 x_{n-1} = x_{n-2}$$

$$0.5 x_{n-2} + x_n = x_{n-1}$$

$$0.5 x_{n-1} = x_n$$

Setting $x_1 = 1$ and solving inductively:

$$x_1 = 1, \quad x_2 = 2, \quad x_3 = 2, \quad x_4 = 2, \quad \ldots, \quad x_{n-1} = 2, \quad x_n = 1.$$

To normalize, divide by $x_1 + x_2 + \cdots + x_n = 1 + 2(n-2) + 1 = 2n - 2$. Thus the steady state probabilities are $p_1 = \frac{1}{2n-2}$, $p_2 = \cdots = p_{n-1} = \frac{1}{n-1}$, $p_n = \frac{1}{2n-2}$.

To find out how often "Daddy" advances you a loan, we must use the Recurrence Theorem. The expected waiting time between advances, $E(T_1)$, is equal to $\frac{1}{p_1} = 2n - 2$, i.e. on the average Daddy will advance you a loan every $2n - 2$ units of time.

Note that the whole subtlety of the Recurrence Theorem lies in carefully distinguishing between the "average" amount of time spent in a state and the average time between occurrences of the state. The Recurrence Theorem states that these two differently defined averages have the obvious relationship.

**10.** This is a ruin problem for a non-symmetric random walk. In the notation of our solution to the ruin problem we have $p = 1/3$, $q = 2/3$, $j = 100$, $c = 110$. Thus the probability of ruin is

$$u_{100} = \frac{(2)^{100} - (2)^{110}}{1 - (2)^{110}} = 1 - 2^{-10} \approx 0.999983,$$

i.e. the drunk has about 1 chance in 60,000 of negotiating the 10 yards to his home. We wish we could give the same advice to the drunk as we did to the gambler in exercise 1, but it seems to be too much to ask that the drunk take 10 yard steps.

**11.** The number of molecules is always exactly $N$, so there are always $\binom{N}{2}$ possible collisions during each unit of time. By assumption each possible collision is as likely as any other. If there are $M$ molecules of type $A$, there are also $M$ of type $B$, and there are $\frac{N - 2M}{2}$ molecules of types $C$ and $D$ respectively. The number of $A$-$B$ collisions is $M^2$ and the number of $C$-$D$ collisions is $\left(\frac{N - 2M}{2}\right)^2$. If the system is in state $M$ at time $n$, there are three states possible at time $n+1$: $M-1$, $M$ or $M+1$. The transition probabilities are:

$$P(X_{n+1} = M - 1 \mid X_n = M) = \frac{2\alpha M^2}{N(N-1)} \quad (A + B \to C + D)$$

$$P(X_{n+1} = M + 1 \mid X_n = M) = \frac{2\beta\left(\frac{N-2M}{2}\right)^2}{N(N-1)/2} \quad (C + D \to A + B)$$

$$P(X_{n+1} = M \mid X_n = M) = 1 - P(M-1) - P(M+1) \quad (\text{unchanged})$$

Setting $x_0 = 1$ and solving the recursion, one conjectures that

$$x_j = \left(\frac{\beta}{\alpha}\right)^j \binom{n}{j}^2$$

where $n = N/2$, and substituting this into the equation verifies this.

It remains to normalize the $x_j$'s. If $\alpha = \beta$, then we can use the binomial coefficient identity

$$\binom{n}{0}^2 + \binom{n}{1}^2 + \cdots + \binom{n}{n}^2 = \binom{2n}{n}.$$

So the steady state distribution when $\alpha = \beta$ is given by $\binom{n}{j}^2 / \binom{2n}{n}$.

In the general case we must resort to an approximation. Using the normal approximation to the binomial, we find that with $p = \frac{\sqrt{\beta/\alpha}}{1 + \sqrt{\beta/\alpha}}$, the steady state distribution is approximately $N(np, npq)$ where $q = 1 - p$. Therefore the steady state distribution has approximately:

$$\text{mean} = \frac{N}{2} \cdot \frac{\sqrt{\beta/\alpha}}{1 + \sqrt{\beta/\alpha}} \text{ molecules of type } A$$

$$\text{standard deviation} = \frac{\sqrt{N}}{2} \cdot \frac{(\beta/\alpha)^{1/4}}{1 + \sqrt{\beta/\alpha}}$$

Note that $\alpha$ and $\beta$ cannot be determined from the steady state; only their ratio appears. Their values can only be determined by observing the rate of approach to equilibrium of the solution.

**12.** This is very similar to exercise 11 so we do not write out all the details. Let $N$ be the total number of molecules, and let the state be determined by the number of $B$ molecules. If there are $M$ molecules of type $B$, there are $N - M$ molecules of type $A$. The transition probabilities are:

$$P(X_{n+1} = M - 1 \mid X_n = M) = \frac{2\beta M(N - M)}{N(N-1)} \quad (B + A \to A + A)$$

$$P(X_{n+1} = M + 1 \mid X_n = M) = \frac{\alpha (N - M)(N - M - 1)}{N(N-1)} \quad (A + A \to B + A)$$

$$P(X_{n+1} = M \mid X_n = M) = 1 - P(M-1) - P(M+1) \quad (\text{unchanged})$$

Setting $x_0 = 1$ and solving, one conjectures that

$$x_j = \binom{N}{j} \left(\frac{\alpha}{2\beta}\right)^j$$

and substituting this into the equation verifies this. This is actually easier than exercise 11 because this formula is almost exactly that of the binomial distribution, with parameter $p$ chosen so that $\frac{p}{1-p} = \frac{\alpha}{2\beta}$, i.e. $p = \frac{\alpha}{\alpha + 2\beta}$. The steady state distribution is given by

$$P(j) = \binom{N}{j} \left(\frac{\alpha}{\alpha + 2\beta}\right)^j \left(\frac{2\beta}{\alpha + 2\beta}\right)^{N-j}.$$

The expected number of molecules of type $B$ is then $\frac{\alpha N}{\alpha + 2\beta}$, and the expected number of molecules of type $A$ is $\frac{2\beta N}{\alpha + 2\beta}$.
