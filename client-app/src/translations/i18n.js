import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import {
	format as formatDate,
	formatRelative,
	formatDistance,
	isDate
} from "date-fns";
import { enCA, pt,es, fr } from "date-fns/locale";


import { TRANSLATIONS_ES } from "./es/translations";
import { TRANSLATIONS_EN } from "./en/translations";
import { TRANSLATIONS_FR } from "./fr/translations";
import { TRANSLATIONS_PT } from "./pt/translations";

// eslint-disable-next-line no-undef
const locales = { enCA, pt, es, fr };

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
    }, interpolation:{
      // react already saves from xss
			escapeValue: false,

			format: (value, format, lng) => {
				if (isDate(value)) {
					const locale = locales[lng];

					if (format === "short")
						return formatDate(value, "P", { locale });
          			if (format === "complete")
						return formatDate(value, "PP", { locale });
          			if (format === "big")
						return formatDate(value, "PPP", { locale });
					if (format === "long")
						return formatDate(value, "PPPP", { locale });
					if (format === "relative")
						return formatRelative(value, new Date(), { locale });
					if (format === "ago")
						return formatDistance(value, new Date(), {
							locale,
							addSuffix: true
						});

					return formatDate(value, format, { locale });
				}

				return value;
			}
    }
    
  });



i18n.changeLanguage("en");

export {i18n} 
