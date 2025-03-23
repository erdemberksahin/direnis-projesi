import { Request, Response } from 'express'
import prisma from '../../prisma/client'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// ✅ Explicit return type: Promise<void>
export const register = async (req: Request, res: Response): Promise<void> => {
  const { email, password, role } = req.body

  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    res.status(400).json({ message: 'Bu e-posta zaten kayıtlı' })
    return
  }

  const password_hash = await bcrypt.hash(password, 10)
  const user = await prisma.user.create({
    data: {
      email,
      password_hash,
      role: role || 'volunteer'
    }
  })

  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: '1d' })
  res.status(201).json({ token, user: { id: user.id, email: user.email, role: user.role } })
}

// ✅ Explicit return type: Promise<void>
export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body

  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) {
    res.status(401).json({ message: 'Geçersiz e-posta veya şifre' })
    return
  }

  const valid = await bcrypt.compare(password, user.password_hash)
  if (!valid) {
    res.status(401).json({ message: 'Geçersiz e-posta veya şifre' })
    return
  }

  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: '1d' })
  res.json({ token, user: { id: user.id, email: user.email, role: user.role } })
}
