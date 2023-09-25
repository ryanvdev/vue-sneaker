<script setup lang="ts">

interface FlexContainerProps {
    alignHorizon: 'center' | 'left' | 'right',
    alignVertical: 'center' | 'top' | 'bottom',
    fullWidth: boolean,
    fullHeight: boolean,
}

const props = withDefaults(defineProps<FlexContainerProps>(), {
    alignHorizon: 'center',
    alignVertical: 'center',
    fullWidth: false,
    fullHeight: false,
});

const alignItemsValue = (props.alignVertical === 'top')
    ? 'flex-start'
    : (
        props.alignVertical === 'bottom'
            ? 'flex-end'
            : 'center'
    );

const justifyContentValue = (props.alignHorizon === 'left')
    ? 'flex-start'
    : (
        props.alignHorizon === 'right'
            ? 'flex-end'
            : 'center'
    );
</script>

<template>
    <div :class="$style.flex" :style="{
        alignItems: alignItemsValue,
        justifyContent: justifyContentValue,
        width: props.fullWidth ? '100%' : 'auto',
        height: props.fullHeight ? '100%' : 'auto',
    }">
        <slot></slot>
    </div>
</template>


<style module>
.flex {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}
</style>