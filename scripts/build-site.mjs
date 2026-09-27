#!/usr/bin/env node
// Render the collection's tracked markdown at HEAD into site/. Reads from `git show HEAD:<path>`,
// never from the working tree, so an uncommitted edit cannot reach the site. Every link stays
// page-relative (the App Shell serves the bundle under a prefix). FAIL LOUD on anything odd.
import { execFileSync } from 'node:child_process';
import { mkdirSync, writeFileSync, rmSync, existsSync } from 'node:fs';
import { dirname, join, relative, posix } from 'node:path';
import { marked } from 'marked';

const ROOT = join(dirname(new URL(import.meta.url).pathname), '..');
const OUT = join(ROOT, 'site');
const git = (...a) => execFileSync('git', a, { cwd: ROOT, encoding: 'utf8' });
const sha = git('rev-parse', '--short', 'HEAD').trim();
const tracked = git('ls-tree', '-r', '--name-only', '-z', 'HEAD').split('\0').filter(Boolean);

// What the site renders: the root README, the guide, and every section README.
const pages = tracked.filter(p =>
  p === 'README.md' || (p.startsWith('guide/') && p.endsWith('.md')) || /^[0-9]{2}_[A-Z_]+\/README\.md$/.test(p));
if (!pages.includes('README.md')) throw new Error('README.md is not tracked at HEAD');

const outPath = p => p === 'README.md' ? 'index.html'
  : p.startsWith('guide/') ? p.replace(/\.md$/, '.html').replace(/^guide\/README\.html$/, 'guide/index.html')
  : 'sections/' + p.replace(/\/README\.md$/, '.html');

const known = new Map(pages.map(p => [p, outPath(p)]));
const repoUrl = 'https://github.com/eabadir/EGPT-Evidence/blob/main/';

function rewriteLinks(md, from) {
  return md.replace(/\]\(([^)\s]+)\)/g, (m, href) => {
    if (/^(https?:|mailto:|#)/.test(href)) return m;
    const [path, hash] = href.split('#');
    const target = posix.normalize(posix.join(posix.dirname(from), decodeURIComponent(path)));
    const fromDir = posix.dirname(outPath(from));
    if (known.has(target)) {
      let rel = posix.relative(fromDir, known.get(target)); if (!rel.startsWith('.')) rel = './' + rel;
      return `](${rel}${hash ? '#' + hash : ''})`;
    }
    // Anything the site does not render links to the repository, page-relative never assumed.
    return `](${repoUrl}${encodeURI(target)}${hash ? '#' + hash : ''})`;
  });
}

const shell = (title, body, depth) => `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title>
<link rel="stylesheet" href="${'../'.repeat(depth)}assets/site.css"></head>
<body data-egpt-site-build="${sha}"><main>${body}</main>
<footer>EGPT-Evidence · built from commit ${sha} · <a href="${'../'.repeat(depth)}index.html">home</a></footer></body></html>`;

if (existsSync(OUT)) rmSync(OUT, { recursive: true });
mkdirSync(join(OUT, 'assets'), { recursive: true });
writeFileSync(join(OUT, 'assets', 'site.css'),
`:root{color-scheme:light dark;--fg:#111;--bg:#fff;--link:#0b57d0}@media(prefers-color-scheme:dark){:root{--fg:#eee;--bg:#161616;--link:#8ab4f8}}
body{margin:0;background:var(--bg);color:var(--fg);font:17px/1.55 Georgia,serif}main{max-width:52rem;margin:0 auto;padding:2rem 1rem}
a{color:var(--link)}blockquote{border-left:3px solid #888;margin:1rem 0;padding:.2rem 1rem;color:inherit}table{border-collapse:collapse}td,th{border:1px solid #888;padding:.3rem .6rem;vertical-align:top}
code{font-size:.92em}footer{text-align:center;font-size:.85em;padding:2rem;opacity:.7}`);
let n = 0;
for (const p of pages) {
  const md = git('show', `HEAD:${p}`);
  const out = outPath(p); const depth = out.split('/').length - 1;
  const title = (md.match(/^#\s+(.+)$/m) || [, p])[1].replace(/[*_`]/g, '');
  const html = marked.parse(rewriteLinks(md, p));
  mkdirSync(join(OUT, dirname(out)), { recursive: true });
  writeFileSync(join(OUT, out), shell(title, html, depth)); n++;
}
writeFileSync(join(ROOT, '.descix', 'site-provenance.json'), JSON.stringify({
  built_from: 'HEAD', commit: sha, pages: n, generator: 'scripts/build-site.mjs', stamp_attr: 'data-egpt-site-build' }, null, 2) + '\n');
console.log(`site/: ${n} page(s) from HEAD ${sha}`);
