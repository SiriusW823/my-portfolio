import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { portfolioData, socialLinks } from '@/data/portfolioData';
import { 
  ChevronDown, 
  ExternalLink, 
  Award, 
  BookOpen, 
  Trophy, 
  FolderKanban,
  Github,
  Instagram,
  Twitter,
  Mail,
  MapPin
} from 'lucide-react';

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
  return (
    <motion.button
      onClick={onClick}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-cyan-400/70 hover:text-cyan-400 transition-colors cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.8 }}
    >
      <span className="text-xs font-mono uppercase tracking-widest">Scroll for Intro</span>
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
              {portfolioData.hero.name}
            </span>
          </h1>
          
          {/* Title */}
          <motion.p
            className="text-xl md:text-2xl text-gray-400 font-light mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {portfolioData.hero.title}
          </motion.p>
          
          {/* Tagline */}
          <motion.p
            className="text-sm md:text-base text-gray-500 max-w-2xl mx-auto font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            {portfolioData.hero.tagline}
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
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">About Me</h2>
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
                {portfolioData.about.bio}
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
// NAVIGATION HUB SECTION
// ============================================
interface HubCardProps {
  title: string;
  icon: React.ReactNode;
  count: number;
  onClick: () => void;
  color: string;
  delay: number;
}

function HubCard({ title, icon, count, onClick, color, delay }: HubCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      className={`group relative p-8 rounded-2xl border-2 bg-gray-900/50 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] ${color}`}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.6 }}
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
    >
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
    </motion.button>
  );
}

