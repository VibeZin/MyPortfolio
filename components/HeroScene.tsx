import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera, Environment, Stars } from '@react-three/drei';
import * as THREE from 'three';

const FloatingShape = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      meshRef.current.rotation.x = time * 0.2;
      meshRef.current.rotation.y = time * 0.3;
      // Gentle pulsing scale
      const scale = 1 + Math.sin(time * 0.5) * 0.1;
      meshRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[2.5, 0]} />
        <meshStandardMaterial
          color="#3b82f6"
          roughness={0.1}
          metalness={0.8}
          wireframe={true}
          emissive="#ec4899"
          emissiveIntensity={0.2}
        />
      </mesh>
      <mesh>
         <icosahedronGeometry args={[2.3, 0]} />
         <meshStandardMaterial
          color="#0e0e17"
          roughness={0.2}
          metalness={1}
         />
      </mesh>
    </Float>
  );
};

export const HeroScene: React.FC = () => {
  return (
    <div className="w-full h-[400px] md:h-[600px] absolute top-0 left-0 -z-10 opacity-60 pointer-events-none md:pointer-events-auto">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} />
        <Environment preset="city" />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#ec4899" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#3b82f6" />
        <FloatingShape />
      </Canvas>
    </div>
  );
};