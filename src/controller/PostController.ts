import express from 'express'
import { Request, Response, NextFunction } from 'express'
import { authAdmin, verifyToken } from 'src/authMiddleware/auth'
import { Post } from 'src/entity/Post'
import { PostService } from 'src/service/PostService'
import { parsePaginationParams } from 'src/utils/paginationUtils'
import { formatPostResponse } from 'src/utils/responseUtils/formatPostResponse'
import { validateUserPostOwnership } from 'src/utils/validateUtils/validateUser'

export const PostController = express.Router()

PostController.post(
  '/',
  verifyToken,
  authAdmin,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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
PostController.get(
  '/',
  verifyToken,
  authAdmin,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const pagination = parsePaginationParams(req.query)
      const posts = await PostService.getPosts({
        pagination,
        filter: req.query.filter as any,
      })
      const formattedPostsData = posts.map((post: Post) => {
        return formatPostResponse(post)
      })
      res.json({ posts: formattedPostsData })
    } catch (error) {
      next(error)
    }
  }
)
PostController.get(
  '/:id',
  verifyToken,
  authAdmin,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const postId = parseInt(req.params.id)
      const post = await PostService.findPost(postId)
      res.json({ post: formatPostResponse(post) })
    } catch (error) {
      next(error)
    }
  }
)
PostController.delete(
  '/:id',
  verifyToken,
  authAdmin,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const postId = parseInt(req.params.id)
      const userId = req.userId
      await validateUserPostOwnership(postId, userId!)
      await PostService.deletePost(postId)
      res.json({ success: true })
    } catch (error) {
      next(error)
    }
  }
)
