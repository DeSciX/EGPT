<!-- DRAFT assembled by the assistant, 27 September 2026, from the author's README of the same day; the prose is the author's, moved, not rewritten; his pass -->
# The math and physics of Einstein and von Neumann, not Bohr and Gödel

The long form, in their own words with every quotation cited, is
[`../00_OUTPUTS/EGPT_Backstory.md`](../00_OUTPUTS/EGPT_Backstory.md). This page is the short form.

## The four positions, in their words

**Einstein, 1954, to Besso** ([corpus](../05_CORPUS/CORPUS_README.md)):

> "I consider it quite possible that physics cannot be based on the field concept, i.e., on
> continuous structures. In that case, nothing remains of my entire castle in the air,
> gravitation theory included, [and of] the rest of modern physics."

**von Neumann, 1935, to Birkhoff** (*Selected Letters*, [`../02_VON_NEUMANN/`](../02_VON_NEUMANN/)):

> "I would like to make a confession which may seem immoral: I do not believe absolutely in
> Hilbert space any more."

**von Neumann, 12 January 1931, to Gödel** ([`../02_VON_NEUMANN/letters_to_godel/Letter3_Jan12_1931.md`](../02_VON_NEUMANN/letters_to_godel/Letter3_Jan12_1931.md)):

> "Incidentally, the other day I developed a method that always allows a finite decision for the
> effective provability question concerning propositions that are built up solely by means of the
> concepts "not", "or" (thus also "and", "follows", etc.), [and] "provable" (starting from the
> identical truth-consistency is for example such a proposition)."

**von Neumann, 1947, *The Mathematician*** ([`../02_VON_NEUMANN/The_Mathematician_JvM.md`](../02_VON_NEUMANN/The_Mathematician_JvM.md)):

> "A system of mathematics which was free of these undesirable traits, "intuitionism," was
> developed by Brouwer. In this system the difficulties and contradiction of set theory did not
> arise. However, a good fifty per cent of modern mathematics, in its most vital - and up to then
> unquestioned - parts, especially in analysis, were also affected by this "purge""

**Ulam, on rebuilding physics from a random walk**, in Rota's words (*Indiscrete Thoughts*,
[`../04_ROTA/`](../04_ROTA/)):

> "In his fascination with physics, he was led to formulate mathematical thoughts that had a
> background of physics, but that bore the unmistakable ring of mathematics (he once started to
> draft a long paper which was to be titled 'Physics for Mathematicians'). One of the most
> striking is his proposal for the reconstruction of the CGS system on the basis of random walk."

**Rota's Entropy Theorem**, taught at MIT and never printed:
[`../04_ROTA/entropy_theorem/`](../04_ROTA/entropy_theorem/), with the class text in
[`../04_ROTA/manuscript_1992/`](../04_ROTA/manuscript_1992/) and the 1979 typescript beside it.

## Where it is proved

The formalization is in [`../08_LEAN/`](../08_LEAN/README.md). The three P=NP capstones:
[`P_eq_NP`](../08_LEAN/EGPT/InformationTheory/Complexity/SetRFL.lean#L501),
[`P_eq_NP_info`](../08_LEAN/EGPT/InformationTheory/Complexity/PPNP.lean#L815),
[`P_eq_NP_info_standard`](../08_LEAN/EGPT/InformationTheory/Complexity/StandardComplexity.lean#L185).
The standard is the kernel: clone the branch, `lake build`, `#print axioms`.

## Where it is taught without symbols

[`../13_MAXI/bedtime_stories/`](../13_MAXI/bedtime_stories/README.md), and the papers in
[`../10_PAPERS/`](../10_PAPERS/README.md), beginning with *The Address is the Map*.
