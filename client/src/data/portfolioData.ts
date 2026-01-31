// ============================================
// PORTFOLIO DATA - Student Portfolio
// Clean, content-focused structure for academic achievements
// Bilingual Support (EN/ZH)
// ============================================

// Bilingual text type
export interface BilingualText {
  en: string;
  zh: string;
}

export interface HeroData {
  name: string;
  title: string;
  tagline: string;
}

export interface AboutData {
  bio: string;
  skills: string[];
}

export interface Project {
  id: number;
  title: string;
  description: BilingualText;
  techStack: string[];
  link: string;
}

export interface Competition {
  id: number;
  name: string;
  award: BilingualText;
  year: string;
  description: BilingualText;
}

export interface Certificate {
  id: number;
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
  link?: string;
}

export interface Course {
  id: number;
  name: string;
  institution: string;
  grade: string;
  status: "completed" | "in-progress";
  certificates?: string[]; // Array of certificate file paths
}

// ============================================
// MAIN PORTFOLIO DATA EXPORT
// ============================================

export const portfolioData = {
  hero: {
    name: "SIRIUS",
    title: "Student Developer & Security Researcher",
    tagline: "Passionate about cybersecurity, quantum computing, and building innovative solutions",
  } as HeroData,

  about: {
    bio: `I am a dedicated high school student with a deep passion for technology and cybersecurity. 
My journey began with curiosity about how systems work and evolved into active participation 
in CTF competitions, security research, and software development. I believe in continuous 
learning and pushing the boundaries of what's possible through code and innovation.`,
    skills: [
      "Python",
      "JavaScript/TypeScript",
      "React & Next.js",
      "Binary Exploitation",
      "Reverse Engineering",
      "Web Security",
      "Quantum Computing",
      "Machine Learning",
      "Linux Administration",
      "Network Security",
      "Assembly",
      "Git & DevOps",
    ],
  } as AboutData,

  projects: [
    {
      id: 1,
      title: "Audio Reactive Sphere",
      description: {
        en: "Real-time 3D audio visualization using Three.js. Captures live microphone input and creates stunning particle animations that react to sound with customizable shapes and presets.",
        zh: "使用 Three.js 開發的即時 3D 音訊視覺化專案。透過麥克風捕捉即時音訊，創造隨音樂律動的粒子動畫，支援多種形狀與預設效果。",
      },
      techStack: ["JavaScript", "Three.js", "Web Audio API", "WebGL"],
      link: "https://github.com/SiriusW823/Audio-Reactive-Sphere",
    },
    {
      id: 2,
      title: "台灣盃火箭競賽 Rocket Taiwan Cup",
      description: {
        en: "Participated in Rocket Taiwan Cup, designing and building model rockets. Learned rocket dynamics, aerodynamics, and flight control systems.",
        zh: "參與台灣盃火箭競賽，設計與製作模型火箭，學習火箭動力學、空氣動力學及飛行控制相關知識。",
      },
      techStack: ["Aerospace Engineering", "Rocket Design", "Competition"],
      link: "#",
    },
  ] as Project[],

  competitions: [
    {
      id: 1,
      name: "AlpacaHack Round 6",
      award: {
        en: "Top Performer - PWN Category",
        zh: "PWN 類別優秀表現",
      },
      year: "2025",
      description: {
        en: "Solved advanced binary exploitation challenges including heap overflow, UAF, and format string vulnerabilities.",
        zh: "成功解決進階二進位漏洞利用題目，包含堆積溢位、UAF 及格式化字串漏洞。",
      },
    },
    {
      id: 2,
      name: "Science Fair - Quantum Computing",
      award: {
        en: "Excellence Award",
        zh: "優等獎",
      },
      year: "2025",
      description: {
        en: "Research project on Quantum Reinforcement Learning for molecular generation and drug discovery applications.",
        zh: "量子強化學習研究專題，應用於分子生成與藥物探索。",
      },
    },
    {
      id: 3,
      name: "HackTheBox Challenges",
      award: {
        en: "Active Participant",
        zh: "積極參與者",
      },
      year: "2024",
      description: {
        en: "Regular participation in CTF-style machine challenges, focusing on penetration testing and exploitation.",
        zh: "定期參與 CTF 風格的滲透測試挑戰，專注於漏洞利用技術。",
      },
    },
    {
      id: 4,
      name: "NCKUCTF Competition",
      award: {
        en: "Finalist",
        zh: "決賽入圍",
      },
      year: "2024",
      description: {
        en: "National-level cybersecurity competition covering web security, cryptography, and binary exploitation.",
        zh: "全國性資安競賽，涵蓋網頁安全、密碼學及二進位漏洞利用。",
      },
    },
  ] as Competition[],

  certificates: [
    {
      id: 1,
      name: "Windows Binary Exploitation",
      issuer: "AngelBoy Security Training",
      date: "2024-12",
      credentialId: "WBE-2024-001",
    },
    {
      id: 2,
      name: "Active Directory Security",
      issuer: "NCKUCTF Training Program",
      date: "2024-08",
      credentialId: "ADS-2024-042",
    },
    {
      id: 3,
      name: "Web Application Security",
      issuer: "OWASP Foundation",
      date: "2024-06",
      credentialId: "OWASP-WAS-2024",
    },
    {
      id: 4,
      name: "Full Stack Development",
      issuer: "Certification Program",
      date: "2024-03",
      credentialId: "FSD-2024-188",
    },
    {
      id: 5,
      name: "Python for Security",
      issuer: "Cybrary",
      date: "2023-11",
      credentialId: "PYS-2023-556",
    },
  ] as Certificate[],

  courses: [
    {
      id: 1,
      name: "TAIWAN HolyYoung Training - Crypto",
      institution: "ISIP 資訊安全人才培育計畫",
      grade: "Completed",
      status: "completed" as const,
      certificates: ["/certificates/crypto-cert.png"],
    },
    {
      id: 2,
      name: "TAIWAN HolyYoung Training - 網站安全",
      institution: "ISIP 資訊安全人才培育計畫",
      grade: "Completed",
      status: "completed" as const,
      certificates: ["/certificates/website-security-cert.png"],
    },
    {
      id: 3,
      name: "高中職學生資安體驗營",
      institution: "ISIP 資訊安全人才培育計畫",
      grade: "Completed",
      status: "completed" as const,
      certificates: ["/certificates/camp-day1.pdf", "/certificates/camp-day2.pdf"],
    },
    {
      id: 4,
      name: "TAIWAN HolyYoung Training - 網頁安全",
      institution: "ISIP 資訊安全人才培育計畫",
      grade: "Completed",
      status: "completed" as const,
      certificates: ["/certificates/web-security-cert.png"],
    },
  ] as Course[],
};

