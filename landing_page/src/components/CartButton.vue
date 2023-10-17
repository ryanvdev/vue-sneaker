<script setup lang="ts">
import { defineProps } from 'vue';
import { VBadge, VIcon } from 'vuetify/components';

import { useCartStore } from '@/stores/cart_store';

interface Props {
    class?: string;
}

const props = defineProps<Props>();
const cartStore = useCartStore();
</script>

<template>
    <v-tooltip text="Cart" location="bottom center">
        <template v-slot:activator="{ props: tooltipProps }">
            <v-btn
                v-bind="tooltipProps"
                height="60px"
                width="80px"
                stacked
                rounded="lg"
                variant="text"
                to="/cart"
                :class="props.class"
            >
                <v-badge :content="cartStore.items.length" color="secondary">
                    <v-icon icon="mdi-cart" size="40px" color="secondary" />
                </v-badge>
            </v-btn>
        </template>
    </v-tooltip>
</template>
