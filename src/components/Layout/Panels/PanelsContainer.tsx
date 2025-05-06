// src/components/Layout/Panels/PanelsContainer.tsx
import React, { useRef, useEffect, useCallback } from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './PanelsContainer.module.scss';

gsap.registerPlugin(ScrollTrigger);

const SMOOTH = 0.065;
const WHEEL_SENSE = 1.0;
const PANEL_COUNT = 9;

function clamp(val: number, min: number, max: number) {
  return Math.min(Math.max(val, min), max);
}

const PanelsContainer: React.FC = () => {
  const horizontalRef = useRef<HTMLDivElement>(null);
  const panelsRef    = useRef<HTMLDivElement>(null);

  const widthRef     = useRef(window.innerWidth);
  const targetXRef   = useRef(0);
  const currentXRef  = useRef(0);
  const animatingRef = useRef(false);

  const getMaxX = () => (PANEL_COUNT - 1) * widthRef.current;

  useEffect(() => {
    const lenis = new Lenis();
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));

    const onResize = () => {
      const w = window.innerWidth;
      widthRef.current = w;
      panelsRef.current
        ?.querySelectorAll(`.${styles.panel}`)
        .forEach(el => (el as HTMLElement).style.width = `${w}px`);
    };
    window.addEventListener('resize', onResize);
    onResize();

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      targetXRef.current = clamp(
        targetXRef.current + e.deltaY * WHEEL_SENSE,
        0,
        getMaxX()
      );
      startAnimate();
    };
    horizontalRef.current?.addEventListener('wheel', onWheel, { passive: false });

    return () => {
      window.removeEventListener('resize', onResize);
      horizontalRef.current?.removeEventListener('wheel', onWheel);
      lenis.destroy();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const animate = useCallback(() => {
    currentXRef.current +=
      (targetXRef.current - currentXRef.current) * SMOOTH;
    if (panelsRef.current) {
      panelsRef.current.style.transform =
        `translateX(-${currentXRef.current}px)`;
    }
    if (Math.abs(targetXRef.current - currentXRef.current) > 0.5) {
      requestAnimationFrame(animate);
    } else {
      animatingRef.current = false;
    }
  }, []);

  const startAnimate = () => {
    if (!animatingRef.current) {
      animatingRef.current = true;
      requestAnimationFrame(animate);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.horizontalContainer} ref={horizontalRef}>
        <div className={styles.panelsContainer} ref={panelsRef}>

          {/* 1. 좌:텍스트 • 우:이미지 */}
          <section
            className={`${styles.panel} ${styles.panelSplit}`}
            data-index={0}
          >
            <div className={styles.panelLeft}>
              <h2>첫 번째 패널 제목</h2>
              <p>첫 번째 패널 설명 텍스트를 여기에 적습니다.</p>
            </div>
            <div className={styles.panelRight}>
              <div className={styles.imagePlaceholder}>
                이미지 영역
              </div>
            </div>
          </section>

          {/* 2. 가운데 텍스트 */}
          <section
            className={`${styles.panel} ${styles.panelCenter}`}
            data-index={1}
          >
            <h2>두 번째 패널 중앙 텍스트</h2>
          </section>

          {/* 3. 가운데 텍스트 */}
          <section
            className={`${styles.panel} ${styles.panelCenter}`}
            data-index={2}
          >
            <h2>세 번째 패널 중앙 텍스트</h2>
          </section>

          {/* 4. 좌:이미지 • 우:텍스트 */}
          <section
            className={`${styles.panel} ${styles.panelSplit}`}
            data-index={3}
          >
            <div className={styles.panelLeft}>
              <div className={styles.imagePlaceholder}>
                이미지 영역
              </div>
            </div>
            <div className={styles.panelRight}>
              <h2>네 번째 패널 텍스트</h2>
              <p>네 번째 패널 설명을 여기에 작성합니다.</p>
            </div>
          </section>

          {/* 5. 가운데 텍스트 */}
          <section
            className={`${styles.panel} ${styles.panelCenter}`}
            data-index={4}
          >
            <h2>다섯 번째 패널 중앙 텍스트</h2>
          </section>

          {/* 6. 가운데 텍스트 */}
          <section
            className={`${styles.panel} ${styles.panelCenter}`}
            data-index={5}
          >
            <h2>여섯 번째 패널 중앙 텍스트</h2>
          </section>

          {/* 7. 가운데 텍스트 */}
          <section
            className={`${styles.panel} ${styles.panelCenter}`}
            data-index={6}
          >
            <h2>일곱 번째 패널 중앙 텍스트</h2>
          </section>

          {/* 8. 가운데 텍스트 */}
          <section
            className={`${styles.panel} ${styles.panelCenter}`}
            data-index={7}
          >
            <h2>여덟 번째 패널 중앙 텍스트</h2>
          </section>

          {/* 9. 가운데 텍스트 */}
          <section
            className={`${styles.panel} ${styles.panelCenter}`}
            data-index={8}
          >
            <h2>아홉 번째 패널 중앙 텍스트</h2>
          </section>

        </div>
      </div>
    </div>
  );
};

export default PanelsContainer;
