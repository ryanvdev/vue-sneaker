<script setup lang="ts">
import { inject } from 'vue';
import { injectionKey } from './sneaker_card_utils';
// import { VBtn } from 'vuetify/';

export interface SneakerCardButtonsProps {
    class?: string;
}

defineOptions({
    inheritAttrs: false,
});

const { handleAddToCartClick, handleBuyNowClick, btnBuyIsReady } = inject(injectionKey)!;

const props = defineProps<SneakerCardButtonsProps>();
</script>

<template>
    <div
        :class="`${style['sneaker-card-buttons']} ${
            style[btnBuyIsReady ? 'is-ready' : 'is-not-ready']
        } ${props.class}`"
    >
        <button v-ripple @click="handleBuyNowClick">Buy Now</button>
        <button v-ripple @click="handleAddToCartClick">Add To Cart</button>
    </div>
</template>

<style module="style" lang="scss">
.sneaker-card-buttons {
    --primary-color: rgba(var(--v-theme-secondary), 0.8);
    --secondary-color: rgb(var(--v-theme-on-secondary));
    --on-hover-color: rgba(var(--v-theme-secondary), 1);

    display: inline-flex;
    justify-content: space-around;
    align-items: center;
    width: calc(100% - 10px);

    > button {
        display: flex;
        width: calc(50% - 30px);
        height: 35px;
        justify-content: center;
        align-items: center;
        flex-shrink: 0;

        border-radius: 5px;

        text-align: center;
        font-family: Roboto Slab;
        font-size: 13px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;

        &:nth-child(1) {
            color: var(--secondary-color);
            background-color: var(--primary-color);
            &:hover {
                background-color: var(--on-hover-color);
            }
        }

        &:nth-child(2) {
            border: 2px solid currentColor;
            color: var(--primary-color);
            background-color: var(--secondary-color);
            &:hover {
                color: var(--on-hover-color);
            }
        }
    }
}

.sneaker-card-buttons.is-not-ready > button {
    cursor: default;
    filter: grayscale(1);
    opacity: 0.5;

    &:nth-child(1):hover {
        background-color: var(--primary-color);
    }
    &:nth-child(2):hover {
        color: var(--primary-color);
    }
}

.sneaker-card-buttons.is-ready > button {
    cursor: pointer;
    filter: grayscale(0);
    opacity: 1;
}
</style>
