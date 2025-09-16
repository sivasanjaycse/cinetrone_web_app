import { Link } from "react-router-dom";
import styles from "./About.module.css";

const About = () => {
  return (
    <section id="about" className={`section ${styles.about}`}>
      <div className="container">
        <h2 className="sectionTitle">Where Technology Meets Emotion</h2>
        <div className={styles.aboutContent}>
          <p className={styles.aboutText}>
            Founded with passion and driven by innovation, Cinetrone is
            dedicated to creating immersive home theatres, outdoor cinema experiences, and
            advanced audio-visual solutions that bring stories to life. With years of
            expertise in audio technology and smart automation, we design solutions that
            combine cutting-edge performance with elegant design.
          </p>
          <Link to="/about" className={styles.btn}>
            Learn More About Us
          </Link>
        </div>
      </div>
    </section>
  );
};

export default About;