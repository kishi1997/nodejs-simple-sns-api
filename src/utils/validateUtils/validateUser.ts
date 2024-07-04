import { Post } from 'src/entity/Post'
import { createError } from '../errorUtils/createError'
import { RoomUser } from 'src/entity/RoomUser'

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
// ユーザーがルームの一員であるか確認
export const validateUserRoomMembership = async (
  roomId: string,
  userId: number
) => {
  await RoomUser.findOneOrFail({
    where: { roomId, userId },
  })
}
