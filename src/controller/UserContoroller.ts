import express from 'express'
import { UserService } from '../service/UserService'
import { formatUserResponse } from 'src/utils/responseUtils/formatUserResponse'
import { verifyToken, authAdmin } from 'src/authMiddleware/auth'
import { Request, Response, NextFunction } from 'express'

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
