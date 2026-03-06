// ============================================
// LOCALIZATION DATA - Bilingual Support
// Traditional Chinese & English
// ============================================

export const translations = {
  en: {
    nav: {
      home: "HOME",
      archives: "ARCHIVES",
      about: "ABOUT",
      projects: "PROJECTS",
      competitions: "COMPETITIONS",
      certificates: "CERTIFICATES",
      courses: "COURSES",
      backToHome: "Back to Home",
    },
    hero: {
      title: "SIRIUS",
      subtitle: "一位來自台灣的資訊愛好者",
      tagline: "I DON'T BELIEVE IN TALENT, I'M HERE BECAUSE I WORK HARD FOR IT",
      cta: "SCROLL TO EXPLORE",
    },
    about: {
      title: "ABOUT ME",
      bio: "Hi, I’m SIRIUS, a student passionate about technology and quantum computing.",
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
      home: "HOME",
      archives: "ARCHIVES",
      about: "ABOUT",
      projects: "專案作品",
      competitions: "競賽經歷",
      certificates: "專業證照",
      courses: "修課紀錄",
      backToHome: "返回首頁",
    },
    hero: {
      title: "SIRIUS",
      subtitle: "一位來自台灣的資訊愛好者",
      tagline: "I DON'T BELIEVE IN TALENT, I'M HERE BECAUSE I WORK HARD FOR IT",
      cta: "滾動查看更多",
    },
    about: {
      title: "關於我",
      bio: "Hi, I’m SIRIUS, a student passionate about technology and quantum computing.",
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
