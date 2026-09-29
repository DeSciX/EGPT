import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildFeed } from '../services/feedBuilder.js';
import { validateFeed } from '../services/feedValidator.js';

const channel = {
    title: 'T', author: 'A', category: 'Science', language: 'en-us',
    explicit: false, image: 'https://x/cover.png', description: 'D',
    ownerEmail: 'owner@descix.net', ownerName: 'O', link: 'https://x/',
};
const ep = {
    guid: 'g:1', title: 'E1', description: 'd', contentEncoded: 'd',
    pubDate: '2026-06-01T00:00:00Z', enclosureUrl: 'https://x/e.mp3',
    enclosureLength: 100, enclosureType: 'audio/mpeg', durationSeconds: 60,
};

test('valid feed passes with square 1400 image dims', () => {
    const r = validateFeed(buildFeed(channel, [ep]), { imageDims: { width: 1400, height: 1400 } });
    assert.equal(r.pass, true, r.violations.join('; '));
});

test('flags non-square image', () => {
    const r = validateFeed(buildFeed(channel, [ep]), { imageDims: { width: 1400, height: 1200 } });
    assert.equal(r.pass, false);
    assert.ok(r.violations.some(v => /square/.test(v)));
});

test('flags out-of-range image size', () => {
    const r = validateFeed(buildFeed(channel, [ep]), { imageDims: { width: 800, height: 800 } });
    assert.ok(r.violations.some(v => /1400-3000/.test(v)));
});

test('reports image unverified when dims absent', () => {
    const r = validateFeed(buildFeed(channel, [ep]));
    assert.ok(r.violations.some(v => /unverified/.test(v)));
});

test('flags wrong enclosure type', () => {
    const xml = buildFeed(channel, [{ ...ep, enclosureType: 'audio/x-wav' }]);
    const r = validateFeed(xml, { imageDims: { width: 1400, height: 1400 } });
    assert.ok(r.violations.some(v => /enclosure type must be audio\/mpeg/.test(v)));
});

test('flags missing RSS version', () => {
    const r = validateFeed('<rss xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd"><channel></channel></rss>');
    assert.ok(r.violations.some(v => /version="2.0"/.test(v)));
});

test('flags feed with no items', () => {
    const r = validateFeed(buildFeed(channel, []), { imageDims: { width: 1400, height: 1400 } });
    assert.ok(r.violations.some(v => /no <item>/.test(v)));
});

test('flags non-RFC822 pubDate', () => {
    // Build manually with a bad pubDate (bypass builder which enforces RFC822).
    const good = buildFeed(channel, [ep]);
    const bad = good.replace(/<pubDate>[^<]*<\/pubDate>/, '<pubDate>2026-06-01</pubDate>');
    const r = validateFeed(bad, { imageDims: { width: 1400, height: 1400 } });
    assert.ok(r.violations.some(v => /not RFC-822/.test(v)));
});

test('flags guid without isPermaLink=false', () => {
    const good = buildFeed(channel, [ep]);
    const bad = good.replace(/<guid isPermaLink="false">/, '<guid>');
    const r = validateFeed(bad, { imageDims: { width: 1400, height: 1400 } });
    assert.ok(r.violations.some(v => /isPermaLink="false"/.test(v)));
});
