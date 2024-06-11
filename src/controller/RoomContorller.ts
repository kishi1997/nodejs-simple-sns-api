import express from 'express'
import { authAdmin, verifyToken } from 'src/authMiddleware/auth'
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
