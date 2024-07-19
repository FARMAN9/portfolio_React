import React from "react";
import "./Footer.css";
import ali from "../../assets/ali.png";
import AnchorLink from 'react-anchor-link-smooth-scroll'

function Footer() {
  return (
    <div className="footer">
      <div className="footer-top">
        <div className="footer-top-left">
          <div className="logo">
          <AnchorLink className='anchor-link' offset={50} href='#home'>
            <h1>FARMAN</h1>
            <img src={ali} alt="" />
            </AnchorLink>
          </div>
       
        </div>
        <p>
        I wanted to take a moment to thank you for visiting my portfolio. Your time and interest in my work are truly appreciated.
        If you have any feedback, questions, or opportunities you'd like to discuss, please don't hesitate to reach out. I'm always eager to connect and explore new possibilities.
          </p>
        <div className="footer-top-right">
         
        </div>
       
        </div>
        <hr />

        <div className="footer-bottom">
          <p className="footer-bottm-left">
            {" "}
            © 2024 Syed Farman Ali. All rights reserved.{" "}
          </p>

          <div className="footer-bottom-right">
            <p>Term of Services</p>
            <p>Privacy Policy</p>
            <AnchorLink className='anchor-link' offset={50} href='#contact'> <p>Connect with me</p></AnchorLink>
          </div>
        </div>
     
    </div>
  );
}

export default Footer;
