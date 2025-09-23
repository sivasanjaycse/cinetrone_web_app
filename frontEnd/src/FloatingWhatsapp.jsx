import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaWhatsapp, FaStore } from 'react-icons/fa';
import styles from './FloatingWhatsApp.module.css';

const FloatingWhatsApp = () => {
  const location = useLocation();

  // This condition checks if the current path starts with '/store'
  const showStoreIcon = !location.pathname.startsWith('/store');

  return (
    <div className={styles.floatingActionContainer}>
      {/* Conditionally render the store icon */}
      {showStoreIcon && (
        <Link
          to="/store"
          className={`${styles.actionButton} ${styles.storeButton}`}
          aria-label="Go to Store"
        >
          <FaStore className={styles.icon} />
        </Link>
      )}

      {/* The existing WhatsApp icon */}
      <a
        href="https://wa.me/919360977893"
        className={`${styles.actionButton} ${styles.whatsappButton}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
      >
        <FaWhatsapp className={styles.icon} />
      </a>
    </div>
  );
};

export default FloatingWhatsApp;