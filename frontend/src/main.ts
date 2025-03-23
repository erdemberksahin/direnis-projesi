import { createApp } from 'vue'
import App from './App.vue'
import './assets/styles/tailwind.css'

import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './views/HomePage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('./views/RegisterPage.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('./views/LoginPage.vue') // 👈 burası eklendi
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

createApp(App)
  .use(router)
  .mount('#app')
