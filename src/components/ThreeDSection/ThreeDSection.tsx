import React from 'react';
import styles from './ThreeDSection.module.scss';

const ThreeDSection: React.FC = () => (
  <section className={styles.wrapper}>
    <div className={styles.content}>
      {/* Three.js 또는 react-three-fiber를 사용해 3D 모델을 렌더하세요 */}
      <div className={styles.placeholder}>3D Object Here</div>
    </div>
    <div className={styles.scrollMore}>SCROLL FOR MORE</div>
  </section>
);

export default ThreeDSection;