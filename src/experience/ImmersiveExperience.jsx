import { useState, useEffect, useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { XR } from '@react-three/xr';
import * as THREE from 'three';
import './ImmersiveExperience.css';

import { xrStore, checkVRSupport, enterVRSession, exitVRSession } from './xr/xrStore';
import OfficeWorld from './world/OfficeWorld';
import DesktopControls from './controllers/DesktopControls';
import VRControls from './controllers/VRControls';
import StationModal from './ui/StationModal';
import ComfortSettings from './ui/ComfortSettings';
import InteractionPrompt from './ui/InteractionPrompt';
import ExperienceLoader from './ui/ExperienceLoader';
import { OFFICE_STATIONS } from '../data/portfolioSource';

import {
  FiX,
  FiMaximize,
  FiMinimize,
  FiVolume2,
  FiVolumeX,
  FiSettings,
  FiNavigation
} from 'react-icons/fi';
import { FaVrCardboard } from 'react-icons/fa';

/* eslint-disable react/prop-types */
export default function ImmersiveExperience({ isOpen, onClose }) {
  const [vrSupported, setVrSupported] = useState(false);
  const [inVR, setInVR] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [speedMultiplier, setSpeedMultiplier] = useState(1.0);
  const [snapAngle, setSnapAngle] = useState(30);
  const [isLocked, setIsLocked] = useState(false);
  const [teleportTarget, setTeleportTarget] = useState(null);
  const [activeStation, setActiveStation] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [isStudioReady, setIsStudioReady] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  // Background audio synth / ambience ref
  const audioContextRef = useRef(null);
  const ambientGainRef = useRef(null);

  // Check WebXR support on mount
  useEffect(() => {
    checkVRSupport().then((supported) => setVrSupported(supported));

    // Subscribe to XR session changes
    const unsub = xrStore.subscribe((state) => {
      const active = Boolean(state.session);
      setInVR(active);
      if (!active && inVR) {
        setStatusMessage('Immersive VR session completed.');
      }
    });

    return () => unsub();
  }, [inVR]);

  // Fullscreen change listener
  useEffect(() => {
    const handleFullscreen = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFullscreen);
    return () => document.removeEventListener('fullscreenchange', handleFullscreen);
  }, []);

  // Ambient sound synthesizer
  useEffect(() => {
    if (isMuted) {
      if (ambientGainRef.current) {
        ambientGainRef.current.gain.setTargetAtTime(0, audioContextRef.current?.currentTime || 0, 0.1);
      }
      return;
    }

    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioCtx();
        const osc = audioContextRef.current.createOscillator();
        const gain = audioContextRef.current.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(65.41, audioContextRef.current.currentTime); // C2 deep warm hum
        gain.gain.setValueAtTime(0.015, audioContextRef.current.currentTime);
        osc.connect(gain);
        gain.connect(audioContextRef.current.destination);
        osc.start();
        ambientGainRef.current = gain;
      } else if (audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
        ambientGainRef.current?.gain.setTargetAtTime(0.015, audioContextRef.current.currentTime, 0.2);
      } else {
        ambientGainRef.current?.gain.setTargetAtTime(0.015, audioContextRef.current.currentTime, 0.2);
      }
    } catch {
      // Audio context blocked
    }

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(() => {});
        audioContextRef.current = null;
      }
    };
  }, [isMuted]);

  // Clean up on unmount or close
  useEffect(() => {
    if (!isOpen) {
      if (isLocked) {
        document.exitPointerLock?.();
      }
      exitVRSession();
      setHasStarted(false);
    }
  }, [isOpen, isLocked]);

  if (!isOpen) return null;

  // Toggle Fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {
        setStatusMessage('Fullscreen unavailable in this browser.');
      });
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  // Launch WebXR Immersive Session
  const handleEnterVR = async () => {
    if (!vrSupported) {
      setStatusMessage('No WebXR headset detected. Enjoy full 3D interactive mode using WASD and mouse!');
      return;
    }

    try {
      setStatusMessage('Connecting to WebXR headset...');
      await enterVRSession();
      setStatusMessage('Headset connected. Use left controller to walk, right to inspect.');
    } catch (err) {
      setStatusMessage(err?.message ? `VR session error: ${err.message}` : 'Could not launch VR session.');
    }
  };

  // Station Teleportation
  const handleTeleportToStation = (stationId) => {
    const target = OFFICE_STATIONS.find((s) => s.id === stationId);
    if (target) {
      setTeleportTarget(target);
      setStatusMessage(`Navigating to ${target.name}...`);
    }
  };

  return (
    <div className="immersive-experience-container" role="dialog" aria-modal="true" aria-label="Syed Farman Ali 3D Studio">
      {/* Three.js R3F WebGL Canvas */}
      <Canvas
        shadows={{ type: THREE.PCFSoftShadowMap }}
        camera={{ position: [0, 1.68, 4.4], fov: 65, near: 0.1, far: 50 }}
        dpr={[1, Math.min(window.devicePixelRatio || 1, 1.75)]}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.05
        }}
        onCreated={({ gl }) => {
          gl.setClearColor('#0a0c10');
          setIsStudioReady(true);
        }}
      >
        <XR store={xrStore}>
          {/* Desktop First-Person Controls with Collision */}
          <DesktopControls
            isLocked={isLocked}
            setIsLocked={setIsLocked}
            teleportTarget={teleportTarget}
            onTeleportComplete={() => setTeleportTarget(null)}
            onInteractNearby={() => {
              if (!activeStation) setActiveStation('workstation');
            }}
          />

          {/* WebXR Controller Locomotion & Snap Turn */}
          <VRControls
            speedMultiplier={speedMultiplier}
            snapAngle={snapAngle}
          />

          {/* 3D Modern Architectural Developer Office */}
          <Suspense fallback={null}>
            <OfficeWorld
              onSelectStation={(id) => setActiveStation(id)}
              onSelectProject={(project) => setSelectedProject(project)}
              onSelectSkill={(skill) => setSelectedSkill(skill)}
            />
          </Suspense>
        </XR>
      </Canvas>

      {/* Initial Experience Loader */}
      {!hasStarted && (
        <ExperienceLoader
          isReady={isStudioReady}
          onStart={() => {
            setHasStarted(true);
            setStatusMessage('Studio loaded. Click anywhere on screen to enter mouse-look mode.');
          }}
        />
      )}

      {/* Top HUD Controls Bar */}
      <header className="spatial-top-hud">
        <div className="spatial-brand-pill">
          <span className="brand-dot-pulse" />
          <span className="brand-name">FARMAN</span>
          <span className="brand-badge">3D STUDIO</span>
        </div>

        <div className="spatial-hud-actions">
          {/* WebXR Enter Button */}
          <button
            type="button"
            className={`btn-hud-vr ${vrSupported ? 'is-supported' : ''} ${inVR ? 'is-active' : ''}`}
            onClick={inVR ? exitVRSession : handleEnterVR}
            title={vrSupported ? 'Enter Immersive WebXR VR' : 'WebXR headset not detected'}
          >
            <FaVrCardboard size={16} />
            <span>{inVR ? 'Exit VR' : vrSupported ? 'Enter VR' : 'VR Ready'}</span>
          </button>

          {/* Settings / Comfort */}
          <button
            type="button"
            className="btn-hud-icon"
            onClick={() => setIsSettingsOpen(true)}
            aria-label="Comfort Settings"
            title="Navigation and Comfort Settings"
          >
            <FiSettings size={17} />
          </button>

          {/* Audio Ambience Toggle */}
          <button
            type="button"
            className="btn-hud-icon"
            onClick={() => setIsMuted(!isMuted)}
            aria-label={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            title={isMuted ? 'Enable Ambience' : 'Mute Ambience'}
          >
            {isMuted ? <FiVolumeX size={17} /> : <FiVolume2 size={17} />}
          </button>

          {/* Fullscreen Toggle */}
          <button
            type="button"
            className="btn-hud-icon"
            onClick={toggleFullscreen}
            aria-label="Toggle Fullscreen"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <FiMinimize size={17} /> : <FiMaximize size={17} />}
          </button>

          {/* Close Studio / Back to Site */}
          <button
            type="button"
            className="btn-hud-close"
            onClick={onClose}
            aria-label="Exit 3D Studio"
            title="Return to Traditional Portfolio"
          >
            <FiX size={18} />
            <span>Exit Studio</span>
          </button>
        </div>
      </header>

      {/* Center Interaction HUD Prompt */}
      {hasStarted && (
        <InteractionPrompt
          isLocked={isLocked}
          nearbyStation={null}
        />
      )}

      {/* Ephemeral Status Toast */}
      {statusMessage && (
        <div className="spatial-status-toast" role="status">
          <span>{statusMessage}</span>
          <button
            type="button"
            onClick={() => setStatusMessage('')}
            aria-label="Dismiss message"
          >
            <FiX size={14} />
          </button>
        </div>
      )}

      {/* Bottom Spatial Navigation Dock */}
      {hasStarted && (
        <nav className="spatial-bottom-dock" aria-label="Station Quick Teleport">
          <div className="dock-label">
            <FiNavigation size={13} />
            <span>QUICK TELEPORT</span>
          </div>
          <div className="dock-buttons-strip">
            {OFFICE_STATIONS.map((station) => (
              <button
                key={station.id}
                type="button"
                className={`dock-station-btn ${activeStation === station.id ? 'is-active' : ''}`}
                onClick={() => handleTeleportToStation(station.id)}
              >
                <span className="station-badge">{station.badge}</span>
                <span className="station-name">{station.name}</span>
              </button>
            ))}
          </div>
        </nav>
      )}

      {/* Station Modal Details View */}
      <StationModal
        activeStation={activeStation}
        selectedProject={selectedProject}
        selectedSkill={selectedSkill}
        onClose={() => {
          setActiveStation(null);
          setSelectedProject(null);
          setSelectedSkill(null);
        }}
      />

      {/* Comfort Settings Dialog */}
      <ComfortSettings
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        speedMultiplier={speedMultiplier}
        setSpeedMultiplier={setSpeedMultiplier}
        snapAngle={snapAngle}
        setSnapAngle={setSnapAngle}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
      />
    </div>
  );
}
