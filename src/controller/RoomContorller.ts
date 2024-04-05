import express from 'express'
import { authAdmin, verifyToken } from 'src/authMiddleware/auth'
import { RoomService } from 'src/service/RoomService'

export const RoomController = express.Router()
RoomController.post('/', verifyToken, authAdmin, async (req, res, next) => {
  try {
    const { userIds } = req.body
    const roomData = await RoomService.createRoom(userIds, (req as any).userId)
    const { roomInfo } = roomData

    const responseData = {
      room: roomInfo,
    }

    res.json(responseData)
  } catch (error) {
    next(error)
  }
})
