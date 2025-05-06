// src/App.tsx
import React, { useRef, useMemo } from 'react';
import LeftMenu from './components/Layout/LeftMenu/LeftMenu';
import PanelsContainer from './components/Layout/Panels/PanelsContainer';
import BottomNav from './components/Layout/BottomNav/BottomNav';
import { ScrollContext } from './contexts/ScrollContext';

const App: React.FC = () => {
  // PanelsContainer 가 등록(register)해 주는 스크롤 함수 보관용 ref
  const scrollFnRef = useRef<(idx: number) => void>(() => {});

  // Context 에 제공할 scrollToPanel 함수
  const contextValue = useMemo(
    () => ({
      scrollToPanel: (idx: number) => {
        scrollFnRef.current(idx);
      },
    }),
    []
  );

  return (
    <ScrollContext.Provider value={contextValue}>
      <LeftMenu />

      {/* registerScroll prop 으로 스크롤 함수 등록 받음 */}
      <PanelsContainer
        registerScroll={(fn) => {
          scrollFnRef.current = fn;
        }}
      />

      <BottomNav />
    </ScrollContext.Provider>
  );
};

export default App;
