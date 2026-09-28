# 15_GAME_THEORY — the token economy and its history

The documents of the economic model behind DeSciX and the EGPT token, in the order they were
written: the DAITA whitepaper of 25 September 2023, the DeSciX whitepaper of 2025, the DeSciX
Community License of 30 January 2026, and the token plan ratified on 1 July 2026. Together they
set out who earns tokens and for what, where value returns when the work is used commercially,
and how one agreement applies again to every community and app built under it. The guide gives
the author's reason for the section's name, in [../guide/make-money.md](../guide/make-money.md)
lines 4 and 5:

> Show me the incentives, and I'll show you the outcome - Charlie Munger

> Rota's unnamed branch of mathematics is foundationally intertwined with what you know as
> "game theory", or, what I would call non-linear dynamics amongst individuals.

## Files

| File | What it is |
|---|---|
| [DAITA_Whitepaper_2023-09-25.md](DAITA_Whitepaper_2023-09-25.md) | *DAITA: A Sustainable Data Economy For Artificial Intelligence*, Essam E Abadir, dated September 25, 2023: the Daita token economy, its roles (with healthcare as the worked example), its market-efficiency protocols, its incentive fractions per role, and its governance. Captured from the author's Google Doc on 28 September 2026; the front matter states the copy read and what the text export did to the figures, equations and table |
| [DeSciX_Token_Plan_2026-07-01.md](DeSciX_Token_Plan_2026-07-01.md) | Decisions D1, D2, D4 and D5 of the DeSciX token plan ratified on 1 July 2026, copied verbatim from the platform's documentation; the front matter states what of that plan is reproduced |

Held in [`../14_COURANT_GROUP/`](../14_COURANT_GROUP/README.md) and read with this section:

| File | What it is |
|---|---|
| [../14_COURANT_GROUP/DeSciX_Whitepaper.md](../14_COURANT_GROUP/DeSciX_Whitepaper.md) | *DeSciX Whitepaper: Community Source Science & The Intellectual Property IPO*, copied from the platform's documentation on 28 September 2026; the author's original PDF is dated 17 April 2025 |
| [../14_COURANT_GROUP/DeSciX_Community_License_v1.pdf](../14_COURANT_GROUP/DeSciX_Community_License_v1.pdf) | *The DeSciX Community License Membership Agreement*, v1, dated January 30, 2026. Its text, converted from the same source, is [../08_LEAN/Archive/LICENSE.md](../08_LEAN/Archive/LICENSE.md); the line numbers below are that file's, and the page numbers the PDF's |
| [../14_COURANT_GROUP/Business_Plan.md](../14_COURANT_GROUP/Business_Plan.md) | The Courant Group business plan, public version, which licenses FRQTL commercially and returns part of the licence revenue to the community |

## The history of the economic model

### 25 September 2023: the DAITA whitepaper

The paper proposes Community Source, an economy in which contributors hold the tokens
([DAITA_Whitepaper_2023-09-25.md](DAITA_Whitepaper_2023-09-25.md):17):

> DAITA aims to provide that in the form of Community Source - a decentralized community that
> anyone can join, everyone who joins has economic ownership in, and gaining access can be done
> through contributing to the community, or, by buying in with fiat currency.

Tokens are first minted to the people who contribute (line 62):

> That is, creators gain Daita Tokens in exchange for their data and IP contributions.

Section II defines the roles (lines 116 to 127, listed in the table below). Section III gives the
incentive fractions: of minted tokens, by activity and role (lines 166 and 167), and of the fees
DApps collect, 0.08 to Node Operators or Resellers, 0.05 to the DApp developer, 0.65 into the
Treasury and 0.02 to the Foundation (line 173). Section V gives governance: Governance Tokens that
cannot be traded and return to the Treasury at the end of the year (lines 179 to 182), and a
five-member Foundation board with three elected seats (line 183). The Drive description of the
paper, recorded in its front matter (line 5), reads:

> The economic principles and delegated proof of stake token economy behind the Daita tokens.

### 2025: the DeSciX whitepaper

The whitepaper carries the model to DeSciX, a virtual university and app store whose communities
each have a token, earned through contribution
([../14_COURANT_GROUP/DeSciX_Whitepaper.md](../14_COURANT_GROUP/DeSciX_Whitepaper.md):27):

