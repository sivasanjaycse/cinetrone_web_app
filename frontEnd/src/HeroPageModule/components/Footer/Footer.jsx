import styles from "./Footer.module.css";
// Import the icons from your new file
import { InstagramIcon, YouTubeIcon, LinkedInIcon, WhatsAppIcon } from './SocialIcons';
// Assuming you are using React Router for navigation, import Link
// If you are not, you can keep them as regular <a> tags.
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className={styles.footer} id="contact">
      <div className={styles.container}>
        <div className={styles.footer__content}>
          {/* Section 1: Brand Info */}
          <div className={styles.footer__section}>
            <h3 className={styles.footer__title}>Cinetrone</h3>
            <p className={styles.footer__tagline}>
              Where Technology Meets Emotion
            </p>
          </div>

          {/* Section 2: Contact Information */}
          <div className={styles.footer__section}>
            <h4 className={styles.footer__subtitle}>Contact Information</h4>
            <div className={styles.contactInfo}>
              <p>
                <strong>Address:</strong>
                <br />
                1st Floor, S.No.3/2B, Door No.429,
                <br />
                Ambalur to Vaniyambadi Road,
                <br />
                Ambalur, Tirupathur, Tamil Nadu - 635801
              </p>
              <p>
                <strong>Phone:</strong>
                <br />
                +91 93609 77893
                <br />
                +91 93456 59852
              </p>
            </div>
          </div>

          {/* NEW SECTION: Quick Links */}
          <div className={styles.footer__section}>
            <h4 className={styles.footer__subtitle}>Quick Links</h4>
            <ul className={styles.footer__links}>
              <li>
                <Link to="/terms">Terms and Conditions</Link>
              </li>
              <li>
                <Link to="/careers">Careers</Link>
              </li>
            </ul>
          </div>

          {/* Section 4: Social Media Links */}
          <div className={styles.footer__section}>
            <h4 className={styles.footer__subtitle}>Follow Us</h4>
            <div className={styles.footer__social}>
              {/* Replace '#' with your actual social media URLs */}
              <a href="https://www.instagram.com/cinetrone_homecinemas?igsh=dDN4ODV3aWs2Ymp2&utm_source=qr" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <InstagramIcon />
              </a>
              <a href="https://youtube.com/@cinetrone_hometheatre?si=JpEEhZ7hcbjclFJp" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <YouTubeIcon />
              </a>
              <a href="https://www.linkedin.com/in/cinetrone-a-b2925930a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <LinkedInIcon />
              </a>
              <a
                href="https://wa.me/919360977893"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.footer__bottom}>
          <p>
            &copy; {new Date().getFullYear()} Cinetrone. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;