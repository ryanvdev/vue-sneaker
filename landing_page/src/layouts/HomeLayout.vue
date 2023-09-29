<script setup lang="ts">
import { RouterView } from 'vue-router';
import {VLayout, VMain} from 'vuetify/components';
import AppBar from '@/components/AppBar.vue';
import AppFooter from '@/components/AppFooter.vue';
import { className } from '@/utils/template_utils';

</script>

<template>
    <v-layout class="w-screen flex-column align-center">
        <app-bar :class="className(style['app-bar'], 'w-100')" />
        <v-main class="w-100">
            <router-view/>
        </v-main>
        <app-footer/>
    </v-layout>
</template>


<style module="style" lang="scss">
.page{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 25px;

    width: 100vw;
    height: auto;
}

.app-bar{
    position: sticky;
    z-index: 10;
    top: 0px;
}
</style>