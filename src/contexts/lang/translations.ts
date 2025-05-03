// src/translations.ts
export type Lang = 'en' | 'ko';

interface Translations {
  nav: [string, string, string, string];
  quote: string;
  scrollDown: string;
}

export const translations: Record<Lang, Translations> = {
  en: {
    nav: ['PÁKYEON', 'GRADUATION', '[KOREAN]', 'CONTACT'],
    quote: '“Have you ever had a moment when you were truly angry?”',
    scrollDown: 'SCROLL FOR MORE',
  },
  ko: {
    nav: ['PÁKYEON', '졸업전시', '[English]', '연락처'],
    quote: '“당신이 진심으로 화가 났던 순간이 있나요?”',
    scrollDown: '아래로 스크롤',
  },
};
