<script setup lang="ts">
import { watchEffect, onMounted } from 'vue';
import { useRoute } from 'vue-router';

import { useHomeStore } from '@/stores/home_store';

import SneakerCard from '@/components/SneakerCard/SneakerCard.vue';
import BigSneaker from '@/components/BigSneaker.vue';
import { WEB_NAME } from '@/utils/constants';

const route = useRoute();
const homeStore = useHomeStore();

watchEffect(async () => {
    await homeStore.fetchSuggestions();
});

onMounted(() => {
    document.title = route.name?.toString() || WEB_NAME;
});
</script>

<template>
    <v-container>
        <v-row class="flex-sm-nowrap-reverse flex-sm-nowrap-reverse">
            <v-col align-self="center" cols="12" md="6" lg="6" xl="6" xxl="6" xxxl="7">
                <div class="text-h3">Sneaker Collection</div>
                <div class="my-4 text-body-1">
                    Labore eu ad fugiat labore ut ad consectetur ex adipisicing incididunt amet
                    officia consequat. Fugiat sit sint laborum anim occaecat sunt sint. Ipsum dolor
                    velit esse sint laborum tempor excepteur id officia non nisi consectetur tempor
                    qui.
                </div>
            </v-col>
            <v-col>
                <big-sneaker />
            </v-col>
        </v-row>
    </v-container>
    <v-container>
        <h3></h3>
    </v-container>
    <v-container>
        <h3 class="py-10 text-h3">Products</h3>
        <v-row>
            <v-col
                v-for="item of homeStore.suggestions"
                :key="item.id"
                cols="12"
                sm="6"
                md="4"
                lg="3"
                xl="2"
                xxl="2"
                class="d-flex justify-center"
            >
                <sneaker-card v-bind="item" />
            </v-col>
        </v-row>
    </v-container>
</template>
