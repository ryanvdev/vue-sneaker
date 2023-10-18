<script setup lang="ts">
import { defineProps } from 'vue';
import CartButton from './CartButton.vue';

interface Props {
    class?: string;
}
const props = defineProps<Props>();
</script>

<template>
    <div :class="`${style['header-buttons']} ${props.class}`">
        <cart-button />
    </div>
</template>

<style module="style" lang="scss">
.header-buttons {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: nowrap;
    gap: 10px;

    height: 60px;
}
</style>
