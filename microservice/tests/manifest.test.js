/**
 * WS-MCP-SELF-DESCRIBING — egpt manifest is self-describing for MCP publishing.
 *
 * The platform's MCP `tools/list` derives each external tool's description + inputSchema
 * straight from this manifest (serviceManifestManager.registerService ->
 * externalCommandRegistry -> getExternalTools). So a complete, accurate manifest IS the
 * published MCP surface. These tests guard that surface.
 *
 * Run from microservice/:  node --test tests/manifest.test.js
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MANIFEST = path.join(__dirname, '..', 'manifest.json');

async function loadManifest() {
    return JSON.parse(await fs.readFile(MANIFEST, 'utf8'));
}

test('every command has a non-trivial description and an object inputSchema', async () => {
    const m = await loadManifest();
    for (const [name, cfg] of Object.entries(m.commands)) {
        assert.ok(cfg.description && cfg.description.length >= 20, `${name}: weak/empty description`);
        assert.equal(cfg.inputSchema?.type, 'object', `${name}: inputSchema.type must be 'object'`);
        assert.ok(cfg.inputSchema.properties, `${name}: inputSchema.properties missing`);
        for (const r of (cfg.inputSchema.required || [])) {
            assert.ok(r in cfg.inputSchema.properties, `${name}: required '${r}' not declared in properties`);
        }
    }
});

test('podcast_publish_episode documents BOTH the mp3 fast path and the transcode slow path', async () => {
    const m = await loadManifest();
    const pe = m.commands.podcast_publish_episode;
    assert.ok(pe, 'podcast_publish_episode missing');
    const d = pe.description.toLowerCase();
    assert.match(d, /fast path/, 'description must name the mp3 fast path');
    assert.match(d, /slow path/, 'description must name the slow (transcode) path');
    assert.match(d, /-16 lufs|loudness/, 'description must mention loudness normalization (slow path)');
    assert.match(d, /fast_path/, 'description must document the fast_path return flag');
});

test('podcast_publish_episode schema exposes the fast-path knobs', async () => {
    const m = await loadManifest();
    const props = m.commands.podcast_publish_episode.inputSchema.properties;
    for (const k of ['mp3', 'enclosureLength', 'duration', 'audio']) {
        assert.ok(k in props, `fast-path knob '${k}' missing from publish_episode schema`);
    }
    assert.match(props.audio.description.toLowerCase(), /gs:\/\/|https?:\/\//,
        'audio description must explain the gs:///https:// ref requirement for the fast path');
});

test('command handlers all reference podcastCommands.* (no dangling handler refs)', async () => {
    const m = await loadManifest();
    for (const [name, cfg] of Object.entries(m.commands)) {
        assert.match(cfg.handler, /^podcastCommands\./, `${name}: unexpected handler '${cfg.handler}'`);
    }
});
