import { Room } from 'src/entity/Room'
import { getMessages } from './getDataUtils/getMessageData'
import { getRoomUsers } from './getDataUtils/getRoomUsersData'
import { createError } from './errorUtils/createError'
import { RoomUser } from 'src/entity/RoomUser'

// レスポンスとして返すルームデータの取得
export const generateRoomInfo = async (room: Room) => {
  const [roomUsers, messages] = await Promise.all([
    getRoomUsers(room),
    getMessages(room),
  ])

  const roomUsersInfo = await generateRoomUsersInfo(roomUsers)

  return {
    id: room.id,
    messages,
    roomUsers: roomUsersInfo,
  }
}
// ルームユーザーデータの取得
export const generateRoomUsersInfo = async (roomUsers: RoomUser[]) => {
  const roomUsersInfo = roomUsers.map(roomUserData => {
    const { user, roomId } = roomUserData
    if (user == null) {
      throw createError('Failed to create roomUsers info', 422)
    }
    const { id, name, iconImageUrl } = user
    return {
      userId: id,
      roomId,
      user: {
        id,
        name,
        iconImageUrl,
      },
    }
  })
  return roomUsersInfo
}
