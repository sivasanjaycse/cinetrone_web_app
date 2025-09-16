// src/pages/AboutPage.jsx
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import BackButton from "../components/BackButton/BackButton";

const AboutPage = () => {
  return (
    <>
      <Header />
      <BackButton />
      <header className="pageHeader">
        <h1 className="pageTitle">About Cinetrone</h1>
      </header>
      <div className="pageContent">
        <div className="container">
          <p>
            At Cinetrone, we believe cinema isn't just about watching a movie - it's about living the experience.
          </p>
          <p>
            Founded with passion and driven by innovation, Cinetrone is dedicated to creating immersive home theatres, outdoor cinema experiences, and advanced audio-visual solutions that bring stories to life like never before.
          </p>
          <p>
            With years of expertise in audio technology, acoustics, and smart automation, we design and deliver solutions that combine cutting-edge performance with elegant design. From powerful sound systems to intelligent control, every detail is engineered to give you the true theatre experience, right at your home or venue.
          </p>
          <h3>What makes us different?</h3>
          <ul>
            <li><strong>Innovation-First Approach:</strong> We research, test, and build technology that sets new benchmarks.</li>
            <li><strong>Trusted Expertise:</strong> Backed by deep knowledge in AV, acoustics, and automation.</li>
            <li><strong>Customer-Centric Service:</strong> Every project is tailor-made to your vision.</li>
            <li><strong>Future-Ready Technology:</strong> From Dolby Atmos theatres to AI-driven automation, we stay ahead of trends.</li>
          </ul>
          <p>
            At Cinetrone, we don't just sell products - we craft experiences that inspire, entertain, and connect people. Whether it's a luxury home theatre, an outdoor cinema under the stars, or the next generation of AV automation, Cinetrone is your trusted partner.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default AboutPage;