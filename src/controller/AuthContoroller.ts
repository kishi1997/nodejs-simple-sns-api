import express from 'express'
import { Request, Response, NextFunction } from 'express'
import { AuthService } from '../service/AuthService'
import { formatUserResponse } from 'src/utils/responseUtils/formatUserResponse'

export const AuthContoroller = express.Router()

AuthContoroller.post(
  '/',
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { email, password } = req.body
      const userData = await AuthService.signIn(email, password)
      const { user, token } = userData
      const formattedUserData = formatUserResponse(user)

      res.json({
        user: formattedUserData,
        token: token,
      })
    } catch (error) {
      next(error)
    }
  }
)
