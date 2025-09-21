// src/pages/CareersPage.jsx
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import BackButton from "../components/BackButton/BackButton";

const CareersPage = () => {
  return (
    <>
      <Header />
      <BackButton />
      <header className="pageHeader">
        <h1 className="pageTitle">Careers at Cinetrone</h1>
      </header>
      <div className="pageContent">
        <div className="container">
          <p>
            At Cinetrone, we're building the future of cinematic experiences. Our mission is to combine innovation, technology, and creativity to deliver world-class solutions in home cinema, outdoor AV, and automation.
          </p>

          <h3>Why Work With Us?</h3>
          <ul>
            <li><strong>Innovation-Driven:</strong> Work on cutting-edge projects including Dolby Atmos turnkey theatres and AI-powered automation.</li>
            <li><strong>Growth & Learning:</strong> Get hands-on exposure in acoustics, audio engineering, and smart home automation.</li>
            <li><strong>Impactful Projects:</strong> Be part of over 89 successful installations and upcoming demo theatres across India.</li>
            <li><strong>Culture of Creativity:</strong> We encourage problem-solving, new thinking, and bold experimentation.</li>
          </ul>

          <h3>Opportunities</h3>
          <p>We're always looking for talented individuals in:</p>
          <ul>
            <li>Audio & Acoustic Engineering</li>
            <li>Embedded Systems & Software Development (Cinetrone OS, AI, Automation)</li>
            <li>Sales, Marketing & Customer Experience</li>
            <li>Content Creation & Media</li>
            <li>No expertise is needed, just a truly interested person with basic knowledge.</li>
          </ul>

          <h3>How to Apply</h3>
          <p>
            Send your resume and portfolio to <strong>arsacinemakers@gmail.com</strong> or WhatsApp to <strong>9360977893</strong> with the subject line: "Career at Cinetrone".
          </p>
        </div>
      </div>
    </>
  );
};
export default CareersPage;