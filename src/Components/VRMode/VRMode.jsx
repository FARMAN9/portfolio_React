import { useState, useRef, useEffect, Suspense, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Stars, Float } from '@react-three/drei';
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
  FiInfo,
  FiMail,
  FiPhone,
  FiMapPin,
  FiAward,
  FiCpu,
  FiLayers,
  FiUser
} from 'react-icons/fi';
import { FaVrCardboard } from 'react-icons/fa';
import { SiGooglescholar } from 'react-icons/si';

// All 9 showcase projects in 3D Spatial Space
const VR_PROJECTS = [
  {
    id: 'portfolio-react',
    name: 'Portfolio React 3D',
    category: 'Interactive 3D Web',
    tech: ['React', 'Three.js', 'Redux', 'Vite', 'CSS Glassmorphism'],
    desc: 'Editorial personal portfolio built with React, WebGL 3D scenes, VR Holodeck mode, procedural Lo-Fi music player, and autonomous free AI assistant.',
    demo: 'https://portfolio-react-theta-steel.vercel.app',
    link: 'https://github.com/FARMAN9/portfolio_React',
    color: '#ff5722',
    image: '/projects/portfilo_react.jpg'
  },
  {
    id: 'chatapp',
    name: 'ChatAPP MERN',
    category: 'Full-Stack Messaging',
    tech: ['MongoDB', 'Express', 'React', 'Node.js', 'JWT'],
    desc: 'Real-time full-stack chat application with live messaging, secure user authentication, responsive UI, and cloud deployment on Render.',
    demo: 'https://chatapp-mern-vvn5.onrender.com/',
    link: 'https://github.com/FARMAN9/ChatAPP-MERN',
    color: '#51cf66',
    image: '/projects/chatapp_mern.jpg'
  },
  {
    id: 'diabetes',
    name: 'Diabetes Prediction ML',
    category: 'Applied Machine Learning',
    tech: ['Python', 'scikit-learn', 'ML', 'Responsive UI'],
    desc: 'Clinical machine learning web application predicting diabetes risk from clinical patient health metrics using trained classification models.',
    demo: 'https://diabetes-prediction-sooty.vercel.app',
    link: 'https://github.com/FARMAN9/Diabetes-prediction',
    color: '#e03131',
    image: '/projects/diabetes_ml.jpg'
  },
  {
    id: 'newspaper',
    name: 'Old News Paper',
    category: 'Digital Editorial Web',
    tech: ['JavaScript', 'React', 'Live News API', 'CSS Grid'],
    desc: 'Minimalist editorial digital news curation web application with responsive multi-category browsing feeds and typographic reading layouts.',
    demo: 'https://oldnews-paper.vercel.app/',
    link: 'https://github.com/FARMAN9/new_paper',
    color: '#ffa94d',
    image: '/projects/newspaper.jpg'
  },
  {
    id: 'django-portfolio',
    name: 'Django Web Engine',
    category: 'Backend Architecture',
    tech: ['Python', 'Django', 'SQLite', 'REST APIs'],
    desc: 'Server-rendered portfolio and admin suite engineered with Python and Django web framework, focused on scalable backend patterns.',
    demo: 'https://portfoilo-django.vercel.app',
    link: 'https://github.com/FARMAN9/portfoilo_django',
    color: '#339af0',
    image: '/projects/django_port.jpg'
  },
  {
    id: 'myntra',
    name: 'Myntra Storefront Clone',
    category: 'E-Commerce Frontend',
    tech: ['React', 'JavaScript', 'CSS3', 'Component UI'],
    desc: 'High-fidelity ecommerce storefront flow with modern product filtering, dynamic catalogs, cart management, and luxury fashion showcases.',
    link: 'https://github.com/FARMAN9/myntra-clone-',
    color: '#f06595',
    image: '/projects/myntra.jpg'
  },
  {
    id: 'youtube',
    name: 'YouTube Clone Platform',
    category: 'Media Streaming UI',
    tech: ['React', 'JavaScript', 'Video Layouts', 'CSS'],
    desc: 'Video streaming interface recreation exploring reusable media components, dark-mode browsing feeds, and video playback screens.',
    link: 'https://github.com/FARMAN9/youtube-clone',
    color: '#ff4d4f',
    image: '/projects/youtube.jpg'
  },
  {
    id: 'citycabs',
    name: 'CityCabs Platform',
    category: 'Live Commercial Transport',
    tech: ['React', 'Responsive UI', 'REST APIs', 'Vercel'],
    desc: 'Live commercial cab-booking platform with online reservations, responsive fleet route maps, customer dispatch workflows, and contact management.',
    demo: 'https://www.citycabs.live/',
    link: 'https://www.citycabs.live/',
    color: '#ffd43b',
    image: '/projects/citycabs.jpg'
  },
  {
    id: 'star-beekeepers',
    name: 'Star Beekeepers',
    category: 'Live E-Commerce Store',
    tech: ['React', 'Vercel', 'Storefront Architecture'],
    desc: 'Live commercial honey storefront website featuring artisan honey products, organic storytelling, responsive cart, and Vercel cloud deployment.',
    demo: 'https://star-beekekpers.vercel.app/',
    link: 'https://star-beekekpers.vercel.app/',
    color: '#fcc419',
    image: '/projects/star_beekeepers.jpg'
  }
];

