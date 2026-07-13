import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Html, useProgress } from '@react-three/drei';

function CanvasLoader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="three-loader-container">
        <div className="three-loader-spinner"></div>
        <div className="three-loader-text">{progress.toFixed(0)}% Loading</div>
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
    <Sphere ref={sphereRef} visible args={[1, 100, 200]} scale={1.8}>
      <MeshDistortMaterial
        color="#b415ff"
        attach="material"
        distort={0.4}
        speed={1.5}
        roughness={0.2}
        metalness={0.8}
        clearcoat={1}
        clearcoatRoughness={0.1}
      />
    </Sphere>
  );
}

export default function ThreeModel() {
  return (
    <div style={{ height: '500px', width: '500px', cursor: 'grab', position: 'relative', zIndex: 0 }}>
      <Canvas camera={{ position: [0, 0, 4] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} color="#df8908" intensity={2} />
        <Suspense fallback={<CanvasLoader />}>
          <AnimatedSphere />
        </Suspense>
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
      </Canvas>
    </div>
  );
}
