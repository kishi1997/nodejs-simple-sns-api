import { Room } from 'src/entity/Room'
import { createError } from '../errorUtils/createError'
import { getRoomRepository } from '../getRepository'

export const createNewRoom = async (
  formattedUserIds: string
): Promise<Room> => {
  const roomRepo = getRoomRepository()
  const existingRoom = await Room.findOne({
    where: { usersId: formattedUserIds },
  })
  if (existingRoom !== null) {
    throw createError('Duplicate entry', 422)
  }
  const newRoom = roomRepo.create({ usersId: formattedUserIds })
  await roomRepo.save(newRoom)
  return newRoom
}
