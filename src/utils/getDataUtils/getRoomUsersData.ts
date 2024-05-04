import { Room } from 'src/entity/Room'
import { RoomUser } from 'src/entity/RoomUser'
import { createError } from '../errorUtils/createError'

export const getRoomUsers = async (room: Room): Promise<RoomUser[]> => {
  const roomUsers = await RoomUser.find({
    where: { roomId: room.id },
    relations: ['user'],
  })
  if (roomUsers == null) {
    throw createError('Room users dont exist', 422)
  }
  return roomUsers
}
