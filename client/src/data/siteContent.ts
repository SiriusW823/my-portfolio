import type { Language } from "./locales";

export interface LocalizedText {
  en: string;
  zh: string;
}

export const profile = {
  name: "SIRIUS",
  shortBio: {
    zh: "來自台灣的高中生，研究資安、量子運算與工程實作。",
    en: "A high school student in Taiwan exploring cybersecurity, quantum computing, and hands-on engineering.",
  },
  current: {
    zh: "自製 EIS 量測系統、量子啟發式分析與資安競賽紀錄",
    en: "A self-built EIS measurement system, quantum-inspired analysis, and security competition notes",
  },
};

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
  { label: "research", items: ["Quantum Computing", "Machine Learning"] },
  { label: "security", items: ["Web Security", "CTF", "Linux"] },
];

export function localize(text: LocalizedText, language: Language | null) {
  return text[language === "zh" ? "zh" : "en"];
}
