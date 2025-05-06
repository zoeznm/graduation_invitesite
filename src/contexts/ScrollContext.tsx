// src/contexts/ScrollContext.tsx
import { createContext } from 'react';

export interface ScrollContextType {
  /** LeftMenu 에서 호출할, 패널 인덱스 이동 함수 */
  scrollToPanel: (index: number) => void;
}

export const ScrollContext = createContext<ScrollContextType>({
  scrollToPanel: () => {},
});
