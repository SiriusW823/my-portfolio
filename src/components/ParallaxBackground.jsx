"use client";

import { useEffect, useRef } from "react";

export default function ParallaxBackground() {
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const scrollY = window.scrollY;
      const elements = containerRef.current.querySelectorAll(".parallax-layer");
      
      elements.forEach((el, index) => {
        const speed = (index + 1) * 0.05;
        el.style.transform = `translateY(${scrollY * speed}px)`;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Grid Pattern Layer */}
      <div 
        className="parallax-layer absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
        }}
      />

      {/* Floating Orbs */}
      <div className="parallax-layer absolute top-[10%] left-[10%] w-[600px] h-[600px] rounded-full bg-gradient-radial from-cyan-500/5 to-transparent blur-3xl" />
      <div className="parallax-layer absolute top-[40%] right-[5%] w-[500px] h-[500px] rounded-full bg-gradient-radial from-red-500/5 to-transparent blur-3xl" />
      <div className="parallax-layer absolute top-[70%] left-[20%] w-[400px] h-[400px] rounded-full bg-gradient-radial from-purple-500/3 to-transparent blur-3xl" />

      {/* Diagonal Lines */}
      <svg className="parallax-layer absolute inset-0 w-full h-full opacity-[0.02]">
        <defs>
          <pattern id="diagonalLines" patternUnits="userSpaceOnUse" width="60" height="60">
            <line x1="0" y1="60" x2="60" y2="0" stroke="white" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="200%" fill="url(#diagonalLines)" />
      </svg>

      {/* Accent Lines */}
      <div className="parallax-layer">
        <div className="absolute top-[20%] left-0 w-[200px] h-[1px] bg-gradient-to-r from-cyan-500/30 to-transparent" />
        <div className="absolute top-[35%] right-0 w-[150px] h-[1px] bg-gradient-to-l from-red-500/30 to-transparent" />
        <div className="absolute top-[55%] left-[10%] w-[100px] h-[1px] bg-gradient-to-r from-cyan-500/20 to-transparent" />
        <div className="absolute top-[75%] right-[5%] w-[180px] h-[1px] bg-gradient-to-l from-red-500/20 to-transparent" />
      </div>

      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-32 h-32">
        <div className="absolute top-8 left-0 w-16 h-[1px] bg-gradient-to-r from-cyan-500/40 to-transparent" />
        <div className="absolute top-0 left-8 w-[1px] h-16 bg-gradient-to-b from-cyan-500/40 to-transparent" />
      </div>
      <div className="absolute top-0 right-0 w-32 h-32">
        <div className="absolute top-8 right-0 w-16 h-[1px] bg-gradient-to-l from-red-500/40 to-transparent" />
        <div className="absolute top-0 right-8 w-[1px] h-16 bg-gradient-to-b from-red-500/40 to-transparent" />
      </div>
    </div>
  );
}