// Social Links
export const socialLinks = {
  github: "https://github.com/SiriusW823",
  instagram: "https://www.instagram.com/s1rius_w",
  twitter: "https://x.com/wxngyn1",
  email: "your.email@example.com",
};

// Site Configuration
export const siteConfig = {
  name: portfolioData.hero.name,
  title: portfolioData.hero.title,
  tagline: portfolioData.hero.tagline,
  email: socialLinks.email,
  location: "Taiwan",
  social: socialLinks,
};

// Legacy exports for backward compatibility
export const intro = {
  headline: ["BUILDING", "DIGITAL", "EXCELLENCE"],
  description: portfolioData.about.bio,
  stats: [
    { value: String(portfolioData.certificates.length), label: "Certifications" },
    { value: String(portfolioData.projects.length), label: "Projects" },
    { value: String(portfolioData.competitions.length), label: "Competitions" },
  ],
};

export const skills = portfolioData.about.skills;
export const projects = portfolioData.projects.map((p) => ({
  id: p.id,
  title: p.title,
  description: p.description,
  technologies: p.techStack,
  link: p.link,
  year: "2024",
}));

export const awards = portfolioData.certificates.map((c) => ({
  id: c.id,
  title: c.name,
  organization: c.issuer,
  year: c.date.split("-")[0],
  description: `Credential ID: ${c.credentialId || "N/A"}`,
}));

export const courses = portfolioData.courses.map((c) => ({
  id: c.id,
  title: c.name,
  instructor: c.institution,
  year: "2024",
  description: `Grade: ${c.grade}`,
  skills: [] as string[],
}));

export const competitions = portfolioData.competitions.map((c) => ({
  id: c.id,
  title: c.name,
  category: "Competition",
  year: c.year,
  result: c.award,
  description: c.description,
}));

export const activities = [
  { id: 1, title: "CTF Competitor", description: "Active participant in cybersecurity CTF competitions.", icon: "Trophy" },
  { id: 2, title: "Security Researcher", description: "Conducting research on cybersecurity topics.", icon: "Search" },
  { id: 3, title: "Open Source Contributor", description: "Contributing to open-source projects.", icon: "Code" },
  { id: 4, title: "Tech Enthusiast", description: "Continuously learning new technologies.", icon: "Zap" },
];

