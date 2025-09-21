import Header from "../components/Header/Header";
import Hero from "../components/Hero/Hero";
import About from "../components/About/About";
import Stats from "../components/Stats/Stats";
import Consultation from "../components/Consultation/Consultation";
import Calibration from "../components/Calibration/Calibration";
import ProjectsTeaser from "../components/ProjectsTeaser/ProjectsTeaser";
import Partnership from "../components/Partnership/Partnership";
import ProductGalleryTeaser from "../components/ProductGalleryTeaser/ProductGalleryTeaser";
import QuickLinks from "../components/QuickLinks/QuickLinks";
import Footer from "../components/Footer/Footer";

const HomePage = () => {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Stats />
        <Consultation />
        <Calibration />
        <ProjectsTeaser />
        <Partnership />
        <ProductGalleryTeaser />
        <QuickLinks />
      </main>
    </>
  );
};

export default HomePage;