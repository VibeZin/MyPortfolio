import React, { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

export const CelestialBackground: React.FC = () => {
    const canvasRef = useRef<HTMLDivElement>(null);
    const { theme } = useTheme();

    // HIGH-QUALITY orb configuration with VISIBLE light mode colors
    const orbs = [
        {
            id: 1,
            size: 1000,
            x: 15,
            y: 20,
            duration: 30,
            // DARK MODE: Silver glow
            // LIGHT MODE: Blue/purple glow (VISIBLE!)
            gradient: theme === 'dark'
                ? 'radial-gradient(circle at center, rgba(192,192,192,0.25) 0%, rgba(192,192,192,0.15) 30%, rgba(192,192,192,0.05) 60%, transparent 100%)'
                : 'radial-gradient(circle at center, rgba(99,102,241,0.15) 0%, rgba(139,92,246,0.12) 30%, rgba(236,72,153,0.08) 60%, transparent 100%)',
            blur: 60
        },
        {
            id: 2,
            size: 800,
            x: 75,
            y: 25,
            duration: 40,
            gradient: theme === 'dark'
                ? 'radial-gradient(circle at center, rgba(229,229,229,0.20) 0%, rgba(229,229,229,0.12) 35%, rgba(229,229,229,0.04) 65%, transparent 100%)'
                : 'radial-gradient(circle at center, rgba(167,139,250,0.18) 0%, rgba(167,139,250,0.10) 35%, rgba(99,102,241,0.05) 65%, transparent 100%)',
            blur: 70
        },
        {
            id: 3,
            size: 900,
            x: 45,
            y: 65,
            duration: 35,
            gradient: theme === 'dark'
                ? 'radial-gradient(circle at center, rgba(192,192,192,0.18) 0%, rgba(192,192,192,0.10) 40%, rgba(192,192,192,0.03) 70%, transparent 100%)'
                : 'radial-gradient(circle at center, rgba(236,72,153,0.12) 0%, rgba(236,72,153,0.08) 40%, rgba(167,139,250,0.04) 70%, transparent 100%)',
            blur: 80
        },
        {
            id: 4,
            size: 700,
            x: 80,
            y: 70,
            duration: 45,
            gradient: theme === 'dark'
                ? 'radial-gradient(circle at center, rgba(128,128,128,0.15) 0%, rgba(128,128,128,0.08) 45%, transparent 100%)'
                : 'radial-gradient(circle at center, rgba(59,130,246,0.14) 0%, rgba(59,130,246,0.09) 45%, transparent 100%)',
            blur: 75
        },
        {
            id: 5,
            size: 600,
            x: 30,
            y: 40,
            duration: 38,
            gradient: theme === 'dark'
                ? 'radial-gradient(circle at center, rgba(192,192,192,0.12) 0%, rgba(192,192,192,0.06) 50%, transparent 100%)'
                : 'radial-gradient(circle at center, rgba(139,92,246,0.16) 0%, rgba(139,92,246,0.10) 50%, transparent 100%)',
            blur: 65
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
                    `translate3d(${x * speed * 20}px, ${y * speed * 20}px, 0)`;
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
                // HIGH CONTRAST BACKGROUNDS
                background: isDark ? '#000000' : '#ffffff',
                transition: 'background 0.4s ease'
            }}
        >
            {/* Base Gradient Layer (subtle depth) */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: isDark
                        ? 'radial-gradient(ellipse at 50% 30%, rgba(20,20,20,1) 0%, rgba(0,0,0,1) 100%)'
                        : 'radial-gradient(ellipse at 50% 30%, rgba(248,250,252,1) 0%, rgba(255,255,255,1) 100%)',
                    opacity: 1
                }}
            />

            {/* HIGH-QUALITY Celestial Orbs (no pixelation) */}
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
                        background: orb.gradient,
                        filter: `blur(${orb.blur}px)`,
                        borderRadius: '50%',
                        animation: `float-celestial-${orb.id} ${orb.duration}s ease-in-out infinite`,
                        willChange: 'transform',
                        transition: 'background 0.4s ease, filter 0.4s ease',
                        // CRITICAL: Prevent pixelation
                        transform: 'translateZ(0)',
                        backfaceVisibility: 'hidden' as const,
                        imageRendering: 'auto' as const
                    }}
                />
            ))}

            {/* Atmospheric Glow Overlay */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: isDark
                        ? 'linear-gradient(135deg, rgba(192,192,192,0.02) 0%, transparent 40%, rgba(229,229,229,0.015) 100%)'
                        : 'linear-gradient(135deg, rgba(99,102,241,0.03) 0%, transparent 40%, rgba(236,72,153,0.025) 100%)',
                    animation: 'atmospheric-shift 25s ease-in-out infinite',
                    backgroundSize: '200% 200%'
                }}
            />

            {/* ULTRA-FINE Grain (prevents banding) */}
            <svg style={{ position: 'absolute', width: 0, height: 0 }}>
                <filter id="ultra-grain">
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="1.2"
                        numOctaves={5}
                        stitchTiles="stitch"
                    />
                    <feColorMatrix type="saturate" values="0" />
                </filter>
            </svg>
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    filter: 'url(#ultra-grain)',
                    opacity: isDark ? 0.012 : 0.008,
                    mixBlendMode: 'overlay',
                    pointerEvents: 'none'
                }}
            />
        </div>
    );
};
