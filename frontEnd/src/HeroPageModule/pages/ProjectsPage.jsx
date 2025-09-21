// src/pages/ProjectsPage.jsx
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import BackButton from "../components/BackButton/BackButton";
import styles from "./PageStyles.module.css";
import Project1 from '../assets/project1.PNG';
import Project2 from '../assets/project2.jpeg';
import Project3 from '../assets/project3.jpeg';
import Project4 from '../assets/project4.PNG';
import Project5 from '../assets/project5.PNG';
import Project6 from '../assets/project6.PNG';

const projects = [
  "Dolby Atmos Home Theatre - Coimbatore (Turnkey project)",
  "Hall Installation - Coimbatore",
  "Bedroom Setup - Pondemalle",
  "System with Projector + Calibration Rework - Velachery",
  "Dolby Atmos Home Theatre - Hyderabad (Turnkey project)",
  "Acoustic Treatment - Hyderabad",
  "Virtual Calibration - Avadi Client",
  "Outdoor Cinema + 5.1 Indoor Audio System - Salem Resort (Turnkey project)",
  "Upcoming: Tiruchi (3 sites) & Bangalore (Dolby Atmos turnkey setups) etc."
];

// FIX #1: Use the imported variables directly in the array.
const images = [Project1, Project2, Project3, Project4, Project5, Project6];

const ProjectsPage = () => {
  return (
    <>
      <Header />
      <BackButton />
      {/* FIX #2: Use an imported variable for the background image. */}
      <header className="pageHeader">
        <h1 className="pageTitle">Our Projects</h1>
      </header>
      <div className="pageContent">
        <div className="container">
          <h3>Completed & Upcoming Projects</h3>
          <ul className={styles.projectList}>
            {projects.map((proj, index) => (
              <li key={index}>{proj}</li>
            ))}
          </ul>
          <h3 style={{marginTop: '40px'}}>Project Gallery</h3>
          <div className={styles.galleryGrid}>
            {images.map((src, index) => (
              <div key={index} className={styles.galleryItem}>
                {/* This part will now work correctly. */}
                <img src={src} alt={`Project scenery ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default ProjectsPage;