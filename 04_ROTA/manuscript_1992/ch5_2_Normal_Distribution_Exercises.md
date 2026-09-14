---
title: "Chapter V: Statistics and the Normal Distribution — Exercises"
author: "Gian-Carlo Rota"
edition: "1992"
chapter_number: 5
part: 2
---

# Exercises for Chapter V — Statistics and the Normal Distribution

## Variance

**1.** Suppose that $X$ is a random variable whose density is

$$\operatorname{dens}(X = x) = \begin{cases} (\beta - 1)x^{-\beta} & \text{if } x > 1 \\ 0 & \text{if } x < 1 \end{cases}$$

where $\beta > 1$. Show:

(a) $X$ has neither mean nor variance if $1 < \beta \leq 2$.

(b) $X$ has mean $\frac{\beta - 1}{\beta - 2}$ if $\beta > 2$, but has no variance if $2 < \beta < 3$.

(c) $X$ has variance $\frac{\beta - 1}{(\beta - 2)^2(\beta - 3)}$ if $\beta > 3$.

**2.** Let $X$ be the random variable $G_1$ in the symmetric Bernoulli process random walk model. Let $Y = X^2$. Then $X$ and $Y$ are obviously dependent random variables. Show that $\operatorname{Cov}(X, Y) = 0$. Hence the converse to the Fact in section IV.1 is false.

**3.** Verify the following formula, which holds for arbitrary random variables $X_1, X_2, \ldots, X_n$ (not necessarily independent) so long as both sides exist:

$$\operatorname{Var}(X_1 + X_2 + \cdots + X_n) = \sum_i \operatorname{Var}(X_i) + 2\sum_{i < j} \operatorname{Cov}(X_i, X_j).$$

Use this formula and the exchangeability of the gaps in the uniform process to compute $\operatorname{Var}(X_{(k)})$.

**4.** Prove that if $X$ and $Y$ are independent continuous R.V.'s, then $E(XY) = E(X)E(Y)$. To do this one must split $X$ into positive R.V.'s $X^+$ and $X^-$ such that $X = X^+ - X^-$. For example, define $X^+$ by $X^+ = \max(X, 0)$. Do the same for $Y$. Note also that $\operatorname{dens}(XY = z \mid X = x) \neq \operatorname{dens}(Y = z \mid X = x)$.

**5.** Prove that for any two random variables $X$ and $Y$, $E(XY) \leq \sqrt{E(X^2) E(Y^2)}$ (Schwarz Inequality). Use this to prove that the correlation coefficient of $X$ and $Y$,

$$\rho(X, Y) = \frac{\operatorname{Cov}(X, Y)}{\sigma(X)\sigma(Y)},$$

satisfies $|\rho(X, Y)| \leq 1$. Also show that $\rho(X, Y) = \pm 1$ if and only if $Y = aX + b$ for some constants $a$ and $b$.

**6.** Let $X_1, X_2, \ldots, X_n$ be a set of independent random variables not necessarily equidistributed but all having the same mean and variance $\sigma^2$. Prove that the sample mean has expectation $m$ and that both sample variances have expectation $\sigma^2$. Also compute the variance of the sample mean. Can you compute the variance of either sample variance?

Notice that the denominator must be different for the two sample variances. This denominator is called the number of degrees of freedom by statisticians. Intuitively, each estimation of a parameter of the unknown distribution causes a loss of one degree of freedom in the random sample.

**7.** In exercise III.10 we saw that if $X$ and $Y$ are independent then $g(X)$ and $h(Y)$ are also independent for any two functions $g$ and $h$. It follows that $g(X)$ and $h(Y)$ are also uncorrelated. Prove the converse: if $g(X)$ and $h(Y)$ are uncorrelated for every pair of functions $g$ and $h$, then $X$ and $Y$ are independent.

## Normal Distribution

**8.** Using the normal distribution table compute:

(a) $P(-0.5 \leq X \leq 0.5)$, where $X$ is $N(0, 1)$. [Answer: 0.383]

(b) $P(X < -2)$, where $X$ is $N(0, 1)$. [Answer: 0.0228]

(c) $P(Y \geq 5)$, where $Y$ is $N(0, 4)$. [Answer: 0.0062]

(d) $P(-4 \leq Y < 4)$, where $Y$ is $N(-2, 9)$. [Answer: 0.1359]

**9.** Find a number $a$ such that

(a) $P(X \geq a) = 0.03$, where $X$ is $N(0, 1)$. [Answer: 1.88]

(b) $P(-a \leq X < a) = 0.88$, where $X$ is $N(0, 1)$. [Answer: 1.555]

(c) $P(-2 - a < Y < a - 2) = 0.10$, where $Y$ is $N(-2, 9)$. [Answer: 4.935]

(d) $P(Y \leq a) = 0.98$, where $Y$ is $N(0, 4)$. [Answer: $-4.126$]

**10.** Show explicitly that the normal distribution $N(m, \sigma^2)$ really does have variance $\sigma^2$.

## Significance Levels

**11.** A prestigious scientific journal announces as part of its editorial policy that only results significant at the .01 level will be acceptable for publication (and conversely any result significant at the .01 level is acceptable). They reason that by doing so their readership will have the confidence that at most 1% of the published results will be incorrect. Discuss the fallacy of this policy.

