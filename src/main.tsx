// src/main.tsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles/globals.scss';          // 전역 CSS 변수, 리셋 등
// import './index.css';                 // 필요 없으면 주석

import App from './App';


const container = document.getElementById('root');
if (!container) throw new Error('root 엘리먼트를 찾을 수 없습니다.');

createRoot(container).render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
);
