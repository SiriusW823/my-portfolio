import { motion } from 'framer-motion';
import { Github, Mail, ExternalLink } from 'lucide-react';

/**
 * Footer Component
 * Design: Dark footer with social links and contact info
 */

interface FooterProps {
  name: string;
  email: string;
  location: string;
  social: {
    github?: string;
    instagram?: string;
    twitter?: string;
  };
}

export default function Footer({
  name,
  email,
  location,
  social,
}: FooterProps) {
  const socialLinks = [
    { icon: Github, href: social.github, label: 'GitHub' },
    { icon: Mail, href: `mailto:${email}`, label: 'Email' },
  ];

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <footer className="relative bg-card border-t border-border/50">
      <div className="container max-w-6xl py-12 md:py-16 lg:py-20 px-4">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-8 md:mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* About */}
          <motion.div variants={itemVariants}>
            <h3 className="text-base md:text-lg font-bold text-foreground mb-4">About</h3>
            <p className="text-foreground/60 text-xs md:text-sm leading-relaxed">
              Passionate student developer and cybersecurity enthusiast, constantly
              learning and building innovative solutions.
            </p>
          </motion.div>

          {/* Contact */}
          <motion.div variants={itemVariants}>
            <h3 className="text-base md:text-lg font-bold text-foreground mb-4">Contact</h3>
            <div className="space-y-2 text-xs md:text-sm text-foreground/60">
              <p>{name}</p>
              <p>{location}</p>
              <a
                href={`mailto:${email}`}
                className="text-accent hover:text-primary transition-colors"
              >
                {email}
              </a>
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-base md:text-lg font-bold text-foreground mb-4">Connect</h3>
            <div className="flex gap-3 md:gap-4">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  link.href && (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 md:w-10 h-9 md:h-10 flex items-center justify-center rounded-lg bg-border/50 hover:bg-accent/20 text-foreground hover:text-accent transition-all duration-300"
                      whileHover={{ scale: 1.1, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon className="w-4 md:w-5 h-4 md:h-5" />
                    </motion.a>
                  )
                );
              })}
            </div>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-8" />

        {/* Bottom */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-center text-xs md:text-sm text-foreground/60 text-center md:text-left gap-4 md:gap-0"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p>© 2025 {name}. All rights reserved.</p>
          <p>Crafted with passion and modern web technologies</p>
        </motion.div>
      </div>
    </footer>
  );
}
