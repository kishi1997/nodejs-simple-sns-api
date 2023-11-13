import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

declare module 'express' {
  interface Request {
    userPrivilege?: number;
  }
}


export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    const jwtSecret: string = process.env.JWT_SECRET || 'default-secret';

    if (token == null) {
        throw new Error('unauthorized user');
    }
    try {
        const decodedToken = jwt.verify(token, jwtSecret);
        const userId = decodedToken.sub;
        (req as any).userPrivilege = (decodedToken as { privilege: number }).privilege;
        (req as any).userId = userId;
        next();
    } catch (error) {
        throw new Error('unauthorized user');
    }
};

export const authAdmin = (req: Request, res: Response, next: NextFunction) => {
    if (req.userPrivilege !== 0) return res.send('access is not permitted.')
    next();
}