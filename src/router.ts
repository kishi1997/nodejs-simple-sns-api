import express from 'express';
import { postContoroller } from './controller/PostContoroller';

const router = express.Router();

router.use('/post', postContoroller);

export default router;
