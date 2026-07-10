import type { Language } from "./locales";

export interface LocalizedText {
  en: string;
  zh: string;
}

export interface PortfolioProject {
  id: string;
  year: string;
  status: LocalizedText;
  title: LocalizedText;
  description: LocalizedText;
  role: LocalizedText;
  highlights: LocalizedText[];
  tools: string[];
  image?: string;
  imageAlt?: LocalizedText;
  articleSlug?: string;
}

export const profile = {
  name: "SIRIUS",
  shortBio: {
    zh: "來自台灣的高中生，研究資安、量子運算與工程實作。我習慣先把系統做出來，再用數據確認它是否真的有效。",
    en: "A high school student in Taiwan working across cybersecurity, quantum computing, and hands-on engineering. I build first, then use data to test whether the idea actually works.",
  },
  current: {
    zh: "自製 EIS 量測系統、量子啟發式分析與資安競賽紀錄",
    en: "A self-built EIS measurement system, quantum-inspired analysis, and security competition notes",
  },
};

export const projects: PortfolioProject[] = [
  {
    id: "eis-system",
    year: "2026",
    status: { zh: "研究進行中", en: "Research in progress" },
    title: {
      zh: "自製 EIS 電路與量子啟發式分析",
      en: "Self-built EIS system & quantum-inspired analysis",
    },
    description: {
      zh: "以 Arduino、AD9833 與 AD7606 建構低成本電化學阻抗量測系統，從同步採樣、數位鎖相放大器到等效電路擬合，完整處理訊號取得與分析流程。",
      en: "A low-cost electrochemical impedance measurement system built with Arduino, AD9833, and AD7606, covering synchronous sampling, digital lock-in amplification, and equivalent-circuit fitting.",
    },
    role: {
      zh: "電路設計、韌體、Python 分析介面與實驗驗證",
      en: "Circuit design, firmware, Python analysis interface, and validation",
    },
    highlights: [
      { zh: "1 Hz–1 kHz 頻率掃描與 16-bit 同步取樣", en: "1 Hz–1 kHz sweep with 16-bit synchronous sampling" },
      { zh: "以 Hanning window、I/Q demodulation 與複數向量平均降低雜訊", en: "Noise reduction with Hanning windows, I/Q demodulation, and vector averaging" },
      { zh: "以 Nyquist／Bode 圖比較理論模型與實測結果", en: "Comparison of theoretical and measured results with Nyquist and Bode plots" },
    ],
    tools: ["Arduino", "Python", "NumPy", "SciPy", "DSP", "EIS"],
    image: "projects/eis-circuit.png",
    imageAlt: { zh: "自製 EIS 量測電路接線圖", en: "Wiring diagram of the self-built EIS system" },
    articleSlug: "eis-formulas",
  },
  {
    id: "quantum-rl",
    year: "2025–2026",
    status: { zh: "研究紀錄", en: "Research log" },
    title: {
      zh: "量子強化學習分子生成",
      en: "Quantum reinforcement learning for molecular generation",
    },
    description: {
      zh: "從 classical RL 基線開始，以 RDKit 評估分子有效性與性質，再逐步測試量子化學 reward、量子先驗與參數化量子電路。研究中特別保留無效設計與負結果，作為下一版架構的依據。",
      en: "Starting from a classical RL baseline, the project evaluates molecular validity and properties with RDKit before testing quantum-chemistry rewards, quantum priors, and parameterized quantum circuits.",
    },
    role: {
      zh: "研究設計、模型實作、實驗紀錄與結果分析",
      en: "Research design, implementation, experiment logging, and analysis",
    },
    highlights: [
      { zh: "建立可比較的 classical baseline 與分階段量子化實驗", en: "Comparable classical baseline and staged quantum experiments" },
      { zh: "追蹤 valid、unique 與 reward 指標，而非只保留最佳結果", en: "Tracked validity, uniqueness, and reward instead of only best-case outputs" },
      { zh: "將失敗的 prior 設計轉化為後續架構限制", en: "Turned failed prior designs into constraints for later architectures" },
    ],
    tools: ["Python", "RDKit", "Reinforcement Learning", "PennyLane", "QML"],
    image: "projects/qrl-convergence.png",
    imageAlt: { zh: "分子生成訓練收斂曲線", en: "Training convergence plot for molecular generation" },
    articleSlug: "quantum-rl-molecular-generation",
  },
  {
    id: "singing-ruler",
    year: "2026",
    status: { zh: "探究實作", en: "Independent inquiry" },
    title: { zh: "會唱歌的尺：用聲音驗證懸臂樑理論", en: "The singing ruler: testing cantilever-beam theory with sound" },
    description: {
      zh: "錄製不同懸空長度的鐵尺振動聲音，以帶通濾波、Hanning window 與 FFT 擷取基頻，再用 log-log 擬合驗證頻率與長度的平方反比關係。",
      en: "Recorded ruler vibrations at different free lengths, extracted the fundamental frequency with filtering and FFT, then tested the inverse-square relationship through log-log fitting.",
    },
    role: { zh: "實驗設計、錄音量測、Python 訊號分析", en: "Experiment design, audio measurement, and Python signal analysis" },
    highlights: [
      { zh: "擬合斜率 −1.99，接近理論值 −2", en: "Fitted slope of −1.99, close to the theoretical −2" },
      { zh: "實驗與理論曲線 R² = 0.8925", en: "Experimental vs. theoretical fit of R² = 0.8925" },
      { zh: "辨識固定端、濾波與有效長度量測造成的誤差", en: "Identified clamp, filtering, and effective-length measurement errors" },
    ],
    tools: ["Python", "FFT", "SciPy", "Signal Processing", "Physics"],
    image: "projects/singing-ruler.png",
    imageAlt: { zh: "鐵尺長度與振動頻率的實驗圖表", en: "Experimental plots of ruler length and vibration frequency" },
  },
  {
    id: "rocket-avionics",
    year: "2025",
    status: { zh: "團隊工程", en: "Team engineering" },
    title: { zh: "濟天之翼：火箭航電與遙測系統", en: "Jitian Wings: rocket avionics and telemetry" },
    description: {
      zh: "參與台灣盃火箭競賽，負責飛行電腦、感測器、GPS、LoRa 與資料儲存的規劃與測試。系統目標是在飛行與海上回收過程持續記錄並回傳狀態。",
      en: "Rocket Taiwan Cup work covering the flight computer, sensors, GPS, LoRa, and data storage, designed to log and transmit status throughout flight and sea recovery.",
    },
    role: { zh: "航電硬體規劃、Python 程式、感測與通訊測試", en: "Avionics planning, Python software, sensing, and communication tests" },
    highlights: [
      { zh: "以 Raspberry Pi CM5 整合九軸感測、GPS 與相機", en: "Integrated IMU, GPS, and camera around a Raspberry Pi CM5" },
      { zh: "LoRa 在 1.5 km、包覆箭身條件下完成傳輸測試", en: "LoRa transmission tested at 1.5 km through the rocket body" },
      { zh: "規劃本機資料庫與 SD 卡備援紀錄", en: "Designed local database storage with SD-card fallback" },
    ],
    tools: ["Raspberry Pi", "Python", "LoRa", "GPS", "Sensors", "System Engineering"],
  },
  {
    id: "smart-home",
    year: "2025",
    status: { zh: "跨校實作", en: "Cross-school build" },
    title: { zh: "單晶片智慧居家", en: "Microcontroller smart home" },
    description: {
      zh: "用 Fusion 360 建模並雷切木板完成小屋，再以 ESP32、DHT11、LCD 與蜂鳴器製作溫溼度顯示、警示與音樂功能。",
      en: "A laser-cut smart house modeled in Fusion 360 and equipped with ESP32, DHT11, LCD, and buzzer functions for sensing, alerts, and music.",
    },
    role: { zh: "建模、雷切、MicroPython 與感測器整合", en: "Modeling, laser cutting, MicroPython, and sensor integration" },
    highlights: [
      { zh: "實作 DHT11 溫溼度讀取與 LCD 即時顯示", en: "Real-time DHT11 readings on an LCD" },
      { zh: "濕度超過門檻時觸發 LED 警示", en: "LED warning triggered above a humidity threshold" },
      { zh: "以 PWM 控制無源蜂鳴器播放旋律", en: "PWM-controlled passive buzzer melodies" },
    ],
    tools: ["ESP32", "MicroPython", "DHT11", "Fusion 360", "Laser Cutting"],
    image: "projects/smart-home.png",
    imageAlt: { zh: "ESP32、DHT11 與 LCD 接線示意", en: "ESP32, DHT11, and LCD wiring" },
  },
];

