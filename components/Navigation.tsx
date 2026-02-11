import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import confetti from 'canvas-confetti';

const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Skills', path: '/skills' },
  { name: 'Projects', path: '/projects' },
  { name: 'Contact', path: '/contact' },
];

export const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const location = useLocation();
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  useEffect(() => setIsOpen(false), [location]);

  const handleLogoClick = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { x: 0.1, y: 0.1 },
      colors: ['#c0c0c0', '#e5e5e5', '#FFFFFF'],
      disableForReducedMotion: true
    });
  };

  if (!mounted) return null;

  return (
    <>
      <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
        <motion.nav
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 80, damping: 20 }}
          className="w-full max-w-4xl bg-[var(--black-900)]/80 backdrop-blur-md border border-[var(--black-600)] shadow-lg shadow-black/5 rounded-full px-4 py-3 flex items-center justify-between transition-colors duration-300"
        >
          {/* Logo / Monogram */}
          <Link to="/" onClick={handleLogoClick} className="relative group flex-shrink-0">
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-tr from-[var(--silver)] to-[var(--silver)] shadow-sm"
            >
              <span className="font-display font-bold text-lg text-black tracking-tighter">SA</span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {NAV_LINKS.map((link) => {
              const isActive = location.pathname === link.path;

              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${isActive
                      ? 'text-black font-bold'
                      : 'text-[var(--white-60)] hover:text-[var(--white)] hover:font-semibold'
                    }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-[var(--silver)] rounded-full -z-10 shadow-sm"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2.5 rounded-full bg-[var(--black-800)] text-[var(--silver)] hover:scale-110 hover:shadow-md transition-all duration-300 border border-[var(--black-700)] flex-shrink-0"
              aria-label="Toggle Dark Mode"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={theme}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                </motion.div>
              </AnimatePresence>
            </button>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-full text-[var(--white-90)] hover:text-[var(--silver)] transition-colors"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </motion.nav>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-[var(--black-900)] md:hidden flex items-center justify-center"
          >
            {/* Mobile Menu Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 p-2 text-[var(--white-60)] hover:text-[var(--silver)]"
            >
              <X size={32} />
            </button>

            <div className="flex flex-col items-center space-y-8 p-8">
              {NAV_LINKS.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`text-4xl font-display font-bold ${location.pathname === link.path
                        ? 'text-[var(--silver)]'
                        : 'text-[var(--white)] hover:text-[var(--white-60)]'
                      } transition-colors`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};