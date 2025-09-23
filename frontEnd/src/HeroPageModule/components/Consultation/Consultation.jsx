import { Link } from "react-router-dom";
import styles from "../common/Common.module.css";

const Consultation = () => {
  return (
    <section className="section">
      <div className="container">
        <h2 className="sectionTitle">Personalized Consultation</h2>
        <div className={styles.centeredLayout}>
          <div className={styles.centeredText}>
            <p>
              Every great theatre experience starts with the right plan. We offer personalized consultation sessions to understand your vision, space, and budget. Our experts guide you step-by-step from concept to execution.
            </p>
            <Link to="/consultation" className={styles.btn}>Book a Consultation</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Consultation;