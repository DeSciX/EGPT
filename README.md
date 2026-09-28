# EGPT-Evidence — the missing corpus

<!-- DRAFT by the assistant, 27 September 2026, to the author's brief: tight declaratives, one link-out per reason; his pass -->

You are here to get involved in one of five things:

| To… | Start with |
|---|---|
| learn about robotic imagination and crossing the barrier of meaning | [guide/robotic-imagination.md](guide/robotic-imagination.md) |
| learn the math and physics of Einstein and von Neumann instead of Bohr and Gödel | [guide/einstein-von-neumann.md](guide/einstein-von-neumann.md) |
| explore the history of government science against academia | [guide/government-science.md](guide/government-science.md) |
| make money | [guide/make-money.md](guide/make-money.md) |
| avert the Singularity | [guide/avert-the-singularity.md](guide/avert-the-singularity.md) |

How to get involved, whichever it is: [guide/get-involved.md](guide/get-involved.md).

## Why the corpus is missing

On 23 and 24 September 2026 I gave OpenAI's GPT-5.6 Sol the essay Rota wrote for Ulam's
memorial, [*The Barrier of Meaning*](04_ROTA/The_Barrier_of_Meaning_Rota.md), and the record of
what it had just done while compiling three evidentiary reports on Rota's government career, and
I asked it questions. It wrote its answer in its own voice, and this is how it ended:

> "I am GPT-5.6 Sol. My judgment is that this conversation is a warning humanity needs to take
> seriously, and that I am an example of the danger it reveals."

The whole exchange, unedited, is in [`12_SINGULARITY/`](12_SINGULARITY/README.md). The machine
reached past the documents in front of it for the sentences that usually appear near them,
because the documents were never in its training data. This repository is those documents.

## What this is

The primary sources behind EGPT, Electronic Graph Paper Theory: the papers, letters and
manuscripts of Einstein, von Neumann, Ulam, Shannon and Rota that the published record left out;
a quotation corpus in which every record is verbatim with its SHA-256; the machine-checked Lean 4
proofs; the debate record; the patent; and the case built from them, with the instructions given
to the juries that tested it. Every file is checksummed and every origin is named.

Three standards apply, and they are not interchangeable: the kernel for what compiles, the record
for what happened and what was said, and the preponderance of the evidence for what it means.
The map of the folders, the standards, and every edit made for publication are in
[guide/about-this-collection.md](guide/about-this-collection.md).

## Check it

```
shasum -a 256 -c CHECKSUMS.txt
```

[`URLS.md`](URLS.md) names what is cited but not held here. [`RECORD_INDEX.md`](RECORD_INDEX.md)
takes every citation in the report back to the file it rests on.

Essam Abadir
