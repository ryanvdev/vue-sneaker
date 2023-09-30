<script setup lang="ts">
import { RouterView } from 'vue-router';
import {VLayout, VMain} from 'vuetify/components';
import AppBar from '@/components/AppBar.vue';
import AppFooter from '@/components/AppFooter.vue';

</script>

<template>
    <v-layout class="w-screen d-block">
        <app-bar :class="style['app-bar']" />
        <v-main class="w-100">
            <router-view/>
        </v-main>
        <app-footer/>
    </v-layout>
</template>


<style module="style" lang="scss">

.app-bar{
    position: sticky;
    z-index: 10;
    top: 0px;
}
</style>