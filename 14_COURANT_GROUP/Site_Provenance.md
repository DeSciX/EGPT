# Provenance for the Courant Group site

What the marketing site at courantgroup.com says is supported by documents in this collection.
This sheet gives, for each claim, the passages verbatim and where they are held, so the site can
hover-link or deep-link the record rather than restate it.

**How to link.** Every file below is served by the egpt app; open it with a hash link of the form
`https://egpt.descix.net/#<path in this collection>`, for example
<https://egpt.descix.net/#02_VON_NEUMANN/letters_to_godel/Letter3_Jan12_1931.md>. The same path
in the repository is `https://github.com/eabadir/EGPT-Evidence/blob/main/<path>`, which resolves
once the repository is public. Quotations marked with a record id are in the corpus,
[`../05_CORPUS/`](../05_CORPUS/CORPUS_README.md), each with its SHA-256.

## 1. "Built from the Blueprints": von Neumann, Gödel, Ulam

### von Neumann to Gödel, 12 January 1931, first paragraph

[`../02_VON_NEUMANN/letters_to_godel/Letter3_Jan12_1931.md`](../02_VON_NEUMANN/letters_to_godel/Letter3_Jan12_1931.md).
Original German; English translation by W. Sieg; published in K. Gödel, *Collected Works*, Vol. V,
pp. 340–341. The first paragraph was checked against page images of the printed volume on 28
August 2026 (the file's front matter records the key words).

> "Many thanks for your two letters and the proof sheets. Your remark on ω-consistency was very
> interesting to me. Incidentally, the other day I developed a method that always allows a finite
> decision for the effective provability question concerning propositions that are built up solely
> by means of the concepts "not", "or" (thus also "and", "follows", etc.), [and] "provable"
> (starting from the identical truth-consistency is for example such a proposition). (Natürlich
> unter Voraussetzung der ω-Widerspruch[s]freiheit.) … Perhaps, if it interests you, or you have not
> yet thought of it, then I can write it up."

The ellipsis stands for the file's own bracketed transcription note; the German sentence is in the
original and is left untranslated there. ω is written `$\omega$` in the file.

The same letter, on intuitionism, and its closing questions, in the same file:

> "I absolutely disagree with your view on the formalizability of intuitionism. Certainly, for
> every formal system there is, as you proved, another formal one that is (already in arithmetic
> and the lower functional calculus) stronger. But intuitionism is not affected by that at all."

> "But is it not a fact, that not a single construction of the kind mentioned is known that cannot
> be formalized in $A$, and that no living logician is in the position of naming such [a
> construction]? Or am I wrong, and you know an effective intuitionistic arithmetic construction
> whose formalization in $A$ creates difficulties? If that, to my utmost surprise, should be the
> case, then the formalization should certainly work in $M$ or $Z$!"

> "I would be very grateful if you would tell me whether you are really conjecturing the
> existence of such examples, or whether you even know some?"

#### The author's reading, to the more-probable-than-not standard

From his *Infinity War* backstory, the section "von Neumann's Lost Theorem", held at
[`../13_MAXI/bedtime_stories/Infinity_War_Backstory.md`](../13_MAXI/bedtime_stories/Infinity_War_Backstory.md):

> "**My lay translation.** Paragraph one's "'not', 'or' (thus also 'and', 'follows', etc.)" is what
> mathematicians call conjunctive normal form (CNF), and it is how they express NP-hard problems
> like circuit satisfiability and the travelling salesman problem. He's opening the letter by
> saying he has a jaw dropping proof, then casually challenging Gödel to see whether he can figure
> it out, or whether Gödel is going to have to ask to see the proof - a major flex. Paragraphs two
> and three are incredibly intense language for the universally loved von Neumann talking to his
> greatest professional rival. He's saying Gödel's incompleteness theorems don't touch von
> Neumann's newly adopted system, called Intuitionism. "Or am I wrong?""

> "In 1931 computers didn't exist yet and the Church-Turing Thesis about computability hadn't
> been invented. From a mathematical perspective, in lay terms, this is a rehash of the previously
> mentioned Infinity War - there is no mathematical "infinity" object in Intuitionism and there is
> no distinction between decidable and what we now call computable in polynomial time."

> "One could argue that by finite and decidable von Neumann just meant enumerating every possible
> solution via application of exponential brute-force. But brute-force is the last resort of the
> incompetent and you'd then have to read paragraph one of the letter as "Hi Gödel, I thought of
> the dumbest way possible to solve any problem you can define - do you want to see it? Now that
> you know how smart I am, let's talk about your so-called Incompleteness theorems.""

And his statement of 28 September 2026, to the assistant compiling this sheet, verbatim:

> "The evidence shows that in 1931, prior to Church-Turing, an Intuitionist (no completed
> infinities allowed) outline a proof for a finite decision procedure (in 1931 there is no
> distinction between decision and computable), for AND/OR/NOT and Proveable (CNF), and von
> Neumann never ever published any computing papers that would distinguish the cost of walking
> storage and computing. That is the evidence - I would argue that reasonable people would call
> that a claim of P=NP … Most reasonable humans would surmise you open such a letter with a
> bomb-shell to throw down the gauntlet - "Or am I wrong?" … I have outlined the position and
> provided the evidence for the human reader to interpret."

