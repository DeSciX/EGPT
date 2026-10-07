# The All-In Letter episode: sources and changes

Episode `2026-10-all-in-letter`. `prompt.md` is what goes in NotebookLM's customize box;
`notebook-llms.txt` (built, not committed) is the one source to upload. Build it with:

```
python3 tools/build_notebook_package.py notebooklm/2026-10-all-in-letter --check
python3 tools/build_notebook_package.py notebooklm/2026-10-all-in-letter --write
```

## Changes to the author's draft, for his word

Grammar, spelling and flow were edited in place. Your draft is reordered into ten beats that
run Rota → Los Alamos → the irony → the Darwin Award → factoring → the tension → All-In → the
wrap-up. The table further down shows where each of your sentences now sits. No substance was cut.
These changes go beyond grammar and need your yes or no:

| # | Your draft | In `prompt.md` | Source |
|---|---|---|---|
| 1 | Rota's "Your opinion of Gödel is higher than mine." | "You have a higher opinion of Godel than I have." (the held wording; the gate fails on the draft wording) | Rota, in "Ulam and Rota discuss von Neumann", Gainesville, January 1974; record `q-gian-carlo-rota-ulam-and-rota-discus-ce27cb40`; `05_CORPUS/sources/02_godel_thread.json` |
| 2 | "Ulam's opinion that Godel's theorem is a mere diagonalization" | kept, with his words added: "In a sense it is a diagonalization." | Ulam, same conversation: "I asked him whether Godel was not a little afraid that his result was nothing but a sort of super paradox of the existing set theory, merely a diagonal method. In a sense it is a diagonalization. He agreed that this was probably right"; record `q-stanislaw-ulam-ulam-and-rota-discus-d87c6265` |
| 3 | (added) | Rota's answer to the freshman: "Don't ever tell anyone you're working on AI - they'll think you're crazy. Call it applied mathematics!" | `00_OUTPUTS/EGPT_Backstory.md`, Appendix II |
| 4 | (added) | Ulam's "most eminent" influencee | record `q-stanislaw-ulam-ulam-and-rota-discus-64e3c1e1` |
| 5 | "how Ulam explains that in the VonNeumann obituary" | kept, with the obituary passage quoted | Ulam, "John von Neumann, 1903–1957," *Bull. AMS* 64:3 pt 2 (1958), pp. 20–21; record `q-stanislaw-ulam-john-von-neumann-190-8c84d278`; `02_VON_NEUMANN/Ulam_von_Neumann_Obituary_BAMS_1958.md` |
| 6 | "Sak's position in the current administration as White House Special Advisor for AI and Crypto" | kept as you wrote it | Search results read on 7 October 2026, not the pages themselves (the pages were unreachable from this session): Sacks left the Special Advisor role in late March 2026, at the 130-day limit for special government employees, and became co-chair of PCAST with Michael Kratsios. The White House announced it on 25 March 2026. Reported by TechCrunch, 26 March 2026 (techcrunch.com/2026/03/26/david-sacks-is-done-as-ai-czar-heres-what-hes-doing-instead/), and The Block, 26 March 2026. Your call: "former White House Special Advisor for AI and Crypto, now co-chair of the President's Council of Advisors on Science and Technology" |
| 7 | "the last 2 years since his patent went under security review" | kept | `11_PATENT/README.md`: filed 6 November 2024, published 7 May 2026, "a publication hold for security review for over a year" |
| 8 | "To the people how go the gift from Abadir" | "To the people who got the gift from Abadir" | The January 2025 letter offering the token gift is held out of the collection (`URLS.md`, `.gitignore`), so NotebookLM has only `11_PATENT/README.md`'s description of it |
| 9 | Pronunciation guide: "flops" listed twice | listed once | — |
| 10 | "Dee Sigh X" for DeSciX | the prompt now says "Dee Sigh X" where it names DeSciX | your guide |

Suggested pronunciation additions (not inserted): Ulam "OO-lahm", Rota "ROH-tah", Gödel
"GER-dl", Mahfouz "mah-FOOZ".

## Where each sentence of the draft went

