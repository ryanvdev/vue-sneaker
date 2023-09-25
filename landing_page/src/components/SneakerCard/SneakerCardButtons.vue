<script setup lang="ts">
import { inject } from 'vue';
import { injectionKey } from './sneaker_card_utils';


export interface SneakerCardButtonsProps {
    class?:string
}

defineOptions({
    inheritAttrs: false,
});

const { handleAddToCartClick: onAddToCartClick, handleBuyNowClick: onBuyNowClick } = inject(injectionKey)!;

const props = defineProps<SneakerCardButtonsProps>();


</script>

<template>
    <div :class="`${style['sneaker-card-buttons']} ${props.class}`">
        <button @click="onBuyNowClick">Buy Now</button>
        <button @click="onAddToCartClick">Add To Cart</button>
    </div>
</template>


<style module="style" lang="scss">
.sneaker-card-buttons{
    display: inline-flex;
    justify-content: center;
    align-items: center;
    gap: 15px;
    
    > button{
        display: flex;
        width: 90px;
        height: 35px;
        justify-content: center;
        align-items: center;
        gap: 10px;
        flex-shrink: 0;
        
        border-radius: 10px;

        text-align: center;
        font-family: Roboto Slab;
        font-size: 13px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;   
        
        &:nth-child(1) {
            color: rgb(var(--v-theme-card-Background));
            background-color: rgb(var(--v-theme-secondary));
        }
    
        &:nth-child(2) {
            border: 2px solid rgb(var(--v-theme-secondary));
            color: rgb(var(--v-theme-secondary));
            background: var(--Transparent, rgba(255, 255, 255, 0.00));
        }
    }
}
</style>