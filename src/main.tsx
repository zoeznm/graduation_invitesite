// src/main.tsx
import React from 'react';
import { createRoot } from 'react-dom/client';

// 전역 스타일 (리셋, 변수 등)
import './styles/globals.scss';

// (필요하다면) Vite가 기본으로 생성한 index.css
// import './index.css';

import App from './App';              


const container = document.getElementById('root');
if (!container) throw new Error('root 엘리먼트를 찾을 수 없습니다.');

createRoot(container).render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
);
