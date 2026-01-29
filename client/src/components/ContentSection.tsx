import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

/**
 * Content Section Component
 * Design: Modular card-based layout with smooth scroll animations
 * Used for: Awards, Courses, Competitions, Projects
 */

interface ContentItem {
  id: number;
  title: string;
  [key: string]: any;
}

interface ContentSectionProps {
  title: string;
  subtitle?: string;
  items: ContentItem[];
  renderItem: (item: ContentItem) => React.ReactNode;
  variant?: 'grid' | 'list';
}

export default function ContentSection({
  title,
  subtitle,
  items,
  renderItem,
  variant = 'grid',
}: ContentSectionProps) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section
      ref={ref}
      className="relative py-16 md:py-20 lg:py-32 bg-background border-t border-border/50"
    >
      <div className="container max-w-6xl px-4">
        {/* Section Header */}
        <motion.div
          className="mb-12 md:mb-16 text-center px-4"
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
              {title}
            </span>
          </h2>
          {subtitle && (
            <p className="text-foreground/60 text-base sm:text-lg max-w-2xl mx-auto">{subtitle}</p>
          )}
        </motion.div>

        {/* Content Grid/List */}
        <motion.div
          className={
            variant === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-6'
          }
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {items.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              className="group"
            >
              {renderItem(item)}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
