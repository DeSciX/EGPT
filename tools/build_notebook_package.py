#!/usr/bin/env python3
"""Build or check a NotebookLM package for one SSG episode: notebooklm/<episode>/notebook-llms.txt.

    python3 tools/build_notebook_package.py notebooklm/<episode> --check   # files, sizes, quotation gate
    python3 tools/build_notebook_package.py notebooklm/<episode> --write   # write notebook-llms.txt

The concatenation is the one EGPT-research's scripts/generate_llms.js and filePackager.js
use (a manifest of {path, includeFile, note}; each file printed under "# --- <path> ---"),
with two differences. Files are read from the tree at HEAD, never the working tree, so an
uncommitted edit cannot reach a package, and a work the author holds out of the collection
(.gitignore, URLS.md) cannot either: it is not tracked. And corpus records can be selected
by id, speaker or match, and are printed as a quotation sheet with their citations.

manifest.json in the episode directory:

    {
      "title": "...",                      # first line of the package
      "header": "...",                     # preamble, printed before the contents list
      "files": [{"path": "07_LETTERS/all-in-letter.md", "includeFile": true, "note": "..."}],
      "corpus": {"ids": ["q-..."], "speakers": ["Gian-Carlo Rota"], "match": ["diagonal"]},
      "own_words": ["a phrase in the prompt that is the author's own, not a quotation"]
    }

A directory path includes every tracked text file under it; includeFile: false excludes a
path. PDFs, images and Office files are skipped (NotebookLM takes them as their own sources).

The quotation gate reads prompt.md in the episode directory: every run of four or more words
inside curly or straight double quotes (the "Pronunciation guide:" paragraph aside), split on
ellipses and brackets, must be found in the
package's own text or in the corpus (typography folded, case kept), unless it is listed in
own_words. A control sentence is run through the same gate and must fail, or the gate is
reported as unable to fail. --check exits 1 on any gate failure or missing path.
"""
import argparse, json, os, re, subprocess, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_NAME = 'notebook-llms.txt'
CORPUS = '05_CORPUS/corpus/quotes.json'
BINARY = {'.pdf', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico', '.webp', '.woff', '.woff2',
          '.ttf', '.eot', '.zip', '.tar', '.gz', '.bz2', '.mp3', '.mp4', '.wav', '.webm', '.m4a',
          '.docx', '.xlsx', '.pptx', '.pyc', '.o', '.so', '.dylib'}
SOURCE_WORD_LIMIT = 500_000   # NotebookLM's per-source limit
CONTROL = 'Gian-Carlo Rota told his students that the Manuscript was a weapon of war.'


def git(*args):
    return subprocess.run(['git', *args], cwd=ROOT, check=True, capture_output=True).stdout


def tracked_at_head():
    out = git('ls-tree', '-r', '-z', '--name-only', 'HEAD').decode('utf-8')
    return [p for p in out.split('\0') if p]


def blob(path):
    return git('show', f'HEAD:{path}').decode('utf-8', errors='replace')


def resolve(manifest, tracked):
    norm = lambda x: re.sub(r'^\./', '', x).rstrip('/')
    excluded = {norm(e['path']) for e in manifest.get('files', []) if not e.get('includeFile', True)}
    files, notes, missing = [], {}, []
    for e in manifest.get('files', []):
        if not e.get('includeFile', True):
            continue
        p = norm(e['path'])
        hits = [t for t in tracked if t == p or t.startswith(p + '/')]
        if not hits:
            missing.append(p)
            continue
        for t in hits:
            if os.path.splitext(t)[1].lower() in BINARY:
                continue
            if any(t == x or t.startswith(x + '/') for x in excluded):
                continue
            if t not in notes:
                files.append(t)
                notes[t] = e.get('note', '')
    return files, notes, missing


def corpus_records(spec):
    if not spec:
        return []
    recs = json.loads(blob(CORPUS))['records']
    ids, speakers = set(spec.get('ids', [])), set(spec.get('speakers', []))
    match = [m.lower() for m in spec.get('match', [])]
    out = [r for r in recs if r['id'] in ids or r['speaker']['name'] in speakers
           or any(m in r['quote'].lower() for m in match)]
    unknown = ids - {r['id'] for r in recs}
    if unknown:
        sys.exit('corpus ids not in the corpus at HEAD: ' + ', '.join(sorted(unknown)))
    return out


