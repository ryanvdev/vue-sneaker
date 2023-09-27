<script setup lang="ts">
import { defineProps } from 'vue'
import { VBadge, VIcon, VBtn } from 'vuetify/components';

interface Props {
    class?: string;
}
const props = defineProps<Props>();
</script>


<template>
    <div :class="`${style['header-buttons']} ${props.class}`">
        <VBtn height="60px" stacked variant="text" to="/cart" color="rgb(var(--v-theme-tertiary))">
            <VBadge :content="80" color="rgb(var(--v-theme-tertiary))">
                <VIcon icon="mdi-cart" size="40px" color="rgb(var(--v-theme-tertiary))"/>
            </VBadge>
        </VBtn>
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

