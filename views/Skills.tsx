import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageWrapper } from '../components/Layout';
import { SkillCard } from '../components/SkillCard';
import { 
  Cpu, 
  Smartphone, 
  Monitor, 
  TrendingUp, 
  Zap,
  Rocket,
  PenTool,
  Search,
  MessageSquare,
  BarChart,
  Layout,
  Box
} from 'lucide-react';

// --- Data Types & Constants ---

type Category = 'All' | 'Messing With' | 'Hyped' | 'Toolkit';

interface SkillData {
  id: string;
  name: string;
  category: Category;
  description: string;
  proficiency: number;
  icon: React.ReactNode;
  color: string;
  className?: string; // For Grid Spans
}

const SKILLS_DATA: SkillData[] = [
  // --- Category 1: What I'm Messing With ---
  {
    id: 'm1',
    name: 'UI/UX Design',
    category: 'Messing With',
    description: "Making interfaces that don't make people rage quit.",
    proficiency: 85,
    icon: <PenTool size={24} />,
    color: '#c0c0c0', // Gold
    className: 'md:col-span-1'
  },
  {
    id: 'm2',
    name: 'Product Thinking',
    category: 'Messing With',
    description: "Understanding what people actually need (not what they say they need).",
    proficiency: 80,
    icon: <Search size={24} />,
    color: '#E2E8F0' // Silver
  },
  {
    id: 'm3',
    name: 'Tech Business Strategy',
    category: 'Messing With',
    description: "How does tech make money anyway? Trying to crack that code.",
    proficiency: 75,
    icon: <TrendingUp size={24} />,
    color: '#FFFFFF' // White
  },
  {
    id: 'm4',
    name: 'Creative Problem Solving',
    category: 'Messing With',
    description: "Finding the weirdest solutions that somehow work.",
    proficiency: 90,
    icon: <Zap size={24} />,
    color: '#e8e8e8' // Light Gold
  },

  // --- Category 2: What Gets Me Hyped ---
  {
    id: 'h1',
    name: 'Frontend Aesthetics',
    category: 'Hyped',
    description: "Websites that make you go 'wait, this is fire'.",
    proficiency: 95,
    icon: <Layout size={24} />,
    color: '#c0c0c0', // Gold
    className: 'md:col-span-2'
  },
  {
    id: 'h2',
    name: 'Android UI',
    category: 'Hyped',
    description: "Mobile apps that just feel right.",
    proficiency: 88,
    icon: <Smartphone size={24} />,
    color: '#E2E8F0' // Silver
  },
  {
    id: 'h3',
    name: 'Semiconductors',
    category: 'Hyped',
    description: "Literal silicon chips powering everything. Wild.",
    proficiency: 92,
    icon: <Cpu size={24} />,
    color: '#FFFFFF' // White
  },
  {
    id: 'h4',
    name: 'Hardware Architecture',
    category: 'Hyped',
    description: "CPUs, GPUs, and all the magic underneath.",
    proficiency: 90,
    icon: <Box size={24} />,
    color: '#e8e8e8' // Light Gold
  },

  // --- Category 3: My Toolkit ---
  {
    id: 't1',
    name: 'Figma',
    category: 'Toolkit',
    description: "Where the magic happens (design-wise).",
    proficiency: 85,
    icon: <PenTool size={24} />,
    color: '#c0c0c0' // Gold
  },
  {
    id: 't2',
    name: 'Claude & ChatGPT',
    category: 'Toolkit',
    description: "My AI coding buddies for when I need to brainstorm at 3 AM.",
    proficiency: 98,
    icon: <MessageSquare size={24} />,
    color: '#E2E8F0', // Silver
    className: 'md:col-span-2'
  },
  {
    id: 't3',
    name: 'Data Analytics',
    category: 'Toolkit',
    description: "Making numbers actually make sense.",
    proficiency: 75,
    icon: <BarChart size={24} />,
    color: '#FFFFFF' // White
  }
];

const CATEGORIES: Category[] = ['All', 'Messing With', 'Hyped', 'Toolkit'];

export const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('All');

  const filteredSkills = activeCategory === 'All' 
    ? SKILLS_DATA 
    : SKILLS_DATA.filter(skill => skill.category === activeCategory);

  return (
    <PageWrapper>
      {/* Header Section */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
          Stuff that keeps me up <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--white)] to-[var(--silver)]">at night</span>
        </h1>
        <p className="text-[var(--white-60)] max-w-2xl mx-auto text-lg mb-8">
          Still figuring out where I fit in all this, but honestly? The journey slaps.
        </p>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap justify-center gap-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-[var(--silver)] text-black shadow-lg shadow-[var(--silver-glow)] scale-105'
                  : 'bg-[var(--black-700)] text-[var(--white-60)] hover:bg-[var(--black-600)] hover:text-[var(--white)] border border-[var(--black-600)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Bento Grid */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(180px,auto)]"
      >
        <AnimatePresence mode='popLayout'>
          {filteredSkills.map((skill, index) => (
            <motion.div
              layout
              key={skill.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className={skill.className || ''}
            >
              <SkillCard
                name={skill.name}
                description={skill.description}
                proficiency={skill.proficiency}
                icon={skill.icon}
                color={skill.color}
                delay={index * 0.05} // Stagger effect
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      
      {/* Footer Note */}
      <div className="mt-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--black-700)] border border-[var(--black-600)] text-[var(--white-60)] text-sm">
          <Rocket size={16} className="text-[var(--silver)]" />
          <span>(in a good way)</span>
        </div>
      </div>
    </PageWrapper>
  );
};