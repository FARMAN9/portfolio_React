import * as THREE from 'three';

let cachedWoodDiffuse = null;
let cachedWoodRoughness = null;
let cachedSkyline = null;
let cachedWallDiffuse = null;
let cachedCodeScreen = null;
let cachedMetricsScreen = null;

/**
 * Procedural realistic hardwood floor texture.
 */
export function getWoodFloorTextures() {
  if (cachedWoodDiffuse && cachedWoodRoughness) {
    return { diffuse: cachedWoodDiffuse, roughness: cachedWoodRoughness };
  }

  const width = 1024;
  const height = 1024;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  // Base rich dark walnut wood
  ctx.fillStyle = '#1c1613';
  ctx.fillRect(0, 0, width, height);

  // Planks
  const plankHeight = 64;
  const numPlanks = height / plankHeight;

  for (let i = 0; i < numPlanks; i++) {
    const y = i * plankHeight;
    // Slight color shift per plank
    const toneShift = (Math.sin(i * 12.3) * 8);
    const r = Math.min(255, Math.max(0, 32 + toneShift));
    const g = Math.min(255, Math.max(0, 24 + toneShift * 0.8));
    const b = Math.min(255, Math.max(0, 19 + toneShift * 0.6));

    ctx.fillStyle = `rgb(${Math.floor(r)}, ${Math.floor(g)}, ${Math.floor(b)})`;
    ctx.fillRect(0, y, width, plankHeight - 2);

    // Wood grain lines
    ctx.strokeStyle = 'rgba(10, 6, 4, 0.25)';
    ctx.lineWidth = 1;
    for (let gIdx = 0; gIdx < 14; gIdx++) {
      const lineY = y + (gIdx * 4) + (Math.sin(gIdx + i) * 2);
      ctx.beginPath();
      ctx.moveTo(0, lineY);
      ctx.bezierCurveTo(
        width * 0.3, lineY + (Math.sin(i * 3 + gIdx) * 3),
        width * 0.7, lineY - (Math.cos(i * 2 + gIdx) * 3),
        width, lineY
      );
      ctx.stroke();
    }

    // Plank seam / bevel shadow
    ctx.fillStyle = 'rgba(6, 4, 3, 0.85)';
    ctx.fillRect(0, y + plankHeight - 2, width, 2);
  }

  // Vertical staggered seams
  ctx.fillStyle = 'rgba(6, 4, 3, 0.9)';
  for (let i = 0; i < numPlanks; i++) {
    const y = i * plankHeight;
    const offset = (i % 3) * 340;
    for (let x = offset; x < width; x += 340) {
      ctx.fillRect(x, y, 2, plankHeight);
    }
  }

  const diffuseTex = new THREE.CanvasTexture(canvas);
  diffuseTex.wrapS = THREE.RepeatWrapping;
  diffuseTex.wrapT = THREE.RepeatWrapping;
  diffuseTex.repeat.set(4, 4);

  // Roughness Map (plank seams have higher roughness, polished center has lower)
  const rCanvas = document.createElement('canvas');
  rCanvas.width = 512;
  rCanvas.height = 512;
  const rCtx = rCanvas.getContext('2d');
  rCtx.fillStyle = '#666666'; // semi-reflective wood finish
  rCtx.fillRect(0, 0, 512, 512);

  // Grooves are rougher
  rCtx.fillStyle = '#cccccc';
  const rPlankH = 512 / (numPlanks / 2);
  for (let i = 0; i < numPlanks / 2; i++) {
    rCtx.fillRect(0, i * rPlankH - 2, 512, 3);
  }

  const roughnessTex = new THREE.CanvasTexture(rCanvas);
  roughnessTex.wrapS = THREE.RepeatWrapping;
  roughnessTex.wrapT = THREE.RepeatWrapping;
  roughnessTex.repeat.set(4, 4);

  cachedWoodDiffuse = diffuseTex;
  cachedWoodRoughness = roughnessTex;

  return { diffuse: diffuseTex, roughness: roughnessTex };
}

/**
 * Procedural modern architectural concrete / dark acoustic wall panel texture.
 */
