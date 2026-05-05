import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";
import { useInViewFrameloop } from "../hooks/useInViewFrameloop";

function DistortedSphere() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock, mouse }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.x = mouse.y * 0.25 + Math.sin(t * 0.3) * 0.1;
    ref.current.rotation.y = mouse.x * 0.35 + t * 0.12;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.6} floatIntensity={1.4}>
      <mesh ref={ref} scale={1.65}>
        <icosahedronGeometry args={[1, 32]} />
        <MeshDistortMaterial
          color="#A855F7"
          emissive="#6366F1"
          emissiveIntensity={0.35}
          roughness={0.18}
          metalness={0.85}
          distort={0.45}
          speed={1.6}
        />
      </mesh>
    </Float>
  );
}

export default function HeroScene() {
  const { ref, frameloop } = useInViewFrameloop<HTMLDivElement>();

  return (
    <div ref={ref} className="absolute inset-0">
      <Canvas
        dpr={[1, 1.25]}
        camera={{ position: [0, 0, 4.2], fov: 50 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        frameloop={frameloop}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <pointLight position={[5, 5, 5]} intensity={1.4} color="#A855F7" />
          <pointLight position={[-5, -3, 4]} intensity={1.0} color="#6366F1" />

          <DistortedSphere />

          <Sparkles
            count={80}
            scale={[8, 5, 5]}
            size={2.4}
            speed={0.45}
            color="#C4B5FD"
            opacity={0.7}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
