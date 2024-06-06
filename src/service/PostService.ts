import { validateEmpty } from 'src/utils/validateUtils/validateEmpty'
import { getPostRepository } from '../utils/getRepository'
import { validateNull } from 'src/utils/validateUtils/validateNull'
import { Post } from 'src/entity/Post'
import { createError } from 'src/utils/errorUtils/createError'
import { FindParams } from 'src/types/params.type'

export class PostService {
  static postRepo = getPostRepository()

  static validatePostData(body: string) {
    validateNull({ name: 'Post', value: body, status: 422 })
    validateEmpty({ name: 'Post', value: body.trim(), status: 422 })
  }

  static async createPost(post: Post, userId: number) {
    if (post.body !== undefined) {
      this.validatePostData(post.body)
    }
    const newPost = PostService.postRepo.create({ body: post.body, userId })
    await PostService.postRepo.save(newPost)
    const newPostData = await Post.findOne({
      where: { id: newPost.id },
      relations: ['user'],
    })
    if (newPostData == null) {
      throw createError('New Post does not exist', 404)
    }
    return newPostData
  }
  static async getPosts(params: FindParams) {
    // cursor,isNext,sizeにはundefinedの場合、初期値を設定
    const cursor = params.pagination?.cursor
    const isNext: boolean =
      params.pagination?.isNext === undefined
        ? true
        : params.pagination?.isNext !== false
    const size = params.pagination?.size ? params.pagination?.size : 50
    const order = params.pagination?.order === 'ASC' ? 'ASC' : 'DESC'
    const userId = params.filter?.userId
    const comparison = isNext ? '<' : '>'
    let query = Post.createQueryBuilder('post')
      .leftJoinAndSelect('post.user', 'user')
      .orderBy('post.id', order)
      .limit(size)
    if (userId !== undefined) {
      query = query.where('post.userId = :userId', { userId })
    }
    if (cursor !== undefined) {
      query = query.andWhere('post.id ' + comparison + ' :cursor', { cursor })
    }
    const posts = await query.getMany()
    return posts
  }
  static async findPost(postId: number) {
    const post = await Post.findOne({
      where: { id: postId },
      relations: ['user'],
    })
    if (post == null) {
      throw createError('Post does not exist', 404)
    }
    return post
  }
  static async deletePost(postId: number, userId: number) {
    const post = await this.postRepo.findOne({ where: { id: postId, userId } })
    if (post == null) {
      throw createError('Failed to delete post', 404)
    }
    await Post.delete({ id: postId })
    return
  }
}
