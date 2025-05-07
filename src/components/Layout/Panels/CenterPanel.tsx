// src/components/Layout/Panels/CenterPanel.tsx
import React from 'react';
import styles from './PanelsContainer.module.scss';

interface CenterPanelProps {
  /** 이 패널이 어느 인덱스인지 (0부터 시작) */
  index: number;
  /** 화면에 보여줄 텍스트 */
  title: string;
  /** 부가 설명이 필요하면 옵션으로 */
  description?: string;
}

const CenterPanel: React.FC<CenterPanelProps> = ({
  index,
  title,
  description,
}) => (
  <section
    className={`${styles.panel} ${styles.panelCenter}`}
    data-index={index}
  >
    <h2>{title}</h2>
    {description && <p>{description}</p>}
  </section>
);

export default CenterPanel;
