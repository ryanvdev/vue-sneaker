import { BASE_API_URL } from "@/utils/constants";
import axios, {  } from "axios";
import {errorMiddleware, requestMiddleware, responseMiddleware} from '@/services/middleware/processing';
import _ from "lodash";

const homeFetcher = axios.create({
    baseURL: BASE_API_URL + '/sneakers',
});

homeFetcher.interceptors.request.use(requestMiddleware);
homeFetcher.interceptors.response.use(responseMiddleware, errorMiddleware);

export {homeFetcher};