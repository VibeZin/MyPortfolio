import React, { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

export const CelestialBackground: React.FC = () => {
    const canvasRef = useRef<HTMLDivElement>(null);
    const { theme } = useTheme();

    // Configuration for celestial orbs
    const orbs = [
        {
            id: 1,
            size: 800,
            x: 20,
            y: 30,
            duration: 25,
            gradientDark: 'radial-gradient(circle, rgba(192,192,192,0.15) 0%, rgba(192,192,192,0) 70%)',
            gradientLight: 'radial-gradient(circle, rgba(100,100,250,0.08) 0%, rgba(100,100,250,0) 70%)',
            blur: 80
        },
        {
            id: 2,
            size: 600,
            x: 70,
            y: 20,
            duration: 35,
            gradientDark: 'radial-gradient(circle, rgba(229,229,229,0.12) 0%, rgba(229,229,229,0) 70%)',
            gradientLight: 'radial-gradient(circle, rgba(200,100,250,0.06) 0%, rgba(200,100,250,0) 70%)',
            blur: 100
        },
        {
            id: 3,
            size: 500,
            x: 50,
            y: 60,
            duration: 30,
            gradientDark: 'radial-gradient(circle, rgba(192,192,192,0.10) 0%, rgba(192,192,192,0) 70%)',
            gradientLight: 'radial-gradient(circle, rgba(150,150,250,0.07) 0%, rgba(150,150,250,0) 70%)',
            blur: 90
        },
        {
            id: 4,
            size: 700,
            x: 10,
            y: 70,
            duration: 40,
            gradientDark: 'radial-gradient(circle, rgba(128,128,128,0.08) 0%, rgba(128,128,128,0) 70%)',
            gradientLight: 'radial-gradient(circle, rgba(250,150,200,0.05) 0%, rgba(250,150,200,0) 70%)',
            blur: 110
        }
    ];

    useEffect(() => {
        // Mouse interaction logic for parallax
        const handleMouseMove = (e: MouseEvent) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;

            // Subtle parallax effect on orbs
            document.querySelectorAll('.celestial-orb').forEach((orb, i) => {
                const speed = (i + 1) * 0.5;
                (orb as HTMLElement).style.transform =
                    `translate(${x * speed * 20}px, ${y * speed * 20}px)`;
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const isDark = theme === 'dark';

    return (
        <div
            ref={canvasRef}
            className="celestial-background"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: 0,
                pointerEvents: 'none',
                overflow: 'hidden',
                background: isDark ? '#000000' : '#ffffff',
                transition: 'background 0.3s ease'
            }}
        >
            {/* Gradient Mesh Base Layer */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: isDark
                        ? 'radial-gradient(ellipse at 50% 50%, rgba(26,26,26,1) 0%, rgba(0,0,0,1) 100%)'
                        : 'radial-gradient(ellipse at 50% 50%, rgba(250,250,255,1) 0%, rgba(255,255,255,1) 100%)',
                    opacity: 1
                }}
            />

            {/* Floating Celestial Orbs */}
            {orbs.map((orb) => (
                <div
                    key={orb.id}
                    className="celestial-orb"
                    style={{
                        position: 'absolute',
                        width: `${orb.size}px`,
                        height: `${orb.size}px`,
                        left: `${orb.x}%`,
                        top: `${orb.y}%`,
                        background: isDark ? orb.gradientDark : orb.gradientLight,
                        filter: `blur(${orb.blur}px)`,
                        borderRadius: '50%',
                        animation: `float-${orb.id} ${orb.duration}s ease-in-out infinite`,
                        willChange: 'transform',
                        transition: 'background 0.3s ease, filter 0.3s ease'
                    }}
                />
            ))}

            {/* Animated Gradient Overlay */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: isDark
                        ? 'linear-gradient(135deg, rgba(192,192,192,0.03) 0%, transparent 50%, rgba(229,229,229,0.02) 100%)'
                        : 'linear-gradient(135deg, rgba(100,150,250,0.02) 0%, transparent 50%, rgba(200,100,250,0.03) 100%)',
                    animation: 'gradient-shift 20s ease infinite',
                    backgroundSize: '200% 200%'
                }}
            />

            {/* Grain Texture for Elegance */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
                    opacity: isDark ? 0.015 : 0.008,
                    mixBlendMode: 'overlay'
                }}
            />
        </div>
    );
};