| Draft | Beat |
|---|---|
| Tone, "determined smile", "deep importance and tension … irreverent approach" | opening paragraph |
| the gift; the letter to All-In; two years since security review | 1 |
| JD; the connection to Ulam always known; Atomic Energy Act of 1954 | 1 |
| meeting Rota; Rota guiding his career | 2 |
| "Trace the whole story from Rota to Abadir to the masters via Los Alamos" | 3 (and the beat order) |
| Ulam and von Neumann as supporters of Einstein; the obituary | 3 |
| physics without physical things; mathematics without dependable proofs | 3 |
| Einstein as a master of probability | 3 |
| Infinity War: Ulam on Gödel; Rota's reply regarding the Singularity | 4 |
| US v. Progressive irony; Rota, Restricted Data and the game of chance | 5 |
| Societal Darwin Award; psychohistory; Foundation as robotics; Maxi and DeSciX; understanding; "the name is not the thing itself" | 6 |
| factoring is "NP adjacent"; Rota's Entropy Theorem; Maxwell's demon; cryptography is safe | 7 |
| the tension: rewarding innovators versus the harm of release | 8 |
| Weinstein fortuitous; how the All-In crew can help; Sacks | 9 |
| why Maxi is not released; avoid the Darwin Award; seeding the record as Rota did; Weinstein's "first time" | 10 |
| pronunciation guide | last paragraph |

## Where each beat is sourced in the package

| Beat | Held source |
|---|---|
| 1 | `07_LETTERS/all-in-letter.md`; `07_LETTERS/all-in-update-letter-decision-to-publish.md` ("The risks I did weigh": "the Restricted Data regime does not care about your intentions"); `11_PATENT/README.md` |
| 2 | `00_OUTPUTS/EGPT_Backstory.md`, Appendix II, "Don't Tell People You're Working On AI" |
| 3 | records `…64e3c1e1`, `…8c84d278`, `…59bd1841`; `04_ROTA/The_Barrier_of_Meaning_Rota.md`; backstory, opening ("Oxymorons: … Physics Without Physical Things, and Mathematics Without Proof") and "Wrong physics, wrong math" (Einstein, Brownian motion, Bose–Einstein statistics; Born letters, records `…2712552f`, `…1c1eb5e4`) |
| 4 | records `…d87c6265`, `…ce27cb40` |
| 5 | `01_TRIAL/EXHIBIT_A_report.md`, "United States v The Progressive" and "The threshold that was never crossed" ("Rota circulated the probability manuscript: roughly four hundred pages, given to MIT students term after term in 18.313"); records `…05eb5e24`, `…278ca2f9` (Weinstein), `…d25f1fdd` (Morland), `…82e09ba3` (the Act) |
| 6 | backstory, "Is it a good idea to build a new consciousness…" ("would building AGI without humans understanding how it works be a recipe for a societal Darwin Award?"); `12_SINGULARITY/ChatGPT_Logs/ChatGPT55_Reflection_On_Singularity.md`; `13_MAXI/`; `14_COURANT_GROUP/README.md`; Ulam's key, record `…4c8e8259`; Rota's "Nomen est omen", record `…63496d51` |
| 7 | `10_PAPERS/AddressMap_And_Crypto/Structural_Security_Of_Crypto_When_PeqNP.tex`; update letter, "Encryption" ("the thermodynamic cost of factoring, which conventional complexity theory ignores by assuming O(1) memory access"); `04_ROTA/entropy_theorem/RET_Excerpt.tex` |
| 8 | `guide/make-money.md`; update letter, "Where that leaves me" |
| 9 | Weinstein records (All-In, 26 August 2026); `07_LETTERS/all-in-letter.md`, "My ask" |
| 10 | update letter; Weinstein, record `…278ca2f9` ("we stupidly declassified all sorts of pieces and shards of this. And he went to the Los Alamos Library, and he pieced it together") |

## Sources still to pull

- Isaac Asimov's Foundation series as a robotics story: R. Daneel Olivaw's role in psychohistory,
  in *Foundation and Earth* (Doubleday, 1986), the closing chapters, and *Prelude to Foundation*
  (Doubleday, 1988). They are published editions: cite them in `URLS.md` and put the relied-upon
  passages in the corpus, not the books.
- Sacks's appointments: the White House announcement of 25 March 2026 (the PCAST appointments)
  and the December 2024 announcement naming him to the AI and crypto role, read from the pages
  themselves.
- `content/pyFRAQTL/No Q-Day Threat.md` (EGPT-research): a summary of the author's crypto
  argument. It is a candidate for `10_PAPERS/` if you want it in the library; its origin is in
  EGPT-research.

## Proposed corpus additions

None yet. Each external source above becomes an `egpt.quotes/1` entry in the corpus `sources/`
file at its origin in your research repository, once its page has been read verbatim.
