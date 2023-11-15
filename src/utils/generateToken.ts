import jwt from 'jsonwebtoken';

export const generateToken = (userId: number) => {
  const payload = {
    sub: userId,
    privilege: 0,
    issuedAt: new Date().toISOString(),
  };
  
  const jwtSecret: string = process.env.JWT_SECRET || 'default-secret';
  return jwt.sign(payload, jwtSecret);
}