### Gödel to von Neumann, 20 March 1956, the question

[`../02_VON_NEUMANN/letters_to_godel/Godel_Letter_to_Von_Neumann_1956_AUTHORITATIVE.txt`](../02_VON_NEUMANN/letters_to_godel/Godel_Letter_to_Von_Neumann_1956_AUTHORITATIVE.txt),
with its provenance record beside it.

> "One can obviously easily construct a Turing machine, which for every formula F in first order
> predicate logic and every natural number n, allows one to decide if there is a proof of F of
> length n (length = number of symbols). Let Ψ(F, n) be the number of steps the machine requires
> for this and let ϕ(n) = maxF Ψ(F, n). The question is how fast ϕ(n) grows for an optimal machine.
> One can show that ϕ(n) ≥ k · n. If there really were a machine with ϕ(n) ∼ k · n (or even ∼ k ·
> n2 ), this would have consequences of the greatest importance. Namely, it would obviously mean
> that in spite of the undecidability of the Entscheidungsproblem, the mental work of a
> mathematician concerning Yes-or-No questions could be completely replaced by a machine."

The letter's opening, from the same file:

> "With the greatest sorrow I have learned of your illness. The news came to me as quite
> unexpected. Morgenstern already last summer told me of a bout of weakness you once had, but at
> that time he thought that this was not of any greater significance. As I hear, in the last
> months you have undergone a radical treatment and I am happy that this treatment was successful
> as desired, and that you are now doing better."

What von Neumann was working on then. His bibliography in Ulam's obituary
([`../02_VON_NEUMANN/Ulam_von_Neumann_Obituary_BAMS_1958.md`](../02_VON_NEUMANN/Ulam_von_Neumann_Obituary_BAMS_1958.md)),
entry 124:

> "1956 **124\.** *Probabilistic logics and the synthesis of reliable organisms from unreliable
> components.* "Automata Studies," edited by C. E. Shannon and J. McCarthy, Princeton University
> Press, 1956, pp. 43-98."

Claude E. Shannon, "Von Neumann's Contributions to Automata Theory," *Bulletin of the American
Mathematical Society* 64 (1958), p. 124 (record `q-claude-e-shannon-claude-e-shannon-von-dfcf75c4`):

> "Involving a mixture of pure and applied mathematics as well as other sciences, automata theory
> was an ideal field for von Neumann's wide-ranging intellect. He brought to it many new insights
> and opened up at least two new directions of research. It is unfortunate that he was unable to
> complete the work he had in progress, some of which is in the form of rough notes or unedited
> lectures, and for some of which no record exists apart from his colleagues' memories of casual
> conversations."

#### The author's reading of the 1956 letter, to the more-probable-than-not standard

His statement of 28 September 2026, to the assistant compiling this sheet, verbatim:

> "Since you included the Godel to von Neumann letter, the context relevant to the reading is
> that taken together with the 1931 letter it is a reply to it and not a new topic - one last
> letter written to a friend who he knows is dying (the reading of the formal German tone of the
> opening would suggest this is what the polite phrasing suggests). As a reply, the context and
> question is whether it is a concession "that in spite of the undecidability of the
> Entscheidungsproblem, the mental work of a mathematician concerning Yes-or-No questions could
> be completely replaced by a machine." because in 1956 as Shannon notes, von Neumann's friends
> know he is working AI ... under a more probable than not standard the question is whether Godel
> is stating "You might have been right in 1931, I thought I tell you that while I still can.""

