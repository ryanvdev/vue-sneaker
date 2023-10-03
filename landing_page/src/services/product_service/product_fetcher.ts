import { BASE_API_URL } from "@/utils/constants";
import axios, {  } from "axios";
import {errorMiddleware, requestMiddleware, responseMiddleware} from '@/services/middleware/processing';
import _ from "lodash";

const productFetcher = axios.create({
    baseURL: BASE_API_URL + '/sneakers/detail',
});

productFetcher.interceptors.request.use(requestMiddleware);
productFetcher.interceptors.response.use(responseMiddleware, errorMiddleware);

export { productFetcher };
