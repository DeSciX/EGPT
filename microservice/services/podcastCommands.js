/**
 * Podcast command handlers (the 6 WS-SSGPOD control-plane commands).
 *
 * All commands: guestAllowed:false (enforced in manifest.json; here we hard-fail
 * on missing required inputs — no hardcoded fallbacks, anti-pattern #7).
 *
 * Episode state lives in the app's own KB (the `app_records_*` mesh facade — the
 * app's KB is its database; no platform internals). feed.xml is regenerated from
 * that state on every mutation (idempotent) and republished to the static plane.
 */

import { promises as fs } from 'fs';
import path from 'path';
import * as store from './podcastStore.js';
import * as audio from './audioProcessor.js';
import * as feedBuilder from './feedBuilder.js';
import { validateFeed } from './feedValidator.js';
import * as publisher from './publisher.js';
import { getInvoke } from './serviceClient.js';

const APP_ID = publisher.APP_ID;

/**
 * AUTH/IDENTITY: every command runs AS THE DEVELOPER (the app owner), a FIXED module-scope
 * identity — NOT the per-request end-user. `getInvoke()` returns the memoized
 * developer-identity Core api-client (createServiceApiClient, authenticated by the
 * developer's durable wallet credential; CEO-D-2026-06-02-APP-MICROSERVICE-IS-CLI-CLIENT
 * -WALLET-SIG). There is no per-request `_descix`/user threading and no per-request client.
 */

function req(params, name) {
    const v = params?.[name];
    if (v === undefined || v === null || (typeof v === 'string' && v.trim() === '')) {
        throw new Error(`Missing required parameter: ${name}`);
    }
    return v;
}

