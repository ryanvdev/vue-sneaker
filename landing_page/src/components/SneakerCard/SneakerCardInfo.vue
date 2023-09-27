<script setup lang="ts">
import {inject, onUpdated} from 'vue';
import { RouterLink } from 'vue-router';
import SneakerCardSize from './SneakerCardSize.vue';
import SneakerCardColor from './SneakerCardColor.vue';
import SneakerCardButtons from './SneakerCardButtons.vue';
import { injectionKey, localLogger, formatPrice } from './sneaker_card_utils';
import { computed } from 'vue';

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
        <p :class="style['sneaker-price']"><span>{{ localPrice }}</span></p>
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
    gap: 10px;

    padding: 10px 0px;

    width: 100%;
}

.sneaker-name {
    color: rgb(var(--v-theme-tertiary));
    font-family: Roboto Slab;
    font-size: 20px;
    font-weight: 700;
    line-height: normal;

    &:hover{
        color: rgb(var(--v-theme-secondary));
    }
}

.sneaker-price {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;

    height: 25px;
    width: 190px;

    
    >span{
        display: block;
        color: rgb(var(--v-theme-price));
        font-family: Roboto Slab;
        font-size: 22px;
        font-weight: 700;
        line-height: 25px;
        font-style: normal;
        transform: scaleX(0.75);
        white-space: nowrap; 
        text-overflow: clip;
    }
}
</style>