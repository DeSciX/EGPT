---
title: "Chapter VI: Conditional Probability — Exercises"
author: "Gian-Carlo Rota"
edition: "1992"
chapter_number: 6
part: 2
---

# Exercises for Chapter VI — Conditional Probability

## Discrete Conditional Probability

**1.** A game is played with six double-sided cards. One card has "1" on one side and "9" on the other. Two cards have "2" and "3" on the two sides. And the last three have "3" and "4" on them. The six cards are shuffled by one person. A random card is then drawn and held in a random orientation between two other persons, each of whom sees only one side of the card. The winner is the one seeing the smaller number. Suppose that the first person chooses the "2/3" card. Compute the probabilities each of the two persons thinks he/she has for winning.

**2.** A person is given an urn and is told it contains 4 balls: 2 red and 2 black. He draws two of the balls at random without replacing them, and both turn out to be red. He puts these aside. What is the probability that the next ball drawn is black? Another person in the room has been blindfolded during all of the preceding. After taking off her blindfold, she takes a ball out of the urn at random. She knows which balls were originally in the urn and that two have been drawn so far but does not know their color. What does she think the probability of drawing a black ball is? How could the fact that she was blindfolded have any effect on the probability of the next drawing of a ball? Explain.

**3.** Place $k$ balls into $n$ boxes at random. If the first box is empty, what is the probability that the second is also?

**4.** During a poker game a kibitzer manages to get a brief glimpse of one of the hands (and no other hands). In this glimpse he sees only that one card in the hand is an ace. He did not notice which ace it was. What is the probability that the hand has at least two aces? If the kibitzer noticed that one card is a black ace, what is the probability that the hand has at least two aces? Finally suppose the kibitzer saw that the hand had the Ace of Spades. Discuss whether such glimpses are really possible. The "moral" of this example is that (conditional) probabilities of events change considerably when one learns kinds of information that have no obvious relevance.

**5.** Three prisoners are informed by their jailer that one of them has been chosen at random to be executed and that the other two are to be freed. They are told they will learn their fate in one week's time. Prisoner A asks the jailer to tell him privately the name of a fellow prisoner who will be set free, claiming that there would be no harm in divulging this information, since he already knows that at least one will go free, and he cannot inform the prisoner in question about his good fortune. The jailer refuses to tell prisoner A, pointing out that if A knew the name of one of his fellows to be set free, then his own probability of being executed would rise from $1/3$ to $1/2$, since he would then be one of two prisoners; and this would be cruel. What do you think of the jailer's reasoning? Be precise.

**6.** You are playing bridge. Assume that the deck is thoroughly shuffled. If you receive 4 hearts, how many did your partner receive? Generalize to the case of receiving $j$ hearts.

**7.** (Neyman-Pearson errors) A commuter has the choice of taking the train to work or of driving to work. If she takes the train she will get to work on time about one time in four. If she takes her car, she is almost certain of getting to work on time, but at considerable inconvenience. Although she calls the transit company every morning, their information is wrong a third of the time, so she adopts the following strategy: if the transit company says the train will be late, she always takes her car, and if not she takes her car a third of the time at random. Compute how probable it is that she will be late. What is the probability that she takes her car even though she would have been on time if she had taken the train? This kind of "mistake" is known as a Neyman-Pearson Error of Type I. She makes an Error of Type II if the train is late when she takes it. Compute the probability that she makes an error of Type II. Note that the probability of either kind of error is a conditional probability. Furthermore in order to make the above computations, one must assume a number of independence properties of the various events. State explicitly any assumptions you must make in this problem.

The probability of an error of Type I is called the significance level of the decision, and 1 minus the probability of an error of type II is called the power of the decision. One should re-examine statistical hypothesis testing using this terminology. When several tests are available one clearly would like the one with the largest power for a given significance level. Unfortunately, however, in practice one rarely knows precisely what model will be implied by the rejection of the hypothesis being tested, so computing the power of a test is not as easy as it seems.

**8.** Suppose that the commuter in exercise 7 scores the two inconveniences of being late and of driving the car at 1 and 2 respectively. What is her optimal strategy? Do the same with 1 and 2 interchanged.

**9.** An event $A$ of positive probability is said to be **favorable** to an event $B$ if

$$P(B \mid A) \geq P(B),$$

in other words, if we know that $A$ has occurred then the probability that $B$ has occurred also is the same as it was or is greater. Note that if $A$ is independent of $B$, then it is favorable to $B$.

Suppose we have a family having two children. Let $A$ be the event "the first child is a girl," let $B$ be the event "the second child is a girl," and let $C$ be the event "the two children have different gender." Show that $A$ and $B$ are both favorable to $C$ but that $A \cap B$ is not. Similarly show that $C$ is favorable to both $A$ and $B$ but not to $A \cap B$. Give examples to show that an event can be favorable to two others without favoring their union and conversely that two events can favor a third without their union doing so.

