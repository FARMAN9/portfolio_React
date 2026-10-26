import { useState } from "react";
import "./Contact.css";
import profileImg from "../../assets/profile.jpg";
import { useSelector } from "react-redux";
import { FiMail, FiPhone, FiMapPin, FiArrowUpRight, FiSend, FiCheckCircle } from "react-icons/fi";
import { FaGithub, FaLinkedin, FaCode } from "react-icons/fa";
import { SiGooglescholar } from "react-icons/si";
import { Link } from "react-router-dom";
import { scrollToSection } from "../../utils/navigation";

const WEB3FORMS_KEY = "fc7158de-ce59-41ff-9c1e-672e25c721db";

function Contact() {
  const profileData = useSelector((state) => state.profile.data) || {};
  const [result, setResult] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setResult("Sending message...");

    const formData = new FormData(event.target);
    formData.append("access_key", WEB3FORMS_KEY);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      const data = await response.json();

      if (data.success) {
        setIsSuccess(true);
        setResult("Message sent successfully! Farman will reply shortly. 🚀");
        event.target.reset();
      } else {
        setResult(data.message || "Failed to send. Please email directly.");
      }
    } catch {
      setResult("Network error. Please email saeedfarman9@gmail.com directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="editorial-section editorial-contact-section">
      {/* Left Margin Indicator */}
      <div className="section-indicator">
        <span className="section-indicator-dot" />
        <span>CONTACT / 07</span>
      </div>

      {/* Main Content */}
      <div className="editorial-content-area">
        {/* Top 3-Column Finale matching reference image */}
        <div className="contact-finale-grid">
          {/* Left Column: Socials, Contact Info, Internal Nav */}
          <div className="contact-links-col">
            <div className="contact-social-block">
              <span className="contact-col-label">Socials &amp; Profiles</span>
              <div className="contact-profiles-list">
                <a
                  href={profileData.githubUrl || "https://github.com/FARMAN9"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-profile-link"
                >
                  <FaGithub size={16} /> GitHub / FARMAN9 <FiArrowUpRight size={13} />
                </a>
                <a
                  href={profileData.scholarUrl || "https://scholar.google.com/citations?user=y-lv0B0AAAAJ"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-profile-link"
                >
                  <SiGooglescholar size={16} /> Google Scholar / Research <FiArrowUpRight size={13} />
                </a>
                <a
                  href={profileData.linkedinUrl || "https://www.linkedin.com/in/farman9"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-profile-link"
                >
                  <FaLinkedin size={16} /> LinkedIn / farman9 <FiArrowUpRight size={13} />
                </a>
                <a
                  href={profileData.leetcodeUrl || "https://leetcode.com/saeedfarman9/"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-profile-link"
                >
                  <FaCode size={16} /> LeetCode / saeedfarman9 <FiArrowUpRight size={13} />
                </a>
                <a
                  href={profileData.resumeUrl || "https://rxresu.me/farman9/python-django-developer"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-profile-link"
                >
                  <FiArrowUpRight size={16} /> View Resume / CV
                </a>
              </div>
            </div>

            <div className="contact-direct-block">
              <span className="contact-col-label">Direct Communication</span>
              <a href="mailto:saeedfarman9@gmail.com" className="contact-direct-item">
                <FiMail size={15} /> saeedfarman9@gmail.com
              </a>
              <a href="tel:+916005943382" className="contact-direct-item">
                <FiPhone size={15} /> +91 6005943382
              </a>
              <span className="contact-direct-item">
                <FiMapPin size={15} /> Gangoo, Pulwama, Jammu &amp; Kashmir, India
              </span>
            </div>

            <div className="contact-nav-breadcrumbs">
              <button type="button" onClick={() => scrollToSection("home")}>Home</button>
              <button type="button" onClick={() => scrollToSection("work")}>Work</button>
              <button type="button" onClick={() => scrollToSection("services")}>Services</button>
              <button type="button" onClick={() => scrollToSection("testimonials")}>Reviews</button>
              <button type="button" onClick={() => scrollToSection("recognition")}>Milestones</button>
            </div>
          </div>

          {/* Center Column: Portrait in Warm Lighting matching reference */}
          <div className="contact-portrait-col">
            <div className="contact-thumbnail-frame">
              <img
                src={profileImg}
                alt="Syed Farman Ali"
                className="contact-thumbnail-img"
              />
              <div className="contact-thumbnail-glow" />
            </div>
          </div>

          {/* Right Column: Let's Create Together Heading & Button */}
          <div className="contact-cta-col">
            <h2 className="contact-huge-heading">
              Let&apos;s Create<br />Together.
            </h2>
            <p className="contact-cta-subtext">
              Available for full-stack MERN, Python/Django engineering, React Native mobile apps, and machine-learning projects.
            </p>

            <button
              type="button"
              className="btn-pill-orange btn-get-in-touch"
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? "Hide Message Form" : "Get In Touch →"}
            </button>
          </div>
        </div>

        {/* Interactive Form Drawer */}
        {showForm && (
          <div className="interactive-contact-form-box">
            <form onSubmit={onSubmit} className="editorial-contact-form">
              <div className="form-fields-row">
                <div className="form-field-group">
                  <label htmlFor="user_name">Your Name</label>
                  <input
                    id="user_name"
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div className="form-field-group">
                  <label htmlFor="user_email">Your Email</label>
                  <input
                    id="user_email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div className="form-field-group">
                <label htmlFor="user_message">Your Message</label>
                <textarea
                  id="user_message"
                  name="message"
                  rows="4"
                  placeholder="Tell me about your project, role, or collaboration idea..."
                  required
                />
              </div>

              <div className="form-submit-row">
                <button
                  type="submit"
                  className="btn-pill-orange"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"} <FiSend size={15} />
                </button>
                {result && (
                  <span className={`form-result-text ${isSuccess ? "is-success" : ""}`}>
                    {isSuccess && <FiCheckCircle size={15} />} {result}
                  </span>
                )}
              </div>
            </form>
          </div>
        )}

        {/* Bottom Legal Copyright Bar */}
        <div className="editorial-footer-bar">
          <p className="footer-copyright">
            © {new Date().getFullYear()} Syed Farman Ali. All rights reserved.
          </p>
          <div className="footer-legal-links">
            <Link to="/terms">Terms of Service</Link>
            <Link to="/privacy">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
