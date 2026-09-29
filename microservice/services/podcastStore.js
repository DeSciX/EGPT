/**
 * Podcast record store — the app's OWN KB as its database (no platform internals).
 *
 * Per CEO-D-2026-06-01-APP-DEV-MODEL: an app persists structured records as KB
 * chunks with custom metadata via the descix API surface (the mesh `app_records_*`
 * facade), NEVER by importing CacheFirestore / pineconeService / raw clients. The
 * app's KB IS its database — hybrid search: metadata-filtered structured queries
 * (here) or ANN (elsewhere).
 *
 * Layout (KB `Podcast`, one chunk per record):
 *   file_id `show--{show}`            type=show      → channel metadata
 *   file_id `ep--{sanitized guid}`    type=episode   → per-episode state
 * The full record object is stored as the string field `record_json` (Pinecone
 * metadata can't hold objects); flat scalar fields (type/show/guid/season/episode)
 * are the filterable columns. `text` is the embedding content (also enables ANN).
 *
 * CONSISTENCY: `app_records_query` (used by listEpisodes) is a Pinecone prefix-list →
 * eventually consistent (may lag a just-written record by a short interval). Callers
 * doing publish-then-regenerate must NOT rely on reading their own write — see the
 * union reconciliation in podcastCommands.regenerateAndPublish. getShow uses a
 * by-id fetch with an explicit projection (fetchChunkMetadata path), which is more
 * consistent than the scan.
 */

/*
 * AUTH/TRANSPORT: every function takes an `invoke(command, params)` invoker — the
 * developer-identity Core api-client (createServiceApiClient; the app microservice IS the
 * CLI's REST client running in the cloud, authenticated AS THE DEVELOPER via their durable
 * wallet credential — NOT the per-request end-user; CEO-D-2026-06-02-APP-MICROSERVICE-IS-CLI
 * -CLIENT-WALLET-SIG). It routes to the Core broker's `app_records_*` facade. The legacy
 * `kb_records_*` aliases are deprecated — we use the canonical `app_records_*` names only.
 */

export const KB_ID = 'Podcast';

function requireStr(name, val) {
    if (typeof val !== 'string' || val.trim() === '') {
        throw new Error(`Missing required field: ${name}`);
    }
    return val;
}

// file_id must not contain the ':' chunk-id separator — sanitize the guid.
const showFileId = (show) => `show--${show.replace(/[^a-zA-Z0-9_-]/g, '_')}`;
const epFileId = (guid) => `ep--${guid.replace(/[^a-zA-Z0-9_-]/g, '_')}`;

// ── Shows ────────────────────────────────────────────────────────────────────

/**
 * Upsert a show's channel-level metadata (type=show record).
 */
export async function putShow(invoke, appId, show, channel) {
    requireStr('app_id', appId);
    requireStr('show', show);
    const now = new Date().toISOString();
    const record = { ...channel, app_id: appId, show, updated_at: now, created_at: channel.created_at || now };
    await invoke('app_records_put', {
        app_id: appId,
        kb_id: KB_ID,
        records: [{
            file_id: showFileId(show),
            text: `${channel.title || show}\n${channel.description || ''}`.trim(),
            type: 'show',
            show,
            record_json: JSON.stringify(record),
        }],
    });
    return record;
}

/**
 * Fetch a show's channel metadata, or null. Uses a by-id projection fetch
 * (more consistent than the prefix-list scan) on just `record_json`.
 */
export async function getShow(invoke, appId, show) {
    requireStr('app_id', appId);
    requireStr('show', show);
    // Fetch by file_id (the record's grouping key / Firestore doc key) — NOT the
    // composite chunk-id (a Pinecone-era artifact; the Firestore-backed store keys
    // records by file_id). app_records_get accepts file_ids per its contract.
    const res = await invoke('app_records_get', {
        app_id: appId,
        kb_id: KB_ID,
        file_ids: [showFileId(show)],
        fields: ['record_json'],
    });
    const rec = (res?.records || []).find(r => r.record_json);
    if (!rec) return null;
    try {
        return JSON.parse(rec.record_json);
    } catch {
        return null;
    }
}

// ── Episodes ─────────────────────────────────────────────────────────────────

/**
 * Upsert an episode (type=episode record). `guid` is stable; the feed is
 * regenerated from the full episode set (idempotent).
 */
export async function putEpisode(invoke, appId, show, guid, episode) {
    requireStr('app_id', appId);
    requireStr('show', show);
    requireStr('guid', guid);
    const record = { ...episode, guid, show, app_id: appId, updated_at: new Date().toISOString() };
    const flat = {
        file_id: epFileId(guid),
        text: `${episode.title || ''}\n${episode.description || ''}`.trim() || guid,
        type: 'episode',
        show,
        guid,
        record_json: JSON.stringify(record),
    };
    // Only include numeric scalars when present (Pinecone skips null metadata).
    if (typeof episode.season === 'number') flat.season = episode.season;
    if (typeof episode.episode === 'number') flat.episode = episode.episode;
    if (typeof episode.pubDate === 'string') flat.pubDate = episode.pubDate;
    await invoke('app_records_put', { app_id: appId, kb_id: KB_ID, records: [flat] });
    return record;
}

/**
 * Delete an episode by guid. Returns true if anything was removed.
 */
export async function deleteEpisode(invoke, appId, show, guid) {
    requireStr('app_id', appId);
    requireStr('guid', guid);
    const res = await invoke('app_records_delete', {
        app_id: appId,
        kb_id: KB_ID,
        file_ids: [epFileId(guid)],
    });
    return (res?.deleted_count || 0) > 0;
}

/**
 * List all episodes for a show (structured metadata scan), newest pubDate first.
 * EVENTUALLY CONSISTENT — see module note; do not rely on reading a just-written
 * episode here (callers reconcile via the union in regenerateAndPublish).
 */
export async function listEpisodes(invoke, appId, show) {
    requireStr('app_id', appId);
    requireStr('show', show);
    const res = await invoke('app_records_query', {
        app_id: appId,
        kb_id: KB_ID,
        filter: { type: 'episode', show },
        fields: ['record_json'],
    });
    const episodes = [];
    for (const rec of res?.records || []) {
        if (!rec.record_json) continue;
        try { episodes.push(JSON.parse(rec.record_json)); } catch { /* skip corrupt */ }
    }
    episodes.sort((a, b) => {
        const ta = a.pubDate ? Date.parse(a.pubDate) : 0;
        const tb = b.pubDate ? Date.parse(b.pubDate) : 0;
        return tb - ta;
    });
    return episodes;
}

/**
 * Read episodes with a stability guard against app_records_query's eventual
 * consistency: poll until two consecutive reads agree on count, then return.
 * Used by the standalone read commands (list/validate/regenerate) so they can't
 * act on a transient under-count — e.g. regenerate_feed must NOT republish a
 * shrunken feed because a read momentarily lagged a write. (publish/unpublish
 * don't need this — they reconcile via the in-hand delta union.)
 */
export async function listEpisodesStable(invoke, appId, show, { maxAttempts = 5, delayMs = 1500 } = {}) {
    let prev = null;
    for (let i = 0; i < maxAttempts; i++) {
        const eps = await listEpisodes(invoke, appId, show);
        if (prev !== null && eps.length === prev.length) return eps; // converged
        prev = eps;
        if (i < maxAttempts - 1) await new Promise(r => setTimeout(r, delayMs));
    }
    return prev; // best effort after maxAttempts
}
