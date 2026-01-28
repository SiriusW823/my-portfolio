"use client";

import { useEffect, useRef } from "react";
import anime from "animejs";
import { Briefcase, Calendar, ArrowUpRight } from "lucide-react";
import { experience } from "@/data/portfolioData";

export default function ExperienceList() {
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

            // Animate cards with stagger
            anime({
              targets: cardsRef.current,
              opacity: [0, 1],
              translateX: (el, i) => [i % 2 === 0 ? -60 : 60, 0],
              translateY: [30, 0],
              duration: 1000,
              delay: anime.stagger(200, { start: 300 }),
              easing: "easeOutExpo",
            });

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative px-6 md:px-12 lg:px-24 py-24 md:py-32"
    >
      {/* Section Header */}
      <div className="max-w-7xl mx-auto mb-16 md:mb-24">
        <div className="section-title opacity-0">
          <div className="flex items-center gap-4 mb-6">
            <Briefcase size={24} className="text-[#00f0ff]" />
            <span className="text-sm tracking-[0.3em] text-gray-500">
              CAREER PATH
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter">
            EXPERIENCE
          </h2>
        </div>
      </div>

      {/* Experience Cards */}
      <div className="max-w-7xl mx-auto">
        <div className="space-y-8">
          {experience.map((exp, index) => (
            <div
              key={exp.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className="group relative bg-[#111111] border border-[#222222] p-8 md:p-12 opacity-0 cursor-pointer overflow-hidden transition-all duration-500 hover:-translate-y-2"
            >
              {/* Neon Border Effect - Top */}
              <div className="absolute top-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#00f0ff] to-[#ff2d55] group-hover:w-full transition-all duration-500 ease-out" />
              
              {/* Neon Border Effect - Right */}
              <div className="absolute top-0 right-0 w-[2px] h-0 bg-gradient-to-b from-[#ff2d55] to-[#00f0ff] group-hover:h-full transition-all duration-500 ease-out delay-100" />
              
              {/* Neon Border Effect - Bottom */}
              <div className="absolute bottom-0 right-0 w-0 h-[2px] bg-gradient-to-l from-[#00f0ff] to-[#ff2d55] group-hover:w-full transition-all duration-500 ease-out delay-200" />
              
              {/* Neon Border Effect - Left */}
              <div className="absolute bottom-0 left-0 w-[2px] h-0 bg-gradient-to-t from-[#ff2d55] to-[#00f0ff] group-hover:h-full transition-all duration-500 ease-out delay-300" />

              {/* Neon Glow on Hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                   style={{
                     boxShadow: "inset 0 0 30px rgba(0, 240, 255, 0.1), inset 0 0 60px rgba(255, 45, 85, 0.05)"
                   }}
              />

              {/* Card Number */}
              <div className="absolute top-8 right-8 text-7xl md:text-9xl font-black text-[#1a1a1a] group-hover:text-[#1f1f1f] transition-colors duration-300 select-none">
                {String(index + 1).padStart(2, "0")}
              </div>

              {/* Content */}
              <div className="relative z-10">
                {/* Period */}
                <div className="flex items-center gap-2 mb-4 text-gray-500">
                  <Calendar size={14} className="group-hover:text-[#00f0ff] transition-colors duration-300" />
                  <span className="text-sm tracking-wider group-hover:text-[#00f0ff] transition-colors duration-300">{exp.period}</span>
                </div>

                {/* Role */}
                <h3 className="text-2xl md:text-4xl font-bold mb-2 group-hover:text-white transition-colors duration-300">
                  {exp.role}
                </h3>

                {/* Company */}
                <p className="text-lg md:text-xl text-gray-500 mb-6 group-hover:text-gray-400 transition-colors duration-300">
                  {exp.company}
                </p>

                {/* Description */}
                <p className="text-gray-400 leading-relaxed mb-8 max-w-3xl">
                  {exp.description}
                </p>

                {/* Highlights */}
                <div className="flex flex-wrap gap-3">
                  {exp.highlights.map((highlight, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 bg-[#1a1a1a] border border-[#333333] text-sm text-gray-300 tracking-wider group-hover:border-[#00f0ff]/30 group-hover:bg-[#00f0ff]/5 transition-all duration-300"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hover Arrow */}
              <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                <ArrowUpRight size={24} className="text-[#00f0ff]" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative Neon Line */}
      <div className="absolute left-0 top-1/2 w-24 h-px bg-gradient-to-r from-[#00f0ff]/50 to-transparent hidden lg:block" />
      <div className="absolute right-0 top-1/3 w-16 h-px bg-gradient-to-l from-[#ff2d55]/50 to-transparent hidden lg:block" />
    </section>
  );
}
