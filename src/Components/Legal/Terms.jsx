import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../Navbar/NavBar';
import Footer from '../Footer/Footer';
import './Legal.css';
import 'animate.css';

function Terms() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <NavBar />
      <div className="legal-container">
        <Link to="/" className="back-button">&larr; Back to Home</Link>
        <div className="legal-title">
          <h1 className="animate__animated animate__fadeInDown">Terms & <span>Conditions</span></h1>
        </div>
        <div className="legal-content animate__animated animate__fadeInUp">
          <h2>1. Introduction</h2>
          <p>Welcome to my personal portfolio. By accessing this website, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use my website.</p>
          
          <h2>2. Intellectual Property Rights</h2>
          <p>Other than the content you own, under these Terms, I and/or my licensors own all the intellectual property rights and materials contained in this Website. You are granted a limited license only for purposes of viewing the material contained on this Website.</p>

          <h2>3. Restrictions</h2>
          <p>You are specifically restricted from all of the following:</p>
          <ul>
            <li>Publishing any Website material in any other media without prior consent;</li>
            <li>Selling, sublicensing and/or otherwise commercializing any Website material;</li>
            <li>Using this Website in any way that is or may be damaging to this Website;</li>
            <li>Using this Website in any way that impacts user access to this Website;</li>
            <li>Using this Website contrary to applicable laws and regulations.</li>
          </ul>

          <h2>4. No Warranties</h2>
          <p>This Website is provided "as is," with all faults, and I express no representations or warranties, of any kind related to this Website or the materials contained on this Website.</p>

          <h2>5. Limitation of Liability</h2>
          <p>In no event shall I be held liable for anything arising out of or in any way connected with your use of this Website whether such liability is under contract. I shall not be held liable for any indirect, consequential or special liability arising out of or in any way related to your use of this Website.</p>

          <h2>6. Variation of Terms</h2>
          <p>I am permitted to revise these Terms at any time as I see fit, and by using this Website you are expected to review these Terms on a regular basis.</p>

          <p><em>Last updated: {new Date().toLocaleDateString()}</em></p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Terms;
