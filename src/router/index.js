import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/views/ourStart/ourStart.vue')
    },
    {
      path: '/go',
      component: () => import('@/views/layout/layoutContent.vue'),
      redirect: '/introduce',
      children: [
        {
          path: '/style',
          component: () => import('@/views/ourStyle/ourStyle.vue')
        },
        {
          path: '/introduce',
          component: () => import('@/views/ourIntroduce/ourIntroduce.vue')
        },
        {
          path: '/project',
          component: () => import('@/views/ourProject/ourProject.vue')
        },
        {
          path: '/join',
          component: () => import('@/views/signUp/signUp.vue')
        }
      ]
    },
    {
      path: '/registration',
      component: () => import('@/views/registrationForm/registrationForm.vue')
    }
  ]
})

export default router
