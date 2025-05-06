import React from 'react';
import styles from './BottomNav.module.scss';

const BottomNav: React.FC = () => (
  <div className={styles.navigation}>
    <div className={styles.navText}>SCROLL</div>
    <div className={styles.navProgress}>
      <div className={styles.navProgressFill} />
    </div>
    <div className={styles.navText}>01 / 09</div>
  </div>
);

export default BottomNav;
