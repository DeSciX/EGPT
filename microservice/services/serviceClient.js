/**
 * Developer-identity Core api-client — the CLI's REST api-client running in the cloud.
 *
 * AUTH MODEL (CEO-D-2026-06-02-APP-MICROSERVICE-IS-CLI-CLIENT-WALLET-SIG):
 *   "An app microservice is just THE CLI's REST api-client running in the cloud." It
 *   authenticates to /apifront EXACTLY like the CLI does, holding the DEVELOPER'S OWN
 *   durable wallet credential (walletAddress + signature). Every Core command runs AS THE
 *   DEVELOPER (the app owner) — a FIXED module-scope identity, NOT the per-request end-user.
 *   There is NO per-request user threading, NO SA-OIDC, NO delegate / SERVICE_KEY.
 *
 * The developer credential is supplied from config (utils.DEVELOPER_*), which in dev is
 * force-assigned by cloud-core's _loadDevOverrides from the GITIGNORED dev-overrides.json
 * (a secret in prod). createServiceApiClient HARD-FAILS (no fallback) if either value is
 * absent — see anti-pattern #7.
 *
 * The `invoke(command, params)` returned here is the single, process-wide replacement for
 * the old per-request meshLoopback. It is built once (module-scope, memoized) and shared by
 * podcastStore / publisher (they take it as their first argument so unit tests can inject a
 * fake) and the gs:// asset fetch path (fetchAppAsset's first arg IS this invoke).
 */

import { createServiceApiClient } from '@descix/cli/service-api-client';
import { utils } from './utils.js';

let _invoke = null;

/**
 * The developer-identity Core invoker (memoized). (command, params) => Promise<message>.
 * Reads the credential from config at first call; hard-fails if unconfigured.
 */
export function getInvoke() {
    if (!_invoke) {
        const { invoke } = createServiceApiClient({
            baseUrl: utils.CORE_API_URL,
            walletAddress: utils.DEVELOPER_WALLET_ADDRESS,
            signature: utils.DEVELOPER_SIGNATURE,
        });
        _invoke = invoke;
    }
    return _invoke;
}
