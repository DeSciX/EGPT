#!/usr/bin/env node
/**
 * build-frontpage.js — one source, N apps. Assembles an app's full-screen front page from
 * Cowork's Courant Group page (the template, read from the egpt-courantgroup checkout at the
 * commit pinned in site-src/frontpage/template.json) and the app's content spec
 * site-src/frontpage/<app>.json, whose fragments live in site-src/frontpage/<app>/.
 *
 *   node scripts/build-frontpage.js <app> [--out <dir>] [--dry-run]
 *
 * The template's nav, hero and footer are regenerated from the spec with the template's own
 * classes; its sections are reused by id, or replaced by the app's fragments. FAIL LOUD:
 * - every <blockquote data-src="…"> or <q data-src="…"> in a fragment must be found, folded,
 *   in the named file at HEAD of this repository (a quotation the collection does not hold
 *   cannot be on the page);
 * - every href to library.html#<path> must name a file tracked at HEAD (no dead deep links);
 * - every images/<name> the page uses must come from the template commit or the spec.
 * Pure Node, no dependencies.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'site-src', 'frontpage');
const args = process.argv.slice(2);
const app = args[0];
const DRY = args.includes('--dry-run');
const outAt = args.indexOf('--out');
const OUT = outAt > 0 ? path.resolve(args[outAt + 1]) : path.join(ROOT, 'site');
function die(msg) { console.error('ERROR: ' + msg); process.exit(1); }
if (!app || app.startsWith('--')) die('usage: build-frontpage.js <app> [--out <dir>] [--dry-run]');
const esc = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// ---------------------------------------------------------------- the template, at its pinned commit
const tpl = JSON.parse(fs.readFileSync(path.join(SRC, 'template.json'), 'utf8'));
const TREPO = path.resolve(ROOT, tpl.repo);
if (!fs.existsSync(path.join(TREPO, '.git'))) die(`template checkout not found: ${TREPO}`);
const gitT = (...a) => execFileSync('git', a, { cwd: TREPO, maxBuffer: 1 << 28 });
let tplSha;
try { tplSha = gitT('rev-parse', '--verify', '--short', `${tpl.commit}^{commit}`).toString().trim(); }
catch (e) { die(`template commit ${tpl.commit} is not in ${TREPO}`); }
const template = gitT('show', `${tpl.commit}:${tpl.page}`).toString('utf8');
const templateImage = name => gitT('show', `${tpl.commit}:${path.posix.join(path.posix.dirname(tpl.page), 'images', name)}`);

const bodyAt = template.indexOf('<body');
if (bodyAt < 0) die('template has no <body>');
const head = template.slice(0, bodyAt);
const body = template.slice(template.indexOf('>', bodyAt) + 1);
function block(re, name) { const m = re.exec(body); if (!m) die(`template ${name} not found`); return m[0]; }
const tplNav = block(/<nav class="nav">[\s\S]*?<\/nav>/, 'nav');
const tplHero = block(/<header class="hero"[\s\S]*?<\/header>/, 'hero');
const tplFooter = block(/<footer>[\s\S]*?<\/footer>/, 'footer');
const sections = {};
for (const m of body.matchAll(/<section class="sec[^"]*" id="([^"]+)">[\s\S]*?<\/section>/g)) sections[m[1]] = m[0];
const closes = (body.match(/<\/section>/g) || []).length;
if (closes !== Object.keys(sections).length) die(`template sections do not split cleanly: ${closes} closes, ${Object.keys(sections).length} sections`);

// ---------------------------------------------------------------- this repository at HEAD (the gate's ground)
const git = (...a) => execFileSync('git', a, { cwd: ROOT, maxBuffer: 1 << 28 });
const sha = git('rev-parse', '--short', 'HEAD').toString().trim();
const tracked = new Map(git('ls-tree', '-r', '-z', 'HEAD').toString('utf8').split('\0').filter(Boolean)
  .map(l => { const [meta, p] = l.split('\t'); return [p, meta.split(' ')[2]]; }));
const held = new Map();
function heldText(p) {
  if (!tracked.has(p)) die(`quotation source is not tracked at HEAD: ${p}`);
  if (!held.has(p)) {
    const text = git('cat-file', 'blob', tracked.get(p)).toString('utf8');
    // a JSON corpus file stores its text with \u escapes: fold the decoded strings, not the bytes
    const strings = [];
    const walk = v => { if (typeof v === 'string') strings.push(v); else if (v && typeof v === 'object') Object.values(v).forEach(walk); };
    if (p.endsWith('.json')) { walk(JSON.parse(text)); held.set(p, fold(strings.join('\n'))); }
    else held.set(p, fold(text));
  }
  return held.get(p);
}
function fold(s) {
  return s.normalize('NFKC')
    .replace(/[‘’‚′]/g, "'").replace(/[“”„″]/g, '"')
    .replace(/[‐-―−]/g, '-').replace(/…/g, '...').replace(/ /g, ' ')
    .replace(/-\n\s*/g, '').replace(/[*_`>#|]/g, '').replace(/\s+/g, ' ').trim();
}
const strip = h => h.replace(/<[^>]+>/g, '');
const unent = s => s.replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');

// ---------------------------------------------------------------- the app's spec
const specPath = path.join(SRC, `${app}.json`);
if (!fs.existsSync(specPath)) die(`no spec: ${specPath}`);
const spec = JSON.parse(fs.readFileSync(specPath, 'utf8'));
for (const k of ['title', 'description', 'brand', 'nav', 'hero', 'sections', 'footer', 'scripts']) if (!(k in spec)) die(`spec lacks ${k}`);

const rewrite = (html, pairs) => (pairs || []).reduce((h, [from, to]) => {
  if (!h.includes(from)) die(`link rewrite target not present: ${from}`);
  return h.split(from).join(to);
}, html);
const link = a => `<a href="${esc(a.href)}"${/^https?:/.test(a.href) ? ' target="_blank" rel="noopener"' : ''}${a.class ? ` class="${esc(a.class)}"` : ''}${a.style ? ` style="${esc(a.style)}"` : ''}>${a.html || esc(a.text)}</a>`;

const LOGIN_BUTTON = '<a class="btn btn-primary btn-sm" id="descix-login" href="https://descix.net/">Log in with Powch</a>';
function navHtml() {
  if (spec.nav === 'template') {
    let nav = rewrite(tplNav, spec.links);
    if (spec.login) {
      const at = '</a>\n  </div>\n</div></nav>';
      if (!nav.includes(at)) die('template nav: no place for the login button');
      nav = nav.replace(at, `</a>${LOGIN_BUTTON}\n  </div>\n</div></nav>`);
    }
    return nav;
  }
  return `<nav class="nav"><div class="wrap">
  <a class="brand" href="#top"><b>${esc(spec.brand.name)}</b><span>${esc(spec.brand.tag)}</span></a>
  <div class="navlinks">
    ${spec.nav.map(link).join('')}
  </div>
</div></nav>`;
}
function heroHtml() {
  if (spec.hero === 'template') return rewrite(tplHero, spec.links);
  const h = spec.hero;
  return `<header class="hero" id="top">
  ${h.art ? `<div class="hero-art"><img src="${esc(h.art.src)}" alt="${esc(h.art.alt)}"></div>` : ''}
  <div class="wrap">
    <p class="eyebrow">${esc(h.eyebrow)}</p>
    <h1>${(h.src && !heldText(h.src).includes(fold(unent(strip(h.h1_html))))) ? die(`hero h1 not found in ${h.src}`) : h.h1_html}</h1>
    <p class="lede">${h.lede_html || esc(h.lede)}</p>
    <div class="cta-row">
      ${link({ ...h.primary, class: 'btn btn-primary' })}
      ${h.secondary ? link({ ...h.secondary, class: 'btn btn-ghost' }) : ''}
    </div>
    ${h.kicker_html ? `<p class="kicker">${h.kicker_html}</p>` : ''}
  </div>
</header>`;
}
function footerHtml() {
  if (spec.footer === 'template') return rewrite(tplFooter, spec.links);
  const f = spec.footer;
  return `<footer><div class="wrap">
  <div class="brand"><b>${esc(f.name)}</b><span>${esc(f.tag)}</span></div>
  <div class="row">
    ${f.links.map(link).join('')}
  </div>
  <p class="legal">${f.legal_html}</p>
</div></footer>`;
}

// ---------------------------------------------------------------- sections: reused by id, or the app's fragments (gated)
let gated = 0;
function gateFragment(html, file) {
  for (const m of html.matchAll(/<(blockquote|q)\b[^>]*data-src="([^"]+)"[^>]*>([\s\S]*?)<\/\1>/g)) {
    const src = m[2];
    const quote = fold(unent(strip(m[3])));
    if (quote.length < 12) die(`${file}: quotation too short to gate: "${quote}"`);
    if (!heldText(src).includes(quote)) die(`${file}: quotation not found in ${src}: "${quote.slice(0, 80)}…"`);
    gated++;
  }
  for (const m of html.matchAll(/<(blockquote|q)\b(?![^>]*data-src=)[^>]*>/g)) die(`${file}: a <${m[1]}> without data-src (every quotation names its held file)`);
  for (const m of html.matchAll(/href="library\.html#([^"]+)"/g)) {
    const p = decodeURIComponent(m[1]).split('#')[0];
    if (!tracked.has(p)) die(`${file}: deep link to a path not tracked at HEAD: ${p}`);
  }
  return html;
}
// anchors: [{match, href}] — the one <a> in the section whose inner html contains `match` gets
// `href` (a relative href drops target/rel: it stays on this site). 0 or 2+ matches fail.
function reanchor(html, anchors) {
  for (const { match, href } of anchors || []) {
    const hits = [...html.matchAll(/<a\b[^>]*>[\s\S]*?<\/a>/g)].filter(m => m[0].includes(match));
    if (hits.length !== 1) die(`anchor match "${match}" hits ${hits.length} anchors (needs exactly 1)`);
    let a = hits[0][0].replace(/ href="[^"]*"/, ` href="${href}"`);
    if (!/^https?:/.test(href)) a = a.replace(/ target="_blank"/, '').replace(/ rel="noopener"/, '');
    html = html.replace(hits[0][0], a);
  }
  return html;
}
const body_sections = spec.sections.map(s => {
  if (s.use) {
    if (!sections[s.use]) die(`template has no section "${s.use}" (has: ${Object.keys(sections).join(', ')})`);
    return reanchor(rewrite(rewrite(sections[s.use], spec.links), s.links), s.anchors);
  }
  if (s.file) {
    const p = path.join(SRC, s.file);
    if (!fs.existsSync(p)) die(`fragment not found: ${s.file}`);
    return gateFragment(fs.readFileSync(p, 'utf8'), s.file);
  }
  die(`section entry needs "use" or "file": ${JSON.stringify(s)}`);
});

// ---------------------------------------------------------------- scripts
// Behind the DeSciX App Shell this page takes the full CodeSite view (no chat panel). The bus is
// reached through the generated app-side SDK (DeSciX.ready() resolves the frame hop; never a
// hand-computed window.parent); standalone, ready() resolves without a shell and nothing changes.
const CODESITE = `(function(){
  if(!(window.DeSciX&&typeof DeSciX.ready==='function'))return;
  DeSciX.ready().then(function(r){
    if(!r||r.mode!=='shell')return;
    var v=DeSciX.view; if(v&&typeof v.set==='function')v.set('CodeSite');
  });
})();`;
function forwarder() {
  const f = spec.scripts.forward;
  if (!f) return '';
  // a #<path> (it has a slash or a dot; in-page anchors have neither) forwards to the viewer, on
  // load and on any later hash change
  if (f.hash_to) return `<script>(function(){function f(){var h=location.hash;if(h.length>1&&/[\\/.]/.test(h))location.replace(${JSON.stringify(f.hash_to)}+h);}f();addEventListener('hashchange',f);})();</script>`;
  if (f.query_to) return `<script>if(location.search)location.replace(${JSON.stringify(f.query_to)}+location.search+location.hash);</script>`;
  die('scripts.forward needs hash_to or query_to');
}
let sdk = null;
if (spec.scripts.sdk_from) {
  const p = path.resolve(ROOT, spec.scripts.sdk_from);
  if (!fs.existsSync(p)) die(`SDK file not found: ${p}`);
  sdk = { name: path.basename(p), data: fs.readFileSync(p) };
  if (!sdk.data.toString('utf8').includes('GENERATED FILE')) die(`${p} is not the generated DeSciXAppSDK.js`);
}
if (spec.scripts.codesite && !sdk) die('scripts.codesite needs scripts.sdk_from: the CodeSite call goes through the SDK');
// the template's own inline scripts (its form and wallet mock), when the spec keeps its sections verbatim
const templateScripts = spec.scripts.template_scripts ? [...body.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1].trim()) : [];
if (spec.scripts.template_scripts && !templateScripts.length) die('template_scripts requested but the template has no inline script');
const scripts = [...templateScripts, spec.scripts.codesite ? CODESITE : '', ...(spec.scripts.extra || []).map(f => {
  const p = path.join(SRC, f); if (!fs.existsSync(p)) die(`script not found: ${f}`); return fs.readFileSync(p, 'utf8');
})].filter(Boolean);

// ---------------------------------------------------------------- head: the template's, retitled, stamped, forwarder first
let newHead = head
  .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(spec.title)}</title>`)
  .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${esc(spec.description)}">`);
if (!newHead.includes(`<title>${esc(spec.title)}</title>`)) die('title not placed');
newHead = newHead.replace('<meta charset="utf-8">', `<meta charset="utf-8">\n${forwarder()}`);
if (spec.css) newHead = newHead.replace('</style>', `\n/* ${app} */\n${spec.css}\n</style>`);
const stamp = `data-frontpage-app="${esc(app)}" data-frontpage-template="${tplSha}" data-frontpage-build="${sha}"`;

const heroOut = gateFragment(heroHtml(), 'hero');
const footerOut = gateFragment(footerHtml(), 'footer');
const html = `${newHead}<body ${stamp}>

${navHtml()}

${heroOut}

${body_sections.join('\n\n')}

${footerOut}

${sdk ? `<script src="${sdk.name}"></script>\n` : ''}${scripts.map(s => `<script>\n${s}\n</script>`).join('\n')}
</body>
</html>
`;

// every library deep link on the page, reused sections included, names a file tracked at HEAD
for (const m of html.matchAll(/href="(?:library\.html|https:\/\/egpt\.descix\.net\/)#([^"]+)"/g)) {
  const p = decodeURIComponent(m[1]).split('#')[0];
  if (!tracked.has(p)) die(`deep link to a path not tracked at HEAD: ${p}`);
}
// nothing on the page still points at the app's own public host (a self-link is a deep link)
if (spec.self_host && html.includes(spec.self_host)) die(`a self-link to ${spec.self_host} remains; rewrite it to a deep link`);

