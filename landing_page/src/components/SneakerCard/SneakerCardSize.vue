<script setup lang="ts">
import {inject, onUpdated, computed} from 'vue';
import { injectionKey, localLogger } from './sneaker_card_utils';

export interface SneakerCardSizeProps {
    class?: string;
}

defineOptions({
    inheritAttrs: false,
});

const props = defineProps<SneakerCardSizeProps>();

const { size, variationLibrary, availableVariationLibrary } = inject(injectionKey)!;

const availableSizes = computed(() => availableVariationLibrary.value.sizes);
const sizes = computed<[string, string, boolean][]>(() => {
    const availableSizesValue = availableSizes.value;
    return Object.entries(variationLibrary.sizes).map(([sizeKey, sizeValue]) => {
        return [
            sizeKey,
            sizeValue,
            sizeKey in availableSizesValue, // If color available, return true. 
        ] as [string, string, boolean];
    });
});

const handleClick = (sizeKey:string) => {
    if(size.value === sizeKey){
        size.value = undefined;
    }
    else {
        size.value = sizeKey;
    }
}

onUpdated(() => {
    localLogger.info('SneakerCardSize updated');
});

</script>

<template>
    <div :class="`${style['sneaker-card-size']} ${props.class}`">
        <label>SIZE</label>
        <ul>
            <li 
                v-for="([sizeKey, sizeValue, available]) in sizes" 
                :key="sizeKey"
                :class="`${sizeKey === size ? style['selected'] : ''} ${!available?style['unavailable']:''}`"
                @click="if(available) handleClick(sizeKey);"
            >
                {{ sizeValue }}
            </li>
        </ul>
    </div>
</template>


<style module="style" lang="scss">
$gap: 8px;

.sneaker-card-size {
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
    gap: $gap;

    >label {
        color: var(--White, #FFF);
        font-family: Roboto Slab;
        font-size: 13px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
    }

    >ul {
        display: flex;
        flex-wrap: nowrap;
        justify-content: flex-start;
        align-items: center;
        gap: $gap;

        >li {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            user-select: none;
            transition: all 0.3s;

            width: 25px;
            height: 25px;

            border-radius: 5px;
            border-color: rgb(var(--v-theme-white));
            border-style: solid;
            border-width: 2px;

            color: #000;
            font-family: Roboto Slab;
            font-size: 16px;
            font-style: normal;
            font-weight: 700;
            line-height: normal;

            background-color: rgba(var(--v-theme-white), 1);
            

            &.selected {
                background-color: rgba(var(--v-theme-secondary), 1);
            }
            &.unavailable {
                background-color: transparent;
                cursor: default;
                color: transparent;
            }
            &:hover {
                border-color: rgb(var(--v-theme-secondary));
            }
        }
    }
}
</style>