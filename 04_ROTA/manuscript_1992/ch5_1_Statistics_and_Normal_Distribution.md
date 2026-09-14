---
title: "Chapter V: Statistics and the Normal Distribution"
author: "Gian-Carlo Rota"
edition: "1992"
chapter_number: 5
part: 1
---

# Chapter V — Statistics and the Normal Distribution

The normal distribution arises whenever we make a succession of imperfect measurements of a quantity that is supposed to have a definite value. If all the students in a class take the same test, we may think of their grades as being imperfect measurements of the average capability of the class. In general, when we make a number of independent measurements, their average is intuitively going to be an approximation to the quantity we are trying to find.

On the other hand, the various measurements will tend to be more or less spread out on both sides of the average value. We need a measure for how far individual measurements are spread out around the quantity being measured. This will tell us, for example, how many measurements must be made in order to determine the quantity to a certain accuracy. It will also make it possible to formulate statistical tests to determine whether or not the data in an experiment fits the models we have proposed for the experiment.

## 1. Variance

The variance of a random variable $X$ is a measure of the spread of $X$ away from its mean.

**Definition.** Let $X$ be a random variable whose mean is $E(X) = m$. The variance of $X$ is $\operatorname{Var}(X) = E((X - m)^2)$, if this expectation exists, i.e. the corresponding series or integral converges. The square root of the variance is called the standard deviation of $X$ and is written $\sigma(X) = \sqrt{\operatorname{Var}(X)}$. We sometimes write $\sigma^2(X)$ for $\operatorname{Var}(X)$. If $X$ is an integer random variable having probability distribution $p_n = P(X = n)$, then

$$\operatorname{Var}(X) = \sum_{n=0}^{\infty} (n - m)^2 \, p_n.$$

If $X$ is a continuous random variable whose density is $f(x) = \operatorname{dens}(X = x)$, then

$$\operatorname{Var}(X) = \int_{-\infty}^{\infty} (x - m)^2 f(x) \, dx.$$

In the continuous case we can imagine that $f(x)$ is the density at $x$ of a thin rod. This rod has total mass 1 and balances at the mean $m$. The moment of inertia of this rod about its balance point is precisely the variance. If we rotate the rod about $m$ it would have the same angular momentum if all the mass were concentrated at a distance $\sigma(X)$ from the point of rotation.

It is possible for a random variable not to have a mean. It is also possible for a random variable to have a mean but not to have a finite variance. We shall see examples in the exercises. However, in a great many physical processes it is reasonable to assume that the random variables involved do have a finite variance (and hence also a mean). For example, on an exam if the possible scores range from 0 to 100, the measurement of someone's exam score is necessarily going to have a finite variance.

A useful formula for the variance is the following:

$$\operatorname{Var}(X) = E(X^2) - E(X)^2.$$

This is an easy formula to verify. The crucial step is that the expectation is additive, even when the random variables involved are not independent.

$$\operatorname{Var}(X) = E((X - m)^2) = E(X^2 - 2mX + m^2) = E(X^2) - 2mE(X) + m^2 = E(X^2) - 2m^2 + m^2 = E(X^2) - m^2.$$

As we just remarked, the expectation is additive. In general, it is not multiplicative; that is, $E(XY)$ need not be $E(X)E(Y)$. The variance is a measure of the extent to which the expectation is not multiplicative when $X = Y$, for in this case we have $\operatorname{Var}(X) = E(X \cdot X) - E(X)E(X)$. The covariance of $X$ and $Y$ in general is the difference

$$\operatorname{Cov}(X, Y) = E(XY) - E(X)E(Y).$$

We will not be using covariances except in a few optional exercises. Covariances are often used as a measure of the independence of random variables because of the following important fact:

**Product Rule for Expectation:** *If $X$ and $Y$ are independent random variables, then $E(XY) = E(X)E(Y)$, or equivalently $\operatorname{Cov}(X, Y) = 0$.*

We will only consider the case of integer random variables. The proof for the continuous case requires technicalities that obscure the basic idea. We leave these as an exercise.

We first compute the distribution of the product $XY$ in terms of the distributions of $X$ and of $Y$. The event $(XY = n)$ is the disjoint union of the events $(X = j) \cap (Y = k)$ for all integers $j$ and $k$ whose product is $n$. Hence

$$P(XY = n) = \sum_{jk = n} P((X = j) \cap (Y = k)).$$

Now $X$ and $Y$ are independent. Therefore,

$$P(XY = n) = \sum_{jk = n} P(X = j) P(Y = k).$$

Next we use the above formula to compute the expectation of $XY$; namely,

$$E(XY) = \sum_n n \, P(XY = n) = \sum_n n \sum_{jk = n} P(X = j) P(Y = k) = \sum_n \sum_{jk = n} jk \, P(X = j) P(Y = k).$$

Now summing over $n$ and then summing over all $j$'s and $k$'s whose product is $n$ is the same as simply summing over all $j$'s and $k$'s with no restrictions. Thus

$$E(XY) = \sum_{j,k} jk \, P(X = j) P(Y = k) = \sum_{j,k} j \, P(X = j) \cdot k \, P(Y = k) = \sum_j j \, P(X = j) \cdot \sum_k k \, P(Y = k) = E(X) E(Y).$$

This gives us the product rule. Note that unlike the Addition Rule for Expectations (the "Basic Fact") we must have that $X$ and $Y$ are independent for the product rule to work. We add that it is possible for non-independent random variables $X$ and $Y$ to satisfy $\operatorname{Cov}(X, Y) = 0$. Thus, the covariance is not a true test of independence.

We now derive the most important consequence of the Product Rule for Expectations: the variance is additive for independent random variables. As we will later see, this property uniquely characterizes the variance among all possible measures of "spread" of a random variable about its mean.

**Addition Rule for Variance.** *If $X$ and $Y$ are independent, then $\operatorname{Var}(X + Y) = \operatorname{Var}(X) + \operatorname{Var}(Y)$.*

To see why this is so we simply calculate $\operatorname{Var}(X + Y)$ using the Product Rule for Expectations:

$$\operatorname{Var}(X + Y) = E((X + Y)^2) - (E(X + Y))^2$$
$$= E(X^2 + 2XY + Y^2) - (E(X) + E(Y))^2$$
$$= E(X^2) + 2E(XY) + E(Y^2) - E(X)^2 - 2E(X)E(Y) - E(Y)^2$$
$$= E(X^2) - E(X)^2 + E(Y^2) - E(Y)^2$$
$$= \operatorname{Var}(X) + \operatorname{Var}(Y).$$

In terms of the standard deviations, $\sigma(X + Y) = \sqrt{\sigma^2(X) + \sigma^2(Y)}$; the standard deviations of independent random variables act like the components of a vector whose length is $\sigma(X + Y)$.

There are two more properties of the variance that are important for us. Both are quite obvious:

$$\operatorname{Var}(cX) = c^2 \operatorname{Var}(X) \qquad \operatorname{Var}(X + c) = \operatorname{Var}(X).$$

The first expresses the fact that the variance is a quadratic concept. The second is called shift invariance. It should be obvious that merely shifting the value of a random variable $X$ by a constant only changes the mean and not the spread of the measurement about the mean.

### Basic Properties of Variance and Standard Deviation

1. $\operatorname{Var}(X) = E(X^2) - E(X)^2$, $\quad \sigma(X) = \sqrt{\operatorname{Var}(X)}$

2. If $X$ and $Y$ are independent random variables having finite variance, then:
   $\operatorname{Var}(X + Y) = \operatorname{Var}(X) + \operatorname{Var}(Y)$, $\quad \sigma(X + Y) = \sqrt{\sigma^2(X) + \sigma^2(Y)}$

