import { Sneaker } from '@/types/sneaker';
import { productsFetcher } from './products_fetcher';

export const fetchAllSneakersQueryKey = Symbol('fetchSneakerDetail');
export const fetchAllSneakers = async (): Promise<Sneaker[]> => {
    const res = await productsFetcher.get(`/sneakers.json`);
    return res.data;
};
