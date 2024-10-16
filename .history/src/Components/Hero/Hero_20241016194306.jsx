import "./Hero.css";
import profile from "../../assets/profile.jpg";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { FaGithub, FaLinkedin, FaCode } from "react-icons/fa";
import { useGSAP } from "@gsap/react";
import React, { useRef } from "react";
import gsap from "gsap";

function Hero() {
  const hero = useRef();
  useGSAP(
    () => {
      gsap.to(hero.current, { x: 100 
        ease: "back.out(1)",
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        scrollTrigger: {
          trigger: hero.current,
          start: "top bottom",
          end: "top 80%",
          scrub: true,
        }
      });
    },
    { scope: hero }
  );
  return (
    <div id="home" className="hero">
      <img src={profile} alt="profile" />
      <h1>
        <span className="myname" ref={hero}>
          I'm Syed Farman Ali,
        </span>{" "}
        full stack developer based in India
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
