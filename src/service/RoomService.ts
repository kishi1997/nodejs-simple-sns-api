import {
  getRoomRepository,
  getRoomUserRepository,
} from 'src/utils/getRepository'
import { Room } from 'src/entity/Room'
import { createError } from 'src/utils/errorUtils/createError'
import { RoomUser } from 'src/entity/RoomUser'
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
      throw createError('New room does not exist', 404)
    }
    return roomWithRelations
  }
  static async getRooms(userId: number) {
    const roomUserData = await RoomUser.find({
      where: { userId },
    })
    const roomIds = roomUserData.map((data: RoomUser) => {
      return data.roomId
    })
    const rooms = await Room.createQueryBuilder('room')
      .leftJoinAndSelect('room.messages', 'message')
      .leftJoinAndSelect('room.roomUsers', 'roomUser')
      .leftJoinAndSelect('roomUser.user', 'user')
      .where('room.id IN (:...roomIds)', { roomIds })
      .groupBy('room.id, message.id, roomUser.id, user.id')
      .orderBy('MAX(message.createdDate)', 'DESC')
      .getMany()

    return rooms
  }
  static async findRoom(roomId: string, userId: number) {
    // ユーザーがルームに所属していることを確認
    await RoomUser.findOneOrFail({
      where: { roomId, userId },
    })
    // ルームデータおよび関連するメッセージとユーザーを取得
    const room = await Room.createQueryBuilder('room')
      .leftJoinAndSelect('room.messages', 'message')
      .leftJoinAndSelect('room.roomUsers', 'roomUser')
      .leftJoinAndSelect('roomUser.user', 'user')
      .where('room.id = :roomId', { roomId })
      .getOneOrFail()
    return room
  }
}
