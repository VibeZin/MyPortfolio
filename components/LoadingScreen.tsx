import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const LoadingScreen: React.FC<{ onComplete?: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate realistic loading
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => onComplete?.(), 800); 
          return 100;
        }
        // Random increment for organic feel
        const increment = Math.max(Math.random() * 15, 5);
        return Math.min(prev + increment, 100);
      });
    }, 150);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[var(--black-900)] text-white overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0, 
        y: -50,
        transition: { duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] } 
      }}
    >
      {/* Background Pulse */}
      <motion.div 
        className="absolute inset-0 bg-radial-gradient from-[var(--silver-glow)] to-transparent"
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      <div className="relative z-10 flex flex-col items-center">
        {/* Animated Logo Container */}
        <div className="relative w-32 h-32 mb-12">
            <motion.div 
                className="absolute inset-0 border-2 border-t-[var(--silver)] border-r-transparent border-b-transparent border-l-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <motion.div 
                className="absolute inset-2 border-2 border-t-transparent border-r-[var(--silver)] border-b-transparent border-l-transparent rounded-full"
                animate={{ rotate: -360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
            <motion.div 
                className="absolute inset-4 border-2 border-t-transparent border-r-transparent border-b-white border-l-transparent rounded-full"
                animate={{ rotate: 180 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            
            <div className="absolute inset-0 flex items-center justify-center">
                <motion.span 
                    className="text-4xl font-display font-bold text-white tracking-tighter"
                    animate={{ scale: [0.9, 1.1, 0.9] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    SA
                </motion.span>
            </div>
        </div>

        {/* Progress Counter */}
        <div className="w-64 relative">
          <div className="flex justify-between text-xs font-mono text-[var(--white-60)] mb-2 uppercase tracking-widest">
            <motion.span
                key={progress > 99 ? "complete" : "loading"}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
            >
                {progress > 99 ? "Let's Go" : "Loading... (this better be worth it)"}
            </motion.span>
            <span>{Math.round(progress)}%</span>
          </div>
          
          {/* Progress Bar Track */}
          <div className="h-1 w-full bg-[var(--white-30)] rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-[var(--silver)] via-[var(--silver)] to-white"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "linear" }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};