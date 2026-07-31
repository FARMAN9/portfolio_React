import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../Navbar/NavBar';
import Footer from '../Footer/Footer';
import SEO from '../SEO/SEO';
import './Legal.css';
import 'animate.css';

function Privacy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEO
        title="Privacy Policy | Syed Farman Ali Portfolio"
        description="Privacy policy for the personal portfolio website of Syed Farman Ali, including contact form and AI chatbot information."
        path="/privacy"
      />
      <NavBar />
      <div className="legal-container">
        <Link to="/" className="back-button">Back to Home</Link>
        <div className="legal-title">
          <h1 className="animate__animated animate__fadeInDown">Privacy <span>Policy</span></h1>
        </div>
        <div className="legal-content animate__animated animate__fadeInUp">
          <h2>1. Information Collection</h2>
          <p>I value your privacy. This policy outlines the types of personal information that is received and collected by this portfolio and how it is used. I may collect basic contact information (like your name and email address) only if you choose to reach out to me via the contact form.</p>
          
          <h2>2. How I Use Your Information</h2>
          <p>Any of the information I collect from you may be used in the following ways:</p>
          <ul>
            <li>To respond to your inquiries and support needs.</li>
            <li>To improve my website based on the information and feedback I receive from you.</li>
            <li>To follow up on project discussions or job opportunities.</li>
          </ul>

          <h2>3. Cookies and Tracking</h2>
          <p>This website may use &quot;cookies&quot; to enhance user experience. Your web browser places cookies on their hard drive for record-keeping purposes and sometimes to track information about them. You may choose to set your web browser to refuse cookies, or to alert you when cookies are being sent.</p>

          <h2>4. Third-Party Services</h2>
          <p>I do not sell, trade, or otherwise transfer to outside parties your personally identifiable information. This does not include trusted third parties who assist me in operating my website, conducting my business, or servicing you, so long as those parties agree to keep this information confidential.</p>

          <h2>5. AI Chatbot Privacy</h2>
          <p>This site features an AI Chatbot powered by Google Gemini. Please do not submit any sensitive or confidential personal information to the chatbot, as interactions may be processed by third-party AI services to generate responses.</p>

          <h2>6. Consent</h2>
          <p>By using my site, you consent to this website&apos;s privacy policy.</p>

          <p><em>Last updated: {new Date().toLocaleDateString()}</em></p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Privacy;