Hearing about this new policy, 1000 conscientious experimenters formulate 1000 incorrect hypotheses and test them at the .01 significance level. On the average 10 of them would find a significant result, and these 10 would then be entitled to publish their results. Let's say that these 10 articles constitute the first issue of the journal after the new policy is instituted. We would find that the journal policy allowed 100% of the published results to be wrong. Clearly the journal policy is a result of a misunderstanding of the nature of statistical hypothesis testing: significant at the .01 level does not mean that there is only a 1% chance that one is wrong.

**12.** In a scientific paper you read the following: "In four of our experiments the data are significant at the .05 level. The fifth experiment, however, is significant at the .01 level!" What is misleading about this?

**13.** A population scientist believes that roughly 50% of the population is female, but doesn't want to be too hasty. So he decides to be cautious and to test whether or not at least 45% of the population is female. To do this he takes a random sample of 100 persons. If he discovers that only 40 of them are female, does he have sufficient evidence to reject the model that (at least) 45% of the population is female? Use a Bernoulli process with $p = 0.45$ and a one-sided significance test.

**14.** A statistician wonders just how careful the scientist in exercise 13 was when he made his random sample. Is 40 significantly different from the expected value of 50? Is 40 significantly smaller than 50? What do you think of the sampling technique of the scientist? [Answer: Yes; yes; not much.]

**15.** You own a company that produces medium quality left-handed screws. About 1% of the screws produced by one machine are defective. As the screws are produced, the defective ones are found and discarded. A count is kept of the number of defective screws produced each hour. The machine is readjusted whenever the number of defective screws produced is significantly greater than 1%. You may regard this as a Bernoulli process. The machine makes 10,000 screws per hour. Describe a procedure for determining when the machine is out of adjustment at the 0.05 level and at the 0.01 level.

**16.** A congressman wishes to vote according to the "will of the people" on a certain bill. Now in this case one wishes to know whether the percentage $p$ of his constituency in favor of the bill is above or below 50%. Clearly if $p$ is close to $1/2$ a rather large sample will be required to distinguish between the two possibilities. How is this reflected in a statistical test? For example suppose that a poll is made soliciting the opinion of a certain number of voters chosen at random. Use a .05 significance level to decide what the congressman should do in each of the following cases.

| Number of pollees | Number of pollees in favor of the bill |
|---|---|
| 100 | 54 |
| 100 | 41 |
| 500 | 267 |
| 500 | 225 |
| 1000 | 534 |

Note that the congressman has three choices in each case: (a) vote for the bill, (b) vote against the bill or (c) order a larger sample be taken.

**17.** A company wishes to test the effectiveness of a new magazine advertising campaign. It decides that the campaign is effective if the proportion of subscribers to the magazine who use their product is twice as large as the proportion of non-subscribers who do so. A 10% significance level is agreed upon. It is known that 15% of the general population use the firm's product. A sample of 50 subscribers is ordered and it is found that 10 use the product. What does this suggest about the advertising campaign? [Answer: One cannot say that the advertising campaign was unsuccessful.]

**18.** A study has shown that in a certain profession the women are earning only 88% as much on the average, as their male counterparts earn. However, the study is several years old and a women's organization wants to determine if the women in this profession are losing relative to the men. It is known that the men in the profession now receive 138% of the pay they received when the above study was conducted. A random sample of female professionals is made. The average pay of these women was found to be the following (as a percentage of the current average pay of men in the profession): 70%, 78%, 80%, 83%, 84%, 86%, 87%, 96%. Compute the sample mean and sample standard deviation. At the .05 significance level are the women in this profession losing ground relative to the men? Does this coincide with your "gut feeling" in this problem? [Answer: No; no]

**19.** The Food and Drug Administration (FDA) suspects that a drug company is producing a certain pill with a purity less than that required by law. The law allows at most 5 parts per million (ppm) of a certain impurity. An FDA laboratory tests a random sample of 50 pills. They find that the pills have a sample mean impurity of 5.4 ppm and a sample variance of 4.38 (ppm)$^2$. Can they assert that the pills do not comply with the law? We will return to this question in exercise V.47. [Answer: If the law only requires that the average amount of impurity is $\leq 5$ ppm then we cannot reject the possibility that the manufacturer is complying with the law.]

**20.** A paper company was a major polluter of a small river for many years. When antipollution laws were enacted it reacted slowly at first but later made a major effort to control its pollution. Unfortunately the firm suffered from its earlier recalcitrance by acquiring a public image as a major polluter. Indeed a very large sample revealed that close to 90% considered the firm to be a major polluter. To counter this they began a public relations campaign. After the campaign a random sample of 200 individuals were asked whether the company was still a major polluter. It was found that 174 felt this way. Did the campaign have a significant effect? [Answer: No]

**21.** (Hans Zeisel). Dr. Benjamin Spock, author of a famous book on baby care, and others were initially convicted of conspiracy in connection with the draft during the Vietnam War. The defense appealed, one ground being the sex composition of the jury panel. The jury itself had no women, but chance and challenges could make that happen. Although the defense might have claimed that the jury lists (from which the jurors are chosen) should contain 55% women, as in the general population, they did not. Instead they complained that six judges in the court averaged 29% women in their jury lists, but the seventh judge, before whom Spock was tried, had fewer, not just on this occasion but systematically. The last 9 jury lists for that judge contained the following counts:

