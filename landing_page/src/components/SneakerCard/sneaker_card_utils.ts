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

export const injectionKey = Symbol() as InjectionKey<SneakerCardInjection>;



const localLogger = getLogger('Sneaker Card');
// localLogger.enableAll();
localLogger.disableAll();


export { localLogger };