3. $\operatorname{Var}(cX) = c^2 \operatorname{Var}(X)$, $\quad \sigma(cX) = |c| \, \sigma(X)$

4. $\operatorname{Var}(X + c) = \operatorname{Var}(X)$, $\quad \sigma(X + c) = \sigma(X)$

We now compute the variances of some of the random variables we have encountered so far in the Bernoulli, Uniform and Poisson processes.

### Bernoulli Process

Consider a single toss of a biased coin. This is described by any random variable $X_n$ of the Bernoulli process. Recall that

$$X_n = \begin{cases} 0 & \text{if the } n\text{th toss is tails} \\ 1 & \text{if the } n\text{th toss is heads} \end{cases}$$

Since $1^2 = 1$ and $0^2 = 0$, $X_n^2$ is the same as $X_n$. Therefore, the variance of any $X_n$ is

$$\operatorname{Var}(X_n) = E(X_n^2) - E(X_n)^2 = E(X_n) - E(X_n)^2 = p - p^2 = pq.$$

Notice that the largest variance corresponds to a fair coin ($p = \tfrac{1}{2}$). We intuitively think of a fair coin as having the most "spread out" distribution of all biased coins; while the more biased a coin is, the more its distribution is "concentrated" about its mean.

Next consider the number of successes $S_n$ in $n$ tosses of a biased coin. Since $S_n = X_1 + X_2 + \cdots + X_n$ is the sum of $n$ independent random variables all of whose variances are the same, $\operatorname{Var}(S_n) = n\operatorname{Var}(X_1) = npq$. If we tried to compute $\operatorname{Var}(S_n)$ directly from the definition, we get

$$\operatorname{Var}(S_n) = \sum_{k=0}^{n} (k - np)^2 \binom{n}{k} p^k q^{n-k}.$$

That this is $npq$ is far from obvious.

We leave the computation of the variances of the gaps $T_k$ and the waiting times $W_k$ as exercises.

$$\operatorname{Var}(W_k) = \frac{kq}{p^2} \qquad \operatorname{Var}(T_k) = \frac{q}{p^2}$$

### Uniform Process

Consider a point $X$ dropped at random uniformly on $[0, a]$. Clearly the average value of the point is $\frac{a}{2}$, the midpoint of $[0, a]$. The variance is

$$\operatorname{Var}(X) = E(X^2) - E(X)^2 = \int_0^a x^2 \cdot \frac{1}{a} \, dx - \left(\frac{a}{2}\right)^2 = \frac{a^2}{3} - \frac{a^2}{4} = \frac{a^2}{12}.$$

So the standard deviation is $\sigma = \frac{a}{\sqrt{12}} = \frac{a}{2\sqrt{3}} \approx 0.2887a$. We can think of this in the following way. Given a uniform bar of length $a$, its midpoint is the center of mass. If the bar were set spinning around its center of mass, the angular momentum would be the same if the mass were all at a distance $\frac{a}{2\sqrt{3}}$ from the center of rotation.

We leave it as an exercise to compute the variances of the gaps and the order statistics of the Uniform process. Notice that we cannot use the fact that $X_{(k)} = L_1 + L_2 + \cdots + L_k$ because the gaps are not independent.

$$\operatorname{Var}(L_i) = \frac{a^2}{(n+1)^2(n+2)}$$

$$\operatorname{Var}(X_{(k)}) = \frac{a^2 k(n - k + 1)}{(n+1)^2(n+2)}$$

We summarize the above computations in this table.

| Distribution | Model(s) | Expectation | Variance |
|---|---|---|---|
| Bernoulli | $X_i$ in the Bernoulli process | $p$ | $pq$ |
| Binomial | $S_n$ ($X_i$ when $n = 1$) in the Bernoulli process | $np$ | $npq$ |
| Geometric | $W_1$ or any $T_k$ in the Bernoulli process | $\frac{1}{p}$ | $\frac{q}{p^2}$ |
| Negative Binomial | $W_k$ in the Bernoulli process | $\frac{k}{p}$ | $\frac{kq}{p^2}$ |
| Uniform | $X_i$ in the Uniform process | $\frac{a}{2}$ | $\frac{a^2}{12}$ |
| Dirichlet | $X_{(k)}$ ($L_i$ when $k = 1$) in the Uniform process | $\frac{ka}{n+1}$ | $\frac{a^2 k(n - k + 1)}{(n+1)^2(n+2)}$ |

### Standardization

If we shift a random variable $X$ by a constant, replacing $X$ by $X + c$, or if we make a scale change, multiplying $X$ by a nonzero constant, we have not altered $X$ in a significant way. We have only reinterpreted a measurement of $X$ by a linear change of variables. The idea of standardization is to choose a single "standard" random variable among all those related to one another by a linear change of variables. Then in order to determine if two random variables are "essentially" the same we should compare their standardized versions.

**Definition:** A random variable $X$ is **standard** or **standardized** if $E(X) = 0$ and $\operatorname{Var}(X) = 1$. If $X$ has finite variance, then $\frac{X - m}{\sigma}$, where $m = E(X)$ and $\sigma = \sigma(X)$, is standard. We call $\frac{X - m}{\sigma}$ the standardization of $X$. A physicist would say that $\frac{X - m}{\sigma}$ expresses $X$ in "dimensionless units."

The covariance of the standardization of two random variables $X$ and $Y$ is called the coefficient of correlation and is written $\rho(X, Y)$. It is easy to prove that $|\rho(X, Y)| \leq 1$ and that $\rho(X, Y) = \frac{\operatorname{Cov}(X, Y)}{\sigma(X)\sigma(Y)}$, and we leave these as exercises. Because of the importance of standardization, we will prove that the standardization of a random variable is really standard.

**Standard Fact:** *If $X$ has finite variance, then $\frac{X - m}{\sigma}$ is standard.*

**Proof:**

$$E\!\left(\frac{X - m}{\sigma}\right) = \frac{1}{\sigma} E(X - m) = \frac{m - m}{\sigma} = 0$$

$$\operatorname{Var}\!\left(\frac{X - m}{\sigma}\right) = \frac{1}{\sigma^2}\operatorname{Var}(X - m) \quad \text{(by quadraticity)}$$
$$= \frac{1}{\sigma^2}\operatorname{Var}(X) \quad \text{(by shift invariance)}$$
$$= 1 \quad (\sigma^2 = \operatorname{Var}(X))$$

We call $\sigma(X)$ the standard deviation because of its appearance in the standardization. We think of $\sigma(X)$ as being the natural unit for measuring how far a given observation of $X$ deviates from the mean. The importance of standardization will gradually emerge in the next few sections.

### Uniqueness of Variance

One may naturally wonder just how "natural" the variance is as a measure of the spread of the distribution of a random variable $X$ about its mean $m = E(X)$. Some other possibilities that come to mind are the following:

(a) $E(|X - m|)$, the average distance of $X$ from $m$.

(b) $E((X - m)^{2n})$, $(n > 2)$, the $2n$th moment of $X$ about $m$. For example, the 4th moment of the standardization of $X$ is called the kurtosis of $X$.

(c) $E(\log_e(1 + (X - m)^2))$, which acts like $E((X - m)^2)$ when $X$ is concentrated about $m$ (since the Taylor expansion of $\log_e(1 + x^2)$ is $x^2 - \frac{x^4}{2} + \cdots$) but which acts like $2E(\log_e |X - m|)$ when $X$ is very spread out.

(d) $E(\log_e(1 + |X - m|))$, which acts like $E(|X - m|)$ for $X$ near $m$ but like $E(\log_e |X - m|)$ for $X$ far from $m$.

We now list the desirable properties of any measure of spread. A measure of spread of a distribution is an assignment of a non-negative number (including $+\infty$), denoted $\operatorname{Spr}(X)$, to every random variable such that the following hold.