**10.** (Simpson's paradox) A new treatment for a disease has just become available but is still experimental and is very expensive. In a teaching hospital with a large budget a random sample of 100 patients with the disease are randomly broken into two groups, one having 90 patients the other 10. The larger group is treated. 30 of these show clear improvement and only one of the members of the other group does. In a city hospital with a smaller budget a similar test is made but now the smaller group gets the treatment. In this group 9 show improvement while in the untreated group half improve and half do not. In either case the treatment seems to be effective. However, if we view this as one sample of 200, 100 of which are treated and the other 100 are not, then a different picture emerges. Of the treated patients 39 improve and of the untreated patients some 46 improve. This seems to suggest that the treatment actually decreases one's chance for improvement. Explain the apparent paradox here.

## Bayes' Law

**11.** There are three children in a family. A friend is told that at least two of them are boys. What is the probability that all three are boys? The friend is then told that the two are the oldest two children. Now what is the probability that all three are boys? Use Bayes' Law to explain this. Assume throughout that boys are as likely as girls and that each child is independently either a boy or a girl.

**12.** A student is about to take a quiz. If he studies, he will pass with probability 0.99, but if he goes to the dorm party his chances of passing decline to 0.5. The next day he passes the exam. Did he go to the party?

**13\*.** Use Bayes' law to compute the probability in exercise 7 that the commuter took the train given that she was on time.

**14.** Three boxes each contain two coins. One has two silver coins, one has two gold coins, and one has one of each. A box is chosen completely at random and a coin is chosen at random from that box. It is gold. Is the other coin in the box gold also?

**15.** The manufacturer of screws in exercise IV.15 is producing good screws 99% of the time but now the machine that detects the flawed screws is itself out of adjustment, producing an incorrect decision 10% of the time. What is the probability that a discarded screw is really flawed?

**16.** A lie detector test is known to be 80% reliable when the person is guilty and 95% reliable when the person is innocent. If a suspect was chosen from a group of suspects of which only 1% have ever committed a crime, and the test indicates that he is guilty, what is the probability that he is innocent?

**17.** In the optimal choice problem (exercise III.64) the correct strategy is to make no decision for a certain length of time (say $k$ days) and then to choose the best candidate of all those seen up to that point. If the monarch chooses the $j$th candidate what is the probability that she is the best candidate?

**18\*.** In exercise 17 above, compute the probability that the monarch will choose the $j$th candidate using the above strategy. Use this to find the probability that this strategy succeeds. For which $k$ will this be maximized? Generalize to $N$ candidates.

**19\*.** Use Bayes' law to compute the probability of each of the kinds of hands in exercise II.21 given that one has at least one pair.

## Continuous Conditional Probability

**20.** A target is a disk of radius 1m. A bullet is fired at the disk and hits it. Assume the bullet's mark has a uniform distribution, i.e. the probability that it hits a region $A$ is proportional to the area of $A$. How far from the center does the bullet hit?

**21.** A scimitar is a sword shaped like a circular arc (at least for this problem). Suppose that during a Turkish festival $n$ Turks throw their scimitars independently and at random along a circle of circumference $a$. Suppose that each scimitar has arc length $h$ along this circle. What is the probability that none of the scimitars overlap?

**22.** In the Uniform process of sampling $n > 2$ points from $[0, a]$, what is the probability that the first three gaps are all less than $b$?

**23.** For $1 \leq i < j < k \leq n$, compute the joint density of $X_{(i)}$ and $X_{(k)}$ given that $X_{(j)} = x$.

**24.** Let $L_1, L_2, \ldots, L_{n+1}$ be the gaps in the Uniform process of sampling $n$ points from $[0, a]$. Find the distributions of the order statistics of the gaps, i.e. put the gaps in order, getting the random variables $L_{(1)}, L_{(2)}, \ldots, L_{(n+1)}$. Then compute their expectations. Compare this with the scimitar problem above (exercise 21) and with the broken DNA problem (exercise III.53).

**25.** Compute the distribution of the median gap in the Uniform process of sampling $n$ points from $[0, a]$.

**26.** In the Uniform process of sampling $n$ points from $[0, a]$, what is the probability that the second smallest gap is at least twice as large as the smallest gap?

**27.** Given positive numbers $t_1, t_2, \ldots, t_{n+1}$, what is the probability that in the uniform process, for all $i = 1, 2, \ldots, n + 1$, the $i$th gap is greater than $t_i$?

**28\*.** Give a rigorous statement and proof of the identity

$$\operatorname{dens}(X = t \mid Y = s) = \frac{\operatorname{dens}(X = t, Y = s)}{\operatorname{dens}(Y = s)}.$$

**29\*.** Give a rigorous ($\varepsilon$-$\delta$) proof of the continuous law of alternatives.

**30\*.** Define a cluster of size $k$ and width $\varepsilon$ to be a sequence of $k$ points contained in an interval of length $\varepsilon$. In the Uniform process how many clusters of size $k$ and width $\varepsilon$ are there?

## Exchangeability

**31.** Drop $r$ red points and $b$ black points ($r + b = n$) at random uniformly on $[0, a]$. What is the probability that a run of $h$ red points precedes a run of $t$ black points?

**32.** Compute the probability that at least one of the four players in a bridge game is dealt a Yarborough. (See ex. I.12.) Note that the four hands are not independent but are exchangeable. Compare this answer with what you would get if you dealt the four hands independently from four different decks. Use the result of exercise II.12. What is the probability that all four hands are Yarborough?

**33\*.** (Discrete Needles on a Stick Problem). Choose $k$ numbers from the set $\{1, 2, \ldots, n\}$ at random. What is the probability that no two are closer than $a$ units apart? Note that the answer depends on whether one uses Fermi-Dirac, Bose-Einstein or Maxwell-Boltzmann statistics.

**34\*.** (Discrete Scimitars on a Circle Problem). Choose $k$ numbers from the set of integers modulo $n$. What is the probability that no two have a difference congruent modulo $n$ to one of the integers in the set $\{-a + 1, \ldots, -2, -1, 0, 1, \ldots, a - 1\}$? As in exercise 33 above, that depends on which kind of statistics we use.

## Change of Variables

**35.** Find the distributions of the following random variables in terms of that of the random variable $X$:

(a) $Y = X + c$, where $c$ is a constant,

(b) $Y = aX + b$, where $a$ and $b$ are constants,

(c) $Y = |X|$,

(d) $Y = \sqrt{X}$, where $X$ is a positive random variable,

(e) $Y = \ln(X)$, where $X$ is a positive random variable and $\ln$ denotes the natural logarithm.

**36.** A point is dropped at random (uniformly) on a square of side $a$. What is the distance of this point from the center of the square?

**37.** Let $S$ be the speed of a molecule in a uniform gas at equilibrium. Then $S$ is a positive random variable whose density is given by $\operatorname{dens}(S = s) = \frac{4}{\sqrt{\pi}}\,s^2 e^{-bs^2}$ for $s > 0$, where $b$ is a constant which depends on the absolute temperature and mass of the molecule. Find the density of the kinetic energy $E$ of the molecule, $E = \frac{1}{2}mS^2$.

**38.** Suppose that a long DNA molecule of length $a$ is broken at random into two pieces. Compute the distribution of the ratio of the length of the longer piece by that of the shorter piece. Compute the ratio of the expected sizes of the longer and shorter pieces and the expected ratio of the longer and shorter pieces. [Answers: 3 and $\infty$]. Do the same for a molecule broken into 3 pieces.

## Student's $t$-distribution and Related Topics

**39.** (Student's $t$-distribution) The key fact behind much of modern statistical theory is the Central Limit Theorem: the standardization of a sum of independent, equidistributed random variables is normally distributed in the limit as the sample size gets large. Now we remarked in chapter IV that if we do not know the variance of the random variable, then we can approximate it using the sample variance. Unfortunately, if we only have a small sample, the fact that the sample variance is being used instead of the actual variance can result in the standardized sum having a distribution considerably different from a normal distribution even if the original sequence of random variables were all normally distributed. This fact was first pointed out by William Gosset, who wrote under the pseudonym of "Student." We will now consider his computation.

Let $X_1, \ldots, X_n$ be a sequence of independent, normally distributed R.V.'s with mean $m$ and variance $\sigma^2$. The sample mean is $\bar{m} = \frac{1}{n}(X_1 + \cdots + X_n)$ and the sample variance is $\hat{\sigma}^2 = \frac{1}{n-1}\left((X_1 - \bar{m})^2 + \cdots + (X_n - \bar{m})^2\right)$. We wish to compute the distribution of the random variable $t = \frac{(\bar{m} - m)\sqrt{n}}{\hat{\sigma}}$. Note that this R.V. is not defined for $n = 1$. For the purposes of computing the distribution of $t$ we may assume that $X_1, \ldots, X_n$ have distribution $N(0, 1)$. Then for $n = 2$, $t$ is the random variable $\frac{X_1 + X_2}{|X_1 - X_2|}$. It is easy to check that $X_1 + X_2$ and $|X_1 - X_2|$ both have distribution $N(0, 2)$ and are independent. More generally show that $t$ has the same distribution as the ratio

$$\frac{X}{\sqrt{Y_1^2 + \cdots + Y_{n-1}^2}}$$

where $X, Y_1, \ldots, Y_{n-1}$ are independent and have the standard normal distribution. The distribution of $t$ is called the **Student's $t$-distribution with $n - 1$ degrees of freedom**. When $n = 2$, the distribution of $t$ is the same (up to a scale change) as the gangster distribution in exercise III.36. See exercise 49 below. Compute the Student's $t$-distribution explicitly for the case of 1 degree of freedom.

**40\*.** Let $X$ and $Y$ be independent, uniformly distributed random variables on $[0, 1]$. Prove that $\cos(2\pi X)\sqrt{-2\ln(Y)}$ has distribution $N(0, 1)$. This fact is useful for generating a sequence of independent, normally distributed pseudo-random numbers by computer, since most computers have a pseudo-random number generator that produces a sequence of independent, uniformly distributed pseudo-random numbers from $[0, 1]$.

**41\*.** Let $X_1, \ldots, X_n$ be a sequence of independent, standard normal random variables. Compute the distributions of the order statistics $X_{(1)}, \ldots, X_{(n)}$ of these random variables. Write a computer program that uses numerical integration to find an approximation for $E(X_{(i)})$ accurate to 3 decimal places. Then make a table of $E(X_{(i)})$ for $n$ between 1 and 20.

**42\*.** In a college cafeteria ice cream is available for the evening meal in servings that vary in weight according to a normal distribution with a standard deviation of 100gm. The cafeteria workers maintain about 15 servings for students to choose from. Every day student A chooses the smallest serving available while student D chooses the largest. Over the school year (200 meals), how much more ice cream does student D eat than student A?

**43\*.** Drop $n$ points at random independently and uniformly on a square of side $a$. How close is the point closest to the center of the square?

**44\*\*.** Drop $n + 1$ points at random independently and uniformly on a square of side $a$. What is the distance to the nearest neighbor of the first point? (This is the pennies-on-a-carpet problem mentioned in the introduction and is currently an unsolved problem.)

## Convolutions of Random Variables

**45.** (Rayleigh distribution) Let $X$ and $Y$ be independent random variables having distribution $N(0, \sigma^2)$. Find the distribution of $\sqrt{X^2 + Y^2}$. We can interpret this as the distribution of the deviation of an object from a target point when the object is dropped onto the target from above. $X$ and $Y$ are the deviations in the $x$ and $y$ directions with respect to a rectangular coordinate system whose origin is at the target point.

**46.** For the situation described above, consider a circle and a square of the same area, both centered at the target point. Which is more likely to contain the point where the object lands? Hint: use probabilistic reasoning.

**47.** ($\chi^2$-distribution) Return to exercise IV.19. The FDA should be just as concerned with variance as with the mean quantity of impurity. For example, if a company produces pills with an average of 4 ppm impurities but a variance of 4 (ppm)$^2$, 31% of the pills it is producing are below standard. One can test a sample variance just as one can test a sample mean. The distribution of the sample variance of a random sample of size $n$ from a normally distributed population is called the **chi-square distribution with $n - 1$ degrees of freedom**. If the mean is known and not simply computed from the data of the random sample, then the distribution is the chi-square distribution with $n$ degrees of freedom. (See exercise IV.6.) The chi-square distribution can be computed as follows. First compute the distribution of $X^2$, when $X$ is $N(0, \sigma^2)$. This is the chi-square with one degree of freedom and mean $\sigma^2$. Compute the variance of this distribution. [Answer: $2\sigma^4$]. For the general case let $X_1, \ldots, X_n$ be independent random variables each distributed as $N(0, \sigma^2)$. The sum $\frac{X_1^2 + X_2^2 + \cdots + X_n^2}{n}$ has the distribution of the chi-square with mean $\sigma^2$.

For large samples, we can use the Central Limit Theorem to conclude that the chi-square is approximately normally distributed. What is its variance? [Answer: $\frac{2\sigma^4}{n}$]. Now suppose that the FDA determines that 9 ppm impurity is possibly hazardous. It would seem reasonable to require that no more than 1 pill per thousand can have this much impurity. Does the drug company examined in exercise IV.19 conform to this requirement? Use 95% one-sided confidence intervals both for the mean and for the variance. Note that the number of degrees of freedom in our sample is 49 not 50. [Answer: No]

**48.** Return to exercise IV.39. Suppose that the resistors are in parallel rather than series. Using a suitable normal approximation find a 95% confidence interval for the resistance of this circuit.

**49\*.** In exercise III.36, the gangster sprays the wall with a machine gun, shooting $n$ bullets independently, each in a random direction toward the wall. What is the distribution of the sum of the positions of the $n$ bullet holes? Assume that the median (exercise II.37) is the zero point and that distances are measured in meters. What is the distribution of the average position of the $n$ bullet holes? Does this result explain what you observed in exercise IV.58?

**50\*.** Compute the density of the sum of $n$ independent, uniformly distributed random variables on $[0, a]$.

**51\*.** Give a rigorous proof of the convolution theorem.

## Geometric Probability

**52.** In a circus carnival game, a player tosses a quarter onto the surface of a table ruled in a checkerboard pattern of two-inch squares, which is further subdivided into one-inch squares by lines of another color. A quarter is $\frac{15}{16}$ inches in diameter. If it falls entirely inside one of the two-inch squares, the player receives 50 cents (his original quarter plus another). If it falls inside one of the one-inch squares, he receives a prize worth about twenty dollars. Otherwise the player receives nothing. What is the probability of winning each prize, and what is the average return on one's investment for one toss of a quarter?

**53.** Choose four points at random on a circle. Call them $X_1, X_2, X_3$, and $X_4$. What is the probability that the chords $X_1 X_2$ and $X_3 X_4$ intersect? Hint: use a symmetry argument.

**54.** A captain of a ship can determine its position by using radio bearings from transmitters on shore. These only give a direction so it is necessary to use at least two such bearings to determine the position. However, because of errors of measurement, one usually takes three bearings and the position lines are then plotted on a map as in the example below. The ship is assumed to lie inside the triangle formed by the three lines. All we know about the errors of measurement in the three bearings is that they are independent and symmetric about the true bearing. What is the probability that the ship actually lies inside the triangle? [Answer: $\frac{1}{4}$].

**55.** Let $X$ be a randomly oriented unit vector in 3-space. Show that the length of the projection of $X$ on the $x$-axis (i.e. the $x$-component of $X$) is uniformly distributed on $[0, 1]$ and that $E(L) = \frac{1}{2}$.

**56.** (Feller) What is the length of a random segment intersecting a unit sphere? More precisely, let $P$ be a point on the sphere, and let $L$ be a line through $P$ in a random direction. Let $S$ be the length of the intersection of $L$ with the sphere. What is the distribution of $S$? [Answer: uniformly distributed on $[0, 2]$.]

**57.** Let $X$ be as in exercise 55, and let $U$ be the length of the projection of $X$ on the $(x, y)$-plane. Show that $U$ has probability density $f(t) = \frac{t}{\sqrt{1 - t^2}}$ for $0 < t < 1$ and that $E(U) = \frac{\pi}{4}$.

**58.** Let $L$ be the length of the $x$-coordinate of a randomly oriented unit vector in 2-space. Show that $L$ has probability density $f(x) = \frac{2}{\pi\sqrt{1 - x^2}}$ for $0 < x < 1$ and that $E(L) = \frac{2}{\pi}$.

**59.** (Feller) Why are two violins twice as loud as one? This may sound facetious at first until one recalls that loudness is proportional to the square of the amplitude of the vibration. The incoming waves may be represented by unit vectors with random orientation, the length being the amplitude and the angle the phase. When two violins are played, the resulting vector is the vector sum of the two vectors, but since they come from different sources we may regard them as being independent random vectors. Show that the expected value of the square of the length of the sum of the two vectors is twice the expected value of the square of the length of one of them.

**60.** An isosceles triangle is formed by a unit vector in the $x$-direction (i.e. in 2-space either $(1, 0)$ or $(-1, 0)$) and another in a random direction. Find the distribution of the length of the third side. Do this both in 2-space and in 3-space.

**61.** What is the probability that a random quadratic polynomial, $ax^2 + bx + c$, has real roots? Here the coefficients are independent and uniformly distributed on $[0, 1]$.

**62.** A needle of length $l$ is dropped on a grid ruled in a checkerboard pattern with rulings spaced $a$ units apart. What is the average number of lines the needle crosses?

**63.** A planet contains five small islands which we may regard as five independent random points on a sphere. What is the probability that at least four lie in the same hemisphere?

**64.** Let $P$ and $Q$ be two independent random points on a circle whose center is $O$. What is the distribution of the angle $POQ$? Do the same for two points on a sphere.

## Fluctuation Theory

**65.** (Epstein) A gambling house offers the following game. After paying an entrance fee $E$, a coin is tossed until the number of heads exceeds the number of tails. The player is then paid the number of dollars equal to the number of times the coin was tossed. What is the average amount of money that the player expects to receive? [Answer: infinite]

**66.** A random walk in two or more dimensions is simply two or more independent one-dimensional random walks acting simultaneously. What is the probability that a two-dimensional random walk, starting from the origin, eventually returns to the origin? If it returns, how long, on the average, does it take to do so? Do the same for a three-dimensional random walk. [Answers: probability 1, infinitely long time, probability about 0.239].

**67\*.** If the gambling house in exercise 65 above has only $N$ dollars available for winners, what is a fair entrance fee $E$ for the game described there?

## Supplementary Exercises

**68.** Rewrite the following vague conversation using the language of probability theory. You may assume that it is possible to distinguish between "good weather" and "bad weather" unambiguously.

"The Weather Bureau isn't always right, but I would say that they are right more often than not," said Alice thoughtfully.

"Ah, but what comfort is it during miserable weather to know that the forecast was right? If it's wrong that isn't going to affect the likelihood of good weather," retorted Bob.

"You may be right, but that doesn't contradict what I said, even though the forecast is pessimistic only about twice a week," answered Alice persuasively.

---

## Answers to Selected Exercises

**1.** This problem is rather ambiguously stated, but probability problems in the "real world" generally are. Exercise 5 is an even more complicated example of this. In this exercise, it should be clear that the probability required is the conditional probability that each person has for winning. It is important that each person know that the cards are shuffled at random.

The sample space then consists of 12 sample points (two orientations for each card), each one equally probable. Let $W$ be the event that one person wins. Write $A_i$ for the event that the person sees the number $i$ on the card. The conditional probabilities $W$ given each of the $A_i$'s are then easy to compute:

$$P(W \mid A_1) = \frac{P(W \cap A_1)}{P(A_1)} = \frac{1/12}{1/12} = 1$$

$$P(W \mid A_2) = \frac{P(W \cap A_2)}{P(A_2)} = \frac{2/12}{3/12} = \frac{2}{3}$$

$$P(W \mid A_3) = \frac{P(W \cap A_3)}{P(A_3)} = \frac{3/12}{5/12} = \frac{3}{5}$$

Thus if the "2/3" card is held up, the person on the left will compute a conditional probability of $2/3$ of winning and the person on the right will compute $3/5$ of winning. The paradox is that $2/3 + 3/5 > 1$; both persons think their chances of winning are over 50%! The paradox arises from the mistaken belief that conditional probabilities can be added when the events in question are disjoint. However, $(W \mid A_2)$ and $(W \mid A_3)$ are events on different sample spaces and so in general have no relationship to one another.

Roughly speaking all probabilities are conditional probabilities, the condition being all your a priori assumptions about the mathematical model and all information you have up to the time when the probability is computed. As a result, contradictions of the above kind often occur when one discusses probabilistic questions without using precise language.

**2.** This is an example of the use of one phrase "probability of drawing a black ball," to describe a variety of different mathematical concepts. The man has more information than the woman so he will naturally compute a different probability than the woman.

**3.** One must be careful in this problem: the occupation numbers are not independent. We want $P(q_2 = 0 \mid q_1 = 0)$ in the Sampling process of $k$ balls into $n$ boxes. By a direct computation:

$$P(q_2 = 0 \mid q_1 = 0) = \frac{P(q_2 = 0 \cap q_1 = 0)}{P(q_1 = 0)} = \frac{(n-2)^k / n^k}{(n-1)^k / n^k} = \left(\frac{n - 2}{n - 1}\right)^k.$$

**4.** Are such glimpses really possible? Anyone who has seen a deck of cards would doubt this: the ace of spades is markedly different in design from any other ace. So the statement that the glimpsed card is a black ace would probably mean that the card is the ace of clubs. A similar difficulty occurs in exercise 5 below. Your knowledge of the eyesight, honesty, motivation, ... of the kibitzer all strongly influence your computation.

In any case, let's consider the problem as it is. All of these computations are counting problems. Define events:

$A_i$ = "the hand has at least $i$ aces"

$B$ = "the hand has a black ace"

$S$ = "the hand has the ace of spades."

Counting, we find that:

$$|A_2| = \binom{4}{2}\binom{48}{3} + \binom{4}{3}\binom{48}{2} + \binom{4}{4}\binom{48}{1} = 108{,}336$$

$$|A_1| = \binom{4}{1}\binom{48}{4} + |A_2| = 886{,}656$$

$$|B| = \binom{2}{1}\binom{50}{4} - \binom{2}{2}\binom{48}{3} = 480{,}200$$

$$|S| = \binom{51}{4} = 249{,}900$$

$$|A_2 \cap B| = |A_2| - \binom{2}{2}\binom{48}{3} = 91{,}040$$

$$|A_2 \cap S| = \binom{3}{1}\binom{48}{3} + \binom{3}{2}\binom{48}{2} + \binom{3}{3}\binom{48}{1} = 55{,}320$$

$$P(A_2 \mid A_1) = \frac{|A_2|}{|A_1|} = \frac{108{,}336}{886{,}656} = 0.1222$$

$$P(A_2 \mid B) = \frac{|A_2 \cap B|}{|B|} = \frac{91{,}040}{480{,}200} = 0.1896$$

$$P(A_2 \mid S) = \frac{|A_2 \cap S|}{|S|} = \frac{55{,}320}{249{,}900} = 0.2214$$

Now one's immediate reaction to this problem is that information about an ace known to be in the player's hand should have very little, if any, effect on other cards in the hand. Yet we find that it has quite a substantial effect.

**5.** This problem has caused more heated debates than any other mathematics problem I have ever encountered. I will try to give you the flavor of some of the arguments. The problem is also important because it is one of the simplest examples where the Bayesian point of view occurs in a non-trivial way. As a result we will return to it again later.

The computations in this exercise are very easy ones, and complicated derivations are not what is required. The real problem lies in translating the vague language of the problem into the language of probability theory. Let $A$, $B$ and $C$ be the events that A, B and C respectively are set free. These events are not independent. In fact, $A \cap B = \bar{C}$. There are four points of view in this problem corresponding to the following conditional probabilities:

$$P(A) = \frac{2}{3} \qquad \text{Prisoner A before being told anything}$$

$$P(A \mid B) = \frac{1}{2} \qquad \text{Prisoner A after being told B will be set free}$$

$$P(A \mid C) = \frac{1}{2} \qquad \text{Prisoner A after being told C will be set free}$$

$$P(A) = 0 \text{ or } 1 \qquad \text{Jailer's point of view}$$

Now the prisoner is right that his probability of being executed won't change, because $P(A) = 2/3$ regardless of what the jailer says. However it seems clear that A is referring not to $P(A)$ but to $P(A \mid B)$ or $P(A \mid C)$. (Why else would he require such a long argument to convince the jailer?) So the prisoner is wrong if this is his meaning. The jailer is clearly referring to $P(A)$ and so is surely wrong also.

This takes care of the problem as it was stated, but we can look at the problem a bit more deeply. If A himself is going to be executed, the jailer has a choice: either he can tell A that B is going to be set free or that C is going to be set free. How can he make such a choice? One naturally assumes that the jailer will choose one at random with probability $1/2$ for each. Is such a model reasonable? In practice one would expect some bias (the jailer being human after all). So assume that the choice is made to say B with probability $p$ and C with probability $q = 1 - p$. If we make this assumption our whole model changes. We now have four events to consider:

$\bar{B}$ = "B is executed"

$\bar{C}$ = "C is executed"

$D_1$ = "A is executed and the jailer tells the prisoner that B will go free"

$D_2$ = "A is executed and the jailer tells the prisoner that C will go free"

By assumption:

$$P(\bar{B}) = P(\bar{C}) = P(D_1 \cup D_2) = \frac{1}{3}$$

$$P(D_1 \mid \bar{A}) = p$$

$$P(D_2 \mid \bar{A}) = q$$

Hence $P(D_1) = P(D_1 \mid \bar{A})P(\bar{A}) = \frac{p}{3}$ and similarly $P(D_2) = \frac{q}{3}$. The event that the jailer tells the prisoner that B will be set free is now $D_1 \cup C$. We want:

$$P(A \mid D_1 \cup C) = \frac{P(A \cap (D_1 \cup C))}{P(D_1 \cup C)} = \frac{P(A \cap D_1) + P(A \cap C)}{P(D_1) + P(C)}$$

$$= \frac{0 + \frac{1}{3}}{\frac{p}{3} + \frac{1}{3}} = \frac{1}{p + 1}.$$

Similarly,

$$P(A \mid D_2 \cup B) = \frac{1}{q + 1}.$$

Consider some extreme cases:

(1) $p = q = \frac{1}{2}$ (fair coin = "unbiased jailer")

$$P(A \mid D_1 \cup C) = \frac{1}{\frac{1}{2} + 1} = \frac{2}{3} = P(A)$$

$$P(A \mid D_2 \cup B) = \frac{2}{3} = P(A)$$

Thus if the jailer agrees to be fair, the probability does not change!

(2) $p = 1$, $q = 0$ ("totally biased jailer")

$$P(A \mid D_1 \cup C) = \frac{1}{1 + 1} = \frac{1}{2}$$

$$P(A \mid D_2 \cup B) = \frac{1}{0 + 1} = 1$$

This looks paradoxical until you realize that the only way for the jailer to tell A that C was going to be set free is if B was going to be executed.

Some will argue that (1) provides the correct model for this phenomenon. In the absence of any other information this is not an unreasonable assumption (we will later see why: the case $p = q = \frac{1}{2}$ represents a "maximum entropy"). But one must make it clear that this is an assumption. To argue that the jailer is wrong and that the probabilities "don't change" without explicitly mentioning that this assumption is being made is a mistake.

One's assessment of the value of $p$ is one of the inputs into this problem. How does one compute, or estimate it? Here is where the Bayesian point of view enters. Although we presume that $p$ is a constant, we regard it as a random variable! To compute probabilities we use the Continuous Law of Alternatives. We will return to this discussion when we discuss randomization in Chapter VI.

**11.** The paradox in this problem is that it seems at first that being told "two children (at least) are boys" is the same as being told "the two oldest are boys." In either case one would argue that by independence, the probability that all three children are boys is $\frac{1}{2}$.

However, if we use the Bernoulli process, coin tossing model, to model this phenomenon (boy = heads, girl = tails), then the two events quoted above are not the same. Note that in our model "the two oldest are boys" corresponds to "the first two tosses are heads." The first is:

$$(H_1 \cap H_2) \cup (H_1 \cap H_3) \cup (H_2 \cap H_3) = (S_3 \geq 2).$$

The second event is simply $H_1 \cap H_2 = (S_2 = 2)$. By an easy computation:

$$P(S_3 = 3 \mid S_3 \geq 2) = \frac{1}{4}$$

$$P(S_3 = 3 \mid S_2 = 2) = \frac{1}{2}.$$

The explanation of the disparity between the two conditional probabilities above is similar to the explanation of the "reference point paradox." If we choose families having three children subject to the criterion that at least two of the children be boys, we will be choosing among half the families. If we use the second criterion we will be choosing among a more restricted set of choices. Both criteria are satisfied, however, by families having three boys. Thus these families will seem more probable not because there are more such families but rather because there are relatively more of them.

We can use Bayes' Law in this problem as follows. The alternatives are $(S_3 = 0), \ldots, (S_3 = 3)$; i.e. the number of boys in the family. The event $B$ is $(S_3 \geq 2)$ in the first case and $(S_2 = 2)$ in the second. By Bayes' Law,

$$P(S_3 = 3 \mid S_3 \geq 2) = \frac{P(S_3 \geq 2 \mid S_3 = 3)P(S_3 = 3)}{\sum_{i=0}^{3} P(S_3 \geq 2 \mid S_3 = i)P(S_3 = i)}$$

$$P(S_3 = 3 \mid S_2 = 2) = \frac{P(S_2 = 2 \mid S_3 = 3)P(S_3 = 3)}{\sum_{i=0}^{3} P(S_2 = 2 \mid S_3 = i)P(S_3 = i)}$$

The distinction in the two computations is that in the first case $P(S_3 \geq 2 \mid S_3 = 2) = 1$ while in the second case $P(S_2 = 2 \mid S_3 = 2) = \frac{1}{3}$, i.e. in families having exactly 2 boys, only one-third have two oldest boys.

Yet another way to look at the problem has to do with distinguishability. If instead of children we used bosons then the probability of having three bosons in one state of a two state configuration, given that at least two are, is $\frac{1}{2}$. Unfortunately, however, children do not act like bosons: Bose-Einstein statistics is not a valid model of the above phenomenon.

**19.** The alternatives $A_i$ are the different kinds of hands ($i$ ranges from a to j). The event $B$ is "the hand contains at least one pair." For the 10 different kinds of hands in exercise II.21, it is easy to compute $P(B \mid A_i)$:

| | $P(B \mid A_i)$ | $P(B \mid A_i)P(A_i)$ | $P(A_i \mid B)$ |
|---|---|---|---|
| (a) | 0 | 0 | 0 |
| (b) | 1 | 0.4226 | 0.8573 |
| (c) | 1 | 0.0475 | 0.0964 |
| (d) | 1 | 0.0211 | 0.0428 |
| (e) | 0 | 0 | 0 |
| (f) | 1 | 0.0014 | 0.0028 |
| (g) | 0 | 0 | 0 |
| (h) | 0 | 0 | 0 |
| (i) | 1 | 0.0002 | 0.0004 |
| (j) | 0 | 0 | 0 |

$P(B) = 0.4929$

**20.** Let $D$ be the distance of the bullet from the center of the target. We want to compute the distribution of $D$, i.e. $P(D \leq d)$. We know that $P(D \leq d) = C\pi d^2$, for some constant $C$, because the event $(D \leq d)$ means that the bullet hit the disk of radius $d$ centered at the center of the target. We also know that $P(D \leq 1) = 1$ because the bullet was assumed to have hit the target. Hence $C\pi = 1$ or $C = \frac{1}{\pi}$. Thus $P(D \leq d) = d^2$. The density of $D$ is

$$\operatorname{dens}(D = d) = \begin{cases} 2d & \text{if } 0 \leq d \leq 1 \\ 0 & \text{otherwise.} \end{cases}$$
