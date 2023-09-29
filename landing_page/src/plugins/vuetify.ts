import { createVuetify } from 'vuetify';
import {fa} from 'vuetify/iconsets/fa';
import {mdi} from 'vuetify/iconsets/mdi';
import lightTheme from '@/themes/lightTheme';

import 'vuetify/styles';
import '@fortawesome/fontawesome-free/css/all.css';
// import '@mdi/font/css/materialdesignicons.css';

export const vuetify = createVuetify({
  ssr: true,
  icons: {
    defaultSet: 'mdi',
    sets: {
      fa,
      mdi,
    },
  },
  theme: {
    defaultTheme: 'lightTheme',
    themes: {
      lightTheme
    }
  }
});