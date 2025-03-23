import { Router } from 'express'
import { createBoycott, getBoycotts } from './boycott.controller'
import { authMiddleware } from '../../middleware/authMiddleware'

const router = Router()

// Sadece admin kullanıcı yeni boykot ekleyebilir
router.post('/', authMiddleware, createBoycott)

// Herkes tüm boykotları görebilir
router.get('/', getBoycotts)

export default router
