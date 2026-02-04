import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface AboutCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  title?: string;
  icon?: React.ReactNode;
  style?: React.CSSProperties;
}

export const AboutCard: React.FC<AboutCardProps> = ({ 
  children, 
  className = "", 
  delay = 0,
  title,
  icon,
  style
}) => {
  const ref = useRef<HTMLDivElement>(null);

  // 3D Tilt Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXFromCenter = e.clientX - rect.left - width / 2;
    const mouseYFromCenter = e.clientY - rect.top - height / 2;

    x.set(mouseXFromCenter / width);
    y.set(mouseYFromCenter / height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, type: "spring", bounce: 0.3 }}
      style={{ perspective: 1000 }}
      className={`h-full ${className}`}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, ...style }}
        className="h-full relative overflow-hidden rounded-2xl bg-[var(--black-800)] border border-[var(--black-600)] backdrop-blur-md transition-shadow duration-300 hover:shadow-2xl hover:shadow-[var(--blue-glow)] hover:border-[var(--black-600)] group"
      >
        {/* Glow Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--white-30)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        
        <div className="relative z-10 p-6 h-full flex flex-col">
          {title && (
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-[var(--black-600)]">
              {icon && <span className="text-[var(--pink)]">{icon}</span>}
              <h3 className="text-xl font-display font-bold text-[var(--white)] group-hover:text-[var(--blue)] transition-colors">
                {title}
              </h3>
            </div>
          )}
          <div className="flex-grow">
            {children}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};