import {
  getRoomRepository,
  getRoomUserRepository,
} from 'src/utils/getRepository'
import { getMessages } from 'src/utils/messageUtils/getMessageData'
import { generateResponseRoomUsersInfo } from 'src/utils/roomUtils/generateResponseRoomUsersInfo'
import { createNewRoom } from 'src/utils/roomUtils/createNewRoom'
import { getUserData } from 'src/utils/userUtils/getUserData'

export class RoomService {
  static roomRepo = getRoomRepository()
  static roomUserRepo = getRoomUserRepository()
  static async createRoom(roomUsersId: number[], userId: number) {
    const allUserIds: number[] = Array.from(new Set([...roomUsersId, userId]))
    const roomUsersData = await Promise.all(
      allUserIds.map(async userId => {
        return getUserData(userId)
      })
    )
    const formattedUserIds = Array.from(allUserIds)
      .sort((a, b) => a - b)
      .join('-')
    const newRoom = await createNewRoom(formattedUserIds)
    // roomUserテーブルにユーザー登録
    await Promise.all(
      allUserIds.map(async userId => {
        const roomUser = this.roomUserRepo.create({
          userId: userId,
          roomId: newRoom.id,
        })
        await this.roomUserRepo.save(roomUser)
      })
    )
    // 作成したルーム内のメッセージを取得
    const messages = await getMessages(newRoom)
    // レスポンスとして返すルームユーザーデータの取得及び整形
    const roomUsersInfo = await generateResponseRoomUsersInfo(
      roomUsersData,
      newRoom
    )
    return {
      id: newRoom.id,
      messages,
      roomUsers: roomUsersInfo,
    }
  }
}
