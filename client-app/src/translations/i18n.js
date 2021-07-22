import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import { TRANSLATIONS_ES } from "./es/translations";
import { TRANSLATIONS_EN } from "./en/translations";
import { TRANSLATIONS_FR } from "./fr/translations";
import { TRANSLATIONS_PT } from "./pt/translations";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      es: {
        translation: TRANSLATIONS_ES,
      },
      en: {
        translation: TRANSLATIONS_EN,
      },
      fr: {
        translation: TRANSLATIONS_FR,
      },
      pt: {
        translation: TRANSLATIONS_PT,
      },
    },
  });

i18n.changeLanguage("en");

export {i18n} 
