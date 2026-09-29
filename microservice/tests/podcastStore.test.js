import { test } from 'node:test';
import assert from 'node:assert/strict';

/**
 * Record-store test using an in-memory fake of the `app_records_*` mesh facade.
 *
 * podcastStore talks to its KB EXCLUSIVELY through an `invoke(command, params)` invoker —
 * the developer-identity Core api-client (createServiceApiClient; the app microservice IS
 * the CLI's REST client running in the cloud, authenticated AS THE DEVELOPER via their
 * durable wallet credential; CEO-D-2026-06-02-APP-MICROSERVICE-IS-CLI-CLIENT-WALLET-SIG).
 * There is no CacheFirestore / platform internals, no per-request user threading. Each
 * store function takes the `invoke` invoker as its first argument, so the test injects this
 * fake directly — no module patching, no SDK import needed.
 *
 * The fake stands in for the Core broker, emulating the `app_records_*` facade's
 * id-build-from-file_id, the metadata-filter query, by-id get, and file_id delete. It
 * also asserts ONLY the canonical `app_records_*` command names are used (the
 * `kb_records_*` aliases are deprecated and must never be sent).
 */

import * as store from '../services/podcastStore.js';

// In-memory KB: composite id -> flat record (file_id, text, type, show, guid, record_json, ...)
const kb = new Map();
const idFor = (app, kbId, fileId) => `${app}:${kbId}:${fileId}:0`;

// Fake developer-identity Core invoker. Mirrors the createServiceApiClient invoke contract:
// (command, params) => Promise<message-on-OK> (throws on error).
const fakeInvoke = async (command, params = {}) => {
    const { app_id, kb_id } = params || {};
    switch (command) {
        case 'app_records_put': {
            let n = 0;
            for (const rec of params.records || []) {
                if (!rec.file_id) throw new Error('file_id required');
                const id = rec.id || idFor(app_id, kb_id, rec.file_id); // facade builds id from file_id
                kb.set(id, { ...rec, id, app_id, knowledgebase_name: kb_id });
                n++;
            }
            return { success: true, upserted_count: n };
        }
        case 'app_records_get': {
            const wantIds = new Set(params.ids || []);
            const wantFids = new Set(params.file_ids || []);
            const records = [...kb.values()].filter(r => wantIds.has(r.id) || wantFids.has(r.file_id));
            return { success: true, records, count: records.length };
        }
        case 'app_records_query': {
            const f = params.filter || {};
            const records = [...kb.values()].filter(r =>
                Object.entries(f).every(([k, v]) => r[k] === v));
            return { success: true, records, count: records.length, scanned: kb.size, matched: records.length };
        }
        case 'app_records_delete': {
            const fids = new Set(params.file_ids || []);
            let n = 0;
            for (const [id, r] of [...kb.entries()]) {
                if (fids.has(r.file_id)) { kb.delete(id); n++; }
            }
            return { success: true, deleted_count: n };
        }
        default:
            // Guards the kb_records_* -> app_records_* migration: any non-canonical
            // command (e.g. a stray kb_records_put) lands here and fails the test.
            throw new Error(`unexpected command ${command}`);
    }
};

test('putShow persists channel (record_json) and getShow reconstructs it; created_at preserved on update', async () => {
    const s1 = await store.putShow(fakeInvoke, 'egpt', 'labnotes', { title: 'Lab Notes', author: 'DeSciX' });
    assert.equal(s1.show, 'labnotes');
    assert.ok(s1.created_at);
    const got = await store.getShow(fakeInvoke, 'egpt', 'labnotes');
    assert.equal(got.title, 'Lab Notes');
    assert.equal(got.author, 'DeSciX');

    const s2 = await store.putShow(fakeInvoke, 'egpt', 'labnotes', { title: 'Lab Notes v2', author: 'DeSciX', created_at: s1.created_at });
    assert.equal(s2.title, 'Lab Notes v2');
    assert.equal(s2.created_at, s1.created_at); // preserved across update
});

test('getShow returns null for an unknown show', async () => {
    assert.equal(await store.getShow(fakeInvoke, 'egpt', 'nope'), null);
});

test('putShow hard-fails on missing app_id/show', async () => {
    await assert.rejects(() => store.putShow(fakeInvoke, '', 'x', {}), /app_id/);
    await assert.rejects(() => store.putShow(fakeInvoke, 'egpt', '', {}), /show/);
});

test('episode CRUD: put, list (newest first via metadata scan), delete', async () => {
    await store.putEpisode(fakeInvoke, 'egpt', 'labnotes', 'egpt:labnotes:1', { title: 'Older', pubDate: '2026-05-01T00:00:00Z', season: 1, episode: 1 });
    await store.putEpisode(fakeInvoke, 'egpt', 'labnotes', 'egpt:labnotes:2', { title: 'Newer', pubDate: '2026-06-01T00:00:00Z', season: 1, episode: 2 });

    const list = await store.listEpisodes(fakeInvoke, 'egpt', 'labnotes');
    assert.equal(list.length, 2);
    assert.equal(list[0].title, 'Newer'); // newest pubDate first
    assert.equal(list[1].title, 'Older');
    assert.equal(list[0].episode, 2);

    const removed = await store.deleteEpisode(fakeInvoke, 'egpt', 'labnotes', 'egpt:labnotes:1');
    assert.equal(removed, true);
    const after = await store.listEpisodes(fakeInvoke, 'egpt', 'labnotes');
    assert.equal(after.length, 1);
    assert.equal(after[0].title, 'Newer');

    const removeMissing = await store.deleteEpisode(fakeInvoke, 'egpt', 'labnotes', 'no-such-guid');
    assert.equal(removeMissing, false);
});

test('episodes of one show do not leak into another (metadata filter isolation)', async () => {
    await store.putEpisode(fakeInvoke, 'egpt', 'otherShow', 'g-other', { title: 'Other', pubDate: '2026-06-02T00:00:00Z' });
    const labnotes = await store.listEpisodes(fakeInvoke, 'egpt', 'labnotes');
    assert.ok(labnotes.every(e => e.show === 'labnotes'));
});

test('listEpisodesStable converges on a stable count and threads the same invoker', async () => {
    // Two episodes already present (from the CRUD test's leftover 'Newer' + otherShow).
    // listEpisodesStable polls listEpisodes until two reads agree; with a stable fake it
    // converges on the first comparison. Use a short delay so the test stays fast.
    const eps = await store.listEpisodesStable(fakeInvoke, 'egpt', 'labnotes', { maxAttempts: 3, delayMs: 1 });
    assert.ok(Array.isArray(eps));
    assert.ok(eps.every(e => e.show === 'labnotes'));
});
