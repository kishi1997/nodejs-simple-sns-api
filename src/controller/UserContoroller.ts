import * as express from 'express';
import { UserService } from '../service/UserService'
import { validateEmail } from 'src/utils/validateUtils/validateEmail';

export const UserContoroller = express.Router();

UserContoroller.post('/', async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const userData = await UserService.createUser(name, email, password);
    const { newUser, token } = userData;

    res.json({
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        iconImageUrl: newUser.iconImageUrl,
      },
      token: token,
    })
  } catch (error) {
    next(error)
  }
});