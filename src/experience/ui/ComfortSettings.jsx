import { FiX, FiCheck } from 'react-icons/fi';

/* eslint-disable react/prop-types */
export default function ComfortSettings({
  isOpen,
  onClose,
  speedMultiplier,
  setSpeedMultiplier,
  snapAngle,
  setSnapAngle,
  isMuted,
  setIsMuted
}) {
  if (!isOpen) return null;

  return (
    <div className="spatial-settings-overlay" onClick={onClose}>
      <div className="spatial-settings-panel" onClick={(e) => e.stopPropagation()}>
        <div className="settings-header">
          <h3>VR &amp; Navigation Comfort</h3>
          <button type="button" onClick={onClose} aria-label="Close settings">
            <FiX size={18} />
          </button>
        </div>

        <div className="settings-group">
          <label>Locomotion Walking Speed</label>
          <div className="settings-options-row">
            {[
              { label: 'Gentle (0.7x)', val: 0.7 },
              { label: 'Normal (1.0x)', val: 1.0 },
              { label: 'Fast (1.4x)', val: 1.4 }
            ].map((opt) => (
              <button
                key={opt.label}
                type="button"
                className={`settings-opt-btn ${speedMultiplier === opt.val ? 'is-active' : ''}`}
                onClick={() => setSpeedMultiplier(opt.val)}
              >
                {speedMultiplier === opt.val && <FiCheck size={14} />} {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div className="settings-group">
          <label>VR Snap Turn Angle (Reduces Motion Sickness)</label>
          <div className="settings-options-row">
            {[
              { label: '30° Snap', val: 30 },
              { label: '45° Snap', val: 45 },
              { label: 'Smooth Turn', val: 0 }
            ].map((opt) => (
              <button
                key={opt.label}
                type="button"
                className={`settings-opt-btn ${snapAngle === opt.val ? 'is-active' : ''}`}
                onClick={() => setSnapAngle(opt.val)}
              >
                {snapAngle === opt.val && <FiCheck size={14} />} {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div className="settings-group">
          <label>Spatial Ambience Audio</label>
          <button
            type="button"
            className={`settings-opt-btn ${!isMuted ? 'is-active' : ''}`}
            onClick={() => setIsMuted(!isMuted)}
          >
            {!isMuted ? '🔊 Ambience Active' : '🔇 Muted'}
          </button>
        </div>
      </div>
    </div>
  );
}

