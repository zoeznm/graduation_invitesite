// src/components/Projects/ProjectsContainer.tsx
import React, { useState, useEffect, useRef } from 'react';
import styles from './ProjectsContainer.module.scss';
import { gsap } from 'gsap';
import { Flip, ScrollTrigger, CustomEase } from 'gsap/all';
import Lenis from '@studio-freight/lenis';

interface Project { id: number; title: string; year: string; image: string; }
const projects: Project[] = [ /* ...전송해주신 데이터 배열... */ ];

gsap.registerPlugin(Flip, ScrollTrigger, CustomEase);
CustomEase.create('customEase', '0.6, 0.01, 0.05, 1');

const ProjectsContainer: React.FC = () => {
  const [view, setView] = useState<'list'|'grid'>('list');
  const containerRef = useRef<HTMLDivElement>(null);
  const popupTimeout = useRef<number | null>(null);
  const [popup, setPopup] = useState<{visible:boolean;src:string}>({ visible:false, src:'' });

  // Lenis smooth scrolling 초기화
  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: number) { lenis.raf(time); ScrollTrigger.update(); }
    gsap.ticker.add(raf);
    return () => { gsap.ticker.remove(raf); };
  }, []);

  // 뷰 전환 시 FLIP 애니메이션 적용
  useEffect(() => {
    const items = containerRef.current?.querySelectorAll<HTMLDivElement>('.project-item');
    if (!items) return;
    const state = Flip.getState(items);
    const container = containerRef.current!;
    container.classList.toggle('list-view', view === 'list');
    container.classList.toggle('grid-view', view === 'grid');
    Flip.from(state, {
      duration: 1,
      ease: 'power2.out',
      absolute: true,
      nested: true,
      onComplete: () => attachHover()
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view]);

  // 초기 렌더 애니메이션 및 hover 이벤트 설정
  useEffect(() => {
    attachHover();
    const items = containerRef.current?.querySelectorAll<HTMLDivElement>('.project-item');
    if (items) {
      gsap.from(items, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power2.out'
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Hover 이벤트 부착
  function attachHover() {
    const items = containerRef.current?.querySelectorAll<HTMLDivElement>('.project-item');
    items?.forEach(item => {
      item.addEventListener('mouseenter', () => showPopup(item.dataset.image!));
      item.addEventListener('mouseleave', () => hidePopup());
    });
  }

  // Popup 표시
  function showPopup(src: string) {
    if (popupTimeout.current) clearTimeout(popupTimeout.current);
    setPopup({ visible: true, src });
  }

  // Popup 숨김
  function hidePopup() {
    if (popupTimeout.current) clearTimeout(popupTimeout.current);
    popupTimeout.current = window.setTimeout(() => setPopup({ visible: false, src: '' }), 150);
  }

  return (
    <div className={styles.wrapper} ref={containerRef}>
      <div className={styles.headerControls}>
        <h1>SELECTED WORKS<sup>10</sup></h1>
        <div className={styles.viewToggle}>
          <button onClick={() => setView('list')} className={view === 'list' ? styles.active : ''}>List</button>
          <button onClick={() => setView('grid')} className={view === 'grid' ? styles.active : ''}>Grid</button>
        </div>
      </div>

      <div className={`${styles.projectsContainer} ${view === 'list' ? styles.listView : styles.gridView}`}> 
        {projects.map(p => (
          <div key={p.id} className={styles.projectItem} data-image={p.image} data-id={p.id}>
            <div className={styles.projectImageContainer}>
              <img src={p.image} alt={p.title} className={styles.projectImage} />
            </div>
            <div className={styles.projectTitle}>{p.title}</div>
            <div className={styles.projectYear}>{p.year}</div>
          </div>
        ))}
      </div>

      {popup.visible && (
        <div id="popup-overlay" className={styles.overlay} onClick={() => hidePopup()}>
          <div className={styles.popupContent} onClick={e => e.stopPropagation()}>
            <img src={popup.src} alt="Preview" className={styles.popupImage} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsContainer;
