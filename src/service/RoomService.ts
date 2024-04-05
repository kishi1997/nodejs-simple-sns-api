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
  static async validateUser(userId: number) {
    const user = await User.findOne({ where: { id: userId } })
    if (user == null) {
      throw createError('User does not exist', 422)
    }
    return user
  }

  static async createRoom(roomUsersId: number[], userId: number) {
    roomUsersId.forEach(this.validateRoomData)
    const allUserIds: number[] = Array.from(new Set([...roomUsersId, userId]))
    const formattedUserIds = Array.from(allUserIds)
      .sort((a, b) => a - b)
      .join('-')
    const existingRoom = await Room.findOne({
      where: { usersId: formattedUserIds },
    })
    if (existingRoom !== null) {
      throw createError('Duplicate entry', 422)
    }
    const newRoom = this.roomRepo.create({ usersId: formattedUserIds })
    await this.roomRepo.save(newRoom)
    const roomUsersInfo = await getRoomUsersInfo(allUserIds, newRoom)
    const roomInfo = {
      id: newRoom.id,
      messages: [],
      roomUsers: roomUsersInfo,
    }
    return { roomInfo }
  }
}
// ルームユーザーのデータの保存と取得
async function getRoomUsersInfo(roomUsersId: number[], newRoom: Room) {
  return Promise.all(
    roomUsersId.map(async userId => {
      const user = await RoomService.validateUser(userId)
      const roomUserData = RoomService.roomUserRepo.create({
        userId: user.id,
        roomId: newRoom.id,
      })
      await RoomService.roomUserRepo.save(roomUserData)
      return {
        userId: roomUserData.userId,
        roomId: roomUserData.roomId,
        user: {
          id: user.id,
          name: user.name,
          iconImageUrl: user.iconImageUrl,
        },
      }
    })
  )
}
