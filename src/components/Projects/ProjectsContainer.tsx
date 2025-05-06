// src/components/Projects/ProjectsContainer.tsx
import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  MouseEvent,
} from 'react';
import styles from './ProjectsContainer.module.scss';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { Flip, ScrollTrigger, CustomEase } from 'gsap/all';

// GSAP 플러그인 등록 & 커스텀 이징 생성
gsap.registerPlugin(Flip, ScrollTrigger, CustomEase);
CustomEase.create('customEase', '0.6,0.01,0.05,1');

// ① 샘플 프로젝트 데이터
interface Project {
  id: number;
  title: string;
  year: string;
  image: string;
}
const projects: Project[] = [
  { id: 1, title: 'Silence',   year: '2021', image: 'https://cdn.cosmos.so/7d47d4e2-0eff-4e2f-9734-9d24a8ba067e?format=jpeg' },
  { id: 2, title: 'Resonance', year: '2022', image: 'https://cdn.cosmos.so/5eee2d2d-3d4d-4ae5-96d4-cdbae70a2387?format=jpeg' },
  { id: 3, title: 'Essence',   year: '2022', image: 'https://cdn.cosmos.so/def30e8a-34b2-48b1-86e1-07ec5c28f225?format=jpeg' },
  { id: 4, title: 'Void',      year: '2023', image: 'https://cdn.cosmos.so/44d7cb23-6759-49e4-9dc1-acf771b3a0d1?format=jpeg' },
  { id: 5, title: 'Presence',  year: '2023', image: 'https://cdn.cosmos.so/7712fe42-42ca-4fc5-9590-c89f2db99978?format=jpeg' },
  { id: 6, title: 'Flow',      year: '2024', image: 'https://cdn.cosmos.so/cbee1ec5-01b6-4ffe-9f34-7da7980454cf?format=jpeg' },
  { id: 7, title: 'Clarity',   year: '2024', image: 'https://cdn.cosmos.so/2e91a9d1-db85-4499-ad37-6222a6fea23b?format=jpeg' },
  { id: 8, title: 'Breath',    year: '2024', image: 'https://cdn.cosmos.so/ff2ac3d3-fa94-4811-89f6-0d008b27e439?format=jpeg' },
  { id: 9, title: 'Stillness', year: '2025', image: 'https://cdn.cosmos.so/c39a4043-f489-4406-8018-a103a3f89802?format=jpeg' },
  { id: 10, title: 'Surrender',year: '2025', image: 'https://cdn.cosmos.so/e5e399f2-4050-463b-a781-4f5a1615f28e?format=jpeg' },
];

const ProjectsContainer: React.FC = () => {
  // ② 뷰 타입: list | grid
  const [view, setView] = useState<'list' | 'grid'>('list');

  // ③ 팝업 상태
  const [popup, setPopup] = useState<{ visible: boolean; src: string }>({
    visible: false,
    src: '',
  });
  const popupTimeout = useRef<number | null>(null);

  // ④ 컨테이너 레퍼런스
  const containerRef = useRef<HTMLDivElement>(null);

  // ⑤ Lenis & GSAP 초기화 (한 번만)
  useEffect(() => {
    const lenis = new Lenis(); // 기본 옵션 사용
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    // 초기 프로젝트 애니메이션
    gsap.set(`.${styles.projectItem}`, { opacity: 0, y: 30 });
    gsap.to(`.${styles.projectItem}`, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
      stagger: { each: 0.08, from: 'start' },
    });
  }, []);

  // ⑥ 팝업 제어 함수
  const showPopup = useCallback((src: string) => {
    if (popupTimeout.current) clearTimeout(popupTimeout.current);
    setPopup({ visible: true, src });
  }, []);

  const hidePopup = useCallback(() => {
    if (popupTimeout.current) clearTimeout(popupTimeout.current);
    popupTimeout.current = window.setTimeout(
      () => setPopup({ visible: false, src: '' }),
      150
    );
  }, []);

  // ⑦ 호버 이벤트 연결 (list/grid 변경 시 재연결)
  const attachHover = useCallback(() => {
    const items = containerRef.current?.querySelectorAll<HTMLDivElement>(
      `.${styles.projectItem}`
    );
    items?.forEach((item) => {
      const imgSrc = item.dataset.image!;
      item.addEventListener('mouseenter', () => showPopup(imgSrc));
      item.addEventListener('mouseleave', hidePopup);
    });
  }, [showPopup, hidePopup]);

  useEffect(() => {
    attachHover();
  }, [attachHover, view]);

  return (
    <>
      {/* ⑧ 뷰 토글 버튼 */}
      <div className={styles.header}>
        <div className={styles.headerTitle}>
          <h1>
            SELECTED WORKS<sup>10</sup>
          </h1>
        </div>
        <div className={styles.viewToggle}>
          <button
            className={`${styles.toggleBtn} ${view === 'list' ? styles.active : ''}`}
            onClick={() => setView('list')}
          >
            List
          </button>
          <button
            className={`${styles.toggleBtn} ${view === 'grid' ? styles.active : ''}`}
            onClick={() => setView('grid')}
          >
            Grid
          </button>
        </div>
      </div>

      {/* ⑨ 프로젝트 목록 */}
      <div
        ref={containerRef}
        className={`
          ${styles.projectsContainer}
          ${view === 'list' ? styles.listView : styles.gridView}
        `}
      >
        {projects.map((project) => (
          <div
            key={project.id}
            className={styles.projectItem}
            data-image={project.image}
          >
            <div className={styles.projectImageContainer}>
              <img
                className={styles.projectImage}
                src={project.image}
                alt={project.title}
                loading="lazy"
              />
            </div>
            <div className={styles.projectTitle}>{project.title}</div>
            <div className={styles.projectYear}>{project.year}</div>
          </div>
        ))}
      </div>

      {/* ⑩ 호버 팝업 오버레이 */}
      {popup.visible && (
        <div
          id="popup-overlay"
          className={styles.popupOverlay}
          style={{ display: 'flex' }}
          onClick={hidePopup}
        >
          <div
            className={styles.popupContent}
            onClick={(e: MouseEvent) => e.stopPropagation()}
          >
            <img
              className={styles.popupImage}
              src={popup.src}
              alt="Preview"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectsContainer;
