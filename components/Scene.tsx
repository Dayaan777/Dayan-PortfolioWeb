'use client';

import { Suspense, useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Helper to get CSS variable value safely
function useThemeColors() {
  const [colors, setColors] = useState({
    background: '#0a0a0a',
    accent: 'hsl(338, 50%, 24%)',
    accentHover: 'hsl(338, 46%, 35%)'
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const style = getComputedStyle(document.documentElement);
    const getHsl = (varName: string) => `hsl(${style.getPropertyValue(varName).trim()})`;
    
    setColors({
      background: getHsl('--background'),
      accent: getHsl('--accent'),
      accentHover: getHsl('--accent-hover')
    });
  }, []);

  return colors;
}

function CrystalShape({ colors }: { colors: ReturnType<typeof useThemeColors> }) {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.getElapsedTime();
    mesh.current.rotation.x = Math.sin(t * 0.18) * 0.35;
    mesh.current.rotation.y = t * 0.12;
  });

  return (
    <Float speed={1.1} rotationIntensity={0.25} floatIntensity={0.9}>
      <mesh ref={mesh}>
        <icosahedronGeometry args={[1.7, 0]} />
        <MeshTransmissionMaterial
          transmission={0.96}
          thickness={1.4}
          roughness={0.05}
          ior={1.3}
          chromaticAberration={0.18}
          anisotropy={0.3}
          distortion={0.25}
          distortionScale={0.3}
          temporalDistortion={0.1}
          color={colors.accent}
          attenuationColor={colors.accentHover}
          attenuationDistance={1.5}
          background={new THREE.Color(colors.background)}
        />
      </mesh>
    </Float>
  );
}

function GlassKnot({ colors }: { colors: ReturnType<typeof useThemeColors> }) {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.x = state.clock.getElapsedTime() * 0.06;
    mesh.current.rotation.z = state.clock.getElapsedTime() * 0.04;
  });
  return (
    <Float speed={0.7} rotationIntensity={0.2} floatIntensity={1.1}>
      <mesh ref={mesh} scale={0.62} position={[-2.9, 1.3, -1.5]}>
        <torusKnotGeometry args={[0.8, 0.26, 180, 28]} />
        <meshStandardMaterial
          color={colors.accentHover}
          metalness={0.85}
          roughness={0.18}
          envMapIntensity={0.9}
        />
      </mesh>
    </Float>
  );
}

function FloatingParticle({ index, colors }: { index: number, colors: ReturnType<typeof useThemeColors> }) {
  const ref = useRef<THREE.Mesh>(null);
  const seed = useMemo(() => Math.random() * Math.PI * 2, []);
  const config = useMemo(() => {
    return {
      x: (Math.random() - 0.5) * 18,
      y: (Math.random() - 0.5) * 10,
      z: (Math.random() - 0.5) * 8 - 2,
      scale: Math.random() * 0.025 + 0.008,
      speed: Math.random() * 0.3 + 0.1,
    };
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.position.y = config.y + Math.sin(t * config.speed + seed) * 0.6;
    ref.current.position.x = config.x + Math.cos(t * config.speed * 0.7 + seed) * 0.4;
  });

  return (
    <mesh ref={ref} position={[config.x, config.y, config.z]} scale={config.scale}>
      <sphereGeometry args={[1, 12, 12]} />
      <meshBasicMaterial color={colors.accent} transparent opacity={0.55} />
    </mesh>
  );
}

function ParticleField({ count = 70, colors }: { count?: number, colors: ReturnType<typeof useThemeColors> }) {
  return (
    <group>
      {Array.from({ length: count }).map((_, i) => (
        <FloatingParticle key={i} index={i} colors={colors} />
      ))}
    </group>
  );
}

function Rig({ children }: { children: React.ReactNode }) {
  useFrame((state) => {
    const target = new THREE.Vector3();
    target.x = (state.pointer.x * 0.6 - state.camera.position.x) * 0.04;
    target.y = (state.pointer.y * 0.4 - state.camera.position.y) * 0.04;
    state.camera.position.x += (target.x - state.camera.position.x) * 0.04;
    state.camera.position.y += (target.y - state.camera.position.y) * 0.04;
    state.camera.lookAt(0, 0, 0);
  });
  return <>{children}</>;
}

export default function Scene() {
  const colors = useThemeColors();

  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 42 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ pointerEvents: 'none' }}
    >
      <color attach="background" args={[colors.background]} />
      <fog attach="fog" args={[colors.background, 8, 18]} />

      <ambientLight intensity={0.35} />
      <spotLight position={[6, 8, 6]} angle={0.3} intensity={2.2} color="#ffffff" penumbra={1} />
      <pointLight position={[-6, -4, -4]} intensity={1.4} color={colors.accent} />
      <pointLight position={[4, -6, 2]} intensity={0.8} color="#3E6B8E" />

      <Suspense fallback={null}>
        <Rig>
          <CrystalShape colors={colors} />
          <GlassKnot colors={colors} />
          <ParticleField count={60} colors={colors} />
        </Rig>
        <Environment preset="studio" />
      </Suspense>
    </Canvas>
  );
}
