<template>
  <div class="min-h-screen flex items-center justify-center">
    <form @submit.prevent="handleLogin" class="bg-white p-6 rounded shadow w-full max-w-sm space-y-4">
      <h1 class="text-xl font-bold text-center">Giriş Yap</h1>
      <input v-model="email" type="email" placeholder="E-posta" class="input" required />
      <input v-model="password" type="password" placeholder="Şifre" class="input" required />
      <button class="btn w-full">Giriş</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/store/auth'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const store = useAuthStore()
const router = useRouter()

const handleLogin = async () => {
  try {
    await store.login(email.value, password.value)
    router.push('/dashboard')
  } catch (err) {
    alert('Giriş başarısız')
  }
}
</script>

<style scoped>
.input {
  @apply border rounded px-3 py-2 w-full;
}
.btn {
  @apply bg-black text-white py-2 rounded hover:bg-gray-800;
}
</style>
