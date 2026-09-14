---
title: "Gödel's Letter to von Neumann"
author: "Kurt Gödel"
recipient: "John von Neumann"
date: "1956-03-20"
place: "Princeton"
language: "German"
source: "Autograph in the John von Neumann Papers, Library of Congress"
translation: "English translation by Peter Clote and Jan Krajíček"
translation_published: "Peter Clote & Jan Krajíček (eds.), Arithmetic, Proof Theory and Computational Complexity (Oxford University Press, 1993); revised text dated 11 September 2006"
translation_url: "https://www.karlin.mff.cuni.cz/~krajicek/goedel-letter.pdf"
copyright: "The Institute for Advanced Study, as copyright holder, authorised the translators to quote the letter in full"
verification: "PRIMARY-TEXT-READ — read from the translators' own posting, which prints the German original facing the translation"
note: "Widely credited as the first statement of what became the P vs NP question."
---

# Gödel to von Neumann — Princeton, 20 March 1956

## English translation

*Translated by Peter Clote and Jan Krajíček.*

Princeton, 20 March 1956

Dear Mr. von Neumann:

With the greatest sorrow I have learned of your illness. The news came to me as quite unexpected. Morgenstern already last summer told me of a bout of weakness you once had, but at that time he thought that this was not of any greater significance. As I hear, in the last months you have undergone a radical treatment and I am happy that this treatment was successful as desired, and that you are now doing better. I hope and wish for you that your condition will soon improve even more and that the newest medical discoveries, if possible, will lead to a complete recovery.

Since you now, as I hear, are feeling stronger, I would like to allow myself to write you about a mathematical problem, of which your opinion would very much interest me: One can obviously easily construct a Turing machine, which for every formula F in first order predicate logic and every natural number n, allows one to decide if there is a proof of F of length n (length = number of symbols). Let ψ(F, n) be the number of steps the machine requires for this and let φ(n) = maxF ψ(F, n). The question is how fast φ(n) grows for an optimal machine. One can show that φ(n) ≥ k · n. If there really were a machine with φ(n) ∼ k · n (or even ∼ k · n²), this would have consequences of the greatest importance [Tragweite]. Namely, it would obviously mean that in spite of the undecidability of the Entscheidungsproblem,[2] the mental work of a mathematician concerning Yes-or-No questions could be completely[3] replaced by a machine. After all, one would simply have to choose the natural number n so large that when the machine does not deliver a result, it makes no sense to think more about the problem. Now it seems to me, however, to be completely within the realm of possibility that φ(n) grows that slowly. Since (1) it seems that φ(n) ≥ k · n is the only estimation which one can obtain by a generalization of the proof of the undecidability of the Entscheidungsproblem;[4] and (2) after all φ(n) ∼ k · n (or ∼ k · n²) only means that the number of steps as opposed to trial and error can be reduced from N to log N (or (log N)²). However, such strong reductions appear in other finite problems, for example in the computation of the quadratic residue symbol using repeated application of the law of reciprocity. It would be interesting to know, for instance, the situation concerning the determination of primality of a number and how strongly in general the number of steps in finite combinatorial problems can be reduced with respect to simple exhaustive search.

I do not know if you have heard that "Post's problem", whether there are [intermediate] degrees of unsolvability among problems of the form (∃y)φ(y, x), where φ is recursive, has been solved in the positive sense by a very young man by the name of Richard Friedberg. The solution is very elegant. Unfortunately, Friedberg does not intend to study mathematics, but rather medicine (apparently under the influence of his father).

By the way, what do you think of the attempts to build the foundations of analysis on ramified type theory, which have recently gained momentum? You are probably aware that Paul Lorenzen has pushed ahead with this approach to the theory of Lebesgue measure. However, I believe that in important parts of analysis non-eliminable impredicative proof methods do appear.

I would be very happy to hear something from you personally. Please let me know if there is something that I can do for you.

With my best greetings and wishes, as well to your wife,

Sincerely yours,

Kurt Gödel

P.S. I heartily congratulate you on the award that the American government has given to you.

### Footnotes as printed in the translation

[2] decision problem for predicate calculus
[3] except for the setting up of axioms
[4] On 21 March 1992, S.R. Buss presented a proof that φ(n) ≥ k·n in the annual meeting of the Association for Symbolic Logic held at Duke University.

## German original

