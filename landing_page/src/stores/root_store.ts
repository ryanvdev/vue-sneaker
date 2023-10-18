import { themeKeys } from '@/themes';
import { Status } from '@/types/http_types';
import { useValue } from '@/utils/common_utils';
import { MOBILE_DEVICES } from '@/utils/constants';

import { defineStore } from 'pinia';
import { computed, reactive, ref, watch } from 'vue';
import { useDisplay } from 'vuetify';
import z from 'zod';

type RootLocalStorage = z.infer<ReturnType<typeof rootLocalStorageSchema>>;

const ROOT_STORE_KEY = 'root_store';

export const useRootStore = defineStore(ROOT_STORE_KEY, () => {
    const { name: deviceSize } = useDisplay();

    const _requestsProcessing = ref<Map<string, { createdAt: number; url: string }>>(new Map());
    const localData = reactive<RootLocalStorage>(loadData());

    const isLoading = computed<boolean>(() => {
        return _requestsProcessing.value.size > 0;
    });

    const isMobile = computed<boolean>(() => {
        return MOBILE_DEVICES.includes(deviceSize.value);
    });

    const addRequest = (id: string, url: string) => {
        _requestsProcessing.value.set(id, {
            createdAt: Date.now(),
            url,
        });
    };
    // @ts-ignore
    const removeRequest = (id: string, status: Status, message?: string) => {
        _requestsProcessing.value.delete(id);
    };

    // save to localStorage
    watch(localData, (v) => {
        saveData(v);
    });

    return { localData, isLoading, isMobile, addRequest, removeRequest };
});

const defaultData: RootLocalStorage = Object.freeze({
    theme: themeKeys[0],
});

const rootLocalStorageSchema = () => {
    return z.object({
        theme: z.string().refine((v) => themeKeys.includes(v)),
    });
};

const saveData = (data: RootLocalStorage) => {
    localStorage.setItem(ROOT_STORE_KEY, JSON.stringify(data));
};

/**
 * Parse data loaded from local storage to the CartItems
 */
const parseData = useValue(() => {
    const schema = rootLocalStorageSchema();
    return (data: any) => {
        return schema.safeParse(data);
    };
});

/**
 * Load cart items from local storage
 */
const loadData = (): RootLocalStorage => {
    try {
        const strData = localStorage.getItem(ROOT_STORE_KEY);
        if (!strData) {
            saveData(defaultData);
            return { ...defaultData };
        }

        const data = JSON.parse(strData);
        if (!data) {
            saveData(defaultData);
            return { ...defaultData };
        }

        const parseResult = parseData(data);
        if (parseResult.success) {
            return parseResult.data;
        }

        saveData(defaultData);
        return { ...defaultData };
    } catch (e) {
        saveData(defaultData);
        return { ...defaultData };
    }
};
