<script setup lang="ts">
import { watchEffect } from 'vue';
import { VContainer, VCol, VRow } from 'vuetify/components';

import { useHomeStore } from '@/stores/home_store';

import SneakerCard from '@/components/SneakerCard';


const homeStore = useHomeStore();

watchEffect(async () => {
    console.log('fetch home suggestions');
    await homeStore.fetchSuggestions();
})

</script>

<template>
    <v-container>
        <v-row>
            <v-col v-for="item of homeStore.suggestions" :key="item.id" md="4" lg="3" xl="2" xxl="2"
                class="d-flex justify-center ">
                <sneaker-card v-bind="item" />
            </v-col>
        </v-row>
    </v-container>
</template>