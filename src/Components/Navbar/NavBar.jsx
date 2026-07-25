import { useRef, useState } from "react";
import "./Navbar.css";
import ali from "../../assets/ali.png";
import backgound from "../../assets/nav_underline.svg";
import menu_open from "../../assets/menu_open.svg";
import menu_close from "../../assets/menu_close.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { scrollToSection } from "../../utils/navigation";

function NavBar() {
  const [menu, setMenu] = useState("home");
  const menuRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();

  const goToSection = (section) => {
    setMenu(section);
    closeMenu();

    if (location.pathname !== "/") {
      navigate("/");
      scrollToSection(section);
      return;
    }

    scrollToSection(section);
  };

  const openMenu = () => {
    menuRef.current.style.right = "0";
  };
  const closeMenu = () => {
    menuRef.current.style.right = "-350px";
  };
  return (
    <nav className="navbar">
      <div className="logo">
        <Link className="anchor-link" to="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <h1>FARMAN</h1>
          <img src={ali} alt="" />
        </Link>
      </div>
      <img
        src={menu_open}
        onClick={openMenu}
        alt=""
        className="nav-mob-open d-md-none"
      />

      <ul ref={menuRef} className="nav-menu d-none d-md-flex">
        <img
          src={menu_close}
          alt=""
          className="nav-mob-close d-md-none"
          onClick={closeMenu}
        />
        <li>
          {" "}
          <button type="button" className="nav-link-button" onClick={() => goToSection("home")}>Home</button>
          {menu === "home" ? <img src={backgound} alt="" /> : <></>}
        </li>
        <li>
          <button type="button" className="nav-link-button" onClick={() => goToSection("about")}>About Me</button>
          {menu === "about" ? <img src={backgound} alt="" /> : <></>}
        </li>
        <li>
          <button type="button" className="nav-link-button" onClick={() => goToSection("work")}>Portfolio</button>
          {menu === "work" ? <img src={backgound} alt="" /> : <></>}
        </li>
        <li>
          <button type="button" className="nav-link-button" onClick={() => goToSection("contact")}>Contact</button>
          {menu === "contact" ? <img src={backgound} alt="" /> : <></>}
        </li>
      </ul>
      <button type="button" className="nav-connect" onClick={() => goToSection("contact")}>
          Connect With Me
      </button>
    </nav>
  );
}

export default NavBar;
