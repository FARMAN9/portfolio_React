import { useState, useRef, useEffect, Suspense, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Stars, Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import './VRMode.css';
import {
  FiX,
  FiMaximize,
  FiMinimize,
  FiVolume2,
  FiVolumeX,
  FiExternalLink,
  FiGithub,
  FiNavigation,
  FiInfo
} from 'react-icons/fi';
import { FaVrCardboard } from 'react-icons/fa';

// Featured projects in VR Space
const VR_PROJECTS = [
  {
    id: 'chatapp',
    name: 'ChatAPP MERN',
    category: 'Full-Stack Messaging',
    tech: ['MongoDB', 'Express', 'React', 'Node.js'],
    desc: 'Real-time full-stack chat application with end-to-end messaging, user authentication, and deployed web experience.',
    demo: 'https://chatapp-mern-vvn5.onrender.com/',
    link: 'https://github.com/FARMAN9/ChatAPP-MERN',
    color: '#f76707',
    image: '/projects/coming_soon.gif'
  },
  {
    id: 'portfolio-react',
    name: 'Portfolio React 3D',
    category: 'Interactive Web',
    tech: ['React', 'Three.js', 'Redux', 'Vite'],
    desc: 'Cutting-edge personal portfolio with 3D WebGL scenes, procedural music player, and AI assistant.',
    demo: 'https://portfolio-react-theta-steel.vercel.app',
    link: 'https://github.com/FARMAN9/portfolio_React',
    color: '#ffa94d',
    image: '/projects/portfilo_react.png'
  },
  {
    id: 'diabetes',
    name: 'Diabetes Prediction ML',
    category: 'Machine Learning',
    tech: ['Python', 'scikit-learn', 'ML', 'CSS'],
    desc: 'Clinical machine learning web application predicting diabetes probability from medical inputs with responsive UI.',
    demo: 'https://diabetes-prediction-sooty.vercel.app',
    link: 'https://github.com/FARMAN9/Diabetes-prediction',
    color: '#e03131',
    image: '/projects/dpt.png'
  },
  {
    id: 'citycabs',
    name: 'CityCabs Platform',
    category: 'Commercial Transport',
    tech: ['React', 'Responsive UI', 'REST APIs'],
    desc: 'Live commercial cab-booking platform with online reservations, responsive UI, and customer dispatch system.',
    demo: 'https://www.citycabs.live/',
    link: 'https://www.citycabs.live/',
    color: '#ffd43b',
    image: '/projects/citycabs.png'
  },
  {
    id: 'star-beekeepers',
    name: 'Star Beekeepers',
    category: 'E-Commerce Storefront',
    tech: ['React', 'Vercel', 'Storefront'],
    desc: 'Live commercial honey store with clean product showcase, cart interactions, and brand storytelling.',
    demo: 'https://star-beekekpers.vercel.app/',
    link: 'https://star-beekekpers.vercel.app/',
    color: '#2b8a3e',
    image: '/projects/coming_soon.gif'
  },
  {
    id: 'django-portfolio',
    name: 'Django Web Engine',
    category: 'Backend Architecture',
    tech: ['Python', 'Django', 'SQLite', 'HTML'],
    desc: 'Server-rendered portfolio and admin suite engineered with Python and Django web framework.',
    demo: 'https://portfoilo-django.vercel.app',
    link: 'https://github.com/FARMAN9/portfoilo_django',
    color: '#339af0',
    image: '/projects/django_port.png'
  }
];

// Web Audio API ambient spatial sound generator
function startVRAmbience() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return null;
    const ctx = new AudioCtx();

    // Bass drone
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(65.41, ctx.currentTime); // C2

    const filter1 = ctx.createBiquadFilter();
    filter1.type = 'lowpass';
    filter1.frequency.setValueAtTime(140, ctx.currentTime);

    gain1.gain.setValueAtTime(0.04, ctx.currentTime);
    osc1.connect(filter1);
    filter1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start();

    // Ethereal chord
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(196.00, ctx.currentTime); // G3

    const filter2 = ctx.createBiquadFilter();
    filter2.type = 'bandpass';
    filter2.frequency.setValueAtTime(320, ctx.currentTime);

    gain2.gain.setValueAtTime(0.02, ctx.currentTime);
    osc2.connect(filter2);
    filter2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start();

    return {
      stop: () => {
        try {
          osc1.stop();
          osc2.stop();
          ctx.close();
        } catch {
          // ignore
        }
      }
    };
  } catch {
    return null;
  }
}

