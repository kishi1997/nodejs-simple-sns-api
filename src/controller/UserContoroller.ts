import * as express from 'express';
import { UserService } from '../service/UserService'
import { validateEmail } from 'src/utils/validateUtils/validateEmail';

export const UserContoroller = express.Router();

UserContoroller.post('/', async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (password === null || password === undefined) {
      throw new Error('Invalid password.');
    }
    if (password.length === 0) {
      throw new Error('Password should not be empty');
    }
    if (password.length < 8) {
      throw new Error('Password should be at least 8 characters long.');
    }

    if (email === null || email === undefined || !email || !validateEmail(email)) {
      throw new Error('Invalid email.');
    }
    if (email.length === 0) {
      throw new Error('Email should not be empty');
    }

    if (name === null || name === undefined) {
      throw new Error('Invalid name.');
    }
    if (name.length === 0) {
      throw new Error('Name should not be empty.');
    }

    if (typeof password !== 'string' || typeof email !== 'string' || typeof name !== 'string') {
      throw new Error('Invalid user data types. Password, email, and name should be strings.');
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