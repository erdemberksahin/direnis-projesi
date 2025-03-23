// src/types/global.d.ts

import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: {   // req.user'ı burada tanımlıyoruz
        id: string;
        role: string;
      };
    }
  }
}
