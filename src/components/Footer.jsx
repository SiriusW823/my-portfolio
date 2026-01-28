"use client";

import { useEffect, useRef } from "react";
import anime from "animejs";
import { Mail, MapPin, ArrowUpRight, Github, Instagram, Twitter } from "lucide-react";
import { siteConfig, skills } from "@/data/portfolioData";

export default function Footer() {
  const footerRef = useRef(null);
  const skillsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: footerRef.current?.querySelectorAll(".footer-animate"),
              opacity: [0, 1],
              translateY: [30, 0],
              duration: 1000,
              delay: anime.stagger(100),
              easing: "easeOutExpo",
            });

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative px-6 md:px-12 lg:px-24 py-24 md:py-32 bg-[#0a0a0a] border-t border-[#1a1a1a]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Skills Marquee */}
        <div className="mb-24 overflow-hidden">
          <div ref={skillsRef} className="flex animate-marquee">
            {[...skills, ...skills].map((skill, index) => (
              <span
                key={index}
                className="text-6xl md:text-8xl font-black text-[#1a1a1a] whitespace-nowrap mx-8"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          {/* Left - CTA */}
          <div className="footer-animate opacity-0">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">
              LET&apos;S CREATE
              <br />
              <span className="text-outline">SOMETHING</span>
              <br />
              AMAZING
            </h2>
            <p className="text-gray-500 text-lg max-w-md mb-8">
              Have a project in mind? Let&apos;s collaborate and build something
              extraordinary together.
            </p>
            <a
              href={"mailto:" + siteConfig.email}
              className="group inline-flex items-center gap-3 text-2xl font-bold hover:text-gray-300 transition-colors duration-300"
            >
              {siteConfig.email}
              <ArrowUpRight
                size={24}
                className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
              />
            </a>
          </div>

          {/* Right - Info */}
          <div className="footer-animate opacity-0 lg:text-right">
            <div className="space-y-8">
              {/* Location */}
              <div>
                <div className="flex items-center gap-2 lg:justify-end mb-2 text-gray-500">
                  <MapPin size={16} />
                  <span className="text-sm tracking-wider">LOCATION</span>
                </div>
                <p className="text-2xl font-bold">{siteConfig.location}</p>
              </div>

              {/* Email */}
              <div>
                <div className="flex items-center gap-2 lg:justify-end mb-2 text-gray-500">
                  <Mail size={16} />
                  <span className="text-sm tracking-wider">EMAIL</span>
                </div>
                <p className="text-xl">{siteConfig.email}</p>
              </div>

              {/* Social */}
              <div className="flex gap-6 lg:justify-end">
                <a
                  href={siteConfig.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 border border-[#333333] hover:border-white hover:bg-white hover:text-black transition-all duration-300"
                >
                  <Github size={20} />
                </a>
                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 border border-[#333333] hover:border-[#E4405F] hover:bg-[#E4405F] hover:text-white transition-all duration-300"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href={siteConfig.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 border border-[#333333] hover:border-white hover:bg-white hover:text-black transition-all duration-300"
                >
                  <Twitter size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-animate opacity-0 flex flex-col md:flex-row justify-between items-center pt-8 border-t border-[#1a1a1a]">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} {siteConfig.name}. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-8 text-sm text-gray-500">
            <a href="#" className="hover:text-white transition-colors duration-300">
              PRIVACY
            </a>
            <a href="#" className="hover:text-white transition-colors duration-300">
              TERMS
            </a>
          </div>
        </div>
      </div>

      {/* Large Background Name */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none">
        <h1 className="text-[15vw] font-black text-[#0d0d0d] leading-none tracking-tighter text-center">
          {siteConfig.name.split(" ")[0]}
        </h1>
      </div>
    </footer>
  );
}