### Ulam and the Monte Carlo method, by scale

The passages below are from the held transcription of Ulam, *Science, Computers, and People:
From the Tree of Mathematics* (Birkhäuser, 1986), [`../03_ULAM/Science Computers And People.md`](../03_ULAM/Science%20Computers%20And%20People.md), which holds the front matter, chapters 1 and 2, chapter 5 pp. 38–42, chapter 9 pp. 77–81
and chapter 18 pp. 223–229; the book's other chapters are marked in that file as not yet
transcribed. Page numbers are the file's own. Where a passage has a corpus record, its id is given.

**The method, in general** (chapter 5, p. 38; the first sentence is record
`q-stanislaw-ulam-science-computers-an-d365a8d9`):

> The first meaningful applications were made in problems of mathematical physics, where the complexity of the interaction of many elements may be such that no methods of classical mathematical analysis can give even a qualitative picture of their solution. In hydrodynamics (the study of the motion of fluids) one must have recourse (other than in very simple cases) to numerical work which becomes so massive that only the fastest machines can provide useful approximations. In problems of weather prediction or of the circulation of the atmosphere, initial data also lacks the simplicity and symmetry that allow for the use of theoretical methods of analysis.

**Nuclear: neutrons, fission, reactors** (chapter 5, pp. 38–39; records
`q-stanislaw-ulam-science-computers-an-8c91ad41` and `q-stanislaw-ulam-science-computers-an-397f6e23`):

> Let me point to the so-called Monte Carlo approach as an example of one of the methods that can lead to insight into the behavior of complicated systems. Essentially it consists of imitating physical processes on a computer by following a large but manageable number, replacing the trillions or more that are involved in the real process, by thousands of histories of the behavior of individual particles. This method is used, for instance, in calculations involving nuclear reactors, where neutrons, produced by fission, emerge with various velocities,
> [39]
> collide, scatter, and are absorbed or multiply according to probabilities which depend on the initial data. Thus, instead of considering all of the possible eventualities, one selects a number of chains of events which are then followed in a complicated tree of branching eventualities. By surveying the statistics of these “histories” one then gets a good idea of the behavior of the whole system. Without very fast computers, this elaborate procedure would be totally impractical.

**Astrophysics: stellar genesis, multiple stars, novae** (chapter 5, pp. 39–40; the second passage is
record `q-stanislaw-ulam-science-computers-an-63ca3231`):

> 1. Of the visible stars, a high proportion are multiple – double, triple and more – held together by gravitational forces. The process of stellar genesis could perhaps explain this great frequency. Assuming a mass of gas of large dimensions, say on the scale of our entire planetary system, originating as a fluctuation in a perhaps larger mass, one could speculate as to how that mass would contract through gravity. It would be interesting to perform a great number of computations starting with different plausible hypotheses about the initial state of that gas, in order to evaluate the chance that the matter would contract to a single mass in amounts sufficient to produce a star, perhaps with a number of planets, as in the solar system, or that it would contract into a double or multiple system of comparable masses. A vast number of calculations would have to be performed to obtain meaningful statistics for this research.

> 2. The behavior of a multiple star surrounded by a number of planet-like masses subject to mutual attractions is a classical problem of mechanics. One of the questions in such an *n*-body problem is: How often will there be physical collisions, that is to say, how often will two of the stars collide, or how often will a “planet” hit one of the stars of a double or triple system? A
> [40]
> number of such calculations could give an approximate idea of the frequency of such collisions and might possibly explain some of the nova stars, those stars which suddenly become exceedingly bright. There are a number of binary stars where novae are observed, sometimes periodically. After all, in our solar system there are periodic collisions of similar chains of meteorites with one member of the system, namely the earth. Of course these are very small bodies, but if there were much larger ones, we would perhaps occasionally observe the considerable brightening of one of the gravitating bodies of the system.

> These and similar problems involve so many computations that they can only be performed with the help of very big computers.

