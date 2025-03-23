import { Router } from 'express'
import { createNews, getNews } from './news.controller'
import { authMiddleware } from '../../middleware/authMiddleware'

const router = Router()

// ✅ Yeni haber oluştur (JWT gerekli)
router.post('/', authMiddleware, createNews)

// 🌍 Haberleri listele (herkese açık)
router.get('/', getNews)

export default router
