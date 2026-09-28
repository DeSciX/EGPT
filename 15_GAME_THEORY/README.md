# 15_GAME_THEORY — the token economy and its history

The documents of the economic model behind DeSciX and the EGPT token, in the order they were
written: the DAITA whitepaper of 25 September 2023, the DeSciX whitepaper of 2025, the DeSciX
Community License of 30 January 2026, and the token plan ratified on 1 July 2026. This README
quotes each under its own date, sets the roles they name side by side, and quotes the licence's
clauses on communities and their apps. The guide's page on the token economy opens
([../guide/make-money.md](../guide/make-money.md) lines 4 and 5):

> Show me the incentives, and I'll show you the outcome - Charlie Munger

> Rota's unnamed branch of mathematics is foundationally intertwined with what you know as
> "game theory", or, what I would call non-linear dynamics amongst individuals.

## Files

| File | What it is |
|---|---|
| [DAITA_Whitepaper_2023-09-25.md](DAITA_Whitepaper_2023-09-25.md) | *DAITA: A Sustainable Data Economy For Artificial Intelligence*, Essam E Abadir, dated September 25, 2023: the Daita token economy, its roles (with healthcare as the worked example), its market-efficiency protocols, its incentive fractions per role, and its governance. Captured from the author's Google Doc on 28 September 2026; the front matter states the copy read and what the text export did to the figures, equations and table |
| [DeSciX_Token_Plan_2026-07-01.md](DeSciX_Token_Plan_2026-07-01.md) | Decisions D1, D2, D4 and D5 of the DeSciX token plan ratified on 1 July 2026, copied from the platform's documentation; the front matter states what is reproduced and what is elided |

Held in [`../14_COURANT_GROUP/`](../14_COURANT_GROUP/README.md) and read with this section:

| File | What it is |
|---|---|
| [../14_COURANT_GROUP/DeSciX_Whitepaper.md](../14_COURANT_GROUP/DeSciX_Whitepaper.md) | *DeSciX Whitepaper: Community Source Science & The Intellectual Property IPO*, copied from the platform's documentation on 28 September 2026; the author's original PDF is dated 17 April 2025 |
| [../14_COURANT_GROUP/DeSciX_Community_License_v1.pdf](../14_COURANT_GROUP/DeSciX_Community_License_v1.pdf) | *The DeSciX Community License Membership Agreement*, v1, dated January 30, 2026. Its text, converted from the same source, is [../08_LEAN/Archive/LICENSE.md](../08_LEAN/Archive/LICENSE.md); the line numbers below are that file's, and the page numbers the PDF's |
| [../14_COURANT_GROUP/Business_Plan.md](../14_COURANT_GROUP/Business_Plan.md) | The Courant Group business plan, public version, which states that Courant Group licenses FRQTL commercially and returns part of the licence revenue to the community |

## The history of the economic model

### 25 September 2023: the DAITA whitepaper

The paper proposes Community Source
([DAITA_Whitepaper_2023-09-25.md](DAITA_Whitepaper_2023-09-25.md):17):

> DAITA aims to provide that in the form of Community Source - a decentralized community that
> anyone can join, everyone who joins has economic ownership in, and gaining access can be done
> through contributing to the community, or, by buying in with fiat currency.

It states how creators acquire tokens (line 62):

> That is, creators gain Daita Tokens in exchange for their data and IP contributions.

and who mines them (line 117):

> **Witness-Validators (WV):** Witness-Validators are responsible for mining Daita Tokens.

Section II defines the roles (lines 116 to 127, set side by side in the table below). Section III
gives the incentive fractions per role, which it introduces this way (line 160):

> The fractions to each of the representative participants are exemplary, and in production will
> be drawn from the economic model referenced above:

For fees collected through DApps, the export's merged table gives the roles cell as
`Node Operators (NO) or Resellers (RS)\*\* / DApp Developer / Into Treasury / Foundation (F) (\*\* accrues to NO in absence of RS)`
and the fractions cell as `0.08 / 0.05 / 0.65 (0.20\* token supply reduction) / 0.02` (line 173).
The capture's note on that table (line 175):

> [The two tables above are the export's single merged table, separated by column group; the role
> and fraction cells are transcribed in the order the export gave them.]

Section V gives governance: Governance Tokens that cannot be traded and return to the Treasury at
the end of the calendar year of issuance (lines 179 to 182), and a Foundation board of five
members, three of them elected (line 183).

