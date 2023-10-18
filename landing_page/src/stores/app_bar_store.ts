import { defineStore } from 'pinia';
import { useQuery } from '@tanstack/vue-query';
import { fetchBrands } from '@/services/app_bar_service';

const APP_BAR_STORE_KEY = 'app_bar_store';

export const useAppBarStore = defineStore(APP_BAR_STORE_KEY, () => {
    const brandsQuery = useQuery({
        queryKey: [APP_BAR_STORE_KEY, fetchBrands.queryKey],
        queryFn: fetchBrands,
        initialData: [],
    });

    return {
        brands: brandsQuery.data,
        state: {
            isLoading: brandsQuery.isLoading,
            isSuccess: brandsQuery.isSuccess,
            isError: brandsQuery.isError,
        },
    };
});
