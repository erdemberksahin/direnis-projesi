import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './modules/auth/auth.routes' // 🟩 DOĞRU ROUTER İMPORTU
import needRoutes from './modules/needs/need.routes'
import newsRoutes from './modules/news/news.routes'
import boycottRoutes from './modules/boycotts/boycott.routes'


dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())

app.use('/auth', authRoutes) // 🟩 Router olarak ekliyoruz

app.get('/', (_req, res) => {
  res.send('✅ Direniş API çalışıyor!')
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`🚀 Server http://localhost:${PORT} üzerinde çalışıyor`)
})

app.use('/needs', needRoutes)

app.use('/news', newsRoutes)

app.use('/boycotts', boycottRoutes)
