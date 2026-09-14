---
title: "Chapter VII: The Poisson Process — Exercises"
author: "Gian-Carlo Rota"
edition: "1992"
chapter_number: 7
part: "Exercises"
---

# Exercises for Chapter VII: The Poisson Process

**1.** You are the captain of the Bicentennial Eagle, a spaceship that has just returned from hyperspace to ordinary space, only to encounter the debris of a recently destroyed planet. The debris consists of essentially spherical rocks 20m in radius. The destroyed planet was originally the same size as the earth, and its debris is now uniformly scattered throughout a region $10^6$ km in radius. Your maneuvering jets are temporarily out of order. If you are headed directly toward the center of the debris, what are your chances of getting all the way through the debris without a collision? Assume that your ship has a circular cross-section of radius 1m. Explain any assumptions you may be making.

**2.** At $5 \times 10^4$ km/hour how long would you have in exercise 1 to repair your maneuvering jets before your chances of a collision reach 10%? Explain precisely what you are computing in this problem.

**3.** A beam of protons is accelerated to high energy and is deflected so that it encounters a pool of liquid hydrogen. The tracks of the protons in the beam are visible in this detector, and one can easily see where a proton in the beam collides with a proton in the pool of liquid hydrogen. Describe how far a given proton travels before it collides with a proton in the pool.

**4.** There exist enzymes that attack only a certain nucleotide sequence in a chromosome. Describe a means of testing whether or not a given nucleotide sequence appears randomly in a given chromosome.

**5.** In the birthday coincidence problem (exercise II.9), the paradox comes from thinking that one is looking for another person with the same birthday as your birthday. Compute the distribution of the number of persons chosen at random you must ask until you find one with the same birthday as yours. What kind of distribution is it? Find an exponential distribution that approximates it. Compute the average value of this random variable as well as the number of persons one must ask in order to have a 50% chance of finding one with your birthday.

**6.** How does the answer to exercise 5 change if we include February 29th as a possible birth date?

**7.** Roughly speaking, the relationship between the birthday problem in exercise 5 and the birthday coincidence problem in exercise II.9 is that in either case we have a certain number of pairs of persons from which we look for a birthday coincidence, but that in the former problem we consider a collection of pairs all of which have one given person in common whereas in the latter we consider all pairs from a set of persons. For example we saw that in a class of 23 students there is about a 50% chance of a birthday coincidence. Such a class has $\binom{23}{2} = 253$ pairs of students. Compare this with the last part of your answer to exercise 5.

**8.** In a large class the students call out their birthdays until someone in the class finds that his or her birthday has been called. Technically this is not a random variable since it is possible that no pair of students have the same birthday. However, if we assume that a match will eventually be found, then it is a random variable which is approximately exponentially distributed. Find the parameter for this exponential distribution, and compute its mean. Compare with exercise III.25.

**9.** A sociobiologist wishes to test whether or not birds of a certain species practice territorial spacing of their nest locations. Compute the distribution of the distance of a given nest from its nearest neighbor. Use this to formulate a statistical test.

**10.** Let $Y_1, Y_2, \ldots, Y_n$ be $n$ independent, exponentially distributed random variables, each with parameter $\alpha$. Compute the order statistics $Y_{(1)} \leq Y_{(2)} \leq \cdots \leq Y_{(n)}$ of these random variables. One can do this in two ways. Either change variables and convert to a Uniform process (see section V) or use a modification of the reasoning used in exercise III.53 which was made rigorous in section V.7 ("needles on a stick problem").

**11.\*** Compute the expectations $E(Y_{(i)})$ in exercise 10 above. Compare with the expectations of the order statistics of the gaps in the Uniform process (exercise III.53).

**12.\*** (Feller) Three persons A, B and C arrive at a post office simultaneously. There are two counters, and these are taken immediately by A and B. Assume the service time of a given individual is exponentially distributed with parameter $\alpha$. Assume also that different individuals have independent service times. Now C will take whichever of the two counters becomes free first. Use the answers to exercises 10 and 11 above (if necessary) to answer the following questions:

(a) What is the probability that C is the last to leave the post office? [Answer: $\frac{1}{2}$]

(b) What is the distribution of the total time (i.e. both waiting time and service time) spent by C in the post office? How long does C spend on the average? [Answer: $\frac{3}{2\alpha}$]

(c) When does the last of the three persons leave the post office? When on the average? [Answer: $\frac{2}{\alpha}$]

**13.\*** (Bad luck) Two persons A and B arrive simultaneously at the post office in exercise 12 above. They find that one person is being served at each of the two counters. Of course, A waits for one counter to become free and B waits for the other. Assume that line changing is forbidden. What is the distribution of the ratio between A's waiting time and B's waiting time? What is its average value? [Answer: infinity] Thus we have a situation where both A and B on the average experience bad luck indeed. How can this be?

**14.\*** A pedestrian wishes to cross a busy street. The pedestrian can cross the street only if there is a pause (gap) in traffic of size $b$. Assume that the vehicles pass the place where the pedestrian is standing with a Poisson distribution having intensity $\alpha$. Assume that when no cars are present, the pedestrian can cross the street in $c$ units of time, where $c < b$. How long will it take for the pedestrian to cross the street (including the time spent waiting for a pause in traffic)? Note that this is a waiting time, but it is not continuous. There is a positive probability for the waiting time to be exactly $b$. However, whenever a car goes by one must "start again" to wait for a pause in traffic. For this reason such a waiting time is called a **renewal time**.

### The Poisson Distribution

**15.** A textbook has 250 pages and as many misprints. If you assume that the misprints are uniformly distributed, would you be surprised to find 4 misprints on one page? 8 misprints on one page? Why and/or why not?

**16.** Bortkiewicz in 1898 published the number of deaths from horse kicks among Prussian cavalry soldiers from 1875 to 1894. The observed frequencies were the following:

| Number of deaths | Frequency |
|---|---|
| 0 | 109 |
| 1 | 65 |
| 2 | 22 |
| 3 | 3 |
| 4 | 1 |
| 5 or more | 0 |

Fit these data with a Poisson distribution. The parameter for the Poisson distribution can be estimated by computing the sample mean of the number of deaths.

**17.** On the average a secretary makes two errors per page. What is the probability that he makes five or more errors on the next page he types? A random page of this secretary's work is examined and found to have five errors. Would this be sufficient evidence for believing (at the 5% significance level) that he makes more than two errors per page on the average?

**18.** The IRS finds that numerical mistakes occur on the average in 1% of all tax returns. A random sample of 1000 forms is chosen from the forms submitted by taxpayers in one particular tax bracket. Only three are found to have a numerical mistake. Is there reason to believe (use a 5% significance level) that taxpayers in that bracket are more careful in preparing their tax returns than the average taxpayer?

