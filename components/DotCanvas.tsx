import React, { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    hue: number;
}

const CONNECTION_DIST = 120;
const REPEL_DIST = 150;
const REPEL_FORCE = 2.5;

export const DotCanvas: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { theme, resolvedTheme } = useTheme();
    const mouseRef = useRef({ x: -9999, y: -9999 });
    const rafRef = useRef<number>(0);
    const isDark = (resolvedTheme ?? theme) === 'dark';

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Reduce-motion guard
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReduced) return;

        const isMobile = window.innerWidth < 768;
        const PARTICLE_COUNT = isMobile ? 50 : 120;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        // Seed particles
        const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.45,
            vy: (Math.random() - 0.5) * 0.45,
            radius: Math.random() * 2.5 + 1.5,
            hue: Math.random() * 360,
        }));

        const onMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };
        const onMouseLeave = () => {
            mouseRef.current = { x: -9999, y: -9999 };
        };
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseleave', onMouseLeave);

        let hueShift = 0;
        const dark = isDark;

        const draw = () => {
            const W = canvas.width;
            const H = canvas.height;
            ctx.clearRect(0, 0, W, H);

            // Background fill
            ctx.fillStyle = dark ? '#08080f' : '#ffffff';
            ctx.fillRect(0, 0, W, H);

            hueShift = (hueShift + 0.4) % 360;

            const mx = mouseRef.current.x;
            const my = mouseRef.current.y;

            // First pass: update positions
            for (const p of particles) {
                // Bounce
                if (p.x <= p.radius || p.x >= W - p.radius) p.vx *= -1;
                if (p.y <= p.radius || p.y >= H - p.radius) p.vy *= -1;

                // Mouse repel
                const dx = p.x - mx;
                const dy = p.y - my;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < REPEL_DIST && dist > 0) {
                    const force = ((REPEL_DIST - dist) / REPEL_DIST) * REPEL_FORCE;
                    p.vx += (dx / dist) * force;
                    p.vy += (dy / dist) * force;
                }

                // Dampen velocity so it doesn't blow up after repulsion
                const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
                const maxSpeed = 3;
                if (speed > maxSpeed) {
                    p.vx = (p.vx / speed) * maxSpeed;
                    p.vy = (p.vy / speed) * maxSpeed;
                }

                // Gentle drift back toward natural speed
                const baseSpeed = 0.45;
                if (speed > baseSpeed) {
                    p.vx *= 0.98;
                    p.vy *= 0.98;
                }

                p.x += p.vx;
                p.y += p.vy;
            }

            // Second pass: draw connections then dots
            ctx.lineWidth = 1;
            for (let i = 0; i < particles.length; i++) {
                const a = particles[i];
                const hue = (a.hue + hueShift) % 360;

                // Connections
                for (let j = i + 1; j < particles.length; j++) {
                    const b = particles[j];
                    const dx2 = a.x - b.x;
                    const dy2 = a.y - b.y;
                    const d2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
                    if (d2 < CONNECTION_DIST) {
                        const alpha = ((1 - d2 / CONNECTION_DIST) * (dark ? 0.35 : 0.22)).toFixed(3);
                        ctx.strokeStyle = `hsla(${hue},70%,${dark ? 65 : 50}%,${alpha})`;
                        ctx.beginPath();
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        ctx.stroke();
                    }
                }

                // Dot + subtle glow
                ctx.shadowBlur = 10;
                ctx.shadowColor = `hsl(${hue},80%,60%)`;
                ctx.beginPath();
                ctx.arc(a.x, a.y, a.radius, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${hue},80%,${dark ? 68 : 52}%,${dark ? 0.85 : 0.75})`;
                ctx.fill();
                ctx.shadowBlur = 0;
            }

            rafRef.current = requestAnimationFrame(draw);
        };

        rafRef.current = requestAnimationFrame(draw);

        return () => {
            cancelAnimationFrame(rafRef.current);
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseleave', onMouseLeave);
        };
    }, [isDark]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: 0,
                pointerEvents: 'none',
                willChange: 'transform',
            }}
            aria-hidden="true"
        />
    );
};
