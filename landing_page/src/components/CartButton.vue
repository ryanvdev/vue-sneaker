<script setup lang="ts">
import { VBtn, VBadge, VIcon } from 'vuetify/components';
import { useCartStore } from '@/stores/cart_store';
const cartStore = useCartStore();
</script>


<template>
    <v-btn height="60px" stacked variant="text" to="/cart" color="rgb(var(--v-theme-tertiary))">
        <v-badge 
            :content="cartStore.items.length" 
            color="rgb(var(--v-theme-tertiary))"
        >
            <v-icon 
                icon="mdi-cart" 
                size="40px" 
                color="rgb(var(--v-theme-tertiary))"
            />
        </v-badge>
    </v-btn>
</template>