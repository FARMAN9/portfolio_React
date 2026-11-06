import { useState, useMemo } from 'react';
import * as THREE from 'three';
import { portfolioSkills } from '../../data/portfolioSource';

/* eslint-disable react/prop-types */
function SkillBadge({ skill, index, onSelect }) {
  const [hovered, setHovered] = useState(false);

  // Position on East Wall (X = 5.18)
  // 8 skills arranged in 2 columns x 4 rows
  const col = index % 2; // 0, 1 (Z axis offset)
  const row = Math.floor(index / 2); // 0, 1, 2, 3 (Y axis height)

  const posX = 5.18;
  const posY = 2.4 - row * 0.52;
  const posZ = -1.2 + col * 2.4;

  const barWidth = (1.4 * skill.value) / 100;

  // Color mapping based on technology
  const skillColor = useMemo(() => {
    switch (skill.name) {
      case 'Python': return '#3776AB';
      case 'React': return '#61DAFB';
      case 'React Native': return '#00D8FF';
      case 'JavaScript': return '#F7DF1E';
      case 'Django': return '#092E20';
      case 'Node.js / MERN': return '#339933';
      case 'HTML / CSS': return '#E34F26';
      case 'Machine Learning': return '#FF6F00';
      default: return '#ff5722';
    }
  }, [skill.name]);

  // Procedural canvas label texture
  const labelTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#11141c';
    ctx.fillRect(0, 0, 512, 128);

    // Border
    ctx.strokeStyle = skillColor;
    ctx.lineWidth = 4;
    ctx.strokeRect(4, 4, 504, 120);

    // Tech Name
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 36px "Segoe UI", sans-serif';
    ctx.fillText(skill.name, 28, 56);

    // Percentage
    ctx.fillStyle = skillColor;
    ctx.font = 'bold 36px monospace';
    ctx.fillText(`${skill.value}%`, 400, 56);

    // Level indicator
    ctx.fillStyle = '#8f9fb6';
    ctx.font = '22px sans-serif';
    const levelStr = skill.value >= 80 ? 'EXPERT' : skill.value >= 65 ? 'PROFICIENT' : 'PRACTICED';
    ctx.fillText(levelStr, 28, 98);

    const tex = new THREE.CanvasTexture(canvas);
    return tex;
  }, [skill.name, skill.value, skillColor]);

  return (
    <group
      position={[posX, posY, posZ]}
      rotation={[0, -Math.PI / 2, 0]}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(skill);
      }}
      style={{ cursor: 'pointer' }}
    >
      {/* Background Frame */}
      <mesh position={[0, 0, -0.012]} castShadow>
        <boxGeometry args={[2.0, 0.44, 0.024]} />
        <meshStandardMaterial
          color={hovered ? '#1e2433' : '#11131a'}
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>

      {/* Label plane */}
      <mesh position={[0, 0.04, 0.005]}>
        <planeGeometry args={[1.9, 0.32]} />
        <meshBasicMaterial map={labelTexture} />
      </mesh>

      {/* 3D Progress Bar Track */}
      <mesh position={[0, -0.16, 0.008]}>
        <planeGeometry args={[1.86, 0.03]} />
        <meshBasicMaterial color="#1b202c" />
      </mesh>

      {/* 3D Progress Bar Fill */}
      <mesh position={[-0.93 + barWidth / 2, -0.16, 0.01]}>
        <planeGeometry args={[barWidth, 0.03]} />
        <meshBasicMaterial color={hovered ? '#ffffff' : skillColor} />
      </mesh>
    </group>
  );
}

export default function SkillsWallStation({ onSelectSkill }) {
  return (
    <group name="SkillsWallStation">
      {/* Architectural Wall Backing Panel on East Wall */}
      <mesh position={[5.24, 1.7, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <boxGeometry args={[5.8, 2.7, 0.05]} />
        <meshStandardMaterial color="#252832" roughness={0.5} metalness={0.2} />
      </mesh>

      {/* Neon/LED Header Ribbon */}
      <mesh position={[5.2, 3.12, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[5.6, 0.03]} />
        <meshBasicMaterial color="#339af0" />
      </mesh>

      {/* Skills Badges */}
      {portfolioSkills.map((skill, idx) => (
        <SkillBadge
          key={skill.name}
          skill={skill}
          index={idx}
          onSelect={onSelectSkill}
        />
      ))}

      {/* Subtle floor spotlight under skills wall */}
      <pointLight position={[4.5, 0.4, 0]} color="#339af0" intensity={0.6} distance={4} />
    </group>
  );
}

