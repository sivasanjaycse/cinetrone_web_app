import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";
import styles from "./WhyChoose.module.css";

// Data for the statistics cards
const statsData = [
  {
    number: "20+",
    title: "Years Experience",
    description: "Proven expertise in luxury home entertainment",
    id: 1,
  },
  {
    number: "100+",
    title: "Premium Partners",
    description: "Exclusive partnerships with world-class brands",
    id: 2,
  },
  {
    number: "VIP",
    title: "Royal Service",
    description: "Personalized attention for every client",
    id: 3,
  },
];

// Sub-component for a single statistic card
const StatCard = ({ number, title, description }) => {
  const [ref, isIntersecting] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`${styles.statCard} ${isIntersecting ? styles.animateIn : ""}`}
    >
      <h3 className={styles.statCard__number}>{number}</h3>
      <h4 className={styles.statCard__title}>{title}</h4>
      <p className={styles.statCard__description}>{description}</p>
    </div>
  );
};

const WhyChoose = () => {
  return (
    // Note: The original HTML didn't have an ID for this section, but it's good practice to add one.
    // I've used 'about' as a placeholder since it was in the nav but not in the HTML.
    <section className={styles.whyChoose} id="about">
      <div className={styles.container}>
        <h2 className="sectionTitle">Why Choose Cinetrone</h2>
        <div className={styles.whyChoose__grid}>
          {statsData.map((stat) => (
            <StatCard
              key={stat.id}
              number={stat.number}
              title={stat.title}
              description={stat.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
