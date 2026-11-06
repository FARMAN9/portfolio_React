import * as THREE from 'three';

let cachedWoodDiffuse = null;
let cachedWoodRoughness = null;
let cachedSkyline = null;
let cachedWallDiffuse = null;
let cachedCodeScreen = null;
let cachedMetricsScreen = null;

/**
 * Procedural realistic warm Scandinavian / European oak hardwood floor texture.
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

  // Base warm golden honey oak (matching Reference photo 5)
  ctx.fillStyle = '#b89368';
  ctx.fillRect(0, 0, width, height);

  // Planks
  const plankHeight = 64;
  const numPlanks = height / plankHeight;

  for (let i = 0; i < numPlanks; i++) {
    const y = i * plankHeight;
    // Tone variation per plank
    const toneShift = (Math.sin(i * 14.7) * 16);
    const r = Math.min(255, Math.max(0, 192 + toneShift));
    const g = Math.min(255, Math.max(0, 155 + toneShift * 0.85));
    const b = Math.min(255, Math.max(0, 114 + toneShift * 0.7));

    ctx.fillStyle = `rgb(${Math.floor(r)}, ${Math.floor(g)}, ${Math.floor(b)})`;
    ctx.fillRect(0, y, width, plankHeight - 2);

    // Fine wood grain lines
    ctx.strokeStyle = 'rgba(120, 85, 50, 0.28)';
    ctx.lineWidth = 1;
    for (let gIdx = 0; gIdx < 12; gIdx++) {
      const lineY = y + (gIdx * 5) + (Math.sin(gIdx + i) * 2.5);
      ctx.beginPath();
      ctx.moveTo(0, lineY);
      ctx.bezierCurveTo(
        width * 0.3, lineY + (Math.sin(i * 3 + gIdx) * 3),
        width * 0.7, lineY - (Math.cos(i * 2 + gIdx) * 3),
        width, lineY
      );
      ctx.stroke();
    }

    // Plank bevel shadow
    ctx.fillStyle = 'rgba(70, 48, 28, 0.45)';
    ctx.fillRect(0, y + plankHeight - 2, width, 2);
  }

  // Staggered vertical plank joints
  ctx.fillStyle = 'rgba(70, 48, 28, 0.5)';
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

  // Roughness Map (smooth polished finish reflecting daylight, seams rougher)
  const rCanvas = document.createElement('canvas');
  rCanvas.width = 512;
  rCanvas.height = 512;
  const rCtx = rCanvas.getContext('2d');
  rCtx.fillStyle = '#444444'; // glossier, more reflective floor
  rCtx.fillRect(0, 0, 512, 512);

  rCtx.fillStyle = '#999999';
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
 * Procedural modern architectural gallery white / Venetian plaster wall panel texture.
 * Bright, clean, sophisticated finish matching Reference images 4 & 5.
 */
