import { BASE_API_URL } from "@/utils/constants";
import axios, {  } from "axios";
import {errorMiddleware, requestMiddleware, responseMiddleware} from '@/services/middleware/processing';
import _ from "lodash";

const appBarFetcher = axios.create({
    baseURL: BASE_API_URL + '/sneakers',
});

appBarFetcher.interceptors.request.use(requestMiddleware);
appBarFetcher.interceptors.response.use(responseMiddleware, errorMiddleware);

export {appBarFetcher};
