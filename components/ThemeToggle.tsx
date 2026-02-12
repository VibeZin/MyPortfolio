import React from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';

export const ThemeToggle: React.FC = () => {
    const { theme, setTheme } = useTheme();

    return (
        <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="theme-toggle"
            aria-label="Toggle theme"
            style={{
                position: 'fixed',
                top: 24,
                right: 24,
                width: 56,
                height: 56,
                borderRadius: '50%',
                background: 'var(--glass)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid var(--silver)',
                boxShadow: '0 4px 20px var(--silver-glow)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 100,
                transition: 'all 0.3s ease'
            }}
        >
            {theme === 'dark' ? (
                <Sun size={24} color="var(--silver)" />
            ) : (
                <Moon size={24} color="var(--silver)" />
            )}
        </button>
    );
};
