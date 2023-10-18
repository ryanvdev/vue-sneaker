<script setup lang="ts">
import { defineProps, ref } from 'vue';

import { className } from '@/utils/template_utils';
import { useAppBarStore } from '@/stores/app_bar_store';
import { useRootStore } from '@/stores/root_store';

import HeadLogo from './HeadLogo.vue';
import SearchField from './SearchField.vue';
import CartButton from '@/components/CartButton.vue';
import ThemeButton from './ThemeButton.vue';
import { useDisplay } from 'vuetify';

interface Props {
    class?: string;
}

const rootStore = useRootStore();
const appBarStore = useAppBarStore();
const props = defineProps<Props>();
const { name: deviceSize } = useDisplay();

const searchIsFocusing = ref<boolean>(false);
</script>

<template>
    <header
        :class="className('w-100', 'bg-surface', props.class)"
        style="border-bottom: thin solid rgba(var(--v-border-color), var(--v-border-opacity))"
    >
        <v-container no-gutters>
            <v-row no-gutters>
                <v-col cols="12" md="9" lg="9" xl="8">
                    <v-row no-gutters>
                        <v-col v-show="!searchIsFocusing || !rootStore.isMobile" cols="3" sm="2" md="2" lg="4" xl="5">
                            <head-logo :display-web-name="!rootStore.isMobile && deviceSize !== 'md'" />
                        </v-col>
                        <v-col>
                            <search-field
                                id="search"
                                name="search"
                                class="w-100"
                                v-model:is-focused="searchIsFocusing"
                            />
                        </v-col>
                    </v-row>
                </v-col>
                <v-col v-if="!rootStore.isMobile" class="d-flex justify-end" style="gap: 10px">
                    <cart-button />
                    <theme-button />
                </v-col>
            </v-row>
            <v-row v-if="!rootStore.isMobile" no-gutters>
                <v-col cols="12">
                    <v-slide-group show-arrows class="mt-3">
                        <v-slide-group-item v-for="item of appBarStore.brands">
                            <v-btn elevation="0" color="light" rounded="md" class="ma-2">{{ item }}</v-btn>
                        </v-slide-group-item>
                    </v-slide-group>
                </v-col>
            </v-row>
        </v-container>
    </header>
</template>
