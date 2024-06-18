import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { createError } from 'src/utils/errorUtils/createError'
declare module 'express' {
  interface Request {
    userPrivilege?: number
    userId?: number
  }
}

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header('authorization')?.split(' ')[1]
  const jwtSecret: string = process.env.JWT_SECRET || 'default-secret'

  if (token == null) {
    throw createError('unauthorized user', 401)
  }
  try {
    const decodedToken = jwt.verify(token, jwtSecret) as {
      sub: string
      privilege: number
    }
    const userId = decodedToken.sub
    req.userPrivilege = decodedToken.privilege
    req.userId = parseInt(userId, 10)
    next()
  } catch (error) {
    throw createError('unauthorized user', 401)
  }
}

export const authAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.userPrivilege !== 0) return res.send('access is not permitted.')
  next()
}
