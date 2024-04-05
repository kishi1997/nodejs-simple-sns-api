import { Room } from 'src/entity/Room'
import { User } from 'src/entity/User'
import { createError } from 'src/utils/errorUtils/createError'
import {
  getRoomRepository,
  getRoomUserRepository,
} from 'src/utils/getRepository'
import { validateNull } from 'src/utils/validateUtils/validateNull'

export class RoomService {
  static roomRepo = getRoomRepository()
  static roomUserRepo = getRoomUserRepository()

  static validateRoomData(roomUserId: number) {
    validateNull({ name: 'roomUsersId', value: roomUserId, status: 422 })
  }

  static async createRoom(roomUsersId: number[], userId: number) {
    roomUsersId.forEach(this.validateRoomData)
    const allUserIds = new Set([...roomUsersId, userId])
    const roomUsers = await Promise.all(
      Array.from(allUserIds).map(async userId => {
        const user = await User.findOne({ where: { id: userId } })
        if (user == null) {
          throw createError('User does not exist', 422)
        }
        return user
      })
    )
    const formattedUserIds = Array.from(allUserIds)
      .sort((a, b) => a - b)
      .join('-')
    const existingRoom = await Room.findOne({
      where: { usersId: formattedUserIds },
    })
    if (existingRoom !== null) {
      throw createError('Duplicate entry', 422)
    }
    const newRoom = RoomService.roomRepo.create({ usersId: formattedUserIds })
    await RoomService.roomRepo.save(newRoom)
    // ルームユーザーのデータの保存と取得
    const roomUsersInfo = await Promise.all(
      roomUsers.map(async roomUser => {
        const roomUserData = RoomService.roomUserRepo.create({
          userId: roomUser.id,
          roomId: newRoom.id,
        })
        await RoomService.roomUserRepo.save(roomUserData)
        return {
          userId: roomUserData.userId,
          roomId: roomUserData.roomId,
          user: {
            id: roomUser.id,
            name: roomUser.name,
            iconImageUrl: roomUser.iconImageUrl,
          },
        }
      })
    )
    const roomInfo = {
      id: newRoom.id,
      messages: [],
      roomUsers: roomUsersInfo,
    }
    return { roomInfo }
  }
}
