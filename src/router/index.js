import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home'),
    meta: { requiresAuth: true, requiresAdmin: false }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login'),
    meta: { requiresAuth: false, requiresAdmin: false }
  },
  {
    path: '/days',
    name: 'Days',
    component: () => import('@/views/Days'),
    meta: { requiresAuth: true, requiresAdmin: false }
  },
  {
    path: '/clients',
    name: 'Clients',
    component: () => import('@/views/Clients'),
    meta: { requiresAuth: true, requiresAdmin: false }
  },
  {
    path: '/client/:id',
    name: 'ClientsPurchases',
    component: () => import('@/views/ClientPurchases'),
    meta: { requiresAuth: true, requiresAdmin: false }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('@/views/Admin'),
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/history/:id',
    name: 'History',
    component: () => import('@/views/History'),
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/history/',
    redirect: '/history/1',
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/admin/:name',
    name: 'AdminItems',
    component: () => import('@/views/Admin'),
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/admin/user/:id',
    name: 'AdminUserEdit',
    component: () => import('@/views/AdminUserEdit'),
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/admin/employee/:id',
    name: 'EmployeeEdit',
    component: () => import('@/components/admin/EmployeeEdit'),
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/admin/bar-item/:id',
    name: 'BarEdit',
    component: () => import('@/components/admin/BarEdit'),
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/admin/program-item/:id',
    name: 'ProgramEdit',
    component: () => import('@/components/admin/ProgramEdit'),
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/expenses',
    name: 'Expenses',
    component: () => import('@/views/Expenses'),
    meta: { requiresAuth: true, requiresAdmin: false }
  },
  {
    path: '/categorize',
    name: 'Categorize',
    component: () => import('@/views/Categorize'),
    meta: { requiresAuth: true, requiresAdmin: false }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
