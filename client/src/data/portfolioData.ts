// ============================================
// PORTFOLIO DATA - Student Portfolio
// Clean, content-focused structure for academic achievements
// ============================================

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
  description: string;
  techStack: string[];
  link: string;
}

export interface Competition {
  id: number;
  name: string;
  award: string;
  year: string;
  description: string;
}

export interface Certificate {
  id: number;
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
}

export interface Course {
  id: number;
  name: string;
  institution: string;
  grade: string;
  status: "completed" | "in-progress";
}

// ============================================
// MAIN PORTFOLIO DATA EXPORT
// ============================================

export const portfolioData = {
  hero: {
    name: "Your Name",
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
      title: "QRL Molecule Generator",
      description: "Quantum Reinforcement Learning system for generating molecular structures using variational quantum circuits.",
      techStack: ["Python", "PennyLane", "PyTorch", "Quantum Computing"],
      link: "https://github.com/SiriusW823/QMG",
    },
    {
      id: 2,
      title: "Personal Portfolio",
      description: "Modern portfolio website with smooth animations, dark theme, and responsive design.",
      techStack: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
      link: "https://github.com/SiriusW823/my-portfolio",
    },
    {
      id: 3,
      title: "CTF Writeup Platform",
      description: "Technical blog documenting CTF challenge solutions and security research findings.",
      techStack: ["Next.js", "MDX", "Markdown", "Web Development"],
      link: "#",
    },
    {
      id: 4,
      title: "Vulnerability Scanner",
      description: "Automated tool for detecting common web application security vulnerabilities.",
      techStack: ["Python", "Web Security", "Automation", "REST API"],
      link: "#",
    },
  ] as Project[],

  competitions: [
    {
      id: 1,
      name: "AlpacaHack Round 6",
      award: "Top Performer - PWN Category",
      year: "2025",
      description: "Solved advanced binary exploitation challenges including heap overflow, UAF, and format string vulnerabilities.",
    },
    {
      id: 2,
      name: "Science Fair - Quantum Computing",
      award: "Excellence Award",
      year: "2025",
      description: "Research project on Quantum Reinforcement Learning for molecular generation and drug discovery applications.",
    },
    {
      id: 3,
      name: "HackTheBox Challenges",
      award: "Active Participant",
      year: "2024",
      description: "Regular participation in CTF-style machine challenges, focusing on penetration testing and exploitation.",
    },
    {
      id: 4,
      name: "NCKUCTF Competition",
      award: "Finalist",
      year: "2024",
      description: "National-level cybersecurity competition covering web security, cryptography, and binary exploitation.",
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
      name: "Windows Binary Exploitation Advanced",
      institution: "AngelBoy Security Academy",
      grade: "A+",
      status: "completed" as const,
    },
    {
      id: 2,
      name: "Quantum Computing Fundamentals",
      institution: "IBM Qiskit Learning",
      grade: "Excellent",
      status: "completed" as const,
    },
    {
      id: 3,
      name: "Machine Learning Specialization",
      institution: "Stanford Online / Coursera",
      grade: "In Progress",
      status: "in-progress" as const,
    },
    {
      id: 4,
      name: "Advanced Penetration Testing",
      institution: "Offensive Security",
      grade: "A",
      status: "completed" as const,
    },
    {
      id: 5,
      name: "Reverse Engineering Malware",
      institution: "SANS Institute",
      grade: "A-",
      status: "completed" as const,
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