> This ownership is **earned through contribution** – building Apps, creating knowledge
> (KBs/CodeSites), growing the network, or engaging constructively – tracked via points
> (DIP/REF/REP) and distributed via Airdrops.

Its unit of account is the `daita` (line 350), anchored at line 397:

> `1,000,000 daita = 1 USDC` (This parameter is set by the DAO and anchors internal computational value).

App usage fees split 60 percent to the app's creator and 40 percent to the community treasury
(line 441); an enterprise licence fee splits 30 percent to the app creator, 20 percent to the
treasury and 50 percent to knowledge creators by the DIP their contributions generated (line 444).
Price discovery runs through an auction in the `DAITA_v2` contract, `Price_per_Token (USDC) = Initial_Price * (Escalator ^ n)`
(line 410).

What it says of the 2023 paper. The treasury follows the DAITA paper's principles (line 187):

> These tokens effectively increase the scarcity for all holders or can be used by the DAO
> post-IP-IPO for ecosystem initiatives (like funding grants or managing token supply
> algorithmically, per the Daita Whitepaper principles).

and at maturity (line 231):

> The DAO may implement algorithmic treasury functions (per Daita WP) to manage token supply based on ongoing economic activity.

Its references list the DPoS white paper and the DAITA whitepaper as two entries (lines 329 and
331); each carries bracketed text where its link would go:

> **DeSciX DPoS White Paper:** [Link or Citation - detailing governance mechanics]

> **DAITA Whitepaper:** Abadir, E. E. (2023). *DAITA: A Sustainable Data Economy For Artificial Intelligence*. [Link to DaitaRoom.com or specific document]

### 30 January 2026: the DeSciX Community License, v1

The licence states the principle the later documents repeat, "open inside, value-return
outside", and names how outside value returns
([../08_LEAN/Archive/LICENSE.md](../08_LEAN/Archive/LICENSE.md):14, PDF p. 1):

> the strong expectation and guiding principle is that any resulting value flows back into the
> ecosystem, often through mechanisms supporting the relevant Community or DeSciX tokens (e.g.,
> purchasing tokens with proceeds, akin to contributing to a university endowment or funding
> research grants).

It defines what a token is (line 32, PDF p. 2):

> They represent a revocable license to access services and participate in governance parameters.
> **Tokens do NOT convey title, ownership, intellectual property rights, or equity interest in the
> DeSciX platform, the DeSciX DAO, any COMMUNITY, or the underlying Code and IP.**

It prices off-platform distribution (line 383, PDF p. 14):

> Distribution of Community IP or App Works outside the DeSciX platform (including books,
> executables, datasets, or packaged software) triggers a **10% royalty** on all reasonably
> related gross revenue, payable in DeSciX or relevant COMMUNITY tokens unless expressly approved
> otherwise.

What it says of the economic papers. It defers the distribution of tokens by role to a document
it names the DeSciX DPoS White Paper (line 443, PDF p. 17):

> The distribution of tokens for various roles within the DeSciX ecosystem (e.g., Witness
> Validators, DApp Developers, Network Operators, Referrers) will be governed by the DeSciX DPoS
> White Paper.

and defines that document (line 210, PDF p. 8):

> “DeSciX DPoS White Paper” shall refer to the document detailing the tokenomics, governance
> mechanics, and reward distribution of the DeSciX Delegated Proof-of-Stake system – the
> **University’s economic and governance charter**.

### 1 April 2026: the EGPT press release

[../14_COURANT_GROUP/Press_Release_2026-04-01.md](../14_COURANT_GROUP/Press_Release_2026-04-01.md):21:

> EGPT operates under the DeSciX Community License — a "community source" model where
> contributing earns tokens in the EGPT DAO. Code, marketing, knowledge, experiments, and
> engagement are tracked and convert to community tokens through periodic airdrops. The
> commercial application (the Faster Abadir Transform) pays a license fee back to the DAO.

### 1 July 2026: the ratified token plan

Four of the plan's decisions are held in
[DeSciX_Token_Plan_2026-07-01.md](DeSciX_Token_Plan_2026-07-01.md).
The token (line 13):

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
> encumbered — transfer-locked before `publicListingDate`, Pausable; `DAITA_v2.sol:398-414`).
> **BNB Chain = clean, unencumbered tokens + real V2-style pools vs USDT** for **EGPT and DAITA**.

