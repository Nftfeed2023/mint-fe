import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import resourcesToBackend from 'i18next-resources-to-backend'
import { LANGUAGES } from '~/common/constants/Languages'
import resources from '~/translations/resources'

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)

i18n
  .use(
    resourcesToBackend((language, namespace, callback) => {
      const defaultLanguage = language || LANGUAGES.EN
      // Load resources from component

      const lang =
        resources[`${namespace}.${defaultLanguage}.lang.json`] ??
        resources[`${namespace}`] ??
        resources[`translations/${defaultLanguage}/${namespace}.lang.json`]

      if (!lang) {
        callback(null, {})
        return
      }

      lang.then(({ default: resources }) => {
        callback(null, resources[defaultLanguage] ?? resources ?? {})
      })
    }),
  )

  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    lng: LANGUAGES.EN,
    fallbackLng: LANGUAGES.EN,
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    keySeparator: false,
    react: { useSuspense: false },
  })

export default i18n
