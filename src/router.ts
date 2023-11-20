import express from 'express';
import { PostContoroller } from './controller/PostContoroller';
import { UserContoroller } from './controller/UserContoroller';
import { AuthContoroller } from './controller/AuthContoroller';
import { MessageContoroller } from './controller/MessageContoroller';

const router = express.Router();

router.use('/posts', PostContoroller);
router.use('/account', UserContoroller);
router.use('/auth', AuthContoroller);
router.use('/messages', MessageContoroller);

export default router;
