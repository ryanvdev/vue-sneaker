<script setup lang="ts">
import SneakerCard from '@/components/SneakerCard/SneakerCard.vue';
import { Sneaker } from '@/types/sneaker';

interface Props {
    title?: string;
    sneakers: Sneaker[];
}

const props = defineProps<Props>();
</script>

<template>
    <h3 class="py-10 text-h3">{{ props.title || 'Sneakers' }}</h3>
    <v-row>
        <v-col
            v-for="sneaker of props.sneakers"
            :key="sneaker.id"
            cols="12"
            sm="6"
            md="4"
            lg="3"
            xl="2"
            xxl="2"
            class="d-flex justify-center"
        >
            <sneaker-card v-bind="sneaker" />
        </v-col>
    </v-row>
</template>