**Chemistry and biology: growth patterns, molecules, cells, evolution** (chapter 9, pp. 77–78, record
`q-stanislaw-ulam-science-computers-an-206c3335`; then chapter 5, p. 41):

> The simplest patterns observed, for example in crystals, are periodic and the properties of such have been studied mathematically very extensively. The rules which we shall employ will lead to much more complicated and in general non-periodic structures whose properties are more difficult to establish, despite the relative simplicity of our recursion relations. The objects defined in that way seem to be, so to say, intermediate in complexity between inorganic patterns like those of crystals and the more varied intricacies of organic molecules and structures. In fact, one of our aims here is to show, by admittedly somewhat artificial examples, an enormous variety of objects which may be obtained by means of rather simple inductive definitions and to throw a sidelight on the question of how much “information”
> [78]
> is necessary to describe the seemingly enormously elaborate structures of living objects.

> A list of the advances in science which have only become possible by the use of computers would fill volumes. Let me list just a few examples of the often pioneering work done in the Institute's Applied Mathematics Department during the years of its existence. The electronic energy levels of helium-like atoms have been computed to very high accuracy. Numerical solutions have been obtained of the partial differential equations formulated by Laplace to describe ocean tides, and the solutions agreed remarkably well with observational data. In theoretical seismology, studies have been made of the propagation of seismic waves in a layered spherical earth. In terrestrial spectroscopy, calculations have been made of the periods of free vibrations of the earth on various postulated models of the earth's structure, and comparison with observations could then yield information about the interior of the globe. For the first time accurate numerical solutions of the complete Navier-Stokes equations have been made in fluid dynamics without any approximations or further assumptions. In numerical analysis, efficient methods were developed for the solution of complex differential systems. Biological processes were modeled on the molecular, cellular and population levels.

> We have indicated how computers have made it possible to determine the structure of proteins and in many cases decipher the meaning of DNA codes. Soon, it may be possible to experiment with modifying, and even perhaps increasing, the speed of evolution.

**Mathematics: the computer as an experimental instrument** (chapter 5, p. 40; the second sentence
of the second passage is record `q-stanislaw-ulam-science-computers-an-ba0ecf57`; then chapter 18,
p. 224):

> In pure mathematics computers have already played a decisive role in certain problems of combinatorics, that is in the study of arrangements and patterns of systems. The famous four-color problem is a shining example. It had long been conjectured that any map drawn on a plane or on the surface of a sphere can be colored using not more than four colors so that countries having a common border will be colored differently. A few years ago, this conjecture was proved on a computer after the general problem had been reduced to one that only involved a finite number of possible standard configurations. The number of these, however, was so great that it took hundreds of hours of computer time to study them.

> One could quote many instances of interesting work in pure mathematics, group theory or other areas of algebra in which experimental work has proved useful. The study of non-linear transformations or equations is one field of increasing importance, both in pure mathematics and in applications to physical problems, where heuristic work has already yielded new insights.

> It was von Neumann's belief that computing machines would not only help solve existing problems but also open new perspectives in mathematics and physics. Obviously the machines could be used to test tentative theories by computations too laborious and too lengthy for manual methods. But, more important, they could provide the imaginative investigator with new “experimental” material which could suggest new theories.

**Los Alamos and the scale of the computations** (chapter 18, pp. 223–224):

> It was the problems of mathematical physics that arose at the Los Alamos Scientific Laboratory which created the need to plan massive computations on the new machines. The solution of one of these problems may require billions of elementary steps: additions, multiplications, and so on. Beyond the mere bulk
> [224]
> of repetitive computations the problem may involve combinations and logical operations of considerable complexity. The program of calculation must be prepared in advance, first in a general form. This is done by means of a flow diagram, which is then elaborated by a detailed set of instructions — a “code.” This very scheme of a flow diagram and a code is due to von Neumann, along with many other concepts now commonplace in the art of computing.

Martin Gardner, preface to the same book, p. viii (record
`q-martin-gardner-preface-to-stanislaw-5bb40637`):

> "To mention only three: Cellular automata theory, which he proposed to von Neumann; the Monte
> Carlo method of solving intractable problems, not only in probability theory but in areas such as
> number theory where the method would not have been thought applicable; and his work on nonlinear
> processes that anticipated today's interest in solitons and "chaos.""

