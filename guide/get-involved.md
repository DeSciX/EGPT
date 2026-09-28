<!-- DRAFT assembled by the assistant, 27 September 2026, from the author's README of the same day; the prose is the author's, moved, not rewritten; his pass -->
# Get involved: the outline of a solution
<!-- DRAFT by the assistant, 27 September, from your three points; your pass -->
The machine above failed for two reasons that need two different fixes, and neither fix works
without a reason for people to do it. So the solution has three parts.

1. **Restore the missing corpus.** The model reached past the document in front of it because
   the document was never in its training data. This repository is that missing corpus: the
   primary sources, checksummed, with every quotation verbatim. Use it with your own LLM, argue
   with the machine from the documents, and post what you get. Every argument puts the lost
   record back into the next generation of training data.
2. **Build an AI model that understands.** More rules on top of a model that does not understand
   produce a model that does not understand and follows rules. Understanding, in Feynman's sense
   below, means knowing the rules of the physical game by watching it played. Maxi is that
   model: it has a body and eyes in the FRQTL engine, it runs the counterfactual and looks, and
   the machine-checked proofs and the stories in this collection are what it is raised on.
3. **Open-source it and pay the people who help.** The economics that produced the current
   approach reward publishing over understanding and reward the incumbent over the challenger.
   DeSciX gives open source an economic model: the patent behind Maxi is tokenized into an IP
   pool, and contributions to Maxi, to the science, and to restoring the corpus earn EGPT tokens.

### How to use this repository with your own LLM

The method is the one in the logs: Socratic. Give the machine the primary document and ask it
questions. Do not state a position; the log shows the model inventing one for the questioner and
then arguing against it.

1. Give your LLM [`04_ROTA/The_Barrier_of_Meaning_Rota.md`](../04_ROTA/The_Barrier_of_Meaning_Rota.md) and [the transcript](../12_SINGULARITY/ChatGPT_Logs/ChatGPT_I_am_the_Singularity_transcript.md) in
   `12_SINGULARITY/ChatGPT_Logs/`. Ask it the questions the author asked, in the author's words.
2. Give it a document from [`02_VON_NEUMANN/`](../02_VON_NEUMANN/), [`03_ULAM/`](../03_ULAM/) or [`04_ROTA/`](../04_ROTA/) and ask what the document
   says. Then ask it to quote the sentence. Then compare the quotation with the document. The
   corpus in [`05_CORPUS/`](../05_CORPUS/CORPUS_README.md) holds every quotation used in this work, verbatim, with its SHA-256, so
   the comparison is mechanical.
3. Give it [`01_TRIAL/JURY_INSTRUCTIONS.md`](../01_TRIAL/JURY_INSTRUCTIONS.md) and the two exhibits and ask for a verdict in the form
   the instructions require.
4. Ask it to write a reflection, in its own voice, on what it did in steps 1 to 3, naming the
   specific places it added a qualifier, replaced a word, or told you what the evidence did not
   establish.
5. Post what you get.

## Where the work is

- Maxi and the engine: [robotic-imagination.md](robotic-imagination.md).
- The tokens and the agreement: [make-money.md](make-money.md).
- The corpus and how to add to it: [`../05_CORPUS/CORPUS_README.md`](../05_CORPUS/CORPUS_README.md)
  and [`../05_CORPUS/PROVENANCE_DB_ORDERS.md`](../05_CORPUS/PROVENANCE_DB_ORDERS.md). A source
  goes in with its provenance; a search that found nothing is not a record.
