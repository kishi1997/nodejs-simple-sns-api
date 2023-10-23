import express from 'express';
import { PostContoroller } from './controller/PostContoroller';
import { AccountContoroller } from './controller/AccountContoroller';

const router = express.Router();

router.use('/posts', PostContoroller);
router.use('/account', AccountContoroller);

export default router;
