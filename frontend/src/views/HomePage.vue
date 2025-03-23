<template>
  <div>
    <h1 class="text-4xl font-bold text-center mt-12">
      Welcome to the Home Page
    </h1>
    <router-link to="/news" class="text-blue-500">Go to News Page</router-link>
  </div>
</template>

<script lang="ts">
export default {
  name: 'HomePage', // HomePage bileşeni
};
</script>
