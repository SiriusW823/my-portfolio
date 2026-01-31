import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { Globe } from "lucide-react";

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "zh" : "en");
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-white/30 transition-all duration-300 font-mono text-sm"
      title="Switch Language / 切換語言"
    >
      <Globe className="w-4 h-4 text-gray-400" />
      <span className="text-gray-300">
        {language === "en" ? "中" : "EN"}
      </span>
    </motion.button>
  );
}
