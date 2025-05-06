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

    // window 크기 바뀔 때마다 패널 너비 재설정
    const onResize = () => {
      const w = window.innerWidth;
      widthRef.current = w;

      panelsRef.current
        ?.querySelectorAll(`.${styles.panel}`)
        .forEach(el => {
          // 첫 번째 패널(.firstPanel)은 건너뜀
          if ((el as HTMLElement).classList.contains(styles.firstPanel)) return;
          (el as HTMLElement).style.width = `${w}px`;
        });
    };
    window.addEventListener('resize', onResize);
    onResize();

    // 휠 스크롤 → translateX
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      targetXRef.current = clamp(
        targetXRef.current + e.deltaY * WHEEL_SENSE,
        0,
        getMaxX()
      );
      startAnimate();
    };
    const hc = horizontalRef.current;
    hc?.addEventListener('wheel', onWheel, { passive: false });

    return () => {
      window.removeEventListener('resize', onResize);
      hc?.removeEventListener('wheel', onWheel);
      lenis.destroy();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 애니메이션 루프
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

  // 애니메이션 시작
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

          {/* ── 1번 패널 : split + firstPanel */}
          <section
            className={`
              ${styles.panel}
              ${styles.panelSplit}
              ${styles.firstPanel}
            `}
            data-index={0}
          >
            <div className={styles.panelLeft}>
              <h2>여기는 첫 번째 패널의 제목입니다</h2>
              <p>이곳에 설명 텍스트나 본문을 자유롭게 입력하세요.</p>
            </div>
            <div className={styles.panelRight}>
              <div className={styles.imagePlaceholder}>
                이미지 영역
              </div>
            </div>
          </section>

          {/* ── 2~9번 패널 (더미) */}
          {Array.from({ length: PANEL_COUNT - 1 }).map((_, idx) => (
            <section
              key={idx + 1}
              className={styles.panel}
              data-index={idx + 1}
            />
          ))}

        </div>
      </div>
    </div>
  );
};

export default PanelsContainer;
