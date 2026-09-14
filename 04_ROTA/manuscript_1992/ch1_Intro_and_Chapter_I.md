---
title: "Chapter I: Introduction"
author: "Kenneth Baclawski, Gian-Carlo Rota, and Sara Billey"
edition: "Second Preliminary Edition, 1992"
chapter_number: 1
source: "An Introduction to the Theory of Probability"
institution: "MIT"
---

# Chapter I: Introduction

Probability is one of the greatest achievements of this century. Like geometry, it is a way of looking at nature. There are many ways of approaching natural problems, many points of view. The geometrical point of view has been with us for thousands of years. The probabilistic point of view is another way of focusing on problems that has been successful in many instances. The purpose of this course is to learn to think probabilistically. Unfortunately the only way to learn to think probabilistically is to learn the theorems of probability. Only later, as one has mastered the theorems, does the probabilistic point of view begin to emerge while the specific theorems fade in one's memory, much as the grin on the Cheshire cat.

We begin by giving a bird's-eye view of probability by examining some of the great unsolved problems of probability theory. It's only by seeing what the unsolved problems are that one gets a feeling for a field. Don't expect to be able to understand at this point everything about the problems we are about to offer. They are difficult and are meant to be just a hint of things to come.

## Pennies on a Carpet

We have a rectangular carpet and an indefinite supply of perfect pennies. What is the probability that if we drop $n$ pennies on the carpet at random no two of them will overlap? This is one of the most important problems of statistical mechanics. If we could answer it we would know, for example, why water boils at 100°C, on the basis of purely atomic computation. Nothing is known about this problem.

On the other hand, the one-dimensional version of this problem can be readily solved. We shall, in fact, solve it in several different ways. The problem here is to drop $n$ needles of length $h$ on a stick of length $b$ at random. The probability that no two needles overlap is:

$$
\begin{cases}
\left(\dfrac{b - nh}{b - h}\right)^n & \text{if } b \ge nh \\[6pt]
0 & \text{if } b < nh
\end{cases}
$$

![Figure: Pennies on a carpet (left) shows several pennies randomly placed on a rectangular carpet. Needles on a stick (right) shows a line segment of length b with two needles of length h placed on it.](image_placeholder)

The striking difference between the difficulty of a problem in two dimensions and that of the corresponding problem in one dimension is called the "dimensional barrier." It is an illustration of a common problem of physicists; problems in low dimensions are considerably easier to solve than their "real world" counterparts.

The only technique that we can presently apply to this problem is the "method of ignorance" or the "Monte Carlo Method," namely simulate the problem on a computer, and see what happens. Usually a few iterations will give a remarkably accurate answer, when the number of coins is small.

## Random Walk

We consider the grid on the plane with integral corners. A drunkard starts at the origin and walks in one of the four available directions with equal probability, $\frac{1}{4}$ to the next corner. He then repeats this process at the next corner.

It is already an interesting mathematical question to set up this problem so that one can answer such questions as, for example, how long it will take the drunkard to get home. The answer is not a number but rather a probability distribution; that is, there is a certain probability that he will get home in 1 step, 2 steps, 3 steps, etc.

![Figure: A Random Walk — shows a grid with a path from origin (0,0) to a house labeled "home" at an upper-right position. The path follows grid lines with arrows showing the random walk trajectory.](image_placeholder)

So this is a typical case for which we ask a question, and we get an answer that is not a number but rather a string of numbers each with a suitable probability. We call this "answering a question probabilistically" or "using probabilistic reasoning."

One can completely answer the above question, given the position and shape of the drunkard's home. This connects with a branch of physics called potential theory.

A question that has never been answered is to find the probability that after $n$ steps the drunkard has never retraced his steps. We call such a walk a **self-avoiding random walk**. This is related to the problem of polymer growth in chemistry. Of course it appears that this is a very special, stereotyped problem, but it turns out that if we can solve this stereotyped problem, we can solve all the others by suitable coordinate changes. This will be the case also in problems we shall subsequently encounter.

## Cluster Analysis

