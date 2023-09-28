<script setup lang="ts">
import { inject, onUpdated } from 'vue';
import { injectionKey, localLogger } from './sneaker_card_utils';
import { computed } from 'vue';
import { VSlideGroup, VSheet, VSlideGroupItem } from 'vuetify/components';

export interface SneakerCardColorProps {
    class?: string;
}

defineOptions({
    inheritAttrs: false,
});

const props = defineProps<SneakerCardColorProps>();
const { color, variationLibrary, availableVariationLibrary } = inject(injectionKey)!;

const availableColors = computed(() => availableVariationLibrary.value.colors);
const colors = computed<[string, string, boolean][]>(() => {
    const availableColorsValue = availableColors.value;
    return Object.entries(variationLibrary.colors).map(([colorKey, colorValue]) => {
        return [
            colorKey,
            colorValue,
            colorKey in availableColorsValue, // If color available, return true. 
        ] as [string, string, boolean];
    });
});


const computeClassName = (style: IndexSignature<string>, colorKey: string, available: boolean): string => {
    const selectedClassName = colorKey === color.value ? style['selected'] : '';
    const availableClassName = !available ? style['unavailable'] : '';
    return `${selectedClassName} ${availableClassName}`;
}


const handleClick = (colorKey: string, select: (v:boolean) => any) => {
    if (color.value === colorKey) {
        color.value = undefined;
        select(false);
    }
    else {
        color.value = colorKey;
        select(true);
    }
}

onUpdated(() => {
    localLogger.info('SneakerCardColor updated');
});

</script>

<template>
    <div :class="`${style['sneaker-card-color']} ${props.class}`">
        <label v-if="colors.length <= 5">COLOR</label>
        <v-sheet max-width="260px" color="transparent">
            <v-slide-group :class="style['slide-group']" center-active :show-arrows="colors.length>5">
                <v-slide-group-item 
                    v-for="([colorKey, colorValue, available]) in colors" 
                    :key="colorKey"
                    v-slot="{select}"
                >
                    <button 
                        :class="`${style['color-btn']} ${computeClassName(style, colorKey, available)}`"
                        :style="{ '--color': colorValue }" 
                        @click="if (available) handleClick(colorKey, select);"
                    ></button>
                </v-slide-group-item>
            </v-slide-group>
        </v-sheet>
    </div>
</template>


<style module="style" lang="scss">
$gap: 10px;
$size: 30px;

.sneaker-card-color {
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
    gap: $gap;

    >label {
        color: rgb(var(--v-theme-tertiary));
        font-family: Roboto Slab;
        font-size: 14px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
    }

    .color-btn {
        --color: black;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        transition: all 0.3s;
        filter: grayscale(0);

        width: $size;
        height: $size;

        border-radius: calc($size/2);
        border-style: solid;
        border-width: 0px;
        border-color: rgba(var(--v-theme-white), 1);

        margin: 0px calc($gap/2);

        color: #000;
        font-family: Roboto Slab;
        font-size: 16px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;

        background-color: var(--color);

        &.selected {
            border-radius: 5px;
            border-width: 2px;
        }

        &.unavailable {
            border-width: 2px;
            background-color: transparent;
            cursor: default;
        }
    }
}
</style>