"use client";

import { useState } from "react";
import ScrollEngine from "@/components/ScrollEngine";
import BackgroundPattern from "@/components/BackgroundPattern";
import ContentSections from "@/components/ContentSections";
import IntroAnimation from "@/components/IntroAnimation";

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  return (
    <>
      {/* Intro Animation Overlay */}
      {showIntro && <IntroAnimation onComplete={handleIntroComplete} />}

      {/* Main Scroll-Driven Experience */}
      <ScrollEngine>
        {/* Animated Background Pattern */}
        <BackgroundPattern />

        {/* Content Sections (controlled by scroll) */}
        <ContentSections />
      </ScrollEngine>
    </>
  );
}
