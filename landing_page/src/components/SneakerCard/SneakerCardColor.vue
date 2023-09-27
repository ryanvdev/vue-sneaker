<script setup lang="ts">
import { inject, onUpdated } from 'vue';
import { injectionKey, localLogger } from './sneaker_card_utils';
import { computed } from 'vue';

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


const computeClassName = (style:IndexSignature<string>, colorKey:string, available:boolean):string => {
    const selectedClassName = colorKey === color.value ? style['selected'] : '';
    const availableClassName = !available ? style['unavailable'] : '';
    return `${selectedClassName} ${availableClassName}`;
}


const handleClick = (colorKey: string) => {
    if (color.value === colorKey) {
        color.value = undefined;
    }
    else {
        color.value = colorKey;
    }
}

onUpdated(() => {
    localLogger.info('SneakerCardColor updated');
});

</script>

<template>
    <div :class="`${style['sneaker-card-color']} ${props.class}`">
        <label>COLOR</label>
        <ul>
            <li v-for="([colorKey, colorValue, available]) in colors"
                :key="colorKey"
                :class="computeClassName(style, colorKey, available)"
                :style="{ '--color': colorValue }"
                @click="if (available) handleClick(colorKey);"
            >
            </li>
        </ul>
    </div>
</template>


<style module="style" lang="scss">
$gap: 8px;

.sneaker-card-color {
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
    gap: $gap;

    >label {
        color: rgb(var(--v-theme-tertiary));
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
            --color: black;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            transition: all 0.3s;
            filter: grayscale(0);

            width: 25px;
            height: 25px;

            border-radius: 12.5px;
            border-style: solid;
            border-width: 0px;
            border-color: rgba(var(--v-theme-white), 1);

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
}
</style>