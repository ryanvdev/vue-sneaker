<script setup lang="ts">
import type { ThemeKey } from '@/themes';

import { defineProps } from 'vue';
import { useRootStore } from '@/stores/root_store';
import { themesList } from '@/themes';
import { className } from '@/utils/template_utils';

interface Props {
    class?: string;
    id?: string;
}

const rootStore = useRootStore();
const props = defineProps<Props>();

const id = (props.id || 'theme-btn-') + 'change-theme';
</script>

<template>
    <v-tooltip text="Theme" location="bottom center">
        <template v-slot:activator="{ props: tooltipProps }">
            <v-btn
                :id="id"
                v-bind="tooltipProps"
                density="comfortable"
                icon="mdi-tshirt-crew"
                variant="text"
                width="80px"
                height="60px"
                rounded="lg"
                :class="className(props.class)"
            >
                <template v-slot:default>
                    <v-icon size="40px" color="secondary"></v-icon>
                </template>
            </v-btn>
        </template>
    </v-tooltip>

    <v-menu :activator="'#' + id" location="bottom right">
        <v-list
            active-color="secondary"
            @click:select="rootStore.localData.theme = $event.id as ThemeKey"
        >
            <v-list-item
                v-for="{ key, icon, label } of themesList"
                :key="key"
                :value="key"
                :active="key === rootStore.localData.theme"
            >
                <template v-slot:prepend>
                    <v-icon :icon="icon" />
                </template>
                <v-list-item-title class="pr-15">
                    {{ label }}
                </v-list-item-title>
            </v-list-item>
        </v-list>
    </v-menu>
</template>
