import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as lanResources from './resources';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    compatibilityJSON: 'v3',
    resources: {
      ...Object.entries(lanResources).reduce(
        (acc, [key, value]) => ({
          ...acc,
          [key]: {
            translation: value
          }
        }),
        {}
      )
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
