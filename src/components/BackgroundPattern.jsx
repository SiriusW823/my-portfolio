"use client";

import { useState, useEffect, useMemo } from "react";
import { useScrollProgress } from "./ScrollEngine";

export default function BackgroundPattern() {
  const context = useScrollProgress();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Calculate colors based on scroll progress
  const gridStyle = useMemo(() => {
    if (!context) return {};
    const { scrollProgress } = context;

    // Color transitions based on scroll
    if (scrollProgress < 0.2) {
      return { color: "rgba(0, 240, 255, 0.15)" }; // Cyan
    } else if (scrollProgress < 0.4) {
      return { color: "rgba(255, 45, 85, 0.15)" }; // Red
    } else if (scrollProgress < 0.6) {
      return { color: "rgba(0, 240, 255, 0.15)" }; // Cyan
    } else if (scrollProgress < 0.8) {
      return { color: "rgba(191, 90, 242, 0.15)" }; // Purple
    } else {
      return { color: "rgba(255, 255, 255, 0.1)" }; // White
    }
  }, [context?.scrollProgress]);

  if (!isClient || !context) return null;

  // Generate grid items
  const gridItems = [];
  for (let i = 0; i < 150; i++) {
    gridItems.push(
      <div
        key={i}
        className="w-full aspect-square rounded transition-all duration-500"
        style={{
          backgroundColor: gridStyle.color,
          opacity: 0.5 + Math.sin((i + context.scrollProgress * 50) * 0.1) * 0.3,
        }}
      />
    );
  }

  return (
    <div
      className="absolute inset-0 z-0 grid gap-2 p-4 pointer-events-none"
      style={{
        gridTemplateColumns: "repeat(15, 1fr)",
        gridTemplateRows: "repeat(10, 1fr)",
      }}
    >
      {gridItems}
    </div>
  );
}
