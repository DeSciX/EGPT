/**
 * Static publish plane (GCS).
 *
 * TWO-PLANE design: this microservice is the BUILDER/PUBLISHER, not the
 * request-time feed server. Apple only ever polls the STATIC feed.xml on GCS.
 *
 * Canonical publish path: the microservice does NOT import googleStorageService
 * directly (it lives in DeSciX_Cloud/microservice, not @descix/cloud-core —
 * importing across that package boundary violates anti-pattern #1). Instead it
 * writes static assets through the Core broker via the developer-identity api-client
 * `invoke` (createServiceApiClient — the app microservice IS the CLI's REST client
 * running in the cloud, authenticated AS THE DEVELOPER via their durable wallet
 * credential; CEO-D-2026-06-02-APP-MICROSERVICE-IS-CLI-CLIENT-WALLET-SIG), exactly as
 * the CLI `descix site upload` does:
 *
 *   1. get_site_deploy_token  -> signed PUT URLs under {env}/{app_id}/site/...
 *   2. PUT bytes to each signed URL
 *   3. confirm_site_deploy    -> updates the site manifest
 *
 * Files are laid out under the show subfolder so the public URL is:
 *   {site_origin}/{show}/feed.xml
 *   {site_origin}/{show}/ep-NNNN.mp3
 *   {site_origin}/{show}/cover.<ext>
 *
 * where {site_origin} is the app's static site origin (env apex for the platform
 * singleton, {app_id}.{suffix} otherwise). The GCS object path is
 * {env}/{app_id}/site/{show}/<file> per GCSPaths.appSite() in googleStorageService.
 */

import https from 'https';
import { createWriteStream } from 'fs';

const APP_ID = 'egpt';

function relPath(show, file) {
    return `${show}/${file}`;
}

/**
 * Absolute public URL for a deployed site asset.
 *
 * Apple requires ABSOLUTE enclosure/image/feed URLs. get_site_deploy_token reports
 * the public bucket (STORAGE_BUCKET_PUBLIC) + the GCS object prefix
 * ({env}/{app_id}/site/); the uploaded object is publicly readable AND byte-range
 * capable at that location, so this is the canonical absolute URL we emit in the
 * feed. (Its relative `site_url` is for LB rewrite; we don't rely on that here.)
 * A branded env-apex URL (descix.net/{app_id}/...) is a future LB-serving
 * enhancement — the GCS public URL is correct + works in every env today.
 */
export function gcsPublicUrl(bucket, prefix, show, file) {
    if (!bucket || !prefix) {
        throw new Error('gcsPublicUrl: bucket/prefix required (from get_site_deploy_token)');
    }
    const p = String(prefix).replace(/^\/+|\/+$/g, ''); // trim leading/trailing slashes
    return `https://storage.googleapis.com/${bucket}/${p}/${relPath(show, file)}`;
}

/**
 * Resolve the absolute public URL of a site asset WITHOUT publishing — asks the
 * broker for a deploy token (we use only its bucket+prefix, not the signed URLs)
 * and forms the GCS public URL. Used by read commands to report the canonical feed
 * URL. Falls back to the relative path if the broker is unreachable.
 *
 * @param {(command: string, params?: object) => Promise<any>} invoke
 *        Developer-identity Core invoker (from createServiceApiClient).
 */
export async function resolvePublicUrl(invoke, show, file) {
    try {
        const token = await invoke('get_asset_upload_token', {
            app_id: APP_ID,
            files: [{ path: relPath(show, file), content_type: 'application/octet-stream', size: 1 }],
        });
        return gcsPublicUrl(token.bucket, token.prefix, show, file);
    } catch {
        return relPath(show, file);
    }
}

/**
 * Convert a gs:// ref (or pass through an http(s) URL) to its public HTTPS URL. App media
 * lives in the PUBLIC descix-assets-public bucket, so it is directly readable.
 */
