import { Link } from "react-router-dom";
import styles from "./ProjectsTeaser.module.css";

const ProjectsTeaser = () => {
  return (
    <section className={`section ${styles.projects}`}>
      <div className="container">
        <h2 className="sectionTitle">Our Projects</h2>
        <div className={styles.content}>
          <p>
            At Cinetrone, every project is a turnkey solution—from design and installation to Dolby Atmos calibration and finishing touches. With 89+ reworks and full turnkey installations completed, we deliver cinema-grade experiences in every space. 
          </p>
          <Link to="/projects" className={styles.btn}>View All Projects</Link>
        </div>
      </div>
    </section>
  );
};
export default ProjectsTeaser;

