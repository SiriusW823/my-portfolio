import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { useLanguage } from '@/context/LanguageContext';
import LanguageToggle from '@/components/LanguageToggle';
import { ArrowLeft, UserRound } from 'lucide-react';

const sections = [
  {
    title: 'About',
    items: ['學了一年資安還是很菜的的資安小白'],
  },
  {
    title: '競賽',
    items: [
      '2024 No Hack No CTF Rank — 89/287 (Overall), 21/61 (Student)',
      '2025 picoCTF — 226/10460',
      '第 55 屆全國技能競賽中區分區賽網路安全 — 參賽者',
      '2025 THJCC — Rank: 26/133 (Overall), 18/68 (Student)',
      '2025 MyfirstCTF — Rank 7/83',
      '2025 AIS3 pre-exam — Rank 73/344',
      '2025 No Hack No CTF — Rank 16/???',
      '2025 SCIST final — Rank 12/31',
      '2025 Cyber Defense Exercise 初賽 — Rank 3',
      '2025 Cyber Defense Exercise 決賽 — Rank 1',
      '2026 AIS3 EOF QUAL — Rank 4',
    ],
  },
  {
    title: '社群經歷',
    items: [
      '2025 台中高工資訊科資安講師',
      '2025 Hitcon cyber range 社群擺攤 ZeroCookie',
      '2025 一日資訊體驗營 台中場助教',
      '2026 ZeroCookie 課程組 成員',
    ],
  },
  {
    title: '戰隊',
    items: ['ICEDTEA 成員'],
  },
  {
    title: 'CTF 出題',
    items: ['2025 CRHC CTF', '2025 TCIVS CTF', '2026 THJCC CTF'],
  },
  {
    title: '證照',
    items: ['iPAS 資訊安全工程師 初級', 'iPAS 資訊安全工程師 中級', 'Cisco CCST cybersecurity', '電腦硬體裝修 丙級'],
  },
  {
    title: '課程參與',
    items: ['SecurityFocusOnline', '2025 AIS3 第十屆AIS3好厲駭學員', 'AIOT永續產業鏈發展基地推動計畫 基礎課程'],
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
