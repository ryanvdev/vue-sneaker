import { readonly, ref, watch } from 'vue';
import { defineStore } from 'pinia';
import z from 'zod';

import { useValue } from '@/utils/common_utils';

export type CartItem = z.infer<ReturnType<typeof cartItemSchema>>;
export type CartItems = z.infer<ReturnType<typeof cartItemsSchema>>;




const STORAGE_KEY = 'cart';




export const useCartStore = defineStore(STORAGE_KEY, () => {
    const _items = ref<CartItems>(loadData());

    const items = readonly(_items);


    const removeAll = () => {
        _items.value = [];
    }

    const remove = (sneakerId:string, variationId:string ) => {
        const cartRefValue = _items.value;

        _items.value = cartRefValue.filter((elmnt) => (
            elmnt.sneakerId !== sneakerId
            && elmnt.variationId !== variationId
        ));
    }

    const add = (sneakerId:string, variationId:string ) => {
        const cartRefValue = _items.value;

        const currentItemIndex = cartRefValue.findIndex((elmnt) => (
            elmnt.sneakerId === sneakerId
            && elmnt.variationId === variationId
        ));
    
        if(currentItemIndex !== -1) {
            _items.value[currentItemIndex].quantity += 1;
            return;
        }

        _items.value.push({
            sneakerId: sneakerId,
            variationId: variationId,
            quantity: 1,
        });
    }

    // Save to local storage
    watch(_items, (value) => {
        saveData(value);
    }, {deep: true});

    return {items, removeAll, add, remove};
});

/**
 * Create zod schema for the CartItem
 */
const cartItemSchema = () => z.object({
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
const saveData = (data:CartItem[]) => {
    localStorage.setItem(STORAGE_KEY,JSON.stringify(data));
}

/**
 * Parse data loaded from local storage to the CartItems
 */ 
const parseData = useValue(() => {
    const schema = cartItemsSchema();
    return (data:any) => {
        return schema.safeParse(data);
    }
});

/**
 * Load cart items from local storage 
 */
const loadData = ():CartItem[] => {
    try{
        const strData = localStorage.getItem(STORAGE_KEY);
        if(!strData) {
            saveData([]);
            return [];
        }

        const data = JSON.parse(strData) as CartItem[];
        if(!data) {
            saveData([]);
            return [];
        }

        const parseResult = parseData(data);
        if(parseResult.success){
           return parseResult.data; 
        }

        saveData([]);
        return [];
    }
    catch(e) {
        return [];
    }
}


