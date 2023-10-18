import { SneakerVariation, SneakerVariationLibrary } from '@/types/sneaker';
import { basePaths } from '../router';
import { DeepReadonly } from 'vue';

export const createSneakerUrl = (slug: string) => {
    return `${basePaths.sneaker}/${slug}`;
};

export const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
};

// ============= Sneaker Event =============

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
    variations: DeepReadonly<SneakerVariation[]>,
): SneakerVariation | undefined => {
    // Check if the customer has selected the color and size
    if (color === undefined || size === undefined) {
        // If not, then return undefined.
        return undefined; // * RETURN
    }

    // Find the index of variation that color and size are
    // selected by customer on sneaker card.
    const index = variations.findIndex((item) => {
        return item.color === color && item.size === size;
    });

    // case: Not found
    if (index === -1) {
        return undefined;
    }

    // case: Found
    return variations[index];
};

// ====================

/**
 *
 * @param variations The variations remaining after the customer has selected color or size.
 * @param variationLibrary The variation-library is passed to props from SneakerCard
 * @returns Available variation-library which is computed based on variations remaining
 */
export const computeAvailableVariationLibrary = (
    variations: DeepReadonly<SneakerVariation[]>,
    variationLibrary: DeepReadonly<SneakerVariationLibrary>,
): SneakerVariationLibrary => {
    const uniqueSizeIds = Array.from(new Set(variations.map((item) => item.size)));
    const uniqueColorIds = Array.from(new Set(variations.map((item) => item.color)));

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
    };
};
