import React, { useRef, useMemo, useState } from 'react';
import LeftMenu from './components/Layout/LeftMenu/LeftMenu';
import PanelsContainer from './components/Layout/Panels/PanelsContainer';
import BottomNav from './components/Layout/BottomNav/BottomNav';
import { ScrollContext } from './contexts/ScrollContext';

const App: React.FC = () => {
  // 1) PanelsContainer로 “스크롤 실행” 함수를 등록받을 ref
  const scrollFnRef = useRef<(idx: number) => void>(() => {});

  // 2) 현재 활성 패널(0~8)을 state로 관리
  const [currentPanel, setCurrentPanel] = useState(0);

  // Context에 넘길 scrollToPanel
  const contextValue = useMemo(
    () => ({
      scrollToPanel: (idx: number) => scrollFnRef.current(idx),
    }),
    []
  );

  return (
    <ScrollContext.Provider value={contextValue}>
      <LeftMenu />

      {/* 
        • 메뉴 → PanelsContainer 스크롤 함수 등록(registerScroll)  
        • PanelsContainer → App 에 패널 변경(onPanelChange) 알림 
      */}
      <PanelsContainer
        registerScroll={(fn) => {
          scrollFnRef.current = fn;
        }}
        onPanelChange={(idx) => {
          setCurrentPanel(idx);
        }}
      />

      {/* 현재 활성 패널 인덱스를 보여주는 BottomNav */}
      <BottomNav currentPanel={currentPanel} />
    </ScrollContext.Provider>
  );
};

export default App;
