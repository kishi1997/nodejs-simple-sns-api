import { Room } from 'src/entity/Room'
import { createError } from 'src/utils/errorUtils/createError'
import {
  getRoomRepository,
  getRoomUserRepository,
} from 'src/utils/getRepository'
import { generateRoomInfo } from 'src/utils/roomUtils'
import { validateUser } from 'src/utils/validateUtils/validateUser'

export class RoomService {
  static roomRepo = getRoomRepository()
  static roomUserRepo = getRoomUserRepository()
  static async createRoom(roomUsersId: number[], userId: number) {
    // ユーザーが存在するか確認
    await Promise.all(
      roomUsersId.map(async userId => {
        validateUser(userId)
      })
    )
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
    // roomUserテーブルにuser登録
    await Promise.all(
      allUserIds.map(async userId => {
        const roomUser = this.roomUserRepo.create({
          userId: userId,
          roomId: newRoom.id,
        })
        await this.roomUserRepo.save(roomUser)
      })
    )
    return await generateRoomInfo(newRoom)
  }
}
