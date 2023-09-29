<script setup lang="ts">
import { RouterView } from 'vue-router';
import { VProgressLinear } from 'vuetify/components';
import { useRootStore } from './stores/root_store';
import { computed } from 'vue';
import { useDisplay } from 'vuetify';
import { className } from './utils/template_utils';

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
})
</script>

<template>
    <!-- Top progress -->
    <v-progress-linear 
        :class="style['process']" 
        color="red" 
        :indeterminate="rootStore.isLoading"
    />

    <div :class="className(mobileDesktopClassName, `device-${deviceSize}`, style['app'])">
        <RouterView />
    </div>
</template>

<style module="style" lang="scss">
.app{
    display: block;
    width: 100%;
    height: auto;
}
.process {
    position: fixed;
    z-index: 100;

    top: 0px;
    left: 0px;
}
</style>