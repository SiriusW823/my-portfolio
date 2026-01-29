import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

/**
 * Hero Section Component
 * Design: Deep dark background with glowing accent colors
 * Typography: Bold Poppins display font with smooth animations
 * Animation: Staggered text reveal with smooth fade-in effects
 */

interface HeroProps {
  headline: string[];
  description: string;
  onScrollClick?: () => void;
}

export default function Hero({ headline, description, onScrollClick }: HeroProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-20 md:pt-0">
      {/* Animated background gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-60 sm:w-80 h-60 sm:h-80 bg-accent rounded-full mix-blend-screen blur-3xl"
          animate={{
            y: [0, 30, 0],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
          }}
          style={{ opacity: 0.15 }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-60 sm:w-80 h-60 sm:h-80 bg-primary rounded-full mix-blend-screen blur-3xl"
          animate={{
            y: [0, -30, 0],
            x: [0, -20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
          }}
          style={{ opacity: 0.15 }}
        />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 container max-w-4xl text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Headline */}
        <motion.div className="mb-6" variants={itemVariants}>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tighter mb-4">
            <span className="bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent">
              {headline.join(' ')}
            </span>
          </h1>
        </motion.div>

        {/* Description */}
        <motion.p
          className="text-base sm:text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto mb-12 leading-relaxed px-4"
          variants={itemVariants}
        >
          {description}
        </motion.p>

        {/* CTA Button */}
        <motion.div variants={itemVariants} className="flex justify-center">
          <motion.button
            onClick={onScrollClick}
            className="group relative px-6 md:px-8 py-3 md:py-4 bg-accent/10 border border-accent/30 rounded-lg text-accent font-semibold hover:bg-accent/20 transition-all duration-300 text-sm md:text-base"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore My Work
            <motion.span
              className="absolute inset-0 rounded-lg bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity"
              animate={{ opacity: [0, 0.5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <button
          onClick={onScrollClick}
          className="flex flex-col items-center gap-2 text-accent/60 hover:text-accent transition-colors"
        >
          <span className="text-sm font-mono">Scroll</span>
          <ChevronDown className="w-5 h-5" />
        </button>
      </motion.div>
    </section>
  );
}
