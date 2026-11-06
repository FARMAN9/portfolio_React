import { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { XR } from '@react-three/xr';
import * as THREE from 'three';
import './ImmersiveExperience.css';

import { xrStore, checkVRSupport, enterVRSession, exitVRSession } from './xr/xrStore';
import soulfulAudio, { SOULFUL_TRACKS } from './audio/SoulfulAudioEngine';
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
  FiSettings,
  FiNavigation,
  FiPlay,
  FiPause,
  FiSkipForward
} from 'react-icons/fi';
import { FaVrCardboard } from 'react-icons/fa';

/* eslint-disable react/prop-types */
export default function ImmersiveExperience({ isOpen, onClose }) {
  const [vrSupported, setVrSupported] = useState(false);
  const [inVR, setInVR] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);
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

  // Soulful Audio state tracking
  const [audioState, setAudioState] = useState(() => ({
    isPlaying: soulfulAudio.isPlaying,
    currentTrack: SOULFUL_TRACKS[soulfulAudio.currentTrackIndex],
    trackIndex: soulfulAudio.currentTrackIndex,
    volume: soulfulAudio.volume
  }));

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

  // Subscribe to Soulful Audio changes
  useEffect(() => {
    return soulfulAudio.subscribe((state) => {
      setAudioState(state);
    });
  }, []);

  // Fullscreen change listener
  useEffect(() => {
    const handleFullscreen = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFullscreen);
    return () => document.removeEventListener('fullscreenchange', handleFullscreen);
  }, []);

  // Clean up on unmount or close
  useEffect(() => {
    if (!isOpen) {
      if (isLocked) {
        document.exitPointerLock?.();
      }
      exitVRSession();
      soulfulAudio.stop();
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
          toneMappingExposure: 1.35
        }}
        onCreated={({ gl }) => {
          gl.setClearColor('#c8e1f5');
          setIsStudioReady(true);
        }}
      >
        <XR store={xrStore}>
          {/* Desktop First-Person Controls with Real Collision Detection */}
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

          {/* 3D Modern Architectural Sunlit Developer Office */}
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
            soulfulAudio.start();
            setStatusMessage('Studio loaded. Soulful music playing. Click anywhere to look around.');
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

        {/* Soulful Audio Player Widget */}
        <div className="spatial-audio-pill" title="Soulful Studio Soundscape">
          <button
            type="button"
            className="btn-audio-toggle"
            onClick={() => soulfulAudio.toggle()}
            aria-label={audioState.isPlaying ? 'Pause Soulful Music' : 'Play Soulful Music'}
          >
            {audioState.isPlaying ? <FiPause size={15} /> : <FiPlay size={15} />}
          </button>
          <div
            className="audio-track-info"
            onClick={() => soulfulAudio.nextTrack()}
            title="Click to switch track"
          >
            <span className="audio-track-title">
              {audioState.currentTrack?.title || 'Soulful Piano Ambient'}
            </span>
            <span className="audio-track-artist">
              {audioState.currentTrack?.artist || 'Kai Engel'}
            </span>
          </div>
          <button
            type="button"
            className="btn-audio-skip"
            onClick={() => soulfulAudio.nextTrack()}
            title="Next Track"
            aria-label="Next Track"
          >
            <FiSkipForward size={14} />
          </button>
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
        <div className="spatial-status-toast" role="status" aria-live="polite">
          <span>{statusMessage}</span>
          <button
            type="button"
            onClick={() => setStatusMessage('')}
            aria-label="Dismiss toast"
          >
            ×
          </button>
        </div>
      )}

      {/* Bottom Teleport Navigation Bar */}
      <nav className="spatial-bottom-nav" aria-label="Studio Station Teleportation">
        <div className="teleport-label">
          <FiNavigation size={13} />
          <span>Quick Teleport:</span>
        </div>
        <div className="teleport-buttons-row">
          {OFFICE_STATIONS.map((station) => (
            <button
              key={station.id}
              type="button"
              className="btn-teleport-station"
              onClick={() => handleTeleportToStation(station.id)}
              title={station.hint}
            >
              <span>{station.name}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Station Modal for Detailed Portfolio Content */}
      <StationModal
        activeStation={activeStation}
        onClose={() => setActiveStation(null)}
        selectedProject={selectedProject}
        onCloseProject={() => setSelectedProject(null)}
        selectedSkill={selectedSkill}
        onCloseSkill={() => setSelectedSkill(null)}
      />

      {/* Comfort & Movement Settings Modal */}
      <ComfortSettings
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        speedMultiplier={speedMultiplier}
        setSpeedMultiplier={setSpeedMultiplier}
        snapAngle={snapAngle}
        setSnapAngle={setSnapAngle}
        isMuted={!audioState.isPlaying}
        setIsMuted={(muted) => {
          if (muted) soulfulAudio.stop();
          else soulfulAudio.start();
        }}
      />
    </div>
  );
}
