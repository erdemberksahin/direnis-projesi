import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface DecodedToken {
  id: string;
  role: string;
}

interface CustomRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}

export const authMiddleware = (req: CustomRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.warn('❌ Authorization header eksik veya yanlış formatta');
    res.status(401).json({ message: 'Token bulunamadı' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    console.log('🔐 JWT_SECRET:', process.env.JWT_SECRET); // 💬 ENV kontrolü
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
    console.log('✅ Token decode edildi:', decoded); // 💬 Token içeriği

    req.user = { id: decoded.id, role: decoded.role };
    next();
  } catch (error) {
    console.error('🔥 JWT doğrulama hatası:', error); // 💬 Hata logu
    res.status(401).json({ message: 'Geçersiz token' });
  }
};
