import { defineStore } from 'pinia';


export interface RootStoreState{
    isLoading: boolean;
}

export const useRootStore = defineStore('root', {
    state: ():RootStoreState => ({
        isLoading: false,
    }),
    actions: {
        setLoading(v:boolean){
            if(v !== this.isLoading){
                this.isLoading = v;
            }
        }
    }
});