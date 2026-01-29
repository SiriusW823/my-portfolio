"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import anime from "animejs";

export default function GridBackground({ activeSection = "hero" }) {
  const containerRef = useRef(null);
  const [gridSize, setGridSize] = useState({ cols: 1, rows: 1 });
  const [isClient, setIsClient] = useState(false);
  const prevSectionRef = useRef(activeSection);
  const hasAnimatedEntrance = useRef(false);

  // Calculate grid size based on viewport
  useEffect(() => {
    setIsClient(true);

    const calculateGrid = () => {
      const tileSize = 60; // Size of each tile in pixels
      const cols = Math.ceil(window.innerWidth / tileSize) + 1;
      const rows = Math.ceil(window.innerHeight / tileSize) + 1;
      setGridSize({ cols, rows });
    };

    calculateGrid();
    window.addEventListener("resize", calculateGrid);
    return () => window.removeEventListener("resize", calculateGrid);
  }, []);

  // Entrance animation
  useEffect(() => {
    if (!isClient || !containerRef.current || hasAnimatedEntrance.current) return;

    const tiles = containerRef.current.querySelectorAll(".grid-tile");
    if (tiles.length === 0) return;

    hasAnimatedEntrance.current = true;

    // Initial state
    anime.set(tiles, {
      scale: 0,
      opacity: 0,
    });

    // Entrance animation - ripple from center
    anime({
      targets: tiles,
      scale: [0, 1],
      opacity: [0, 1],
      backgroundColor: "#141414",
      borderColor: "#222",
      duration: 1200,
      delay: anime.stagger(50, {
        grid: [gridSize.cols, gridSize.rows],
        from: "center",
      }),
      easing: "easeOutExpo",
    });
  }, [isClient, gridSize]);

  // Section-based scroll animations
  const triggerSectionAnimation = useCallback(
    (section) => {
      if (!containerRef.current) return;
      const tiles = containerRef.current.querySelectorAll(".grid-tile");
      if (tiles.length === 0) return;

      // Define different animations for each section
      const animations = {
        hero: {
          backgroundColor: "#141414",
          borderColor: "#222",
          rotateZ: 0,
          scale: 1,
        },
        experience: {
          backgroundColor: ["#141414", "#1a0a0f", "#141414"],
          borderColor: "#ff2d5520",
          rotateZ: () => anime.random(-5, 5),
          scale: [1, 1.05, 1],
        },
        awards: {
          backgroundColor: ["#141414", "#0a1a1f", "#141414"],
          borderColor: "#00f0ff20",
          rotateZ: () => anime.random(-3, 3),
          scale: [1, 1.03, 1],
        },
        activities: {
          backgroundColor: ["#141414", "#0f0a1a", "#141414"],
          borderColor: "#bf5af220",
          rotateZ: () => anime.random(-4, 4),
          scale: [1, 1.04, 1],
        },
      };

      const config = animations[section] || animations.hero;

      anime({
        targets: tiles,
        ...config,
        duration: 800,
        delay: anime.stagger(25, {
          grid: [gridSize.cols, gridSize.rows],
          from: "center",
        }),
        easing: "easeInOutQuad",
      });
    },
    [gridSize]
  );

  // Watch for section changes
  useEffect(() => {
    if (!isClient || !hasAnimatedEntrance.current) return;
    if (prevSectionRef.current !== activeSection) {
      triggerSectionAnimation(activeSection);
      prevSectionRef.current = activeSection;
    }
  }, [activeSection, isClient, triggerSectionAnimation]);

  // Don't render on server
  if (!isClient) {
    return (
      <div
        className="fixed inset-0 z-0"
        style={{ backgroundColor: "#0a0a0a" }}
      />
    );
  }

  const totalTiles = gridSize.cols * gridSize.rows;
  const tileSize = 60;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0 overflow-hidden"
      style={{ backgroundColor: "#0a0a0a" }}
    >
      <div
        className="grid w-full h-full"
        style={{
          gridTemplateColumns: `repeat(${gridSize.cols}, ${tileSize}px)`,
          gridTemplateRows: `repeat(${gridSize.rows}, ${tileSize}px)`,
          gap: "1px",
        }}
      >
        {Array.from({ length: totalTiles }).map((_, index) => (
          <div
            key={index}
            className="grid-tile"
            style={{
              backgroundColor: "#141414",
              border: "1px solid #222",
              transformOrigin: "center",
            }}
          />
        ))}
      </div>
    </div>
  );
}
