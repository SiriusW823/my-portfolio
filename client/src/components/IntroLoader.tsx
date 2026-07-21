import { useEffect, useRef, type CSSProperties } from "react";
import { animate, createTimeline, stagger } from "animejs";
import { ArrowDown } from "lucide-react";

const orbitLabels = ["SEC", "QBIT", "BUILD"];

const clamp = (value: number, min = 0, max = 1) =>
  Math.min(max, Math.max(min, value));

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
      const copyProgress = clamp(progress / 0.58);
      const endProgress = clamp((progress - 0.72) / 0.28);

      root.style.setProperty("--scroll-progress", progress.toFixed(4));
      root.style.setProperty(
        "--scroll-percent",
        `${(progress * 100).toFixed(1)}%`
      );
      root.style.setProperty("--copy-opacity", `${1 - copyProgress * 0.94}`);
      root.style.setProperty(
        "--copy-y",
        `${(-copyProgress * 15).toFixed(2)}vh`
      );
      root.style.setProperty("--copy-scale", `${1 - copyProgress * 0.08}`);
      root.style.setProperty("--stage-x", `${(-progress * 13).toFixed(2)}vw`);
      root.style.setProperty("--stage-y", `${(-progress * 7).toFixed(2)}vh`);
      root.style.setProperty("--stage-scale", `${1 - progress * 0.4}`);
      root.style.setProperty(
        "--stage-rotate",
        `${(progress * 42).toFixed(2)}deg`
      );
      root.style.setProperty(
        "--scene-scroll-rotate",
        `${(progress * 74).toFixed(2)}deg`
      );
      root.style.setProperty("--stage-opacity", `${1 - endProgress * 0.42}`);
      root.style.setProperty("--grid-opacity", `${0.28 - progress * 0.2}`);
      root.style.setProperty("--grid-y", `${28 + progress * 13}%`);
      root.style.setProperty("--grid-scale", `${1 + progress * 0.12}`);
      root.style.setProperty(
        "--scroll-cue-opacity",
        `${1 - clamp(progress * 1.8)}`
      );

      root.dataset.step =
        progress < 0.34 ? "observe" : progress < 0.68 ? "entangle" : "resolve";
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
        scale: [0.68, 1],
        rotate: [-8, 0],
        duration: 1450,
      })
      .add(
        root.querySelectorAll(".launch-tick"),
        {
          opacity: [0, 0.72],
          scaleY: [0.1, 1],
          duration: 400,
          delay: stagger(20, { from: "center" }),
        },
        "-=950"
      )
      .add(
        root.querySelectorAll(".launch-copy > *"),
        {
          opacity: [0, 1],
          translateY: [28, 0],
          duration: 720,
          delay: stagger(90),
        },
        "-=780"
      )
      .add(
        root.querySelector(".launch-hud") as Element,
        { opacity: [0, 1], duration: 480 },
        "-=420"
      );

    const corePulse = animate(
      root.querySelector(".launch-core__nucleus") as Element,
      {
        scale: [0.92, 1.08],
        opacity: [0.74, 1],
        duration: 1350,
        alternate: true,
        loop: true,
        ease: "inOutSine",
      }
    );
    const particlePulse = animate(root.querySelectorAll(".launch-particle"), {
      opacity: [0.16, 1],
      scale: [0.55, 1.25],
      duration: 900,
      delay: stagger(170),
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
      `${(x * 18).toFixed(2)}px`
    );
    event.currentTarget.style.setProperty(
      "--scene-y",
      `${(y * 14).toFixed(2)}px`
    );
    event.currentTarget.style.setProperty(
      "--scene-rx",
      `${(-8 - y * 9).toFixed(2)}deg`
    );
    event.currentTarget.style.setProperty(
      "--scene-ry",
      `${(12 + x * 12).toFixed(2)}deg`
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
      data-step="observe"
      aria-label="SIRIUS portfolio introduction"
    >
      <div className="launch-overlay" onPointerMove={handlePointerMove}>
        <div className="launch-grid" aria-hidden="true" />
        <pre className="launch-ascii" aria-hidden="true">
          {`|ψ〉 = α|0〉 + β|1〉  /  QUANTUM FIELD :: SECURE CHANNEL
H|0〉 → (|0〉+|1〉)/√2  /  BUILD · TEST · DOCUMENT
00+--=::.. 01+==--.. 11##@@  /  TAIWAN / 25.03°N`}
        </pre>

        <div className="launch-copy">
          <p className="launch-kicker">
            <span>01</span> / SING YUN WU
          </p>
          <h1 className="launch-statement">
            <span>SECURE.</span>
            <span>ENTANGLE.</span>
            <span>BUILD.</span>
          </h1>
          <p className="launch-description">
            SECURITY <span>/</span> QUANTUM <span>/</span> ENGINEERING
          </p>
        </div>

        <div className="launch-stage" aria-hidden="true">
          <div className="launch-stage-frame">
            <div className="launch-scene">
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
                  <i />
                  <i />
                  <i />
                </span>
                <span className="launch-core__serial">QBIT·823 / COHERENT</span>
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
        </div>

        <ol className="launch-steps" aria-hidden="true">
          <li data-step-name="observe">
            <span>01</span> OBSERVE
          </li>
          <li data-step-name="entangle">
            <span>02</span> ENTANGLE
          </li>
          <li data-step-name="resolve">
            <span>03</span> RESOLVE
          </li>
        </ol>

        <div className="launch-hud" aria-hidden="true">
          <span>PORTFOLIO / 2026</span>
          <div className="launch-progress-track">
            <i />
          </div>
          <span>SCROLL-LINKED / LIVE</span>
        </div>

        <button
          className="launch-scroll"
          type="button"
          onClick={scrollToContent}
        >
          <span>SCROLL TO EXPLORE</span>
          <ArrowDown aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