function genGuid(appId, show) {
    return `${appId}:${show}:${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function episodeFileName(episodeNumber, guid) {
    if (episodeNumber !== undefined && episodeNumber !== null) {
        return `ep-${String(episodeNumber).padStart(4, '0')}.mp3`;
    }
    // Deterministic from guid tail when no episode number given.
    const tail = guid.split(':').pop();
    return `ep-${tail}.mp3`;
}

/**
 * Channel-level validation for required Apple fields (used by create_show).
 */
function validateChannelInput(channel) {
    const missing = [];
    for (const k of ['title', 'author', 'category', 'language', 'image', 'description']) {
        if (!channel[k] || String(channel[k]).trim() === '') missing.push(k);
    }
    if (channel.explicit === undefined || channel.explicit === null) missing.push('explicit');
    if (!channel.ownerEmail && !channel.email) missing.push('ownerEmail');
    return missing;
}

// ── 1. create_show ──────────────────────────────────────────────────────────

export async function createShow(params) {
    const show = req(params, 'show');
    const invoke = getInvoke();

    // Cover art: Apple requires an ABSOLUTE itunes:image URL (square 1400-3000px).
    // If a local coverPath is given, upload it to the show's GCS site path and use
    // that absolute public URL; otherwise an explicit absolute `image` URL is required.
    let imageUrl = params.image;
    const coverPath = params.coverPath || params.cover_path;
    if (coverPath) {
        const ext = (path.extname(coverPath).slice(1).toLowerCase() || 'jpg').replace('jpeg', 'jpg') === 'jpg' ? 'jpg' : 'png';
        const coverFile = `cover.${ext}`;
        const coverBuf = await fs.readFile(coverPath);
        const contentType = ext === 'png' ? 'image/png' : 'image/jpeg';
        const { bucket, prefix } = await publisher.publishAssets(invoke, [
            { path: publisher.relPath(show, coverFile), contentType, body: coverBuf },
        ]);
        imageUrl = publisher.gcsPublicUrl(bucket, prefix, show, coverFile);
    }

    const channel = {
        title: req(params, 'title'),
        author: req(params, 'author'),
        category: req(params, 'category'),
        language: req(params, 'language'),
        explicit: req(params, 'explicit'),
        image: imageUrl,
        description: req(params, 'description'),
        ownerEmail: params.ownerEmail || params.email,
        ownerName: params.ownerName || params.author,
        link: params.link || imageUrl,
    };
    if (!channel.image || String(channel.image).trim() === '') {
        throw new Error('create_show: an absolute image URL is required (pass coverPath to upload, or image=<absolute URL>)');
    }
    const missing = validateChannelInput(channel);
    if (missing.length > 0) {
        throw new Error(`create_show: missing/invalid Apple channel fields: ${missing.join(', ')}`);
    }
    const saved = await store.putShow(invoke, APP_ID, show, channel);
    return { success: true, app_id: APP_ID, show, image_url: imageUrl, channel: saved };
}

// ── shared: regenerate + publish feed ────────────────────────────────────────

function sortByPubDateDesc(episodes) {
    return episodes.sort((a, b) => {
        const ta = a.pubDate ? Date.parse(a.pubDate) : 0;
        const tb = b.pubDate ? Date.parse(b.pubDate) : 0;
        return tb - ta;
    });
}

async function regenerateAndPublish(invoke, show, opts = {}) {
    const channel = await store.getShow(invoke, APP_ID, show);
    if (!channel) throw new Error(`Show not found: ${show}`);
    // Mutations (publish/unpublish) reconcile via the in-hand delta union below, so a
    // fast read is fine. Standalone regen (no delta) uses the stability guard so it
    // can't republish a shrunken feed off a transiently-lagging read.
    let episodes = (opts.ensureEpisode || opts.removeGuid)
        ? await store.listEpisodes(invoke, APP_ID, show)
        : await store.listEpisodesStable(invoke, APP_ID, show);
    if (opts.removeGuid) {
        episodes = episodes.filter(e => e.guid !== opts.removeGuid);
    }
    if (opts.ensureEpisode && opts.ensureEpisode.guid) {
        const g = opts.ensureEpisode.guid;
        episodes = sortByPubDateDesc([opts.ensureEpisode, ...episodes.filter(e => e.guid !== g)]);
    }
    const feedXml = feedBuilder.buildFeed(channel, episodes);
    // Publish the feed and form its ABSOLUTE public URL from the deploy token's
    // bucket+prefix (Apple requires absolute URLs; works in every env).
    const { bucket, prefix } = await publisher.publishAssets(invoke, [
        { path: publisher.relPath(show, 'feed.xml'), contentType: 'application/rss+xml', body: feedXml },
    ]);
    const feedUrl = publisher.gcsPublicUrl(bucket, prefix, show, 'feed.xml');
    return { feedXml, feedUrl, episodeCount: episodes.length };
}

// ── 2. publish_episode ────────────────────────────────────────────────────────

export async function publishEpisode(params) {
    const show = req(params, 'show');
    const audioInput = req(params, 'audio');
    const title = req(params, 'title');
    const description = req(params, 'description');
    const invoke = getInvoke();

    const channel = await store.getShow(invoke, APP_ID, show);
    if (!channel) throw new Error(`Show not found: ${show}. Create it first with podcast_create_show.`);

    const guid = params.guid || genGuid(APP_ID, show);
    const pubDate = params.pubDate || new Date().toISOString();
    const fileName = episodeFileName(params.episode, guid);

    // Resolve the enclosure. FAST PATH: an already-encoded mp3 (the SSG pipeline / app dev
    // produced it, uploaded via `descix app media-upload`) is used AS-IS — no transcode, no
    // re-upload — so publish stays synchronous + fast (a long transcode would exceed the
    // Cloudflare ~60s request timeout). SLOW PATH: transcode other formats (m4a) to mp3.
    const isMp3 = /\.mp3(\?|$)/i.test(audioInput) || params.mp3 === true;
    let enclosureUrl, enclosureLength, durationSeconds;

    if (isMp3) {
        if (!/^(gs|https?):\/\//.test(audioInput)) {
            throw new Error('publish_episode (mp3 fast path): upload the mp3 first and pass its gs:// ref from `descix app media-upload`.');
        }
        enclosureUrl = publisher.publicUrlFromRef(audioInput);
        enclosureLength = params.enclosureLength ?? await publisher.headContentLength(audioInput);
        durationSeconds = params.duration ?? await audio.probeDurationSeconds(enclosureUrl);
    } else {
        const tempDir = await audio.makeTempDir();
        try {
            // A gs:// / http(s) ref is streamed from the public GCS bucket to disk; a plain
            // local path (dev) is used as-is. Long transcodes may exceed the request timeout —
            // prefer the mp3 fast path.
            let localAudioPath = audioInput;
            if (/^(gs|https?):\/\//.test(audioInput)) {
                const base = path.basename(audioInput.split('?')[0]) || 'audio';
                localAudioPath = path.join(tempDir, `source-${base}`);
                await publisher.streamAssetToFile(audioInput, localAudioPath);
            }
            const id3 = {
                title,
                artist: channel.author,
                album: channel.title,
                imagePath: params.imagePath || params.image_path || undefined,
                chapters: Array.isArray(params.chapters)
                    ? params.chapters.map(c => ({ startMs: c.startMs, endMs: c.endMs, title: c.title }))
                    : undefined,
            };
            const out = await audio.processEpisodeAudio({ inputPath: localAudioPath, outDir: tempDir, id3 });
            // Upload the transcoded mp3 as the canonical enclosure (absolute URL for Apple).
            const enclosureRel = publisher.relPath(show, fileName);
            const mp3Buffer = await fs.readFile(out.mp3Path);
            const { bucket, prefix } = await publisher.publishAssets(invoke, [
                { path: enclosureRel, contentType: 'audio/mpeg', body: mp3Buffer },
            ]);
            enclosureUrl = publisher.gcsPublicUrl(bucket, prefix, show, fileName);
            enclosureLength = out.enclosureLength;
            durationSeconds = out.durationSeconds;
        } finally {
            await fs.rm(tempDir, { recursive: true, force: true }).catch(() => {});
        }
    }

    // Append episode state (source of truth), then regenerate + publish the feed.
    const episodeState = {
        title,
        description,
        contentEncoded: params.contentEncoded || description,
        pubDate,
        enclosureUrl,
        enclosureLength,
        enclosureType: 'audio/mpeg',
        durationSeconds,
        itunesDuration: feedBuilder.toItunesDuration(durationSeconds),
        season: params.season ?? null,
        episode: params.episode ?? null,
        explicit: params.explicit ?? channel.explicit,
        fileName,
    };
    await store.putEpisode(invoke, APP_ID, show, guid, episodeState);

    // Pass the just-published episode so the feed is correct even if the KB read-back lags.
    const { feedUrl } = await regenerateAndPublish(invoke, show, {
        ensureEpisode: { ...episodeState, guid },
    });

    return {
        success: true,
        app_id: APP_ID,
        show,
        guid,
        episode_url: enclosureUrl,
        enclosure_length: enclosureLength,
        duration_seconds: durationSeconds,
        fast_path: isMp3,
        feed_url: feedUrl,
    };
}

// ── 3. unpublish_episode ──────────────────────────────────────────────────────

export async function unpublishEpisode(params) {
    const show = req(params, 'show');
    const guid = req(params, 'guid');
    const invoke = getInvoke();

    const removed = await store.deleteEpisode(invoke, APP_ID, show, guid);
    if (!removed) {
        return { success: false, app_id: APP_ID, show, guid, reason: 'episode not found' };
    }
    // Pass the removed guid so feed regen excludes it even if the KB delete lags.
    const { feedUrl, episodeCount } = await regenerateAndPublish(invoke, show, { removeGuid: guid });
    return { success: true, app_id: APP_ID, show, guid, feed_url: feedUrl, remaining: episodeCount };
}

// ── 4. list_episodes ──────────────────────────────────────────────────────────

export async function listEpisodes(params) {
    const show = req(params, 'show');
    const invoke = getInvoke();
    const channel = await store.getShow(invoke, APP_ID, show);
    if (!channel) throw new Error(`Show not found: ${show}`);
    const episodes = await store.listEpisodesStable(invoke, APP_ID, show);
    const feedUrl = await publisher.resolvePublicUrl(invoke, show, 'feed.xml');
    return {
        success: true,
        app_id: APP_ID,
        show,
        count: episodes.length,
        episodes: episodes.map(e => ({
            guid: e.guid,
            title: e.title,
            pubDate: e.pubDate,
            episode_url: e.enclosureUrl,
            duration_seconds: e.durationSeconds,
            season: e.season ?? null,
            episode: e.episode ?? null,
        })),
        feed_url: feedUrl,
    };
}

// ── 5. regenerate_feed ────────────────────────────────────────────────────────

export async function regenerateFeed(params) {
    const show = req(params, 'show');
    const invoke = getInvoke();
    const { feedUrl, episodeCount } = await regenerateAndPublish(invoke, show);
    return { success: true, app_id: APP_ID, show, feed_url: feedUrl, episode_count: episodeCount };
}

// ── 6. validate_feed ──────────────────────────────────────────────────────────

export async function validateFeedCommand(params) {
    const show = req(params, 'show');
    const invoke = getInvoke();
    const channel = await store.getShow(invoke, APP_ID, show);
    if (!channel) throw new Error(`Show not found: ${show}`);
    const episodes = await store.listEpisodesStable(invoke, APP_ID, show);
    const feedXml = feedBuilder.buildFeed(channel, episodes);

    const imageDims = (typeof params.imageWidth === 'number' && typeof params.imageHeight === 'number')
        ? { width: params.imageWidth, height: params.imageHeight }
        : undefined;

    const result = validateFeed(feedXml, imageDims ? { imageDims } : {});
    return {
        success: true,
        app_id: APP_ID,
        show,
        pass: result.pass,
        violations: result.violations,
        item_count: episodes.length,
    };
}
