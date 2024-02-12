import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import Backend from 'i18next-http-backend'
import enTranslation from './locales/en/translation.json'
import ruTranslation from './locales/ru/translation.json'
import {getLocales} from 'react-native-localize'

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    lng: getLocales()[0].languageCode,
    fallbackLng: 'en',
    debug: false,
    // backend: {
    //   loadPath: '/locales/{{lng}}/{{ns}}.json',
    // },
    resources: {
      en: {
        translation: enTranslation,
      },
      ru: {
        translation: ruTranslation,
      },
    },
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n