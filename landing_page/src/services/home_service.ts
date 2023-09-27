import axios from 'axios';
import type {Sneaker} from '@/types/sneaker';



let suggestionsCache:Sneaker[]|undefined = undefined;
export const fetchSuggestions = async ():Promise<Sneaker[]> => {
    if(suggestionsCache === undefined){
        const res = await axios.get('/testing-api/random-sneakers.json');
        suggestionsCache = res.data as Sneaker[];
    }
    return suggestionsCache;
}