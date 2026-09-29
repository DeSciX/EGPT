import { test } from 'node:test';
import assert from 'node:assert/strict';
import { publishAssets } from '../services/publisher.js';

/**
 * publishAssets must PUT each asset with the header bag the broker returns in
 * get_asset_upload_token.upload_headers[path], VERBATIM. Since the 200MB per-app storage
 * cap, the signed URL binds the exact byte size as the v4 extension header
 * x-goog-content-length-range; a PUT without it is rejected by GCS (HTTP 400).
 */
test('publishAssets sends the broker\'s upload_headers bag verbatim on the signed PUT', async () => {
    const body = Buffer.from('<rss/>', 'utf8');
    const range = `${body.length},${body.length}`;
    const fakeInvoke = async (command, params) => {
        assert.equal(command, 'get_asset_upload_token');
        assert.equal(params.app_id, 'egpt');
        assert.deepEqual(params.files, [{ path: 'egpt/feed.xml', content_type: 'application/rss+xml', size: body.length }]);
        return {
            bucket: 'b', prefix: 'dev/egpt/assets', public_base: 'https://storage.googleapis.com/b/dev/egpt/assets',
            signed_urls: { 'egpt/feed.xml': 'https://signed.example/feed' },
            upload_headers: { 'egpt/feed.xml': { 'Content-Type': 'application/rss+xml', 'x-goog-content-length-range': range } },
        };
    };
    const calls = [];
    const realFetch = globalThis.fetch;
    globalThis.fetch = async (url, init) => { calls.push({ url, init }); return { ok: true, status: 200 }; };
    try {
        await publishAssets(fakeInvoke, [{ path: 'egpt/feed.xml', contentType: 'application/rss+xml', body }]);
    } finally {
        globalThis.fetch = realFetch;
    }
    assert.equal(calls.length, 1);
    assert.equal(calls[0].url, 'https://signed.example/feed');
    assert.equal(calls[0].init.method, 'PUT');
    assert.equal(calls[0].init.headers['x-goog-content-length-range'], range, 'the signed size range must travel with the PUT');
    assert.equal(calls[0].init.headers['Content-Type'], 'application/rss+xml');
});

test('publishAssets fails loud when the token carries no upload_headers for the path', async () => {
    const fakeInvoke = async () => ({ signed_urls: { 'egpt/feed.xml': 'https://signed.example/feed' } });
    const realFetch = globalThis.fetch;
    globalThis.fetch = async () => { throw new Error('fetch must not be called without the header bag'); };
    try {
        await assert.rejects(
            () => publishAssets(fakeInvoke, [{ path: 'egpt/feed.xml', contentType: 'application/rss+xml', body: '<rss/>' }]),
            /No upload_headers for egpt\/feed\.xml/
        );
    } finally {
        globalThis.fetch = realFetch;
    }
});
