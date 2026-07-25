import "./Hero.css";
import profileImg from "../../assets/profile.jpg";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { FaGithub, FaLinkedin, FaCode, FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import { FiArrowUpRight, FiMail } from "react-icons/fi";
import { lazy, Suspense, useState, useRef } from "react";
import { useSelector } from 'react-redux';
import 'animate.css';

const HeroModel = lazy(() => import('../HeroModel/HeroModel'));

function ThreeSceneLoader() {
  return (
    <div className="hero-3d-loader" aria-label="Loading 3D profile accent">
      <div className="hero-3d-loader-ring" />
      <div className="hero-3d-loader-core" />
      <span>3D</span>
    </div>
  );
}

function Hero() {
  const profileData = useSelector((state) => state.profile.data) || {};
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <div id="home" className="hero">
      {/* Fullscreen background video */}
      <video
        ref={videoRef}
        className="hero-bg-video"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
      >
        <source src="/projects/intro_video.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay so text stays readable */}
      <div className="hero-video-overlay" />

      {/* Mute/Unmute audio control */}
      <button 
        className="hero-mute-btn" 
        onClick={toggleMute} 
        aria-label={isMuted ? "Unmute video" : "Mute video"}
      >
        {isMuted ? <FaVolumeMute size={18} /> : <FaVolumeUp size={18} />}
      </button>

      <div className="hero-top">
        <div className="hero-left">
          <div className="hero-kicker">
            <span>Available for full-stack projects</span>
            <span>India</span>
          </div>
          <h1>
            <span className="myname animate__zoomInDown animate__animated">{profileData.name}</span>
            <br />
            {profileData.heroTitle}
          </h1>
          <p>{profileData.heroDescription}</p>
          <div className="hero-proof">
            <div><strong>{profileData.publicRepos || "41"}</strong><span>Public repos</span></div>
            <div><strong>{profileData.projectsCompleted || "10+"}</strong><span>Projects</span></div>
            <div><strong>{profileData.experienceYears || "1+"}</strong><span>Years practice</span></div>
          </div>
          <div className="hero-action">
            <div className="hero-connect">
              <AnchorLink className="anchor-link" offset={50} href="#contact">
                <FiMail /> Contact me
              </AnchorLink>
            </div>
            <a className="hero-resume" href={profileData.resumeUrl} target="_blank" rel="noopener noreferrer">
              Resume <FiArrowUpRight />
            </a>
          </div>
          <div className="hero-socials">
            <a href={profileData.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile">
              <FaGithub size={30} />
            </a>
            <a href={profileData.linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile">
              <FaLinkedin size={30} />
            </a>
            <a href={profileData.leetcodeUrl} target="_blank" rel="noopener noreferrer" aria-label="LeetCode profile">
              <FaCode size={30} />
            </a>
          </div>
        </div>

        <div className="hero-right">
          <div className="hero-img-wrapper">
            <img src={profileImg} alt="Syed Farman Ali" />
            <div className="hero-profile-note">
              <strong>MERN + Python</strong>
              <span>React Native, Django, ML</span>
            </div>
          </div>
          <div className="hero-3d">
            <Suspense fallback={<ThreeSceneLoader />}>
              <HeroModel />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
