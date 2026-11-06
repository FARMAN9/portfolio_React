import { useState, useMemo } from 'react';
import * as THREE from 'three';
import { portfolioProfile } from '../../data/portfolioSource';

/* eslint-disable react/prop-types */
export default function WelcomeStation({ onInspect }) {
  const [hovered, setHovered] = useState(false);

  // Welcome Console Canvas Texture
  const welcomeTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 640;
    canvas.height = 800;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#0f1118';
    ctx.fillRect(0, 0, 640, 800);

    // Header banner
    ctx.fillStyle = '#171a24';
    ctx.fillRect(0, 0, 640, 110);
    ctx.fillStyle = '#ff5722';
    ctx.font = 'bold 15px "Segoe UI", sans-serif';
    ctx.fillText('PHOTOREALISTIC 3D STUDIO & WEBXR VR', 32, 44);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 28px "Segoe UI", sans-serif';
    ctx.fillText(portfolioProfile.name.toUpperCase(), 32, 82);

    // Bio paragraph
    ctx.fillStyle = '#cfd7e6';
    ctx.font = '16px "Segoe UI", sans-serif';
    ctx.fillText('Welcome to my interactive spatial developer studio.', 32, 160);
    ctx.fillText('Explore my professional workstation, inspect live production', 32, 188);
    ctx.fillText('projects, examine technical skills, and download my CV.', 32, 216);

    // Navigation Guide
    ctx.fillStyle = '#ff5722';
    ctx.fillRect(32, 260, 576, 2);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 16px "Segoe UI", sans-serif';
    ctx.fillText('SPATIAL DESTINATIONS & STATIONS', 32, 295);

    const stations = [
      { num: '01', name: 'Executive Workstation', desc: 'Dual monitors, IDE code, and full bio' },
      { num: '02', name: 'Project Laboratory', desc: '9 real production web & ML applications' },
      { num: '03', name: 'Technical Skills Wall', desc: 'MERN, Python, Django, ML, React Native' },
      { num: '04', name: 'Credentials & Resume', desc: 'SKUAST, NIT, CID Srinagar, Download CV' },
      { num: '05', name: 'Direct Communications', desc: 'Email, phone, and working contact form' }
    ];

    stations.forEach((s, idx) => {
      const y = 340 + idx * 64;
      ctx.fillStyle = '#191d29';
      ctx.fillRect(32, y - 22, 576, 52);
      ctx.fillStyle = '#ff5722';
      ctx.font = 'bold 18px monospace';
      ctx.fillText(s.num, 48, y + 12);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 16px "Segoe UI", sans-serif';
      ctx.fillText(s.name, 96, y + 2);
      ctx.fillStyle = '#8f9fb6';
      ctx.font = '13px "Segoe UI", sans-serif';
      ctx.fillText(s.desc, 96, y + 22);
    });

    // Instructions pill
    ctx.fillStyle = '#1e2433';
    ctx.fillRect(32, 680, 576, 80);
    ctx.fillStyle = '#51cf66';
    ctx.font = 'bold 15px "Segoe UI", sans-serif';
    ctx.fillText('NAVIGATION CONTROLS', 52, 712);
    ctx.fillStyle = '#cfd7e6';
    ctx.font = '14px "Segoe UI", sans-serif';
    ctx.fillText('Desktop: WASD to Walk • Mouse to Look • Click to Inspect', 52, 738);

    const tex = new THREE.CanvasTexture(canvas);
    return tex;
  }, []);

  return (
    <group
      name="WelcomeStation"
      position={[0, 0, 4.4]}
      rotation={[0, Math.PI, 0]}
    >
      {/* Sleek Low Totem Pedestal */}
      <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.8, 0.9, 0.36]} />
        <meshStandardMaterial color="#16181f" roughness={0.4} metalness={0.8} />
      </mesh>

      {/* Top Edge Glow */}
      <mesh position={[0, 0.91, 0]}>
        <boxGeometry args={[0.82, 0.02, 0.38]} />
        <meshBasicMaterial color={hovered ? '#ff5722' : '#339af0'} />
      </mesh>

      {/* Angled Touch Console */}
      <group
        position={[0, 0.96, 0]}
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
        <mesh castShadow>
          <boxGeometry args={[0.76, 0.94, 0.024]} />
          <meshStandardMaterial color="#1a1c24" metalness={0.85} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0, 0.014]}>
          <planeGeometry args={[0.72, 0.9]} />
          <meshBasicMaterial map={welcomeTexture} />
        </mesh>
      </group>

      {/* Welcome spotlight */}
      <spotLight
        position={[0, 2.4, 0.2]}
        target-position={[0, 0.8, 0]}
        color="#ffeedb"
        intensity={1.6}
        angle={0.5}
        penumbra={0.6}
        distance={3.5}
      />
    </group>
  );
}
