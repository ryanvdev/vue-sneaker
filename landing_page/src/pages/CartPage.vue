<script setup lang="ts">
import type { CartItemInfo } from '@/types/cart_types';

import _ from 'lodash';
import { onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useQuery } from '@tanstack/vue-query';
import { RouterLink } from 'vue-router';

import CartService from '@/services/cart_service';
import { WEB_NAME, EMPTY_ARRAY } from '@/utils/constants';
import { useCartStore } from '@/stores/cart_store';
import QuantityField from '@/components/QuantityField.vue';
import { createSneakerUrl, formatPrice } from '@/utils/sneaker_util';
import { useRootStore } from '@/stores/root_store';
import { toast } from 'vue3-toastify';

const route = useRoute();
const cartStore = useCartStore();
const rootStore = useRootStore();

const { data, isLoading, isSuccess, isError } = useQuery({
    queryKey: [CartService.fetchCartItems.queryKey, cartStore.itemIdsHash] as const,
    queryFn: async () => {
        return CartService.fetchCartItems(cartStore.items);
    },
});

const cartItemsInfo = computed<Readonly<CartItemInfo[]>>(() => {
    if (!data || !data.value) return EMPTY_ARRAY;

    const needToRemove: string[] = [];
    const results: CartItemInfo[] = [];

    for (const cartItem of cartStore.items) {
        const sneaker = data.value.find((v) => v.id === cartItem.sneakerId);
        if (!sneaker) {
            needToRemove.push(cartItem.key);
            continue;
        }

        const variation = sneaker.variations.find((item) => item.id === cartItem.variationId)!;
        results.push({
            key: cartItem.sneakerId + cartItem.variationId,
            sneaker,
            cartItem,
            variation,
            price: formatPrice(variation.price),
        });
    }

    if (needToRemove.length > 0) {
        toast.warning(
            "Some products in the shopping cart do not currently exist. We've removed them from your cart for you.",
        );
        cartStore.removeMany(needToRemove);
        return EMPTY_ARRAY;
    }

    return results;
});

onMounted(() => {
    document.title = route.name?.toString() || WEB_NAME;
});

cartStore.items;
</script>

<template>
    <v-container v-if="isLoading"> loading.... </v-container>
    <v-container v-else-if="isSuccess">
        <v-row
            v-for="{ cartItem, sneaker, variation, key, price } of cartItemsInfo"
            :key="key"
            no-gutters
            align="center"
            class="py-3"
        >
            <v-col v-if="rootStore.isMobile" cols="4" sm="3">
                <v-img
                    :src="sneaker.variationLibrary.images[variation.image]"
                    width="90%"
                    max-width="150px"
                    aspect-ratio="1"
                />
            </v-col>
            <v-col>
                <v-row no-gutters align="center">
                    <v-col v-if="!rootStore.isMobile" cols="12" md="1">
                        <v-img
                            :src="sneaker.variationLibrary.images[variation.image]"
                            width="60px"
                            aspect-ratio="1"
                        />
                    </v-col>
                    <v-col cols="12" sm="8" md="5" class="py-2 py-md-0">
                        <router-link
                            :to="createSneakerUrl(sneaker.slug)"
                            class="d-block text-h5 w-100"
                        >
                            {{ sneaker.name }}
                        </router-link>
                    </v-col>
                    <v-col cols="12" sm="4" md="2" class="py-2 py-md-0">
                        <span :class="styles['price']">{{ price }}</span>
                    </v-col>
                    <v-col
                        cols="9"
                        sm="8"
                        md="3"
                        class="d-flex justify-start justify-md-center py-2 py-md-0"
                    >
                        <quantity-field
                            :model-value="cartItem.quantity"
                            @update:model-value="cartStore.updateQuantity(key, $event)"
                        />
                    </v-col>
                    <v-col cols="3" sm="4" md="1" class="d-flex justify-end py-2 py-md-0">
                        <v-btn
                            icon="mdi-delete"
                            variant="plain"
                            rounded="sm"
                            @click="cartStore.remove(key)"
                        />
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
    <v-container v-else-if="isError"> error... </v-container>
</template>

<style module="styles" lang="scss">
.price {
    color: orangered;
    font-size: 1.2rem;
    font-weight: 700;
}
</style>
