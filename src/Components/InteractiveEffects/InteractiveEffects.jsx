import { useEffect, useState, useRef } from 'react';
import './InteractiveEffects.css';
import { FiArrowUp } from 'react-icons/fi';

export default function InteractiveEffects() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const reqRef = useRef(null);
  const curPosRef = useRef({ x: -100, y: -100 });
  const targetPosRef = useRef({ x: -100, y: -100 });

  // Detect touch device
  useEffect(() => {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouchDevice(true);
    }
  }, []);

  // Track scroll depth & Back to top visibility
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100));
        setScrollProgress(progress);
        setShowScrollTop(window.scrollY > 320);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Interactive mouse tracking for cursor & gradient background liquid light
  useEffect(() => {
    if (isTouchDevice) return;

    const interactiveBg = document.querySelector('.gradient-bg .interactive');

    const handleMouseMove = (e) => {
      targetPosRef.current = { x: e.clientX, y: e.clientY };

      // Update liquid gradient background position with smooth translate
      if (interactiveBg) {
        interactiveBg.style.transform = `translate(${e.clientX - window.innerWidth / 2}px, ${e.clientY - window.innerHeight / 2}px)`;
      }

      // Check if hovering over clickable element
      const target = e.target;
      const isClickable = target && (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('interactive-hover') ||
        target.classList.contains('project-card')
      );
      setIsHovering(Boolean(isClickable));
    };

    // Smooth cursor interpolation loop (lerp)
    const animateCursor = () => {
      const target = targetPosRef.current;
      const cur = curPosRef.current;

      cur.x += (target.x - cur.x) * 0.22;
      cur.y += (target.y - cur.y) * 0.22;

      setCursorPos({ x: cur.x, y: cur.y });
      reqRef.current = requestAnimationFrame(animateCursor);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    reqRef.current = requestAnimationFrame(animateCursor);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (reqRef.current) cancelAnimationFrame(reqRef.current);
    };
  }, [isTouchDevice]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const circleRadius = 18;
  const circumference = 2 * Math.PI * circleRadius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <>
      {/* Top Reading Progress Bar */}
      <div 
        className="top-scroll-progress-bar"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      {/* Custom Glowing Cursor (non-touch) */}
      {!isTouchDevice && (
        <div 
          className={`custom-cursor-glow ${isHovering ? 'is-hovering' : ''}`}
          style={{
            transform: `translate3d(${cursorPos.x}px, ${cursorPos.y}px, 0)`
          }}
          aria-hidden="true"
        >
          <div className="cursor-dot" />
          <div className="cursor-ring" />
        </div>
      )}

      {/* Floating Back to Top Button with SVG Progress Ring */}
      <button
        type="button"
        className={`floating-scroll-top-btn ${showScrollTop ? 'is-visible' : ''}`}
        onClick={scrollToTop}
        title="Scroll to top"
        aria-label="Scroll back to top"
      >
        <svg className="scroll-progress-ring" width="46" height="46">
          <circle
            className="ring-bg"
            stroke="rgba(255, 255, 255, 0.12)"
            strokeWidth="3"
            fill="transparent"
            r={circleRadius}
            cx="23"
            cy="23"
          />
          <circle
            className="ring-progress"
            stroke="#f76707"
            strokeWidth="3"
            strokeDasharray={circumference}
            style={{ strokeDashoffset }}
            strokeLinecap="round"
            fill="transparent"
            r={circleRadius}
            cx="23"
            cy="23"
          />
        </svg>
        <FiArrowUp size={16} className="scroll-top-icon" />
      </button>
    </>
  );
}
