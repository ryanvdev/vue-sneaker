import { ref, watch } from 'vue';
import { defineStore } from 'pinia';
import z from 'zod';

import { useValue } from '@/utils/common_utils';
import _ from 'lodash';

export type CartItem = z.infer<ReturnType<typeof cartItemSchema>>;
export type CartItems = z.infer<ReturnType<typeof cartItemsSchema>>;




const STORAGE_KEY = 'cart';




export const useCartStore = defineStore(STORAGE_KEY, () => {
    const items = ref<CartItems>(loadData());
    const itemIdsHash = ref<string>(_.uniqueId());
    const quantityHash = ref<string>(_.uniqueId());

    const removeAll = () => {
        items.value = [];
    }

    const remove = (key:string) => {
        const index = items.value.findIndex(item => item.key === key);
        if(index === -1){
            console.error(`Can not found the item with key="${key}"`);
            return;
        }
        items.value.splice(index, 1);
    }

    const removeMany = (keys:string[]) => {
        items.value = items.value.filter((elmnt) => !keys.includes(elmnt.key));
    }

    const add = (sneakerId: string, variationId: string) => {
        const currentItemIndex = items.value.findIndex((elmnt) => (
            elmnt.sneakerId === sneakerId
            && elmnt.variationId === variationId
        ));

        if (currentItemIndex !== -1) {
            items.value[currentItemIndex].quantity += 1;
            return;
        }

        items.value.push({
            key: sneakerId + variationId,
            sneakerId: sneakerId,
            variationId: variationId,
            quantity: 1,
        });
    }

    const updateQuantity = (key:string, value:number) => {
        const index = items.value.findIndex(item => item.key === key);
        if(index === -1){
            console.error(`Can not found the item with key="${key}"`);
            return;
        }
        items.value[index].quantity = value;
    }

    // Save to local storage
    watch(items, (value) => {
        saveData(value);
        itemIdsHash.value = JSON.stringify(items.value.map(v => v.sneakerId));
        quantityHash.value = JSON.stringify(items.value.map(v => v.quantity));
    }, { deep: true });

    return { items, itemIdsHash, quantityHash, removeAll, add, remove, removeMany, updateQuantity};
});

/**
 * Create zod schema for the CartItem
 */
const cartItemSchema = () => z.object({
    key: z.string(),
    sneakerId: z.string(),
    variationId: z.string(),
    quantity: z.number().int(),
});

/**
 * Create zod schema for the CartItems
 */
const cartItemsSchema = () => z.array(cartItemSchema());


/**
 * Save the cart items to local storage
 */
const saveData = (data: CartItem[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

/**
 * Parse data loaded from local storage to the CartItems
 */
const parseData = useValue(() => {
    const schema = cartItemsSchema();
    return (data: any) => {
        return schema.safeParse(data);
    }
});

/**
 * Load cart items from local storage 
 */
const loadData = (): CartItem[] => {
    try {
        const strData = localStorage.getItem(STORAGE_KEY);
        if (!strData) {
            saveData([]);
            return [];
        }

        const data = JSON.parse(strData) as CartItem[];
        if (!data) {
            saveData([]);
            return [];
        }

        const parseResult = parseData(data);
        if (parseResult.success) {
            return parseResult.data;
        }

        saveData([]);
        return [];
    }
    catch (e) {
        return [];
    }
}


