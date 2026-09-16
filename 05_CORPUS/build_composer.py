#!/usr/bin/env python3
"""Rebuild composer.html by inlining corpus/quotes.json into composer/.

    python3 build_composer.py

`compose()` is the one owner of the inlining; evidence/publish_corpus.py imports it to build
the published copy from the published (path-rewritten) corpus.
"""
import json, pathlib

# Key order is the app's contract; keep it.
SLIM_KEYS = ('id', 'quote', 'speaker', 'source', 'restored', 'sourcing', 'verification', 'themes',
             'years', 'embed_text')


def compose(records, composer_dir):
    """-> the text of composer.html for these corpus records and this composer/ directory."""
    C = pathlib.Path(composer_dir)
    slim = [{k: ({kk: vv for kk, vv in r[k].items() if vv} if k == 'source' else r[k])
             for k in SLIM_KEYS} for r in records]
    parts = [(C/'head.html').read_text(encoding='utf-8'),
             '<script id="paperCSS" type="text/css">' + (C/'paper.css').read_text(encoding='utf-8') + '</script>',
             '<script>window.__CORPUS__=' + json.dumps({'records': slim}, ensure_ascii=False, separators=(',', ':')) + ';</script>',
             (C/'body.html').read_text(encoding='utf-8'),
             (C/'app.js').read_text(encoding='utf-8')]
    return '\n'.join(parts)


def main():
    H = pathlib.Path(__file__).parent
    recs = json.load(open(H/'corpus/quotes.json', encoding='utf-8'))['records']
    out = H/'composer'/'composer.html'
    out.write_text(compose(recs, H/'composer'), encoding='utf-8')
    print(f'{out} — {len(recs)} quotations, {out.stat().st_size:,} bytes')


if __name__ == '__main__':
    main()
