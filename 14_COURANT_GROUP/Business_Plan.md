<!-- DRAFT by the assistant, 28 September 2026, to the author's brief and his rulings of the same day; his pass -->
# Courant Group, LLC: business plan, public version

## 1. Executive summary

**Company.** Courant Group, LLC licenses the FRQTL technology commercially. FRQTL is a
discrete physics engine and the AI stack built on it: Maxi, a vision-language-action (VLA) model
that imagines physical outcomes by running a world forward instead of recalling one. Courant
Group is a US company, and every licence it grants is subject to US export controls.

**The model.** DeSciX gives open source an economic model. In the author's words, it is "open
inside, value return outside" (Essam Abadir, decisions record 093b2d6, 28 September 2026). Inside
the egpt community on DeSciX, the FRQTL and EGPTMath engines are open. Outside it, a company that
wants FRQTL in a product buys a commercial licence from Courant Group, and part of what it pays
comes back to the people who built the work.

**One flow of value.** Courant Group sells commercial licences to FRQTL. Of all licence
revenue, a minimum of 10 percent goes to buying back community tokens on the open market through
the DeSciX treasury. In the first year, Courant Group commits 50 percent of licence revenue to
that buyback. Section 7 sets out the mechanism.

**What is licensed.** The Maxi VLA stack, the FRQTL engines, the Rust source libraries behind
them, and the tools used to build with them (STUDIO and Rosetta). These are licensed for custom
builds, for integration into products, and for resale. Section 3 lists them.

**Enterprise licences.** A restricted number of enterprise licences, ten, are offered at
escalating prices: $10 million for the first licence, rising to $100 million for the last, about
$50 million on average. They carry no equity. Each is negotiated individually, subject to where
the licensee is domiciled under export controls and to how its exclusivity is defined, by
geography, by industry, or both. Section 6 has the schedule.

**The market.** Robotics AI is a young industry. It is valued by what private investors pay for
it, not yet by revenue. Since September 2025, robotics foundation-model companies have raised
rounds at valuations from $3.5 billion to $39 billion. Section 5 lists them event by event, with
sources.

**How to ask.** Licence requests go through the request form on courantgroup.com, the business
licensing site. Section 8 lists what it asks.

## 2. The model: open inside, value return outside

The DeSciX model separates two audiences.

- **Inside the community.** Researchers, developers and contributors in the egpt community use
  the open engines, build on them, and earn EGPT tokens for their contributions. How
  contributions are rewarded is in [../guide/make-money.md](../guide/make-money.md) and
  [../guide/get-involved.md](../guide/get-involved.md).
- **Outside the community.** A company that puts FRQTL into a commercial product, or resells it,
  licenses it from Courant Group. The licence fee is the value that returns to the community.

Courant Group is therefore the commercial door to a technology that is partly open, in the way
an open-core company sells licences to a codebase whose core anyone can read. What is open is
defined in section 3, and what returns to the community is defined in section 7.

## 3. What Courant Group licenses, and what is open

**Open today.** The FRQTL engine and the EGPTMath engine are distributed as WebAssembly around
compiled Rust. Anyone can run them. The running engine is at <https://egpt-frqtl.descix.net>, and
what it does is described in [../guide/robotic-imagination.md](../guide/robotic-imagination.md).

**Closed.** Everything above the engine is closed. Certain other proprietary implementations are
not disclosed at all.

**Licensed by Courant Group.**

| What | For |
|---|---|
| The Maxi VLA stack | Robotics and embodied-AI products that need to predict physical outcomes before acting |
| The FRQTL engines | Integration into products and platforms, in custom builds |
| The Rust source libraries | Custom builds, ports and optimisation for a licensee's hardware |
| STUDIO and Rosetta, the tools | Building, inspecting and translating FRQTL worlds and programs |
| Resale rights | Resellers and integrators who package FRQTL for their own customers |

Every licence can be for software, or for hardware designs where the licensee builds FRQTL into
silicon. The request form asks which.

**Services are outside the licence.** Support, integration and consulting are sold separately.
Their cost is labour and infrastructure, so they are not part of the licence revenue that funds
the buyback in section 7.

## 4. The technology