def quote_sheet(recs):
    lines = ['Each passage below is verbatim from its source; the line under it is the citation.', '']
    for r in recs:
        s = r['source']
        cite = ', '.join(x for x in [r['speaker']['name'], s.get('work', ''), s.get('locus', ''),
                                      s.get('date', '')] if x)
        held = s.get('file') or s.get('url') or ''
        lines += [f'> "{r["quote"]}"', f'{cite}.' + (f' Held: {held}.' if held else '') +
                  f' Record {r["id"]}.', '']
    return '\n'.join(lines)


def package(manifest, files, notes, recs):
    parts = [f"# {manifest.get('title', 'NotebookLM package')}", '']
    if manifest.get('header'):
        parts += [manifest['header'].strip(), '']
    parts += ['## Contents', '']
    for f in files:
        parts.append(f'- {f}' + (f' — {notes[f]}' if notes[f] else ''))
    if recs:
        parts.append(f'- Quotation sheet — {len(recs)} records from the quotation corpus')
    parts += ['', '---', '']
    for f in files:
        parts += [f'# --- {f} ---', '', blob(f).strip(), '', '']
    if recs:
        parts += ['# --- Quotation sheet (05_CORPUS) ---', '', quote_sheet(recs), '']
    return '\n'.join(parts)


FOLD = str.maketrans({'“': '"', '”': '"', '‘': "'", '’': "'", '–': '-',
                      '—': '-', ' ': ' ', '…': '...'})


def fold(s):
    s = s.translate(FOLD).replace('\\', '')
    s = re.sub(r'[*_`]', '', s)
    return re.sub(r'\s+', ' ', s)


def quotations(text):
    # the pronunciation guide quotes spoken forms, not sources
    text = '\n'.join(l for l in text.translate(FOLD).split('\n')
                     if not l.lower().startswith('pronunciation guide'))
    for m in re.finditer(r'"([^"\n]+)"', text):
        for run in re.split(r'\.\.\.|\[[^\]]*\]|…', m.group(1)):
            run = fold(run).strip(' ,.;:!?-')
            if len(run.split()) >= 4:
                yield run


def gate(prompt_text, haystack, own):
    hay = fold(haystack)
    own = {fold(o).strip(' ,.;:!?-') for o in own}
    fails = [q for q in quotations(prompt_text) if q not in hay and q not in own]
    control_fails = fold(CONTROL).strip(' .') not in hay
    return fails, control_fails


def main():
    ap = argparse.ArgumentParser(description=__doc__.split('\n')[0])
    ap.add_argument('episode', help='notebooklm/<episode> directory')
    g = ap.add_mutually_exclusive_group(required=True)
    g.add_argument('--check', action='store_true')
    g.add_argument('--write', action='store_true')
    a = ap.parse_args()

    ep = os.path.join(ROOT, a.episode) if not os.path.isabs(a.episode) else a.episode
    manifest = json.load(open(os.path.join(ep, 'manifest.json'), encoding='utf-8'))
    tracked = tracked_at_head()
    files, notes, missing = resolve(manifest, tracked)
    recs = corpus_records(manifest.get('corpus'))
    text = package(manifest, files, notes, recs)
    words = len(text.split())

    for f in files:
        print(f'{len(blob(f).split()):>8}  {f}')
    if recs:
        print(f'{"":>8}  + {len(recs)} corpus records')
    print(f'{words:>8}  words in the package ({len(text.encode()) // 1024} KB)')
    bad = False
    for m in missing:
        print(f'MISSING at HEAD: {m}'); bad = True
    if words > SOURCE_WORD_LIMIT:
        print(f'OVER NotebookLM per-source limit ({SOURCE_WORD_LIMIT} words)'); bad = True

    prompt = os.path.join(ep, 'prompt.md')
    if os.path.exists(prompt):
        all_corpus = '\n'.join(r['quote'] for r in json.loads(blob(CORPUS))['records'])
        fails, control_ok = gate(open(prompt, encoding='utf-8').read(), text + '\n' + all_corpus,
                                 manifest.get('own_words', []))
        for q in fails:
            print(f'QUOTE NOT FOUND: "{q}"'); bad = True
        print('control sentence: ' + ('fails, as it must' if control_ok else 'PASSED — the gate cannot fail'))
        bad = bad or not control_ok
        print(f'quotation gate: {"FAIL" if fails else "pass"}')

    if a.write:
        with open(os.path.join(ep, OUT_NAME), 'w', encoding='utf-8') as f:
            f.write(text)
        print(f'written: {os.path.relpath(os.path.join(ep, OUT_NAME), ROOT)}')
    sys.exit(1 if bad else 0)


if __name__ == '__main__':
    main()
