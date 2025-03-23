import { createRouter, createWebHistory } from 'vue-router';

// Sayfalarınızı import edin
import HomePage from '@/views/HomePage.vue';
import NewsPage from '@/views/NewsPage.vue';
import AboutPage from '@/views/AboutPage.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/news',
    name: 'News',
    component: NewsPage,
  },
  {
    path: '/about',
    name: 'About',
    component: AboutPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