**Spread property 1:** $\operatorname{Spr}(X)$ is shift-invariant, i.e. $\operatorname{Spr}(X + c) = \operatorname{Spr}(X)$ for any constant $c$. Another way to express this is that $\operatorname{Spr}(X)$ depends only on $\operatorname{Spr}(X - m)$, where $m = E(X)$.

**Spread property 2:** There is a function $s(x)$ such that $\operatorname{Spr}(X) = E(s(X - m))$.

In effect the function $s(x)$ measures the importance to us of a deviation of $X$ from the mean $m$ by a distance $x$. Compared to the ordinary variance $\operatorname{Var}(X) = E((X - m)^2)$, the choice of $E(|X - m|)$ as a measure of spread will emphasize small deviations from $m$ and deemphasize large deviations. The reverse would be the case for $E((X - m)^4)$. On the other hand, $E(\log_e(1 + (X - m)^2))$ has roughly the same emphasis as $\operatorname{Var}(X)$ for small deviations from the mean while greatly deemphasizing large ones.

All of the concepts of spread we have seen so far satisfy property 2. Although this seems to be a reasonable assumption, there are concepts of spread based on percentiles and the median, which are quite useful and satisfy property 1 but not 2. For example, let $F(x)$ be the distribution function of a continuous random variable $X$. The average quartile of $X$ from its median is

$$\operatorname{Spr}(F) = \tfrac{1}{2}\!\left(F^{-1}\!\left(\tfrac{3}{4}\right) - F^{-1}\!\left(\tfrac{1}{4}\right)\right).$$

In fact, if $G = F + c$, then $G^{-1}(\tfrac{1}{4}) = F^{-1}(\tfrac{3}{4}) - c$ and $\operatorname{Spr}(F) = \operatorname{Spr}(G)$.

The next property we consider is evenness:

**Spread property 3.** The function $s(x)$ is even, i.e. $s(-x) = s(x)$.

In other words, deviations on either side of the mean count equally in the measure of the spread. If we replace property 3 by $s(-x) = -s(x)$, we get a measure of "skewness." This would measure how much more of the distribution is on one side of the mean than on the other. The standard measure of skewness of a random variable $X$ is $E(Y^3)$, where $Y$ is the standardization of $X$. Another measure of skewness is the difference between the mean and median of $X$. More precisely, if $X$ is continuous and has distribution function $F(x)$, then the median minus the mean is $F^{-1}(\tfrac{1}{2}) - E(X)$.

Our last property is the most important one. We require that as we add together independent random variables, the sum gets more and more spread out, in a linear way.

**Spread property 4:** If $X$ and $Y$ are independent, then $\operatorname{Spr}(X + Y) = \operatorname{Spr}(X) + \operatorname{Spr}(Y)$. In other words we require $\operatorname{Spr}(X)$ to be an additive measure on sums of independent random variables. This is the only property of a spread which is not shared by the many examples of spread we have described so far.

**Uniqueness of Variance:** *If $\operatorname{Spr}(X)$ is a measure of spread satisfying the above four properties, then there is a constant $k$ such that $\operatorname{Spr}(X) = k\,\operatorname{Var}(X)$ for all random variables $X$.*

**Proof:** As with all such uniqueness results, this is rather technical to prove, and we suggest that you skip the proof until later. We first dispense with a trivial detail. The constant zero may be regarded as a random variable, and it is trivial to see that it is independent of itself. Therefore, by property 4, $\operatorname{Spr}(0) = \operatorname{Spr}(0 + 0) = \operatorname{Spr}(0) + \operatorname{Spr}(0)$ and hence $\operatorname{Spr}(0) = 0$. Now, by property 2, $\operatorname{Spr}(0) = s(0)$ so we get that $s(0) = 0$.

Let $c$ and $d$ be two positive real numbers. Let $X$ be the unique random variable taking only $c$ and $(-d)$ as values and having mean zero. In other words, let

$$P(X = c) = \frac{d}{c + d} \qquad \text{and} \qquad P(X = -d) = \frac{c}{c + d}.$$

By properties 2 and 3,

$$\operatorname{Spr}(X) = E(s(X)) = s(c)P(X = c) + s(d)P(X = -d) = \frac{s(c)d + s(d)c}{c + d}.$$

Now let $Y$ be a second independent random variable having the same distribution as $X$. By property 4,

$$\operatorname{Spr}(X - Y) = \operatorname{Spr}(X) + \operatorname{Spr}(Y) = 2\,\frac{s(c)d + s(d)c}{c + d},$$

and by properties 2 and 3,

$$\operatorname{Spr}(X - Y) = E(s(X - Y)) = \frac{s(c + d)cd}{(c + d)^2} + \cdots$$

Combining these two gives:

$$s(c + d)cd = (c + d)(s(c)d + s(d)c).$$

Dividing by $cd(c + d)$ gives:

$$\frac{s(c + d)}{(c + d)} = \frac{s(c)}{c} + \frac{s(d)}{d} \qquad (c > 0 \text{ and } d > 0). \tag{*}$$

In particular we have $s(2c) = 4s(c)$ for any number $c$.

By property (2), equation $(*)$ also holds for both $c$ and $d$ negative. However, if one is positive and the other negative we need a new approach. For this case we compute $\operatorname{Spr}(X + Y)$ in two ways as was done above for $\operatorname{Spr}(X - Y)$ except that we require the fact that $s(2c) = 4s(c)$ in this new computation. It is easy to check that this implies:

$$\frac{s(c - d)}{(c - d)} = \frac{s(c)}{c} - \frac{s(d)}{d} \qquad (c > 0 \text{ and } d > 0). \tag{**}$$

Therefore if we define $t(x)$ to be $\frac{s(x)}{x}$ if $x \neq 0$ and to be $0$ otherwise then $t(x)$ is additive:

$$t(c + d) = t(c) + t(d)$$

for all $c$ and $d$. It is well known (we omit the proof) that this condition implies that $t(x) = kx$ for some constant $k$. It then follows that $s(x) = x\,t(x) = kx^2$ and hence that

$$\operatorname{Spr}(X) = E(s(X - m)) = kE((X - m)^2) = k\,\operatorname{Var}(X).$$

This completes the proof.

## 2. The Bell Shaped Curve

In this section we introduce one of the most important distributions in probability: the normal distribution. The traditional explanation for the importance of the normal distribution relies on the Central Limit Theorem which we will discuss in the next section. However we feel that the explanation using entropy and information given in chapter VII is better because it provides a context which explains the ubiquity not only of the normal distribution but of several other important distributions as well.

**Definition:** A continuous random variable $X$ is said to have the **normal** or **Gaussian** distribution with mean $m$ and variance $\sigma^2$ if

$$\operatorname{dens}(X = x) = \frac{1}{\sigma\sqrt{2\pi}} \, e^{-(x - m)^2 / 2\sigma^2}.$$

For brevity we will write simply "$X$ is $N(m, \sigma^2)$." Some authors write $N(m, \sigma)$ instead of $N(m, \sigma^2)$; one should beware.

Unlike most distributions the formula for the normal density comes with the mean and standard deviation already specified. We should however verify that $m$ and $\sigma^2$ really are the mean and variance. In fact it isn't obvious that this formula actually defines the density of a continuous random variable. To verify these facts we use the following basic formula which everyone ought to have seen in a Calculus course at some time:

$$\int_{-\infty}^{\infty} e^{-x^2} \, dx = \sqrt{\pi}.$$

