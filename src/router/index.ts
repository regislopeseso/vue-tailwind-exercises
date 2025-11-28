// This is the /src/router/index.ts file.
import { createRouter, createWebHistory } from 'vue-router';
import PricingView from '../views/PricingView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'pricing',
      component: PricingView,
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: () => import('../views/CheckoutView.vue'),
      meta: { hideNavbar: true },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notfound',
      component: () => import('../views/NotFoundView.vue'),
    },
  ],
});

export default router;
