import * as express from 'express';
import { UserService } from '../service/UserService'

export const UserContoroller = express.Router();

UserContoroller.post('/', async(req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await UserService.createUser(name, email, password);
    res.json({ newUser });
  } catch(error) {
    res.send(error);
  }
  });
