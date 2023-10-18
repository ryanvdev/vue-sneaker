import type { Sneaker } from '@/types/sneaker';
import { fetchAllSneakers } from '../products_service';
import _ from 'lodash';

const LOCAL_KEY = 'home_service';

interface FetchSuggestions {
    (): Promise<Sneaker[]>;
    queryKey: string;
}

const fetchSuggestions = (async () => {
    const sneakers = await fetchAllSneakers();
    const data = sneakers.slice(0, 20);

    return data;
}) as FetchSuggestions;

fetchSuggestions.queryKey = _.uniqueId(LOCAL_KEY);

export type { FetchSuggestions };
export { fetchSuggestions };
