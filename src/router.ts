import express from 'express';
import { PostContoroller } from './controller/PostContoroller';
import { UserContoroller } from './controller/UserContoroller';
import { AuthContoroller } from './controller/AuthContoroller';

const router = express.Router();

router.use('/posts', PostContoroller);
router.use('/account', UserContoroller);
router.use('/auth', AuthContoroller);

export default router;
