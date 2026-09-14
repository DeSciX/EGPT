---
title: "Chapter IV: Random Variables (Part 2 — Exercises and Solutions)"
author: "Gian-Carlo Rota"
edition: "1992"
chapter_number: 4
part: 2
source: "An Introduction to the Theory of Probability — MIT Lecture Notes, 1992 Edition"
pages: "113–142"
---

# Exercises for Chapter IV: Random Variables

**1.** The thirteen diamonds are taken from a deck of cards and are thoroughly shuffled. One diamond is drawn at random and scored as follows: two through ten score as their rank, face cards score ten and the ace scores eleven. Let $S$ be the score. Describe the sample space and probability measure used in this problem. Write out $S$ explicitly as a function on the sample space. Write out the probability measure $P$ explicitly as a function. Do $S$ and $P$ have the same domain?

**2.** In San Francisco, a drunk leaves a bar and every 10 seconds staggers either one yard down the street with probability 3/4 or one yard up the street with probability 1/4. Where is the drunk after one minute? after two minutes? What is his most likely location in each case? How is the most likely location varying in time?

**3.** A machine that produces screws is subject to occasional surges in its power supply. These occur independently during each second of time with 10% probability and the machine produces one screw per second in which there is no power surge. In one version of the machine there is a fuse that shuts off the machine permanently when a power surge occurs. We wish to know how many screws the machine produces after it is turned on. Which random variable in the Bernoulli process corresponds to this question? Answer it.

**4.** Another version of the machine in exercise 3 has a temporary circuit breaker so that during a power surge the functioning of the machine is interrupted only for the second in which it occurs. We run the machine for one minute and wish to know how many screws are produced. Which random variable in the Bernoulli process corresponds to this question? Answer it.

**5.** In a bridge game the deck is thoroughly shuffled and dealt. You are dealt a hand containing four spades. How many spades was your partner dealt?

**6.** Three office workers take a coffee break. They choose one of their number at random to pay for the coffee as follows. All three flip a coin simultaneously and the one having a different outcome pays for the coffee. If all coins come up the same, they flip the coins again. How long does it take to determine who pays for the coffee?

**7.** If one has a coin with a bias $p \ne \frac{1}{2}$, one can nevertheless use it to synthesize a fair coin by the following trick. Flip the coin twice. If the two tosses come out different, we can say that we got a head if the first toss was heads and tails otherwise. If the two tosses were the same, we toss the coin two more times and proceed as above. Show that this produces a fair coin toss. How many tosses of the biased coin are required to produce one "fair toss"?

**8.\*** Given any bias $p$ between 0 and 1 and a fair coin, one can synthesize a biased coin toss with this bias as follows. Write the binary expansion of $q = 1 - p$. This is just a sequence of zeroes and ones after the decimal point (binary point?). Now start tossing the fair coin. When we get a head write down a 1 and for a tail write a 0. Compare the sequence we obtain with the binary expansion of $q$. Continue tossing until the first time that the two sequences differ. At this point we stop and record what happened on the last toss. Show that what we record is equivalent to a biased coin toss with bias $p$. How long does it take to complete such a toss? Does it depend on $p$?

## Independence

**9.** In exercise 2, is the position of the drunk after one minute independent of his position after two minutes?

**10.\*** Prove that if $X$ and $Y$ are independent random variables and if $f(x)$ and $g(y)$ are two functions, then $f(X)$ and $g(Y)$ are also independent random variables.

## Expectation

**11.** What is the distribution of $S$ in exercise 1? What is its average value?

**12.** Compute the average position of the drunk in exercise 2 after one minute and after two minutes. How is the drunk's average position changing in time? How do these questions differ from the questions asked in exercise 2?

**13.** In the game of Chuck-A-Luck, three dice are agitated in a cage shaped like an hourglass. A player may wager upon any of the outcomes 1 through 6. If precisely one die exhibits that value, the player wins at even odds, if two dice show that value, the player wins at 2 to 1 odds, and if all three dice show the player's choice, the payoff is 3 to 1. If none of the three dice show the player's choice, the player loses. Compute the expected value of the player's winnings on a bet of one dollar on "2." Is the game fair? If not, suggest payoff odds that would make the game fair.

**14.** What is the average number of dots shown by a die tossed once at random? You wish to maximize the value shown by the die. If you are allowed to throw the die a second time, when should you do so? What is the expected value shown by a die for which one is allowed one rethrowing?

