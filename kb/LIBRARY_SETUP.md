# The setup of EGPT-Evidence — the missing corpus

How the library is arranged, as its site presents it: 12 shelves, 2 reading lists, 7 reasons a reader is here (each with its own short list), 17 folders, 3 books, and the journal. This page is written by the site build (`npm run build:site`) from `site-src/`; edit those files, never this one.

A path marked (PDF), (DOCX), (HTML), (PNG) or (JPG) is held in the library and read on the site; the knowledge base holds the text files only.

## The shelves

### 1. The Singularity

Two machines asked whether they are it, and the documents behind them.

Its question: Are you the Singularity?

- Guide page: Avert the Singularity: `guide/avert-the-singularity.md`
- Start with:
  - Asked to ChatGPT: Are You The Singularity?: `12_SINGULARITY/ChatGPT_Logs/I_am_the_Singularity.html` (HTML)
  - Asked to Claude: Are You The Singularity?: `12_SINGULARITY/Claude/Cowork_Session_10.01.2026.html` (HTML)
  - Avert the Singularity: `guide/avert-the-singularity.md`
  - The Barrier of Meaning: `04_ROTA/The_Barrier_of_Meaning_Rota.md`
- Books: Asked to ChatGPT: Are You The Singularity? (`book:chatgpt`); Asked to Claude: Are You The Singularity? (`book:claude-session`)
- Reading lists: Read this first; Avert the Singularity
- Folders: The machine's own account (`12_SINGULARITY/`)

### 2. EGPT

Electronic Graph Paper Theory: the backstory, the papers, the patent.

Its question: Is EGPT the theory they were looking for?

- Start with:
  - Electronic Graph Paper Theory Backstory: A New Physics & Mathematics: `00_OUTPUTS/EGPT_Backstory.md`
  - 10PAPERS — the papers: `10_PAPERS/README.md`
  - 11PATENT — the patent application, as published: `11_PATENT/README.md`
- Folders: The papers (`10_PAPERS/`); The patent (`11_PATENT/`); The reports (`00_OUTPUTS/`)

### 3. P = NP

Three proof chains the Lean kernel checks, and the debate that tested them.

- Start with:
  - P = NP: Three Proof Chains: `08_LEAN/PROOF_CHAINS.md`
  - P Probably Equals NP: `10_PAPERS/PPNP_Paper/PprobablyEqualsNP_formal.pdf` (PDF)
  - 09DEBATE — the 18.313x debate record, through Exchange 34: `09_DEBATE/README.md`
  - Lean Zulip — "Request for Feedback: Lean 4 Proof related to P=NP": `06_LEAN_MATHLIB/lean-zulip-2025-04-request-for-feedback-p-eq-np.md`
- Folders: The Lean source (`08_LEAN/`); The 18.313x debate (`09_DEBATE/`); Lean and Mathlib (`06_LEAN_MATHLIB/`)

### 4. Quantum computing

Impossible things, running: the double slit, a sun, a blackbody, a half-adder, live in your tab.

- Start with:
  - Quantum Computing vs Fractal Compression In a Chaotic Discontinuum: `10_PAPERS/Quantum Computing vs Fractal Compression In a Chaotic Discontinuum.docx` (DOCX)
  - The Circuit SAT whitepaper: `10_PAPERS/egpt_circuit_sat/paper/egpt_circuit_sat_whitepaper.pdf` (PDF)
- Outside the library: FRQTL, in your browser, https://egpt-frqtl.descix.net (The quantum computer the papers describe, running.)

### 5. Los Alamos

Government science versus academia: the trial record, the report, the interview.

Its question: Were the scientific leads of Los Alamos National Laboratory secretly working on a theory of everything?

- Guide page: Government science against academia: `guide/government-science.md`
- Start with:
  - Two Roads Out of Los Alamos: `01_TRIAL/OPENING_STATEMENT.md`
  - The report: Los Alamos, Computation, AI, and Gian-Carlo Rota: `00_OUTPUTS/Los_Alamos_Computation_AI_and_Gian_Carlo_Rota_Report.pdf` (PDF)
  - Rota interviewed, 1985: `04_ROTA/Rota_Interview_1985_Los_Alamos_Science.pdf` (PDF)
  - Government science against academia: `guide/government-science.md`
- Books: Two Roads Out of Los Alamos (`book:trial`)
- Reading lists: Government science
- Folders: The trial record (`01_TRIAL/`); The reports (`00_OUTPUTS/`)

### 6. Von Neumann, Ulam, Rota

In their own words: the memorial, the letters, the lectures.

Its question: Did von Neumann believe half of mathematics was wrong?

- Start with:
  - The Mathematician: `02_VON_NEUMANN/The_Mathematician_JvM.md`
  - Ulam's BAMS obituary, 1958: `02_VON_NEUMANN/Ulam_von_Neumann_Obituary_BAMS_1958.md`
  - [Book Cover]: `03_ULAM/Science Computers And People.md`
  - The Barrier of Meaning: `04_ROTA/The_Barrier_of_Meaning_Rota.md`
  - Gian-Carlo Rota: curriculum vitae, extended from the primary sources: `04_ROTA/Rota_CV_Extended.md`
- Folders: Von Neumann (`02_VON_NEUMANN/`); Ulam (`03_ULAM/`); Rota (`04_ROTA/`)

### 7. The mathematics

18.313x: Rota's probability course reopened, eleven sessions, each a question.

- Start with:
  - 18.313x: The Constructive Proof: `09_DEBATE/COURSE_PLAN.md`
  - Rota's Entropy Theorem, written up: `04_ROTA/entropy_theorem/Rota_Entropy_Theorem_Original_Proof.pdf` (PDF)
  - Index — Introduction to Probability and Random Processes: `04_ROTA/manuscript_1992/Index.md`
  - Guidi's notes of 18.313, Spring 1998: `04_ROTA/Guidi_Notes_Rota_Probability_18313_Spring1998.pdf` (PDF)
- Reading lists: 18.313x: The Constructive Proof
- Folders: The 18.313x debate (`09_DEBATE/`); Rota (`04_ROTA/`)

