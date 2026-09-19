#!/usr/bin/env python3
"""Rebuild the quotation corpus from sources/*.json.

Deterministic: unchanged inputs produce a byte-identical corpus.
Re-derives ids, hashes and embed_text, so editing a quote in a source file
propagates correctly rather than leaving a stale id pointing at new text.

    python3 build_corpus.py
"""
import json, hashlib, re, unicodedata, pathlib, sys

HERE = pathlib.Path(__file__).parent
SRC, OUT = HERE/'sources', HERE/'corpus'

def norm(t): return re.sub(r'\s+', ' ', (t or '')).strip()

def slug(s, n=28):
    s = unicodedata.normalize('NFKD', s or '').encode('ascii', 'ignore').decode()
    return re.sub(r'-+', '-', re.sub(r'[^a-z0-9]+', '-', s.lower())).strip('-')[:n] or 'x'

INSTIT = ('Meta','Google','NVIDIA','Newton','Runway','1X','Skild','LIBERO','Physics-IQ',
          'CausalVQA','Physical Intelligence','TechCrunch','DeepMind','Bell')

# One person, one name. Keys are lowercased, punctuation-stripped forms of every variant seen.
CANON = {
    'claude shannon':'Claude E. Shannon', 'claude e shannon':'Claude E. Shannon',
    'shannon':'Claude E. Shannon',
    'von neumann':'John von Neumann', 'john von neumann':'John von Neumann',
    'johann v neumann':'John von Neumann', 'j von neumann':'John von Neumann',
    'stanislaw ulam':'Stanislaw Ulam', 'stan ulam':'Stanislaw Ulam', 'ulam':'Stanislaw Ulam',
    's m ulam':'Stanislaw Ulam',
    'gian carlo rota':'Gian-Carlo Rota', 'rota':'Gian-Carlo Rota',
    'richard feynman':'Richard Feynman', 'feynman':'Richard Feynman',
    'albert einstein':'Albert Einstein', 'einstein':'Albert Einstein',
    'kurt godel':'Kurt Gödel', 'kurt gödel':'Kurt Gödel', 'godel':'Kurt Gödel', 'gödel':'Kurt Gödel',
    'klara von neumann':'Klara von Neumann',
    'nicholas metropolis':'Nicholas Metropolis', 'n metropolis':'Nicholas Metropolis',
    'rodney brooks':'Rodney Brooks', 'ken goldberg':'Ken Goldberg',
    'fei fei li':'Fei-Fei Li', 'sergey levine':'Sergey Levine',
    'heinz von foerster':'Heinz von Foerster', 'von foerster':'Heinz von Foerster',
    'meta ai':'Meta AI', 'meta ai v jepa 2':'Meta AI',
    'google deepmind':'Google DeepMind', 'google deepmind dreamerv3':'Google DeepMind',
    'meta ai v jepa':'Meta AI',
    # joint-authorship variants that name the same paper's authors
    'e fermi j pasta s ulam':'Enrico Fermi, John Pasta and Stanislaw Ulam',
    'e fermi j pasta s ulam authors of report crediting m tsingou':
        'Enrico Fermi, John Pasta and Stanislaw Ulam',
    'e fermi j pasta s ulam report by work performed by fermi pasta ulam and m tsingou':
        'Enrico Fermi, John Pasta and Stanislaw Ulam',
    'n metropolis and s ulam':'Nicholas Metropolis and Stanislaw Ulam',
    'metropolis and ulam':'Nicholas Metropolis and Stanislaw Ulam',
    'k baclawski g c rota s billis':'Kenneth Baclawski, Gian-Carlo Rota and Stanley Billis',
    'baclawski rota and billis':'Kenneth Baclawski, Gian-Carlo Rota and Stanley Billis',
}
# Multi-author and reported-speech forms are left alone; these are the ones to strip first.
STRIP = re.compile(r'\s*\((?:in|quoted[^)]*|historian|Foreword[^)]*)\)\s*$|'
                   r'\s*\(as recounted[^)]*\)\s*$|\s*\(historian\)\s*$', re.I)
PARTICLES = ('von','van','de','del','della','di','du','la','le','ten','ter')

def canon_speaker(raw):
    name = re.sub(r'\s+', ' ', STRIP.sub('', raw or '')).strip()
    key = re.sub(r'\s+', ' ', re.sub(r'[^a-z ]', ' ', name.lower())).strip()
    return CANON.get(key, name)

def sort_key(name, role='author'):
    """People sort last name first, particles kept attached (von Neumann -> 'von neumann, john').
    Institutions and joint authorship sort under the name as written."""
    n = name.strip()
    if not n: return 'zzz'
    if role == 'institution': return n.lower()
    if ' and ' in n or '&' in n or ',' in n or '/' in n:
        return n.lower()
    parts = n.split()
    if len(parts) == 1: return parts[0].lower()
    i = len(parts) - 1
    while i > 0 and parts[i-1].lower() in PARTICLES: i -= 1
    last  = ' '.join(parts[i:])
    first = ' '.join(parts[:i])
    return (last + ', ' + first).lower()

