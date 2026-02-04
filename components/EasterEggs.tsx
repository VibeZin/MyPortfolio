import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';

export const EasterEggs: React.FC = () => {
  const [keys, setKeys] = useState<string[]>([]);
  const KONAMI_CODE = [
    'ArrowUp', 'ArrowUp', 
    'ArrowDown', 'ArrowDown', 
    'ArrowLeft', 'ArrowRight', 
    'ArrowLeft', 'ArrowRight', 
    'b', 'a'
  ];

  useEffect(() => {
    // 1. Secret Console Message
    console.log(
      "%c🚀 Welcome to the Vibe Code! \n%cInterested in how this was built? Check out the repo or hire me!",
      "color: #e94560; font-size: 20px; font-weight: bold; background: #1a1a2e; padding: 10px; border-radius: 5px;",
      "color: #f4a261; font-size: 14px; margin-top: 5px;"
    );

    // 2. Konami Code Listener
    const handleKeyDown = (e: KeyboardEvent) => {
      setKeys((prev) => {
        const newKeys = [...prev, e.key];
        if (newKeys.length > KONAMI_CODE.length) {
          newKeys.shift();
        }
        return newKeys;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (JSON.stringify(keys) === JSON.stringify(KONAMI_CODE)) {
      triggerConfetti();
      setKeys([]);
    }
  }, [keys]);

  const triggerConfetti = () => {
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#e94560', '#533483', '#f4a261']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#e94560', '#533483', '#f4a261']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  return null;
};