"use client";

import { useState, useEffect } from "react";
import { useScrollProgress } from "./ScrollEngine";
import { siteConfig, intro, experience, awards, activities, skills } from "@/data/portfolioData";
import { Briefcase, Trophy, Sparkles, Award } from "lucide-react";

function GlassCard({ children, className = "" }) {
  return (
    <div className={`relative backdrop-blur-2xl bg-white/5 border border-white/10 rounded-3xl shadow-2xl ${className}`}>
      {children}
    </div>
  );
}

// Section wrapper with scroll-based visibility
function Section({ id, children, showRange }) {
  const { scrollProgress } = useScrollProgress();
  const [start, end] = showRange;
  
  // Calculate opacity and transform based on scroll progress
  let opacity = 0;
  let translateY = 80;
  let scale = 0.95;

  if (scrollProgress >= start && scrollProgress <= end) {
    // Calculate position within range
    const rangeSize = end - start;
    const fadeInEnd = start + rangeSize * 0.15;
    const fadeOutStart = end - rangeSize * 0.15;

    if (scrollProgress < fadeInEnd) {
      // Fade in
      const t = (scrollProgress - start) / (fadeInEnd - start);
      opacity = t;
      translateY = 80 * (1 - t);
      scale = 0.95 + 0.05 * t;
    } else if (scrollProgress > fadeOutStart) {
      // Fade out
      const t = (scrollProgress - fadeOutStart) / (end - fadeOutStart);
      opacity = 1 - t;
      translateY = -60 * t;
      scale = 1 - 0.05 * t;
    } else {
      // Fully visible
      opacity = 1;
      translateY = 0;
      scale = 1;
    }
  }

  return (
    <section
      id={id}
      className="absolute inset-0 flex items-center justify-center p-8"
      style={{
        opacity,
        transform: `translateY(${translateY}px) scale(${scale})`,
        pointerEvents: opacity > 0.5 ? "auto" : "none",
        transition: "opacity 0.05s, transform 0.05s",
      }}
    >
      {children}
    </section>
  );
}

export default function ContentSections() {
  const context = useScrollProgress();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient || !context) return null;

  return (
    <div className="absolute inset-0 z-10 overflow-hidden">
      {/* INTRO: 0% - 20% */}
      <Section id="intro-section" showRange={[0, 0.20]}>
        <GlassCard className="p-12 md:p-16 max-w-4xl text-center">
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white mb-6">
            {siteConfig.name}
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-4">{intro.headline}</p>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">{intro.summary}</p>
          <div className="flex flex-wrap justify-center gap-3">
            {skills.slice(0, 5).map((skill, i) => (
              <span key={i} className="px-4 py-2 text-sm font-mono text-[#00f0ff] border border-[#00f0ff]/30 rounded-full bg-[#00f0ff]/5">
                {skill}
              </span>
            ))}
          </div>
        </GlassCard>
      </Section>

      {/* EXPERIENCE: 20% - 40% */}
      <Section id="experience-section" showRange={[0.20, 0.40]}>
        <GlassCard className="p-8 md:p-12 max-w-5xl max-h-[80vh] overflow-y-auto">
          <div className="flex items-center gap-4 mb-8">
            <Briefcase className="w-10 h-10 text-[#ff2d55]" />
            <h2 className="text-4xl md:text-5xl font-black text-white">Experience</h2>
          </div>
          <div className="space-y-4">
            {experience.map((item, i) => (
              <div key={i} className="p-5 rounded-xl bg-white/5 border border-white/10">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-white">{item.role}</h3>
                  <span className="text-sm text-gray-400 font-mono">{item.duration}</span>
                </div>
                <p className="text-[#ff2d55] font-semibold mb-2">{item.company}</p>
                <p className="text-gray-300 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </GlassCard>
      </Section>

      {/* AWARDS: 40% - 60% */}
      <Section id="awards-section" showRange={[0.40, 0.60]}>
        <GlassCard className="p-8 md:p-12 max-w-5xl max-h-[80vh] overflow-y-auto">
          <div className="flex items-center gap-4 mb-8">
            <Trophy className="w-10 h-10 text-[#00f0ff]" />
            <h2 className="text-4xl md:text-5xl font-black text-white">Awards</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {awards.map((item, i) => (
              <div key={i} className="p-5 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-start gap-3">
                  <Award className="w-5 h-5 text-[#00f0ff] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-400 mb-1">{item.year}</p>
                    <p className="text-gray-300 text-sm">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </Section>

      {/* ACTIVITIES: 60% - 80% */}
      <Section id="activities-section" showRange={[0.60, 0.80]}>
        <GlassCard className="p-8 md:p-12 max-w-5xl max-h-[80vh] overflow-y-auto">
          <div className="flex items-center gap-4 mb-8">
            <Sparkles className="w-10 h-10 text-[#bf5af2]" />
            <h2 className="text-4xl md:text-5xl font-black text-white">Activities</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {activities.map((item, i) => (
              <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-300 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </GlassCard>
      </Section>

      {/* OUTRO: 80% - 100% */}
      <Section id="outro-section" showRange={[0.80, 1.0]}>
        <GlassCard className="p-12 md:p-16 max-w-3xl text-center">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6">Let&apos;s Connect</h2>
          <p className="text-xl text-gray-300 mb-8">Ready to collaborate?</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={siteConfig.social.github} target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors">
              GitHub
            </a>
            <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="px-8 py-4 border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-black transition-colors">
              Instagram
            </a>
            <a href={"mailto:" + siteConfig.email} className="px-8 py-4 bg-gradient-to-r from-[#00f0ff] to-[#ff2d55] text-white font-bold rounded-full hover:opacity-80 transition-opacity">
              Email Me
            </a>
          </div>
        </GlassCard>
      </Section>
    </div>
  );
}
