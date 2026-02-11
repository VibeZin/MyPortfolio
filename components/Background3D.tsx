import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Float } from '@react-three/drei';
import { useTheme } from 'next-themes';
import * as THREE from 'three';

// --- Configuration ---
const COLORS_DARK = ['#c0c0c0', '#e5e5e5', '#FFFFFF']; // Silver, Platinum, White
const COLORS_LIGHT = ['#808080', '#c0c0c0', '#0f172a']; // Dark Silver, Silver, Dark

const CONNECTION_DISTANCE = 3.5;
const MOUSE_REPULSION_RADIUS = 4;
const MOUSE_REPULSION_STRENGTH = 3;

// Optimized Counts
const CONFIG = {
  mobile: {
    particles: 20,
    shapesBox: 5,
    shapesSphere: 8,
    shapesTorus: 3,
    dpr: 1
  },
  desktop: {
    particles: 60,
    shapesBox: 10,
    shapesSphere: 20,
    shapesTorus: 5,
    dpr: [1, 2] as [number, number]
  }
};

interface ShapeProps {
  position: [number, number, number];
  color: string;
  type: 'box' | 'sphere' | 'torus';
  scale: number;
  reduceMotion: boolean;
}

const GeometricShape: React.FC<ShapeProps> = ({ position, color, type, scale, reduceMotion }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialPos = useRef(new THREE.Vector3(...position));

  const rotationSpeed = useRef({
    x: (Math.random() - 0.5) * 0.2,
    y: (Math.random() - 0.5) * 0.2,
  });

  useFrame((state) => {
    if (!meshRef.current) return;
    if (reduceMotion) return;

    const time = state.clock.getElapsedTime();
    const { pointer, viewport } = state;

    meshRef.current.rotation.x += rotationSpeed.current.x * 0.01;
    meshRef.current.rotation.y += rotationSpeed.current.y * 0.01;

    const driftX = Math.sin(time * 0.3 + position[0]) * 0.5;
    const driftY = Math.cos(time * 0.2 + position[1]) * 0.5;

    const currentBasePos = new THREE.Vector3(
      initialPos.current.x + driftX,
      initialPos.current.y + driftY,
      initialPos.current.z
    );

    if (pointer.x !== 0 || pointer.y !== 0) {
      const mousePos = new THREE.Vector3(
        (pointer.x * viewport.width) / 2,
        (pointer.y * viewport.height) / 2,
        0
      );

      const distance = mousePos.distanceTo(currentBasePos);

      if (distance < MOUSE_REPULSION_RADIUS) {
        const direction = new THREE.Vector3().subVectors(currentBasePos, mousePos).normalize();
        const force = (MOUSE_REPULSION_RADIUS - distance) * MOUSE_REPULSION_STRENGTH;

        meshRef.current.position.lerp(
          currentBasePos.add(direction.multiplyScalar(force)),
          0.1
        );
        return;
      }
    }

    meshRef.current.position.lerp(currentBasePos, 0.05);
  });

  const Geometry = useMemo(() => {
    switch (type) {
      case 'box': return <boxGeometry args={[1, 1, 1]} />;
      case 'sphere': return <sphereGeometry args={[0.7, 16, 16]} />;
      case 'torus': return <torusGeometry args={[0.6, 0.2, 12, 24]} />;
    }
  }, [type]);

  return (
    <mesh ref={meshRef} scale={scale} position={initialPos.current}>
      {Geometry}
      <meshStandardMaterial
        color={color}
        roughness={0.4}
        metalness={0.8}
        transparent
        opacity={0.8}
      />
    </mesh>
  );
};

