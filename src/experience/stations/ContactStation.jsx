import { useState, useMemo } from 'react';
import * as THREE from 'three';
import { portfolioProfile } from '../../data/portfolioSource';

/* eslint-disable react/prop-types */
export default function ContactStation({ onInspect }) {
  const [hovered, setHovered] = useState(false);

  // Communications Terminal Display Canvas Texture
  const contactTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 640;
    canvas.height = 800;
    const ctx = canvas.getContext('2d');

    // High tech dark communication console look
    ctx.fillStyle = '#0f1118';
    ctx.fillRect(0, 0, 640, 800);

    // Header banner
    ctx.fillStyle = '#171a24';
    ctx.fillRect(0, 0, 640, 110);
    ctx.fillStyle = '#ff5722';
    ctx.font = 'bold 16px "Segoe UI", sans-serif';
    ctx.fillText('DIRECT COMMUNICATIONS & ENGAGEMENT', 32, 44);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 28px "Segoe UI", sans-serif';
    ctx.fillText("LET'S COLLABORATE", 32, 82);

    // Section 1: Direct Contact
    ctx.fillStyle = '#8f9fb6';
    ctx.font = 'bold 14px "Segoe UI", sans-serif';
    ctx.fillText('DIRECT CHANNELS', 32, 155);
    ctx.fillStyle = '#ff5722';
    ctx.fillRect(32, 164, 576, 2);

    // Email
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 17px "Segoe UI", sans-serif';
    ctx.fillText('📧 EMAIL:', 32, 205);
    ctx.fillStyle = '#90d7ae';
    ctx.font = '16px monospace';
    ctx.fillText(portfolioProfile.email, 160, 205);

    // Phone
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 17px "Segoe UI", sans-serif';
    ctx.fillText('📱 PHONE:', 32, 245);
    ctx.fillStyle = '#90d7ae';
    ctx.font = '16px monospace';
    ctx.fillText(portfolioProfile.phone, 160, 245);

    // Location
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 17px "Segoe UI", sans-serif';
    ctx.fillText('📍 LOCATION:', 32, 285);
    ctx.fillStyle = '#cfd7e6';
    ctx.font = '15px "Segoe UI", sans-serif';
    ctx.fillText('Gangoo, Pulwama, J&K (PIN: 192301)', 160, 285);

    // Section 2: Verified Profiles
    ctx.fillStyle = '#8f9fb6';
    ctx.font = 'bold 14px "Segoe UI", sans-serif';
    ctx.fillText('VERIFIED PROFILES & CODEBASES', 32, 360);
    ctx.fillStyle = '#339af0';
    ctx.fillRect(32, 368, 576, 2);

    const links = [
      { name: 'GitHub (41+ Repositories)', url: 'github.com/FARMAN9' },
      { name: 'Google Scholar (AI Research)', url: 'scholar.google.com' },
      { name: 'LinkedIn Professional Profile', url: 'linkedin.com/in/farman9' },
      { name: 'LeetCode Problem Solving', url: 'leetcode.com/saeedfarman9' }
    ];

    links.forEach((l, idx) => {
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 15px "Segoe UI", sans-serif';
      ctx.fillText(`• ${l.name}`, 32, 408 + idx * 44);
      ctx.fillStyle = '#83a5ff';
      ctx.font = '13px monospace';
      ctx.fillText(l.url, 380, 408 + idx * 44);
    });

    // Section 3: Availability Badge
    ctx.fillStyle = '#17221d';
    ctx.fillRect(32, 580, 576, 90);
    ctx.strokeStyle = '#2b8a3e';
    ctx.lineWidth = 1;
    ctx.strokeRect(32, 580, 576, 90);

    ctx.fillStyle = '#51cf66';
    ctx.font = 'bold 18px "Segoe UI", sans-serif';
    ctx.fillText('● AVAILABLE FOR HIRE & FULL-STACK ROLES', 52, 618);
    ctx.fillStyle = '#cfd7e6';
    ctx.font = '14px "Segoe UI", sans-serif';
    ctx.fillText('MERN Stack, Python/Django Engineering, React Native Mobile, & Applied ML', 52, 646);

    // Call to action button at bottom
    ctx.fillStyle = '#ff5722';
    ctx.fillRect(32, 715, 576, 52);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 16px "Segoe UI", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('CLICK TO OPEN DIRECT CONTACT & SEND MESSAGE', 320, 747);
    ctx.textAlign = 'start';

    const tex = new THREE.CanvasTexture(canvas);
    return tex;
  }, []);

  return (
    <group
      name="ContactStation"
      position={[3.1, 0, 3.1]}
      rotation={[0, -Math.PI / 4, 0]}
    >
      {/* 1. Architectural Dark Kiosk Column */}
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.7, 1.0, 0.5]} />
        <meshStandardMaterial
          color="#16181f"
          roughness={0.4}
          metalness={0.8}
        />
      </mesh>

      {/* Pedestal Base Ring */}
      <mesh position={[0, 0.02, 0]}>
        <boxGeometry args={[0.82, 0.04, 0.62]} />
        <meshStandardMaterial color="#0f1014" roughness={0.7} />
      </mesh>

      {/* Glowing Edge Accent */}
      <mesh position={[0, 1.01, 0]}>
        <boxGeometry args={[0.72, 0.02, 0.52]} />
        <meshBasicMaterial color={hovered ? '#ffffff' : '#ff5722'} />
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
        {/* Tablet Bezel */}
        <mesh castShadow>
          <boxGeometry args={[0.76, 0.94, 0.024]} />
          <meshStandardMaterial color="#1a1c24" metalness={0.85} roughness={0.2} />
        </mesh>

        {/* High Resolution Screen */}
        <mesh position={[0, 0, 0.014]}>
          <planeGeometry args={[0.72, 0.9]} />
          <meshBasicMaterial map={contactTexture} />
        </mesh>
      </group>

      {/* Terminal spotlight */}
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
