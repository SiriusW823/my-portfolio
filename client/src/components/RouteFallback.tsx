export function RouteFallback() {
  return (
    <main className="route-fallback" aria-live="polite" aria-busy="true">
      <span className="terminal-accent">$</span> loading route…
    </main>
  );
}
