import Header from "../components/Header/Header";
import BackButton from "../components/BackButton/BackButton";
import CalibrationForm from "../components/common/CalibrationForm";

const CalibrationPage = () => {
  return (
    <>
      <Header />
      <BackButton />
      <header className="pageHeader">
        <h1 className="pageTitle">Dedicated Calibration</h1>
      </header>
      <div className="pageContent">
        <div className="container">
          <p>
            At Cinetrone, sound and picture are not just installed - they are calibrated to perfection. We bring in a top-class calibrator, certified by Dolby Laboratories, with professional experience working at Hollywood studios. This ensures your system is tuned with the same precision and standards used in world-class cinemas and studios.
          </p>
          <p>
            Every detail - from speaker alignment, acoustics, EQ tuning, and image accuracy is carefully adjusted to deliver the most immersive and true-to-life experience possible. With Cinetrone, you don't just get premium equipment - you get Hollywood-level calibration in your own theatre.
          </p>
          <h3>Book a Calibration Service</h3>
          <p>
            Choose from basic, intermediate, or advanced calibration packages.
          </p>
          <p>
            For more details contact: +91 83742 78218 & +91 93609 77893
          </p>
          <CalibrationForm/>
        </div>
      </div>
    </>
  );
};
export default CalibrationPage;