To prove this let $A = \int_{-\infty}^{\infty} e^{-x^2} \, dx$. Then since $x$ is a dummy variable, $A = \int_{-\infty}^{\infty} e^{-y^2} \, dy$ also. Therefore $A^2 = \int_{-\infty}^{\infty} e^{-x^2} \, dx \int_{-\infty}^{\infty} e^{-y^2} \, dy$.

Now we switch to polar coordinates and integrate:

$$A^2 = \int_{-\infty}^{\infty} \int_{-\infty}^{\infty} e^{-(x^2 + y^2)} \, dx \, dy = \int_0^{2\pi} \int_0^{\infty} e^{-r^2} \, r \, dr \, d\theta = 2\pi \cdot \frac{1}{2} = \pi.$$

Hence $A = \sqrt{\pi}$. We use this formula first to show that the normal density really defines a density. We first change variables to $y = \frac{x - m}{\sigma\sqrt{2}}$ so that $\sigma\sqrt{2}\,dy = dx$. Then

$$\int_{-\infty}^{\infty} \frac{1}{\sigma\sqrt{2\pi}} \, e^{-(x-m)^2/2\sigma^2} \, dx = \frac{1}{\sigma\sqrt{2\pi}} \int_{-\infty}^{\infty} e^{-y^2} \, \sigma\sqrt{2} \, dy = \frac{1}{\sqrt{\pi}} \int_{-\infty}^{\infty} e^{-y^2} \, dy = 1.$$

Next we compute $E(X)$ when $X$ is $N(m, \sigma^2)$. Again we use the change of coordinates $y = \frac{x - m}{\sigma\sqrt{2}}$. Note that $x = \sigma\sqrt{2}\,y + m$ and $dx = \sigma\sqrt{2}\,dy$:

$$E(X) = \int_{-\infty}^{\infty} x \cdot \frac{1}{\sigma\sqrt{2\pi}} \, e^{-(x-m)^2/2\sigma^2} \, dx = \frac{1}{\sqrt{\pi}} \int_{-\infty}^{\infty} (\sigma\sqrt{2}\,y + m) \, e^{-y^2} \, dy$$

$$= \frac{\sigma\sqrt{2}}{\sqrt{\pi}} \int_{-\infty}^{\infty} y \, e^{-y^2} \, dy + \frac{m}{\sqrt{\pi}} \int_{-\infty}^{\infty} e^{-y^2} \, dy = 0 + m = m.$$

Finally we leave it as an exercise to show that $\operatorname{Var}(X) = \sigma^2$. It can be done using integration by parts.

Although these computations look messy we are inescapably forced to consider this density function because this is the distribution corresponding to the concept of total randomness or complete randomness. In Chapter VII, we will make this concept more precise. So it is important that one have an intuitive idea of what it means for a random variable to be normal. We suggest that the following properties of the normal distribution be memorized, and one should familiarize oneself with the use of the tables giving values of the normal distribution function.

The standard normal density $N(0, 1)$:

$$f(x) = \frac{1}{\sqrt{2\pi}} \, e^{-x^2/2}$$

The normal density $N(m, \sigma^2)$:

$$f(x) = \frac{1}{\sigma\sqrt{2\pi}} \, e^{-(x-m)^2/2\sigma^2}$$

The normal density function is symmetric about the mean $m$ and the maximum value is taken at the mean. Beyond $3.5\sigma$ units from $m$, the value of the normal density is essentially zero. The natural unit for measuring deviations from the mean is the standard deviation. When $x$ is the deviation from the mean measured in this natural unit, then we get the standard normal density. Most tables for the normal distribution are tables of the standard normal density.

The curve becomes steeper and higher at the mean as $\sigma$ gets smaller.

In all of the following $X$ is standard normal, $N(0, 1)$.

- The area within one standard deviation of the mean is 68.27% of the total area, i.e. $P(-1 \leq X \leq 1) = 0.6827$.

- The area within two standard deviations of the mean is 95.45% of the total area, i.e. $P(-2 \leq X \leq 2) = 0.9545$.

- The area within three standard deviations of the mean is 99.73% of the total area, i.e. $P(-3 \leq X \leq 3) = 0.9973$.

In addition one should memorize the following two cases:

- The area within 1.96 standard deviations of the mean is 0.95.
- The area within 2.58 standard deviations of the mean is 0.99.

These will be important when we compute significance levels.

Occasionally one will see tables of the error function, $\operatorname{erf}(t)$. This function is closely related to the normal distribution although it is not the same:

$$\operatorname{erf}(t) = P(|Y| < t) = \frac{2}{\sqrt{\pi}} \int_0^t e^{-y^2} \, dy,$$

where $Y$ has distribution $N(0, \tfrac{1}{2})$. If $X$ has the standard normal distribution, then

$$P(-a \leq X \leq a) = \operatorname{erf}\!\left(\frac{a}{\sqrt{2}}\right)$$

and

$$P(X \leq x) = \frac{1}{2}\left(1 + \operatorname{erf}\!\left(\frac{x}{\sqrt{2}}\right)\right).$$

## 3. The Central Limit Theorem

The traditional explanation for the importance of the normal distribution relies on the Central Limit Theorem. Briefly, this theorem states that the average of $n$ independent equidistributed random variables tends to the normal distribution no matter how the individual random variables are distributed. The explanation for the ubiquity of the normal distribution then goes as follows. Suppose that $X$ is the random variable representing the measurement of a definite quantity but which is subject to chance errors. The various possible imperfections (minute air currents, stray magnetic fields, etc.) are supposed to act like independent equidistributed random variables whose sum is the total error of the measurement $X$. Unfortunately this explanation fails to be very convincing because there is no reason to suppose that the various contributions to the total error are either independent or equidistributed. We will have to wait until Chapter VII to find a more fundamental reason for the appearance of the normal distribution. The explanation given there uses the concepts of entropy and information. Intuitively, the sum of independent, equidistributed random variables is progressively more disordered as we add more and more of them. As a result the standardization of the sum necessarily approaches having a normal distribution as $n \to \infty$. This tendency to become disordered is exhibited even when the random variables are not quite independent and equidistributed. It is this tendency that accounts for the ubiquity of the normal distribution.

Nevertheless the Central Limit Theorem is of importance in probability and statistics, particularly in the theory of hypothesis testing which we will be discussing in the next section. Moreover, the proof of the Central Limit Theorem is more difficult than our intuitive justification would lead us to believe. We will now give a precise statement of this theorem. The proof is sketched in Section 6.

Suppose that $X_1, X_2, \ldots, X_n, \ldots$ are independent equidistributed random variables whose common mean and variance are $m = E(X_i)$ and $\sigma^2 = \operatorname{Var}(X_i)$. Let $S_n$ be the sum $X_1 + \cdots + X_n$. Then the mean of $S_n$ is $E(S_n) = E(X_1) + E(X_2) + \cdots + E(X_n) = nm$, and its variance is $\operatorname{Var}(S_n) = \operatorname{Var}(X_1) + \operatorname{Var}(X_2) + \cdots + \operatorname{Var}(X_n) = n\sigma^2$, since the $X_i$'s are independent and equidistributed. Therefore, the standard deviation of $S_n$ is $\sigma(S_n) = \sqrt{\operatorname{Var}(S_n)} = \sigma\sqrt{n}$. Hence the standardization of $S_n$ is

$$Y_n = \frac{S_n - nm}{\sigma\sqrt{n}} = \frac{X_1 + X_2 + \cdots + X_n - nm}{\sigma\sqrt{n}}.$$

*The Standardization of a Sum of Independent, Equidistributed Random Variables whose common mean and variance are $m$ and $\sigma^2$ respectively.*

This is an important formula to remember. The Central Limit Theorem then says that $Y_n$ tends toward the normal distribution as $n \to \infty$.