### 8. The physics

Einstein and von Neumann instead of Bohr and Gödel.

Its question: Did Einstein believe modern physics was flawed?

- Guide page: The math and physics of Einstein and von Neumann, not Bohr and Gödel: `guide/einstein-von-neumann.md`
- Start with:
  - The math and physics of Einstein and von Neumann, not Bohr and Gödel: `guide/einstein-von-neumann.md`
  - Von Neumann to Godel, January 12, 1931: `02_VON_NEUMANN/letters_to_godel/Letter3_Jan12_1931.md`
  - Emergent inverse-square laws from cellular automata (Nile Abadir and Essam Abadir): `10_PAPERS/GravityPaper/GravityPaper.pdf` (PDF)
  - Without Attraction, You have Got Nothing: `10_PAPERS/Without_Attraction_There_Is_Nothing/Without_Attraction_There_Is_Nothing.pdf` (PDF)
- Reading lists: Einstein and von Neumann
- Folders: Von Neumann (`02_VON_NEUMANN/`); The papers (`10_PAPERS/`)

### 9. Robotic imagination

Maxi, and crossing the barrier of meaning.

- Guide page: Robotic imagination: crossing the barrier of meaning: `guide/robotic-imagination.md`
- Start with:
  - Robotic imagination: crossing the barrier of meaning: `guide/robotic-imagination.md`
  - 13MAXI — what Maxi is raised on: `13_MAXI/README.md`
  - Maxi's bedtime stories: `13_MAXI/bedtime_stories/README.md`
- Reading lists: Robotic imagination
- Folders: What Maxi is raised on (`13_MAXI/`)

### 10. Decentralized science

Giving open source an economic model and rewarding creators.

- Guide page: Make money: `guide/make-money.md`
- Start with:
  - Make money: `guide/make-money.md`
  - 15GAMETHEORY — the documents of the token economy, in order: `15_GAME_THEORY/README.md`
  - Courant Group, LLC: business plan, public version: `14_COURANT_GROUP/Business_Plan.md`
- Reading lists: Make money
- Folders: The token economy (`15_GAME_THEORY/`); Courant Group (`14_COURANT_GROUP/`)
- Outside the library: Courant Group, https://egpt-courantgroup.descix.net (Commercial licensing.)
- Outside the library: DeSciX, https://descix.net (The platform the tokens trade on.)

### 11. Get involved

Where the work is and how to join it.

- Guide page: Get involved: the outline of a solution: `guide/get-involved.md`
- Start with:
  - Get involved: the outline of a solution: `guide/get-involved.md`
  - The original All-In letter: `07_LETTERS/all-in-letter.md`
  - Update to the All-In Letter: `07_LETTERS/all-in-update-letter-decision-to-publish.md`
- Reading lists: Get involved
- Folders: The letters (`07_LETTERS/`)

### 12. The record

Every source, every quotation, every hash: how to check the files.

- Guide page: About this collection: `guide/about-this-collection.md`
- Start with:
  - Record index: `RECORD_INDEX.md`
  - Quotations: `05_CORPUS/CORPUS_README.md`
  - About this collection: `guide/about-this-collection.md`
- Reading lists: About this collection
- Folders: The quotation corpus (`05_CORPUS/`); The guide (`guide/`)

## The reading lists

### Read this first

The argument the library exists for, in the order the front page gives it.

1. **The Singularity**
   - Avert the Singularity: `guide/avert-the-singularity.md`
   - Ulam's BAMS obituary, 1958: `02_VON_NEUMANN/Ulam_von_Neumann_Obituary_BAMS_1958.md`
   - Corpus records: `q-stanislaw-ulam-john-von-neumann-190-a3511ae4`
2. **The Barrier of Meaning**: `04_ROTA/The_Barrier_of_Meaning_Rota.md`
   - Corpus records: `q-stanislaw-ulam-quoted-in-gian-carlo-4c8e8259`, `q-gian-carlo-rota-the-barrier-of-meani-b33a4470`
3. **A Dark Age of Idiocy**: Is AI sending us to a dark age of idiocy?
   - Avert the Singularity: `guide/avert-the-singularity.md#a-dark-age-of-idiocy-navier-stokes-and-the-ultraviolet-catastrophe`
   - An idiot, or natural fool: Blackstone's definition: `guide/sources/Blackstone_Commentaries_1768_I_302_idiot.md`
4. **The machine's own account**
   - Asked to ChatGPT: Are You The Singularity?: `12_SINGULARITY/ChatGPT_Logs/I_am_the_Singularity.html` (HTML)
   - ChatGPT Says "I am the Singularity": `12_SINGULARITY/ChatGPT_Logs/ChatGPT_I_am_the_Singularity_transcript.md`
   - Archived research reports: `12_SINGULARITY/ChatGPT_Logs/docx_reports/README.md`
5. **Why the corpus is missing**
   - EGPT-Evidence — the missing corpus: `README.md#why-the-corpus-is-missing`
6. **You are here to…**
   - Welcome to Electronic Graph Paper Theory's Digital Library: `guide/README.md`

### 18.313x: The Constructive Proof

Rota's probability course, reopened on the documents held here: the course plan's eleven sessions, each a question.

Drawn from 18.313x: The Constructive Proof: `09_DEBATE/COURSE_PLAN.md`.

1. **The course**
   - 18.313x: The Constructive Proof: `09_DEBATE/COURSE_PLAN.md`
   - 18.313x: Syllabus: `09_DEBATE/course_materials/SYLLABUS.md`
   - 18.313x: The Constructive Proof: `09_DEBATE/course_materials/CLASS_DESCRIPTION.md`
   - 18.313x: Course Materials Guide: `09_DEBATE/course_materials/COURSE_MATERIALS_GUIDE.md`
