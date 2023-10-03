import { Sneaker } from "@/types/sneaker";
import { productFetcher } from "./product_fetcher"


export interface SneakerDetail extends Sneaker{
    description: string;
}

export const fetchSneakerDetailQueryKey = Symbol('fetchSneakerDetail');
export const fetchSneakerDetail = async (slug:string):Promise<SneakerDetail> => {
    const res = await productFetcher.get(`/${slug}.json`);
    return res.data;
}