import "./Hero.css";
import profile from "../../assets/profile.jpg";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { FaGithub, FaLinkedin, FaCode } from "react-icons/fa";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

function Hero() {
  const imageRef = useRef(null); // Create a reference for the image

  useEffect(() => {
    // GSAP animation for the hero element
    gsap.fromTo(
      heroRef.current,
      { x: -100, opacity: 0, scale: 0.8, rotate: "0" },
      {
        x: 100,
        opacity: 1,
        scale: 1.2,
        rotate: "360deg",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "elastic.out(1, 0.5)",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top bottom",
          end: "top 50%",
          scrub: true,
        },
      }
    );

    // GSAP animation for image hover effect
    const handleMouseEnter = () => {
      gsap.to(imageRef.current, {
        scale: 1.1,
        rotate: "5deg",
        duration: 0.3,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(imageRef.current, {
        scale: 1,
        rotate: "0deg",
        duration: 0.3,
      });
    };

    const imgElement = imageRef.current;
    imgElement.addEventListener("mouseenter", handleMouseEnter);
    imgElement.addEventListener("mouseleave", handleMouseLeave);

    // Cleanup event listeners on unmount
    return () => {
      imgElement.removeEventListener("mouseenter", handleMouseEnter);
      imgElement.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);
  return (
    <div id="home" className="hero">
      <div className="border-wrapper">
        <img
          // Reference for the image
          src={profile}
          alt="profile"
          style={{
            display: "block",
            borderRadius: "50%",
            width: "20rem",
            height: "20rem",
            marginTop: "150px",
            position: "relative",
            zIndex: 1,
          }}
        />
      </div>
      <h1>
        <span className="myname">I'm Syed Farman Ali,</span> full stack
        developer based in India
      </h1>
      <p>
        I am from Jammu and Kashmir, with 1 year of experience in multiple
        companies and organizations like Jammu and Kashmir Police (CID) and
        Aharbal.
      </p>
      <div className="hero-action">
        <div className="hero-connect">
          <AnchorLink className="anchor-link" offset={50} href="#contact">
            Connect with me
          </AnchorLink>
        </div>
        <a
          className="hero-resume"
          href="https://rxresu.me/farman9/python-django-developer">
          My resume
        </a>
      </div>
      <div className="hero-socials">
        <a
          href="https://github.com/farman9"
          target="_blank"
          rel="noopener noreferrer">
          <FaGithub size={30} />
        </a>
        <a
          href="https://www.linkedin.com/in/farman9"
          target="_blank"
          rel="noopener noreferrer">
          <FaLinkedin size={30} />
        </a>
        <a
          href="https://leetcode.com/u/saeedfarman9/"
          target="_blank"
          rel="noopener noreferrer">
          <FaCode size={30} />
        </a>
      </div>
    </div>
  );
}

export default Hero;
