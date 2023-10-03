import * as VueRouter from 'vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '@/pages/HomePage.vue';
import HomeLayout from '@/layouts/HomeLayout.vue';
import NotFoundPage from '@/pages/NotFoundPage.vue';
import TestPage from '@/pages/TestPage.vue';
import ProductPage from '@/pages/ProductPage.vue';

const basePaths = Object.freeze({
    sneaker: '/sneaker'
} satisfies IndexSignature<string>);

const routes = Object.freeze<RouteRecordRaw[]>([
    {
        name: 'Home',
        path: '/',
        component: HomeLayout,
        children: [
            {
                name: 'Home Page',
                path: '/',
                component: HomePage,
            },
            {
                name: 'Sneaker',
                path: basePaths.sneaker + '/:slug([a-z0-9-]+)',
                component: ProductPage,
            }
        ]
    },
    {
        name: 'Test',
        path: '/test',
        component: TestPage
    },
    {
        name: 'Not Found',
        path: '/:pathMatch(.*)*',
        component: NotFoundPage,
    }
]);

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes: routes,
    scrollBehavior() {
        return {
            top: 0
        }
    }
});

export {basePaths, router}
