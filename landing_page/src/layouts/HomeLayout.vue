<script setup lang="ts">
import { RouterView } from 'vue-router';
import { VLayout, VMain } from 'vuetify/components';
import AppBar from '@/components/AppBar.vue';
import AppFooter from '@/components/AppFooter.vue';
</script>

<template>
    <v-layout :class="`${styles['layout']} w-screen d-block`" style="overflow: auto">
        <app-bar :class="styles['app-bar']" />
        <v-main class="w-100" style="min-height: 50vh">
            <router-view />
        </v-main>
        <app-footer />
    </v-layout>
</template>

<style module="styles" lang="scss">
.layout {
    display: block;
    overflow: auto;

    width: 100vw;
    height: 100vh;
}
.app-bar {
    position: sticky;
    z-index: 10;
    top: 0px;
}
</style>
