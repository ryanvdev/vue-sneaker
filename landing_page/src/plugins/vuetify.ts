import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';

import * as lab from 'vuetify/labs/VSkeletonLoader';

import { fa } from 'vuetify/iconsets/fa';
import { mdi } from 'vuetify/iconsets/mdi';

import 'vuetify/styles';
import '@fortawesome/fontawesome-free/css/all.css';
import { themes } from '@/themes';

export const vuetify = createVuetify({
    ssr: true,
    components: {
        ...components,
        ...lab,
    },
    icons: {
        defaultSet: 'mdi',
        sets: {
            fa,
            mdi,
        },
    },
    theme: {
        defaultTheme: 'dark',
        themes: themes,
    },
});
