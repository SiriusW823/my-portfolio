import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';

/**
 * Course Card Component
 * Design: Dark card with skill tags and hover effects
 * Used for displaying courses and training
 */

interface CourseCardProps {
  title: string;
  instructor: string;
  year: string;
  description: string;
  skills: string[];
}

export default function CourseCard({
  title,
  instructor,
  year,
  description,
  skills,
}: CourseCardProps) {
  return (
    <motion.div
      className="relative h-full p-6 bg-card border border-border/50 rounded-lg hover:border-accent/50 transition-all duration-300 group overflow-hidden"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      {/* Glow effect on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={{ opacity: 0 }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-start justify-between mb-4">
          <BookOpen className="w-6 h-6 text-primary flex-shrink-0" />
          <span className="text-sm font-mono text-primary/60">{year}</span>
        </div>

        <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>

        <p className="text-sm text-primary/80 font-semibold mb-3">{instructor}</p>

        <p className="text-foreground/70 text-sm leading-relaxed mb-4 flex-grow">
          {description}
        </p>

        {/* Skills tags */}
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <motion.span
              key={index}
              className="px-3 py-1 bg-primary/10 border border-primary/30 rounded-full text-xs font-mono text-primary/80"
              whileHover={{ scale: 1.05 }}
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Bottom accent line */}
      <motion.div
        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary to-accent"
        initial={{ width: 0 }}
        whileHover={{ width: '100%' }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}
