import React from 'react';
import Header from "../components/Header/Header";
import BackButton from "../components/BackButton/BackButton";
import styles from "./FailedProjectsPage.module.css";
import Project4 from "../assets/project4.png";
import Project5 from "../assets/project5.png";
const FailedProjectsPage = () => {
    return (
        <>
            <Header />
            <BackButton />
            <header className={styles.pageHeader}>
                <h1 className={styles.pageTitle}>Learning From Challenges</h1>
            </header>
            <div className={styles.pageContent}>
                <div className="container">
                    <div className={styles.description}>
                        <p>
                            In one of our projects at Coimbatore, we faced a unique challenge that became a valuable learning experience. The issue was not with the audio or video performance, but with the screen placement. Due to the builder’s structural layout, the screen wall turned out to be narrower than expected.
                        </p>
                        <p>
                            During the initial stage, measurements were taken on the rear wall, and we assumed that side to be the correct screen area. However, after installation, we realized that the actual screen wall was on the opposite end. This led to the screen edges being recessed into the acoustic treatment, creating limitations in screen width.
                        </p>
                        <p>
                            Although the outcome wasn’t as planned, this project taught us the importance of double-verification of room orientation before installation. Every challenge like this sharpens our process and ensures that we deliver even better results in future projects.
                        </p>
                    </div>

                    {/* Placeholder for two images */}
                    <div className={styles.imageGrid}>
                        <div className={styles.imageContainer}>
                            <img src={Project4} alt="Placeholder for initial room assessment" />
                        </div>
                        <div className={styles.imageContainer}>
                            <img src={Project5} alt="Placeholder for final installation" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FailedProjectsPage;