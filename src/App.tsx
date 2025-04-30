// src/App.tsx
import { useState } from 'react';
import Loader from '@/components/Loader/Loader';
import EnterGate from '@/components/EnterGate/EnterGate'; // 앞서 만든 컴포넌트
import MainPage from '@/pages/Main/Main';                 // 앞서 만든 컴포넌트

type Stage = 'loading' | 'enter' | 'main';

export default function App() {
  const [stage, setStage] = useState<Stage>('loading');

  return (
    <>
      {stage === 'loading' && <Loader onFinish={() => setStage('enter')} />}
      {stage === 'enter'   && <EnterGate onEnter={() => setStage('main')} />}
      {stage === 'main'    && <MainPage />}
    </>
  );
}
