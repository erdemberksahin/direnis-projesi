import { defineStore } from 'pinia'
import axios from '@/services/axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token'),
    user: null as null | { id: number, name: string, email: string }
  }),

  actions: {
    async login(email: string, password: string) {
      const res = await axios.post('/auth/login', { email, password })
      this.token = res.data.token
      localStorage.setItem('token', this.token)
      await this.fetchMe()
    },

    async fetchMe() {
      const res = await axios.get('/auth/me')
      this.user = res.data
    },

    logout() {
      this.token = null
      this.user = null
      localStorage.removeItem('token')
    }
  }
})
