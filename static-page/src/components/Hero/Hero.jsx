import styles from "./Hero.module.css";

const Hero = () => {
  return (
    <section className={styles.hero} id="home">
      <div className={`${styles.hero__content} ${styles.container}`}>
        <h1 className={styles.hero__title}>
          Transform Your Home Into a Royal Cinema
        </h1>
        <p className={styles.hero__subtitle}>
          Premium home theater design and installation services for the most
          discerning clients
        </p>
        <a
          href="https://shop.cinetrone.com"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.btnCta}
        >
          <span>Explore Our Collections</span>
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
            <path d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z" />
          </svg>
        </a>
      </div>
    </section>
  );
};

export default Hero;
