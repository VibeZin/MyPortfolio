import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from 'next-themes';
import { Navigation } from './components/Navigation';
import { Background3D } from './components/Background3D';
import { CustomCursor } from './components/CustomCursor';
import { Footer } from './components/Footer';
import { LoadingScreen } from './components/LoadingScreen';
import { NoiseOverlay } from './components/NoiseOverlay';
import { EasterEggs } from './components/EasterEggs';
import { Home } from './views/Home';
import { Projects } from './views/Projects';
import { About } from './views/About';
import { Contact } from './views/Contact';
import { Skills } from './views/Skills';
import { NotFound } from './views/NotFound';

const AnimatedRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/about" element={<About />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

export default function App() {
  const [loading, setLoading] = useState(true);

  // Prevent scroll when loading
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [loading]);

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <HashRouter>
        <AnimatePresence>
          {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
        </AnimatePresence>
        
        {/* Utilities & Effects */}
        <EasterEggs />
        <NoiseOverlay />
        
        {/* Skip to Content Link for Accessibility */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[60] px-4 py-2 bg-[var(--blue)] text-white font-bold rounded-lg shadow-lg"
        >
          Skip to main content
        </a>

        <div className="min-h-screen transition-colors duration-300 bg-[var(--black-900)] text-[var(--white-90)] selection:bg-[var(--pink)] selection:text-white overflow-x-hidden relative flex flex-col">
          <CustomCursor />
          <Background3D />
          <Navigation />
          <main 
            id="main-content" 
            className="flex-grow pt-28 pb-12 px-4 md:px-8 max-w-7xl mx-auto w-full relative z-10 focus:outline-none"
            tabIndex={-1}
          >
            <AnimatedRoutes />
          </main>
          
          <Footer />
        </div>
      </HashRouter>
    </ThemeProvider>
  );
}