// Spatial Website Section Definitions
const SPATIAL_SECTIONS = [
  {
    id: 'hero',
    name: 'Farman 3D Model',
    shortTitle: 'Farman 3D Model',
    icon: 'user',
    color: '#ff5722',
    position: [0, 0, 0],
    camPos: [0, 2.5, 4.8],
    details: {
      title: 'Syed Farman Ali',
      subtitle: 'Full-Stack MERN, React Native & Python Engineer | ML Researcher',
      location: '📍 Gangoo, Pulwama, Jammu and Kashmir, India (PIN: 192301)',
      summary: 'Passionate software craftsman building scalable web products, cross-platform mobile apps in React Native, and applied machine learning systems. Active GitHub publisher (41+ repos) with peer-reviewed research published in SSRN and indexed on Google Scholar.',
      highlights: [
        '3+ Years practical software development experience',
        '10+ Completed client & production web projects',
        'Published AI researcher (Digital auscultation & machine learning)',
        'Internship honors connected to CID Srinagar',
        'Affiliations with SKUAST-Kashmir and NIT Srinagar engineering forums'
      ]
    }
  },
  {
    id: 'about',
    name: 'About & Regional Roots',
    shortTitle: 'About & Roots',
    icon: 'pin',
    color: '#ff7043',
    position: [-8.8, 0, -2.5],
    camPos: [-5.8, 2.8, -1.2],
    details: {
      title: 'Roots & Academic Collaborations',
      subtitle: 'Gangoo, Pulwama · SKUAST-Kashmir · NIT Srinagar',
      location: 'Gangoo, Pulwama, Jammu & Kashmir (192301)',
      summary: 'Rooted in Gangoo, Pulwama, Syed Farman Ali combines rigorous academic inquiry with practical production software development. His work bridges agricultural IoT and cardiac health classification with modern full-stack web platforms.',
      affiliations: [
        'SKUAST-Kashmir: AI & Machine Learning Research Collaboration',
        'NIT Srinagar: Engineering Hackathons & Regional Technical Forums',
        'University of Kashmir: Computer Science & Software Engineering Foundation',
        'CID Srinagar: Technology Workflow & Backend Development Honors'
      ]
    }
  },
  {
    id: 'skills',
    name: 'Technical Skills Matrix',
    shortTitle: 'Tech Stack',
    icon: 'cpu',
    color: '#20c997',
    position: [8.8, 0, -2.5],
    camPos: [5.8, 2.8, -1.2],
    details: {
      title: 'Full-Stack Technical Arsenal',
      subtitle: 'Languages, Frameworks, Architecture & Tools',
      skills: [
        { name: 'Python & Django', level: 84 },
        { name: 'React & React Native', level: 78 },
        { name: 'JavaScript (ESNext)', level: 76 },
        { name: 'MERN (Node/Express/MongoDB)', level: 64 },
        { name: 'Machine Learning (scikit-learn)', level: 58 },
        { name: 'HTML5 & Modern CSS3 Glassmorphism', level: 82 },
        { name: 'Three.js / WebGL / Spatial Web', level: 72 }
      ]
    }
  },
  {
    id: 'services',
    name: 'Engineering Services',
    shortTitle: 'Services',
    icon: 'layers',
    color: '#339af0',
    position: [-6.8, 0, 7.2],
    camPos: [-4.2, 2.8, 5.0],
    details: {
      title: 'What I Build & Deliver',
      subtitle: 'Production-Grade Digital Engineering',
      services: [
        { title: 'Full-Stack Web Engineering', desc: 'Custom enterprise web applications built with React, Node.js, Express, and high-performance relational/NoSQL databases.' },
        { title: 'Cross-Platform Mobile Apps', desc: 'Native-feel iOS and Android mobile applications crafted using React Native, Redux, and mobile-first design.' },
        { title: 'Python & Django Architecture', desc: 'Server-rendered web systems, robust RESTful APIs, automation scripts, and administrative portals.' },
        { title: 'Applied Machine Learning & AI', desc: 'Predictive health models, digital signal processing, cardiac phenotyping, and data analysis pipelines.' }
      ]
    }
  },
  {
    id: 'recognition',
    name: 'Awards & Research',
    shortTitle: 'Recognition',
    icon: 'award',
    color: '#fcc419',
    position: [6.8, 0, 7.2],
    camPos: [4.2, 2.8, 5.0],
    details: {
      title: 'Milestones & Research Honors',
      subtitle: 'Google Scholar, SSRN & Production Impact',
      awards: [
        { year: '2024', name: 'Google Scholar Research Publication (SSRN)', desc: 'Integrated Morphometric and Cardiac Phenotyping of Kashmir Sheep Using Digital Auscultation & ML at SKUAST-Kashmir.' },
        { year: '2024', name: 'CID Srinagar Internship Honors', desc: 'Recognized for public service technology development, backend reliability, and data discipline.' },
        { year: '2024', name: '41+ Public Repositories Milestone', desc: 'Active GitHub open-source contributions spanning MERN, Python, ML, and mobile projects.' },
        { year: '2024', name: 'Commercial Client Deployments', desc: 'Delivered production online booking systems for Star Beekeepers and CityCabs transport.' }
      ]
    }
  },
  {
    id: 'contact',
    name: 'Direct Contact & Hire',
    shortTitle: 'Contact',
    icon: 'mail',
    color: '#ff5722',
    position: [0, 0, 10.2],
    camPos: [0, 2.8, 7.2],
    details: {
      title: "Let's Collaborate",
      subtitle: 'Open for Full-Stack, Python & AI Opportunities',
      email: 'saeedfarman9@gmail.com',
      phone: '+91 6005943382',
      location: 'Gangoo, Pulwama, Jammu & Kashmir, India',
      links: [
        { name: 'GitHub Profile', url: 'https://github.com/FARMAN9' },
        { name: 'LinkedIn', url: 'https://www.linkedin.com/in/farman9' },
        { name: 'Google Scholar Profile', url: 'https://scholar.google.com/citations?user=y-lv0B0AAAAJ' },
        { name: 'LeetCode Profile', url: 'https://leetcode.com/saeedfarman9/' },
        { name: 'Resume / CV', url: 'https://rxresu.me/farman9/python-django-developer' }
      ]
    }
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

    gain1.gain.setValueAtTime(0.035, ctx.currentTime);
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

    gain2.gain.setValueAtTime(0.018, ctx.currentTime);
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

// -------------------------------------------------------------
// 3D COMPONENT: FARMAN'S HOLOGRAPHIC AVATAR MODEL (CENTER STAGE)
// -------------------------------------------------------------
function FarmanHologramAvatar({ onSelect, isSelected }) {
  const avatarGroupRef = useRef();
  const ringRef = useRef();
  const ring2Ref = useRef();
  const [hovered, setHovered] = useState(false);

  // Load avatar image texture
  const avatarTexture = useMemo(() => {
    const loader = new THREE.TextureLoader();
    const tex = loader.load('/farman_avatar.png');
    tex.generateMipmaps = true;
    return tex;
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (avatarGroupRef.current) {
      avatarGroupRef.current.position.y = 1.3 + Math.sin(t * 1.5) * 0.08;
      avatarGroupRef.current.rotation.y = Math.sin(t * 0.6) * 0.12;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.4;
      ringRef.current.rotation.x = Math.PI / 2 + Math.sin(t * 0.5) * 0.1;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -t * 0.3;
      ring2Ref.current.rotation.y = Math.sin(t * 0.4) * 0.15;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Multi-tier Cybernetic Podium */}
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[1.7, 2.0, 0.3, 32]} />
        <meshStandardMaterial
          color="#16121f"
          metalness={0.9}
          roughness={0.2}
          emissive="#ff5722"
          emissiveIntensity={0.35}
        />
      </mesh>

      <mesh position={[0, 0.35, 0]}>
        <cylinderGeometry args={[1.35, 1.55, 0.15, 32]} />
        <meshStandardMaterial
          color="#0f0c16"
          metalness={0.95}
          roughness={0.15}
          emissive="#ff8a65"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Glowing Orange Concentric Ring on Podium Floor */}
      <mesh position={[0, 0.44, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.9, 1.25, 48]} />
        <meshBasicMaterial
          color="#ff5722"
          transparent
          opacity={0.85}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Orbiting Gyro Ring Around Avatar */}
      <mesh ref={ringRef} position={[0, 2.2, 0]}>
        <torusGeometry args={[1.4, 0.02, 16, 64]} />
        <meshBasicMaterial color="#ff5722" transparent opacity={0.65} wireframe />
      </mesh>

      <mesh ref={ring2Ref} position={[0, 2.2, 0]}>
        <torusGeometry args={[1.6, 0.015, 16, 64]} />
        <meshBasicMaterial color="#ffa07a" transparent opacity={0.45} />
      </mesh>

      {/* Floating 3D Holographic Model of Farman */}
      <group
        ref={avatarGroupRef}
        onClick={(e) => {
          e.stopPropagation();
          onSelect('hero');
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
        {/* Hologram Glass Backing Plane */}
        <mesh position={[0, 0.6, -0.02]}>
          <planeGeometry args={[2.0, 2.6]} />
          <meshStandardMaterial
            color="#140f22"
            transparent
            opacity={0.35}
            roughness={0.1}
            metalness={0.9}
            emissive="#ff5722"
            emissiveIntensity={hovered || isSelected ? 0.45 : 0.15}
          />
        </mesh>

        {/* Farman's Seamless Transparent Cutout Portrait */}
        <mesh position={[0, 0.6, 0.02]}>
          <planeGeometry args={[1.9, 2.5]} />
          <meshBasicMaterial
            map={avatarTexture}
            transparent={true}
            side={THREE.DoubleSide}
            alphaTest={0.05}
          />
        </mesh>

        {/* Holographic Wireframe Edge Frame */}
        <mesh position={[0, 0.6, 0]}>
          <boxGeometry args={[2.05, 2.65, 0.06]} />
          <meshBasicMaterial
            color={hovered || isSelected ? '#ff5722' : '#ff8a65'}
            transparent
            opacity={hovered || isSelected ? 0.8 : 0.35}
            wireframe
          />
        </mesh>

        {/* Floating Identity Banner Badge */}
        <mesh position={[0, 2.15, 0]}>
          <planeGeometry args={[2.5, 0.42]} />
          <meshBasicMaterial color="#0c0a14" transparent opacity={0.9} />
        </mesh>

        {/* Spotlight on Farman Avatar */}
        <pointLight
          position={[0, 1.4, 1.4]}
          color="#ff7043"
          intensity={hovered || isSelected ? 3.8 : 2.4}
          distance={6}
        />
      </group>
    </group>
  );
}

// -------------------------------------------------------------
// 3D COMPONENT: ALL 9 PROJECT PEDESTALS IN ORBIT
// -------------------------------------------------------------
function ProjectPedestal({ project, index, total, onSelect, activeId }) {
  const groupRef = useRef();
  const screenRef = useRef();
  const [hovered, setHovered] = useState(false);

  const angle = (index / total) * Math.PI * 2;
  const radius = 6.8;
  const x = Math.sin(angle) * radius;
  const z = Math.cos(angle) * radius;
  const rotY = angle + Math.PI;

  const isSelected = activeId === project.id;

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      const floatOffset = Math.sin(t * 1.5 + index * 0.7) * 0.08;
      groupRef.current.position.y = (hovered || isSelected ? 0.35 : 0) + floatOffset;
    }
    if (screenRef.current && (hovered || isSelected)) {
      screenRef.current.rotation.y = Math.sin(t * 2) * 0.05;
    }
  });

  const texture = useMemo(() => {
    const loader = new THREE.TextureLoader();
    return loader.load(project.image);
  }, [project.image]);

  return (
    <group position={[x, 0, z]} rotation={[0, rotY, 0]}>
      <group ref={groupRef}>
        {/* Holographic Device Screen Frame */}
        <mesh
          ref={screenRef}
          position={[0, 2.6, 0]}
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
          <boxGeometry args={[2.8, 1.75, 0.1]} />
          <meshStandardMaterial
            color={hovered || isSelected ? '#ffffff' : '#222226'}
            emissive={project.color}
            emissiveIntensity={hovered || isSelected ? 0.9 : 0.3}
            roughness={0.2}
            metalness={0.8}
          />

          {/* Front Screen Display Texture */}
          <mesh position={[0, 0, 0.06]}>
            <planeGeometry args={[2.6, 1.55]} />
            <meshBasicMaterial map={texture} />
          </mesh>
        </mesh>

        {/* Glow Halo Frame */}
        <mesh position={[0, 2.6, 0]}>
          <boxGeometry args={[3.0, 1.95, 0.06]} />
          <meshBasicMaterial
            color={project.color}
            transparent
            opacity={hovered || isSelected ? 0.65 : 0.25}
            wireframe
          />
        </mesh>

        {/* Pedestal Pillar */}
        <mesh position={[0, 0.8, 0]}>
          <cylinderGeometry args={[0.2, 0.38, 1.6, 16]} />
          <meshStandardMaterial
            color="#18181c"
            metalness={0.9}
            roughness={0.3}
            emissive={project.color}
            emissiveIntensity={0.25}
          />
        </mesh>

        {/* Floor Contact Ring */}
        <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.7, 1.0, 32]} />
          <meshBasicMaterial
            color={project.color}
            transparent
            opacity={hovered || isSelected ? 0.9 : 0.4}
            side={THREE.DoubleSide}
          />
        </mesh>

        {(hovered || isSelected) && (
          <pointLight position={[0, 2.6, 1]} color={project.color} intensity={2.2} distance={5} />
        )}
      </group>
    </group>
  );
}