What the 2025 whitepaper says of it. The copy held carries a banner at its head
([../14_COURANT_GROUP/DeSciX_Whitepaper.md](../14_COURANT_GROUP/DeSciX_Whitepaper.md):3):

> **SUPERSEDED ECONOMIC MODEL (2026-07-01).** This founding whitepaper's auction pricing
> (`Price = Initial_Price * Escalator^n`), IP-IPO 5-phase lifecycle, lot-based escalation, and
> STAKED status are SUPERSEDED

and ends it:

> Kept as historical record.

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

and returns licence revenue through buybacks (lines 209–212):

> A minimum of 10 percent of Courant Group's licence revenue funds
> buybacks of community tokens on the open market. Courant Group can pay more than the minimum
> and intends to, to reward participation. In the first year it commits 50 percent of licence
> revenue.

## The roles

Each row is one role as the documents name it, with the locator of each name.

| DAITA whitepaper, 2023 | DeSciX Community License, 2026 | DeSciX whitepaper, 2025 | Token plan, 1 July 2026 |
|---|---|---|---|
| Stakeholders, any entity holding Daita Tokens (line 116) | Members: registered token holders who have accepted the DCMA (LICENSE.md:28, PDF p. 2) | Member (line 379); Staked status (line 385) | one credit balance per user (D2) |
| Witness-Validators, who mine the tokens (line 117) | Witness Validators (LICENSE.md:443, PDF p. 17); Validators (LICENSE.md:114, PDF p. 5) | — | — |
| Data Providers and Creators (lines 118, 119) | Contributors who build valuable Apps or contribute to the underlying platform (LICENSE.md:20, PDF p. 2) | Knowledge/Code Creators, rewarded by DIP (lines 178–179) | — |
| Foundation Members, elected (line 120; governance, line 183) | the DeSciX DAO, "University Senate" (LICENSE.md:160, PDF p. 7) | the DeSciX DAO and its vote (line 222); a board elected bi-annually (line 502) | — |
| Delegates, appointed by the Foundation (lines 121, 184) | Managing Delegate (LICENSE.md:170, PDF p. 7); delegates appointed by the DAO membership (LICENSE.md:26, PDF p. 2) | Managing Delegate (line 378) | — |
| Node Operators (line 122) | Network Operators (LICENSE.md:443, PDF p. 17) | — | — |
| Developers, of DApps (line 123) | DApp Developers (LICENSE.md:443, PDF p. 17); App Creator (LICENSE.md:385, PDF p. 14) | App Creators, 60 percent of app fees (lines 175–177) | attribution by `app_id` (D2) |
| Treasury (line 124) | — | the Community Treasury, 40 percent of app fees (lines 186–187) | buybacks from pools (D4) |
| Referrers, a future role (line 126) | Referrers (LICENSE.md:443, PDF p. 17) | Network Builders, rewarded by REF (lines 180–181) | — |
| Resellers, a future role (line 127) | resale, among the activities routed through the token economy (LICENSE.md:44, PDF p. 3) | — | — |
| — | — | Engaged Community Members, rewarded by REP (lines 182–183) | — |
| — | — | Investors/Supporters, through the auction (lines 184–185) | no escalating auctions (D1) |

The 2023 paper's infrastructure role is Node Operators
([DAITA_Whitepaper_2023-09-25.md](DAITA_Whitepaper_2023-09-25.md):122):

> Node Operators receive transaction fee based Daita Tokens when the Daita Tokens are utilized
> within the function fulfilled by the NO.

The licence's role list names Network Operators
([../08_LEAN/Archive/LICENSE.md](../08_LEAN/Archive/LICENSE.md):443, PDF p. 17), quoted in full
above.

The whitepaper and the licence each state what a community token is. The whitepaper
([../14_COURANT_GROUP/DeSciX_Whitepaper.md](../14_COURANT_GROUP/DeSciX_Whitepaper.md):162):

> they represent a **verifiable, fractional ownership stake in the underlying Intellectual
> Property** generated by that Community.

The licence's words on the same point are quoted above, under 30 January 2026 (line 32).

## How the model extends to any project

**One agreement, applied again at every level.** The licence
([../08_LEAN/Archive/LICENSE.md](../08_LEAN/Archive/LICENSE.md):150, PDF p. 6):

