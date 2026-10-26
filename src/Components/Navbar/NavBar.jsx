import { useState } from "react";
import "./Navbar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { scrollToSection } from "../../utils/navigation";
import { FiMenu, FiX, FiArrowUpRight } from "react-icons/fi";

// eslint-disable-next-line react/prop-types
function NavBar({ onOpenVR }) {
  const [activeNav, setActiveNav] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (section) => {
    setActiveNav(section);
    setMobileOpen(false);

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => scrollToSection(section), 100);
      return;
    }

    scrollToSection(section);
  };

  return (
    <header className="editorial-navbar">
      <div className="editorial-nav-inner">
        {/* Logo matching folio. / farman. */}
        <Link 
          to="/" 
          className="editorial-logo"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <span>folio</span>
          <span className="logo-dot">.</span>
        </Link>

        {/* Center Nav Links */}
        <nav className="editorial-nav-links">
          <button 
            type="button" 
            className={`nav-item ${activeNav === "home" ? "is-active" : ""}`}
            onClick={() => handleNavClick("home")}
          >
            Home
          </button>
          <button 
            type="button" 
            className={`nav-item ${activeNav === "work" ? "is-active" : ""}`}
            onClick={() => handleNavClick("work")}
          >
            Work
          </button>
          <button 
            type="button" 
            className={`nav-item ${activeNav === "services" ? "is-active" : ""}`}
            onClick={() => handleNavClick("services")}
          >
            Services
          </button>
          <button 
            type="button" 
            className={`nav-item ${activeNav === "testimonials" ? "is-active" : ""}`}
            onClick={() => handleNavClick("testimonials")}
          >
            Reviews
          </button>
          <button 
            type="button" 
            className={`nav-item ${activeNav === "recognition" ? "is-active" : ""}`}
            onClick={() => handleNavClick("recognition")}
          >
            Milestones
          </button>
          <button 
            type="button" 
            className={`nav-item ${activeNav === "contact" ? "is-active" : ""}`}
            onClick={() => handleNavClick("contact")}
          >
            Contact
          </button>
        </nav>

        {/* Right CTA Buttons */}
        <div className="editorial-nav-actions">
          <button
            type="button"
            className="btn-nav-vr"
            onClick={onOpenVR}
            title="Experience 3D Virtual Reality Holodeck"
          >
            <span className="vr-nav-icon">🥽</span>
            <span>VR Mode</span>
          </button>

          <button 
            type="button" 
            className="btn-nav-talk"
            onClick={() => handleNavClick("contact")}
          >
            Let&apos;s talk
          </button>

          {/* Mobile Menu Toggle Button */}
          <button 
            type="button" 
            className="mobile-nav-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="editorial-mobile-drawer">
          <div className="mobile-drawer-links">
            <button type="button" onClick={() => handleNavClick("home")}>Home</button>
            <button type="button" onClick={() => handleNavClick("work")}>A Selection of My Work</button>
            <button type="button" onClick={() => handleNavClick("services")}>Creative Solutions</button>
            <button type="button" onClick={() => handleNavClick("testimonials")}>Client Reviews</button>
            <button type="button" onClick={() => handleNavClick("recognition")}>Awards &amp; Recognition</button>
            <button type="button" onClick={() => handleNavClick("contact")}>Contact &amp; Connect</button>
          </div>
          <button
            type="button"
            className="btn-pill-dark mobile-vr-btn"
            onClick={() => {
              setMobileOpen(false);
              onOpenVR();
            }}
          >
            🥽 Launch 3D / VR Mode
          </button>
          <button 
            type="button" 
            className="btn-pill-orange mobile-talk-btn"
            onClick={() => handleNavClick("contact")}
          >
            Let&apos;s Talk <FiArrowUpRight />
          </button>
        </div>
      )}
    </header>
  );
}

export default NavBar;
