<script setup lang="ts">
import { watchEffect } from 'vue';
import { VContainer } from 'vuetify/components';

import {useHomeStore} from '@/stores/home_store';
import Header from '@/components/Header.vue';
import SneakerCard from '@/components/SneakerCard';

const homeStore = useHomeStore();

watchEffect(() => {
    console.log('fetch home suggestions');
    homeStore.fetchSuggestions();
})

</script>

<template>
    <div :class="style['page']">
        <Header></Header>
        <v-container :class="style['suggestions']">
            <SneakerCard 
                v-for="item of homeStore.suggestions"
                v-bind="item"
            />
        </v-container>
    </div>
</template>


<style module="style" lang="scss">
.page{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 25px;
}

.suggestions{
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
}


</style>