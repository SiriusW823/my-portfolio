import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'wouter';
import { portfolioData, socialLinks } from '@/data/portfolioData';
import { useLanguage } from '@/context/LanguageContext';
import LanguageToggle from '@/components/LanguageToggle';
import {
  ChevronDown,
  Award,
  BookOpen,
  Trophy,
  FolderKanban,
  Github,
  Instagram,
  Twitter,
  MapPin,
  Menu,
  X
} from 'lucide-react';

// ============================================
// TOP NAVIGATION BAR
// ============================================
function TopNavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '/projects', label: t.nav.projects, color: 'hover:text-cyan-400' },
    { href: '/competitions', label: t.nav.competitions, color: 'hover:text-yellow-400' },
    { href: '/certificates', label: t.nav.certificates, color: 'hover:text-purple-400' },
    { href: '/courses', label: t.nav.courses, color: 'hover:text-green-400' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-[#0a0a0a]/95 backdrop-blur-md border-b border-gray-800/50' : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo / Name */}
          <Link href="/">
            <a className="text-xl font-bold text-white hover:text-cyan-400 transition-colors font-mono">
              {portfolioData.hero.name.split(' ')[0]}
            </a>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <a className={`text-sm font-mono text-gray-400 ${item.color} transition-colors`}>
                  {item.label}
                </a>
              </Link>
            ))}
            {/* Language Toggle */}
            <LanguageToggle />
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <LanguageToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden mt-4 pb-4 border-t border-gray-800/50 pt-4"
          >
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <a 
                    className={`text-sm font-mono text-gray-400 ${item.color} transition-colors`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </div>
    </header>
  );
}

