import "./Hero.css";
import profileImg from "../../assets/profile.jpg";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { FaGithub, FaLinkedin, FaCode } from "react-icons/fa";
import React from "react";
import { useSelector } from 'react-redux';
import 'animate.css';
import ThreeModel from '../ThreeModel/ThreeModel';

function Hero() {
  const profileData = useSelector((state) => state.profile.data) || {};

  return (
    <div id="home" className="hero">
      <div className="hero-images">
        <img src={profileImg} alt="profile" />
        <div className="hero-3d">
          <ThreeModel />
        </div>
      </div>

      <h1>
        <span className="myname animate__zoomInDown animate__animated">{profileData.name}</span> {profileData.heroTitle}
      </h1>
      <p>
        {profileData.heroDescription}
      </p>
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
  );
}

export default Hero;

