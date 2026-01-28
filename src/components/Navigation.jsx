"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/data/portfolioData";

const navLinks = [
  { href: "#experience", label: "EXPERIENCE" },
  { href: "#awards", label: "AWARDS" },
  { href: "#activities", label: "ACTIVITIES" },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-[#0a0a0a]/90 backdrop-blur-md border-b border-[#1a1a1a]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a
              href="#"
              className="text-xl font-black tracking-tighter hover:text-gray-300 transition-colors duration-300"
            >
              {siteConfig.name.split(" ")[0]}
              <span className="text-outline ml-1">
                {siteConfig.name.split(" ")[1]?.[0] || ""}
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-12">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm tracking-wider text-gray-400 hover:text-white transition-colors duration-300 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-300" />
                </a>
              ))}
              <a
                href={`mailto:${siteConfig.email}`}
                className="px-6 py-2 border border-white text-sm tracking-wider hover:bg-white hover:text-black transition-all duration-300"
              >
                CONTACT
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 hover:bg-[#1a1a1a] transition-colors duration-300"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-[#0a0a0a] transition-transform duration-500 md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-12">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-3xl font-bold tracking-wider hover:text-gray-300 transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
          <a
            href={`mailto:${siteConfig.email}`}
            onClick={() => setIsMobileMenuOpen(false)}
            className="mt-8 px-8 py-4 border border-white text-lg tracking-wider hover:bg-white hover:text-black transition-all duration-300"
          >
            GET IN TOUCH
          </a>
        </div>
      </div>
    </>
  );
}
