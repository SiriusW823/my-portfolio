import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { portfolioData } from '@/data/portfolioData';
import { useLanguage } from '@/context/LanguageContext';
import LanguageToggle from '@/components/LanguageToggle';
import { ArrowLeft, ExternalLink, Archive } from 'lucide-react';

export default function ArchivesPage() {
  const { language, t } = useLanguage();

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
            <Link href="/about"><a className="text-gray-500 hover:text-purple-400 transition-colors text-sm font-mono">{t.nav.about}</a></Link>
            <LanguageToggle />
          </nav>
        </div>
      </header>

      <main className="pt-24 pb-16 px-6">
        <div className="max-w-5xl mx-auto space-y-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="flex items-center gap-4">
            <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/30">
              <Archive className="w-8 h-8 text-cyan-400" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">{t.nav.archives}</h1>
              <p className="text-gray-500 font-mono text-sm mt-1">// projects, competitions, certificates, courses</p>
            </div>
          </motion.div>

          <section>
            <h2 className="text-xl font-semibold text-cyan-400 mb-4">Projects</h2>
            <div className="space-y-3">
              {portfolioData.projects.map((project) => (
                <div key={project.id} className="p-4 rounded-xl bg-gray-900/50 border border-gray-800/50">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{project.title}</span>
                    {project.link !== '#' && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-cyan-400 transition-colors">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                  <p className="text-sm text-gray-400 mt-1">{project.description[language || 'en']}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-yellow-400 mb-4">Competitions</h2>
            <div className="space-y-3">
              {portfolioData.competitions.map((comp) => (
                <div key={comp.id} className="p-4 rounded-xl bg-gray-900/50 border border-gray-800/50">
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-semibold">{comp.name}</span>
                    <span className="text-sm text-gray-500 font-mono">{comp.year}</span>
                  </div>
                  <p className="text-sm text-gray-400 mt-1">{comp.award[language || 'en']}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-purple-400 mb-4">Certificates</h2>
            <div className="space-y-3">
              {portfolioData.certificates.map((cert) => (
                <div key={cert.id} className="p-4 rounded-xl bg-gray-900/50 border border-gray-800/50">
                  <p className="font-semibold">{cert.name}</p>
                  <p className="text-sm text-gray-400">{cert.issuer} · {cert.date}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-green-400 mb-4">Courses</h2>
            <div className="space-y-3">
              {portfolioData.courses.map((course) => (
                <div key={course.id} className="p-4 rounded-xl bg-gray-900/50 border border-gray-800/50">
                  <p className="font-semibold">{course.name}</p>
                  <p className="text-sm text-gray-400">{course.institution}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
