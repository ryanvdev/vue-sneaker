import { BASE_API_URL } from '@/utils/constants';
import axios from 'axios';
import {
    errorMiddleware,
    requestMiddleware,
    responseMiddleware,
} from '@/services/middleware/processing';
import _ from 'lodash';

const cartFetcher = axios.create({
    baseURL: BASE_API_URL + '/cart',
});

cartFetcher.interceptors.request.use(requestMiddleware);
cartFetcher.interceptors.response.use(responseMiddleware, errorMiddleware);