**19.** A small insurance company sells just one kind of insurance. Every year they charge each client \$100, and each client receives \$1,000,000 with probability $5 \times 10^{-5}$. The company has 20,000 clients and assets of only \$1,000,000. What is the probability that the company will go bankrupt in a given year? [Answer: 0.019]

**20.** In a racially integrated school, 15% of the students are non-white. What is the probability that a randomly chosen class of 20 students is all-white?

**21.** The manager of a pharmacy orders aspirin once each week. Experience shows that 50 bottles of aspirin are sold each week on the average. If he wants to minimize his stock of aspirin but also wants to be 80% confident that he will not run out in a given week, how much aspirin should he have on hand at the beginning of each week? Use a Poisson model and a normal approximation. [Answer: 60 bottles]

**22.** An exterminator company claims that its insecticide will kill a given flea with probability 99.9% and a flea egg with probability 99%. If there are about 100 fleas and 100 flea eggs in a house, what is the probability that the extermination company will solve the flea problem for the house? [Answer: about 82%]

**23.** In a city of two million, a man was brought to court on a charge of larceny. Although the prosecution could not establish that the defendant was certainly the guilty party, it did establish that a number of traits were common to the defendant and to the thief. These included the make and model of his car, the color of his and his girl friend's hair, etc. The prosecution estimated the probability of each of the traits in question. Although there is very little reason to believe that such traits will be independent of one another, the court allowed the prosecutor to assume this. The prosecutor then multiplied the various probabilities and concluded that the chance of anyone having these traits is one in five million. The jury was duly impressed and the defendant was convicted.

The case was appealed, and the defense brought in a statistician. The statistician pointed out that the prosecutor had asked the wrong question. One should ask what the probability is that this is the guilty party beyond a reasonable doubt. The statistician computed this to be about $\frac{5}{6}$, which is not overwhelming. Calculate this probability exactly.

**24.** (Luria and Delbruck) When a bacterial culture is attacked by a bacterial virus almost all the bacteria are killed but a few resistant bacteria survive. This resistance is hereditary, but it might be due either to random, spontaneous mutations occurring before the viral attack, or to mutations directly induced by this attack. In the latter case the number of resistant bacteria in different but similar cultures should follow the Poisson distribution, but in the former case the variance should be larger than the mean since the number of resistant bacteria will depend markedly on whether a mutation occurs early or late in the life of the culture. The following numbers of resistant bacteria were found in ten samples from the same culture: 14, 15, 13, 21, 15, 14, 26, 16, 20, 13, while the following were found in ten samples from different cultures grown in similar conditions: 6, 5, 10, 8, 24, 13, 165, 15, 6, 10. Compare the mean with the variance in the two sets of observations. Which hypothesis does the experiment tend to support?

**25.** An entomologist is studying the habits of a leaf-eating caterpillar. He wishes to test whether the insects choose the leaves on which they eat in a random (Poisson) manner. Accordingly he chooses 200 leaves at random and counts the number of insects on each leaf. This is what he found:

| Number of insects per leaf | 0 | 1 | 2 | 3 | 4 or more |
|---|---|---|---|---|---|
| Number of leaves | 140 | 48 | 10 | 2 | 0 |

Does this fit a Poisson distribution? Compare with the horse kick problem (exercise 16).

**26.** A statistician looking at the data in exercise 25 above notices that it would fit a Poisson if the number of leaves having no insects on them were slightly smaller. She suggests that one should use a modified Poisson model in which some leaves have no insects on them because they are not suitable for the insect to feed on and not just because of random effects. Fit such a model to the data.

**27.** (Gosset) A sample of 400 unit volumes containing various numbers of yeast cells were examined and the number of yeast cells in each volume was counted. Here are the counts:

| Number of cells per unit volume | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 & up |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Number of unit volumes | 0 | 20 | 43 | 53 | 86 | 70 | 54 | 37 | 18 | 10 | 5 | 3 | 2 | 0 |

Compare these data with a suitable Poisson distribution.

**28.** In the fish population problem (exercise II.23 and IV.47), we were hampered by formidable computational difficulties. If we suppose that there are $n$ fish in the lake and that we have tagged 50 of them, then we can model our subsequent catch of 50 fish with a Poisson process in which $\alpha = \frac{50}{n}$, the density of tagged fish in the lake, $t = 50$, and $\lambda = \alpha t = \frac{2500}{n}$. Using a normal approximation for our Poisson distribution, the desired confidence interval in exercise IV.47 can easily be computed. Give the details of this computation.

**29.** (Mosteller and Rourke) In a series of essays called the Federalist Papers, Alexander Hamilton and James Madison discussed many of the most important political questions facing the United States at that time. Although scholars had been able to agree on the authorship of most of the Federalist Papers, there remained a small set of them which remained in dispute until recent times. The issue was finally settled by using statistical rather than the traditional scholarly methods. We will give some of the flavor of these methods in the following problem. In the actual analysis the frequency counts of many different words were compared. Suppose that the number of occurrences of the word "also" in 2000-word blocks in the writings of Hamilton and Madison are known to have approximately Poisson distributions with means 0.6 and 1.3 respectively. A 2000-word passage, known to have been written by one of them, is examined. Formulate a statistical test which will distinguish at the 10% level between whether Hamilton or Madison wrote the passage. [Answer: One can never reject the hypothesis that Madison wrote the passage, but if there are 3 or more occurrences of "also" one can reject the hypothesis that Hamilton did]

**33.\*** (The waiting time paradox) A Geiger counter is set up to examine a small radioactive sample which produces one click every hour on the average. In addition the machine has a timer which shows how long it has been since the last click or since the timer has last been reset manually. The Geiger counter has been running unobserved for some days when you first observe it. At this time you push the reset button but at the same time you write down what the timer indicated (call this $T_0$). You then wait until the next time the Geiger counter clicks, and you also write down what the timer indicates when this happens (call this $T_1$).

There are two ways to compute the expectations of $T_0$ and $T_1$ above. First, $T_0 + T_1$ is the total waiting time between two successive clicks of the Geiger counter so that $E(T_0 + T_1)$ should be one hour. Since your arrival may be regarded as randomly dividing in two the total time between the two successive clicks, $E(T_0) = E(T_1)$ and hence $E(T_0)$ and $E(T_1)$ both should be half an hour. The second analysis begins by noting that the memorylessness of the exponential distribution is such that $T_1$ is itself exponentially distributed with mean 1 hour. Therefore whatever the distribution of $T_0$ is, we have $E(T_1) = 1$ hour and $E(T_0 + T_1) > 1$ hour. Thus the two analyses disagree. Compute the actual distributions of $T_0$ and $T_1$, and find their expectations. Which of the above analyses is correct? Refer to the "reference point paradox" in section III.3, and formulate an explanation of the waiting time paradox.

