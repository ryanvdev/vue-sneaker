<script setup lang="ts" >
import { provide, onUpdated, withDefaults, defineProps, computed, ref, watch } from 'vue';
import SneakerCardInfo from './SneakerCardInfo.vue';
import { injectionKey, localLogger, computeAvailableVariationLibrary, createSneakerEvent } from './sneaker_card_utils';
import type { SneakerVariation, SneakerVariationLibrary, SneakerEvent } from './sneaker_card_utils';


interface SneakerCardProps {
    href?: string,
    brand?: string,
    name?: string,
    defaultImage: string,
    defaultColor: string,
    variations: SneakerVariation[],
    variationLibrary: SneakerVariationLibrary,
}

defineOptions({
    inheritAttrs: false,
});

const props = withDefaults(defineProps<SneakerCardProps>(), {
    brand: 'Brand',
    href: '#',
    name: 'Sneaker',
});

const { name, brand, href, variationLibrary } = props;

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

const handleBuyNowClick = () => {
    emit('click:buy-now', createSneakerEvent(color.value, size.value, props.variations));
}

const handleAddToCartClick = () => {
    emit('click:add-to-cart', createSneakerEvent(color.value, size.value, props.variations));
}


watch(color, (value) => {
    localLogger.info('color', value);
}, { immediate: true })


provide(injectionKey, {
    name,
    price,
    href,
    color,
    size,
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
        color: rgba(86, 86, 86, 0.54);
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
    z-index: 5;

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
    transition: top 0.3s;

    top: 300px;

    margin-left: auto;
    margin-right: auto;
}

.sneaker-card {
    display: block;
    overflow: hidden;

    width: 220px;
    height: 365px;

    border-radius: 10px;

    background-color: rgba(var(--v-theme-cardBackground));

    >* {
        overflow: hidden;
    }
}

.sneaker-card:hover {
    .brand>p {
        rotate: 0deg;
        font-size: 80px;
    }

    .ellipse {
        top: -120px;
        left: 66px;

        width: 300px;
        height: 200px;
    }

    .sneaker-image {
        top: 2px;

        width: 180px;
        height: 180px;

        rotate: 0deg;
    }

    .sneaker-info {
        top: 186px;
    }
}
</style>