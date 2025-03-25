import { Request, Response } from 'express'
import prisma from '../../prisma/client'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

interface AuthRequest extends Request {
  user?: any
}

export const register = async (req: Request, res: Response) => {
  const { email, password, name } = req.body

  if (!email || !password || !name) {
    return res.status(400).json({ message: 'Eksik alanlar var' })
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      return res.status(400).json({ message: 'Bu e-posta zaten kayıtlı' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await prisma.user.create({
      data: {
        email,
        password_hash: hashedPassword,
        role: 'user',
      }
    })

    // ✅ JWT'ye role bilgisi eklendi
    const token = jwt.sign(
      { id: newUser.id, role: newUser.role },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    )

    res.status(201).json({ token })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Kayıt işlemi sırasında bir hata oluştu' })
  }
}

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ message: 'Email ve şifre zorunludur' })
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } })

    if (!user) {
      return res.status(400).json({ message: 'Geçersiz giriş bilgileri' })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash)

    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Geçersiz giriş bilgileri' })
    }

    // ✅ JWT'ye role bilgisi eklendi
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    )

    res.status(200).json({ token })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Giriş işlemi sırasında bir hata oluştu' })
  }
}

export const me = async (req: Request, res: Response) => {
  const user = (req as AuthRequest).user

  if (!user) {
    return res.status(401).json({ message: 'Yetkisiz erişim' })
  }

  try {
    const foundUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: { id: true, email: true, role: true, created_at: true }
    })

    if (!foundUser) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı' })
    }

    res.status(200).json(foundUser)
  } catch (error) {
    res.status(500).json({ message: 'Profil bilgisi alınamadı' })
  }
}
