// src/components/ImageWithLoader/ImageWithLoader.jsx
import { useState } from 'react';
import Spinner from '../Spinner/Spinner';
import styles from './ImageWithLoader.module.css';

// Changed: Removed the unused 'containerClassName' prop
const ImageWithLoader = ({ src, alt, className }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        // The container no longer needs the external class
        <div className={styles.container}>
            {!isLoaded && (
                <div className={styles.spinnerWrapper}>
                    <Spinner />
                </div>
            )}
            <img
                src={src}
                alt={alt}
                className={`${styles.image} ${isLoaded ? styles.imageLoaded : ''} ${className || ''}`}
                onLoad={() => setIsLoaded(true)}
            />
        </div>
    );
};

export default ImageWithLoader;