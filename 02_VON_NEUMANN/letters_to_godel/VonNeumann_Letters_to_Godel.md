---
title: "Von Neumann: Letters to K. Godel (Combined)"
author: "John von Neumann"
date_range: "1930-11-20 to 1933-02-14"
recipient: "Kurt Godel"
source: "Von Neumann Selected Letters, edited by Miklos Redei"
published_in: "K. Godel: Collected Works, Vol. V. Correspondence H-Z (Oxford University Press, 2003)"
pages: "pp. 123-127 in the Selected Letters volume"
note: "This file is a combined compilation. Individual letters are also available as separate files."
---

# Letters to K. Godel

*From John von Neumann's Selected Letters, edited by Miklos Redei*

This section contains four letters from von Neumann to Godel, spanning the period from November 1930 to February 1933. These letters document one of the most important intellectual exchanges in the history of mathematical logic.

The individual letters are available as separate files:

1. [Letter 1 -- November 20, 1930](Letter1_Nov20_1930.md): Von Neumann announces his independent discovery of the second incompleteness theorem.
2. [Letter 2 -- November 29, 1930](Letter2_Nov29_1930.md): Von Neumann defers to Godel's priority and discusses implications for foundations.
3. [Letter 3 -- January 12, 1931](Letter3_Jan12_1931.md): The pivotal letter on intuitionism, containing von Neumann's challenge to Godel and his sketch of a simplified proof of the second incompleteness theorem.
4. [Letter 4 -- February 14, 1933](Letter4_Feb14_1933.md): Von Neumann writes from Budapest about the Institute for Advanced Study.

---

## Letter 1: November 20, 1930

**Berlin, Hohenzollernstrasse 23, (Tiergarten)**

Dear Mr. Godel,

I have recently concerned myself again with logic, using the methods you have employed so successfully in order to exhibit undecidable properties. In doing so I achieved a result that seems to me to be remarkable. Namely, I was able to show that the consistency of mathematics is unprovable[^73].

This is more precisely as follows:

In a formal system that contains arithmetic it is possible to express, following your considerations, that the formula $1 = 2$ cannot be the endformula of a proof starting with the axioms of this system -- in fact, this formulation is a formula of the formal system under consideration. Let it be called $W$.

In a contradictory system any formula is provable, thus also $W$. If the consistency [of the system] is established intuitionistically, then it is possible, through a "translation" of the contentual intuitionistic considerations into the formal [system], to prove $W$ also. (On account of your result one might possibly doubt such a "translatability". But I believe that in the present case it must obtain, and I would very much like to learn your view on this point.) Thus with unprovable $W$ the system is consistent, but the consistency is unprovable.

I showed now: $W$ is always unprovable in consistent systems, i.e., a putative effective proof of $W$ could certainly be transformed into a contradiction.

I would be *very* much interested to hear your views on this, in particular on the "translatability issue". If you are interested, I will send you the proof details, as soon as they are written up ready to be printed and communicated, which will soon be the case -- or as soon as we can welcome you in Berlin.

When is your paper going to appear, and when are proof sheets going to be available? This is also of technical interest to me, as I would like to follow you as closely as possible both substantively and notationally, and on the other hand I would like to publish as soon as possible.

And again: aren't we going to see you soon in Berlin? E. Schmidt, to whom I communicated your result as you had presented it in Konigsberg, was delighted by it. He considers it, as I do, to be the greatest logical discovery in a long time.

Hoping for an answer by return mail and to see you again very soon, I remain yours sincerely,

J. v. Neumann

---

## Letter 2: November 29, 1930

**Berlin**

Dear Mr. Godel,

Many thanks for your letter and your reprint[^74]. As you have established the theorem on the unprovability of consistency as a natural continuation and deepening of your earlier results, I clearly won't publish on this subject.

On the basis of your communications I think I can reproduce your line of thought, and therefore I can tell you that I employed a somewhat different method. You proved $W \to A$, I showed independently the unprovability of $W$, in fact with a different argument, that also mimics antinomies.

Has anything new happened since then? Are you able, for example, to decide or to conjecture whether mathematics is incomplete or $\omega$-inconsistent?

I believe that every intuitionistic consideration can be formally copied, because the "arbitrarily nested" recursions of Bernays-Hilbert are equivalent to ordinary transfinite recursions up to appropriate ordinals of the second number class. This is a process that can be formally captured, unless there is an intuitionistically definable ordinal of the second number class that could not be defined formally -- which is in my view unthinkable. Intuitionism clearly has no finite axiom system, but that does not prevent its being a part of classical mathematics that does have one.

Thus, I think that your result has solved negatively the foundational question: there is no rigorous justification for classical mathematics. What sense to attribute to our hope, according to which it is de facto consistent, I do not know -- but in my view that does not change the completed fact.

I am looking forward to your proof sheets with great interest. I am very sorry that there is so little prospect of being able to welcome you here.

Hoping to hear from you again soon,

J. v. Neumann

---

## Letter 3: January 12, 1931

**Berlin W. 10, Hohenzollerstrasse 23**

