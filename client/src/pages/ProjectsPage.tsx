import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { portfolioData } from '@/data/portfolioData';
import { useLanguage } from '@/context/LanguageContext';
import LanguageToggle from '@/components/LanguageToggle';
import { ArrowLeft, ExternalLink, FolderKanban } from 'lucide-react';

export default function ProjectsPage() {
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
            <Link href="/competitions"><a className="text-gray-500 hover:text-yellow-400 transition-colors text-sm font-mono">{t.nav.competitions}</a></Link>
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
            <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/30">
              <FolderKanban className="w-8 h-8 text-cyan-400" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">{t.sections.projects}</h1>
              <p className="text-gray-500 font-mono text-sm mt-1">// {portfolioData.projects.length} entries</p>
            </div>
          </motion.div>

          {/* Projects List */}
          <div className="space-y-6">
            {portfolioData.projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.1, duration: 0.5 }}
                className="group p-6 rounded-xl bg-gray-900/50 border border-gray-800/50 hover:border-cyan-500/30 transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {project.title}
                      </h3>
                      {project.link !== '#' && (
                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-cyan-400 transition-colors">
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                    <p className="text-gray-400 text-sm mb-3">{project.description[language || 'en']}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <span key={tech} className="px-2 py-1 text-xs font-mono bg-gray-800/60 text-gray-400 rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
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