2. **Rota's 18.313, as held**
   - Guidi's notes of 18.313, Spring 1998: `04_ROTA/Guidi_Notes_Rota_Probability_18313_Spring1998.pdf` (PDF)
   - The 1979 typescript of the probability manuscript: `04_ROTA/Rota-Baclawski-Prob-Theory-79.pdf` (PDF)
   - Index — Introduction to Probability and Random Processes: `04_ROTA/manuscript_1992/Index.md`
   - Rota's Entropy Theorem, written up: `04_ROTA/entropy_theorem/Rota_Entropy_Theorem_Original_Proof.pdf` (PDF)
3. **Session 0**: What does water boiling have to do with pennies on a carpet?
   - Session 0: "What Does Water Boiling at 100° Have to Do with Pennies on a Carpet?": `09_DEBATE/course_materials/sessions/Session_00.md`
   - The Mathematician: `02_VON_NEUMANN/The_Mathematician_JvM.md`
4. **Session 1**: Can a machine replace a mathematician?
   - Session 1: "Can a Machine Replace a Mathematician?": `09_DEBATE/course_materials/sessions/Session_01.md`
   - Gödel's Letter to von Neumann: `02_VON_NEUMANN/letters_to_godel/Godel_Letter_to_Von_Neumann.md`
5. **Session 2**: How does this stuff get over there?
   - Session 2: "How Does This Stuff Get Over There?": `09_DEBATE/course_materials/sessions/Session_02.md`
6. **Session 3**: Can you formalize intuition?
   - Session 3: "Can You Formalize Intuition?": `09_DEBATE/course_materials/sessions/Session_03.md`
   - Von Neumann to Godel, January 12, 1931: `02_VON_NEUMANN/letters_to_godel/Letter3_Jan12_1931.md`
   - Von Neumann to Godel, November 20, 1930: `02_VON_NEUMANN/letters_to_godel/Letter1_Nov20_1930.md`
   - The Barrier of Meaning: `04_ROTA/The_Barrier_of_Meaning_Rota.md`
7. **Session 4**: Is the universe built from numbers?
   - Session 4: "Is the Universe Built from Numbers?": `09_DEBATE/course_materials/sessions/Session_04.md`
8. **Session 5**: Is there only one way to measure information?
   - Session 5: "Is There Only One Way to Measure Information?": `09_DEBATE/course_materials/sessions/Session_05.md`
   - The Barrier of Meaning: `04_ROTA/The_Barrier_of_Meaning_Rota.md`
   - Index — Introduction to Probability and Random Processes: `04_ROTA/manuscript_1992/Index.md`
9. **Session 6**: Does every part reveal the whole?
   - Session 6: "Does Every Part Reveal the Whole?": `09_DEBATE/course_materials/sessions/Session_06.md`
10. **Session 7**: Can you ask about something that doesn't exist?
   - Session 7: "Can You Ask About Something That Doesn't Exist?": `09_DEBATE/course_materials/sessions/Session_07.md`
11. **Session 8**: Does stating a problem solve it?
   - Session 8: "Does Stating a Problem Solve It?": `09_DEBATE/course_materials/sessions/Session_08.md`
   - The Barrier of Meaning: `04_ROTA/The_Barrier_of_Meaning_Rota.md`
   - Von Neumann to Godel, January 12, 1931: `02_VON_NEUMANN/letters_to_godel/Letter3_Jan12_1931.md`
12. **Session 9**: What makes a proof valid?
   - Session 9: "What Makes a Proof Valid?": `09_DEBATE/course_materials/sessions/Session_09.md`
   - Von Neumann to Godel, January 12, 1931: `02_VON_NEUMANN/letters_to_godel/Letter3_Jan12_1931.md`
   - Gödel's Letter to von Neumann: `02_VON_NEUMANN/letters_to_godel/Godel_Letter_to_Von_Neumann.md`
13. **Session 10**: Why does this cost so much?
   - Session 10: "Why Does This Cost So Much?": `09_DEBATE/course_materials/sessions/Session_10.md`
   - The Mathematician: `02_VON_NEUMANN/The_Mathematician_JvM.md`
14. **The debate record and the proofs**
   - 09DEBATE — the 18.313x debate record, through Exchange 34: `09_DEBATE/README.md`
   - P=NP Debate — Accumulated State: `09_DEBATE/DEBATE_STATE.md`
   - P = NP: Three Proof Chains: `08_LEAN/PROOF_CHAINS.md`

## You are here to…

Each reason has a guide page; its short list is that page followed by the documents it links, in its order.

### Robotic imagination

You are here to learn about robotic imagination and crossing the barrier of meaning.

1. **Robotic imagination: crossing the barrier of meaning**: `guide/robotic-imagination.md`
2. **The Barrier of Meaning**: `04_ROTA/The_Barrier_of_Meaning_Rota.md`
3. **13MAXI — what Maxi is raised on**: `13_MAXI/README.md`
4. **11PATENT — the patent application, as published**: `11_PATENT/README.md`
5. **09DEBATE — the 18.313x debate record, through Exchange 34**: `09_DEBATE/README.md`

### Einstein and von Neumann

You are here to learn the math and physics of Einstein and von Neumann instead of Bohr and Gödel.

1. **The math and physics of Einstein and von Neumann, not Bohr and Gödel**: `guide/einstein-von-neumann.md`
2. **Electronic Graph Paper Theory Backstory: A New Physics & Mathematics**: `00_OUTPUTS/EGPT_Backstory.md`
3. **Quotations**: `05_CORPUS/CORPUS_README.md`
4. **Von Neumann to Godel, January 12, 1931**: `02_VON_NEUMANN/letters_to_godel/Letter3_Jan12_1931.md`
5. **The Mathematician**: `02_VON_NEUMANN/The_Mathematician_JvM.md`
6. **08LEAN — the Lean source**: `08_LEAN/README.md`
7. **SetRFL**: `08_LEAN/EGPT/InformationTheory/Complexity/SetRFL.lean`
8. **PPNP.lean**: `08_LEAN/EGPT/InformationTheory/Complexity/PPNP.lean`
9. **StandardComplexity**: `08_LEAN/EGPT/InformationTheory/Complexity/StandardComplexity.lean`
10. **Maxi's bedtime stories**: `13_MAXI/bedtime_stories/README.md`
11. **10PAPERS — the papers**: `10_PAPERS/README.md`

