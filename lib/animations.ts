import { Variants } from 'framer-motion';

// --- Text Animations ---

export const letterContainer: Variants = {
  hidden: { opacity: 0 },
  visible: (i = 1) => ({
    opacity: 1,
    transition: { staggerChildren: 0.03, delayChildren: 0.04 * i },
  }),
};

export const letterAnimation: Variants = {
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 70, // Smoother, less snappy
    },
  },
  hidden: {
    y: 20,
    opacity: 0,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 70,
    },
  },
};

export const typewriterEffect: Variants = {
  hidden: { width: 0, borderRight: "2px solid rgba(255,255,255,0.8)" },
  visible: {
    width: "100%",
    borderRight: "transparent",
    transition: {
      width: { duration: 2, ease: "easeInOut" },
      borderRight: { duration: 0.5, repeat: Infinity, ease: "linear" }
    }
  }
};

export const gradientText: Variants = {
  animate: {
    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
    transition: {
      duration: 5,
      ease: "linear",
      repeat: Infinity,
    }
  }
};

// --- Container Animations ---

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", damping: 25, stiffness: 60 } 
  }
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { type: "spring", damping: 20, stiffness: 80 } 
  }
};

// --- Interactive Animations ---

export const cardHover: Variants = {
  rest: { scale: 1, y: 0, z: 0 },
  hover: { 
    scale: 1.01, 
    y: -5, 
    zIndex: 10,
    transition: { type: "spring", damping: 20, stiffness: 100 } 
  }
};

export const buttonClick: Variants = {
  rest: { scale: 1 },
  hover: { scale: 1.02 },
  tap: { scale: 0.98 }
};

export const magneticSpring = {
  type: "spring",
  stiffness: 100,
  damping: 20,
  mass: 0.5
};

// --- Page Transitions ---

export const pageTransition: Variants = {
  initial: { opacity: 0, y: 10, filter: "blur(5px)" },
  animate: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } // Ease out cubic/quart
  },
  exit: { 
    opacity: 0, 
    y: -10, 
    filter: "blur(5px)",
    transition: { duration: 0.4, ease: "easeIn" } 
  }
};

// --- 3D Interactions ---

export const tiltPerspective = (x: number, y: number) => ({
  rotateX: -y * 10,
  rotateY: x * 10,
  transition: { type: "spring", stiffness: 100, damping: 20 }
});