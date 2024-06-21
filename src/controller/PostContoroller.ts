import express from 'express'
import { Request, Response, NextFunction } from 'express'
import { authAdmin, verifyToken } from 'src/authMiddleware/auth'
import { PostService } from 'src/service/PostService'
import { formatPostResponse } from 'src/utils/responseUtils/formatPostResponse'

export const PostContoroller = express.Router()

PostContoroller.post(
  '/',
  verifyToken,
  authAdmin,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { post } = req.body
      const userId = req.userId
      const newPost = await PostService.createPost(post, userId!)
      res.json({ post: formatPostResponse(newPost) })
    } catch (error) {
      next(error)
    }
  }
)
