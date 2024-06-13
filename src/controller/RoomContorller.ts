import express from 'express'
import { authAdmin, verifyToken } from 'src/authMiddleware/auth'
import { Room } from 'src/entity/Room'
import { RoomService } from 'src/service/RoomService'
import { formatRoomResponse } from 'src/utils/responseUtils/formatRoomResponse'

export const RoomController = express.Router()
RoomController.post('/', verifyToken, authAdmin, async (req, res, next) => {
  try {
    const { userIds } = req.body
    const roomData = await RoomService.createRoom(userIds, (req as any).userId)
    res.json({ room: formatRoomResponse(roomData) })
  } catch (error) {
    next(error)
  }
})
RoomController.get('/', verifyToken, authAdmin, async (req, res, next) => {
  try {
    const roomDatas = await RoomService.getRooms((req as any).userId)
    res.json({
      rooms: roomDatas.map((roomData: Room) => {
        return formatRoomResponse(roomData)
      }),
    })
  } catch (error) {
    next(error)
  }
})
RoomController.get('/:id', verifyToken, authAdmin, async (req, res, next) => {
  try {
    const roomId = req.params.id
    const roomData = await RoomService.findRoom(roomId, (req as any).userId)
    res.json({ room: formatRoomResponse(roomData) })
  } catch (error) {
    next(error)
  }
})
