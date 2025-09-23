import { useState } from 'react';
import styles from './ImageSlider.module.css';
import ImageWithLoader from '../../components/ImageWithLoader/ImageWithLoader';

const ImageSlider = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images || images.length === 0) {
    return <div className={styles.sliderContainer}><div className={styles.mainImage} /></div>;
  }

  return (
    <div className={styles.sliderContainer}>
      <ImageWithLoader
        key={activeIndex} 
        src={images[activeIndex]}
        alt={`Product view ${activeIndex + 1}`}
        className={styles.mainImage}
      />
      <div className={styles.thumbnails}>
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Thumbnail ${index + 1}`}
            className={`${styles.thumbnail} ${index === activeIndex ? styles.active : ''}`}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;