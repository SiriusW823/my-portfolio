"use client";

import { useEffect, useRef, useState } from "react";
import anime from "animejs";

export default function IntroAnimation({ onComplete }) {
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const [gridSize, setGridSize] = useState({ cols: 10, rows: 10 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Calculate responsive grid size based on viewport
    const tileSize = 80;
    const cols = Math.ceil(window.innerWidth / tileSize);
    const rows = Math.ceil(window.innerHeight / tileSize);
    setGridSize({ cols, rows });
  }, []);

  useEffect(() => {
    if (!isClient || !containerRef.current || !logoRef.current) return;

    const tiles = containerRef.current.querySelectorAll(".grid-tile");
    if (tiles.length === 0) return;

    // Logo animation
    anime({
      targets: logoRef.current,
      opacity: [0, 1, 1, 0],
      scale: [0.8, 1.1, 1, 1.2],
      duration: 1200,
      easing: "easeOutQuad",
    });

    // Initial state - tiles start scaled up
    anime.set(tiles, {
      scale: 1,
      opacity: 1,
    });

    // Create the animation timeline
    const timeline = anime.timeline({
      easing: "easeInOutQuad",
      complete: () => {
        if (onComplete) {
          onComplete();
        }
      },
    });

    // Phase 1: Flash effect - tiles glow with brand red
    timeline.add({
      targets: tiles,
      backgroundColor: ["#1a1a1a", "#ff2d55", "#1a1a1a"],
      duration: 600,
      delay: anime.stagger(30, {
        grid: [gridSize.cols, gridSize.rows],
        from: "center",
      }),
    });

    // Phase 2: Ripple wave - tiles scale and rotate out from center
    timeline.add(
      {
        targets: tiles,
        scale: [1, 1.2, 0],
        rotateZ: () => anime.random(-45, 45),
        opacity: [1, 1, 0],
        backgroundColor: "#0a0a0a",
        duration: 800,
        delay: anime.stagger(25, {
          grid: [gridSize.cols, gridSize.rows],
          from: "center",
        }),
      },
      "-=400"
    );

    return () => {
      timeline.pause();
    };
  }, [isClient, gridSize, onComplete]);

  // Don't render grid on server to avoid hydration mismatch
  if (!isClient) {
    return (
      <div
        className="fixed inset-0 z-[9999] overflow-hidden pointer-events-none"
        style={{ backgroundColor: "#0a0a0a" }}
      />
    );
  }

  const totalTiles = gridSize.cols * gridSize.rows;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] overflow-hidden pointer-events-none"
      style={{ backgroundColor: "#0a0a0a" }}
    >
      {/* Grid Container */}
      <div
        className="w-full h-full grid"
        style={{
          gridTemplateColumns: `repeat(${gridSize.cols}, 1fr)`,
          gridTemplateRows: `repeat(${gridSize.rows}, 1fr)`,
          gap: "1px",
        }}
      >
        {Array.from({ length: totalTiles }).map((_, index) => (
          <div
            key={index}
            className="grid-tile"
            style={{
              backgroundColor: "#1a1a1a",
              border: "1px solid #2a2a2a",
              transformOrigin: "center",
            }}
          />
        ))}
      </div>

      {/* Center logo/text that appears briefly */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          ref={logoRef}
          className="text-6xl md:text-8xl font-black tracking-tighter"
          style={{
            color: "#fff",
            textShadow: "0 0 40px rgba(255, 45, 85, 0.5)",
            opacity: 0,
          }}
        >
          W.
        </div>
      </div>
    </div>
  );
}