**Central Limit Theorem:** *If $X_1, X_2, \ldots, X_n, \ldots$ are independent equidistributed random variables with mean $m$ and variance $\sigma^2$, then*

$$P(Y_n \leq t) = P\!\left(\frac{X_1 + X_2 + \cdots + X_n - nm}{\sigma\sqrt{n}} \leq t\right) \to \frac{1}{\sqrt{2\pi}} \int_{-\infty}^{t} e^{-x^2/2} \, dx \quad \text{as } n \to \infty.$$

For example, in the Bernoulli process the random variable $S_n$ is the sum of independent equidistributed random variables $X_i$ whose common mean is $m = p$ and whose common variance is $\sigma^2 = pq$. Then $Y_n = \frac{S_n - np}{\sqrt{npq}}$ tends toward the standard normal distribution. That is, $S_n$ is approximately distributed according to $N(np, npq)$. This approximation is surprisingly accurate even for small values of $n$. The distribution of $S_4$ in the Bernoulli process using a fair coin is shown below. Superimposed is the normal distribution $N(2, 1)$.

For example, we know that $P(1 \leq S_4 \leq 3) = 1 - \frac{1}{8} = 0.875$. On the other hand, when $X$ is $N(2, 1)$, $P(0.5 < X < 3.5) \approx 0.8664$ (since 0.5 and 3.5 are each $1.5\sigma$ from the mean 2). You can see that the fit is quite close.

The two most common manifestations of the Central Limit Theorem are the following:

(1) As $n \to \infty$, the sum $S_n$ "tends" to the distribution $N(nm, n\sigma^2)$.

(2) As $n \to \infty$, the sample average $\bar{m} = \frac{S_n}{n}$ "tends" to the distribution $N\!\left(m, \frac{\sigma^2}{n}\right)$.

Note that the sample average $\bar{m}$ is a random variable. It is easy to see that its expectation is the mean:

$$E(\bar{m}) = E\!\left(\frac{S_n}{n}\right) = \frac{1}{n} E(S_n) = \frac{nm}{n} = m;$$

hence the sample mean is an approximation to the true mean $m$. The spread of the sample mean depends on the variance

$$\operatorname{Var}(\bar{m}) = \operatorname{Var}\!\left(\frac{S_n}{n}\right) = \frac{1}{n^2} \operatorname{Var}(S_n) = \frac{n\sigma^2}{n^2} = \frac{\sigma^2}{n}.$$

Intuitively it is clear that as $n \to \infty$, the sample average will be a better and better approximation to the mean $m$. The Central Limit Theorem tells us precisely how good an approximation it is.

As $n \to \infty$, the distribution of $S_n$ tends to broaden. The spread of $S_n$ is proportional to $\sqrt{n}$.

As $n \to \infty$, the distribution of $\bar{m}$ tends to become steeper. The spread of $\bar{m}$ is proportional to $\frac{1}{\sqrt{n}}$.

We remark that the independence of the random variables is essential in the Central Limit Theorem. For example, the gaps $L_i$ of the Uniform process are equidistributed, but their sum $L_1 + L_2 + \cdots + L_{n+1}$ is the length of the interval, which we know with certainty.

### Statistical Measurements

Suppose we make $n$ measurements $X_1, X_2, \ldots, X_n$ of the same quantity. Implicitly we are assuming that these measurements are equidistributed and independent random variables. Each measurement has a distribution whose mean is the quantity we wish to measure. But the measurements are imperfect and so tend to be spread to a certain extent on both sides of the mean. Statisticians refer to this situation as a "random sample."

**Definition:** A **random sample** of size $n$ is a set of $n$ independent, equidistributed random variables $X_1, X_2, \ldots, X_n$.

In the next two sections we will consider the problem of measuring the mean of a distribution using random samples. In particular we would like to know how small a random sample is sufficient for a given measurement. If we wish to determine the average number of cigarettes smoked per day by Americans, it would be highly impractical to ask every American for this information. Statistics enables one to make accurate measurements based on surprisingly small samples.

In addition to the measurement problem, we will also consider the problem of using a random sample as a means for making predictions of the future. The prediction will, of course, be a probabilistic one: with a certain probability the next measurement will lie within a certain range. For all the statistical problems we will study, we will assume only that the variance of each measurement $X_i$ is finite. In most cases this is a reasonable assumption especially if the measurements lie in a finite interval. For example, the number of cigarettes smoked by one individual in one day is necessarily between 0 and $10^6$.

The general procedure can be summed up in the following rule.

**Main Rule of Statistics.** *In any statistical measurement we may regard the individual measurements as being distributed according to the normal distribution $N(m, \sigma^2)$.*

To use this rule we first find the mean $m$ and variance $\sigma^2$ from information given in our problem or by using the sample mean $\bar{m}$ and/or sample variance $\hat{\sigma}^2$ defined below. We then standardize the random variables required in the problem. Finally we use tables of the standard normal distribution to solve the problem. We will see many examples of this basic procedure. As stated, the main rule says only that our results will be "reasonable" if we assume that the measurements are normally distributed. We can actually assert more. In the absence of better information, we must assume that a measurement is normally distributed. In other words, if several models are possible, we must use the normal model unless there is a significant reason for rejecting it. When the mean $m$ and/or the variance $\sigma^2$ of the measurements $X_i$ are not known, the following random variables may be used as approximations.

The **sample mean** $\bar{m} = \frac{X_1 + X_2 + \cdots + X_n}{n}$ approximates $m$.

The **sample variance** $\hat{\sigma}^2 = \frac{(X_1 - \bar{m})^2 + (X_2 - \bar{m})^2 + \cdots + (X_n - \bar{m})^2}{n - 1}$ approximates the variance $\sigma^2$.

For example an exam graded on a scale of 0--100 is given in a class of 100 students. The sample mean is found to be 81 with sample variance 100 (standard deviation 10). Based on this data, we can predict that if the exam is given to another student, the student will score between 61 and 100 with probability 0.95 (within $2\sigma$ of $\bar{m}$). In actual exam situations, the distribution of an individual exam score is more complicated than the normal distribution, but in the absence of any better information we follow the Main Rule.

When the mean is known but the variance is not, there is a slightly better approximation to the variance. The **sample variance** (when $m$ is known)

$$\tilde{\sigma}^2 = \frac{(X_1 - m)^2 + (X_2 - m)^2 + \cdots + (X_n - m)^2}{n}$$

also approximates the variance $\sigma^2$. The reason for the different denominators in the two expressions is subtle. We leave it as an exercise to show that the expectations of the two kinds of sample variance are both equal to the true variance. The distribution of the random variables $\bar{m}$, $\hat{\sigma}^2$ and $\tilde{\sigma}^2$ are very important in statistics, and we will undertake to compute some cases, leaving the rest as exercises.

## 4. Significance Levels

Let us begin with an example. We are presented with a coin having an unknown bias $p$. We are told that the coin is fair, but we are suspicious and would like to check this assertion. So we start tossing the coin. After 100 tosses we get only 41 heads. Do we have reason to suspect that the coin is not fair?

In such an experiment, we carefully examine the model we have postulated in order to determine what kind of behavior is consistent with the model. If the observed behavior is consistent with the model we have no reason to suppose that the coin is unfair. In this case the postulated model is the Bernoulli process with bias $p = 1/2$.

The average value of $S_{100}$ is 50 for our postulated model. We are interested in the possible deviation of $S_{100}$ from its mean value 50, because very large deviations are unlikely in the model but would not be if the coin is unfair. The usual statistical procedure in such a case is to determine precisely how large a deviation from the mean is reasonable in the model. Since $S_{100}$ has the binomial distribution, we could in principle do this using only the formula for this distribution. However, the computation is extremely difficult. On the other hand, we know that $S_{100}$ is very close to having the normal distribution $N(50, 25)$. In other words, $\frac{S_{100} - 50}{5}$ has approximately the standard normal distribution.

