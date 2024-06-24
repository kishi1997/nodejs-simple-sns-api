import { validateEmpty } from 'src/utils/validateUtils/validateEmpty'
import { getPostRepository } from '../utils/getRepository'
import { validateNull } from 'src/utils/validateUtils/validateNull'
import { Post } from 'src/entity/Post'
import { PaginationParams } from 'src/types/paginationParams.type'
import { applyPagination } from 'src/utils/paginationUtils'
import { createError } from 'src/utils/errorUtils/createError'

type FilterParams = {
  userId?: number
}
type GetPostsParams = {
  pagination?: PaginationParams
  filter?: FilterParams
}

export class PostService {
  static postRepo = getPostRepository()

  static validatePostData(body: string) {
    validateNull({ name: 'Post', value: body, status: 422 })
    validateEmpty({ name: 'Post', value: body.trim(), status: 422 })
  }

  static async createPost(post: Post, userId: number): Promise<Post> {
    if (post.body !== undefined) {
      this.validatePostData(post.body)
    }
    const newPost = PostService.postRepo.create({ body: post.body, userId })
    await PostService.postRepo.save(newPost)
    const newPostData = await Post.findOneOrFail({
      where: { id: newPost.id },
      relations: ['user'],
    })
    return newPostData
  }
  static async getPosts(params: GetPostsParams): Promise<Post[]> {
    const { pagination = {}, filter: { userId } = {} } = params

    let query = Post.createQueryBuilder('post').leftJoinAndSelect(
      'post.user',
      'user'
    )

    if (userId !== undefined) {
      query = query.where('post.userId = :userId', { userId })
    }

    // ページネーションを適用
    query = applyPagination(query, pagination)

    const posts = await query.getMany()
    return posts
  }
  static async findPost(postId: number): Promise<Post> {
    const post = await Post.findOne({
      where: { id: postId },
      relations: ['user'],
    })
    if (post == null) {
      throw createError('Post does not exist', 404)
    }
    return post
  }
  static async deletePost(postId: number, userId: number): Promise<void> {
    const post = await this.postRepo.findOne({
      where: { id: postId, userId },
    })
    if (post == null) {
      throw createError(
        'Post does not exist or you do not have permission to access post',
        404
      )
    }
    await Post.delete({ id: postId })
    return
  }
}
