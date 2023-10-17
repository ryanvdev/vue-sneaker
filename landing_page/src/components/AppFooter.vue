<script setup lang="ts">
import _ from 'lodash';
import {
    VFooter,
    VContainer,
    VRow,
    VCol,
    VBtn,
    VSlideGroup,
    VSlideGroupItem,
    VTooltip,
    VDivider,
    VList,
    VListItem,
    VListItemTitle,
    VIcon,
} from 'vuetify/components';
import { useValue } from '@/utils/common_utils';

const quickLinks: { title: string; link: string }[] = useValue(() => {
    return ['In mollit', 'eu velit occaecat', 'est non', 'eiusmod in', 'sint aliqua'].map(
        (item) => ({
            title: _.startCase(item),
            link: '#' + _.kebabCase(item),
        }),
    );
});

const contactUs = [
    {
        key: 'address',
        href: '#',
        title: '264, Street, District, City, Country',
        icon: 'fa:fas fa-map-marker',
    },
    {
        key: 'phone',
        href: '#',
        title: '+84 22 234 6789',
        icon: 'fa:fab fa-facebook-f',
    },
    {
        key: 'email',
        href: '#',
        title: 'yourmail@gmail.com',
        icon: 'fa:fas fa-envelope',
    },
] as { title: string; href: string; icon: string; key: string }[];

const socialMediaIcons: {
    key: string;
    icon: string;
    tooltip: string;
    href: string;
}[] = [
    {
        key: 'facebook',
        icon: 'fa:fab fa-facebook-f',
        tooltip: 'Facebook',
        href: '#',
    },
    {
        key: 'twitter',
        icon: 'fa:fab fa-twitter',
        tooltip: 'Twitter',
        href: '#',
    },
    {
        key: 'youtube',
        icon: 'fa:fab fa-youtube',
        tooltip: 'Youtube',
        href: '#',
    },
    {
        key: 'telegram',
        icon: 'fa:fab fa-telegram-plane',
        tooltip: 'Telegram',
        href: '#',
    },
];
</script>

<template>
    <v-footer class="d-block w-100">
        <v-container>
            <v-row>
                <v-col cols="12" xxl="6" xl="5" lg="5" md="12">
                    <h4 class="text-h4">About Us</h4>
                    <p class="text-body1 py-2">
                        Officia ullamco Lorem tempor in ipsum cupidatat. Officia aute aute quis
                        cillum ad quis. Culpa labore consequat adipisicing nulla eu cupidatat qui in
                        enim amet. Non esse nostrud ex consequat ex consectetur veniam quis cillum
                        ullamco ex aliqua elit velit. Sit aute dolore pariatur ipsum officia
                        voluptate elit. Id aute cupidatat eiusmod dolore magna eu anim irure non
                        reprehenderit sint irure.
                    </p>
                    <v-slide-group show-arrows class="my-2">
                        <v-slide-group-item
                            v-for="{ key, icon, tooltip, href } of socialMediaIcons"
                            :key="key"
                        >
                            <v-tooltip :text="tooltip" location="top center">
                                <template v-slot:activator="{ props }">
                                    <v-btn
                                        v-bind="props"
                                        :icon="icon"
                                        :href="href"
                                        rounded="lg"
                                        variant="tonal"
                                        class="mx-2"
                                    />
                                </template>
                            </v-tooltip>
                        </v-slide-group-item>
                    </v-slide-group>
                </v-col>
                <v-col cols="12" xxl="3" xl="3" lg="3" md="6">
                    <h4 class="text-h4">Quick Links</h4>
                    <v-list>
                        <v-list-item
                            v-for="({ link, title }, index) of quickLinks"
                            :key="`${index}${link}`"
                            :href="link"
                            rounded="lg"
                        >
                            {{ title }}
                        </v-list-item>
                    </v-list>
                </v-col>
                <v-col cols="12" xxl="3" xl="4" lg="4" md="6">
                    <h4 class="text-h4">Contact Us</h4>
                    <v-list>
                        <v-list-item
                            v-for="{ key, href, icon, title } of contactUs"
                            :key="key"
                            :href="href"
                            rounded="lg"
                        >
                            <template v-slot:prepend>
                                <v-icon :icon="icon" />
                            </template>
                            <v-list-item-title v-text="title" />
                        </v-list-item>
                    </v-list>
                </v-col>
            </v-row>
        </v-container>
        <div class="d-block w-100">
            <v-divider />
            <p class="text-center text-body-1 py-2">
                Copyright &copy; 2023 Nguyen Quoc Tuan - Ryan Nguyen -
                <a href="https://github.com/ryanvdev">github.com/ryanvdev</a>
            </p>
        </div>
    </v-footer>
</template>
