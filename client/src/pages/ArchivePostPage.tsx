import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { Streamdown } from 'streamdown';
import { ArrowLeft, FileText } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import LanguageToggle from '@/components/LanguageToggle';

const hackmdDownloadUrl = 'https://hackmd.io/@SIRIUSW/SyJAr3XS-e/download';

const post = {
  title: 'FhCTF write up',
  date: '2026-01-18',
  hackmdUrl: 'https://hackmd.io/@SIRIUSW/SyJAr3XS-e',
  markdownUrls: [
    hackmdDownloadUrl,
    `https://cors.isomorphic-git.org/${hackmdDownloadUrl}`,
    `https://corsproxy.io/?${encodeURIComponent(hackmdDownloadUrl)}`,
    `https://api.allorigins.win/raw?url=${encodeURIComponent(hackmdDownloadUrl)}`,
    `https://r.jina.ai/http://${hackmdDownloadUrl.replace(/^https?:\/\//, '')}`,
  ],
};

export default function ArchivePostPage() {
  const { t } = useLanguage();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    const fetchHackMdContent = async () => {
      try {
        let markdownText = '';
        let lastError = 'No markdown sources available';
        let hasMarkdownContent = false;

        if (post.markdownUrls.length === 0) {
          throw new Error(lastError);
        }

        for (const markdownUrl of post.markdownUrls) {
          try {
            const response = await fetch(markdownUrl, { signal: controller.signal });
            if (!response.ok) {
              lastError = `Request failed with status ${response.status}`;
              continue;
            }

            markdownText = await response.text();
            hasMarkdownContent = Boolean(markdownText.trim());
            if (hasMarkdownContent) {
              break;
            }

            lastError = 'Received empty markdown content';
          } catch (err) {
            if (controller.signal.aborted) {
              throw err;
            }
            lastError = err instanceof Error ? err.message : 'Request failed';
          }
        }

        if (!hasMarkdownContent) {
          throw new Error(`Failed to fetch content from all available sources: ${lastError}`);
        }

        setContent(markdownText);
      } catch (err) {
        if (!controller.signal.aborted) {
          setError(err instanceof Error ? err.message : 'Unable to load write up');
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchHackMdContent();

    return () => controller.abort();
  }, []);

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

          <section className="p-6 md:p-8 rounded-xl bg-gray-900/50 border border-gray-800/50 overflow-x-auto">
            {loading ? (
              <p className="text-gray-400 font-mono text-sm">Loading HackMD content...</p>
            ) : error ? (
              <div className="space-y-3">
                <p className="text-red-300 font-mono text-sm">Failed to load HackMD content: {error}</p>
                <a
                  href={post.hackmdUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-cyan-300 hover:text-cyan-200 underline decoration-cyan-500/50"
                >
                  Open this write-up on HackMD
                </a>
              </div>
            ) : (
              <Streamdown>{content}</Streamdown>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