Metropolis and Ulam, "The Monte Carlo Method," *Journal of the American Statistical Association*
44:247 (1949), p. 336 (record `q-nicholas-metropoli-the-monte-carlo-meth-0b2b6ece`):

> "To calculate the probability of a successful outcome of a game of solitaire… is a completely
> intractable task. On the other hand, the laws of large numbers and the asymptotic theorems of the
> theory of probabilities will not throw much light even on qualitative questions concerning such
> probabilities. Obviously the practical procedure is to produce a large number of examples of any
> given game and then to examine the relative proportion of successes."

Same paper, p. 339 (record `q-nicholas-metropoli-the-monte-carlo-meth-81bee633`):

> "we avoid dealing with multiple integrations… but instead sample single chains of events"

Metropolis, "The Beginning of the Monte Carlo Method," p. 127 (record
`q-nicholas-metropoli-the-beginning-of-the-e626f4a0`):

> "John von Neumann saw the relevance of Ulam's suggestion and, on March 11, 1947, sent a
> handwritten letter to Robert Richtmyer, the Theoretical Division leader (see "Stan Ulam, John von
> Neumann, and the Monte Carlo Method"). His letter included a detailed outline of a possible
> statistical approach to solving the problem of neutron diffusion in fissionable material."

The author's own statement of the connection, in the text of pull request #38824 to mathlib4
([`../06_LEAN_MATHLIB/mathlib-pr-38824-body.md`](../06_LEAN_MATHLIB/mathlib-pr-38824-body.md);
record `q-essam-abadir-pull-request-38824-t-7d389acf`):

> "von Neumann and Ulam (Los Alamos, 1940s) — Monte Carlo is a polynomial-time decision procedure
> over combinatorial state spaces, built from random walks and the cellular automata used to
> simulate neutron diffusion. The method predates the P vs NP vocabulary but is a P-time solver by
> construction."

### Ulam and Rota at Brookhaven, and lattice QCD by the Monte Carlo method

Rota's curriculum vitae of 1996, as archived in 1999
([`../04_ROTA/Rota_CV_1996_archived_1999-02-19.txt`](../04_ROTA/Rota_CV_1996_archived_1999-02-19.txt), lines 53–57;
record `q-gian-carlo-rota-gian-carlo-rota-curr-17af8a7f`):

> Consultant:
>
> Los Alamos Scientific Laboratory, 1966-.
> The Rand Corporation, 1966-1971.
> Brookhaven National Laboratory, 1969-1973.

MIT News Office, April 1999 (record `q-mit-news-office-mit-professor-gian-c-ba2670d5`):

> "He had been a consultant to the Los Alamos Scientific Laboratory since 1966, and for the Rand
> Corporation from 1966-71 and Brookhaven National Laboratory from 1969-1973."

J. J. O'Connor and E. F. Robertson, MacTutor History of Mathematics (record
`q-j-j-o-connor-and-e-gian-carlo-rota-1932-c83f517c`):

> "Rota was also a consultant with the Rand Corporation from 1966 to 1971 and with the Brookhaven
> National Laboratory from 1969 to 1973."

The same CV, under its heading "Security Clearances:" (lines 252–256):

> Security Clearances:
>
> Top Secret  Clearance (Air Force) 1969-1971.
> Q - Clearance (DOE), 1966-.
> SI - Clearance (NSA), 1981-.

and under "Honors:" (line 79) and "Prizes:" (line 69):

> Director's Office Fellow, Los Alamos National Laboratory, 1971-.

> Medal for Distinguished Service, National Security Agency, 1992.

The report in the trial record on the laboratory's standing
([`../01_TRIAL/EXHIBIT_A_report.md`](../01_TRIAL/EXHIBIT_A_report.md):766–769):

> "Brookhaven National Laboratory is a Department of Energy laboratory. Its founding purpose was
> Atomic Energy Commission research; its modern computational programme is built on Monte Carlo and
> lattice gauge theory, as its own 2005 retrospective states. Los Alamos is the other Atomic Energy
> Commission laboratory of the Super period."

