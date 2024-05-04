import { createError } from '../errorUtils/createError'
import { RoomUser } from 'src/entity/RoomUser'
import { formatUserResponseWithoutEmail } from '../responseUtils/formatUserResponse'

// ルーム作成時に返すルームユーザーデータを取得及び整形
export const generateResponseRoomUsersInfo = async (roomUsers: RoomUser[]) => {
  const roomUsersInfo = roomUsers.map(roomUserData => {
    const { user, roomId } = roomUserData
    if (user == null) {
      throw createError('Failed to create roomUsers info', 422)
    }
    const formatUserResponse = formatUserResponseWithoutEmail(user)
    return {
      userId: user.id,
      roomId,
      user: formatUserResponse,
    }
  })
  return roomUsersInfo
}
