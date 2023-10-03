import { createVuetify } from 'vuetify';
import {
    VCol, VRow, VContainer, VBtn, VSlideGroup, VSlideGroupItem,
    VTooltip, VBadge, VIcon, VMenu, VList, VListItem, VListItemTitle,
    VSheet, VCarousel, VCarouselItem, VDivider
} from 'vuetify/components';

import { VSkeletonLoader } from 'vuetify/labs/VSkeletonLoader';

import { fa } from 'vuetify/iconsets/fa';
import { mdi } from 'vuetify/iconsets/mdi';

import 'vuetify/styles';
import '@fortawesome/fontawesome-free/css/all.css';
import { themes } from '@/themes';

export const vuetify = createVuetify({
    ssr: true,
    components: {
        VCol,
        VRow,
        VContainer,
        VBtn,
        VSlideGroup,
        VSlideGroupItem,
        VTooltip,
        VBadge,
        VIcon,
        VMenu,
        VList,
        VListItem,
        VListItemTitle,
        VSheet,
        VCarousel,
        VCarouselItem,
        VDivider,
        VSkeletonLoader,
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
    }
});