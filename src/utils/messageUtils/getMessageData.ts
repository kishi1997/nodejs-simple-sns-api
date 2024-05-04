import { Message } from 'src/entity/Message'
import { Room } from 'src/entity/Room'

export const getMessages = async (room: Room): Promise<Message[]> => {
  const messages = await Message.find({
    where: { roomId: room.id },
    relations: ['user'],
  })
  return messages
}
