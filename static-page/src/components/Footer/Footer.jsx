import { useState } from "react";
import styles from "./Footer.module.css";

const Footer = ({ showNotification }) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      showNotification("Please enter a valid email address.", "error");
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      showNotification("Thank you for subscribing!", "success");
      setEmail("");
      setIsLoading(false);
    }, 1500);
  };

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

          <div className={styles.footer__section}>
            <h4 className={styles.footer__subtitle}>Quick Links</h4>
            <ul className={styles.footer__links}>
              <li>
                <a href="#services">Services</a>
              </li>
              <li>
                <a href="#gallery">Gallery</a>
              </li>
              <li>
                <a href="#about">About Us</a>
              </li>
            </ul>
          </div>

          <div className={styles.footer__section}>
            <h4 className={styles.footer__subtitle}>Newsletter</h4>
            <p>Stay updated with our latest luxury installations</p>
            <form className={styles.newsletterForm} onSubmit={handleSubmit}>
              <input
                type="email"
                className={styles.formControl}
                placeholder="Your email address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
              <button type="submit" className={styles.btn} disabled={isLoading}>
                {isLoading ? "Subscribing..." : "Subscribe"}
              </button>
            </form>
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
