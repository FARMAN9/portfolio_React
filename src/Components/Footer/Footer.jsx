import "./Footer.css";
import ali from "../../assets/ali.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { scrollToSection } from "../../utils/navigation";

function Footer() {
  const location = useLocation();
  const navigate = useNavigate();

  const goToSection = (section) => {
    if (location.pathname !== "/") {
      navigate("/");
      scrollToSection(section);
      return;
    }

    scrollToSection(section);
  };

  return (
    <div className="footer">
      <div className="footer-top">
        <div className="footer-top-left">
          <div className="logo">
            <Link className="anchor-link" to="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              <h1>FARMAN</h1>
              <img src={ali} alt="" />
            </Link>
          </div>
        </div>
        <p>
          I wanted to take a moment to thank you for visiting my portfolio. Your
          time and interest in my work are truly appreciated. If you have any
          feedback, questions, or opportunities you&apos;d like to discuss, please
          don&apos;t hesitate to reach out. I&apos;m always eager to connect and explore
          new possibilities.
        </p>
        <div className="footer-top-right"></div>
      </div>
      <hr className="footer-hr" />

      <div className="footer-bottom">
        <p className="footer-bottm-left">
          {" "}
          © {new Date().getFullYear()} Syed Farman Ali. All rights reserved.{" "}
        </p>

        <div className="footer-bottom-right">
          <Link to="/terms" style={{ color: 'inherit', textDecoration: 'none' }}><p>Terms of Service</p></Link>
          <Link to="/privacy" style={{ color: 'inherit', textDecoration: 'none' }}><p>Privacy Policy</p></Link>
          <button type="button" className="footer-link-button" onClick={() => goToSection("contact")}>Connect with me</button>
        </div>
      </div>
    </div>
  );
}

export default Footer;
