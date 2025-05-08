// src/components/Layout/Panels/PanelsContainer.tsx
import React, { useRef, useEffect, useCallback } from "react";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./PanelsContainer.module.scss";
// import CenterPanel from "./CenterPanel";
import FirstImage from "../../../assets/img/anger.jpg";
// import SecondImage from "../../../assets/img/poster.png";

gsap.registerPlugin(ScrollTrigger);

const SMOOTH = 0.065;
const WHEEL_SENSE = 1.0;
const PANEL_COUNT = 5;

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
              <div className={styles.chapter}>Introduction</div>
              <h2 className={styles.title}>
                {/* “Have you ever had a moment when you were truly angry?” */}
                Have you ever been so angry that, for a moment, nothing mattered
                but the fire inside you?
              </h2>
              {/* <p>“정말 화가 치밀어 올랐던 순간이 있었나요?”</p> */}
              {/* <p>순간이라도 오직 가슴속 불길만 중요하게 느껴질 만큼 화가 난 적이 있나요?</p> */}
              <p>
                The vast emptiness of space offers us perspective. It reminds us
                how small we are in the grand scheme of things. Yet somehow,
                that doesn't diminish us – it elevates our existence into
                something miraculous.
              </p>
            </div>
            <div className={styles.panelRight}>
              <div className={styles.imagePlaceholder}>
                <img src={FirstImage} alt="패널 이미지 설명" />
              </div>
            </div>
          </section>

          {/* 2~3번: 중앙 텍스트 */}
          <section
            className={`${styles.panel} ${styles.boostioPanel}`}
            data-index={1}
          >
            <div className={styles.boostioTopText}>
              HNU 34th Graduation Collection Fashion Show
            </div>

            <h2 className={styles.boostioMainTitle}>개화(開火)</h2>

            <div className={styles.boostioBottomRow}>
              <div className={styles.boostioBottomLeft}>2025.06.07</div>
              <div className={styles.boostioBottomRight}>SATURDAY</div>
            </div>

            <div className={styles.boostioFooterText}>Daejeon Artist House</div>
          </section>
          <section
            className={`${styles.panel} ${styles.panelCenter}`}
            data-index={2}
          >
            <div className={styles.contactContainer}>
              <div className={styles.contactContent}>
                {/* spaceText 와 contactName 두 개 클래스 */}
                <a
                  href="https://www.google.com/maps/dir//Daejeon,+Jung-gu,+Jungang-ro,+32/data=!4m8!4m7!1m0!1m5!1m1!1s0x3565492d0acd5835:0xc95e7ffeeeaaf0e4!2m2!1d127.416055!2d36.322299?entry=ttu&g_ep=EgoyMDI1MDUwMy4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.spaceText} ${styles.contactName}  ${styles.rotate90}`}
                >
                  LOCATION
                </a>
              </div>
            </div>
          </section>

          {/* 4번: 좌측 이미지 · 우측 텍스트 */}
          <section
            className={`${styles.panel} ${styles.panelSplit}`}
            data-index={0}
          >
            <div className={styles.panelLeft}>
              <div className={styles.chapter}>Introduction</div>
              <h2 className={styles.title}>
                {/* “Have you ever had a moment when you were truly angry?” */}
                Have you ever been so angry that, for a moment, nothing mattered
                but the fire inside you?
              </h2>
              {/* <p>“정말 화가 치밀어 올랐던 순간이 있었나요?”</p> */}
              {/* <p>순간이라도 오직 가슴속 불길만 중요하게 느껴질 만큼 화가 난 적이 있나요?</p> */}
              <p>
                The vast emptiness of space offers us perspective. It reminds us
                how small we are in the grand scheme of things. Yet somehow,
                that doesn't diminish us – it elevates our existence into
                something miraculous.
              </p>
            </div>
            <div className={styles.panelRight}>
              <div className={styles.imagePlaceholder}>
                <img src={FirstImage} alt="패널 이미지 설명" />
              </div>
            </div>
          </section>
          {/* 5번 패널: GET IN TOUCH */}
          <section
            className={`${styles.panel} ${styles.panelCenter}`}
            data-index={4}
          >
            <div className={styles.contactContainer}>
              <div className={styles.contactContent}>
                {/* spaceText 와 contactName 두 개 클래스 */}
                <div className={`${styles.spaceText} ${styles.contactName}`}>
                  GET IN TOUCH
                </div>
                <div className={styles.emailWrapper}>
                  <a href="mailto:hi@filip.fyi" className={styles.email}>
                    @hyunjunpark_
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
