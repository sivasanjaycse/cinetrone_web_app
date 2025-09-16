import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";
import styles from "./Testimonials.module.css";

// Data for the testimonials
const testimonialsData = [
  {
    quote:
      "Cinetrone transformed our basement into a palace-worthy theater. The attention to detail and quality is unmatched.",
    author: "Alexandra Sterling",
    title: "Luxury Estate Owner",
    id: 1,
  },
  {
    quote:
      "The acoustics are phenomenal, and the visual quality is cinema-grade. Worth every investment.",
    author: "Marcus Blackwood",
    title: "Entertainment Executive",
    id: 2,
  },
  {
    quote:
      "From design to installation, the team delivered excellence at every step. Truly a royal experience.",
    author: "Victoria Goldsmith",
    title: "Interior Designer",
    id: 3,
  },
];

// A sub-component for an individual testimonial card
const TestimonialCard = ({ quote, author, title }) => {
  const [ref, isIntersecting] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`${styles.testimonialCard} ${
        isIntersecting ? styles.animateIn : ""
      }`}
    >
      <div className={styles.testimonialCard__quote}>"</div>
      <p className={styles.testimonialCard__text}>{quote}</p>
      <div className={styles.testimonialCard__author}>
        <h4>{author}</h4>
        <span>{title}</span>
      </div>
    </div>
  );
};

const Testimonials = () => {
  return (
    <section className={styles.testimonials}>
      <div className={styles.container}>
        <h2 className="sectionTitle">What Our Clients Say</h2>
        <div className={styles.testimonials__grid}>
          {testimonialsData.map((item) => (
            <TestimonialCard
              key={item.id}
              quote={item.quote}
              author={item.author}
              title={item.title}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
