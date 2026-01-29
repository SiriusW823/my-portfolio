import { motion } from 'framer-motion';
import { ExternalLink, Code2 } from 'lucide-react';

/**
 * Project Card Component
 * Design: Dark card with technology tags and external link
 * Used for displaying projects and portfolio items
 */

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  link: string;
  year: string;
}

export default function ProjectCard({
  title,
  description,
  technologies,
  link,
  year,
}: ProjectCardProps) {
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
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-start justify-between mb-4">
          <Code2 className="w-6 h-6 text-accent flex-shrink-0" />
          <span className="text-sm font-mono text-accent/60">{year}</span>
        </div>

        <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
          {title}
        </h3>

        <p className="text-foreground/70 text-sm leading-relaxed mb-4 flex-grow">
          {description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech, index) => (
            <motion.span
              key={index}
              className="px-2 py-1 bg-accent/10 border border-accent/30 rounded text-xs font-mono text-accent/80"
              whileHover={{ scale: 1.05 }}
            >
              {tech}
            </motion.span>
          ))}
        </div>

        {/* Link */}
        {link !== '#' && (
          <motion.a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-accent hover:text-primary transition-colors text-sm font-semibold"
            whileHover={{ x: 5 }}
          >
            View Project
            <ExternalLink className="w-4 h-4" />
          </motion.a>
        )}
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
