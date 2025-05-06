import React, { useRef, useMemo, useState } from 'react';
import LeftMenu from './components/Layout/LeftMenu/LeftMenu';
import PanelsContainer from './components/Layout/Panels/PanelsContainer';
import BottomNav from './components/Layout/BottomNav/BottomNav';
import { ScrollContext } from './contexts/ScrollContext';

const App: React.FC = () => {
  // PanelsContainer가 registerScroll으로 주는 함수 보관
  const scrollFnRef = useRef<(idx: number) => void>(() => {});
  const [currentPanel, setCurrentPanel] = useState(0);
  const [progress, setProgress] = useState(0);

  const contextValue = useMemo(
    () => ({ scrollToPanel: (idx: number) => scrollFnRef.current(idx) }),
    []
  );

  return (
    <ScrollContext.Provider value={contextValue}>
      <LeftMenu />

      <PanelsContainer
        registerScroll={fn => { scrollFnRef.current = fn }}
        onPanelChange={idx => setCurrentPanel(idx)}
        onProgressChange={pct => setProgress(pct)}
      />

      <BottomNav
        currentPanel={currentPanel}
        progress={progress}
      />
    </ScrollContext.Provider>
  );
};

export default App;