The report in the trial record, [`../01_TRIAL/EXHIBIT_A_report.md`](../01_TRIAL/EXHIBIT_A_report.md),
section "Monte Carlo becomes the discrete lattice, at Brookhaven" (lines 355–384), with its
endnotes 97 to 102 (lines 1271–1282), which carry the published sources:

> The method did not stay at Los Alamos. On 26 to 28 April 1948, at an Atomic Energy Commission 
> information meeting at Brookhaven National Laboratory, Ulam presented “Statistical Methods for 
> Problems Involving Equations of the Diffusion Type (Monte Carlo)” — the method carried to a 
> second national laboratory in the year after that laboratory opened.

> Thirty-one years later the same laboratory used it to make quantum field theory computable. In 
> 1979 Michael Creutz, Laurence Jacobs and Claudio Rebbi, all of the Physics Department at 
> Brookhaven, published “Experiments with a Gauge-Invariant Ising System” and then “Monte Carlo 
> Study of Abelian Lattice Gauge Theories,” which carries the laboratory report number BNL-26307; 
> in April 1980 Creutz published “Monte Carlo Study of Quantized SU(2) Gauge Theory.” The 
> construction is the one this report has been following: take a continuous quantum field theory, 
> replace spacetime with a discrete lattice, and generate the field configurations by random 
> sampling. Brookhaven treats that work as foundational in its own account. Dedicating a 
> supercomputer in December 2005, the laboratory simultaneously marked the “25th anniversary of a 
> scientific paper describing the first use of Monte Carlo methods and lattice gauge calculations 
> in the study of quantum chromodynamics (QCD).”

> The machines that followed were built for that calculation and for nothing else. QCDSP, built 
> with Columbia University and installed at Brookhaven in 1998, was a massively parallel computer 
> intended primarily for lattice gauge simulations, and took the Gordon Bell Prize for price and 
> performance that year. Its successor QCDOC — QCD On a Chip — was designed around the same 
> calculation, its architecture described by its builders as “optimized for lattice QCD 
> calculations,” and began operation at Brookhaven in 2005.

> Rota was a consultant to Brookhaven National Laboratory from 1969 to 1973, by his own 
> curriculum vitae, in the same years he consulted for the RAND Corporation and for Los Alamos. 
> The sampling method Ulam proposed and von Neumann took up was presented by Ulam at Brookhaven 
> in 1948, and Brookhaven is where that method was turned on the continuum of quantum field 
> theory and where the machines for doing so were then built.

The same report, section "The two laboratories" (lines 766–782):

> Ulam presents Monte Carlo at the Atomic Energy Commission Information Meeting at Brookhaven, 
> 26–28 April 1948, and returns to give talks in 1956, 1965 and 1978. John Pasta holds a 
> Brookhaven physics research fellowship around 1948–51 working on quantum electrodynamics, then 
> moves to Los Alamos to work with Metropolis on MANIAC and with Ulam on nonlinear computational 
> physics. Rota is a consultant at Los Alamos from 1966, at RAND from 1966 to 1971, and at 
> Brookhaven from 1969 to 1973 — a period in which all three run at once. He holds a Department 
> of Energy Q clearance from 1966 and a National Security Agency special intelligence clearance 
> from 1981, both to the end of his life, and a standing Director’s Office fellowship at Los 
> Alamos from 1971.

> The Brookhaven consultancy is recorded by MIT’s own news office, by the MacTutor biography and 
> by Rota’s curriculum vitae. The Los Alamos relationship produced sixteen joint publications 
> with

Its endnotes 97 to 101, verbatim:

> 97. Stanislaw M. Ulam, “Statistical Methods for Problems Involving Equations of the Diffusion 
> Type (Monte Carlo),” A.E.C. Information Meeting, Brookhaven National Laboratory, April 26-28, 
> 1948, Brookhaven National Laboratory report BNL-17, p. 27 ff. The bibliographic record, with 
> meeting, dates, title, opening page and report number, is reproduced in the University of Utah 
> and Sandia bibliography of Ulam's publications. 
> https://netlib.sandia.gov/bibnet/authors/u/ulam-stanislaw-m.html

