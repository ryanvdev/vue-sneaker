<script setup lang="ts" >
import type {Sneaker, SneakerVariation, SneakerVariationLibrary} from '@/types/sneaker';
import { provide, onUpdated, defineProps, computed, ref, watch } from 'vue';
import SneakerCardInfo from './SneakerCardInfo.vue';
import { injectionKey, localLogger, computeAvailableVariationLibrary, getSelectedVariation } from './sneaker_card_utils';
import { createSneakerUrl } from '@/utils/sneaker_util';

interface Props extends Sneaker{

}

defineOptions({
    inheritAttrs: false,
});

const props = defineProps<Props>();

const { name, brand, variationLibrary } = props;

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
    return variationLibrary.images[color.value||props.defaultImage];
});

const href = computed<string>(() => {
    return createSneakerUrl(props.slug);
});

const ellipseColor = computed<string>(() => {
    const colorValue = color.value;
    if(colorValue !== undefined) return variationLibrary.colors[colorValue];
    const firstColorKey = variations.value.at(0)?.color;
    return variationLibrary.colors[firstColorKey||props.defaultColor];
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
    // const selectedVariation = getSelectedVariation(color.value, size.value, props.variations);
    // if(!selectedVariation) 
}

const handleAddToCartClick = () => {
    
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
                backgroundColor: ellipseColor
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
$width: 270px;
$height: 432px;
$info-height: 254px;
$info-blur-height: $info-height - 145px;

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
    opacity: 0.3;

    left: 120px;
    top: -160px;

    width: 436px;
    height: 436px;

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

    top: 40px;

    width: 270px;
    height: 270px;

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

    
    top: calc(100% - $info-blur-height);
    
    border-radius: 10px 10px 0px 0px;

    margin-left: auto;
    margin-right: auto;

    background-color: rgba(var(--v-theme-dark), 0);
}

.sneaker-card {
    display: block;
    overflow: hidden;

    width: 270px;
    height: 432px;

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

        width: 210px;
        height: 210px;

        rotate: 0deg;
    }

    .sneaker-info {
        top: calc(100% - $info-height);
        background-color: rgba(var(--v-theme-dark), 0.5);
    }
}
</style>