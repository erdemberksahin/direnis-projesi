import { Request, Response } from 'express'
import prisma from '../../prisma/client'

// Genişletilmiş Request Tipi
interface CustomRequest extends Request {
  user?: {   // req.user'ı burada tanımlıyoruz
    id: string;
    role: string;
  };
}

export const createNeed = async (req: CustomRequest, res: Response): Promise<void> => {
  const { description, category, urgency, lat, lng } = req.body
  const user = req.user

  // Eğer user mevcut değilse, 401 hatası gönderiyoruz
  if (!user) {
    res.status(401).json({ message: 'Yetkisiz erişim' })
    return
  }

  try {
    // Yeni bir ihtiyaç oluşturuyoruz
    const need = await prisma.need.create({
      data: {
        description,
        category,
        urgency,
        lat,
        lng,
        created_by_id: user.id,  // Kullanıcı id'sini user'dan alıyoruz
      }
    })

    res.status(201).json(need)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'İhtiyaç oluşturulamadı' })
  }
}

export const getNeeds = async (_req: CustomRequest, res: Response): Promise<void> => {
  try {
    // İhtiyaçları veritabanından alıyoruz
    const needs = await prisma.need.findMany({
      orderBy: { created_at: 'desc' },
      take: 100 // sadece son 100 kaydı getiriyoruz
    })
    res.json(needs)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'İhtiyaçlar getirilemedi' })
  }
}
