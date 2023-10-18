import { CartItem } from '@/stores/cart_store';
import { Sneaker, SneakerVariation } from './sneaker';
import { DeepReadonly } from 'vue';

export interface CartItemInfo {
    key: string;
    sneaker: Sneaker;
    cartItem: DeepReadonly<CartItem>;
    variation: SneakerVariation;
    price: string;
}

export interface Cart {
    [key: string]: CartItem;
}