**15.** James Bond is imprisoned in a cell from which there are three obvious ways to escape: an air-conditioning duct, a sewer pipe and the door (the lock of which doesn't work). The air-conditioning duct leads agent 007 on a two-hour trip whereupon he falls through a trap door onto his head, much to the amusement of his captors. The sewer pipe is similar but takes five hours to traverse (it takes longer to swim than to crawl even for James Bond). Each fall produces temporary amnesia and he is returned to the cell immediately after each fall. Assume that he always immediately chooses one of the three exits from the cell with probability 1/3. On the average how long does it take before he notices that the door is unlocked?

**16.** As new engines are coming off the assembly line in Detroit, they are tested to determine the maximum deliverable horsepower. In a lot of 50 engines, 49 deliver a maximum of 200 horsepower, while one of them doesn't work at all thereby delivering a maximum of 0 horsepower. What is the average maximum horsepower of the engines in the lot? Is the average a reasonable description of the maximum horsepower of the engines in the lot?

**17.** A gambler hits upon what seems to be a foolproof system. He begins with a one-dollar bet playing the game of black-or-red in Roulette, and each time that he loses he doubles the amount bet over the previous bet until he wins once at which point he quits. In this way he stands to recoup his losses when he finally does win, at which point he wins a net amount of one dollar. He realizes that there is a small chance that he will lose all he has (\$1023), but he considers this probability to be small enough that he can ignore it. The probability of winning on a given trial is $\frac{9}{19}$ in which case he wins an amount equal to what he originally bet, otherwise he loses his bet. What is the probability that he eventually wins? What is the probability that he loses all? What is his average net gain using this system? Is it really foolproof? Is the risk he is taking a reasonable one?

**18.** Compute the average length of a Craps game. For the rules of the game see exercise 2.20.

> **Note:** In the remaining problems of this section one will need a hand calculator. In addition, we mention the following very useful formula known as **Euler's approximation to the harmonic series:**
>
> $$1 + \frac{1}{2} + \frac{1}{3} + \cdots + \frac{1}{n} \approx \ln(n) + 0.57721\ldots$$
>
> where $\ln$ denotes the natural logarithm ($\log_e$) and $0.57721$ is known as **Euler's constant**.

**19.** A young baseball fan wants to collect a complete set of 262 baseball cards. The baseball cards are available in a completely random fashion, one per package of chewing gum, which she buys twice a day. How long on the average does it take her to get the complete set?

**20.** A super power has 262 missiles stored in well separated silos. An enemy is considering a sneak attack. However, for the attack to succeed every one of the missiles must be destroyed (the missiles are MIRVed: each has 5 independent warheads). We will consider this problem later, but for now we consider the following simple model. Assume each attacking warhead hits one of the enemy missiles with each enemy missile being equally likely to be the one that is hit. How many warheads on the average will be needed to ensure the destruction of every enemy missile?

**21.** The analysis in exercise 20 is overly optimistic for several reasons. There is a significant probability that a given warhead will hit none of the silos. Furthermore, we want not the average number of warheads required but rather the number of warheads needed to ensure with very high probability (say 99%) that all the enemy missiles have been destroyed. Compute the number of warheads needed if each attacking warhead has probability 0.75 of hitting its target. Even this is optimistic in as much as the shock waves from nuclear explosions are such that one cannot expect the various warheads converging on one target or on nearby targets to be independent. However, it gives one an idea of just how foolhardy so-called pre-emptive warfare can be.

**22.** A molecular beam is firing metal ions toward the face of a crystal. If an ion strikes an unoccupied site on the crystal, it promptly occupies that site, otherwise it bounces away and is lost. Every ion hits the crystal somewhere with each site being equally likely. If there are $10!$ crystal sites, how many ions must the beam fire at the crystal, on the average, in order to fill every site?

**23.** Guests arrive at random at a party, and the host seats them as they arrive successively one at a time around a large circular table. Twenty guests arrive, ten single men and ten single women. On the average how many of the twenty adjacent pairs around the table will consist of a man and a woman?

**24.** The host in exercise 23 invites twenty couples to a cocktail party. As the couples do not know each other, the host decides to mix his guests by assigning each man to one of the women in such a way that every possible arrangement is equally likely. How many couples on the average find themselves assigned to each other? See exercise 58.

**25.** Return to exercise III.9. How many people on the average call out their birthdays before a match is found, assuming that one is eventually found? How does it compare with the observed value?

**26.** The Polish mathematician Banach kept two matchboxes, one in each pocket. Each box initially contained $n$ matches. Whenever he wanted a match he reached into one of his pockets completely at random. When he found that the box he chose was empty, how many matches were in the other box? How many were there on the average?

**27.** Compute the average energy of the configuration in exercise III.30.

**28.** James Bernoulli proposed the following dice game. The player pays one dollar and throws a single die. He then throws a set of $n$ dice, where $n$ is the number shown by the first die. The total number of dots shown by the $n$ dice is then used to determine the payoff. If the number is less than 12 he loses the bet, if the number equals 12 his dollar is returned, while if the number exceeds 12 he receives two dollars. Find the expected number of dots shown by the $n$ dice. Is the game favorable to the player?

**29.** Nicolas Bernoulli proposed the following coin-tossing game which has since been called the **St. Petersburg paradox**. A player pays an entrance fee of $E$ rubles to the casino. A coin is then tossed until it comes up heads. If it requires $n$ tosses to get the first head, the player is paid $2^n$ rubles, for a net gain of $2^n - E$ rubles. What is the player's expected net gain? [Answer: infinite net gain no matter how large $E$ is.] The paradox arises from the fact that one is placing no limit on the resources of the casino. If the casino possesses a total of $P = 2^N$ rubles, compute the net expected gain of the player. For the game to be fair what should $E$ be? [Answer: $N + 1$ rubles.] For example, if the casino has resources of 33.55 million rubles, what entrance fee would be fair?

**30.** What is the expected duration of the St. Petersburg game for the casino mentioned at the end of exercise 29?

**31.** What is the probability that in $n$ tosses of a fair coin two heads never occur in a row, i.e. no run of 2 or more heads ever occurs?

**32.** The generalization of Chevalier de Mere's first problem (exercise II.27) is called the **problem of points**. The problem concerns a game between two players that was interrupted before its conclusion. Suppose that points are required to win the game, that player A has $N - a$ points and that player B has $N - b$ points. In a given trial A wins with probability $p$ and B with probability $q = 1 - p$. How should the stakes be divided? The problem was first solved by Montmort. Can you solve it also?

**33.** Generalize exercise 14 to produce a kind of analog, for dice throwing, of draw poker. The player throws five dice. He then has the option to choose a subset of the dice for rethrowing. This subset can be empty but cannot consist of all the dice. The process is then repeated for the rethrown dice, continuing until no more dice may be rethrown. The object is to maximize the total number of dots showing on the dice. Devise a strategy and calculate the expected outcome for this strategy. The optimal strategy will produce an expected outcome of about $24\frac{4}{9}$.

## Continuous Random Variables

**34.** A boy makes a date with his girl friend. They are to meet at some time between 6 P.M. and 7 P.M., but since both are absentminded they forget which time they had agreed upon. As a result each arrives at a random moment between 6 and 7. Each waits for 10 minutes and if the other fails to appear, he or she promptly leaves in a blue funk. What is the probability that true love prevails (at least this one evening)?

**35.** When five points are chosen uniformly at random from the interval $[1, 2]$, what is the distribution of the natural logarithm of the smallest point?

**36.** A gangster stands 10 m from an infinitely long straight wall. The gangster fires a gun horizontally in a completely random direction toward the wall. Compute the distribution of the point on the wall where the bullet hits. Do the same for the distance from the bullet to the point of the wall closest to the gangster.

**37.** A **median** of a random variable $X$ is any number $\mu$ such that

$$P(X < \mu) \le \frac{1}{2} \quad \text{and} \quad P(X \ge \mu) \ge \frac{1}{2}.$$

Prove that the median of any random variable exists. Does it have to be unique? Compute it for the gangster distribution in exercise 36 above.

**38.\*** After grading an examination, a teacher arranges the papers in order by grade. The **sample median** is the middle grade if there are an odd number of papers and is the average of the two middle grades otherwise. Give a definition of the sample median in the Uniform process and compute its distribution.

**39.** How far apart are the largest and the smallest points in the Uniform process of sampling $n$ points from $[0, a]$? We call this the **spread**. Compare the spread with the second largest order statistic, $X_{(n-1)}$.

**40.** Show that any function satisfying the four properties of a distribution function is in fact the distribution of some random variable on some sample space.

**41.\*** One can also develop a theory of **discrete order statistics**. For this the interval $[0, a]$ is replaced by the set of integers $\{1, 2, \ldots, A\}$, each of which is equally likely to be chosen, and a given integer may be chosen more than once. The formulas one gets are quite complicated. It should be clear, however, that when $A$ is large compared to $n$, the number of points chosen, we may approximate the discrete order statistics with the continuous ones. The principle that the gaps are equidistributed holds both for the discrete and for the continuous cases. Compute the distribution of the first order statistic. Note that this is an integer random variable.

**42.\*** During World War II, the Allies estimated the number of tanks that had been produced by German industry by collecting the serial numbers of abandoned tanks. There are actually two questions one can ask here. One can ask for the most likely number of tanks that have been produced, or one can ask for the most reasonable rough estimate of the number. The former question would be most appropriate if we placed a very high value on getting the exact number, nearby numbers being useless. The latter question is clearly more appropriate in the context of this problem.

To answer these questions we must rephrase them in the language of probability. Assume $n$ serial numbers have been collected, the largest of which is $X_{(n)}$. The first question should read: what is the number $A$ of tanks such that when $n$ numbers are chosen uniformly from $\{1, \ldots, A\}$ the probability that we get the actually observed values is as large as possible. The answer is $X_{(n)}$ itself. Prove this. We call this the **maximum likelihood estimator** of $A$. For the second question we want an estimate of $A$ such that if one makes many estimates of the same number $A$ by this method we will on the average be close to the correct value. We will consider this question later in exercise 52.

**43.\*** A biologist is studying organelles in a cell. The organelles in question are spheres of equal but unknown radius $r$ within a given type of cell, and they are distributed randomly throughout the cell. The biologist estimates $r$ by observing a cross-section of the cell and measuring the radii of the visible granules. Suppose that $n$ granules are observed and that the largest observed radius is $R_0$. Find the maximum likelihood estimator of $r$. The measurements $R_1, \ldots, R_n$ of the $n$ radii will not be uniformly distributed. However, the random variables $r^2 - R_1^2, \ldots, r^2 - R_n^2$ will be uniformly distributed.

**44.\*** Compute directly, without first finding densities, the joint distribution function of the two order statistics $X_{(1)}$ and $X_{(n)}$ in the Uniform process.

**45.\*** Suppose that $X_1, X_2, \ldots, X_n$ are independent uniformly distributed random variables on the intervals $[0, a_1], \ldots, [0, a_n]$ respectively. Compute the densities and the joint densities of the order statistics $X_{(1)} \le X_{(2)} \le \cdots \le X_{(n)}$.

**46.\*** In exercise 45 above, compute the distributions of the gaps.

## Expectations of Continuous Random Variables

**47.** Compute the average value of the natural logarithm of the smallest point among five chosen uniformly from $[1, 2]$. Is this the same as the natural logarithm of the average value of the smallest point? Explain this. See exercise 35.

**48.** Compute the average of the median of the set of order statistics. See exercise 38.

**49.** Compute the average values of the random variables in exercise 36 (the gangster distributions).

**50.** An enzyme randomly breaks each of 24 identical (and very long) DNA molecules into two pieces. How long is the shortest piece produced? What is the average length of the shortest piece?

**51.** Shuffle a deck of cards and turn up cards one at a time until the first spade appears. How many cards including the spade do we expose on the average? (Answer: $\frac{53}{14} = 3.786$.) More generally if we are looking for one of $n$ cards in the deck, how many cards must we expose on the average until we find one of them? (Answer: $\frac{53}{n+1}$.)

**52.\*** Return to exercise 42. To answer the second question we require a random variable with the property that its expectation is $A$. The maximum likelihood estimator will not do because $E(X_{(n)}) \ne A$. What should one use? [Answer: $\frac{n+1}{n} X_{(n)}$.]

Consider next the corresponding question for exercise 43. The situation is now more complicated because the observed radii are not uniformly distributed. Find a random variable $R$ for this problem such that $E(R) = r$.

**53.\*** A long DNA molecule is broken into $N$ pieces. Find the average length of the $i^{\text{th}}$ longest piece produced, $1 \le i \le N$. Use probabilistic reasoning as follows. Let $n = N - 1$ so that our model is the Uniform process of sampling $n$ points from $[0, a]$, where $a$ is the length of the DNA molecule. The problem is to compute the expectations of $L_{(1)}, L_{(2)}, \ldots, L_{(n+1)}$; i.e. of the order statistics of the gaps. Here is how to compute $L_{(1)}$. First find $P(L_{(1)} > t)$. Now $(L_{(1)} > t)$ is the event $(L_1 > t) \cap (L_2 > t) \cap \cdots \cap (L_{n+1} > t)$. When this event occurs we can remove a subsegment of length $t$ from each of the gaps. The resulting process is the Uniform process of sampling $n$ points from $[0, a - (n+1)t]$. Geometrically the event $(L_{(1)} > t)$ is an $n$-dimensional cube having side of length $a - (n+1)t$. Thus $P(L_{(1)} > t) = \left(\frac{a - (n+1)t}{a}\right)^n$. Therefore

$$\text{dens}(L_{(1)} = t) = n(n+1) \frac{(a - (n+1)t)^{n-1}}{a^n}.$$

It is now easy to calculate $E(L_{(1)})$. [Answer: $\frac{a}{(n+1)^2}$.]

Similarly to compute $L_{(2)}$ we simply note that when we remove a subsegment of length $L_{(1)}$ from each gap (which we can do since $L_{(1)}$ is the smallest gap), what remains is the Uniform process of sampling $n - 1$ points from $[0, a - (n+1)L_{(1)}]$. Moreover, $L_{(2)}$ is the sum of $L_{(1)}$ and the length of the smallest gap in this smaller process. This gives:

$$E(L_{(2)}) = E(L_{(1)}) + E\!\left(\frac{a - (n+1)L_{(1)}}{n^2}\right) = \frac{a}{(n+1)} \left(\frac{1}{n+1} + \frac{1}{n}\right).$$

Continuing by induction we get $E(L_{(i)})$ for all $i$. [Answer:

$$E(L_{(i)}) = \frac{a}{n+1}\left(\frac{1}{n+1} + \frac{1}{n} + \cdots + \frac{1}{n+2-i}\right).]$$

Although the above reasoning is not, strictly speaking, rigorous, we will show how to make it completely rigorous in Chapter V. See exercise V.24.

**54.\*** A biologist allows an enzyme to break a DNA molecule into 10 pieces. The original molecule was 10,000 base pairs long. Upon examining the pieces, the biologist finds that the smallest is only 10 base pairs long! How probable is it that the smallest of 10 pieces could be this short or shorter? Use the results of exercise 53. Does the biologist have a case for believing that the enzyme attacked the DNA molecule in a non-random fashion? [Answer: 8.6%; the event is not at all surprising.]

## The Inclusion-Exclusion Principle

**55.** A gambler is playing a sequence of games. For each trial he can choose to bet either on heads or on tails of a toss of a fair coin. If he bets on heads he gains or loses \$1 depending on whether the coin shows heads or tails respectively. Similarly if he bets on tails he gains or loses \$2 if the coin shows tails or heads respectively. In each trial the gambler chooses one or the other bet at random betting on heads with probability $p$. Let $A$ be the event that he bets on heads and let $B$ be the event that the coin shows heads. Write his net gain in one trial using indicators. [Answer: $I_A I_B - I_A I_{B^c} + 2I_{A^c} I_{B^c} - 2I_{A^c} I_B$.]

**56.** The President of the U.S. holds frequent news conferences. The journalists who attend these conferences are usually the same group, more or less. Let us suppose that in the first two years of his term the President answers 400 questions put to him by the 100 regular journalists. During this time 4 of the journalists have never been accorded recognition. These four get together and complain that they are being discriminated against, arguing that the probability that none of them was ever recognized is only $8 \times 10^{-8}$. On the other hand, the President's Press Secretary argues that the probability for four or more of the journalists to be ignored is really about 11%, which is not significant evidence for discrimination. Who is right? Formulate the two models being used and calculate the required probabilities.

**57.** In the game of Treize, popular in seventeenth century France, 13 balls labeled from 1 through 13 were placed in an urn and drawn out one at a time at random without replacement. The players bet on the waiting time until either the $n^{\text{th}}$ ball drawn was labeled $n$ or else the urn was emptied. Compute the distribution of this waiting time. Generalize to $N$ balls.

**58.** An obvious modification of the game of Treize would be to allow players to bet on the number of times that the $n^{\text{th}}$ ball drawn was labeled $n$. Compute the distribution of this number. Generalize to $N$ balls. What is the average number of matches?

**59.** A sociologist claims that he can determine a person's profession by a single glance. A psychologist decides to test his claim. She makes a list of 13 professions and chooses photographs (all in a standard pose) of 13 individuals one in each profession. She then asks the sociologist to match the photos with professions. The sociologist identifies only 5 correctly. What do you think of his claim? Note that this exercise is closely related to exercise 58.

**60.\*** Prove the inclusion-exclusion principle for max and min.

> Hint: $|x - c|^+ = x - c$, provided $c < x$.

**61.\*** Return to the molecular beam in exercise 22. Assume the beam fires $10^{14}$ ions per second. Compute the distribution of the waiting time until the crystal is totally covered. Give a formula. Don't try to evaluate it. In exercise VI.32 we will show how to compute an accurate approximation for the value of this expression.

Do the same computation as above for the baseball fan problem (exercise 19) and for the pre-emptive nuclear attack problem (exercise 20).

**62.\*** In a physical configuration there are $b$ bosons, each in one of $N$ states. Compute the distribution of the number of filled states (i.e. the number of states having one or more bosons).

**63.\*** The standard card deck used by ESP experimenters is called the **Zener deck**. It has twenty-five cards, five each of five kinds. A typical test consists of the experimenter in one room and the subject in another. The experimenter shuffles the deck thoroughly and then turns the cards over one at a time at a fixed rate. Simultaneously, the subject is trying to perceive the sequence of cards. In order to test whether the subject's perceived sequence could have been simply a random guess, we must calculate the distribution of the number of matches occurring in a random permutation of the deck relative to some standard ordering of the deck.

**64.\*** In an ancient kingdom the new monarch was required to choose his queen by the following custom. One hundred prospective candidates are chosen from the kingdom and once a day for one hundred days one of the candidates chosen at random was presented to the monarch. The monarch had the right to accept or reject each candidate on the day of her presentation. When a given candidate is rejected she immediately gets married, and so the monarch cannot change his mind. Assume that the preferences of the monarch can be expressed in a linear order (from the best to the worst) and that the monarch wants the best candidate, second best won't do. What strategy should he employ? What is the probability that he succeeds in his quest for perfection?

Suppose that instead of simply ranking the candidates, the monarch rates each of them on a 0 to 10 scale, i.e. using some sort of objective criteria, he computes a real number between 0 and 10 for each. Assume that the ratings are uniformly distributed on $[0, 10]$. Again the monarch wants the best candidate among the 100. What strategy should he employ now? What is the probability of success?

---

# Answers to Selected Exercises

**1.** A sample space consists of two kinds of data: a set of sample points $\Omega$ and a distinguished collection of subsets called events. In this case $\Omega$ is the set of all placements of one ball into one of thirteen boxes (the diamonds). For simplicity one may regard the sample points $\Omega$ as being the cards themselves. Thus:

$$\Omega = \{2\diamondsuit, 3\diamondsuit, 4\diamondsuit, 5\diamondsuit, 6\diamondsuit, 7\diamondsuit, 8\diamondsuit, 9\diamondsuit, 10\diamondsuit, J\diamondsuit, Q\diamondsuit, K\diamondsuit, A\diamondsuit\}.$$

The collection of events is $\mathcal{E}$, the collection of all subsets of $\Omega$. There are a total of $2^{13} = 8{,}192$ events in $\mathcal{E}$. Some examples:

| Ordinary description | Mathematical description |
|---|---|
| "A face card is drawn." | $\{J\diamondsuit, Q\diamondsuit, K\diamondsuit\}$ |
| "An even numbered card is drawn." | $\{2\diamondsuit, 4\diamondsuit, 6\diamondsuit, 8\diamondsuit, 10\diamondsuit\}$ |
| "A five of diamonds is drawn." | $\{5\diamondsuit\}$ |
| "Nothing is drawn." | $\emptyset$ |
| "Something is drawn." | $\Omega$ |
| "A ten-point card is drawn." | $\{10\diamondsuit, J\diamondsuit, Q\diamondsuit, K\diamondsuit\}$ |

The probability measure $P$ implied by the phrase "thoroughly shuffled" is the "equally likely probability." It means that each card is as likely to be drawn as any other card.

The random variable $S$ and the probability measure $P$ are both functions from the mathematical point of view. They are, however, defined on completely different domains and mean very different things. The domain of $S$ is the sample space $\Omega$. Explicitly it has these values:

| sample point | $2\diamondsuit$ | $3\diamondsuit$ | $4\diamondsuit$ | $5\diamondsuit$ | $6\diamondsuit$ | $7\diamondsuit$ | $8\diamondsuit$ | $9\diamondsuit$ | $10\diamondsuit$ | $J\diamondsuit$ | $Q\diamondsuit$ | $K\diamondsuit$ | $A\diamondsuit$ |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| value of $S$ | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 10 | 10 | 10 | 11 |

The domain of $P$, on the other hand, is $\mathcal{E}$: it is defined on all 8,192 events. Some examples:

| Probabilistic question | Answer |
|---|---|
| How probable is drawing a face card? | $P(\{J\diamondsuit, Q\diamondsuit, K\diamondsuit\}) = \frac{3}{13}$ |
| How probable is drawing an even card? | $P(\{2\diamondsuit, 4\diamondsuit, 6\diamondsuit, 8\diamondsuit, 10\diamondsuit\}) = \frac{5}{13}$ |
| How probable is it to draw the $5\diamondsuit$? | $P(\{5\diamondsuit\}) = \frac{1}{13}$ |
| How probable is drawing nothing? | $P(\emptyset) = 0$ |
| How probable is drawing something? | $P(\Omega) = 1$ |
| How probable is it to score 10 points? | $P(\{10\diamondsuit, J\diamondsuit, Q\diamondsuit, K\diamondsuit\}) = \frac{4}{13}$ |

**2.** The drunk executes a nonsymmetric random walk. The probability distribution after 6 steps (one minute) is $P(S'_6 = x) = \binom{6}{\frac{6+x}{2}} \left(\frac{1}{4}\right)^{\frac{6+x}{2}} \left(\frac{3}{4}\right)^{\frac{6-x}{2}}$, where $x$ is measured in yards and "up" the street is the positive $x$-direction. Using a hand calculator one easily computes:

| $x$ | $P(S'_6 = x)$ | $P(S'_{12} = x)$ |
|---|---|---|
| $+12$ | 0 | $5.96 \times 10^{-8}$ |
| $+10$ | 0 | $2.15 \times 10^{-6}$ |
| $+8$ | 0 | $3.54 \times 10^{-5}$ |
| $+6$ | $2.44 \times 10^{-4}$ | $3.54 \times 10^{-4}$ |
| $+4$ | $4.39 \times 10^{-3}$ | $2.39 \times 10^{-3}$ |
| $+2$ | 0.0330 | 0.0115 |
| $0$ | 0.1318 | 0.0401 |
| $-2$ | 0.2966 | 0.1032 |
| $-4$ | 0.3560 | 0.1936 |
| $-6$ | 0.1780 | 0.2581 |
| $-8$ | 0 | 0.2323 |
| $-10$ | 0 | 0.1267 |
| $-12$ | 0 | 0.0317 |

The most likely location after one minute is 4 yards down the street, and after two minutes it is 6 yards down the street. The most likely location is moving down the street at a rate of roughly 3 yards per minute. Note, however, that the probability of the drunk actually being at the most likely position is steadily declining in time.

**9.** Intuitively the position of the drunk after one minute certainly influences his position after two minutes, but let's check this. For $S'_6$ and $S'_{12}$ to be independent we must have

$$(*) \quad P\!\left((S'_6 = x_1) \cap (S'_{12} = x_2)\right) = P(S'_6 = x_1) P(S'_{12} = x_2)$$

for all positions $x_1$ and $x_2$. For example, let $x_1 = -6$ and $x_2 = +12$. Clearly if the drunk is 6 yards down the street after one minute, he will not be able to reach a position 12 yards up the street in the next minute. Thus $(S'_6 = -6) \cap (S'_{12} = 12) = \emptyset$, hence $P\!\left((S'_6 = -6) \cap (S'_{12} = 12)\right) = 0$. But both $P(S'_6 = -6)$ and $P(S'_{12} = 12)$ are nonzero. This contradicts ($*$).

**11.** In exercise 1, $S$ takes values from 2 to 11. The probability distribution is:

| $s$ | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 |
|---|---|---|---|---|---|---|---|---|---|---|
| $P(S = s)$ | $\frac{1}{13}$ | $\frac{1}{13}$ | $\frac{1}{13}$ | $\frac{1}{13}$ | $\frac{1}{13}$ | $\frac{1}{13}$ | $\frac{1}{13}$ | $\frac{1}{13}$ | $\frac{4}{13}$ | $\frac{1}{13}$ |

The expectation is:

$$E(S) = 2 \cdot \frac{1}{13} + 3 \cdot \frac{1}{13} + \cdots + 9 \cdot \frac{1}{13} + 10 \cdot \frac{4}{13} + 11 \cdot \frac{1}{13} = 7.$$

Note that the average score is very different from the most likely score: 10.

**12.** We first compute the expectations of $X'_n$ and $S'_n$ in the Bernoulli process random walk:

$$E(X'_n) = 1 \cdot p + (-1) \cdot q = p - q$$

$$E(S'_n) = E(X'_1 + X'_2 + \cdots + X'_n) = E(X'_1) + E(X'_2) + \cdots + E(X'_n) = n(p - q).$$

In exercise 2, $p = \frac{1}{4}$ and $q = \frac{3}{4}$ so the average position of the drunk after $n$ steps is $n(p - q) = -\frac{n}{2}$. After one minute this is 3 yards down the street, and after two minutes this is 6 yards down the street. The average position is moving exactly 3 yards/min down the street.

In general, the average position is not the same as the most likely position. A more important point is that the answer to the question "where is the drunk after one minute?" is the whole probability distribution of $S'_6$. It is from this answer that one may derive such information as the most likely location and the average position.

**18.** Let $L$ be the length of a Craps game. The game ends after only one roll if 2, 3, 7, 11, or 12 are rolled. These have probability $1/3$ so $P(L = 1) = 1/3$. For later rolls the length depends on the point. If the point has probability $p$ of being rolled during a single roll, then the game will last $n$ rolls with this point with probability

$$p \cdot (1 - p - \tfrac{1}{6})^{n-2} \cdot (p + \tfrac{1}{6}),$$

where the first $p$ is for "getting" the point and the last $(p + \frac{1}{6})$ is for ending the game at the $n^{\text{th}}$ roll. Let $r = (1 - p - \frac{1}{6})$. Using the trick from Chapter 3:

$$\sum_{n=2}^{\infty} n r^{n-2} = \frac{2r - r^2}{(1-r)^2} = \frac{r(2-r)}{(1-r)^2}.$$

Finally we must sum over all six possible points. The average length is:

$$E(L) = \frac{1}{3} + \text{(contributions from each point)} = \frac{557}{165} = 3.3758\ldots$$

**25.** Let $B_n$ be the number of students in a classroom of $n$ students who must call out their birthdays before a match is found. We compute $P(B_n > b)$ by counting. The sample space $\Omega$ is the set of all placements of $n$ balls into 365 boxes. For a placement to be in $(B_n > b)$ it must have the first $b$ balls placed in $b$ distinct boxes and the remaining $n - b$ balls placed (arbitrarily) in the remaining $365 - b$ boxes. Hence

$$P(B_n > b) = \frac{(365)_b \cdot (365-b)^{n-b}}{(365)^n}.$$

Using Stirling's formula, if the class had $n = 80$ students, then with $c = \frac{b}{365} \approx 0.218$:

$$P(B_{80} > 12) \approx e^{-12(0.218)} = e^{-2.616} = 0.07.$$

So there is only a 7% chance that more than 12 students in a class of 80 will be able to call out their birthdays without having a match. The average value of $B_n$ for $n = 80$ is about 5. The median is between 3 and 4.

**26.** Let $V_n$ be the waiting time for either $n + 1$ heads or $n + 1$ tails to occur. This is the time when Banach first discovers an empty matchbox. The number of matches in the other box is $b$ with probability

$$P(M_n = b) = \binom{2n-b}{n} \frac{1}{2^{2n-b}}.$$

The average number of matches in the other box is:

$$E(M_n) = (2n+1)\binom{2n}{n}\frac{1}{2^{2n}} - 1.$$

Using Stirling's formula: $E(M_n) \approx 2\sqrt{\frac{n}{\pi}} - 1$. For $n = 30$, this gives $E(M_n) = 5.29$.

**27.** The actual probability of a particle being in a state having energy $E$ is $\frac{e^{-\beta E}}{Z}$ where $\beta$ is proportional to the inverse of the temperature of the system. The constant $Z$ is called the **partition function**. The expected energy is $-\frac{d}{d\beta}\ln Z$.

| Type of statistic | Average energy |
|---|---|
| Maxwell-Boltzmann | 2.850 |
| Fermi-Dirac | 3.039 |
| Bose-Einstein | 2.737 |

**35.** Let $X_1, X_2, \ldots, X_5$ be five points chosen uniformly and independently from $[1, 2]$. The distribution of $\ln(X_{(1)})$ is:

$$P(\ln(X_{(1)}) \le t) = \begin{cases} 0 & \text{if } t < 0 \\ 1 - (2 - e^t)^5 & \text{if } 0 \le t \le \ln(2) \\ 1 & \text{if } t > \ln(2) \end{cases}$$

Differentiating, we find the density:

$$\text{dens}(\ln(X_{(1)}) = t) = \begin{cases} 5(2 - e^t)^4 e^t & \text{if } 0 < t < \ln(2) \\ 0 & \text{otherwise} \end{cases}$$

**36.** We measure distance along the wall in meters with the zero point being the point of the wall closest to the gangster. The gangster fires in a random direction $\theta$ uniformly chosen from $(-\frac{\pi}{2}, \frac{\pi}{2})$. The bullet hits the wall at the point $Y = 10 \tan \theta$. Thus the distribution is

$$P(Y \le y) = \frac{1}{2} + \frac{1}{\pi}\arctan\!\left(\frac{y}{10}\right).$$

Differentiating, the density of $Y$ is

$$\text{dens}(Y = y) = \frac{10}{\pi(100 + y^2)}.$$

The bullet hits the wall on the average at $E(Y) = \int_{-\infty}^{\infty} \frac{100y}{\pi(100 + y^2)}\,dy$, provided this integral converges. But $\int_0^b \frac{y\,dy}{100 + y^2} = \frac{1}{2}\ln(100 + b^2) - \frac{1}{2}\ln(100) \to \infty$ as $b \to \infty$. Therefore, **the gangster distribution has no average value!** This is quite counter to one's intuitive belief that $E(Y)$ should be 0.

**37.** The distribution function $F(x) = P(X \le x)$ is increasing with $\lim_{x \to -\infty} F(x) = 0$ and $\lim_{x \to \infty} F(x) = 1$. Therefore there exists a real number $\mu$ such that $F(x) \le \frac{1}{2}$ for all $x < \mu$ and $F(x) \ge \frac{1}{2}$ for all $x > \mu$. We conclude that $\mu$ is a median of $X$.

The median need not be unique. For example, let $X$ take values $\pm 1$ with equal probability. Then any number $\mu$ in $[-1, 1]$ is a median. The gangster distribution has no mean, but it does have a median: zero. The fact that the median exists even when a mean may not makes it a more useful statistical quantity in many applications.

**39.** In terms of order statistics, the spread $S = X_{(n)} - X_{(1)} = a - (L_{(1)} + L_{(n+1)})$. The density of the spread is

$$\text{dens}(S = s) = \frac{n(n-1)}{a^n}(a - s) s^{n-2},$$

which is the same as the density of the $(n-1)^{\text{st}}$ order statistic! The reason for this surprising fact is that the gaps $L_i$ are not only equidistributed but in fact are **exchangeable**. See section V.7.

**40.** Let $F(t)$ be a function satisfying the four properties of a distribution function. Let the sample space $\Omega$ be the real line $(-\infty, \infty)$. The events are all those obtainable by Boolean operations from the elementary events $(a, b]$. We define the probability measure $P$ on elementary events by $P((a, b]) = F(b) - F(a)$. The four properties of a distribution function ensure that $P$ is a probability measure. Finally, we define a random variable on $\Omega$ by $X(\omega) = \omega$ for all $\omega$. Clearly $F(t)$ is the distribution function of $X$.

**50.** The shortest piece produced is $L = \min(L_{(1)}, L_{(n+1)})$. Its distribution is $P(L \le l) = 1 - \frac{1}{a^n}(a - 2l)^n$, and its density is

$$\text{dens}(L = l) = \frac{2n(a - 2l)^{n-1}}{a^n}, \quad 0 \le l < \frac{a}{2}.$$

The expectation is $E(L) = \frac{a}{2(n+1)}$. For our special case with 24 molecules, the average size of the smallest piece produced is $E(L) = \frac{a}{50}$.
