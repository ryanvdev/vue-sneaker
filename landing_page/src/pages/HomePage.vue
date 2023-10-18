<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

import BigSneaker from '@/components/BigSneaker.vue';
import { WEB_NAME } from '@/utils/constants';
import { useQuery, useQueries } from '@tanstack/vue-query';
import { fetchSneakersByBrand } from '@/services/products_service';
import { useAppBarStore } from '@/stores/app_bar_store';
import { fetchSuggestions } from '@/services/home_service';
import SneakersSlideGroup from '@/components/SneakersSlideGroup.vue';
import SneakersGroup from '@/components/SneakersGroup.vue';

const LOCAL_KEY = 'home_page';
const BRANDS_KEY = LOCAL_KEY + 'brand';
const brandIndexs = [1, 3, 5, 7];

const route = useRoute();
const appBarStore = useAppBarStore();

const sneakersByBrand = useQueries({
    queries: brandIndexs.map((index) => {
        return {
            queryKey: [index, appBarStore, fetchSneakersByBrand.queryKey, BRANDS_KEY, LOCAL_KEY],
            queryFn: async () => {
                const brandName = appBarStore.brands[index];
                if (brandName == null) return null;
                return await fetchSneakersByBrand(brandName);
            },
        };
    }),
});

const {
    data: suggestions,
    // isError: isSuggestionsError,
    isSuccess: isSuggestionsSuccess,
} = useQuery({
    queryKey: [LOCAL_KEY, fetchSuggestions.queryKey],
    queryFn: fetchSuggestions,
    initialData: [],
    refetchOnWindowFocus: false,
});

onMounted(() => {
    document.title = route.name?.toString() || WEB_NAME;
});
</script>

<template>
    <v-container>
        <v-row class="flex-sm-nowrap-reverse flex-sm-nowrap-reverse">
            <v-col align-self="center" cols="12" md="6" lg="6" xl="6" xxl="6" xxxl="7">
                <h1 class="text-h3">{{ WEB_NAME }}</h1>
                <div class="my-4 text-body-1">
                    Labore eu ad fugiat labore ut ad consectetur ex adipisicing incididunt amet officia consequat.
                    Fugiat sit sint laborum anim occaecat sunt sint. Ipsum dolor velit esse sint laborum tempor
                    excepteur id officia non nisi consectetur tempor qui.
                </div>
            </v-col>
            <v-col>
                <big-sneaker />
            </v-col>
        </v-row>
    </v-container>

    <template v-for="{ data, isSuccess } of sneakersByBrand">
        <v-container v-show="isSuccess">
            <sneakers-slide-group v-if="data" v-bind="data" />
        </v-container>
    </template>

    <v-container v-if="isSuggestionsSuccess">
        <sneakers-group title="Suggestion For You" :sneakers="suggestions" />
    </v-container>
</template>
