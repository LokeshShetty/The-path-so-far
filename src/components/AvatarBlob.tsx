import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";
import { useInViewFrameloop } from "../hooks/useInViewFrameloop";

function Blob() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.y = t * 0.25;
    ref.current.rotation.x = Math.sin(t * 0.4) * 0.3;
  });
  return (
    <Float speed={1.6} rotationIntensity={0.8} floatIntensity={1.6}>
      <mesh ref={ref}>
        <icosahedronGeometry args={[1.4, 16]} />
        <MeshDistortMaterial
          color="#A855F7"
          emissive="#6366F1"
          emissiveIntensity={0.4}
          roughness={0.2}
          metalness={0.9}
          distort={0.55}
          speed={2}
        />
      </mesh>
    </Float>
  );
}

export default function AvatarBlob() {
  const { ref, frameloop } = useInViewFrameloop<HTMLDivElement>(0.05);

  return (
    <div ref={ref} className="absolute inset-0">
      <Canvas
        dpr={[1, 1.25]}
        camera={{ position: [0, 0, 4], fov: 50 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        frameloop={frameloop}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <pointLight position={[3, 3, 3]} intensity={1.4} color="#A855F7" />
          <pointLight position={[-3, -2, 3]} intensity={1} color="#6366F1" />
          <Blob />
          <Sparkles count={50} scale={[5, 5, 4]} size={2} speed={0.4} color="#C4B5FD" opacity={0.7} />
        </Suspense>
      </Canvas>
    </div>
  );
}
