import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { translations, Language, TranslationKeys } from "@/data/locales";

interface LanguageContextType {
  language: Language | null;
  setLanguage: (lang: Language) => void;
  t: TranslationKeys;
  isLoaded: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Check localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("portfolio-language") as Language | null;
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "zh")) {
      setLanguageState(savedLanguage);
    }
    setIsLoaded(true);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("portfolio-language", lang);
  };

  // Default to English translations if no language selected
  const t = translations[language || "en"];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isLoaded }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

export default LanguageContext;
