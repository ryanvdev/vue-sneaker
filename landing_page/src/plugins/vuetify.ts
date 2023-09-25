import 'vuetify/styles'
// import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import lightTheme from '@/themes/lightTheme';
// import * as components from 'vuetify/components'
// import * as directives from 'vuetify/directives'

export const vuetify = createVuetify({
  ssr: true,
  theme: {
    defaultTheme: 'lightTheme',
    themes: {
      lightTheme
    }
  }
});