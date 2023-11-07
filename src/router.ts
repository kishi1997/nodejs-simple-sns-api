import express from 'express';
import { PostContoroller } from './controller/PostContoroller';
import { UserContoroller } from './controller/UserContoroller';

const router = express.Router();

router.use('/posts', PostContoroller);
router.use('/account', UserContoroller);

export default router;
