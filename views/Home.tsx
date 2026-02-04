import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { ArrowRight, ChevronDown, Send } from 'lucide-react';
import { PageWrapper } from '../components/Layout';
import { letterContainer, letterAnimation, fadeInUp, staggerContainer } from '../lib/animations';

// --- Components ---

/**
 * Magnetic Button Component
 * Adds a magnetic pull effect to the button on hover
 */
const MagneticButton: React.FC<{ children: React.ReactNode; className?: string; to: string; variant?: 'primary' | 'outline' }> = ({ 
  children, 
  className = "", 
  to,
  variant = 'primary' 
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current!.getBoundingClientRect();
    const center = { x: left + width / 2, y: top + height / 2 };
    const distance = { x: clientX - center.x, y: clientY - center.y };
    
    x.set(distance.x * 0.3);
    y.set(distance.y * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const baseStyles = "relative px-8 py-4 rounded-2xl font-bold flex items-center gap-2 transition-all duration-300 overflow-hidden group";
  const variants = {
    primary: "bg-gradient-to-r from-[var(--gold)] to-[var(--gold-dim)] text-black shadow-lg shadow-[var(--gold-glow)] hover:shadow-[var(--gold-dim)] border border-transparent",
    outline: "bg-[var(--glass)] border border-[var(--black-700)] text-[var(--white)] hover:bg-[var(--black-800)] hover:border-[var(--gold)] backdrop-blur-sm"
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: mouseX, y: mouseY }}
    >
      <Link to={to} className={`${baseStyles} ${variants[variant]} ${className}`}>
        <span className="relative z-10 flex items-center gap-2">
          {children}
        </span>
        {/* Shine Effect */}
        <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-[var(--white)]/40 to-transparent z-0" />
      </Link>
    </motion.div>
  );
};

// Animated Text Component
const AnimatedTitle: React.FC<{ text: string; className?: string }> = ({ text, className }) => {
  return (
    <motion.span
      className={`inline-block ${className || ''}`}
      variants={letterContainer}
      initial="hidden"
      animate="visible"
    >
      {text.split("").map((char, index) => (
        <motion.span key={index} variants={letterAnimation} className="inline-block">
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
};

export const Home: React.FC = () => {
  return (
    <PageWrapper className="min-h-screen flex flex-col justify-center relative pb-20 md:pb-0">
      
      {/* Religious Header */}
      <div className="absolute top-12 left-0 right-0 text-center opacity-40 z-0">
        <span className="font-display text-sm tracking-[0.2em] text-[var(--gold)]">BISMILLAHIR RAHMANIR RAHIM</span>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 md:gap-20 items-center mt-32 md:mt-0 mb-16">
        
        {/* Left: Text Content */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="order-2 lg:order-1 text-center lg:text-left z-10"
        >
          {/* Tagline */}
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--black-800)] border border-[var(--black-700)] text-[var(--gold)] mb-6 backdrop-blur-md">
            <span className="text-sm font-medium tracking-wide">Just vibing with tech and business tbh</span>
          </motion.div>

          {/* Name - Adjusted font sizes and added whitespace-nowrap */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-bold mb-4 tracking-tight leading-tight text-[var(--white)]">
            I'm <br />
            <span className="text-[var(--gold)] drop-shadow-[0_0_15px_var(--gold-glow)] whitespace-nowrap">
              <AnimatedTitle text="Shabab Ahmed" />
            </span>
          </h1>

          {/* Subtitle */}
          <motion.h2 variants={fadeInUp} className="text-xl md:text-2xl text-[var(--white-60)] font-light mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            Building random stuff, learning as I go. <span className="text-[var(--white)] font-semibold">No cap.</span>
          </motion.h2>

          {/* Buttons */}
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6">
            <MagneticButton to="/contact" variant="primary">
              Let's Connect <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </MagneticButton>
            
            <MagneticButton to="/projects" variant="outline">
              Explore Work <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </MagneticButton>
          </motion.div>
        </motion.div>

        {/* Right: Profile Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="order-1 lg:order-2 flex justify-center lg:justify-end relative z-0"
        >
          <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
            {/* Glowing Backdrop */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[var(--gold)] to-[var(--white)] rounded-full blur-[60px] opacity-20 animate-pulse" />
            
            {/* Floating Container */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="relative w-full h-full rounded-full p-2 border-2 border-[var(--black-700)] bg-[var(--black-800)] backdrop-blur-sm"
            >
              <div className="w-full h-full rounded-full overflow-hidden relative group">
                <img 
                  src="https://api.dicebear.com/7.x/notionists/svg?seed=Shabab&backgroundColor=0e0e17" 
                  alt="Shabab Ahmed" 
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--black-900)]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>

            {/* Orbiting Decor Elements */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
              className="absolute inset-[-20px] rounded-full border border-[var(--gold)]/30 border-dashed"
            />
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ 
          opacity: { delay: 1.5, duration: 1 },
          y: { repeat: Infinity, duration: 2, ease: "easeInOut" }
        }}
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--white-60)]"
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <ChevronDown size={20} />
      </motion.div>

      {/* CSS for Text Gradient Animation (Kept for other elements if needed, but not used on Name anymore) */}
      <style>{`
        .bg-300% {
          background-size: 300% auto;
        }
        @keyframes textGradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-text-gradient {
          animation: textGradient 6s ease infinite;
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </PageWrapper>
  );
};