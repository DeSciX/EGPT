// The viewer leaves the shell's view alone; the reader opens the librarian (site-src/site-assets/site.js).
//
//   EGPT_SHELL_URL=https://localhost:<port>/ node --test scripts/test/viewer-view.spec.js
//
// Runs against the App Shell ROOT of a `descix serve` gateway serving a built site/ (npm run build:site)
// as the egpt app, signed out, in a fresh browser context. The shell's view is read the way the shell
// publishes it, top.DeSciX.view.get(); the chat toggle is the shell's own "Hide Chat" button.
//   1. the front page paints CodeSite (share.json default_view);
//   2. in the same app frame: a library document, the library landing and a book page (reader.js) keep
//      CodeSite and show no "Hide Chat";
//   3. "Ask the librarian" sets SplitView (or the Chat fallback): the stamp on <html> is
//      "<outcome>:<mode>" with the outcome read from the page's own DeSciX.VIEW_OUTCOMES and the
//      attribute name from EGPTViewer.VIEW_ATTR, and the shell's view equals the mode set;
//   4. the reader's choice survives navigation: a PDF and the Singularity reading page do not move it;
//   5. no bridge on the page (DeSciXAppSDK.js refused) and a top-level load with no shell: no control,
//      no page error.
// Serve the bundle from the app's own checkout (`descix app set-site -a egpt --static <relative dir>`, then
// `descix serve`) and restore .descix/workspace.json only AFTER the serve has stopped: serve watches that file,
// and restoring it mid-run restarts the gateway on the checkout's own site/, so the spec would judge another
// bundle. Compare the served site-assets/site.js with the built one before trusting a run.
// EGPT_SHOTS_DIR, when set, receives a still per step.
// `playwright` is not a devDependency of this repository; it must resolve from node_modules (a symlink
// to an installed copy). It not resolving, or EGPT_SHELL_URL unset, is a FAILURE, never a skip.
'use strict';
const test = require('node:test');
const assert = require('node:assert');

const SHELL = process.env.EGPT_SHELL_URL;
const SHOTS = process.env.EGPT_SHOTS_DIR || '';
const DOC = '12_SINGULARITY/README.md';
const BOOK = 'book:trial';
const PDF = '04_ROTA/Rota-Baclawski-Prob-Theory-79.pdf';
const READING = '12_SINGULARITY/ChatGPT_Logs/I_am_the_Singularity.html';
const SETTLE_MS = 1500;   // the deleted path set the view one microtask after ready(); this is far past it

let chromium;
test.before(() => {
  assert.ok(SHELL, 'EGPT_SHELL_URL is unset: run `descix serve` on a built site/ and pass the gateway root');
  ({ chromium } = require('playwright'));
});

