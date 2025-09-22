import { Link } from "react-router-dom";
import styles from "./Stats.module.css";

const statsData = [
  { value: "89+", label: "Successful Installations" },
  { value: "6", label: "Years of R&D" },
  { value: "1.5+", label: "Years Delivering Projects" },
  { value: "1", label: "Unsuccessful Project*" },
];

const Stats = () => {
  return (
    <section className={`section ${styles.stats}`}>
      <div className={`container ${styles.statsContainer}`}>
        {statsData.map((stat, index) => {
          // Conditionally render a Link for the specific item
          if (stat.label === "Unsuccessful Project*") {
            return (
              <Link key={index} to="/learning-from-challenges" className={`${styles.statItem} ${styles.clickable}`}>
                <span className={styles.statValue}>{stat.value}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </Link>
            );
          } else {
            return (
              <div key={index} className={styles.statItem}>
                <span className={styles.statValue}>{stat.value}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            );
          }
        })}
      </div>
      <p className={styles.disclaimer}>
        *We believe in transparency. One early project didn't meet our high standards, and we learned invaluable lessons from it.
      </p>
    </section>
  );
};

export default Stats;