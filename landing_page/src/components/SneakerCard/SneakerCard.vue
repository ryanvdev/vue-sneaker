<script setup lang="ts">
import type { Sneaker, SneakerVariation, SneakerVariationLibrary } from '@/types/sneaker';

import { provide, onUpdated, defineProps, computed, ref } from 'vue';
import { toast } from 'vue3-toastify';
import { useRouter } from 'vue-router';

import {
    computeAvailableVariationLibrary,
    createSneakerUrl,
    getSelectedVariation,
} from '@/utils/sneaker_util';

import { useCartStore } from '@/stores/cart_store';
import { className } from '@/utils/template_utils';
import SneakerCardInfo from './SneakerCardInfo.vue';
import { injectionKey, localLogger } from './sneaker_card_utils';

interface Props extends Sneaker {}

defineOptions({
    inheritAttrs: false,
});

const router = useRouter();
const cartStore = useCartStore();

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
    return variationLibrary.images[color.value || props.defaultImage];
});

const href = computed<string>(() => {
    return createSneakerUrl(props.slug);
});

const ellipseColor = computed<string>(() => {
    const colorValue = color.value;
    if (colorValue !== undefined) return variationLibrary.colors[colorValue];
    const firstColorKey = variations.value.at(0)?.color;
    return variationLibrary.colors[firstColorKey || props.defaultColor];
});

const btnBuyIsReady = computed<boolean>(() => {
    const colorValue = color.value;
    const sizeValue = size.value;
    if (colorValue === undefined || sizeValue === undefined) return false;

    const variationsValue = variations.value;
    if (variationsValue.length === 1) {
        const tmp = variationsValue[0];
        if (sizeValue === tmp.size && colorValue === tmp.color) return true;

        localLogger.error(`Not found variation with size=${sizeValue} and color=${colorValue}`);
    }

    return false;
});

const addToCart = async (): Promise<boolean> => {
    const selectedVariation = getSelectedVariation(color.value, size.value, props.variations);

    // If the customer has not selected the color and size yet.
    if (!selectedVariation) {
        toast.warning('You need to select the color and size first !');
        return false;
    }

    // If ok //
    await cartStore.add(props.id, selectedVariation.id);
    const selectedColorName = props.variationLibrary.colors[selectedVariation.color];
    const selectedSizeName = props.variationLibrary.sizes[selectedVariation.size];
    toast.success(`Added ${selectedColorName} ${props.name} size ${selectedSizeName} to cart`);

    return true;
};

const handleBuyNowClick = async () => {
    const success = await addToCart();
    if (!success) return;
    router.push('/cart');
};

const handleAddToCartClick = async () => {
    await addToCart();
};

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
    <div :class="className('stack', style['sneaker-card'])">
        <div>
            <div
                :class="style['ellipse']"
                :style="{
                    backgroundColor: ellipseColor,
                }"
            ></div>
        </div>
        <div>
            <div :class="style['brand']">
                <p>{{ brand }}</p>
            </div>
        </div>
        <div>
            <div
                :class="style['sneaker-image']"
                :style="{ '--local-image': `url('${image}')` }"
            ></div>
        </div>
        <div>
            <SneakerCardInfo :class="style['sneaker-info']" />
        </div>
    </div>
</template>

<style module="style" lang="scss">
$info-height: 254px;
$info-blur-height: $info-height - 145px;

.sneaker-card {
    --local-width: 270px;
}

.sneaker-card {
    display: block;
    overflow: hidden;

    width: var(--local-width);
    aspect-ratio: 0.6;

    border-radius: 10px;
    border: thin solid rgba(var(--v-border-color), var(--v-border-opacity));

    background-color: rgba(var(--v-theme-surface), 1);

    > * {
        overflow: hidden;
    }
}

.brand {
    display: block;
    width: 100%;
    height: 100%;

    > p {
        position: relative;
        top: 8%;
        left: 0%;
        transition: all 0.3s;

        rotate: -33deg;

        color: rgba(80, 85, 90, 0.5);
        font-family: Roboto Slab;
        font-size: 50px;
        font-style: normal;
        font-weight: 700;
        mix-blend-mode: multiply;
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

    top: 20%;

    width: 80%;
    aspect-ratio: 1;

    margin-left: auto;
    margin-right: auto;

    rotate: -20deg;

    background-image: var(--local-image);
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
}

.sneaker-info {
    position: relative;
    z-index: 5;
    transition: top 0.3s, background-color 0.1s;

    top: calc(100% - $info-blur-height);

    border-radius: 10px 10px 0px 0px;

    margin-left: auto;
    margin-right: auto;

    background-color: transparent;
}

:global(.device-sm) .sneaker-card,
:global(.device-xs) .sneaker-card {
    --local-width: 100%;
}

:global(.is-mobile) .sneaker-card,
:global(.is-desktop) .sneaker-card:hover {
    .brand > p {
        top: 5px;
        left: 10px;
        rotate: 0deg;
        font-size: 40px;
    }

    .ellipse {
        top: -120px;
        left: 66px;

        width: 300px;
        height: 200px;
    }

    .sneaker-image {
        top: 0%;

        width: 80%;

        rotate: 0deg;
    }

    .sneaker-info {
        top: calc(100% - $info-height);
        background-color: rgba(var(--v-theme-primary), 0.3);
    }
}
</style>
