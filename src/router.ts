import express from 'express';
import { PostContoroller } from './controller/PostContoroller';
import { UserContoroller } from './controller/UserContoroller';
import { AuthContoroller } from './controller/AuthContoroller';
import { MessageContoroller } from './controller/MessageContoroller';
import { RoomController } from './controller/RoomContorller';

const router = express.Router();

router.use('/posts', PostContoroller);
router.use('/account', UserContoroller);
router.use('/auth', AuthContoroller);
router.use('/messages', MessageContoroller);
router.use('/rooms', RoomController);

export default router;