### 2025: the DeSciX whitepaper

The whitepaper describes community tokens and how they are earned
([../14_COURANT_GROUP/DeSciX_Whitepaper.md](../14_COURANT_GROUP/DeSciX_Whitepaper.md):27):

> Instead of equity sold to VCs, DeSciX utilizes **Community Tokens** (like EGPT) representing a
> direct, verifiable stake in the community's IP. This ownership is **earned through
> contribution** – building Apps, creating knowledge (KBs/CodeSites), growing the network, or
> engaging constructively – tracked via points (DIP/REF/REP) and distributed via Airdrops.

The licence's words on what a token is stand beside this and the whitepaper's line 162 under
*What a token is, in each document's words*, below.

Its `daita` unit is anchored in two places, to USDCI (line 350):

> Its value is anchored to USDCI (see Appendix B)

and to USDC (line 397):

> `1,000,000 daita = 1 USDC` (This parameter is set by the DAO and anchors internal computational value).

It gives app creators "a significant share (e.g., 60%) of fees" (line 176) and the community
treasury "a share (e.g., 40%) of App usage fees" (line 187). Its enterprise split, 30 percent to
the app creator, 20 percent to the treasury and 50 percent to knowledge creators by DIP (line
444), sits under the heading "**Enterprise Licensing Fee (Example):**" (line 442). It says the
`DAITA_v2` contract of each community runs an auction (line 166):

> Alongside earned ownership via Airdrops, the `DAITA_v2` smart contract for each Community runs
> an automated **token auction**.

priced by `Price_per_Token (USDC) = Initial_Price * (Escalator ^ n)` (line 410). The copy of the
whitepaper held carries a banner, dated 2026-07-01, at its head (line 3):

> **SUPERSEDED ECONOMIC MODEL (2026-07-01).** This founding whitepaper's auction pricing
> (`Price = Initial_Price * Escalator^n`), IP-IPO 5-phase lifecycle, lot-based escalation, and
> STAKED status are SUPERSEDED

and the banner ends:

> Kept as historical record.

What the whitepaper says of the 2023 paper. For the treasury after the IP-IPO (line 187):

> These tokens effectively increase the scarcity for all holders or can be used by the DAO
> post-IP-IPO for ecosystem initiatives (like funding grants or managing token supply
> algorithmically, per the Daita Whitepaper principles).

and at maturity (line 231):

> The DAO may implement algorithmic treasury functions (per Daita WP) to manage token supply based on ongoing economic activity.

Its reference to the paper is under *The DeSciX DPoS White Paper, as the documents name it*, below.

### 30 January 2026: the DeSciX Community License, v1

The licence states the principle "open inside, value-return outside"
([../08_LEAN/Archive/LICENSE.md](../08_LEAN/Archive/LICENSE.md):14, PDF p. 1), as the 2025
whitepaper also does ("Open Inside, Value-Return Outside",
[../14_COURANT_GROUP/DeSciX_Whitepaper.md](../14_COURANT_GROUP/DeSciX_Whitepaper.md):49), and
names how outside value returns (line 14, PDF p. 1):

> the strong expectation and guiding principle is that any resulting value flows back into the
> ecosystem, often through mechanisms supporting the relevant Community or DeSciX tokens (e.g.,
> purchasing tokens with proceeds, akin to contributing to a university endowment or funding
> research grants).

It routes economic activity through tokens (line 44, PDF p. 3):

> The licenses granted under this Agreement are expressly conditioned upon Your compliance with the
> requirement that all economic activity involving Community IP, DeSciX Community Software, DPaaS
> Service Offerings, or Apps—including access, usage, monetization, licensing, sublicensing,
> resale, bundling, advertising monetization, subscription monetization, or derivative
> commercialization—**be routed through the DeSciX token economy** using the relevant DeSciX
> and/or COMMUNITY tokens, unless expressly approved in writing by the DeSciX DAO or required by
> law.

It prices off-platform distribution (line 383, PDF p. 14):

> Distribution of Community IP or App Works outside the DeSciX platform (including books,
> executables, datasets, or packaged software) triggers a **10% royalty** on all reasonably
> related gross revenue, payable in DeSciX or relevant COMMUNITY tokens unless expressly approved
> otherwise.

Its definitions of a token (lines 32 and 212) are quoted in full under *What a token is, in each
document's words*, below.

### 1 April 2026: the EGPT press release