| Women | Men | Total | Proportion women |
|---|---|---|---|
| 8 | 42 | 50 | 0.16 |
| 9 | 41 | 50 | 0.18 |
| 7 | 43 | 50 | 0.14 |
| 3 | 50 | 53 | 0.06 |
| 9 | 41 | 50 | 0.18 |
| 19 | 110 | 129 | 0.15 |
| 11 | 59 | 70 | 0.16 |
| 9 | 91 | 100 | 0.09 |
| 11 | 34 | 45 | 0.24 |
| **totals:** | **86** | **511** | **597** | **0.144** |

Did the jury lists for this judge have a significantly smaller percentage of women? Because of the seriousness of the case, use an extremely small significance level: 0.0001.

**22.** It has been said that Chevalier de Mere actually observed the subtle distinction in probability between obtaining at least one six in four throws of a die and obtaining at least one double-six in twenty-four throws of a pair of dice. See exercise II.28. Could he have done so? Since he did not have access to the elaborate machinery of the normal distribution and significance tests, it is difficult to imagine what he might have deduced about any observations he might have made.

However, we could ask what is the probability that he would not have observed a difference between the two experiments in a certain number of trials. Let $X_n$ be the number of times out of $n$ trials that at least one six is obtained in four throws of a die. Let $Y_n$ be the corresponding random variable for the double-six trial. What is the probability that $X_n - Y_n$ is positive? Since de Mere's calculation showed that $Y_n$ should have been the more probable of the two, such an observation would have shocked him. For definiteness compute this probability for $n = 10, 100, 200, 500, 1000, 2000$ and 5000. How many times would de Mere have had to have tried both possibilities in order to reject (at the 5% level) this explanation of his perplexity? How many throws of one or two dice does this involve? What can one conclude? [Answer: 3900 and 109,200. Conclusion: Either de Mere tried this experiment a great number of times or else we cannot dismiss the possibility that he did not in fact succeed in detecting the difference between the two probabilities.]

**23.** A political scientist wishes to determine if there is a significant difference between the preferences of voters in two similar neighborhoods of a city with respect to an upcoming race for mayor. Samples of 30 voters are taken from each of the neighborhoods. In one sample 12 voters prefer the incumbent while in the other neighborhood 19 do so. Using a 10% significance level, decide whether there is a significant difference between the neighborhoods. [Answer: Yes]

**24.** A medical researcher samples 100 records of adults having diagnosed coronary heart disease from one city, taking care to ensure that the sample is random. The average cholesterol value for these individuals was found to be 296, and the sample standard deviation was 30. The researcher then took a random sample of 200 people from the same city who never had diagnosed heart disease. The mean cholesterol value for this sample was 310, and the sample standard deviation was 50. Do individuals without diagnosed heart disease have a significantly larger cholesterol value than those with diagnosed heart disease? [Answer: Yes]

**25.** A small college soccer team won its conference championship 9 times in the first 20 years of its existence. Then for the next twenty years it won only 3 times. Is this significant? Is it very significant? [Answer: Yes; no].

**26.** When the president of the company in exercise 20 discovered that the questionnaire used in the post-campaign sample included the word "still," she was incensed: the question seemed biased in favor of a yes answer. Accordingly, she immediately proceeded to write her own questionnaire and take a new random sample. The only change was the omission of the word "still." In this new sample of 200 individuals only 160 felt that the company was a major polluter. Did the alteration of the questionnaire have a significant effect? Did the public relations campaign have a significant effect? [Answers: Yes; yes]

## Confidence Intervals

**27.** Using the information in exercise 24, give a 90% confidence interval for the following:

(a) the individual cholesterol values of individuals without heart disease;

(b) the individual cholesterol values of individuals with heart disease;

(c) the mean cholesterol value of all individuals without heart disease;

(d) the mean cholesterol value of all individuals with heart disease.

[Answers: $296 \pm 49.35$; $310 \pm 82.25$; $296 \pm 5$; $310 \pm 6$]

**28.** If a set of grades on a statistics examination are approximately normally distributed with a mean of 82 and a standard deviation of 6.9, find:

(a) The lowest passing grade if the lowest 10% of the students are given F's.

(b) The highest B if the top 5% of the students are given A's.

**29.** The average life of a certain type of engine is 10 years, with a standard deviation of 3.5 years. The manufacturer replaces free all engines that fail while under guarantee. If he is willing to replace only 2% of the engines that fail, how long a guarantee should he offer? Assume a normal distribution.

**30.** The braking distances of two cars, F and C, from 50 k.p.h. are normally distributed, one with mean 30m and standard deviation 8m, the other with mean 35m and standard deviation 5m. If they both approach each other on a narrow mountain road and first see each other when they are 100m apart, what is the probability that they avoid a collision? [Answer: 0.9999]

**31.** If the probability of a male birth is 0.512, what is the probability that there will be fewer boys than girls in 1000 births? [Answer: 0.215]

**32.** A multiple-choice quiz has 100 questions each with four possible answers of which only one is the correct answer. What is the probability that sheer guesswork yields from 10 to 30 correct answers for 40 of the 100 problems about which the student has no knowledge?

**33.** A firm wishes to estimate (with a maximum error of 0.05 and a 98% confidence level) the proportion of consumers who use its product. How large a sample will be required in order to make such an estimate if the preliminary sales reports indicate that about 25 percent of all consumers use the firm's product? How large a sample would be needed if no preliminary information were available?

**34.** A sponsor of a weekly television program is interested in estimating the proportion of the city population who regularly watch its program. The sponsor wishes the estimate to be made with a 90% confidence level and an error of at most 4%. The sponsor has no information concerning the proportion of viewers who watch the program. How large a sample will be required to make the estimate?

