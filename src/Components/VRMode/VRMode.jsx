import ImmersiveExperience from '../../experience/ImmersiveExperience';

/**
 * 3D Photorealistic Developer Office & WebXR VR Experience.
 * Mode B of the portfolio, preserving Mode A (Traditional site) 100%.
 */
// eslint-disable-next-line react/prop-types
export default function VRMode({ isOpen, onClose }) {
  if (!isOpen) return null;
  return <ImmersiveExperience isOpen={isOpen} onClose={onClose} />;
}
