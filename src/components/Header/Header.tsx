import React from 'react';
import styles from './Header.module.scss';

const Header: React.FC = () => (
  <header className={styles.siteHeader}>
    <div className={styles.gridContainer}>
      <div className={styles.logoContainer}>
        <div className={styles.logoCircles}>
          <div className={`${styles.circle} ${styles.circle1}`} />
          <div className={`${styles.circle} ${styles.circle2}`} />
        </div>
      </div>
      <nav className={styles.mainNav}>
        <ul>
          <li><a href="#" className={styles.active}>SELECTED WORKS<sup>10</sup></a></li>
          <li><a href="#">ABOUT</a></li>
          <li><a href="#">JOURNAL</a></li>
        </ul>
      </nav>
      <div className={styles.contactLink}>
        <a href="mailto:hi@filip.fyi">+GET IN TOUCH</a>
      </div>
    </div>
  </header>
);

export default Header;