import { useState } from "react";
import styles from "./Header.module.css";
import CinetroneLogo from "../../assets/logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <nav className={`${styles.nav} ${styles.container}`}>
        {/* The <a> tag now wraps both the image and the text */}
        <a href="#home" className={styles.nav__brand}>
          <img
            src={CinetroneLogo}
            alt="Cinetrone Logo"
            className={styles.logoImage}
          />
          {/* ⬇️ Added the capitalized text in an h1 tag */}
          <h1 className={styles.logoText}>Cinetrone</h1>
        </a>
        <ul
          className={`${styles.nav__menu} ${isMenuOpen ? styles.active : ""}`}
          id="nav-menu"
        >
          <li>
            <a href="#home" className={styles.nav__link} onClick={closeMenu}>
              Home
            </a>
          </li>
          <li>
            <a
              href="#services"
              className={styles.nav__link}
              onClick={closeMenu}
            >
              Services
            </a>
          </li>
          <li>
            <a href="#gallery" className={styles.nav__link} onClick={closeMenu}>
              Gallery
            </a>
          </li>
          <li>
            <a href="#about" className={styles.nav__link} onClick={closeMenu}>
              About
            </a>
          </li>
          <li>
            <a href="#contact" className={styles.nav__link} onClick={closeMenu}>
              Contact
            </a>
          </li>
        </ul>
        <button
          className={`${styles.nav__toggle} ${isMenuOpen ? styles.active : ""}`}
          id="nav-toggle"
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>
    </header>
  );
};

export default Header;
