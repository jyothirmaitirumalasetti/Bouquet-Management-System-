import { createRouter, createWebHistory } from 'vue-router';
import ProductList from '../components/ProductList.vue';
import AdminPanel from '../components/AdminPanel.vue';
import OrderAdmin from '../components/OrderAdmin.vue';
import UserSignUp from '../components/UserSignUp.vue';
import UserLogin from '../components/UserLogin.vue';
import UserOrders from '../components/UserOrders.vue';
import ShoppingCart from '../components/ShoppingCart.vue';

const routes = [
  { path: '/', component: ProductList },
  { path: '/admin', component: AdminPanel, meta: { requiresAuth: true, requiresAdmin: true } },
  { path: '/admin/orders', component: OrderAdmin, meta: { requiresAuth: true, requiresAdmin: true } },
  { path: '/signup', component: UserSignUp },
  { path: '/login', component: UserLogin },
  { path: '/orders', component: UserOrders, meta: { requiresAuth: true } },
  { path: '/cart', component: ShoppingCart, meta: { requiresAuth: true } }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Navigation guard for protected routes
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!token) {
      next('/login');
      return;
    }
  }

  if (to.matched.some(record => record.meta.requiresAdmin)) {
    if (!isAdmin) {
      next('/');
      return;
    }
  }

  next();
});

export default router;
