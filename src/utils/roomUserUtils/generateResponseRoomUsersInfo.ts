import { formatUserResponseWithoutEmail } from '../responseUtils/formatUserResponse'
import { User } from 'src/entity/User'
import { Room } from 'src/entity/Room'

// ルーム作成時に返すルームユーザーデータを取得及び整形
export const generateResponseRoomUsersInfo = async (
  roomUsers: User[],
  newRoom: Room
) => {
  const roomUsersInfo = roomUsers.map(roomUserData => {
    const formatUserResponse = formatUserResponseWithoutEmail(roomUserData)
    return {
      userId: roomUserData.id,
      roomId: newRoom.id,
      user: formatUserResponse,
    }
  })
  return roomUsersInfo
}
