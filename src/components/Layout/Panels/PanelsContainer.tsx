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

interface PanelsContainerProps {
  /** App.tsx에서 전달해 주는, 메뉴 클릭 시 실행할 scroll 함수 등록기 */
  registerScroll: (fn: (index: number) => void) => void;
}

const PanelsContainer: React.FC<PanelsContainerProps> = ({ registerScroll }) => {
  const horizontalRef = useRef<HTMLDivElement>(null);
  const panelsRef    = useRef<HTMLDivElement>(null);

  // 애니메이션 상태는 ref로 관리
  const widthRef     = useRef(window.innerWidth);
  const targetXRef   = useRef(0);
  const currentXRef  = useRef(0);
  const animatingRef = useRef(false);

  const getMaxX = () => (PANEL_COUNT - 1) * widthRef.current;

  // 1) Lenis/GSAP 초기화 + resize, wheel 이벤트 등록
  useEffect(() => {
    const lenis = new Lenis();
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));

    const onResize = () => {
      const w = window.innerWidth;
      widthRef.current = w;
      panelsRef.current
        ?.querySelectorAll(`.${styles.panel}`)
        .forEach((el) => {
          (el as HTMLElement).style.width = `${w}px`;
        });
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
    const el = horizontalRef.current;
    el?.addEventListener('wheel', onWheel, { passive: false });

    return () => {
      window.removeEventListener('resize', onResize);
      el?.removeEventListener('wheel', onWheel);
      lenis.destroy();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 2) 애니메이션 루프
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

  // 3) 애니메이션 시작 함수
  const startAnimate = useCallback(() => {
    if (!animatingRef.current) {
      animatingRef.current = true;
      requestAnimationFrame(animate);
    }
  }, [animate]);

  // 4) LeftMenu에서 클릭된 인덱스에 따른 스크롤 함수 등록
  useEffect(() => {
    registerScroll((panelIndex: number) => {
      targetXRef.current = panelIndex * widthRef.current;
      startAnimate();
    });
  }, [registerScroll, startAnimate]);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.horizontalContainer} ref={horizontalRef}>
        <div className={styles.panelsContainer} ref={panelsRef}>

          {/* 1번: 좌측 텍스트 • 우측 이미지 */}
          <section className={`${styles.panel} ${styles.panelSplit}`} data-index={0}>
            <div className={styles.panelLeft}>
              <h2>첫 번째 패널 제목</h2>
              <p>첫 번째 패널 설명 텍스트를 여기에 적습니다.</p>
            </div>
            <div className={styles.panelRight}>
              <div className={styles.imagePlaceholder}>이미지 영역</div>
            </div>
          </section>

          {/* 2번: 가운데 텍스트 */}
          <section className={`${styles.panel} ${styles.panelCenter}`} data-index={1}>
            <h2>두 번째 패널 중앙 텍스트</h2>
          </section>

          {/* 3번: 가운데 텍스트 */}
          <section className={`${styles.panel} ${styles.panelCenter}`} data-index={2}>
            <h2>세 번째 패널 중앙 텍스트</h2>
          </section>

          {/* 4번: 좌측 이미지 • 우측 텍스트 */}
          <section className={`${styles.panel} ${styles.panelSplit}`} data-index={3}>
            <div className={styles.panelLeft}>
              <div className={styles.imagePlaceholder}>이미지 영역</div>
            </div>
            <div className={styles.panelRight}>
              <h2>네 번째 패널 텍스트</h2>
              <p>네 번째 패널 설명을 여기에 작성합니다.</p>
            </div>
          </section>

          {/* 5~9번: 가운데 텍스트 */}
          {[4,5,6,7,8].map((idx) => (
            <section
              key={idx}
              className={`${styles.panel} ${styles.panelCenter}`}
              data-index={idx}
            >
              <h2>{`${idx + 1}번째 패널 중앙 텍스트`}</h2>
            </section>
          ))}

        </div>
      </div>
    </div>
  );
};

export default PanelsContainer;
