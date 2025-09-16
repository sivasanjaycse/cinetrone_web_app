import styles from "./Gallery.module.css";

// Data for the gallery items
const galleryData = [
  {
    title: "Luxury Estate Theater",
    description: "Complete custom installation",
    id: 1,
  },
  {
    title: "Modern Penthouse Cinema",
    description: "Smart integration & 8K projection",
    id: 2,
  },
  {
    title: "Classic Manor Theater",
    description: "Vintage aesthetics, modern tech",
    id: 3,
  },
  {
    title: "Executive Screening Room",
    description: "Professional-grade audio/visual",
    id: 4,
  },
];

// A sub-component for individual gallery items
const GalleryItem = ({ title, description, showNotification }) => {
  const handleClick = () => {
    showNotification(
      `${title} - Contact us to learn more about this project!`,
      "info"
    );
  };

  return (
    <div className={styles.galleryItem} onClick={handleClick}>
      <div className={styles.galleryItem__overlay}>
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
    </div>
  );
};

const Gallery = ({ showNotification }) => {
  return (
    <section className={styles.gallery} id="gallery">
      <div className={styles.container}>
        <h2 className="sectionTitle">Royal Theater Gallery</h2>
        <div className={styles.gallery__grid}>
          {galleryData.map((item) => (
            <GalleryItem
              key={item.id}
              title={item.title}
              description={item.description}
              showNotification={showNotification}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
