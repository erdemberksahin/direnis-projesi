import { Request, Response } from 'express'
import prisma from '../../prisma/client'

// Geçici olarak req.user erişimi için AuthRequest interface'i tanımlıyoruz
interface AuthRequest extends Request {
  user?: any // İleride 'User' tipiyle değiştirilebilir
}

export const getNews = async (req: Request, res: Response) => {
  try {
    const news = await prisma.news.findMany()
    res.status(200).json(news)
  } catch (error) {
    res.status(500).json({ message: 'Haberler alınamadı', error })
  }
}

export const createNews = async (req: Request, res: Response) => {
  const { title, content, tag, lat, lng } = req.body
  const user = (req as AuthRequest).user

  if (!user) {
    return res.status(401).json({ message: 'Yetkisiz' })
  }

  try {
    const newNews = await prisma.news.create({
      data: {
        title,
        content,
        tag,
        lat,
        lng,
        created_by_id: user.id // 👈 doğru alan adı bu
      }
    })
    res.status(201).json(newNews)
  } catch (error) {
    res.status(500).json({ message: 'Haber oluşturulamadı', error })
  }
}