**FRQTL.** FRQTL is a physics engine that does not compute forces. Its state is integer ticks
of time, pixels of space, and whether a pixel is occupied. Particles move by local, probabilistic
rules, and physical behaviour emerges from many of them running forward together. Maxi, the VLA
model, is built on it: to decide what to do, it runs candidate actions forward in a FRQTL world
and looks at what happens. [../guide/robotic-imagination.md](../guide/robotic-imagination.md) is
the collection's account of why that matters.

**The Faster Abadir Transform (FAT).** Inside FRQTL, the FAT is the transform that plays the role
the Fast Fourier Transform (FFT) plays in conventional computing. It is built to be a drop-in
replacement behind the same interfaces as common FFT libraries. It works in integer operations,
so it does not accumulate the rounding error that floating-point FFTs carry from step to step.

**Measured performance.** The collection's letter on the decision to publish compares FRQTL
with the largest published GPU simulation of the quantum Fourier transform:

> "Willsch et al. (*Mathematics* 2023, 11, 4222) ran their simulation on 2,048 NVIDIA A100 GPUs
> on the JUWELS Booster at Jülich — roughly 80 TiB of aggregate GPU memory, 594 core-years of
> study compute — … FRQTL does that same 39-bit case in roughly 210 milliseconds on one 1.2 GHz
> CPU core with 768 MB of RAM — about a fifth of a core-second. The wall-clock gap is a factor of
> a thousand; the hardware is something like a million times cheaper; the effective efficiency
> gain is on the order of 10⁹."

Source: [../07_LETTERS/all-in-update-letter-decision-to-publish.md](../07_LETTERS/all-in-update-letter-decision-to-publish.md).

**The FRQTL patent.** The patent application behind FRQTL is US 2026/0127327 A1, *Quantum
Computing Fractal Compression and Decentralized Computing for Predictive Physics Simulation*,
filed 6 November 2024 and published 7 May 2026. It is in the collection at
[../11_PATENT/README.md](../11_PATENT/README.md). The DeSciX Community Agreement tokenizes it
into an IP pool; see [../guide/make-money.md](../guide/make-money.md).

**Rigour.** The mathematics underneath, Electronic Graph Paper Theory (EGPT), is formalised in
Lean 4, and the proofs are open for anyone to check.

## 5. The market: robotics AI, measured by what investors pay

Robotics AI has no revenue history to model from. What it has is a dense record of priced
funding events, and that record is the best available measure of what the market thinks a
robotics foundation model is worth. The events below come from company announcements and trade
press, and each row names its source.

### The thesis the market is pricing

The author's industry report, *Robotic Imagination* (August 2026), surveys the frontier robotics
labs. It finds the same weakness at every one of them. Each lab builds its model of the physical
world as a compression of what has already been observed, and each is strongest at describing
what happened and weakest at predicting what happens next. The report argues that this is the
long-felt need FRQTL answers: a generator that produces physical outcomes nobody encoded into it.
It will be quoted here once it is in the collection.

### Priced events, September 2025 to August 2026

