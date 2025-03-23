import { Router } from 'express'
import { createNeed, getNeeds } from './need.controller'
import { authMiddleware } from '../../middleware/authMiddleware'

const router = Router()

// ✅ Kayıtlı kullanıcılar yeni ihtiyaç oluşturabilir
router.post('/', authMiddleware, createNeed)

// 🌍 Herkes tüm ihtiyaçları görebilir
router.get('/', getNeeds)

export default router
