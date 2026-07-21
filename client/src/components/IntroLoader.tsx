import { useEffect, useRef, type CSSProperties } from "react";
import { animate, createTimeline, stagger } from "animejs";
import { ArrowDown } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { articleIndex } from "@/data/articleIndex.generated";
import { localize, profile } from "@/data/siteContent";

const orbitLabels = ["SEC", "QBIT", "BUILD"];
const chapterCenters = [0, 0.34, 0.67, 1];

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

export default function IntroLoader() {
  const { language } = useLanguage();
  const isZh = language === "zh";
  const rootRef = useRef<HTMLElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  const chapters = [
    {
      key: "identity",
      index: "01",
      eyebrow: "IDENTITY",
      title: ["I AM", "SIRIUS."],
      body: localize(profile.shortBio, language),
      tags: ["TAIWAN", "STUDENT", "RESEARCHER"],
    },
    {
      key: "fields",
      index: "02",
      eyebrow: "FIELDS",
      title: ["THREE", "SYSTEMS."],
      body: isZh
        ? "在資安、量子運算與工程實作之間切換視角，理解系統如何運作，也追問它會如何失效。"
        : "I move between cybersecurity, quantum computing, and engineering—studying how systems work and where they fail.",
      tags: ["SECURITY", "QUANTUM", "ENGINEERING"],
    },
    {
      key: "method",
      index: "03",
      eyebrow: "METHOD",
      title: ["BREAK.", "MODEL.", "BUILD."],
      body: isZh
        ? "用 CTF 拆解問題、用量子與機器學習建立模型，再把想法做成能夠量測與驗證的硬體。"
        : "I break problems through CTFs, model them with quantum and machine learning, then build hardware that can be measured and tested.",
      tags: ["CTF", "QML", "HARDWARE"],
    },
    {
      key: "archive",
      index: "04",
      eyebrow: "ARCHIVE",
      title: ["TRACE", "THE WORK."],
      body: isZh
        ? `把每次嘗試、失敗與成果整理成 ${articleIndex.length} 篇可追溯的筆記。繼續往下，查看完整過程。`
        : `I turn experiments, failures, and results into ${articleIndex.length} traceable notes. Keep scrolling to see the full process.`,
      tags: [`${articleIndex.length} NOTES`, "4 FIELDS", "OPEN PROCESS"],
    },
  ] as const;

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
        compact ? [0, -9, 2, -4] : [0, -24, 7, -9]
      );
      const stageY = interpolateStops(
        progress,
        compact ? [0, -5, 3, -8] : [0, -8, 4, -11]
      );
      const stageScale = interpolateStops(progress, [1, 0.78, 1.08, 0.58]);
      const stageRotate = interpolateStops(progress, [0, 64, 142, 228]);
      const coreScale = interpolateStops(progress, [1, 1.24, 0.76, 0.5]);
      const activeChapter =
        progress < 0.17
          ? "identity"
          : progress < 0.505
            ? "fields"
            : progress < 0.835
              ? "method"
              : "archive";

      root.style.setProperty("--scroll-progress", progress.toFixed(4));
      root.style.setProperty(
        "--scroll-percent",
        `${(progress * 100).toFixed(1)}%`
      );
      root.style.setProperty("--stage-x", `${stageX.toFixed(2)}vw`);
      root.style.setProperty("--stage-y", `${stageY.toFixed(2)}vh`);
      root.style.setProperty("--stage-scale", stageScale.toFixed(4));
      root.style.setProperty("--stage-rotate", `${stageRotate.toFixed(2)}deg`);
      root.style.setProperty(
        "--scene-scroll-rotate",
        `${(progress * 118).toFixed(2)}deg`
      );
      root.style.setProperty("--stage-opacity", `${0.96 - progress * 0.18}`);
      root.style.setProperty("--core-scale", coreScale.toFixed(4));
      root.style.setProperty(
        "--orbit-a-scale",
        `${1 + Math.sin(progress * Math.PI * 2) * 0.1}`
      );
      root.style.setProperty(
        "--orbit-b-scale",
        `${1 - Math.sin(progress * Math.PI) * 0.18}`
      );
      root.style.setProperty("--orbit-c-scale", `${1 + progress * 0.26}`);
      root.style.setProperty("--grid-opacity", `${0.28 - progress * 0.13}`);
      root.style.setProperty("--grid-y", `${28 + progress * 18}%`);
      root.style.setProperty("--grid-scale", `${1 + progress * 0.18}`);
      root.style.setProperty(
        "--scroll-cue-opacity",
        `${1 - clamp(progress * 1.8)}`
      );

      chapterCenters.forEach((center, index) => {
        const distance = Math.abs(progress - center);
        const visibility = clamp(1 - distance / 0.245);
        const direction = clamp((center - progress) * 105, -18, 18);
        root.style.setProperty(
          `--chapter-${index}-opacity`,
          visibility.toFixed(4)
        );
        root.style.setProperty(
          `--chapter-${index}-y`,
          `${direction.toFixed(2)}vh`
        );
        root.style.setProperty(
          `--chapter-${index}-scale`,
          `${0.94 + visibility * 0.06}`
        );
      });

      root.dataset.step = activeChapter;
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
        root.querySelectorAll(".launch-story-panel:first-child > *"),
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
      data-step="identity"
      aria-label="SIRIUS portfolio introduction"
    >
      <div className="launch-overlay" onPointerMove={handlePointerMove}>
        <div className="launch-grid" aria-hidden="true" />
        <pre className="launch-ascii" aria-hidden="true">
          {`|ψ〉 = α|0〉 + β|1〉  /  QUANTUM FIELD :: SECURE CHANNEL
H|0〉 → (|0〉+|1〉)/√2  /  BUILD · TEST · DOCUMENT
00+--=::.. 01+==--.. 11##@@  /  TAIWAN / 25.03°N`}
        </pre>

        <div className="launch-story">
          {chapters.map((chapter, index) => (
            <article
              className={`launch-story-panel launch-story-panel--${chapter.key}`}
              style={{ "--chapter-index": index } as CSSProperties}
              key={chapter.key}
            >
              <p className="launch-chapter__kicker">
                <span>{chapter.index}</span> / {chapter.eyebrow}
              </p>
              {index === 0 ? (
                <h1 className="launch-chapter__title">
                  {chapter.title.map(line => (
                    <span key={line}>{line}</span>
                  ))}
                </h1>
              ) : (
                <h2 className="launch-chapter__title">
                  {chapter.title.map(line => (
                    <span key={line}>{line}</span>
                  ))}
                </h2>
              )}
              <p className="launch-chapter__body">{chapter.body}</p>
              <ul
                className="launch-chapter__tags"
                aria-label={`${chapter.eyebrow} tags`}
              >
                {chapter.tags.map(tag => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </article>
          ))}
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
          <li data-step-name="identity">
            <span>01</span> IDENTITY
          </li>
          <li data-step-name="fields">
            <span>02</span> FIELDS
          </li>
          <li data-step-name="method">
            <span>03</span> METHOD
          </li>
          <li data-step-name="archive">
            <span>04</span> ARCHIVE
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
