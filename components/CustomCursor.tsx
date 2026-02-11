import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Mouse position - raw values for instant tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Springs for smooth trailing effect (Ring only)
  // Increased stiffness for tighter tracking on the trail as well
  const trailSpringConfig = { damping: 30, stiffness: 300, mass: 0.8 };

  const trailX = useSpring(mouseX, trailSpringConfig);
  const trailY = useSpring(mouseY, trailSpringConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractable = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        window.getComputedStyle(target).cursor === 'pointer';
      
      setIsHovering(!!isInteractable);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', () => setIsVisible(false));
    document.addEventListener('mouseenter', () => setIsVisible(true));

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY, isVisible]);

  // Hide on mobile / touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      {/* Main Cursor (Dot) - Direct mouseX/mouseY for instant tracking */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{ 
          x: mouseX, 
          y: mouseY, 
          translateX: '-50%', 
          translateY: '-50%',
          background: 'var(--silver)',
          boxShadow: '0 0 6px var(--silver)'
        }}
        animate={{
          scale: isClicking ? 0.8 : isHovering ? 1.5 : 1,
          opacity: isVisible ? 1 : 0
        }}
        transition={{ duration: 0.15 }}
      />

      {/* Trail Cursor (Ring) - Spring physics */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border rounded-full pointer-events-none z-[9998] mix-blend-difference"
        style={{ 
          x: trailX, 
          y: trailY, 
          translateX: '-50%', 
          translateY: '-50%' 
        }}
        animate={{
          scale: isClicking ? 1.5 : isHovering ? 2 : 1,
          opacity: isVisible ? 0.6 : 0,
          borderColor: isHovering ? 'var(--silver)' : 'var(--white-60)'
        }}
        transition={{ duration: 0.15 }}
      />
      
      {/* Glow Effect - Follows trail */}
      <motion.div
        className="fixed top-0 left-0 w-32 h-32 rounded-full blur-2xl pointer-events-none z-[9997]"
        style={{ 
          x: trailX, 
          y: trailY, 
          translateX: '-50%', 
          translateY: '-50%',
          background: 'var(--silver-glow)'
        }}
        animate={{
          opacity: isVisible ? (isHovering ? 0.4 : 0.15) : 0,
          scale: isHovering ? 1.2 : 1
        }}
        transition={{ duration: 0.15 }}
      />
    </>
  );
};
