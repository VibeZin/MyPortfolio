import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Github, ExternalLink, ArrowRight } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  const ref = useRef<HTMLDivElement>(null);

  // 3D Tilt Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 100, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 100, damping: 20 });

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
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      style={{ perspective: 1000 }}
      className="h-full"
    >
      <motion.div
        onClick={() => onClick(project)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY }}
        whileHover={{ scale: 1.02 }}
        className="group relative h-full bg-[var(--black-800)] rounded-2xl overflow-hidden border border-[var(--black-600)] shadow-xl hover:shadow-2xl hover:shadow-[var(--silver-glow)] transition-all duration-500 cursor-pointer flex flex-col"
      >
        {/* Thumbnail */}
        <div className="relative h-48 overflow-hidden">
          <img 
            src={project.thumbnail} 
            alt={project.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          {/* Fixed: Use bg-black/60 instead of variable so overlay is always dark for white text */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="text-white font-bold px-4 py-2 border border-white/30 rounded-full backdrop-blur-sm">
              View Details
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-display font-bold text-[var(--white)] group-hover:text-[var(--silver)] transition-colors">
              {project.title}
            </h3>
            {project.featured && (
              <span className="text-[10px] font-bold uppercase tracking-wider text-black bg-[var(--silver)] px-2 py-0.5 rounded-full">
                Featured
              </span>
            )}
          </div>

          <p className="text-[var(--white-60)] text-sm mb-4 line-clamp-2 flex-grow">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {project.techStack.slice(0, 3).map((tech) => (
              <span key={tech} className="text-xs px-2 py-1 bg-[var(--black-700)] border border-[var(--black-600)] text-[var(--white-60)] rounded-md">
                {tech}
              </span>
            ))}
            {project.techStack.length > 3 && (
              <span className="text-xs px-2 py-1 text-[var(--white-60)]">+{project.techStack.length - 3}</span>
            )}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-[var(--black-600)] mt-auto">
             <button className="text-sm text-[var(--silver)] font-medium flex items-center gap-1 hover:gap-2 transition-all">
                Details <ArrowRight size={16} />
             </button>
             <div className="flex gap-3">
                {project.githubUrl && (
                  <a 
                    href={project.githubUrl} 
                    onClick={(e) => e.stopPropagation()} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="text-[var(--white-60)] hover:text-[var(--white)] transition-colors"
                  >
                    <Github size={18} />
                  </a>
                )}
                {project.liveUrl && (
                  <a 
                    href={project.liveUrl} 
                    onClick={(e) => e.stopPropagation()} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="text-[var(--white-60)] hover:text-[var(--white)] transition-colors"
                  >
                    <ExternalLink size={18} />
                  </a>
                )}
             </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};