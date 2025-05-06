import React, { useState, useEffect, useRef } from 'react';
import styles from './LeftMenu.module.scss';

const sections = [
  'Introduction',
  'Matthew',
  'Beyond',
  'Rick',
  'Cosmos',
  'Dialogue',
  'Infinite',
  'Vision',
  'Contact',
];

const LeftMenu: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // body 클래스 토글
  useEffect(() => {
    document.body.classList.toggle('menu-expanded', expanded);
  }, [expanded]);

  // 메뉴 아이템 등장 애니메이션
  const animateMenuItems = (show: boolean) => {
    const items = menuRef.current?.querySelectorAll<HTMLAnchorElement>(
      `.${styles.sectionNavItem}`
    );
    items?.forEach((item, i) => {
      if (show) {
        setTimeout(() => item.classList.add(styles.animateIn), 50 + i * 30);
      } else {
        item.classList.remove(styles.animateIn);
      }
    });
  };

  const toggleMenu = () => {
    setExpanded((v) => !v);
    if (!expanded) {
      setTimeout(() => animateMenuItems(true), 150);
    } else {
      animateMenuItems(false);
    }
  };

  return (
    <div
      ref={menuRef}
      className={`${styles.leftMenu} ${expanded ? styles.expanded : ''}`}
    >
      <div className={styles.leftMenuTop}>
        <button
          className={styles.menuBtn}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className={styles.leftMenuMiddle}>
        <div className={styles.logo}>(PAF)</div>
      </div>

      <nav className={styles.sectionNav}>
        {sections.map((label, idx) => (
          <a
            key={idx}
            className={styles.sectionNavItem}
            data-index={idx}
            onClick={() => {
              /* 추후 PanelsContainer로 패널 이동 로직 연결 */
            }}
          >
            <span className={styles.sectionNavItemNumber}>
              {String(idx + 1).padStart(2, '0')}
            </span>
            <span>{label}</span>
          </a>
        ))}
      </nav>
    </div>
  );
};

export default LeftMenu;
