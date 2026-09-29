/**
 * egpt podcast Microservice — Express Server (control plane); re-homed from daita-ssgpod 2026-09-29
 *
 * DeSciX SSG Podcast Server. Exposes 6 podcast-publishing commands via
 * POST /api/:command and POST /apifront/ (Core broker proxy compatibility).
 *
 * TWO-PLANE design (WS-SSGPOD, CEO-D-2026-06-01):
 *   - Control plane (this service): manages episode state in Firestore and
 *     builds/publishes the static feed. Agent/CLI-facing; NOT in Apple's path.
 *   - Publish plane (static GCS): feed.xml + mp3 enclosures + cover art that
 *     Apple Podcasts polls. Written via the Core broker loopback (publisher.js).
 *
 * Bootstraps via @descix/cloud-core. Port 3015 (from defaults-config.json).
 */

import express from 'express';
import http from 'http';
import cors from 'cors';
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

import { initializeServiceConfig, utils } from './services/utils.js';
import { killExistingProcess } from '@descix/cloud-core';
import * as podcast from './services/podcastCommands.js';
// WS-EDGE-MESH wave 2 — signed `_descix` mesh verification (opt-in; deployed WARN on demo).
import { buildSsgpodMeshVerifier } from './services/meshVerify.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// ── Command Map ──────────────────────────────────────────────────────────────

const COMMAND_MAP = {
    podcast_create_show: podcast.createShow,
    podcast_publish_episode: podcast.publishEpisode,
    podcast_unpublish_episode: podcast.unpublishEpisode,
    podcast_list_episodes: podcast.listEpisodes,
    podcast_regenerate_feed: podcast.regenerateFeed,
    podcast_validate_feed: podcast.validateFeedCommand,
};

async function dispatch(command, params, res) {
    const handler = COMMAND_MAP[command];
    if (!handler) {
        return res.status(404).json({
            success: false,
            error: `Unknown command: ${command}`,
            available_commands: Object.keys(COMMAND_MAP),
        });
    }
    try {
        const result = await handler(params);
        res.json(result);
    } catch (err) {
        console.error(`[ssgpod] Error in ${command}:`, err.message);
        res.status(400).json({ success: false, error: err.message });
    }
}

// ── Server ─────────────────────────────────────────────────────────────────

initializeServiceConfig().then(() => {
    killExistingProcess(import.meta.url, utils.DEBUG_LOCAL, utils.PORT);

    app.use(cors({ origin: true }));
    app.use(express.json({ limit: '4mb' }));

    // WS-EDGE-MESH wave 2: mount the mesh verifier on the /api command routes (the
    // surface Core's apifront proxies to, carrying the signed _descix). Null when
    // MESH_CTX_VERIFY_MODE is unset (opt-in — unchanged behavior). WARN mode observes
    // signed vs unsigned traffic without rejecting. express.json() above already
    // parsed req.body._descix. Mirrors BEAST/Powch meshVerifyGate.
    const meshVerifier = buildSsgpodMeshVerifier(utils);
    if (meshVerifier) {
        app.use('/api', meshVerifier);
        console.log(`[ssgpod] Mesh context verification ENABLED (mode=${utils.MESH_CTX_VERIFY_MODE}, keyId=${utils.MESH_CTX_KEY_ID})`);
    }

    app.get('/health', (req, res) => {
        res.json({ status: 'ok', service: 'egpt', version: '1.0.0', plane: 'control' });
    });

    app.get('/manifest', async (req, res) => {
        try {
            const manifest = JSON.parse(await readFile(join(__dirname, 'manifest.json'), 'utf-8'));
            res.json(manifest);
        } catch {
            res.status(500).json({ error: 'Could not load manifest' });
        }
    });

    // Direct invocation: POST /api/:command
    app.post('/api/:command', (req, res) => dispatch(req.params.command, req.body, res));

    // Core broker proxy: POST /apifront/  with { command, ...params }
    app.post('/apifront/', (req, res) => {
        const { command, ...params } = req.body;
        dispatch(command, params, res);
    });

    const port = utils.PORT;
    if (!port || port === 'auto') {
        console.error('[ssgpod] CRITICAL: Port unresolved. Gateway/config bootstrap failed.');
        process.exit(1);
    }

    // Bind with a bounded retry on EADDRINUSE — killExistingProcess(port) SIGKILLs the
    // prior instance synchronously, but the kernel may not have released the socket yet
    // on a fast dev restart (CEO-D-2026-06-01-SCAFFOLD-RESIDUALS). Non-EADDRINUSE errors
    // fail loud. Mirrors the scaffold template.
    const server = http.createServer(app);
    let attempt = 0;
    const RETRIES = 10, DELAY_MS = 150;
    server.on('error', (err) => {
        if (err && err.code === 'EADDRINUSE' && attempt < RETRIES) {
            attempt += 1;
            console.warn(`[ssgpod] Port ${port} busy (EADDRINUSE), retry ${attempt}/${RETRIES} in ${DELAY_MS}ms...`);
            setTimeout(() => server.listen(port), DELAY_MS);
            return;
        }
        console.error(`[ssgpod] Failed to bind port ${port}:`, err?.message || err);
        process.exit(1);
    });
    server.on('listening', () => {
        console.log(`[ssgpod] Listening on port ${port} (env: ${utils.DEPLOY_ENV || 'unknown'})`);
        console.log(`[ssgpod] Commands: ${Object.keys(COMMAND_MAP).join(', ')}`);
    });
    server.listen(port);
}).catch(err => {
    console.error('[ssgpod] Failed to initialize config:', err);
    process.exit(1);
});

export default app;
export { COMMAND_MAP };
