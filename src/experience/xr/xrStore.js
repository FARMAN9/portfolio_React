import { createXRStore } from '@react-three/xr';

/**
 * Shared WebXR store singleton.
 * Configured per specifications:
 * - offerSession: false (user-initiated entry only, no auto launch)
 * - emulate: false (real hardware detection)
 */
export const xrStore = createXRStore({
  offerSession: false,
  emulate: false
});

/**
 * Check if the browser and device support WebXR immersive-vr.
 */
export async function checkVRSupport() {
  if (typeof window === 'undefined' || !navigator?.xr) {
    return false;
  }
  try {
    return await navigator.xr.isSessionSupported('immersive-vr');
  } catch {
    return false;
  }
}

/**
 * Enter immersive VR session on explicit user action.
 */
export async function enterVRSession() {
  try {
    return await xrStore.enterVR();
  } catch (err) {
    console.warn('[WebXR] Failed to enter immersive-vr:', err);
    throw err;
  }
}

/**
 * Exit active immersive VR session safely.
 */
export async function exitVRSession() {
  try {
    const session = xrStore.getState()?.session;
    if (session) {
      await session.end();
    }
  } catch (err) {
    console.warn('[WebXR] Failed to exit immersive-vr cleanly:', err);
  }
}

