import * as express from 'express';
import { AuthService } from '../service/AuthService'
import { validateEmail } from 'src/utils/validateUtils/validateEmail';

export const AuthContoroller = express.Router();

AuthContoroller.post('/', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (password == null) {
      throw new Error('Invalid password.');
    }
    if (password.trim().length == 0) {
      throw new Error('Password should not be empty');
    }
    if (password.length < 8) {
      throw new Error('Password should be at least 8 characters long');
    }
    if (email == null || !validateEmail(email)) {
      throw new Error('Invalid email');
    }

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