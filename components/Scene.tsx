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

// Synchronous procedural black-and-white barber-pole / zebra diagonal striped texture
function createStripedTexture() {
  const width = 512;
  const height = 512;
  const size = width * height;
  const data = new Uint8Array(4 * size);

  const stripePeriod = 64; // Period of stripe cycle (black + white)
  const halfPeriod = 32;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      // Spiral coordinate along the tube surface
      const coord = ((x + y * 1.8) % stripePeriod + stripePeriod) % stripePeriod;

      // Anti-aliased 2px transition between black and white
      let t = 0;
      if (coord < halfPeriod) {
        t = Math.min(1, Math.max(0, coord / 2));
      } else {
        t = 1 - Math.min(1, Math.max(0, (coord - halfPeriod) / 2));
      }

      // High-contrast: 10 = deep obsidian black, 255 = crisp brilliant white
      const val = Math.round(10 + t * (255 - 10));
      data[idx] = val;
      data[idx + 1] = val;
      data[idx + 2] = val;
      data[idx + 3] = 255;
    }
  }

  const texture = new THREE.DataTexture(data, width, height, THREE.RGBAFormat);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(6, 1);
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.needsUpdate = true;
  return texture;
}

function GlassKnot({ colors, transparent = false }: { colors: ReturnType<typeof useThemeColors>; transparent?: boolean }) {
  const group = useRef<THREE.Group>(null);
  const stripedTexture = useMemo(() => (transparent ? createStripedTexture() : null), [transparent]);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    group.current.rotation.x = t * 0.08 + state.pointer.y * 0.2;
    group.current.rotation.y = t * 0.12 + state.pointer.x * 0.28;
  });

  return (
    <Float speed={1.1} rotationIntensity={0.2} floatIntensity={0.4}>
      <group
        ref={group}
        scale={transparent ? 0.72 : 0.62}
        position={transparent ? [0, 0, 0] : [-2.9, 1.3, -1.5]}
      >
        {transparent ? (
          <>
            {/* Core knot with bold black-and-white barber-pole striped pattern */}
            <mesh>
              <torusKnotGeometry args={[0.74, 0.19, 240, 36, 2, 3]} />
              <meshPhysicalMaterial
                map={stripedTexture ?? undefined}
                roughness={0.12}
                metalness={0.08}
                clearcoat={1.0}
                clearcoatRoughness={0.04}
                transmission={0.25}
                thickness={1.2}
                ior={1.5}
                envMapIntensity={2.0}
              />
            </mesh>

            {/* Outer clear/frosted glass envelope with chromatic edge fringing */}
            <mesh>
              <torusKnotGeometry args={[0.74, 0.23, 240, 36, 2, 3]} />
              <meshPhysicalMaterial
                transparent
                opacity={0.38}
                color="#ffffff"
                roughness={0.07}
                clearcoat={1.0}
                clearcoatRoughness={0.03}
                reflectivity={1.0}
                iridescence={0.9}
                iridescenceIOR={1.5}
                iridescenceThicknessRange={[180, 520]}
                envMapIntensity={2.6}
              />
            </mesh>
          </>
        ) : (
          <mesh>
            <torusKnotGeometry args={[0.8, 0.26, 180, 28]} />
            <meshStandardMaterial
              color={colors.accentHover}
              metalness={0.85}
              roughness={0.18}
              envMapIntensity={0.9}
            />
          </mesh>
        )}
      </group>
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

      {transparent ? (
        <>
          <ambientLight intensity={0.75} />
          {/* Crisp specular highlights */}
          <directionalLight position={[5, 8, 6]} intensity={2.0} color="#ffffff" />
          <directionalLight position={[-5, -4, -3]} intensity={1.0} color="#ffffff" />
          {/* Subtle warm amber rim accent */}
          <pointLight position={[-4.5, 3.5, 2.5]} intensity={1.8} color="#f59e0b" distance={12} />
          {/* Subtle cool azure rim accent */}
          <pointLight position={[4.5, -3.5, 2.2]} intensity={1.6} color="#06b6d4" distance={12} />
        </>
      ) : (
        <>
          <ambientLight intensity={0.35} />
          <spotLight position={[6, 8, 6]} angle={0.3} intensity={2.2} color="#ffffff" penumbra={1} />
          <pointLight position={[-6, -4, -4]} intensity={1.4} color={colors.accent} />
          <pointLight position={[4, -6, 2]} intensity={0.8} color="#3E6B8E" />
        </>
      )}

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