// -------------------------------------------------------------
// 3D COMPONENT: SPATIAL WEBSITE SECTION MONOLITH STATIONS
// -------------------------------------------------------------
function SpatialStation({ section, onSelect, isSelected }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.position.y = 1.8 + Math.sin(t * 1.4) * 0.1;
      meshRef.current.rotation.y = t * 0.35;
    }
  });

  return (
    <group position={section.position}>
      {/* Base Platform */}
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[1.1, 1.3, 0.3, 16]} />
        <meshStandardMaterial
          color="#161420"
          metalness={0.9}
          roughness={0.2}
          emissive={section.color}
          emissiveIntensity={0.35}
        />
      </mesh>

      {/* Glowing Floor Ring */}
      <mesh position={[0, 0.32, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.8, 1.05, 32]} />
        <meshBasicMaterial color={section.color} transparent opacity={0.7} side={THREE.DoubleSide} />
      </mesh>

      {/* Floating 3D Geometric Tech Monolith */}
      <group
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(section.id);
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
        <mesh>
          <octahedronGeometry args={[0.9, 0]} />
          <meshStandardMaterial
            color={hovered || isSelected ? '#ffffff' : '#221b2d'}
            emissive={section.color}
            emissiveIntensity={hovered || isSelected ? 0.95 : 0.45}
            roughness={0.2}
            metalness={0.9}
            wireframe={!hovered && !isSelected}
          />
        </mesh>

        <mesh scale={[1.2, 1.2, 1.2]}>
          <octahedronGeometry args={[0.9, 0]} />
          <meshBasicMaterial color={section.color} transparent opacity={0.3} wireframe />
        </mesh>

        {/* Station Nameplate */}
        <mesh position={[0, 1.5, 0]}>
          <planeGeometry args={[2.2, 0.38]} />
          <meshBasicMaterial color="#0e0a16" transparent opacity={0.88} />
        </mesh>

        <pointLight position={[0, 0, 0]} color={section.color} intensity={2} distance={4} />
      </group>
    </group>
  );
}

