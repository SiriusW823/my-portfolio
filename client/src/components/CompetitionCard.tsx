import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';

/**
 * Competition Card Component
 * Design: Dark card with trophy icon and result badge
 * Used for displaying competitions and events
 */

interface CompetitionCardProps {
  title: string;
  category: string;
  year: string;
  result: string;
  description: string;
}

export default function CompetitionCard({
  title,
  category,
  year,
  result,
  description,
}: CompetitionCardProps) {
  return (
    <motion.div
      className="relative h-full p-6 bg-card border border-border/50 rounded-lg hover:border-accent/50 transition-all duration-300 group overflow-hidden"
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
          <Trophy className="w-6 h-6 text-accent flex-shrink-0" />
          <span className="text-xs font-mono px-2 py-1 bg-accent/20 text-accent rounded">
            {year}
          </span>
        </div>

        <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
          {title}
        </h3>

        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-mono text-primary/80 bg-primary/10 px-2 py-1 rounded">
            {category}
          </span>
          <span className="text-xs font-semibold text-accent">{result}</span>
        </div>

        <p className="text-foreground/70 text-sm leading-relaxed">{description}</p>
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
