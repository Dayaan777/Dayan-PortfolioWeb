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

function GlassKnot({ colors, transparent = false }: { colors: ReturnType<typeof useThemeColors>; transparent?: boolean }) {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.getElapsedTime();
    mesh.current.rotation.x = t * 0.12 + state.pointer.y * 0.35;
    mesh.current.rotation.y = t * 0.16 + state.pointer.x * 0.45;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.35} floatIntensity={0.7}>
      <mesh
        ref={mesh}
        scale={transparent ? 0.95 : 0.62}
        position={transparent ? [0, 0, 0] : [-2.9, 1.3, -1.5]}
      >
        <torusKnotGeometry args={[1.0, 0.32, 200, 32]} />
        {transparent ? (
          <MeshTransmissionMaterial
            transmission={0.92}
            thickness={1.8}
            roughness={0.06}
            ior={1.4}
            chromaticAberration={0.3}
            anisotropy={0.35}
            distortion={0.2}
            distortionScale={0.3}
            temporalDistortion={0.1}
            color="#f0f0f0"
            attenuationColor="#111111"
            attenuationDistance={2}
          />
        ) : (
          <meshStandardMaterial
            color={colors.accentHover}
            metalness={0.85}
            roughness={0.18}
            envMapIntensity={0.9}
          />
        )}
      </mesh>
    </Float>
  );
}

function FloatingParticle({ index, colors }: { index: number; colors: ReturnType<typeof useThemeColors> }) {
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

function ParticleField({ count = 70, colors }: { count?: number; colors: ReturnType<typeof useThemeColors> }) {
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
    const targetX = state.pointer.x * 0.75;
    const targetY = state.pointer.y * 0.5;
    state.camera.position.x += (targetX - state.camera.position.x) * 0.05;
    state.camera.position.y += (targetY - state.camera.position.y) * 0.05;
    state.camera.lookAt(0, 0, 0);
  });
  return <>{children}</>;
}

export default function Scene({ transparent = false }: { transparent?: boolean }) {
  const colors = useThemeColors();

  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 42 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      eventSource={typeof window !== 'undefined' ? document.body : undefined}
      eventPrefix="client"
      style={{ pointerEvents: 'none' }}
    >
      {!transparent && <color attach="background" args={[colors.background]} />}
      {!transparent && <fog attach="fog" args={[colors.background, 8, 18]} />}

      <ambientLight intensity={transparent ? 0.7 : 0.35} />
      <spotLight position={[6, 8, 6]} angle={0.3} intensity={transparent ? 3.0 : 2.2} color="#ffffff" penumbra={1} />
      <pointLight position={[-6, -4, -4]} intensity={transparent ? 1.8 : 1.4} color={transparent ? '#ffffff' : colors.accent} />
      <pointLight position={[4, -6, 2]} intensity={0.8} color="#3E6B8E" />

      <Suspense fallback={null}>
        <Rig>
          {!transparent && <CrystalShape colors={colors} />}
          <GlassKnot colors={colors} transparent={transparent} />
          {!transparent && <ParticleField count={60} colors={colors} />}
        </Rig>
        <Environment preset="studio" />
      </Suspense>
    </Canvas>
  );
}
