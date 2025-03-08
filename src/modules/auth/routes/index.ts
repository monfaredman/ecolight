import type { RouteRecordRaw } from 'vue-router'

const AuthRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/modules/auth/views/AuthView.vue'),
    meta: { guest: true },
  },
]

export default AuthRoutes
