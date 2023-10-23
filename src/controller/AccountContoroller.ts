import * as express from 'express';
import { AccountService } from '../service/AccountService'
import { Token } from 'src/entity/Token';

export const AccountContoroller = express.Router();

AccountContoroller.post('/', async(req, res) => {
  try {
    const { name, email, password } = req.body;
    const newAccount = await AccountService.createAccount(name, email, password);
    res.json({ newAccount });
  } catch(error) {
    res.send(error);
  }
  });
