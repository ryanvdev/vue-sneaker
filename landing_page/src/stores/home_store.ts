import type { Sneaker } from '@/types/sneaker';

import { defineStore } from 'pinia';
import HomeService from '@/services/home_service';

export interface HomeStoreState {
    suggestions: Sneaker[];
}

export const useHomeStore = defineStore('home', {
    state: (): HomeStoreState => ({
        suggestions: [],
    }),
    actions: {
        async fetchSuggestions() {
            if (this.suggestions.length > 0) return;
            this.suggestions = await HomeService.fetchSuggestions();
        },
    },
});
