import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { Language } from "@/data/locales";

// Minimal matrix rain column for background effect
function MatrixRain() {
  const chars = "01アイウエオカキクケコサシスセソタチツテト";
  const columns = 30;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.07]">
      {Array.from({ length: columns }).map((_, i) => {
        const delay = Math.random() * 5;
        const duration = 4 + Math.random() * 6;
        const left = `${(i / columns) * 100}%`;
        const text = Array.from({ length: 20 }, () =>
          chars[Math.floor(Math.random() * chars.length)]
        ).join("\n");

        return (
          <motion.pre
            key={i}
            className="absolute top-0 text-green-500 text-xs font-mono leading-tight whitespace-pre"
            style={{ left }}
            initial={{ y: "-100%" }}
            animate={{ y: "100vh" }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {text}
          </motion.pre>
        );
      })}
    </div>
  );
}

export default function IntroLoader() {
  const { language, setLanguage, isLoaded } = useLanguage();
  const [phase, setPhase] = useState<"loading" | "select" | "exit">("loading");
  const [progress, setProgress] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [glitchActive, setGlitchActive] = useState(false);
  const progressRef = useRef(0);

  // Terminal text animation
  const terminalLines = [
    "BOOTING SYSTEM...",
    "LOADING MODULES...",
    "INITIALIZING NEURAL INTERFACE...",
    "ESTABLISHING CONNECTION...",
    "DECRYPTING DATA STREAMS...",
    "SYSTEM READY.",
  ];

  // Cursor blink effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  // Occasional glitch effect
  useEffect(() => {
    if (phase !== "loading") return;
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 150);
    }, 2000 + Math.random() * 3000);
    return () => clearInterval(glitchInterval);
  }, [phase]);

  // Loading animation with easing
  useEffect(() => {
    if (phase !== "loading") return;

    const duration = 2500; // 2.5 seconds
    const startTime = Date.now();

    const easeInOutCubic = (t: number) => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const linearProgress = Math.min(elapsed / duration, 1);
      const easedProgress = easeInOutCubic(linearProgress);
      const currentProgress = Math.floor(easedProgress * 100);

      progressRef.current = currentProgress;
      setProgress(currentProgress);

      // Update terminal text based on progress
      const lineIndex = Math.min(
        Math.floor((currentProgress / 100) * terminalLines.length),
        terminalLines.length - 1
      );
      setDisplayText(terminalLines[lineIndex]);

      if (currentProgress < 100) {
        requestAnimationFrame(animate);
      } else {
        setTimeout(() => setPhase("select"), 500);
      }
    };

    requestAnimationFrame(animate);
  }, [phase]);

  // If language already saved, skip loader
  useEffect(() => {
    if (isLoaded && language) {
      setPhase("exit");
    }
  }, [isLoaded, language]);

  const handleLanguageSelect = (lang: Language) => {
    setLanguage(lang);
    setPhase("exit");
  };

  // Don't render anything if already exited
  if (phase === "exit" && language) {
    return null;
  }

  return (
    <AnimatePresence>
      {phase !== "exit" && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-[#030303] flex flex-col items-center justify-center overflow-hidden crt-screen crt-flicker"
        >
          {/* Matrix rain background */}
          <MatrixRain />

          {/* Scanline effect - enhanced */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.08]">
            <div
              className="w-full h-full"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,0,0.04) 2px, rgba(0,255,0,0.04) 4px)",
              }}
            />
          </div>

          {/* Glowing grid background - enhanced */}
          <div className="absolute inset-0 opacity-[0.04]">
            <div
              className="w-full h-full"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(0,255,0,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,0,0.15) 1px, transparent 1px)",
                backgroundSize: "50px 50px",
              }}
            />
          </div>

          {/* CRT vignette overlay */}
          <div className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.6) 100%)",
            }}
          />

          {/* Loading Phase */}
          <AnimatePresence mode="wait">
            {phase === "loading" && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center gap-8"
              >
                {/* ASCII Art Logo with glow */}
                <motion.pre
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-green-500 text-xs md:text-sm font-mono text-center leading-tight crt-glow"
                  style={glitchActive ? { transform: "translate(2px, -1px)", filter: "hue-rotate(90deg)" } : {}}
                >
                  {`
  ███████╗██╗██████╗ ██╗██╗   ██╗███████╗
  ██╔════╝██║██╔══██╗██║██║   ██║██╔════╝
  ███████╗██║██████╔╝██║██║   ██║███████╗
  ╚════██║██║██╔══██╗██║██║   ██║╚════██║
  ███████║██║██║  ██║██║╚██████╔╝███████║
  ╚══════╝╚═╝╚═╝  ╚═╝╚═╝ ╚═════╝ ╚══════╝
                  `}
                </motion.pre>

                {/* Terminal Window - enhanced with glow */}
                <div className="w-80 md:w-96 bg-[#0a0a0a]/90 border border-green-500/40 rounded-lg overflow-hidden shadow-2xl terminal-glow">
                  {/* Terminal Header */}
                  <div className="flex items-center gap-2 px-4 py-2 bg-[#0d0d0d]/90 border-b border-green-500/25">
                    <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.5)]" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-[0_0_6px_rgba(234,179,8,0.5)]" />
                    <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_6px_rgba(34,197,94,0.5)]" />
                    <span className="ml-2 text-green-500/60 text-xs font-mono">
                      system.exe
                    </span>
                  </div>

                  {/* Terminal Body */}
                  <div className="p-4 font-mono text-sm">
                    <div className="text-green-500/70 mb-2 crt-glow">
                      {">"} {displayText}
                      <span
                        className={`ml-1 ${showCursor ? "opacity-100" : "opacity-0"}`}
                      >
                        █
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-4">
                      <div className="flex justify-between text-green-500 text-xs mb-1">
                        <span className="crt-glow">LOADING</span>
                        <span className="crt-glow">{progress}%</span>
                      </div>
                      <div className="w-full h-2 bg-[#0a0a0a] rounded overflow-hidden border border-green-500/30">
                        <motion.div
                          className="h-full bg-gradient-to-r from-green-600 via-green-400 to-green-300"
                          style={{
                            width: `${progress}%`,
                            boxShadow: "0 0 10px rgba(0,255,0,0.5), 0 0 20px rgba(0,255,0,0.2)",
                          }}
                          transition={{ duration: 0.1 }}
                        />
                      </div>
                    </div>

                    {/* Memory/CPU Stats */}
                    <div className="mt-3 text-green-500/40 text-xs flex justify-between">
                      <span>MEM: {Math.floor(progress * 1.28)}MB</span>
                      <span>CPU: {Math.min(progress + 15, 100)}%</span>
                    </div>

                    {/* Extra terminal lines for atmosphere */}
                    <div className="mt-3 text-green-500/25 text-xs space-y-0.5">
                      {progress > 20 && <div>[OK] kernel modules loaded</div>}
                      {progress > 45 && <div>[OK] network stack initialized</div>}
                      {progress > 70 && <div>[OK] encryption layer active</div>}
                      {progress > 90 && <div>[OK] all systems operational</div>}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Language Selection Phase */}
            {phase === "select" && (
              <motion.div
                key="select"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center gap-8"
              >
                {/* Title with glow */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-center"
                >
                  <h2 className="text-green-400 text-2xl md:text-3xl font-mono font-bold tracking-wider mb-2 crt-glow">
                    SYSTEM READY
                  </h2>
                  <p className="text-green-500/60 font-mono text-sm">
                    SELECT LANGUAGE / 選擇語言
                  </p>
                </motion.div>

                {/* Language Buttons */}
                <div className="flex gap-6">
                  <motion.button
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(0,255,0,0.3)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleLanguageSelect("en")}
                    className="group relative px-12 py-6 bg-transparent border-2 border-green-500/50 rounded-lg font-mono text-xl font-bold text-green-400 hover:border-green-400 hover:bg-green-500/10 transition-all duration-300"
                  >
                    <span className="relative z-10 crt-glow">EN</span>
                    <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs text-green-500/40 group-hover:text-green-400/60">
                      ENGLISH
                    </span>
                    {/* Corner decorations */}
                    <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-green-400" />
                    <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-green-400" />
                    <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-green-400" />
                    <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-green-400" />
                  </motion.button>

                  <motion.button
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(0,255,0,0.3)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleLanguageSelect("zh")}
                    className="group relative px-12 py-6 bg-transparent border-2 border-green-500/50 rounded-lg font-mono text-xl font-bold text-green-400 hover:border-green-400 hover:bg-green-500/10 transition-all duration-300"
                  >
                    <span className="relative z-10 crt-glow">中文</span>
                    <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs text-green-500/40 group-hover:text-green-400/60">
                      繁體中文
                    </span>
                    {/* Corner decorations */}
                    <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-green-400" />
                    <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-green-400" />
                    <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-green-400" />
                    <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-green-400" />
                  </motion.button>
                </div>

                {/* Footer hint */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="text-green-500/30 font-mono text-xs mt-4"
                >
                  [ You can change this later in the navigation ]
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