```
Princeton, 20./III. 1956

Lieber Herr v. Neumann!

Ich habe mit größten Bedauern von Ihrer Erkrankung gehört. Die Nachricht kam mir ganz unerwartet. Morgenstern hatte mir zwar schon im Sommer von einem Schwächeanfall erzählt, den Sie einmal hatten, aber er meinte damals, dass dem keine grössere Bedeutung beizumessen sei. Wie ich höre, haben Sie sich in den letzten Monaten einer radikalen Behandlung unterzogen u. ich freue mich, dass diese den gewünschten Erfolg hatte u. es Ihnen jetzt besser geht. Ich hoffe u. wünsche Ihnen, dass Ihr Zustand sich bald noch weiter bessert u. dass die neuesten Errungenschaften der Medizin, wenn möglich, zu einer vollständigen Heilung führen mögen.

Da Sie sich, wie ich höre, jetzt kräftiger fühlen, möchte ich mir erlauben, Ihnen über ein mathematisches Problem zu schreiben, über das mich Ihre Ansicht sehr interessieren würde: Man kann offenbar leicht eine Turingmaschine konstruieren, welche von jeder Formel F des engeren Funktionenkalküls u. jeder natürl. Zahl n zu entscheiden gestattet, ob F einen Beweis der Länge n hat [Länge = Anzahl der Symbole]. Sei Ψ(F, n) die Anzahl der Schritte, die die Maschine dazu benötigt u. sei φ(n) = maxF Ψ(F, n). Die Frage ist, wie rasch φ(n) für eine optimale Maschine wächst. Man kann zeigen φ(n) ≥ k · n. Wenn es wirklich eine Maschine mit φ(n) ∼ k · n (oder auch nur ∼ k · n²) gäbe, hätte das Folgerungen von der grössten Tragweite. Es würde nämlich offenbar bedeuten, dass man trotz der Unlösbarkeit des Entscheidungsproblems die Denkarbeit des Mathematikers bei ja-oder-nein Fragen vollständig¹ durch Maschinen ersetzen könnte. Man müsste ja bloss das n so gross wählen, dass, wenn die Maschine kein Resultat liefert, es auch keinen Sinn hat über das Problem nachzudenken. Nun scheint es mir aber durchaus im Bereich der Möglichkeit zu liegen, dass φ(n) so langsam wächst. Denn 1.) scheint φ(n) ≥ k · n die einzige Abschätzung zu sein, die man durch eine Verallgemeinerung des Beweises für die Unlösbarkeit des Entscheidungsproblems erhalten kann; 2.) bedeutet ja φ(n) ∼ k · n (oder ∼ k · n²) bloss, dass die Anzahl der Schritte gegenüber dem blossen Probieren von N auf log N ( oder (log N)²) verringert werden kann. So starke Verringerungen kommen aber bei anderen finiten Problemen durchaus vor, z.B. bei der Berechnung eines quadratischen Restsymbols durch wiederholte Anwendung des Reziprozitätsgesetztes. Es wäre interessant zu wissen, wie es damit z.B. bei der Feststellung, ob eine Zahl Primzahl ist, steht u. wie stark im allgemeinen bei finiten kombinatorischen Problemen die Anzahl der Schritte gegenüber dem blossen Probieren verringert werden kann.

Ich weiss nicht, ob Sie gehört haben, dass "Post's problem" (ob es unter den Problemen (∃y)φ(y, x) mit rekursivem φ Grade der Unlösbarkeit gibt) von einem ganz jungen Mann namens Richard Friedberg in positivem Sinn gelöst wurde. Die Lösung ist sehr elegant. Leider will Friedberg nicht Mathematik, sondern Medizin studieren (scheinbar unter dem Einfluss seines Vaters).

Was halten Sie übrigens von den Bestrebungen, die Analysis auf die verzweigte Typentheorie zu begründen, die neuerdings wieder in Schwung gekommen sind? Es ist Ihnen wahrscheinlich bekannt, das Paul Lorenzen dabei bis zur Theorie des Lebesgueschen Masses vorgedrungen ist. Aber ich glaube, dass in wichtigen Teilen der Analysis nicht eliminierbare imprädikative Schlussweisen vorkommen.

Ich würde mich sehr freuen, von Ihnen persönlich etwas zu hören; u. bitte lassen Sie es mich wissen, wenn ich irgend etwas für Sie tun kann.

Mit besten Grüssen u. Wünschen, auch an Ihre Frau Gemahlin.

Ihr sehr ergebener

Kurt Gödel

Ich gratuliere Ihnen bestens zu der Auszeichnung, die Ihnen von der amerik. Regierung verliehen wurde.

[Footnote in the source, keyed to the superscript ¹ after "vollständig": "1 abgesehen von der Aufstellung der Axiome"]

[Source note: "The following is an approximate translation."]
```

## Acknowledgements as printed by the translators

Acknowledgements. We would like to thank the Institute for Advanced Study, as copyright holder, for kindly authorizing us to quote Gödel's letter in full. As well, we thank the Library of Congress for furnishing us with a copy of Gödel's letter. According to Professor John Dawson,[5] the existence of the letter among John von Neumann's papers at the Library of Congress was brought to the attention of the Gödel Editorial Committee by Gerhard Heise in a letter dated 27 May 1988.

We would like to thank the following persons for comments on the preface and on the transcription and translation of Gödel's letter: S.R. Buss, S.A. Cook, E. Dahlhaus, A. Goerdt, A. Hoene, M. Kusch, A. Urquhart. Despite the incorporation (or non-inclusion) of various suggestions of the persons just mentioned, the editors must take full responsibility for any and all remaining errors in the translation. Thanks to J. Dawson for remarks about the finding of Gödel's letter. Thanks as well to J. Hartmanis for kindly furnishing a copy of his article [?].

Peter Clote, Boston
Jan Krajíček, Prague
September 11, 2006

[Footnote 5: Email correspondence 12 November 1991.]

[This acknowledgements page is what the source itself gives as its bibliographic statement; it does not, on this page, restate the original 1993 Clote & Krajíček (eds.), "Arithmetic, Proof Theory and Computational Complexity" (Oxford University Press) publication data — that publication is named on this PDF's earlier preface/title pages, not reproduced here since the retrieval targeted the letter and its acknowledgements. The letter's autograph is stated to be held among John von Neumann's papers at the Library of Congress (Manuscript Division), from which the editors obtained a copy.]

---

*A second independent English translation — by Arthur S. Wensinger with Sorin Istrail's guidance —
is printed in Michael Sipser, "The History and Status of the P versus NP Question," STOC 1992,
pp. 610–612. A third, with facing German, is in Kurt Gödel, Collected Works Vol. V: Correspondence
H–Z (Feferman, Dawson, Goldfarb, Parsons, Sieg eds., Oxford, 2003).*
