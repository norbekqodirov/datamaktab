import React, { createContext, useContext, useState, useEffect } from 'react';
import { uz } from '../i18n/uz';
import { ru } from '../i18n/ru';
import { en } from '../i18n/en';
import type { Translations } from '../i18n/uz';

export type Lang = 'uz' | 'ru' | 'en';

const translations: Record<Lang, Translations> = { uz, ru, en };

interface LanguageContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'uz',
  setLang: () => {},
  t: uz,
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLangState] = useState<Lang>(() => {
    const saved = localStorage.getItem('data_lang') as Lang;
    return (saved && ['uz', 'ru', 'en'].includes(saved)) ? saved : 'uz';
  });

  const setLang = (l: Lang) => {
    localStorage.setItem('data_lang', l);
    setLangState(l);
  };

  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
