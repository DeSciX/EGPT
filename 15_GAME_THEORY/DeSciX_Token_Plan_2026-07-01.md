---
title: "DeSciX token plan: the decisions ratified on 1 July 2026"
date: "2026-07-01"
source: "The platform's documentation, V2_docs/architecture/descix-headless-mvp-plan-2026-07-01.md, section 1, 'Ratified decisions (2026-06-30 → 07-01)': the document's title, the section heading, the table header and rows D1, D2, D4 and D5, copied verbatim on 28 September 2026. Rows D3, D6, D7 and D8 are not reproduced, nor are the plan's other sections."
---

# DeSciX Headless-MCP MVP — Re-scoped Plan (CEO-ratified 2026-07-01)

## 1. Ratified decisions (2026-06-30 → 07-01)

| ID | Decision |
|----|----------|
| D1 | **Token model:** simple ERC20, floats, no transfer restrictions, **no escalating auctions**. The live `token_lifecycle` machinery (initiation phases, batches, escalator, IPO targets, thresholds — `tokenEconomyService.js`) is a **kill-list** item. |
| D2 | **Credits:** platform-wide **USD-denominated AI-token credits**; one balance per user; consumption debits record `{community_id, app_id, tokens}` attribution. **MVP sells credits for USD only** (crypto rail's confirmed-funds convergence is Phase-2/not-built; crypto buys tokens, not credits, at MVP). |
| D4 | **Buybacks:** net of op-ex, on-platform sales buy community tokens **from pools, async, pro-rata by actual RAG/agent consumption** per community. Off-platform enterprise licenses pay **10% royalty**, feeding the same buyback worker. |
| D5 | **Chains:** **Polygon = airdrop chain** (existing DAITA_v2-class contracts, which are verifiably encumbered — transfer-locked before `publicListingDate`, Pausable; `DAITA_v2.sol:398-414`). **BNB Chain = clean, unencumbered tokens + real V2-style pools vs USDT** for **EGPT and DAITA**. |
