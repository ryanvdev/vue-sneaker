<script setup lang="ts">
import {inject, onUpdated, computed} from 'vue';
import {VSlideGroup, VSlideGroupItem, VSheet} from 'vuetify/components';
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

const handleClick = (sizeKey:string, select: (v:boolean) => any) => {
    if(size.value === sizeKey){
        size.value = undefined;
        select(false);
    }
    else {
        size.value = sizeKey;
        select(true);
    }
}

onUpdated(() => {
    localLogger.info('SneakerCardSize updated');
});

</script>

<template>
    <div :class="`${style['sneaker-card-size']} ${props.class}`">
        <label v-if="sizes.length<=5">SIZE</label>
        <v-sheet max-width="260px" color="transparent">
            <v-slide-group center-active show-arrows>
                <v-slide-group-item
                    v-for="([sizeKey, sizeValue, available]) in sizes" 
                    :key="sizeKey"
                    v-slot="{select}"
                >
                    <button 
                        :class="`${style['size-btn']} ${sizeKey===size?style['selected']:''} ${!available?style['unavailable']:''}`"
                        @click="if(available) handleClick(sizeKey, select);"
                    >
                        {{ sizeValue }}
                    </button>
                </v-slide-group-item>
            </v-slide-group>
        </v-sheet>
    </div>
</template>


<style module="style" lang="scss">
$gap: 10px;
$size: 30px;

.sneaker-card-size {
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    gap: $gap;

    width: 100%;

    >label {
        color: rgb(var(--v-theme-tertiary));
        font-family: Roboto Slab;
        font-size: 14px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
    }

    .size-btn {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        user-select: none;
        transition: all 0.2s;
        overflow: hidden;

        min-width: $size;
        width: fit-content;
        height: $size;

        border-radius: 5px;
        border-color: rgb(var(--v-theme-white));
        border-style: solid;
        border-width: 2px;

        padding: 0px 3px;

        margin: 0px calc($gap/2);

        color: rgb(var(--v-theme-dark));
        font-family: Roboto Slab;
        font-size: 16px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        white-space: nowrap;

        background-color: rgba(var(--v-theme-white), 1);
        

        &.selected {
            color: rgb(var(--v-theme-white));
            background-color: rgb(var(--v-theme-primary));
        }
        &.unavailable {
            cursor: default;
            border-radius: calc($gap/2);
            color: transparent;
            background-color: transparent;
        }
        &:hover {
            border-color: rgb(var(--v-theme-secondary));
        }
    }
}
</style>