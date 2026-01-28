"use client";

import { useEffect, useRef } from "react";
import anime from "animejs";
import { Code, Mic, Users, PenTool, Sparkles } from "lucide-react";
import { activities } from "@/data/portfolioData";

const iconMap = {
  Code: Code,
  Mic: Mic,
  Users: Users,
  PenTool: PenTool,
};

export default function ActivitiesList() {
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

            // Animate cards with stagger - slide from alternating sides
            anime({
              targets: cardsRef.current,
              opacity: [0, 1],
              translateX: (el, i) => [i % 2 === 0 ? -40 : 40, 0],
              translateY: [20, 0],
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
      id="activities"
      ref={sectionRef}
      className="relative px-6 md:px-12 lg:px-24 py-24 md:py-32"
    >
      {/* Section Header */}
      <div className="max-w-7xl mx-auto mb-16 md:mb-24">
        <div className="section-title opacity-0">
          <div className="flex items-center gap-4 mb-6">
            <Sparkles size={24} className="text-gray-500" />
            <span className="text-sm tracking-[0.3em] text-gray-500">
              BEYOND WORK
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter">
            ACTIVITIES
          </h2>
        </div>
      </div>

      {/* Activities Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {activities.map((activity, index) => {
            const IconComponent = iconMap[activity.icon] || Code;
            return (
              <div
                key={activity.id}
                ref={(el) => (cardsRef.current[index] = el)}
                className="group relative bg-[#111111] border border-[#222222] p-8 opacity-0 card-hover text-center"
              >
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-16 h-16 mb-6 border border-[#333333] group-hover:border-white group-hover:bg-white transition-all duration-300">
                  <IconComponent
                    size={28}
                    className="text-white group-hover:text-black transition-colors duration-300"
                  />
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold mb-4 tracking-wide">
                  {activity.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-500 leading-relaxed">
                  {activity.description}
                </p>

                {/* Corner Accent */}
                <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-[#333333] group-hover:border-white transition-colors duration-300" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-[#333333] group-hover:border-white transition-colors duration-300" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