**34.\*** Write a program which simulates a Poisson process on a computer. Assume that your computer program has a pseudo-random number generator which produces an (independent) uniformly distributed pseudo-random number between 0 and 1 with each call. We suggest that you use a change of variables. See section V.8. Use your program to test the two explanations of the waiting time problem in exercise 33 above. Assume that you arrive at the Geiger counter exactly 100 hours after it has been turned on. Run the same experiment 20 times and tabulate your results.

**35.\*** Prove that all the relations among the elementary Poisson events are obtainable from those given in section VII.3.

**36.\*** Prove that the gaps of the Poisson process are independent exponentially distributed random variables with parameter $\alpha$.

### Randomized and Compound Processes

**37.** A man sitting on his front porch is watching the traffic go by. Some of the vehicles are cars and some are trucks. Assume that the cars and trucks pass by with independent Poisson distributions of intensities $\alpha$ and $\beta$ for cars and trucks respectively. What is the probability that a run of 10 cars pass by before a run of 10 trucks do so?

**38.** In the same situation as exercise 37, suppose that the man first sits on his porch at time $t_1$ and later leaves at time $t_2 > t_1$. What is the probability that during this interval of time no run of two cars (or trucks) pass by (i.e. the vehicles he sees are alternately cars and trucks)?

**39.** The cabs carrying passengers to an airport terminal arrive with Poisson distribution having intensity $\alpha$. Assume for simplicity that each cab brings exactly one passenger, who is either a man or a woman with probabilities $p$ and $q = 1 - p$ respectively. What is the distribution of $N_w(t)$, the number of women arriving during the time interval $[0,t]$? What assumptions must one make to answer this question?

**40.** In a telephone network it is known that phone calls are made with Poisson distribution having intensity $\alpha$. It is also found that the length of time of any given phone conversation is exponentially distributed with parameter $\beta$. The phone company bills customers affinely; that is, a phone call lasting $t$ units of time costs $c + kt$ dollars. How much money does the company receive during a billing period $[t_1, t_2)$? The billing period of a conversation is determined by when it begins.

**41.** Compute the number of ways that $k$ balls can be placed in 5 boxes so that if the third box has an odd number of balls, then the fifth box has a multiple of 7 balls in it.

**42.** The bus stop problem (exercise III.9) is more properly modeled using a randomized Bernoulli process. Since we do not know the bus schedule it seems reasonable to suppose that the probability of the man going uptown will be $p$, where $p$ is chosen uniformly from $[0,1]$. In this process are the individual Bernoulli trials independent events?

**43.** Return to the jailer paradox (exercise VI.5). Model this problem with a randomized Bernoulli process in which the bias $p$ is replaced by a random variable $P$ whose density is $f(p)$. Using the continuous law of alternatives, give an expression for the conditional probability that A is to be set free given that the jailer says that B will go free. Compute this exactly for the special case for which the bias $P$ is uniformly distributed on $[0,1]$.

**44.\*** In the jailer paradox (exercise VI.5) one can give a very quick argument that what the jailer says does convey information to the prisoner. Suppose that the prisoner makes his plea to a sequence of jailers (say one for each shift). If each jailer gave the same answer, the prisoner would have reason to feel confident. If two jailers gave different answers,... Model this process using a randomized Bernoulli process as in exercise 43 above. Assume all the jailers have the same bias. Compute A's chance if $n$ jailers say that B will go free.

**45.\*** Suppose that a suspension of cells contains on the average $\lambda$ cells per cm$^3$ so that the number of cells in 1 cm$^3$ follows a Poisson distribution with mean $\lambda$; and suppose that the probability that a cell will survive and form a visible colony is $p$, so that the number of colonies formed from a fixed number of cells follows a binomial distribution. Show that the number of colonies formed from 1 cm$^3$ of the suspension follows a Poisson distribution with mean $p\lambda$.

