import { useEffect, useRef } from "react";
import { animate, createTimeline, stagger } from "animejs";
import { ChevronDown } from "lucide-react";

/**
 * Full-screen terminal-style opening sequence powered by anime.js,
 * followed by scroll-revealed experience sections (competitions,
 * credentials, learning). The regular home page sits below.
 */

function Chars({ text }: { text: string }) {
  return (
    <>
      {text.split("").map((char, index) => (
        <span className="intro-char" key={`${char}-${index}`}>
          {char === " " ? " " : char}
        </span>
      ))}
    </>
  );
}

const NAME = "SIRIUS";

const experienceSections = [
  {
    key: "competitions",
    label: "01 / competitions",
    title: "Competitions & Results",
    items: [
      "2026 THJCC CTF — 16 / 80 (Student Division)",
      "2026 11401 FhCTF — 19 / 54 (Student Division)",
      "2025 Taiwan Cup Rocket Competition — Perseverance Award (Secondary Division)",
      "2025 National Senior High School Essay Contest — Grade A",
    ],
  },
  {
    key: "credentials",
    label: "02 / credentials",
    title: "Credentials",
    items: [
      "IT Specialist — Python",
      "Arduino Certification",
      "APCS 4 / 2",
      "Beginner Rocket Launch Operator License",
      "SEE THINK WONDER — Gold Level",
    ],
  },
  {
    key: "learning",
    label: "03 / learning",
    title: "Learning",
    items: [
      "2025 AIS3 Junior",
      "SecurityFocus Online",
      "ISIP Web Security & Cryptography Course",
      "AI-900 Azure AI Fundamentals (Self-study)",
      "Rocket Design & Build Instructor Training",
    ],
  },
];

export default function IntroExperience() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      root.querySelectorAll<HTMLElement>(".intro-char, .intro-name__char, .reveal-item, .intro-scroll").forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "none";
      });
      return;
    }

    // --- Hero boot sequence ---
    const timeline = createTimeline({ defaults: { ease: "outExpo" } });
    timeline
      .add(root.querySelectorAll(".intro-line--1 .intro-char"), {
        opacity: [0, 1],
        duration: 20,
        delay: stagger(34),
      })
      .add(root.querySelectorAll(".intro-line--2 .intro-char"), {
        opacity: [0, 1],
        duration: 16,
        delay: stagger(14),
      }, "+=220")
      .add(root.querySelectorAll(".intro-line--3 .intro-char"), {
        opacity: [0, 1],
        duration: 20,
        delay: stagger(34),
      }, "+=260")
      .add(root.querySelectorAll(".intro-name__char"), {
        opacity: [0, 1],
        translateY: [90, 0],
        rotate: [8, 0],
        duration: 900,
        delay: stagger(70),
      }, "+=300")
      .add(root.querySelectorAll(".intro-sub .intro-char"), {
        opacity: [0, 0.9],
        duration: 12,
        delay: stagger(16),
      }, "-=500")
      .add(root.querySelector(".intro-scroll") as Element, {
        opacity: [0, 1],
        duration: 600,
      });

    const bounce = animate(root.querySelector(".intro-scroll svg") as Element, {
      translateY: [0, 9],
      duration: 700,
      alternate: true,
      loop: true,
      ease: "inOutSine",
    });

    // --- Scroll-revealed experience sections ---
    const sections = Array.from(root.querySelectorAll<HTMLElement>(".intro-section"));
    const seen = new WeakSet<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || seen.has(entry.target)) continue;
          seen.add(entry.target);
          const section = entry.target as HTMLElement;
          animate(section.querySelectorAll(".intro-section__label .intro-char"), {
            opacity: [0, 1],
            duration: 14,
            delay: stagger(22),
          });
          animate(section.querySelectorAll(".reveal-item"), {
            opacity: [0, 1],
            translateY: [46, 0],
            duration: 850,
            ease: "outExpo",
            delay: stagger(110, { start: 150 }),
          });
        }
      },
      { threshold: 0.25 },
    );
    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
      bounce.cancel();
      timeline.cancel();
    };
  }, []);

  return (
    <div className="intro-experience" ref={rootRef}>
      <section className="intro-hero section-shell" aria-label="Intro">
        <div className="intro-terminal">
          <div className="window-bar"><span /><span /><span /><code>sirius@lab</code></div>
          <div className="intro-terminal__body">
            <p className="intro-line intro-line--1">
              <span className="terminal-accent">$&nbsp;</span>
              <Chars text="ssh guest@sirius-lab" />
            </p>
            <p className="intro-line intro-line--2 intro-line--ok">
              <Chars text="[ ok ] access granted" />
            </p>
            <p className="intro-line intro-line--3">
              <span className="terminal-accent">$&nbsp;</span>
              <Chars text="cat about.txt" />
            </p>
          </div>
        </div>

        <h1 className="intro-name" aria-label={NAME}>
          {NAME.split("").map((char, index) => (
            <span className="intro-name__char" aria-hidden="true" key={index}>{char}</span>
          ))}
        </h1>
        <p className="intro-sub"><Chars text="SECURITY / QUANTUM / ENGINEERING" /></p>

        <p className="intro-scroll">
          <ChevronDown aria-hidden="true" />
          scroll to explore
        </p>
      </section>

      {experienceSections.map((section) => (
        <section className="intro-section section-shell" key={section.key} aria-label={section.title}>
          <p className="intro-section__label terminal-accent"><Chars text={section.label} /></p>
          <h2 className="reveal-item">{section.title}</h2>
          <ul className="intro-section__list">
            {section.items.map((item, index) => (
              <li className="reveal-item" key={item}>
                <span className="intro-section__index">0{index + 1}</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <section className="intro-handoff section-shell" aria-hidden="true">
        <p className="terminal-prompt"><span className="terminal-accent">$</span> cd ~/site</p>
        <ChevronDown />
      </section>
    </div>
  );
}
