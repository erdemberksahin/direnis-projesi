import { User } from '../src/entities/user.entity' // ya da geçici olarak any

declare global {
  namespace Express {
    interface Request {
      user?: User // veya: any
    }
  }
}

// BU SATIR ZORUNLU!
export {}
