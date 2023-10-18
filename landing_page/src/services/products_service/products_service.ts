import { Sneaker } from '@/types/sneaker';
import { productsFetcher } from './products_fetcher';
import { EMPTY_ARRAY } from '@/utils/constants';
import _ from 'lodash';
import { memoCache } from '@/utils/cache_utils';
import { DeepReadonly } from 'vue';
import { deepFreeze } from '@/utils/common_utils';

const LOCAL_KEY = 'products_service';

export interface FetchAllSneakers {
    (): Promise<Sneaker[]>;
    queryKey: string;
}

const fetchAllSneakersCacheKey = _.uniqueId('fetchAllSneakers');
const fetchAllSneakers = (async () => {
    if (memoCache.has(fetchAllSneakersCacheKey)) {
        return memoCache.get(fetchAllSneakersCacheKey);
    }

    const res = await productsFetcher.get(`/sneakers.json`);
    const data = deepFreeze(res.data);

    // save to cache
    memoCache.set(fetchAllSneakersCacheKey, data);

    return data;
}) as FetchAllSneakers;

fetchAllSneakers.queryKey = _.uniqueId(LOCAL_KEY);

//=========================================================================

export interface FetchSneakersByBrand {
    (brand: string, skip?: number, limit?: number): Promise<{
        sneakers: Sneaker[];
        brand: string;
    }>;
    queryKey: string;
}

export type FetchSneakersByBrandReturn = Awaited<ReturnType<FetchSneakersByBrand>>;

const fetchSneakersByBrand = (async (brand, skip = 0, limit = 10) => {
    if (!brand) return EMPTY_ARRAY;

    const sneakers = await fetchAllSneakers();

    const result: DeepReadonly<Sneaker>[] = [];
    let counter: number = 0;

    for (const sneaker of sneakers) {
        if (result.length >= limit) break;

        if (sneaker.brand === brand) {
            if (counter < skip) {
                counter++;
            } else {
                result.push(sneaker);
            }
        }
    }

    return {
        brand,
        sneakers: result,
    };
}) as FetchSneakersByBrand;

fetchSneakersByBrand.queryKey = _.uniqueId(LOCAL_KEY);

export { fetchAllSneakers, fetchSneakersByBrand };
