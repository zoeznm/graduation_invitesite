// src/main.tsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './styles/globals.scss';
import App from './App';                            // .tsx 확장자는 빼고
import { LanguageProvider } from './contexts/LanguageProvider';

const container = document.getElementById('root');
if (!container) throw new Error('root 엘리먼트를 찾을 수 없습니다.');

createRoot(container).render(
  <React.StrictMode>
    <LanguageProvider>                            {/* 여기에 감싸기 */}
      <App />
    </LanguageProvider>
  </React.StrictMode>
);
