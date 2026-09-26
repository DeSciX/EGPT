# 10_PAPERS — the papers

Nine papers. Four are published preprints on ResearchGate and are cited here to their
published record; four have not been published anywhere before and appear here for the first
time. Every one is held as its PDF and its LaTeX source, so a reader can check the rendered
document against what produced it.

## Published: cite these to ResearchGate

The link is the published version. **The source in this folder may be a later edit**, and for
two of them it demonstrably is: the PDF held here was compiled months after the version
ResearchGate carries, and the titles differ. Where the two disagree, the ResearchGate record is
what was published on that date, and the source here is where the paper went afterwards.

| Paper | Published | DOI | This folder |
|---|---|---|---|
| P Probably Equals NP: P=NP Formal Proof, From Rota's Entropy Theorem to NP-Complete SAT to Shannon's Coding Theorem | January 2025 | [10.13140/RG.2.2.27582.60484](https://doi.org/10.13140/RG.2.2.27582.60484) | `PPNP_Paper/`, PDF compiled 26 April 2025 |
| The Entropy Game: Why P=NP & Physics Is NP-Complete | January 2025 | [10.13140/RG.2.2.17806.27203](https://doi.org/10.13140/RG.2.2.17806.27203) | `Entropy Game/`, PDF compiled 14 May 2025 |
| Without Attraction, You've Got Nothing: Quantum Gravity Derivation Under Chaos & Probability Theories | December 2024 | [10.13140/RG.2.2.36150.61761](https://doi.org/10.13140/RG.2.2.36150.61761) | `Without_Attraction_There_Is_Nothing/` |
| Quantum Computing vs Fractal Compression In a Chaotic Discontinuum | September 2024 | none assigned | the `.docx` in this folder |

The three DOIs were checked against the DataCite registry on 16 September 2026 and all three
resolve, with titles and years matching the table. The fourth record carries no DOI;
ResearchGate does not mint one for every preprint. Its landing page is
`researchgate.net/publication/384080022`, and it is licensed CC BY-NC-SA 4.0.

ResearchGate's own `/links/<hash>/` full-text URLs are not archival identifiers and are omitted
for that reason. The DOI is the durable citation.

## Not published before

| Paper | Authors | This folder |
|---|---|---|
| Experimental Confirmation of P=NP via Polynomial Half-Adder Computation in the EGPT FRAQTL Discrete Physics Engine | Essam Abadir | `egpt_circuit_sat/paper/`, dated March 2026 |
| Emergent Inverse-Square Laws from Cellular Automata | Nile Abadir and Essam Abadir | `GravityPaper/` |
| The Address is the Map v3.0: The Structural Security Paradox, Why P=NP Doesn't Break RSA | based on the EGPT framework | `AddressMap_And_Crypto/` |

| The Address is the Map: Constructive Number Theory, Rota's Entropy, and the Resolution of Computational Complexity | Essam Abadir | `Address_Is_The_Map/`, PDF compiled 2 December 2025; added to the collection 26 September 2026. Dedicated to Rota. Its thesis, in its own words: "Address = Map." |

Rota's Entropy Theorem, transcribed from the class text, is the fourth of this set. It is not
duplicated here because it is already in the collection with the rest of the Rota material, at
`04_ROTA/entropy_theorem/Rota_Entropy_Theorem_Original_Proof.pdf`, with its source beside it.

## Dates, and why most of these papers do not carry one

Six of the nine sources set the date with the LaTeX command that means *today*. The date on
the title page is therefore whenever the PDF was last compiled, not when the paper was written.
There is no date in the source to recover. The table above gives the compile date of the PDF
held here, taken from the PDF itself, and that is the closest thing to a date each paper has.

Two PDFs in this folder were compiled on 16 September 2026, because no compiled version
existed:

- **`Without_Attraction_There_Is_Nothing.pdf`** — built with pdflatex from the source and images
  in the same directory. The source sets no date, so the title page shows none.
- **`Structural_Security_Of_Crypto_When_PeqNP.pdf`** — built with xelatex. Its source used to
  date itself to the compile day; it now states 4 March 2026, the date the source first entered
  the author's repository, so the paper carries a fixed date instead of a moving one. The source
  also asks for the Noto Sans typeface, which was not installed on the machine that compiled it,
  so the default roman font was used. The text is the source's own and unaltered. Recompiling
  with Noto Sans present will change how it looks and nothing it says.

Everything else here is byte-identical to the author's working copy, and `CHECKSUMS.txt` at the
root of the collection carries the hash of every file.

## Building any of them

Each paper's directory holds what it needs. From inside one:

```
latexmk -pdf <paper>.tex      # or -xelatex for AddressMap_And_Crypto
```

## Two corrections made to the sources

Both were made in the author's working copy, not only in this published copy, so the two agree
and the fix reaches anyone who builds from either.

- The Circuit SAT whitepaper carried the author's contact email on its title page. It is removed
  from the source and the PDF here is rebuilt without it.
- The structural-security paper dated itself to whatever day it was compiled. It is now dated
  4 March 2026, the day its source first entered the author's repository.
