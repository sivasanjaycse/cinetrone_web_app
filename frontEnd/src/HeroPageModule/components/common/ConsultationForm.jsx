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

  // Combined service details 
  const serviceDetails = {
    "entry-level": { 
      name: "Entry level hometheater 5.1, 7.1 setup", 
      price: 357 
    },
    "dolby-atmos": { 
      name: "Dolby Atmos 5.1.2 setup", 
      price: 357
    },
    "turnkey": { 
      name: "Entire Turnkey Project", 
      price: 357 
    },
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const service = serviceDetails[formData.service];
    if (!service) {
        alert("Please select a valid service.");
        return;
    }


    const message = `
*New Consultation Request*

*Name:* ${formData.name}
*Address:* ${formData.flatNo}, ${formData.street}, ${formData.area}, ${formData.city} - ${formData.pincode}
*Service:* ${service.name}
*Consultation Fee:* ₹${service.price.toLocaleString('en-IN')}
I am ready to pay the above mentioned payment for the service.
    `;

    const encodedMessage = encodeURIComponent(message.trim());

    const whatsappUrl = `https://wa.me/919360977893?text=${encodedMessage}`;

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
          <option value="entry-level">Entry level hometheater 5.1, 7.1 setup</option>
          <option value="dolby-atmos">Dolby Atmos 5.1.2 setup</option>
          <option value="turnkey">Entire Turnkey Project</option>
        </select>
      </div>

      <button type="submit" className={`${styles.btn} ${styles.paymentBtn}`} disabled={!formData.service}>
        Book via WhatsApp (₹{currentPaymentAmount.toLocaleString('en-IN')})
      </button>
    </form>
  );
};

export default ConsultationForm;