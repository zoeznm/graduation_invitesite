// src/contexts/LanguageProvider.tsx
import React, { useState, ReactNode } from 'react';
import { LanguageContext } from './LanguageContext';
import { Lang } from './lang/translations';

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [lang, setLang] = useState<Lang>('en');
  const toggleLang = () => setLang(prev => (prev === 'en' ? 'ko' : 'en'));

  return (
    <LanguageContext.Provider value={{ lang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
};
