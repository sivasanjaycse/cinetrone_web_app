import { Link } from "react-router-dom";
import styles from "../common/Common.module.css";
import CalibrationImg from '../../assets/calibration.png';

const Calibration = () => {
  return (
    <section className="section" style={{backgroundColor: "var(--bg-black)"}}>
      <div className="container">
        <h2 className="sectionTitle">Dedicated Calibration Service</h2>
        <div className={styles.contentLayout}>
          <div className={`${styles.imageLeft}`}>
            <img src={CalibrationImg} alt="Calibration process" className={styles.contentImage}/>
          </div>
          <div className={`${styles.contentText} ${styles.contentRight}`}>
            <h3>Calibrated to Perfection</h3>
            <p>
              We bring in a top-class calibrator, certified by Dolby Laboratories, with professional experience at Hollywood studios. This ensures your system is tuned with the same precision and standards used in world-class cinemas.
            </p>
            <Link to="/calibration" className={styles.btn}>Learn About Calibration</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Calibration;