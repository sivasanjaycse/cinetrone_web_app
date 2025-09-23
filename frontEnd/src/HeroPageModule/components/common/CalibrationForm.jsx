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
    service: "",
  });

  // Define service details for clarity in the message
  const serviceDetails = {
    "basic-calibration": {
      name: "Basic [5.1.2, 5.1]",
      price: 5000,
    },
    "intermediate-calibration": {
      name: "Intermediate Calibration [5.1.4, 7.1.2, 7.1.4]",
      price: 30000,
    },
    "advanced-calibration": {
      name: "Advanced Calibration with Dirac [above 9.1.6]",
      price: 60000,
    },
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- UPDATED SUBMIT HANDLER ---
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const service = serviceDetails[formData.service];
    if (!service) {
        alert("Please select a valid service.");
        return;
    }

    // 1. Construct the message with all form details
    const message = `
*New Calibration Service Request*

*Name:* ${formData.name}
*Address:* ${formData.flatNo}, ${formData.street}, ${formData.area}, ${formData.city} - ${formData.pincode}
*Service:* ${service.name}
*Amount:* ₹${service.price.toLocaleString('en-IN')}
I am ready to pay the above mentioned payment for the service
    `;

    // 2. URL-encode the message for the link
    const encodedMessage = encodeURIComponent(message.trim());

    // 3. Create the final WhatsApp URL
    const whatsappUrl = `https://wa.me/919360977893?text=${encodedMessage}`;

    // 4. Open the URL in a new tab
    window.open(whatsappUrl, '_blank');
  };

  const currentPaymentAmount = serviceDetails[formData.service]?.price || 0;

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
          <option value="advanced-calibration">Advanced Calibration with Dirac [above 9.1.6]</option>
        </select>
      </div>

      <button type="submit" className={`${styles.btn} ${styles.paymentBtn}`} disabled={!formData.service}>
        Contact Via Whatsapp (₹{currentPaymentAmount.toLocaleString('en-IN')})
      </button>
    </form>
  );
};

export default CalibrationForm;