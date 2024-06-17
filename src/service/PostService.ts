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
    const {
      pagination: {
        cursor = undefined,
        isNext = true,
        size = 50,
        order = 'DESC',
      } = {},
      filter: { userId = undefined } = {},
    } = params
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
