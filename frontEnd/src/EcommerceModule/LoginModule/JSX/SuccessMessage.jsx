import React from 'react';
import ReactDOM from 'react-dom';
import styles from '../Styles/SuccessMessage.module.css'

const SuccessMessage = ({ title, text, onClose }) => {
  const messageJSX = (
    <div className={styles.overlay}>
      <div className={styles.card}>
        <div className={styles.icon}>✓</div>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.text}>{text}</p>
        
        <div className={styles.modalActions}>
          <button className="login-btn login-btn--primary" onClick={onClose}>Continue</button>
        </div>

      </div>
    </div>
  );

  return ReactDOM.createPortal(messageJSX, document.body);
};

export default SuccessMessage;