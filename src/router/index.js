import { createRouter, createWebHashHistory } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

// Lazy-load views for performance and code-splitting
const ShowcaseView = () => import('../views/ShowcaseView.vue')
const HomeView = () => import('../views/customer/HomeView.vue')
const MenuView = () => import('../views/customer/MenuView.vue')
const ProductDetailView = () => import('../views/customer/ProductDetailView.vue')
const CartView = () => import('../views/customer/CartView.vue')
const CheckoutView = () => import('../views/customer/CheckoutView.vue')
const OrderSuccessView = () => import('../views/customer/OrderSuccessView.vue')

const AdminLoginView = () => import('../views/admin/AdminLoginView.vue')
const AdminLayout = () => import('../views/admin/AdminLayout.vue')
const DashboardView = () => import('../views/admin/DashboardView.vue')
const ProductsView = () => import('../views/admin/ProductsView.vue')
const OrdersView = () => import('../views/admin/OrdersView.vue')
const InventoryView = () => import('../views/admin/InventoryView.vue')
const SalesView = () => import('../views/admin/SalesView.vue')
const SettingsView = () => import('../views/admin/SettingsView.vue')
const NotFoundView = () => import('../views/NotFoundView.vue')

const routes = [
  // 1. Root Exhibition Showcase Entry Page
  {
    path: '/',
    name: 'showcase',
    component: ShowcaseView,
    meta: { title: 'Showcase' }
  },

  // 2. Customer Coffee Storefront
  {
    path: '/store',
    name: 'store',
    component: HomeView,
    meta: { layout: 'customer', title: 'Coffee Store' }
  },
  {
    path: '/menu',
    name: 'menu',
    component: MenuView,
    meta: { layout: 'customer', title: 'Our Menu' }
  },
  {
    path: '/menu/:id',
    name: 'product-detail',
    component: ProductDetailView,
    meta: { layout: 'customer', title: 'Product Details' }
  },
  {
    path: '/cart',
    name: 'cart',
    component: CartView,
    meta: { layout: 'customer', title: 'Shopping Cart' }
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: CheckoutView,
    meta: { layout: 'customer', title: 'Checkout' }
  },
  {
    path: '/order-success/:id',
    name: 'order-success',
    component: OrderSuccessView,
    meta: { layout: 'customer', title: 'Order Confirmed' }
  },

  // 3. Admin Management Portal
  {
    path: '/admin/login',
    name: 'admin-login',
    component: AdminLoginView,
    meta: { layout: 'admin-auth', title: 'Admin Login' }
  },
  {
    path: '/admin',
    component: AdminLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        redirect: '/admin/dashboard'
      },
      {
        path: 'dashboard',
        name: 'admin-dashboard',
        component: DashboardView,
        meta: { title: 'Dashboard' }
      },
      {
        path: 'products',
        name: 'admin-products',
        component: ProductsView,
        meta: { title: 'Products Management' }
      },
      {
        path: 'orders',
        name: 'admin-orders',
        component: OrdersView,
        meta: { title: 'Orders Management' }
      },
      {
        path: 'inventory',
        name: 'admin-inventory',
        component: InventoryView,
        meta: { title: 'Inventory Supplies' }
      },
      {
        path: 'sales',
        name: 'admin-sales',
        component: SalesView,
        meta: { title: 'Sales Analytics' }
      },
      {
        path: 'settings',
        name: 'admin-settings',
        component: SettingsView,
        meta: { title: 'Store Settings' }
      },
    ]
  },

  // 4. Fallback 404
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFoundView,
    meta: { title: 'Page Not Found' }
  }
]

// Deployment-safe routing strategy for static GitHub Pages hosting
const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0 }
  }
})

// Navigation guard for protected admin routes
router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.isLoggedIn) {
    next({ name: 'admin-login', query: { redirect: to.fullPath } })
  } else if (to.name === 'admin-login' && auth.isLoggedIn) {
    next({ name: 'admin-dashboard' })
  } else {
    next()
  }
})

export default router
