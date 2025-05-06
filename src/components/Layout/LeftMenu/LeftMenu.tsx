// src/components/Layout/LeftMenu/LeftMenu.tsx
import React, { useContext, useState } from 'react';
import styles from './LeftMenu.module.scss';
import { ScrollContext } from '../../../contexts/ScrollContext';

// 메뉴 레이블 (원하시는 대로 수정)
const MENU_ITEMS = [
  '01 Introduction',
  '02 Matthew',
  '03 Beyond',
  '04 Rick',
  '05 Cosmos',
  '06 Dialogue',
  '07 Infinite',
  '08 Vision',
  '09 Contact',
];

const LeftMenu: React.FC = () => {
  const { scrollToPanel } = useContext(ScrollContext);
  const [open, setOpen] = useState(false);

  return (
    <div className={`${styles.leftMenu} ${open ? styles.expanded : ''}`}>
      <button
        className={styles.menuBtn}
        aria-label="Toggle menu"
        onClick={() => setOpen((o) => !o)}
      >
        <span/><span/><span/>
      </button>

      <div className={styles.leftMenuMiddle}>
        <div className={styles.logo}>SPACE</div>
      </div>

      <nav className={styles.sectionNav}>
        {MENU_ITEMS.map((label, idx) => (
          <button
            key={idx}
            className={styles.sectionNavItem}
            onClick={() => {
              scrollToPanel(idx);
            }}
          >
            <span className={styles.sectionNavItemNumber}>
              {label.slice(0, 2)}
            </span>
            <span>{label.slice(3)}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default LeftMenu;
