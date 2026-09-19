# Standing orders — unified provenance database

Binding on every agent that touches the migration of citations, bibliographies, endnotes, source
lines or quotation records into the unified provenance database, or the database once it exists.
Put this file in the brief of every dispatch.

## What the work is

Consolidation. Every citation already in the collection is moved into one store under one scheme,
so that the same source has one record and every document that cites it points at that record. The
provenance behind these citations was established by an exacting process and is settled. This work
does not reopen it.

## What a record holds

Proper citation and existence, and nothing else: who said or wrote the words, the work, the locus,
the date, where the work is held (a repo-relative file or a URL), and, where the words were taken
from another work, that work as a cited intermediary. No verification grade, no account of how an
agent retrieved or read the text, no prose note. The author approves the schema; no agent proposes
or adds a field, state or category.

## Permitted

- **Correctness of the citation itself**: does the citation point at the work it names, with the
  title, author, date, locus and URL the cited source actually carries, and does the quoted text
  appear in that source.
- **Merging variant renderings of one work into one record.** Where renderings disagree on a fact
  (a date, a spelling, a page), list the disagreement with every location for the author. Do not
  pick.
- **Recording a secondary-source chain the ordinary way.** A quotation attributed to von Neumann and
  taken from Wikipedia is cited as von Neumann, via Wikipedia, secondary. That is the whole of the
  entry.
- **Non-substantive publishing edits**: replacing absolute paths, and paths into the author's
  private working repository, with repo-relative paths, wherever they occur, including debate
  transcripts.

## Prohibited, absolutely

- **Assessing a source.** No note, field, flag, qualifier or comment anywhere on the reliability,
  quality, standing or provenance of a cited source. If the source is Wikipedia, a blog, a memoir or
  a web fetch, it is recorded as what it is and nothing is said about it.
- **Adding fields** beyond the schema the author has approved.
- **Interpreting a quotation**, characterising what it means, argues or shows.
- **Adding qualifiers** — "reportedly", "allegedly", "claimed", "it is said" — to a citation, a
  quotation or the text around it.
- **Altering any text surrounding a quotation**, in any document.
- **Re-sourcing.** No web search or fetch to re-verify, re-find or improve a source, and no
  re-reading a source to second-guess a recorded verification state. The database consumes the
  records as they stand.

## Quotation checking

Traditional quotation practice is never a failure. Checking follows the composer's rule: strip
`[bracketed]` insertions, strip emphasis markup (`<b> <i> <em> <strong> <u> <sup> <sub> <mark>
<small> <br>`, and markdown `*` `_`), split on ellipses (`…` and `...`), and require each remaining
run to appear in the source in order. Typography folds (curly and straight quotes, dashes,
whitespace, diacritics); words never do.

A quotation whose source text is not held in the collection is **unresolved**, not wrong. Report it
as unresolved and nothing more.

## Reporting

What an agent may report: counts, locations (repo-relative path and line), and the literal text of a
disagreement between two citations of the same source. Nothing else.