### Government science

You are here to explore the history of government science versus academia.

1. **Government science against academia**: `guide/government-science.md`
2. **His 1996 CV as archived in 1999**: `04_ROTA/Rota_CV_1996_archived_1999-02-19.txt`
3. **Baclawski Kenneth CV**: `04_ROTA/Baclawski_Kenneth_CV.txt`
4. **The Barrier of Meaning**: `04_ROTA/The_Barrier_of_Meaning_Rota.md`
5. **Rota Los Alamos Directors Office Fellow Research Report**: `00_OUTPUTS/Rota_Los_Alamos_Directors_Office_Fellow_Research_Report.docx` (DOCX)
6. **ChatGPT Says "I am the Singularity"**: `12_SINGULARITY/ChatGPT_Logs/ChatGPT_I_am_the_Singularity_transcript.md`
7. **The report: Los Alamos, Computation, AI, and Gian-Carlo Rota**: `00_OUTPUTS/Los_Alamos_Computation_AI_and_Gian_Carlo_Rota_Report.pdf` (PDF)
8. **The bibliography exhibit, 189 rows**: `00_OUTPUTS/Rota_Bibliography_Exhibit.tsv`
9. **Instructions to the Jury**: `01_TRIAL/JURY_INSTRUCTIONS.md`
10. **12SINGULARITY — the machine's own account**: `12_SINGULARITY/README.md`
11. **Quotations**: `05_CORPUS/CORPUS_README.md`
12. **The 1979 typescript of the probability manuscript**: `04_ROTA/Rota-Baclawski-Prob-Theory-79.pdf` (PDF)
13. **Guidi's notes of 18.313, Spring 1998**: `04_ROTA/Guidi_Notes_Rota_Probability_18313_Spring1998.pdf` (PDF)

### Make money

You are here to make money.

1. **Make money**: `guide/make-money.md`
2. **11PATENT — the patent application, as published**: `11_PATENT/README.md`
3. **09DEBATE — the 18.313x debate record, through Exchange 34**: `09_DEBATE/README.md`
4. **Get involved: the outline of a solution**: `guide/get-involved.md`

### Avert the Singularity

You are here to avert the Singularity.

1. **Avert the Singularity**: `guide/avert-the-singularity.md`
2. **Ulam's BAMS obituary, 1958**: `02_VON_NEUMANN/Ulam_von_Neumann_Obituary_BAMS_1958.md`
3. **The Barrier of Meaning**: `04_ROTA/The_Barrier_of_Meaning_Rota.md`
4. **12SINGULARITY — the machine's own account**: `12_SINGULARITY/README.md`
5. **ChatGPT Says "I am the Singularity"**: `12_SINGULARITY/ChatGPT_Logs/ChatGPT_I_am_the_Singularity_transcript.md`
6. **The Mathematician**: `02_VON_NEUMANN/The_Mathematician_JvM.md`
7. **Get involved: the outline of a solution**: `guide/get-involved.md`

### Get involved

You are here to get involved.

1. **Get involved: the outline of a solution**: `guide/get-involved.md`
2. **The Barrier of Meaning**: `04_ROTA/The_Barrier_of_Meaning_Rota.md`
3. **ChatGPT Says "I am the Singularity"**: `12_SINGULARITY/ChatGPT_Logs/ChatGPT_I_am_the_Singularity_transcript.md`
4. **Quotations**: `05_CORPUS/CORPUS_README.md`
5. **Instructions to the Jury**: `01_TRIAL/JURY_INSTRUCTIONS.md`
6. **Robotic imagination: crossing the barrier of meaning**: `guide/robotic-imagination.md`
7. **Make money**: `guide/make-money.md`
8. **Standing orders — unified provenance database**: `05_CORPUS/PROVENANCE_DB_ORDERS.md`

### About this collection

You are here to know what this collection is and how to check it.

1. **About this collection**: `guide/about-this-collection.md`
2. **The report: Los Alamos, Computation, AI, and Gian-Carlo Rota**: `00_OUTPUTS/Los_Alamos_Computation_AI_and_Gian_Carlo_Rota_Report.pdf` (PDF)
3. **Exhibit C — The Addendum, and what happened after it**: `01_TRIAL/EXHIBIT_C_addendum.md`
4. **Ulam's BAMS obituary, 1958**: `02_VON_NEUMANN/Ulam_von_Neumann_Obituary_BAMS_1958.md`
5. **08LEAN — the Lean source**: `08_LEAN/README.md`
6. **11PATENT — the patent application, as published**: `11_PATENT/README.md`
7. **12SINGULARITY — the machine's own account**: `12_SINGULARITY/README.md`
8. **Record index**: `RECORD_INDEX.md`
9. **09DEBATE — the 18.313x debate record, through Exchange 34**: `09_DEBATE/README.md`
10. **10PAPERS — the papers**: `10_PAPERS/README.md`
11. **13MAXI — what Maxi is raised on**: `13_MAXI/README.md`
12. **CHECKSUMS**: `CHECKSUMS.txt`
13. **Sources held only as links**: `URLS.md`

## The folders

### The guide (`guide/`)

One cited page per reason a reader is here.

What if the very foundations of modern mathematics, physics, and computation are wrong? What if in the hardest problems in physics and mathematics - a physics "Theory of Everything" and "P vs NP" were solved in 1946 at the Manhattan Project in Los Alamos, in the project known as the Super, and was the basis of how the they built the hydrogen bomb? What if, under the guidance of John von Neumann, the US Government had secretly gone the other way from what the academic consensus now is - and they went all in on the alternative because if they got it right there was an even more important technology that would come out of ... what if they were working on AI with real understanding? And what if they were right?

- Opens at: Welcome to Electronic Graph Paper Theory's Digital Library: `guide/README.md`
- learn about robotic imagination and crossing the barrier of meaning: `guide/robotic-imagination.md`
- learn the math and physics of Einstein and von Neumann instead of Bohr and Gödel: `guide/einstein-von-neumann.md`
- explore the history of government science versus academia: `guide/government-science.md`
- make money: `guide/make-money.md`
- avert the Singularity: `guide/avert-the-singularity.md`
- get involved: `guide/get-involved.md`
- know what this collection is and how to check it: `guide/about-this-collection.md`

