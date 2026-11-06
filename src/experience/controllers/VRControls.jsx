import { useRef, useMemo } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { createXRControllerLocomotionUpdate } from '@pmndrs/xr';
import { resolveMovement } from './CollisionSystem';
import { xrStore } from '../xr/xrStore';
import { OFFICE_BOUNDS } from '../../data/portfolioSource';

/* eslint-disable react/prop-types */
export default function VRControls({ speedMultiplier = 1.0, snapAngle = 30 }) {
  const { camera } = useThree();
  const updateLocomotion = useMemo(() => createXRControllerLocomotionUpdate(), []);
  const lastPos = useRef({ x: 0, z: 0 });

  useFrame((_, delta) => {
    // Only run when an active XR session exists
    const session = xrStore.getState()?.session;
    if (!session) return;

    // Call XR controller locomotion update
    // Left hand controls translation (smooth walking), right hand controls snap rotation
    updateLocomotion(
      (velocity, rotationVelocityY) => {
        // 1. Handle Snap / Smooth Rotation
        if (rotationVelocityY !== 0) {
          camera.rotation.y += rotationVelocityY;
        }

        // 2. Handle Locomotion Velocity with Collision Detection
        if (velocity && velocity.lengthSq() > 0.0001) {
          lastPos.current.x = camera.position.x;
          lastPos.current.z = camera.position.z;

          const desiredPos = {
            x: camera.position.x + velocity.x,
            z: camera.position.z + velocity.z
          };

          // Slide and collide against walls and furniture
          const resolved = resolveMovement(lastPos.current, desiredPos);
          camera.position.x = resolved.x;
          camera.position.z = resolved.z;
        }

        // Keep player feet on the walkable floor level
        if (camera.position.y < 0.2) {
          camera.position.y = OFFICE_BOUNDS.eyeHeight;
        }
      },
      xrStore,
      camera,
      delta,
      { speed: 2.2 * speedMultiplier },
      { type: 'snap', degrees: snapAngle, deadZone: 0.18 },
      'left'
    );
  });

  return null;
}

