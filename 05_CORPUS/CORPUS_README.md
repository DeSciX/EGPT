# Quotations

One place for every quotation gathered for the robotic-imagination work: a single record format,
the extraction passes that produced it, and a composer for writing new papers out of it.

    corpus/            the corpus — read this, embed this
      quotes.json        one object, records[], schema egpt.quotes/1
      quotes.jsonl       same records one per line, for RAG ingest
      schema.json        JSON Schema with the field contracts
      README.md          schema notes
    sources/           the source files the corpus is built from
    composer/          the composer app — open composer.html in a browser
    build_corpus.py    sources/ -> corpus/    (deterministic)
    build_composer.py  corpus/  -> composer/composer.html

## 296 quotations, 65 speakers

Every record is a passage someone wrote or said, and its citation: speaker, work, locus, date, and
where a copy of the work is held. A search that found nothing is not a record: it cannot be quoted
and a reader cannot check it against anything. One record per passage; no pointer rows, no
superseded rows, no banners. The corpus is the current state of the evidence, not its history.

## One person, one name

`build_corpus.py` canonicalises speakers through a `CANON` table — "Claude Shannon" and "Claude E.
Shannon" are one person, so are "Von Neumann" and "John von Neumann", and three different renderings
of the Fermi–Pasta–Ulam authorship collapse to one. Each record keeps `speaker.as_given` so a merge
is always reversible, and the build prints every merge it made. `speaker.sort` is last-name-first
with particles attached ("von neumann, john"); institutions and joint authorship sort under the name
as written. Add a variant to `CANON` and rebuild.

Each record also carries `years`, read from the **`date` field only**. The work field is excluded on
purpose: it carries the publication, translation and revision years of the printing a passage was
read in, which are not the year the thing was said — a 1956 letter read in a 2006 revision of a 1993
translation is a 1956 quotation. A record carries more than one year only when the date itself names
more than one (an address and its later printing), and the composer's range filter matches if **any**
of them falls inside it.

## The discipline

`quote` is verbatim. `restored` holds the words an ellipsis removed, verbatim, and nothing else.
`source.work` is cited the traditional way, and where the words were taken from another work it says
"quoted in …". A record carries no grade, no account of how its text was obtained and no note: the
paper that quotes it answers for having read it. What a work argues, proves or extends is for the
paper you write, not the corpus. The full rules are in `PROVENANCE_DB_ORDERS.md`.

## The composer

Open `composer/composer.html` in a browser. Nothing to install and nothing to serve — the corpus is
inlined, so it works from `file://` and offline.

Three panes. **Library** filters 296 quotations by speaker (listed by last name), theme, year
range and full text; click one to add it. The year range hides undated quotations while it is set,
and says so. **Paper** is the document: quotes plus your own headings, prose and holding blocks,
reordered by drag or by the arrows. **Preview** renders it live and exports a self-contained HTML
page in the same format as the published artifacts.

One export switch: restored text, on by default.

### Editing a quotation

**Edit** on a quote block opens the text with the source printed underneath. Shorten it, or add an
editorial insertion the ordinary way — `[Your views are] inconsistent with the principle…`.
**Insert [ ]** brackets the selection, **Cut to …** replaces it with an ellipsis, **Restore
original** puts the record's text back. An edited block is marked `EDITED`; the corpus record is
never touched.

Under the editor a check runs on every keystroke. It strips the bracketed insertions, splits on the
ellipses, and confirms every remaining run still appears in the source **in order**. Cut and bracket
as much as you like and it stays green; type a word the source does not contain, or reorder the
argument, and it goes red and names the offending run. It is a guard against misquoting yourself by
accident, not a lock — the check reports, it does not prevent.

### Emphasis inside a quotation

The traditional *emphasis added*. A quote, a prose block, a holding block and a comment all accept a
small set of inline tags — `<b> <i> <em> <strong> <u> <sup> <sub> <mark> <small> <br>` — and nothing
else. **Italic** and **Bold** buttons in the quote editor wrap the selection. Everything is escaped
first and only those bare tags, with no attributes, are let back through, so a stray `<script>`
renders as visible text rather than running. The edit check strips markup before comparing, so
adding emphasis never trips it: the quotation still reads as unchanged from the source.

### Read full width

**Read full width** folds the library and the editor away and gives the paper the whole window at
the article's own measure — what the exported page will look like. **Esc** or **Back to editing**
returns.

### The author's comment

**Comment** on a quote block opens a note that renders **beside** the quotation — shaded, with a
small caption above it, in a second column to the right. It is for the reader: a translation of a
technical term, the context a passage assumes, a gloss on an institutional joke. The caption
defaults to *Author's Comment* and is editable per quote, so one can read *A note on MIT course
numbers* and the next *What "short code" meant in 1958*.

The comment is visibly the author's rather than the source's — different ground, different rule
colour, its own caption — so nothing in it can be mistaken for part of the quotation. Blank lines
start new paragraphs. On a narrow screen the column drops below the quote instead of squeezing it.

The quote and its comment divide **the same measure as the prose**, so the article keeps one width
from the title to the last citation — the aside narrows the quotation rather than breaking the
column out wider than the text around it.

### Drafts

Drafts live in `localStorage` under `egpt-composer-drafts-v2`, keyed by name. The dropdown lists
them with their save time; **Open**, **Save**, **Save as…** and **Delete** do what they say, and
**Save** falls through to **Save as…** when nothing is selected. The editor also autosaves
continuously to a reserved slot, so closing the tab loses nothing.

`localStorage` is per browser and per machine, and clearing site data wipes it. **Back up** writes
every draft to a JSON file; **Restore** reads one back, renaming rather than overwriting when a name
already exists. Use it before clearing anything, and to move drafts between machines.

To edit the app, change `composer/head.html`, `body.html`, `app.js` or `paper.css` and re-run
`build_composer.py`; `composer.html` is generated and should not be hand-edited.

## Adding a source pass

Drop a JSON file in `sources/` shaped `{"entries":[{speaker, quote, work, locus, date, context?,
theme, file?, source_url?}]}` and run both build scripts. `context` is the verbatim words an ellipsis
cut, and nothing else; an entry carrying `caution`, `note`, `verification` or `sourcing` stops the
build. Records are
deduplicated by the sha256 of the normalised quote, so re-extracting the same passage merges rather
than duplicates.

---

## A note on this published copy

This is a **published build** of the corpus, not a hand copy. It is generated from the source
JSON in the author's private repository by `publish_corpus.py`, and one field is rewritten in
the crossing.

`source.file` records the path of a copy of the work held in the collection. In the private tree
that is a path under the working repository, which would mean nothing to a reader here. In this
copy it is rewritten to the file's path **in this collection**, so it resolves. Where the work is
not held here — a book in copyright, cited to its published edition instead — the field is empty.

Nothing else is altered. The quotes, speakers, works, loci, dates and hashes are the authority's
own, and `quote_sha256` can be checked against the quote text in either tree.
