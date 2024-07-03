import express from 'express'
import { UserService } from '../service/UserService'
import { formatUserResponse } from 'src/utils/responseUtils/formatUserResponse'
import { verifyToken, authAdmin } from 'src/authMiddleware/auth'
import { Request, Response, NextFunction } from 'express'
import { uploadFileToLocal } from 'src/utils/fileUtils'

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
UserContoroller.post(
  '/',
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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
  }
)
UserContoroller.patch(
  '/profile',
  verifyToken,
  authAdmin,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { name, email } = req.body
      const userData = await UserService.updateProfile({
        userId: req.userId!,
        name,
        email,
      })
      res.json({
        user: formatUserResponse(userData),
      })
    } catch (error) {
      next(error)
    }
  }
)
UserContoroller.patch(
  '/icon_image',
  verifyToken,
  authAdmin,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const fileUrl = await uploadFileToLocal(req, res, 'icon')
      const userData = await UserService.updateProfile({
        userId: req.userId!,
        url: fileUrl,
      })
      res.json({
        user: formatUserResponse(userData),
      })
    } catch (error) {
      next(error)
    }
  }
)
