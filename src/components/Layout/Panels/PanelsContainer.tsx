import React, { useRef, useEffect, useCallback, useContext } from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollContext } from '../../../contexts/ScrollContext';
import styles from './PanelsContainer.module.scss';

gsap.registerPlugin(ScrollTrigger);

const SMOOTH = 0.065;
const WHEEL_SENSE = 1.0;
const PANEL_COUNT = 9;

function clamp(val: number, min: number, max: number) {
  return Math.min(Math.max(val, min), max);
}

interface Props {
  /** App.tsx → 여기로 “스크롤 실행” 함수를 등록 */
  registerScroll: (fn: (index: number) => void) => void;
  /** 패널이 바뀔 때마다 App.tsx에 알려줄 콜백 */
  onPanelChange: (index: number) => void;
}

const PanelsContainer: React.FC<Props> = ({ registerScroll, onPanelChange }) => {
  useContext(ScrollContext);

  // refs for animation state
  const horizontalRef = useRef<HTMLDivElement>(null);
  const panelsRef    = useRef<HTMLDivElement>(null);
  const widthRef     = useRef(window.innerWidth);
  const targetXRef   = useRef(0);
  const currentXRef  = useRef(0);
  const animatingRef = useRef(false);
  const lastPanelRef = useRef(-1);

  const getMaxX = () => (PANEL_COUNT - 1) * widthRef.current;

  // 1) Lenis/GSAP + resize, wheel 이벤트
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
    horizontalRef.current?.addEventListener('wheel', onWheel, { passive: false });

    return () => {
      window.removeEventListener('resize', onResize);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      horizontalRef.current?.removeEventListener('wheel', onWheel);
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

    // “활성 패널” 인덱스 계산 → 변경되면 onPanelChange 호출
    const newPanel = Math.round(currentXRef.current / widthRef.current);
    if (newPanel !== lastPanelRef.current) {
      lastPanelRef.current = newPanel;
      onPanelChange(newPanel);
    }

    if (Math.abs(targetXRef.current - currentXRef.current) > 0.5) {
      requestAnimationFrame(animate);
    } else {
      animatingRef.current = false;
    }
  }, [onPanelChange]);

  // 3) 애니메이션 시작
  const startAnimate = useCallback(() => {
    if (!animatingRef.current) {
      animatingRef.current = true;
      requestAnimationFrame(animate);
    }
  }, [animate]);

  // 4) LeftMenu에서 등록해준 scroll 함수를 받아둠
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

          {/* 1: 좌측 텍스트 · 우측 이미지 */}
          <section className={`${styles.panel} ${styles.panelSplit}`} data-index={0}>
            <div className={styles.panelLeft}>
              <h2>첫 번째 패널 제목</h2>
              <p>첫 번째 패널 설명 텍스트를 여기에 적습니다.</p>
            </div>
            <div className={styles.panelRight}>
              <div className={styles.imagePlaceholder}>이미지 영역</div>
            </div>
          </section>

          {/* 2~9: 가운데 텍스트 혹은 Split 레이아웃 */}
          <section className={`${styles.panel} ${styles.panelCenter}`} data-index={1}>
            <h2>두 번째 패널 중앙 텍스트</h2>
          </section>
          <section className={`${styles.panel} ${styles.panelCenter}`} data-index={2}>
            <h2>세 번째 패널 중앙 텍스트</h2>
          </section>
          <section className={`${styles.panel} ${styles.panelSplit}`} data-index={3}>
            <div className={styles.panelLeft}>
              <div className={styles.imagePlaceholder}>이미지 영역</div>
            </div>
            <div className={styles.panelRight}>
              <h2>네 번째 패널 텍스트</h2>
              <p>네 번째 패널 설명을 여기에 작성합니다.</p>
            </div>
          </section>
          {[4,5,6,7,8].map((idx) => (
            <section
              key={idx}
              className={`${styles.panel} ${styles.panelCenter}`}
              data-index={idx}
            >
              <h2>{`${idx+1}번째 패널 중앙 텍스트`}</h2>
            </section>
          ))}

        </div>
      </div>
    </div>
  );
};

export default PanelsContainer;
