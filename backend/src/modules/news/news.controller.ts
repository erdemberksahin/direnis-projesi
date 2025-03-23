import { Request, Response } from 'express'
import prisma from '../../prisma/client'

export const createNews = async (req: Request, res: Response): Promise<void> => {
  const { tag, content, lat, lng } = req.body
  const user = req.user

  if (!user) {
    res.status(401).json({ message: 'Yetkisiz erişim' })
    return
  }

  try {
    const news = await prisma.news.create({
      data: {
        tag,
        content,
        lat,
        lng,
        created_by_id: user.id
      }
    })

    res.status(201).json(news)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Haber oluşturulamadı' })
  }
}

export const getNews = async (_req: Request, res: Response): Promise<void> => {
  try {
    const newsList = await prisma.news.findMany({
      orderBy: { created_at: 'desc' },
      take: 100
    })
    res.json(newsList)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Haberler getirilemedi' })
  }
}
