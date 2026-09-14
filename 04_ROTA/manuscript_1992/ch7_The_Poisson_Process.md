---
title: "Chapter VII: The Poisson Process"
author: "Gian-Carlo Rota"
edition: "1992"
chapter_number: 7
---

# Chapter VII: The Poisson Process

The Poisson Process is the third basic stochastic process, the first two being the Bernoulli and Uniform processes. We will start with a more abstract approach in section 1. In this section we concentrate on some of the random variables occurring in this process. In the next two sections we give a more intuitive development of the Poisson process based on what we already know about the Uniform and Bernoulli processes. Once we have thoroughly established the properties of the Poisson process, we then turn things around by showing that the Uniform process can be obtained by conditioning the Poisson process!

## 1. Continuous Waiting Times

Suppose we toss a coin $k$ times and that we get $k$ tails. It is intuitively obvious that on the next toss there is the same probability for heads as ever: the coin does not remember what took place in the past. We can express the fact that a coin has no memory in terms of the single waiting time $W_1$ as follows

$$P(W_1 > k + n \mid W_1 > k) = P(W_1 > n).$$

The probability that one will get a run of $k+n$ tails given that one has just gotten a run of $k$ tails is simply the probability that one will get the additional $n$ tails: the preceding tails neither help nor hurt. How long one must wait does not depend on how long one has already waited.

In real life if one is waiting for an incident to take place there is no abstract entity flipping an abstract coin during small discrete time intervals determining when the incident is to occur. For example one might be standing next to a Geiger counter waiting for a click. The waiting time in this case is continuous, but like the Bernoulli waiting time the waiting time has no memory. We express this using conditional probability.

**Definition.** A positive continuous random variable is said to have the **exponential distribution** when

$$P(W > t + s \mid W > s) = P(W > t)$$

for all positive $t$, $s$. We will also call $W$ a **continuous memoryless waiting time**, although we will see that the value of $W$ need not represent time. The exponential distribution is an ubiquitous distribution appearing in the most unexpected places.

What is surprising about random variables having the exponential distribution is that the seemingly innocuous assumption we have made in defining this concept determines the probability distribution of $W$ but for a single parameter. To see this let $G(t) = P(W > t)$. The condition $P(W > t + s \mid W > s) = P(W > t)$ may also be written $P((W > t+s) \cap (W > s)) = P(W > t)P(W > s)$. But the event $(W > t+s)$ is a subevent of the event $(W > s)$. Therefore $(W > t+s) \cap (W > s) = (W > t+s)$. So we may equally well characterize a continuous memoryless waiting time by the condition

$$P(W > t+s) = P(W > t)P(W > s),$$

or in terms of $G$:

$$G(t+s) = G(t)G(s).$$

From this equation alone we can, using calculus, deduce that $G(t) = Ke^{Ct}$ for suitable constants $K$ and $C$. Those who have seen this done before can skip the next paragraph.

If we think of $G(t+s)$ as a function of two variables $t$ and $s$, we may compute the partial derivatives by the chain rule of calculus:

$$\frac{\partial}{\partial t} G(t+s) = G'(t+s)$$

Similarly, $\frac{\partial}{\partial s} G(t+s) = G'(t+s)$. Next we differentiate $G(t)G(s)$ with respect to both $t$ and $s$:

$$\frac{\partial}{\partial t} (G(t)G(s)) = G'(t)G(s)$$

$$\frac{\partial}{\partial s} (G(t)G(s)) = G(t)G'(s)$$

Therefore

$$G'(t)G(s) = G'(t+s) = G(t)G'(s).$$

Divide both sides by $G(t)G(s)$ to get

$$\frac{G'(t)}{G(t)} = \frac{G'(s)}{G(s)}.$$

Now this must hold no matter what $t$ and $s$ are. Therefore

