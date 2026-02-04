import React from 'react';
import { PageWrapper } from '../components/Layout';
import { AboutCard } from '../components/AboutCard';
import { 
  GraduationCap, 
  Cpu, 
  Palette, 
  Briefcase,
  Terminal,
  Zap,
  TrendingUp,
  Lightbulb
} from 'lucide-react';

export const About: React.FC = () => {
  return (
    <PageWrapper>
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">
          The <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--white)] to-[var(--gold)]">Story</span>
        </h1>
        <p className="text-[var(--white-90)] max-w-2xl mx-auto text-lg leading-relaxed">
          Yo, I'm Shabab—BBA student who's lowkey obsessed with tech and business. Like, how do CPUs even work? How do companies scale? I'm just here figuring it out, building stuff that seems cool, and seeing where it goes. No CS degree, just vibes and curiosity.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
        
        {/* Card 1: Vibe Coder */}
        <AboutCard 
          title="Vibe Coder" 
          icon={<Terminal size={24} />}
          className="lg:col-span-2"
          delay={0.1}
        >
          <p className="text-[var(--white-90)] mb-4 leading-relaxed">
            No bootcamp, no degree. Just me, Google, and a bunch of AI tools building stuff at 2 AM. It works somehow.
          </p>
          <div className="flex flex-wrap gap-2 mt-2">
            {['Claude', 'Google', 'Caffeine', 'Late Nights'].map((tool) => (
              <span key={tool} className="px-3 py-1 bg-[var(--black-700)] hover:bg-[var(--black-600)] border border-[var(--black-600)] rounded-full text-xs font-medium text-[var(--gold)] transition-colors">
                {tool}
              </span>
            ))}
          </div>
        </AboutCard>

        {/* Card 2: Tech Enthusiast */}
        <AboutCard 
          title="Tech Enthusiast" 
          icon={<Cpu size={24} />}
          className="lg:col-span-1"
          delay={0.2}
        >
          <p className="text-[var(--white-90)] leading-relaxed text-sm">
            Actually obsessed with CPUs, GPUs, and how phones are built. Yeah, I'm that guy who watches semiconductor keynotes for fun.
          </p>
        </AboutCard>

        {/* Card 3: Design First */}
        <AboutCard 
          title="Design First" 
          icon={<Palette size={24} />}
          className="lg:col-span-1"
          delay={0.3}
        >
          <p className="text-[var(--white-90)] leading-relaxed text-sm">
            If it doesn't look clean, I'm not shipping it. Apps and websites should just hit different, you know?
          </p>
        </AboutCard>

        {/* Card 4: Education */}
        <AboutCard 
          title="Education" 
          icon={<GraduationCap size={24} />}
          className="lg:col-span-1 lg:row-span-2"
          delay={0.4}
        >
          <div className="space-y-8 relative pl-4 border-l-2 border-[var(--black-600)] ml-2 mt-2">
            <div className="relative">
              <span className="absolute -left-[25px] top-1 w-4 h-4 rounded-full bg-[var(--gold)] ring-4 ring-[var(--black-800)]" />
              <h4 className="text-[var(--white)] font-bold text-lg">BBA Student</h4>
              <p className="text-[var(--gold)] text-sm font-semibold mb-1">Current</p>
              <p className="text-[var(--white-60)] text-sm">University of Asia Pacific</p>
              <p className="text-[var(--white-60)] text-xs mt-1 italic">Learning business stuff while building random projects on the side.</p>
            </div>

            <div className="relative">
              <span className="absolute -left-[25px] top-1 w-4 h-4 rounded-full bg-[var(--white-30)] ring-4 ring-[var(--black-800)]" />
              <h4 className="text-[var(--white)] font-bold text-lg">HSC (Science)</h4>
              <p className="text-[var(--white-60)] text-sm">Udayan Higher Secondary School</p>
              <p className="text-[var(--white-60)] text-xs mt-1 italic">Where I realized I'm lowkey a nerd for how things work.</p>
            </div>
            
             <div className="relative">
              <span className="absolute -left-[25px] top-1 w-4 h-4 rounded-full bg-[var(--white-30)] ring-4 ring-[var(--black-800)]" />
              <h4 className="text-[var(--white)] font-bold text-lg">SSC (Science)</h4>
              <p className="text-[var(--white-60)] text-sm">Udayan Higher Secondary School</p>
            </div>
          </div>
        </AboutCard>

        {/* Card 5: Curious About Business */}
        <AboutCard 
          title="Curious About Business" 
          icon={<TrendingUp size={24} />}
          className="lg:col-span-1"
          delay={0.5}
        >
          <p className="text-[var(--white-90)] leading-relaxed text-sm">
             Tech + business = where things get interesting. How products scale, how AI changes everything—I'm just here for the ride, trying to figure it all out.
          </p>
        </AboutCard>
        
        {/* Card 6: Philosophy */}
         <AboutCard 
          className="lg:col-span-2 bg-gradient-to-br from-[var(--black-800)] to-[var(--gold)]/5 border-l-[3px]"
          style={{ borderLeftColor: 'var(--gold)' }} 
          delay={0.6}
        >
          <div className="h-full flex flex-col justify-center items-center text-center p-6">
             <Lightbulb className="text-[var(--gold)] opacity-50 mb-4" size={32} />
             <p className="text-[var(--white-90)] text-lg font-medium italic">
              "I believe design and tech should work together. I trust my intuition, but always keep learning."
             </p>
          </div>
        </AboutCard>

      </div>
    </PageWrapper>
  );
};