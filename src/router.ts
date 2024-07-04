import express from 'express'
import { PostController } from './controller/PostController'
import { UserController } from './controller/UserController'
import { AuthController } from './controller/AuthController'
import { MessageController } from './controller/MessageController'
import { RoomController } from './controller/RoomController'

const router = express.Router()

router.use('/posts', PostController)
router.use('/account', UserController)
router.use('/auth', AuthController)
router.use('/messages', MessageController)
router.use('/rooms', RoomController)

export default router
