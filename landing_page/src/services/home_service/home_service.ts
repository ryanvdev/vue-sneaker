import type {Sneaker} from '@/types/sneaker';
import { homeFetcher } from './home_fetcher';
import { memoCache } from '@/utils/cache_utils';


const fetchSuggestionsKey = 'home_service/fetchSuggestions';
export const fetchSuggestions = async ():Promise<Sneaker[]> => {
    const url = '/sneakers.json';
    const cacheKey = fetchSuggestionsKey + url;

    // If has cache
    if(memoCache.has(cacheKey)) {
        console.info('use cache', cacheKey);
        return memoCache.get(cacheKey);
    }
    
    // If hasn't
    const res = await homeFetcher.get(url);

    const data = (res.data as Sneaker[]).slice(20, 40);

    // Save data to cache
    memoCache.set(cacheKey, data);
    return data;
}