> 98. Michael Creutz, Laurence Jacobs and Claudio Rebbi, “Experiments with a Gauge-Invariant 
> Ising System,” Physical Review Letters 42, 1390, 21 May 1979, DOI 10.1103/PhysRevLett.42.1390; 
> Michael Creutz, “Confinement and the Critical Dimensionality of Space-Time,” Physical Review 
> Letters 43, 553, 20 August 1979, DOI 10.1103/PhysRevLett.43.553; Michael Creutz, Laurence 
> Jacobs and Claudio Rebbi, “Monte Carlo Study of Abelian Lattice Gauge Theories,” Physical 
> Review D 20, 1915-1922, 15 October 1979, DOI 10.1103/PhysRevD.20.1915, issued as Brookhaven 
> report BNL-26307. The affiliation printed on the Physical Review D paper is the Physics 
> Department, Brookhaven National Laboratory, Upton, New York.

> 99. Michael Creutz, “Monte Carlo Study of Quantized SU(2) Gauge Theory,” Physical Review D 21, 
> 2308-2315, 15 April 1980, received 24 October 1979, DOI 10.1103/PhysRevD.21.2308. The mature 
> program is set out in Michael Creutz, Laurence Jacobs and Claudio Rebbi, “Monte Carlo 
> Computations in Lattice Gauge Theories,” Physics Reports 95 no. 4, April 1983, pp. 201-282, DOI 
> 10.1016/0370-1573(83)90016-9.

> 100. Brookhaven National Laboratory, “Lab Celebrates New Supercomputer,” 1 December 2005, 
> marking the dedication of QCDOC and the twenty-fifth anniversary of the first use of Monte 
> Carlo methods and lattice gauge calculations in the study of quantum chromodynamics, and naming 
> Creutz, Jacobs and Rebbi. https://www.bnl.gov/newsroom/news.php?a=110400

> 101. On QCDSP: Robert D. Mawhinney, “The 1 Teraflops QCDSP Computer,” Parallel Computing 25, 
> 1999, DOI 10.1016/S0167-8191(99)00051-4; RIKEN-BNL Research Center institutional history, 
> recording the 1997 construction agreement with Columbia University, installation at Brookhaven 
> in 1998 and the 1998 Gordon Bell Prize for price and performance. 
> https://www.bnl.gov/riken/history.php On QCDOC: N. H. Christ et al., “QCDOC: A 10-Teraflops 
> Scale Computer for Lattice QCD,” Nuclear Physics B — Proceedings Supplements, 2001, describing 
> an architecture “optimized for lattice QCD calculations”; Brookhaven National Laboratory, 
> “Lattice QCD,” RIKEN-BNL Research Center, and Brookhaven's retrospective on QCDOC's retirement, 
> which describes it as a special purpose machine dedicated to fundamental physics and names 
> Creutz as one of the founders of the approach. https://www.bnl.gov/riken/research/lattice.php 
> https://www.bnl.gov/newsroom/news.php?a=22647

The reports compiled at the author's direction in September 2026, held at
[`../12_SINGULARITY/ChatGPT_Logs/`](../12_SINGULARITY/ChatGPT_Logs/), include
*Documented Computational and Institutional Continuities Across the U.S. Atomic Energy Commission
Laboratory System: Fermi, Ulam, von Neumann, Metropolis, Pasta, Rota, and the Brookhaven
lattice-QCD program*, whose section 4, "Brookhaven: Documented Computational Sequence", cites the
same publications.

## 2. "A P=NP hyper-computer"