> The DeSciX ecosystem operates on a recursive (fractal) membership model.

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

**Apps inside a community.** An app creator may set lighter terms for members, within one limit
([../08_LEAN/Archive/LICENSE.md](../08_LEAN/Archive/LICENSE.md):385, PDF p. 14):

> App terms may not bypass Mandatory Tokenized Economics

The 2023 paper puts each DApp's money under the DAO
([DAITA_Whitepaper_2023-09-25.md](DAITA_Whitepaper_2023-09-25.md):123):

> Developers create and maintain smart contracts and Distributed Applications (Dapps) which
> natively support DAITA as the central bank for the ERC-20 token of the DApp - that is the DApp
> may have its own virtual currency but the minting,treasury, and other functions are through the
> DAITA DAO smart contract.

and states that the model is general (line 112):

> The DTE is in no way limited to healthcare data or IP

**Projects outside the platform.** The whitepaper
([../14_COURANT_GROUP/DeSciX_Whitepaper.md](../14_COURANT_GROUP/DeSciX_Whitepaper.md):109):

> This **massive extensibility** allows DeSciX-born innovations to spread far beyond the initial
> platform, achieving broad impact while ensuring value flows back to the originating IP holders
> as mandated by the DCA (e.g., through required token usage or licensing fees routed back to the
> `DAITA_v2` contract).

The guide states the intent ([../guide/make-money.md](../guide/make-money.md):13):

> My intent is DeSciX becomes a repetitive and reusable model which other open-source projects adopt.

**The guide's incentives, beside the documents' roles.** The guide's three numbered ways in
([../guide/make-money.md](../guide/make-money.md):15–34), its licensing sentence (line 9), and
the third part of [../guide/get-involved.md](../guide/get-involved.md) (lines 17–20):

| The guide | The roles and terms that describe the same activity |
|---|---|
| 1. Maxi: contribute to Maxi and the science behind it and receive EGPT from the 800M distributed (make-money.md:15–20) | DAITA Creators and Developers (lines 119, 123); the licence's contributors who build valuable Apps (LICENSE.md:20); the whitepaper's Knowledge/Code Creators and App Creators (lines 175–179) |
| 2. DeSciX: the platform that gives open source an economic model (make-money.md:22–26) | DAITA Developers and Node Operators (lines 122, 123); the licence's DApp Developers and Network Operators (LICENSE.md:443) |
| 3. Restore the lost corpus: airdrops for sharing or extending this repository, by traffic or upvotes (make-money.md:28–34) | DAITA Referrers (line 126); the licence's Referrers (LICENSE.md:443); the whitepaper's Network Builders (REF) and Engaged Community Members (REP) (lines 180–183) |
| Licensing: proceeds from big companies go to token purchases (make-money.md:9) | the licence's value return by purchasing tokens with proceeds (LICENSE.md:14) and its 10% royalty (LICENSE.md:383); buybacks and the 10% royalty of D4 (token plan, line 15); the Courant Group plan's buybacks from licence revenue (Business_Plan.md §7, lines 206–220) and its licences priced in EGPT tokens (§6, lines 170–185) |
| Contributions earn EGPT tokens (get-involved.md:17–20) | the whitepaper's airdrops by DIP, REF and REP (line 27); the press release's periodic airdrops (line 21) |

The Courant Group plan names its licence types after the licence's roles
([../14_COURANT_GROUP/Business_Plan.md](../14_COURANT_GROUP/Business_Plan.md):181–185):

> The types of licence follow the roles the DeSciX Community License and the
> DAITA whitepaper lay out for the ecosystem, among them network operators, DApp developers,
> witness validators and referrers

and states where the return goes (lines 219–220):

> Buybacks from licence revenue raise demand for the same token contributors earn, and that is how
> the value of commercial use returns to the people whose work made it possible.

## Where to go from here

How to earn tokens and how to contribute are in the guide:
[../guide/make-money.md](../guide/make-money.md) and
[../guide/get-involved.md](../guide/get-involved.md). The commercial side, what Courant Group
licenses and how value returns from it, is in [`../14_COURANT_GROUP/`](../14_COURANT_GROUP/README.md),
with the patent the tokens are tied to in [`../11_PATENT/`](../11_PATENT/README.md).

Every quotation above is verbatim from the file and line named with it.