[../14_COURANT_GROUP/Press_Release_2026-04-01.md](../14_COURANT_GROUP/Press_Release_2026-04-01.md):21:

> EGPT operates under the DeSciX Community License — a "community source" model where
> contributing earns tokens in the EGPT DAO. Code, marketing, knowledge, experiments, and
> engagement are tracked and convert to community tokens through periodic airdrops. The
> commercial application (the Faster Abadir Transform) pays a license fee back to the DAO.

### 1 July 2026: the ratified token plan

Four of the plan's decisions are held in
[DeSciX_Token_Plan_2026-07-01.md](DeSciX_Token_Plan_2026-07-01.md). The token (line 13):

> **Token model:** simple ERC20, floats, no transfer restrictions, **no escalating auctions**.

Credits (line 14):

> **Credits:** platform-wide **USD-denominated AI-token credits**; one balance per user;
> consumption debits record `{community_id, app_id, tokens}` attribution.

Buybacks (line 15):

> **Buybacks:** net of op-ex, on-platform sales buy community tokens **from pools, async,
> pro-rata by actual RAG/agent consumption** per community. Off-platform enterprise licenses pay
> **10% royalty**, feeding the same buyback worker.

Chains (line 16):

> **Chains:** **Polygon = airdrop chain** (existing DAITA_v2-class contracts, which are verifiably
> encumbered — transfer-locked before `publicListingDate`, Pausable; …).
> **BNB Chain = clean, unencumbered tokens + real V2-style pools vs USDT** for **EGPT and DAITA**.

The licence of 30 January 2026, on a community's token while the community is private
([../08_LEAN/Archive/LICENSE.md](../08_LEAN/Archive/LICENSE.md):162, PDF p. 7):

> While the COMMUNITY is designated as Private ("in early development/research phase"), its native
> token will not be publicly tradable.

### 27 and 28 September 2026: the guide and the Courant Group plan

The guide states the model in the author's words
([../guide/make-money.md](../guide/make-money.md):9):

> To capture this value I've created the DeSciX Community Agreement and license which distributes
> the value into a crypto token economy - in short, anyone who gets involved can earn the crypto
> representing the value of their contribution. If big companies license the patent the proceeds
> go to token purchases and support of ecosystem behind the technology.

The Courant Group plan, reconciled with the plan of 1 July 2026 and with the author's rulings of
28 September 2026 ([../14_COURANT_GROUP/README.md](../14_COURANT_GROUP/README.md):25–26), prices
its enterprise licences in the token
([../14_COURANT_GROUP/Business_Plan.md](../14_COURANT_GROUP/Business_Plan.md):172–173):

> Acquiring a licence requires EGPT tokens, not
> dollars, so the price scales with the tokens in circulation.

and says of its terms (line 189):

> These terms are exemplary.

It returns licence revenue through buybacks (lines 209–212):

> A minimum of 10 percent of Courant Group's licence revenue funds
> buybacks of community tokens on the open market. Courant Group can pay more than the minimum
> and intends to, to reward participation. In the first year it commits 50 percent of licence
> revenue.

### What a token is, in each document's words

2025, the DeSciX whitepaper
([../14_COURANT_GROUP/DeSciX_Whitepaper.md](../14_COURANT_GROUP/DeSciX_Whitepaper.md):162):

> they represent a **verifiable, fractional ownership stake in the underlying Intellectual
> Property** generated by that Community.

30 January 2026, the DeSciX Community License, "Nature of Tokens"
([../08_LEAN/Archive/LICENSE.md](../08_LEAN/Archive/LICENSE.md):32, PDF p. 2):

> Tokens within the DeSciX ecosystem (DeSciX Tokens and COMMUNITY Tokens) are strictly **License
> Access Keys** and qualification criteria for DAO governance mechanics. They represent a
> revocable license to access services and participate in governance parameters. **Tokens do NOT
> convey title, ownership, intellectual property rights, or equity interest in the DeSciX
> platform, the DeSciX DAO, any COMMUNITY, or the underlying Code and IP.** Voting rights attached
> to tokens are limited to the specific governance parameters defined in the DPoS White Paper and
> do not extend to corporate governance or ownership control of the Licensor entities.

30 January 2026, the same licence, "Definitions" (line 212, PDF p. 8):

> “Token” shall refer to a digital utility asset within the DeSciX ecosystem, serving as a
> **License Access Key** to access services, pay fees, and qualify for participation in
> governance mechanics. Tokens are not intended as investments, equity, or securities. Each
> COMMUNITY typically has its own native token.

