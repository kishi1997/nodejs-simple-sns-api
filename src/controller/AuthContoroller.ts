import * as express from 'express';
import { AuthService } from '../service/AuthService'

export const AuthContoroller = express.Router();

AuthContoroller.post('/', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userData = await AuthService.signIn(email, password);
    const { user, token } = userData;
    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        iconImageUrl: user.iconImageUrl,
      },
      token: token,
    })
  } catch (error) {
    next(error)
  }
});