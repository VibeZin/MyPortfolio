import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Rocket } from 'lucide-react';
import { PageWrapper } from '../components/Layout';

export const NotFound: React.FC = () => {
  return (
    <PageWrapper className="min-h-[80vh] flex flex-col items-center justify-center text-center relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3] 
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[var(--gold)]/20 rounded-full blur-[100px]"
        />
      </div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10"
      >
        <h1 className="text-9xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-b from-[var(--white)] to-[var(--white)]/10 opacity-20 select-none">
          404
        </h1>
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
          <motion.div
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center"
          >
            <Rocket size={64} className="text-[var(--gold)] mb-4 drop-shadow-[0_0_15px_var(--gold-glow)]" />
            <h2 className="text-3xl md:text-5xl font-display font-bold text-[var(--white)] mb-4">
              You're lost bestie
            </h2>
            <p className="text-[var(--white-60)] max-w-md mx-auto mb-8">
              This page doesn't exist. My bad? Anyway, let's get you back home.
            </p>

            <Link 
              to="/"
              className="group relative px-8 py-3 bg-[var(--glass)] border border-[var(--glass-light)] rounded-full text-[var(--white)] font-medium overflow-hidden transition-all hover:border-[var(--white-30)] hover:shadow-lg hover:shadow-[var(--gold-glow)]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--gold)] to-[var(--white)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative flex items-center gap-2">
                <Home size={18} className="group-hover:text-black transition-colors" />
                <span className="group-hover:text-black transition-colors">Take Me Home</span>
              </div>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </PageWrapper>
  );
};