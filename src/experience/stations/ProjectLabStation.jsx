import { useState, useMemo } from 'react';
import * as THREE from 'three';
import { portfolioProjects } from '../../data/portfolioSource';

/* eslint-disable react/prop-types */
function ProjectScreen({ project, index, onSelect }) {
  const [hovered, setHovered] = useState(false);

  // Position 9 projects in a 3x3 gallery layout along the West Wall
  // Z coordinates: [-2.2, 0, 2.2], Y heights: [2.5, 1.7, 0.9], X = -5.1 (flush against west wall, angled 90 deg)
  const col = index % 3; // 0, 1, 2 (Z axis offset)
  const row = Math.floor(index / 3); // 0, 1, 2 (Y axis height)

  const posX = -5.18;
  const posY = 2.4 - row * 0.76;
  const posZ = -1.9 + col * 1.9;

  // Texture loader for actual project image
  const texture = useMemo(() => {
    const loader = new THREE.TextureLoader();
    const tex = loader.load(project.imageUrl);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, [project.imageUrl]);

  return (
    <group
      position={[posX, posY, posZ]}
      rotation={[0, Math.PI / 2, 0]}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(project);
      }}
      style={{ cursor: 'pointer' }}
    >
      {/* Sleek Beveled Frame */}
      <mesh position={[0, 0, -0.012]} castShadow>
        <boxGeometry args={[1.65, 0.68, 0.024]} />
        <meshStandardMaterial
          color={hovered ? '#ff5722' : '#171920'}
          metalness={0.8}
          roughness={0.25}
        />
      </mesh>

      {/* Screen Display with Real Project Screenshot */}
      <mesh position={[0, 0, 0.005]}>
        <planeGeometry args={[1.6, 0.64]} />
        <meshBasicMaterial map={texture} />
      </mesh>

      {/* Glass overlay */}
      <mesh position={[0, 0, 0.009]}>
        <planeGeometry args={[1.6, 0.64]} />
        <meshPhysicalMaterial
          color="#000000"
          transparent
          opacity={hovered ? 0.02 : 0.12}
          roughness={0.1}
          metalness={0.2}
        />
      </mesh>

      {/* Bottom Title Bar Badge */}
      <mesh position={[0, -0.27, 0.012]}>
        <planeGeometry args={[1.56, 0.08]} />
        <meshBasicMaterial color="#0b0d13" opacity={0.92} transparent />
      </mesh>

      {/* Glowing Accent Line */}
      <mesh position={[0, -0.31, 0.013]}>
        <planeGeometry args={[1.56, 0.008]} />
        <meshBasicMaterial color={hovered ? '#ff5722' : '#339af0'} />
      </mesh>
    </group>
  );
}

export default function ProjectLabStation({ onSelectProject }) {
  return (
    <group name="ProjectLabStation">
      {/* Architectural Wall Backing Panel */}
      <mesh position={[-5.24, 1.7, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[6.2, 2.7, 0.05]} />
        <meshStandardMaterial color="#0f1116" roughness={0.7} metalness={0.3} />
      </mesh>

      {/* Neon/LED Header Ribbon */}
      <mesh position={[-5.2, 3.12, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[6.0, 0.03]} />
        <meshBasicMaterial color="#ff5722" />
      </mesh>

      {/* All 9 Real Projects */}
      {portfolioProjects.map((project, idx) => (
        <ProjectScreen
          key={project.name}
          project={project}
          index={idx}
          onSelect={onSelectProject}
        />
      ))}

      {/* Subtle floor spotlight under project wall */}
      <pointLight position={[-4.5, 0.4, 0]} color="#ff7043" intensity={0.6} distance={4} />
    </group>
  );
}
