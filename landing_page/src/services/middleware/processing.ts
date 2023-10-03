import type {InternalAxiosRequestConfig, AxiosResponse} from 'axios';

import {AxiosError} from 'axios';
import _ from 'lodash';

import { useRootStore } from '@/stores/root_store';



const MIDDLEWARE_KEY = 'processing';



export const requestMiddleware = async (config:InternalAxiosRequestConfig) => {
    const requestId = _.uniqueId(MIDDLEWARE_KEY);
    (config as any).__id = requestId;

    const rootStore = useRootStore();
    rootStore.addRequest(requestId, config.url||'');
    return config;
};


export const responseMiddleware = (res:AxiosResponse) => {
    const requestId = (res.config as any).__id as string;

    const rootStore = useRootStore();
    rootStore.removeRequest(requestId, 'succeed');
    return res;
};

export const errorMiddleware = (error:unknown) => {
    if(error instanceof AxiosError){
        const requestId = (error.config as any)?.__id as string;
        
        const rootStore = useRootStore();
        rootStore.removeRequest(requestId, 'succeed');
        console.error('Request error', (error.config as any).__id );
    }
    throw error;
};
