// src/pages/ConsultationPage.jsx
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import BackButton from "../components/BackButton/BackButton";
import ConsultationForm from "../components/common/ConsultationForm";

const ConsultationPage = () => {
  return (
    <>
      <Header />
      <BackButton />
      <header className="pageHeader">
        <h1 className="pageTitle">Book Your Consultation</h1>
      </header>
      <div className="pageContent">
        <div className="container">
          <p>
            At Cinetrone, every great theatre experience starts with the right plan.That's why we offer personalized consultation sessions to understand your vision, space, and budget before we design your perfect solution.
          </p>
          <p>
            Whether you're planning a luxury home theatre, outdoor cinema, or advanced AV automation, our experts guide you step by step from concept to execution.Get in touch today and let's turn your dream setup into reality.
          </p>
          <ConsultationForm serviceType="consultation" />
        </div>
      </div>
      <Footer />
    </>
  );
};
export default ConsultationPage;