import React, { useContext } from 'react';
import styles from './ThreeDSection.module.scss';
import { LanguageContext } from '../../contexts/LanguageContext';
import { translations } from '../../contexts/lang/translations';

const ThreeDSection: React.FC = () => {
  const { lang } = useContext(LanguageContext);
  const { scrollDown } = translations[lang];

  return (
    <section className={styles.wrapper}>
      <div className={styles.content}>
        {/* Three.js 또는 react-three-fiber를 사용해 3D 모델을 렌더하세요 */}
        <div className={styles.placeholder}>3D Object Here</div>
      </div>
      <div className={styles.scrollDown}>{scrollDown}</div>
    </section>
  );
};

export default ThreeDSection;