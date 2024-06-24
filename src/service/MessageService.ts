import { getMessageRepository, getRoomRepository } from '../utils/getRepository'
import { Post } from 'src/entity/Post'
import { createError } from 'src/utils/errorUtils/createError'
import { Message } from 'src/entity/Message'
import { RoomUser } from 'src/entity/RoomUser'
import { PaginationParams } from 'src/types/paginationParams.type'
import { applyPagination } from 'src/utils/paginationUtils'
import { validateNull } from 'src/utils/validateUtils/validateNull'

type GetMessagesParams = {
  pagination?: PaginationParams
  roomId?: string
}
export class MessageService {
  static messageRepo = getMessageRepository()
  static roomRepo = getRoomRepository()

  static async createMessage(content: string, roomId: string, userId: number) {
    const roomUsers = await RoomUser.find({
      where: { roomId: roomId },
    })
    const userIds = roomUsers.map(roomUser => roomUser.userId)
    // 引数のuserIdが配列に含まれているかをチェック
    if (!userIds.includes(userId)) {
      throw createError('You are not room member', 422)
    }
    const newMessage = this.messageRepo.create({
      content,
      roomId,
      userId,
    })
    await this.messageRepo.save(newMessage)
    const newMessageData = await this.messageRepo.findOneOrFail({
      where: { id: newMessage.id },
      relations: ['user'],
    })
    return newMessageData
  }
  static async createMessageViaPost(
    content: string,
    postId: number,
    userId: number
  ) {
    // post取得
    const post = await Post.findOneOrFail({
      where: { id: postId },
      relations: ['user'],
    })
    const userIds = [post.user?.id as number, userId]
    const formattedUserIds = Array.from(userIds)
      .sort((a, b) => a - b)
      .join('-')
    // ルームの取得
    let room = await this.roomRepo.findOneOrFail({
      where: { usersId: formattedUserIds },
    })
    // メッセージの作成と保存
    const newMessage = this.messageRepo.create({
      content,
      postId,
      userId,
      roomId: room.id,
    })
    await this.messageRepo.save(newMessage)
    // メッセージデータの取得
    const newMessageData = await this.messageRepo.findOneOrFail({
      where: { id: newMessage.id },
      relations: ['user', 'post', 'post.user'],
    })
    return newMessageData
  }
  static async getMessages(params: GetMessagesParams) {
    const roomId = params.roomId
    if (roomId == null) {
      throw createError('RoomId does not exist', 422)
    }
    const { pagination = {} } = params
    let query = Message.createQueryBuilder('message')
      .leftJoinAndSelect('message.user', 'messageUser')
      .leftJoinAndSelect('message.post', 'post')
      .leftJoinAndSelect('post.user', 'postUser')
      .where('message.roomId = :roomId', { roomId })
    query = applyPagination(query, pagination)
    const messages = await query.getMany()
    return messages
  }
}
