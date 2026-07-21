import { useEffect, useRef, type CSSProperties } from "react";
import { animate, createTimeline, stagger } from "animejs";
import { ArrowDown } from "lucide-react";

const orbitLabels = ["SEC", "QBIT", "BUILD"];
const momentCenters = [0, 0.34, 0.67];

const clamp = (value: number, min = 0, max = 1) =>
  Math.min(max, Math.max(min, value));

const interpolateStops = (progress: number, values: number[]) => {
  const position = clamp(progress) * (values.length - 1);
  const startIndex = Math.min(Math.floor(position), values.length - 2);
  const amount = position - startIndex;
  return (
    values[startIndex] + (values[startIndex + 1] - values[startIndex]) * amount
  );
};

const moments = [
  {
    key: "student",
    index: "01",
    kicker: "THIS IS",
    lines: ["A STUDENT", "IN TAIWAN."],
  },
  {
    key: "explore",
    index: "02",
    kicker: "CURIOUS ABOUT",
    lines: ["SECURITY.", "QUANTUM.", "ENGINEERING."],
  },
  {
    key: "build",
    index: "03",
    kicker: "LEARNING BY",
    lines: ["BREAKING.", "MODELING.", "BUILDING."],
  },
] as const;

export default function IntroLoader() {
  const rootRef = useRef<HTMLElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const updateScrollScene = () => {
      animationFrameRef.current = null;
      const rect = root.getBoundingClientRect();
      const scrollDistance = Math.max(
        root.offsetHeight - window.innerHeight,
        1
      );
      const progress = clamp(-rect.top / scrollDistance);
      const compact = window.innerWidth <= 720;
      const stageX = interpolateStops(
        progress,
        compact ? [0, -4, 6, -3, 0] : [0, -7, 9, -5, 0]
      );
      const stageY = interpolateStops(
        progress,
        compact ? [7, 3, -4, 4, 2] : [1, 5, -6, 3, 0]
      );
      const stageScale = interpolateStops(
        progress,
        [0.88, 1.18, 2.15, 1.45, 0.96]
      );
      const stageRotate = interpolateStops(progress, [0, 48, 126, 226, 332]);
      const stageZ = interpolateStops(progress, [-80, -10, 80, -20, 20]);
      const cameraDepth = interpolateStops(progress, [0, 170, 420, 700, 980]);
      const coreScale = interpolateStops(progress, [1, 1.08, 1.35, 0.82, 1]);
      const finalVisibility = clamp((progress - 0.86) / 0.14);
      const activeMoment =
        progress < 0.19
          ? "student"
          : progress < 0.5
            ? "explore"
            : progress < 0.84
              ? "build"
              : "reveal";

      root.style.setProperty("--scroll-progress", progress.toFixed(4));
      root.style.setProperty(
        "--scroll-percent",
        `${(progress * 100).toFixed(1)}%`
      );
      root.style.setProperty("--stage-x", `${stageX.toFixed(2)}vw`);
      root.style.setProperty("--stage-y", `${stageY.toFixed(2)}vh`);
      root.style.setProperty("--stage-z", `${stageZ.toFixed(2)}px`);
      root.style.setProperty("--stage-scale", stageScale.toFixed(4));
      root.style.setProperty("--stage-rotate", `${stageRotate.toFixed(2)}deg`);
      root.style.setProperty("--camera-depth", `${cameraDepth.toFixed(2)}px`);
      root.style.setProperty(
        "--scene-scroll-rotate",
        `${(progress * 92).toFixed(2)}deg`
      );
      root.style.setProperty(
        "--scroll-tilt-x",
        `${interpolateStops(progress, [0, 10, -16, 12, 0]).toFixed(2)}deg`
      );
      root.style.setProperty(
        "--scroll-tilt-y",
        `${interpolateStops(progress, [0, -13, 18, -9, 0]).toFixed(2)}deg`
      );
      root.style.setProperty("--stage-opacity", `${0.98 - progress * 0.08}`);
      root.style.setProperty("--core-scale", coreScale.toFixed(4));
      root.style.setProperty(
        "--orbit-a-scale",
        `${1 + Math.sin(progress * Math.PI * 2.4) * 0.13}`
      );
      root.style.setProperty(
        "--orbit-b-scale",
        `${1 - Math.sin(progress * Math.PI * 1.7) * 0.2}`
      );
      root.style.setProperty("--orbit-c-scale", `${1 + progress * 0.34}`);
      root.style.setProperty(
        "--tunnel-opacity",
        `${clamp(0.22 + Math.sin(progress * Math.PI) * 0.72)}`
      );
      root.style.setProperty("--grid-opacity", `${0.25 - progress * 0.1}`);
      root.style.setProperty("--grid-y", `${26 + progress * 22}%`);
      root.style.setProperty("--grid-scale", `${1 + progress * 0.14}`);
      root.style.setProperty(
        "--scroll-cue-opacity",
        `${1 - clamp(progress * 1.8)}`
      );
      root.style.setProperty("--final-opacity", finalVisibility.toFixed(4));
      root.style.setProperty("--final-scale", `${0.7 + finalVisibility * 0.3}`);

      momentCenters.forEach((center, index) => {
        const distance = Math.abs(progress - center);
        const visibility = clamp(1 - distance / 0.2);
        const direction = clamp((center - progress) * 120, -20, 20);
        root.style.setProperty(
          `--moment-${index}-opacity`,
          visibility.toFixed(4)
        );
        root.style.setProperty(
          `--moment-${index}-y`,
          `${direction.toFixed(2)}vh`
        );
        root.style.setProperty(
          `--moment-${index}-scale`,
          `${0.92 + visibility * 0.08}`
        );
      });

      if (root.dataset.step !== activeMoment) {
        root.dataset.step = activeMoment;
      }
    };

    const requestScrollUpdate = () => {
      if (animationFrameRef.current !== null) return;
      animationFrameRef.current =
        window.requestAnimationFrame(updateScrollScene);
    };

    updateScrollScene();
    window.addEventListener("scroll", requestScrollUpdate, { passive: true });
    window.addEventListener("resize", requestScrollUpdate);
    root.classList.add("is-ready");

    if (reducedMotion) {
      root.classList.add("is-reduced-motion");
      return () => {
        window.removeEventListener("scroll", requestScrollUpdate);
        window.removeEventListener("resize", requestScrollUpdate);
        if (animationFrameRef.current !== null) {
          window.cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }

    const timeline = createTimeline({ defaults: { ease: "outExpo" } });
    timeline
      .add(root.querySelector(".launch-stage-frame") as Element, {
        opacity: [0, 1],
        scale: [0.62, 1],
        rotate: [-10, 0],
        duration: 1550,
      })
      .add(
        root.querySelectorAll(".launch-tick, .launch-tunnel-ring"),
        {
          opacity: [0, 0.72],
          scale: [0.72, 1],
          duration: 520,
          delay: stagger(34, { from: "center" }),
        },
        "-=1080"
      )
      .add(
        root.querySelectorAll(".launch-moment:first-child > *"),
        {
          opacity: [0, 1],
          translateY: [30, 0],
          duration: 720,
          delay: stagger(110),
        },
        "-=820"
      )
      .add(
        root.querySelector(".launch-hud") as Element,
        { opacity: [0, 1], duration: 480 },
        "-=420"
      );

    const corePulse = animate(
      root.querySelector(".launch-core__nucleus") as Element,
      {
        scale: [0.96, 1.04],
        opacity: [0.86, 1],
        duration: 1650,
        alternate: true,
        loop: true,
        ease: "inOutSine",
      }
    );
    const particlePulse = animate(root.querySelectorAll(".launch-particle"), {
      opacity: [0.16, 1],
      scale: [0.5, 1.35],
      duration: 820,
      delay: stagger(130),
      alternate: true,
      loop: true,
      ease: "inOutSine",
    });

    return () => {
      window.removeEventListener("scroll", requestScrollUpdate);
      window.removeEventListener("resize", requestScrollUpdate);
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
      timeline.cancel();
      corePulse.cancel();
      particlePulse.cancel();
    };
  }, []);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    event.currentTarget.style.setProperty(
      "--scene-x",
      `${(x * 28).toFixed(2)}px`
    );
    event.currentTarget.style.setProperty(
      "--scene-y",
      `${(y * 22).toFixed(2)}px`
    );
    event.currentTarget.style.setProperty(
      "--scene-rx",
      `${(-10 - y * 14).toFixed(2)}deg`
    );
    event.currentTarget.style.setProperty(
      "--scene-ry",
      `${(14 + x * 18).toFixed(2)}deg`
    );
  };

  const scrollToContent = () => {
    document.querySelector("#main-content")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section
      ref={rootRef}
      className="scroll-intro"
      data-step="student"
      aria-label="Portfolio introduction"
    >
      <div className="launch-overlay" onPointerMove={handlePointerMove}>
        <div className="launch-grid" aria-hidden="true" />
        <pre className="launch-ascii" aria-hidden="true">
          {`|ψ〉 = α|0〉 + β|1〉  /  QUANTUM FIELD :: SECURE CHANNEL
H|0〉 → (|0〉+|1〉)/√2  /  BUILD · TEST · DOCUMENT
00+--=::.. 01+==--.. 11##@@  /  TAIWAN / 25.03°N`}
        </pre>

        <div className="launch-narrative">
          {moments.map((moment, index) => (
            <article
              className={`launch-moment launch-moment--${moment.key}`}
              style={{ "--moment-index": index } as CSSProperties}
              key={moment.key}
            >
              <p className="launch-moment__kicker">
                <span>{moment.index}</span> / {moment.kicker}
              </p>
              {index === 0 ? (
                <h1 className="launch-moment__title">
                  {moment.lines.map(line => (
                    <span key={line}>{line}</span>
                  ))}
                </h1>
              ) : (
                <h2 className="launch-moment__title">
                  {moment.lines.map(line => (
                    <span key={line}>{line}</span>
                  ))}
                </h2>
              )}
            </article>
          ))}
        </div>

        <div className="launch-stage" aria-hidden="true">
          <div className="launch-stage-frame">
            <div className="launch-scene">
              <div className="launch-tunnel">
                {Array.from({ length: 6 }).map((_, index) => (
                  <span
                    className="launch-tunnel-ring"
                    style={
                      {
                        "--ring-index": index,
                        "--ring-z": `${-620 + index * 170}px`,
                        "--ring-inset": `${index * 4.2}%`,
                        "--ring-rotate": `${index * 19}deg`,
                      } as CSSProperties
                    }
                    key={index}
                  />
                ))}
              </div>
              <div className="launch-plane launch-plane--back" />
              <div className="launch-orbit launch-orbit--a">
                {orbitLabels.map((label, index) => (
                  <span
                    className={`launch-node launch-node--${index}`}
                    key={label}
                  >
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
                    style={
                      { "--tick-angle": `${index * 10}deg` } as CSSProperties
                    }
                    key={index}
                  />
                ))}
              </div>
              <div className="launch-core">
                <span className="launch-core__nucleus">
                  <span className="launch-core__sphere">
                    <span className="launch-core__shine" />
                    <span className="launch-core__shadow" />
                  </span>
                  <i className="launch-core__shell launch-core__shell--a">
                    <b />
                  </i>
                  <i className="launch-core__shell launch-core__shell--b">
                    <b />
                  </i>
                  <i className="launch-core__shell launch-core__shell--c">
                    <b />
                  </i>
                </span>
                <span className="launch-core__serial">QBIT·823 / COHERENT</span>
              </div>
              {Array.from({ length: 8 }).map((_, index) => (
                <span
                  className={`launch-particle launch-particle--${index % 8}`}
                  style={
                    {
                      "--particle-depth": `${40 + index * 22}px`,
                    } as CSSProperties
                  }
                  key={index}
                />
              ))}
              <div className="launch-plane launch-plane--front" />
            </div>
          </div>
        </div>

        <div className="launch-final">
          <span>CALL ME</span>
          <strong>SIRIUS.</strong>
          <i>SECURITY · QUANTUM · ENGINEERING</i>
        </div>

        <div className="launch-hud" aria-hidden="true">
          <span>PORTFOLIO / 2026</span>
          <div className="launch-progress-track">
            <i />
          </div>
          <span>SCROLL / THROUGH THE ORBIT</span>
        </div>

        <button
          className="launch-scroll"
          type="button"
          onClick={scrollToContent}
        >
          <span>ENTER THE ORBIT</span>
          <ArrowDown aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