export function getWallTexture() {
  if (cachedWallDiffuse) return cachedWallDiffuse;

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Architectural bright gallery white / light warm concrete
  ctx.fillStyle = '#f0f2f5';
  ctx.fillRect(0, 0, 512, 512);

  // Subtle acoustic vertical panel reveals (soft light gray)
  ctx.fillStyle = '#e2e5eb';
  for (let x = 0; x < 512; x += 32) {
    ctx.fillRect(x, 0, 2, 512);
  }

  // Soft daylight gradient
  const grad = ctx.createLinearGradient(0, 0, 0, 512);
  grad.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
  grad.addColorStop(1, 'rgba(230, 235, 242, 0.2)');
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
 * Procedural panoramic brilliant sunlit daylight skyline & park vista.
 * Clear blue daylight sky with sun-drenched architectural glass towers and lush green park trees.
 */
export function getSkylineTexture() {
  if (cachedSkyline) return cachedSkyline;

  const width = 2048;
  const height = 1024;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  // Brilliant sunny daylight sky gradient
  const grad = ctx.createLinearGradient(0, 0, 0, height);
  grad.addColorStop(0.0, '#3a88db'); // Deep rich blue zenith
  grad.addColorStop(0.4, '#6db5ef'); // Bright sunny cyan
  grad.addColorStop(0.7, '#bfe1fb'); // Pale horizon sky
  grad.addColorStop(0.85, '#eef6fc'); // Bright sun glow rim
  grad.addColorStop(1.0, '#a5cf7a'); // Lush ground lawn
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  // Soft sunlit cumulus clouds
  ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
  const cloudPositions = [
    [150, 180, 200, 60],
    [550, 140, 260, 70],
    [1100, 210, 320, 80],
    [1650, 160, 240, 65]
  ];
  cloudPositions.forEach(([cx, cy, cw, ch]) => {
    ctx.beginPath();
    ctx.ellipse(cx, cy, cw, ch, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(cx + cw * 0.3, cy - ch * 0.3, cw * 0.6, ch * 0.8, 0, 0, Math.PI * 2);
    ctx.fill();
  });

  // Distant modern glass architectural towers
  const horizon = height * 0.72;

  let curX = 30;
  while (curX < width - 30) {
    const bWidth = 35 + Math.random() * 75;
    const bHeight = 100 + Math.random() * 320;
    const bTop = horizon - bHeight;

    // Glass tower gradient reflecting daylight
    const bGrad = ctx.createLinearGradient(curX, bTop, curX + bWidth, horizon);
    bGrad.addColorStop(0, '#759fc7');
    bGrad.addColorStop(0.5, '#bad4eb');
    bGrad.addColorStop(1, '#537d9f');
    ctx.fillStyle = bGrad;
    ctx.fillRect(curX, bTop, bWidth, bHeight);

    // Glass panel grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 1;
    for (let py = bTop; py < horizon; py += 16) {
      ctx.beginPath();
      ctx.moveTo(curX, py);
      ctx.lineTo(curX + bWidth, py);
      ctx.stroke();
    }
    for (let px = curX; px < curX + bWidth; px += 14) {
      ctx.beginPath();
      ctx.moveTo(px, bTop);
      ctx.lineTo(px, horizon);
      ctx.stroke();
    }

    curX += bWidth + (12 + Math.random() * 24);
  }

  // Midground & Foreground lush green tree canopies (matching Reference 5)
  for (let x = 0; x <= width + 80; x += 45) {
    const treeY = horizon - 35 + Math.sin(x * 0.02) * 20;
    const radius = 55 + Math.sin(x * 0.05) * 20;
    const treeGrad = ctx.createRadialGradient(x, treeY, 5, x, treeY, radius);
    treeGrad.addColorStop(0, '#589e42');
    treeGrad.addColorStop(0.7, '#387328');
    treeGrad.addColorStop(1, '#1e4813');
    ctx.fillStyle = treeGrad;
    ctx.beginPath();
    ctx.arc(x, treeY, radius, 0, Math.PI * 2);
    ctx.fill();
  }

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

  // Background
  ctx.fillStyle = '#0f1117';
  ctx.fillRect(0, 0, 1024, 640);

  // Header Bar
  ctx.fillStyle = '#171922';
  ctx.fillRect(0, 0, 1024, 46);
  ctx.fillStyle = '#ff5722';
  ctx.font = 'bold 14px sans-serif';
  ctx.fillText('SYSTEM HEALTH & TELEMETRY CLOUD', 24, 28);

  ctx.fillStyle = '#40c057';
  ctx.fillText('● SYSTEM OPTIMAL', 860, 28);

  // KPI Cards
  const kpis = [
    { title: 'LATENCY', val: '24ms', sub: 'Global Edge Avg' },
    { title: 'UPTIME', val: '99.98%', sub: 'Last 30 Days' },
    { title: 'FPS (RENDER)', val: '60+ FPS', sub: 'Target 72Hz VR' },
    { title: 'REPOS ACTIVE', val: '41', sub: 'GitHub Enterprise' }
  ];

  kpis.forEach((kpi, idx) => {
    const x = 24 + idx * 244;
    ctx.fillStyle = '#171924';
    ctx.fillRect(x, 62, 230, 84);
    ctx.strokeStyle = '#252936';
    ctx.lineWidth = 1;
    ctx.strokeRect(x, 62, 230, 84);

    ctx.fillStyle = '#8b949e';
    ctx.font = '11px sans-serif';
    ctx.fillText(kpi.title, x + 16, 84);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 24px monospace';
    ctx.fillText(kpi.val, x + 16, 116);

    ctx.fillStyle = '#5c6370';
    ctx.font = '10px sans-serif';
    ctx.fillText(kpi.sub, x + 16, 134);
  });

  // Main Chart: Full-Stack Competency Gauges
  ctx.fillStyle = '#171924';
  ctx.fillRect(24, 164, 976, 440);
  ctx.strokeRect(24, 164, 976, 440);

  ctx.fillStyle = '#abb2bf';
  ctx.font = 'bold 13px sans-serif';
  ctx.fillText('CORE TECHNICAL COMPETENCIES (VERIFIED)', 46, 198);

  const skills = [
    { label: 'React / Next.js / Vite / TailwindCSS', pct: 95, color: '#339af0' },
    { label: 'Python / Django / FastREST APIs', pct: 90, color: '#ff922b' },
    { label: 'Node.js / Express / MongoDB / PostgreSQL', pct: 92, color: '#51cf66' },
    { label: 'Machine Learning / Random Forest / Scikit-Learn', pct: 85, color: '#cc5de8' },
    { label: 'WebXR / Three.js / 3D Graphics & Spatial Computing', pct: 88, color: '#ff6b6b' },
    { label: 'Docker / CI-CD / Vercel Cloud Deployment', pct: 86, color: '#20c997' }
  ];

  skills.forEach((s, idx) => {
    const y = 236 + idx * 56;
    ctx.fillStyle = '#d0d7de';
    ctx.font = '13px sans-serif';
    ctx.fillText(s.label, 46, y);

    ctx.fillStyle = '#8b949e';
    ctx.font = 'bold 13px monospace';
    ctx.fillText(`${s.pct}%`, 920, y);

    // Track
    ctx.fillStyle = '#0f1118';
    ctx.fillRect(46, y + 10, 890, 12);

    // Progress
    ctx.fillStyle = s.color;
    ctx.fillRect(46, y + 10, (890 * s.pct) / 100, 12);
  });

  const tex = new THREE.CanvasTexture(canvas);
  cachedMetricsScreen = tex;
  return tex;
}
