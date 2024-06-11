import * as express from 'express'
import { UserService } from '../service/UserService'
import { formatUserResponse } from 'src/utils/responseUtils/formatUserResponse'
import multer from 'multer'
import path from 'node:path'
import { verifyToken, authAdmin } from 'src/authMiddleware/auth'

export const UserContoroller = express.Router()
const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, path.resolve(__dirname, '../uploads'))
  },
  filename(req, file, callback) {
    const uniqueSuffix = Math.random().toString(26).substring(4, 10)
    callback(null, `${Date.now()}-${uniqueSuffix}-${file.originalname}`)
  },
})
const upload = multer({
  storage,
  fileFilter(req, file, callback) {
    if (
      ['video/mp4', 'image/png', 'image/jpeg', 'audio/mpeg'].includes(
        file.mimetype
      )
    ) {
      callback(null, true)
      return
    }
    callback(new TypeError('Invalid File Type'))
  },
})

UserContoroller.get('/', verifyToken, authAdmin, async (req, res, next) => {
  try {
    const userData = await UserService.getAccount((req as any).userId)
    const formattedUserData = formatUserResponse(userData)

    res.json({
      user: formattedUserData,
    })
  } catch (error) {
    next(error)
  }
})
UserContoroller.post('/', async (req, res, next) => {
  try {
    const { name, email, password } = req.body
    const userData = await UserService.createUser(name, email, password)
    const { newUser, token } = userData
    const formattedUserData = formatUserResponse(newUser)

    res.json({
      user: formattedUserData,
      token: token,
    })
  } catch (error) {
    next(error)
  }
})
UserContoroller.patch(
  '/profile',
  verifyToken,
  authAdmin,
  async (req, res, next) => {
    try {
      const { name, email } = req.body
      const userData = await UserService.updateProfile(
        (req as any).userId,
        name,
        email
      )
      const formattedUserData = formatUserResponse(userData)

      res.json({
        user: formattedUserData,
      })
    } catch (error) {
      next(error)
    }
  }
)
UserContoroller.patch(
  '/icon_image',
  upload.single('file'),
  verifyToken,
  authAdmin,
  async (req, res, next) => {
    try {
      if (req.file == null) return
      const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${
        req.file.filename
      }`
      const userData = await UserService.updateProfile(
        (req as any).userId,
        undefined,
        undefined,
        fileUrl
      )
      const formattedUserData = formatUserResponse(userData)

      res.json({
        user: formattedUserData,
      })
    } catch (error) {
      next(error)
    }
  }
)
