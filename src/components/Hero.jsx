"use client";

import { useEffect, useRef } from "react";
import anime from "animejs";
import { ArrowDown, Github, Instagram, Twitter } from "lucide-react";
import { siteConfig, intro } from "@/data/portfolioData";

export default function Hero() {
  const headlineRef = useRef(null);
  const descriptionRef = useRef(null);
  const statsRef = useRef(null);
  const socialRef = useRef(null);
  const scrollIndicatorRef = useRef(null);

  useEffect(() => {
    const headlineElements = headlineRef.current?.querySelectorAll(".headline-word");
    const timeline = anime.timeline({ easing: "easeOutExpo" });

    timeline.add({
      targets: headlineElements,
      opacity: [0, 1],
      translateY: [100, 0],
      rotateX: [90, 0],
      duration: 1400,
      delay: anime.stagger(200),
    });

    timeline.add(
      { targets: descriptionRef.current, opacity: [0, 1], translateY: [40, 0], duration: 1000 },
      "-=800"
    );

    timeline.add(
      {
        targets: statsRef.current?.querySelectorAll(".stat-item"),
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 800,
        delay: anime.stagger(150),
      },
      "-=600"
    );

    timeline.add(
      {
        targets: socialRef.current?.querySelectorAll(".social-icon"),
        opacity: [0, 1],
        translateX: [-20, 0],
        duration: 600,
        delay: anime.stagger(100),
      },
      "-=400"
    );

    timeline.add(
      { targets: scrollIndicatorRef.current, opacity: [0, 1], translateY: [-20, 0], duration: 800 },
      "-=200"
    );

    anime({
      targets: scrollIndicatorRef.current,
      translateY: [0, 10, 0],
      duration: 1500,
      loop: true,
      easing: "easeInOutSine",
      delay: 2500,
    });

    return () => {
      anime.remove(headlineElements);
      anime.remove(descriptionRef.current);
      anime.remove(statsRef.current?.querySelectorAll(".stat-item"));
      anime.remove(socialRef.current?.querySelectorAll(".social-icon"));
      anime.remove(scrollIndicatorRef.current);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 py-20">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px]" />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="flex justify-between items-center mb-16 md:mb-24">
          <div className="text-sm tracking-[0.3em] text-gray-500">{siteConfig.location}</div>
          <div ref={socialRef} className="flex gap-6">
            <a href={siteConfig.social.github} target="_blank" rel="noopener noreferrer" className="social-icon text-gray-500 hover:text-white transition-colors duration-300">
              <Github size={20} />
            </a>
            <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="social-icon text-gray-500 hover:text-[#E4405F] transition-colors duration-300">
              <Instagram size={20} />
            </a>
            <a href={siteConfig.social.twitter} target="_blank" rel="noopener noreferrer" className="social-icon text-gray-500 hover:text-white transition-colors duration-300">
              <Twitter size={20} />
            </a>
          </div>
        </div>

        <div ref={headlineRef} className="mb-12">
          {intro.headline.map((word, index) => (
            <div key={index} className="overflow-hidden">
              <h1
                className="headline-word text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black leading-[0.9] tracking-tighter"
                style={{
                  WebkitTextStroke: index === 1 ? "2px white" : "none",
                  WebkitTextFillColor: index === 1 ? "transparent" : "white",
                }}
              >
                {word}
              </h1>
            </div>
          ))}
        </div>

        <div ref={descriptionRef} className="max-w-2xl mb-16 opacity-0">
          <p className="text-lg md:text-xl text-gray-400 leading-relaxed">{intro.description}</p>
        </div>

        <div ref={statsRef} className="grid grid-cols-3 gap-8 md:gap-16 max-w-2xl mb-20">
          {intro.stats.map((stat, index) => (
            <div key={index} className="stat-item opacity-0">
              <div className="text-3xl md:text-5xl font-black mb-2">{stat.value}</div>
              <div className="text-xs md:text-sm text-gray-500 tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <a href="#experience" className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-bold tracking-wider hover:bg-gray-200 transition-colors duration-300">
            VIEW MY WORK
            <ArrowDown size={18} className="group-hover:translate-y-1 transition-transform duration-300" />
          </a>
          <a href={"mailto:" + siteConfig.email} className="inline-flex items-center gap-3 px-8 py-4 border border-gray-700 text-white font-bold tracking-wider hover:border-white transition-colors duration-300">
            GET IN TOUCH
          </a>
        </div>
      </div>

      <div ref={scrollIndicatorRef} className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-0">
        <span className="text-xs tracking-[0.3em] text-gray-500">SCROLL</span>
        <ArrowDown size={16} className="text-gray-500" />
      </div>

      <div className="absolute top-1/4 right-10 w-px h-32 bg-gradient-to-b from-transparent via-gray-700 to-transparent hidden lg:block" />
      <div className="absolute bottom-1/4 left-10 w-32 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent hidden lg:block" />
    </section>
  );
}
