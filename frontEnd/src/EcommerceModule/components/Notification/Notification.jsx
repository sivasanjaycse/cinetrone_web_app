import styles from './Notification.module.css';
import tickIcon from '../../assets/golden-tick.svg';
import crossIcon from '../../assets/golden-cross.svg';

const Notification = ({ message, type }) => {
  const icon = type === 'success' ? tickIcon : crossIcon;

  return (
    <div className={styles.overlay}>
      <div className={styles.box}>
        <img src={icon} alt={`${type} icon`} className={styles.icon} />
        <p className={styles.message}>{message}</p>
      </div>
    </div>
  );
};

export default Notification;