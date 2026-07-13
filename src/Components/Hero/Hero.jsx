import "./Hero.css";
import profileImg from "../../assets/profile.jpg";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { FaGithub, FaLinkedin, FaCode } from "react-icons/fa";
import React from "react";
import { useSelector } from 'react-redux';
import 'animate.css';
import HeroModel from '../HeroModel/HeroModel';

function Hero() {
  const profileData = useSelector((state) => state.profile.data) || {};

  return (
    <div id="home" className="hero">
      {/* Fullscreen background video */}
      <video
        className="hero-bg-video"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/projects/intro_video.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay so text stays readable */}
      <div className="hero-video-overlay" />

      <div className="hero-top">
        {/* Left: Text content */}
        <div className="hero-left">
          <h1>
            <span className="myname animate__zoomInDown animate__animated">{profileData.name}</span>{" "}
            {profileData.heroTitle}
          </h1>
          <p>{profileData.heroDescription}</p>
          <div className="hero-action">
            <div className="hero-connect">
              <AnchorLink className="anchor-link" offset={50} href="#contact">
                Connect with me
              </AnchorLink>
            </div>
            <a className="hero-resume" href={profileData.resumeUrl} target="_blank" rel="noopener noreferrer">
              My resume
            </a>
          </div>
          <div className="hero-socials">
            <a href={profileData.githubUrl} target="_blank" rel="noopener noreferrer">
              <FaGithub size={30} />
            </a>
            <a href={profileData.linkedinUrl} target="_blank" rel="noopener noreferrer">
              <FaLinkedin size={30} />
            </a>
            <a href={profileData.leetcodeUrl} target="_blank" rel="noopener noreferrer">
              <FaCode size={30} />
            </a>
          </div>
        </div>

        {/* Right: Profile image + 3D model */}
        <div className="hero-right">
          <div className="hero-img-wrapper">
            <img src={profileImg} alt="profile" />
          </div>
          <div className="hero-3d">
            <HeroModel />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