// -------------------------------------------------------------
// 3D COMPONENT: HOLODECK CYBERPUNK FLOOR & CONCENTRIC RINGS
// -------------------------------------------------------------
function HolodeckFloor() {
  return (
    <group position={[0, 0, 0]}>
      {/* Concentric Holodeck Energy Rings */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <ringGeometry args={[6.6, 7.0, 64]} />
        <meshBasicMaterial color="#ff5722" transparent opacity={0.35} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <ringGeometry args={[10.2, 10.6, 64]} />
        <meshBasicMaterial color="#ffa07a" transparent opacity={0.25} />
      </mesh>

      {/* Main Grid Plane */}
      <gridHelper args={[34, 34, '#ff5722', '#260f08']} position={[0, 0, 0]} />

      {/* Outer Ground Disk */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]} receiveShadow>
        <circleGeometry args={[22, 64]} />
        <meshStandardMaterial color="#090508" roughness={0.7} metalness={0.8} />
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

// -------------------------------------------------------------
// MAIN COMPONENT: VRMode
// -------------------------------------------------------------
export default function VRMode({ isOpen, onClose }) {
  const [activeSectionId, setActiveSectionId] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [webXRStatus, setWebXRStatus] = useState('checking');
  const [targetCameraPos, setTargetCameraPos] = useState(null);

  const audioHandleRef = useRef(null);

  // Check WebXR compatibility
  useEffect(() => {
    if (navigator.xr && navigator.xr.isSessionSupported) {
      navigator.xr.isSessionSupported('immersive-vr')
        .then((supported) => setWebXRStatus(supported ? 'supported' : 'unsupported'))
        .catch(() => setWebXRStatus('unsupported'));
    } else {
      setWebXRStatus('unsupported');
    }
  }, []);

  // Spatial audio
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

  // Fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // WebXR Headset Session
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

  // Teleport camera to a section station
  const navigateToSection = (sectionId) => {
    setSelectedProject(null);
    setActiveSectionId(sectionId);
    const sec = SPATIAL_SECTIONS.find((s) => s.id === sectionId);
    if (sec) {
      setTargetCameraPos(new THREE.Vector3(...sec.camPos));
    }
  };

  // Focus a specific project pedestal
  const focusProject = (proj, idx) => {
    setActiveSectionId(null);
    setSelectedProject(proj);
    const angle = (idx / VR_PROJECTS.length) * Math.PI * 2;
    const camDist = 4.2;
    const radius = 6.8;
    const x = Math.sin(angle) * (radius - camDist);
    const z = Math.cos(angle) * (radius - camDist);
    setTargetCameraPos(new THREE.Vector3(x, 2.6, z));
  };

  // Reset view to Holodeck center overview
  const resetCamera = () => {
    setSelectedProject(null);
    setActiveSectionId(null);
    setTargetCameraPos(new THREE.Vector3(0, 4.0, 12));
  };

  if (!isOpen) return null;

  const currentSection = SPATIAL_SECTIONS.find((s) => s.id === activeSectionId);

  return (
    <div className="vr-mode-overlay" role="dialog" aria-modal="true" aria-label="3D VR Portfolio Holodeck">
      {/* 3D WebGL Canvas */}
      <div className="vr-canvas-container">
        <Canvas
          camera={{ position: [0, 4.0, 12], fov: 60 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        >
          <color attach="background" args={['#080407']} />
          <ambientLight intensity={0.7} />
          <pointLight position={[0, 10, 0]} color="#ffffff" intensity={1.5} />
          <pointLight position={[10, 6, 8]} color="#ff5722" intensity={2} />
          <pointLight position={[-10, 6, -8]} color="#ff7043" intensity={1.5} />

          <Suspense fallback={null}>
            <Stars radius={120} depth={60} count={3500} factor={4} saturation={0.8} fade speed={1.2} />
            <HolodeckFloor />

            {/* Central Stage: Farman's 3D Holographic Avatar Model */}
            <FarmanHologramAvatar
              onSelect={navigateToSection}
              isSelected={activeSectionId === 'hero'}
            />

            {/* Orbiting Ring of all 9 Project Pedestals */}
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

            {/* Outer Perimeter Spatial Website Stations */}
            {SPATIAL_SECTIONS.filter((s) => s.id !== 'hero').map((section) => (
              <SpatialStation
                key={section.id}
                section={section}
                onSelect={navigateToSection}
                isSelected={activeSectionId === section.id}
              />
            ))}
          </Suspense>

          <CameraRig targetPos={targetCameraPos} />
          <OrbitControls
            enableDamping
            dampingFactor={0.06}
            maxPolarAngle={Math.PI / 2 + 0.05}
            minDistance={2.5}
            maxDistance={22}
            autoRotate={!selectedProject && !activeSectionId}
            autoRotateSpeed={0.35}
          />
        </Canvas>
      </div>

      {/* VR HUD Top Bar */}
      <div className="vr-hud-topbar">
        <div className="vr-hud-brand">
          <div className="vr-status-beacon" />
          <div className="vr-title-group">
            <span className="vr-hud-title">FARMAN 3D SPATIAL HOLODECK</span>
            <span className="vr-hud-subtitle">Full Website in 3D WebXR · Gangoo, Pulwama (J&amp;K)</span>
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
            <span>{webXRStatus === 'supported' ? 'Enter VR Headset' : 'WebXR Headset'}</span>
          </button>

          {/* Audio toggle */}
          <button
            type="button"
            className="vr-hud-btn"
            onClick={() => setIsAudioMuted(!isAudioMuted)}
            title={isAudioMuted ? 'Unmute Spatial Audio' : 'Mute Spatial Audio'}
          >
            {isAudioMuted ? <FiVolumeX size={17} /> : <FiVolume2 size={17} />}
          </button>

          {/* Fullscreen toggle */}
          <button
            type="button"
            className="vr-hud-btn"
            onClick={toggleFullscreen}
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen Mode'}
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

      {/* Bottom Spatial Navigation Dock for Entire Website */}
      <div className="vr-bottom-dock">
        <div className="vr-dock-label">
          <FiNavigation size={13} />
          <span>Teleport to Section / Station:</span>
        </div>
        <div className="vr-dock-pills">
          {/* All Website Stations */}
          {SPATIAL_SECTIONS.map((sec) => (
            <button
              key={sec.id}
              type="button"
              className={`vr-dock-pill ${activeSectionId === sec.id ? 'is-active' : ''}`}
              onClick={() => navigateToSection(sec.id)}
            >
              <span className="pill-dot" style={{ backgroundColor: sec.color }} />
              <span>{sec.shortTitle}</span>
            </button>
          ))}

          {/* Quick Project Cycle */}
          <button
            type="button"
            className={`vr-dock-pill ${selectedProject ? 'is-active' : ''}`}
            onClick={() => focusProject(VR_PROJECTS[0], 0)}
          >
            <span className="pill-dot" style={{ backgroundColor: '#ffd43b' }} />
            <span>🚀 9 Projects</span>
          </button>

          <button
            type="button"
            className="vr-dock-pill reset-pill"
            onClick={resetCamera}
          >
            <span>Reset View</span>
          </button>
        </div>
      </div>

      {/* INSPECTOR MODAL 1: Selected 3D Spatial Section Modal */}
      {currentSection && (
        <div className="vr-project-modal">
          <div className="vr-modal-card">
            <button
              type="button"
              className="vr-modal-close"
              onClick={() => setActiveSectionId(null)}
            >
              <FiX size={18} />
            </button>

            <div className="vr-modal-header">
              <span className="vr-modal-category" style={{ color: currentSection.color }}>
                SPATIAL STATION // {currentSection.name.toUpperCase()}
              </span>
              <h3 className="vr-modal-title">{currentSection.details.title}</h3>
              <p className="vr-modal-subtitle">{currentSection.details.subtitle}</p>
            </div>

            {currentSection.details.location && (
              <p className="vr-modal-location">
                <FiMapPin size={13} /> {currentSection.details.location}
              </p>
            )}

            {currentSection.details.summary && (
              <p className="vr-modal-desc">{currentSection.details.summary}</p>
            )}

            {/* Section Specific Highlights / Lists */}
            {currentSection.details.highlights && (
              <ul className="vr-modal-list">
                {currentSection.details.highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            )}

            {currentSection.details.affiliations && (
              <ul className="vr-modal-list">
                {currentSection.details.affiliations.map((aff, i) => (
                  <li key={i}><strong>{aff}</strong></li>
                ))}
              </ul>
            )}

            {currentSection.details.skills && (
              <div className="vr-skills-grid">
                {currentSection.details.skills.map((sk) => (
                  <div key={sk.name} className="vr-skill-row">
                    <span className="vr-skill-name">{sk.name}</span>
                    <div className="vr-skill-bar-wrap">
                      <div className="vr-skill-bar" style={{ width: `${sk.level}%` }} />
                    </div>
                    <span className="vr-skill-val">{sk.level}%</span>
                  </div>
                ))}
              </div>
            )}

            {currentSection.details.services && (
              <div className="vr-services-grid">
                {currentSection.details.services.map((svc) => (
                  <div key={svc.title} className="vr-service-card">
                    <h4>{svc.title}</h4>
                    <p>{svc.desc}</p>
                  </div>
                ))}
              </div>
            )}

            {currentSection.details.awards && (
              <div className="vr-awards-list">
                {currentSection.details.awards.map((aw, i) => (
                  <div key={i} className="vr-award-item">
                    <span className="vr-award-year">{aw.year}</span>
                    <div>
                      <strong>{aw.name}</strong>
                      <p>{aw.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {currentSection.details.links && (
              <div className="vr-links-group">
                <div className="vr-contact-info-row">
                  <a href={`mailto:${currentSection.details.email}`} className="vr-link-pill">
                    <FiMail size={14} /> {currentSection.details.email}
                  </a>
                  <a href={`tel:${currentSection.details.phone}`} className="vr-link-pill">
                    <FiPhone size={14} /> {currentSection.details.phone}
                  </a>
                </div>
                <div className="vr-social-links-grid">
                  {currentSection.details.links.map((lnk) => (
                    <a
                      key={lnk.name}
                      href={lnk.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="vr-modal-btn btn-secondary"
                    >
                      <span>{lnk.name}</span>
                      <FiExternalLink size={13} />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* INSPECTOR MODAL 2: Selected Project Hologram Modal */}
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
              <span className="vr-modal-category" style={{ color: selectedProject.color }}>
                {selectedProject.category}
              </span>
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
              {selectedProject.link && (
                <a
                  href={selectedProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="vr-modal-btn btn-secondary"
                >
                  <FiGithub size={15} />
                  <span>Source Code</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Controls Hint Tooltip */}
      <div className="vr-controls-hint">
        <FiInfo size={14} />
        <span>Orbit to look around • Click Farman's 3D Avatar, any of the 9 Projects, or Station Monoliths • Teleport using bottom dock</span>
      </div>
    </div>
  );
}
