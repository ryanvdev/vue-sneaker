import * as VueRouter from 'vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '@/pages/HomePage.vue';
import HomeLayout from '@/layouts/HomeLayout.vue';
import NotFoundPage from '@/pages/NotFoundPage.vue';
import TestPage from '@/pages/TestPage.vue';
import ProductPage from '@/pages/ProductPage.vue';
import CartPage from './pages/CartPage.vue';
import { WEB_NAME } from './utils/constants';

const basePaths = Object.freeze({
    root: '/',
    cart: '/cart',
    sneaker: '/sneaker',
} satisfies IndexSignature<string>);

const routes = Object.freeze<RouteRecordRaw[]>([
    {
        name: 'root',
        path: basePaths.root,
        component: HomeLayout,
        children: [
            {
                name: WEB_NAME,
                path: '/',
                component: HomePage,
            },
            {
                name: 'Sneaker',
                path: basePaths.sneaker + '/:slug([a-z0-9-]+)',
                component: ProductPage,
            },
            {
                name: `Cart - ${WEB_NAME}`,
                path: basePaths.cart,
                component: CartPage,
            },
        ],
    },
    {
        name: 'Test',
        path: '/test',
        component: TestPage,
    },
    {
        name: 'Not Found',
        path: '/:pathMatch(.*)*',
        component: NotFoundPage,
    },
]);

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes: routes,
    scrollBehavior() {
        return {
            top: 0,
        };
    },
});

export { basePaths, router };