DeSciX Whitepaper, Abstract ([`DeSciX_Whitepaper.md`](DeSciX_Whitepaper.md), copied here from the
platform's documentation with its own superseded-model banner intact):

> "DeSciX offers a fundamentally different future, particularly for technologies as potentially
> world-changing as the **EGPT Community's FRAQTL Hyper Computer**, which aims to surpass quantum
> computing using classical hardware."

The EGPT community's press release of 1 April 2026
([`Press_Release_2026-04-01.md`](Press_Release_2026-04-01.md)):

> "The EGPT community today opened enrollment in 18.313x — an AI-enabled open course built on 90
> years of MIT mathematics, from von Neumann and Ulam's Manhattan Project through Gian-Carlo Rota's
> legendary probability course to three machine-verified proofs that P = NP."

> "Von Neumann built the first computer at the Manhattan Project. On his deathbed, he wrote the
> blueprint for its replacement: integer-only, statistical, modeled on the human brain. He died
> before building it. His collaborator Ulam passed it to Rota. Rota taught it at MIT — but only his
> students ever saw the math."

## 3. The three Lean proofs of P = NP

The proof tree is [`../08_LEAN/`](../08_LEAN/README.md), mirrored byte for byte from the public
repository eabadir/EGPT-Lean, branch `lean-archive-proofs`. The three capstones:
[`P_eq_NP`](../08_LEAN/EGPT/InformationTheory/Complexity/SetRFL.lean#L501),
[`P_eq_NP_info`](../08_LEAN/EGPT/InformationTheory/Complexity/PPNP.lean#L815),
[`P_eq_NP_info_standard`](../08_LEAN/EGPT/InformationTheory/Complexity/StandardComplexity.lean#L185).
[`../08_LEAN/PROOF_CHAINS.md`](../08_LEAN/PROOF_CHAINS.md) explains the three chains:

> "Each chain approaches the same mathematical fact from a different angle, and all three compile
> in Lean 4 with zero `sorry` and only the standard constructive axioms `propext` and `Quot.sound`."

The build report of 15 May 2026,
[`../06_LEAN_MATHLIB/lean_source/EGPT_AXIOM_FLAGS.md`](../06_LEAN_MATHLIB/lean_source/EGPT_AXIOM_FLAGS.md),
summary rows:

> "| P=NP capstones close to `{propext, Quot.sound}` (no Classical.choice) | **3 / 3** ✅ (`P_eq_NP`, `P_eq_NP_info`, `P_eq_NP_info_standard`) |"

and its axiom table
([`EGPT_PROOFS_VALIDATION.md`](../06_LEAN_MATHLIB/lean_source/EGPT_PROOFS_VALIDATION.md)):

> "| `P_eq_NP_info` | `propext`, `Quot.sound` | OK |"

> "| `P_eq_NP_info_standard` | `propext`, `Quot.sound` | OK |"

### The Mathlib submissions and Mario Carneiro's standard

The two pull requests to leanprover-community/mathlib4 are public:
<https://github.com/leanprover-community/mathlib4/pull/37468> (opened 2026-04-01) and
<https://github.com/leanprover-community/mathlib4/pull/38824> (opened 2026-05-01). Their bodies
and the GitHub API captures are in [`../06_LEAN_MATHLIB/`](../06_LEAN_MATHLIB/mathlib-pr-submissions.md).
The closing comment on #38824, verbatim and in full:

> "The LLM-generated code in this PR fails to meet our standards, and the content is out of
> scope for this library. We invite you to host this content as part of a downstream
> repository."

Mario Carneiro on the Lean Zulip, 26–28 April 2025, in the thread "Request for Feedback: Lean 4
Proof related to P=NP"
([`../06_LEAN_MATHLIB/lean-zulip-2025-04-request-for-feedback-p-eq-np.md`](../06_LEAN_MATHLIB/lean-zulip-2025-04-request-for-feedback-p-eq-np.md),
PDF capture beside it), after quoting back the three axioms the early proof rested on:

> "Certainly, it follows from these three assumptions that P = NP. I don't know what are the
> shannon entropy problem and the physical system entropy problem, but the result here suggests
> that you should really dig into these because at least one of these assumptions is probably
> faulty."

> "Note, people will not really fully accept this proof until it has zero axioms. But I think
> it's fine to be exploring these concepts in lean using axiom. I just suggest you refrain from
> announcing that you've proved P = NP until you actually have no assumptions and lean is not
> reporting errors, and even then it's going to draw an extreme level of skepticism and it is
> more tactful to say you are working on a proof of shannon's coding theorem and/or Rota's
> entropy theorem rather than leading with P=NP."

## 4. The licence roles

The DeSciX Community License, v1
([`DeSciX_Community_License_v1.pdf`](DeSciX_Community_License_v1.pdf)), "Token Distribution":

> "The distribution of tokens for various roles within the DeSciX ecosystem (e.g., Witness
> Validators, DApp Developers, Network Operators, Referrers) will be governed by the DeSciX DPoS
> White Paper."

## 5. Media

FRQTL promo video, for embedding: <https://youtu.be/jwMhAf1ej2I>.
