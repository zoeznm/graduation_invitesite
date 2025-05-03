import React, { useContext } from 'react';
import styles from './Nav.module.scss';
import { LanguageContext } from '../../contexts/LanguageContext';
import { translations } from '../../contexts/lang/translations';

const Nav: React.FC = () => {
  const { lang, toggleLang } = useContext(LanguageContext);
  const [home, graduation, toggleLabel, contact] = translations[lang].nav;

  return (
    <nav className={styles.nav}>
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