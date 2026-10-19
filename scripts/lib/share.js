'use strict';
// The per-site share metadata, one owner: the "share" block of site-src/frontpage/<app>.json.
// DEVPLANE's contract (Unkamon org/records/exec-sum/2026-10-01-devplane-go-live-handbacks.md §C):
// each site bundle ships site/share.json beside index.html with title, description (<160),
// icon (bundle-relative), og_image (bundle-relative 1200×630, under 1 MB), optional twitter_card
// (default summary_large_image) and optional apple_touch_icon; the edge worker reads it at serve
// time and writes the shell's head from it. This module validates a block and emits that file
// with its three assets; nothing else derives these facts.
const fs = require('fs');
const path = require('path');

const ASSETS = { icon: 'favicon.ico', apple_touch_icon: 'icon-180.png', og_image: 'share-1200x630.png' };
const BUNDLE_DIR = 'images/share';   // images/ survives every site refresh and is in every upload manifest

function validateShare(app, sh) {
  if (!sh) throw new Error(`${app}: no share block`);
  for (const k of ['site', 'title', 'description', 'icon', 'card']) if (!sh[k]) throw new Error(`${app}: share block lacks ${k}`);
  if (sh.description.length >= 160) throw new Error(`${app}: share description is ${sh.description.length} characters; it must be under 160`);
  return sh;
}

// Where an app's rendered share assets live: site-src/frontpage/<app>/share/, drawn by scripts/build-share-assets.js.
const shareSourceDir = (srcDir, app) => path.join(srcDir, app, 'share');

// Writes <out>/share.json and <out>/images/share/* from the block and its rendered assets
// (shareSourceDir). Returns the object written.
function emitShare(app, sh, srcDir, out) {
  validateShare(app, sh);
  const from = shareSourceDir(srcDir, app);
  for (const f of Object.values(ASSETS)) if (!fs.existsSync(path.join(from, f))) throw new Error(`${app}: share asset not rendered: ${path.join(from, f)} (run scripts/build-share-assets.js ${app})`);
  const og = fs.statSync(path.join(from, ASSETS.og_image)).size;
  // 1 MB per the canonical app-developer runbook (daita docs, app-sdk/app-developer-runbook.md: og_image "under 1 MB"); the egpt-frqtl validator cites the same literal.
  if (og >= 1000000) throw new Error(`${app}: share image is ${og} bytes; it must be under 1 MB`);
  fs.mkdirSync(path.join(out, BUNDLE_DIR), { recursive: true });
  for (const f of Object.values(ASSETS)) fs.copyFileSync(path.join(from, f), path.join(out, BUNDLE_DIR, f));
  const json = { title: sh.title, description: sh.description, icon: `${BUNDLE_DIR}/${ASSETS.icon}`, og_image: `${BUNDLE_DIR}/${ASSETS.og_image}`,
    twitter_card: 'summary_large_image', apple_touch_icon: `${BUNDLE_DIR}/${ASSETS.apple_touch_icon}` };
  fs.writeFileSync(path.join(out, 'share.json'), JSON.stringify(json, null, 1) + '\n');
  return json;
}
module.exports = { validateShare, emitShare, shareSourceDir, ASSETS, BUNDLE_DIR };