We now look in a table of the standard normal distribution. There we find that

$$P\!\left(-1.96 < \frac{S_{100} - 50}{5} < 1.96\right) = 0.95,$$

or

$$P(40.2 < S_{100} \leq 59.8) = 0.95.$$

Since 41 falls in this range, we conclude that our suspicions about the unfairness of the coin are groundless. The difference $1 - 0.95 = 0.05$ is called the **significance level** of our test. We then say "the experiment has no significance at the 0.05 level." Notice that we say *no* significance. Statistically speaking, a significant result occurs only when a postulated model is rejected.

Looking at the reasoning a bit more carefully, we have said the following. Assuming that the coin is fair, about 95% of the time we will get between 40 and 60 heads when we toss the coin 100 times. But 5% of the time we will not be within this range.

**The significance level represents the probability that we will reject the postulated model even though this model is correct.**

Notice the indirectness of this kind of reasoning. We say nothing about whether or not the coin is really fair or unfair, or even that it is fair or unfair with a certain probability. Statistics never tells one anything for certain, even in the weak sense of probabilistic certainty. All we can do is devise tests for determining at some significance level whether or not the data we have collected are consistent with the model. Because of the abbreviated terminology that statisticians and scientists frequently use when discussing the result of an experiment, one should be careful not to ascribe properties to statistical statements which they do not possess.

The 0.05 significance level is so commonly used by statisticians and scientists that this level is assumed when no significance level is specified. The 0.01 significance level is also common, and an experiment is said to be **very significant** if this level is being used. For example, in our coin tossing test we found that getting 41 heads was not (statistically) significant. On the other hand, getting 39 heads would be significant but would not be very significant, while getting 35 heads would be very significant.

It is important to point out that the choice of a significance level is part of the design of one's experiment. It cannot be "calculated" after the data are collected. Doing so is intellectual and scientific dishonesty of the worst kind, for if one does this consistently it violates the whole statistical framework within which the scientific community works. Generally speaking, the choice of a significance level is determined by considerations having nothing to do with probability or statistics. For example, if one is testing to see if a certain commonly used chemical could be a cause of a disease, we would certainly want a very significant result before recommending that the chemical be banned, with all the political and economic repercussions that such a decision could have.

Let us consider another example. We are given a die, and we wish to test whether it is loaded. We decide to consider whether "3" is special, and we choose to work at the 0.05 significance level. Our experiment consists of rolling the die 120 times, and we find that "3" comes up 25 times. Our postulated model is now the Bernoulli Process with bias $p = 1/6$. The mean of a single roll, $m = p = 1/6$, and its variance, $\sigma^2 = pq = 5/36$. Therefore, the number of threes, $S_{120}$, is approximately

$$N\!\left(20, \frac{100}{6}\right) \quad \text{and hence} \quad \frac{S_{120} - 20}{\sqrt{100/6}} \text{ is approximately } N(0, 1).$$

Our experiment is significant at the 0.05 level only if $\left|\frac{S_{120} - 20}{\sqrt{100/6}}\right| > 1.96$. In our case, $S_{120} = 25$ so $\left|\frac{S_{120} - 20}{\sqrt{100/6}}\right| = \frac{5}{\sqrt{100/6}} \approx 1.22$. This is not larger than 1.96. Therefore the experiment is not significant, and we have no reason to suspect that the die is loaded.

### Rule of Thumb

A quick rule of thumb for testing the Bernoulli process (to be used only if one is in a hurry) is the following. If one tosses $n$ times a coin with bias $p$, then the result is significant if the number of heads lies outside $np \pm 2\sqrt{npq}$, and very significant if the number of heads lies outside $np \pm 3\sqrt{npq}$.

## 5. Confidence Intervals

The concept of a confidence interval is a variation on the statistical themes we have just been describing. Instead of testing a hypothesis, one is interested in accuracy of a measurement or in prediction of the future.

Let us consider a very simple example of the prediction of the future. Suppose we have two competing airlines on a given route, both having the same departure time. Suppose that every day exactly 1000 passengers show up and that each one chooses one or the other airline with probability $1/2$, independently of the other passengers. Both airlines want to be able to accommodate as many passengers as possible. They could do this, of course, by providing 1000 available seats. Needless to say this would be disastrously expensive, particularly since the probability that all 1000 seats would ever be needed is essentially zero. By providing 1000 seats we would have absolute certainty that there will never be an overflow; if we are willing to accept a 5% chance of an overflow, the number of seats we must provide decreases dramatically.

To compute this we again use the normal approximation of the binomial distribution. The model we are using is the Bernoulli process with bias $p = 1/2$. The variance of a single toss is $1/4$. The number of passengers choosing one particular airline is $S_{1000}$, which has approximately the distribution $N(500, 250)$. Hence $\frac{S_{1000} - 500}{5\sqrt{10}}$ is almost $N(0, 1)$. We now look up in a table of the standard normal distribution that number $t$ for which $P(Y \leq t) = 0.95$. We find that $t = 1.645$. This tells us that

$$P\!\left(\frac{S_{1000} - 500}{5\sqrt{10}} \leq 1.645\right) = 0.95$$

or

$$P(S_{1000} \leq 526) = 0.95.$$

We need only provide 526 seats to have 95% confidence of not having an overflow. This is quite a dramatic drop from 1000 seats. Even for 99% confidence we need only a few more seats:

$$P\!\left(\frac{S_{1000} - 500}{5\sqrt{10}} \leq 2.33\right) = 0.99$$

or

$$P(S_{1000} \leq 537) = 0.99.$$

We speak of the interval $[0, 526]$ as being a 95% confidence interval for $S_{1000}$. In general any interval $[a, b]$ for which $P(a \leq X \leq b) = 0.95$ is called a 95% confidence interval for the random variable $X$. When $X$ is normally distributed (or approximately normally distributed) with distribution $N(m, \sigma^2)$, we generally use either a one-sided confidence interval or a two-sided confidence interval. A one-sided interval is of the form $(-\infty, t]$ or of the form $[t, \infty)$. A two-sided interval is chosen to be symmetric about the mean: $[m - t, m + t]$. When testing statistical hypotheses, one uses either a one-sided or a two-sided confidence interval. The corresponding tests are then referred to as a single-tail or a double-tail test respectively.

Now we consider the problem of the accuracy of statistical measurements. Suppose we wish to determine the percentage of adult Americans who smoke. To find out this number we randomly sample $n$ persons. How many persons do we have to sample in order to determine the percentage of smokers to two decimal place accuracy? Of course, we can determine this percentage to this accuracy with absolute certainty only by asking virtually the whole population, because there is always the chance that those not asked will all be smokers. Therefore, we must choose a confidence level.

The usual level is 95% so we will use this. The model we are using is the Bernoulli process with bias $p$, where $p$ is the percentage we are trying to compute. Each person we ask will be a smoker with probability $p$. If we randomly ask $n$ persons, the number who smoke divided by $n$ will be an approximation $\hat{p}$ to $p$. This number is the sample mean $(\bar{m} = \frac{S_n}{n})$. We use the Central Limit Theorem in its second manifestation. We find that $\hat{p} = \bar{m}$ has approximately the distribution $N(p, \sigma^2/n)$, where $\sigma^2 = pq$. Therefore $\frac{\hat{p} - p}{\sqrt{pq/n}}$ is approximately $N(0, 1)$. We require a two-sided interval in this problem:

$$P\!\left(\left|\frac{\hat{p} - p}{\sqrt{pq/n}}\right| < 1.96\right) = 0.95$$

or

