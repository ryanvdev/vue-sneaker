<script setup lang="ts">
import SneakerCard from '@/components/SneakerCard/SneakerCard.vue';
import { Sneaker } from '@/types/sneaker';

interface Props {
    brand: string;
    sneakers: Sneaker[];
}

const { brand, sneakers } = defineProps<Props>();
</script>

<template>
    <v-sheet elevation="0" rounded="lg" color="surface" class="py-5">
        <h3 class="pa-6 text-h3">{{ brand }}</h3>

        <v-slide-group>
            <v-slide-group-item v-for="sneaker of sneakers" :key="sneaker.id">
                <div class="d-block mx-3" style="width: 300px">
                    <sneaker-card v-bind="sneaker" />
                </div>
            </v-slide-group-item>
        </v-slide-group>
    </v-sheet>
</template>
