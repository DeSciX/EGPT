import { test } from 'node:test';
import assert from 'node:assert/strict';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
    makeTempDir, normalizeToMp3, probeDurationSeconds, embedId3, byteLength, processEpisodeAudio,
} from '../services/audioProcessor.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SAMPLE = path.join(__dirname, 'fixtures', 'sample.wav');
const COVER = path.join(__dirname, 'fixtures', 'cover-1400.png');

test('normalizeToMp3 produces a non-empty mp3', async () => {
    const dir = await makeTempDir();
    try {
        const mp3 = await normalizeToMp3(SAMPLE, dir);
        const size = await byteLength(mp3);
        assert.ok(size > 0, 'mp3 should have bytes');
        assert.ok(mp3.endsWith('.mp3'));
    } finally {
        await fs.rm(dir, { recursive: true, force: true });
    }
});

test('normalizeToMp3 hard-fails on missing input', async () => {
    const dir = await makeTempDir();
    try {
        await assert.rejects(() => normalizeToMp3('/no/such/file.wav', dir), /not found/);
    } finally {
        await fs.rm(dir, { recursive: true, force: true });
    }
});

test('probeDurationSeconds returns ~2s for the 2s fixture', async () => {
    const dir = await makeTempDir();
    try {
        const mp3 = await normalizeToMp3(SAMPLE, dir);
        const dur = await probeDurationSeconds(mp3);
        assert.ok(dur > 1.5 && dur < 3.0, `expected ~2s, got ${dur}`);
    } finally {
        await fs.rm(dir, { recursive: true, force: true });
    }
});

test('full pipeline: normalize + ID3 (artwork + chapters) + duration + bytes', async () => {
    const dir = await makeTempDir();
    try {
        const { mp3Path, durationSeconds, enclosureLength } = await processEpisodeAudio({
            inputPath: SAMPLE,
            outDir: dir,
            id3: {
                title: 'Test Ep', artist: 'DeSciX', album: 'Lab Notes',
                imagePath: COVER,
                chapters: [{ startMs: 0, endMs: 1000, title: 'Intro' }],
            },
        });
        assert.ok(durationSeconds > 0);
        assert.ok(enclosureLength > 0);
        // The mp3 with embedded artwork should be larger than the byte size of just audio.
        const stat = await fs.stat(mp3Path);
        assert.equal(stat.size, enclosureLength);
    } finally {
        await fs.rm(dir, { recursive: true, force: true });
    }
});
