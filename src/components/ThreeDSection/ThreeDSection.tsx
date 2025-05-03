import React from 'react';
import styles from './ThreeDSection.module.scss';

const ThreeDSection: React.FC = () => {
  return (
    <section className={styles.wrapper}>
      <div className={styles.content}>
        {/* 실제 3D 라이브러리 (Three.js, react-three-fiber 등) 를 여기에 붙여 주세요 */}
        <div className={styles.placeholder}>
          3D Object Here
        </div>
      </div>
    </section>
  );
};

export default ThreeDSection;
