<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
      <div class="bg-white p-6 rounded-xl shadow-md w-full max-w-sm">
        <h2 class="text-2xl font-bold mb-4 text-center">Kayıt Ol</h2>
        <form @submit.prevent="handleRegister">
          <div class="mb-4">
            <label class="block text-sm font-medium mb-1">Ad Soyad</label>
            <input v-model="name" type="text" class="w-full border p-2 rounded" required />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium mb-1">Email</label>
            <input v-model="email" type="email" class="w-full border p-2 rounded" required />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium mb-1">Şifre</label>
            <input v-model="password" type="password" class="w-full border p-2 rounded" required />
          </div>
          <button type="submit" class="w-full bg-black text-white py-2 rounded hover:bg-gray-800">
            Kayıt Ol
          </button>
        </form>
        <p class="text-sm mt-4 text-center">
          Zaten hesabın var mı?
          <router-link to="/login" class="text-blue-600 hover:underline">Giriş Yap</router-link>
        </p>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import api from '@/services/api'
  
  const name = ref('')
  const email = ref('')
  const password = ref('')
  const router = useRouter()
  
  const handleRegister = async () => {
    try {
      await api.post('/auth/register', {
        name: name.value,
        email: email.value,
        password: password.value
      })
      alert('Kayıt başarılı! Şimdi giriş yapabilirsiniz.')
      router.push('/login')
    } catch (error: any) {
      alert('Kayıt başarısız: ' + (error.response?.data?.message || 'Bilinmeyen hata'))
    }
  }
  </script>
  