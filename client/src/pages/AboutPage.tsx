import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { portfolioData } from '@/data/portfolioData';
import { useLanguage } from '@/context/LanguageContext';
import LanguageToggle from '@/components/LanguageToggle';
import { ArrowLeft, UserRound } from 'lucide-react';

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#050505]/90 backdrop-blur-sm border-b border-gray-800/50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/">
            <a className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-mono text-sm">{t.nav.backToHome}</span>
            </a>
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/"><a className="text-gray-500 hover:text-cyan-400 transition-colors text-sm font-mono">{t.nav.home}</a></Link>
            <Link href="/archives"><a className="text-gray-500 hover:text-purple-400 transition-colors text-sm font-mono">{t.nav.archives}</a></Link>
            <LanguageToggle />
          </nav>
        </div>
      </header>

      <main className="pt-24 pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="flex items-center gap-4 mb-10">
            <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/30">
              <UserRound className="w-8 h-8 text-purple-400" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">{t.nav.about}</h1>
          </motion.div>

          <div className="p-8 rounded-2xl bg-gray-900/50 border border-gray-800/50">
            <p className="text-gray-300 leading-relaxed text-lg whitespace-pre-line">{t.about.bio}</p>
            <div className="flex flex-wrap gap-3 mt-8">
              {portfolioData.about.skills.map((skill) => (
                <span key={skill} className="px-4 py-2 rounded-lg bg-gray-800/60 border border-gray-700/50 text-gray-300 text-sm font-mono">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
