"use client";

import { useEffect, useRef } from "react";
import anime from "animejs";
import { Award, Trophy } from "lucide-react";
import { awards } from "@/data/portfolioData";

export default function AwardsList() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate section title
            anime({
              targets: sectionRef.current?.querySelector(".section-title"),
              opacity: [0, 1],
              translateY: [50, 0],
              duration: 1000,
              easing: "easeOutExpo",
            });

            // Animate cards with stagger - fade up effect
            anime({
              targets: cardsRef.current,
              opacity: [0, 1],
              translateY: [60, 0],
              scale: [0.95, 1],
              duration: 1000,
              delay: anime.stagger(150, { start: 300 }),
              easing: "easeOutExpo",
            });

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="awards"
      ref={sectionRef}
      className="relative px-6 md:px-12 lg:px-24 py-24 md:py-32 bg-[#0d0d0d]"
    >
      {/* Section Header */}
      <div className="max-w-7xl mx-auto mb-16 md:mb-24">
        <div className="section-title opacity-0">
          <div className="flex items-center gap-4 mb-6">
            <Trophy size={24} className="text-[#ff2d55]" />
            <span className="text-sm tracking-[0.3em] text-gray-500">
              RECOGNITION
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter">
            AWARDS &<br />
            <span className="text-outline">ACHIEVEMENTS</span>
          </h2>
        </div>
      </div>

      {/* Awards Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {awards.map((award, index) => (
            <div
              key={award.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className="group relative bg-gradient-to-br from-[#111111] to-[#0a0a0a] border border-[#222222] p-8 md:p-10 opacity-0 overflow-hidden transition-all duration-500 hover:-translate-y-2"
            >
              {/* Neon Corner Accents */}
              <div className="absolute top-0 left-0 w-12 h-[2px] bg-gradient-to-r from-[#ff2d55] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute top-0 left-0 w-[2px] h-12 bg-gradient-to-b from-[#ff2d55] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 right-0 w-12 h-[2px] bg-gradient-to-l from-[#00f0ff] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 right-0 w-[2px] h-12 bg-gradient-to-t from-[#00f0ff] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Glow Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-lg"
                   style={{
                     boxShadow: "0 0 40px rgba(255, 45, 85, 0.1), 0 0 80px rgba(0, 240, 255, 0.05)"
                   }}
              />

              {/* Award Icon */}
              <div className="absolute top-8 right-8 p-3 bg-[#1a1a1a] rounded-full group-hover:bg-[#ff2d55] transition-colors duration-300">
                <Award size={20} className="text-gray-400 group-hover:text-white transition-colors duration-300" />
              </div>

              {/* Year Badge */}
              <div className="inline-block px-4 py-1 bg-[#ff2d55] text-white text-xs font-bold tracking-wider mb-6 group-hover:shadow-[0_0_20px_rgba(255,45,85,0.5)] transition-shadow duration-300">
                {award.year}
              </div>

              {/* Title */}
              <h3 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-white transition-colors duration-300">
                {award.title}
              </h3>

              {/* Organization */}
              <p className="text-gray-500 mb-4 tracking-wider text-sm group-hover:text-[#ff2d55] transition-colors duration-300">
                {award.organization}
              </p>

              {/* Description */}
              <p className="text-gray-400 leading-relaxed">
                {award.description}
              </p>

              {/* Bottom Accent Line */}
              <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#ff2d55] via-[#bf5af2] to-[#00f0ff] group-hover:w-full transition-all duration-700" />
            </div>
          ))}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute right-0 top-1/3 w-px h-48 bg-gradient-to-b from-transparent via-[#ff2d55]/30 to-transparent hidden lg:block" />
      <div className="absolute left-[10%] bottom-20 w-32 h-px bg-gradient-to-r from-[#00f0ff]/30 to-transparent hidden lg:block" />
    </section>
  );
}
