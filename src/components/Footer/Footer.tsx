// src/components/Footer/Footer.tsx
import React from "react";
import styles from "./Footer.module.scss";

const Footer: React.FC = () => (
  <footer className={styles.footer}>
    <div className={styles.footerContent}>
      <div className={styles.footerHeader}>
        <h2>
          <span className={styles.lightText}>
            Find the essence in simplicity,
          </span>
          <span className={styles.boldText}>Create without boundaries.</span>
        </h2>
      </div>

      <div className={styles.footerGrid}>
        <div className={styles.footerColumn}>
          <div className={styles.footerSection}>
            <h3>Contact</h3>
            <p>
              <a href="mailto:hi@filip.fyi">hi@filip.fyi</a>
            </p>
            <p>
              <a href="tel:+381631943959">+381.63.TARA.959</a>
            </p>
          </div>
          <div className={styles.footerSection}>
            <h3>&nbsp;</h3>
            <p>&nbsp;</p>
          </div>
        </div>

        <div className={styles.footerColumn}>
          <div className={styles.footerSection}>
            <p>
              <a href="#">Sound</a>
            </p>
            <p>
              <a href="#">Vision</a>
            </p>
            <p>
              <a href="#">Feeling</a>
            </p>
          </div>
          <div className={styles.footerSection}>
            <h3>Fragments</h3>
            <p>Receive Signals</p>
          </div>
        </div>

        <div className={styles.footerColumn}>
          <div className={styles.footerSection}>
            <p>
              <a href="#">
                Works<sup>(10)</sup>
              </a>
            </p>
            <p>
              <a href="#">About</a>
            </p>
            <p>
              <a href="#">Journal</a>
            </p>
          </div>
          <div className={styles.footerSection}>
            <h3>Location</h3>
            <p>43.9359° N, 19.4959° E</p>
          </div>
        </div>
      </div>

      <div className={styles.footerLogoText}>
      PÁKYEON
    </div>
    </div>
  </footer>
);

export default Footer;
