import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { useLanguage } from '@/context/LanguageContext';
import LanguageToggle from '@/components/LanguageToggle';
import { ArrowLeft, UserRound } from 'lucide-react';

const sections = [
  {
    title: '競賽',
    items: [
      '2026 THJCC CTF Rank — 16/80(Student)',
      '2026 11401FhCTF Rank — 19/54(Student)',
      '2025 THJCC CTF Rank — 44/??(Student)',
      '2025 台灣盃火箭競賽 — 堅定不移獎(中學組)',
      '2025 全國高級中等學校校論文寫作比賽 Rank — 甲等(一年級)',
    ],
  },
  {
    title: '證照檢定',
    items: [
      'ITS Python',
      'Arduino Certification',
      'APCS4/2',
      '初級火箭發射執照',
      'SEE THINK WONDER CERTIFICATE — Gold Level',
    ],
  },
  {
    title: '課程參與',
    items: [
      'SecurityFocus Online',
      '2025 AIS3 Junior',
      '火箭設計實作教學培訓課程',
      '2024 AI姿態辨識實作4日營',
      '2024高中海狸一日營',
    ],
  },
];

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
            <Link href="/archives"><a className="text-gray-500 hover:text-yellow-400 transition-colors text-sm font-mono">{t.nav.archives}</a></Link>
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

          <div className="p-8 rounded-2xl bg-gray-900/50 border border-gray-800/50 space-y-8">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="text-xl font-semibold text-purple-300 mb-3"> {section.title}</h2>
                <div className="space-y-2">
                  {section.items.map((item) => (
                    <p key={item} className="text-gray-300 leading-relaxed">
                      {item}
                    </p>
                  ))}
                </div>
              </section>
            ))}
            </div>
        </div>
      </main>
    </div>
  );
}