Suppose that we have a collection of dots arrayed in the plane or in space, much as stars in the sky. The individual points obey no specific physical law, but the whole ensemble does. The problem is to invent the possible physical laws that such ensembles of dots can satisfy. For example, how can one describe that a pattern of dots obeys certain clustering structures? Physically it is sometimes quite obvious; we just look at the sky. But we want a purely numerical, quantitative description. This is the theory of stochastic point processes. Of course this problem is closely related to the problem of pattern recognition.

## Brownian Motion

We must first mention a function called the **normal density function**:

$$
f(x) = \frac{1}{\sqrt{2\pi}} e^{\frac{-x^2}{2}}
$$

This function occurs so often in nature as well as in probability that one is tempted to call it the most important function there is. It looks like this:

![Figure: The bell curve — a symmetric curve centered at 0, with x-axis marked from -3 to 3, labeled y = f(x). The curve peaks at x = 0 and tails off symmetrically.](image_placeholder)

this is the famous "bell-curve."

Now a realistic model of the path of a drunkard is one that wanders in a continuous path starting at the origin. How does one assign probabilities to paths and what does it mean to follow a path at random? This was answered by Norbert Wiener who showed that if there is a straight line barrier in the plane and if we consider the question of where the drunkard first hits the barrier we get precisely the normal density function.

![Figure: Shows a random continuous path starting from the left, hitting a vertical barrier on the right. The probability density of hitting each point along the barrier is shown as a bell-curve shape along the barrier.](image_placeholder)

This fact enables us to compute the probability distribution for when the drunkard arrives home in terms of the position and shape of his home just as with the case of discrete random walks. This is the problem of **Brownian Motion** and has been completely solved.

## Contagion or Percolation

Imagine that we have an orchard with evenly spaced trees and that at some time some trees become infected. Suppose that there is a certain probability that a given infected tree infects one or more neighboring trees before the given tree dies.

![Figure: An orchard of evenly spaced trees (shown as tree icons), with one tree marked as "orchard with infected tree."](image_placeholder)

One of two things can happen: either the infection stays among small clusters of infected trees and eventually dies out or the whole orchard is wiped out. One can show that if the probability of one infected tree infecting another is $p$ there is a critical probability $p_c$ such that if $p < p_c$ the disease will die out, but that if $p > p_c$ the disease will spread forever. How does one compute $p_c$?

## Noise

We can consider a signal sent from a radio transmitter to a receiver but which is perturbed by noise along the way. The problem of filtering out the noise is a very important one for electrical engineers. The whole theory of noise filtering consists of computations involving the normal density function.

## Coin Tossing

The detailed structure of the fluctuations occurring in the tossing of a fair coin are counter-intuitive. Imagine a game for which at each toss of a fair coin we win $1 if it comes up heads and we lose $1 if it comes up tails. If we graph our net winnings in time we see that it crosses the time axis if we switch from a net gain to a net loss or vice versa.

![Figure: A line graph showing net winnings over time, with a jagged path crossing the horizontal axis (time axis) at several points.](image_placeholder)

If after a period of time we find that we have a net gain of zero, what is the most probable number of times we crossed over the axis along the way? The answer is that the most probable case is no times at all!

In effect one can interpret this as saying that during a long betting session the most probable occurrence is to have either a winning streak or a losing streak. Frequent changes from one to the other are actually unlikely. This can be made precise in several ways, the most reasonable one being the famous "arcsine law" of fluctuation theory.

## Cell Growth

How does living tissue grow? We consider a stereotyped case. We start with a little square and then imagine that with some probability the square produces a new square on one of its four sides. The growth proceeds on the boundary by a simple model. What is the pattern that such growth will produce? What is the probability that the tissue will enclose an island?

![Figure: Three stages of cell growth labeled (a), (b), (c), showing progressively larger arrangements of small squares growing from a single square, with growth occurring on boundary edges.](image_placeholder)

The problems described above are just a sampling of the many interesting unsolved problems of probability. Perhaps you will be the one to solve one of them...
