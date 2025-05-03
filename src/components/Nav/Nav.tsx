import React, { useContext, useState, useEffect } from 'react';
import styles from './Nav.module.scss';
import { LanguageContext } from '../../contexts/LanguageContext';
import { translations } from '../../contexts/lang/translations';

const Nav: React.FC = () => {
  const { lang, toggleLang } = useContext(LanguageContext);
  const [home, graduation, toggleLabel, contact] = translations[lang].nav;

  // 두 번째 섹션 진입 여부 상태
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // window.scrollY가 한 화면 높이보다 크면(두 번째 섹션으로 내려왔다면)
      setIsDark(window.scrollY > window.innerHeight - 10);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`${styles.nav} ${isDark ? styles.dark : ''}`}>
      <ul>
        <li>{home}</li>
        <li>{graduation}</li>
        <li onClick={toggleLang} className={styles.toggle}>
          {toggleLabel}
        </li>
        <li>{contact}</li>
      </ul>
    </nav>
  );
};

export default Nav;
