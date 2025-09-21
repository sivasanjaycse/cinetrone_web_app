import { useState } from "react";
import styles from "./Common.module.css";

const CalibrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    flatNo: "",
    street: "",
    area: "",
    city: "",
    pincode: "",
    service: "", // Added service to formData
  });

  // Define service prices
  const servicePrices = {
    "basic-calibration": 5000,
    "intermediate-calibration": 30000,
    "advanced-calibration": 50000,
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In the future, this will handle payment integration
    const selectedServicePrice = servicePrices[formData.service] || 0;
    alert(`Redirecting to payment gateway for ₹${selectedServicePrice}...`);
  };

  // Get the current payment amount based on selected service
  const currentPaymentAmount = servicePrices[formData.service] || 0;

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
          <option value="basic-calibration">Basic [5.1.2, 5.1]</option>
          <option value="intermediate-calibration">Intermediate Calibration [5.1.4, 7.1.2, 7.1.4]</option>
          <option value="advanced-calibration">Advanced Calibration [above 9.1.6]</option>
        </select>
      </div>

      <button type="submit" className={`${styles.btn} ${styles.paymentBtn}`} disabled={!formData.service}>
        Proceed to Pay (₹{currentPaymentAmount})
      </button>
    </form>
  );
};

export default CalibrationForm;