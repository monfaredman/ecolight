export default [
  {
    path: '/users',
    name: 'users',
    children: [
      {
        path: 'register',
        name: 'register',
        component: () => import('@/modules/users/views/RegisterUser.vue'),
      },
      {
        path: 'role-assign',
        name: 'role-assign',
        component: () => import('@/modules/users/views/RoleAssign.vue'),
      },
      {
        path: 'list',
        name: 'list',
        component: () => import('@/modules/users/views/UsersList.vue'),
      },
    ],
  },
]
