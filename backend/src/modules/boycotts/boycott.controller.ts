import { Request, Response } from 'express'
import prisma from '../../prisma/client'

export const createBoycott = async (req: Request, res: Response): Promise<void> => {
  const { name, reason, category, logo_url } = req.body
  const user = req.user

  if (!user || user.role !== 'admin') {
    res.status(403).json({ message: 'Yalnızca admin kullanıcılar boykot ekleyebilir' })
    return
  }

  try {
    const boycott = await prisma.boycott.create({
      data: {
        name,
        reason,
        category,
        logo_url,
        created_by_id: user.id
      }
    })

    res.status(201).json(boycott)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Boykot firması eklenemedi' })
  }
}

export const getBoycotts = async (_req: Request, res: Response): Promise<void> => {
  try {
    const boycotts = await prisma.boycott.findMany({
      orderBy: { created_at: 'desc' }
    })

    res.json(boycotts)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Boykotlar getirilemedi' })
  }
}
