import React from 'react';
import styles from './BottomNav.module.scss';

interface Props {
  currentPanel: number;
  progress: number;
}

const PANEL_COUNT = 9;

const BottomNav: React.FC<Props> = ({ currentPanel, progress }) => (
  <div className={styles.navigation}>
    <div className={styles.navText}>
      {String(currentPanel + 1).padStart(2, '0')} / {String(PANEL_COUNT).padStart(2, '0')}
    </div>
    <div className={styles.navProgress}>
      <div
        className={styles.navProgressFill}
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  </div>
);

export default BottomNav;