export function publicUrlFromRef(ref) {
    if (ref.startsWith('http://') || ref.startsWith('https://')) return ref;
    if (ref.startsWith('gs://')) return `https://storage.googleapis.com/${ref.slice('gs://'.length)}`;
    throw new Error(`publicUrlFromRef: unsupported asset ref '${ref}'`);
}

/**
 * Stream a PUBLIC media asset directly from GCS to a local file. Used for large media
 * (episode audio): fetching it as base64 through the Core broker (get_app_asset) would
 * exceed the broker response-size limit. The asset bucket is public so the READ needs no
 * auth; the developer-identity `invoke` still gates the WRITES (enclosure/records/feed).
 */
export async function streamAssetToFile(ref, destPath) {
    const url = publicUrlFromRef(ref);
    await new Promise((resolve, reject) => {
        const file = createWriteStream(destPath);
        https.get(url, (res) => {
            if (res.statusCode !== 200) {
                res.resume();
                file.close();
                return reject(new Error(`streamAssetToFile: ${url} -> HTTP ${res.statusCode}`));
            }
            res.pipe(file);
            file.on('finish', () => file.close(() => resolve(destPath)));
            file.on('error', reject);
        }).on('error', (err) => { file.close(); reject(err); });
    });
    return destPath;
}

/**
 * HEAD a public asset URL for its Content-Length (no download). Used by the mp3 fast path
 * to set the RSS enclosure length without streaming the file.
 */
export async function headContentLength(ref) {
    const url = publicUrlFromRef(ref);
    return new Promise((resolve, reject) => {
        const r = https.request(url, { method: 'HEAD' }, (res) => {
            res.resume();
            if (res.statusCode !== 200) return reject(new Error(`headContentLength: ${url} -> HTTP ${res.statusCode}`));
            const len = parseInt(res.headers['content-length'] || '', 10);
            if (!Number.isFinite(len)) return reject(new Error(`headContentLength: no Content-Length for ${url}`));
            resolve(len);
        });
        r.on('error', reject);
        r.end();
    });
}

/**
 * Upload {path, content_type, body(Buffer|string)} assets to the app's DEDICATED
 * media-asset GCS path ({env}/{app_id}/assets/...) via get_asset_upload_token.
 *
 * This path is OUTSIDE the site manifest (CEO-D-2026-06-02-APP-DATA-PLANE), so a
 * website deploy's delta-sync (deleteSiteFiles) can never delete podcast media.
 * No confirm step — the asset path has no manifest/delta. Returns the public
 * bucket+prefix for forming absolute URLs.
 *
 * @param {(command: string, params?: object) => Promise<any>} invoke
 *        Developer-identity Core invoker (from createServiceApiClient) — carries the
 *        developer's durable wallet credential.
 * @param {Array<{path:string, contentType:string, body:Buffer|string}>} assets
 */
export async function publishAssets(invoke, assets) {
    if (typeof invoke !== 'function') {
        throw new Error('publishAssets: invoke is required (the developer-identity Core api-client)');
    }
    if (!Array.isArray(assets) || assets.length === 0) {
        throw new Error('publishAssets: no assets provided');
    }

    const files = assets.map(a => ({
        path: a.path,
        content_type: a.contentType,
        size: Buffer.isBuffer(a.body) ? a.body.length : Buffer.byteLength(a.body),
    }));

    // Asset upload token (signed PUT URLs under {env}/{app_id}/assets/).
    const token = await invoke('get_asset_upload_token', { app_id: APP_ID, files });
    const signedUrls = token.signed_urls || {};

    for (const a of assets) {
        const url = signedUrls[a.path];
        if (!url) throw new Error(`No signed URL returned for ${a.path}`);
        const body = Buffer.isBuffer(a.body) ? a.body : Buffer.from(a.body, 'utf8');
        const resp = await fetch(url, {
            method: 'PUT',
            headers: { 'Content-Type': a.contentType },
            body,
        });
        if (!resp.ok) {
            throw new Error(`Upload failed for ${a.path}: HTTP ${resp.status}`);
        }
    }

    return { bucket: token.bucket, prefix: token.prefix, publicBase: token.public_base };
}

export { APP_ID, relPath };
