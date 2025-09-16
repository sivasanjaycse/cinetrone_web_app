import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";
import styles from "./Services.module.css";

// Reusable Card component
const ServiceCard = ({ icon, title, description }) => {
  const [ref, isIntersecting] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`${styles.serviceCard} ${
        isIntersecting ? styles.animateIn : ""
      }`}
    >
      <div className={styles.serviceCard__icon}>{icon}</div>
      <h3 className={styles.serviceCard__title}>{title}</h3>
      <p className={styles.serviceCard__description}>{description}</p>
    </div>
  );
};

const Services = () => {
  // ✅ SOLUTION: Ensure this array contains all your services.
  const servicesData = [
    {
      icon: "🎭",
      title: "Custom Theater Design",
      description:
        "Bespoke luxury theater rooms tailored to your space and preferences",
    },
    {
      icon: "🔊",
      title: "Premium Audio Systems",
      description:
        "State-of-the-art surround sound with world-class acoustic engineering",
    },
    {
      icon: "📽️",
      title: "Video & Projection",
      description:
        "4K/8K projection systems and premium displays for ultimate clarity",
    },
    {
      icon: "🎵",
      title: "Acoustic Treatment",
      description: "Professional soundproofing and acoustic optimization",
    },
    {
      icon: "🏠",
      title: "Smart Integration",
      description: "Seamless home automation and intelligent control systems",
    },
    {
      icon: "🔧",
      title: "Expert Installation",
      description:
        "White-glove installation service by certified professionals",
    },
  ];

  return (
    <section className={styles.services} id="services">
      <div className={styles.container}>
        <h2 className="sectionTitle">Our Premium Services</h2>
        <div className={styles.services__grid}>
          {servicesData.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
