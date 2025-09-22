import { Link, NavLink } from "react-router-dom";
import { FaHome, FaStore, FaShoppingCart, FaUserCircle } from 'react-icons/fa';
import { useCart } from "../../context/CartContext";
import styles from "./Header.module.css";
import CinetroneLogo from '../../../assets/logo.PNG';

const Header = () => {
  const { cartItems } = useCart();
  const totalCartItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className={styles.header}>
      <nav className={`${styles.nav} container`}>
        <Link to="/" className={styles.nav__brand}>
          <img src={CinetroneLogo} alt="Cinetrone Logo" className={styles.logoImage} />
          <h1 className={styles.logoText}>Cinetrone</h1>
        </Link>
        <ul className={styles.nav__menu} id="nav-menu">
          <li>
            <NavLink to="/" className={styles.nav__link} title="Home" aria-label="Home">
              <FaHome className={styles.navIcon} />
              {/* This text will only appear on desktop */}
              <span className={styles.linkLabel}>Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/store" className={styles.nav__link} title="Shop" aria-label="Shop">
              <FaStore className={styles.navIcon} />
              {/* This text will only appear on desktop */}
              <span className={styles.linkLabel}>Shop</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/store/profile" className={styles.nav__link} title="My Profile" aria-label="My Profile">
              <FaUserCircle className={styles.navIcon} />
              {/* This text will only appear on desktop */}
              <span className={styles.linkLabel}>My Profile</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/store/cart" className={`${styles.nav__link} ${styles.cartLink}`} title="Cart" aria-label="Cart">
              <FaShoppingCart className={styles.navIcon} />
              {totalCartItems > 0 && <span className={styles.cartBadge}>{totalCartItems}</span>}
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;