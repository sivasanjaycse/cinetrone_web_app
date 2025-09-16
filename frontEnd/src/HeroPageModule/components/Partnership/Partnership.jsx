// src/components/Partnership/Partnership.jsx
import styles from "./Partnership.module.css";

// 1. Import your images from the assets folder
import PartnerLogo from '../../assets/partnerlogo.png';
import Sponser1 from '../../assets/sponser1.jpeg';

const Partnership = () => {
  return (
    <section className="section" style={{backgroundColor: "var(--bg-black)"}}>
      <div className="container">
        <h2 className="sectionTitle">Partnership & Dealership</h2>
        <div className={styles.partnershipGrid}>
          <div className={styles.content}>
            <h3>Certified Oxykraft Dealer</h3>
            <p>
              We are the only certified active dealer in Tamil Nadu for Oxykraft, the OEM manufacturer of OSD speakers. This direct partnership guarantees authentic products with full service backing.
            </p>
            <div className={styles.imageGrid}>
              <div className={styles.logoContainer}>
                {/* 2. Use the imported variable for the logo */}
                <img src={PartnerLogo} alt="Oxykraft Partner Logo" className={styles.logo}/>
              </div>
              <div className={styles.extraImageContainer}>
                 {/* 3. Use the imported variable for the sponsor image */}
                 <img src={Sponser1} alt="Sponsor" className={styles.extraImage}/>
              </div>
            </div>
          </div>
          <div className={styles.videoWrapper}>
            
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ" // Dummy video
              title="Partner Testimonial"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Partnership;