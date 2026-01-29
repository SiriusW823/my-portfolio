import { motion } from 'framer-motion';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

/**
 * Navigation Component
 * Design: Sticky header with smooth animations
 * Features: Mobile-responsive hamburger menu
 */

interface NavLink {
  label: string;
  href: string;
}

interface NavigationProps {
  name: string;
  links?: NavLink[];
}

export default function Navigation({ name, links = [] }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  const defaultLinks: NavLink[] = [
    { label: 'Home', href: '#' },
    { label: 'Work', href: '#work' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  const navLinks = links.length > 0 ? links : defaultLinks;

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container max-w-6xl flex items-center justify-between h-16 md:h-20 px-4">
        {/* Logo */}
        <motion.div
          className="flex-shrink-0"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <a
            href="#"
            className="text-lg md:text-xl lg:text-2xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent"
          >
            {name}
          </a>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              className="text-foreground/70 hover:text-accent transition-colors font-semibold text-xs lg:text-sm"
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              {link.label}
            </motion.a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          className="md:hidden p-2 text-foreground hover:text-accent transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          whileTap={{ scale: 0.95 }}
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </motion.button>
      </div>

        {/* Mobile Navigation */}
        <motion.div
          className="md:hidden overflow-hidden"
          initial={{ height: 0 }}
          animate={{ height: isOpen ? 'auto' : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-card border-t border-border/50 px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                className="block text-foreground/70 hover:text-accent transition-colors font-semibold text-xs py-2"
              onClick={() => setIsOpen(false)}
              whileHover={{ x: 5 }}
            >
              {link.label}
            </motion.a>
          ))}
        </div>
      </motion.div>
    </motion.nav>
  );
}
