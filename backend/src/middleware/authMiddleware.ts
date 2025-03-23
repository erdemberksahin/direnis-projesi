import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Genişletilmiş Request Tipi
interface DecodedToken {
  id: string;
  role: string;
}

interface CustomRequest extends Request {
  user?: {   // req.user'ı burada tanımlıyoruz
    id: string;
    role: string;
  };
}

export const authMiddleware = (req: CustomRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Token bulunamadı' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
    req.user = { id: decoded.id, role: decoded.role };  // req.user'ı burada ekliyoruz
    next();
  } catch (error) {
    res.status(401).json({ message: 'Geçersiz token' });
  }
};
