import { motion } from 'framer-motion';
import { Award } from 'lucide-react';

/**
 * Award Card Component
 * Design: Dark card with accent border and hover effects
 * Used for displaying certifications and awards
 */

interface AwardCardProps {
  title: string;
  organization: string;
  year: string;
  description: string;
}

export default function AwardCard({
  title,
  organization,
  year,
  description,
}: AwardCardProps) {
  return (
    <motion.div
      className="relative h-full p-4 md:p-6 bg-card border border-border/50 rounded-lg hover:border-accent/50 transition-all duration-300 group overflow-hidden"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      {/* Glow effect on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-accent/10 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={{ opacity: 0 }}
      />

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <Award className="w-5 md:w-6 h-5 md:h-6 text-accent flex-shrink-0" />
          <span className="text-xs md:text-sm font-mono text-accent/60">{year}</span>
        </div>

        <h3 className="text-base md:text-lg font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
          {title}
        </h3>

        <p className="text-xs md:text-sm text-accent/80 font-semibold mb-3">{organization}</p>

        <p className="text-foreground/70 text-xs md:text-sm leading-relaxed">{description}</p>
      </div>

      {/* Bottom accent line */}
      <motion.div
        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-accent to-primary"
        initial={{ width: 0 }}
        whileHover={{ width: '100%' }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}
