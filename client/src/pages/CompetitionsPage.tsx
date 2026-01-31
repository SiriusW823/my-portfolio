import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { portfolioData } from '@/data/portfolioData';
import { useLanguage } from '@/context/LanguageContext';
import LanguageToggle from '@/components/LanguageToggle';
import { ArrowLeft, Trophy } from 'lucide-react';

export default function CompetitionsPage() {
  const { language, t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-sm border-b border-gray-800/50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/">
            <a className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-mono text-sm">{t.nav.backToHome}</span>
            </a>
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/projects"><a className="text-gray-500 hover:text-cyan-400 transition-colors text-sm font-mono">{t.nav.projects}</a></Link>
            <Link href="/certificates"><a className="text-gray-500 hover:text-purple-400 transition-colors text-sm font-mono">{t.nav.certificates}</a></Link>
            <Link href="/courses"><a className="text-gray-500 hover:text-green-400 transition-colors text-sm font-mono">{t.nav.courses}</a></Link>
            <LanguageToggle />
          </nav>
        </div>
      </header>

      {/* Content */}
      <main className="pt-24 pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Page Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-12"
          >
            <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/30">
              <Trophy className="w-8 h-8 text-yellow-400" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">{t.sections.competitions}</h1>
              <p className="text-gray-500 font-mono text-sm mt-1">// {portfolioData.competitions.length} entries</p>
            </div>
          </motion.div>

          {/* Competitions List */}
          <div className="space-y-6">
            {portfolioData.competitions.map((comp, index) => (
              <motion.div
                key={comp.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.1, duration: 0.5 }}
                className="group p-6 rounded-xl bg-gray-900/50 border border-gray-800/50 hover:border-yellow-500/30 transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-white group-hover:text-yellow-300 transition-colors">
                        {comp.name}
                      </h3>
                      <span className={`px-2 py-1 text-xs font-mono rounded ${
                        comp.award[language || 'en'].includes('First') || comp.award[language || 'en'].includes('Gold') || comp.award[language || 'en'].includes('第一') || comp.award[language || 'en'].includes('金')
                          ? 'bg-yellow-500/20 text-yellow-300'
                          : comp.award[language || 'en'].includes('Second') || comp.award[language || 'en'].includes('Silver') || comp.award[language || 'en'].includes('第二') || comp.award[language || 'en'].includes('銀')
                          ? 'bg-gray-400/20 text-gray-300'
                          : 'bg-amber-700/20 text-amber-400'
                      }`}>
                        {comp.award[language || 'en']}
                      </span>
                    </div>
                    <p className="text-gray-500 text-sm font-mono">{comp.year}</p>
                    {comp.description && (
                      <p className="text-gray-400 text-sm mt-2">{comp.description[language || 'en']}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
