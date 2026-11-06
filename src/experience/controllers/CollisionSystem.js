import { OFFICE_BOUNDS, OFFICE_OBSTACLES } from '../../data/portfolioSource';

const PLAYER_RADIUS = 0.36;

/**
 * Checks if a 2D point (x, z) collides with room walls or any furniture obstacle.
 */
export function isColliding(x, z, radius = PLAYER_RADIUS) {
  // 1. Room boundaries check
  if (
    x - radius < OFFICE_BOUNDS.minX ||
    x + radius > OFFICE_BOUNDS.maxX ||
    z - radius < OFFICE_BOUNDS.minZ ||
    z + radius > OFFICE_BOUNDS.maxZ
  ) {
    return true;
  }

  // 2. Obstacles check (AABB with player radius padding)
  for (let i = 0; i < OFFICE_OBSTACLES.length; i++) {
    const obs = OFFICE_OBSTACLES[i];
    if (
      x + radius > obs.minX &&
      x - radius < obs.maxX &&
      z + radius > obs.minZ &&
      z - radius < obs.maxZ
    ) {
      return true;
    }
  }

  return false;
}

/**
 * Resolves movement from currentPos to desiredPos with sliding support.
 * If moving directly into an obstacle, it tests if sliding along X or Z is valid.
 */
export function resolveMovement(currentPos, desiredPos, radius = PLAYER_RADIUS) {
  const result = { x: currentPos.x, z: currentPos.z };

  // Try moving both axes
  if (!isColliding(desiredPos.x, desiredPos.z, radius)) {
    result.x = desiredPos.x;
    result.z = desiredPos.z;
    return result;
  }

  // Slide along X
  if (!isColliding(desiredPos.x, currentPos.z, radius)) {
    result.x = desiredPos.x;
  }

  // Slide along Z
  if (!isColliding(currentPos.x, desiredPos.z, radius)) {
    result.z = desiredPos.z;
  }

  return result;
}

