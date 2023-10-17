import { defineStore } from 'pinia';
import { useQuery } from '@tanstack/vue-query';

import { fetchBrands, fetchBrandsQueryKey } from '@/services/app_bar_service';

const APP_BAR_STORE_KEY = 'app_bar_store';

export const useAppBarStore = defineStore(APP_BAR_STORE_KEY, () => {
    const brandsQuery = useQuery({
        queryKey: [fetchBrandsQueryKey],
        queryFn: fetchBrands,
        initialData: [],
    });
    return { brandsQuery };
});
