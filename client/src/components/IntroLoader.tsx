import { useEffect, useRef, useState, type CSSProperties } from "react";
import { animate, createTimeline, stagger } from "animejs";
import { ArrowRight, Languages } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import type { Language } from "@/data/locales";

type IntroPhase = "intro" | "select" | "exit";

const orbitLabels = ["SEC", "QBIT", "BUILD"];

export default function IntroLoader() {
  const { language, setLanguage, isLoaded } = useLanguage();
  const [phase, setPhase] = useState<IntroPhase>("intro");
  const [dismissed, setDismissed] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const dismissTimerRef = useRef<number | null>(null);

  const exitIntro = () => {
    setPhase("exit");
    if (dismissTimerRef.current) window.clearTimeout(dismissTimerRef.current);
    dismissTimerRef.current = window.setTimeout(() => setDismissed(true), 650);
  };

  useEffect(() => {
    return () => {
      if (dismissTimerRef.current) window.clearTimeout(dismissTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (!isLoaded || dismissed || phase !== "intro") return;
    const root = rootRef.current;
    if (!root) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reducedMotion) {
      if (language) exitIntro();
      else setPhase("select");
      return;
    }

    const timeline = createTimeline({ defaults: { ease: "outExpo" } });
    timeline
      .add(root.querySelector(".launch-ascii") as Element, {
        opacity: [0, 0.22],
        duration: 900,
      })
      .add(
        root.querySelector(".launch-stage") as Element,
        {
          opacity: [0, 1],
          scale: [0.58, 1],
          rotate: [-7, 0],
          duration: 1500,
        },
        "-=720"
      )
      .add(
        root.querySelectorAll(".launch-tick"),
        {
          opacity: [0, 0.72],
          scaleY: [0.1, 1],
          duration: 420,
          delay: stagger(22, { from: "center" }),
        },
        "-=1000"
      )
      .add(
        root.querySelector(".launch-kicker") as Element,
        {
          opacity: [0, 1],
          translateY: [18, 0],
          duration: 520,
        },
        "-=620"
      )
      .add(
        root.querySelectorAll(".launch-word > span"),
        {
          opacity: [0, 1],
          translateY: [90, 0],
          rotateX: [78, 0],
          duration: 900,
          delay: stagger(95),
        },
        "-=330"
      )
      .add(
        root.querySelector(".launch-description") as Element,
        {
          opacity: [0, 1],
          translateY: [20, 0],
          duration: 600,
        },
        "-=500"
      )
      .add(
        root.querySelector(".launch-hud") as Element,
        {
          opacity: [0, 1],
          duration: 500,
        },
        "-=280"
      );

    const corePulse = animate(root.querySelector(".launch-core") as Element, {
      scale: [0.96, 1.035],
      duration: 1200,
      alternate: true,
      loop: true,
      ease: "inOutSine",
    });
    const particlePulse = animate(root.querySelectorAll(".launch-particle"), {
      opacity: [0.18, 1],
      scale: [0.6, 1.2],
      duration: 900,
      delay: stagger(180),
      alternate: true,
      loop: true,
      ease: "inOutSine",
    });

    const phaseTimer = window.setTimeout(() => {
      if (language) exitIntro();
      else setPhase("select");
    }, 3900);

    return () => {
      window.clearTimeout(phaseTimer);
      timeline.cancel();
      corePulse.cancel();
      particlePulse.cancel();
    };
  }, [dismissed, isLoaded, language, phase]);

  useEffect(() => {
    if (phase !== "select" || !rootRef.current) return;
    const panel = rootRef.current.querySelector(".launch-language");
    if (!panel) return;
    const entrance = animate(panel, {
      opacity: [0, 1],
      translateY: [26, 0],
      scale: [0.96, 1],
      duration: 650,
      ease: "outExpo",
    });
    return () => {
      entrance.cancel();
    };
  }, [phase]);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    event.currentTarget.style.setProperty(
      "--scene-x",
      `${(x * 20).toFixed(2)}px`
    );
    event.currentTarget.style.setProperty(
      "--scene-y",
      `${(y * 16).toFixed(2)}px`
    );
    event.currentTarget.style.setProperty(
      "--scene-rx",
      `${(-8 - y * 10).toFixed(2)}deg`
    );
    event.currentTarget.style.setProperty(
      "--scene-ry",
      `${(12 + x * 14).toFixed(2)}deg`
    );
  };

  const handleSkip = () => {
    if (language) exitIntro();
    else setPhase("select");
  };

  const handleLanguageSelect = (nextLanguage: Language) => {
    setLanguage(nextLanguage);
    exitIntro();
  };

  if (dismissed) return null;

  return (
    <div
      ref={rootRef}
      className={`launch-overlay is-${phase}`}
      onPointerMove={handlePointerMove}
      aria-label="SIRIUS portfolio introduction"
    >
      <div className="launch-grid" aria-hidden="true" />
      <pre className="launch-ascii" aria-hidden="true">
        {`01010011 01011001 01010111  /  量子態 :: SECURE CHANNEL
10100110 00110101 11001010  /  BUILD · TEST · DOCUMENT
00+--=::.. 01+==--.. 11##@@  /  TAIWAN / 25.03°N`}
      </pre>

      <button className="launch-skip" type="button" onClick={handleSkip}>
        {phase === "intro" ? "SKIP INTRO" : language ? "ENTER" : "LANGUAGE"}
        <ArrowRight aria-hidden="true" />
      </button>

      <div className="launch-copy">
        <p className="launch-kicker">
          <span>01</span> / SING YUN WU
        </p>
        <h1 className="launch-word" aria-label="SIRIUS WU">
          <span>SIRIUS</span>
          <span>WU</span>
        </h1>
        <p className="launch-description">
          SECURITY <span>/</span> QUANTUM <span>/</span> ENGINEERING
        </p>
      </div>

      <div className="launch-stage" aria-hidden="true">
        <div className="launch-scene">
          <div className="launch-plane launch-plane--back" />
          <div className="launch-orbit launch-orbit--a">
            {orbitLabels.map((label, index) => (
              <span className={`launch-node launch-node--${index}`} key={label}>
                {label}
              </span>
            ))}
          </div>
          <div className="launch-orbit launch-orbit--b" />
          <div className="launch-orbit launch-orbit--c" />
          <div className="launch-tick-ring">
            {Array.from({ length: 36 }).map((_, index) => (
              <span
                className="launch-tick"
                style={{ "--tick-angle": `${index * 10}deg` } as CSSProperties}
                key={index}
              />
            ))}
          </div>
          <div className="launch-core">
            <span className="launch-core__eyebrow">SING YUN</span>
            <strong>SYW</strong>
            <span className="launch-core__serial">QBIT·823</span>
          </div>
          {Array.from({ length: 8 }).map((_, index) => (
            <span
              className={`launch-particle launch-particle--${index}`}
              key={index}
            />
          ))}
          <div className="launch-plane launch-plane--front" />
        </div>
      </div>

      <div className="launch-hud" aria-hidden="true">
        <span>PORTFOLIO / 2026</span>
        <div>
          <i />
          <i />
          <i />
        </div>
        <span>25.03°N · 121.56°E</span>
      </div>

      {phase === "select" && (
        <div
          className="launch-language"
          role="dialog"
          aria-modal="true"
          aria-labelledby="language-title"
        >
          <Languages aria-hidden="true" />
          <p>INTERFACE READY</p>
          <h2 id="language-title">SELECT LANGUAGE / 選擇語言</h2>
          <div>
            <button type="button" onClick={() => handleLanguageSelect("en")}>
              <span>EN</span>
              English
            </button>
            <button type="button" onClick={() => handleLanguageSelect("zh")}>
              <span>繁</span>
              繁體中文
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
