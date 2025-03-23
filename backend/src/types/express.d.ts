// types/express.d.ts
import * as express from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: any; // Kullanıcı tipiniz varsa "any" yerine onu yazabilirsiniz.
    }
  }
}
