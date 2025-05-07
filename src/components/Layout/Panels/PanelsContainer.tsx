// src/components/Layout/Panels/PanelsContainer.tsx
import React, { useRef, useEffect, useCallback } from "react";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./PanelsContainer.module.scss";
import CenterPanel from "./CenterPanel";

gsap.registerPlugin(ScrollTrigger);

const SMOOTH = 0.065;
const WHEEL_SENSE = 1.0;
const PANEL_COUNT = 9;

function clamp(val: number, min: number, max: number) {
  return Math.min(Math.max(val, min), max);
}

interface Props {
  registerScroll: (fn: (index: number) => void) => void;
  onPanelChange: (index: number) => void;
  onProgressChange: (progress: number) => void;
}

const PanelsContainer: React.FC<Props> = ({
  registerScroll,
  onPanelChange,
  onProgressChange,
}) => {
  const horizontalRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<HTMLDivElement>(null);

  const widthRef = useRef(window.innerWidth);
  const targetXRef = useRef(0);
  const currentXRef = useRef(0);
  const animatingRef = useRef(false);
  const lastPanelRef = useRef(-1);

  const getMaxX = () => (PANEL_COUNT - 1) * widthRef.current;

  // 애니메이션 루프
  const animate = useCallback(() => {
    currentXRef.current += (targetXRef.current - currentXRef.current) * SMOOTH;

    // 가로 슬라이드 트랜스폼
    if (panelsRef.current) {
      panelsRef.current.style.transform = `translateX(-${currentXRef.current}px)`;
    }

    // 진행률 계산·전달
    const prog = currentXRef.current / getMaxX();
    onProgressChange(Math.min(Math.max(prog, 0), 1));

    // 활성 패널 변화 감지·전달
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
  }, [onPanelChange, onProgressChange]);

  // 애니메이션 시작
  const startAnimate = useCallback(() => {
    if (!animatingRef.current) {
      animatingRef.current = true;
      requestAnimationFrame(animate);
    }
  }, [animate]);

  // Lenis 초기화 + resize, wheel 이벤트 등록/해제
  useEffect(() => {
    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));

    const onResize = () => {
      const w = window.innerWidth;
      widthRef.current = w;
      panelsRef.current
        ?.querySelectorAll(`.${styles.panel}`)
        .forEach((el) => ((el as HTMLElement).style.width = `${w}px`));
    };
    window.addEventListener("resize", onResize);
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
    window.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("wheel", onWheel);
      lenis.destroy();
    };
  }, [startAnimate]);

  // LeftMenu 클릭 시 스크롤 함수 등록
  useEffect(() => {
    registerScroll((panelIndex) => {
      targetXRef.current = panelIndex * widthRef.current;
      startAnimate();
    });
  }, [registerScroll, startAnimate]);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.horizontalContainer} ref={horizontalRef}>
        <div className={styles.panelsContainer} ref={panelsRef}>
          {/* 1번: 좌측 텍스트 · 우측 이미지 */}
          <section
            className={`${styles.panel} ${styles.panelSplit}`}
            data-index={0}
          >
            <div className={styles.panelLeft}>
              <h2>첫 번째 패널 제목</h2>
              <p>첫 번째 패널 설명 텍스트를 여기에 적습니다.</p>
            </div>
            <div className={styles.panelRight}>
              <div className={styles.imagePlaceholder}>이미지 영역</div>
            </div>
          </section>

          {/* 2~3번: 중앙 텍스트 */}
          <section
            className={`${styles.panel} ${styles.panelCenter}`}
            data-index={1}
          >
            <h2>두 번째 패널 중앙 텍스트</h2>
          </section>
          <section
            className={`${styles.panel} ${styles.panelCenter}`}
            data-index={2}
          >
            <h2>세 번째 패널 중앙 텍스트</h2>
          </section>

          {/* 4번: 좌측 이미지 · 우측 텍스트 */}
          <section
            className={`${styles.panel} ${styles.panelSplit}`}
            data-index={3}
          >
            <div className={styles.panelLeft}>
              <div className={styles.imagePlaceholder}>이미지 영역</div>
            </div>
            <div className={styles.panelRight}>
              <h2>네 번째 패널 텍스트</h2>
              <p>네 번째 패널 설명을 여기에 작성합니다.</p>
            </div>
          </section>

          {/* 5번 패널 */}
          <CenterPanel
            index={4}
            title="Presence"
            description="2023년에 제작된 Presence 프로젝트입니다."
          />

          {/* 6번 패널 */}
          <CenterPanel
            index={5}
            title="Flow"
            description="2024년에 제작된 Flow 프로젝트입니다."
          />

          {/* 7번 패널 */}
          <CenterPanel
            index={6}
            title="Clarity"
            description="2024년에 제작된 Clarity 프로젝트입니다."
          />

          {/* 8번 패널 */}
          <CenterPanel
            index={7}
            title="Breath"
            description="2024년에 제작된 Breath 프로젝트입니다."
          />

          {/* 9번 패널: GET IN TOUCH */}
          <section
            className={`${styles.panel} ${styles.panelCenter}`}
            data-index={8}
          >
            <div className={styles.contactContainer}>
              <div className={styles.contactContent}>
                {/* spaceText 와 contactName 두 개 클래스 */}
                <div className={`${styles.spaceText} ${styles.contactName}`}>
                  GET IN TOUCH
                </div>
                <div className={styles.emailWrapper}>
                  <a href="mailto:hi@filip.fyi" className={styles.email}>
                    @hyunjunpark
                  </a>
                  <button
                    className={styles.copyEmail}
                    title="Copy email"
                    aria-label="Copy email to clipboard"
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PanelsContainer;
