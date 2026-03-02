import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { useLanguage } from '@/context/LanguageContext';
import LanguageToggle from '@/components/LanguageToggle';
import { ArrowLeft, Archive } from 'lucide-react';

const archiveByYear = [
  {
    year: '2026',
    posts: [
      { date: '01-18', title: 'HackMD', url: 'https://hackmd.io/74os89FeTbyFh-bZsb0x0Q', tags: ['Link'] },
    ],
  },
];

export default function ArchivesPage() {
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
                <p className="text-gray-500 font-mono text-sm mt-1">// posts timeline</p>
              </div>
            </motion.div>

          {archiveByYear.map((yearBlock) => (
            <section key={yearBlock.year}>
              <div className="flex items-end gap-3 mb-4">
                <h2 className="text-2xl font-semibold text-cyan-400">{yearBlock.year}</h2>
                <p className="text-sm text-gray-500 font-mono">{yearBlock.posts.length} posts</p>
              </div>
              <div className="space-y-3">
                {yearBlock.posts.map((post) => (
                  <div key={`${yearBlock.year}-${post.date}-${post.title}`} className="p-4 rounded-xl bg-gray-900/50 border border-gray-800/50">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-sm text-gray-500 font-mono">{post.date}</span>
                      {post.url ? (
                        <a
                          href={post.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-cyan-300 hover:text-cyan-200 transition-colors"
                        >
                          {post.title}
                        </a>
                      ) : (
                        <span className="font-semibold">{post.title}</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-400 mt-2">{post.tags.map((tag) => `#${tag}`).join(' ')}</p>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}