$$\frac{G'(t)}{G(t)} = C$$

for some constant $C$. Finally if we integrate both sides we get

$$\ln|G(t)| = Ct + D$$

for some constant $D$, and this is the same as

$$G(t) = Ke^{Ct}$$

for some constant $K$.

The distribution of $W$ is therefore

$$F(t) = P(W \leq t) = 1 - G(t) = 1 - Ke^{Ct} \quad \text{for } t > 0.$$

Since we must have $\lim_{t \to \infty} F(t) = 1$, the constant $C$ must be negative. Write $\alpha = -C$. Since we must also have $\lim_{t \to 0^+} F(t) = 0$, the constant $K$ must be 1. We conclude that the probability distribution of a continuous waiting time $W$ is

$$F(t) = P(W \leq t) = 1 - e^{-\alpha t},$$

for some positive constant $\alpha$; and its density is

$$f(t) = \alpha e^{-\alpha t}.$$

We now see why we say that $W$ is exponentially distributed.

*The density and distribution of a continuous waiting time.*

The parameter $\alpha$ may be interpreted as the frequency of the incidents in time: roughly speaking, $\alpha$ incidents occur per unit time "on the average."

The power of probabilistic reasoning (made rigorous by conditional probability) is that we may compute the distribution of a random variable without referring to a sample space or to events of it. The distribution is defined purely in phenomenological terms, i.e. in terms of the observed phenomena only.

Consider for example that we have an infinite collection of points dropped independently and uniformly throughout the entire infinite plane. By "uniformly" we mean that the probability of finding a point in a region of finite area $t$ depends only on the area $t$ (not on its shape or location). By "independently" we mean that for two disjoint regions the probability of finding a point in one region is independent of finding a point in the other. Write $P(T > t)$ for the probability of finding no point in a region of area $t$. Then

$$P(T > t+s) = P(T > t)P(T > s).$$

Therefore, as above,

$$P(T > t) = e^{-\alpha t},$$

where $\alpha$ may be interpreted as the density of the points dropped on the plane. It is reasonable to regard $T$ as a "waiting area" i.e. "how large an area must a region be in order to find a point in the region?"

Consider next a collection of stars distributed at random in a large region of space. How far away is the nearest neighbor to a star in this region? This is quite similar to the above problem, but we now have three dimensions. Instead of a region of some area $t$, we use a spherical volume of radius $r$ whose center is the given star. If the average density of the stars is $\alpha$, then

$$P(\text{Nearest neighbor is more than } r \text{ units away}) = e^{-\alpha \frac{4}{3}\pi r^3}.$$

Suppose we are in a forest with randomly located trees. How far can one see if one looks in one particular direction? By symmetry one may assume that one looks along the positive $x$-axis from the origin. Assume also, for simplicity, that the trees are all $\rho$ units in radius. Let $T$ be the random variable "how far can one see along the $x$-axis?" If $T$ is larger than $t$, then there are no centers of trees in the region indicated below:

*The indentation on the left side is a consequence of the fact that one happens to be standing at that point.* The area of the dotted region is the same as that of a rectangle of sides $t$ and $2\rho$. Therefore

$$P(T > t) = e^{-2\rho\alpha t}.$$

Needless to say this is an idealized model (trees do not all have the same radius), but it illustrates the basic idea.

One gets a very similar model when one studies the effect of a beam of high energy protons entering a detector consisting of a tank of liquid hydrogen. Here the "trees" are the nuclei of the hydrogen atoms, although we should build the model in three dimensions instead of two.

To summarize, every "waiting time" for which the future does not depend on the past exhibits exponential decay.

### The Gamma Distribution

We just saw that the analog for continuous random variables of the random variable $W_1$ in the Bernoulli process is an exponential random variable. We now ask for the analog of the $k$th waiting time $W_k$ in the Bernoulli process. Now, the $k$th waiting time is the sum of the first $k$ gaps in the Bernoulli process: $W_k = t_1 + t_2 + \cdots + t_k$; and the gaps are independent. Therefore we could have computed the distribution of $W_k$ by convolving the distribution of the gaps, all of which are geometric random variables. As an example, the distribution of $W_2$ is then the convolution of the distribution of $t_1$, $q^{n-1}p$, with itself, i.e.

$$P(W_2 = n) = \sum_{k=1}^{n-1} q^{n-k-1} p \cdot q^{k-1} p = (n-1)p^2 q^{n-2}.$$

Consider now the continuous analogue of a waiting time: the exponential distribution. The sum of two independent exponentially equidistributed random variables $T_1$ and $T_2$ may be regarded as the waiting time for the second occurrence, $W_2 = T_1 + T_2$, just as in the Bernoulli process. In the next chapter we shall build a more concrete model on which to define this random variable. Although we haven't yet defined the $T_i$ on a specific sample space, we can nevertheless compute the distribution of the continuous waiting time $W_k$. It is the convolution of $\alpha e^{-\alpha t}$ with itself:

$$\text{dens}(W_2 = t) = \int_0^t \alpha e^{-\alpha s} \cdot \alpha e^{-\alpha(t-s)}\,ds = \alpha^2 t e^{-\alpha t}.$$

More generally, the density of the $k$th waiting time $W_k$ is the convolution

$$\underbrace{\alpha e^{-\alpha t} * \alpha e^{-\alpha t} * \cdots * \alpha e^{-\alpha t}}_{k \text{ times}}$$

$W_k$ is the sum $T_1 + T_2 + \cdots + T_k$ of $k$ independent exponentially distributed random variables, all with parameter $\alpha$. This convolution is easily computed:

$$\text{dens}(W_k = t) = \frac{\alpha^k t^{k-1}}{(k-1)!} e^{-\alpha t}.$$

We call this the **Gamma Distribution**. Notice that it has two parameters: $\alpha$ and $k$.

We end this section by computing the means and variances of the continuous waiting times. It is an easy exercise to verify that if $T$ is exponentially distributed, then $E(T) = \frac{1}{\alpha}$, where $\alpha$ is the parameter defining the distribution of $T$. This coincides with our intuitive feeling that $\alpha$ is "intensity." The variance of $T$ is easily computed by using integration by parts twice.

$$\text{Var}(T) = E(T^2) - E(T)^2 = \frac{1}{\alpha^2}.$$

So the standard deviation $\sigma(T)$ is the same as the mean $E(T)$: both are $\frac{1}{\alpha}$.

Because the $k$th waiting time $W_k$ of the process considered is the sum of $k$ independent, equidistributed exponential random variables, the variance of $W_k$ is $\frac{k}{\alpha^2}$.

## 2. Comparing the Bernoulli and Uniform Processes

We could at this point simply define the Poisson process to be a sequence of independent, exponentially distributed random variables, having the same parameter $\alpha$. But we prefer to take a different approach, which builds on the two processes we have already thoroughly studied. We therefore now give a detailed comparison of the Bernoulli and Uniform processes emphasizing their similarities and their differences. The Poisson process will be a "limit" of both processes so that, in a sense, it furnishes a formal link between them. In so doing we will discover some new aspects of both these processes.

### Parameters

The Bernoulli process depends on a single parameter: the bias $p$ of the coin. The Uniform process depends on two parameters: the length $a$ of the interval and the number $n$ of points sampled. There is already a certain asymmetry here. The number of points per unit interval, $\alpha = \frac{n}{a}$, is called the **intensity** of the Uniform process. Different Uniform processes having the same intensity are quite similar, especially when $n$ is large.

### Sample Spaces

The sample space $\Omega$ of the Bernoulli process is the set of all sequences of zeros and ones. To every such sequence we can associate a set of natural numbers: the set of positions having ones. For example,

$$(0,1,1,0,1,1,0,\ldots) \text{ corresponds to } \{2,3,5,6,\ldots\}.$$

This gives us a new way of looking at $\Omega$. It is the set of all subsets of the natural numbers.

The sample space $\Omega$ of the Uniform process is the set of all $n$-tuples $(X_1, X_2, \ldots, X_n)$ of real numbers such that $0 \leq X_j < a$. There seems to be little similarity between this sample space and the Bernoulli sample space.

### Events

The elementary events of the Bernoulli process are the subsets $H_n = (X_n = 1) =$ "the $n$th toss is heads." The elementary events of the Uniform process are the subsets $(s \leq X_j < t) =$ "the $i$th point falls in $[s,t)$." In both cases the events in general are obtained by intersections, complements and unions from the elementary events.

### Random Variables

Up to now we have viewed the random variables $X_i$ of the Bernoulli process and $X_j$ of the Uniform process as being fundamental. But there is an alternative point of view. We could equally well define the Bernoulli process by the random variables $S_n$, the number of successes in the first $n$ tosses. We should write this $S_n(p)$ to denote the fact that it depends on the parameter $p$. We know that $S_n(p)$ has binomial distribution with bias $p$:

$$P(S_n = k) = \binom{n}{k} p^k q^{n-k}.$$

Similarly we could define the Uniform process by the random variables $U_{n,a}(t)$, the number of points falling in the interval $[0,t)$. These are random variables we have not yet seen. For each $t$ in $[0,a]$, $U_{n,a}(t)$ is an integer random variable. In fact, one can easily see that $U_{n,a}(t)$ has the binomial distribution, for points fall in $[0,t)$ or in $[t,a]$ with the same probability as a tossed coin with bias $p = t/a$ lands heads or tails, respectively. Therefore,

$$P(U_{n,a}(t) = k) = \binom{n}{k} \left(\frac{t}{a}\right)^k \left(1 - \frac{t}{a}\right)^{n-k}.$$

We shall abbreviate $U_{n,a}(t)$ to simply $U(t)$. For each $t$, $U(t)$ is a new random variable. When a collection of random variables depend on a continuous parameter, we call the collection a **random function**. Be careful not to think of this as a "randomly chosen function" any more than a random variable is a "randomly chosen variable."

Next we compare the waiting time $W_k$ for the $k$th success in the Bernoulli process with the $k$th order statistic $X_{(k)}$. If we think of $[0,a]$ as part of a time axis, there is clearly an analogy between these two random variables. Compare their distribution and density:

$$P(W_k = n) = \binom{n-1}{k-1} p^k q^{n-k}$$

$$\text{dens}(X_{(k)} = t) = \frac{n!}{(k-1)!(n-k)!} \cdot \frac{1}{a} \left(\frac{t}{a}\right)^{k-1} \left(1 - \frac{t}{a}\right)^{n-k}$$

These are quite similar indeed except that in the latter case a factor of $q$ has become $\frac{1}{a}$, as a result of differentiation.

We finally come to the gaps in these two processes. In the Bernoulli process, the gaps $T_i$ are equidistributed with geometric distribution:

$$P(T_i = k) = q^{k-1}p.$$

The gaps $L_i$ of the Uniform process are also equidistributed, having the Dirichlet distribution:

$$\text{dens}(L_i = t) = \frac{n}{a}\left(1 - \frac{t}{a}\right)^{n-1}.$$

The analogy between these two cases is quite striking. However, the analogy breaks down because the gaps $T_i$ are independent, whereas the gaps $L_i$ are not. To be sure the $L_i$ try as hard as they can to be independent --- they are exchangeable --- but this is not enough. Another way to see the difference between the two processes is to return to the "fundamental" random variables $S_n$ and $U(t)$. The difference $S_n - S_m$ is the number of successes between $m$ and $n$. Similarly $U(t) - U(s)$ is the number of points falling between $s$ and $t$. Now if $(m_1, n_1]$ and $(m_2, n_2]$ are disjoint intervals of integers, then the random variables $S_{n_1} - S_{m_1}$ and $S_{n_2} - S_{m_2}$ are independent. But even if $[s_1, t_1)$ and $[s_2, t_2)$ are disjoint subintervals of $[0,a]$, $U(t_1) - U(s_1)$ and $U(t_2) - U(s_2)$ are not independent.

The difficulty stems from the fact that the Uniform process is on a finite interval and a finite number of points whereas the Bernoulli process is not limited in this way. Whether we choose to limit the Bernoulli process to a given finite number of tosses is irrelevant, for we can always continue it if we wish. The uniform process has no such option. We can always drop more points, but we cannot extend the interval to a longer one without totally altering our process.

These considerations suggest that there is a third process that makes the analogy perfect. Just letting the length go to infinity doesn't work because we cannot make sense of sampling a single point or a finite number of points uniformly from an infinite interval. We would like to have a process that is both uniform on an infinite interval and samples an infinite number of points. This works provided we let $a$ and $n$ go to infinity simultaneously while keeping the intensity $\alpha = \frac{n}{a}$ fixed. Intuitively, because the number of points per unit interval remains the same, in the limit one will have the same intensity, and the uniform processes will converge to a new process.

For example, consider the density of a gap as $a$ and $n$ become large:

$$\text{dens}(L_i = t) = \frac{n}{a}\left(1 - \frac{t}{a}\right)^{n-1}.$$

We know from calculus that $\lim_{n \to \infty}\left(1 + \frac{x}{n}\right)^n = e^x$. Therefore if we let $n$ tend to $\infty$, the above expression becomes $\alpha e^{-\alpha t}$. That is, in the limit the gaps become exponentially distributed. This is exactly what we would expect, for the gaps of the Bernoulli process are waiting times, and we would hope that the gaps of the new process will be continuous waiting times. Consider another example: the joint density of two gaps. In the Uniform process this density is not the product of the individual densities. In the limit, however, the joint density of two gaps is the product

$$\text{dens}((L_1 = t_1) \cap (L_2 = t_2)) = \text{dens}((X_{(1)} = t_1) \cap (X_{(2)} = t_1 + t_2))$$

$$\to \alpha^2 e^{-\alpha(t_1 + t_2)}$$

of the densities. So in the new process the gaps are independent and equidistributed, just as in the Bernoulli process. This helps to confirm our feeling that this is the correct approach.

As a final example, we consider the limit of the random function $U_{n,a}(t)$ as $a, n \to \infty$. Recall that

$$P(U_{n,a}(t) = k) = \binom{n}{k} \left(\frac{t}{a}\right)^k \left(1 - \frac{t}{a}\right)^{n-k}.$$

As in the last two examples, we can see that $\left(1 - \frac{t}{a}\right)^{n-k} \to e^{-\alpha t}$ because $k$ is a fixed integer. The limit of the first two factors is a bit harder. First write them as:

$$\binom{n}{k}\left(\frac{\alpha t}{n}\right)^k.$$

Then interchange denominators to get: $\frac{n!}{(n-k)! \cdot n^k} \cdot \frac{(\alpha t)^k}{k!}$. The second factor does not include $n$ and $a$. The first factor is:

$$\frac{n(n-1)\cdots(n-k+1)}{n^k} = \left(1 - \frac{1}{n}\right)\left(1 - \frac{2}{n}\right)\cdots\left(1 - \frac{k-1}{n}\right).$$

Each of the factors on the right-hand side approaches 1 as $n \to \infty$. Since there are a fixed number of them, their product approaches 1 as $n \to \infty$. Therefore,

$$\lim_{n,a \to \infty} P(U_{n,a}(t) = k) = \frac{(\alpha t)^k}{k!} e^{-\alpha t}.$$

Since $U_{n,a}(t)$ is the fundamental random function of the uniform process, its limit will be the fundamental random function of the new process. We shall write $N_\alpha(t)$ or $N(t)$ for this limit:

$$P(N_\alpha(t) = k) = \frac{(\alpha t)^k}{k!} e^{-\alpha t}.$$

Notice that the distribution of $N_\alpha(t)$ depends only on the product $\alpha t$. We call this distribution the **Poisson distribution**.

**Definition.** An integer random variable $X$ is said to have the **Poisson distribution** with parameter $\lambda$ if

$$P(X = k) = \begin{cases} \frac{\lambda^k}{k!} e^{-\lambda} & \text{if } k \geq 0 \\ 0 & \text{if } k < 0. \end{cases}$$

The expectation of such a random variable is

$$E(X) = \sum_k k \cdot P(X = k) = \sum_{k=1}^{\infty} k \cdot \frac{\lambda^k}{k!} e^{-\lambda} = \lambda e^{-\lambda} \sum_{k=1}^{\infty} \frac{\lambda^{k-1}}{(k-1)!} = \lambda e^{-\lambda} e^{\lambda} = \lambda.$$

Therefore, $E(N_\alpha(t)) = \alpha t$.

If we imagine that an infinite number of points are spread on the interval $[0,\infty)$ with density $\alpha$, then $N(t)$ is the number of points that have fallen in the interval $[0,t)$. The average number of points that fall in $[0,t)$ is $E(N_\alpha(t)) = \alpha t$, and the average number of points per unit interval is $\frac{E(N_\alpha(t))}{t} = \alpha$. This justifies calling $\alpha$ the **density** or **intensity** of the process.

Notice that we may no longer speak of which point has fallen first, which is second and so on. If we return to the uniform process for a moment, we can see why this would be so. Originally we used $X_1, X_2, \ldots, X_n$ as the defining random variables of the Uniform process. If we use the random function $U_{n,a}(t)$ we can no longer distinguish which point is which. All we know is which point is $X_{(1)}$, which is $X_{(2)}$, and so on. For example, $X_{(1)} = t$ if $U_{n,a}(t) = 0$ and $U_{n,a}(s) = 1$ for $s > t$. We can recover the entire Uniform process if we know all the random functions $U_{1,a}(t), U_{2,a}(t), \ldots, U_{n,a}(t)$. But when we let $a, n \to \infty$ we only use the random function $U_{n,a}(t)$. As a result the order statistics make sense in the Poisson process, but there is no analogue of the random variables $X_i$ of the Uniform process.

## 3. The Poisson Sample Space

So far we have discussed the Poisson process from two points of view. We first considered it purely phenomenologically via the random variables $T_i$ and $W_k$. Next we considered it as the limit of Uniform processes as the length of the interval increases. We must reconcile these two approaches, and we do so by an explicit construction of a model.

The Poisson sample space is $\Omega = \{\text{all rare sequences}\}$, where a **rare sequence** is a set of points in $[0,\infty)$ such that every finite interval has at most finitely many points of the rare sequence, i.e. the sequence doesn't cluster. To avoid confusion the points of a rare sequence are called **incidents** or **blips**. Don't confuse this notion with the concept of a sample point. The sample points of $\Omega$ in this case are the rare sequences (not the blips).

Defining $\Omega$ this way seems very natural because the Poisson process is the limit of the Uniform process (of intensity $\alpha$) on $[0,a]$ as $a \to \infty$. Unfortunately we have allowed $n$ to approach infinity as well. So the intensity is not an intrinsic part of the Poisson sample space as it was for the Uniform sample space, where the intensity is $\frac{n}{a}$.

The same situation occurs for the Bernoulli process. There the sample space is the same whatever the bias of our coin. It is only through the definition of the probability $P$ that we can say that "the average number of heads in $n$ tosses is $np$." In a similar way, we shall define a probability $P$ on the Poisson sample space so that the average number of points falling on any interval of length $t$ is $\alpha t$.

We define the probability $P$ on $\Omega$ by means of the random function $N(t)$. We already saw in the last section what the distributions of the random variables $N(t)$ ought to be. We will see in a moment how this point of view leads immediately to probabilities on the elementary Poisson events. All the distributions of the other random variables on $\Omega$ will be derived from the distributions of the $N(t)$. We make three fundamental assumptions:

**(1)** For every nonnegative real number $t$, $N(t)$ is a nonnegative integer random variable whose value is the number of blips in the interval $[0,t)$. More generally for $s \leq t$, $N(t) - N(s)$ is also an integer random variable whose value is the number of blips in the interval $[s,t)$.

**(2)** $P(N(t) - N(s) = k) = \frac{(\alpha(t-s))^k}{k!} e^{-\alpha(t-s)}$, if $0 \leq s \leq t$. That is, on any subinterval $[s,t)$ of $[0,\infty)$, the number of blips occurring has a Poisson distribution. Notice that we assume the density of the blips is independent of the location of the subinterval. In particular,

$$P(N(t) = k) = \frac{(\alpha t)^k}{k!} e^{-\alpha t}.$$

**(3)** If $[s_1, t_1)$ and $[s_2, t_2)$ are disjoint subintervals of $[0,\infty)$, then $N(t_1) - N(s_1)$ and $N(t_2) - N(s_2)$ are independent random variables. In other words, what happens on disjoint subintervals are independent of one another.

The above three fundamental assumptions implicitly define the events of $\Omega$. Assumption (1) implies that $(N(t) - N(s) = k)$ is an event of $\Omega$ for all $s$, $t$ and $k$. We had a different notation for this event in section 1.7:

$$\binom{s,t}{k} = \{\text{all rare sequences having } k \text{ blips in the interval } [s,t)\} = (N(t) - N(s) = k).$$

The above fundamental assumptions may be rewritten in terms of events as follows:

**(1')** The subsets $\binom{s,t}{k}$ of $\Omega$ are the **elementary Poisson events**. An arbitrary event of $\Omega$ is obtained from elementary events by intersections, complements and unions.

**(2')** $P\left(\binom{s,t}{k}\right) = \frac{(\alpha(t-s))^k}{k!} e^{-\alpha(t-s)}$.

**(3')** $\binom{s_1,t_1}{k_1}$ and $\binom{s_2,t_2}{k_2}$ are independent events provided that $[s_1, t_1)$ and $[s_2, t_2)$ are disjoint intervals.

Unfortunately there is a problem with the definition of $P$ above. How do we know that conditions (1), (2) and (3) do not imply some subtle contradiction? For the Bernoulli and the Uniform processes it was quite obvious that our definition gives a unique value for $P(A)$ no matter how the event $A$ is written in terms of elementary events. Although we have given many reasons for believing that the Poisson process should be well-defined, we haven't proved it yet. [If you are willing to believe that the Poisson process is well defined, you can skip lightly over the rest of this section.]

For example, consider the event $\binom{s,t}{\geq 1}$; i.e. the event that one or more blips occur in the interval $[s,t)$. We could also write this as:

$$\binom{s,t}{\geq 1} = \binom{s,t}{1} \cup \binom{s,t}{2} \cup \binom{s,t}{3} \cup \cdots$$

The probability of the event on the left hand side is:

$$P\left(\binom{s,t}{\geq 1}\right) = 1 - e^{-\alpha(t-s)}.$$

On the other hand, because the events $\binom{s,t}{k}$ are disjoint, the probability of the right hand side is the following. [Recall that the Taylor series expansion of $e^{\alpha(t-s)}$ is $1 + \alpha(t-s) + \frac{(\alpha(t-s))^2}{2!} + \cdots$.]

$$= \alpha(t-s)e^{-\alpha(t-s)} + \frac{(\alpha(t-s))^2}{2!}e^{-\alpha(t-s)} + \cdots$$

$$= (e^{\alpha(t-s)} - 1)e^{-\alpha(t-s)}$$

$$= 1 - e^{-\alpha(t-s)}.$$

So we get the same answer either way.

As another example, if $r \leq s < t$, then $k$ blips occur in $[r,t)$ if and only if some occur in $[r,s)$ and the rest occur in $[s,t)$. In symbols:

$$\binom{r,t}{k} = \bigcup_{j=0}^{k} \left[\binom{r,s}{j} \cap \binom{s,t}{k-j}\right].$$

We can therefore compute $P\left(\binom{r,t}{k}\right)$ in two ways. The first way is:

$$P\left(\binom{r,t}{k}\right) = \frac{(\alpha(t-r))^k}{k!} e^{-\alpha(t-r)}.$$

The second way is the following. It is quite complicated and requires all of our assumptions on $P$.

$$\sum_{j=0}^{k} P\left(\binom{r,s}{j}\right) P\left(\binom{s,t}{k-j}\right) = \sum_{j=0}^{k} \frac{(\alpha(s-r))^j}{j!} e^{-\alpha(s-r)} \cdot \frac{(\alpha(t-s))^{k-j}}{(k-j)!} e^{-\alpha(t-s)}$$

$$= \frac{\alpha^k}{k!} e^{-\alpha(t-r)} \sum_{j=0}^{k} \binom{k}{j}(s-r)^j(t-s)^{k-j}$$

$$= \frac{\alpha^k (t-r)^k}{k!} e^{-\alpha(t-r)}.$$

Notice our use of the Binomial formula. In any case, we again get the same answer either way.

Are there other relations among the events $\binom{s,t}{k}$ not obtainable from the above two examples? The answer is no, but this is not easy to prove: we leave this as an exercise. In any case we have now shown that $P$ is consistently defined. One can in fact show that in some sense every possible probability measure on the Poisson sample space is a perturbation of the probability $P$ we have just defined (for example, $\alpha$ could vary in time).

### Sums of Independent Poisson Random Variables

The Poisson process has an important property we now discuss. Imagine that we have two independent Poisson processes of intensities $\alpha$ and $\beta$. To distinguish them we color the blips of the first process red and the blips of the second process blue. Now suppose we are color-blind. What we will see is a Poisson process with intensity $\alpha + \beta$.

*Two independent Poisson processes*

Let $N_{\text{red}}(t)$ and $N_{\text{blue}}(t)$ be the random functions of the red and blue processes respectively. What we are saying implies that $N_{\text{red}}(t) + N_{\text{blue}}(t)$ has Poisson distribution with parameter $(\alpha + \beta)t$. Let's prove this. Since we assumed $N_{\text{red}}(t)$ and $N_{\text{blue}}(t)$ are independent, the distribution of $N_{\text{red}}(t) + N_{\text{blue}}(t)$ is the convolution of their individual distributions.

$$P(N_{\text{red}}(t) + N_{\text{blue}}(t) = n) = \sum_{k=0}^{n} P(N_{\text{red}}(t) = k)\, P(N_{\text{blue}}(t) = n-k)$$

$$= \sum_{k=0}^{n} \frac{(\alpha t)^k}{k!} e^{-\alpha t} \cdot \frac{(\beta t)^{n-k}}{(n-k)!} e^{-\beta t}$$

$$= \frac{e^{-(\alpha+\beta)t}}{n!} \sum_{k=0}^{n} \binom{n}{k} (\alpha t)^k (\beta t)^{n-k}$$

$$= \frac{((\alpha + \beta)t)^n}{n!} e^{-(\alpha+\beta)t}.$$

The last expression is the Poisson distribution with parameter $(\alpha + \beta)t$. Thus the sum of independent Poisson random variables is again Poisson. This is an important property of the Poisson process, and we will find some very deep applications of it in later sections.

### Physical Systems and the Poisson Process

We have already mentioned several examples of exponentially distributed random variables in section 1. The Poisson process is a sequence of independent exponentially distributed random variables so we shouldn't be surprised at its ubiquity.

**Geiger Counters.** The first example that comes to mind immediately is the sequence of clicks of a Geiger counter. If we are measuring the radiation of a radioactive sample, the clicks are almost the blips of a Poisson process. Of course, we know that the intensity $\alpha$ will gradually decrease as the sample decays. However, if we choose to measure time so that $\alpha$ becomes constant, the Poisson process is an almost perfect model of the physical system. Even if we measure time in the usual units, the model is very close.

**Quality Control.** Suppose we have a continuous assembly process (say of a rope or wire) and that this process occasionally produces tiny defects randomly on the rope. If we know the length of the rope and the number of defects, then the Uniform process is a good model of this system. On the other hand if we know only the average number of defects per unit length (from prior experience), then the Poisson process is a better model.

One can use such models for Quality Control. If a long length of rope is being produced, one can sample portions of the rope to determine if the number of defects per unit length is exceeding a specified level of acceptance, as might happen if an assembly machine is out of adjustment.

For example, if the average density of the defects on the rope is $\frac{1}{10}$ defect/foot, then the probability of no defects on a rope of length 10 feet is $e^{-1}$. The probability of exactly two defects is $\frac{1}{2}e^{-1}$.

**Blips from Space.** Suppose one is aiming a radio telescope toward one direction in the sky. The signal one is receiving is a sequence of irregularly spaced radio bursts or "blips". Is the signal simply noise or is it a broadcast from some station? By comparing statistical properties of the blips with the known properties of the Poisson process one can distinguish random noise from a broadcast signal with a certain probability of error.

**Seeds on a Cornfield.** There is a two-dimensional model analogous to the Poisson process. For a region $A$ in the plane, let $\ell(A)$ be the area of $A$. We replace the random function $N(t)$ by a random function $N(A) =$ "number of blips in the region $A$." The fundamental assumptions on $N(A)$ are:

**(1)** For every region $A$, $N(A)$ is an integer random variable: the number of blips occurring in the region.

**(2)** $P(N(A) = k) = \frac{(\alpha\ell(A))^k}{k!} e^{-\alpha\ell(A)}$, i.e. $N(A)$ has the Poisson distribution with parameter $\alpha\ell(A)$.

**(3)** If $A$ and $B$ are disjoint regions, then $N(A)$ and $N(B)$ are independent random variables. (Of course, we could produce a model of this kind in any number of dimensions.)

An example of such a process is the process of sprinkling seeds from an airplane randomly onto a field with some intensity $\alpha$, the average number of seeds per unit area. As another example, we might have stars spread randomly throughout a large volume of space with some average density $\alpha$ of stars per unit volume.

These are just a small selection of an enormous range of examples of the Poisson process occurring in nature. In fact it is the most common of the four basic stochastic processes. We shall now see how the Poisson process can enrich our understanding of the first two stochastic processes; moreover it will give us a powerful tool for computing probability distributions in these processes.

### Gaps and Waiting Times

We will now check that in our model the distributions of the gaps and the waiting times correspond to our earlier computations. Consider first the waiting time $W_k$ for the $k$th blip. The event $(W_k \geq t)$ means that the $k$th blip has not yet occurred by time $t$, or equivalently that $k-1$ or fewer blips have occurred in the interval $[0,t)$. In terms of $N(t)$:

$$(W_k \geq t) = (N(t) = 0) \cup (N(t) = 1) \cup \cdots \cup (N(t) = k-1).$$

The events of the right hand side being disjoint, we may compute:

$$P(W_k \geq t) = P(N(t) = 0) + P(N(t) = 1) + \cdots + P(N(t) = k-1)$$

$$= e^{-\alpha t} + \alpha t\, e^{-\alpha t} + \frac{(\alpha t)^2}{2!} e^{-\alpha t} + \cdots + \frac{(\alpha t)^{k-1}}{(k-1)!} e^{-\alpha t}.$$

The density of $W_k$ is the derivative $\frac{d}{dt} P(W_k < t) = \frac{d}{dt}(1 - P(W_k > t))$. Since $P(W_k = t) = 0$,

$$\text{dens}(W_k = t) = \frac{d}{dt} P(W_k \leq t).$$

When we differentiate the latter expression, each term except for the first gives rise to two terms.

$$-\text{dens}(W_k = t) = (-\alpha e^{-\alpha t}) + (\alpha e^{-\alpha t} - \alpha^2 t\, e^{-\alpha t}) + (\alpha^2 t\, e^{-\alpha t} - \frac{\alpha^3 t^2}{2!} e^{-\alpha t})$$

$$+ \cdots + \left(\frac{\alpha^{k-1} t^{k-2}}{(k-2)!} e^{-\alpha t} - \frac{\alpha^k t^{k-1}}{(k-1)!} e^{-\alpha t}\right).$$

All the terms then cancel except for the last one so that

$$\text{dens}(W_k = t) = \frac{\alpha^k t^{k-1}}{(k-1)!} e^{-\alpha t},$$

which is the gamma distribution. In particular, the first waiting time (the first gap) is exponentially distributed.

To show that the gaps are independent and exponentially distributed with parameter $\alpha$ we use the continuous law of successive conditioning and the continuous law of alternatives in exactly the same way that we used the ordinary law of successive conditioning and the ordinary law of alternatives to compute the distributions of the gaps of the Bernoulli process in section VI.2. The verification is left as an exercise.

### The Uniform Process from the Poisson Process

We built the model of the Poisson process by thinking of what happens to the Uniform process as the length of the interval gets larger. We can turn this around; by conditioning the Poisson process to have exactly $n$ blips in the interval $[0,a]$, we get the Uniform process.

To see this we compute the conditional probability

$$P(N(t) = k \mid N(a) = n) = \frac{P((N(t) = k) \cap (N(a) = n))}{P(N(a) = n)}.$$

Now $(N(a) = n) \cap (N(t) = k)$ says that $n$ blips occur in $[0,a)$ and that $k$ of them occur in $[0,t)$. In other words $k$ blips occur in $[0,t)$ and $n-k$ occur in $[t,a)$. These are disjoint intervals; therefore

$$P(N(t) = k \mid N(a) = n) = \frac{P(N(t) = k)\, P(N(a) - N(t) = n-k)}{P(N(a) = n)}$$

$$= \frac{\frac{(\alpha t)^k}{k!} e^{-\alpha t} \cdot \frac{(\alpha(a-t))^{n-k}}{(n-k)!} e^{-\alpha(a-t)}}{\frac{(\alpha a)^n}{n!} e^{-\alpha a}}$$

$$= \binom{n}{k} \left(\frac{t}{a}\right)^k \left(1 - \frac{t}{a}\right)^{n-k}.$$

We recognize this as the distribution of $U_{n,a}(t)$. Since we can express any computation about order statistics in terms of the random function $U_{n,a}(t)$, we can in principle compute anything about order statistics by conditioning the Poisson process.

For example, we can compute the densities of the order statistics without using a limit argument as we did in section III.3.

$$\text{dens}(X_{(k)} = t) = \text{dens}(W_k = t \mid N(a) = n)$$

$$= \frac{\text{dens}((W_k = t) \cap (N(a) = n))}{P(N(a) = n)}.$$

If you feel uneasy about the use of a mixture of a density and a probability in the above computation just rewrite it as:

$$\text{dens}((W_k = t) \cap (N(a) = n)) = \frac{d}{dt} P((W_k \leq t) \cap (N(a) = n)).$$

The event $(W_k \leq t)$ is the same as saying at least $k$ blips occur in $[0,t)$, i.e. $(W_k \leq t) = (N(t) = k) \cup (N(t) = k+1) \cup \cdots$. On the other hand, if we know that the $k$th blip has occurred at time $t$, then $(N(a) = n)$ and $(N(a) - N(t) = n-k)$ are the same event. Therefore

$$\text{dens}((W_k = t) \cap (N(a) - N(t) = n-k))$$

$$= \text{dens}(W_k = t)\, P(N(a) - N(t) = n-k)$$

$$= \frac{\alpha^k t^{k-1}}{(k-1)!} e^{-\alpha t} \cdot \frac{(\alpha(a-t))^{n-k}}{(n-k)!} e^{-\alpha(a-t)}.$$

Dividing by $P(N(a) = n) = \frac{(\alpha a)^n}{n!} e^{-\alpha a}$, we get

$$\text{dens}(X_{(k)} = t) = \frac{n!}{(k-1)!(n-k)!} \cdot \frac{t^{k-1}(a-t)^{n-k}}{a^n}.$$

Notice that when a Poisson process is conditioned by $(N(a) = n)$, the result is always the uniform process of sampling $n$ points from $[0,a]$ no matter what the intensity was in the original Poisson process. This is further confirmation that the Poisson process is the process of sprinkling points at random on $[0,\infty)$.

## 4. The Schrodinger Method

One of the most striking applications of the Poisson process is to the discrete problem of counting the number of ways of putting balls into boxes. We consider the problem in full generality. That is, we want a technique whereby if we are given $k$ balls and $n$ boxes and if we are given any restrictions whatsoever on the occupation numbers, then we can compute how many ways this can be done. For example, one might restrict each box to contain zero, one or two balls. For small $k$ and $n$, one could exhaustively enumerate the possibilities. But for $k$ and $n$ even as small as 10, this is already a very non-trivial problem. As another example, suppose we require that if the third box has an odd number of balls then the fifth box has a multiple of seven balls in it. We need a very systematic procedure if we are to give a reasonable solution to such a counting problem. The technique we will develop is due to Schrodinger, and we call it the **randomization technique** for reasons we will see in the next section.

We begin with a formula from Calculus whose significance is seldom made very clear: Taylor's formula. The difficulty stems from a common misconception that one is supposed to use this formula to compute the Taylor expansion of a function. Although in principle this is possible, this is quite misleading. In fact one usually computes the Taylor expansion by some other technique (and there are many such techniques). One uses the Taylor formula to compute the values of the derivatives of the function at 0 rather than the other way around!

**Taylor's formula.** Every function $f$ that can be differentiated infinitely many times at 0 has a unique power series expansion, called the Taylor expansion of $f$ at 0:

$$f(0) + f'(0)\,x + \frac{1}{2!}f''(0)\,x^2 + \cdots + \frac{1}{k!}f^{(k)}(0)\,x^k + \cdots$$

The notation $f^{(k)}(0)$ is an abbreviation for

$$\left.\frac{d^k f}{dx^k}\right|_{x=0}.$$

For example, if one wishes to compute the Taylor expansion of $f(x) = \sqrt{1+x}$, one should not start differentiating repeatedly. The best way is to use the binomial expansion:

$$(1+x)^{\alpha} = 1 + \binom{\alpha}{1}x + \binom{\alpha}{2}x^2 + \cdots$$

where the binomial coefficient $\binom{\alpha}{k} = \frac{\alpha(\alpha-1)\cdots(\alpha-k+1)}{k!}$ makes sense for any number $\alpha$ as we already noted in section III.6. So for example

$$f(x) = \sqrt{1+x} = 1 + \binom{1/2}{1}x + \binom{1/2}{2}x^2 + \cdots$$

and by Taylor's formula we see, for instance, that

$$f'''(0) = 3!\binom{1/2}{3} = \frac{(1/2)(-1/2)(-3/2)}{1} = \frac{3}{8} \cdot (-1) = -\frac{3}{16}.$$

Suppose that we are given some conditions on the occupation numbers of $n$ boxes. The number of ways we can place $k$ balls into the $n$ boxes subject to these conditions is $n^k P(B_k)$, where $B_k$ is the event:

$B_k =$ "a placement of $k$ balls into $n$ boxes satisfies the given conditions on the occupation numbers."

This event is a subset of the sample space $\Omega$ of all placements of $k$ balls into $n$ boxes, each being equally likely.

To compute $P(B_k)$ we construct "physical" boxes from an interval of length $[0,1]$ by cutting it into subintervals each of length $\frac{1}{n}$. Then $P(B_k)$ is the probability that $k$ points dropped at random uniformly on $[0,1]$ will satisfy the given conditions on the occupation numbers.

*6 boxes made from $[0,1]$*

This converts any balls-into-boxes problem into a computation of the probability of a certain event of the Uniform process.

Now comes the important step. We ask a different question. What is the probability that for a rare sequence of blips on $[0,\infty)$ those blips falling in $[0,1]$ satisfy the given conditions? Call this event $A$. At first it appears that the computation of $P(A)$ is a much harder problem, but we shall see that it is actually much easier. Once we know $P(A)$, we still do not yet know $P(B_k)$ because the events are in completely different processes. However, we just saw that whenever we condition the Poisson process by the event $(N(a) = k)$, the result is a Uniform process. Therefore,

$$P(B_k) = P(A \mid N(1) = k),$$

and this holds no matter what the intensity of the original Poisson process. The relationship between $P(A)$ and the conditional probabilities $P(A \mid N(1) = k)$ is given by the law of alternatives:

$$P(A) = \sum_{k=0}^{\infty} P(A \mid N(1) = k)\, P(N(1) = k)$$

$$= \sum_{k=0}^{\infty} P(B_k) \frac{\alpha^k}{k!} e^{-\alpha}.$$

If we multiply both sides of this equation by $e^{\alpha}$, we get the important formula:

$$P(A)e^{\alpha} = \sum_{k=0}^{\infty} P(B_k) \frac{\alpha^k}{k!}.$$

The left hand side is a function $f(\alpha)$ of the variable $\alpha$ because $A$ is an event of the Poisson process, which depends on the intensity $\alpha$. The probabilities $P(B_k)$, on the other hand, do not depend on $\alpha$. Therefore, by the Taylor formula,

$$P(B_k) = \left.\frac{d^k}{d\alpha^k}\left[P(A)e^{\alpha}\right]\right|_{\alpha=0}.$$

Consider the following example. Suppose that the conditions on the occupation numbers are that $O_i$ be zero or one for all boxes $i$. We computed $P(B_k)$ for this case in section III.2: $P(B_k) = \frac{n!}{n^k(n-k)!}$. To compute this using the randomization technique we must first compute $P(A)$, where $A$ is the event "either no blips or just one blip occur in each of the $n$ subintervals of length $\frac{1}{n}$ of $[0,1]$." If we write $A_i$ for the event "box $i$ (i.e. the subinterval $[\frac{i-1}{n}, \frac{i}{n})$) of $[0,1]$ has either no blips or just one blip," then

$$A = A_1 \cap A_2 \cap \cdots \cap A_n.$$

In terms of elementary Poisson events,

$$A_i = \binom{\frac{i-1}{n},\frac{i}{n}}{0} \cup \binom{\frac{i-1}{n},\frac{i}{n}}{1}.$$

So $P(A_i) = e^{-\alpha/n} + \frac{\alpha}{n}e^{-\alpha/n} = \left(1 + \frac{\alpha}{n}\right)e^{-\alpha/n}$.

Now comes the crucial step. In the Poisson process, the number of blips in disjoint intervals are independent of one another. This is not true for the Uniform process, and it is not true for occupation numbers of balls into boxes. It is this fact about the Poisson process that makes this technique so effective. $P(A)$ is easy to compute because the computation of $P(A_i)$ is a routine application of the definition of the Poisson process, and $P(A) = P(A_1)P(A_2)\cdots P(A_n)$.

$$P(A) = \left(1 + \frac{\alpha}{n}\right)^n e^{-\alpha}.$$

Therefore $P(A)e^{\alpha} = \left(1 + \frac{\alpha}{n}\right)^n$ and $P(B_k) = \left.\frac{d^k}{d\alpha^k}\left(1 + \frac{\alpha}{n}\right)^n\right|_{\alpha=0}$.

The formula $P(B_k) = \left.\frac{d^k}{d\alpha^k}\left(1 + \frac{\alpha}{n}\right)^n\right|_{\alpha=0}$ is a perfectly legitimate answer to this problem. We can, however, put this into a nicer form by first expanding $(1 + \frac{\alpha}{n})^n$ using the binomial formula and by doing a little rearranging:

$$(1 + \frac{\alpha}{n})^n = \sum_{k=0}^{n} \binom{n}{k} \frac{\alpha^k}{n^k}.$$

Therefore $P(B_k) = \frac{n!}{n^k(n-k)!}$, exactly as we got previously. It appears that this is the harder way to compute this answer, but that is only because this example is special. In most cases this technique is considerably easier.

As a harder example consider the event $B_k =$ "every box has at least one ball in it." We computed $P(B_k)$ in section IV.8, using the inclusion-exclusion principle. This was quite an elaborate argument. To compute $P(B_k)$ using randomization, we first compute $P(A)$, where $A =$ "all $n$ boxes of $[0,1]$ have at least one blip." As above, let $A_i =$ "box $i$ has at least one blip." Then

$$A_i = \binom{\frac{i-1}{n},\frac{i}{n}}{\geq 1}$$

so that $P(A_i) = 1 - e^{-\alpha/n}$. Hence $P(A) = (1 - e^{-\alpha/n})^n$ and $P(A)e^{\alpha} = (1 - e^{-\alpha/n})^n e^{\alpha} = (e^{\alpha/n} - 1)^n$. Therefore

$$P(B_k) = \left.\frac{d^k}{d\alpha^k}(e^{\alpha/n} - 1)^n\right|_{\alpha=0}.$$

Now we could leave the answer in this form, but we can derive a better expression by using the binomial formula and the well-known Taylor expansion of the exponential function.

$$(e^{\alpha/n} - 1)^n = \sum_{j=0}^{n} \binom{n}{j}(-1)^{n-j} e^{j\alpha/n}.$$

Therefore,

$$P(B_k) = \sum_{j=0}^{n} \binom{n}{j}(-1)^{n-j}\left(\frac{j}{n}\right)^k = 1 - \binom{n}{1}\left(1 - \frac{1}{n}\right)^k + \binom{n}{2}\left(1 - \frac{2}{n}\right)^k - \cdots$$

For another example, suppose we want every box to have at most two balls. By now one should be able to compute this immediately:

$$P(A) = \left(e^{-\alpha/n} + \frac{\alpha}{n}e^{-\alpha/n} + \frac{\alpha^2}{2n^2}e^{-\alpha/n}\right)^n$$

$$P(B_k) = \left.\frac{d^k}{d\alpha^k}\left[\left(1 + \frac{\alpha}{n} + \frac{\alpha^2}{2n^2}\right)^n\right]\right|_{\alpha=0}.$$

### Summary

To compute $P(B_k)$, where $B_k$ is the event "a placement of $k$ balls into $n$ boxes satisfies certain given conditions on the occupation numbers," we do the following:

1. Let $A$ be the event of the Poisson process that "the rare sequence of blips on $[0,\infty)$ has the property that the blips falling in $[0,1]$ satisfy the given conditions on the occupation numbers." Box $i$ is now the sub-interval $\left[\frac{i-1}{n}, \frac{i}{n}\right)$.

2. Compute $P(A)$. This will be a function of $\alpha$. Generally this will not be difficult to compute because what happens in disjoint intervals of the Poisson process are independent of one another.

3. Apply the formula: $P(B_k) = \left.\frac{d^k}{d\alpha^k}\left[P(A)e^{\alpha}\right]\right|_{\alpha=0}$. One can often apply some formulas such as the binomial formula, to expand $P(A)e^{\alpha}$ thereby deriving another expression for $P(B_k)$.

## 5. Randomized and Compound Processes

Randomization is a general term for the method whereby new stochastic processes are created by allowing a parameter of a given stochastic process to be chosen randomly according to some distribution.

### Randomized Uniform Process

For example, consider the Uniform process of sampling $n$ points from the interval $[0,a]$. Suppose that instead of sampling a fixed number $n$ of points we sample a random number $N$ of points. That is, we consider the two-step process:

1. Choose a number $N$ of points to be sampled, according to some probability distribution: $P(N = n) = p_n$.

2. Once $N$ is known, sample that many points from $[0,a]$ according to the Uniform process.

We have replaced the fixed number $n$ of points by the integer random variable $N$, having probability distribution $P(N = n) = p_n$. The result is a new stochastic process, the **randomized uniform process**.

Every question we have asked about the ordinary Uniform process may now be asked for the randomized process. To compute the answers in this new process, we use the law of alternatives. For example, we might ask what the probability is for exactly $k$ points to be in the interval $[0,t]$. Call this event $A_k$. We want to compute $P(A_k)$. By the law of alternatives,

$$P(A_k) = \sum_{n=0}^{\infty} P(A_k \mid N = n)\, P(N = n).$$

Now $P(A_k \mid N = n)$ is the probability that exactly $k$ points are in $[0,t]$ but in the ordinary Uniform process of sampling a fixed number $n$ of points from $[0,a]$. We computed this probability back in section VI.1, where we denoted it by $P(U_{n,a}(t) = k)$.

$$P(A_k \mid N = n) = P(U_{n,a}(t) = k) = \binom{n}{k}\left(\frac{t}{a}\right)^k\left(1 - \frac{t}{a}\right)^{n-k}.$$

Therefore the unconditional probability $P(A_k)$ in the randomized uniform process is

$$P(A_k) = \sum_{n=0}^{\infty} \binom{n}{k}\left(\frac{t}{a}\right)^k\left(1 - \frac{t}{a}\right)^{n-k} p_n.$$

If the probabilities $p_n$ have a nice form, then it may be possible to simplify this expression, but normally the answer to a question about a randomized process will be in the form of an infinite series.

There are two reasons why one would randomize a stochastic process. The first is that it allows one to produce more general models of phenomena, which can be more realistic reflections of the phenomena being studied. We shall see examples of these in the exercises. Perhaps more important is the second reason: randomization can be used as a very powerful and effective computational tool. In fact this is one of the most important uses of probability theory. Problems that cannot be solved by direct means can be solved by allowing certain parameters to be random variables. The technique of the last section is just one of these.

Consider another example in the randomized uniform process. Let $B_t$ be the event "in the process of sampling $N$ points uniformly from $[0,1]$, all the points appear in $[0,t]$." Then

$$P(B_t) = \sum_{n=0}^{\infty} P(B_t \mid N = n)\, P(N = n),$$

by the law of alternatives. Now $P(B_t \mid N = n)$ is the probability that all the points of the ordinary uniform process of sampling $n$ points from $[0,1]$ occur in $[0,t]$. Therefore, $P(B_t \mid N = n) = t^n$, since we have chosen the length of the interval to be 1. Therefore, $P(B_t) = \sum_{n=0}^{\infty} t^n p_n$. This is a function of $t$ that is usually called the **generating function** of the sequence $\{p_n\}$.

The technique of generating functions is important both in probability theory and in other branches of mathematics. Unfortunately it is usually defined by fiat with little motivation beyond saying that it is useful. Using probability theory we see more intuitively how it arises. Namely, given a sequence $\{p_n\}$ forming a probability distribution, the generating function $f(t) = \sum_{n=0}^{\infty} p_n t^n$ of the sequence is the probability that a random number of points, the number chosen according to the distribution $p_n$, when sampled from the unit interval, all occur in the subinterval $[0,t]$. In other words, the generating function is a way of studying a sequence $\{p_n\}$ by setting up a certain experiment using the sequence $\{p_n\}$ and by studying the properties of this experiment. This is the underlying reason why this technique turns out to be so useful.

### Randomized Poisson Process

Now consider the Poisson process. Since this process may be regarded as being the Uniform process as $n$ and $a$ approach infinity but with $\alpha = \frac{n}{a}$ fixed, we see that the intensity $\alpha$ is the analog in the Poisson process of the number of points sampled in the Uniform process. The **randomized Poisson process** is a Poisson process but with a random intensity $A$ (capital alpha) instead of a fixed intensity. More precisely, this process is again a two-step process:

1. Choose an intensity $\alpha$ according to the density function $g(\alpha) = \text{dens}(A = \alpha)$ of the positive continuous random variable $A$.

2. Observe a rare sequence of blips in the Poisson process having the chosen intensity.

Let $T$ be the waiting time for the first blip in the randomized Poisson process. To compute the distribution of $T$, we use the law of alternatives but this time the continuous version.

$$P(T > t) = \int_0^{\infty} P(T > t \mid A = \alpha)\,\text{dens}(A = \alpha)\,d\alpha.$$

The conditional probability $P(T > t \mid A = \alpha)$ is computed in the ordinary Poisson process with intensity $\alpha$. Therefore:

$$P(T > t) = \int_0^{\infty} e^{-\alpha t}\, g(\alpha)\,d\alpha.$$

The function $\hat{g}(t) = \int_0^{\infty} e^{-\alpha t}\, g(\alpha)\,d\alpha$ is called the **Laplace transform** of the function $g(\alpha)$.

The Laplace transform is an important technique in engineering and in the sciences as well as in mathematics. We now see why. If we are given a function $g(\alpha)$ forming the probability density of a positive random variable, we can study $g(\alpha)$ by setting up an experiment and then studying the properties of the experiment. The experiment consists of waiting for the first blip of a Poisson process whose intensity is chosen according to the density $g(\alpha)$. The probability distribution of this experiment is $1 - \hat{g}(t)$, where $\hat{g}(t)$ is the Laplace transform of $g(\alpha)$.

As a simple example of this point of view, we can explain an important property of the Laplace transform: the Laplace transform of the convolution of functions is the product of their Laplace transforms:

$$\widehat{f*g} = \hat{f}\hat{g}.$$

Suppose that $f(\alpha)$ and $g(\alpha)$ are the densities of independent random variables $A$ and $B$. Their convolution is the density of the sum $A + B$. Let $T$ be the waiting time for the first gap in the Poisson process with random intensity $A + B$. We can compute $P(T > t)$ in two ways. Since the density of $A + B$ is $f*g$, we know that $P(T > t) = \widehat{f*g}(t)$. On the other hand, we may view the event $(T > t)$ in another way. Sprinkle blips on $[0,\infty)$ with intensity $A$ and then with intensity $B$. Then $(T > t) = (T_A > t) \cap (T_B > t)$, where $T_A$ is the waiting time for the first $A$-blip and $T_B$ is the waiting time for the first $B$-blip. Since these two kinds of blips were sprinkled independently,

$$P(T > t) = P(T_A > t)\, P(T_B > t) = \hat{f}(t)\,\hat{g}(t).$$

Therefore

$$\widehat{f*g} = \hat{f}\hat{g}.$$

Randomizing by an integer or a continuous random variable results in a "generating function" or a "transform" of the distribution or density, respectively. All transforms can be given a probabilistic (possibly quantum probabilistic) interpretation. The Fourier transform is perhaps the deepest example of a transform, since it is intimately connected with quantum probability.

### Finite Sampling Processes

The finite sampling process or balls-into-boxes can also be randomized. Namely we choose a random number $K$ of balls and then place them randomly into the $n$ boxes.

If we can make a judicious choice of distribution for $K$, then we can possibly make computations in the finite sampling process easier. It was Schrodinger's observation that a good choice for the distribution of $K$ is the Poisson distribution.

The reason that the Poisson distribution works so well is the fact about the Poisson process noted earlier: if we combine two independent Poisson processes with intensities $\alpha$ and $\beta$, the result is a Poisson process with intensity $\alpha + \beta$. In terms of the Poisson distribution this says that if $X$ and $Y$ are independent Poisson random variables of parameters $\lambda$ and $\mu$, then $X + Y$ has Poisson distribution with parameter $\lambda + \mu$. We simply reverse this. Suppose that $K$ has Poisson distribution with parameter $\alpha$. Then $K = K_1 + K_2 + \cdots + K_n$, where the $K_i$ are independent Poisson random variables each with parameter $\frac{\alpha}{n}$. The randomized finite sampling process then "splits up" into $n$ independent randomized finite sampling processes. Each of these randomized finite processes consists of placing a random number $K_i$ of balls into one box. In the last section we used a more specific model. There $K$ was $N(1)$, the number of points occurring in $[0,1)$ in the Poisson process of intensity $\alpha$. Then $N(1) = N\left(\frac{1}{n}\right) + N\left(\frac{2}{n}\right) - N\left(\frac{1}{n}\right) + \cdots$ is a sum of $n$ independent Poisson random variables each of intensity $\frac{\alpha}{n}$, where $N\left(\frac{i}{n}\right) - N\left(\frac{i-1}{n}\right)$ is the number of points occurring in the $i$th subinterval.

By randomizing, we made non-independent random variables (the occupation numbers) independent. We return to the non-randomized process by conditioning the randomized one, using the law of alternatives.

A generalization of this process immediately comes to mind. We could just as easily drop balls into boxes of different sizes. That is, such that the balls are not equally likely to fall into the various boxes. The Schrodinger technique works just as well in this case; the only change required is that $K$ be split into a sum $K_1 + \cdots + K_n$, where $K_i$ is Poisson with parameter $p_i\alpha$, $p_i$ being the probability that any given ball falls in box $i$. This is the physicists' model of a classical statistical mechanical system. Here $p_i$ is related to the energy of the state represented by box $i$.

## 6.\* Reliability Theory

One of the prominent features of technological development is that increasingly complex machines are being built. Cars, computers and spacecraft are all getting more and more intricate. The problem of reliability theory is to measure the reliability of such large systems when the reliability of individual components is known. This is particularly relevant in spacecraft, for example, because they incorporate a high degree of redundancy among their subsystems. It is not often easy to determine to what extent reliability is enhanced by the presence of backup subsystems.

There are, of course, many ways to interpret the notion of reliability. We will describe one approach which then furnishes one with a pattern for developing concepts of reliability more suited to one's particular application. Our approach is concerned with the probability distribution of the time until failure of a system made up of components that fail not because they "wear out" but rather because they are subject to a chance malfunction. The probability model that is most appropriate for such components is the exponential distribution. More precisely if we have a component $C$, then the time $T_C$ until $C$ fails (or the length of time that $C$ functions properly) has probability distribution given by $P(T_C \leq t) = 1 - e^{-\alpha t}$, where $\alpha$ is some constant, characteristic of the component. We would use this model for a component which is not subject to significant deterioration during the operating lifetime of the system and which fails as a result of chance causes, e.g. lightning, power surges, meteorites, etc.

Each component will be viewed as having inputs and outputs connected to other components, the whole system forming a network or circuit. Components in series must all function for the system to function, and if components are in parallel then the system will function if any one of these components operates. For example, suppose that our components are three power lines joining a power plant to the city it serves. The network may be represented by this diagram:

*[Three lines in series from power plant to city]*

Assume that the times until failure, $T_1$, $T_2$ and $T_3$, of the three lines are independent random variables, each exponentially distributed with parameter $\alpha$. How reliably is the power plant joined to the city? Well, the city will have its power supply if and only if all of the lines function properly. Therefore the time $T$ until failure of the whole network satisfies

$$P(T > t) = P((T_1 > t) \cap (T_2 > t) \cap (T_3 > t))$$

$$= P(T_1 > t)\, P(T_2 > t)\, P(T_3 > t)$$

$$= (e^{-\alpha t})^3 = e^{-3\alpha t}.$$

Therefore the distribution and density of $T$ are given by:

$$P(T \leq t) = 1 - e^{-3\alpha t} \quad \text{and} \quad \text{dens}(T = t) = 3\alpha e^{-3\alpha t}.$$

Thus the network acts precisely as if it consisted of a single line whose average time until failure is one-third that of an individual line.

As another example, suppose that there are three cooling systems at the power plant and that only one is required to cool the plant. Thus we may view the three cooling systems as being in parallel rather than in series as in this diagram:

*[Three systems in parallel from power plant to cooling system]*

Now how reliably is the power plant being cooled? Well, for the power plant to lose its coolant, all three systems must have failed. Using the same assumptions about the systems as before, we find that the time $T$ until failure of the network has distribution:

$$P(T \leq t) = P((T_1 \leq t) \cap (T_2 \leq t) \cap (T_3 \leq t))$$

$$= P(T_1 \leq t)\, P(T_2 \leq t)\, P(T_3 \leq t)$$

$$= (1 - e^{-\alpha t})^3$$

$$= 1 - 3e^{-\alpha t} + 3e^{-2\alpha t} - e^{-3\alpha t}.$$

Therefore the density of $T$ is given by:

$$\text{dens}(T = t) = 3\alpha e^{-\alpha t} - 6\alpha e^{-2\alpha t} + 3\alpha e^{-3\alpha t}.$$

In this case we find that $T$ is not exponentially distributed. Its mean and variance are given by:

$$E(T) = \frac{3}{\alpha} - \frac{3}{2\alpha} + \frac{1}{3\alpha} = \frac{11}{6\alpha} \approx \frac{1.83}{\alpha}$$

$$\text{Var}(T) = E(T^2) - E(T)^2 = \frac{85}{36\alpha^2}$$

$$\sigma(T) = \frac{1.34}{\alpha}.$$

In other words the average time until failure is about 1.83 times as long as the average time until failure of a single line. However, the standard deviation is smaller than that of an exponential distribution whose mean is $\frac{1.83}{\alpha}$.

*Distribution and Density graphs*

For more complicated networks a similar kind of reasoning may be applied. We give some examples in the exercises. Moreover, one can use more complex distributions to model the behavior of the components of a system. By building larger networks from components which are, in turn, networks of subcomponents, one can give a precise model for the reliability of very complicated systems.

### Table of Poisson Distributions

| Distribution | Type | Parameter(s) | Model(s) |
|---|---|---|---|
| Exponential | continuous | $\alpha$ | $W_1$ or any $T_i$ in the Poisson process |
| Gamma | continuous | $\alpha$, $k$ | $W_k$ in the Poisson process |
| Poisson | integer | $\alpha$ | $N(t)$ in the Poisson process, where $\lambda = \alpha t$ |

| Distribution | Distribution or Density | Mean | Variance |
|---|---|---|---|
| Exponential | $f(t) = \alpha e^{-\alpha t}$ | $\frac{1}{\alpha}$ | $\frac{1}{\alpha^2}$ |
| Gamma | $f(t) = \frac{\alpha^k t^{k-1}}{(k-1)!} e^{-\alpha t}$ | $\frac{k}{\alpha}$ | $\frac{k}{\alpha^2}$ |
| Poisson | $p_k = \frac{\lambda^k}{k!} e^{-\lambda}$ | $\lambda$ | $\lambda$ |

**Fact:** If $N$ and $M$ are independent Poisson random variables whose parameters are $\lambda$ and $\mu$, respectively, then $N + M$ is also Poisson but with parameter $\lambda + \mu$.

### Tables of Analogies: Bernoulli, Poisson and Uniform Processes

| | **Bernoulli** | **Poisson** | **Uniform** |
|---|---|---|---|
| **Parameters** | $p = \text{bias}$ | $\alpha = \text{intensity (average number of blips per unit interval)}$ | $n = \text{number of points sampled}$, $a = \text{length of interval}$, $\frac{n}{a} = \text{intensity}$ |
| **Defining R.V.'s** | $X_i = \text{outcome of } i\text{th toss}$ (independent, equidistributed, Bernoulli distribution) | | $X_j = j\text{th point sampled}$ (independent, equidistributed, Uniform distribution) |
| **Counting R.V.'s** | $S_n = \text{number of successes in first } n \text{ tosses}$ (Binomial distribution) | $N(t) = \text{number of blips in } [0,t)$ (Poisson distribution) | $U(t) = \text{number of points in } [0,t)$ (Binomial distribution) |
| **Waiting Times** | $W_k = k\text{th waiting time}$ (Neg. binomial distrib.) | $W_k = k\text{th waiting time}$ (Gamma distribution) | $X_{(k)} = k\text{th order statistic}$ (Dirichlet distribution) |
| **Gaps** | $T_i = i\text{th gap}$ (independent, equidistributed, Geometric distrib.) | $T_i = i\text{th gap}$ (independent, equidistributed, Exponential distrib.) | $L_i = i\text{th gap}$ (equidistributed, Dirichlet distrib.) |
