<script setup lang="ts" >
import type {Sneaker, SneakerVariation, SneakerVariationLibrary} from '@/types/sneaker';
import { provide, onUpdated, defineProps, computed, ref, watch } from 'vue';
import SneakerCardInfo from './SneakerCardInfo.vue';
import { injectionKey, localLogger, computeAvailableVariationLibrary, createSneakerEvent } from './sneaker_card_utils';
import type { SneakerEvent } from './sneaker_card_utils';

interface Props extends Sneaker{

}

defineOptions({
    inheritAttrs: false,
});

const props = defineProps<Props>();

const { name, brand, variationLibrary } = props;

const emit = defineEmits<{
    'update:variation': [value: Partial<SneakerVariation>],
    'click:add-to-cart': [e: SneakerEvent],
    'click:buy-now': [e: SneakerEvent]
}>();

// the color id of variationLibrary.colors
const color = ref<string | undefined>();

// similar to the color ref
const size = ref<string | undefined>();

/**
 * The variations remaining when the customer has selected color or size on the SneakerCard
 */
const variations = computed<SneakerVariation[]>(() => {
    const colorValue = color.value;
    const sizeValue = size.value;

    if (colorValue === undefined && sizeValue === undefined) {
        return props.variations;
    }

    return props.variations.filter((item) => {
        let result = true;
        if (colorValue !== undefined && colorValue !== item.color) {
            result = false;
        }

        if (sizeValue !== undefined && sizeValue !== item.size) {
            result = false;
        }
        return result;
    });
});

const availableVariationLibrary = computed<SneakerVariationLibrary>(() => {
    return computeAvailableVariationLibrary(variations.value, variationLibrary);
});

const price = computed<[number, number]>(() => {
    const variationValue = variations.value;
    let min = variationValue[0].price;
    let max = min;

    for (const { price } of variationValue) {
        if (min > price) min = price;
        if (max < price) max = price;
    }

    return [min, max];
});

const image = computed<string>(() => {
    const uniqueImageIds = Array.from(new Set(variations.value.map((item) => item.image)));
    if (uniqueImageIds.length === 1) {
        return variationLibrary.images[uniqueImageIds[0]];
    }
    return variationLibrary.images[props.defaultImage];
});

const href = computed<string>(() => {
    return '';
});

const btnBuyIsReady = computed<boolean>(() => {
    const colorValue = color.value;
    const sizeValue = size.value;
    if(colorValue === undefined || sizeValue === undefined) return false;

    const variationsValue = variations.value;
    if(variationsValue.length === 1){
        const tmp = variationsValue[0];
        if(sizeValue === tmp.size && colorValue === tmp.color) return true;

        localLogger.error(`Not found variation with size=${sizeValue} and color=${colorValue}`);
    }

    return false;
});

const handleBuyNowClick = () => {
    emit('click:buy-now', createSneakerEvent(color.value, size.value, props.variations));
}

const handleAddToCartClick = () => {
    emit('click:add-to-cart', createSneakerEvent(color.value, size.value, props.variations));
}

watch(color, (value) => {
    localLogger.info('color', value);
}, { immediate: true });

provide(injectionKey, {
    name,
    price,
    href,
    color,
    size,
    btnBuyIsReady,
    variationLibrary,
    availableVariationLibrary,
    handleBuyNowClick,
    handleAddToCartClick,
});

onUpdated(() => {
    localLogger.info('SneakerCard updated');
});

</script>

<template>
    <div :class="`${style['sneaker-card']} stack`">
        <div>
            <div :class="style['ellipse']" :style="{
                backgroundColor: variationLibrary.colors[color||defaultColor]
            }">
            </div>
        </div>
        <div>
            <div :class="style['brand']">
                <p>{{ brand }}</p>
            </div>
        </div>
        <div>
            <div :class="style['sneaker-image']">
                <img :src="image" :alt="name" />
            </div>
        </div>
        <div>
            <SneakerCardInfo :class="style['sneaker-info']" />
        </div>
    </div>
</template>


<style module="style" lang="scss">
.brand {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100%;

    >p {
        transition: all 0.3s;
        rotate: 45deg;
        color: rgba(80, 85, 90, 0.6);
        font-family: Roboto Slab;
        font-size: 90px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
    }
}

.ellipse {
    display: block;
    position: relative;
    transition: all 0.3s;
    opacity: 0.5;

    left: 120px;
    top: -100px;

    width: 200px;
    height: 200px;

    background-color: rgb(var(--v-theme-primary));

    border-radius: 50%;
}

.sneaker-image {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    transition: all 0.3s;
    z-index: 4;

    top: 53px;

    width: 200px;
    height: 200px;

    margin-left: auto;
    margin-right: auto;

    rotate: -20deg;

    >img {
        max-width: 100%;
        max-height: 100%;
    }
}

.sneaker-info {
    position: relative;
    z-index: 5;
    transition: top 0.3s, background-color 0.1s;

    
    top: 285px;
    
    border-radius: 10px 10px 0px 0px;

    margin-left: auto;
    margin-right: auto;


    background-color: rgba(var(--v-theme-dark), 0);
}

.sneaker-card {
    display: block;
    overflow: hidden;

    width: 220px;
    height: 365px;

    border-radius: 10px;

    background-color: rgba(var(--v-theme-card-background));

    >* {
        overflow: hidden;
    }
}

.sneaker-card:hover {
    .brand>p {
        rotate: 0deg;
        font-size: 70px;
    }

    .ellipse {
        top: -120px;
        left: 66px;

        width: 300px;
        height: 200px;
    }

    .sneaker-image {
        top: -5px;

        width: 180px;
        height: 180px;

        rotate: 0deg;
    }

    .sneaker-info {
        top: 165px;
        background-color: rgba(var(--v-theme-dark), 0.5);
    }
}
</style>