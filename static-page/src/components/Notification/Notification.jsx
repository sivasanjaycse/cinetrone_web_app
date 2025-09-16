import { useEffect } from "react";
import styles from "./Notification.module.css";

const Notification = ({ message, type, onHide }) => {
  useEffect(() => {
    const timer = setTimeout(onHide, 5000);
    return () => clearTimeout(timer);
  }, [onHide]);

  if (!message) return null;

  return (
    <div className={`${styles.notification} ${styles[type]}`}>
      <span className={styles.message}>{message}</span>
      <button onClick={onHide} className={styles.closeBtn}>
        &times;
      </button>
    </div>
  );
};

export default Notification;
