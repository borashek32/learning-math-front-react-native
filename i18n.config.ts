import 'intl-pluralrules'
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en/translation.json';
import ru from './locales/ru/translation.json';

// Define resources
const resources = {
  en: {
    translation: en,
  },
  ru: {
    translation: ru,
  },
};

// Initialize i18next
i18n
  .use(initReactI18next) // Use the react-i18next plugin
  .init({
    resources,
    fallbackLng: "en", // Default language if translation is not available
    interpolation: {
      escapeValue: false, // No need for escaping values in React
    },
    // Add any other configuration options here
  });

export default i18n;
