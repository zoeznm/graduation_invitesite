import React from 'react';
import LeftMenu from './components/Layout/LeftMenu/LeftMenu';
import PanelsContainer from './components/Layout/Panels/PanelsContainer';
import BottomNav from './components/Layout/BottomNav/BottomNav';

const App: React.FC = () => (
  <>
    <LeftMenu />
    <PanelsContainer />
    <BottomNav />
  </>
);

export default App;
