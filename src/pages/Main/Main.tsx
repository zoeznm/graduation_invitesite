import React from 'react';
import styles from './Main.module.scss';

const Main: React.FC = () => {
  return (
    <section className={styles.hero}>
      <nav className={styles.nav}>
        <ul>
          <li>PÁKYEON</li>
          <li>GRADUATION</li>
          <li>[ KOREAN ]</li>
          <li>CONTACT</li>
        </ul>
      </nav>

      <div className={styles.content}>
        <p className={styles.quote}>
          “Have you ever had a moment when you were truly angry?”
        </p>
      </div>

      <div className={styles.scrollDown}>SCROLL FOR MORE</div>
    </section>
  );
};

export default Main;
