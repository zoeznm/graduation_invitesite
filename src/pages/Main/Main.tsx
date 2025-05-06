import React from 'react';
// import Nav from '../../components/Nav/Nav';
// import styles from './Main.module.scss';
// import { LanguageContext } from '../../contexts/LanguageContext';
// import { translations } from '../../contexts/lang/translations';
// import ThreeDSection from '../../components/ThreeDSection/ThreeDSection';
// import FinalSection from '../../components/FinalSection/FinalSection';
// import BusinessCard3D from '../../components/BusinessCard3D/BusinessCard3D';
import Header from '../../components/Header/Header';
import ProjectsContainer from '../../components/Projects/ProjectsContainer';
import Footer from '../../components/Footer/Footer';

const Main: React.FC = () => {
  // const { lang } = useContext(LanguageContext);
  // const { quote, scrollDown } = translations[lang];

  return (
    <>
    <Header />
    <main>
      <ProjectsContainer />
    </main>
    <Footer />
      {/* <Nav />
      <BusinessCard3D />
      <section className={styles.hero}>
        <div className={styles.content}>
          <p className={styles.quote}>{quote}</p>
        </div>
        <div className={styles.scrollDown}>{scrollDown}</div>
      </section>

      <ThreeDSection />
      <FinalSection /> */}
    </>
  );
};

export default Main;