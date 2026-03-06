import { motion } from 'framer-motion';
import { Link, useLocation } from 'wouter';
import { ArrowLeft, FileText } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import LanguageToggle from '@/components/LanguageToggle';
import fhctfWriteupHtml from '../../../FhCTF Writeup.html?raw';
import eisWriteupHtml from '../../../EIS 所有量的求法.html?raw';
import quantumTermsHtml from '../../../量子相關專有名詞說明.html?raw';

const posts = {
  '/archives/01-18': {
    title: 'FhCTF write up',
    date: '2026-01-18',
    html: fhctfWriteupHtml,
  },
  '/archives/2025-eis': {
    title: 'EIS 所有量的求法',
    date: '2025-01-01',
    html: eisWriteupHtml,
  },
  '/archives/2025-quantum-terms': {
    title: '量子相關專有名詞說明',
    date: '2025-01-01',
    html: quantumTermsHtml,
  },
};

export default function ArchivePostPage() {
  const { t } = useLanguage();
  const [location] = useLocation();
  const post = posts[location as keyof typeof posts] ?? posts['/archives/01-18'];

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#050505]/90 backdrop-blur-sm border-b border-gray-800/50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/archives">
            <a className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-mono text-sm">{t.nav.archives}</span>
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
        <div className="max-w-5xl mx-auto space-y-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="flex items-center gap-4">
            <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/30">
              <FileText className="w-8 h-8 text-cyan-400" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">{post.title}</h1>
              <p className="text-gray-500 font-mono text-sm mt-1">// {post.date}</p>
            </div>
          </motion.div>

          <section className="p-2 md:p-3 rounded-xl bg-gray-900/50 border border-gray-800/50">
            <iframe
              title={post.title}
              srcDoc={post.html}
              className="w-full h-[80vh] rounded-lg bg-white"
              sandbox="allow-same-origin allow-scripts"
            />
          </section>
        </div>
      </main>
    </div>
  );
}
