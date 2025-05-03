// src/contexts/langContext.ts
import { createContext } from 'react';
import { Lang } from './lang/translations';

export interface LanguageContextType {
  lang: Lang;
  toggleLang: () => void;
}

export const LanguageContext = createContext<LanguageContextType>({
  lang: 'en',
  toggleLang: () => {},
});
