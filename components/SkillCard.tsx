import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface SkillCardProps {
  name: string;
  description: string;
  proficiency: number; // 0 to 100
  icon: React.ReactNode;
  className?: string;
  color?: string; // hex color for glow/accent
  delay?: number;
}

export const SkillCard: React.FC<SkillCardProps> = ({
  name,
  description,
  proficiency,
  icon,
  className = "",
  color = "#3b82f6", // Default Blue
  delay = 0
}) => {
  const ref = useRef<HTMLDivElement>(null);

  // --- 3D Tilt Physics ---
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Calculate mouse position relative to center of card
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
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      style={{ perspective: 1000 }}
      className={`relative h-full ${className}`}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY }}
        className="group relative h-full flex flex-col justify-between p-6 rounded-2xl bg-[var(--black-800)] border border-[var(--black-600)] backdrop-blur-md overflow-hidden transition-colors hover:border-[var(--black-600)]"
      >
        {/* Dynamic Glow Background */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
          style={{ background: `radial-gradient(circle at center, ${color}, transparent 70%)` }}
        />

        {/* Header */}
        <div className="relative z-10 flex items-start justify-between mb-4">
          <div className="p-3 rounded-xl bg-[var(--black-700)] text-[var(--white)] group-hover:scale-110 transition-transform duration-300 border border-[var(--black-600)]" style={{ color: color }}>
            {icon}
          </div>
          <span className="text-xs font-mono opacity-50 text-[var(--white-60)]">{proficiency}%</span>
        </div>

        {/* Content */}
        <div className="relative z-10">
          <h3 className="text-xl font-display font-bold text-[var(--white)] mb-2 group-hover:text-[var(--pink)] transition-colors">
            {name}
          </h3>
          <p className="text-sm text-[var(--white-60)] mb-6 line-clamp-2 group-hover:text-[var(--white-90)] transition-colors">
            {description}
          </p>

          {/* Proficiency Bar */}
          <div className="w-full h-1.5 bg-[var(--black-600)] rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${proficiency}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: delay + 0.2, ease: "easeOut" }}
              className="h-full rounded-full shadow-[0_0_10px_rgba(0,0,0,0.5)]"
              style={{ backgroundColor: color }}
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};