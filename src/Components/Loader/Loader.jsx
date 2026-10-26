import { useState, useEffect, useRef } from 'react';
import './Loader.css';

// eslint-disable-next-line react/prop-types
function Loader({ onFinished }) {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const onFinishedRef = useRef(onFinished);

  useEffect(() => {
    onFinishedRef.current = onFinished;
  }, [onFinished]);

  useEffect(() => {
    const startTime = Date.now();
    const duration = 1200; // 1.2s smooth entrance

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);

      if (pct >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsFading(true);
          setTimeout(() => {
            if (onFinishedRef.current) {
              onFinishedRef.current();
            }
          }, 350);
        }, 120);
      }
    }, 25);

    return () => clearInterval(interval);
  }, []);

  const getStatusText = () => {
    if (progress < 30) return "INITIALIZING EDITORIAL EXPERIENCE";
    if (progress < 65) return "CALIBRATING 3D SHADERS & AUDIO ENGINE";
    if (progress < 90) return "SYNCHRONIZING GANGOO, PULWAMA (J&K) PORTFOLIO";
    return "WELCOME TO FARMAN'S REALM";
  };

  return (
    <div 
      className={`editorial-loader-overlay ${isFading ? 'is-fading' : ''}`}
      role="status"
      aria-live="polite"
    >
      {/* Sunset Ambient Background Light */}
      <div className="loader-sunset-ambient" aria-hidden="true" />

      <div className="editorial-loader-card">
        {/* Brand Logo with Orange Square Dot */}
        <div className="loader-brand">
          <span className="loader-logo-text">farman</span>
          <span className="loader-logo-dot" aria-hidden="true" />
        </div>

        {/* Status Pill */}
        <div className="loader-status-pill">
          <span className="loader-status-dot" />
          <span className="loader-status-label">{getStatusText()}</span>
        </div>

        {/* Minimal Progress Track */}
        <div className="loader-progress-track">
          <div 
            className="loader-progress-bar" 
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Footer Meta: Location & Percentage */}
        <div className="loader-footer-meta">
          <span className="loader-meta-location">📍 GANGOO, PULWAMA · J&amp;K</span>
          <span className="loader-percent-number">{progress}%</span>
        </div>
      </div>
    </div>
  );
}

export default Loader;
