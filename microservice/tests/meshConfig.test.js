// cloud-core 1.2.0: mesh verification fails closed and the trust anchors have ONE owner in
// cloud-core. A service carrying its own key copy refuses to boot by design, and an unset
// verify mode is refused. These tests hold the config to that contract.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const configs = readdirSync(ROOT).filter(f => /^defaults-config(-[a-z]+)?\.json$/.test(f));

test('the base config runs mesh verification in enforce mode, and no layer weakens it', () => {
    const base = JSON.parse(readFileSync(join(ROOT, 'defaults-config.json'), 'utf8'));
    assert.equal(base.MESH_CTX_VERIFY_MODE, 'enforce');
    for (const f of configs) {
        const d = JSON.parse(readFileSync(join(ROOT, f), 'utf8'));
        if ('MESH_CTX_VERIFY_MODE' in d) assert.equal(d.MESH_CTX_VERIFY_MODE, 'enforce', `${f}: a managed runtime refuses to boot on any other mode`);
    }
});

test('no config layer carries a mesh trust anchor of its own', () => {
    for (const f of configs) {
        const d = JSON.parse(readFileSync(join(ROOT, f), 'utf8'));
        for (const k of Object.keys(d)) {
            assert.ok(!/^MESH_CTX_(KEY_ID|PUBLIC_KEY)$/.test(k), `${f} carries ${k}; the trust anchors have one owner in cloud-core`);
        }
    }
});

test('the local verifier is gone and app.js mounts the API through the SDK', () => {
    assert.ok(!existsSync(join(ROOT, 'services', 'meshVerify.js')), 'services/meshVerify.js must not exist');
    const app = readFileSync(join(ROOT, 'app.js'), 'utf8');
    assert.match(app, /import \{ mountMeshApi \} from '@descix\/sdk\/microservice'/);
    assert.match(app, /mountMeshApi\(app, api\)/);
    assert.doesNotMatch(app, /app\.post\('\/api\/:command'/, 'the bare /api route must not be mounted outside the verifier');
    assert.doesNotMatch(app, /meshVerify/);
});
