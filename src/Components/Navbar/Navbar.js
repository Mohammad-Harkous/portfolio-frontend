import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "../Navbar/Navbar.css";

function Navbar() {
  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  return (
    <header className="Navbar-header" id="home">
      <h3 className="Navbar-logo">LOGO</h3>
      <nav ref={navRef}>
        <a href="#home" onClick={showNavbar}>
          Home
        </a>
        <a href="#about" onClick={showNavbar}>
          About
        </a>
        <a href="#projects" onClick={showNavbar}>
          Projects
        </a>
        <a href="#services" onClick={showNavbar}>
          Services
        </a>
        <a href="#contact" onClick={showNavbar}>
          Contact
        </a>
        <button className="nav-btn nav-close-btn" onClick={showNavbar}>
          <FaTimes />
        </button>
      </nav>
      <button className="nav-btn" onClick={showNavbar}>
        <FaBars />
      </button>
    </header>
  );
}

export default Navbar;
