import { ReactNode } from "react";

export interface Project {
  id: string;
  title: string;
  description: string;
  fullDescription: string; // For the modal
  techStack: string[];
  category: 'Web App' | 'AI Project' | 'Learning' | 'Mobile';
  thumbnail: string;
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  date: string;
}

export interface NavItem {
  label: string;
  path: string;
}

export interface LayoutProps {
  children: ReactNode;
  className?: string;
}