const ParticleNetwork = ({ count, reduceMotion, color }: { count: number, reduceMotion: boolean, color: string }) => {
  const { viewport } = useThree();
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 10
        ),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02,
          0
        )
      });
    }
    return temp;
  }, [count]);

  const positions = useMemo(() => new Float32Array(count * 3), [count]);
  const linePositions = useMemo(() => new Float32Array(count * count * 3), [count]);

  useFrame((state) => {
    if (!pointsRef.current || !linesRef.current || reduceMotion) return;

    const { pointer } = state;
    const mousePos = new THREE.Vector3(
      (pointer.x * viewport.width) / 2,
      (pointer.y * viewport.height) / 2,
      0
    );

    let lineVertexIndex = 0;

    particles.forEach((particle, i) => {
      particle.position.add(particle.velocity);

      if (Math.abs(particle.position.x) > 12) particle.velocity.x *= -1;
      if (Math.abs(particle.position.y) > 12) particle.velocity.y *= -1;

      const distToMouse = particle.position.distanceTo(mousePos);
      if (distToMouse < 3) {
        const repulsionDir = new THREE.Vector3().subVectors(particle.position, mousePos).normalize();
        particle.position.add(repulsionDir.multiplyScalar(0.05));
      }

      positions[i * 3] = particle.position.x;
      positions[i * 3 + 1] = particle.position.y;
      positions[i * 3 + 2] = particle.position.z;

      for (let j = i + 1; j < count; j++) {
        const other = particles[j];
        const dist = particle.position.distanceTo(other.position);

        if (dist < CONNECTION_DISTANCE) {
          linePositions[lineVertexIndex++] = particle.position.x;
          linePositions[lineVertexIndex++] = particle.position.y;
          linePositions[lineVertexIndex++] = particle.position.z;

          linePositions[lineVertexIndex++] = other.position.x;
          linePositions[lineVertexIndex++] = other.position.y;
          linePositions[lineVertexIndex++] = other.position.z;
        }
      }
    });

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    linesRef.current.geometry.setDrawRange(0, lineVertexIndex / 3);
    linesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.05} color="#D4AF37" transparent opacity={0.6} sizeAttenuation={true} />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={count * count} array={linePositions} itemSize={3} />
        </bufferGeometry>
        <lineBasicMaterial color={color} transparent opacity={0.15} linewidth={1} />
      </lineSegments>
    </>
  );
};

export const Background3D: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const { theme } = useTheme();

  // Use light colors if theme is light (and not system dark)
  // Simplified check: if theme is 'light', use LIGHT palette.
  const currentPalette = theme === 'light' ? COLORS_LIGHT : COLORS_DARK;
  const networkColor = theme === 'light' ? '#0f172a' : '#FFFFFF';

  useEffect(() => {
    const mediaQueryMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mediaQueryMotion.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mediaQueryMotion.addEventListener('change', handleMotionChange);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      mediaQueryMotion.removeEventListener('change', handleMotionChange);
    };
  }, []);

  const config = isMobile ? CONFIG.mobile : CONFIG.desktop;

  const shapes = useMemo(() => {
    const items: ShapeProps[] = [];
    const addShapes = (count: number, type: 'box' | 'sphere' | 'torus', scaleRange: [number, number]) => {
      for (let i = 0; i < count; i++) {
        items.push({
          type,
          position: [(Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 10 - 5],
          color: currentPalette[Math.floor(Math.random() * currentPalette.length)],
          scale: Math.random() * (scaleRange[1] - scaleRange[0]) + scaleRange[0],
          reduceMotion: false
        });
      }
    };

    addShapes(config.shapesSphere, 'sphere', [0.2, 0.7]);
    addShapes(config.shapesBox, 'box', [0.3, 0.9]);
    addShapes(config.shapesTorus, 'torus', [0.3, 0.8]);

    return items;
  }, [config, currentPalette]);

  return (
    <div className="fixed inset-0 -z-10 bg-[var(--black-900)] transition-colors duration-300">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 60 }}
        dpr={config.dpr}
        gl={{
          antialias: !isMobile,
          alpha: true,
          powerPreference: "high-performance"
        }}
        frameloop={reduceMotion ? 'demand' : 'always'}
      >
        {!reduceMotion && <Environment preset={theme === 'light' ? 'studio' : 'night'} blur={0.8} />}
        {reduceMotion && <ambientLight intensity={0.5} />}

        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#D4AF37" />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color={theme === 'light' ? "#0f172a" : "#FFFFFF"} />

        <group>
          {shapes.map((shape, i) => (
            <Float
              key={i}
              speed={reduceMotion ? 0 : 1}
              rotationIntensity={reduceMotion ? 0 : 1}
              floatIntensity={reduceMotion ? 0 : 1}
            >
              <GeometricShape {...shape} reduceMotion={reduceMotion} />
            </Float>
          ))}
          <ParticleNetwork count={config.particles} reduceMotion={reduceMotion} color={networkColor} />
        </group>
      </Canvas>
    </div>
  );
};