function NavigationHub({ onNavigate }: { onNavigate: (id: string) => void }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const hubItems = [
    { id: 'projects', title: 'Projects', icon: <FolderKanban className="w-8 h-8 text-cyan-400" />, count: portfolioData.projects.length, color: 'border-cyan-500/30 hover:border-cyan-400' },
    { id: 'competitions', title: 'Competitions', icon: <Trophy className="w-8 h-8 text-yellow-400" />, count: portfolioData.competitions.length, color: 'border-yellow-500/30 hover:border-yellow-400' },
    { id: 'certificates', title: 'Certificates', icon: <Award className="w-8 h-8 text-purple-400" />, count: portfolioData.certificates.length, color: 'border-purple-500/30 hover:border-purple-400' },
    { id: 'courses', title: 'Courses', icon: <BookOpen className="w-8 h-8 text-green-400" />, count: portfolioData.courses.length, color: 'border-green-500/30 hover:border-green-400' },
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
              key={item.id}
              {...item}
              onClick={() => onNavigate(item.id)}
              delay={0.2 + index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// CONTENT LIST SECTION COMPONENT
// ============================================
interface ContentListProps<T> {
  id: string;
  title: string;
  icon: React.ReactNode;
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
}

function ContentListSection<T extends { id: number }>({ id, title, icon, items, renderItem }: ContentListProps<T>) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} id={id} className="py-20 px-6 bg-[#0a0a0a] border-t border-gray-800/50">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-10"
        >
          <div className="p-3 rounded-xl bg-gray-800/50">
            {icon}
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">{title}</h2>
            <p className="text-gray-500 font-mono text-xs mt-1">// {items.length} entries</p>
          </div>
        </motion.div>

        <ul className="space-y-4">
          {items.map((item, index) => (
            <motion.li
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + index * 0.1, duration: 0.5 }}
            >
              {renderItem(item, index)}
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ============================================
// ITEM CARD COMPONENTS
// ============================================
function ProjectItem({ project }: { project: typeof portfolioData.projects[0] }) {
  return (
    <div className="group p-6 rounded-xl bg-gray-900/50 border border-gray-800/50 hover:border-cyan-500/30 transition-all">
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
          <p className="text-gray-400 text-sm mb-3">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span key={tech} className="px-2 py-1 text-xs font-mono bg-gray-800/60 text-gray-400 rounded">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function CompetitionItem({ competition }: { competition: typeof portfolioData.competitions[0] }) {
  return (
    <div className="group p-6 rounded-xl bg-gray-900/50 border border-gray-800/50 hover:border-yellow-500/30 transition-all">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-lg font-bold text-white group-hover:text-yellow-300 transition-colors">
              {competition.name}
            </h3>
            <span className="px-2 py-1 text-xs font-mono bg-yellow-900/30 text-yellow-400 rounded border border-yellow-500/30">
              {competition.award}
            </span>
          </div>
          <p className="text-gray-400 text-sm">{competition.description}</p>
        </div>
        <span className="text-gray-500 font-mono text-sm shrink-0">{competition.year}</span>
      </div>
    </div>
  );
}

function CertificateItem({ certificate }: { certificate: typeof portfolioData.certificates[0] }) {
  return (
    <div className="group p-6 rounded-xl bg-gray-900/50 border border-gray-800/50 hover:border-purple-500/30 transition-all">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
            {certificate.name}
          </h3>
          <p className="text-gray-400 text-sm">{certificate.issuer}</p>
        </div>
        <div className="flex items-center gap-4 text-gray-500 font-mono text-xs">
          <span>{certificate.date}</span>
          {certificate.credentialId && (
            <span className="text-gray-600">ID: {certificate.credentialId}</span>
          )}
        </div>
      </div>
    </div>
  );
}

function CourseItem({ course }: { course: typeof portfolioData.courses[0] }) {
  return (
    <div className="group p-6 rounded-xl bg-gray-900/50 border border-gray-800/50 hover:border-green-500/30 transition-all">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h3 className="text-lg font-bold text-white group-hover:text-green-300 transition-colors">
              {course.name}
            </h3>
            <span className={`px-2 py-0.5 text-xs font-mono rounded ${
              course.status === 'completed' 
                ? 'bg-green-900/30 text-green-400 border border-green-500/30'
                : 'bg-blue-900/30 text-blue-400 border border-blue-500/30'
            }`}>
              {course.status === 'completed' ? 'Completed' : 'In Progress'}
            </span>
          </div>
          <p className="text-gray-400 text-sm">{course.institution}</p>
        </div>
        <span className="text-gray-400 font-mono text-sm">Grade: {course.grade}</span>
      </div>
    </div>
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
            <a href={`mailto:${socialLinks.email}`}
               className="p-3 rounded-lg bg-gray-800/50 text-gray-400 hover:text-green-400 hover:bg-gray-700/50 transition-all">
              <Mail className="w-5 h-5" />
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

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
      {/* Section 1: Hero (Full Height) */}
      <HeroSection onScrollClick={scrollToAbout} />

      {/* Section 2: About (Bento Grid) */}
      <div ref={aboutRef}>
        <AboutSection />
      </div>

      {/* Section 3: Navigation Hub */}
      <NavigationHub onNavigate={scrollToSection} />

      {/* Section 4: Detailed Content Lists */}
      <ContentListSection
        id="projects"
        title="Projects"
        icon={<FolderKanban className="w-6 h-6 text-cyan-400" />}
        items={portfolioData.projects}
        renderItem={(project) => <ProjectItem project={project} />}
      />

      <ContentListSection
        id="competitions"
        title="Competitions"
        icon={<Trophy className="w-6 h-6 text-yellow-400" />}
        items={portfolioData.competitions}
        renderItem={(competition) => <CompetitionItem competition={competition} />}
      />

      <ContentListSection
        id="certificates"
        title="Certificates"
        icon={<Award className="w-6 h-6 text-purple-400" />}
        items={portfolioData.certificates}
        renderItem={(certificate) => <CertificateItem certificate={certificate} />}
      />

      <ContentListSection
        id="courses"
        title="Courses"
        icon={<BookOpen className="w-6 h-6 text-green-400" />}
        items={portfolioData.courses}
        renderItem={(course) => <CourseItem course={course} />}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
