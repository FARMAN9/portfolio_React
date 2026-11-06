import { useProgress } from '@react-three/drei';

/* eslint-disable react/prop-types */
export default function ExperienceLoader({ isReady, onStart }) {
  const { progress } = useProgress();
  const displayProgress = Math.min(100, Math.floor(Math.max(progress, isReady ? 100 : 15)));

  return (
    <div className="spatial-loader-backdrop">
      <div className="spatial-loader-card">
        <div className="spatial-loader-badge">
          <span className="loader-status-dot" />
          <span>PHOTOREALISTIC 3D STUDIO</span>
        </div>

        <h1 className="spatial-loader-title">Syed Farman Ali</h1>
        <p className="spatial-loader-subtitle">
          Architectural Developer Office &amp; WebXR Spatial Studio
        </p>

        {/* Progress Bar */}
        <div className="spatial-loader-track">
          <div
            className="spatial-loader-fill"
            style={{ width: `${displayProgress}%` }}
          />
        </div>
        <div className="spatial-loader-percent">
          <span>{displayProgress < 100 ? 'Rendering materials & geometry...' : 'Studio environment ready'}</span>
          <span>{displayProgress}%</span>
        </div>

        {/* Enter Button */}
        <div className="spatial-loader-actions">
          <button
            type="button"
            className="btn-pill-orange btn-enter-studio"
            onClick={onStart}
            disabled={displayProgress < 60}
          >
            <span>Enter Studio</span>
            <span>→</span>
          </button>
        </div>

        <div className="spatial-loader-tips">
          <span>💡 Desktop: Click to lock mouse • WASD to walk • ESC to release</span>
        </div>
      </div>
    </div>
  );
}

