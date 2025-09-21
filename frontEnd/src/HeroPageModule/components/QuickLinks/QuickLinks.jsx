// src/components/QuickLinks/QuickLinks.jsx
import { Link } from "react-router-dom";
import styles from "./QuickLinks.module.css";

const QuickLinks = () => {
  return (
    <section className={`section ${styles.quickLinks}`}>
      <div className={`container ${styles.container}`}>
        <Link to="/terms" className={styles.btn}>Terms & Conditions</Link>
        <Link to="/careers" className={styles.btn}>Careers at Cinetrone</Link>
      </div>
    </section>
  );
};
export default QuickLinks;
