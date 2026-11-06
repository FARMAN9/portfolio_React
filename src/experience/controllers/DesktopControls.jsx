import { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { PointerLockControls } from '@react-three/drei';
import * as THREE from 'three';
import { resolveMovement } from './CollisionSystem';
import { OFFICE_BOUNDS } from '../../data/portfolioSource';

/* eslint-disable react/prop-types */
export default function DesktopControls({
  setIsLocked,
  teleportTarget,
  onTeleportComplete,
  onInteractNearby
}) {
  const { camera, gl } = useThree();
  const controlsRef = useRef();

  const keys = useRef({
    forward: false,
    backward: false,
    left: false,
    right: false,
    shift: false
  });

  const moveVector = useRef(new THREE.Vector3());
  const forwardVector = useRef(new THREE.Vector3());
  const sideVector = useRef(new THREE.Vector3());

  // Keyboard Event Listeners
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't intercept when user is typing in form or search input
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;

      switch (e.code) {
        case 'KeyW':
        case 'ArrowUp':
          keys.current.forward = true;
          break;
        case 'KeyS':
        case 'ArrowDown':
          keys.current.backward = true;
          break;
        case 'KeyA':
        case 'ArrowLeft':
          keys.current.left = true;
          break;
        case 'KeyD':
        case 'ArrowRight':
          keys.current.right = true;
          break;
        case 'ShiftLeft':
        case 'ShiftRight':
          keys.current.shift = true;
          break;
        case 'KeyE':
        case 'Enter':
          if (onInteractNearby) onInteractNearby();
          break;
        default:
          break;
      }
    };

    const handleKeyUp = (e) => {
      switch (e.code) {
        case 'KeyW':
        case 'ArrowUp':
          keys.current.forward = false;
          break;
        case 'KeyS':
        case 'ArrowDown':
          keys.current.backward = false;
          break;
        case 'KeyA':
        case 'ArrowLeft':
          keys.current.left = false;
          break;
        case 'KeyD':
        case 'ArrowRight':
          keys.current.right = false;
          break;
        case 'ShiftLeft':
        case 'ShiftRight':
          keys.current.shift = false;
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [onInteractNearby]);

  // Handle Teleport Target Interpolation
  const isTeleporting = useRef(false);
  const teleportProgress = useRef(0);
  const teleportStart = useRef(new THREE.Vector3());
  const teleportEnd = useRef(new THREE.Vector3());
  const teleportLook = useRef(new THREE.Vector3());

  useEffect(() => {
    if (teleportTarget) {
      teleportStart.current.copy(camera.position);
      teleportEnd.current.set(
        teleportTarget.position[0],
        OFFICE_BOUNDS.eyeHeight,
        teleportTarget.position[1] !== undefined ? teleportTarget.position[2] : teleportTarget.position[2]
      );
      teleportLook.current.set(
        teleportTarget.lookAt[0],
        teleportTarget.lookAt[1],
        teleportTarget.lookAt[2]
      );
      teleportProgress.current = 0;
      isTeleporting.current = true;
    }
  }, [teleportTarget, camera]);

  // Movement & Collision Loop
  useFrame((_, delta) => {
    // 1. Handle Smooth Teleport Glide
    if (isTeleporting.current) {
      teleportProgress.current += delta * 2.8;
      if (teleportProgress.current >= 1) {
        camera.position.copy(teleportEnd.current);
        camera.lookAt(teleportLook.current);
        isTeleporting.current = false;
        if (onTeleportComplete) onTeleportComplete();
      } else {
        const t = Math.min(1, teleportProgress.current);
        // Smooth easeInOutQuad
        const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        camera.position.lerpVectors(teleportStart.current, teleportEnd.current, ease);
      }
      return;
    }

    // 2. Normal Walking only when pointer is locked or keys active
    const { forward, backward, left, right, shift } = keys.current;
    if (!forward && !backward && !left && !right) {
      // Ensure camera height stays pinned to eyeHeight
      camera.position.y = OFFICE_BOUNDS.eyeHeight;
      return;
    }

    const speed = (shift ? 4.2 : 2.5) * delta;

    // Get flat horizontal camera directions (XZ plane)
    camera.getWorldDirection(forwardVector.current);
    forwardVector.current.y = 0;
    forwardVector.current.normalize();

    sideVector.current.crossVectors(camera.up, forwardVector.current).normalize();

    moveVector.current.set(0, 0, 0);

    if (forward) moveVector.current.add(forwardVector.current);
    if (backward) moveVector.current.sub(forwardVector.current);
    if (left) moveVector.current.add(sideVector.current);
    if (right) moveVector.current.sub(sideVector.current);

    if (moveVector.current.lengthSq() > 0) {
      moveVector.current.normalize().multiplyScalar(speed);

      const currentPos = { x: camera.position.x, z: camera.position.z };
      const desiredPos = {
        x: camera.position.x + moveVector.current.x,
        z: camera.position.z + moveVector.current.z
      };

      // Check collision and slide along obstacles
      const resolved = resolveMovement(currentPos, desiredPos);
      camera.position.x = resolved.x;
      camera.position.z = resolved.z;
    }

    camera.position.y = OFFICE_BOUNDS.eyeHeight;
  });

  return (
    <PointerLockControls
      ref={controlsRef}
      args={[camera, gl.domElement]}
      onLock={() => setIsLocked(true)}
      onUnlock={() => setIsLocked(false)}
    />
  );
}
