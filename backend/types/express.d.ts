// types/express.d.ts
import express from 'express'
import { User } from '../src/entities/user.entity' // gerekirse any yap

declare global {
  namespace Express {
    interface Request {
      user?: User // veya: any
    }
  }
}

// Bu satır kritik! Dosyayı global modül olarak bırakıyoruz.
export {}
