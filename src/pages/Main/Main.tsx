import React, { useContext } from 'react';
import Nav from '../../components/Nav/Nav';
import styles from './Main.module.scss';
import { LanguageContext } from '../../contexts/LanguageContext';
import { translations } from '../../contexts/lang/translations';
import ThreeDSection from '../../components/ThreeDSection/ThreeDSection';

const Main: React.FC = () => {
  const { lang } = useContext(LanguageContext);
  const { quote, scrollDown } = translations[lang];

  return (
    <>
      <Nav />

      <section className={styles.hero}>
        <div className={styles.content}>
          <p className={styles.quote}>{quote}</p>
        </div>
        <div className={styles.scrollDown}>{scrollDown}</div>
      </section>

      <ThreeDSection />
    </>
  );
};

export default Main;