import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './en.json';
import ta from './ta.json';
import si from './si.json';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ta: { translation: ta },
    si: { translation: si },
  },
  lng: 'en', // Default language
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false, // React already safe from xss
  },
});

export default i18n;
