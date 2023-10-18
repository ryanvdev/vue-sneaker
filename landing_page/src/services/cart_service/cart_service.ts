import type { DeepReadonly } from 'vue';

import ProductsService from '../products_service';
import { CartItem } from '@/stores/cart_store';
import { Sneaker } from '@/types/sneaker';

interface FetchCartItems {
    (cartItems: DeepReadonly<CartItem[]>): Promise<Sneaker[]>;
    queryKey: symbol;
}

const fetchCartItems = (async (cartItems) => {
    const sneakers = await ProductsService.fetchAllSneakers();
    const setOfSneakerIds = new Set(cartItems.map((item) => item.sneakerId));

    const results: Sneaker[] = sneakers.filter((sneaker) => setOfSneakerIds.has(sneaker.id));

    return results;
}) as FetchCartItems;

fetchCartItems.queryKey = Symbol('fetchCartItems');

export { fetchCartItems };
