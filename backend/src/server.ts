import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

// ✅ Sadece doğru olanı import ediyoruz
import authRoutes from './modules/auth/auth.routes'
import needRoutes from './modules/needs/need.routes'
import newsRoutes from './modules/news/news.routes'
import boycottRoutes from './modules/boycotts/boycott.routes'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

// ✅ API route'larımız
app.use('/api/auth', authRoutes)
app.use('/api/needs', needRoutes)
app.use('/api/news', newsRoutes)
app.use('/api/boycotts', boycottRoutes)

// Test route
app.get('/', (_req, res) => {
  res.send('✅ Direniş API çalışıyor!')
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`🚀 Server http://localhost:${PORT} üzerinde çalışıyor`)
})
