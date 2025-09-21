import { Link } from "react-router-dom";
import styles from "../common/Common.module.css";

const Consultation = () => {
  return (
    <section className="section">
      <div className="container">
        <h2 className="sectionTitle">Personalized Consultation</h2>
        {/* Use the new class name for the layout */}
        <div className={styles.centeredLayout}>
          {/* Use the new class name for the text block */}
          <div className={styles.centeredText}>
            <p>
              Every great theatre experience starts with the right plan. We offer personalized consultation sessions to understand your vision, space, and budget. Our experts guide you step-by-step from concept to execution.
            </p>
            {/* This will use the existing .btn style, so no change is needed here */}
            <Link to="/consultation" className={styles.btn}>Book a Consultation</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Consultation;