import React from 'react';
import styles from './BottomNav.module.scss';

interface Props {
  /** App.tsx 에서 내려주는, 현재 활성 패널 인덱스 (0-based) */
  currentPanel: number;
}

const PANEL_COUNT = 9;

const BottomNav: React.FC<Props> = ({ currentPanel }) => {
  // 0~8 사이 비율 계산
  const pct = currentPanel / (PANEL_COUNT - 1);

  return (
    <div className={styles.navigation}>
      {/* 01/09 */}
      <div className={styles.navText}>
        {String(currentPanel + 1).padStart(2, '0')} / {String(PANEL_COUNT).padStart(2, '0')}
      </div>
      {/* 진행 바 */}
      <div className={styles.navProgress}>
        <div
          className={styles.navProgressFill}
          style={{ transform: `scaleX(${pct})` }}
        />
      </div>
    </div>
  );
};

export default BottomNav;
