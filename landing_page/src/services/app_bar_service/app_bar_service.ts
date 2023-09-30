import { appBarFetcher } from "./app_bar_fetcher"



export const fetchBrandsQueryKey = Symbol('fetchBrands');
export const fetchBrands = async ():Promise<string[]> => {
    const res = await appBarFetcher.get('/brands.json');
    return res.data;
}