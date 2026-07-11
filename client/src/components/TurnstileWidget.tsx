import { useEffect, useRef, useState } from "react";

/**
 * Cloudflare Turnstile widget with server-side verification.
 *
 * Renders the Turnstile challenge and, once the user passes it, sends the
 * token to the Worker endpoint POST /api/turnstile/verify.
 *
 * Site key comes from VITE_TURNSTILE_SITE_KEY (set it in .env before build).
 * Falls back to Cloudflare's "always passes" test key for local development.
 *
 * Usage (e.g. inside a future contact form):
 *   <TurnstileWidget onVerified={() => setCanSubmit(true)} />
 */

declare global {
  interface Window {
    turnstile?: {
      render: (element: HTMLElement, options: Record<string, unknown>) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
const TEST_SITE_KEY = "1x00000000000000000000AA"; // Cloudflare test key: always passes
const SITE_KEY = (import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined) ?? TEST_SITE_KEY;

type Status = "loading" | "ready" | "verifying" | "verified" | "failed";

function loadTurnstileScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.turnstile) {
      resolve();
      return;
    }
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT_SRC}"]`);
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("turnstile_script_failed")));
      return;
    }
    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("turnstile_script_failed"));
    document.head.appendChild(script);
  });
}

interface TurnstileWidgetProps {
  onVerified?: () => void;
  theme?: "dark" | "light" | "auto";
}

export function TurnstileWidget({ onVerified, theme = "dark" }: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    let cancelled = false;

    async function verifyToken(token: string) {
      setStatus("verifying");
      try {
        const response = await fetch("/api/turnstile/verify", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ token }),
        });
        const result = (await response.json()) as { success: boolean };
        if (cancelled) return;
        if (result.success) {
          setStatus("verified");
          onVerified?.();
        } else {
          setStatus("failed");
        }
      } catch {
        if (!cancelled) setStatus("failed");
      }
    }

    loadTurnstileScript()
      .then(() => {
        if (cancelled || !containerRef.current || !window.turnstile) return;
        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: SITE_KEY,
          theme,
          callback: (token: string) => void verifyToken(token),
          "error-callback": () => setStatus("failed"),
          "expired-callback": () => setStatus("ready"),
        });
        setStatus("ready");
      })
      .catch(() => {
        if (!cancelled) setStatus("failed");
      });

    return () => {
      cancelled = true;
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [onVerified, theme]);

  return (
    <div className="turnstile-widget">
      <div ref={containerRef} />
      <p className="turnstile-widget__status" role="status">
        {status === "loading" && "loading challenge..."}
        {status === "verifying" && "verifying token..."}
        {status === "verified" && "verified ✓"}
        {status === "failed" && "verification failed — please retry"}
      </p>
    </div>
  );
}

export default TurnstileWidget;
