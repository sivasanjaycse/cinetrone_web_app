import { useState } from 'react'; // 1. Import useState
import styles from "./Partnership.module.css";
import PartnerLogo from '../../assets/partnercert.png';
import Sponser1 from '../../assets/sponser1.jpeg';

const Partnership = () => {
    // 2. Add state to manage the selected image
    const [selectedImage, setSelectedImage] = useState(null);

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
                            {/* 3. Add onClick to open the lightbox for the logo */}
                            <div className={styles.logoContainer} onClick={() => setSelectedImage(PartnerLogo)}>
                                <img src={PartnerLogo} alt="Oxykraft Partner Certificate" className={styles.logo}/>
                            </div>
                            {/* 3. Add onClick to open the lightbox for the sponsor image */}
                            <div className={styles.extraImageContainer} onClick={() => setSelectedImage(Sponser1)}>
                                <img src={Sponser1} alt="Sponsor" className={styles.extraImage}/>
                            </div>
                        </div>
                    </div>
                    <div className={styles.videoWrapper}>
                        <iframe 
                            src="https://www.youtube.com/embed/C_OyyR-Vqv0?rel=0" 
                            title="YouTube video player" 
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen>
                        </iframe>
                    </div>
                </div>
            </div>

            {/* 4. Add the Lightbox JSX */}
            {selectedImage && (
                <div className={styles.lightboxOverlay} onClick={() => setSelectedImage(null)}>
                    <div className={styles.lightboxContent}>
                        <span className={styles.closeButton}>&times;</span>
                        <img src={selectedImage} alt="Enlarged view" className={styles.lightboxImage} />
                    </div>
                </div>
            )}
        </section>
    );
};

export default Partnership;