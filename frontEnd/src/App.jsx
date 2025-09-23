import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// --- Main Website Page Imports ---
import HomePage from "./HeroPageModule/pages/HomePage";
import AboutPage from "./HeroPageModule/pages/AboutPage";
import ConsultationPage from "./HeroPageModule/pages/ConsultationPage";
import CalibrationPage from "./HeroPageModule/pages/CalibrationPage";
import ProjectsPage from "./HeroPageModule/pages/ProjectsPage";
import ProductsPage from "./HeroPageModule/pages/ProductsPage";
import TermsPage from "./HeroPageModule/pages/TermsPage";
import CareersPage from "./HeroPageModule/pages/CareersPage";
import ScrollToTop from "./HeroPageModule/components/common/ScrollToTop";
import "./HeroPageModule/HeroStyles.css"
import FloatingWhatsApp from "./FloatingWhatsapp";

// --- E-commerce Module Imports ---
import EcommerceLayout from './EcommerceLayout'; // The new provider wrapper
import ProductListPage from "./EcommerceModule/ProductModule/pages/ProductListPage";
import ProductDetailPage from './EcommerceModule/ProductModule/pages/ProductDetailPage';
import CartPage from './EcommerceModule/ProductModule/pages/CartPage';
import CheckoutPage from './EcommerceModule/ProductModule/pages/CheckoutPage';
import ProfilePage from './EcommerceModule/ProductModule/pages/ProfilePage';
import LoginApp from './EcommerceModule/LoginModule/JSX/LoginApp';
import Footer from "./HeroPageModule/components/Footer/Footer";
import AdminApp from "./AdminModule/Adminapp";
import "./EcommerceModule/ecom.css"; // E-commerce specific styles
import FailedProjectsPage from "./HeroPageModule/pages/FailedProjectsPage";
import NotFoundPage from "./NotFoundPage";
function App() {
  return (
    <>
    <Router>
      <ScrollToTop />
      <FloatingWhatsApp/>
      <Routes>
        {/* === MAIN WEBSITE ROUTES === */}
        {/* These routes do NOT have the e-commerce contexts */}
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/learning-from-challenges" element={<FailedProjectsPage />} />
        <Route path="/consultation" element={<ConsultationPage />} />
        <Route path="/calibration" element={<CalibrationPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/admin-of-cinetrone" element={<AdminApp/>}/>
        {/* === E-COMMERCE ROUTES === */}
        {/* All routes nested here will have the providers from EcommerceLayout */}
        <Route path="/store" element={<EcommerceLayout />}>
          {/* The "index" route renders at the parent path: "/store" */}
          <Route index element={<ProductListPage />} />
          
          {/* These routes are relative to "/store" */}
          <Route path="products/:productId" element={<ProductDetailPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="login" element={<LoginApp />} />
        </Route>
      </Routes>
      <Footer/>
    </Router>
    
    </>
  );
}

export default App;