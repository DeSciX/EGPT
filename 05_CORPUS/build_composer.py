#!/usr/bin/env python3
"""Rebuild composer.html by inlining corpus/quotes.json into composer/.

    python3 build_composer.py
"""
import json, pathlib
H = pathlib.Path(__file__).parent
C = H/'composer'
recs = json.load(open(H/'corpus/quotes.json', encoding='utf-8'))['records']
slim = [{'id': r['id'], 'quote': r['quote'], 'speaker': r['speaker'],
         'source': {k: v for k, v in r['source'].items() if v},
         'restored': r['restored'], 'sourcing': r['sourcing'],
         'verification': r['verification'], 'themes': r['themes'], 'years': r['years'],
         'embed_text': r['embed_text']} for r in recs]
parts = [(C/'head.html').read_text(encoding='utf-8'),
         '<script id="paperCSS" type="text/css">' + (C/'paper.css').read_text(encoding='utf-8') + '</script>',
         '<script>window.__CORPUS__=' + json.dumps({'records': slim}, ensure_ascii=False, separators=(',', ':')) + ';</script>',
         (C/'body.html').read_text(encoding='utf-8'),
         (C/'app.js').read_text(encoding='utf-8')]
out = C/'composer.html'
out.write_text('\n'.join(parts), encoding='utf-8')
print(f'{out} — {len(slim)} quotations, {out.stat().st_size:,} bytes')
