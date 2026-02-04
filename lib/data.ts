import { Project } from '../types';

// In a real Next.js app, we would use 'fs' here to read markdown files.
// Since this is currently running in a client-side React environment,
// we simulate the parsed content of content/projects/*.md

export const PROJECTS_DATA: Project[] = [
  {
    id: 'neon-shop',
    title: 'Neon E-Commerce',
    description: 'A futuristic shopping experience with 3D product previews.',
    fullDescription: `
      # Neon E-Commerce
      
      A fully immersive e-commerce platform built to demonstrate the future of online shopping. 
      Users can interact with 3D models of products before purchasing.
      
      ### Key Features:
      - Real-time 3D rendering using React Three Fiber
      - Stripe Payment Integration for secure checkout
      - dynamic inventory management
      - Dark mode first design philosophy
    `,
    techStack: ['Next.js', 'Three.js', 'Stripe', 'Tailwind'],
    category: 'Web App',
    thumbnail: 'https://picsum.photos/seed/neon/800/600',
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
    featured: true,
    date: '2025-12-01'
  },
  {
    id: 'ai-dash',
    title: 'AI Analytics Dashboard',
    description: 'Real-time visualization for machine learning model performance.',
    fullDescription: `
      # AI Analytics Dashboard
      
      This dashboard provides deep insights into ML model training processes. 
      It uses WebSockets to stream loss functions and accuracy metrics in real-time.
      
      ### Tech Stack Details:
      - Python FastAPI backend for high-performance data streaming
      - D3.js for complex data visualization
      - Redis for caching transient metrics
    `,
    techStack: ['React', 'Python', 'D3.js', 'FastAPI'],
    category: 'AI Project',
    thumbnail: 'https://picsum.photos/seed/ai/800/600',
    githubUrl: 'https://github.com',
    date: '2025-11-15'
  },
  {
    id: 'crypto-tracker',
    title: 'Crypto Sentinel',
    description: 'Web3 portfolio tracker with whale alert notifications.',
    fullDescription: `
      # Crypto Sentinel
      
      A comprehensive tool for tracking crypto assets across multiple chains.
      Includes a "Whale Watch" feature that alerts users of large movements on the blockchain.
    `,
    techStack: ['TypeScript', 'Web3.js', 'GraphQL'],
    category: 'Web App',
    thumbnail: 'https://picsum.photos/seed/crypto/800/600',
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
    date: '2025-10-20'
  },
  {
    id: 'graph-social',
    title: 'Social Graph Visualizer',
    description: 'Interactive node-link diagram for exploring social connections.',
    fullDescription: `
      # Social Graph Visualizer
      
      An experimental project to visualize social connections as a force-directed graph.
      Users can drag nodes, expand clusters, and filter connections based on interests.
    `,
    techStack: ['React', 'D3.js', 'Neo4j'],
    category: 'Learning',
    thumbnail: 'https://picsum.photos/seed/graph/800/600',
    githubUrl: 'https://github.com',
    date: '2025-09-05'
  },
  {
    id: 'llm-orchestrator',
    title: 'LLM Task Orchestrator',
    description: 'Middleware to chain multiple AI models for complex reasoning.',
    fullDescription: `
      # LLM Task Orchestrator
      
      A backend service that takes a complex user prompt, breaks it down into sub-tasks,
      and routes them to the most appropriate model (Claude, GPT-4, or Gemini).
    `,
    techStack: ['Node.js', 'LangChain', 'OpenAI API'],
    category: 'AI Project',
    thumbnail: 'https://picsum.photos/seed/llm/800/600',
    githubUrl: 'https://github.com',
    date: '2026-01-10'
  }
];

export async function getProjects(): Promise<Project[]> {
  // Simulate network delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(PROJECTS_DATA.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    }, 500);
  });
}