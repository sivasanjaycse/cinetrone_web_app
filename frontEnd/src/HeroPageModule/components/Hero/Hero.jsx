import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Hero.module.css";
import backgroundVideo from '../../assets/hero-background.mp4'; // Make sure this path is correct for your project

// Array of button content
const ctaMessages = [
  { text: "Visit E-commerce", link: "https://shop.cinetrone.com" },
  { text: "Book Consultation", link: "/consultation" },
  { text: "Book Calibration", link: "/calibration" },
  {text: "Visit our Channel", link: "https://youtube.com/@cinetrone_hometheatre?si=JpEEhZ7hcbjclFJp"}
];

const Hero = () => {
  const [ctaIndex, setCtaIndex] = useState(0);
  // New state to control the animation visibility
  const [isTextVisible, setIsTextVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      // Start the fade-out animation
      setIsTextVisible(false);

      // Wait for the fade-out to finish, then change the text and fade back in
      setTimeout(() => {
        setCtaIndex((prevIndex) => (prevIndex + 1) % ctaMessages.length);
        setIsTextVisible(true);
      }, 500); // This duration should match the CSS transition time

    }, 4000); // Change text every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className={styles.hero} id="home">
      <div className={styles.videoOverlay}></div>
      <video className={styles.videoBg} autoPlay loop muted playsInline>
        <source src={backgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className={`${styles.hero__content} container`}>
        <h1 className={styles.hero__title}>Cinetrone</h1>
        <p className={styles.hero__subtitle}>
          At Cinetrone, we believe cinema isn't just about watching a movie - it's about living the experience.
        </p>
        <Link to={ctaMessages[ctaIndex].link} className={styles.btnCta}>
          <div className={styles.btnContentWrapper}>
             {/* The button text now has a dynamic class for the animation */}
            <span className={`${styles.btnText} ${isTextVisible ? styles.visible : ''}`}>
              {ctaMessages[ctaIndex].text}
            </span>
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z" />
            </svg>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default Hero;