import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ConsultationPage from "./pages/ConsultationPage";
import CalibrationPage from "./pages/CalibrationPage";
import ProjectsPage from "./pages/ProjectsPage";
import ProductsPage from "./pages/ProductsPage";
import TermsPage from "./pages/TermsPage";
import CareersPage from "./pages/CareersPage";
import AboutPage from "./pages/AboutPage"; // Full About Us page
import ScrollToTop from "./components/common/ScrollToTop";
import "./HeroStyles.css";
function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/consultation" element={<ConsultationPage />} />
        <Route path="/calibration" element={<CalibrationPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/careers" element={<CareersPage />} />
      </Routes>
    </Router>
  );
}

export default App;