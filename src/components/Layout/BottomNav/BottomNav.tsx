// src/components/Layout/BottomNav/BottomNav.tsx
import React from 'react';
import styles from './BottomNav.module.scss';

interface Props {
  currentPanel: number;
  progress: number;
}

const PANEL_COUNT = 5;

const BottomNav: React.FC<Props> = ({ currentPanel, progress }) => (
  <div className={styles.navigation}>
    {/* 1. SCROLL 레이블 */}
    <div className={styles.navLabel}>SCROLL</div>

    {/* 2. 진행바 */}
    <div className={styles.navProgress}>
      <div
        className={styles.navProgressFill}
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>

    {/* 3. 패널 숫자 */}
    <div className={styles.navText}>
      {String(currentPanel + 1).padStart(2, '0')} / {String(PANEL_COUNT).padStart(2, '0')}
    </div>
  </div>
);

export default BottomNav;
