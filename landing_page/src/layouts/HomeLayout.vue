<script setup lang="ts">
import { RouterView } from 'vue-router';
import { VLayout, VMain } from 'vuetify/components';
import AppBar from '@/components/AppBar.vue';
import AppFooter from '@/components/AppFooter.vue';
</script>

<template>
    <v-layout class="w-screen d-block">
        <app-bar />
        <v-main class="w-100" style="min-height: 50vh">
            <router-view />
        </v-main>
        <app-footer />
    </v-layout>
</template>
