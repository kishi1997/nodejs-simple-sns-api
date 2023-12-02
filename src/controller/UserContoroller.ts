import * as express from 'express';
import { UserService } from '../service/UserService'
import { formatUserResponse } from 'src/utils/responseUtils/formatUserResponse';

export const UserContoroller = express.Router();

UserContoroller.post('/', async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const userData = await UserService.createUser(name, email, password);
    const { newUser, token } = userData;
    const formattedUserData = formatUserResponse(newUser);

    res.json({
      user: formattedUserData,
      token: token,
    })
  } catch (error) {
    next(error)
  }
});