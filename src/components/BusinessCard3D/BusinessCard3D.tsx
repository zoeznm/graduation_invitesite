import React from 'react';
import styles from './BusinessCard3D.module.scss';

const items = [
  { label: 'Plage', arrow: '➔' },
  { label: 'Parking', arrow: '↑' },
  { label: 'Centre', arrow: '↗' },
];

const Main: React.FC = () => {
  return (
    <section className={styles.wrapper}>
      <ul className={styles.list}>
        {items.map((item, i) => (
          <li key={i} className={styles.item}>
            <span className={styles.label}>{item.label}</span>
            <span className={styles.arrow}>{item.arrow}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Main;