// Central Core Sphere with orbiting particle ring
function CentralHologramCore() {
  const coreRef = useRef();
  const ringRef = useRef();
  const ring2Ref = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (coreRef.current) {
      coreRef.current.rotation.y = t * 0.35;
      coreRef.current.position.y = 0.5 + Math.sin(t * 1.2) * 0.15;
    }
    if (ringRef.current) {
      ringRef.current.rotation.x = t * 0.5;
      ringRef.current.rotation.y = t * 0.4;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -t * 0.4;
      ring2Ref.current.rotation.x = t * 0.3;
    }
  });

  return (
    <group position={[0, 1.2, 0]}>
      {/* Central Pulsing Sphere */}
      <mesh ref={coreRef} castShadow>
        <sphereGeometry args={[1.1, 48, 48]} />
        <MeshDistortMaterial
          color="#f76707"
          attach="material"
          distort={0.4}
          speed={1.8}
          roughness={0.15}
          metalness={0.8}
          clearcoat={1}
          emissive="#7a1c0d"
          emissiveIntensity={0.6}
        />
      </mesh>

      {/* Orbiting Gyro Rings */}
      <mesh ref={ringRef}>
        <torusGeometry args={[2.0, 0.04, 16, 100]} />
        <meshStandardMaterial
          color="#ffa94d"
          emissive="#f76707"
          emissiveIntensity={0.8}
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>

      <mesh ref={ring2Ref}>
        <torusGeometry args={[2.5, 0.03, 16, 100]} />
        <meshStandardMaterial
          color="#ffc078"
          emissive="#ffa94d"
          emissiveIntensity={0.5}
          roughness={0.2}
        />
      </mesh>

      {/* Light Beacon */}
      <pointLight color="#f76707" intensity={2.5} distance={15} />
    </group>
  );
}

// 3D Cyberpunk Holodeck Pedestal & Screen
function ProjectPedestal({ project, index, total, onSelect, activeId }) {
  const groupRef = useRef();
  const screenRef = useRef();
  const [hovered, setHovered] = useState(false);

  const angle = (index / total) * Math.PI * 2;
  const radius = 7.5;
  const x = Math.sin(angle) * radius;
  const z = Math.cos(angle) * radius;
  const rotY = angle + Math.PI;

  const isSelected = activeId === project.id;

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      const floatOffset = Math.sin(t * 1.5 + index) * 0.08;
      groupRef.current.position.y = (hovered || isSelected ? 0.35 : 0) + floatOffset;
    }
    if (screenRef.current && (hovered || isSelected)) {
      screenRef.current.rotation.y = Math.sin(t * 2) * 0.05;
    }
  });

  // Project Image Texture
  const texture = useMemo(() => {
    const loader = new THREE.TextureLoader();
    return loader.load(project.image);
  }, [project.image]);

  return (
    <group position={[x, 0, z]} rotation={[0, rotY, 0]}>
      <group ref={groupRef}>
        {/* Holographic Project Screen Frame */}
        <mesh
          ref={screenRef}
          position={[0, 2.8, 0]}
          onClick={(e) => {
            e.stopPropagation();
            onSelect(project);
          }}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(true);
            document.body.style.cursor = 'pointer';
          }}
          onPointerOut={() => {
            setHovered(false);
            document.body.style.cursor = 'auto';
          }}
        >
          <boxGeometry args={[3.2, 2.0, 0.12]} />
          <meshStandardMaterial
            color={hovered || isSelected ? '#ffffff' : '#222226'}
            emissive={project.color}
            emissiveIntensity={hovered || isSelected ? 0.9 : 0.35}
            roughness={0.2}
            metalness={0.8}
          />

          {/* Front Screen Texture Display */}
          <mesh position={[0, 0, 0.07]}>
            <planeGeometry args={[2.95, 1.75]} />
            <meshBasicMaterial map={texture} />
          </mesh>
        </mesh>

        {/* Glow Frame Halo */}
        <mesh position={[0, 2.8, 0]}>
          <boxGeometry args={[3.4, 2.2, 0.08]} />
          <meshBasicMaterial
            color={project.color}
            transparent
            opacity={hovered || isSelected ? 0.6 : 0.25}
            wireframe
          />
        </mesh>

        {/* Floating Screen Banner Header */}
        <mesh position={[0, 4.0, 0]}>
          <planeGeometry args={[2.8, 0.45]} />
          <meshBasicMaterial color="#141418" transparent opacity={0.9} />
        </mesh>

        {/* Base Pillar */}
        <mesh position={[0, 0.8, 0]}>
          <cylinderGeometry args={[0.25, 0.45, 1.6, 16]} />
          <meshStandardMaterial
            color="#18181c"
            metalness={0.9}
            roughness={0.3}
            emissive={project.color}
            emissiveIntensity={0.2}
          />
        </mesh>

        {/* Glowing Floor Contact Ring */}
        <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.9, 1.25, 32]} />
          <meshBasicMaterial
            color={project.color}
            transparent
            opacity={hovered || isSelected ? 0.9 : 0.4}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Spot Glow on active */}
        {(hovered || isSelected) && (
          <pointLight position={[0, 2.8, 1]} color={project.color} intensity={2.2} distance={5} />
        )}
      </group>
    </group>
  );
}

