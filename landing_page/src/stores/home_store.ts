import { defineStore } from 'pinia';
import * as HomeService from '@/services/home_service';
import type {Sneaker} from '@/types/sneaker';

export interface HomeStoreState{
    suggestions: Sneaker[],
}

export const useHomeStore = defineStore('home', {
    state: ():HomeStoreState => ({
        suggestions: [],
    }),
    actions: {
        async fetchSuggestions() {
            if(this.suggestions.length > 0) return;
            this.suggestions = await HomeService.fetchSuggestions();
        }
    }
});