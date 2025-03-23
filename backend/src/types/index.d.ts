// src/types/express.d.ts
import { User } from '../../entities/user.entity'; // doğru yolu verdiğinden emin ol, yoksa `any` kullan

declare global {
  namespace Express {
    interface Request {
      user?: any; // Gerekirse geçici olarak `any` kullan: user?: any;
    }
  }
}
