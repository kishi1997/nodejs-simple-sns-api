import * as express from 'express'
import { authAdmin, verifyToken } from 'src/authMiddleware/auth'
import { Post } from 'src/entity/Post'
import { PostService } from 'src/service/PostService'
import { createError } from 'src/utils/errorUtils/createError'
import { formatPostResponse } from 'src/utils/responseUtils/formatPostResponse'

export const PostContoroller = express.Router()

PostContoroller.post('/', verifyToken, authAdmin, async (req, res, next) => {
  try {
    const { post } = req.body
    const newPost = await PostService.createPost(post, (req as any).userId)
    res.json({ post: formatPostResponse(newPost) })
  } catch (error) {
    next(error)
  }
})
PostContoroller.get('/', verifyToken, authAdmin, async (req, res, next) => {
  try {
    const posts = await PostService.getPosts(req.query)
    const formattedPostsData = posts.map((post: Post) => {
      return formatPostResponse(post)
    })
    res.json({ posts: formattedPostsData })
  } catch (error) {
    next(error)
  }
})
PostContoroller.get('/:id', verifyToken, authAdmin, async (req, res, next) => {
  try {
    const postId = req.params.id
    const postIdNumber = parseInt(postId, 10)
    const post = await PostService.findPost(postIdNumber)
    res.json({ posts: formatPostResponse(post) })
  } catch (error) {
    next(error)
  }
})
PostContoroller.delete(
  '/:id',
  verifyToken,
  authAdmin,
  async (req, res, next) => {
    try {
      const postId = req.params.id
      const postIdNumber = parseInt(postId, 10)
      const result = await Post.delete({ id: postIdNumber })
      if (result.affected == null || result.affected === 0) {
        throw createError('Failed to delete post', 422)
      }
      res.json({ success: true })
    } catch (error) {
      next(error)
    }
  }
)
