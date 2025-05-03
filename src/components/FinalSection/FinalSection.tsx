// src/components/FinalSection/FinalSection.tsx
import React from "react";
import styles from "./FinalSection.module.scss";

const FinalSection: React.FC = () => {
  return (
    <section className={styles.wrapper}>
      {/* 상단 헤더: 언어 토글 + CONTACT 버튼 */}

      {/* 메인 히어로 영역: 이미지 왼쪽, 텍스트 오른쪽 */}
      <div className={styles.hero}>
        <div className={styles.placeholder}>3D Object Here</div>
        {/* 이미지 또는 3D 랜더링 컴포넌트 삽입 가능 */}

        <div className={styles.heroText}>
          <p>Daejeon Artist House</p>
          <p>Daejeon, Jung-gu, Jungang-ro, 32</p>
          <p>042-480-1081</p>
          <a href="#contact" className={styles.heroLink}>
            Address Information →
          </a>
        </div>
      </div>

      {/* 푸터: 4열 구성 */}
      <footer className={styles.footer} id="contact">
        <div className={styles.footerCol}>
          <p>
            PÁKYEON
            <br />
            Basé à Toulouse
            <br />
            ©2025
          </p>
        </div>
        <div className={styles.footerCol}>
          <p>
            oko0320@naver.com
            <br />
            06 50 83 05 15
          </p>
        </div>
        <div className={styles.footerCol}>
          <a href="#">Instagram →</a>
          <a href="#">Email →</a>
          <a href="#">Behance →</a>
        </div>
        <div className={styles.footerCol}>
          <p>
            Made By @matomabo
            <br />
            DA et site web par Okey Studio
          </p>
        </div>
      </footer>

      {/* 바닥 대형 타이틀 */}
      <div className={styles.bigTitle}>what words in here Full word</div>
    </section>
  );
};

export default FinalSection;
