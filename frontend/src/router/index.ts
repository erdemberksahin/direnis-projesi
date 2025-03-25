import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/store/auth'

const routes = [
  { path: '/', component: () => import('@/pages/Login.vue') },
  { path: '/dashboard', component: () => import('@/pages/Login.vue'), meta: { requiresAuth: true } }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const store = useAuthStore()
  if (to.meta.requiresAuth && !store.token) {
    next('/')
  } else {
    next()
  }
})

export default router
