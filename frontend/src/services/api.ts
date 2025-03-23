import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:4000/api', // backend URL'ini buraya yaz
  headers: {
    'Content-Type': 'application/json',
  }
})

// JWT varsa header'a ekle
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api
