import jwt from 'jsonwebtoken';
import { User } from 'src/entity/User';

export const generateToken = () => {
  const payload = {
    sub: User.name
    };
  const secretKey = 'user-secret-key';

  return jwt.sign(payload, secretKey);
}
