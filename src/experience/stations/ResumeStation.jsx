import { useState, useMemo } from 'react';
import * as THREE from 'three';
import { portfolioProfile } from '../../data/portfolioSource';

/* eslint-disable react/prop-types */
export default function ResumeStation({ onInspect }) {
  const [hovered, setHovered] = useState(false);

  // Resume Document Display Canvas Texture
  const resumeTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 640;
    canvas.height = 800;
    const ctx = canvas.getContext('2d');

    // Clean white/charcoal editorial document look
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, 640, 800);

    // Header banner
    ctx.fillStyle = '#181a20';
    ctx.fillRect(0, 0, 640, 110);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 30px "Segoe UI", sans-serif';
    ctx.fillText(portfolioProfile.name.toUpperCase(), 32, 54);
    ctx.fillStyle = '#ff5722';
    ctx.font = 'bold 16px "Segoe UI", sans-serif';
    ctx.fillText('FULL-STACK MERN, REACT NATIVE & PYTHON ENGINEER', 32, 86);

    // Section 1: Education & Research
    ctx.fillStyle = '#111317';
    ctx.font = 'bold 18px "Segoe UI", sans-serif';
    ctx.fillText('ACADEMIC & RESEARCH FOUNDATIONS', 32, 160);
    ctx.fillStyle = '#ff5722';
    ctx.fillRect(32, 168, 576, 2);

    ctx.fillStyle = '#333742';
    ctx.font = '14px "Segoe UI", sans-serif';
    portfolioProfile.education.forEach((edu, idx) => {
      ctx.fillStyle = '#111317';
      ctx.font = 'bold 15px "Segoe UI", sans-serif';
      ctx.fillText(`• ${edu.institution}`, 32, 200 + idx * 46);
      ctx.fillStyle = '#555b6d';
      ctx.font = '13px "Segoe UI", sans-serif';
      ctx.fillText(edu.detail, 48, 218 + idx * 46);
    });

    // Section 2: Key Experience
    ctx.fillStyle = '#111317';
    ctx.font = 'bold 18px "Segoe UI", sans-serif';
    ctx.fillText('EXPERIENCE & VERIFIED MILESTONES', 32, 360);
    ctx.fillStyle = '#ff5722';
    ctx.fillRect(32, 368, 576, 2);

    portfolioProfile.resumeHighlights.forEach((hl, idx) => {
      ctx.fillStyle = '#222530';
      ctx.font = '14px "Segoe UI", sans-serif';
      ctx.fillText(`✓ ${hl}`, 32, 400 + idx * 30);
    });

    // Section 3: Publications & Honors
    ctx.fillStyle = '#111317';
    ctx.font = 'bold 18px "Segoe UI", sans-serif';
    ctx.fillText('RESEARCH PUBLICATIONS & RECOGNITION', 32, 600);
    ctx.fillStyle = '#ff5722';
    ctx.fillRect(32, 608, 576, 2);

    ctx.fillStyle = '#333742';
    ctx.font = 'bold 14px "Segoe UI", sans-serif';
    ctx.fillText('Google Scholar / SSRN Research Paper (2024)', 32, 638);
    ctx.fillStyle = '#555b6d';
    ctx.font = '13px "Segoe UI", sans-serif';
    ctx.fillText('Digital Auscultation & ML Phenotyping at SKUAST-Kashmir', 32, 658);

    ctx.fillStyle = '#333742';
    ctx.font = 'bold 14px "Segoe UI", sans-serif';
    ctx.fillText('CID Srinagar Internship Honors (2024)', 32, 694);

    // Call to action button at bottom
    ctx.fillStyle = '#ff5722';
    ctx.fillRect(32, 730, 576, 48);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 16px "Segoe UI", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('CLICK TO OPEN & DOWNLOAD FULL CV (PDF)', 320, 760);
    ctx.textAlign = 'start';

    const tex = new THREE.CanvasTexture(canvas);
    return tex;
  }, []);

  return (
    <group
      name="ResumeStation"
      position={[-3.1, 0, 3.1]}
      rotation={[0, Math.PI / 4, 0]}
    >
      {/* 1. Architectural Dark Pedestal Column */}
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.7, 1.0, 0.5]} />
        <meshStandardMaterial
          color="#282b36"
          roughness={0.4}
          metalness={0.6}
        />
      </mesh>

      {/* Pedestal Base Ring */}
      <mesh position={[0, 0.02, 0]}>
        <boxGeometry args={[0.82, 0.04, 0.62]} />
        <meshStandardMaterial color="#0f1014" roughness={0.7} />
      </mesh>

      {/* Glowing Pedestal Top Edge Accent */}
      <mesh position={[0, 1.01, 0]}>
        <boxGeometry args={[0.72, 0.02, 0.52]} />
        <meshBasicMaterial color={hovered ? '#ff5722' : '#fcc419'} />
      </mesh>

      {/* 2. Angled Sloped Presentation Tablet */}
      <group
        position={[0, 1.06, 0.02]}
        rotation={[-0.45, 0, 0]}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => setHovered(false)}
        onClick={(e) => {
          e.stopPropagation();
          onInspect();
        }}
        style={{ cursor: 'pointer' }}
      >
        {/* Tablet Bezel Chassis */}
        <mesh castShadow>
          <boxGeometry args={[0.76, 0.94, 0.024]} />
          <meshStandardMaterial color="#1a1c24" metalness={0.85} roughness={0.2} />
        </mesh>

        {/* High Resolution Document Screen */}
        <mesh position={[0, 0, 0.014]}>
          <planeGeometry args={[0.72, 0.9]} />
          <meshBasicMaterial map={resumeTexture} />
        </mesh>
      </group>

      {/* Podium spotlight */}
      <spotLight
        position={[0, 2.6, 0.2]}
        target-position={[0, 1.0, 0]}
        color="#ffeedb"
        intensity={1.8}
        angle={0.5}
        penumbra={0.6}
        distance={3.5}
      />
    </group>
  );
}

