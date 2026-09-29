/**
 * egpt podcast microservice — signed `_descix` mesh verification (WS-EDGE-MESH wave 2).
 *
 * ssgpod is a downstream mesh consumer: when Core's apifront proxies a podcast
 * command to this microservice (proxyToExternalService), it injects a signed
 * `_descix` context. This thin wrapper wires the canonical verifier owned by
 * @descix/cloud-core (createMeshContextVerifier) to ssgpod's config surface — the
 * contract is never re-implemented here. Identical pattern to BEAST and Powch.
 *
 * Rollout: per-service OPT-IN. Mounts only when MESH_CTX_VERIFY_MODE is configured
 * (warn | enforce). Unset => unchanged boot. When set, MESH_CTX_PUBLIC_KEY and
 * MESH_CTX_KEY_ID must be provisioned (defaults-config-{env}.json — both NON-secret)
 * or the mount hard-fails (fail-loud, no silent default).
 *
 * Wave 2 deploys this WARN on DEMO (ssgpod has no -dev Cloud Run service) — observe
 * signed vs unsigned traffic without rejecting. No enforce flip this wave.
 *
 * Design: DeSciX/V2_docs/design/proposed/mesh-signed-ctx-design-2026-07-03.md
 */

import { createMeshContextVerifier } from '@descix/cloud-core';

/**
 * Build ssgpod's mesh verifier from config, or null if verification is not enabled
 * (MESH_CTX_VERIFY_MODE unset). A no-op null lets the caller skip mounting.
 *
 * @param {object} utils - the ssgpod CloudConfig facade
 * @returns {import('express').RequestHandler | null}
 */
export function buildSsgpodMeshVerifier(utils) {
    const mode = utils.MESH_CTX_VERIFY_MODE;
    if (!mode) return null; // opt-in — not enabled, behave as before
    return createMeshContextVerifier({
        mode,
        publicKeyPem: utils.MESH_CTX_PUBLIC_KEY,
        keyId: utils.MESH_CTX_KEY_ID,
    });
}
