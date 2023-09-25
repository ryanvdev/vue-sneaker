import * as VueRouter from 'vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '@/pages/HomePage.vue';
import NotFoundPage from '@/pages/NotFoundPage.vue';
import TestPage from '@/pages/TestPage.vue';

const routes = Object.freeze<RouteRecordRaw[]>([
  {
    name: 'Home',
    path: '/',
    component: HomePage,
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

export const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes: routes,
  scrollBehavior () {
    return {
      top: 0
    }
  }
});
