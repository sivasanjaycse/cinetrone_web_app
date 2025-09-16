import { useState } from "react";
import styles from "./Common.module.css";

const ConsultationForm = ({ serviceType }) => {
  const [formData, setFormData] = useState({
    name: "",
    flatNo: "",
    street: "",
    area: "",
    city: "",
    pincode: "",
    service: serviceType || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In the future, this will handle payment integration
    alert("Redirecting to payment gateway...");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label htmlFor="name" className={styles.formLabel}>Full Name</label>
        <input type="text" id="name" name="name" className={styles.formInput} value={formData.name} onChange={handleChange} required />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="address" className={styles.formLabel}>Address</label>
        <input type="text" id="address" name="flatNo" placeholder="Flat No. & Building Name" className={styles.formInput} style={{marginBottom: "10px"}} value={formData.flatNo} onChange={handleChange} required />
        <input type="text" name="street" placeholder="Street Name" className={styles.formInput} style={{marginBottom: "10px"}} value={formData.street} onChange={handleChange} required />
        <input type="text" name="area" placeholder="Area" className={styles.formInput} value={formData.area} onChange={handleChange} required />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="city" className={styles.formLabel}>City</label>
        <input type="text" id="city" name="city" className={styles.formInput} value={formData.city} onChange={handleChange} required />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="pincode" className={styles.formLabel}>Pincode</label>
        <input type="text" id="pincode" name="pincode" className={styles.formInput} value={formData.pincode} onChange={handleChange} required />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="service" className={styles.formLabel}>Type of Service Needed</label>
        <select id="service" name="service" className={styles.formSelect} value={formData.service} onChange={handleChange} required>
          <option value="">-- Select a Service --</option>
          <option value="entry-level">Entry level hometheater without acoustic</option>
          <option value="dolby-atmos">Dolby Atmos setup without acoustic</option>
          <option value="turnkey">Turn key home cinema setup</option>
          {serviceType === "calibration" && (
            <>
              <option value="basic-calibration">Basic Calibration</option>
              <option value="intermediate-calibration">Intermediate Calibration</option>
              <option value="advanced-calibration">Advanced Calibration</option>
            </>
          )}
        </select>
      </div>

      <button type="submit" className={`${styles.btn} ${styles.paymentBtn}`}>
        Proceed to Pay (₹357)
      </button>
    </form>
  );
};

export default ConsultationForm;