import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

/**
 * Skills Section Component
 * Design: Animated skill tags with staggered reveal
 * Used for displaying technical skills
 */

interface SkillsSectionProps {
  skills: string[];
}

export default function SkillsSection({ skills }: SkillsSectionProps) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4 },
    },
  };

  return (
    <section
      ref={ref}
      className="relative py-20 md:py-32 bg-background border-t border-border/50"
    >
      <div className="container max-w-6xl">
        {/* Section Header */}
        <motion.div
          className="mb-12 md:mb-16 text-center px-4"
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
              Technical Skills
            </span>
          </h2>
          <p className="text-foreground/60 text-base sm:text-lg">
            Technologies and tools I work with
          </p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 md:gap-3"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="px-3 md:px-4 py-2 bg-card border border-border/50 rounded-full hover:border-accent/50 transition-all duration-300 group cursor-pointer">
                <span className="text-xs md:text-sm font-semibold text-foreground group-hover:text-accent transition-colors">
                  {skill}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
