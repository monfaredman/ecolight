export default [
  {
    path: '/',
    name: 'home',
    component: () => import('@/modules/auth/views/AuthView.vue'),
  },
]
