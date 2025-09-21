// src/pages/TermsPage.jsx
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import BackButton from "../components/BackButton/BackButton";

const TermsPage = () => {
  return (
    <>
      <Header />
      <BackButton />
      <header className="pageHeader">
        <h1 className="pageTitle">Terms & Conditions</h1>
      </header>
      <div className="pageContent">
        <div className="container">
          <p>By purchasing from Cinetrone, you agree to the following terms and conditions:</p>

          <h3>1. Order Confirmation</h3>
          <p>Orders are confirmed only after successful online payment. Cinetrone reserves the right to cancel or decline any order due to stock unavailability, technical error, or payment issues.</p>

          <h3>2. Pricing & Taxes</h3>
          <p>All prices listed on our website are inclusive of applicable taxes unless otherwise stated. Prices are subject to change without prior notice.</p>

          <h3>3. Shipping & Delivery</h3>
          <p>Standard delivery timeline is 7-10 working days. Delays may occur due to unforeseen factors. Cinetrone is not responsible for failed delivery due to incorrect shipping information provided by the customer.</p>

          <h3>4. Returns & Refunds</h3>
          <p>Products once sold are non-returnable unless damaged or defective on delivery. Damage must be reported within 48 hours with proof. Approved refunds will be processed within 7-14 working days.</p>

          <h3>5. Warranty</h3>
          <p>Cinetrone offers a 12-month warranty on products (24 months for turnkey services) covering manufacturing defects, void if physically damaged, tampered with, or serviced by unauthorized persons. </p>

          <h3>6. Service & Support</h3>
          <p>Customers can contact Cinetrone through official channels for warranty claims or service support.</p>
          
          <h3>7. Liability</h3>
          <p>Cinetrone is not liable for indirect damages or misuse of the product.</p>

          <h3>8. Governing Law</h3>
          <p>All disputes are subject to Tamil Nadu jurisdiction only.</p>
        </div>
      </div>
    </>
  );
};
export default TermsPage;