import { useState, useEffect } from "react";

import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import Services from "./components/Services/Services";
import WhyChoose from "./components/WhyChoose/WhyChoose";
import Gallery from "./components/Gallery/Gallery";
import Testimonials from "./components/Testimonials/Testimonials";
import Footer from "./components/Footer/Footer";
import Notification from "./components/Notification/Notification";

function App() {
  const [notification, setNotification] = useState({ message: "", type: "" });

  // Function to display notifications
  const showNotification = (message, type = "info") => {
    setNotification({ message, type });
  };

  const hideNotification = () => {
    setNotification({ message: "", type: "" });
  };

  // Effect for smooth scrolling
  useEffect(() => {
    const links = document.querySelectorAll('a[href^="#"]');
    const headerOffset = 80; // Height of the fixed header

    const clickHandler = function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    };

    links.forEach((anchor) => {
      anchor.addEventListener("click", clickHandler);
    });

    // Cleanup function to remove event listeners
    return () => {
      links.forEach((anchor) => {
        anchor.removeEventListener("click", clickHandler);
      });
    };
  }, []);

  return (
    <>
      <Notification
        message={notification.message}
        type={notification.type}
        onHide={hideNotification}
      />
      <Header />
      <main>
        <Hero />
        <Services showNotification={showNotification} />
        <WhyChoose />
        <Gallery showNotification={showNotification} />
        <Testimonials />
      </main>
      <Footer showNotification={showNotification} />
    </>
  );
}

export default App;