// Cyberpunk Floor Grid & Rings
function HolodeckFloor() {
  return (
    <group position={[0, 0, 0]}>
      {/* Concentric Holodeck Rings */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <ringGeometry args={[7.2, 7.8, 64]} />
        <meshBasicMaterial color="#f76707" transparent opacity={0.35} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <ringGeometry args={[3.8, 4.1, 64]} />
        <meshBasicMaterial color="#ffa94d" transparent opacity={0.25} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <ringGeometry args={[11.5, 12.0, 64]} />
        <meshBasicMaterial color="#e03131" transparent opacity={0.2} />
      </mesh>

      {/* Main Grid Plane */}
      <gridHelper args={[32, 32, '#f76707', '#2b0b06']} position={[0, 0, 0]} />

      {/* Outer Ground Disk */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]} receiveShadow>
        <circleGeometry args={[22, 64]} />
        <meshStandardMaterial
          color="#0d0403"
          roughness={0.7}
          metalness={0.8}
        />
      </mesh>
    </group>
  );
}

// Camera Glide Controller
function CameraRig({ targetPos }) {
  const { camera } = useThree();

  useFrame(() => {
    if (targetPos) {
      camera.position.lerp(targetPos, 0.05);
    }
  });

  return null;
}

export default function VRMode({ isOpen, onClose }) {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [webXRStatus, setWebXRStatus] = useState('checking');
  const [targetCameraPos, setTargetCameraPos] = useState(null);

  const audioHandleRef = useRef(null);

  // Check WebXR device compatibility
  useEffect(() => {
    if (navigator.xr && navigator.xr.isSessionSupported) {
      navigator.xr.isSessionSupported('immersive-vr')
        .then((supported) => setWebXRStatus(supported ? 'supported' : 'unsupported'))
        .catch(() => setWebXRStatus('unsupported'));
    } else {
      setWebXRStatus('unsupported');
    }
  }, []);

  // Spatial audio management
  useEffect(() => {
    if (isOpen && !isAudioMuted) {
      audioHandleRef.current = startVRAmbience();
    } else if (audioHandleRef.current) {
      audioHandleRef.current.stop();
      audioHandleRef.current = null;
    }

    return () => {
      if (audioHandleRef.current) {
        audioHandleRef.current.stop();
        audioHandleRef.current = null;
      }
    };
  }, [isOpen, isAudioMuted]);

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // WebXR Session Trigger for VR Headsets
  const enterWebXRHeadset = async () => {
    if (navigator.xr && webXRStatus === 'supported') {
      try {
        await navigator.xr.requestSession('immersive-vr');
      } catch (err) {
        alert('Could not start immersive VR session: ' + err.message);
      }
    } else {
      alert('No WebXR headset detected. Enjoy full 3D interactive mode using mouse, touch, or WASD navigation!');
    }
  };

  // Quick navigation to a project pedestal
  const focusProject = (proj, idx) => {
    setSelectedProject(proj);
    const angle = (idx / VR_PROJECTS.length) * Math.PI * 2;
    const camDist = 4.8;
    const x = Math.sin(angle) * (7.5 - camDist);
    const z = Math.cos(angle) * (7.5 - camDist);
    setTargetCameraPos(new THREE.Vector3(x, 2.8, z));
  };

  if (!isOpen) return null;

  return (
    <div className="vr-mode-overlay" role="dialog" aria-modal="true" aria-label="3D VR Portfolio Holodeck">
      {/* 3D WebGL Canvas */}
      <div className="vr-canvas-container">
        <Canvas
          camera={{ position: [0, 3.8, 11], fov: 60 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        >
          <color attach="background" args={['#0c0302']} />
          <ambientLight intensity={0.65} />
          <pointLight position={[0, 10, 0]} color="#ffffff" intensity={1.5} />
          <pointLight position={[10, 5, 8]} color="#f76707" intensity={2} />
          <pointLight position={[-10, 5, -8]} color="#00e5ff" intensity={1.5} />

          <Suspense fallback={null}>
            <Stars radius={120} depth={60} count={3500} factor={4} saturation={0.8} fade speed={1.2} />
            <HolodeckFloor />
            <CentralHologramCore />

            {VR_PROJECTS.map((proj, idx) => (
              <ProjectPedestal
                key={proj.id}
                project={proj}
                index={idx}
                total={VR_PROJECTS.length}
                onSelect={(p) => focusProject(p, idx)}
                activeId={selectedProject?.id}
              />
            ))}
          </Suspense>

          <CameraRig targetPos={targetCameraPos} />
          <OrbitControls
            enableDamping
            dampingFactor={0.06}
            maxPolarAngle={Math.PI / 2 + 0.05}
            minDistance={2.5}
            maxDistance={18}
            autoRotate={!selectedProject}
            autoRotateSpeed={0.4}
          />
        </Canvas>
      </div>

      {/* VR HUD Interface Header */}
      <div className="vr-hud-topbar">
        <div className="vr-hud-brand">
          <div className="vr-status-beacon" />
          <div className="vr-title-group">
            <span className="vr-hud-title">FARMAN 3D SPATIAL HOLODECK</span>
            <span className="vr-hud-subtitle">Interactive 3D &amp; WebXR Spatial Portfolio</span>
          </div>
        </div>

        <div className="vr-hud-actions">
          {/* Headset WebXR Button */}
          <button
            type="button"
            className="vr-hud-btn vr-headset-btn"
            onClick={enterWebXRHeadset}
            title="Launch WebXR Headset Mode"
          >
            <FaVrCardboard size={16} />
            <span>{webXRStatus === 'supported' ? 'Enter VR Headset' : 'WebXR Ready'}</span>
          </button>

          {/* Audio toggle */}
          <button
            type="button"
            className="vr-hud-btn"
            onClick={() => setIsAudioMuted(!isAudioMuted)}
            title={isAudioMuted ? "Unmute Spatial Audio" : "Mute Spatial Audio"}
          >
            {isAudioMuted ? <FiVolumeX size={17} /> : <FiVolume2 size={17} />}
          </button>

          {/* Fullscreen toggle */}
          <button
            type="button"
            className="vr-hud-btn"
            onClick={toggleFullscreen}
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Mode"}
          >
            {isFullscreen ? <FiMinimize size={17} /> : <FiMaximize size={17} />}
          </button>

          {/* Exit VR */}
          <button
            type="button"
            className="vr-hud-btn vr-exit-btn"
            onClick={onClose}
            title="Exit VR Mode"
          >
            <FiX size={18} />
            <span>Exit 3D</span>
          </button>
        </div>
      </div>

      {/* Bottom Pedestals Quick Dock */}
      <div className="vr-bottom-dock">
        <div className="vr-dock-label">
          <FiNavigation size={13} />
          <span>Quick Teleport to Hologram:</span>
        </div>
        <div className="vr-dock-pills">
          {VR_PROJECTS.map((proj, idx) => (
            <button
              key={proj.id}
              type="button"
              className={`vr-dock-pill ${selectedProject?.id === proj.id ? 'is-active' : ''}`}
              onClick={() => focusProject(proj, idx)}
            >
              <span className="pill-dot" style={{ backgroundColor: proj.color }} />
              <span>{proj.name}</span>
            </button>
          ))}
          <button
            type="button"
            className="vr-dock-pill reset-pill"
            onClick={() => {
              setSelectedProject(null);
              setTargetCameraPos(new THREE.Vector3(0, 3.8, 11));
            }}
          >
            <span>Reset View</span>
          </button>
        </div>
      </div>

      {/* Selected 3D Hologram Project Inspector Card */}
      {selectedProject && (
        <div className="vr-project-modal">
          <div className="vr-modal-card">
            <button
              type="button"
              className="vr-modal-close"
              onClick={() => setSelectedProject(null)}
            >
              <FiX size={18} />
            </button>

            <div className="vr-modal-header">
              <span className="vr-modal-category">{selectedProject.category}</span>
              <h3 className="vr-modal-title">{selectedProject.name}</h3>
            </div>

            <p className="vr-modal-desc">{selectedProject.desc}</p>

            <div className="vr-modal-tech-list">
              {selectedProject.tech.map((t) => (
                <span key={t} className="vr-tech-chip">{t}</span>
              ))}
            </div>

            <div className="vr-modal-actions">
              {selectedProject.demo && (
                <a
                  href={selectedProject.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="vr-modal-btn btn-primary"
                >
                  <FiExternalLink size={15} />
                  <span>Launch Live Demo</span>
                </a>
              )}
              <a
                href={selectedProject.link}
                target="_blank"
                rel="noopener noreferrer"
                className="vr-modal-btn btn-secondary"
              >
                <FiGithub size={15} />
                <span>Source Code</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Controls Hint Tooltip */}
      <div className="vr-controls-hint">
        <FiInfo size={14} />
        <span>Drag / Orbit to look around • Click any holographic pedestal to inspect • Use teleport bar below</span>
      </div>
    </div>
  );
}
