import {
  getRoomRepository,
  getRoomUserRepository,
} from 'src/utils/getRepository'
import { Room } from 'src/entity/Room'
import { createError } from 'src/utils/errorUtils/createError'
export class RoomService {
  static roomRepo = getRoomRepository()
  static roomUserRepo = getRoomUserRepository()
  static async createRoom(roomUsersId: number[], userId: number) {
    const allUserIds = Array.from(new Set([...roomUsersId, userId]))
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
    const roomUserRegistrationData = allUserIds.map((userId: number) =>
      this.roomUserRepo.create({
        userId: userId,
        roomId: newRoom.id,
      })
    )
    await this.roomUserRepo.save(roomUserRegistrationData)
    const roomWithRelations = await Room.findOne({
      where: { id: newRoom.id },
      relations: ['messages', 'roomUsers', 'roomUsers.user'],
    })
    if (roomWithRelations == null) {
      throw createError('New room does not exist', 422)
    }
    return roomWithRelations
  }
}