27 September 2026, the guide ([../guide/make-money.md](../guide/make-money.md):18–20):

> I've tokenized the patent into an IP pool and I'm sharing it
> with the world by distributing 800M EGPT crypto tokens to people who contribute to Maxi and the
> science behind it.

and [../guide/get-involved.md](../guide/get-involved.md):19–20:

> DeSciX gives open source an economic model: the patent behind Maxi is tokenized into an IP
> pool, and contributions to Maxi, to the science, and to restoring the corpus earn EGPT tokens.

28 September 2026, the Courant Group plan
([../14_COURANT_GROUP/Business_Plan.md](../14_COURANT_GROUP/Business_Plan.md):110–111):

> The DeSciX Community Agreement tokenizes it
> into an IP pool

### The DeSciX DPoS White Paper, as the documents name it

The licence defers the distribution of tokens by role to a document it names the DeSciX DPoS
White Paper ([../08_LEAN/Archive/LICENSE.md](../08_LEAN/Archive/LICENSE.md):443, PDF p. 17):

> The distribution of tokens for various roles within the DeSciX ecosystem (e.g., Witness
> Validators, DApp Developers, Network Operators, Referrers) will be governed by the DeSciX DPoS
> White Paper.

and defines that document (line 210, PDF p. 8):

> “DeSciX DPoS White Paper” shall refer to the document detailing the tokenomics, governance
> mechanics, and reward distribution of the DeSciX Delegated Proof-of-Stake system – the
> **University’s economic and governance charter**.

The DeSciX whitepaper's references list the DPoS white paper and the DAITA whitepaper as two
entries (lines 329 and 331), each with bracketed text where its link would go:

> **DeSciX DPoS White Paper:** [Link or Citation - detailing governance mechanics]

> **DAITA Whitepaper:** Abadir, E. E. (2023). *DAITA: A Sustainable Data Economy For Artificial Intelligence*. [Link to DaitaRoom.com or specific document]

The DAITA whitepaper's front matter records its Drive description
([DAITA_Whitepaper_2023-09-25.md](DAITA_Whitepaper_2023-09-25.md):5):

> The economic principles and delegated proof of stake token economy behind the Daita tokens.

## The roles

Each row places side by side the names the documents give to related activities, with the
locator of each. DAITA lines are in the 2023 paper, whitepaper lines in the 2025 whitepaper,
licence lines in LICENSE.md with the PDF page, and D-numbers in the token plan.

| Activity | DAITA whitepaper, 2023 | DeSciX whitepaper, 2025 | DeSciX Community License, 2026 | Token plan, 1 July 2026 |
|---|---|---|---|---|
| holding tokens | Stakeholders (line 116) | Member (line 379); Staked status (line 385) | Members, "registered token holders who have accepted the DCMA" (line 28, p. 2) | |
| mining and validating | Witness-Validators (line 117) | | Witness Validators (line 443, p. 17); Validators (line 114, p. 5) | |
| contributing data, knowledge or code | Data Providers and Creators (lines 118, 119) | Knowledge/Code Creators, rewarded by DIP (lines 178–179) | "Contributors who build valuable Apps or contribute to the underlying platform" (line 20, p. 2) | |
| governing | Foundation Members, elected by holders of Governance Tokens (lines 120, 183) | "vote of the DeSciX DAO token holders" (line 222); a board "elected bi-annually" (line 502) | constraints "set by the DeSciX DAO ("University Senate")" (line 160, p. 7) | |
| administering and delegated services | Delegates, appointed by the Foundation (lines 121, 184) | Managing Delegate (line 378) | Managing Delegate (line 170, p. 7); "delegates appointed by the DAO membership" (line 26, p. 2) | |
| operating infrastructure | Node Operators (line 122) | | Network Operators (line 443, p. 17) | |
| building apps | Developers, of DApps (line 123) | App Creators (lines 175–177) | DApp Developers (line 443, p. 17); App Creator (line 385, p. 14) | consumption attributed by `app_id` (D2) |
| holding a treasury | Treasury (line 124) | the Community Treasury (lines 186–187) | | |
| buying back tokens | | | | buybacks "from pools" (D4) |
| connecting EMR systems, a future role | Referrers: "Referrers are adjuncts to WV, creating connectors and integration with certified EMR systems" (line 126) | | | |
| referring new members | | Network Builders (lines 180–181); REF: "Points earned for successfully referring new active members to the DeSciX platform via contextual deep links" (line 383) | | |
| listed for token distribution | | | Referrers (line 443, p. 17) | |
| reselling, a future role | Resellers (line 127) | | | |
| engaging in the community | | Engaged Community Members, rewarded by REP (lines 182–183) | | |
| buying tokens | | Investors/Supporters, through the auction (lines 184–185) | | "no escalating auctions" (D1) |