$$P\!\left(|\hat{p} - p| < \frac{1.96\sqrt{pq}}{\sqrt{n}}\right) = 0.95.$$

We want to choose $n$ so that $|\hat{m} - p| < 0.005$ in order to have two place accuracy. That is, $\frac{1.96\sqrt{pq}}{\sqrt{n}} = 0.005$ or $n = (1.54 \times 10^5)\sigma^2$. Unfortunately to compute $\sigma^2 = pq$ we must know $p$. However, we know that $\sigma^2$ takes its largest value when $p = q = 1/2$ because $\sigma^2 = pq = p(1 - p)$ as a function of $p$ has its maximum at $p = 1/2$. Therefore $n \leq (1.54 \times 10^5)(0.25) = 3.85 \times 10^4$. In other words, to determine the percentage of smokers with 95% confidence we must sample up to 38,500 persons.

In practice one would first determine $p$ to one decimal place accuracy. This requires only a sample of 385 persons. Using this number, one can compute $\sigma$ more precisely. Using this better value of $\sigma$ we can determine more precisely how many persons must be sampled in order to find $p$ to two decimal place accuracy. For example, suppose that with the smaller sample we find that $p = 0.65 \pm 0.05$. The worst case for $\sigma^2$ is now $pq = (0.6)(0.4) = 0.24$. We must then sample $n = 37{,}000$ persons to determine $p$ to within 0.005.

One must be careful not to confuse the accuracy with the confidence. The accuracy tells us how accurately we think we have measured a certain quantity. The confidence tells us the probability that we are right. To illustrate the distinction between these two concepts we consider the above measurement problem with two accuracies and three confidence levels. In general, improving confidence does not require much more effort while increasing accuracy requires a great deal of additional effort.

| | Accuracy 0.05 (one decimal place) | Accuracy 0.005 (two decimal places) |
|---|---|---|
| 95% Confidence | 385 | 38,500 |
| 99% Confidence | 667 | 66,700 |
| 99.9% Confidence | 1,089 | 108,900 |

*The number of individuals that must be sampled to determine the percentage having a certain property (in the worst case $p = 1/2$).*

In the exercises we consider more examples of significance levels and confidence intervals. Some of these have a distinct air of the supernatural about them. How, for example, is it possible to make conclusions about the television preferences of a population of 200 million persons based on a sample of only 400 of them? In fact the size of the population is irrelevant to the statistical analysis. (It arises only when one confronts the problem of making a random sample from a very large population. This is a very difficult problem for statisticians.)

## 6.* The Proof of the Central Limit Theorem

If you are familiar with the concept of the Fourier transform, the proof of the Central Limit Theorem is not very difficult to understand. We will sketch the proof leaving the details as an exercise.

Let $X_1, X_2, \ldots$ be a sequence of independent equidistributed random variables having finite variance. Without loss of generality, we may assume that they are standard. Set $S_n = X_1 + X_2 + \cdots + X_n$. We wish to show that the distribution of $\frac{S_n}{\sqrt{n}}$ tends to the standard normal distribution.

Recall that the Laplace transform of a function $f(x)$ is defined to be the function

$$\hat{f}(\lambda) = \int_{-\infty}^{\infty} e^{-\lambda x} f(x) \, dx,$$

defined for $\lambda > 0$ when $f(x)$ is the density of a random variable. If we replace the nonnegative parameter $\lambda$ by a purely imaginary one, $i\xi$ for $-\infty < \xi < \infty$, we obtain a transform known as the Fourier transform:

$$\psi(\xi) = \int_{-\infty}^{\infty} e^{i\xi x} f(x) \, dx,$$

defined for all real numbers $\xi$. By de Moivre's theorem, $e^{i\xi x} = \cos(\xi x) + i\sin(\xi x)$, so that $\psi(\xi)$ may be written as

$$\psi(\xi) = \int_{-\infty}^{\infty} \cos(\xi x) f(x) \, dx + i \int_{-\infty}^{\infty} \sin(\xi x) f(x) \, dx,$$

where each of the two integrals are real. When $f(x)$ is the density of a random variable $X$, we say $\psi(\xi)$ is the **characteristic function** of $X$.

We begin by calculating some values of the characteristic function $\psi(\xi)$. At zero we get

$$\psi(0) = \int_{-\infty}^{\infty} e^{0} f(x) \, dx = \int_{-\infty}^{\infty} f(x) \, dx = 1,$$

since $f(x)$ is a density. Similarly, the values of the derivative of $\psi(\xi)$ at zero can be computed by "differentiation under the integral sign."

$$\psi^{(n)}(\xi) = \int_{-\infty}^{\infty} (ix)^n e^{i\xi x} f(x) \, dx,$$

so that

$$\psi^{(n)}(0) = \int_{-\infty}^{\infty} (ix)^n f(x) \, dx = (i)^n E(X^n).$$

In other words, $\psi^{(n)}(0)$ is $(i)^n$ times the $n$th moment of $X$.

If we assume that $X$ has finite variance, then $E(X)$ and $E(X^2)$ exist, and we may apply the Taylor expansion theorem to conclude that

$$\psi(\xi) = \psi(0) + \psi'(0)\xi + \tfrac{1}{2}\psi''(0)\xi^2 + o(\xi^2) \quad \text{as } \xi \to 0.$$

If $X$ is standard, then

$$\psi(\xi) = 1 - \tfrac{1}{2}\xi^2 + o(\xi^2) \quad \text{as } \xi \to 0.$$

The Fourier transform shares with the Laplace transform the following:

**Convolution Property:** *If $\psi_X(\xi)$ and $\psi_Y(\xi)$ are the characteristic functions of random variables $X$ and $Y$ and if $X$ and $Y$ are independent, then $\psi_{X+Y}(\xi) = \psi_X(\xi)\psi_Y(\xi)$ is the characteristic function of $X + Y$.*

**Proof:** We may write the characteristic function $\psi_X(\xi)$ of $X$ as

$$\psi_X(\xi) = \int_{-\infty}^{\infty} e^{i\xi x} f(x) \, dx = E(e^{i\xi X}).$$

By the multiplicative property of expectations of independent R.V.'s,

$$\psi_{X+Y}(\xi) = E(e^{i\xi(X+Y)}) = E(e^{i\xi X}) E(e^{i\xi Y}) = \psi_X(\xi) \psi_Y(\xi). \quad \text{QED.}$$

Therefore, if $X_1, X_2, \ldots$ is a sequence of independent equidistributed standard random variables, having characteristic function $\psi(\xi)$, then their sum $S_n$ has characteristic function $[\psi(\xi)]^n$. By a change of variables, the random variable $\frac{S_n}{\sqrt{n}}$ has characteristic function $\left[\psi\!\left(\frac{\xi}{\sqrt{n}}\right)\right]^n$. Utilizing the Taylor expansion computed above, we find that

$$\left[\psi\!\left(\frac{\xi}{\sqrt{n}}\right)\right]^n = \left(1 - \frac{\xi^2}{2n} + o\!\left(\frac{1}{n}\right)\right)^n \quad \text{as } n \to \infty \text{ (with } \xi \text{ fixed).}$$

Now we know from calculus that

$$\left(1 - \frac{\xi^2}{2n}\right)^n \to e^{-\xi^2/2} \quad \text{as } n \to \infty,$$

and we leave it as an exercise to show that this also works when we have the extra $o\!\left(\frac{1}{n}\right)$ term. Therefore, the characteristic function of the standardized sum $\frac{S_n}{\sqrt{n}}$ approaches $e^{-\xi^2/2}$ as $n \to \infty$, for every fixed $\xi$.