**35.** A person has just hired a building contractor to build a house. The house will be built in three stages. First, the contractor lays the foundation, second, the frame and exterior are built, and last a subcontractor puts in the wiring, plumbing, and interior. Each stage must be completed before the next is started. In attempting to get an estimate of when the house will be totally completed, the purchaser is able to get the following information from those in charge of each stage.

| Stage | Expected Time of Completion of Stage (in Weeks) | Standard Deviation (in Weeks) |
|---|---|---|
| I | 3 | 1 |
| II | 8 | 2 |
| III | 5 | 2 |

What is the expected value and standard deviation of completion time for the house, assuming the completion times of the stages are independent? [Answer: 16 weeks and 3 weeks]

**36.** The College Entrance Examination Board verbal and mathematical aptitude scores are approximately normally distributed with mean 500 and standard deviation 100 except that scores above 800 and below 200 are arbitrarily reported as 800 and 200 respectively. What percentage of the students taking the verbal exam score above 800 or below 200? [Answer: about 0.3%]

**37.** You are the head of a polling company, and you have a contract to determine the percentage of the electorate in favor of a candidate. There are 100,000 members of the electorate, and each member chooses his/her opinion independently. Your contract specifies that you must determine the percentage to within 1% with 5% confidence or to within 5% with 1% confidence. Which is cheaper?

**38.** A professor at a small college walks to school each day. On the average the trip takes 15 minutes with a standard deviation of 3 minutes. Assume a normal distribution. If the professor's first class is at 10:30 AM, when must the professor leave home in order to be 95% certain of arriving on time? If the college serves coffee from 10:00 AM to 10:30 AM how often would the professor have coffee before class if the professor left home at 10:10 AM every day? [Answers: 10:10 AM; 0.952].

**39.** Suppose that resistors can be purchased each with a resistance that is uniformly distributed between 900 $\Omega$ and 1100 $\Omega$. If 10 such resistors are connected in parallel, what is the probability that their total resistance will be within 5% of 10,000 $\Omega$?

**40.** When a thumbtack is tossed, it falls on its flat head with probability $p$. What must you do to find $p$ to within $(p/10)$ at significance level 0.05? At significance level 0.01?

**41.** You own a telephone company that services two cities A and B, each having 5000 customers. You would like to link your exchange with the more distant city, C. You estimate that during the busiest time each customer will require a line to C with probability .01. You want to be sure that there are enough lines to C so that there is only a 1% chance that at the busiest time some customer will be unable to get a line to C. Each trunkline to C will cost \$10,000. You have two options. Either link A and B as if they were separate exchanges or link the entire exchange to C. In the second option, additional equipment costing \$50,000 would be needed. Which option is cheaper?

**42.** A clinical trial is conducted to determine if a certain type of drug has an effect on the incidence of a certain disease. A sample of 100 rats was kept in a controlled environment and 50 of the rats were given the drug. Of the group not given the drug (the control group), there were 12 incidences of the disease, while 9 of the other group contracted it. Compute a 90% confidence interval for the difference in probability of contracting the disease between a rat given the drug and a control rat. [Answer: $0.06 \pm 0.134$]

## Hypothesis Testing

**43.** A statistician named Burr relates the following story. "Having bought a bag of roasted chestnuts, the author walked home in the dark eating them with much gusto. After eating about 20, he arrived home, and, in opening the remaining 10 under the light, he found that 7 contained worms. What is the probability that none of the 20 contained worms? Or to phrase the problem better for statistical analysis: if there were only 7 wormy chestnuts among the original 30, what is the probability of drawing the first 20 all free from worms?"

