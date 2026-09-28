#!/usr/bin/env python3
"""Write or check CHECKSUMS.txt: the SHA-256 of every file git tracks in this collection.

    python3 tools/build_checksums.py --write   # regenerate CHECKSUMS.txt from the tracked files
    python3 tools/build_checksums.py --check   # exit 1 if CHECKSUMS.txt is stale or a file is missing

The file list is `git ls-files` at the repository root, less CHECKSUMS.txt itself, so the
header's claim ("every file in this collection") is true by construction. Contents are read
from the working tree, which is what `shasum -a 256 -c CHECKSUMS.txt` also reads; run it in
a clean checkout of the commit whose checksums you want, and commit CHECKSUMS.txt beside the
files it describes. Origins live in the author's manifest, not here.
"""
import argparse, hashlib, os, subprocess, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CHECKSUMS = 'CHECKSUMS.txt'
HEADER = ('# SHA-256 of every file in this collection, by its path here.\n'
          '# Verify with:  shasum -a 256 -c CHECKSUMS.txt\n')


def tracked_files():
    out = subprocess.run(['git', 'ls-files', '-z'], cwd=ROOT, check=True,
                         capture_output=True).stdout
    return sorted(p for p in out.decode('utf-8').split('\0') if p and p != CHECKSUMS)


def sha256(path):
    h = hashlib.sha256()
    with open(path, 'rb') as f:
        for chunk in iter(lambda: f.read(1 << 20), b''):
            h.update(chunk)
    return h.hexdigest()


def build():
    rows, missing = [], []
    for rel in tracked_files():
        full = os.path.join(ROOT, rel)
        if not os.path.isfile(full):
            missing.append(rel)
            continue
        rows.append((rel, sha256(full), os.path.getsize(full)))
    return rows, missing


def render(rows):
    total = sum(size for _, _, size in rows)
    body = ''.join(f'{digest}  {rel}\n' for rel, digest, _ in rows)
    return f'{HEADER}# {len(rows)} files, {total} bytes.\n{body}'


def parse(text):
    entries = {}
    for line in text.splitlines():
        if not line or line.startswith('#'):
            continue
        digest, _, rel = line.partition('  ')
        entries[rel] = digest
    return entries


def main():
    ap = argparse.ArgumentParser(description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    g = ap.add_mutually_exclusive_group(required=True)
    g.add_argument('--write', action='store_true')
    g.add_argument('--check', action='store_true')
    a = ap.parse_args()

    rows, missing = build()
    if missing:
        print(f'ERROR: {len(missing)} tracked file(s) are absent from the working tree:', file=sys.stderr)
        for rel in missing:
            print(f'    {rel}', file=sys.stderr)
        sys.exit(1)

    path = os.path.join(ROOT, CHECKSUMS)
    if a.write:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(render(rows))
        print(f'wrote {CHECKSUMS} — {len(rows)} files, {sum(s for _, _, s in rows) / 1e6:.1f} MB')
        return

    if not os.path.isfile(path):
        sys.exit(f'ERROR: {CHECKSUMS} does not exist; run --write.')
    with open(path, encoding='utf-8') as f:
        on_disk = parse(f.read())
    fresh = {rel: digest for rel, digest, _ in rows}
    bad = False
    for rel in sorted(set(fresh) - set(on_disk)):
        print(f'ERROR: tracked but not in {CHECKSUMS}: {rel}', file=sys.stderr); bad = True
    for rel in sorted(set(on_disk) - set(fresh)):
        print(f'ERROR: in {CHECKSUMS} but not tracked: {rel}', file=sys.stderr); bad = True
    for rel in sorted(set(fresh) & set(on_disk)):
        if fresh[rel] != on_disk[rel]:
            print(f'ERROR: {rel}: checksum differs', file=sys.stderr); bad = True
    if bad:
        sys.exit(f'{CHECKSUMS} check FAILED')
    print(f'{CHECKSUMS} check OK — {len(rows)} files')


if __name__ == '__main__':
    main()