We now suspect that $e^{-\xi^2/2}$ is the characteristic function of the standard normal distribution. This can be proved a number of ways. One could first show that a sum of independent, standard normal random variables is also normal so that if $X_1, X_2, \ldots$ are all standard normal distributions then so is $\frac{S_n}{\sqrt{n}}$. It then follows by the above result that the characteristic function of the standard normal distribution must be $e^{-\xi^2/2}$. One can also compute this characteristic function directly by differentiating under the integral sign and using integration by parts. We leave this as an exercise.

The Central Limit Theorem follows from the above calculation and the following two properties of the characteristic function:

**Property 1:** Different probability distributions have different characteristic functions, or in other words, the characteristic function uniquely determines the distribution.

For example, if $\psi(\xi)$ has the property that $\int_{-\infty}^{\infty} |\psi(\xi)| \, d\xi < \infty$, then one may use the Fourier inversion formula to compute $f(x)$ in terms of $\psi(\xi)$:

$$f(x) = \frac{1}{2\pi} \int_{-\infty}^{\infty} e^{-i\xi x} \psi(\xi) \, d\xi.$$

**Property 2:** If a sequence of characteristic functions $\psi_n$ converges to a characteristic function $\psi$ pointwise, i.e. for all $\xi$

$$\lim_{n \to \infty} \psi_n(\xi) = \psi(\xi),$$

then the probability distributions corresponding to the $\psi_n(\xi)$ converge to that of $\psi(\xi)$ as $n \to \infty$, for all $\xi$ at which the distribution function is continuous. This type of convergence is called **weak convergence**.

## 7. The Law of Large Numbers

The law of large numbers is the statement that is often taken as justification of the definition of probability in terms of frequency. For example, what does it mean to say that the probability is $1/2$ for getting a head when a fair coin is tossed? In the frequentist point of view, one says that this means the proportion of heads in a very large number of tosses will be very close to $1/2$. But this is really begging the question in some sense as we will see.

Let $X_1, X_2, \ldots$ be independent equidistributed random variables with common mean $m$ and common variance $\sigma^2 < \infty$. We would like to say that $(X_1 + X_2 + \cdots + X_n)/n$ approaches $m$ as $n \to \infty$. But these are random variables so we can only speak of the probability that the limit is $m$.

**The Law of Large Numbers**

$$P\!\left(\lim_{n \to \infty} \frac{X_1 + X_2 + \cdots + X_n}{n} = m\right) = 1.$$

This is essentially just a psychological theorem, for it does not provide the information necessary for concrete applications. The Central Limit Theorem is far more useful.

In any case, the law of large numbers is a purely mathematical theorem. In order for it to make sense we must already have the concepts of probability, random variables, means, variances, etc. We cannot use this as the definition of probability. But we cannot even use the law of large numbers as a justification of the frequentist point of view. This point of view says that probabilities represent a physically measurable quantity (at least in principle). But there is no concept of a physical "measurement" corresponding to the mathematical concept of the limit

$$\lim_{n \to \infty} \frac{X_1 + X_2 + \cdots + X_n}{n}.$$

The relationship between physical experiments and the theory of probability is much more subtle than the frequentist point of view would have one believe.

The law of large numbers is not very useful in applications because it does not specify how large a sample is required to achieve a given accuracy. However, it does have interesting theoretical applications. We will see one in section VII.2 (the Shannon Coding Theorem). Another theorem which has great usefulness in probability theory is the Bienayme-Chebyshev Inequality. Its importance stems primarily from its simplicity.

**Bienayme-Chebyshev Inequality:** *Let $X$ be a random variable with mean $E(X) = m$ and variance $\operatorname{Var}(X) = \sigma^2$, then for all $t > 0$,*

$$P(|X - m| \geq t) \leq \frac{\sigma^2}{t^2}.$$

**Proof:** Suppose that $X$ is a continuous R.V. with density $f(x)$. The proof in the case of an integer R.V. is similar. Clearly we may assume that $m$ is zero, for if it is not we just replace $X$ by $X - m$.

$$\sigma^2 = \operatorname{Var}(X) = E(X^2) = \int_{-\infty}^{\infty} x^2 f(x) \, dx \geq \int_{|x| \geq t} x^2 f(x) \, dx \geq t^2 \int_{|x| \geq t} f(x) \, dx = t^2 P(|X| \geq t).$$

The second inequality is a consequence of the fact that $x^2 \geq t^2$ in the domain of integration. If we now solve for $P(|X| \geq t)$ we get the desired inequality.

The last result we will consider in this section is one of the most astonishing facts about probability: the Kolmogorov Zero-One Law. As with the other theorems in this section it has little practical usefulness, but it has many theoretical applications. The law of large numbers, for example, can be proved using it.

Suppose that $X_1, X_2, \ldots$ is a sequence of random variables which are independent but not necessarily equidistributed. A **tail event** $A$ is an event such that

(1) $A$ is defined in terms of the random variables $X_1, X_2, \ldots$

(2) $A$ is independent with respect to any finite set of the $X_i$'s, i.e.
$P(A \cap (X_1 = t_1) \cap (X_2 = t_2) \cap \cdots \cap (X_n = t_n)) = P(A) P(X_1 = t_1) P(X_2 = t_2) \cdots P(X_n = t_n)$
for any $n < \infty$ and any set of $t_i$'s.

**Kolmogorov Zero-One Law:** *If $A$ is a tail event, then $P(A) = 0$ or $1$.*

At first it seems that there cannot be any tail events except for $\varnothing$ and $\Omega$, because tail events seem both to depend on the $X_i$'s and not to depend on the $X_i$'s. However there are, in fact, many nontrivial examples. Here is one. Toss a fair coin infinitely often and write

$$X_n = \begin{cases} +1 & \text{if the } n\text{th toss is heads} \\ -1 & \text{if the } n\text{th toss is tails} \end{cases}$$

Now let $A$ be the event "$\sum_{n=1}^{\infty} \frac{X_n}{n}$ converges." This is a tail event because the convergence or divergence of a series is determined by the terms of the series but is independent of any finite set of them. We all should know at least two examples from calculus: $\sum_{n=1}^{\infty} \frac{1}{n}$ diverges but $\sum_{n=1}^{\infty} \frac{(-1)^n}{n}$ converges to $\ln(2)$. What we are doing is changing the signs of the harmonic series $\sum \frac{1}{n}$ randomly and independently. $P(A)$ is the probability that a random choice of signs yields a convergent series. The zero-one law tells us that $P(A)$ can only be 0 or 1; there are no other possibilities. In fact $P(A) = 1$. We leave this as an exercise.

As another example, suppose that a monkey is trained to hit the keys of a typewriter and does so at random, each key having a certain probability of being struck each time, independently of all other times. Let $A$ be the event "the monkey eventually types out Shakespeare's Hamlet." Again this is clearly a tail event and so $P(A)$ is 0 or 1. This is easy to see. Hamlet has about $2 \times 10^5$ characters and could be written with a typewriter having 100 keys. Suppose each key has probability 0.01 of being typed. The probability of typing Hamlet is $p = (0.01)^{2 \times 10^5}$ during a given "session" of $2 \times 10^5$ keystrokes. The probability of not typing Hamlet in one session is $q = 1 - p < 1$. The probability that in infinitely many sessions the monkey never types out Hamlet is $\lim_{n \to \infty} q^n = 0$. Therefore $P(A) = 1$. On the other hand, the expected waiting time until the monkey types out Hamlet is about $10^{400{,}000}$ keystrokes. If the monkey could type one keystroke every nanosecond, the expected waiting time until the monkey types out Hamlet is so long that the estimated age of the universe is insignificant by comparison.

Needless to say this is not a practical method for writing plays. The Kolmogorov zero-one law has little practical usefulness. But it does have theoretical uses, and it shows how counter-intuitive probability theory can be.
