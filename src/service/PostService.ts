import { validateEmpty } from 'src/utils/validateUtils/validateEmpty'
import { getPostRepository } from '../utils/getRepository'
import { validateNull } from 'src/utils/validateUtils/validateNull'
import { Post } from 'src/entity/Post'

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
}