The 2023 paper's infrastructure role is Node Operators
([DAITA_Whitepaper_2023-09-25.md](DAITA_Whitepaper_2023-09-25.md):122):

> Node Operators receive transaction fee based Daita Tokens when the Daita Tokens are utilized
> within the function fulfilled by the NO.

The licence's list names Network Operators
([../08_LEAN/Archive/LICENSE.md](../08_LEAN/Archive/LICENSE.md):443, PDF p. 17), quoted in full
above.

## How the documents extend the model

### Communities within DeSciX

The licence ([../08_LEAN/Archive/LICENSE.md](../08_LEAN/Archive/LICENSE.md):150, PDF p. 6):

> The DeSciX ecosystem operates on a recursive (fractal) membership model.

Line 152, PDF p. 6:

> **Root Membership (Pre-condition):** Membership in the DeSciX DAO (the "Root Community") is a
> strict condition precedent for membership in any other COMMUNITY.

Line 154, PDF p. 6:

> Each COMMUNITY is an independent DAO that adopts this DCMA as its own primary governing
> constitution. When You join a specific COMMUNITY, You affirmatively accept this DCMA again,
> specifically as it applies to your participation within *that* COMMUNITY.

Line 156, PDF p. 7:

> While this DCMA governs the rights and responsibilities common to all, specific COMMUNITIES may
> have additional requirements (e.g., specific token holdings, fees, or codes of conduct) detailed
> in their unique **DAO Participation Agreement**, which serves as an addendum to the DCMA for
> that specific COMMUNITY.

The whitepaper's glossary, of the agreement it calls the DCA
([../14_COURANT_GROUP/DeSciX_Whitepaper.md](../14_COURANT_GROUP/DeSciX_Whitepaper.md):370):

> The DCA is the "Constitution" of DeSciX and recursively applies as each Community's
> participation agreement such that each community has its own Community Source/DCSL and
> potentially DPaaS.

### Founding a community

The licence ([../08_LEAN/Archive/LICENSE.md](../08_LEAN/Archive/LICENSE.md):158, PDF p. 7):

> A **DAO Creator** is the Member who initiates a new COMMUNITY (“founds a new College or
> Department”). The DAO Creator can be any legal entity.

Line 160, PDF p. 7:

> As the DAO Creator of a COMMUNITY, you are initially the Community Managing Delegate (CMD) and
> are expected to fulfill and enforce Community-specific MD obligations that do not overlap with
> the DeSciX Managing Delegate (DMD). The CMD is subjugated to the DMD. This agreement, specific to
> the COMMUNITY, must adhere to the overall DeSciX framework, including the following constraints
> set by the DeSciX DAO ("University Senate"):

Line 162, PDF p. 7:

> While the COMMUNITY is designated as Private ("in early development/research phase"), its native
> token will not be publicly tradable.

Line 164, PDF p. 7:

> The COMMUNITY’s tokens will only become eligible for public trading after its core Intellectual
> Property (IP) has been deemed perfected to established standards (e.g., comparable to US
> constitutional standards for patents, copyright), as assessed through the DAO’s defined processes
> … and the COMMUNITY demonstrates a viable operational model.

### Apps within a community

The licence ([../08_LEAN/Archive/LICENSE.md](../08_LEAN/Archive/LICENSE.md):385, PDF p. 14):

> As an App Creator, with respect to your own Content within your App and to the App itself you
> may offer less restrictive terms to other DAO Members so long as those terms are digitally
> represented in entitlements system of the DeSciX platform

and, in the same clause:

> App terms may not bypass Mandatory Tokenized Economics (i.e. as a non-limiting example, you may
> not "open-source your App" and disclose COMMUNITY Source to Non-Members or give away your App
> off-platform "for free" while employing COMMUNITY Source).

The 2023 paper, on DApps in its economy
([DAITA_Whitepaper_2023-09-25.md](DAITA_Whitepaper_2023-09-25.md):123):

