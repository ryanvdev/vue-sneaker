import _ from 'lodash';
import { appBarFetcher } from './app_bar_fetcher';

const LOCAL_KEY = 'app_bar_service';

const fetchBrandsCache: {
    data: string[] | undefined;
} = { data: undefined };

export interface FetchBrands {
    (): Promise<string[]>;
    queryKey: string;
}

const fetchBrands = (async () => {
    if (fetchBrandsCache.data === undefined) {
        const res = await appBarFetcher.get('/brands.json');
        fetchBrandsCache.data = res.data as string[];
    }
    return fetchBrandsCache.data;
}) as FetchBrands;

fetchBrands.queryKey = _.uniqueId(LOCAL_KEY);

export { fetchBrands };
