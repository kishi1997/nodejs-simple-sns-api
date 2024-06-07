import { getMessageRepository, getRoomRepository } from '../utils/getRepository'
import { Post } from 'src/entity/Post'
import { createError } from 'src/utils/errorUtils/createError'
import { FindMessagesParams } from 'src/types/params.type'
import { Message } from 'src/entity/Message'
import { RoomUser } from 'src/entity/RoomUser'
import { RoomService } from './RoomService'

export class MessageService {
  static messageRepo = getMessageRepository()
  static roomRepo = getRoomRepository()

  static async getMessages(params: FindMessagesParams) {
    // cursor,isNext,sizeにはundefinedの場合、初期値を設定
    const cursor = params.pagination?.cursor
    const isNext: boolean =
      params.pagination?.isNext === undefined
        ? true
        : params.pagination?.isNext !== false
    const size = params.pagination?.size ? params.pagination?.size : 50
    const order = params.pagination?.order === 'ASC' ? 'ASC' : 'DESC'
    const roomId = params.roomId
    const comparison = isNext ? '<' : '>'
    let query = Message.createQueryBuilder('message')
      .leftJoinAndSelect('message.user', 'messageUser')
      .leftJoinAndSelect('message.post', 'post')
      .leftJoinAndSelect('post.user', 'postUser')
      .orderBy('message.id', order)
      .limit(size)
    if (roomId !== undefined) {
      query = query.where('message.roomId = :roomId', { roomId })
    }
    if (cursor !== undefined) {
      query = query.andWhere('message.id ' + comparison + ' :cursor', {
        cursor,
      })
    }
    const messages = await query.getMany()
    return messages
  }

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
    const newMessageData = await this.messageRepo.findOne({
      where: { id: newMessage.id },
      relations: ['user'],
    })
    if (newMessageData == null) {
      throw createError('Message data does not exist', 422)
    }
    return newMessageData
  }
  static async createMessageViaPost(
    content: string,
    postId: number,
    userId: number
  ) {
    // post取得
    const post = await Post.findOne({
      where: { id: postId },
      relations: ['user'],
    })
    if (post == null || post.user == null) {
      throw createError(
        post == null ? 'Post does not exist' : 'Post User does not exist',
        422
      )
    }
    const userIds = [post.user.id as number, userId]
    const formattedUserIds = Array.from(userIds)
      .sort((a, b) => a - b)
      .join('-')
    // ルームの取得
    let room = await this.roomRepo.findOne({
      where: { usersId: formattedUserIds },
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
    const newMessageData = await this.messageRepo.findOne({
      where: { id: newMessage.id },
      relations: ['user', 'post', 'post.user'],
    })
    if (newMessageData == null) {
      throw createError('Message data does not exist', 422)
    }

    return newMessageData
  }
}
