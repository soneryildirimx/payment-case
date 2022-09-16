

import type { RouteRecordRaw } from 'vue-router';
import type { App } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/product-list'
    },
    {
        path: '/product-list',
        name: 'List',
        component: () => import('@/views/List.vue'),
    },
    {
        path: '/basket',
        name: 'Basket',
        component: () => import('@/views/Basket.vue'),
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

// can set some router hooks here
export function useRouter(app: App<Element>) {
    app.use(router);
}

export default router;