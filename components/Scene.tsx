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

// Helper to generate high-contrast barber-pole / zebra diagonal striped texture
function useStripedTexture() {
  return useMemo(() => {
    if (typeof document === 'undefined') return null;
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    // Crisp white base
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, 1024, 512);

    // Bold deep black diagonal barber-pole stripes
    ctx.fillStyle = '#080808';
    const stripeWidth = 56;
    const gap = 56;
    const total = stripeWidth + gap;

    for (let x = -512; x < 1536; x += total) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x + 512, 512);
      ctx.lineTo(x + 512 + stripeWidth, 512);
      ctx.lineTo(x + stripeWidth, 0);
      ctx.closePath();
      ctx.fill();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(5, 1);
    texture.needsUpdate = true;
    return texture;
  }, []);
}

function GlassKnot({ colors, transparent = false }: { colors: ReturnType<typeof useThemeColors>; transparent?: boolean }) {
  const group = useRef<THREE.Group>(null);
  const stripedTexture = useStripedTexture();

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
            {/* Inner core: bold black-and-white barber-pole striped pattern */}
            {stripedTexture && (
              <mesh renderOrder={1}>
                <torusKnotGeometry args={[0.74, 0.16, 240, 36, 2, 3]} />
                <meshStandardMaterial
                  map={stripedTexture}
                  roughness={0.25}
                  metalness={0.05}
                />
              </mesh>
            )}

            {/* Outer shell: clear/frosted glass transmission with refraction and chromatic dispersion */}
            <mesh renderOrder={2}>
              <torusKnotGeometry args={[0.74, 0.22, 240, 36, 2, 3]} />
              <MeshTransmissionMaterial
                transmission={0.93}
                thickness={1.3}
                roughness={0.11}
                ior={1.52}
                chromaticAberration={0.48}
                anisotropy={0.25}
                distortion={0.14}
                distortionScale={0.22}
                temporalDistortion={0.05}
                color="#ffffff"
                attenuationColor="#fef8ee"
                attenuationDistance={3.5}
                background={new THREE.Color('#ebeae7')}
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