**44.** Since there is no reason to believe that the salaries of individuals will be normally distributed, only in very large samples can we expect the mean to be normally distributed. With this in mind reexamine exercise 18. Regardless of the distribution of salaries of the female professionals, half the salaries will be above the median salary. Suppose that the salaries of the male professionals are known to have a median that is 97% of the mean. This situation would be typical since the presence of a few very high salaries can cause the mean to be somewhat unrepresentative. Does it now appear that the female professionals are gaining or losing relative to the men? [Answer: the median salary of the women is 83.5%, while 88% of 97% is 85.4%. So it appears that they are losing ground, but the result is again not significant. Using a Bernoulli process to model this, if the median salary of all women were 85.4%, then each woman's salary would have probability 0.5 of exceeding this figure. We observe that 3 of the 8 salaries do so. The probability that 3 (or fewer) would do so by chance alone is $(0.5)^8 + 8(0.5)^8 + \binom{8}{2}(0.5)^8 + \binom{8}{3}(0.5)^8 = 0.363$ which is too large for us to reject this model.]

**45.** (Certificate) In a certain survey of the work of chemical research workers, it was found, on the basis of extensive data, that on average each one required no fume hood for 60 per cent of the time, one for 30 per cent and two for 10 percent; three or more were never required. If a group of four chemists worked independently of one another, how many fume hoods should be available in order to provide adequate facilities for at least 95 per cent of the time?

Compute the probability distribution of the number of fume hoods needed by the four chemists. Then use this to answer the question.

**46.** In exercise 45, how many fume hoods would be required to satisfy a group of 50 chemists at least 95 per cent of the time? Use a normal approximation.

**47.** A governmental agency is responsible for protecting the fish populations of the lakes in a certain region. By means of many observations in the past it sets lower bounds for populations, in each lake, of various species of fish. If it is later found that one species in a given lake has gone below the specified lower bound, the agency has the power to enforce limits on the pollutants which the factories bordering on the lake may discharge into the lake. How can the agency determine whether the lower limit has been reached? One way to do so is to employ the procedure described in exercise II.23. Let the lower limit be $L$. We first capture $n$ fish, tag them and return them to the lake. Some time later we drop a net, capture $m$ fish and count how many are tagged. Describe how to find a number $T$ so that there is only a 5% chance that $T$ or more tagged fish will be found when there are $L$ or more fish in the lake. We will return to this problem in exercise VI.???.

**48.** (Silvey) An investigation was carried out on two suggested antidotes to the consequences of drinking, these being (a) 2 lb. of mashed potatoes and (b) a pint of milk. Ten volunteers were used, five to each antidote, the allocation to antidote being random. One hour after each had drunk the same quantity of alcohol and swallowed the appropriate antidote, a blood test was carried out and the following levels (mg/ml) of alcohol in the blood were recorded:

(a) 76, 52, 92, 80, 70

(b) 110, 96, 74, 105, 125

By means of the runs test, decide whether there is sufficient evidence to conclude that one treatment is more effective than the other.

**49.** (Guenther) Suppose that it is hypothesized that twice as many automobile accidents resulting in deaths occur on Saturday and Sunday as on other days of the week. That is, the probability that such accidents occur on Saturday is 2/9, on Sunday is 2/9, and on each other day of the week is 1/9. From the national record file, cards for 90 accidents are selected at random. These yield the following distribution of accidents according to the days of the week:

| Sun. | Mon. | Tues. | Wed. | Thurs. | Fri. | Sat. |
|---|---|---|---|---|---|---|
| 30 | 6 | 8 | 11 | 7 | 10 | 18 |

Do these data tend to support or contradict the hypothesis? Use a 5% significance level.

**50.** We wish to test whether or not the successive outcomes of a roulette wheel are random. For simplicity we will only record whether the ball fell into a red or a black slot of the wheel. In twenty spins of the wheel we observe the sequence: RRBRRBBBBRBRRRRRBBBR. Applying the runs test and using a 5% significance level, are the successive outcomes random? What does this suggest about this roulette wheel?

**51.** (Pazer & Swanson) A political scientist wishes to determine if the political preference of homeowners is independent of their immediately adjacent neighbors. A sequence of sixteen homeowners, along the same side of a street, were interviewed, and based upon their responses were designated as either more conservative than their median C, or less conservative than their median L. Here is the resulting sequence:

$$L, C, L, C, C, C, L, L, C, L, L, L, L, C, C$$

Using the runs test and a 5% level of significance, determine whether there is any evidence that political opinions are independent of one's neighbors (at least for this particular street).

**52\*.** We all have taken laboratory courses at some time or other, and the temptation to "fudge" data on our report has certainly occurred to us. What we may not have realized is that one can devise a statistical test to determine whether or not such fudging took place. Suppose that a biologist wishes to prove that a certain genetic trait follows the classical Mendelian laws. In this theory a trait is determined by two genes, one acquired from each of the two parents. Let us say that there are two alleles (possibilities) for a given gene, one dominant $A$ and one recessive $a$. Then there are three different genotypes $AA$, $Aa$ and $aa$. Let us suppose, as it often happens, that $AA$ and $Aa$ are indistinguishable. By successive inbreeding the biologist has access to two individuals known to have genotypes $AA$ and $aa$, respectively. When these are crossed the offspring all have genotype $Aa$. But when two of the offspring are crossed we find that the three genotypes $AA$, $Aa$ and $aa$ appear among their offspring with probabilities $1/4$, $1/2$ and $1/4$ respectively. Of course since we cannot actually distinguish $AA$ from $Aa$, this means that on the average $3/4$ of the offspring exhibit the dominant trait and $1/4$ exhibit the recessive one. Let us suppose that the biologist produces 10,326 offspring from a pair of $Aa$ parents. He observes that 7746 have the dominant trait and 2580 the recessive one. These are very close to the expected numbers 7744.5 and 2581.5 so he concludes that the experiment tends to support the hypothesis that this trait obeys the Mendelian laws.

Compute the probability that such an experiment would actually result in as close a fit with the theory as the biologist actually found. At the 5% level can one reject the hypothesis that the experiment was properly carried out? [Answers: about 3.6%, yes].

## The Law of Large Numbers

**53.** How many times must one toss a fair coin in order to have 95% confidence that it really is fair? Compare the number obtained by using the Bienayme-Chebyshev inequality with what we get using the Central Limit Theorem.

**54.** Let $X$ be a standard random variable (i.e. $E(X) = 0$ and $E(X^2) = 1$). Using the Bienayme-Chebyshev inequality, compute the smallest $a$ so that:

(a) $P(-a \leq X < a) \geq 0.95$

(b) $P(-a \leq X < a) \geq 0.99$

(c) $P(X > a) < 0.05$

(d) $P(X > a) < 0.01$

Compare these values with the corresponding ones for the case of $X$ being $N(0, 1)$.

**55\*.** Let $X$ be a nonnegative random variable. Prove that $P(X > a) \leq E(X)/a$, for any $a > 0$, whether $X$ has a variance or not. This is known as Markov's inequality. Show that Markov's inequality implies the Bienayme-Chebyshev inequality.

**56\*.** The Weak Law of Large Numbers states that if $X_1, X_2, \ldots$ are equidistributed random variables with finite mean and standard deviation, then for every $\varepsilon > 0$ there is an $N$ such that

$$P\!\left(\left|\frac{X_1 + X_2 + \cdots + X_n}{n} - m\right| < \varepsilon\right) > 1 - \varepsilon \quad \text{for every } n \geq N.$$

Prove it, using the Central Limit Theorem. (Actually, the standard deviation need not be finite, but that result is much harder to prove.)

**57\*.** Show that $\sum_{n=1}^{\infty} \frac{X_n}{n}$ converges with probability 1, where $X_n$ is equally likely to be either $+1$ or $-1$.

**58\*.** Explore experimentally what it means for a random variable not to have an expectation. Write computer programs to simulate the St. Petersburg game (Exercise III.29) and the gangster distribution (exercise III.36). In each case print out two columns of numbers. The first column shows the number of times the random experiment has been repeated, and the second shows the sample average of all the trials made so far. For the gangster distribution one should print a third column showing the median of all the trials made so far. This last number is the hardest to compute, and unlike the sample mean it requires that all the previous trials be stored in an array. Give an intuitive interpretation for what it means for a random variable not to have a finite expectation.

---

## Answers to Selected Exercises

**2.** $\operatorname{Cov}(X, Y) = E(XY) - E(X)E(Y) = E(X^3) - E(X)E(X^2)$. We know that $E(X) = 0$, by symmetry. But $X^3$ is also symmetrical: $P(X^3 = n) = P(-X^3 = -n) = P((-X)^3 = -n) = P(X^3 = -n)$, by the symmetry of $X$. Therefore $E(X^3) = 0$. Hence $\operatorname{Cov}(X, Y) = 0$. But $X$ and $Y$ are dependent. Therefore the converse to the Fact in section IV.1 is false.

**3.** Let $X_1, \ldots, X_n$ be random variables which are not necessarily independent. Then, since the Basic Fact of expectations does not require independence,

$$\operatorname{Var}(X_1 + \cdots + X_n) = E\!\left((X_1 + \cdots + X_n)^2\right) - \left(E(X_1 + \cdots + X_n)\right)^2$$

$$= \sum_i E(X_i^2) + 2\sum_{i < j} E(X_i X_j) - \sum_i E(X_i)^2 - 2\sum_{i < j} E(X_i)E(X_j)$$

$$= \sum_i \operatorname{Var}(X_i) + 2\sum_{i < j} \operatorname{Cov}(X_i, X_j).$$

We now apply this formula to the gaps $L_i$ in the uniform process. We know that $X_{(k)} = L_1 + \cdots + L_k$ and that the gaps are exchangeable (see section V.7 for details). Therefore

$$\operatorname{Var}(X_{(k)}) = \sum_{j=1}^{k} \operatorname{Var}(L_j) + 2\sum_{j < \ell} \operatorname{Cov}(L_j, L_\ell)$$

$$= k\,\operatorname{Var}(L_1) + k(k - 1)\operatorname{Cov}(L_1, L_2).$$

Now the special case $k = n + 1$ is easy because $X_{(n+1)} = L_1 + \cdots + L_{n+1} = a$ is a constant, so $\operatorname{Var}(X_{(n+1)}) = 0$. Therefore

$$0 = \operatorname{Var}(X_{(n+1)}) = (n + 1)\operatorname{Var}(L_1) + n(n + 1)\operatorname{Cov}(L_1, L_2).$$

Thus $\operatorname{Cov}(L_1, L_2) = -\frac{1}{n}\operatorname{Var}(L_1)$, and the computation of the variance of any order statistic reduces to the evaluation of one integral, $E(L_1^2)$. Moreover, by suitable manipulation this one can be reduced to an evaluation of $E(X_{(1)}^2)$ but in another Uniform process.

$$E(L_1^2) = \int_0^a x^2 \operatorname{dens}(L_1 = x) \, dx = \int_0^a x^2 \cdot \frac{(n+1)(a - x)^n}{a^{n+1}} \, dx.$$

This integral looks very similar to the one for $E(X_{(1)}^2)$ but for the Uniform process of sampling $n + 1$ points from $[0, a]$:

$$E(X_{(1)}^2) = \int_0^a x^2 \operatorname{dens}(X_{(1)} = x) \, dx = \int_0^a x^2 \cdot \frac{n(a - x)^{n-1}}{a^n} \, dx.$$

Thus

$$E(L_1^2) = \frac{n + 1}{a} \cdot \frac{a}{n} \cdot E(X_{(1)}^2) = \frac{2a^2}{(n + 1)(n + 2)}.$$

Therefore,

$$\operatorname{Var}(L_1) = E(L_1^2) - (E(L_1))^2 = \frac{2a^2}{(n+1)(n+2)} - \frac{a^2}{(n+1)^2} = \frac{a^2 n}{(n+1)^2(n+2)}.$$

Furthermore,

$$\operatorname{Cov}(L_1, L_2) = -\frac{1}{n}\operatorname{Var}(L_1) = \frac{-a^2}{(n+1)^2(n+2)}.$$

Thus

$$\operatorname{Var}(X_{(k)}) = k \cdot \frac{a^2 n}{(n+1)^2(n+2)} + k(k-1) \cdot \frac{-a^2}{(n+1)^2(n+2)} = \frac{k(n - k + 1)a^2}{(n+1)^2(n+2)}.$$

**6.** Recall that the sample mean and variance are

$$\bar{m} = \frac{X_1 + \cdots + X_n}{n}$$

$$\hat{\sigma}^2 = \frac{(X_1 - \bar{m})^2 + \cdots + (X_n - \bar{m})^2}{n - 1}$$

$$\tilde{\sigma}^2 = \frac{(X_1 - m)^2 + \cdots + (X_n - m)^2}{n}$$

Each of these is a random variable. We will compute their expectations.

$$E(\bar{m}) = \frac{E(X_1) + \cdots + E(X_n)}{n} = \frac{nm}{n} = m.$$

The computation of $E(\hat{\sigma}^2)$ clearly reduces to a computation of $E\!\left(\sum_{i=1}^n (X_i - \bar{m})^2\right)$. Now

$$(X_i - \bar{m})^2 = \left(X_i - \frac{1}{n}\sum_{j=1}^n X_j\right)^2 = X_i^2 - \frac{2}{n}\sum_{j=1}^n X_i X_j + \frac{1}{n^2}\sum_{j=1}^n \sum_{k=1}^n X_j X_k.$$

Before starting our computation of $E\!\left(\sum_{i=1}^n (X_i - \bar{m})^2\right)$ we recall that $E(X_i X_j) = E(X_i)E(X_j) = m^2$ when $i \neq j$, because $X_i$ and $X_j$ are independent. Furthermore, $E(X_i^2) = \sigma^2 + m^2$, by definition of $\sigma^2$. Hence

$$E\!\left(\sum_{i=1}^n (X_i - \bar{m})^2\right) = n(\sigma^2 + m^2) - \frac{2}{n}\!\left(n(\sigma^2 + m^2) + n(n-1)m^2\right) + \frac{1}{n^2}\!\left(n(\sigma^2 + m^2) + n(n-1)m^2\right) \cdot n$$

$$= n(\sigma^2 + m^2) - 2(\sigma^2 + m^2) - 2(n-1)m^2 + (\sigma^2 + m^2) + (n-1)m^2 = (n-1)\sigma^2.$$

Therefore, $E(\hat{\sigma}^2) = \sigma^2$, but this works only if the denominator in the defining formula for $\hat{\sigma}^2$ is $n - 1$ not $n$. For $n$ large, however, this distinction is small.

**12.** The misleading feature of the statement is the exclamation point! On the average, one would expect that out of five experiments, each significant at the .05 level, one will be significant at the .01 level by chance alone. Furthermore, it would not be at all surprising if out of five experiments, each significant at the .05 level, two were significant at the .01 level. The chance of this happening being $\binom{5}{2}\left(\frac{1}{5}\right)^2\left(\frac{4}{5}\right)^3 = 0.2$.

For example, suppose that we wish to test whether a coin is fair, as in section 4. This may seem like a trivial example, but most tests of significance of a hypothesis are logically equivalent to this test. In this test we toss the coin 100 times. We get a significant result at the .05 level if 40 or fewer or 60 or more heads occur. At the .01 level we would find a significant result if 37 or fewer or 63 or more heads occur. Now on the average if we test 100 fair coins we will find that 5 are significantly unfair at the .05 level and that 1 is significantly unfair at the .01 level. And we will come to this conclusion despite the fact that the coins are all fair.

As another example, we've all seen experimental results thrown out on flimsy excuses such as "contaminated reagents" or "interference." In most cases there is a good reason to discard the data. But there are cases, particularly those that rest heavily on statistics for their validity, where significant results occur only because the insignificant repetitions of the experiment were discarded.

The conclusion of this discussion is simply that an experimenter should be aware of how weak statistical reasoning and statistical measurement can be. Statistics never relieves one of the necessities of understanding the phenomenon being studied and can only make a contribution, albeit an important one, toward achieving this understanding.

**15.** The problem requires finding a single-tail test of significance. We will illustrate the use of three models for this phenomenon: Bernoulli, Poisson and Normal. Let $D$ be the number of defective screws produced during one hour of operation. On the average, during normal operation, we expect 100 defective screws to be produced, i.e. $E(D) = 100$. We will adjust the machine if there are significantly more than 100 defective screws. In probabilistic language this would be written as follows. Choose $d$ so that

$$P(D > d) = \beta,$$

where $\beta$ is the desired significance level. Then the machine is out of adjustment at significance level $\beta$ if $D$ is found to be greater than $d$.

*Bernoulli model:* A defective screw is produced with probability $p = 0.01$ and each screw is independent of the others. Then $D = S_{10{,}000}$ and

$$P(D > d) = 1 - P(D \leq d) = 1 - \sum_{k=0}^{d} \binom{10{,}000}{k} p^k q^{10{,}000-k}.$$

*Poisson model:* (included for later reference) Assume the process is continuous with density of defects $\lambda = 0.01$. This will not be as good as the Bernoulli model but is a good approximation and is much simpler computationally. For this model, $D = N(10{,}000)$ and

$$P(D > d) = 1 - P(N(10{,}000) \leq d) = 1 - \sum_{k=0}^{d} \frac{100^k}{k!} e^{-100}.$$

*Normal model:* We use the Central Limit Theorem in the Bernoulli model. $D = S_{10{,}000}$ has mean 100 and variance 99. Thus $\frac{D - 100}{\sqrt{99}}$ is approximately a standard normal distribution.

In the table below we compare the above three models. Write $X$ for a standard normal R.V.

| $d$ | $P(S_{10{,}000} > d)$ | $P(N(10{,}000) > d)$ | $P\!\left(X > \frac{d - 100}{\sqrt{99}}\right)$ |
|---|---|---|---|
| 77 | .9903 | .9900 | .9896 |
| 84 | .9434 | .9425 | .9461 |
| 100 | .4734 | .4734 | .5000 |
| 116 | .0513 | .0522 | .0539 |
| 117 | .0420 | .0428 | .0438 |
| 123 | .0109 | .0112 | .0104 |
| 124 | .0085 | .0088 | .0079 |

All three models agree that $d = 116$ for significance level .05 and $d = 123$ for significance level .01.

**37.** The number of members of the electorate is an irrelevant datum in the problem. Assume that the percentage desired is $p$ and that the electorate may be modeled by a Bernoulli process. We proceed as in exercise 11. Note that there is an ambiguity in the problem. Do we want $p \pm 0.01$ or $p \pm 0.01p$, i.e. do we want an absolute or relative accuracy? I will assume the desired accuracy is absolute, as would normally be the case in such a situation. We want to choose $n$ so that

$$P(p - 0.01 < \hat{p} < p + 0.01) = 0.95$$

or so that

$$P(p - 0.05 < \hat{p} < p + 0.05) = 0.99.$$

We rewrite these two as

$$P\!\left(-0.01\sqrt{\frac{n}{pq}} < \frac{\hat{p} - p}{\sqrt{pq/n}} < 0.01\sqrt{\frac{n}{pq}}\right) = 0.95$$

Since $\frac{\hat{p} - p}{\sqrt{pq/n}}$ is close to being $N(0, 1)$, we conclude that $n$ must be chosen either so that $0.01\sqrt{n/pq} = 1.96$ or so that $0.05\sqrt{n/pq} = 2.58$, i.e. either $n$ must be $38{,}416\,pq$ or $n$ must be $2{,}663\,pq$. Regardless what $p$ happens to be, the latter choice is better: it is cheaper to find $p$ to within 5% with 99% confidence than to find $p$ to within 1% with 95% confidence.

**40.** The only way we know of for computing $p$ is to toss the thumbtack. How many times must we do it? The problem requires that $n$ be large enough that $\hat{p}$ be within $p/10$ of $p$ with probability 0.95, i.e. that

$$P\!\left(p - \frac{p}{10} < \hat{p} < p + \frac{p}{10}\right) = 0.95.$$

Now for large $n$, $\hat{p} = \frac{S_n}{n}$ is close to being $N\!\left(p, \frac{pq}{n}\right)$. So rewrite the above condition as:

$$P\!\left(\frac{-p\sqrt{n}}{10\sqrt{pq}} < \frac{\hat{p} - p}{\sqrt{pq/n}} < \frac{p\sqrt{n}}{10\sqrt{pq}}\right) = 0.95,$$

and $\frac{\hat{p} - p}{\sqrt{pq/n}}$ is close to being $N(0, 1)$. Therefore $n$ should be chosen so that $\frac{p\sqrt{n}}{10\sqrt{pq}} = 1.96$, i.e. $n = \frac{384q}{p}$.

The lack of symmetry between $p$ and $q$ arises from the fact that we want to find $p$ to an accuracy of $p/10$. When $p$ is small, this is very accurate indeed. As one tosses the tack, one will get a better idea of what $p$ is and hence a better idea of what $n$ ought to be.

In an actual experiment, I tossed a thumbtack 25 times, and it landed on its head 12 times. So I would initially estimate that I would require $n = 416$ tosses to determine $p$ with the desired accuracy and confidence. For a confidence level of .99, $n$ must be $\frac{666q}{p}$. In my experiment, I would have estimated that $n = 721$ tosses would be needed to determine $p$.

**41.** In both cases we will use a Bernoulli model, but for computation we use the normal distribution. Let $R_A$, $R_B$ and $R$ be the number of requests for trunklines at the busiest time from city A, city B and from the combined pair of cities, respectively. In the Bernoulli process with bias $p = 0.01$, $R_A$ and $R_B$ have the distribution of $S_{5000}$ while $R$ has the distribution of $S_{10{,}000}$.

*Case 1: Two cities serviced separately.* Each city requires $l$ trunklines, where

$$P(R_A > l) = P(R_B > l) = P(S_{5000} > l) = 0.01.$$

Now $S_{5000}$ is approximately $N(50, 49.5)$. Therefore $\frac{S_{5000} - 50}{\sqrt{49.5}}$ is approximately standard normal. Thus, looking in the standard normal distribution table,

$$P\!\left(\frac{S_{5000} - 50}{\sqrt{49.5}} > 2.33\right) = 0.01$$

$$P(S_{5000} > 66.39) = 0.01.$$

Therefore $l = 67$. This means that 134 trunklines would be required in all, for a total cost of \$1,340,000.

*Case 2: Two cities jointly serviced.* The cities require a total of $l$ trunklines, where

$$P(R > l) = P(S_{10{,}000} > l) = 0.01.$$

Now $S_{10{,}000}$ is approximately $N(100, 99)$. Therefore $\frac{S_{10{,}000} - 100}{\sqrt{99}}$ is close to being $N(0, 1)$. Again consulting our table,

$$P\!\left(\frac{S_{10{,}000} - 100}{\sqrt{99}} > 2.33\right) = 0.01$$

or

$$P(S_{10{,}000} > 123.18) \approx 0.01.$$

Therefore $l = 124$. This means that only 124 trunklines would be needed. But now we also require \$50,000 of additional equipment. The total cost is then \$1,290,000.

Despite the extra equipment, we find that this option is still the better of the two.
