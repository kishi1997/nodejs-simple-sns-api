import * as express from 'express';
import { UserService } from '../service/UserService'

export const UserContoroller = express.Router();

UserContoroller.post('/', async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!password) {
      throw new Error('password should not be empty');
    }
    if(password.length < 8) {
      throw new Error('Password is too short.')
    }
    if (!email) {
      throw new Error('email should not be empty')
    }
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      throw new Error('email must be an email')
    }
    if (!name) {
      throw new Error('name should not be empty')
    }
    const newUser = await UserService.createUser(name, email, password);
    res.json({
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        iconImageUrl: newUser.iconImageUrl,
      },
      token: newUser.token?.token,
    })
  } catch (error) {
    next(error)
  }
});