import en from './en.json'
import it from './it.json'
import fr from './fr.json'
import es from './es.json'
import pt from './pt.json'

var translations = { en: en, it: it, fr: fr, es: es, pt: pt };

export function translate(key, lang) {
  var dict = translations[lang] || translations.en;
  return dict[key] || translations.en[key] || key;
}

export var SUPPORTED_LANGUAGES = [
  { code: "en", label: "English", flag: "\u{1F1EC}\u{1F1E7}" },
  { code: "it", label: "Italiano", flag: "\u{1F1EE}\u{1F1F9}" },
  { code: "fr", label: "Fran\u00e7ais", flag: "\u{1F1EB}\u{1F1F7}" },
  { code: "es", label: "Espa\u00f1ol", flag: "\u{1F1EA}\u{1F1F8}" },
  { code: "pt", label: "Portugu\u00eas", flag: "\u{1F1E7}\u{1F1F7}" },
];

export var SUPPORTED_CODES = ["en", "it", "fr", "es", "pt"];
