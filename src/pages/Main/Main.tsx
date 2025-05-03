// src/pages/Main/Main.tsx
import React, { useContext } from 'react';
import styles from './Main.module.scss';
import { LanguageContext } from '../../contexts/LanguageContext';
import { translations } from '../../contexts/lang/translations';

const Main: React.FC = () => {
  const { lang, toggleLang } = useContext(LanguageContext);
  const { nav, quote, scrollDown } = translations[lang];

  return (
    <section className={styles.hero}>
      <nav className={styles.nav}>
        <ul>
          <li>{nav[0]}</li>
          <li>{nav[1]}</li>
          <li onClick={toggleLang} className={styles.toggle}>
            {nav[2]}
          </li>
          <li>{nav[3]}</li>
        </ul>
      </nav>

      <div className={styles.content}>
        <p className={styles.quote}>{quote}</p>
      </div>

      <div className={styles.scrollDown}>{scrollDown}</div>
    </section>
  );
};

export default Main;
