import { useState } from 'react';
import Spinner from '../Spinner/Spinner';
import styles from './ImageWithLoader.module.css';
const ImageWithLoader = ({ src, alt, className }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
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