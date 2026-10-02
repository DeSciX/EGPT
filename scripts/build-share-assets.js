#!/usr/bin/env node
/**
 * build-share-assets.js — for each app's "share" block (site-src/frontpage/<app>.json), render what
 * a share card and a browser tab show for that site: a distinct icon (favicon.ico and a 180px PNG)
 * and a 1200×630 share image, into site-src/frontpage/<app>/share/. The block is the one owner of
 * the title, the description and the card's words; this script only draws them.
 *
 *   node scripts/build-share-assets.js [app …]     (no app: every spec that has a share block)
 *   node scripts/build-share-assets.js --emit <app> --out <site dir>
 *
 * FAIL LOUD: a block without site, title or description; a description of 160 characters or more;
 * an icon with neither a glyph nor a source image; art that does not exist.
 * Needs Playwright (PLAYWRIGHT=<path to the module>, or installed where node resolves it).
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'site-src', 'frontpage');
const die = (m) => { console.error('ERROR: ' + m); process.exit(1); };
const { validateShare, emitShare } = require('./lib/share');
// --emit <app> --out <site dir>: write share.json and images/share/ into a site this generator does
// not build (the Courant Group page is authored in its own repository)
if (process.argv[2] === '--emit') {
  const app = process.argv[3], oi = process.argv.indexOf('--out');
  if (!app || oi < 0 || !process.argv[oi + 1]) die('usage: build-share-assets.js --emit <app> --out <site dir>');
  try { console.log(JSON.stringify(emitShare(app, JSON.parse(fs.readFileSync(path.join(SRC, app + '.json'), 'utf8')).share, SRC, path.resolve(process.argv[oi + 1])), null, 1)); } catch (e) { die(e.message); }
  process.exit(0);
}

let chromium;
try { ({ chromium } = require(process.env.PLAYWRIGHT || 'playwright')); } catch (e) { die('Playwright not found: set PLAYWRIGHT to its module path'); }
const tpl = JSON.parse(fs.readFileSync(path.join(SRC, 'template.json'), 'utf8'));
const tplRepo = path.resolve(ROOT, tpl.repo);
const dataUri = (buf, name) => `data:image/${/\.png$/i.test(name) ? 'png' : 'jpeg'};base64,${buf.toString('base64')}`;
function art(a) {
  if (!a) return null;
  if (a.template) return dataUri(execFileSync('git', ['-C', tplRepo, 'show', `${tpl.commit}:${a.template}`], { maxBuffer: 1 << 28 }), a.template);
  const p = path.join(ROOT, a.from);
  if (!fs.existsSync(p)) die(`art not found: ${a.from}`);
  return dataUri(fs.readFileSync(p), a.from);
}
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
const FONTS = '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,500;9..144,600&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap">';

function iconHtml(ic, px) {
  if (ic.from) return `<body style="margin:0;background:${ic.tile || 'transparent'}"><img src="${art({ from: ic.from })}" style="width:${px}px;height:${px}px;object-fit:contain;display:block"></body>`;
  if (!ic.glyph) die('icon needs "glyph" or "from"');
  return `${FONTS}<body style="margin:0"><div style="width:${px}px;height:${px}px;background:${ic.tile};display:grid;place-items:center;position:relative">
<span style="font:600 ${Math.round(px * 0.74)}px/1 Fraunces,Georgia,serif;color:${ic.ink};transform:translateY(-${Math.round(px * 0.03)}px)">${esc(ic.glyph)}</span>
<i style="position:absolute;left:${px * 0.2}px;right:${px * 0.2}px;bottom:${px * 0.11}px;height:${Math.max(2, Math.round(px * 0.045))}px;background:${ic.accent}"></i></div></body>`;
}
function cardHtml(sh, iconUri) {
  const c = sh.card, a = art(c.art);
  return `${FONTS}<body style="margin:0"><div style="width:1200px;height:630px;box-sizing:border-box;background:radial-gradient(70% 90% at 90% -10%,rgba(95,203,230,.16),transparent 60%),#0b0f14;color:#e9eef3;display:grid;grid-template-columns:${a ? '1.25fr 1fr' : '1fr'};gap:48px;padding:56px 64px;font-family:'IBM Plex Sans',Helvetica,Arial,sans-serif">
<div style="display:grid;grid-template-rows:auto 1fr auto;min-width:0">
  <div style="display:flex;align-items:center;gap:16px"><img src="${iconUri}" style="width:56px;height:56px;border-radius:10px;border:1px solid #2f3f52"><span style="font:500 21px/1.2 'IBM Plex Mono',monospace;letter-spacing:.06em;text-transform:uppercase;color:#5fcbe6">${esc(c.kicker)}</span></div>
  <div style="align-self:center"><div style="font:300 ${c.headline.length > 48 ? 54 : 66}px/1.1 Fraunces,Georgia,serif;letter-spacing:-.01em;text-wrap:balance">${esc(c.headline)}</div>
  <div style="margin-top:22px;font-size:27px;line-height:1.35;color:#b3bfcc;text-wrap:balance">${esc(c.line)}</div></div>
  <div style="font:500 26px/1 'IBM Plex Mono',monospace;color:#e9eef3">${esc(sh.site)}</div>
</div>
${a ? `<div style="border:1px solid #2f3f52;border-radius:12px;overflow:hidden;background:#05080c;display:grid;place-items:center"><img src="${a}" style="width:100%;height:100%;object-fit:${c.art.fit || 'cover'}"></div>` : ''}
</div></body>`;
}
// an .ico that holds PNG images (every current browser reads it)
function ico(pngs) {
  const head = Buffer.alloc(6); head.writeUInt16LE(0, 0); head.writeUInt16LE(1, 2); head.writeUInt16LE(pngs.length, 4);
  let off = 6 + 16 * pngs.length; const dir = [];
  for (const { size, buf } of pngs) { const e = Buffer.alloc(16); e.writeUInt8(size, 0); e.writeUInt8(size, 1); e.writeUInt16LE(1, 4); e.writeUInt16LE(32, 6); e.writeUInt32LE(buf.length, 8); e.writeUInt32LE(off, 12); off += buf.length; dir.push(e); }
  return Buffer.concat([head, ...dir, ...pngs.map((p) => p.buf)]);
}

(async () => {
  const want = process.argv.slice(2);
  const apps = (want.length ? want : fs.readdirSync(SRC).filter((f) => f.endsWith('.json')).map((f) => f.replace(/\.json$/, '')))
    .filter((a) => { const p = path.join(SRC, a + '.json'); if (!fs.existsSync(p)) die(`no spec: ${a}`); return JSON.parse(fs.readFileSync(p, 'utf8')).share || (want.length && die(`${a}: no share block`)); });
  const browser = await chromium.launch();
  const shot = async (html, w, h) => { const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1 }); const pg = await ctx.newPage(); await pg.setContent(html, { waitUntil: 'networkidle' }); await pg.evaluate(() => document.fonts.ready); const buf = await pg.screenshot({ clip: { x: 0, y: 0, width: w, height: h } }); await ctx.close(); return buf; };
  const rows = [];
  for (const app of apps) {
    const sh = JSON.parse(fs.readFileSync(path.join(SRC, app + '.json'), 'utf8')).share;
    try { validateShare(app, sh); } catch (e) { die(e.message); }
    const out = path.join(SRC, app, 'share'); fs.mkdirSync(out, { recursive: true });
    const png180 = await shot(iconHtml(sh.icon, 180), 180, 180);
    fs.writeFileSync(path.join(out, 'icon-180.png'), png180);
    fs.writeFileSync(path.join(out, 'favicon.ico'), ico([{ size: 32, buf: await shot(iconHtml(sh.icon, 32), 32, 32) }, { size: 48, buf: await shot(iconHtml(sh.icon, 48), 48, 48) }]));
    fs.writeFileSync(path.join(out, 'share-1200x630.png'), await shot(cardHtml(sh, dataUri(png180, 'x.png')), 1200, 630));
    rows.push(`${app} | ${sh.site} | ${sh.title} | ${sh.description} (${sh.description.length}) | site-src/frontpage/${app}/share/favicon.ico, icon-180.png | share-1200x630.png`);
  }
  await browser.close();
  console.log(rows.join('\n'));
})();
