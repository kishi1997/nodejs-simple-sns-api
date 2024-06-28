import { Post } from 'src/entity/Post'
import { createError } from '../errorUtils/createError'

// ユーザーがポストの作成者であるか確認
export const validateUserPostOwnership = async (
  postId: number,
  userId: number
) => {
  const post = await Post.findOne({
    where: { id: postId, userId },
  })
  if (post == null) {
    throw createError('You do not have permission to access post', 404)
  }
}
