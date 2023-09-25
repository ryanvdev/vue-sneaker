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
    gap: 8px;
}

.sneaker-name {
    color: var(--White, #FFF);
    font-family: Roboto Slab;
    font-size: 20px;
    font-weight: 700;
    line-height: normal;
}

.sneaker-price {
    color: var(--Secondary, #75FFAC);
    font-family: Roboto Slab;
    font-size: 16px;
    font-weight: 700;
    line-height: 25px;
    font-style: normal;
}
</style>