import React, { useRef, useState, useEffect } from "react";
import "./Navbar.css";
import ali from "../../assets/ali.png";
import backgound from "../../assets/nav_underline.svg";
import AnchorLink from "react-anchor-link-smooth-scroll";
import menu_open from "../../assets/menu_open.svg";
import menu_close from "../../assets/menu_close.svg";

function NavBar() {
  const [menu, setMenu] = useState("home");
  const menuRef = useRef();
  const openMenu = () => {
    menuRef.current.style.right = "0";
  };
  const closeMenu = () => {
    menuRef.current.style.right = "-350px";
  };
  return (
    <nav className="navbar">
      <div className="logo">
        <AnchorLink className="anchor-link" href="#home">
          <h1>FARMAN</h1>
          <img src={ali} alt="" />
        </AnchorLink>
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
          <AnchorLink className="anchor-link" href="#home">
            <p onClick={() => setMenu("home")}>Home</p>{" "}
          </AnchorLink>
          {menu === "home" ? <img src={backgound} alt="" /> : <></>}
        </li>
        <li>
          <AnchorLink className="anchor-link" offset={50} href="#about">
            <p onClick={() => setMenu("about")}>About Me</p>
          </AnchorLink>
          {menu === "about" ? <img src={backgound} alt="" /> : <></>}
        </li>
        <li>
          <AnchorLink className="anchor-link" offset={50} href="#work">
            <p onClick={() => setMenu("work")}>Portfolio</p>
          </AnchorLink>
          {menu === "work" ? <img src={backgound} alt="" /> : <></>}
        </li>
        <li>
          <AnchorLink className="anchor-link" offset={50} href="#contact">
            <p onClick={() => setMenu("contact")}>Contact</p>
          </AnchorLink>
          {menu === "contact" ? <img src={backgound} alt="" /> : <></>}
        </li>
      </ul>
      <div className="nav-connect">
        <AnchorLink className="anchor-link" offset={50} href="#contact">
          Connect With Me
        </AnchorLink>
      </div>
    </nav>
  );
}

export default NavBar;
