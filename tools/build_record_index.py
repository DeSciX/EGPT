#!/usr/bin/env python3
"""Build RECORD_INDEX.md: where, in this collection, the sources behind the trial record live.

    python3 tools/build_record_index.py --write    # regenerate RECORD_INDEX.md
    python3 tools/build_record_index.py --check    # non-zero if RECORD_INDEX.md is stale

The trial record (01_TRIAL/) cites its sources in numbered endnotes. Most are public references
and carry their own URL. This index resolves the rest: every endnote that cites a work held in
this collection is pointed at the file, and every work cited but not held is pointed at URLS.md.
It also maps each quotation in the two exhibits to the corpus record that carries it, because
05_CORPUS owns quotation provenance and this tool consumes it rather than re-deriving it.

The citation table below is the one hand-kept part. It fails loud in both directions: a path that
is not in CHECKSUMS.txt is an error, and an entry that matches no endnote is an error. A table
that silently stops matching is how an index goes wrong.
"""
import argparse, json, re, sys, unicodedata, pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / '05_CORPUS'))
from build_corpus import norm as corpus_norm                     # the corpus's own normalizer

EXHIBITS = ['01_TRIAL/EXHIBIT_A_report.md', '01_TRIAL/OPENING_STATEMENT.md']
OUT = ROOT / 'RECORD_INDEX.md'
# A corpus record whose file is the report itself points a reader back where they started; say so instead.
SELF_CITED = ('00_OUTPUTS/Los_Alamos_Computation_AI_and_Gian_Carlo_Rota_Report', '01_TRIAL/')

# citation phrase (as it appears in an endnote, after key()) -> (collection path, what it is)
HELD = [
    ('mathematics philosophy and artificial intelligence',
     '04_ROTA/Mathematics, Philosophy, and Artificial Intelligence.html', "Rota and Sharp's 1985 dialogue on AI, Los Alamos Science"),
    ('in memoriam of stan ulam',
     '04_ROTA/The_Barrier_of_Meaning_Rota.md', "Rota, The Barrier of Meaning, from Ulam's memorial"),
    ('john von neumann 1903 1957',
     '02_VON_NEUMANN/Ulam_von_Neumann_Obituary_BAMS_1958.md', "Ulam's BAMS memoir of von Neumann, 1958"),
    ('tribute to john von neumann',
     '02_VON_NEUMANN/Ulam_von_Neumann_Obituary_BAMS_1958.md', "Ulam's BAMS memoir of von Neumann, 1958"),
    ('selected letters',
     '02_VON_NEUMANN/von_Neumann_Selected_Letters.pdf', 'John von Neumann: Selected Letters, ed. Rédei'),
    ('science computers and people',
     '03_ULAM/Science Computers And People.md', 'Ulam, Science, Computers, and People'),
    ('introduction to probability and random processes',
     '04_ROTA/Rota-Baclawski-Prob-Theory-79.pdf', 'Baclawski and Rota, the 1979 probability text'),
    ('introduction to probability theory',
     '04_ROTA/manuscript_1992/Index.md', 'Baclawski, Rota and Billis, the probability manuscript'),
    ('chapter viii entropy and information',
     '04_ROTA/manuscript_1992/ch8_Entropy_and_Information.md', 'the manuscript, Chapter VIII, Entropy and Information'),
    ('indiscrete thoughts',
     '04_ROTA/Indiscrete Thoughts.md', 'Rota, Indiscrete Thoughts'),
    ('the mathematician in r b heywood',
     '02_VON_NEUMANN/The_Mathematician_JvM.md', 'von Neumann, The Mathematician, 1947'),
    ('a boolean analysis of addition and multiplication',
     '04_ROTA/Boolean_Analysis_1977_OSTI_record.png', 'Faltin, Metropolis, Ross and Rota, 1977: the abstract, from OSTI'),
    ('12 january 1931',
     '02_VON_NEUMANN/letters_to_godel/Letter3_Jan12_1931.md', 'von Neumann to Gödel, 12 January 1931'),
]
# cited but deliberately not held (in copyright) -> URLS.md carries the edition and the corpus passages
NOT_HELD = [
    ('adventures of a mathematician', 'Ulam, Adventures of a Mathematician, Scribner 1976'),
    ('the computer and the brain', 'von Neumann, The Computer and the Brain, Yale 1958'),
]


def key(s):
    """Comparison key: the corpus normalizer, then typography and punctuation folded. Words untouched."""
    s = unicodedata.normalize('NFKD', corpus_norm(s))
    s = ''.join(c for c in s if not unicodedata.combining(c))
    s = re.sub(r'[^\w\s]', ' ', s.replace('’', "'").replace("'", ''))
    return re.sub(r'\s+', ' ', s).strip().lower()


def endnotes(text):
    return [(int(n), body) for n, body in re.findall(r'^(\d{1,3})\. (.+)$', text, re.M)]


