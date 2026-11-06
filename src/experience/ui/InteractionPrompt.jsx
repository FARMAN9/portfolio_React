import { FiNavigation, FiInfo, FiMousePointer } from 'react-icons/fi';

/* eslint-disable react/prop-types */
export default function InteractionPrompt({ isLocked, nearbyStation }) {
  return (
    <div className="spatial-hud-prompts" aria-live="polite">
      {nearbyStation ? (
        <div className="hud-prompt-pill is-highlight">
          <FiInfo size={16} />
          <span>Press <strong>[E]</strong> or Click to inspect {nearbyStation.name}</span>
        </div>
      ) : isLocked ? (
        <div className="hud-prompt-pill">
          <FiNavigation size={15} />
          <span><strong>WASD</strong> to Walk • <strong>Mouse</strong> to Look • <strong>ESC</strong> to Unlock Mouse</span>
        </div>
      ) : (
        <div className="hud-prompt-pill is-clickable">
          <FiMousePointer size={15} />
          <span>Click screen to enable WASD walking &amp; mouse-look</span>
        </div>
      )}
    </div>
  );
}
