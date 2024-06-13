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
    const newPostData = await Post.findOneOrFail({
      where: { id: newPost.id },
      relations: ['user'],
    })
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
    // 初期値のあるデータを指定
    let query = Post.createQueryBuilder('post')
      .leftJoinAndSelect('post.user', 'user')
      .orderBy('post.id', order)
      .limit(size)
    // undefined許容のデータをundefinedではない場合のみ指定
    if (userId !== undefined) {
      query = query.where('post.userId = :userId', { userId })
    }
    if (cursor !== undefined) {
      query = query.andWhere('post.id ' + comparison + ' :cursor', { cursor })
    }
    // 条件に一致するpostを取得
    const posts = await query.getMany()
    return posts
  }
}
