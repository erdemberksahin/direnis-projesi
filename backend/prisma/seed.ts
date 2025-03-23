import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  // Şifreleri hashle
  const passwordAdmin = await bcrypt.hash('admin123', 10)
  const passwordUser = await bcrypt.hash('user123', 10)

  // Admin kullanıcı oluştur
  const admin = await prisma.user.upsert({
    where: { email: 'admin@direnis.org' },
    update: {},
    create: {
      email: 'admin@direnis.org',
      password_hash: passwordAdmin,
      role: 'admin'
    }
  })

  // Gönüllü kullanıcı oluştur
  const user = await prisma.user.upsert({
    where: { email: 'user@direnis.org' },
    update: {},
    create: {
      email: 'user@direnis.org',
      password_hash: passwordUser,
      role: 'volunteer'
    }
  })

  // İhtiyaçlar
  await prisma.need.createMany({
    data: [
      {
        description: 'Suya acil ihtiyaç var',
        category: 'su',
        urgency: 'acil',
        lat: 41.015137,
        lng: 28.979530,
        created_by_id: user.id
      },
      {
        description: 'Battaniye gerekiyor',
        category: 'barınma',
        urgency: 'normal',
        lat: 41.0082,
        lng: 28.9784,
        created_by_id: user.id
      }
    ]
  })

  // Haberler
  await prisma.news.createMany({
    data: [
      {
        tag: 'polis',
        content: 'TOMA ilerliyor',
        lat: 41.015137,
        lng: 28.979530,
        created_by_id: admin.id
      },
      {
        tag: 'destek',
        content: 'Halk yiyecek dağıtıyor',
        lat: 41.0082,
        lng: 28.9784,
        created_by_id: user.id
      }
    ]
  })

  // Boykotlar
  await prisma.boycott.createMany({
    data: [
      {
        name: 'XYZ Market',
        reason: 'Polisle iş birliği yaptığı iddia ediliyor',
        category: 'market',
        logo_url: 'https://via.placeholder.com/100',
        created_by_id: admin.id
      },
      {
        name: 'ABC TV',
        reason: 'Haberleri sansürledi',
        category: 'medya',
        logo_url: 'https://via.placeholder.com/100',
        created_by_id: admin.id
      }
    ]
  })

  console.log('✅ Seed verileri başarıyla eklendi!')
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e)
    prisma.$disconnect()
    process.exit(1)
  })
