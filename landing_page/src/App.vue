<script setup lang="ts">
import { RouterView } from 'vue-router';
import { VProgressLinear, VApp } from 'vuetify/components';
import { computed } from 'vue';
import { useDisplay } from 'vuetify';
import { useRootStore } from './stores/root_store';
import { className } from './utils/template_utils';
import { systemThemeKey } from '@/themes';

const rootStore = useRootStore();
const { name: deviceSize } = useDisplay();

const mobileDesktopClassName = computed<string>(() => {
    switch (deviceSize.value) {
        case 'xs':
        case 'sm':
        case 'md': {
            return 'is-mobile'
        }
        default: return 'is-desktop'
    }
});

const theme = computed<string>(() => {
    if(rootStore.localData.theme==='system'){
        return systemThemeKey
    }
    return rootStore.localData.theme;
});

</script>

<template>
    <!-- Top progress -->
    <v-progress-linear 
        :class="style['process']" 
        color="red" 
        :indeterminate="rootStore.isLoading"
    />

    <v-app 
        :class="className(mobileDesktopClassName, `device-${deviceSize}`, 'w-screen')"
        :theme="theme"
    >
        <RouterView />
    </v-app>
</template>

<style module="style" lang="scss">
.process {
    position: fixed;
    z-index: 100;

    top: 0px;
    left: 0px;
}
</style>