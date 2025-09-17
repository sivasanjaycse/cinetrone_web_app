import { useState } from "react";
import styles from "./Footer.module.css";

const Footer = ({ showNotification }) => {
  return (
    <footer className={styles.footer} id="contact">
      <div className={styles.container}>
        <div className={styles.footer__content}>
          <div className={styles.footer__section}>
            <h3 className={styles.footer__title}>Cinetrone</h3>
            <p className={styles.footer__tagline}>
              Luxury Home Theater Experiences
            </p>
          </div>

          <div className={styles.footer__section}>
            <h4 className={styles.footer__subtitle}>Contact Information</h4>
            <div className={styles.contactInfo}>
              <p>
                <strong>Address:</strong>
                <br />
                123 Luxury Lane, Premium District
                <br />
                Metropolitan City 12345
              </p>
              <p>
                <strong>Phone:</strong>
                <br />
                +1 (555) THEATER (843-2837)
              </p>
            </div>
          </div>
        </div>
        <div className={styles.footer__bottom}>
          <p>
            &copy; 2025 Cinetrone. All rights reserved. Luxury Home Theater
            Experiences.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