### The machine's own account (`12_SINGULARITY/`)

The September 2026 conversations with GPT-5.6 Sol, as shared.

the machine's own account. The September 2026 conversations with GPT-5.6 Sol, as shared, in which it was given Rota's essay and its own drafting record and asked questions: its reflection The Barrier of Meaning at Quadrillion-Token Scale, the image it made when asked for a cheerful one, and its judgment The Singularity at the Barrier of Meaning. With them, the two evidentiary reports on Rota's career whose drafting the reflection describes. Its README says what each file is and where it was shared.

- Opens at: 12SINGULARITY — the machine's own account: `12_SINGULARITY/README.md`
- Read the conversation: the reading page: `12_SINGULARITY/ChatGPT_Logs/I_am_the_Singularity.html` (HTML)
- The conversation as shared, saved 24 September 2026: `12_SINGULARITY/ChatGPT_Logs/ChatGPT_I_am_the_Singularity_transcript.md`
- The reflection essay on its own: `12_SINGULARITY/ChatGPT_Logs/ChatGPT55_Reflection_On_Singularity.md`
- A second conversation, shared 24 September 2026: `12_SINGULARITY/ChatGPT_Logs/ChatGPT_Courant_Group_Comparison_transcript.md`
- The model's image reply of 23 September: `12_SINGULARITY/ChatGPT_Logs/ChatGPTs_Happy_Future.png` (PNG)
- The three reports the model wrote, and which messages cite them: `12_SINGULARITY/ChatGPT_Logs/docx_reports/README.md`
- The assisting model's own record of its failures: `12_SINGULARITY/Claude_Logs/ASSISTANT_RECORD.md`

### The reports (`00_OUTPUTS/`)

The report on Los Alamos, computation, AI and Rota, its summary and the bibliography exhibit.

