import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, ExternalLink, Calendar, Layers } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[var(--black-900)]/90 backdrop-blur-sm"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl max-h-[90vh] bg-[var(--black-800)] border border-[var(--black-600)] rounded-2xl shadow-2xl overflow-y-auto overflow-x-hidden custom-scrollbar"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-white/10 text-white rounded-full transition-colors z-10"
          >
            <X size={24} />
          </button>

          {/* Hero Image */}
          <div className="relative h-64 md:h-80 w-full">
            <img
              src={project.thumbnail}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--black-800)] to-transparent" />
            
            <div className="absolute bottom-6 left-6 md:left-8">
              <span className="inline-block px-3 py-1 mb-3 text-xs font-bold tracking-wider text-black uppercase bg-[var(--silver)] rounded-full">
                {project.category}
              </span>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-white">
                {project.title}
              </h2>
            </div>
          </div>

          <div className="p-6 md:p-8 grid md:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="md:col-span-2 space-y-6">
              <div className="prose prose-invert max-w-none">
                 {/* 
                   In a real app, use a Markdown renderer here.
                   For now, we just render the text with basic whitespace handling.
                 */}
                 <p className="text-[var(--white-90)] leading-relaxed whitespace-pre-line text-lg">
                  {project.fullDescription || project.description}
                 </p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Links */}
              <div className="flex flex-col gap-3">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 bg-[var(--silver)] hover:bg-white hover:text-black text-black font-bold rounded-xl transition-all"
                  >
                    <ExternalLink size={20} />
                    Live Demo
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold rounded-xl transition-all"
                  >
                    <Github size={20} />
                    Source Code
                  </a>
                )}
              </div>

              {/* Info */}
              <div className="p-4 bg-[var(--black-700)] rounded-xl border border-[var(--black-600)] space-y-4">
                <div className="flex items-center gap-3 text-[var(--white-60)]">
                  <Calendar size={18} />
                  <span className="text-sm">{new Date(project.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long' })}</span>
                </div>
                
                <div>
                  <div className="flex items-center gap-2 text-[var(--white-60)] mb-3">
                    <Layers size={18} />
                    <span className="text-sm font-semibold">Tech Stack</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map(tech => (
                      <span key={tech} className="text-xs px-2 py-1 bg-[var(--black-900)] text-[var(--silver)] rounded border border-[var(--silver)]/20">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};