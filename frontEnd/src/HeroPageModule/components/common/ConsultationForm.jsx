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
    service: serviceType || "", // Initialize service with prop or empty string
  });

  // Define consultation service prices
  const consultationServicePrices = {
    "entry-level": 357, // Example price for Entry level hometheater without acoustic
    "dolby-atmos": 799, // Example price for Dolby Atmos setup without acoustic
    "turnkey": 1499, // Example price for Turn key home cinema setup
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedServicePrice = consultationServicePrices[formData.service] || 0;
    alert(`Redirecting to payment gateway for ₹${selectedServicePrice}...`);
  };

  // Get the current payment amount based on selected service
  const currentPaymentAmount = consultationServicePrices[formData.service] || 0;

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label htmlFor="name" className={styles.formLabel}>Full Name</label>
        <input type="text" id="name" name="name" className={styles.formInput} value={formData.name} onChange={handleChange} required />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="address" className={styles.formLabel}>Address</label>
        <input type="text" id="flatNo" name="flatNo" placeholder="Flat No. & Building Name" className={styles.formInput} style={{marginBottom: "10px"}} value={formData.flatNo} onChange={handleChange} required />
        <input type="text" id="street" name="street" placeholder="Street Name" className={styles.formInput} style={{marginBottom: "10px"}} value={formData.street} onChange={handleChange} required />
        <input type="text" id="area" name="area" placeholder="Area" className={styles.formInput} value={formData.area} onChange={handleChange} required />
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
          <option value="entry-level">Entry level hometheater 5.1, 7.1 setup</option>
          <option value="dolby-atmos">Dolby Atmos 5.1.2 setup</option>
          <option value="turnkey">Entire Turnkey Project</option>
        </select>
      </div>

      <button type="submit" className={`${styles.btn} ${styles.paymentBtn}`} disabled={!formData.service}>
        Proceed to Pay (₹{currentPaymentAmount})
      </button>
    </form>
  );
};

export default ConsultationForm;