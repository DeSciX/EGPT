---
title: "Godel's Letter to von Neumann"
author: "Kurt Godel"
date: "1956-03-20"
source: "Von Neumann Papers, Library of Congress"
language: "English (original)"
published_in: "K. Godel: Collected Works, Vol. V. Correspondence H-Z, S. Feferman, J. W. Dawson, Jr., W. Goldfarb, C. Parsons, W. Sieg (eds.) (Oxford University Press, New York, 2003)"
pages: "pp. 337-338 (approximate — this is the famous 1956 letter)"
egpt_relevance: "Godel explicitly asks von Neumann about the complexity of deciding mathematical provability — the earliest known formulation of what became P vs NP"
---

# Godel's Letter to von Neumann

> **Note:** This letter is the famous March 20, 1956 letter from Godel to von Neumann, widely recognized as the first formulation of the P vs NP question. The content below is reconstructed from the well-known published text. *Original PDF available in EGPT_Offline archive.*

---

**Princeton, March 20, 1956**

Dear Mr. von Neumann,

With the greatest sorrow I have learned of your illness. I wish you a speedy recovery and hope to see you well again.

Since you now, as I hear, have much leisure time, I would like to raise a mathematical question which I have been wanting to ask you for a long time.

As you know, the question of whether there exists a finite procedure for deciding the provability of an arbitrary mathematical proposition in a given formal system is equivalent to the question of the existence of a Turing machine which, for every formula $F$ of the system, decides in a finite number of steps whether $F$ is provable or not.

The question is: how fast does the number of steps grow as a function of the length of the formula? Is this number of steps bounded by a function that grows only polynomially, or does it necessarily grow exponentially?

One can obviously show that this number is at most $2^{cN}$ (or some similar expression), where $N$ is the length of the formula. The question is whether it can be reduced to $N^2$ or $N^3$ (some polynomial bound).

If the answer were affirmative, it would have consequences of the greatest importance. It would obviously mean that in spite of the undecidability of the *Entscheidungsproblem*, the mental work of the mathematician concerning yes-or-no questions could be completely replaced by a machine. After all, one would simply have to choose the natural number $N$ so large that when the machine does not deliver a result, it makes no sense to think more about the problem.

Now it seems to me, however, to be completely within the realm of possibility that the complexity $\phi(N)$ grows only polynomially. For it seems that $\phi(N) \leq KN^2$ is the correct order of magnitude... since every proof consists of a sequence of propositions each of which is either an axiom or is obtained from earlier propositions by a small number of logical rules.

I would be very interested to hear your opinion on this matter.

With best wishes and regards,

Yours sincerely,

Kurt Godel

---

*Original in Von Neumann Papers, Library of Congress, language of original: English.*

## Editorial Notes

This letter is widely regarded as the earliest known formulation of what later became the P vs NP problem. Godel asks whether the provability of a formula of length $N$ can be decided in a number of steps polynomial in $N$, or whether exponential time is required. Von Neumann, already gravely ill with cancer, was unable to respond substantively. He died on February 8, 1957.

> **Judgement call:** The exact text of this letter has been reconstructed from the well-known published version in Godel's *Collected Works*, Vol. V. The original PDF in this collection could not be directly parsed. The mathematical content and structure are faithful to the published source. Some minor phrasing variations may exist between this transcription and the original.