> Developers create and maintain smart contracts and Distributed Applications (Dapps) which
> natively support DAITA as the central bank for the ERC-20 token of the DApp - that is the DApp
> may have its own virtual currency but the minting,treasury, and other functions are through the
> DAITA DAO smart contract.

The 2025 whitepaper, on the contract it deploys for each community
([../14_COURANT_GROUP/DeSciX_Whitepaper.md](../14_COURANT_GROUP/DeSciX_Whitepaper.md):351):

> **DAITA_v2:** The standardized smart contract template deployed for each COMMUNITY, governing its
> native Token supply, Treasury, automated pre-IP-IPO auction, Airdrop distributions, and the
> critical token transferability lock controlled by the IP-IPO process.

The 2023 paper, on its choice of example (line 112):

> The DTE is in no way limited to healthcare data or IP

### Innovations carried off the platform

The 2025 whitepaper
([../14_COURANT_GROUP/DeSciX_Whitepaper.md](../14_COURANT_GROUP/DeSciX_Whitepaper.md):109):

> The DeSciX PWA frontend code itself is Community Source. This allows developers to fork the
> codebase, disable standard App Store views if desired, integrate their own APIs, and deploy
> standalone applications on their own URLs or even package them for native app stores
> (iOS/Android).

> This **massive extensibility** allows DeSciX-born innovations to spread far beyond the initial
> platform, achieving broad impact while ensuring value flows back to the originating IP holders
> as mandated by the DCA (e.g., through required token usage or licensing fees routed back to the
> `DAITA_v2` contract).

The guide states the author's intent ([../guide/make-money.md](../guide/make-money.md):13):

> My intent is DeSciX becomes a repetitive and reusable model which other open-source projects adopt.

### The guide's incentives beside the documents

The guide's three numbered ways in ([../guide/make-money.md](../guide/make-money.md):15–34), its
licensing sentence (line 9), and the third part of
[../guide/get-involved.md](../guide/get-involved.md) (lines 17–20):

| The guide | Where the documents name related roles or terms |
|---|---|
| 1. Maxi: contribute to Maxi and the science behind it, among the people to whom the author is distributing 800M EGPT (make-money.md:15–20) | DAITA Creators and Developers (lines 119, 123); the licence's contributors who build valuable Apps (LICENSE.md:20); the whitepaper's Knowledge/Code Creators and App Creators (lines 175–179) |
| 2. DeSciX: the platform that gives open source an economic model (make-money.md:22–26) | the licence: DeSciX "provides an economic model that supports open-source principles *within the community*" (LICENSE.md:20) |
| 3. Restore the lost corpus: airdrops for sharing or extending this repository, based on traffic or upvotes (make-money.md:28–34) | the whitepaper's Viral Sharing by deep links, "rewarded via REF points" (line 42); its Network Builders (lines 180–181); REF (line 383) |
| Licensing: proceeds from big companies go to token purchases (make-money.md:9) | the licence's value return, "purchasing tokens with proceeds" (LICENSE.md:14), and its 10% royalty (LICENSE.md:383); the buybacks and the 10% royalty of D4 (token plan, line 15); the Courant Group plan's buybacks from licence revenue (Business_Plan.md §7, lines 206–220) and its licences priced in EGPT tokens (§6, lines 170–185) |
| Contributions earn EGPT tokens (get-involved.md:17–20) | the whitepaper's airdrops by DIP, REF and REP (line 27); the press release's periodic airdrops (line 21) |

The Courant Group plan states what its licence types follow
([../14_COURANT_GROUP/Business_Plan.md](../14_COURANT_GROUP/Business_Plan.md):181–183):

> The types of licence follow the roles the DeSciX Community License and the
> DAITA whitepaper lay out for the ecosystem, among them network operators, DApp developers,
> witness validators and referrers

and where the return goes (lines 219–220):

> Buybacks from licence revenue raise demand for the same token contributors earn, and that is how
> the value of commercial use returns to the people whose work made it possible.

## Where to go from here

How to earn tokens and how to contribute are in the guide:
[../guide/make-money.md](../guide/make-money.md) and
[../guide/get-involved.md](../guide/get-involved.md). The commercial side, what Courant Group
licenses and how the plan returns value from it, is in
[`../14_COURANT_GROUP/`](../14_COURANT_GROUP/README.md), with the patent the guide names in
[`../11_PATENT/`](../11_PATENT/README.md).

Every quotation above is verbatim from the file and line named with it; "…" marks an elision.
