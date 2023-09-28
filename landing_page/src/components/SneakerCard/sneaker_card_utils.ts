import type {SneakerVariation, SneakerVariationLibrary} from '@/types/sneaker';
import type { ComputedRef, InjectionKey, Ref } from 'vue';
import { getLogger } from 'loglevel';

export interface SneakerEvent {
    index: number;
    variationId: string | undefined;
    variation: SneakerVariation | undefined;
}

export interface SneakerCardInjection {
    href: ComputedRef<string>,
    name: string,
    color: Ref<string | undefined>,
    size: Ref<string | undefined>,
    price: Ref<[number, number]>,
    btnBuyIsReady: ComputedRef<boolean>,
    variationLibrary: SneakerVariationLibrary,
    availableVariationLibrary: ComputedRef<SneakerVariationLibrary>,

    handleAddToCartClick: () => any,
    handleBuyNowClick: () => any,
}

const localLogger = getLogger('Sneaker Card');
// localLogger.enableAll();
localLogger.disableAll();

export const injectionKey = Symbol() as InjectionKey<SneakerCardInjection>;


export const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
}





// ============= Sneaker Event =============

// The event data that the customer has not selected the size and color on the SneakerCard 
// or on the Sneaker detail page
const defaultSneakerEvent: SneakerEvent = {
    index: -1,
    variationId: undefined,
    variation: undefined,
}
/**
 * 
 * @param color The colorId that the customer selected. The colorId must get from variations is passed from props of SneakerCard
 * @param size Similar to color, the size is the sizeId.
 * @param variations The variations which is passed from props of SneakerCard
 * @returns SneakerVariation
 */
export const getSelectedVariation = (
    color: string | undefined,
    size: string | undefined,
    variations: SneakerVariation[],
): SneakerVariation|undefined => {
    // Check if the customer has selected the color and size 
    if (color === undefined || size === undefined) {
        // If not, then return undefined.
        return undefined; // * RETURN
    }

    // Find the index of variation that color and size are
    // selected by customer on sneaker card. 
    const index = variations.findIndex((item) => {
        return (item.color === color && item.size === size);
    });

    // case: Not found
    if (index === -1) {
        return undefined;
    }

    // case: Found
    return variations[index];
}


// ====================

/**
 * 
 * @param variations The variations remaining after the customer has selected color or size.
 * @param variationLibrary The variation-library is passed to props from SneakerCard
 * @returns Available variation-library which is computed based on variations remaining
 */
export const computeAvailableVariationLibrary = (
    variations: SneakerVariation[],
    variationLibrary: SneakerVariationLibrary
): SneakerVariationLibrary => {
    const uniqueSizeIds = Array.from(new Set(variations.map(item => item.size)));
    const uniqueColorIds = Array.from(new Set(variations.map(item => item.color)));

    const sizes: IndexSignature<string> = {};
    const colors: IndexSignature<string> = {};

    const originalSizes = variationLibrary.sizes;
    const originalColors = variationLibrary.colors;

    for (const key in originalSizes) {
        if (!uniqueSizeIds.includes(key)) continue;
        sizes[key] = originalSizes[key];
    }

    for (const key in originalColors) {
        if (!uniqueColorIds.includes(key)) continue;
        colors[key] = originalColors[key];
    }

    return {
        sizes: sizes,
        colors: colors,
        images: variationLibrary.images,
    }
}



export { localLogger };





