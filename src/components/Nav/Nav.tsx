// src/components/Nav/Nav.tsx
import React, { useContext, useState, useEffect } from 'react';
import styles from './Nav.module.scss';
import { LanguageContext } from '../../contexts/LanguageContext';
import { translations } from '../../contexts/lang/translations';

const Nav: React.FC = () => {
  const { lang, toggleLang } = useContext(LanguageContext);
  const [home, graduation, toggleLabel, contact] = translations[lang].nav;

  // 상태: 다크 모드(2nd section 넘어감), 최종 모드(3rd section 넘어감)
  const [isDark, setIsDark] = useState(false);
  const [isFinal, setIsFinal] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setIsDark(y > window.innerHeight - 10);
      setIsFinal(y > window.innerHeight * 2 - 10);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // 최종 페이지 진입 시 토글만 표시
  const labels = isFinal ? [toggleLabel] : [home, graduation, toggleLabel, contact];

  return (
    <nav
    className={`
      ${styles.nav}
      ${isDark && !isFinal ? styles.dark : ''}
      ${isFinal ? styles.final : ''}
    `}
  >
      <ul>
        {labels.map((label, idx) => (
          <li
            key={idx}
            onClick={idx === (isFinal ? 0 : 2) ? toggleLang : undefined}
            className={idx === (isFinal ? 0 : 2) ? styles.toggle : ''}
          >
            {label}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
