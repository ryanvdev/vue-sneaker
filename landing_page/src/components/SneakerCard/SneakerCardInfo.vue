<script setup lang="ts">
import {inject, onUpdated} from 'vue';
import { RouterLink } from 'vue-router';
import SneakerCardSize from './SneakerCardSize.vue';
import SneakerCardColor from './SneakerCardColor.vue';
import SneakerCardButtons from './SneakerCardButtons.vue';
import { injectionKey, localLogger } from './sneaker_card_utils';
import { computed } from 'vue';
import { formatPrice } from '@/utils/sneaker_util';

export interface SneakerCardInfoProps {
    class?: string;
}

defineOptions({
    inheritAttrs: false,
});

const props = defineProps<SneakerCardInfoProps>();
const { price, href, name } = inject(injectionKey)!;

const localPrice = computed<string>(() => {
    const [price1, price2] = price.value;

    if(price1 === price2) return formatPrice(price1);
    return `${formatPrice(price1)} - ${formatPrice(price2)}`
});

onUpdated(() => {
    localLogger.info('SneakerCardInfo updated');
})

</script>

<template>
    <div :class="`${style['sneaker-card-info']} ${props.class}`">
        <RouterLink :to="href" :class="style['sneaker-name']">{{ name }}</RouterLink>
        <p :class="style['sneaker-price']">{{ localPrice }}</p>
        <SneakerCardSize/>
        <SneakerCardColor/>
        <SneakerCardButtons />
    </div>
</template>


<style module="style" lang="scss">
.sneaker-card-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 15px;

    padding: 15px 0px 20px 0px;

    width: 100%;
}

.sneaker-name {
    color: rgb(var(--v-theme-tertiary));
    font-family: Roboto Slab;
    font-size: 22px;
    font-weight: 800;
    line-height: normal;
    white-space: nowrap;
    text-overflow: ellipsis;

    &:hover{
        color: rgb(var(--v-theme-on-primary));
    }
}

.sneaker-price {
    height: 35px;
    width: 100%;

    
    font-family: Roboto Slab;
    font-size: 20px;
    font-weight: 700;
    line-height: 30px;
    font-style: normal;
    white-space: nowrap;
    text-align: center;
    color: orangered;
}
</style>