import {
  getRoomRepository,
  getRoomUserRepository,
} from 'src/utils/getRepository'
import { createNewRoom } from 'src/utils/roomUtils/createNewRoom'
import { RoomUser } from 'src/entity/RoomUser'
import { Room } from 'src/entity/Room'

export class RoomService {
  static roomRepo = getRoomRepository()
  static roomUserRepo = getRoomUserRepository()
  static async createRoom(roomUsersId: number[], userId: number) {
    const allUserIds = Array.from(new Set([...roomUsersId, userId]))
    const formattedUserIds = Array.from(allUserIds)
      .sort((a, b) => a - b)
      .join('-')
    const newRoom = await createNewRoom(formattedUserIds)
    const roomWithMessages = await Room.findOne({
      where: { id: newRoom.id },
      relations: ['messages'],
    })
    // roomUserテーブルにユーザー登録
    const roomUserRegistrationData = allUserIds.map((userId: number) => {
      return {
        userId: userId,
        roomId: newRoom.id,
      }
    })
    await RoomUser.createQueryBuilder()
      .insert()
      .into(RoomUser)
      .values(roomUserRegistrationData)
      .execute()

    const roomUsers = await RoomUser.createQueryBuilder('roomUser')
      .leftJoinAndSelect('roomUser.user', 'user')
      .select([
        'roomUser.roomId',
        'roomUser.userId',
        'user.id',
        'user.name',
        'user.iconImageUrl',
      ])
      .where('roomUser.roomId = :roomId', { roomId: newRoom.id })
      .getMany()

    return {
      id: newRoom.id,
      messages: roomWithMessages?.messages,
      roomUsers: roomUsers,
    }
  }
}
