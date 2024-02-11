import { validateNull } from 'src/utils/validateUtils/validateNull'
import { getMessageRepository } from '../utils/getRepository'
import { validateEmpty } from 'src/utils/validateUtils/validateEmpty'
import { User } from 'src/entity/User'
import { Post } from 'src/entity/Post'
import { createError } from 'src/utils/errorUtils/createError'

export class MessageService {
  static messageRepo = getMessageRepository()

  static validateMessageData(content: string, roomId: string, postId?: number) {
    if (postId) {
      validateNull(
        { name: 'Message', value: content, status: 422 },
        { name: 'RoomId', value: roomId, status: 422 },
        { name: 'postId', value: postId, status: 422 }
      )
    } else {
      validateNull(
        { name: 'Message', value: content, status: 422 },
        { name: 'RoomId', value: roomId, status: 422 }
      )
    }
    validateEmpty({ name: 'Message', value: content.trim(), status: 422 })
  }

  static async createMessage(content: string, roomId: string, userId: number) {
    this.validateMessageData(content, roomId)
    const user = await User.findOne({ where: { id: userId } })
    if (!user) {
      throw createError('User does not exist', 400)
    }
    const newMessage = MessageService.messageRepo.create({
      content,
      roomId,
      userId,
    })
    await MessageService.messageRepo.save(newMessage)
    return { user, newMessage }
  }
  static async createMessageViaPost(
    content: string,
    roomId: string,
    postId: number,
    userId: number
  ) {
    this.validateMessageData(content, roomId, postId)
    const user = await User.findOne({ where: { id: userId } })
    if (!user) {
      throw createError('User does not exist', 422)
    }
    const post = await Post.findOne({
      where: { id: postId },
      relations: ['user'],
    })
    if (post == null) {
      throw createError('Post does not exist', 422)
    }
    const postUser = post.user
    if (postUser == null) {
      throw createError('Post User does not exist', 400)
    }
    const newMessage = MessageService.messageRepo.create({
      content,
      roomId,
      postId,
      userId,
    })
    await MessageService.messageRepo.save(newMessage)
    return { user, post, postUser, newMessage }
  }
}
