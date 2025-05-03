import React  from 'react';
import styles from './FinalSection.module.scss';


const FinalSection: React.FC = () => {
  // 1) 언어 토글


  // 2) 페이지에 고정할 정보
  const leftTitle = 'PÁKYEON';
  const heading = 'GRADUATION INVITATION';
  const city = 'DAEJEON';
  const date = '06. 07. 2025';
  const venue = 'Daejeon Artist House';
  const address = 'Daejeon, Jung-gu, Jungang-ro, 32';
  const copyright = '©2025 / ALL RIGHTS RESERVED';
  const credit = 'made by matomabo';

  return (
    <section className={styles.wrapper}>

      {/* 좌·중·우 3단 레이아웃 */}
      <div className={styles.inner}>
        {/* 왼쪽: 큰 텍스트 */}
        <div className={styles.left}>{leftTitle}</div>

        {/* 중앙: 3D 오브젝트 로딩 자리 */}
        <div className={styles.center}>
          <div className={styles.circle} />
        </div>

        {/* 오른쪽: 정보 텍스트 */}
        <div className={styles.right}>
          <h2>{city}</h2>
          <p>{date}</p>
          <p>{venue}</p>
          <p>{address}</p>
          <p>{copyright}</p>
          <p>{credit}</p>
          <input
            type="email"
            placeholder="[ ENTER YOUR EMAIL ]"
            className={styles.emailInput}
          />
        </div>
      </div>

      {/* 맨 아래 중앙 대형 타이틀 */}
      <h1 className={styles.heading}>{heading}</h1>
    </section>
  );
};

export default FinalSection;