Dear Mr. Godel,

Many thanks for your two letters and the proof sheets. Your remark on $\omega$-consistency was very interesting to me. Incidentally, the other day I developed a method that always allows a finite decision for the effective provability question concerning propositions that are built up solely by means of the concepts "not", "or" (thus also "and", "follows", etc.), [and] "provable" (starting from the identical truth-consistency is for example such a proposition). Perhaps, if it interests you, or you have not yet thought of it, then I can write it up.

Concerning $\omega$-consistency I am actually reassured, because it is implied by the consistency of the next type.

I absolutely disagree with your view on the formalizability of intuitionism. Certainly, for every formal system there is, as you proved, another formal one that is (already in arithmetic and the lower functional calculus) stronger. But intuitionism is not affected by that at all.

To be more precise: let us denote by $A$ the arithmetical axiom system that contains number variables, but neither function nor set variables, and uses freely the quantifiers $((x), (Ex))$ for the number variables. If also first-order function variables are available (functions of just one variable, for example) together with their quantifiers $((f), (Ef))$, then this system may be called $M$. Finally, let for example my set theoretic axiom system be called $Z$.

Clearly I cannot prove that every intuitionistically correct *construction of arithmetic* is formalizable in $A$ or $M$ or even in $Z$ -- for intuitionism is undefined and undefinable. But is it not a fact, that not a single construction of the kind mentioned is known that cannot be formalized in $A$, and that no living logician is in the position of naming such [a construction]? Or am I wrong, and you know an effective intuitionistic arithmetic construction whose formalization in $A$ creates difficulties? If that, to my utmost surprise, should be the case, then the formalization should certainly work in $M$ or $Z$!

I would be very grateful if you would tell me whether you are really conjecturing the existence of such examples, or whether you even know some?

Your paper is very nice; I am quite delighted, how briefly and elegantly you carried out the difficult and lengthy "enumeration" of formulas. However, I believe that the proof of the unprovability of consistency can be shortened, i.e., that the general formal repetition of all considerations, as you propose, can be avoided.

It is possible to argue roughly as follows:

(1) Let $a$ be any recursive proposition. Then

$$a \to B(a)$$

can be shown (where $B$ stands for provable, in your sense). (Isn't that approximately your Theorem 5?)[^75]

(2) If $b = (Ex)a$, we can conclude

$$b \to B(b)$$

from

$$a \to B(a)$$

(3) As every $B(a)$ is of this form, we have

$$B(a) \to B(B(a)),$$

for arbitrary $a$.

(4) You constructed an $a$ with

$$\ast \qquad \bar{a} \sim B(a)$$

According to (3) we have

$$\ast\ast \qquad \bar{a} \to B(\bar{a})$$

Let $O$ be absurdity and $W$ consistency; then we have according to $\ast$ and $\ast\ast$ that

$$\bar{a} \sim B(a) \& B(\bar{a}) \sim B(a \& \bar{a}) \sim B(O) \sim \bar{W},$$

[and consequently] $\qquad W \sim a$.

Thus, $W$ is exactly as unprovable as $a$.

(I am sure you can fill in the gaps in my presentation.)

With best regards,

Yours sincerely,

Johann v. Neumann

I remain with best wishes, yours sincerely

Johann v. Neumann

---

## Letter 4: February 14, 1933

**Budapest, V, Arany Janos utca 16**

Dear Mr. Godel,

I just returned to Europe from Princeton, and I would be very glad if during my European stay there would be an opportunity to meet you. At the end of September I will go back to Princeton, where in the future I will spend two terms per year, as I received an offer from the new Bamberger-Flexner "Institute for Advanced Study", and I accepted.

Perhaps you would like to know more than you have gathered from the brief correspondence up to now about the conditions in Princeton and about the structure of this new Institute, of which you will fortunately be a member next year. Therefore, I write to you first of all, and also on Veblen's request, to tell you that I am happy to provide you with any information you may be interested in.

Perhaps we can also meet sometime and somewhere -- this summer I will probably still lecture in Berlin (for the last time), and I will repeatedly be in or travel through Vienna. What is your program?

With best regards, which I ask you to extend also to Menger and Hahn,

Yours sincerely,

Johann von Neumann

---

*All originals in Godel Archive, Manuscripts Division, Department of Rare Books and Special Collections, Princeton University Library; language of originals: German. English translations by W. Sieg. Published in K. Godel: Collected Works, Vol. V. Correspondence H-Z (Oxford University Press, New York, 2003).*

[^73]: See Section 2 of the Introductory Comments for von Neumann's and Godel's work and views on foundations of mathematics. The Editor.

[^74]: See Section 2 of the Introductory Comments for background notes on the exchange of letters between von Neumann and Godel. The Editor.

[^75]: Of K. Godel: *Collected Works*, Vol. I. Publications 1929-1936, S. Feferman, J. W. Dawson, Jr., S.C. Kleene, G. H. Moore, R. Solovay, J. van Heijenort (eds.) (Oxford University Press, New York, 1986) p. 170.
