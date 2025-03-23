import { createApp } from 'vue';
import App from './App.vue';
import './assets/styles/tailwind.css'; // TailwindCSS'i import ettik
import { createRouter, createWebHistory } from 'vue-router';

// Sayfalar (Views)
import HomePage from './views/HomePage.vue';
import NewsPage from './views/NewsPage.vue';

// Vue Router yapılandırması
const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage, // Ana sayfa
  },
  {
    path: '/news',
    name: 'News',
    component: NewsPage, // Haberler sayfası
  },
];

// Vue Router'ı oluşturuyoruz
const router = createRouter({
  history: createWebHistory(), // Vue Router için web geçmişi
  routes, // rotalar
});

// Vue.js uygulamasını başlatıyoruz ve router'ı bağlıyoruz
createApp(App)
  .use(router) // Vue Router'ı uygulamaya dahil ediyoruz
  .mount('#app'); // Vue uygulamasını #app div'ine mount ediyoruz
