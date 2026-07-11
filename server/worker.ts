/**
 * Cloudflare Worker entry.
 *
 * Serves the static SPA via the ASSETS binding and exposes
 * POST /api/turnstile/verify for server-side Cloudflare Turnstile validation.
 *
 * Setup:
 *   1. Create a Turnstile widget in the Cloudflare dashboard (Turnstile → Add site).
 *      Add your workers.dev domain (and any custom domain) to the widget's hostnames.
 *   2. Store the secret key:  npx wrangler secret put TURNSTILE_SECRET_KEY
 *   3. Put the site key in .env as VITE_TURNSTILE_SITE_KEY for the front-end widget.
 */

interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> };
  TURNSTILE_SECRET_KEY?: string;
}

interface SiteverifyResponse {
  success: boolean;
  "error-codes"?: string[];
  challenge_ts?: string;
  hostname?: string;
}

const SITEVERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

async function readToken(request: Request): Promise<string> {
  const contentType = request.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    const body = (await request.json().catch(() => null)) as { token?: string } | null;
    return body?.token ?? "";
  }
  const form = await request.formData().catch(() => null);
  const value = form?.get("cf-turnstile-response");
  return typeof value === "string" ? value : "";
}

async function handleTurnstileVerify(request: Request, env: Env): Promise<Response> {
  if (request.method !== "POST") {
    return json({ success: false, error: "method_not_allowed" }, 405);
  }
  if (!env.TURNSTILE_SECRET_KEY) {
    return json({ success: false, error: "secret_not_configured" }, 500);
  }

  const token = await readToken(request);
  if (!token) {
    return json({ success: false, error: "missing_token" }, 400);
  }

  const payload = new FormData();
  payload.append("secret", env.TURNSTILE_SECRET_KEY);
  payload.append("response", token);
  const clientIp = request.headers.get("CF-Connecting-IP");
  if (clientIp) payload.append("remoteip", clientIp);

  const verification = await fetch(SITEVERIFY_URL, { method: "POST", body: payload });
  const outcome = (await verification.json()) as SiteverifyResponse;

  if (!outcome.success) {
    return json({ success: false, error: "invalid_token", codes: outcome["error-codes"] ?? [] }, 403);
  }
  return json({ success: true, challengeTs: outcome.challenge_ts, hostname: outcome.hostname });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname.startsWith("/api/")) {
      if (url.pathname === "/api/turnstile/verify") {
        return handleTurnstileVerify(request, env);
      }
      return json({ success: false, error: "not_found" }, 404);
    }

    return env.ASSETS.fetch(request);
  },
};