async function shellView(page) { return page.evaluate(() => window.DeSciX.view.get()); }
async function hideChat(page) { return page.getByRole('button', { name: 'Hide Chat' }).count(); }
async function appFrame(page) {
  for (let i = 0; i < 100; i++) {
    const f = page.frames().find((x) => x !== page.mainFrame() && /\/p\/egpt\//.test(x.url()));
    if (f) return f;
    await page.waitForTimeout(100);
  }
  throw new Error('no app frame under /p/egpt/ in ' + page.frames().map((x) => x.url()).join(', '));
}
async function shot(page, name) { if (SHOTS) await page.screenshot({ path: `${SHOTS}/${name}.png` }); }
// Each interior page is judged on its own: the harness puts the shell back in CodeSite (shell side, as a
// reader's own choice would) before the next page, so one page's move cannot mask or stand in for another's.
async function judgeCodeSite(page, where, moved) {
  await page.waitForTimeout(SETTLE_MS);
  const v = await shellView(page), h = await hideChat(page);
  if (v !== 'CodeSite' || h !== 0) moved.push(`${where}: view ${v}, "Hide Chat" buttons ${h}`);
  if (v !== 'CodeSite') { await page.evaluate(() => window.DeSciX.view.set('CodeSite')); await page.waitForTimeout(300); }
}
async function go(frame, hash) {
  await frame.evaluate((h) => { location.hash = h; }, hash);
}

test('interior pages keep CodeSite; the librarian opens on demand and the choice survives navigation', async (t) => {
  const browser = await chromium.launch();
  const errors = [], failed = [];
  try {
    const ctx = await browser.newContext({ ignoreHTTPSErrors: true, viewport: { width: 1400, height: 900 } });
    const page = await ctx.newPage();
    page.on('pageerror', (e) => errors.push(e.message));
    page.on('requestfailed', (r) => { if (r.url().startsWith(new URL(SHELL).origin)) failed.push(r.url() + ' ' + (r.failure() || {}).errorText); });
    await page.goto(SHELL, { waitUntil: 'load' });
    await page.waitForFunction(() => window.DeSciX && window.DeSciX.view && typeof window.DeSciX.view.get === 'function', null, { polling: 100, timeout: 30000 });
    let app = await appFrame(page);
    await app.waitForSelector('html[data-descix-view]', { timeout: 30000 });
    const moved = [];
    await judgeCodeSite(page, 'front page', moved);
    await shot(page, '1-front');

    const base = app.url().replace(/[#?].*$/, '').replace(/[^/]*$/, '');
    await app.goto(base + 'library.html#' + DOC);
    app = await appFrame(page);
    await app.waitForFunction(() => window.EGPTViewer && document.body.classList.contains('is-reading'), null, { polling: 100 });
    await judgeCodeSite(page, 'library document ' + DOC, moved);
    await shot(page, '2-document');

    await app.click('[data-home]');
    await app.waitForFunction(() => !document.body.classList.contains('is-reading'), null, { polling: 100 });
    await judgeCodeSite(page, 'library landing', moved);
    await shot(page, '3-landing');

    await go(app, '#' + BOOK);
    await app.waitForFunction(() => document.body.classList.contains('is-reading') && /book-cover|book-way/.test(document.getElementById('content-rendered').innerHTML), null, { polling: 100 });
    await judgeCodeSite(page, 'book page ' + BOOK, moved);
    await shot(page, '4-book');
    assert.deepStrictEqual(moved, [], 'the shell view moved without the reader');

    const btn = app.locator('#ask-librarian');
    assert.strictEqual(await btn.count(), 1, 'no "Ask the librarian" control in the shell');
    assert.ok(await btn.isVisible(), '"Ask the librarian" is not visible');
    await btn.click();
    const { attr, outcomes, stamp } = await app.evaluate(() => {
      const a = window.EGPTViewer.VIEW_ATTR;
      return { attr: a, outcomes: window.DeSciX.VIEW_OUTCOMES, stamp: document.documentElement.getAttribute(a) };
    });
    assert.ok(attr, 'EGPTViewer.VIEW_ATTR is not published');
    const accepted = { [`${outcomes.REQUESTED}:SplitView`]: 'SplitView', [`${outcomes.FALLBACK}:Chat`]: 'Chat' };
    t.diagnostic(`${attr}=${stamp}`);
    assert.ok(stamp in accepted, `${attr}=${stamp}; expected one of ${Object.keys(accepted).join(', ')}`);
    await page.waitForTimeout(SETTLE_MS);
    const opened = await shellView(page);
    assert.strictEqual(opened, accepted[stamp], 'the shell view does not match the recorded outcome');
    await shot(page, '5-librarian');

    for (const p of [PDF, READING]) {
      await go(app, '#' + p);
      await app.waitForFunction((q) => window.EGPTViewer.currentPath() === q, p, { polling: 100 });
      await page.waitForTimeout(SETTLE_MS);
      assert.strictEqual(await shellView(page), opened, `${p}: the viewer moved the reader's view`);
    }
    await shot(page, '6-reading-page-keeps-chat');
    assert.deepStrictEqual(errors, [], 'page errors');
    assert.deepStrictEqual(failed, [], 'failed same-origin requests');
  } finally {
    await browser.close();
  }
});

test('no shell or no bridge: no control and no error', async () => {
  const browser = await chromium.launch();
  try {
    const ctx = await browser.newContext({ ignoreHTTPSErrors: true });
    const top = await ctx.newPage();                       // a top-level load: the bridge finds no shell
    const page = await top.goto(SHELL, { waitUntil: 'load' }).then(() => appFrame(top));
    const lib = page.url().replace(/[#?].*$/, '').replace(/[^/]*$/, '') + 'library.html#' + DOC;
    for (const refuseBridge of [false, true]) {
      const p = await ctx.newPage(), errors = [];
      p.on('pageerror', (e) => errors.push(e.message));
      if (refuseBridge) await p.route(/DeSciXAppSDK\.js$/, (r) => r.abort());
      await p.goto(lib, { waitUntil: 'load' });
      await p.waitForFunction(() => window.EGPTViewer && document.body.classList.contains('is-reading'), null, { polling: 100 });
      const mode = await p.evaluate(() => window.DeSciX ? window.DeSciX.ready().then((r) => r.mode) : 'no-bridge');
      assert.strictEqual(mode, refuseBridge ? 'no-bridge' : 'standalone');
      await p.waitForTimeout(SETTLE_MS);
      assert.strictEqual(await p.locator('#ask-librarian').count(), 0, `${mode}: the control is present`);
      assert.deepStrictEqual(errors, [], `${mode}: page errors`);
      if (SHOTS) await p.screenshot({ path: `${SHOTS}/7-${mode}.png` });
      await p.close();
    }
  } finally {
    await browser.close();
  }
});
