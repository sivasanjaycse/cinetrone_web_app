// src/pages/ProductsPage.jsx
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import BackButton from "../components/BackButton/BackButton";
import styles from "./PageStyles.module.css";

// 1. Import all 8 product images from your assets folder
import Product1 from '../assets/product1.jpeg';
import Product2 from '../assets/product2.jpeg';
import Product3 from '../assets/product3.jpeg';
import Product4 from '../assets/product4.jpeg';
import Product5 from '../assets/product5.jpeg';
import Product6 from '../assets/product6.jpeg';

// 2. Use the imported variables in your productImages array
const productImages = [
  Product1, Product2, Product3, Product4,
  Product5, Product6
];

const ProductsPage = () => {
  return (
    <>
      <Header />
      <BackButton />
      {/* 3. Use an imported variable for the header background */}
      <header className="pageHeader" style={{backgroundImage: `url(${Product1})`}}>
        <h1 className="pageTitle">Product Gallery</h1>
      </header>
      <div className="pageContent">
        <div className="container">
          <p>Explore a selection of the high-performance equipment and elegant finishing materials we use in our turnkey projects.</p>
          <div className={styles.galleryGrid}>
            {productImages.map((src, index) => (
              <div key={index} className={styles.galleryItem}>
                <img src={src} alt={`Product example ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default ProductsPage;