export function getWallTexture() {
  if (cachedWallDiffuse) return cachedWallDiffuse;

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Deep architectural slate dark gray
  ctx.fillStyle = '#141417';
  ctx.fillRect(0, 0, 512, 512);

  // Subtle acoustic micro-slits
  ctx.fillStyle = '#0d0d0f';
  for (let x = 0; x < 512; x += 16) {
    ctx.fillRect(x, 0, 2, 512);
  }

  // Soft vertical gradient
  const grad = ctx.createLinearGradient(0, 0, 0, 512);
  grad.addColorStop(0, 'rgba(35, 35, 45, 0.15)');
  grad.addColorStop(1, 'rgba(5, 5, 8, 0.35)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 512);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(3, 2);

  cachedWallDiffuse = texture;
  return texture;
}

/**
 * Procedural panoramic twilight dusk city skyline seen through floor-to-ceiling windows.
 */
export function getSkylineTexture() {
  if (cachedSkyline) return cachedSkyline;

  const width = 2048;
  const height = 1024;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  // Sunset / Dusk gradient
  const grad = ctx.createLinearGradient(0, 0, 0, height);
  grad.addColorStop(0.0, '#06060c'); // Deep night sky
  grad.addColorStop(0.35, '#161226');
  grad.addColorStop(0.55, '#3b1c32'); // Purple dusk
  grad.addColorStop(0.72, '#963d2c'); // Warm amber horizon
  grad.addColorStop(0.82, '#d96b27'); // Golden sunset rim
  grad.addColorStop(1.0, '#100a0f'); // Ground dark
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  // Distant Mountain Ridges / Foothills
  ctx.fillStyle = '#180f1d';
  ctx.beginPath();
  ctx.moveTo(0, height * 0.76);
  for (let x = 0; x <= width; x += 50) {
    const y = height * 0.74 + Math.sin(x * 0.005) * 45 + Math.cos(x * 0.012) * 20;
    ctx.lineTo(x, y);
  }
  ctx.lineTo(width, height);
  ctx.lineTo(0, height);
  ctx.closePath();
  ctx.fill();

  // Modern Architectural City Silhouette
  const horizon = height * 0.75;
  ctx.fillStyle = '#0b0910';

  let curX = 40;
  while (curX < width - 40) {
    const bWidth = 25 + Math.random() * 65;
    const bHeight = 80 + Math.random() * 260;
    const bTop = horizon - bHeight;

    ctx.fillRect(curX, bTop, bWidth, bHeight + 150);

    // Spire / Antenna
    if (Math.random() > 0.6) {
      ctx.fillRect(curX + bWidth / 2 - 1, bTop - 35, 2, 35);
      // Beacon red light
      ctx.fillStyle = '#ff3344';
      ctx.fillRect(curX + bWidth / 2 - 2, bTop - 36, 4, 3);
      ctx.fillStyle = '#0b0910';
    }

    // Windows in building
    const numRows = Math.floor(bHeight / 14);
    const numCols = Math.floor(bWidth / 9);

    for (let r = 2; r < numRows - 1; r++) {
      for (let c = 1; c < numCols - 1; c++) {
        if (Math.random() > 0.45) {
          const warm = Math.random() > 0.3;
          ctx.fillStyle = warm ? 'rgba(255, 215, 140, 0.7)' : 'rgba(160, 210, 255, 0.6)';
          ctx.fillRect(curX + c * 9, bTop + r * 14, 4, 6);
        }
      }
    }
    ctx.fillStyle = '#0b0910';
    curX += bWidth + (8 + Math.random() * 18);
  }

  // Soft atmospheric haze over horizon
  const haze = ctx.createLinearGradient(0, horizon - 80, 0, horizon + 50);
  haze.addColorStop(0, 'rgba(217, 107, 39, 0)');
  haze.addColorStop(0.6, 'rgba(217, 107, 39, 0.22)');
  haze.addColorStop(1, 'rgba(10, 8, 14, 0.8)');
  ctx.fillStyle = haze;
  ctx.fillRect(0, horizon - 80, width, 130);

  const tex = new THREE.CanvasTexture(canvas);
  cachedSkyline = tex;
  return tex;
}

/**
 * Procedural code editor screen texture (Farman's IDE workstation display).
 */
export function getCodeScreenTexture() {
  if (cachedCodeScreen) return cachedCodeScreen;

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 640;
  const ctx = canvas.getContext('2d');

  // VS Code dark theme background
  ctx.fillStyle = '#181a1f';
  ctx.fillRect(0, 0, 1024, 640);

  // Tab bar
  ctx.fillStyle = '#21252b';
  ctx.fillRect(0, 0, 1024, 38);
  ctx.fillStyle = '#181a1f';
  ctx.fillRect(0, 0, 220, 38);
  ctx.fillStyle = '#e5c07b';
  ctx.font = '14px monospace';
  ctx.fillText('⚡ portfolioEngine.jsx', 18, 24);

  ctx.fillStyle = '#5c6370';
  ctx.fillText('App.py', 240, 24);
  ctx.fillText('skillsMatrix.ts', 330, 24);

  // Line numbers gutter
  ctx.fillStyle = '#1e2227';
  ctx.fillRect(0, 38, 48, 602);

  const codeLines = [
    { num: '01', text: '// Syed Farman Ali — Full-Stack & Python Engineer', color: '#5c6370' },
    { num: '02', text: "import { createXRStore } from '@react-three/xr';", color: '#e06c75' },
    { num: '03', text: "import { MERNStack, PythonDjango, AppliedML } from '@farman/core';", color: '#e06c75' },
    { num: '04', text: '', color: '' },
    { num: '05', text: 'export async function initializeWorkstation() {', color: '#61afef' },
    { num: '06', text: '  const developer = {', color: '#abb2bf' },
    { num: '07', text: "    name: 'Syed Farman Ali',", color: '#98c379' },
    { num: '08', text: "    location: 'Gangoo, Pulwama, J&K (192301)',", color: '#98c379' },
    { num: '09', text: "    role: 'MERN, React Native & Python Backend Engineer',", color: '#98c379' },
    { num: '10', text: "    research: 'SKUAST-Kashmir & NIT Srinagar Collaborations',", color: '#98c379' },
    { num: '11', text: "    publicRepos: 41,", color: '#d19a66' },
    { num: '12', text: "    status: 'Ready for full-stack engineering challenges'", color: '#98c379' },
    { num: '13', text: '  };', color: '#abb2bf' },
    { num: '14', text: '', color: '' },
    { num: '15', text: '  await renderPhotorealisticOffice(developer);', color: '#61afef' },
    { num: '16', text: "  console.log('3D WebXR Studio Loaded at 60+ FPS');", color: '#98c379' },
    { num: '17', text: '}', color: '#abb2bf' }
  ];

  ctx.font = '15px "Fira Code", monospace';
  codeLines.forEach((line, idx) => {
    const y = 68 + idx * 26;
    // Gutter line number
    ctx.fillStyle = '#4b5263';
    ctx.fillText(line.num, 14, y);

    // Code text
    if (line.text) {
      ctx.fillStyle = line.color || '#abb2bf';
      ctx.fillText(line.text, 65, y);
    }
  });

  // Cursor blinking indicator
  ctx.fillStyle = '#528bff';
  ctx.fillRect(65 + 10, 68 + 17 * 26 - 15, 2, 18);

  // Status bar at bottom
  ctx.fillStyle = '#ff5722';
  ctx.fillRect(0, 614, 1024, 26);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 12px sans-serif';
  ctx.fillText('READY • UTF-8 • React 18 • WebXR Immersive • Branch: main', 14, 631);

  const tex = new THREE.CanvasTexture(canvas);
  cachedCodeScreen = tex;
  return tex;
}

/**
 * Procedural metrics / architecture display screen (Right monitor).
 */
export function getMetricsScreenTexture() {
  if (cachedMetricsScreen) return cachedMetricsScreen;

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 640;
  const ctx = canvas.getContext('2d');

  // Dark dashboard background
  ctx.fillStyle = '#0f1117';
  ctx.fillRect(0, 0, 1024, 640);

  // Header
  ctx.fillStyle = '#161923';
  ctx.fillRect(0, 0, 1024, 52);
  ctx.fillStyle = '#ff5722';
  ctx.font = 'bold 16px sans-serif';
  ctx.fillText('SYED FARMAN ALI • SYSTEM DIAGNOSTICS & TELEMETRY', 20, 32);

  // Card 1: Repos & Commits
  ctx.fillStyle = '#1a1f2e';
  ctx.fillRect(20, 72, 305, 160);
  ctx.fillStyle = '#8f9fb6';
  ctx.font = '13px sans-serif';
  ctx.fillText('GITHUB ECOSYSTEM', 36, 100);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 36px sans-serif';
  ctx.fillText('41+', 36, 150);
  ctx.fillStyle = '#51cf66';
  ctx.font = '13px sans-serif';
  ctx.fillText('● Active Public Repositories', 36, 180);
  ctx.fillStyle = '#8f9fb6';
  ctx.fillText('MERN • Python • ML • Django', 36, 204);

  // Card 2: Research & Citations
  ctx.fillStyle = '#1a1f2e';
  ctx.fillRect(345, 72, 305, 160);
  ctx.fillStyle = '#8f9fb6';
  ctx.fillText('GOOGLE SCHOLAR RESEARCH', 361, 100);
  ctx.fillStyle = '#fcc419';
  ctx.font = 'bold 36px sans-serif';
  ctx.fillText('SSRN', 361, 150);
  ctx.fillStyle = '#51cf66';
  ctx.font = '13px sans-serif';
  ctx.fillText('● Peer-Reviewed Publication', 361, 180);
  ctx.fillStyle = '#8f9fb6';
  ctx.fillText('SKUAST-Kashmir Auscultation & ML', 361, 204);

  // Card 3: Experience & Client Builds
  ctx.fillStyle = '#1a1f2e';
  ctx.fillRect(670, 72, 334, 160);
  ctx.fillStyle = '#8f9fb6';
  ctx.fillText('COMMERCIAL DEPLOYMENTS', 686, 100);
  ctx.fillStyle = '#339af0';
  ctx.font = 'bold 36px sans-serif';
  ctx.fillText('10+', 686, 150);
  ctx.fillStyle = '#51cf66';
  ctx.font = '13px sans-serif';
  ctx.fillText('● Live Production Systems', 686, 180);
  ctx.fillStyle = '#8f9fb6';
  ctx.fillText('CityCabs • Star Beekeepers • MERN', 686, 204);

  // Lower Section: Architecture Matrix Graph
  ctx.fillStyle = '#161923';
  ctx.fillRect(20, 252, 984, 360);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 15px sans-serif';
  ctx.fillText('CORE TECHNICAL COMPETENCIES (VERIFIED)', 40, 285);

  const skills = [
    { name: 'Python & Django Backend Engine', val: 84, col: '#ff5722' },
    { name: 'React & React Native Mobile', val: 78, col: '#339af0' },
    { name: 'JavaScript (ESNext / TypeScript)', val: 76, col: '#fcc419' },
    { name: 'MERN Stack (Node, Express, MongoDB)', val: 64, col: '#51cf66' },
    { name: 'Applied Machine Learning (scikit-learn)', val: 58, col: '#e03131' },
    { name: 'Three.js / WebGL / Spatial WebXR', val: 74, col: '#cc5de8' }
  ];

  skills.forEach((s, idx) => {
    const y = 320 + idx * 46;
    ctx.fillStyle = '#cfd7e6';
    ctx.font = '14px sans-serif';
    ctx.fillText(s.name, 40, y);
    ctx.fillText(`${s.val}%`, 500, y);

    // Track
    ctx.fillStyle = '#232938';
    ctx.fillRect(550, y - 12, 410, 14);

    // Fill
    ctx.fillStyle = s.col;
    ctx.fillRect(550, y - 12, (410 * s.val) / 100, 14);
  });

  const tex = new THREE.CanvasTexture(canvas);
  cachedMetricsScreen = tex;
  return tex;
}
