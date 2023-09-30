import { ThemeKey } from '@/themes';
import {Status} from '@/types/http_types';

import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { useDisplay } from 'vuetify';

const ROOT_STORE_KEY = 'root_store';
export interface RootStoreState{
    isLoading: boolean;
}

export const useRootStore = defineStore(ROOT_STORE_KEY, () => {
    const { name: deviceSize } = useDisplay();

    const _requestsProcessing = ref<Map<string, {createdAt:number, url:string}>>(new Map());
    const theme = ref<ThemeKey>('dark');

    const isLoading = computed<boolean>(() => {
        return _requestsProcessing.value.size > 0;
    });

    const isMobile = computed<boolean>(() => {
        switch (deviceSize.value) {
            case 'xs':
            case 'sm':
            case 'md': {
                return true;
            }
            default: return false;
        }
    });

    const addRequest = (id:string, url:string) => {
        _requestsProcessing.value.set(id, {
            createdAt: Date.now(),
            url,
        });
    }
    // @ts-ignore
    const removeRequest = (id:string, status:Status, message?:string) => {
        _requestsProcessing.value.delete(id);
    }

    return {theme, isLoading, isMobile, addRequest, removeRequest}
});