import { createContext, useContext } from 'react';

export const LanguageContext = createContext({ language: 'en', setLanguage: () => {} });
export const useLanguage = () => useContext(LanguageContext);
