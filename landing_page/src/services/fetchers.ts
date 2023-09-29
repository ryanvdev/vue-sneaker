import { useRootStore } from "@/stores/root_store";
import { BASE_API_URL } from "@/utils/constants";
import axios, { AxiosError } from "axios";
import _ from "lodash";

const requestsProcessing = new Set<string>();


const homeFetcher = axios.create({
    baseURL: BASE_API_URL + '/sneakers',
});

homeFetcher.interceptors.request.use(async (config) => {
    const requestId = _.uniqueId('axios');
    (config as any).__id = requestId;

    requestsProcessing.add(requestId);
    const rootStore = useRootStore();
    rootStore.setLoading(true);

    // await asyncSleep(3000);
    return config;
});

homeFetcher.interceptors.response.use((res) => {
    const requestId = (res.config as any).__id as string;
    requestsProcessing.delete(requestId);

    // if have't any requests processing
    if(requestsProcessing.size === 0){
        const rootStore = useRootStore();
        rootStore.setLoading(false);
    }

    return res;
}, (error) => {
    if(error instanceof AxiosError){
        console.log('Request error', (error.config as any).__id );
    }
    throw error;
});


export {homeFetcher};