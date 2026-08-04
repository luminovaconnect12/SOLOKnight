"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Core() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.08;
  });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1.4, 2]} />
      <meshBasicMaterial color="#3b5bff" wireframe transparent opacity={0.5} />
    </mesh>
  );
}

function OrbitRing({
  radius,
  tilt,
  speed,
  color = "#6f8fff",
}: {
  radius: number;
  tilt: [number, number, number];
  speed: number;
  color?: string;
}) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z += delta * speed;
  });

  return (
    <group rotation={tilt}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius, 0.006, 8, 128]} />
        <meshBasicMaterial color={color} transparent opacity={0.35} />
      </mesh>
      <group ref={ref}>
        <mesh position={[radius, 0, 0]}>
          <sphereGeometry args={[0.045, 12, 12]} />
          <meshBasicMaterial color="#dfe6ff" />
        </mesh>
      </group>
    </group>
  );
}

function Field({ count = 400 }: { count?: number }) {
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 4 + Math.random() * 6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#8890a6" transparent opacity={0.5} sizeAttenuation depthWrite={false} />
    </points>
  );
}

export function OrbitScene() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 1.2, 5], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <Field />
      <Core />
      <OrbitRing radius={2.1} tilt={[0.4, 0, 0.1]} speed={0.35} />
      <OrbitRing radius={2.6} tilt={[-0.3, 0.5, 0]} speed={-0.22} color="#3b5bff" />
      <OrbitRing radius={3.1} tilt={[0.15, -0.4, 0.3]} speed={0.15} />
    </Canvas>
  );
}
