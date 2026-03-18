import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { useRef } from "react";

// Simple 3D "stack globe" that reacts to scroll and can be clicked to jump to skills
function StackOrb({ scrollProgress }) {
  const group = useRef();

  useFrame(() => {
    if (!group.current) return;
    const t = scrollProgress.current;
    group.current.rotation.y += 0.01 + t * 0.02;
    group.current.rotation.x = -0.4 + t * 0.3;
  });

  const handleClick = () => {
    const el = document.getElementById("section-skills");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const ringRadius = 1.2;
  const ringCount = 3;
  const perRing = 8;

  const meshes = [];
  for (let r = 0; r < ringCount; r += 1) {
    const radius = ringRadius - r * 0.35;
    for (let i = 0; i < perRing; i += 1) {
      const angle = (i / perRing) * Math.PI * 2;
      const yOffset = -0.4 + r * 0.4;
      meshes.push(
        <mesh
          key={`${r}-${i}`}
          position={[Math.cos(angle) * radius, yOffset, Math.sin(angle) * radius]}
          onClick={handleClick}
        >
          <boxGeometry args={[0.3, 0.18, 0.08]} />
          <meshStandardMaterial
            color={r === 0 ? "#22d3ee" : r === 1 ? "#a855f7" : "#22c55e"}
            emissive={r === 0 ? "#22d3ee" : r === 1 ? "#a855f7" : "#22c55e"}
            emissiveIntensity={0.6}
            roughness={0.25}
            metalness={0.5}
          />
        </mesh>
      );
    }
  }

  return <group ref={group}>{meshes}</group>;
}

export function LaptopScene({ scrollProgress }) {
  return (
    <Canvas
      camera={{ position: [0, 0.6, 3.2], fov: 45 }}
      style={{ width: "100%", height: "100%" }}
      dpr={[1, 1.5]}
    >
      <color attach="background" args={["#f8fafc"]} />
      <ambientLight intensity={0.9} />
      <directionalLight position={[3, 5, 2]} intensity={1.15} color="#ffffff" />
      <directionalLight position={[-4, -3, -2]} intensity={0.55} color="#06b6d4" />
      <Environment preset="city" />
      <StackOrb scrollProgress={scrollProgress} />
    </Canvas>
  );
}