---
title: "DeSciX token plan: the decisions ratified on 1 July 2026"
date: "2026-07-01"
source: "The DeSciX token plan, ratified by the author on 1 July 2026, as held in the platform's documentation; copied on 28 September 2026. Reproduced: the plan's title, the heading and table header of its section 1, and rows D1, D2, D4 and D5 of that table, verbatim except where … marks an elision. The elisions remove the names of files and line ranges in the platform's private source code, and internal working terms (the name of a work list and a build-phase status), which a reader of this collection cannot resolve; in D1 the elided sentence names the code to be retired, in D2 the elided clause states the build status of the crypto payment path, and in D5 the elided text is a contract's source lines. Rows D3, D6, D7 and D8, and the plan's other sections, are not reproduced."
---

# DeSciX Headless-MCP MVP — Re-scoped Plan

## 1. Ratified decisions (2026-06-30 → 07-01)

| ID | Decision |
|----|----------|
| D1 | **Token model:** simple ERC20, floats, no transfer restrictions, **no escalating auctions**. … |
| D2 | **Credits:** platform-wide **USD-denominated AI-token credits**; one balance per user; consumption debits record `{community_id, app_id, tokens}` attribution. **MVP sells credits for USD only** (…; crypto buys tokens, not credits, at MVP). |
| D4 | **Buybacks:** net of op-ex, on-platform sales buy community tokens **from pools, async, pro-rata by actual RAG/agent consumption** per community. Off-platform enterprise licenses pay **10% royalty**, feeding the same buyback worker. |
| D5 | **Chains:** **Polygon = airdrop chain** (existing DAITA_v2-class contracts, which are verifiably encumbered — transfer-locked before `publicListingDate`, Pausable; …). **BNB Chain = clean, unencumbered tokens + real V2-style pools vs USDT** for **EGPT and DAITA**. |
