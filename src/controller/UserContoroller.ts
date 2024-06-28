import express from 'express'
import { UserService } from '../service/UserService'
import { formatUserResponse } from 'src/utils/responseUtils/formatUserResponse'
import { verifyToken, authAdmin } from 'src/authMiddleware/auth'
import { Request, Response, NextFunction } from 'express'
import { upload } from 'src/utils/fileUtils'

export const UserContoroller = express.Router()
UserContoroller.get(
  '/',
  verifyToken,
  authAdmin,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData = await UserService.getAccount(req.userId!)
      res.json({
        user: formatUserResponse(userData),
      })
    } catch (error) {
      next(error)
    }
  }
)
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
  async (req, res, next): Promise<void> => {
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
  async (req, res, next): Promise<void> => {
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
