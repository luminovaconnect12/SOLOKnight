"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { heroScrollState } from "@/lib/scroll-state";

function ParticleField({ count = 2200 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 6 + Math.random() * 10;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.6;
      arr[i * 3 + 2] = radius * Math.cos(phi) - 4;
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    const speedBoost = 1 + heroScrollState.progress * 3.5;
    pointsRef.current.rotation.y += delta * 0.02 * speedBoost;
    pointsRef.current.rotation.x += delta * 0.004 * speedBoost;
    const s = 1 + heroScrollState.progress * 0.6;
    pointsRef.current.scale.setScalar(s);
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color="#6f8fff"
        transparent
        opacity={0.75}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function Shockwave() {
  const ref = useRef<THREE.Mesh>(null);
  const born = useRef(performance.now());

  useFrame(() => {
    if (!ref.current) return;
    const t = (performance.now() - born.current) / 1000;
    const duration = 2.2;
    const progress = Math.min(t / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const scale = 0.2 + eased * 7;
    ref.current.scale.setScalar(scale);
    const mat = ref.current.material as THREE.MeshBasicMaterial;
    mat.opacity = 0.9 * (1 - progress);
    ref.current.visible = progress < 1;
  });

  return (
    <mesh ref={ref} position={[1.6, -0.1, -1]} rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[0.98, 1.05, 64]} />
      <meshBasicMaterial color="#8fa6ff" transparent opacity={0.9} side={THREE.DoubleSide} />
    </mesh>
  );
}

function EnergyCore() {
  const group = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();

  useFrame((_, delta) => {
    const p = heroScrollState.progress;
    if (group.current) {
      const spin = 1 + p * 4;
      group.current.rotation.y += delta * 0.18 * spin;
      group.current.rotation.x += delta * 0.05 * spin;
      group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, 1.6 + pointer.x * 0.5, 0.03);
      group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, -0.1 + pointer.y * 0.3, 0.03);
      group.current.position.z = THREE.MathUtils.lerp(group.current.position.z, -1 - p * 3.5, 0.06);
      const coreScale = 1 + p * 1.8;
      group.current.scale.setScalar(coreScale);
    }
    if (inner.current) {
      inner.current.rotation.y -= delta * 0.3 * (1 + p * 3);
      const pulse = 1 + Math.sin(performance.now() * 0.0012) * 0.05 + p * 0.3;
      inner.current.scale.setScalar(pulse);
    }
  });

  return (
    <group ref={group} position={[1.6, -0.1, -1]}>
      <mesh ref={inner}>
        <icosahedronGeometry args={[1.05, 1]} />
        <meshBasicMaterial color="#3b5bff" transparent opacity={0.14} />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[1.15, 1]} />
        <meshBasicMaterial color="#8fa6ff" wireframe transparent opacity={0.55} />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[0.55, 0]} />
        <meshBasicMaterial color="#dfe6ff" wireframe transparent opacity={0.8} />
      </mesh>
      <pointLight color="#3b5bff" intensity={12} distance={6} />
      <Shockwave />
    </group>
  );
}

function CameraRig() {
  useFrame((state) => {
    const p = heroScrollState.progress;
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, 6 - p * 2.2, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, p * -0.6, 0.05);
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 6], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <ambientLight intensity={0.2} />
      <CameraRig />
      <ParticleField />
      <EnergyCore />
    </Canvas>
  );
}
