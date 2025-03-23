<template>
  <div>
    <h1 class="text-4xl font-bold text-center mt-12">News Page</h1>
    <ul>
      <li v-for="newsItem in news" :key="newsItem.id">
        {{ newsItem.title }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';

export default defineComponent({
  name: 'NewsPage',
  data() {
    return {
      // `news` değişkenini tipliyoruz
      news: [] as Array<{ id: number; title: string }>, // Tip tanımlaması burada
    };
  },
  mounted() {
    // Backend API'sinden veri çekiyoruz
    axios
      .get('http://localhost:4000/news') // backend API endpoint
      .then((response) => {
        this.news = response.data; // `news`'ü doğru şekilde güncelliyoruz
      })
      .catch((error) => {
        console.error('Error fetching news data:', error);
      });
  },
});
</script>

<style scoped>
/* CSS stillerini burada ekleyebilirsiniz */
</style>