// ============================================
// ANIMATED BACKGROUND COMPONENT (Pure CSS + Framer Motion)
// ============================================
function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Grid Pattern */}
      <div className="absolute inset-0" style={{
        backgroundImage: `
          linear-gradient(rgba(0, 240, 255, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 240, 255, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }} />

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />
      <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-radial from-cyan-500/5 to-transparent" />
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-purple-500/5 to-transparent" />
    </div>
  );
}

// ============================================
// SCROLL INDICATOR COMPONENT
// ============================================
function ScrollIndicator({ onClick }: { onClick: () => void }) {
  const { t } = useLanguage();
  return (
    <motion.button
      onClick={onClick}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-cyan-400/70 hover:text-cyan-400 transition-colors cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.8 }}
    >
      <span className="text-xs font-mono uppercase tracking-widest">{t.hero.cta}</span>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ChevronDown className="w-6 h-6" />
      </motion.div>
    </motion.button>
  );
}

// ============================================
// HERO SECTION (Full Height)
// ============================================
function HeroSection({ onScrollClick }: { onScrollClick: () => void }) {
  const { t } = useLanguage();
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[#0a0a0a]">
      <AnimatedBackground />

      <div className="relative z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Name */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-4">
            <span className="bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent">
              {t.hero.title}
            </span>
          </h1>

          {/* Title */}
          <motion.p
            className="text-xl md:text-2xl text-gray-400 font-light mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {t.hero.subtitle}
          </motion.p>

          {/* Tagline */}
          <motion.p
            className="text-sm md:text-base text-gray-500 max-w-2xl mx-auto font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            {t.hero.tagline}
          </motion.p>
        </motion.div>
      </div>

      <ScrollIndicator onClick={onScrollClick} />
    </section>
  );
}

// ============================================
// ABOUT SECTION (Bento Grid Style)
// ============================================
function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { t } = useLanguage();

  return (
    <section ref={ref} className="min-h-[80vh] py-24 px-6 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Section Header */}
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">{t.about.title}</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-cyan-400 to-purple-500" />
          </div>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Bio Block - Takes 2 columns */}
            <motion.div
              className="md:col-span-2 p-8 rounded-2xl bg-gradient-to-br from-gray-900/80 to-gray-900/40 border border-gray-800/50 backdrop-blur-sm"
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <h3 className="text-lg font-semibold text-cyan-400 mb-4 font-mono">// Introduction</h3>
              <p className="text-gray-300 leading-relaxed text-lg whitespace-pre-line">
                {t.about.bio}
              </p>
            </motion.div>

            {/* Stats Block */}
            <motion.div
              className="p-8 rounded-2xl bg-gradient-to-br from-cyan-950/30 to-gray-900/40 border border-cyan-900/30"
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <h3 className="text-lg font-semibold text-cyan-400 mb-6 font-mono">// Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-gray-800 pb-3">
                  <span className="text-gray-400">Projects</span>
                  <span className="text-2xl font-bold text-white">{portfolioData.projects.length}</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-800 pb-3">
                  <span className="text-gray-400">Competitions</span>
                  <span className="text-2xl font-bold text-white">{portfolioData.competitions.length}</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-800 pb-3">
                  <span className="text-gray-400">Certificates</span>
                  <span className="text-2xl font-bold text-white">{portfolioData.certificates.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Courses</span>
                  <span className="text-2xl font-bold text-white">{portfolioData.courses.length}</span>
                </div>
              </div>
            </motion.div>

            {/* Skills Block - Full Width */}
            <motion.div
              className="md:col-span-3 p-8 rounded-2xl bg-gradient-to-br from-gray-900/60 to-gray-900/30 border border-gray-800/50"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <h3 className="text-lg font-semibold text-cyan-400 mb-6 font-mono">// Technical Skills</h3>
              <div className="flex flex-wrap gap-3">
                {portfolioData.about.skills.map((skill, index) => (
                  <motion.span
                    key={skill}
                    className="px-4 py-2 rounded-lg bg-gray-800/60 border border-gray-700/50 text-gray-300 text-sm font-mono hover:border-cyan-500/50 hover:text-cyan-300 transition-colors"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.7 + index * 0.05, duration: 0.3 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================
// NAVIGATION HUB SECTION (Links to separate pages)
// ============================================
interface HubCardProps {
  title: string;
  icon: React.ReactNode;
  count: number;
  href: string;
  color: string;
  delay: number;
}

function HubCard({ title, icon, count, href, color, delay }: HubCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.6 }}
    >
      <Link href={href}>
        <a className={`group relative block p-8 rounded-2xl border-2 bg-gray-900/50 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] ${color}`}>
          <div className="flex flex-col items-center text-center gap-4">
            <div className="p-4 rounded-xl bg-gray-800/50 group-hover:bg-gray-800 transition-colors">
              {icon}
            </div>
            <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
              {title}
            </h3>
            <span className="text-3xl font-black text-gray-600 group-hover:text-cyan-500 transition-colors">
              {count}
            </span>
          </div>
          {/* Glow Effect */}
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-gradient-to-t from-cyan-500/10 to-transparent" />
        </a>
      </Link>
    </motion.div>
  );
}

function NavigationHub() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { t } = useLanguage();

  const hubItems = [
    { href: '/projects', title: t.nav.projects, icon: <FolderKanban className="w-8 h-8 text-cyan-400" />, count: portfolioData.projects.length, color: 'border-cyan-500/30 hover:border-cyan-400' },
    { href: '/competitions', title: t.nav.competitions, icon: <Trophy className="w-8 h-8 text-yellow-400" />, count: portfolioData.competitions.length, color: 'border-yellow-500/30 hover:border-yellow-400' },
    { href: '/certificates', title: t.nav.certificates, icon: <Award className="w-8 h-8 text-purple-400" />, count: portfolioData.certificates.length, color: 'border-purple-500/30 hover:border-purple-400' },
    { href: '/courses', title: t.nav.courses, icon: <BookOpen className="w-8 h-8 text-green-400" />, count: portfolioData.courses.length, color: 'border-green-500/30 hover:border-green-400' },
  ];

  return (
    <section ref={ref} className="py-24 px-6 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Explore My Work</h2>
          <p className="text-gray-500 font-mono text-sm">Click to navigate to each section</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {hubItems.map((item, index) => (
            <HubCard
              key={item.href}
              {...item}
              delay={0.2 + index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// FOOTER SECTION
// ============================================
function Footer() {
  return (
    <footer className="py-16 px-6 bg-[#050505] border-t border-gray-800/50">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-2">{portfolioData.hero.name}</h3>
            <p className="text-gray-500 text-sm flex items-center gap-2">
              <MapPin className="w-4 h-4" /> Taiwan
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a href={socialLinks.github} target="_blank" rel="noopener noreferrer"
               className="p-3 rounded-lg bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700/50 transition-all">
              <Github className="w-5 h-5" />
            </a>
            <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer"
               className="p-3 rounded-lg bg-gray-800/50 text-gray-400 hover:text-pink-400 hover:bg-gray-700/50 transition-all">
              <Instagram className="w-5 h-5" />
            </a>
            <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer"
               className="p-3 rounded-lg bg-gray-800/50 text-gray-400 hover:text-cyan-400 hover:bg-gray-700/50 transition-all">
              <Twitter className="w-5 h-5" />
            </a>

          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800/50 text-center">
          <p className="text-gray-600 text-sm font-mono">
            © {new Date().getFullYear()} {portfolioData.hero.name}. Built with React & Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
}

// ============================================
// MAIN HOME PAGE COMPONENT
// ============================================
export default function Home() {
  const aboutRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToAbout = () => {
    aboutRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
      {/* Top Navigation Bar */}
      <TopNavBar />

      {/* Section 1: Hero (Full Height) */}
      <HeroSection onScrollClick={scrollToAbout} />

      {/* Section 2: About (Bento Grid) */}
      <div ref={aboutRef}>
        <AboutSection />
      </div>

      {/* Section 3: Navigation Hub (Links to separate pages) */}
      <NavigationHub />

      {/* Footer */}
      <Footer />
    </div>
  );
}

