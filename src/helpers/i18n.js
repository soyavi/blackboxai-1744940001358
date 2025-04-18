import AsyncStorage from '@react-native-async-storage/async-storage';

import i18n from 'i18next'; // import the i18next library
import {initReactI18next} from 'react-i18next'; // import the React bindings for i18next
import localesResource from '../locales'; // import the locales resources

AsyncStorage.getItem('selectedLanguage').then(language => {
  i18n.use(initReactI18next).init({
    fallbackLng: 'en',
    compatibilityJSON: 'v3',
    initImmediate: false,
    lng: language || 'en',
    resources: localesResource,
    react: {
      useSuspense: false,
    },
    interpolation: {
      escapeValue: false,
    },
  });
});

export default i18n; // export the i18n instance as the default export
