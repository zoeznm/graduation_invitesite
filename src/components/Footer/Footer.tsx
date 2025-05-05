// src/components/Footer/Footer.tsx
import React from 'react';
import styles from './Footer.module.scss';

const Footer: React.FC = () => (
  <footer className={styles.footer}>
    <div className={styles.footerContent}>
      <div className={styles.footerHeader}>
        <h2>
          <span className={styles.lightText}>
            Find the essence in simplicity,
          </span>
          <span className={styles.boldText}>
            Create without boundaries.
          </span>
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

      <div className={styles.footerLogo}>
        <svg viewBox="0 0 67 19" xmlns="http://www.w3.org/2000/svg">
          <g fill="var(--warm-off-black)">
            <path
              className="logo-path"
              d="m56.7888 18c0-5.304 2.256-10.72798 5.208-13.24798v-.048h-7.848v-3.288h12.168v3.048c-3.768 3.048-5.208 8.42398-5.208 13.53598z"
            />
            <path
              className="logo-path"
              d="m39.4973 18v-17.159973h8.088c3.816 0 6.12 1.776003 6.12 4.896003 0 2.4-1.344 3.816-3.48 4.29597v.048c4.296.744 2.736 7.392 3.72 7.68v.24h-4.488c-.84-.72.72-5.976-2.952-5.976h-2.688v5.976zm4.32-9.50397h2.928c1.728 0 2.64-.624 2.64-2.064s-.912-2.064-2.64-2.064h-2.928z"
            />
            <path
              className="logo-path"
              d="m33.022 18v-17.159973h4.32v17.159973z"
            />
            <path
              className="logo-path"
              d="m24.173 18.384c-4.968 0-7.296-3.72-7.296-8.66402 0-4.944 2.328-8.688 7.296-8.688s7.272 3.744 7.272 8.688c0 4.94402-2.304 8.66402-7.272 8.66402zm-3.048-8.66402c0 3.00002.672 5.30402 3.048 5.30402s3.024-2.304 3.024-5.30402c0-3-.648-5.328-3.048-5.328s-3.048 2.328-3.048 5.328z"
            />
            <path
              className="logo-path"
              d="m.594849 18v-17.159973h4.320001l5.99995 10.199973h.048v-10.199973h4.3201v17.159973h-4.3201l-5.99995-10.19997h-.048v10.19997z"
            />
          </g>
        </svg>
      </div>
    </div>
  </footer>
);

export default Footer;
