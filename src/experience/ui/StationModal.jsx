import { useState, useEffect } from 'react';
import {
  FiX,
  FiExternalLink,
  FiGithub,
  FiMail,
  FiPhone,
  FiMapPin,
  FiSend,
  FiCheckCircle,
  FiAward,
  FiCpu,
  FiFileText
} from 'react-icons/fi';
import { SiGooglescholar } from 'react-icons/si';
import { FaLinkedin } from 'react-icons/fa';
import { portfolioProfile } from '../../data/portfolioSource';

const WEB3FORMS_KEY = 'fc7158de-ce59-41ff-9c1e-672e25c721db';

/* eslint-disable react/prop-types */
export default function StationModal({
  activeStation,
  selectedProject,
  selectedSkill,
  onClose
}) {
  // ESC key handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Contact Form State
  const [formResult, setFormResult] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormResult('Transmitting message...');

    const formData = new FormData(e.target);
    formData.append('access_key', WEB3FORMS_KEY);

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (data.success) {
        setIsSuccess(true);
        setFormResult('Message delivered successfully! Farman will reply promptly.');
        e.target.reset();
      } else {
        setFormResult(data.message || 'Transmission failed. Please email saeedfarman9@gmail.com directly.');
      }
    } catch {
      setFormResult('Network error. Please email directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!activeStation && !selectedProject && !selectedSkill) return null;

  return (
    <div className="spatial-modal-overlay" onClick={onClose}>
      <div className="spatial-modal-card" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="spatial-modal-close"
          onClick={onClose}
          aria-label="Close modal (Esc)"
        >
          <FiX size={20} />
        </button>

        {/* 1. PROJECT DETAIL VIEW */}
        {selectedProject && (
          <div className="modal-content-project">
            <div className="modal-header-tag">
              <span className="tag-pill-orange">PRODUCTION PROJECT</span>
            </div>
            <h2 className="modal-title">{selectedProject.name}</h2>

            <div className="modal-project-preview-wrap">
              <img
                src={selectedProject.imageUrl}
                alt={selectedProject.name}
                className="modal-project-preview-img"
              />
            </div>

            <p className="modal-description">{selectedProject.description}</p>

            <div className="modal-tech-pills">
              {(selectedProject.tech || []).map((t) => (
                <span key={t} className="tech-pill">{t}</span>
              ))}
            </div>

            <div className="modal-actions-row">
              {selectedProject.demo && (
                <a
                  href={selectedProject.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-pill-orange"
                >
                  Launch Live Demo <FiExternalLink />
                </a>
              )}
              {selectedProject.link && (
                <a
                  href={selectedProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-pill-dark"
                >
                  <FiGithub /> Source Code
                </a>
              )}
            </div>
          </div>
        )}

        {/* 2. SKILL DETAIL VIEW */}
        {selectedSkill && !selectedProject && (
          <div className="modal-content-skill">
            <div className="modal-header-tag">
              <span className="tag-pill-cyan">TECHNICAL PROFICIENCY</span>
            </div>
            <h2 className="modal-title">{selectedSkill.name}</h2>
            <div className="skill-meter-large">
              <div className="meter-label">
                <span>Verified Mastery</span>
                <span className="meter-val">{selectedSkill.value}%</span>
              </div>
              <div className="meter-track">
                <div
                  className="meter-fill"
                  style={{ width: `${selectedSkill.value}%` }}
                />
              </div>
            </div>
            <p className="modal-description">
              Syed Farman Ali uses {selectedSkill.name} actively across production web platforms, API engines, machine learning pipelines, and mobile applications.
            </p>
            <div className="modal-actions-row">
              <a
                href={portfolioProfile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill-orange"
              >
                Inspect Repositories on GitHub <FiGithub />
              </a>
            </div>
          </div>
        )}

        {/* 3. WORKSTATION / BIO DETAIL VIEW */}
        {activeStation === 'workstation' && !selectedProject && !selectedSkill && (
          <div className="modal-content-workstation">
            <div className="modal-header-tag">
              <span className="tag-pill-orange">DEVELOPER PROFILE</span>
            </div>
            <h2 className="modal-title">{portfolioProfile.name}</h2>
            <p className="modal-subtitle">{portfolioProfile.title}</p>
            <p className="modal-location">
              <FiMapPin /> {portfolioProfile.location}
            </p>

            <div className="modal-summary-box">
              <p>{portfolioProfile.summary}</p>
            </div>

            <h3 className="modal-section-h3"><FiAward /> Academic Foundations &amp; Research</h3>
            <div className="modal-edu-list">
              {portfolioProfile.education.map((edu) => (
                <div key={edu.institution} className="modal-edu-item">
                  <strong>{edu.institution}</strong>
                  <p>{edu.detail}</p>
                </div>
              ))}
            </div>

            <h3 className="modal-section-h3"><FiCpu /> Publications &amp; Honors</h3>
            <div className="modal-awards-list">
              <div className="award-badge-card">
                <SiGooglescholar className="badge-icon-amber" />
                <div>
                  <strong>SSRN / Google Scholar Research Publication (2024)</strong>
                  <p>Digital Auscultation &amp; ML Phenotyping of Kashmir Sheep at SKUAST-Kashmir.</p>
                </div>
              </div>
              <div className="award-badge-card">
                <FiAward className="badge-icon-orange" />
                <div>
                  <strong>CID Srinagar Public Service Internship Honors (2024)</strong>
                  <p>Recognized for technology workflows, backend engineering, and reliable data discipline.</p>
                </div>
              </div>
            </div>

            <div className="modal-actions-row">
              <a
                href={portfolioProfile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill-orange"
              >
                View Full Resume <FiExternalLink />
              </a>
              <a
                href={portfolioProfile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill-dark"
              >
                GitHub Profile (41+ Repos) <FiGithub />
              </a>
            </div>
          </div>
        )}

        {/* 4. RESUME STATION VIEW */}
        {activeStation === 'resume' && !selectedProject && !selectedSkill && (
          <div className="modal-content-resume">
            <div className="modal-header-tag">
              <span className="tag-pill-amber">CREDENTIALS &amp; RESUME</span>
            </div>
            <h2 className="modal-title">Verified Experience &amp; CV</h2>

            <div className="modal-highlights-grid">
              {portfolioProfile.resumeHighlights.map((hl) => (
                <div key={hl} className="highlight-pill">
                  <span>✓</span> {hl}
                </div>
              ))}
            </div>

            <div className="modal-actions-row">
              <a
                href={portfolioProfile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill-orange"
              >
                <FiFileText /> Download Complete CV / Resume
              </a>
              <a
                href={portfolioProfile.scholarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill-dark"
              >
                <SiGooglescholar /> Google Scholar Profile
              </a>
            </div>
          </div>
        )}

        {/* 5. CONTACT STATION VIEW */}
        {activeStation === 'contact' && !selectedProject && !selectedSkill && (
          <div className="modal-content-contact">
            <div className="modal-header-tag">
              <span className="tag-pill-green">COMMUNICATIONS HUB</span>
            </div>
            <h2 className="modal-title">Let&apos;s Create Together</h2>

            <div className="modal-contact-channels">
              <a href={`mailto:${portfolioProfile.email}`} className="contact-channel-row">
                <FiMail />
                <div>
                  <span className="channel-label">Email Address</span>
                  <span className="channel-val">{portfolioProfile.email}</span>
                </div>
              </a>
              <a href={`tel:${portfolioProfile.phone}`} className="contact-channel-row">
                <FiPhone />
                <div>
                  <span className="channel-label">Direct Phone</span>
                  <span className="channel-val">{portfolioProfile.phone}</span>
                </div>
              </a>
              <div className="contact-channel-row">
                <FiMapPin />
                <div>
                  <span className="channel-label">Location</span>
                  <span className="channel-val">{portfolioProfile.location}</span>
                </div>
              </div>
            </div>

            <form onSubmit={handleFormSubmit} className="modal-contact-form">
              <h3 className="modal-section-h3"><FiSend /> Send Direct Message</h3>
              <div className="form-row-dual">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                  className="modal-form-input"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  required
                  className="modal-form-input"
                />
              </div>
              <textarea
                name="message"
                rows="3"
                placeholder="How can Farman help with your product or engineering team?"
                required
                className="modal-form-textarea"
              />
              <div className="form-submit-line">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-pill-orange"
                >
                  {isSubmitting ? 'Transmitting...' : 'Send Message'} <FiSend />
                </button>
                {formResult && (
                  <span className={`form-feedback ${isSuccess ? 'is-success' : ''}`}>
                    {isSuccess && <FiCheckCircle />} {formResult}
                  </span>
                )}
              </div>
            </form>

            <div className="modal-social-pills">
              <a href={portfolioProfile.githubUrl} target="_blank" rel="noopener noreferrer" className="social-pill">
                <FiGithub /> GitHub
              </a>
              <a href={portfolioProfile.linkedinUrl} target="_blank" rel="noopener noreferrer" className="social-pill">
                <FaLinkedin /> LinkedIn
              </a>
              <a href={portfolioProfile.scholarUrl} target="_blank" rel="noopener noreferrer" className="social-pill">
                <SiGooglescholar /> Scholar
              </a>
            </div>
          </div>
        )}

        {/* 6. WELCOME STATION VIEW */}
        {activeStation === 'welcome' && !selectedProject && !selectedSkill && (
          <div className="modal-content-welcome">
            <div className="modal-header-tag">
              <span className="tag-pill-orange">STUDIO LOBBY</span>
            </div>
            <h2 className="modal-title">Welcome to Farman&apos;s 3D Studio</h2>
            <p className="modal-description">
              You are exploring the photorealistic architectural developer studio of Syed Farman Ali.
            </p>
            <div className="welcome-destinations-grid">
              <div className="dest-card">
                <strong>Executive Workstation</strong>
                <p>Dual monitors displaying real source code and engineering telemetry.</p>
              </div>
              <div className="dest-card">
                <strong>Project Laboratory</strong>
                <p>9 interactive displays showcasing real production deployments.</p>
              </div>
              <div className="dest-card">
                <strong>Technical Skills Wall</strong>
                <p>Languages, MERN, Python/Django, and machine learning meters.</p>
              </div>
              <div className="dest-card">
                <strong>Credentials Podium</strong>
                <p>Academic research, CID Srinagar honors, and downloadable CV.</p>
              </div>
            </div>
            <div className="modal-actions-row">
              <button
                type="button"
                className="btn-pill-orange"
                onClick={onClose}
              >
                Start Exploring Studio
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
