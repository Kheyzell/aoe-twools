import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import detector from "i18next-browser-languagedetector"

import translationEn from './en/translation.json'
import translationFr from './fr/translation.json'

export const resources = {
  en: {
    translation: { ...translationEn }
  },
  fr: {
    translation: { ...translationFr }
  }
} as const

const lang = window.localStorage.getItem('lang') || undefined

i18n
  .use(initReactI18next)
  .use(detector)
  .init({
    lng: lang,
    resources
  })