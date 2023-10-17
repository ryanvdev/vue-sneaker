import { BASE_API_URL } from '@/utils/constants';
import axios from 'axios';
import {
    errorMiddleware,
    requestMiddleware,
    responseMiddleware,
} from '@/services/middleware/processing';
import _ from 'lodash';

const productsFetcher = axios.create({
    baseURL: BASE_API_URL + '/sneakers',
});

productsFetcher.interceptors.request.use(requestMiddleware);
productsFetcher.interceptors.response.use(responseMiddleware, errorMiddleware);

export { productsFetcher };
