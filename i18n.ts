import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import esTranslation from './language/es.json';
import enTranslation from './language/en.json';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n.use(LanguageDetector).use(initReactI18next).init({
    detection: { order: ['navigator'] },
    lng: 'es',
    resources: {
        en: { translation: enTranslation },
        es: { translation: esTranslation }
    },
    fallbackLng: 'es',
    debug: false,
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;