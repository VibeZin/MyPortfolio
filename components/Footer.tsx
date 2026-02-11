import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Facebook, Instagram, Linkedin, Mail, ArrowUp, Send } from 'lucide-react';

export const Footer: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { icon: Instagram, href: "https://www.instagram.com/shababahmedtzn", label: "Instagram" },
    { icon: Facebook, href: "https://www.facebook.com/shababahmedtzn/", label: "Facebook" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/shabab-ahmed-935a96383?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", label: "LinkedIn" },
    { icon: Mail, href: "mailto:shababahmedtazin2021@gmail.com", label: "Email" }
  ];

  return (
    <footer className="relative z-10 border-t border-[var(--black-600)] bg-[var(--black-800)]/80 backdrop-blur-md mt-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start justify-between">
          
          {/* Brand & Copyright */}
          <div className="text-center md:text-left space-y-4">
             <div className="flex items-center justify-center md:justify-start gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[var(--silver)] to-[var(--white)] flex items-center justify-center font-bold text-black">
                    SA
                </div>
                <h3 className="text-xl font-display font-bold text-[var(--white)]">Shabab Ahmed Tazin</h3>
             </div>
             <p className="text-[var(--white-60)] text-sm leading-relaxed">
               © {new Date().getFullYear()} Shabab Ahmed Tazin.<br/>
               Built with vibes, caffeine, and way too much Stack Overflow.
             </p>
          </div>

          {/* Social Icons */}
          <div className="flex justify-center items-center h-full gap-4">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -5, scale: 1.1 }}
                className="p-3 bg-[var(--black-700)] rounded-full text-[var(--white-60)] hover:text-black hover:bg-[var(--silver)] hover:shadow-[0_0_15px_var(--silver-glow)] transition-all duration-300 border border-[var(--black-600)] group"
                aria-label={social.label}
              >
                <social.icon size={20} className="transition-colors" />
              </motion.a>
            ))}
          </div>

          {/* Newsletter */}
          <div className="flex flex-col gap-4">
            <p className="text-sm text-[var(--white-60)] text-center lg:text-right">Join the vibe check (newsletter coming soon).</p>
            <form className="flex gap-2 justify-center lg:justify-end" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="email@example.com" 
                className="bg-[var(--black-700)] border border-[var(--black-600)] rounded-xl px-4 py-2 text-sm text-[var(--white)] focus:border-[var(--silver)] outline-none w-full max-w-[200px] transition-colors placeholder:text-[var(--white-30)]"
              />
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 bg-gradient-to-r from-[var(--silver)] to-[var(--silver-dark)] rounded-xl text-black shadow-lg shadow-[var(--silver-glow)]"
              >
                <Send size={18} />
              </motion.button>
            </form>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 p-3 bg-[var(--silver)] text-black rounded-full shadow-lg shadow-[var(--silver-glow)] hover:bg-[var(--white)] hover:text-black transition-colors z-50 group"
          >
            <ArrowUp size={24} className="group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
};