// ---------------------------------------------------------------- images: what the page uses, from the template commit or the spec
const used = new Set([...html.matchAll(/(?:src|href)="images\/([^"]+)"/g)].map(m => m[1]));
const extra = new Map((spec.images || []).map(i => [i.to.replace(/^images\//, ''), i.from]));
const images = new Map();
for (const name of used) {
  if (extra.has(name)) {
    const from = extra.get(name);
    if (from.startsWith('frontpage:')) {
      const p = path.join(SRC, from.slice('frontpage:'.length));
      if (!fs.existsSync(p)) die(`image not found: ${p}`);
      images.set(name, fs.readFileSync(p));
    } else {
      if (!tracked.has(from)) die(`image source not tracked at HEAD: ${from}`);
      images.set(name, git('cat-file', 'blob', tracked.get(from)));
    }
  } else {
    try { images.set(name, templateImage(name)); }
    catch (e) { die(`image "${name}" is neither in the template commit nor declared in the spec`); }
  }
}
for (const name of extra.keys()) if (!used.has(name)) die(`spec declares an unused image: ${name}`);

if (!DRY) {
  fs.mkdirSync(path.join(OUT, 'images'), { recursive: true });
  for (const [name, data] of images) fs.writeFileSync(path.join(OUT, 'images', name), data);
  fs.writeFileSync(path.join(OUT, 'index.html'), html);
  if (sdk) fs.writeFileSync(path.join(OUT, sdk.name), sdk.data);
}
console.log(`${DRY ? '[dry-run] ' : ''}${app}: index.html (${Math.round(Buffer.byteLength(html) / 1024)} KB) from template ${tplSha} at HEAD ${sha}; ${spec.sections.length} sections (${spec.sections.filter(s => s.use).length} reused, ${spec.sections.filter(s => s.file).length} fragments), ${gated} quotations gated, ${images.size} images`);