| Date | Company | What it builds | Event | Amount | Valuation | Source |
|---|---|---|---|---|---|---|
| 16 Sep 2025 | Figure | Humanoid robots and their AI | Series C | more than $1 billion committed | $39 billion post-money | [Figure](https://www.figure.ai/news/series-c) |
| Nov 2025 | Physical Intelligence | Robotics foundation models (π0) | Series B, led by CapitalG | $600 million | $5.6 billion | [Dealroom](https://app.dealroom.co/news/feed/physical-intelligence-raises-1-6b-across-two-rounds-valuation-hits-11-2b) |
| 14 Jan 2026 | Skild AI | Robotics foundation model (Skild Brain) | Series C, led by SoftBank | $1.4 billion | more than $14 billion, up from $4.5 billion in summer 2025 | [TechCrunch](https://techcrunch.com/2026/01/14/robotic-software-maker-skild-ai-hits-14b-valuation/) |
| Feb 2026 | Apptronik | Humanoid robots | Series A extension | $520 million, in a round totalling $935 million | not stated | [Crunchbase News](https://news.crunchbase.com/robotics/startup-venture-funding-surges-2026-data/) |
| 18 Feb 2026 | World Labs | Spatial-intelligence world models | Funding round | $1 billion | about $5 billion, as reported | [Reuters via Yahoo Finance](https://finance.yahoo.com/news/ai-pioneer-fei-fei-lis-202957884.html) |
| 9 Mar 2026 | AMI Labs | World models (JEPA) | Funding round | $1.03 billion | $3.5 billion pre-money | [TechCrunch](https://techcrunch.com/2026/03/09/yann-lecuns-ami-labs-raises-1-03-billion-to-build-world-models/) |
| 27 Mar 2026 | Physical Intelligence | Robotics foundation models | Round reported in talks, led by Founders Fund | $1 billion | more than $11 billion, as reported | [TechCrunch](https://techcrunch.com/2026/03/27/physical-intelligence-is-reportedly-in-talks-to-raise-1-billion-again/) |
| Jun 2026 | Neura Robotics | Cognitive robots | Series C | $1.4 billion | not stated | [Crunchbase News](https://news.crunchbase.com/robotics/startup-venture-funding-surges-2026-data/) |
| 6 Aug 2026 | Unitree Robotics | Humanoid and legged robots | STAR Market IPO, preliminary pricing | about 40.45 million new shares, 10 percent of enlarged capital, at about 104 yuan | could exceed 40 billion yuan ($5.9 billion) after the IPO | [Shanghai Stock Exchange](https://english.sse.com.cn/news/newsrelease/voice/c/c_20260806_10828128.shtml) |
| 24 Aug 2026 | XPENG Robotics | Humanoid robots (IRON) | Private round, led by IDG Capital | more than $900 million | more than $6.3 billion post-money | [XPENG](https://www.xpeng.com/pressroom/news/01a03797fccda01e0de68a02a256006a) |

### The totals

| Measure | Figure | Source |
|---|---|---|
| Robotics venture funding, full year 2025 | $15 billion | [Crunchbase News, 22 Jun 2026](https://news.crunchbase.com/robotics/startup-venture-funding-surges-2026-data/) |
| Robotics venture funding, 2026 to 22 June | $18.8 billion, above the previous peak of $14.1 billion in 2021 | same |
| Physical-AI funding, first half of 2026, including autonomous vehicles and defence | $47.4 billion across 521 deals | [Crunchbase News, 18 Aug 2026](https://news.crunchbase.com/venture/physical-ai-funding-startups-robotics-aerospace-h1-2026/) |
| Humanoid-robotics venture investment, 2026 to date | $8.7 billion, double 2025's full-year record | [Dealroom](https://dealroom.co/resources/humanoid-robotics/) |

### How to read it

- **Software alone is priced in the billions.** Skild AI, Physical Intelligence, World Labs and
  AMI Labs make models, not robots. Their latest rounds valued them between $3.5 billion
  (AMI, pre-money) and more than $14 billion (Skild). That is the comparable for a licence to a
  robotics world model, and it is the reason the enterprise schedule in section 6 starts where
  it does.
- **The valuations move fast.** Skild's roughly tripled in about seven months, and Physical
  Intelligence's reported round would double its valuation in four.
- **Hardware makers buy the model layer.** The humanoid companies (Figure, Apptronik, Neura,
  Unitree, XPENG) each need a model that predicts what happens when the robot acts. They are
  licensees for FRQTL, not competitors to it.

## 6. Licensing

**Open licensing, with a restricted enterprise tier.** Any company can ask for a licence
through the form in section 8. Alongside the ordinary licences, Courant Group offers a restricted
number of enterprise licences at escalating prices.

| Enterprise licence | Price |
|---|---|
| First | $10 million |
| Second to ninth | escalating between the first and the last |
| Tenth, the last | $100 million |
| Average across the ten | about $50 million |

These terms are exemplary. Every licence is negotiated individually, and none carries equity in
Courant Group. Two things shape every negotiation:

- **Domicile and export controls.** Courant Group is a US company. Where a licensee is domiciled,
  and where the licensed technology will go, decide whether a licence can be granted and on what
  terms.
- **Exclusivity.** Exclusivity is defined licence by licence, by geography, by industry, or both.

**Other licences.** Custom-build licences, product-integration licences and reseller licences
are priced to the use. The request form collects what Courant Group needs to quote them.

**Neutrality.** Courant Group licenses the technology and does not build competing robots or
chips. The company that designs the processor and the company that builds the humanoid can both
license FRQTL without licensing from a rival.

## 7. Value return to the community

Two streams of value go back to the community, both through the DeSciX treasury, as the DeSciX
token plan ratified on 1 July 2026 (decision D4) provides:

- **Off-platform licences.** A minimum of 10 percent of Courant Group's licence revenue funds
  buybacks of community tokens on the open market. Courant Group can pay more than the minimum
  and intends to, to reward participation. In the first year it commits 50 percent of licence
  revenue.
- **On-platform use.** When people and agents use the egpt community's apps on DeSciX, the
  platform's sales of AI credits fund buybacks of the community's tokens, in proportion to how
  much each community's apps are actually used.

The token is EGPT, a standard ERC-20 token that trades freely. Tokens are awarded to
contributors under the DeSciX Community Agreement; see [../guide/make-money.md](../guide/make-money.md).
Buybacks from licence revenue raise demand for the same token contributors earn, and that is how
the value of commercial use returns to the people whose work made it possible.

## 8. How to request a licence

courantgroup.com is Courant Group's business licensing site. It carries the licensing request
form, which asks:

| Field | What it asks |
|---|---|
| Who | the requester's name and role |
| Organisation | the company or institution, and where it is domiciled |
| Intended use | what the licensee will build or sell with FRQTL |
| Scale | how many units, users, deployments or seats |
| Hardware or software | whether FRQTL goes into software, into hardware designs, or both |
| Timeline | when the licensee needs it |
| Contact | how Courant Group reaches the requester |

Courant Group answers each request individually.

## 9. Strategy

**Why a licensor.** Arm built a global franchise by licensing designs to competing chipmakers
rather than making chips itself. Its lesson is that a licensor's most valuable asset is the
ecosystem's trust in its neutrality. Courant Group follows that model and adapts it in two ways.

- **Open core.** Arm's strongest competitor today, RISC-V, is free and open. A new licensor cannot
  win with a closed standard against a free one. So the engine is open inside the community and
  the commercial stack is licensed outside it, the way Red Hat sells what Linux gives away.
- **Priced to the use.** The enterprise tier is priced by licence, not per chip, because the value
  of a world model lies in what it lets the licensee's product do, not in the silicon it runs on.

**Who licenses first.** Robotics and embodied-AI companies, which need a model that predicts
physical outcomes; the makers of the processors those robots run on; and the platforms that train
and simulate them.

## 10. Founder

Essam Abadir is the founder of Courant Group and the sole inventor of FRQTL and the FAT. He
studied applied mathematics at MIT under Gian-Carlo Rota, and holds a second MIT bachelor's
degree, in operations research from the Sloan School, and a JD. His career has been in high-performance computing systems and in intellectual
property: he has been a systems architect and an IP counsel, and he is an inventor on patents in
video streaming, compression and distributed computing.

## 11. What is public and what is not

This plan is public and is the plan of record. Some material from the earlier plan is held in a
separate NDA addendum and is available to prospective licensees under a non-disclosure agreement.
The addendum holds these sections, named by their headings in the earlier plan:

- **Licensing fee schedules:** "Priority Licensee Sectors: Exemplary Partners, Market Size, and
  Licensing Model"; "Notes on Licensing Terms"; "Example Calculation (AI Compute Cloud)".
- **Financial projections:** "Royalty and IP Licensing Revenue Potential (5–10 Year Outlook)";
  "Market Value Enabled by FAT in Each Segment"; "7.2 The Economic 'Floor'"; and, under
  "Financial & Strategic Implications", the parts "Market Size and Growth Support Upside" and
  "Exit and Value Creation Potential".
- **Named counterparties:** the named prospective licensees, partners and investors, including
  those under "Strategic Leverage and Optionality" and "Table 2: Incumbent Market Capitalization
  at Risk", and the founder's named prior exits.

[README.md](README.md) records which source this plan was cut from.
