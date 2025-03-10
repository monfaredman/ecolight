import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import { authGuard } from './guards'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
    },
    {
      path: '/',
      component: () =>
        import(
          /* webpackPrefetch: true, webpackChunkName: "home" */ '@/components/layout/AppLayout.vue'
        ),
      children: [
        {
          path: 'dashboard',
          name: 'dashboard',
          component: () =>
            import(
              /* webpackPrefetch: true, webpackChunkName: "home" */ '@/views/HomeView.vue'
            ),
          meta: {
            id: 1,
            title: 'داشبورد',
          },
        },
        ...routes,
      ],
    },
    {
      name: 'login',
      path: '/login',

      component: () =>
        import(
          /* webpackPrefetch: true, webpackChunkName: "login" */ '@/modules/auth/views/Login.vue'
        ),
      meta: {
        id: 1,
        title: 'ورود',
      },
    },
    {
      name: 'forgot-password',
      path: '/forgot-password',

      component: () =>
        import(
          /* webpackPrefetch: true, webpackChunkName: "login" */ '../modules/auth/views/ForgotPassword.vue'
        ),
      meta: {
        id: 1,
        title: 'فراموشی رمز عبور',
      },
    },
  ],
})

router.beforeEach(authGuard)

export default router
