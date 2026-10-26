import { useState, useEffect } from "react";
import "./Hero.css";
import profileImg from "../../assets/profile.jpg";
import seamlessPortrait from "../../assets/farman_seamless.png";
import NavBar from "../Navbar/NavBar";
import { useSelector } from "react-redux";
import { FaGithub, FaLinkedin, FaCode } from "react-icons/fa";
import { SiGooglescholar } from "react-icons/si";
import { FiArrowDown, FiArrowUpRight } from "react-icons/fi";
import { scrollToSection } from "../../utils/navigation";

const TYPED_ROLES = [
  "MERN Stack Specialist.",
  "Python & Django Engineer.",
  "React Native Mobile Developer.",
  "Applied Machine Learning Creator.",
  "Building Practical Digital Products."
];

// eslint-disable-next-line react/prop-types
function Hero({ onOpenVR }) {
  const profileData = useSelector((state) => state.profile.data) || {};
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Dynamic typing rotator effect
  useEffect(() => {
    const currentRole = TYPED_ROLES[roleIndex];
    const typingSpeed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayedText(currentRole.substring(0, displayedText.length + 1));
        if (displayedText.length + 1 === currentRole.length) {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        setDisplayedText(currentRole.substring(0, displayedText.length - 1));
        if (displayedText.length === 0) {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % TYPED_ROLES.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, roleIndex]);

  return (
    <section id="home" className="editorial-hero">
      {/* Sunset Atmospheric Backdrop */}
      <div className="editorial-hero-sunset" aria-hidden="true">
        <div className="sunset-glow-core" />
        <div className="sunset-glow-ambient" />
      </div>

      {/* Top Header Navbar sitting inside the sunset sky */}
      <NavBar onOpenVR={onOpenVR} />

      {/* Creator Portrait in Warm Studio Lighting with bottom feather */}
      <div className="editorial-hero-portrait-wrap">
        <img
          src={seamlessPortrait || profileImg}
          alt={profileData.name || "Syed Farman Ali"}
          className="editorial-hero-portrait"
        />
        <div className="portrait-feather-overlay" />
      </div>

      {/* Hero Content Grid matching reference image */}
      <div className="editorial-hero-grid">
        {/* Left Side: Bold Big Heading */}
        <div className="editorial-hero-left">
          <div className="hero-status-pill">
            <span className="hero-status-ping" />
            <span>Available for Full-Stack &amp; Python Roles</span>
          </div>

          <h1 className="editorial-hero-title">
            Crafting Digital<br />Products.
          </h1>

          <div className="hero-dynamic-subtitle">
            <span className="typed-text">{displayedText}</span>
            <span className="typed-cursor">|</span>
          </div>
        </div>

        {/* Right Side: Editorial Statement */}
        <div className="editorial-hero-right">
          <p className="editorial-hero-statement">
            {profileData.heroDescription ||
              "I build high-performance digital products, scalable web platforms, and data-driven systems that turn ambitious concepts into reliable reality."}
          </p>

          <div className="editorial-hero-actions">
            <button
              type="button"
              className="btn-pill-orange"
              onClick={() => scrollToSection("work")}
            >
              Explore My Work <FiArrowDown />
            </button>
            <button
              type="button"
              className="btn-pill-vr-glow"
              onClick={onOpenVR}
              title="Experience 3D Virtual Reality Holodeck"
            >
              <span>🥽</span>
              <span>VR Gallery</span>
            </button>
            <a
              href={profileData.resumeUrl || "https://rxresu.me/farman9/python-django-developer"}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill-dark"
            >
              Resume <FiArrowUpRight />
            </a>
          </div>

          {/* Social Proof Strip */}
          <div className="hero-social-links">
            <a
              href={profileData.githubUrl || "https://github.com/FARMAN9"}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="hero-social-item"
            >
              <FaGithub size={18} />
              <span>GitHub (41+ repos)</span>
            </a>
            <a
              href={profileData.scholarUrl || "https://scholar.google.com/citations?user=y-lv0B0AAAAJ"}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Google Scholar profile"
              className="hero-social-item"
            >
              <SiGooglescholar size={18} />
              <span>Scholar (Research)</span>
            </a>
            <a
              href={profileData.linkedinUrl || "https://www.linkedin.com/in/farman9"}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="hero-social-item"
            >
              <FaLinkedin size={18} />
              <span>LinkedIn</span>
            </a>
            <a
              href={profileData.leetcodeUrl || "https://leetcode.com/saeedfarman9/"}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LeetCode profile"
              className="hero-social-item"
            >
              <FaCode size={18} />
              <span>LeetCode</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