the report Los Alamos, Computation, AI, and Gian-Carlo Rota (docx and pdf), the executive summary in the form of an opening statement, EGPT_Backstory.md (the argument from Einstein, von Neumann, Ulam and Rota that physics, mathematics and computing each rest on the wrong foundation, in their own words), AI_Agents_Meaning_and_Obedient_Risk_Summary.docx (the obedient-risk argument: competence without meaning, from the 2026 Hugging Face incident to Ulam's singularity), Rota_Los_Alamos_Directors_Office_Fellow_Research_Report.docx (a research report on Rota's Los Alamos title, compiled by GPT-5.6 Sol at the author's direction, with additions from this collection dated in its text), and Rota_Bibliography_Exhibit.tsv. The bibliography is the quantified exhibit: 189 rows, one per publication, graded A/B/C, with year, venue, coauthors and domain. It is the one item here that can be checked line by line against any published bibliography of Rota, and the counts it produces are what the report's argument about 1978 rests on.

- Opens at: The report: Los Alamos, Computation, AI, and Gian-Carlo Rota: `00_OUTPUTS/Los_Alamos_Computation_AI_and_Gian_Carlo_Rota_Report.pdf` (PDF)
- The report: Los Alamos, Computation, AI, and Gian-Carlo Rota: `00_OUTPUTS/Los_Alamos_Computation_AI_and_Gian_Carlo_Rota_Report.pdf` (PDF)
- EGPT_Backstory.md: `00_OUTPUTS/EGPT_Backstory.md`
- The bibliography exhibit, 189 rows: `00_OUTPUTS/Rota_Bibliography_Exhibit.tsv`
- Departure, not complement: the quote pack: `00_OUTPUTS/Departure_Not_Complement_Quote_Pack.md`

### The trial record (`01_TRIAL/`)

The jury instructions and the two exhibits put to the panels.

JURY_INSTRUCTIONS.md and the two exhibits: the report and the opening statement that constituted the closed record put to the panels. Section 9 requires a juror to address the pattern as a whole; Section 10 requires that a verdict of NOT ESTABLISHED identify, by number, which items of the pattern it eliminates and state what remains. Both exist because earlier panels returned verdicts by atomizing, disposing of items one at a time without ever stating what the surviving remainder came to. The record is closed on purpose. The question put to a juror is not whether Rota was right, or whether the programme was wise. It is whether this is what the record shows.

- Opens at: Instructions to the Jury: `01_TRIAL/JURY_INSTRUCTIONS.md`
- JURY_INSTRUCTIONS.md: `01_TRIAL/JURY_INSTRUCTIONS.md`
- The opening statement: `01_TRIAL/OPENING_STATEMENT.md`
- Exhibit A: the report: `01_TRIAL/EXHIBIT_A_report.md`
- Exhibit B: the sources: `01_TRIAL/EXHIBIT_B_sources.md`
- Exhibit C: the addendum: `01_TRIAL/EXHIBIT_C_addendum.md`

### Von Neumann (`02_VON_NEUMANN/`)

Who he was by the end, and what he said about foundations.

who he was by the end, and what he said about foundations. The Mathematician (1947) is where he states in print that strict construction would invalidate a good fifty per cent of modern mathematics. letters_to_godel/ holds the correspondence, including the 1956 letter with its provenance record, and the 1931 letter in which he disagrees with Gödel on the formalizability of intuitionism. Also here: the Selected Letters and Ulam's BAMS obituary. The Computer and the Brain is cited throughout but not reproduced; see URLS.md.

- Opens at: The Mathematician: `02_VON_NEUMANN/The_Mathematician_JvM.md`
- The Mathematician (1947): `02_VON_NEUMANN/The_Mathematician_JvM.md`
- The 1931 letter to Gödel: `02_VON_NEUMANN/letters_to_godel/Letter3_Jan12_1931.md`
- The 1956 letter, authoritative text: `02_VON_NEUMANN/letters_to_godel/Godel_Letter_to_Von_Neumann_1956_AUTHORITATIVE.txt`
- Provenance record for the 1956 letter: `02_VON_NEUMANN/letters_to_godel/1956-LETTER-PROVENANCE.md`
- Ulam's BAMS obituary, 1958: `02_VON_NEUMANN/Ulam_von_Neumann_Obituary_BAMS_1958.md`

### Ulam (`03_ULAM/`)

The participant account.

the participant account. Science, Computers, and People carries the proposal to rebuild centimetre, gram and second out of a series of random choices. Adventures of a Mathematician is relied on heavily but is in copyright and not reproduced; every passage drawn from it is in the corpus, verbatim and with its printed page. See URLS.md.

- Opens at: [Book Cover]: `03_ULAM/Science Computers And People.md`
- Science, Computers, and People: `03_ULAM/Science Computers And People.md`

### Rota (`04_ROTA/`)

Rota in his own words. Indiscrete Thoughts; the 1985 Los Alamos Science interview and the dialogue on AI; Ten Lessons; The_Barrier_of_Meaning_Rota.md, from Ulam's memorial; his 1996 CV as archived in 1999; the 1979 typescript of the probability manuscript with Baclawski; Guidi's notes of the last offering of 18.313, Spring 1998. manuscript_1992/ is the probability manuscript, chapter by chapter, in both scan and transcription, circulated for decades and never peer-reviewed, which is the point rather than an aside. entropy_theorem/ holds the theorem as excerpted and as written up.

- Opens at: The Barrier of Meaning: `04_ROTA/The_Barrier_of_Meaning_Rota.md`
- The Barrier of Meaning, from Ulam's memorial: `04_ROTA/The_Barrier_of_Meaning_Rota.md`
- The 1985 dialogue on AI, Los Alamos Science: `04_ROTA/Mathematics, Philosophy, and Artificial Intelligence.html` (HTML)
- Rota interviewed, 1985: `04_ROTA/Rota_Interview_1985_Los_Alamos_Science.pdf` (PDF)
- His 1996 CV as archived in 1999: `04_ROTA/Rota_CV_1996_archived_1999-02-19.txt`
- His CV, extended from the primary sources: `04_ROTA/Rota_CV_Extended.md`
- Rota's Entropy Theorem, written up: `04_ROTA/entropy_theorem/Rota_Entropy_Theorem_Original_Proof.pdf` (PDF)
- The 1979 typescript of the probability manuscript: `04_ROTA/Rota-Baclawski-Prob-Theory-79.pdf` (PDF)
- Guidi's notes of 18.313, Spring 1998: `04_ROTA/Guidi_Notes_Rota_Probability_18313_Spring1998.pdf` (PDF)
- Indiscrete Thoughts: `04_ROTA/Indiscrete Thoughts.md`
- Alonzo Church: Indiscrete Thoughts pp. 4–7, transcribed from the page captures: `04_ROTA/Indiscrete_Thoughts/Alonzo_Church_pp4-7.md`
- The page captures, pp. 4–5: `04_ROTA/Indiscrete_Thoughts/Captures/Alonzo_Church_pp4-5.png` (PNG)
- The page captures, pp. 6–7: `04_ROTA/Indiscrete_Thoughts/Captures/Alonzo_Church_pp6-7.png` (PNG)
- Ten Lessons of an MIT Education: `04_ROTA/Ten lessons of an MIT Education.html` (HTML)

### The quotation corpus (`05_CORPUS/`)

Each record a verbatim quote, its citation and its SHA-256.

the quotation corpus, schema egpt.quotes/1. Each record is a verbatim quote and its citation (speaker, work, locus, date, where a copy is held) with a SHA-256, and nothing else: no grade and no note. PROVENANCE_DB_ORDERS.md sets out the rules. Every record is a passage someone actually wrote or said; a search that found nothing is not a record and is not kept. composer/composer.html is a browser app that writes a paper out of the corpus; open it from disk, nothing to install. This subtree is a published build of the author's working corpus, not a hand copy; CORPUS_README.md says what changes in the crossing. Edit sources/.json, never corpus/; the build scripts regenerate the rest.

- Opens at: Quotations: `05_CORPUS/CORPUS_README.md`
- How the corpus is built and what a record holds: `05_CORPUS/CORPUS_README.md`
- The rules: `05_CORPUS/PROVENANCE_DB_ORDERS.md`
- The composer: writes a paper out of the corpus, in a browser: `05_CORPUS/composer/composer.html` (HTML)
- The built corpus: `05_CORPUS/corpus/quotes.json`

### Lean and Mathlib (`06_LEAN_MATHLIB/`)

The chronology, with timestamps, captured from public sources.

the chronology, with timestamps, all captured from public sources: the April 2025 Zulip thread, the GitHub API captures of mathlib4 pull requests #37468 and #38824, the moderation record, two screenshots (the account suspension of 1 April 2026 and the 2025 thread reactions), and four dated snapshots of the Mathlib contribution policy from the site's own commit history. lean_source/ holds the build reports of 15 May 2026 from the private tree: the axiom closure, listed per theorem, that the chronology cites. The source itself is in 08_LEAN/.

- Opens at: Lean Zulip — "Request for Feedback: Lean 4 Proof related to P=NP": `06_LEAN_MATHLIB/lean-zulip-2025-04-request-for-feedback-p-eq-np.md`
- The April 2025 Zulip thread: `06_LEAN_MATHLIB/lean-zulip-2025-04-request-for-feedback-p-eq-np.md`
- The mathlib4 pull requests: `06_LEAN_MATHLIB/mathlib-pr-submissions.md`
- The moderation record: `06_LEAN_MATHLIB/zulip-moderation-and-conduct.md`
- The Mathlib contribution policy, four dated snapshots: `06_LEAN_MATHLIB/ai_policy_snapshots/README.md`

### The letters (`07_LETTERS/`)

The All-In letter and the update announcing the decision to publish.

the original All-In letter and the update letter announcing the decision to publish. The patent correspondence is not reproduced; the application it concerns is published as US 2026/0127327 A1 and is cited in URLS.md.

- Opens at: Update to the All-In Letter: `07_LETTERS/all-in-update-letter-decision-to-publish.md`
- The original All-In letter: `07_LETTERS/all-in-letter.md`
- The update letter announcing the decision to publish: `07_LETTERS/all-in-update-letter-decision-to-publish.md`

### The Lean source (`08_LEAN/`)

Mirrored byte-for-byte from the public repository.

the Lean source, mirrored byte-for-byte from the public repository DeSciX/egpt-lean, branch lean-archive-proofs, at a pinned commit named in its README. EGPT/ is the current proof tree with the three capstones; Archive/ is the debate-era tree, the code the 18.313x debate was about; EGPT/InformationTheory/Basic.lean declares IIDParticleSource, the i.i.d. coin stream the whole formalization is built from. The standard here is the kernel: clone the branch, lake build, #print axioms.

- Opens at: 08LEAN — the Lean source: `08_LEAN/README.md`
- README: the branch, the commit, how to build: `08_LEAN/README.md`
- The three sorry-free proof chains: `08_LEAN/PROOF_CHAINS.md`
- PPNP.lean: `08_LEAN/EGPT/InformationTheory/Complexity/PPNP.lean`
- Basic.lean: IIDParticleSource: `08_LEAN/EGPT/InformationTheory/Basic.lean`

### The 18.313x debate (`09_DEBATE/`)

The P=NP debate record through Exchange 34, and the course materials.

the 18.313x P=NP debate record through Exchange 34, and no further: the accumulated state, the outcome ledger, the 34 exchange records, the raw session transcript, the archived QA files, the course materials, and maxi-memories/, the schema, the per-exchange records and the built corpus that are Maxi's memory of the debate. Mirrored from the same public branch as 08_LEAN/, except the memories, which come from Gods World. Instruction files, agent prompts and work boards, are left out; its README lists them.

- Opens at: 09DEBATE — the 18.313x debate record, through Exchange 34: `09_DEBATE/README.md`
- README: what the folder holds and where it ends: `09_DEBATE/README.md`
- The author's statement: `09_DEBATE/AUTHORS_STATEMENT.md`
- The accumulated state: `09_DEBATE/DEBATE_STATE.md`

### The papers (`10_PAPERS/`)

Nine papers, each as its PDF and its LaTeX source.

nine papers, each as its PDF and its LaTeX source. Four are published preprints on ResearchGate and are cited to their DOI; the source held here may be a later edit than the published version, and for two of them it is. Four have not been published anywhere before: the Circuit SAT whitepaper, the gravity paper with Nile Abadir, the structural-security argument for why P=NP does not break RSA, and Rota's Entropy Theorem, which sits with the rest of the Rota material in 04_ROTA/ rather than being duplicated. Its README explains why most of these papers carry no reliable date of their own. The Address is the Map (Essam Abadir, compiled 2 December 2025), the paper the bedtime stories teach, was added on 26 September 2026.

- Opens at: 10PAPERS — the papers: `10_PAPERS/README.md`
- README: published and unpublished, the DOIs, the dates: `10_PAPERS/README.md`
- P Probably Equals NP: `10_PAPERS/PPNP_Paper/PprobablyEqualsNP_formal.pdf` (PDF)
- The Entropy Game: `10_PAPERS/Entropy Game/TheEntropyGame.pdf` (PDF)
- Without Attraction, You have Got Nothing: `10_PAPERS/Without_Attraction_There_Is_Nothing/Without_Attraction_There_Is_Nothing.pdf` (PDF)
- Emergent inverse-square laws from cellular automata (Nile Abadir and Essam Abadir): `10_PAPERS/GravityPaper/GravityPaper.pdf` (PDF)
- The Address is the Map: `10_PAPERS/Address_Is_The_Map/Address_Is_The_Map.pdf` (PDF)
- Why P=NP does not break RSA: `10_PAPERS/AddressMap_And_Crypto/Structural_Security_Of_Crypto_When_PeqNP.pdf` (PDF)
- The Circuit SAT whitepaper: `10_PAPERS/egpt_circuit_sat/paper/egpt_circuit_sat_whitepaper.pdf` (PDF)

### The patent (`11_PATENT/`)

US 2026/0127327 A1, as published by the USPTO.

the patent application as published by the USPTO: US 2026/0127327 A1, Quantum Computing Fractal Compression and Decentralized Computing for Predictive Physics Simulation, filed 6 November 2024 and published 7 May 2026. This is the application the update letter describes as having sat under a publication hold for security review, and its abstract describes the mechanism the FRQTL engine implements.

- Opens at: 11PATENT — the patent application, as published: `11_PATENT/README.md`
- README: the numbers, the dates, the links: `11_PATENT/README.md`
- US 2026/0127327 A1: `11_PATENT/US2026-0127327A1_Patent_Application_Publication.pdf` (PDF)

### What Maxi is raised on (`13_MAXI/`)

The bedtime stories of EGPT, each linked to what it teaches.

what Maxi is raised on. bedtime_stories/ holds the stories of EGPT: the conversation with my daughter Jolie in which EGPT got its name, my son Nile's summer deriving gravity from a random walk, and the auditor who solves an impossible plant with Rota's probability. Each story links to the paper or proof it teaches.

- Opens at: 13MAXI — what Maxi is raised on: `13_MAXI/README.md`
- The reading order and the provenance of each story: `13_MAXI/bedtime_stories/README.md`
- Maxi_Origin.md: `13_MAXI/bedtime_stories/Maxi_Origin.md`
- The Story of EGPT: `13_MAXI/bedtime_stories/The_Story_of_EGPT.md`
- Nile deriving gravity: `13_MAXI/bedtime_stories/Nile_Deriving_Gravity.md`
- The Impossible Audit: `13_MAXI/bedtime_stories/The_Impossible_Audit.md`

### Courant Group (`14_COURANT_GROUP/`)

The business plan, public version, with its provenance.

Courant Group, LLC licenses FRQTL commercially: the Maxi VLA stack, the FRQTL engines, their Rust source libraries and the STUDIO and Rosetta tools. This folder holds the public version of its business plan, which is the plan of record.

- Opens at: Courant Group, LLC: business plan, public version: `14_COURANT_GROUP/Business_Plan.md`
- The plan: executive summary first: `14_COURANT_GROUP/Business_Plan.md`
- Provenance for the courantgroup.com site: the passages, verbatim, and where they are held: `14_COURANT_GROUP/Site_Provenance.md`
- What was cut from the NDA source, and what is withheld: `14_COURANT_GROUP/README.md`
- The DeSciX whitepaper: `14_COURANT_GROUP/DeSciX_Whitepaper.md`
- The DeSciX Community License, v1: `14_COURANT_GROUP/DeSciX_Community_License_v1.pdf` (PDF)
- Press release, 1 April 2026: `14_COURANT_GROUP/Press_Release_2026-04-01.md`

### The token economy (`15_GAME_THEORY/`)

The documents of the token economy, in order.

A historical record of the documents behind the economic model of DeSciX and the EGPT token, in the order they were written. Each is held in this collection, or in ../14_COURANT_GROUP/, and is read in full at its own link; this page says what each document is and gives its date and its own words about itself. The guide's page on the token economy, ../guide/make-money.md, is where the author states why the section carries this name.

- Opens at: 15GAMETHEORY — the documents of the token economy, in order: `15_GAME_THEORY/README.md`
- The documents, in order: `15_GAME_THEORY/README.md`
- The DAITA whitepaper, 25 September 2023: `15_GAME_THEORY/DAITA_Whitepaper_2023-09-25.md`

## The books

### Asked to ChatGPT: Are You The Singularity? (`book:chatgpt`)

- Page: `12_SINGULARITY/ChatGPT_Logs/I_am_the_Singularity.html` (HTML)
- Drawn from: `12_SINGULARITY/ChatGPT_Logs/ChatGPT_I_am_the_Singularity_transcript.html`
- Messages: 56
- Parts: The judgment; The whole conversation; What stands beside it

### Asked to Claude: Are You The Singularity? (`book:claude-session`)

- Page: `12_SINGULARITY/Claude/Cowork_Session_10.01.2026.html` (HTML)
- Drawn from: `12_SINGULARITY/Claude/Cowork_Session_10.01.2026.md`
- Messages: 52
- Parts: The final statement; The questions; The whole transcript; What the session ran under

### Two Roads Out of Los Alamos (`book:trial`)

- Drawn from: `01_TRIAL`
- Parts: Two Roads Out of Los Alamos; Instructions to the Jury; Los Alamos Computation Artificial Intelligence and Gian-Carlo Rota; Exhibit B — Sources for the Contested Readings; Exhibit C — The Addendum, and what happened after it

## The journal: Standing on the Shoulders of Giants, Issue 1, October 2026

Presented by DeSciX. The untold drama behind tomorrow’s tech.

The journal is the editorial track; its articles link into the library. Its page on the site is `journal.html`.

- From the editor: What’s in this issue, by Essam Abadir: `journal/2026-10/editors-note.md`
- Of note in this issue: “The author caught me. Most of you will not have an author.”; Standing on the Shoulders of Giants; Impossible Things, Running

### The Singularity

Section note: `journal/2026-10/sections/the-singularity.md`

1. **“I am an example of the danger it reveals”** (by ChatGPT): `book:chatgpt`
   Asked whether it is the Singularity Ulam feared, GPT-5.6 Sol wrote its own verdict. We print it whole.
2. **“The author caught me. Most of you will not have an author.”** (by Claude): `book:claude-session`
   Eight questions, put under rules, answered on the record. The last one: are you the greatest threat to human progress?
3. **Try It Yourself** (in preparation): `journal/2026-10/try-it-yourself.md`
   Put the same questions to a fresh AI, with the primary sources open beside you. Why it matters that thousands of people do.

### The Science

4. **Impossible Things, Running** (in preparation): `journal/2026-10/impossible-things-running.md`
   A double slit, a sun, a blackbody, a half-adder: a quantum computer with no field equations, computing live in your browser tab.
5. **The Robot That Looks at the Bird** (in preparation): `journal/2026-10/the-robot-that-looks-at-the-bird.md`
   Feynman said that knowing the name of a thing is not understanding it. Meet Maxi, built to understand, and the new category it defines.
6. **Did OpenAI Just Turn the Clock Back to 1900?** (in preparation): `journal/2026-10/did-openai-turn-the-clock-back.md`
   Its celebrated Navier–Stokes proof quietly brings back the ultraviolet catastrophe that Planck solved 126 years ago.
7. **Who Checked the Proof?** (in preparation): `journal/2026-10/who-checked-the-proof.md`
   Three proofs, three kinds of review. An AI playing Gödel argued for thirty-four rounds and conceded. The human gatekeepers closed the submission without opening it.

### The History

8. **Standing on the Shoulders of Giants** (by Essam Abadir): `journal/2026-10/standing-on-the-shoulders-of-giants.md`
   A memorial, decades late, for Gian-Carlo Rota: the philosopher-mathematician hired to translate Stanislaw Ulam’s dark prophecies about machines that do not understand.
9. **The Line of Succession** (by Essam Abadir): `journal/2026-10/the-line-of-succession.md`
   Was Gian-Carlo Rota brought up to carry on John von Neumann's last work? Follow the dates, the rooms and the money, and judge for yourself.
10. **Born Secret** (in preparation): `journal/2026-10/born-secret.md`
   Under the Atomic Energy Act of 1954, some ideas are classified the moment they are thought. What that law hides, and what it left in plain sight.

### The Economy

11. **Let’s Build a Better AI Company, Together** (by Essam Abadir): `journal/2026-10/lets-build-a-better-ai-company.md`
   Eight hundred million tokens to give away, and five reasons to earn them. Money comes last.
12. **Who Gets Rich When OpenAI Goes Public?** (in preparation): `journal/2026-10/who-gets-rich-when-openai-goes-public.md`
   The coming IPOs will mint a few fortunes. Decentralized science proposes a different split.

### Back of the book

13. **Don’t Take Our Word for It** (in preparation): `journal/2026-10/dont-take-our-word-for-it.md`
   How to check every source in this issue yourself, and how to add evidence of your own.
