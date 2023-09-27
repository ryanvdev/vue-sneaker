import { defineStore } from 'pinia';

export interface CartItem {
    id: string;
    variationId: string;
}

export interface CartStoreState{
    items: CartItem[];
}

export const useCartStore = defineStore('cart', {
    state: ():CartStoreState => ({
        items: [],
    }),
    actions: {
        async add(id:string, variationId:string ) {
            this.items.push({id, variationId});
        }
    }
});