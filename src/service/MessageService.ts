import { getMessageRepository, getRoomRepository } from '../utils/getRepository'
import { Post } from 'src/entity/Post'
import { createError } from 'src/utils/errorUtils/createError'
import { Message } from 'src/entity/Message'
import { RoomUser } from 'src/entity/RoomUser'
import { PaginationParams } from 'src/types/paginationParams.type'
import { applyPagination } from 'src/utils/paginationUtils'
import { RoomService } from './RoomService'
import { joinNumbersWithHyphen } from 'src/utils/arrayUtils'

type GetMessagesParams = {
  pagination?: PaginationParams
  roomId?: string
}

export class MessageService {
  static messageRepo = getMessageRepository()
  static roomRepo = getRoomRepository()
  static async createMessage(
    content: string,
    roomId: string,
    userId: number
  ): Promise<Message> {
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
  ): Promise<Message> {
    const post = await Post.findOneOrFail({
      where: { id: postId },
      relations: ['user'],
    })
    const userIds = [post.userId!, userId]
    const roomUsersId = joinNumbersWithHyphen(userIds)
    // ルームの取得
    let room = await this.roomRepo.findOne({
      where: { usersId: roomUsersId },
    })
    if (room == null) {
      room = await RoomService.createRoom(userIds, userId)
    }
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
  static async getMessages(
    params: GetMessagesParams,
    userId: number
  ): Promise<Message[]> {
    const roomId = params.roomId
    // ユーザーがルームに所属していることを確認
    await RoomUser.findOneOrFail({
      where: { roomId, userId },
    })
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
