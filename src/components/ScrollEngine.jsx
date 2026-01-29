"use client";

import { useEffect, useState, createContext, useContext, useMemo } from "react";

// Context to share scroll progress
const ScrollContext = createContext(null);

export function useScrollProgress() {
  return useContext(ScrollContext);
}

export default function ScrollEngine({ children }) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isClient, setIsClient] = useState(false);

  // Client-side check
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Scroll handler
  useEffect(() => {
    if (!isClient) return;

    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(Math.max(scrollTop / docHeight, 0), 1) : 0;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isClient]);

  const contextValue = useMemo(() => ({
    scrollProgress,
    isClient,
  }), [scrollProgress, isClient]);

  if (!isClient) return null;

  return (
    <ScrollContext.Provider value={contextValue}>
      {/* Scroll spacer */}
      <div style={{ height: "500vh", position: "relative" }}>
        {/* Fixed content layer */}
        <div className="fixed inset-0 overflow-hidden bg-[#0a0a0a]">
          {children}
        </div>
      </div>

      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 z-[9999] bg-black/50">
        <div
          className="h-full bg-gradient-to-r from-[#00f0ff] via-[#bf5af2] to-[#ff2d55]"
          style={{ width: `${scrollProgress * 100}%`, transition: "width 0.1s" }}
        />
      </div>

      {/* Debug */}
      <div className="fixed bottom-4 right-4 z-[9999] text-white text-sm font-mono bg-black/70 px-3 py-2 rounded-lg">
        {Math.round(scrollProgress * 100)}%
      </div>

      {/* Scroll hint */}
      {scrollProgress < 0.02 && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[9998] text-white/60 text-sm font-mono animate-bounce">
          ↓ SCROLL TO EXPLORE ↓
        </div>
      )}
    </ScrollContext.Provider>
  );
}
