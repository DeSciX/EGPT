---
title: "Von Neumann to Godel, January 12, 1931"
author: "John von Neumann"
date: "1931-01-12"
location: "Berlin W. 10, Hohenzollerstrasse 23"
recipient: "Kurt Godel"
source: "Godel Archive, Manuscripts Division, Department of Rare Books and Special Collections, Princeton University Library"
language: "Original: German. English translation by W. Sieg."
german_checked: "Paragraph 1 and the intuitionism challenge were read from page images of the printed Collected Works Vol. V (archive.org scan) on 28 August 2026. Key words: Übrigens; stets eine endliche Entscheidung; der effektiven Beweisbarkeitsfrage; „Beweisbar“; kein lebender Logiker."
editorial_note: "Sieg, introductory note p. 332, on the first paragraph: the observation seemingly anticipates and announces a solution to a problem Harvey Friedman posed in 1975 as the 35th of his 102 problems; Boolos 1976 gave the first published solution."
published_in: "K. Godel: Collected Works, Vol. V. Correspondence H-Z, S. Feferman, J. W. Dawson, Jr., W. Goldfarb, C. Parsons, W. Sieg (eds.) (Oxford University Press, New York, 2003) pp. 340-341."
pages: "pp. 125-126 in the Selected Letters volume"
related_image: "JvM Letter to Godel Intuitionist.png"
---

# Von Neumann to Godel — January 12, 1931

> **Note:** A scan of this letter is also preserved as an image file: [`JvM Letter to Godel Intuitionist.png`](JvM%20Letter%20to%20Godel%20Intuitionist.png). The image shows the first page of the English translation and is legible.

---

Berlin W. 10
Hohenzollerstrasse 23

January 12, 1931

Dear Mr. Godel,

Many thanks for your two letters and the proof sheets. Your remark on $\omega$-consistency was very interesting to me. Incidentally, the other day I developed a method that always allows a finite decision for the effective provability question concerning propositions that are built up solely by means of the concepts "not", "or" (thus also "and", "follows", etc.), [and] "provable" (starting from the identical truth-consistency is for example such a proposition). **(Natürlich unter Voraussetzung der ω-Widerspruch[s]freiheit.)** [This sentence stands in the German original and is absent from the English text previously held in this file; it is left here in German rather than rendered, because the published English of it has not been read. Literal sense: "Of course under the assumption of ω-consistency."] Perhaps, if it interests you, or you have not yet thought of it, then I can write it up.

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

---

*Original in Godel Archive, Manuscripts Division, Department of Rare Books and Special Collections, Princeton University Library; language of original: German. Both the original German version and the English translation (by W. Sieg), identical with the text published here, was published in K. Godel: Collected Works, Vol. V. Correspondence H-Z, S. Feferman, J. W. Dawson, Jr., W. Goldfarb, C. Parsons, W. Sieg (eds.) (Oxford University Press, New York, 2003) pp. 342-345.*

[^75]: Of K. Godel: *Collected Works*, Vol. I. Publications 1929-1936, S. Feferman, J. W. Dawson, Jr., S.C. Kleene, G. H. Moore, R. Solovay, J. van Heijenort (eds.) (Oxford University Press, New York, 1986) p. 170. Footnote of the editors of Godel's Collected Works, Vol. V. Correspondence H-Z; S. Feferman, J. W. Dawson, Jr., W. Goldfarb, C. Parsons, W. Sieg (eds.) (Oxford University Press, New York, 2003).
