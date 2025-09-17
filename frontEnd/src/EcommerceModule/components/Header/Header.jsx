import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaShoppingCart, FaUserCircle } from 'react-icons/fa';
import { useCart } from "../../context/CartContext";
import styles from "./Header.module.css";
import CinetroneLogo from '../../../assets/logo.PNG';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItems } = useCart();
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const totalCartItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className={styles.header}>
      <nav className={`${styles.nav} container`}>
        <Link to="/" className={styles.nav__brand} onClick={closeMenu}>
          <img src={CinetroneLogo} alt="Cinetrone Logo" className={styles.logoImage} />
          <h1 className={styles.logoText}>Cinetrone</h1>
        </Link>
        <ul className={`${styles.nav__menu} ${isMenuOpen ? styles.active : ""}`} id="nav-menu">
          <li><NavLink to="/" className={styles.nav__link} onClick={closeMenu}>Home</NavLink></li>
          <li><NavLink to="/shop" className={styles.nav__link} onClick={closeMenu}>Shop</NavLink></li>
          {/* Removed "Shop by Category" link */}
          <li><NavLink to="/profile" className={styles.nav__link} onClick={closeMenu}><FaUserCircle/> My Profile</NavLink></li>
          <li>
            <NavLink to="/cart" className={`${styles.nav__link} ${styles.cartLink}`} onClick={closeMenu}>
              <FaShoppingCart className={styles.cartIcon} />
              {totalCartItems > 0 && <span className={styles.cartBadge}>{totalCartItems}</span>}
            </NavLink>
          </li>
        </ul>
        <button className={`${styles.nav__toggle} ${isMenuOpen ? styles.active : ""}`} id="nav-toggle" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>
    </header>
  );
};

export default Header;