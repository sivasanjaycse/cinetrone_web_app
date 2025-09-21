import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import CinetroneLogo from '../../assets/logo.PNG';
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={styles.header}>
      <nav className={`${styles.nav} container`}>
        <Link to="/" className={styles.nav__brand} onClick={closeMenu}>
          <img
            src={CinetroneLogo}
            alt="Cinetrone Logo"
            className={styles.logoImage}
          />
          <h1 className={styles.logoText}>Cinetrone</h1>
        </Link>
        <ul
          className={`${styles.nav__menu} ${isMenuOpen ? styles.active : ""}`}
          id="nav-menu"
        >
          <li><Link to="/store" className={styles.nav__link} onClick={closeMenu}>Our Store</Link></li>
          <li><Link to="/consultation" className={styles.nav__link} onClick={closeMenu}>Consultation</Link></li>
          <li><Link to="/calibration" className={styles.nav__link} onClick={closeMenu}>Calibration</Link></li>
          <li><Link to="/projects" className={styles.nav__link} onClick={closeMenu}>Projects</Link></li>
          <li><Link to="/products" className={styles.nav__link} onClick={closeMenu}>Products</Link></li>
          <li><Link to="/careers" className={styles.nav__link} onClick={closeMenu}>Careers</Link></li>
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