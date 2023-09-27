import { createVuetify } from 'vuetify';
import lightTheme from '@/themes/lightTheme';

import 'vuetify/styles';
// import '@mdi/font/css/materialdesignicons.css';

export const vuetify = createVuetify({
  ssr: true,
  theme: {
    defaultTheme: 'lightTheme',
    themes: {
      lightTheme
    }
  }
});