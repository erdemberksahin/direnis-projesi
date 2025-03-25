import { Router } from 'express'
import { login, register, me } from './auth.controller'
import { authMiddleware } from '../../middleware/authMiddleware'

const router = Router()

router.post('/login', login)
router.post('/register', register)
router.get('/me', authMiddleware, me) // ✅ BU ÇOK ÖNEMLİ

export default router
