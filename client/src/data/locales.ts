// ============================================
// LOCALIZATION DATA - Bilingual Support
// Traditional Chinese & English
// ============================================

export const translations = {
  en: {
    nav: {
      projects: "PROJECTS",
      competitions: "COMPETITIONS",
      certificates: "CERTIFICATES",
      courses: "COURSES",
      backToHome: "Back to Home",
    },
    hero: {
      title: "SIRIUS",
      subtitle: "FULL STACK CREATOR / SECURITY ENTHUSIAST",
      tagline: "EXPLORING THE DIGITAL FRONTIER.",
      cta: "SCROLL TO EXPLORE",
    },
    about: {
      title: "ABOUT ME",
      bio: "Currently a Computer Science student passionate about Web Development and Cybersecurity. I specialize in turning creative ideas into code and honing my skills through CTFs and Hackathons. Seeking internship opportunities to apply my knowledge to real-world projects.",
    },
    sections: {
      projects: "Projects",
      competitions: "Competitions",
      certificates: "Certificates",
      courses: "Courses",
      verifiedBadges: "Verified Badges",
      viewOnCredly: "View on Credly",
      openPdf: "Open PDF",
      certificate: "Certificate",
    },
    loading: {
      text: "INITIALIZING SYSTEM...",
      select: "SELECT LANGUAGE / 選擇語言",
      enter: "ENTER",
    },
    status: {
      completed: "Completed",
      inProgress: "In Progress",
    },
  },
  zh: {
    nav: {
      projects: "專案作品",
      competitions: "競賽經歷",
      certificates: "專業證照",
      courses: "修課紀錄",
      backToHome: "返回首頁",
    },
    hero: {
      title: "SIRIUS",
      subtitle: "全端開發者 / 資安愛好者",
      tagline: "探索數位疆界的無限可能。",
      cta: "滾動查看更多",
    },
    about: {
      title: "關於我",
      bio: "目前就讀於資訊工程學系，熱衷於網頁開發與資訊安全領域。擅長將創意轉化為程式碼，並在各類 CTF 競賽與黑客松中磨練技術。目前正在尋找實習機會，希望能將所學應用於真實專案。",
    },
    sections: {
      projects: "專案作品",
      competitions: "競賽經歷",
      certificates: "專業證照",
      courses: "修課紀錄",
      verifiedBadges: "認證徽章",
      viewOnCredly: "在 Credly 查看",
      openPdf: "開啟 PDF",
      certificate: "證書",
    },
    loading: {
      text: "系統初始化中...",
      select: "SELECT LANGUAGE / 選擇語言",
      enter: "進入",
    },
    status: {
      completed: "已完成",
      inProgress: "進行中",
    },
  },
};

export type Language = "en" | "zh";
export type Translations = typeof translations;
export type TranslationKeys = (typeof translations)[Language];
