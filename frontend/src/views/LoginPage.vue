<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 class="text-2xl font-bold mb-6 text-center">Giriş Yap</h1>

      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2">Email</label>
        <input
          v-model="email"
          type="email"
          class="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>

      <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2">Şifre</label>
        <input
          v-model="password"
          type="password"
          class="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>

      <button
        @click="handleLogin"
        class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Giriş Yap
      </button>

      <p class="text-center text-sm text-gray-600 mt-4">
        Hesabın yok mu?
        <router-link to="/register" class="text-blue-500 hover:underline">Kayıt Ol</router-link>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/services/api'

const router = useRouter()
const email = ref('')
const password = ref('')

const handleLogin = async () => {
  try {
    const res = await api.post('/auth/login', { email: email.value, password: password.value })
    localStorage.setItem('token', res.data.token)
    router.push('/')
  } catch (err) {
    alert('Giriş başarısız.')
  }
}
</script>
