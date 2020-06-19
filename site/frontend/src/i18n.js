import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

//BELOW CODE COPIED FROM GUIDE AT "https://github.com/i18next/i18next-browser-languageDetector"
const detectorOptions = {
  // order and from where user language should be detected
  order: ["querystring", "cookie", "localStorage", "sessionStorage", "navigator", "htmlTag", "path", "subdomain"],

  // keys or params to lookup language from
  lookupQuerystring: "lng",
  lookupCookie: "i18next",
  lookupLocalStorage: "i18nextLng",
  lookupFromPathIndex: 0,
  lookupFromSubdomainIndex: 0,

  // cache user language on
  caches: ["localStorage", "cookie"],
  excludeCacheFor: ["cimode"], // languages to not persist (cookie, localStorage)

  // optional expire and domain for set cookie
  cookieMinutes: 10,
  cookieDomain: "myDomain",

  // optional htmlTag with lang attribute, the default is:
  htmlTag: document.documentElement,

  // only detect languages that are in the whitelist
  checkWhitelist: true,

  // fallback to a similar whitelist language
  // Example 1: Browser language is 'es'
  // if 'es' is not found in whitelist, first fallback to any whitelist language that starts with 'es-', then fallback to fallbackLng ('es' -> 'es-*' -> fallbackLng)
  // Example 2: Browser language is 'es-MX'
  // if 'es-MX' is not found in whitelist, first fallback to 'es', then fallback to 'es-*', then fallback to fallbackLng ('es-MX' -> 'es' -> 'es-*' -> fallbackLng)
  checkForSimilarInWhitelist: false,

  // optional set cookie options, reference:[MDN Set-Cookie docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie)
  cookieOptions: { path: "/" }
};

//PERSONAL SETUP
const Languages = ["en", "da"];
const NameSpaces = ["general", "home", "server_v0", "server_v1"];

i18n
  // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
  // learn more: https://github.com/i18next/i18next-http-backend
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    defaultNS: "general",
    ns: NameSpaces,
    fallbackLng: "en",
    debug: true,
    whitelist: Languages,
    detection: detectorOptions,
    interpolation: {
      escapeValue: false // not needed for react as it escapes by default
    }
  });

export default i18n;
