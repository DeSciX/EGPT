import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildFeed, toRfc822, toItunesDuration } from '../services/feedBuilder.js';
import { validateFeed } from '../services/feedValidator.js';

const channel = {
    title: 'DeSciX Lab Notes',
    author: 'DeSciX',
    category: 'Science',
    language: 'en-us',
    explicit: false,
    image: 'https://egpt.descix.net/labnotes/cover.png',
    description: 'Notes from the lab.',
    ownerEmail: 'execs@descix.net',
    ownerName: 'DeSciX Execs',
    link: 'https://egpt.descix.net/labnotes/',
};

const episode = {
    guid: 'egpt:labnotes:1717000000000-abc12345',
    title: 'Episode 1: P=NP',
    description: 'We discuss the proof.',
    contentEncoded: '<p>We discuss the <b>proof</b>.</p>',
    pubDate: '2026-06-01T14:00:00.000Z',
    enclosureUrl: 'https://egpt.descix.net/labnotes/ep-0001.mp3',
    enclosureLength: 1234567,
    enclosureType: 'audio/mpeg',
    durationSeconds: 3725,
    itunesDuration: '1:02:05',
    season: 1,
    episode: 1,
    explicit: false,
};

test('toRfc822 produces RFC-822/1123 format', () => {
    assert.match(toRfc822('2026-06-01T14:00:00.000Z'),
        /^[A-Za-z]{3}, \d{2} [A-Za-z]{3} \d{4} \d{2}:\d{2}:\d{2} GMT$/);
});

test('toRfc822 throws on invalid date', () => {
    assert.throws(() => toRfc822('not-a-date'));
});

test('toItunesDuration formats HH:MM:SS and MM:SS', () => {
    assert.equal(toItunesDuration(3725), '1:02:05');
    assert.equal(toItunesDuration(125), '02:05');
    assert.throws(() => toItunesDuration(-1));
});

test('buildFeed produces RSS2.0 + itunes namespace with channel + item', () => {
    const xml = buildFeed(channel, [episode]);
    assert.match(xml, /<rss version="2\.0"/);
    assert.ok(xml.includes('xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd"'));
    assert.ok(xml.includes('xmlns:content="http://purl.org/rss/1.0/modules/content/"'));
    assert.ok(xml.includes('<itunes:owner>'));
    assert.ok(xml.includes('execs@descix.net'));
    assert.ok(xml.includes('isPermaLink="false"'));
    assert.ok(xml.includes('type="audio/mpeg"'));
    assert.ok(xml.includes('length="1234567"'));
    assert.ok(xml.includes('<content:encoded>'));
});

test('buildFeed throws without channel', () => {
    assert.throws(() => buildFeed(null, []));
});

test('GENERATED FEED VALIDATES against Apple requirements (fixture show+episode)', () => {
    const xml = buildFeed(channel, [episode]);
    const result = validateFeed(xml, { imageDims: { width: 1400, height: 1400 } });
    assert.equal(result.pass, true, `violations: ${result.violations.join('; ')}`);
    assert.deepEqual(result.violations, []);
});

test('XML special characters are escaped/CDATA-wrapped safely', () => {
    const xml = buildFeed(
        { ...channel, title: 'A & B <lab> "notes"' },
        [{ ...episode, title: 'Ep <1> & "more"', description: 'x]]>y' }]
    );
    // Must remain well-formed-ish: no raw ]]> leaking, ampersand handled.
    assert.ok(!xml.includes(']]>y'));
    const result = validateFeed(xml, { imageDims: { width: 2000, height: 2000 } });
    assert.equal(result.pass, true, `violations: ${result.violations.join('; ')}`);
});
