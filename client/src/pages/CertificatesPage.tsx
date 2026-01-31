import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { portfolioData } from '@/data/portfolioData';
import { useLanguage } from '@/context/LanguageContext';
import LanguageToggle from '@/components/LanguageToggle';
import { ArrowLeft, Award, ExternalLink } from 'lucide-react';

// Credly Badge Component
const CredlyBadge = ({ badgeId, title, imageUrl }: { badgeId: string; title: string; imageUrl: string }) => (
  <a
    href={`https://www.credly.com/badges/${badgeId}/public_url`}
    target="_blank"
    rel="noopener noreferrer"
    className="block group"
  >
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="p-6 rounded-xl bg-gray-900/50 border border-gray-800/50 hover:border-purple-500/50 transition-all"
    >
      <img src={imageUrl} alt={title} className="w-28 h-28 mx-auto mb-4 object-contain" />
      <p className="text-center text-white font-medium text-sm">{title}</p>
      <div className="flex items-center justify-center gap-2 mt-2 text-gray-500 text-xs">
        <span>View on Credly</span>
        <ExternalLink className="w-3 h-3" />
      </div>
    </motion.div>
  </a>
);

// Credly badges data
const credlyBadges = [
  {
    badgeId: "8e07ac98-950a-49ca-a746-4456545d1558",
    title: "IT Specialist - Python",
    imageUrl: "https://images.credly.com/size/340x340/images/3c4602d8-832e-4a24-b42d-00359ce746f7/ITS-Badges_Python_1200px.png",
  },
];

export default function CertificatesPage() {
  const { t } = useLanguage();

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
            <Link href="/competitions"><a className="text-gray-500 hover:text-yellow-400 transition-colors text-sm font-mono">{t.nav.competitions}</a></Link>
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
            <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/30">
              <Award className="w-8 h-8 text-purple-400" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">{t.sections.certificates}</h1>
              <p className="text-gray-500 font-mono text-sm mt-1">// {portfolioData.certificates.length} entries</p>
            </div>
          </motion.div>

          {/* Verified Credly Badges */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-12"
          >
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="text-purple-400">✓</span> Verified Badges
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {credlyBadges.map((badge) => (
                <CredlyBadge key={badge.badgeId} badgeId={badge.badgeId} title={badge.title} imageUrl={badge.imageUrl} />
              ))}
            </div>
          </motion.section>

          {/* Certificates List */}
          <div className="space-y-6">
            {portfolioData.certificates.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.1, duration: 0.5 }}
                className="group p-6 rounded-xl bg-gray-900/50 border border-gray-800/50 hover:border-purple-500/30 transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                        {cert.name}
                      </h3>
                      {cert.link && cert.link !== '#' && (
                        <a href={cert.link} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-purple-400 transition-colors">
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                    <p className="text-gray-400 text-sm">{cert.issuer}</p>
                    <p className="text-gray-500 text-sm font-mono mt-1">{cert.date}</p>
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