def build():
    checksummed = {line.split('  ', 1)[1].strip() for line in (ROOT / 'CHECKSUMS.txt').read_text().splitlines()
                   if line and not line.startswith('#') and '  ' in line}
    bad = [p for _, p, _ in HELD if p not in checksummed]
    if bad:
        sys.exit('ERROR: citation table names files not in CHECKSUMS.txt:\n  ' + '\n  '.join(bad))

    report = (ROOT / EXHIBITS[0]).read_text(encoding='utf-8')
    notes = endnotes(report)
    by_file, by_note, not_held, fired = {}, {}, {}, set()
    for n, body in notes:
        k = key(body)
        for phrase, path, label in HELD:
            if phrase in k:
                fired.add(phrase)
                by_file.setdefault(path, [label, []])[1].append(n)
                by_note.setdefault(n, set()).add(path)
        for phrase, label in NOT_HELD:
            if phrase in k:
                fired.add(phrase)
                not_held.setdefault(label, []).append(n)
                by_note.setdefault(n, set()).add('URLS.md')
    dead = [p for p, *_ in HELD + NOT_HELD if p not in fired]
    if dead:
        sys.exit('ERROR: citation table entries that match no endnote:\n  ' + '\n  '.join(dead))

    records = json.loads((ROOT / '05_CORPUS/corpus/quotes.json').read_text(encoding='utf-8'))['records']
    keyed = [(key(r['quote']), r) for r in records]
    quotes = []
    for ex in EXHIBITS:
        text = (ROOT / ex).read_text(encoding='utf-8')
        seen = set()
        for m in re.finditer(r'“([^”]{25,})”', text):
            q = key(m.group(1))
            if q in seen or len(q) < 20:
                continue
            seen.add(q)
            match = [r for c, r in keyed if q in c] or [r for c, r in keyed if len(c) >= 20 and c in q]
            if match:
                r = match[0]
                quotes.append((ex, m.group(1), r))
    return notes, by_file, by_note, not_held, quotes


def render(notes, by_file, by_note, not_held, quotes):
    L = ['# Record index', '',
         'Generated by `tools/build_record_index.py`; do not edit by hand. Regenerate with',
         '`python3 tools/build_record_index.py --write`.', '',
         'Where, in this collection, the sources behind the trial record live. The record in `01_TRIAL/`',
         'cites its sources in numbered endnotes at the end of `EXHIBIT_A_report.md`. Most are public',
         'references and carry their own URL. The rest are resolved here.', '',
         '## Sources held in this collection', '',
         '| File | What it is | Cited in endnotes |', '|---|---|---|']
    for path, (label, ns) in sorted(by_file.items()):
        L.append(f'| `{path}` | {label} | {", ".join(map(str, sorted(set(ns))))} |')
    L += ['', '## Cited but not held', '',
          'In copyright, and cited to the published edition. `URLS.md` names the edition, and every passage',
          'the record draws from these books is in the corpus, verbatim and with its printed page.', '',
          '| Work | Cited in endnotes |', '|---|---|']
    for label, ns in sorted(not_held.items()):
        L.append(f'| {label} | {", ".join(map(str, sorted(set(ns))))} |')
    public = [n for n, _ in notes if n not in by_note]
    L += ['', '## Endnotes that are public references only', '',
          'These cite works that are not held here and need not be: each note carries its own citation or URL.', '',
          ', '.join(map(str, public)), '',
          '## Quotations in the record backed by a corpus record', '',
          '`05_CORPUS/` holds each of these with its speaker, locus, verification state and SHA-256. The',
          'file column is where the text it was read from lives in this collection; where it is blank, the',
          'text is not reproduced here and the corpus record says where it was read.', '',
          '| Exhibit | Quotation | Corpus record | Verification | File |', '|---|---|---|---|---|']
    for ex, q, r in quotes:
        short = (q[:70] + '…') if len(q) > 70 else q
        short = short.replace('|', '\\|')
        f = r['source'].get('file') or ''
        cell = ('the report itself; its endnotes cite the original' if f.startswith(SELF_CITED)
                else ('`' + f + '`') if f else '')
        L.append(f'| {ex.split("/")[-1]} | {short} | `{r["id"]}` | {r["verification"]} | {cell} |')
    return '\n'.join(L) + '\n'


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    g = ap.add_mutually_exclusive_group(required=True)
    g.add_argument('--check', action='store_true'); g.add_argument('--write', action='store_true')
    a = ap.parse_args()
    parts = build()
    out = render(*parts)
    notes, by_file, by_note, not_held, quotes = parts
    summary = (f'{len(notes)} endnotes: {sum(1 for n, _ in notes if n in by_note)} resolved into the collection or URLS.md, '
               f'{len(by_file)} held files; {len(quotes)} quotations backed by the corpus')
    if a.write:
        OUT.write_text(out, encoding='utf-8'); print('wrote RECORD_INDEX.md —', summary)
    else:
        if not OUT.exists() or OUT.read_text(encoding='utf-8') != out:
            sys.exit('RECORD_INDEX.md is STALE — run --write')
        print('RECORD_INDEX.md current —', summary)


if __name__ == '__main__':
    main()