export const evidence = {
  competitions: [
    "2026 THJCC CTF — 16 / 80（學生組）",
    "2026 11401 FhCTF — 19 / 54（學生組）",
    "2025 台灣盃火箭競賽 — 堅定不移獎（中學組）",
    "2025 全國高級中等學校小論文寫作比賽 — 甲等",
  ],
  credentials: [
    "IT Specialist — Python",
    "Arduino Certification",
    "APCS 4 / 2",
    "初級火箭發射操作證",
    "SEE THINK WONDER — Gold Level",
  ],
  learning: [
    "2025 AIS3 Junior",
    "SecurityFocus Online",
    "ISIP 網站安全與密碼學課程",
    "AI-900 Azure AI Fundamentals 自主學習",
    "火箭設計實作教學培訓",
  ],
};

export const skillGroups = [
  { label: "build", items: ["Python", "TypeScript", "React", "Arduino", "ESP32", "Raspberry Pi"] },
  { label: "research", items: ["Quantum Computing", "Machine Learning", "DSP", "Data Analysis", "Scientific Writing"] },
  { label: "security", items: ["Web Security", "CTF", "Linux", "Network Analysis", "Exploit Reproduction"] },
];

export function localize(text: LocalizedText, language: Language | null) {
  return text[language === "zh" ? "zh" : "en"];
}
