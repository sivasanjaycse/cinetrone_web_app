import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import styles from './FloatingWhatsApp.module.css';

const FloatingWhatsApp = () => {
  return (
    <a
      href="https://wa.me/919360977893"
      className={styles.whatsappButton}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
    >
      <FaWhatsapp className={styles.whatsappIcon} />
    </a>
  );
};

export default FloatingWhatsApp;