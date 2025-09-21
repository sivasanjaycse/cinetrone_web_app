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
import NewProduct1 from '../assets/newproduct1.jpeg';
import NewProduct2 from '../assets/newproduct2.jpeg';
import NewProduct3 from '../assets/newproduct3.jpeg';
import NewProduct4 from '../assets/newproduct4.jpeg';
import NewProduct5 from '../assets/newproduct5.jpeg';
import NewProduct6 from '../assets/newproduct6.jpeg';
import NewProduct7 from '../assets/newproduct7.jpeg';
import NewProduct8 from '../assets/newproduct8.jpeg';
import NewProduct9 from '../assets/newproduct9.jpeg';
import NewProduct11 from '../assets/newproduct11.jpeg';
import NewProduct12 from '../assets/newproduct12.jpeg';
import NewProduct10 from '../assets/newproduct13.jpeg';
// 2. Use the imported variables in your productImages array
const productImages = [
  Product1, Product2, Product3, Product4,
  Product5, Product6, NewProduct1, NewProduct2, NewProduct3, NewProduct4, NewProduct5, NewProduct6, NewProduct7,
  NewProduct12, NewProduct11, NewProduct10, NewProduct9, NewProduct8
];

const ProductsPage = () => {
  return (
    <>
      <Header />
      <BackButton />
      {/* 3. Use an imported variable for the header background */}
      <header className="pageHeader">
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
    </>
  );
};
export default ProductsPage;