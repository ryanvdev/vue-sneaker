import type {Sneaker} from '@/types/sneaker';
import { randomSneakers } from "@/testutils/random_home_suggestion"




let suggestionsCache:Sneaker[]|undefined = undefined;
export const fetchSuggestions = async ():Promise<Sneaker[]> => {
    if(!suggestionsCache){
        suggestionsCache = randomSneakers();
    }
    return suggestionsCache;
}