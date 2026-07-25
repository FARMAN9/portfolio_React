import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Html, useProgress } from '@react-three/drei';

function CanvasLoader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="three-loader-container">
        <div className="three-loader-spinner"></div>
        <div className="three-loader-text">{Math.max(1, progress).toFixed(0)}% Loading</div>
      </div>
    </Html>
  );
}

function AnimatedSphere() {
  const sphereRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (sphereRef.current) {
      sphereRef.current.position.y = Math.sin(t / 1.5) * 0.2;
      sphereRef.current.rotation.x = t * 0.3;
      sphereRef.current.rotation.y = t * 0.4;
    }
  });

  return (
    <Sphere ref={sphereRef} visible args={[1, 64, 128]} scale={1.8}>
      <MeshDistortMaterial
        color="#9fe7d7"
        attach="material"
        distort={0.32}
        speed={1.15}
        roughness={0.28}
        metalness={0.62}
        clearcoat={1}
        clearcoatRoughness={0.1}
      />
    </Sphere>
  );
}

export default function HeroModel() {
  return (
    <div className="hero-model-canvas">
      <Canvas camera={{ position: [0, 0, 4] }} dpr={[1, 1.5]} gl={{ antialias: true, powerPreference: 'high-performance' }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} color="#f4c76b" intensity={1.6} />
        <Suspense fallback={<CanvasLoader />}>
          <AnimatedSphere />
        </Suspense>
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
      </Canvas>
    </div>
  );
}
