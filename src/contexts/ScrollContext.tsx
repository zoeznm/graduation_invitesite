import { createContext } from 'react';

export interface ScrollContextType {
  /** 좌측 메뉴 클릭 → PanelsContainer 호출 */
  scrollToPanel: (idx: number) => void;
}

export const ScrollContext = createContext<ScrollContextType>({
  scrollToPanel: () => {},
});
