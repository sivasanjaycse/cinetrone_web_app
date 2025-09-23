import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.css';

const NotFoundPage = () => {
  return (
    <div className={styles.notFoundContainer}>
      <div className={styles.content}>
        <h1 className={styles.errorCode}>404</h1>
        <h2 className={styles.errorMessage}>Page Not Found</h2>
        <p className={styles.errorDescription}>
          Sorry, the page you are looking for does not exist or has been moved.
        </p>
        <Link to="/" className={styles.homeButton}>
          Return to Homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;