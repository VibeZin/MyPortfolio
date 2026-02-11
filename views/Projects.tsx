import React from 'react';
import { motion } from 'framer-motion';
import { PageWrapper } from '../components/Layout';
import { Construction, Github } from 'lucide-react';

export const Projects: React.FC = () => {
  return (
    <PageWrapper className="min-h-[60vh] flex flex-col items-center justify-center text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 p-8 border border-[var(--black-600)] rounded-2xl bg-[var(--black-800)]/50 backdrop-blur-md max-w-2xl"
      >
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-[var(--silver)]/10 rounded-full">
            <Construction size={48} className="text-[var(--silver)]" />
          </div>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-display font-bold mb-4 text-[var(--white)]">
          Nothing here <span className="text-[var(--white-60)]">yet lol</span>
        </h1>
        
        <p className="text-[var(--white-90)] text-lg mb-8 leading-relaxed">
          Still building stuff worth showing. Rome wasn't built in a day, and neither is a decent portfolio. Check back soon, or just ask me what I'm working on.
        </p>

        <a 
          href="https://github.com/VibeZin" 
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--white)] text-[var(--black-900)] font-bold rounded-full hover:bg-[var(--silver)] transition-colors duration-300"
        >
          <Github size={20} />
          Peep My GitHub
        </a>
      </motion.div>
    </PageWrapper>
  );
};