YEAR = re.compile(r'\b(1[5-9]\d{2}|20\d{2})\b')
def years(date_str):
    """Years of the quotation itself, read from the date field ONLY.

    The work field is deliberately excluded: it carries publication, translation and revision
    years for the printing a passage was read in, which are not the year the thing was said.
    A 1956 letter read in a 2006 revision of a 1993 translation is a 1956 quotation.
    """
    return sorted({int(y) for y in YEAR.findall(date_str or '')})
REPORTED = re.compile(r'quoted in|as reported by|reported speech', re.I)
# A record is citation and existence only. These fields once carried agent prose — retrieval
# accounts, grades, commentary — and are refused rather than ignored, so it cannot creep back.
REFUSED = ('caution', 'note', 'verification', 'sourcing')

def main():
    files = sorted(SRC.glob('*.json'))
    if not files:
        sys.exit(f'no source files in {SRC}')
    recs, seen = [], {}
    for path in files:
        coll = re.sub(r'^\d+_', '', path.stem)
        for n, e in enumerate(json.load(open(path, encoding='utf-8'))['entries']):
            bad = [k for k in REFUSED if k in e]
            if bad:
                sys.exit(f'{path.name} entry {n}: carries {", ".join(bad)}.\n'
                         f'  A record holds speaker, work, locus, date, file, url and the verbatim '
                         f'words an ellipsis cut (context). Nothing else. See '
                         f'PROVENANCE_DB_ORDERS.md.')
            q = norm(e.get('quote'))
            if not q:
                # A search that found nothing is not a record: it cannot be quoted and a reader
                # cannot check it against anything. Such rows are not kept in this corpus.
                sys.exit(f'{path.name} entry {n}: empty quote.\n'
                         f'  work: {norm(e.get("work"))[:90]}\n'
                         f'  Every record must carry a passage someone wrote or said. If this '
                         f'records a search that found nothing, delete it.')
            h = hashlib.sha256(q.encode()).hexdigest()
            if h and h in seen:
                prev = seen[h]
                if coll not in prev['collections']: prev['collections'].append(coll)
                for t in [norm(e.get('theme'))]:
                    if t and t not in prev['themes']: prev['themes'].append(t)
                continue
            sp = canon_speaker(norm(e.get('speaker'))) or '—'
            work = norm(e.get('work'))
            role = ('institution' if any(i in sp for i in INSTIT)
                    else 'reported' if REPORTED.search(work) else 'author')
            rec = {
                'id': f"q-{slug(sp,18)}-{slug(work,20)}-{h[:8] if h else 'notfound'}",
                'quote': q,
                'speaker': {'name': sp, 'role': role, 'sort': sort_key(sp, role),
                            'as_given': norm(e.get('speaker')) or ''},
                'source': {'work': work, 'locus': norm(e.get('locus')), 'date': norm(e.get('date')),
                           'file': norm(e.get('file')), 'url': norm(e.get('source_url'))},
                'restored': norm(e.get('context')),
                'years': years(norm(e.get('date'))),
                'themes': [t for t in [norm(e.get('theme'))] if t],
                'collections': [coll],
                'quote_sha256': h,
            }
            rec['embed_text'] = ' | '.join(x for x in [
                sp, work, rec['source']['locus'], rec['source']['date'], q, rec['restored']] if x)
            recs.append(rec)
            if h: seen[h] = rec

    recs.sort(key=lambda r: (r['speaker']['sort'], r['source']['work'], r['source']['locus']))
    OUT.mkdir(exist_ok=True)
    corpus = {'schema': 'egpt.quotes/1', 'count': len(recs),
              'note': ("Verbatim quotations with their citations. 'restored' holds the words an "
                       "ellipsis removed, verbatim, and nothing else."),
              'records': recs}
    (OUT/'quotes.json').write_text(json.dumps(corpus, indent=1, ensure_ascii=False), encoding='utf-8')
    with open(OUT/'quotes.jsonl', 'w', encoding='utf-8') as f:
        for r in recs: f.write(json.dumps(r, ensure_ascii=False) + '\n')

    print(f'{len(recs)} records from {len(files)} source files')
    merged = {}
    for r in recs:
        ag = r['speaker'].get('as_given')
        if ag and ag != r['speaker']['name']:
            merged.setdefault(r['speaker']['name'], set()).add(ag)
    for canon, variants in sorted(merged.items()):
        print(f"  merged -> {canon}: {', '.join(sorted(variants))}")
    dated = sum(1 for r in recs if r['years'])
    print(f'  {dated}/{len(recs)} carry at least one year')

if __name__ == '__main__':
    main()