**46.\*** (Laplace's law of succession) Laplace stated that if an event has occurred $m$ times and failed to occur $n - m$ times in $n$ trials, then the probability that it will occur at the next trial is $\frac{m+1}{n+2}$. His result is based on a randomized Bernoulli process in which the bias $P$ is a random variable uniformly distributed on $[0,1]$. Using the continuous Bayes' law, compute the distribution of $P$ given that $m$ heads and $n - m$ tails have occurred in the first $n$ tosses of the coin in the randomized Bernoulli process. Now use the continuous law of alternatives to compute the probability that the next toss of the coin will be heads. Compare this with Laplace's law stated above. Laplace is said to have been willing to wager that if the sun has risen $n$ times in a row then it will rise again with probability $\frac{n+1}{n+2}$.

**47.\*** Using Laplace transforms compute explicitly the mean and variance of the renewal time in exercise 14 above. [Answers: $\frac{e^{\alpha b} - 1 - \alpha b}{\alpha} + c$ and $\frac{e^{2\alpha b} - 1 - 2\alpha b e^{\alpha b}}{\alpha^2}$]. If one uses the criterion that one should be able to cross the street in 2 minutes on the average (when we take $b$ and $c$ to be equal), for what value of $\alpha$ should one install a traffic light?

**48.\*** Suppose we have a molecular beam firing molecules one at a time at a small target crystal such that $10^{14}$ molecules/sec hit the crystal face. The target is a square crystal lattice having $10^{16}$ crystal sites. Each molecule is to be thought of as distinguishable, and each one strikes one of the crystal sites at random. If the site is empty, the molecule adheres to the crystal at that site. If there is already a molecule at that site, the new molecule rebounds and is lost. How long will it take for the beam to cover the surface of the target crystal? Use a Poisson model for this problem. See exercise III.22. Explicitly compute how long it takes before there is a 50% chance that the crystal is totally covered. Do the same for a 99% chance. Finally, compute the expected length of time for the crystal to be totally covered.

### Reliability Theory

**49.\*** You wish to set up an electrical link between a city A and a power station B. You must use power lines that have a fixed length equal to one-third the distance between A and B. The length of time until one given line fails is exponentially distributed, i.e. failure of a line is due to chance causes (e.g. lightning) and not due to the wearing out of the line. All lines to be used are identical. The link is used until it can no longer send power from B to A, at which time the whole apparatus is overhauled. Discuss the relative merits of each of the following three designs:

*[Three network designs]*

In each case graph the distribution of the time until failure of the given design. Compare the mean time until failure and the standard deviation of the time until failure for each design. Discuss which design is better given that the first costs $C_1$, the second $C_2$ and the third $C_3$, where $C_1 > C_2 > C_3$.

**50.\*** In a manned spacecraft there are numerous built-in redundancies because it is usually not possible to service the craft during a mission and the lives of the astronauts depend on the proper functioning of the various subsystems. Consider the following simplified example. Suppose that two separate rocket thruster systems are provided. Each has its own fuel supply. In addition a bypass is provided for moving fuel from one fuel supply to the other rocket thruster. Diagrammatically the system looks like this:

- Fuel Supply #1 $\to$ Rocket #1
- Bypass connecting the two fuel supplies
- Fuel Supply #2 $\to$ Rocket #2

Assume that the time until failure of each of the above 5 subsystems is exponentially distributed with mean $\alpha$ for each of the fuel supplies, $\beta$ for each of the rockets and $\gamma$ for the bypass. What is the distribution of the time until failure of the overall rocket thruster system? Compare it with a system in which there is no bypass. Compute the mean time until failure of the system. If $\alpha$, $\beta$ and $\gamma$ are all twice as long as the mission itself, what is the probability that the rocket thruster works throughout the mission?

---

## Answers to Selected Exercises

**1.** Assume you enter ordinary space at the "edge" of the debris. To get through the debris, no rocks may be in a cylindrical region $2 \times 10^6$ km long and 10 m in radius. This means no centers of rocks may be in a cylindrical region $2 \times 10^6$ km long and 30 m in radius. The volume of this region is $5.65 \times 10^{12}$ m$^3$. The density of the centers of rocks in the whole spherical region is

$$\frac{\text{number of rocks}}{\text{volume of region}} = \frac{\text{volume of original planet}/\text{volume of one rock}}{\text{volume of region}} = \frac{\frac{4}{3}\pi(6.4 \times 10^6\text{m})^3 / \frac{4}{3}\pi(20\text{m})^3}{\frac{4}{3}\pi(1 \times 10^9\text{m})^3}$$

$$= 7.82 \times 10^{-12} \text{ rocks/m}^3.$$

We regard the encountering of a rock as a "waiting volume" problem. Thus the probability of finding no rocks in a region of volume $v$ is $e^{-\alpha v}$, where $\alpha$ is the density of rocks. In this case we compute the probability of avoiding a collision to be:

$$e^{-(7.82 \times 10^{-12} \text{ rocks/m}^3)(5.65 \times 10^{12}\text{ m}^3)} = e^{-44.2} = 6.38 \times 10^{-20}.$$

Things look bleak for the Bicentennial Eagle.

**2.** Following the above line of reasoning, the chances of a collision reach 10% when $e^{-\alpha v} = 0.90$ or when $\alpha v = 0.1054$. This gives $v = 1.347 \times 10^{10}$ m$^3$, which seems like a lot of room. It represents a cylinder of radius 30m and length $4.765 \times 10^3$ km. Unfortunately the Bicentennial Eagle is moving quite fast: $5 \times 10^4$ km/hour. It will cover this distance in only 5.7 minutes.

Note that we computed an unconditional probability above. If 5.7 minutes go by without a collision, then the probability of going another 5.7 minutes without a collision is again 0.9. In any case these probabilities "mount up", and we saw above that there is essentially no chance for the ship to get all the way through. We strongly advise the crew to move quickly: in only 37.6 minutes the probability of collision reaches 50%.

**3.** Let $X$ be the distance a proton travels into the pool. As in exercise 1 above, the event $(X > x)$ means that a cylindrical region of volume $\pi r^2 x$ is devoid of proton centers, where $r$ is twice the radius of a proton. Thus $P(X > x) = e^{-\pi r^2 x \alpha}$, where $\alpha$ denotes the density of protons in the pool.

Unfortunately, this reasoning assumes that protons are tiny hard spheres, a description we know is wrong. On the other hand, we may take $r$ to be the definition of the proton-proton collision radius. One can then measure $r$ experimentally. In practice one speaks of the "cross-sectional area" of a proton with respect to such a collision.

Another assumption is that the cross-sectional area of a proton does not depend on its velocity. We know that this is not true. Fortunately accelerators deliver protons in a very narrow energy range so this is not a problem. We do however have to consider that the protons lose energy (and hence slow down) in the pool. In any case, one begins to see that while there are many technical details to dispose of, nevertheless probability allows one to compute a very subtle quantity: the size of a proton.

**4.** If we assume that the nucleotide sequence occurs randomly then the uniform process is a good model, but this model is too difficult for computational purposes. However, the Poisson process is an excellent approximation when the number of such sequences in one chromosome is large (as it would be). Thus we could test randomness by allowing the enzymes to cleave the chromosome at every appropriate sequence. Then collect the fragments and compare their distribution with an exponential distribution. Of course any other tests can be devised. This is just one possible test.

**10.** Let $Y_1, Y_2, \ldots, Y_n$ be independent, exponentially distributed R.V.'s with parameter $\alpha$. Let $Y_{(1)} \leq Y_{(2)} \leq \cdots \leq Y_{(n)}$ be order statistics of the $Y_j$'s. Now it is easy to verify that if $Y$ is exponentially distributed with parameter $\alpha$, then $X = 1 - e^{-\alpha Y}$ is uniformly distributed on the interval $[0,1]$ (see section VI.8). This transformation is order-preserving: $Y_1 \leq Y_2$ if and only if $1 - e^{-\alpha Y_1} \leq 1 - e^{-\alpha Y_2}$. Thus if we set $X_j = 1 - e^{-\alpha Y_j}$, then $X_{(j)} = 1 - e^{-\alpha Y_{(j)}}$. Let $F_{(j)}(x)$ be the distribution of $X_{(j)}$. Then

$$P(Y_{(j)} \leq y) = P(1 - e^{-\alpha Y_{(j)}} \leq 1 - e^{-\alpha y}) = P(X_{(j)} \leq 1 - e^{-\alpha y}) = F_{(j)}(1 - e^{-\alpha y}).$$

So the density of $Y_{(j)}$ can be computed by the chain rule:

$$\text{dens}(Y_{(j)} = y) = F'_{(j)}(1 - e^{-\alpha y}) \cdot \alpha e^{-\alpha y}$$

$$= \alpha \frac{n!}{(j-1)!(n-j)!}(1 - e^{-\alpha y})^{j-1}(e^{-\alpha y})^{n-j+1}.$$

**14.** Let $W$ be the waiting time for the beginning of a gap of size $b$ (or more) in the Poisson process with intensity $\alpha$. If the time it takes to cross the street is $c$ (assuming no cars are present), then we want the distribution of $W + c$.

There are two obvious ways to use the law of alternatives in this problem. Either condition on the number of vehicles $N(t)$ that have passed by or on the time $T_1$ of passage of the first vehicle. As was hinted in the problem, the second method is the best one. So by the (continuous) law of alternatives:

$$P(W \leq t) = \int_0^{\infty} P(W \leq t \mid T_1 = s)\, \alpha e^{-\alpha s}\, ds.$$

Now the probability $P(W \leq t \mid T_1 = s)$ is exactly the same as $P(W \leq t - s)$ if $s < b$. This is where the "renewal" comes in: when a vehicle goes by, the pedestrian must "start over again from scratch," the previous waiting time being irrelevant. Note that if $s < b$ and $s > t$, then $P(W \leq t \mid T_1 = s) = P(W \leq t - s) = 0$ for now $t - s$ is negative. The next case to consider is that $s \geq b$. In this case, the first gap is sufficient for the pedestrian to cross, so $P(W \leq t \mid T_1 = s) = 1$. Therefore, we find that:

$$P(W \leq t) = \int_0^{\min(t,b)} P(W \leq t - s)\, \alpha e^{-\alpha s}\, ds + e^{-\alpha b}.$$

One should immediately recognize this as being a convolution. Let $G$ be the function:

$$G(s) = \begin{cases} \alpha e^{-\alpha s} & \text{if } 0 < s < b \\ 0 & \text{otherwise} \end{cases}$$

and let $F(t) = P(W \leq t)$. Then

$$F(t) = (F * G)(t) + e^{-\alpha b}.$$

This is sufficient to answer the question. But one can do a bit more. Since this is the Poisson process, it makes sense to try finding the Laplace transform of $F(t)$ rather than $F(t)$ itself. Write $\hat{F}(s)$ for the Laplace transform of $F(t)$. Then

$$\hat{F}(s) = \hat{F}(s)\hat{G}(s) + \frac{e^{-\alpha b}}{s}.$$

Hence $\hat{F}(s) = \frac{e^{-\alpha b}}{s(1 - \hat{G}(s))}$. Now

$$\hat{G}(s) = \int_0^{\infty} e^{-st}\alpha e^{-\alpha t}\, dt = \int_0^{b} \alpha e^{-(\alpha + s)t}\, dt = \frac{\alpha}{\alpha + s}(1 - e^{-(\alpha + s)b}).$$

Therefore,

$$\hat{F}(s) = \frac{(\alpha + s)e^{-\alpha b}}{s(\alpha + s) - \alpha s(1 - e^{-(\alpha + s)b})} = \frac{(\alpha + s)e^{-\alpha b}}{\alpha s e^{-(\alpha + s)b} + s^2}.$$

One could also attack this problem by conditioning on $N(t)$. This gives us

$$P(W \leq t) = 1 - P(W > t) = 1 - \sum_{n=0}^{\infty} P(W > t \mid N(t) = n)\, P(N(t) = n).$$

Now $P(W > t \mid N(t) = n)$ is the same as

$$P((L_1 < b) \cap (L_2 < b) \cap \cdots \cap (L_{n+1} < b))$$

in the Uniform process of sampling $n$ points from $[0,t]$. This is not very easy to compute because the gaps are not independent. However one can first take complements:

$$P(W > t \mid N(t) = n) = 1 - P((L_1 \geq b) \cup (L_2 \geq b) \cup \cdots \cup (L_{n+1} \geq b)).$$

Next use the inclusion-exclusion principle and the exchangeability of the gaps:

$$P(W > t \mid N(t) = n) = 1 - \binom{n+1}{1}P(L_1 \geq b) + \binom{n+1}{2}P((L_1 \geq b) \cap (L_2 \geq b))$$

$$- \cdots + (-1)^{n+1}P((L_1 \geq b) \cap \cdots \cap (L_{n+1} \geq b)).$$

Each of the probabilities on the right-hand side is computable as in the "needles on a stick" problem. One finds that:

$$P((L_1 \geq b) \cap \cdots \cap (L_j \geq b)) = \begin{cases} \left(\frac{t - jb}{t}\right)^n & \text{if } jb \leq t \\ 0 & \text{otherwise.} \end{cases}$$

Write $\delta_j$ to mean $\left(\frac{t-jb}{t}\right)^n$ if $jb \leq t$ and zero otherwise. Then

$$P(W > t \mid N(t) = n) = 1 - \binom{n+1}{1}\left(\frac{t-b}{t}\right)^n + \binom{n+1}{2}\left(\frac{t-2b}{t}\right)^n - \cdots$$

Putting this into our original formula for $P(W \leq t)$ above, we get

$$P(W \leq t) = 1 - \sum_{n=0}^{\infty} \sum_{j=0}^{n+1} (-1)^j \binom{n+1}{j} \left(\frac{t - jb}{t}\right)^n \frac{(\alpha t)^n}{n!} e^{-\alpha t}.$$

**15.** This problem is rather vaguely worded. As a result there are several possible interpretations. If we are to assume that there are 250 pages and 250 misprints, then the sampling process of dropping 250 balls into boxes seems to be the model. But if the assumption is that the average density of misprints is 1 misprint/page (and not necessarily that there are exactly 250 misprints), then the correct model is the Poisson process. The question could be interpreted as asking for the probability either of exactly 4 misprints or of 4 or more misprints, either on one given page or on any page. Let $M_n$ be the number of misprints on page $n$.

| Event | Sampling process | Poisson process |
|---|---|---|
| $(M_1 = 4)$ | $P(M_1 = 4) = P(O_1 = 4) = \binom{250}{4}\left(\frac{1}{250}\right)^4\left(\frac{249}{250}\right)^{246} = 0.01517$ | $P(M_1 = 4) = P(N(1) = 4) = \frac{1}{4!}e^{-1} = 0.01533$ |
| $(M_1 \geq 4)$ | $P(M_1 \geq 4) = 1 - P(O_1 < 4) = 0.01874$ | $P(M_1 \geq 4) = P(N(1) \geq 4) = 1 - (1 + 1 + \frac{1}{2} + \frac{1}{6})e^{-1} = 0.01899$ |

The distinction among the various cases is small. Thus we would not be surprised (at the 1% significance level) to find 4 misprints on one page. Clearly we can see that the Poisson process is much easier computationally.

Now consider the event that at least one page has exactly 4 misprints, i.e. $\bigcup_n (M_n = 4)$.

Using the Poisson process:

$$P\left(\bigcup_n (M_n = 4)\right) = 1 - P(N(1) \neq 4)^{250} = 1 - (1 - P(N(1) = 4))^{250}$$

$$= 1 - (0.9847)^{250} = 0.9790.$$

Here we would be even less surprised. Now consider 8 errors. By now we have learned our lesson: use Poisson.

| Event | Probability |
|---|---|
| $(M_1 = 8)$ | $P(M_1 = 8) = P(N(1) = 8) = \frac{1}{8!}e^{-1} \approx 9 \times 10^{-6}$ |
| $(M_1 \geq 8)$ | $P(M_1 \geq 8) = P(N(1) \geq 8) \approx 9 \times 10^{-6}$ |
| $\bigcup_n (M_n = 8)$ | $P = 1 - (1 - \frac{1}{8!}e^{-1})^{250} = 1 - (0.9977)^{250} = 0.00228$ |
| $\bigcup_n (M_n \geq 8)$ | $P = 1 - (1 + 1 + \frac{1}{2} + \cdots + \frac{1}{7!})^{250}e^{-250} = 0.00256$ |

For 8 errors we would be surprised. It would be cause for rejecting our model.

**20.** Using a Poisson process with $\alpha = 0.15$, we find that

$$P(N(20) = 0) = e^{-20 \cdot 0.15} = e^{-3} = 0.05.$$

Thus there is a 1 in 20 chance for such a class to occur, not overwhelmingly unlikely. The Poisson process, of course, is only an approximation. Either the Bernoulli process or a Sampling process would be more accurate. For example, using the Bernoulli process, the above probability would be $(0.85)^{20} = 0.039$, which is roughly the same.

**23.** The key question is the meaning of "beyond a reasonable doubt." I take this to mean that there is a high probability that the defendant is the guilty party, not that there is a high probability that the defendant matches the description of the guilty party. Thus if there are 2 or more people who were in or near the city at the time of the crime and who match the description of the guilty party, then the defendant is not guilty beyond a reasonable doubt. Now in a city of 2 million, the density of people matching the description will be $\frac{2{,}000{,}000}{5{,}000{,}000} = 0.4$. Using a Poisson process, the chance that there are 2 or more people matching the description given that at least one exists is

$$P(N(1) \geq 2 \mid N(1) \geq 1) = \frac{P(N(1) \geq 2)}{P(N(1) \geq 1)} = \frac{1 - (1 + 0.4)e^{-0.4}}{1 - e^{-0.4}} = \frac{0.06155}{0.3297} \approx 0.1867.$$

Thus the defendant is guilty beyond a reasonable doubt with probability 0.8133, which is not overwhelming.

**37.** The fact that the sum of independent Poisson random variables is again Poisson tells us that we may view this experiment in one of two equivalent ways:

(a) The two independent Poisson processes of cars and of trucks produce a Poisson process of vehicles, having intensity $\alpha + \beta$.

(b) A Poisson process of vehicles, having intensity $\alpha + \beta$, is made into a compound Poisson process by tossing a biased coin of bias $p = \frac{\alpha}{\alpha + \beta}$ and changing each vehicle into a car if heads occurs and a truck if tails occurs.

Thus for this problem one should use the Bernoulli process, coin tossing model, with bias $p = \frac{\alpha}{\alpha + \beta}$ rather than the Poisson process. The probability of a run of 10 cars before a run of 10 trucks is:

$$\frac{p^{10}(1 - q^{10})}{p^{10} + q^{10} - p^{10}q^{10}} = \frac{\alpha^{10}(\alpha + \beta)^{10} - \beta^{10}\alpha^{10}}{\alpha^{10}(\alpha + \beta)^{10} + \beta^{10}(\alpha + \beta)^{10} - \alpha^{10}\beta^{10}}.$$

**38.** Without loss of generality we may assume that $t_1 = 0$. Let $t = t_2$. Then $N(t)$ in the Poisson process represents the number of cars that pass the man between time $t_1$ and time $t_2$. We use the law of alternatives. Let $A$ be the event that the vehicles the man sees are alternately cars and trucks. Then

$$P(A) = \sum_{n=0}^{\infty} P(A \mid N(t) = n)\, P(N(t) = n).$$

Now $P(A \mid N(t) = n)$ may be viewed in the Bernoulli process having bias $p = \frac{\alpha}{\alpha + \beta}$ as the event that the first $n$ coin tosses are alternately heads and tails. This probability is easy to compute. If $n = 0$, then $P(A \mid N(t) = n)$ is trivially equal to 1. If $n$ is even and $n > 0$, then

$$P(A \mid N(t) = n) = 2p^{n/2}q^{n/2},$$

there being just two ways for this event to happen. If $n$ is odd we get

$$P(A \mid N(t) = n) = p^{(n+1)/2}q^{(n-1)/2} + p^{(n-1)/2}q^{(n+1)/2}.$$

Let $\Lambda = (\alpha + \beta)t$. Then:

$$P(A) = e^{-\Lambda} + 2e^{-\Lambda}\sum_{m=1}^{\infty}(pq)^m\frac{\Lambda^{2m}}{(2m)!} + (p+q)e^{-\Lambda}\sum_{m=1}^{\infty}(pq)^{m-1/2}\frac{\Lambda^{2m-1}}{(2m-1)!}$$

$$= e^{-\Lambda} + 2e^{-\Lambda}(\cosh(\Lambda\sqrt{pq}) - 1) + \frac{p+q}{\sqrt{pq}}e^{-\Lambda}\sinh(\Lambda\sqrt{pq}).$$

Replacing $\Lambda$ by $(\alpha + \beta)t$, $p$ by $\frac{\alpha}{\alpha + \beta}$ and $q$ by $\frac{\beta}{\alpha + \beta}$, we find that

$$P(A) = \left[2\cosh(\sqrt{\alpha\beta}\, t) + \frac{(\alpha + \beta)\sinh(\sqrt{\alpha\beta}\, t)}{\sqrt{\alpha\beta}} - 1\right]e^{-(\alpha + \beta)t/2}.$$

**39.** To answer the question one must assume that the men and women are independent of one another. If this is so, then $N_w(t)$ has Poisson distribution with parameter $q\alpha t$.

Here is the proof. By the law of alternatives:

$$P(N_w(t) = k) = \sum_{n=0}^{\infty} P(N_w(t) = k \mid N(t) = n)\, P(N(t) = n).$$

Now $P(N_w(t) = k \mid N(t) = n)$ is the same as the probability that the number of tails in $n$ tosses of a coin is $k$, where the coin has bias $p$. Thus $P(N_w(t) = k \mid N(t) = n) = \binom{n}{k}p^{n-k}q^k$. Therefore:

$$P(N_w(t) = k) = \sum_{n=k}^{\infty}\binom{n}{k}p^{n-k}q^k\frac{(\alpha t)^n}{n!}e^{-\alpha t}$$

$$= \frac{q^k}{k!}e^{-\alpha t}\sum_{n=k}^{\infty}\frac{(p\alpha t)^{n-k}}{(n-k)!}\cdot(\alpha t)^k$$

$$= \frac{(q\alpha t)^k}{k!}e^{-\alpha t}\cdot e^{p\alpha t} = \frac{(q\alpha t)^k}{k!}e^{-q\alpha t}.$$

**40.** This is a compound Poisson process. For simplicity we may take $t_1 = 0$ and write $t$ for $t_2$. Write $D$ for the amount received by the phone company in this billing period. The number of phone calls made in this period is, by assumption, $N(t)$, where $N(t)$ has Poisson distribution with parameter $\alpha t$. Then $D$ may be written as

$$D = (c + kT_1) + (c + kT_2) + \cdots + (c + kT_{N(t)})$$

$$= cN(t) + k(T_1 + \cdots + T_{N(t)}),$$

where $T_1, T_2, \ldots$ are independent, exponentially distributed random variables with parameter $\beta$. Using conditional expectations:

$$E(D) = \sum_{n=0}^{\infty} E(D \mid N(t) = n)\, P(N(t) = n)$$

$$= \sum_{n=0}^{\infty}\left(cn + \frac{kn}{\beta}\right)\frac{(\alpha t)^n}{n!}e^{-\alpha t}$$

$$= \left(c + \frac{k}{\beta}\right)(\alpha t).$$

**41.** It is hard to imagine how this could be computed without the randomization technique. As in section VII.4, we write $B_k$ for the event in question and $A$ for the randomized event. Similarly, write $N_i = N\left(\frac{i}{5}\right) - N\left(\frac{i-1}{5}\right)$ for the number of balls falling in the $i$th box. To compute $P(A)$, first use the law of alternatives:

$$P(A) = P(A \mid N_3 \text{ is even})\, P(N_3 \text{ is even}) + P(A \mid N_3 \text{ is odd})\, P(N_3 \text{ is odd}).$$

If $N_3$ is even, there are no other conditions for $A$ to occur, so $P(A \mid N_3 \text{ is even}) = 1$. If $N_3$ is odd, then $A$ occurs if and only if $N_5$ is a multiple of 7. Since $N_3$ is independent of $N_5$, $P(A \mid N_3 \text{ is odd}) = P(N_5 \text{ is a multiple of 7})$.

We now compute each of the above probabilities. By definition, $N_i$ has Poisson distribution with parameter $\frac{\alpha}{5}$.

$$P(N_3 \text{ is even}) = \cosh\left(\frac{\alpha}{5}\right)e^{-\alpha/5}$$

$$P(N_3 \text{ is odd}) = \sinh\left(\frac{\alpha}{5}\right)e^{-\alpha/5}$$

$$P(N_5 \text{ is a multiple of 7}) = \sum_{m=0}^{\infty}\frac{(\alpha/5)^{7m}}{(7m)!}e^{-\alpha/5}$$

$$P(A) = \cosh\left(\frac{\alpha}{5}\right)e^{-\alpha/5} + \sinh\left(\frac{\alpha}{5}\right)e^{-\alpha/5}\sum_{m=0}^{\infty}\frac{(\alpha/5)^{7m}}{(7m)!}e^{-\alpha/5}$$

$$P(B_k) = \left.\frac{d^k}{d\alpha^k}\left[P(A)e^{\alpha}\right]\right|_{\alpha=0}.$$

**42.** Let $X_i$ be the $i$th toss of a coin whose bias $P$ is chosen uniformly from $[0,1]$. By the continuous law of alternatives,

$$P(X_1 = 1) = \int_0^1 P(X_1 = 1 \mid P = p)\,\text{dens}(P = p)\,dp = \int_0^1 p\,dp = \frac{1}{2}.$$

This comes as no surprise.

Are the individual tosses independent? Consider the first two.

$$P((X_1 = 1) \cap (X_2 = 1)) = \int_0^1 P((X_1 = 1) \cap (X_2 = 1) \mid P = p)\,dp = \int_0^1 p^2\,dp = \frac{1}{3} \neq \frac{1}{4}.$$

Therefore the first two tosses are not independent! However, the tosses are exchangeable. In general if one randomizes a sequence of independent, equidistributed random variables, the result is a sequence of exchangeable random variables.

Curiously, the converse is also true: essentially every sequence of exchangeable random variables arises from a sequence of independent equidistributed ones by randomization.

**47.** The two expressions for $F(t) = P(W \leq t)$ found above are not equally well suited to the computation of the expectation of $W$. Laplace transforms are particularly well suited to this task. We know $\hat{F}(s)$. To compute $\hat{f}(s)$, where $f(t) = \text{dens}(W = t)$ is the density of $W$, one simply multiplies $\hat{F}(s)$ by $s$. To see this, recall that

$$\hat{F}(s) = \int_0^{\infty} e^{-st} F(t)\,dt.$$

Multiplying by $s$ and integrating by parts we get:

$$s\hat{F}(s) = \int_0^{\infty} s e^{-st} F(t)\,dt = \left[-e^{-st}F(t)\right]_0^{\infty} + \int_0^{\infty} e^{-st}F'(t)\,dt.$$

Now $f(t) = F'(t) + \delta(t)e^{-\alpha b}$, because there is a positive probability that $W$ will be equal to 0. Thus $W$ is neither an integer random variable nor a continuous one, and this fact is reflected in the appearance of the Dirac delta function in the formula for $f(t)$. In any case,

$$\int_0^{\infty} e^{-st}\delta(t)e^{-\alpha b}\,dt = e^{-\alpha b} = F(0).$$

Therefore,

$$s\hat{F}(s) = \int_0^{\infty} e^{-st}f(t)\,dt = \hat{f}(s).$$

Using the formula for $\hat{F}(s)$, we have

$$\hat{f}(s) = \frac{(\alpha + s)e^{-\alpha b}}{s e^{-(\alpha+s)b} + s}.$$

We now use another important fact about Laplace transforms: the derivative of $\hat{f}(s)$, evaluated at zero, is the negative of the expectation of $W$. To see why consider

$$\hat{f}(s) = \int_0^{\infty} e^{-st}f(t)\,dt.$$

Differentiating under the integral sign we get:

$$\hat{f}'(s) = -\int_0^{\infty} t e^{-st}f(t)\,dt.$$

Now set $s = 0$:

$$\hat{f}'(0) = -\int_0^{\infty} t f(t)\,dt = -E(W).$$

Hence

$$E(W) = \frac{1 + \alpha b - e^{\alpha b}}{\alpha} = \frac{e^{\alpha b} - 1 - \alpha b}{\alpha}.$$

Thus $E(W + c) = \frac{e^{\alpha b} - 1 - \alpha b}{\alpha} + c$. If it takes exactly time $b$ to cross the street when there are no cars around, i.e. $c = b$, then the average time to cross the street is

$$E(W + b) = \frac{e^{\alpha b} - 1}{\alpha}.$$

One can similarly compute the variance of $W$ by using the fact that $E(W^2) = \hat{f}''(0)$. Thus

$$\text{Var}(W) = \text{Var}(W + c) = \frac{e^{2\alpha b} - 1 - 2\alpha b e^{\alpha b}}{\alpha^2}.$$

If $b = 30$ seconds, then $E(W + b)$ will be 2 minutes when $\alpha = 4.673$. Thus when more than 4.673 vehicles/minute use the street one should install a traffic light. If one can negotiate the street in $b = 15$ seconds, then $E(W + b) = 2$ minutes when $\alpha \approx 13.26$ vehicles/minute. Thus on the average one must wait 2 minutes until a 15 second gap will appear when traffic is going by at the average rate of one car every 4.5 seconds.

**48.** Let $T$ be the waiting time for the crystal to be completely covered. If there were just one crystal site then the distribution of $T$ would be given by $1 - e^{-\alpha t}$, where $\alpha$ is the intensity of the molecular beam in molecules per unit time. In this case there are $10^{16}$ crystal sites and the beam is producing $10^{14}$ molecules per second. Thus

$$\alpha = \frac{10^{14}}{10^{16}} = 10^{-2}.$$

The crucial property of the Poisson process, not shared by the finite sampling process, is that what happens at each crystal site is independent of what happens elsewhere. Therefore

$$P(T \leq t) = (1 - e^{-t/100})^{10^{16}}.$$

We wish to calculate $t$ such that this probability is 50% and such that it is 99%. In the first case, taking logs we find that:

$$10^{16}\ln(1 - e^{-t/100}) = -0.69315$$

or $\ln(1 - e^{-t/100}) = -0.69315 \times 10^{-16}$.

Now the Taylor series for $\ln(1-x)$ is

$$\ln(1-x) = -x - \frac{x^2}{2} - \frac{x^3}{3} - \cdots$$

But $t$ will clearly be quite large and hence $e^{-t/100}$ will be very small (in fact $e^{-t/100}$ will be close to $7 \times 10^{-17}$). So to four decimal places we may replace $\ln(1 - e^{-t/100})$ by $-e^{-t/100}$. Thus

$$-e^{-t/100} = -6.9315 \times 10^{-17}$$

or $t = 3{,}721$ seconds.

This is a bit more than an hour. A similar calculation applies to 99%. Here

$$10^{16}\ln(1 - e^{-t/100}) = -\ln(100) \approx -4.605$$

or $e^{-t/100} \approx 4.605 \times 10^{-16}$

or $t = 3{,}533$ seconds.

Wait --- let us redo the 99.9% case as given in the original:

$$10^{16}\ln(1 - e^{-t/100}) = -0.001$$

or $e^{-t/100} \approx 1 \times 10^{-19}$

or $t = 4{,}375$ seconds.

This is only about 11 minutes longer than the time $t$ for which there is a 50% chance of full coverage.

Be careful not to confuse the probability of full coverage with the percentage coverage, which is a very different quantity.

Let $T_n$ be the waiting time until full coverage when there are $n$ crystal sites (but with the same molecular intensity per crystal site). Thus $T = T_{10^{16}}$. Let $F_n(t) = P(T_n \leq t) = (1 - e^{-t/100})^n$. Then, using integration by parts:

$$E(T_n) = \int_0^{\infty} t\, F_n'(t)\,dt = \int_0^{\infty}(1 - F_n(t))\,dt$$

$$= \int_0^{\infty}(1 - (1 - e^{-t/100})^n)\,dt.$$

Using the substitution $u = 1 - e^{-t/100}$, $du = e^{-t/100}\frac{1}{100}\,dt$, we find that

$$\int_0^{\infty}(1 - e^{-t/100})^{n-1} e^{-t/100}\,dt = \int_0^1 100u^{n-1}\,du = \frac{100}{n}.$$

Therefore, $E(T_n) = 100\sum_{k=1}^{n}\frac{1}{k}$ by induction. The series $\sum_{k=1}^{n}\frac{1}{k}$ is called the harmonic series, and by Euler's approximation we know that

$$\sum_{k=1}^{10^{16}}\frac{1}{k} \approx \ln(10^{16}) + 0.57721 = 37.41857.$$

Hence $E(T)$ is about 3742 seconds.

**49.** There are many ways to interpret the notion of being a "better" system. The grade on this problem is determined by how precise you made your concept.

Here is one interpretation of this problem. The memorylessness of the lines means that the time until failure of one line is exponentially distributed. All the lines are the same so the parameter of this distribution is the same one for all of them. Call it $\alpha$. Let $T_1$ and $T_2$ be the times until failure of system 1 and system 2 respectively. From reliability theory we know how to compute the distributions of $T_1$ and $T_2$.

- **Single line:** $P(T > t) = e^{-\alpha t}$
- **$n$ lines in series:** $P(T > t) = (e^{-\alpha t})^n$
- **$n$ lines in parallel:** $P(T \leq t) = (1 - e^{-\alpha t})^n$

For system 1 (two groups of 3 lines in series, connected in parallel):

$$P(T_1 \leq t) = 1 - 2e^{-3\alpha t} + e^{-6\alpha t}$$

For system 2 (three groups of 2 lines in parallel, connected in series):

$$P(T_2 \leq t) = 1 - 3e^{-\alpha t} + 12e^{-4\alpha t} - 6e^{-5\alpha t} + e^{-6\alpha t}$$

The expectations of $T_1$ and $T_2$ are

$$E(T_1) = \frac{2}{3\alpha} - \frac{1}{6\alpha} = \frac{1}{2\alpha}$$

$$E(T_2) = \frac{8}{3\alpha} - \frac{12}{4\alpha} + \frac{6}{5\alpha} - \frac{1}{6\alpha} = \frac{17}{10\alpha}.$$

We see, therefore, that system 2 is slightly better than system 1 in terms of average time until failure. The first system has only half the expected time until failure of a single line whereas the second system manages 70%.
